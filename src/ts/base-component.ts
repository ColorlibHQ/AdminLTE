/**
 * --------------------------------------------
 * @file AdminLTE base-component.ts
 * @description Shared component lifecycle for AdminLTE plugins: a per-element
 * instance registry (getInstance / getOrCreateInstance / dispose) and a
 * consistent custom-event contract, mirroring Bootstrap's component API.
 * @license MIT
 * --------------------------------------------
 */

/**
 * Component registry: element -> (data key -> component instance). A single
 * element can host several components at once, each stored under its own
 * DATA_KEY. WeakMap keys don't prevent garbage collection, so instances die
 * with their elements — important under Hotwired Turbo, which swaps the whole
 * <body> on navigation.
 */
const componentRegistry = new WeakMap<Element, Map<string, BaseComponent>>()

class BaseComponent {
  /**
   * Subclasses must override this getter to declare their own name.
   */
  static get NAME(): string {
    throw new Error('Component subclasses must override the static NAME getter.')
  }

  /**
   * Key this component is registered under: `lte.<name>`.
   */
  static get DATA_KEY(): string {
    return `lte.${this.NAME}`
  }

  /**
   * Untyped registry lookup. Every component exposes a typed wrapper
   * (e.g. CardWidget.getInstance()) built on top of this.
   *
   * @param element The element to look up.
   * @returns The instance for this component, or null if there is none.
   */
  protected static _getInstance(element: Element | null | undefined): BaseComponent | null {
    if (!element) {
      return null
    }

    return componentRegistry.get(element)?.get(this.DATA_KEY) ?? null
  }

  /**
   * The element this instance is attached to.
   */
  _element: HTMLElement

  /**
   * Attach a new instance to the given element and register it under the
   * subclass's DATA_KEY.
   *
   * @param element The element to attach this instance to.
   */
  constructor(element: HTMLElement) {
    this._element = element

    const instances = componentRegistry.get(element) ?? new Map<string, BaseComponent>()
    componentRegistry.set(element, instances)
    instances.set((this.constructor as typeof BaseComponent).DATA_KEY, this)
  }

  /**
   * Remove this instance from the registry so getInstance() no longer
   * returns it. Subclasses release their own resources, then call
   * super.dispose().
   */
  dispose(): void {
    const instances = componentRegistry.get(this._element)
    instances?.delete((this.constructor as typeof BaseComponent).DATA_KEY)

    // Drop the element's entry once it holds no components at all.
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
 * @param name The namespaced event name, e.g. `collapse.lte.push-menu`.
 * @param options `cancelable` opts the event into preventDefault(); `detail`
 *   is the payload handed to listeners.
 * @returns The dispatched event, after listeners have run.
 */
const dispatchCustomEvent = <T = undefined>(
  element: Element,
  name: string,
  options: { cancelable?: boolean; detail?: T } = {}
): CustomEvent<T | undefined> => {
  const event = new CustomEvent<T | undefined>(name, {
    bubbles: true,
    cancelable: options.cancelable ?? false,
    detail: options.detail
  })

  element.dispatchEvent(event)
  return event
}

export { BaseComponent, dispatchCustomEvent }
