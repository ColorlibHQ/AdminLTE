/**
 * ----------------------------------------------------------------------------
 * @file AdminLTE push-menu.ts
 * @description Push menu for AdminLTE.
 * @license MIT
 * ----------------------------------------------------------------------------
 */

import { BaseComponent, dispatchCustomEvent } from './base-component'
import {
  getLifecycleSignal,
  onDOMContentLoaded
} from './util/index'

/**
 * ----------------------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------------------
 */

const NAME = 'push-menu'
const EVENT_KEY = `.lte.${NAME}`

// Cancelable "before" events: preventDefault() aborts the state change.
const EVENT_OPEN = `open${EVENT_KEY}`
const EVENT_COLLAPSE = `collapse${EVENT_KEY}`

// "After" events, dispatched once the classes have been applied.
const EVENT_OPENED = `opened${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`

const CLASS_NAME_SIDEBAR_MINI = 'sidebar-mini'
const CLASS_NAME_SIDEBAR_EXPAND = 'sidebar-expand'
const CLASS_NAME_SIDEBAR_OVERLAY = 'sidebar-overlay'

// Classes used to explicitly indicate the sidebar state.
// - sidebar-collapse: Indicates the sidebar is explicitly collapsed.
// - sidebar-open: Indicates the sidebar is explicitly open on mobile sizes.
const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse'
const CLASS_NAME_SIDEBAR_OPEN = 'sidebar-open'

const SELECTOR_APP_SIDEBAR = '.app-sidebar'
const SELECTOR_APP_WRAPPER = '.app-wrapper'
const SELECTOR_SIDEBAR_EXPAND = `[class*="${CLASS_NAME_SIDEBAR_EXPAND}"]`
const SELECTOR_SIDEBAR_TOGGLE = '[data-lte-toggle="sidebar"]'

const STORAGE_KEY_SIDEBAR_STATE = 'lte.sidebar.state'

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
}

const Defaults: Config = {
  // Matches the CSS convention (breakpoint-max = breakpoint - .02) so that a
  // window of exactly 992px is classified as desktop by both JS and CSS.
  sidebarBreakpoint: 991.98,
  enablePersistence: false
}

/**
 * ----------------------------------------------------------------------------
 * Class Definition
 * ----------------------------------------------------------------------------
 */

class PushMenu extends BaseComponent {
  static get NAME(): string {
    return NAME
  }

  static getInstance(element: Element | null | undefined): PushMenu | null {
    return this._getInstance(element) as PushMenu | null
  }

  static getOrCreateInstance(element: HTMLElement, config: Partial<Config> = {}): PushMenu {
    return this.getInstance(element) ?? new this(element, config)
  }

  _config: Config

  constructor(element: HTMLElement, config: Partial<Config> = {}) {
    super(element)
    this._config = { ...Defaults, ...config }
  }

  /**
   * Check if the sidebar is collapsed.
   *
   * @returns True if the sidebar is collapsed, false otherwise.
   */
  isCollapsed(): boolean {
    return document.body.classList.contains(CLASS_NAME_SIDEBAR_COLLAPSE)
  }

  /**
   * Check if the sidebar is explicitly open on mobile sizes.
   *
   * @returns True if the sidebar is explicitly open, false otherwise.
   */
  isExplicitlyOpen(): boolean {
    return document.body.classList.contains(CLASS_NAME_SIDEBAR_OPEN)
  }

  /**
   * Check if the sidebar is in mini mode.
   *
   * @returns True if the sidebar is in mini mode, false otherwise.
   */
  isMiniMode(): boolean {
    return document.body.classList.contains(CLASS_NAME_SIDEBAR_MINI)
  }

  /**
   * Check if the current screen size is considered "mobile" based on the
   * sidebarBreakpoint config value.
   *
   * @returns True if the screen size is mobile, false otherwise.
   */
  isMobileSize(): boolean {
    return globalThis.innerWidth <= this._config.sidebarBreakpoint
  }

  /**
   * Expand the sidebar menu.
   */
  expand(): void {
    // The "open" event is cancelable: preventDefault() keeps the sidebar
    // in its current state.
    if (dispatchCustomEvent(this._element, EVENT_OPEN, { cancelable: true }).defaultPrevented) {
      return
    }

    // Remove the sidebar-collapse class. Only on mobile, add the sidebar-open
    // class to indicate the sidebar is explicitly open.

    document.body.classList.remove(CLASS_NAME_SIDEBAR_COLLAPSE)

    if (this.isMobileSize()) {
      document.body.classList.add(CLASS_NAME_SIDEBAR_OPEN)
    }

    dispatchCustomEvent(this._element, EVENT_OPENED)
  }

