/**
 * --------------------------------------------
 * @file AdminLTE base-component.ts
 * @description Shared component lifecycle for AdminLTE plugins: a per-element
 * instance registry (getInstance / getOrCreateInstance / dispose) and a
 * consistent custom-event contract, mirroring Bootstrap's component API.
 * @license MIT
 * --------------------------------------------
 */
declare class BaseComponent {
    /**
     * Subclasses must override this getter to declare their own name.
     */
    static get NAME(): string;
    /**
     * Key this component is registered under: `lte.<name>`.
     */
    static get DATA_KEY(): string;
    /**
     * Untyped registry lookup. Every component exposes a typed wrapper
     * (e.g. CardWidget.getInstance()) built on top of this.
     *
     * @param element The element to look up.
     * @returns The instance for this component, or null if there is none.
     */
    protected static _getInstance(element: Element | null | undefined): BaseComponent | null;
    /**
     * The element this instance is attached to.
     */
    _element: HTMLElement;
    /**
     * Attach a new instance to the given element and register it under the
     * subclass's DATA_KEY.
     *
     * @param element The element to attach this instance to.
     */
    constructor(element: HTMLElement);
    /**
     * Remove this instance from the registry so getInstance() no longer
     * returns it. Subclasses release their own resources, then call
     * super.dispose().
     */
    dispose(): void;
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
declare const dispatchCustomEvent: <T = undefined>(element: Element, name: string, options?: {
    cancelable?: boolean;
    detail?: T;
}) => CustomEvent<T | undefined>;
export { BaseComponent, dispatchCustomEvent };
