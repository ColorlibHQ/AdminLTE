/**
 * --------------------------------------------
 * @file AdminLTE treeview.ts
 * @description Treeview plugin for AdminLTE.
 * @license MIT
 * --------------------------------------------
 */

import {
  onDOMContentLoaded,
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
const SELECTOR_NAV_LINK = '.nav-link'
const SELECTOR_TREEVIEW_MENU = '.nav-treeview'
const SELECTOR_DATA_TOGGLE = '[data-lte-toggle="treeview"]'

const Default = {
  animationSpeed: 300,
  accordion: true
}

type Config = {
  animationSpeed: number;
  accordion: boolean;
}

/**
 * Class Definition
 * ====================================================
 */

class Treeview {
  _element: HTMLElement
  _config: Config

  constructor(element: HTMLElement, config: Config) {
    this._element = element
    this._config = { ...Default, ...config }
  }

  open(): void {
    const event = new Event(EVENT_EXPANDED)

    if (this._config.accordion) {
      const openMenuList = this._element.parentElement?.querySelectorAll(`${SELECTOR_NAV_ITEM}.${CLASS_NAME_MENU_OPEN}`)

      openMenuList?.forEach(openMenu => {
        if (openMenu !== this._element.parentElement) {
          openMenu.classList.remove(CLASS_NAME_MENU_OPEN)
          const childElement = openMenu?.querySelector(SELECTOR_TREEVIEW_MENU) as HTMLElement | undefined
          if (childElement) {
            slideUp(childElement, this._config.animationSpeed)
          }
        }
      })
    }

    this._element.classList.add(CLASS_NAME_MENU_OPEN)

    const childElement = this._element?.querySelector(SELECTOR_TREEVIEW_MENU) as HTMLElement | undefined
    if (childElement) {
      slideDown(childElement, this._config.animationSpeed)
    }

    this._element.dispatchEvent(event)
  }

  close(): void {
    const event = new Event(EVENT_COLLAPSED)

    this._element.classList.remove(CLASS_NAME_MENU_OPEN)

    const childElement = this._element?.querySelector(SELECTOR_TREEVIEW_MENU) as HTMLElement | undefined
    if (childElement) {
      slideUp(childElement, this._config.animationSpeed)
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

onDOMContentLoaded(() => {
  const button = document.querySelectorAll(SELECTOR_DATA_TOGGLE)

  button.forEach(btn => {
    btn.addEventListener('click', event => {
      const target = event.target as HTMLElement
      const targetItem = target.closest(SELECTOR_NAV_ITEM) as HTMLElement | undefined
      const targetLink = target.closest(SELECTOR_NAV_LINK) as HTMLAnchorElement | undefined

      if (target?.getAttribute('href') === '#' || targetLink?.getAttribute('href') === '#') {
        event.preventDefault()
      }

      if (targetItem) {
        const data = new Treeview(targetItem, Default)
        data.toggle()
      }
    })
  })
})

export default Treeview
