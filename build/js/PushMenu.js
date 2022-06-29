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

const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`
const EVENT_COLLAPSED_DONE = `collapsed-done${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`

const SELECTOR_TOGGLE_BUTTON = '[data-widget="pushmenu"]'
const SELECTOR_BODY = 'body'
const SELECTOR_OVERLAY = '#sidebar-overlay'
const SELECTOR_WRAPPER = '.wrapper'

const CLASS_NAME_COLLAPSED = 'sidebar-collapse'
const CLASS_NAME_OPEN = 'sidebar-open'
const CLASS_NAME_IS_OPENING = 'sidebar-is-opening'
const CLASS_NAME_CLOSED = 'sidebar-closed'

const Default = {
  autoCollapseSize: 992,
  enableRemember: false,
  noTransitionAfterReload: true,
  animationSpeed: 300
}

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  constructor(element, options) {
    this._element = element
    this._options = options

    if ($(SELECTOR_OVERLAY).length === 0) {
      this._addOverlay()
    }

    this._init()
  }

  // Public

  expand() {
    const $bodySelector = $(SELECTOR_BODY)

    if (this._options.autoCollapseSize && $(window).width() <= this._options.autoCollapseSize) {
      $bodySelector.addClass(CLASS_NAME_OPEN)
    }

    $bodySelector.addClass(CLASS_NAME_IS_OPENING).removeClass(`${CLASS_NAME_COLLAPSED} ${CLASS_NAME_CLOSED}`).delay(50).queue(function () {
      $bodySelector.removeClass(CLASS_NAME_IS_OPENING)
      $(this).dequeue()
    })

    if (this._options.enableRemember) {
      localStorage.setItem(`remember${EVENT_KEY}`, CLASS_NAME_OPEN)
    }

    $(this._element).trigger($.Event(EVENT_SHOWN))
  }

  collapse() {
    const $bodySelector = $(SELECTOR_BODY)

    if (this._options.autoCollapseSize && $(window).width() <= this._options.autoCollapseSize) {
      $bodySelector.removeClass(CLASS_NAME_OPEN).addClass(CLASS_NAME_CLOSED)
    }

    $bodySelector.addClass(CLASS_NAME_COLLAPSED)

    if (this._options.enableRemember) {
      localStorage.setItem(`remember${EVENT_KEY}`, CLASS_NAME_COLLAPSED)
    }

    $(this._element).trigger($.Event(EVENT_COLLAPSED))

    setTimeout(() => {
      $(this._element).trigger($.Event(EVENT_COLLAPSED_DONE))
    }, this._options.animationSpeed)
  }

  toggle() {
    if ($(SELECTOR_BODY).hasClass(CLASS_NAME_COLLAPSED)) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  autoCollapse(resize = false) {
    if (!this._options.autoCollapseSize) {
      return
    }

    const $bodySelector = $(SELECTOR_BODY)

    if ($(window).width() <= this._options.autoCollapseSize) {
      if (!$bodySelector.hasClass(CLASS_NAME_OPEN)) {
        this.collapse()
      }
    } else if (resize === true) {
      if ($bodySelector.hasClass(CLASS_NAME_OPEN)) {
        $bodySelector.removeClass(CLASS_NAME_OPEN)
      } else if ($bodySelector.hasClass(CLASS_NAME_CLOSED)) {
        this.expand()
      }
    }
  }

  remember() {
    if (!this._options.enableRemember) {
      return
    }

    const $body = $('body')
    const toggleState = localStorage.getItem(`remember${EVENT_KEY}`)

    if (toggleState === CLASS_NAME_COLLAPSED) {
      if (this._options.noTransitionAfterReload) {
        $body.addClass('hold-transition').addClass(CLASS_NAME_COLLAPSED).delay(50).queue(function () {
          $(this).removeClass('hold-transition')
          $(this).dequeue()
        })
      } else {
        $body.addClass(CLASS_NAME_COLLAPSED)
      }
    } else if (this._options.noTransitionAfterReload) {
      $body.addClass('hold-transition').removeClass(CLASS_NAME_COLLAPSED).delay(50).queue(function () {
        $(this).removeClass('hold-transition')
        $(this).dequeue()
      })
    } else {
      $body.removeClass(CLASS_NAME_COLLAPSED)
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

    $(SELECTOR_WRAPPER).append(overlay)
  }

  // Static
  static _jQueryInterface(config) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)
      const _config = $.extend({}, Default, typeof config === 'object' ? config : $(this).data())

      if (!data) {
        data = new PushMenu($(this), _config)
        $(this).data(DATA_KEY, data)
        data._init()
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
 * Data API
 * ====================================================
 */

$(document).on('click', SELECTOR_TOGGLE_BUTTON, event => {
  event.preventDefault()

  let button = event.currentTarget

  if ($(button).data('widget') !== 'pushmenu') {
    button = $(button).closest(SELECTOR_TOGGLE_BUTTON)
  }

  PushMenu._jQueryInterface.call($(button), 'toggle')
})

$(window).on('load', () => {
  PushMenu._jQueryInterface.call($(SELECTOR_TOGGLE_BUTTON))
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
