/**
 * --------------------------------------------
 * AdminLTE SiteSearch.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'SiteSearch'
const DATA_KEY = 'lte.site-search'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const SELECTOR_TOGGLE_BUTTON = '[data-widget="site-search"]'
const SELECTOR_SEARCH_BLOCK = '.site-search-block'
const SELECTOR_SEARCH_INPUT = '.site-search-block .form-control'

const CLASS_NAME_OPEN = 'site-search-open'

const Default = {
  resetOnClose: true
}

/**
 * Class Definition
 * ====================================================
 */

class SiteSearch {
  constructor(_element, _options) {
    this._element = _element
    this._config = $.extend({}, Default, _options)
  }

  // Public

  open() {
    $(SELECTOR_SEARCH_BLOCK).css('display', 'flex').hide().fadeIn().addClass(CLASS_NAME_OPEN)
    $(SELECTOR_SEARCH_INPUT).focus()
  }

  close() {
    $(SELECTOR_SEARCH_BLOCK).fadeOut().removeClass(CLASS_NAME_OPEN)

    if (this._config.resetOnClose) {
      $(SELECTOR_SEARCH_INPUT).val('')
    }
  }

  toggle() {
    if ($(SELECTOR_SEARCH_BLOCK).hasClass(CLASS_NAME_OPEN)) {
      this.close()
    } else {
      this.open()
    }
  }

  // Static

  static _jQueryInterface(options) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)

      if (!data) {
        data = new SiteSearch(this, options)
        $(this).data(DATA_KEY, data)
      }

      if (!/toggle|close|open/.test(options)) {
        throw new Error(`Undefined method ${options}`)
      }

      data[options]()
    })
  }
}

/**
 * Data API
 * ====================================================
 */
$(document).on('click', SELECTOR_TOGGLE_BUTTON, event => {
  event.preventDefault()

  let button = $(event.currentTarget)

  if (button.data('widget') !== 'site-search') {
    button = button.closest(SELECTOR_TOGGLE_BUTTON)
  }

  SiteSearch._jQueryInterface.call(button, 'toggle')
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = SiteSearch._jQueryInterface
$.fn[NAME].Constructor = SiteSearch
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return SiteSearch._jQueryInterface
}

export default SiteSearch
