/**
 * --------------------------------------------
 * AdminLTE PushMenu.js
 * License MIT
 * --------------------------------------------
 */

import EventHandler from 'bootstrap/js/src/dom/event-handler'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

//  const NAME = 'button'
const DATA_KEY = 'lte.pushmenu'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse'

const SELECTOR_DATA_TOGGLE = '[data-widget="pushmenu"]'

const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  toggle() {
    // console.log('PushMenu')
    if (document.body.classList.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
      document.body.classList.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
    } else {
      document.body.classList.add(CLASS_NAME_SIDEBAR_COLLAPSE)
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
  const data = new PushMenu()

  data.toggle()
})

export default PushMenu

//
