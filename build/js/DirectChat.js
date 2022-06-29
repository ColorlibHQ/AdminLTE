/**
 * --------------------------------------------
 * AdminLTE DirectChat.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'DirectChat'
const DATA_KEY = 'lte.directchat'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]

const EVENT_TOGGLED = `toggled${EVENT_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-widget="chat-pane-toggle"]'
const SELECTOR_DIRECT_CHAT = '.direct-chat'

const CLASS_NAME_DIRECT_CHAT_OPEN = 'direct-chat-contacts-open'

/**
 * Class Definition
 * ====================================================
 */

class DirectChat {
  constructor(element) {
    this._element = element
  }

  toggle() {
    $(this._element).parents(SELECTOR_DIRECT_CHAT).first().toggleClass(CLASS_NAME_DIRECT_CHAT_OPEN)
    $(this._element).trigger($.Event(EVENT_TOGGLED))
  }

  // Static
  static _jQueryInterface(config) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)

      if (!data) {
        data = new DirectChat($(this))
        $(this).data(DATA_KEY, data)
      } else if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]()
      } else if (typeof config === 'undefined') {
        data._init()
      }
    })
  }
}

/**
 *
 * Data Api implementation
 * ====================================================
 */

$(document).on('click', SELECTOR_DATA_TOGGLE, function (event) {
  if (event) {
    event.preventDefault()
  }

  DirectChat._jQueryInterface.call($(this), 'toggle')
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = DirectChat._jQueryInterface
$.fn[NAME].Constructor = DirectChat
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return DirectChat._jQueryInterface
}

export default DirectChat
