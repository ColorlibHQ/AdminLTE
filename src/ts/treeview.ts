/**
 * --------------------------------------------
 * AdminLTE treeview.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady,
  slideDown,
  slideUp,
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

// const NAME = 'Treeview'
const DATA_KEY = 'lte.treeview'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`
// const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`

const CLASS_NAME_MENU_OPEN = 'menu-open'
const CLASS_NAME_MENU_IS_OPEN = 'menu-is-open'
const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_TREEVIEW_MENU = '.nav-treeview'
const SELECTOR_DATA_TOGGLE = '[data-lte-toggle="treeview"]'

const Default = {
  animationSpeed: 300,
}

interface Config {
  animationSpeed: number;
}

/**
 * Class Definition
 * ====================================================
 */

class Treeview {
  _element: HTMLElement
  _config: Config
  _navItem: HTMLElement | null
  _childNavItem: HTMLElement | null | undefined

  constructor(element: HTMLElement, config: Config) {
    this._element = element

    this._navItem = this._element?.closest(SELECTOR_NAV_ITEM)
    this._childNavItem = this._navItem?.querySelector(SELECTOR_TREEVIEW_MENU)

    this._config = {...Default, ...config}
  }

  open(): void {
    const event = new CustomEvent(EVENT_EXPANDED)

    if (this._navItem) {
      this._navItem.classList.add(CLASS_NAME_MENU_OPEN)
      this._navItem.classList.add(CLASS_NAME_MENU_IS_OPEN)
    }

    if (this._childNavItem) {
      slideDown(this._childNavItem, this._config.animationSpeed)
      this._element.dispatchEvent(event)
    }
  }

  close(): void {
    const event = new CustomEvent(EVENT_COLLAPSED)
    if (this._navItem) {
      this._navItem.classList.remove(CLASS_NAME_MENU_IS_OPEN)
      this._navItem.classList.remove(CLASS_NAME_MENU_OPEN)
    }

    if (this._childNavItem) {
      slideUp(this._childNavItem, this._config.animationSpeed)
      this._element.dispatchEvent(event)
    }
  }

  toggle(): void {
    if (this._navItem?.classList.contains(CLASS_NAME_MENU_OPEN)) {
      this.close()
    } else {
      this.open()
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

domReady(() => {
  const button = document.querySelectorAll(SELECTOR_DATA_TOGGLE)

  for (const btn of button) {
    btn.addEventListener('click', event => {
      // event.preventDefault()

      const treeviewMenu = event.target as HTMLElement

      const data = new Treeview(treeviewMenu, Default)
      data.toggle()
    })
  }
})

export default Treeview
