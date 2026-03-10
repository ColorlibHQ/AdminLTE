/**
 * ----------------------------------------------------------------------------
 * @file AdminLTE push-menu.ts
 * @description Push menu for AdminLTE.
 * @license MIT
 * ----------------------------------------------------------------------------
 */

import {
  onDOMContentLoaded
} from './util/index'

/**
 * ----------------------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------------------
 */

const DATA_KEY = 'lte.push-menu'
const EVENT_KEY = `.${DATA_KEY}`
const EVENT_OPEN = `open${EVENT_KEY}`
const EVENT_COLLAPSE = `collapse${EVENT_KEY}`

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
  sidebarBreakpoint: 992,
  enablePersistence: false
}

/**
 * ----------------------------------------------------------------------------
 * Class Definition
 * ----------------------------------------------------------------------------
 */

class PushMenu {
  _element: HTMLElement
  _config: Config

  constructor(element: HTMLElement, config: Config) {
    this._element = element
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
    document.body.classList.remove(CLASS_NAME_SIDEBAR_COLLAPSE)

    if (this.isMobileSize()) {
      document.body.classList.add(CLASS_NAME_SIDEBAR_OPEN)
    }

    this._element.dispatchEvent(new Event(EVENT_OPEN))
  }

  /**
   * Collapse the sidebar menu.
   */
  collapse(): void {
    document.body.classList.remove(CLASS_NAME_SIDEBAR_OPEN)
    document.body.classList.add(CLASS_NAME_SIDEBAR_COLLAPSE)

    this._element.dispatchEvent(new Event(EVENT_COLLAPSE))
  }

  /**
   * Toggle the sidebar menu state.
   */
  toggle(): void {
    const isCollapsed = this.isCollapsed()

    if (isCollapsed) {
      this.expand()
    } else {
      this.collapse()
    }

    if (this._config.enablePersistence) {
      this.saveSidebarState(
        isCollapsed ? CLASS_NAME_SIDEBAR_OPEN : CLASS_NAME_SIDEBAR_COLLAPSE
      )
    }
  }

  /**
   * Read the CSS breakpoint of the sidebar from the DOM and update the
   * sidebarBreakpoint config.
   */
  setupSidebarBreakPoint(): void {
    const sidebarExpand = document.querySelector(SELECTOR_SIDEBAR_EXPAND)

    if (!sidebarExpand) {
      return
    }

    const content = globalThis.getComputedStyle(sidebarExpand, '::before')
      .getPropertyValue('content')

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
      if (!this.isExplicitlyOpen()) {
        this.collapse()
      }
    } else {
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
    if (globalThis.localStorage === undefined) {
      return
    }

    try {
      localStorage.setItem(STORAGE_KEY_SIDEBAR_STATE, state)
    } catch {
      // localStorage may be unavailable (private browsing, quota exceeded, etc.)
    }
  }

  /**
   * Load sidebar state from localStorage.
   */
  loadSidebarState(): void {
    if (globalThis.localStorage === undefined) {
      return
    }

    try {
      const storedState = localStorage.getItem(STORAGE_KEY_SIDEBAR_STATE)

      if (storedState === CLASS_NAME_SIDEBAR_COLLAPSE) {
        this.collapse()
      } else if (storedState === CLASS_NAME_SIDEBAR_OPEN) {
        this.expand()
      } else {
        this.updateStateByResponsiveLogic()
      }
    } catch {
      this.updateStateByResponsiveLogic()
    }
  }

  /**
   * Clear sidebar state from localStorage.
   */
  clearSidebarState(): void {
    if (globalThis.localStorage === undefined) {
      return
    }

    try {
      localStorage.removeItem(STORAGE_KEY_SIDEBAR_STATE)
    } catch {
      // localStorage may be unavailable
    }
  }

  /**
   * Initialize the push menu plugin and setup the initial sidebar state.
   */
  init(): void {
    this.setupSidebarBreakPoint()

    if (!this._config.enablePersistence) {
      this.clearSidebarState()
    }

    if (this._config.enablePersistence && !this.isMobileSize()) {
      this.loadSidebarState()
    } else {
      this.updateStateByResponsiveLogic()
    }
  }
}

/**
 * ----------------------------------------------------------------------------
 * Data Api implementation
 * ----------------------------------------------------------------------------
 */

onDOMContentLoaded(() => {
  const sidebar = document?.querySelector(SELECTOR_APP_SIDEBAR) as HTMLElement | undefined

  if (!sidebar) {
    return
  }

  // Read config from data attributes on the sidebar element.

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

  // Initialize the PushMenu plugin (a unique instance).

  const pushMenu = new PushMenu(sidebar, config)
  pushMenu.init()

  // Update the sidebar state on window resize events.

  window.addEventListener('resize', () => {
    pushMenu.setupSidebarBreakPoint()
    pushMenu.updateStateByResponsiveLogic()
  })

  // Create the sidebar overlay element and append it to the app wrapper.

  const sidebarOverlay = document.createElement('div')
  sidebarOverlay.className = CLASS_NAME_SIDEBAR_OVERLAY
  document.querySelector(SELECTOR_APP_WRAPPER)?.append(sidebarOverlay)

  // Handle touch events on overlay.

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

  // Handle click events on sidebar toggle buttons.

  const fullBtn = document.querySelectorAll(SELECTOR_SIDEBAR_TOGGLE)

  fullBtn.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault()

      let button = event.currentTarget as HTMLElement | undefined

      if (button?.dataset.lteToggle !== 'sidebar') {
        button = button?.closest(SELECTOR_SIDEBAR_TOGGLE) as HTMLElement | undefined
      }

      if (button) {
        event?.preventDefault()
        pushMenu.toggle()
      }
    })
  })
})

export default PushMenu
