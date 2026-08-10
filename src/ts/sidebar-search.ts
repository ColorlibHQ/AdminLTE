/**
 * --------------------------------------------
 * @file AdminLTE sidebar-search.ts
 * @description Live filter for the sidebar menu.
 * @license MIT
 * --------------------------------------------
 */

import { BaseComponent, dispatchCustomEvent } from './base-component'
import { onDOMContentLoaded } from './util/index'

/**
 * Constants
 * ============================================================================
 */
const NAME = 'sidebar-search'
const EVENT_KEY = `.lte.${NAME}`
const EVENT_FILTERED = `filtered${EVENT_KEY}`

const CLASS_NAME_MENU_OPEN = 'menu-open'

const SELECTOR_DATA_TOGGLE = '[data-lte-toggle="sidebar-search"]'
const SELECTOR_SIDEBAR = '.app-sidebar'
const SELECTOR_MENU = '.sidebar-menu'
const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_NAV_HEADER = '.nav-header'
const SELECTOR_NAV_LINK = ':scope > .nav-link'
const SELECTOR_TREEVIEW_MENU = ':scope > .nav-treeview'
const SELECTOR_EMPTY_STATE = '[data-lte-search-empty]'

/**
 * A submenu's resting state, captured before the first keystroke so clearing
 * the field can put the menu back exactly as the user left it. The inline
 * `display` matters as well as the class: Treeview's slide animation writes
 * one, and it would otherwise win over `.menu-open > .nav-treeview`.
 */
type SubmenuState = {
  open: boolean;
  display: string;
}

const submenuOf = (item: HTMLElement): HTMLElement | null =>
  item.querySelector<HTMLElement>(SELECTOR_TREEVIEW_MENU)

const setOpen = (item: HTMLElement, submenu: HTMLElement, open: boolean, display: string): void => {
  item.classList.toggle(CLASS_NAME_MENU_OPEN, open)
  item.querySelector(SELECTOR_NAV_LINK)?.setAttribute('aria-expanded', String(open))
  submenu.style.display = display
}

/**
 * Class Definition
 * ============================================================================
 */
class SidebarSearch extends BaseComponent {
  static get NAME(): string {
    return NAME
  }

  static getInstance(element: Element | null | undefined): SidebarSearch | null {
    return this._getInstance(element) as SidebarSearch | null
  }

  static getOrCreateInstance(element: HTMLElement): SidebarSearch {
    return this.getInstance(element) ?? new this(element)
  }

  _menu: HTMLElement | null
  _emptyState: HTMLElement | null
  _snapshot: Map<HTMLElement, SubmenuState> | null = null

  constructor(element: HTMLElement) {
    super(element)

    // `data-lte-target` names the menu explicitly; without it, the nearest
    // sidebar's menu is used, which covers the single-sidebar default.
    const target = element.dataset.lteTarget
    const scope = element.closest(SELECTOR_SIDEBAR) ?? document

    this._menu = target ?
      document.querySelector<HTMLElement>(target) :
      scope.querySelector<HTMLElement>(SELECTOR_MENU)
    this._emptyState = scope.querySelector<HTMLElement>(SELECTOR_EMPTY_STATE)
  }