  /**
   * Collapse the sidebar menu.
   */
  collapse(): void {
    if (dispatchCustomEvent(this._element, EVENT_COLLAPSE, { cancelable: true }).defaultPrevented) {
      return
    }

    // Remove the sidebar-open class (if present), and add the sidebar-collapse
    // class.

    document.body.classList.remove(CLASS_NAME_SIDEBAR_OPEN)
    document.body.classList.add(CLASS_NAME_SIDEBAR_COLLAPSE)

    dispatchCustomEvent(this._element, EVENT_COLLAPSED)
  }

  /**
   * Toggle the sidebar menu state.
   */
  toggle(): void {
    // Toggle the sidebar state.

    const isCollapsed = this.isCollapsed()

    if (isCollapsed) {
      this.expand()
    } else {
      this.collapse()
    }

    // If persistence is enabled, save the new state to localStorage.

    if (this._config.enablePersistence) {
      this.saveSidebarState(
        isCollapsed ? CLASS_NAME_SIDEBAR_OPEN : CLASS_NAME_SIDEBAR_COLLAPSE
      )
    }
  }

  /**
   * Read the CSS breakpoint of the sidebar from the DOM and update the
   * sidebarBreakpoint config. This breakpoint is defined using a CSS ::before
   * pseudo element on the sidebar-expand element when @media queries are used
   * to change the sidebar behavior based on screen size.
   */
  setupSidebarBreakPoint(): void {
    // Find the sidebar-expand element in the DOM.

    const sidebarExpand = document.querySelector(SELECTOR_SIDEBAR_EXPAND)

    if (!sidebarExpand) {
      return
    }

    // Read the content property of the ::before pseudo element to get the
    // breakpoint value.

    const content = globalThis.getComputedStyle(sidebarExpand, '::before')
      .getPropertyValue('content')

    // Update the config.sidebarBreakpoint value by extracting the numeric
    // value from the content string.

    if (!content || content === 'none') {
      return
    }

    const breakpointValue = Number(content.replace(/[^\d.-]/g, ''))

    if (Number.isNaN(breakpointValue)) {
      return
    }

    this._config = { ...this._config, sidebarBreakpoint: breakpointValue }
  }

  /**
   * Update the sidebar state based on the current screen size and the
   * sidebarBreakpoint config value.
   */
  updateStateByResponsiveLogic(): void {
    if (this.isMobileSize()) {
      // On mobile sizes, keep the sidebar collapsed unless explicitly opened
      // by the user to prevent unintended collapse on scroll or resize events.

      if (!this.isExplicitlyOpen()) {
        this.collapse()
      }
    } else {
      // On big screen sizes, keep the sidebar expanded unless in mini mode and
      // explicitly collapsed.

      if (!(this.isMiniMode() && this.isCollapsed())) {
        this.expand()
      }
    }
  }

  /**
   * Save sidebar state to localStorage.
   *
   * @param state The state to save ('sidebar-open' or 'sidebar-collapse').
   */
  saveSidebarState(state: string): void {
    // Check for localStorage availability (not a SSR environment).

    if (globalThis.localStorage === undefined) {
      return
    }

    // Save the sidebar state to local storage.

    try {
      localStorage.setItem(STORAGE_KEY_SIDEBAR_STATE, state)
    } catch {
      // The localStorage may be unavailable (private browsing, quota exceeded,
      // etc.). Fail silently in these cases.
    }
  }

  /**
   * Load sidebar state from localStorage.
   */
  loadSidebarState(): void {
    // Check for localStorage availability (not a SSR environment).

    if (globalThis.localStorage === undefined) {
      return
    }

    // Load the sidebar state from local storage.

    try {
      const storedState = localStorage.getItem(STORAGE_KEY_SIDEBAR_STATE)

      if (storedState === CLASS_NAME_SIDEBAR_COLLAPSE) {
        this.collapse()
      } else if (storedState === CLASS_NAME_SIDEBAR_OPEN) {
        this.expand()
      } else {
        // If null (never saved), let the responsive logic apply.
        this.updateStateByResponsiveLogic()
      }
    } catch {
      // The localStorage may be unavailable. Let the responsive logic apply.
      this.updateStateByResponsiveLogic()
    }
  }

  /**
   * Clear sidebar state from localStorage.
   */
  clearSidebarState(): void {
    // Check for localStorage availability (not a SSR environment).

    if (globalThis.localStorage === undefined) {
      return
    }

    // Clear the sidebar state from local storage.

    try {
      localStorage.removeItem(STORAGE_KEY_SIDEBAR_STATE)
    } catch {
      // The localStorage may be unavailable. Fail silently in these cases.
    }
  }

