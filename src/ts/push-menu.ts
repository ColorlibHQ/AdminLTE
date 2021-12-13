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
const DATA_KEY = 'lte.pushmenu'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_EXPAND = `expand${EVENT_KEY}`
const EVENT_COLLAPSE = `collapse${EVENT_KEY}`
const EVENT_CLOSE = `close${EVENT_KEY}`

const DATA_NAME_REMEMBER_STATE = `${DATA_KEY}.remember.state`

const COOKIE_REMEMBER_STATE = `${DATA_KEY}.sidebar.state`
const COOKIE_PATH = `${DATA_KEY}.sidebar.cookie.path`

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
const CLASS_NAME_LAYOUT_MOBILE = 'layout-mobile'

const SELECTOR_SIDEBAR = '.sidebar'
const SELECTOR_NAV_SIDEBAR = '.nav-sidebar'
const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_NAV_TREEVIEW = '.nav-treeview'
const SELECTOR_MINI_TOGGLE = '[data-lte-toggle="sidebar-mini"]'
const SELECTOR_FULL_TOGGLE = '[data-lte-toggle="sidebar-full"]'
const SELECTOR_SIDEBAR_SM = `.${CLASS_NAME_LAYOUT_MOBILE}`
const SELECTOR_CONTENT_WRAPPER = '.content-wrapper'

const Defaults = {
  onLayouMobile: 992
}

enum RememberState {
  Open = 'Open',
  Closed = 'Closed',
  Collapsed = 'Collapsed'
}

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  _element: HTMLElement | undefined
  _config: undefined
  _bodyClass: DOMTokenList
  _rememberState: boolean
  _cookiePath: string

  constructor(element: HTMLElement | undefined, config: undefined) {
    this._element = element

    const bodyElement = document.body as HTMLBodyElement
    this._bodyClass = bodyElement.classList

    this._config = config

    this._rememberState = false
    this._cookiePath = '/'

    if (this._element !== null) {
      const remember: string = this._element.dataset[DATA_NAME_REMEMBER_STATE] ?? '0'
      const rememberInt = Number.parseInt(remember, 10)
      this._rememberState = (rememberInt === 1)
      if (this._rememberState && !this._element.id) {
        throw new Error('To remember menu state, id parameter on menu button must be defined!')
      }

      this._cookiePath = this._element.dataset[COOKIE_PATH] ?? this._cookiePath
    }
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

    if (this._element !== null) {
      const event = new CustomEvent(EVENT_EXPAND)
      this._element.dispatchEvent(event)
    }

    this.setState(RememberState.Open)
  }

  collapse(): void {
    this.sidebarColllapsing()

    this._bodyClass.add(CLASS_NAME_SIDEBAR_COLLAPSE)

    if (this._element !== null) {
      const event = new CustomEvent(EVENT_COLLAPSE)
      this._element.dispatchEvent(event)
    }

    this.setState(RememberState.Collapsed)
  }

  close(): void {
    this._bodyClass.add(CLASS_NAME_SIDEBAR_CLOSE)
    this._bodyClass.remove(CLASS_NAME_SIDEBAR_OPEN)
    this._bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)

    if (this._bodyClass.contains(CLASS_NAME_SIDEBAR_HORIZONTAL)) {
      this.menusClose()
    }

    if (this._element !== null) {
      const event = new CustomEvent(EVENT_CLOSE)
      this._element.dispatchEvent(event)
    }

    this.setState(RememberState.Closed)
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

  setState(state: RememberState): void {
    if (this._rememberState) {
      window.document.cookie = `${COOKIE_REMEMBER_STATE}.${this._element!.id}=${state}; SameSite=Strict; Path=${this._cookiePath}`
    }
  }

  initPreviousState(): void {
    if (!this._rememberState) {
      return
    }

    this._bodyClass.add('hold-transition')

    const allcookies = document.cookie
    const cookiearray = allcookies.split(';')

    let state: RememberState = RememberState.Open
    for (const item of cookiearray) {
      const itemSplit = item.split('=')
      if (itemSplit.length > 1 && itemSplit[0].trim() === `${COOKIE_REMEMBER_STATE}.${this._element!.id}`) {
        state = RememberState[itemSplit[1].trim() as keyof typeof RememberState]
      }
    }

    if (state === RememberState.Closed) {
      this.close()
    } else if (state === RememberState.Collapsed) {
      this.collapse()
    } else {
      this.expand()
    }

    setTimeout(() => {
      this._bodyClass.remove('hold-transition')
    }, 100)
  }

  addSidebarBreakPoint(): void {
    const bodyClass = document.body.classList
    const widthOutput = window.innerWidth

    if (widthOutput < Defaults.onLayouMobile) {
      bodyClass.add(CLASS_NAME_LAYOUT_MOBILE)
    }

    if (widthOutput >= Defaults.onLayouMobile) {
      bodyClass.remove(CLASS_NAME_LAYOUT_MOBILE)
      if (!this._rememberState) {
        this.initPreviousState()
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

  closeSidebar(): void {
    const widthOutput: number = window.innerWidth
    if (widthOutput < Defaults.onLayouMobile) {
      document.body.classList.add(CLASS_NAME_SIDEBAR_CLOSE)
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
    this.addSidebarBreakPoint()
    this.sidebarHover()

    const selSidebarSm = document.querySelector(SELECTOR_SIDEBAR_SM)
    const selContentWrapper = selSidebarSm?.querySelector(SELECTOR_CONTENT_WRAPPER)

    if (selContentWrapper) {
      selContentWrapper.addEventListener('touchstart', this.removeOverlaySidebar)
      selContentWrapper.addEventListener('click', this.removeOverlaySidebar)
    }

    this.closeSidebar()
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
    const data = new PushMenu(btn as HTMLElement, null)
    data.initPreviousState()

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
    const data = new PushMenu(btn as HTMLElement, null)
    data.initPreviousState()

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
