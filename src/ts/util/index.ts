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
 */

const lifecycleCallbacks: Array<() => void> = []

// Mutable state is held on an object so the lifecycle hooks below can update it
// without reassigning top-level bindings.
const lifecycleState = {
  controller: new AbortController(),
  hasInitialized: false
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

  for (const callback of lifecycleCallbacks) {
    callback()
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

// Initial page load.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runLifecycleCallbacks, { once: true })
} else {
  runLifecycleCallbacks()
}

// Hotwired Turbo: drop the previous cycle's window/document listeners, then
// re-run initialisation against the freshly rendered <body>.
document.addEventListener('turbo:before-render', () => {
  lifecycleState.controller.abort()
  lifecycleState.controller = new AbortController()
  lifecycleState.hasInitialized = false
})

document.addEventListener('turbo:load', runLifecycleCallbacks)

/* ES2022 UTILITY FUNCTIONS */

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

/* SLIDE UP */
const slideUp = (target: HTMLElement, duration = 500) => {
  if (duration <= 1) {
    target.style.display = 'none'
    return
  }

  target.style.transitionProperty = 'height, margin, padding'
  target.style.transitionDuration = `${duration}ms`
  target.style.boxSizing = 'border-box'
  target.style.height = `${target.offsetHeight}px`
  target.style.overflow = 'hidden'

  globalThis.setTimeout(() => {
    target.style.height = '0'
    target.style.paddingTop = '0'
    target.style.paddingBottom = '0'
    target.style.marginTop = '0'
    target.style.marginBottom = '0'
  }, 1)

  globalThis.setTimeout(() => {
    target.style.display = 'none'
    target.style.removeProperty('height')
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')
  }, duration)
}

/* SLIDE DOWN */
const slideDown = (target: HTMLElement, duration = 500) => {
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

  globalThis.setTimeout(() => {
    target.style.boxSizing = 'border-box'
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = `${duration}ms`
    target.style.height = `${height}px`
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
  }, 1)

  globalThis.setTimeout(() => {
    target.style.removeProperty('height')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')
  }, duration)
}

/* TOGGLE */
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
  slideUp,
  slideDown,
  slideToggle,
  hasDataAttribute,
  getLastElement,
  safePropertyAccess
}