  /**
   * Initialize the push menu plugin and setup the initial sidebar state.
   */
  init(): void {
    // Read and setup the sidebar breakpoint from the DOM. This breakpoint is
    // used to determine when the sidebar should be considered "mobile" vs
    // "desktop".

    this.setupSidebarBreakPoint()

    // When persistence is not enabled, clear any saved state, just for safety.

    if (!this._config.enablePersistence) {
      this.clearSidebarState()
    }

    // When persistence is enabled and screen size is above the breakpoint, load
    // the saved sidebar state from local storage. Otherwise, use responsive
    // logic to set the initial state (unless explicitly set as collapsed at
    // initialization).

    if (this._config.enablePersistence && !this.isMobileSize()) {
      this.loadSidebarState()
    } else if (!this.isCollapsed()) {
      this.updateStateByResponsiveLogic()
    }
  }
}

/**
 * ----------------------------------------------------------------------------
 * Data Api implementation
 * ----------------------------------------------------------------------------
 * Toggle clicks are handled by one delegated listener on `document`, so
 * toggle buttons added later work and the listener survives Turbo's <body>
 * swaps. The instance itself is created per page load below and can be
 * retrieved anywhere with:
 *
 *   PushMenu.getInstance(document.querySelector('.app-sidebar'))
 */

document.addEventListener('click', event => {
  const target = event.target

  if (!(target instanceof Element)) {
    return
  }

  const button = target.closest(SELECTOR_SIDEBAR_TOGGLE)

  if (!button) {
    return
  }

  event.preventDefault()

  const sidebar = document.querySelector(SELECTOR_APP_SIDEBAR) as HTMLElement | null

  if (sidebar) {
    PushMenu.getOrCreateInstance(sidebar).toggle()
  }
})

onDOMContentLoaded(() => {
  // Find the sidebar element in the DOM.

  const sidebar = document.querySelector(SELECTOR_APP_SIDEBAR) as HTMLElement | null

  if (!sidebar) {
    return
  }

  // Read config from data attributes on the sidebar element, falling back to
  // Defaults if not present.

  const sidebarBreakpointAttr = sidebar.dataset.sidebarBreakpoint
  const enablePersistenceAttr = sidebar.dataset.enablePersistence

  const config: Config = {
    sidebarBreakpoint: sidebarBreakpointAttr === undefined ?
      Defaults.sidebarBreakpoint :
      Number(sidebarBreakpointAttr),
    enablePersistence: enablePersistenceAttr === undefined ?
      Defaults.enablePersistence :
      enablePersistenceAttr === 'true'
  }

  // Initialize the PushMenu plugin (a unique instance per sidebar element;
  // Turbo navigations swap in a fresh element, so a fresh instance is
  // created and the old one is garbage-collected with the old <body>).

  const pushMenu = PushMenu.getOrCreateInstance(sidebar, config)
  pushMenu.init()

  // Update the sidebar state only when the viewport crosses the sidebar
  // breakpoint. matchMedia fires exactly on crossings, so height-only resizes
  // (mobile URL bar / keyboard show-hide) and same-side width changes never
  // disturb a sidebar state the user chose. init() has already read the
  // effective breakpoint from the CSS, so the query uses the final value.

  const breakpointQuery = globalThis.matchMedia(`(max-width: ${pushMenu._config.sidebarBreakpoint}px)`)

  breakpointQuery.addEventListener('change', () => {
    pushMenu.updateStateByResponsiveLogic()
  }, { signal: getLifecycleSignal() })

  // Create the sidebar overlay element and append it to the app wrapper.
  // Reuse an existing overlay if present: Turbo restores cached <body>
  // snapshots that already contain the injected node (listeners are gone
  // after the restore — the snapshot is a clone — so they are rebound below).

  const appWrapper = document.querySelector(SELECTOR_APP_WRAPPER)
  let sidebarOverlay = appWrapper?.querySelector(`:scope > .${CLASS_NAME_SIDEBAR_OVERLAY}`) as HTMLElement | null

  if (!sidebarOverlay) {
    sidebarOverlay = document.createElement('div')
    sidebarOverlay.className = CLASS_NAME_SIDEBAR_OVERLAY
    appWrapper?.append(sidebarOverlay)
  }

  // Handle touch events on overlay (area outside sidebar), usually we want to
  // close the sidebar when the user taps outside the sidebar on mobile
  // devices.

  let overlayTouchMoved = false

  sidebarOverlay.addEventListener('touchstart', () => {
    overlayTouchMoved = false
  }, { passive: true })

  sidebarOverlay.addEventListener('touchmove', () => {
    overlayTouchMoved = true
  }, { passive: true })

  sidebarOverlay.addEventListener('touchend', event => {
    if (!overlayTouchMoved) {
      event.preventDefault()
      pushMenu.collapse()
    }

    overlayTouchMoved = false
  }, { passive: false })

  sidebarOverlay.addEventListener('click', event => {
    event.preventDefault()
    pushMenu.collapse()
  })
})

export default PushMenu
