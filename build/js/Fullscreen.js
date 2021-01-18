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
    this.options = $.extend({}, Default, _options)
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

  fullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    }

    $(SELECTOR_ICON).removeClass(this.options.maximizeIcon).addClass(this.options.minimizeIcon)
  }

  windowed() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }

    $(SELECTOR_ICON).removeClass(this.options.minimizeIcon).addClass(this.options.maximizeIcon)
  }

  // Static

  static _jQueryInterface(config) {
    let data = $(this).data(DATA_KEY)

    if (!data) {
      data = $(this).data()
    }

    const _options = $.extend({}, Default, typeof config === 'object' ? config : data)
    const plugin = new Fullscreen($(this), _options)

    $(this).data(DATA_KEY, typeof config === 'object' ? config : data)

    if (typeof config === 'string' && /toggle|fullscreen|windowed/.test(config)) {
      plugin[config]()
    } else {
      plugin.init()
    }
  }
}

/**
  * Data API
  * ====================================================
  */
$(document).on('click', SELECTOR_DATA_WIDGET, function () {
  Fullscreen._jQueryInterface.call($(this), 'toggle')
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
