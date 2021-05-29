/**
 * --------------------------------------------
 * AdminLTE push-menu.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const CLASS_NAME_SIDEBAR_MINI = 'sidebar-mini'
const CLASS_NAME_SIDEBAR_MINI_HAD = 'sidebar-mini-had'
const CLASS_NAME_SIDEBAR_HORIZONTAL = 'sidebar-horizontal'
const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse'
const CLASS_NAME_SIDEBAR_CLOSE = 'sidebar-close'
const CLASS_NAME_SIDEBAR_OPEN = 'sidebar-open'
const CLASS_NAME_SIDEBAR_OPENING = 'sidebar-is-opening'
const CLASS_NAME_SIDEBAR_COLLAPSING = 'sidebar-is-collapsing'
const CLASS_NAME_MENU_OPEN = 'menu-open'
const CLASS_NAME_HEADER_MOBILE_OPEN = 'header-mobile-open'

const SELECTOR_NAV_SIDEBAR = '.nav-sidebar'
const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_NAV_TREEVIEW = '.nav-treeview'
const SELECTOR_MINI_TOGGLE = '[data-pushmenu="mini"]'
const SELECTOR_FULL_TOGGLE = '[data-pushmenu="full"]'
const SELECTOR_FULL_HEADER = '[data-pushmenu="header"]'

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  sidebarOpening(): void {
    const bodyClass = document.body.classList

    bodyClass.add(CLASS_NAME_SIDEBAR_OPENING)
    setTimeout(() => {
      bodyClass.remove(CLASS_NAME_SIDEBAR_OPENING)
    }, 1000)
  }

  sidebarColllapsing(): void {
    const bodyClass = document.body.classList

    bodyClass.add(CLASS_NAME_SIDEBAR_COLLAPSING)
    setTimeout(() => {
      bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSING)
    }, 1000)
  }

  menusClose(): void {
    const navTreeview = document.querySelectorAll<HTMLElement>(SELECTOR_NAV_TREEVIEW)

    for (const navTree of navTreeview) {
      navTree.style.removeProperty('display')
      navTree.style.removeProperty('height')
    }

    const navSidebar = document.querySelector(SELECTOR_NAV_SIDEBAR)
    const navItem = navSidebar?.querySelectorAll(SELECTOR_NAV_ITEM)

    if (navItem) {
      for (const navI of navItem) {
        navI.classList.remove(CLASS_NAME_MENU_OPEN)
      }
    }
  }

  expand(): void {
    this.sidebarOpening()
    const bodyClass = document.body.classList
    bodyClass.remove(CLASS_NAME_HEADER_MOBILE_OPEN)
    bodyClass.remove(CLASS_NAME_SIDEBAR_CLOSE)
    bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
    bodyClass.add(CLASS_NAME_SIDEBAR_OPEN)
  }

  collapse(): void {
    this.sidebarColllapsing()
    const bodyClass = document.body.classList
    bodyClass.add(CLASS_NAME_SIDEBAR_COLLAPSE)
  }

  close(): void {
    const bodyClass = document.body.classList

    bodyClass.add(CLASS_NAME_SIDEBAR_CLOSE)
    bodyClass.remove(CLASS_NAME_SIDEBAR_OPEN)
    bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)

    if (bodyClass.contains(CLASS_NAME_SIDEBAR_HORIZONTAL)) {
      this.menusClose()
    }
  }

  toggleFull(): void {
    const bodyClass = document.body.classList

    if (bodyClass.contains(CLASS_NAME_SIDEBAR_CLOSE)) {
      this.expand()
    } else {
      this.close()
    }

    if (bodyClass.contains(CLASS_NAME_SIDEBAR_MINI)) {
      bodyClass.remove(CLASS_NAME_SIDEBAR_MINI)
      bodyClass.add(CLASS_NAME_SIDEBAR_MINI_HAD)
    }
  }

  toggleMini(): void {
    const bodyClass = document.body.classList

    if (bodyClass.contains(CLASS_NAME_SIDEBAR_MINI_HAD)) {
      bodyClass.remove(CLASS_NAME_SIDEBAR_MINI_HAD)
      bodyClass.add(CLASS_NAME_SIDEBAR_MINI)
    }

    if (bodyClass.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  toggleHeader(): void {
    this.close()
    const bodyClass = document.body.classList
    if (bodyClass.contains(CLASS_NAME_HEADER_MOBILE_OPEN)) {
      bodyClass.remove(CLASS_NAME_HEADER_MOBILE_OPEN)
    } else {
      bodyClass.add(CLASS_NAME_HEADER_MOBILE_OPEN)
    }
  }

  toggle(state: string): void {
    switch (state) {
      case 'full': {
        this.toggleFull()
        break
      }

      case 'mini': {
        this.toggleMini()
        break
      }

      case 'header': {
        this.toggleHeader()
        break
      }
    // No default
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

domReady(() => {
  const fullBtn = document.querySelectorAll(SELECTOR_FULL_TOGGLE)
  const miniBtn = document.querySelectorAll(SELECTOR_MINI_TOGGLE)
  const headerBtn = document.querySelectorAll(SELECTOR_FULL_HEADER)

  for (const btn of fullBtn) {
    btn.addEventListener('click', () => {
      const data = new PushMenu()
      data.toggle('full')
    })
  }

  for (const btn of miniBtn) {
    btn.addEventListener('click', () => {
      const data = new PushMenu()
      data.toggle('mini')
    })
  }

  for (const btn of headerBtn) {
    btn.addEventListener('click', () => {
      const data = new PushMenu()
      data.toggle('header')
    })
  }
})

export default PushMenu

//
