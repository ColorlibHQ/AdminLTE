/**
 * --------------------------------------------
 * AdminLTE treeview.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady,
  slideDown,
  slideUp
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
const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_TREEVIEW_MENU = '.nav-treeview'
const SELECTOR_DATA_TOGGLE = '[data-lte-toggle="treeview"]'

const Default = {
  animationSpeed: 300
}

type Config = {
  animationSpeed: number;
}

/**
 * Class Definition
 * ====================================================
 */

class Treeview {
  _element: HTMLElement
  _config: Config
  _childNavItem: HTMLElement | undefined

  constructor(element: HTMLElement, config: Config) {
    this._element = element
    this._config = { ...Default, ...config }
    this._childNavItem = this._element.querySelector(SELECTOR_TREEVIEW_MENU) as HTMLElement | undefined
  }

  open(): void {
    const event = new Event(EVENT_EXPANDED)

    this._element.classList.add(CLASS_NAME_MENU_OPEN)

    if (this._childNavItem) {
      slideDown(this._childNavItem, this._config.animationSpeed)
    }

    this._element.dispatchEvent(event)
  }

  close(): void {
    const event = new Event(EVENT_COLLAPSED)

    this._element.classList.remove(CLASS_NAME_MENU_OPEN)

    if (this._childNavItem) {
      slideUp(this._childNavItem, this._config.animationSpeed)
    }

    this._element.dispatchEvent(event)
  }

  toggle(): void {
    if (this._element.classList.contains(CLASS_NAME_MENU_OPEN)) {
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

  button.forEach(btn => {
    btn.addEventListener('click', event => {
      const target = event.target as HTMLElement
      const targetItem = target.closest(SELECTOR_NAV_ITEM) as HTMLElement | undefined

      if (targetItem) {
        const data = new Treeview(targetItem, Default)
        data.toggle()
      }
    })
  })
})

export default Treeview
