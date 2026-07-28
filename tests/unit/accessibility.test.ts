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
