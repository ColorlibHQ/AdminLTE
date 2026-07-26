/**
 * ----------------------------------------------------------------------------
 * @file AdminLTE base-component.ts
 * @description Shared component lifecycle for AdminLTE plugins: a per-element
 * instance registry (getInstance / getOrCreateInstance / dispose) and a
 * consistent custom-event contract, mirroring Bootstrap's component API.
 * @license MIT
 * ----------------------------------------------------------------------------
 */

/**
 * Component registry:
 * A WeakMap of elements to store component instances. Each element can have
 * multiple component instances associated with it, keyed by the component's
 * DATA_KEY: element -> (data key -> component instance).
 * The WeakMap keys don't prevent garbage collection, so instances die with
 * their elements, this is important under Hotwired Turbo, which swaps the
 * whole <body> on navigation.
 */
const componentRegistry = new WeakMap<Element, Map<string, BaseComponent>>()

/**
 * ----------------------------------------------------------------------------
 * Class Definition
 * ----------------------------------------------------------------------------
 */

class BaseComponent {
  /**
   * Get the component name. Subclasses must override this getter to provide
   * their own name.
   *
   * @returns The component name.
   */
  static get NAME(): string {
    throw new Error('Component subclasses must override the NAME getter.')
  }

  /**
   * Get the component's data key.
   *
   * @returns The component's data key.
   */
  static get DATA_KEY(): string {
    return `lte.${this.NAME}`
  }

  /**
   * Get the component instance associated with the given element, if any.
   * Untyped registry lookup. Every component exposes a typed wrapper
   * (e.g. CardWidget.getInstance()) built on top of this.
   *
   * @param element The element to look up.
   * @returns The component instance, or null if none.
   */
  protected static _getInstance(
    element: Element | null | undefined
  ): BaseComponent | null {
    if (!element) {
      return null
    }

    return componentRegistry.get(element)?.get(this.DATA_KEY) ?? null
  }

  /**
   * The element this component instance is associated with.
   */
  _element: HTMLElement

  /**
   * Create a new component instance associated with the given element.
   *
   * @param element The element to associate with this instance.
   */
  constructor(element: HTMLElement) {
    this._element = element

    // Get or create the map of component instances for this element.

    const instances = componentRegistry.get(element) ?? new Map<string, BaseComponent>()

    // Store this instance in the map, keyed by the component's data key.

    componentRegistry.set(element, instances)
    instances.set((this.constructor as typeof BaseComponent).DATA_KEY, this)
  }

  /**
   * Remove this instance from the registry so getInstance() no longer
   * returns it. Subclasses release their own resources, then should call
   * super.dispose().
   */
  dispose(): void {
    // Remove this instance from the registry so getInstance() no longer
    // returns it.

    const instances = componentRegistry.get(this._element)
    instances?.delete((this.constructor as typeof BaseComponent).DATA_KEY)

    // If this was the last instance for this element, remove the element from
    // the registry entirely.

    if (instances?.size === 0) {
      componentRegistry.delete(this._element)
    }
  }
}

/**
 * Dispatch a namespaced custom event that bubbles — so applications can
 * listen once on `document` — and can optionally carry a payload or be
 * canceled. Returns the event so callers can check `defaultPrevented`.
 *
 * @param element The element to dispatch the event on.
 * @param name The event name.
 * @param options Optional event options: `cancelable` and `detail`.
 * @returns The dispatched CustomEvent.
 */
const dispatchCustomEvent = <T = undefined>(
  element: Element,
  name: string,
  options: { cancelable?: boolean; detail?: T } = {}
): CustomEvent<T | undefined> => {
  // Create a custom event with the given name and options. The event bubbles
  // and can be canceled.

  const event = new CustomEvent<T | undefined>(name, {
    bubbles: true,
    cancelable: options.cancelable ?? false,
    detail: options.detail
  })

  // Dispatch the event on the given element.

  element.dispatchEvent(event)
  return event
}

/**
 * ----------------------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------------------
 */

export { BaseComponent, dispatchCustomEvent }
