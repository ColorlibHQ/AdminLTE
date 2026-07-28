import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { slideDown, slideUp } from '../../src/ts/util/index'

const SPEED = 100

describe('slide animations', () => {
  let element: HTMLElement

  beforeEach(() => {
    vi.useFakeTimers()
    element = document.createElement('div')
    document.body.append(element)
  })

  afterEach(() => {
    vi.useRealTimers()
    element.remove()
  })

  it('slideUp hides the element and cleans its inline styles', () => {
    slideUp(element, SPEED)
    vi.advanceTimersByTime(SPEED + 10)

    expect(element.style.display).toBe('none')
    expect(element.style.height).toBe('')
    expect(element.style.overflow).toBe('')
  })

  it('a slideDown during a running slideUp cancels the stale cleanup', () => {
    slideUp(element, SPEED)
    vi.advanceTimersByTime(SPEED / 2)

    slideDown(element, SPEED)
    // The canceled slideUp's cleanup timer must NOT fire and hide the element.
    vi.advanceTimersByTime(SPEED * 2)

    expect(element.style.display).not.toBe('none')
  })

  it('slideDown after a completed slideUp makes the element visible again', () => {
    slideUp(element, SPEED)
    vi.advanceTimersByTime(SPEED + 10)
    expect(element.style.display).toBe('none')

    slideDown(element, SPEED)
    vi.advanceTimersByTime(SPEED + 10)
    expect(element.style.display).not.toBe('none')
  })

  it('duration <= 1 short-circuits without leaving animation styles', () => {
    slideUp(element, 0)
    expect(element.style.display).toBe('none')
    expect(element.style.height).toBe('')
  })
})

/**
 * The lifecycle module keeps state at module scope and runs its initial batch on
 * import, so every test imports a fresh instance. `document.readyState` is
 * 'complete' under happy-dom, which means a callback registered here runs once
 * immediately via the late-registration path.
 */
describe('lifecycle', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('initialize() replays registered callbacks against the current DOM', async () => {
    const { initialize, onDOMContentLoaded } = await import('../../src/ts/util/index')
    const callback = vi.fn()

    onDOMContentLoaded(callback)
    expect(callback).toHaveBeenCalledTimes(1)

    initialize()
    expect(callback).toHaveBeenCalledTimes(2)

    // Repeated calls keep replaying — frameworks may re-render more than once.
    initialize()
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('initialize() aborts the previous cycle so signalled listeners do not stack', async () => {
    const { getLifecycleSignal, initialize, onDOMContentLoaded } = await import('../../src/ts/util/index')
    const handler = vi.fn()

    onDOMContentLoaded(() => {
      document.addEventListener('lte.test.ping', handler, { signal: getLifecycleSignal() })
    })

    document.dispatchEvent(new Event('lte.test.ping'))
    expect(handler).toHaveBeenCalledTimes(1)

    initialize()
    handler.mockClear()

    // Two registrations have happened, but the first cycle's signal was aborted,
    // so exactly one listener is still live.
    document.dispatchEvent(new Event('lte.test.ping'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('turbo:load replays only once turbo:before-render has reset the cycle', async () => {
    const { onDOMContentLoaded } = await import('../../src/ts/util/index')
    const callback = vi.fn()

    onDOMContentLoaded(callback)
    callback.mockClear()

    // The cycle is still marked initialised, so a bare turbo:load is a no-op.
    document.dispatchEvent(new Event('turbo:load'))
    expect(callback).not.toHaveBeenCalled()

    document.dispatchEvent(new Event('turbo:before-render'))
    document.dispatchEvent(new Event('turbo:load'))
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('element-level listeners with the signal do not stack on a persistent element', async () => {
    // The overlay case: the element is reused across cycles (persistent <body>),
    // so only the signal keeps repeated initialize() calls from stacking handlers.
    const { getLifecycleSignal, initialize, onDOMContentLoaded } = await import('../../src/ts/util/index')
    const element = document.createElement('div')
    document.body.append(element)
    const handler = vi.fn()

    onDOMContentLoaded(() => {
      element.addEventListener('lte.test.overlay', handler, { signal: getLifecycleSignal() })
    })

    initialize()
    initialize()

    element.dispatchEvent(new Event('lte.test.overlay'))
    expect(handler).toHaveBeenCalledTimes(1)

    element.remove()
  })

  it('an early initialize() does not suppress the initial DOMContentLoaded pass', async () => {
    // Simulate a script evaluated while the document is still parsing.
    Object.defineProperty(document, 'readyState', { configurable: true, get: () => 'loading' })
    const callback = vi.fn()

    try {
      const { initialize, onDOMContentLoaded } = await import('../../src/ts/util/index')

      onDOMContentLoaded(callback)
      expect(callback).not.toHaveBeenCalled()

      // A framework initialising early, against a partial DOM.
      initialize()
      expect(callback).toHaveBeenCalledTimes(1)
    } finally {
      // Restore the prototype getter ('complete').
      Reflect.deleteProperty(document, 'readyState')
    }

    // The real initial pass must still replay against the complete DOM.
    document.dispatchEvent(new Event('DOMContentLoaded'))
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('initialize() from inside a lifecycle callback does not recurse', async () => {
    const { initialize, onDOMContentLoaded } = await import('../../src/ts/util/index')
    const callback = vi.fn(() => {
      initialize()
    })

    // Late registration runs the callback outside a replay, so its nested
    // initialize() performs one replay (guarded against going further).
    onDOMContentLoaded(callback)
    expect(callback).toHaveBeenCalledTimes(2)

    // During a replay the nested call is a no-op — exactly one run per cycle.
    initialize()
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('teardown() removes the cycle listeners without replaying', async () => {
    const { getLifecycleSignal, initialize, onDOMContentLoaded, teardown } = await import('../../src/ts/util/index')
    const handler = vi.fn()
    const callback = vi.fn(() => {
      document.addEventListener('lte.test.teardown', handler, { signal: getLifecycleSignal() })
    })

    onDOMContentLoaded(callback)
    expect(callback).toHaveBeenCalledTimes(1)

    teardown()
    // No replay happened, and the cycle's listener is gone.
    expect(callback).toHaveBeenCalledTimes(1)
    document.dispatchEvent(new Event('lte.test.teardown'))
    expect(handler).not.toHaveBeenCalled()

    // A later initialize() arms a fresh, working cycle.
    initialize()
    document.dispatchEvent(new Event('lte.test.teardown'))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
