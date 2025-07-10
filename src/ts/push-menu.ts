/**
 * --------------------------------------------
 * @file AdminLTE push-menu.ts
 * @description Push menu for AdminLTE.
 * @license MIT
 * --------------------------------------------
 */

import {
  onDOMContentLoaded
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const DATA_KEY = 'lte.push-menu'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_OPEN = `open${EVENT_KEY}`
const EVENT_COLLAPSE = `collapse${EVENT_KEY}`

const CLASS_NAME_SIDEBAR_MINI = 'sidebar-mini'
const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse'
const CLASS_NAME_SIDEBAR_OPEN = 'sidebar-open'
const CLASS_NAME_SIDEBAR_EXPAND = 'sidebar-expand'
const CLASS_NAME_SIDEBAR_OVERLAY = 'sidebar-overlay'
const CLASS_NAME_MENU_OPEN = 'menu-open'

const SELECTOR_APP_SIDEBAR = '.app-sidebar'
const SELECTOR_SIDEBAR_MENU = '.sidebar-menu'
const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_NAV_TREEVIEW = '.nav-treeview'
const SELECTOR_APP_WRAPPER = '.app-wrapper'
const SELECTOR_SIDEBAR_EXPAND = `[class*="${CLASS_NAME_SIDEBAR_EXPAND}"]`
const SELECTOR_SIDEBAR_TOGGLE = '[data-lte-toggle="sidebar"]'

type Config = {
  sidebarBreakpoint: number;
}

const Defaults = {
  sidebarBreakpoint: 992
}

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  _element: HTMLElement
  _config: Config

  constructor(element: HTMLElement, config: Config) {
    this._element = element
    this._config = { ...Defaults, ...config }
  }

  menusClose() {
    const navTreeview = document.querySelectorAll<HTMLElement>(SELECTOR_NAV_TREEVIEW)

    navTreeview.forEach(navTree => {
      navTree.style.removeProperty('display')
      navTree.style.removeProperty('height')
    })

    const navSidebar = document.querySelector(SELECTOR_SIDEBAR_MENU)
    const navItem = navSidebar?.querySelectorAll(SELECTOR_NAV_ITEM)

    if (navItem) {
      navItem.forEach(navI => {
        navI.classList.remove(CLASS_NAME_MENU_OPEN)
      })
    }
  }

  expand() {
    const event = new Event(EVENT_OPEN)

    document.body.classList.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
    document.body.classList.add(CLASS_NAME_SIDEBAR_OPEN)

    this._element.dispatchEvent(event)
  }

  collapse() {
    const event = new Event(EVENT_COLLAPSE)

    document.body.classList.remove(CLASS_NAME_SIDEBAR_OPEN)
    document.body.classList.add(CLASS_NAME_SIDEBAR_COLLAPSE)

    this._element.dispatchEvent(event)
  }

  addSidebarBreakPoint() {
    const sidebarExpandList = document.querySelector(SELECTOR_SIDEBAR_EXPAND)?.classList ?? []
    const sidebarExpand = Array.from(sidebarExpandList).find(className => className.startsWith(CLASS_NAME_SIDEBAR_EXPAND)) ?? ''
    const sidebar = document.getElementsByClassName(sidebarExpand)[0]
    const sidebarContent = globalThis.getComputedStyle(sidebar, '::before').getPropertyValue('content')
    this._config = { ...this._config, sidebarBreakpoint: Number(sidebarContent.replace(/[^\d.-]/g, '')) }

    // FIXED: Don't auto-collapse on mobile if sidebar is currently open
    // This prevents resize events (triggered by scrolling) from closing the sidebar
    const isCurrentlyOpen = document.body.classList.contains(CLASS_NAME_SIDEBAR_OPEN)
    
    if (window.innerWidth <= this._config.sidebarBreakpoint) {
      // Only collapse if not currently open (prevents scroll-triggered closes)
      if (!isCurrentlyOpen) {
        this.collapse()
      }
    } else {
      if (!document.body.classList.contains(CLASS_NAME_SIDEBAR_MINI)) {
        this.expand()
      }

      if (document.body.classList.contains(CLASS_NAME_SIDEBAR_MINI) && document.body.classList.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
        this.collapse()
      }
    }
  }

  toggle() {
    if (document.body.classList.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  init() {
    this.addSidebarBreakPoint()
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

onDOMContentLoaded(() => {
  const sidebar = document?.querySelector(SELECTOR_APP_SIDEBAR) as HTMLElement | undefined

  if (sidebar) {
    const data = new PushMenu(sidebar, Defaults)
    data.init()

    window.addEventListener('resize', () => {
      data.init()
    })
  }

  const sidebarOverlay = document.createElement('div')
  sidebarOverlay.className = CLASS_NAME_SIDEBAR_OVERLAY
  document.querySelector(SELECTOR_APP_WRAPPER)?.append(sidebarOverlay)

  let overlayTouchMoved = false

  // Handle touch events on overlay (area outside sidebar)
  sidebarOverlay.addEventListener('touchstart', () => {
    overlayTouchMoved = false
  }, { passive: true })

  sidebarOverlay.addEventListener('touchmove', () => {
    overlayTouchMoved = true
  }, { passive: true })

  sidebarOverlay.addEventListener('touchend', event => {
    if (!overlayTouchMoved) {
      event.preventDefault()
      const target = event.currentTarget as HTMLElement
      const data = new PushMenu(target, Defaults)
      data.collapse()
    }
    overlayTouchMoved = false
  }, { passive: false })


  sidebarOverlay.addEventListener('click', event => {
    event.preventDefault()
    const target = event.currentTarget as HTMLElement
    const data = new PushMenu(target, Defaults)
    data.collapse()
  })

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
        const data = new PushMenu(button, Defaults)
        data.toggle()
      }
    })
  })
})

export default PushMenu
