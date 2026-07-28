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
})
