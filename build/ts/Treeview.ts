/**
 * --------------------------------------------
 * AdminLTE Treeview.ts
 * License MIT
 * --------------------------------------------
 */

import {
  windowReady
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const CLASS_NAME_MENU_OPEN = 'menu-open'

const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_DATA_TOGGLE = '[data-widget="treeview"]'

/**
 * Class Definition
 * ====================================================
 */

class Treeview {
  toggle(treeviewMenu: Element): void {
    const navItem = treeviewMenu.closest(SELECTOR_NAV_ITEM)
    if (navItem?.classList.contains(CLASS_NAME_MENU_OPEN)) {
      navItem.classList.remove(CLASS_NAME_MENU_OPEN)
    } else {
      navItem?.classList.add(CLASS_NAME_MENU_OPEN)
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

const button = document.querySelectorAll(SELECTOR_DATA_TOGGLE)

windowReady(() => {
  for (const btn of button) {
    btn.addEventListener('click', event => {
      event.preventDefault()

      const treeviewMenu = event.target as Element

      const data = new Treeview()
      data.toggle(treeviewMenu)
    })
  }
})

export default Treeview

//
