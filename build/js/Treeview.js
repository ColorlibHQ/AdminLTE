/**
 * --------------------------------------------
 * AdminLTE Treeview.js
 * License MIT
 * --------------------------------------------
 */

import EventHandler from 'bootstrap/js/src/dom/event-handler'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const DATA_KEY = 'lte.treeview'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const CLASS_NAME_OPEN = 'menu-open'

// const SELECTOR_NAV_SIDEBAR = '.nav-sidebar'
// const SELECTOR_LI = '.nav-item'
const SELECTOR_LINK = '.nav-link'
const SELECTOR_TREEVIEW = '.nav-treeview'
const SELECTOR_DATA_WIDGET = '[data-widget="treeview"]'
const SELECTOR_OPEN = '.menu-open'

const SELECTOR_DATA_TOGGLE = `${SELECTOR_DATA_WIDGET} ${SELECTOR_LINK}`

const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

/**
 * Class Definition
 * ====================================================
 */

class Treeview {
  toggle(btnThis) {
    if (btnThis.classList.contains(CLASS_NAME_OPEN)) {
      btnThis.classList.remove(CLASS_NAME_OPEN)
      const tree = btnThis.closest(`${SELECTOR_OPEN} > ${SELECTOR_TREEVIEW}`)
      // eslint-disable-next-line no-console
      console.log(tree)
    } else {
      btnThis.classList.add(CLASS_NAME_OPEN)
      const tree = btnThis.closest(`${SELECTOR_OPEN} > ${SELECTOR_TREEVIEW}`)
      // eslint-disable-next-line no-console
      console.log(tree)
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
  event.preventDefault()
  const button = event.target.closest(SELECTOR_DATA_TOGGLE)
  const data = new Treeview()
  data.toggle(button)
})

export default Treeview

//
