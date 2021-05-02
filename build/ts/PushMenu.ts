/**
 * --------------------------------------------
 * AdminLTE PushMenu.ts
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

const CLASS_NAME_SIDEBAR_MINI = 'sidebar-mini'
const CLASS_NAME_SIDEBAR_MINI_HAD = 'sidebar-mini-had'
const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse'
const CLASS_NAME_SIDEBAR_CLOSE = 'sidebar-close'

const SELECTOR_MINI_TOGGLE = '[data-pushmenu="mini"]'
const SELECTOR_FULL_TOGGLE = '[data-pushmenu="full"]'

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  toggle(state: string): void {
    const bodyClass = document.body.classList
    if (state === 'full') {
      bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)

      if (bodyClass.contains(CLASS_NAME_SIDEBAR_CLOSE)) {
        bodyClass.remove(CLASS_NAME_SIDEBAR_CLOSE)
      } else {
        bodyClass.add(CLASS_NAME_SIDEBAR_CLOSE)
      }

      if (bodyClass.contains(CLASS_NAME_SIDEBAR_MINI)) {
        bodyClass.remove(CLASS_NAME_SIDEBAR_MINI)
        bodyClass.add(CLASS_NAME_SIDEBAR_MINI_HAD)
      }
    } else if (state === 'mini') {
      bodyClass.remove(CLASS_NAME_SIDEBAR_CLOSE)

      if (bodyClass.contains(CLASS_NAME_SIDEBAR_MINI_HAD)) {
        bodyClass.remove(CLASS_NAME_SIDEBAR_MINI_HAD)
        bodyClass.add(CLASS_NAME_SIDEBAR_MINI)
      }

      if (bodyClass.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
        bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
      } else {
        bodyClass.add(CLASS_NAME_SIDEBAR_COLLAPSE)
      }
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

windowReady(() => {
  const fullBtn = document.querySelectorAll(SELECTOR_FULL_TOGGLE)
  const miniBtn = document.querySelectorAll(SELECTOR_MINI_TOGGLE)
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
})

export default PushMenu

//
