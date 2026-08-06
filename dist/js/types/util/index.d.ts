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
/**
 * The AbortSignal for the current lifecycle. Pass it as the
 * `{ signal }` option to window/document `addEventListener` calls made during
 * initialisation so they are removed automatically on the next Turbo render.
 */
declare const getLifecycleSignal: () => AbortSignal;
declare const onDOMContentLoaded: (callback: () => void) => void;
/**
 * End the current lifecycle: abort the cycle's signal so listeners registered
 * with it are removed, then arm a fresh cycle for the next replay.
 *
 * Exported for SPA containers that unmount the AdminLTE layout: calling it
 * drops the window/document listeners the current cycle added without
 * immediately re-initialising. Internally it is also the first half of
 * `initialize()` and the `turbo:before-render` handler.
 */
declare const teardown: () => void;
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
declare const initialize: () => void;
/**
 * Check if an element has a specific data attribute using ES2022 Object.hasOwn()
 */
declare const hasDataAttribute: (element: HTMLElement, attribute: string) => boolean;
/**
 * Get the last element from a NodeList using ES2022 Array.at()
 */
declare const getLastElement: <T extends Element>(elements: NodeListOf<T> | T[]) => T | undefined;
/**
 * Safe property access with better error handling
 */
declare const safePropertyAccess: (obj: Record<string, unknown>, property: string) => unknown;
declare const slideUp: (target: HTMLElement, duration?: number) => void;
declare const slideDown: (target: HTMLElement, duration?: number) => void;
declare const slideToggle: (target: HTMLElement, duration?: number) => void;
export { onDOMContentLoaded, getLifecycleSignal, initialize, teardown, slideUp, slideDown, slideToggle, hasDataAttribute, getLastElement, safePropertyAccess };
