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
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Event = {
  TOGGLED: 'toggled{EVENT_KEY}'
}

const Selector = {
  DATA_TOGGLE: '[data-widget="chat-pane-toggle"]',
  DIRECT_CHAT: '.direct-chat'
}

const ClassName = {
  DIRECT_CHAT_OPEN: 'direct-chat-contacts-open'
}

/**
 * Class Definition
 * ====================================================
 */

class DirectChat {
  constructor(element) {
    this._element = element
  }

  toggle() {
    $(this._element).parents(Selector.DIRECT_CHAT).first().toggleClass(ClassName.DIRECT_CHAT_OPEN)
    $(this._element).trigger($.Event(Event.TOGGLED))
  }

  // Static

  static _jQueryInterface(config) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)

      if (!data) {
        data = new DirectChat($(this))
        $(this).data(DATA_KEY, data)
      }

      data[config]()
    })
  }
}

/**
 *
 * Data Api implementation
 * ====================================================
 */

$(document).on('click', Selector.DATA_TOGGLE, function (event) {
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
