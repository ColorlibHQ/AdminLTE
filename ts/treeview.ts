/* eslint-disable no-console */
/**
 * --------------------------------------------
 * AdminLTE treeview.ts
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

const CLASS_NAME_MENU_OPEN = 'menu-open'

const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_DATA_TOGGLE = '[data-widget="treeview"]'

const Defaults = {
  transitionDuration: 300
}

/**
 * Class Definition
 * ====================================================
 */

class Treeview {
  open(navItem: Element | null, childNavItem: HTMLElement | null | undefined): void {
    console.log('🚀 ~ file: treeview.ts ~ line 31 ~ Treeview ~ open ~ childNavItem', childNavItem)

    navItem?.classList.add(CLASS_NAME_MENU_OPEN)

    const height: number = childNavItem?.scrollHeight ?? 0

    childNavItem?.style.setProperty('transition', `height ${Defaults.transitionDuration}ms`)
    childNavItem?.style.setProperty('overflow', 'hidden')
    childNavItem?.style.setProperty('display', 'block')
    childNavItem?.style.setProperty('height', '0px')

    setTimeout(() => {
      childNavItem?.style.setProperty('height', `${height}px`)
    }, 1)

    setTimeout(() => {
      childNavItem?.style.removeProperty('overflow')
      childNavItem?.style.setProperty('height', 'auto')
    }, Defaults.transitionDuration)
  }

  close(navItem: Element, childNavItem: HTMLElement | null | undefined): void {
    navItem.classList.remove(CLASS_NAME_MENU_OPEN)

    const height: number = childNavItem?.scrollHeight ?? 0
    childNavItem?.style.setProperty('transition', `height ${Defaults.transitionDuration}ms`)

    childNavItem?.style.setProperty('overflow', 'hidden')
    childNavItem?.style.setProperty('height', `${height}px`)

    setTimeout(() => {
      childNavItem?.style.setProperty('height', '0px')
    }, 1)

    setTimeout(() => {
      // childNavItem?.style.removeProperty('height')
      childNavItem?.style.removeProperty('display')
      childNavItem?.style.removeProperty('overflow')
    }, Defaults.transitionDuration)
  }

  toggle(treeviewMenu: Element): void {
    const navItem: HTMLElement | null = treeviewMenu.closest(SELECTOR_NAV_ITEM)
    const childNavItem: HTMLElement | null | undefined = navItem?.querySelector('.nav-treeview')

    if (navItem?.classList.contains(CLASS_NAME_MENU_OPEN)) {
      this.close(navItem, childNavItem)
    } else {
      this.open(navItem, childNavItem)
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

const button = document.querySelectorAll(SELECTOR_DATA_TOGGLE)

domReady(() => {
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
