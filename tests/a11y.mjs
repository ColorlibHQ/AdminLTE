/**
 * Accessibility smoke check: runs axe-core against a set of built demo pages
 * served from dist/. Fails on serious/critical violations.
 *
 * Requires a Playwright installation. Like scripts/social-preview.mjs, it is
 * resolved from PLAYWRIGHT_PATH when playwright is not a local dependency:
 *
 *   npm run build
 *   PLAYWRIGHT_PATH=/path/to/node_modules/playwright npm run test-a11y
 *
 * In CI, install it first (see .github/workflows/a11y.yml).
 */

import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const require = createRequire(import.meta.url)
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const PAGES = [
  '/index.html',
  '/starter.html',
  '/users.html',
  '/examples/login.html',
  '/examples/forgot-password.html',
  '/pages/settings.html',
  '/tables/simple.html',
  '/forms/advanced.html',
  '/forms/editors.html',
  '/layout/top-nav.html',
  '/UI/general.html',
  '/UI/ribbons.html',
  '/UI/colors.html',
  '/widgets/social.html',
  '/pages/gallery.html',
  '/pages/search-results.html',
  '/docs/components/miscellaneous.html',
  '/docs/colors.html'
]

// Failures gate on impact, so new pages can't regress below this bar.
const FAILING_IMPACTS = new Set(['serious', 'critical'])

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.map': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2'
}

const serveDist = () => {
  const server = createServer(async (request, response) => {
    try {
      const filePath = path.join(root, 'dist', decodeURIComponent(new URL(request.url, 'http://localhost').pathname))
      const body = await readFile(filePath)
      response.writeHead(200, { 'content-type': MIME[path.extname(filePath)] || 'application/octet-stream' })
      response.end(body)
    } catch {
      response.writeHead(404)
      response.end()
    }
  })

  return new Promise(resolve => {
    server.listen(4180, () => {
      resolve(server)
    })
  })
}

const run = async chromium => {
  const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8')
  const server = await serveDist()
  const browser = await chromium.launch()
  const page = await browser.newPage()
  let failures = 0

  for (const pagePath of PAGES) {
    await page.goto(`http://localhost:4180${pagePath}`, { waitUntil: 'networkidle' })
    await page.evaluate(axeSource)
    const violations = await page.evaluate(async () => {
      // eslint-disable-next-line no-undef
      const axeResults = await axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }
      })
      return axeResults.violations.map(violation => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.length
      }))
    })

    const gating = violations.filter(violation => FAILING_IMPACTS.has(violation.impact))
    const advisory = violations.filter(violation => !FAILING_IMPACTS.has(violation.impact))

    console.log(`${pagePath}: ${gating.length} gating, ${advisory.length} advisory violation(s)`)
    for (const violation of [...gating, ...advisory]) {
      const marker = FAILING_IMPACTS.has(violation.impact) ? 'FAIL' : 'warn'
      console.log(`  [${marker}] ${violation.impact}: ${violation.id} — ${violation.help} (${violation.nodes} node(s))`)
    }

    failures += gating.length
  }

  await browser.close()
  server.close()
  return failures
}

let chromium
try {
  ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright'))
} catch {
  console.warn('test-a11y: playwright not available (set PLAYWRIGHT_PATH or install it) — skipping.')
}

if (chromium) {
  const failures = await run(chromium)

  if (failures > 0) {
    console.error(`\ntest-a11y: ${failures} serious/critical violation(s).`)
    process.exitCode = 1
  } else {
    console.log('\ntest-a11y: no serious/critical violations.')
  }
}
