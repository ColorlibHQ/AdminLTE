/**
 * --------------------------------------------
 * AdminLTE PushMenu.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'PushMenu'
const DATA_KEY = 'lte.pushmenu'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Event = {
  COLLAPSED: `collapsed${EVENT_KEY}`,
  SHOWN: `shown${EVENT_KEY}`
}

const Default = {
  autoCollapseSize: 992,
  enableRemember: false,
  noTransitionAfterReload: true
}

const Selector = {
  TOGGLE_BUTTON: '[data-widget="pushmenu"]',
  BODY: 'body',
  OVERLAY: '#sidebar-overlay',
  WRAPPER: '.wrapper'
}

const ClassName = {
  COLLAPSED: 'sidebar-collapse',
  OPEN: 'sidebar-open',
  IS_OPENING: 'sidebar-is-opening',
  CLOSED: 'sidebar-closed'
}

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  constructor(element, options) {
    this._element = element
    this._options = $.extend({}, Default, options)

    if ($(Selector.OVERLAY).length === 0) {
      this._addOverlay()
    }

    this._init()
  }

  // Public

  expand() {
    if (this._options.autoCollapseSize) {
      if ($(window).width() <= this._options.autoCollapseSize) {
        $(Selector.BODY).addClass(ClassName.OPEN)
      }
    }

    $(Selector.BODY).addClass(ClassName.IS_OPENING).removeClass(`${ClassName.COLLAPSED} ${ClassName.CLOSED}`)

    if (this._options.enableRemember) {
      localStorage.setItem(`remember${EVENT_KEY}`, ClassName.OPEN)
    }

    $(this._element).trigger($.Event(Event.SHOWN))
  }

  collapse() {
    if (this._options.autoCollapseSize) {
      if ($(window).width() <= this._options.autoCollapseSize) {
        $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.CLOSED)
      }
    }

    $(Selector.BODY).removeClass(ClassName.IS_OPENING).addClass(ClassName.COLLAPSED)

    if (this._options.enableRemember) {
      localStorage.setItem(`remember${EVENT_KEY}`, ClassName.COLLAPSED)
    }

    $(this._element).trigger($.Event(Event.COLLAPSED))
  }

  toggle() {
    if ($(Selector.BODY).hasClass(ClassName.COLLAPSED)) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  autoCollapse(resize = false) {
    if (!this._options.autoCollapseSize) {
      return
    }

    if ($(window).width() <= this._options.autoCollapseSize) {
      if (!$(Selector.BODY).hasClass(ClassName.OPEN)) {
        this.collapse()
      }
    } else if (resize === true) {
      if ($(Selector.BODY).hasClass(ClassName.OPEN)) {
        $(Selector.BODY).removeClass(ClassName.OPEN)
      } else if ($(Selector.BODY).hasClass(ClassName.CLOSED)) {
        this.expand()
      }
    }
  }

  remember() {
    if (!this._options.enableRemember) {
      return
    }

    const toggleState = localStorage.getItem(`remember${EVENT_KEY}`)
    if (toggleState === ClassName.COLLAPSED) {
      if (this._options.noTransitionAfterReload) {
        $('body').addClass('hold-transition').addClass(ClassName.COLLAPSED).delay(50).queue(function () {
          $(this).removeClass('hold-transition')
          $(this).dequeue()
        })
      } else {
        $('body').addClass(ClassName.COLLAPSED)
      }
    } else if (this._options.noTransitionAfterReload) {
      $('body').addClass('hold-transition').removeClass(ClassName.COLLAPSED).delay(50).queue(function () {
        $(this).removeClass('hold-transition')
        $(this).dequeue()
      })
    } else {
      $('body').removeClass(ClassName.COLLAPSED)
    }
  }

  // Private

  _init() {
    this.remember()
    this.autoCollapse()

    $(window).resize(() => {
      this.autoCollapse(true)
    })
  }

  _addOverlay() {
    const overlay = $('<div />', {
      id: 'sidebar-overlay'
    })

    overlay.on('click', () => {
      this.collapse()
    })

    $(Selector.WRAPPER).append(overlay)
  }

  // Static

  static _jQueryInterface(operation) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)
      const _options = $.extend({}, Default, $(this).data())

      if (!data) {
        data = new PushMenu(this, _options)
        $(this).data(DATA_KEY, data)
      }

      if (typeof operation === 'string' && operation.match(/collapse|expand|toggle/)) {
        data[operation]()
      }
    })
  }
}

/**
 * Data API
 * ====================================================
 */

$(document).on('click', Selector.TOGGLE_BUTTON, event => {
  event.preventDefault()

  let button = event.currentTarget

  if ($(button).data('widget') !== 'pushmenu') {
    button = $(button).closest(Selector.TOGGLE_BUTTON)
  }

  PushMenu._jQueryInterface.call($(button), 'toggle')
})

$(window).on('load', () => {
  PushMenu._jQueryInterface.call($(Selector.TOGGLE_BUTTON))
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = PushMenu._jQueryInterface
$.fn[NAME].Constructor = PushMenu
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return PushMenu._jQueryInterface
}

export default PushMenu
