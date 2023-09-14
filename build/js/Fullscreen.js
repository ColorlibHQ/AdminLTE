/**
 * --------------------------------------------
 * AdminLTE Fullscreen.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'Fullscreen'
const DATA_KEY = 'lte.fullscreen'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const SELECTOR_DATA_WIDGET = '[data-widget="fullscreen"]'
const SELECTOR_ICON = `${SELECTOR_DATA_WIDGET} i`

const EVENT_FULLSCREEN_CHANGE = 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange'

const Default = {
  minimizeIcon: 'fa-compress-arrows-alt',
  maximizeIcon: 'fa-expand-arrows-alt'
}

/**
 * Class Definition
 * ====================================================
 */

class Fullscreen {
  constructor(_element, _options) {
    this.element = _element
    this.options = _options
  }

  // Public

  toggle() {
    if (document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement) {
      this.windowed()
    } else {
      this.fullscreen()
    }
  }

  toggleIcon() {
    if (document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement) {
      $(SELECTOR_ICON).removeClass(this.options.maximizeIcon).addClass(this.options.minimizeIcon)
    } else {
      $(SELECTOR_ICON).removeClass(this.options.minimizeIcon).addClass(this.options.maximizeIcon)
    }
  }

  fullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    }
  }

  windowed() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }

  // Static
  static _jQueryInterface(config) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)
      const _config = $.extend({}, Default, typeof config === 'object' ? config : $(this).data())

      if (!data) {
        data = new Fullscreen($(this), _config)
        $(this).data(DATA_KEY, data)
      } else if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]()
      }
    })
  }
}

/**
  * Data API
  * ====================================================
  */
$(document).on('click', SELECTOR_DATA_WIDGET, function () {
  Fullscreen._jQueryInterface.call($(this), 'toggle')
})

$(document).on(EVENT_FULLSCREEN_CHANGE, () => {
  Fullscreen._jQueryInterface.call($(SELECTOR_DATA_WIDGET), 'toggleIcon')
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Fullscreen._jQueryInterface
$.fn[NAME].Constructor = Fullscreen
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Fullscreen._jQueryInterface
}

export default Fullscreen
