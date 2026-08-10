import { beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * Re-initialisation regressions: initFormAccessibility() binds an `invalid`
 * listener per form field on every lifecycle cycle. Under a framework that
 * re-initialises against a persistent <body> (initialize()), the fields
 * survive the cycle, so those listeners must carry the lifecycle signal or
 * they stack one handler per re-init.
 */
describe('accessibility re-initialisation', () => {
  beforeEach(() => {
    vi.resetModules()
    document.body.replaceChildren()
  })

  it('form "invalid" listeners do not stack across initialize() calls', async () => {
    document.body.innerHTML = '<main><input id="probe" required></main>'

    const { initialize, onDOMContentLoaded } = await import('../../src/ts/util/index')
    const accessibility = await import('../../src/ts/accessibility')

    onDOMContentLoaded(() => {
      accessibility.initAccessibility({
        announcements: false,
        skipLinks: false,
        focusManagement: false,
        keyboardNavigation: false,
        reducedMotion: false
      })
    })

    // Three cycles have run (immediate late registration + two replays); the
    // first two were torn down, so exactly one handler must respond.
    initialize()
    initialize()

    const prototype = accessibility.AccessibilityManager.prototype as unknown as {
      handleFormError: () => void
    }
    const spy = vi.spyOn(prototype, 'handleFormError').mockImplementation(() => {
      // The DOM side effects are not under test — only the handler count.
    })

    const input = document.querySelector('#probe') as HTMLInputElement
    input.dispatchEvent(new Event('invalid'))

    expect(spy).toHaveBeenCalledTimes(1)
  })
})

/**
 * Skip-link targets: `#main` and `#navigation` may already exist in the page.
 * The old lookup used one selector list per target, which resolves in document
 * order — so a header <nav> preceding the real `#navigation` was given the id
 * a second time, producing a duplicate id and silently redirecting every
 * `#navigation` lookup (including SidebarSearch's) to the header.
 */
const buildManager = async () => {
  const accessibility = await import('../../src/ts/accessibility')
  return accessibility.initAccessibility({
    announcements: false,
    skipLinks: true,
    focusManagement: false,
    keyboardNavigation: false,
    reducedMotion: false
  })
}

describe('accessibility skip targets', () => {
  beforeEach(() => {
    vi.resetModules()
    document.body.replaceChildren()
  })

  it('leaves an existing #navigation alone instead of stamping an earlier <nav>', async () => {
    document.body.innerHTML = `
      <nav class="app-header"><ul class="navbar-nav"><li class="nav-item">Toggle</li></ul></nav>
      <aside><ul class="sidebar-menu" id="navigation"><li class="nav-item">Dashboard</li></ul></aside>
      <main></main>
    `

    await buildManager()

    expect(document.querySelectorAll('[id="navigation"]')).toHaveLength(1)
    expect(document.querySelector('#navigation')?.tagName).toBe('UL')
    expect(document.querySelector('nav.app-header')?.id).toBe('')
  })

  it('falls back to the first <nav> when the page has no #navigation', async () => {
    document.body.innerHTML = '<nav class="app-header"></nav><main></main>'

    await buildManager()

    expect(document.querySelector('nav.app-header')?.id).toBe('navigation')
    expect(document.querySelector('main')?.id).toBe('main')
    expect(document.querySelector('main')?.getAttribute('tabindex')).toBe('-1')
  })
})
