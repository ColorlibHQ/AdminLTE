/**
 * Lifecycle management
 * ============================================================================
 *
 * Plugins register their initialisation through `onDOMContentLoaded`. Besides
 * the initial page load, every registered callback is re-run on Hotwired Turbo
 * navigations (`turbo:load`): Turbo Drive swaps the <body> without a full page
 * reload, so without re-initialisation plugins such as PushMenu and TreeView
 * stop working after the first in-app link click (#563, #5890).
 *
 * Re-running init would normally leak listeners, because callbacks also bind to
 * `window`/`document`, which survive Turbo's <body> swap. To prevent that, each
 * cycle has its own `AbortController`: callbacks should attach their
 * window/document-level listeners with the signal from `getLifecycleSignal()`.
 * The signal is aborted on `turbo:before-render`, tearing down the previous
 * cycle's listeners before the callbacks run again. Listeners bound to elements
 * inside <body> don't need the signal — Turbo discards the old <body>, so they
 * are cleaned up automatically.
 *
 * Turbo is not the only environment that renders after `DOMContentLoaded`:
 * client-side frameworks that build the layout themselves (GWT, and other
 * imperative widget toolkits) have an empty <body> when the initial batch runs,
 * so the per-page init pass finds no sidebar and no menu. Those consumers call
 * the exported `initialize()` once the layout is attached — it performs the same
 * reset-then-replay cycle Turbo gets, without faking Turbo events.
 *
 * Unlike Turbo, such frameworks keep the same <body> across a re-init, so
 * element-level listeners are NOT discarded for them. Callbacks should therefore
 * pass `getLifecycleSignal()` to every `addEventListener` they make — including
 * ones on elements — whenever the element can outlive the cycle.
 */

const lifecycleCallbacks: Array<() => void> = []

// Mutable state is held on an object so the lifecycle hooks below can update it
// without reassigning top-level bindings.
const lifecycleState = {
  controller: new AbortController(),
  hasInitialized: false,
  // True while the callback batch is executing — lets initialize() refuse
  // re-entrant calls made from inside a lifecycle callback.
  isReplaying: false
}

/**
 * The AbortSignal for the current lifecycle. Pass it as the
 * `{ signal }` option to window/document `addEventListener` calls made during
 * initialisation so they are removed automatically on the next Turbo render.
 */
const getLifecycleSignal = (): AbortSignal => lifecycleState.controller.signal

const runLifecycleCallbacks = (): void => {
  if (lifecycleState.hasInitialized) {
    return
  }

  lifecycleState.hasInitialized = true
  lifecycleState.isReplaying = true

  try {
    for (const callback of lifecycleCallbacks) {
      callback()
    }
  } finally {
    lifecycleState.isReplaying = false
  }
}

const onDOMContentLoaded = (callback: () => void): void => {
  lifecycleCallbacks.push(callback)

  // Late registration: the batch for the current cycle has already run (the
  // script loaded after DOMContentLoaded, or a callback was registered after a
  // Turbo visit), so run the newcomer immediately rather than stranding it
  // until the next navigation. Preserves the original non-loading behaviour.
  if (lifecycleState.hasInitialized) {
    callback()
  }
}

/**
 * End the current lifecycle: abort the cycle's signal so listeners registered
 * with it are removed, then arm a fresh cycle for the next replay.
 *
 * Exported for SPA containers that unmount the AdminLTE layout: calling it
 * drops the window/document listeners the current cycle added without
 * immediately re-initialising. Internally it is also the first half of
 * `initialize()` and the `turbo:before-render` handler.
 */
const teardown = (): void => {
  lifecycleState.controller.abort()
  lifecycleState.controller = new AbortController()
  lifecycleState.hasInitialized = false
}

/**
 * Re-run every plugin's initialisation against the DOM as it stands right now.
 *
 * Intended for frameworks that render the layout after `DOMContentLoaded` has
 * already fired — call it once the sidebar and menu are attached, and PushMenu,
 * Treeview and ColorMode pick them up as if they had been in the initial HTML.
 * Delegated click handling never needs this; only the per-page init pass does.
 *
 * The previous cycle is torn down first, so calling it repeatedly does not stack
 * listeners registered with `getLifecycleSignal()`. Calling it before the
 * initial batch has run (while `document.readyState === 'loading'`) runs that
 * batch early, against whatever DOM exists at the time — the initial
 * `DOMContentLoaded` pass below still replays against the complete DOM.
 */
const initialize = (): void => {
  // Re-entrancy guard: a lifecycle callback calling initialize() would tear
  // down its own cycle mid-replay and recurse without end.
  if (lifecycleState.isReplaying) {
    return
  }

  teardown()
  runLifecycleCallbacks()
}

// Initial page load. Routed through initialize() so that an early initialize()
// call (a framework initialising before the document finished loading) cannot
// mark the cycle as done and suppress this pass — the replay tears the early
// cycle down and re-runs every callback against the complete DOM.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true })
} else {
  runLifecycleCallbacks()
}

