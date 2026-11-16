import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import process from 'node:process'
import * as playwright from 'playwright'
import { distRoot, serveDist } from './serve-dist.mjs'

const browsers = (process.env.BROWSERS || 'chromium').split(',')
const files = await readdir(distRoot, { recursive: true })
const pages = files.filter(filename => filename.endsWith('.html')).toSorted((a, b) => a.localeCompare(b))
assert.ok(pages.length > 50, 'Build the complete template with npm run build before testing.')
const server = await serveDist()
const results = { checks: 0 }

async function checkPage(page, filename, action) {
  const errors = []
  const onError = error => { errors.push(error.message) }
  const onConsole = message => {
    if (message.type() !== 'error') return
    errors.push(message.text())
  }
  const onResponse = response => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
  }
  const onFailed = request => { errors.push(`${request.failure()?.errorText} ${request.url()}`) }
  page.on('pageerror', onError)
  page.on('console', onConsole)
  page.on('response', onResponse)
  page.on('requestfailed', onFailed)
  try {
    const response = await page.goto(`${server.url}/${filename}`, { waitUntil: 'networkidle' })
    assert.equal(response.status(), 200, filename)
    assert.ok(await page.title(), `${filename}: missing title`)
    if (action) await action(page)
    assert.deepEqual(errors, [], `${filename}: browser or asset failures`)
    results.checks++
  } finally {
    page.off('pageerror', onError)
    page.off('console', onConsole)
    page.off('response', onResponse)
    page.off('requestfailed', onFailed)
  }
}

try {
  for (const name of browsers) {
    assert.ok(['chromium', 'firefox', 'webkit'].includes(name), `Unknown browser: ${name}`)
    const browser = await playwright[name].launch()
    try {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        timezoneId: 'Europe/Riga'
      })
      // Exercise the template and its actual CDN libraries. The embedded video
      // player is an unrelated application with analytics and cookie warnings.
      await context.route('https://www.youtube.com/embed/**', route => route.fulfill({
        contentType: 'text/html',
        body: '<!doctype html><html lang="en"><title>Video embed</title><body></body></html>'
      }))
      const page = await context.newPage()
      for (const filename of pages) {
        await checkPage(page, filename)
        console.log(`${name}: ${filename} OK`)
      }

      for (const colorScheme of ['light', 'dark']) {
        for (const width of [375, 768, 1440]) {
          await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
          await page.setViewportSize({ width, height: 1000 })
          for (const filename of ['index.html', 'pages/calendar.html', 'tables/data.html', 'docs/colors.html', 'layout/layout-rtl.html']) {
            await checkPage(page, filename, async current => {
              const dimensions = await current.evaluate(() => ({
                content: document.documentElement.scrollWidth,
                viewport: document.documentElement.clientWidth
              }))
              assert.ok(dimensions.content <= dimensions.viewport + 1, `${filename}: horizontal overflow at ${width}px (${dimensions.content}px)`)
              assert.equal(await current.locator('html').getAttribute('data-bs-theme'), colorScheme)
            })
          }
        }
      }

      await page.setViewportSize({ width: 1440, height: 1000 })
      await checkPage(page, 'index.html', async current => {
        assert.ok(await current.locator('#world-map svg').count(), 'World map should render')
        assert.ok(await current.evaluate(() => Object.keys(globalThis.Chart.instances).length > 0), 'Charts should initialize')
        await current.locator('[data-lte-toggle="sidebar"]').first().click()
        await current.waitForFunction(() => document.body.classList.contains('sidebar-collapse'))
        await current.locator('[data-lte-toggle="sidebar"]').first().click()
        await current.waitForFunction(() => !document.body.classList.contains('sidebar-collapse'))
      })
      await checkPage(page, 'forms/advanced.html', async current => {
        assert.ok(await current.locator('.ts-wrapper').count() > 0, 'Tom Select should initialize')
        assert.ok(await current.locator('.flatpickr-input').count() > 0, 'Flatpickr should initialize')
      })
      await checkPage(page, 'widgets/cards.html', async current => {
        const toggle = current.locator('[data-lte-toggle="card-maximize"]').first()
        await toggle.click()
        await current.waitForFunction(() => Boolean(document.querySelector('.card.maximized-card')))
        assert.ok(await toggle.locator('[data-lte-icon="minimize"]').isVisible(), 'Card restore icon should remain visible')
        assert.ok(!await toggle.locator('[data-lte-icon="maximize"]').isVisible(), 'Card maximize icon should hide while maximized')
        await toggle.click()
        await current.waitForFunction(() => !document.querySelector('.card.maximized-card'))
        assert.ok(await toggle.locator('[data-lte-icon="maximize"]').isVisible(), 'Card maximize icon should return after restoring')
      })
      await checkPage(page, 'tables/data.html', async current => {
        assert.ok(await current.locator('.tabulator-row').count() > 0, 'Tabulator should render rows')
        await current.locator('#table-filter').fill('Olivia')
        await current.waitForFunction(() => document.querySelectorAll('.tabulator-row').length === 1 && document.querySelector('.tabulator-row').textContent.includes('Olivia'))
        await current.locator('#table-filter').clear()
        await current.waitForFunction(() => document.querySelectorAll('.tabulator-row').length > 1)
      })
      // Just after midnight locally, while UTC is still the previous day.
      await page.clock.setFixedTime(new Date('2026-10-06T22:30:00Z'))
      await checkPage(page, 'pages/calendar.html', async current => {
        const onboarding = current.getByText('Onboarding session', { exact: true })
        assert.ok(await onboarding.count(), 'Calendar should render events')
        // Day cells carry data-date; FullCalendar 7.1.5 changed their role from gridcell to cell.
        const day = current.locator('#calendar [data-date]').filter({ has: onboarding })
        assert.equal(await day.getAttribute('data-date'), '2026-10-08', 'All-day events must retain their local date')
        const buttons = current.locator('#calendar button')
        assert.ok(await buttons.count() >= 7, 'Calendar should render navigation and view controls')
        current.once('dialog', dialog => dialog.accept('Browser regression event'))
        await current.locator('#calendar [data-date]').nth(15).click()
        const event = current.getByText('Browser regression event', { exact: true })
        await event.waitFor()
        current.once('dialog', dialog => dialog.accept())
        await event.click()
        await event.waitFor({ state: 'detached' })
        await current.getByRole('tab', { name: 'Week view', exact: true }).click()
        await current.getByRole('tab', { name: 'List view', exact: true }).click()
        await onboarding.waitFor()
      })
      console.log(`${name}: responsive themes, RTL, and plugin interactions OK`)
    } finally {
      await browser.close()
    }
  }
  console.log(`Browser checks passed: ${results.checks} page/scenario checks across ${browsers.join(', ')}.`)
} finally {
  await server.close()
}
