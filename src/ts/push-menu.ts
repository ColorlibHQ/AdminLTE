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

const DATA_KEY = 'lte.push-menu'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_OPEN = `open${EVENT_KEY}`
const EVENT_COLLAPSE = `collapse${EVENT_KEY}`
const EVENT_CLOSE = `close${EVENT_KEY}`

const CLASS_NAME_SIDEBAR_MINI = 'sidebar-mini'
const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse'
const CLASS_NAME_SIDEBAR_CLOSE = 'sidebar-close'
const CLASS_NAME_SIDEBAR_OPEN = 'sidebar-open'
const CLASS_NAME_SIDEBAR_IS_HOVER = 'sidebar-is-hover'
const CLASS_NAME_MENU_OPEN = 'menu-open'
const CLASS_NAME_LAYOUT_MOBILE = 'layout-mobile'

const SELECTOR_SIDEBAR = '.sidebar'
const SELECTOR_NAV_SIDEBAR = '.nav-sidebar'
const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_NAV_TREEVIEW = '.nav-treeview'
const SELECTOR_MINI_TOGGLE = '[data-lte-toggle="sidebar-mini"]'
const SELECTOR_FULL_TOGGLE = '[data-lte-toggle="sidebar-full"]'
const SELECTOR_LAYOUT_MOBILE = `.${CLASS_NAME_LAYOUT_MOBILE}`
const SELECTOR_CONTENT_WRAPPER = '.content-wrapper'

const Defaults = {
  onLayoutMobile: 992
}

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  _element: HTMLElement | undefined
  _config: undefined
  _bodyClass: DOMTokenList
  constructor(element: HTMLElement | undefined, config: undefined) {
    this._element = element

    const bodyElement = document.body as HTMLBodyElement
    this._bodyClass = bodyElement.classList

    this._config = config
  }

  // TODO
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
    const event = new Event(EVENT_OPEN)

    this._bodyClass.remove(CLASS_NAME_SIDEBAR_CLOSE)
    this._bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
    this._bodyClass.add(CLASS_NAME_SIDEBAR_OPEN)

    this._element?.dispatchEvent(event)
  }

  collapse(): void {
    const event = new Event(EVENT_COLLAPSE)

    this._bodyClass.remove(CLASS_NAME_SIDEBAR_OPEN)
    this._bodyClass.remove(CLASS_NAME_SIDEBAR_CLOSE)
    this._bodyClass.add(CLASS_NAME_SIDEBAR_COLLAPSE)

    this._element?.dispatchEvent(event)
  }

  close(): void {
    const event = new Event(EVENT_CLOSE)

    this._bodyClass.remove(CLASS_NAME_SIDEBAR_OPEN)
    this._bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
    this._bodyClass.add(CLASS_NAME_SIDEBAR_CLOSE)

    this._element?.dispatchEvent(event)
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

  addSidebarBreakPoint(): void {
    const bodyClass = document.body.classList
    const widthOutput = window.innerWidth

    if (widthOutput < Defaults.onLayoutMobile) {
      bodyClass.add(CLASS_NAME_LAYOUT_MOBILE)
      this.close()
    }

    if (widthOutput >= Defaults.onLayoutMobile) {
      bodyClass.remove(CLASS_NAME_LAYOUT_MOBILE)
      if (!bodyClass.contains(CLASS_NAME_SIDEBAR_MINI)) {
        this.expand()
      }

      if (bodyClass.contains(CLASS_NAME_SIDEBAR_MINI)) {
        this.collapse()
      }
    }
  }

  removeOverlaySidebar(): void {
    const bodyClass = document.body.classList
    if (bodyClass.contains(CLASS_NAME_LAYOUT_MOBILE)) {
      bodyClass.remove(CLASS_NAME_SIDEBAR_OPEN)
      bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
      bodyClass.add(CLASS_NAME_SIDEBAR_CLOSE)
    }
  }

  toggleFull(): void {
    if (this._bodyClass.contains(CLASS_NAME_SIDEBAR_CLOSE)) {
      this.expand()
    } else {
      this.close()
    }
  }

  toggleMini(): void {
    if (this._bodyClass.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  init() {
    this.addSidebarBreakPoint()
    this.sidebarHover()

    const targetLayoutMobile = document.querySelector(SELECTOR_LAYOUT_MOBILE)
    const targetContentWrapper = targetLayoutMobile?.querySelector(SELECTOR_CONTENT_WRAPPER)

    if (targetContentWrapper) {
      targetContentWrapper.addEventListener('touchstart', this.removeOverlaySidebar)
      targetContentWrapper.addEventListener('click', this.removeOverlaySidebar)
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

domReady(() => {
  const data = new PushMenu(undefined, undefined)
  data.init()

  window.addEventListener('resize', () => {
    data.init()
  })

  const fullBtn = document.querySelectorAll(SELECTOR_FULL_TOGGLE)

  for (const btn of fullBtn) {
    btn.addEventListener('click', event => {
      event.preventDefault()

      let button = event.currentTarget as HTMLElement | undefined

      if (button?.dataset.lteToggle !== 'sidebar-full') {
        button = button?.closest(SELECTOR_FULL_TOGGLE) as HTMLElement | undefined
      }

      if (button) {
        const data = new PushMenu(button, undefined)
        data.toggleFull()
      }
    })
  }

  const miniBtn = document.querySelectorAll(SELECTOR_MINI_TOGGLE)

  for (const btn of miniBtn) {
    btn.addEventListener('click', event => {
      event.preventDefault()

      let button = event.currentTarget as HTMLElement | undefined
      if (button?.dataset.lteToggle !== 'sidebar-mini') {
        button = button?.closest(SELECTOR_FULL_TOGGLE) as HTMLElement | undefined
      }

      if (button) {
        const data = new PushMenu(button, undefined)
        data.toggleMini()
      }
    })
  }
})

export default PushMenu