// Hotwired Turbo: drop the previous cycle's window/document listeners, then
// re-run initialisation against the freshly rendered <body>. The teardown has to
// happen at `before-render` rather than as part of the replay, so the outgoing
// <body>'s listeners are gone before Turbo swaps in the new one — which is why
// this is the two-step form of `initialize()` rather than a call to it.
document.addEventListener('turbo:before-render', teardown)

document.addEventListener('turbo:load', runLifecycleCallbacks)

// ES2022 UTILITY FUNCTIONS

/**
 * Check if an element has a specific data attribute using ES2022 Object.hasOwn()
 */
const hasDataAttribute = (element: HTMLElement, attribute: string): boolean => {
  return Object.hasOwn(element.dataset, attribute)
}

/**
 * Get the last element from a NodeList using ES2022 Array.at()
 */
const getLastElement = <T extends Element>(elements: NodeListOf<T> | T[]): T | undefined => {
  const elementsArray = Array.from(elements)
  return elementsArray.at(-1)
}

/**
 * Safe property access with better error handling
 */
const safePropertyAccess = (obj: Record<string, unknown>, property: string): unknown => {
  try {
    return Object.hasOwn(obj, property) ? obj[property] : undefined
  } catch (error) {
    // ES2022 Error cause
    throw new Error(`Failed to access property '${property}'`, { cause: error })
  }
}

/* SLIDE ANIMATION BOOKKEEPING
 * Pending timers are tracked per element so that starting a new slide cancels
 * the previous animation's steps: without this, rapidly toggling a treeview or
 * card leaves a stale cleanup timer that strips height/transition mid-animation
 * and desyncs the element's display state from its component's classes. */
const slideTimers = new WeakMap<HTMLElement, Array<ReturnType<typeof globalThis.setTimeout>>>()

const cancelSlide = (target: HTMLElement): void => {
  const timers = slideTimers.get(target) ?? []
  for (const timer of timers) {
    globalThis.clearTimeout(timer)
  }

  slideTimers.delete(target)
}

const clearSlideStyles = (target: HTMLElement): void => {
  for (const property of ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom', 'overflow', 'transition-duration', 'transition-property']) {
    target.style.removeProperty(property)
  }
}

// SLIDE UP
const slideUp = (target: HTMLElement, duration = 500) => {
  cancelSlide(target)

  if (duration <= 1) {
    target.style.display = 'none'
    clearSlideStyles(target)
    return
  }

  target.style.transitionProperty = 'height, margin, padding'
  target.style.transitionDuration = `${duration}ms`
  target.style.boxSizing = 'border-box'
  target.style.height = `${target.offsetHeight}px`
  target.style.overflow = 'hidden'

  const stepTimer = globalThis.setTimeout(() => {
    target.style.height = '0'
    target.style.paddingTop = '0'
    target.style.paddingBottom = '0'
    target.style.marginTop = '0'
    target.style.marginBottom = '0'
  }, 1)

  const cleanupTimer = globalThis.setTimeout(() => {
    target.style.display = 'none'
    clearSlideStyles(target)
    slideTimers.delete(target)
  }, duration)

  slideTimers.set(target, [stepTimer, cleanupTimer])
}

// SLIDE DOWN
const slideDown = (target: HTMLElement, duration = 500) => {
  cancelSlide(target)
  // Drop inline styles a cancelled slideUp may have left behind (height: 0,
  // overflow: hidden, …) before measuring, or the natural height reads as 0.
  clearSlideStyles(target)

  target.style.removeProperty('display')
  let { display } = globalThis.getComputedStyle(target)

  if (display === 'none') {
    display = 'block'
  }

  target.style.display = display

  if (duration <= 1) {
    return
  }

  const height = target.offsetHeight
  target.style.overflow = 'hidden'
  target.style.height = '0'
  target.style.paddingTop = '0'
  target.style.paddingBottom = '0'
  target.style.marginTop = '0'
  target.style.marginBottom = '0'

  const stepTimer = globalThis.setTimeout(() => {
    target.style.boxSizing = 'border-box'
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = `${duration}ms`
    target.style.height = `${height}px`
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
  }, 1)

  const cleanupTimer = globalThis.setTimeout(() => {
    clearSlideStyles(target)
    slideTimers.delete(target)
  }, duration)

  slideTimers.set(target, [stepTimer, cleanupTimer])
}

// TOGGLE
const slideToggle = (target: HTMLElement, duration = 500) => {
  if (globalThis.getComputedStyle(target).display === 'none') {
    slideDown(target, duration)
    return
  }

  slideUp(target, duration)
}

export {
  onDOMContentLoaded,
  getLifecycleSignal,
  initialize,
  teardown,
  slideUp,
  slideDown,
  slideToggle,
  hasDataAttribute,
  getLastElement,
  safePropertyAccess
}