  /**
   * Show only the menu entries matching `term`, expanding whatever has to be
   * expanded to reveal them. An empty term restores the menu.
   *
   * @param term The text to match against nav-link labels, case-insensitively.
   */
  search(term: string): void {
    const menu = this._menu

    if (!menu) {
      return
    }

    const query = term.trim().toLowerCase()

    if (!query) {
      this.clear()
      return
    }

    this._snapshot ??= this._takeSnapshot(menu)

    const items = [...menu.querySelectorAll<HTMLElement>(SELECTOR_NAV_ITEM)]
    const matched = new Set<HTMLElement>()

    for (const item of items) {
      const label = item.querySelector(SELECTOR_NAV_LINK)?.textContent?.replace(/\s+/g, ' ').trim().toLowerCase()

      if (label?.includes(query)) {
        matched.add(item)
      }
    }

    // Deepest-first, so by the time a parent is reached its children have
    // already been hidden or kept and it can simply look for a survivor.
    for (let index = items.length - 1; index >= 0; index--) {
      const item = items[index]
      item.hidden = !(matched.has(item) || item.querySelector(`${SELECTOR_NAV_ITEM}:not([hidden])`))
    }

    // A group whose own name matched keeps its whole subtree — otherwise
    // expanding it would lead to an empty list.
    for (const item of matched) {
      for (const descendant of item.querySelectorAll<HTMLElement>(SELECTOR_NAV_ITEM)) {
        descendant.hidden = false
      }
    }

    let visible = 0

    for (const item of items) {
      if (!item.hidden) {
        visible++
      }

      const submenu = submenuOf(item)

      if (submenu) {
        const expand = !item.hidden && Boolean(item.querySelector(`${SELECTOR_NAV_ITEM}:not([hidden])`))
        setOpen(item, submenu, expand, expand ? 'block' : 'none')
      }
    }

    // Section headings label groups that are no longer all present.
    for (const header of menu.querySelectorAll<HTMLElement>(SELECTOR_NAV_HEADER)) {
      header.hidden = true
    }

    if (this._emptyState) {
      this._emptyState.hidden = visible > 0
    }

    dispatchCustomEvent(this._element, EVENT_FILTERED, { detail: { query, matches: visible } })
  }

  /**
   * Drop the filter: every entry becomes visible again and each submenu goes
   * back to the open/closed state it had before the search started.
   */
  clear(): void {
    const menu = this._menu

    if (!menu) {
      return
    }

    for (const item of menu.querySelectorAll<HTMLElement>(`${SELECTOR_NAV_ITEM}, ${SELECTOR_NAV_HEADER}`)) {
      item.hidden = false
    }

    if (this._snapshot) {
      for (const [item, state] of this._snapshot) {
        const submenu = submenuOf(item)

        if (submenu) {
          setOpen(item, submenu, state.open, state.display)
        }
      }

      this._snapshot = null
    }

    if (this._emptyState) {
      this._emptyState.hidden = true
    }

    dispatchCustomEvent(this._element, EVENT_FILTERED, { detail: { query: '', matches: -1 } })
  }

  dispose(): void {
    this.clear()
    super.dispose()
  }

  _takeSnapshot(menu: HTMLElement): Map<HTMLElement, SubmenuState> {
    const snapshot = new Map<HTMLElement, SubmenuState>()

    for (const item of menu.querySelectorAll<HTMLElement>(SELECTOR_NAV_ITEM)) {
      const submenu = submenuOf(item)

      if (submenu) {
        snapshot.set(item, {
          open: item.classList.contains(CLASS_NAME_MENU_OPEN),
          display: submenu.style.display
        })
      }
    }

    return snapshot
  }
}

/**
 * Data Api implementation
 * ============================================================================
 * Both listeners are delegated on `document`, so a sidebar rendered after load
 * (Turbo Frame, client-side router) needs no re-initialisation.
 */

document.addEventListener('input', event => {
  const target = event.target

  if (target instanceof HTMLInputElement && target.matches(SELECTOR_DATA_TOGGLE)) {
    SidebarSearch.getOrCreateInstance(target).search(target.value)
  }
})

document.addEventListener('keydown', event => {
  const target = event.target

  if (event.key === 'Escape' && target instanceof HTMLInputElement && target.matches(SELECTOR_DATA_TOGGLE)) {
    target.value = ''
    SidebarSearch.getOrCreateInstance(target).clear()
  }
})

// A field restored with a value by the browser (bfcache, back navigation)
// should show its filtered menu rather than a menu that disagrees with it.
onDOMContentLoaded(() => {
  document.querySelectorAll<HTMLInputElement>(SELECTOR_DATA_TOGGLE).forEach(input => {
    if (input.value) {
      SidebarSearch.getOrCreateInstance(input).search(input.value)
    }
  })
})

export default SidebarSearch
