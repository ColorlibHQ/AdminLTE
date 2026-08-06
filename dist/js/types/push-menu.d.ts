/**
 * ----------------------------------------------------------------------------
 * @file AdminLTE push-menu.ts
 * @description Push menu for AdminLTE.
 * @license MIT
 * ----------------------------------------------------------------------------
 */
import { BaseComponent } from './base-component';
/**
 * ----------------------------------------------------------------------------
 * Configuration Object Interface
 * - sidebarBreakpoint: The screen width (in pixels) below which the sidebar
 *   is considered to be on a "mobile" size and should be collapsed by default
 *   unless explicitly opened.
 * - enablePersistence: Whether to save the sidebar state (collapsed/open) in
 *   localStorage and restore it on page load.
 * ----------------------------------------------------------------------------
 */
type Config = {
    sidebarBreakpoint: number;
    enablePersistence: boolean;
};
/**
 * ----------------------------------------------------------------------------
 * Class Definition
 * ----------------------------------------------------------------------------
 */
declare class PushMenu extends BaseComponent {
    static get NAME(): string;
    /**
     * Look up the PushMenu already attached to the given element.
     *
     * @param element The sidebar element to look up.
     * @returns The existing instance, or null if the sidebar has none yet.
     */
    static getInstance(element: Element | null | undefined): PushMenu | null;
    /**
     * Look up the PushMenu attached to the given element, creating one when the
     * element has none. `config` is ignored if an instance already exists.
     *
     * @param element The sidebar element.
     * @param config Overrides merged over the defaults for a new instance.
     * @returns The existing or newly created instance.
     */
    static getOrCreateInstance(element: HTMLElement, config?: Partial<Config>): PushMenu;
    /**
     * The defaults merged with the overrides this instance was created with.
     */
    _config: Config;
    /**
     * @param element The sidebar element to attach to.
     * @param config Overrides merged over the defaults.
     */
    constructor(element: HTMLElement, config?: Partial<Config>);
    /**
     * Check if the sidebar is collapsed.
     *
     * @returns True if the sidebar is collapsed, false otherwise.
     */
    isCollapsed(): boolean;
    /**
     * Check if the sidebar is explicitly open on mobile sizes.
     *
     * @returns True if the sidebar is explicitly open, false otherwise.
     */
    isExplicitlyOpen(): boolean;
    /**
     * Check if the sidebar is in mini mode.
     *
     * @returns True if the sidebar is in mini mode, false otherwise.
     */
    isMiniMode(): boolean;
    /**
     * Check if the current screen size is considered "mobile" based on the
     * sidebarBreakpoint config value.
     *
     * @returns True if the screen size is mobile, false otherwise.
     */
    isMobileSize(): boolean;
    /**
     * Expand the sidebar menu.
     */
    expand(): void;
    /**
     * Collapse the sidebar menu.
     */
    collapse(): void;
    /**
     * Toggle the sidebar menu state.
     */
    toggle(): void;
    /**
     * Read the CSS breakpoint of the sidebar from the DOM and update the
     * sidebarBreakpoint config. This breakpoint is defined using a CSS ::before
     * pseudo element on the sidebar-expand element when @media queries are used
     * to change the sidebar behavior based on screen size.
     */
    setupSidebarBreakPoint(): void;
    /**
     * Update the sidebar state based on the current screen size and the
     * sidebarBreakpoint config value.
     */
    updateStateByResponsiveLogic(): void;
    /**
     * Save sidebar state to localStorage.
     *
     * @param state The state to save ('sidebar-open' or 'sidebar-collapse').
     */
    saveSidebarState(state: string): void;
    /**
     * Load sidebar state from localStorage.
     */
    loadSidebarState(): void;
    /**
     * Clear sidebar state from localStorage.
     */
    clearSidebarState(): void;
    /**
     * Initialize the push menu plugin and setup the initial sidebar state.
     */
    init(): void;
}
export default PushMenu;
