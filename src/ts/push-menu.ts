/**
 * --------------------------------------------
 * AdminLTE push-menu.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady,
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
const CLASS_NAME_SIDEBAR_IS_HOVER = 'sidebar-is-hover'
const CLASS_NAME_MENU_OPEN = 'menu-open'

const SELECTOR_SIDEBAR = '.sidebar'
const SELECTOR_NAV_SIDEBAR = '.nav-sidebar'
const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_NAV_TREEVIEW = '.nav-treeview'
const SELECTOR_MINI_TOGGLE = '[data-lte-toggle="sidebar-mini"]'
const SELECTOR_FULL_TOGGLE = '[data-lte-toggle="sidebar-full"]'

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  _element: HTMLElement | null
  _config: null
  _bodyClass: DOMTokenList
  constructor(element: HTMLElement | null, config: null) {
    this._element = element

    const bodyElement = document.body as HTMLBodyElement
    this._bodyClass = bodyElement.classList

    this._config = config
  }

  sidebarOpening(): void {
    this._bodyClass.add(CLASS_NAME_SIDEBAR_OPENING)
    setTimeout(() => {
      this._bodyClass.remove(CLASS_NAME_SIDEBAR_OPENING)
    }, 1000)
  }

  sidebarColllapsing(): void {
    this._bodyClass.add(CLASS_NAME_SIDEBAR_COLLAPSING)
    setTimeout(() => {
      this._bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSING)
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

    this._bodyClass.remove(CLASS_NAME_SIDEBAR_CLOSE)
    this._bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
    this._bodyClass.add(CLASS_NAME_SIDEBAR_OPEN)
  }

  collapse(): void {
    this.sidebarColllapsing()

    this._bodyClass.add(CLASS_NAME_SIDEBAR_COLLAPSE)
  }

  close(): void {
    this._bodyClass.add(CLASS_NAME_SIDEBAR_CLOSE)
    this._bodyClass.remove(CLASS_NAME_SIDEBAR_OPEN)
    this._bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)

    if (this._bodyClass.contains(CLASS_NAME_SIDEBAR_HORIZONTAL)) {
      this.menusClose()
    }
  }

  sidebarHover(): void {
    const selSidebar = document.querySelector(SELECTOR_SIDEBAR)

    if (selSidebar) {
      selSidebar.addEventListener('mouseover', () => {
        this._bodyClass.add(CLASS_NAME_SIDEBAR_IS_HOVER)
      })

      selSidebar.addEventListener('mouseout', () => {
        this._bodyClass.remove(CLASS_NAME_SIDEBAR_IS_HOVER)
      })
    }
  }

  toggleFull(): void {
    if (this._bodyClass.contains(CLASS_NAME_SIDEBAR_CLOSE)) {
      this.expand()
    } else {
      this.close()
    }

    if (this._bodyClass.contains(CLASS_NAME_SIDEBAR_MINI)) {
      this._bodyClass.remove(CLASS_NAME_SIDEBAR_MINI)
      this._bodyClass.add(CLASS_NAME_SIDEBAR_MINI_HAD)
    }
  }

  toggleMini(): void {
    if (this._bodyClass.contains(CLASS_NAME_SIDEBAR_MINI_HAD)) {
      this._bodyClass.remove(CLASS_NAME_SIDEBAR_MINI_HAD)
      this._bodyClass.add(CLASS_NAME_SIDEBAR_MINI)
    }

    if (this._bodyClass.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  init() {
    this.sidebarHover()
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

domReady(() => {
  const data = new PushMenu(null, null)
  data.init()

  const fullBtn = document.querySelectorAll(SELECTOR_FULL_TOGGLE)

  for (const btn of fullBtn) {
    btn.addEventListener('click', event => {
      event.preventDefault()

      let button = event.currentTarget as HTMLElement | null | undefined

      if (button?.dataset.lteToggle !== 'sidebar-full') {
        button = button?.closest(SELECTOR_FULL_TOGGLE)
      }

      if (button) {
        const data = new PushMenu(button, null)
        data.toggleFull()
      }
    })
  }

  const miniBtn = document.querySelectorAll(SELECTOR_MINI_TOGGLE)

  for (const btn of miniBtn) {
    btn.addEventListener('click', event => {
      event.preventDefault()

      let button = event.currentTarget as HTMLElement | null | undefined
      if (button?.dataset.lteToggle !== 'sidebar-mini') {
        button = button?.closest(SELECTOR_FULL_TOGGLE)
      }

      if (button) {
        const data = new PushMenu(button, null)
        data.toggleMini()
      }
    })
  }
})

export default PushMenu
