/**
 * --------------------------------------------
 * @file AdminLTE sidebar-search.ts
 * @description Live filter for the sidebar menu.
 * @license MIT
 * --------------------------------------------
 */
import { BaseComponent } from './base-component';
/**
 * A submenu's resting state, captured before the first keystroke so clearing
 * the field can put the menu back exactly as the user left it. The inline
 * `display` matters as well as the class: Treeview's slide animation writes
 * one, and it would otherwise win over `.menu-open > .nav-treeview`.
 */
type SubmenuState = {
    open: boolean;
    display: string;
};
/**
 * Class Definition
 * ============================================================================
 */
declare class SidebarSearch extends BaseComponent {
    static get NAME(): string;
    static getInstance(element: Element | null | undefined): SidebarSearch | null;
    static getOrCreateInstance(element: HTMLElement): SidebarSearch;
    _menu: HTMLElement | null;
    _emptyState: HTMLElement | null;
    _snapshot: Map<HTMLElement, SubmenuState> | null;
    constructor(element: HTMLElement);
    /**
     * Show only the menu entries matching `term`, expanding whatever has to be
     * expanded to reveal them. An empty term restores the menu.
     *
     * @param term The text to match against nav-link labels, case-insensitively.
     */
    search(term: string): void;
    /**
     * Drop the filter: every entry becomes visible again and each submenu goes
     * back to the open/closed state it had before the search started.
     */
    clear(): void;
    dispose(): void;
    _takeSnapshot(menu: HTMLElement): Map<HTMLElement, SubmenuState>;
}
export default SidebarSearch;
