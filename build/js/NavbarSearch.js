/**
 * --------------------------------------------
 * AdminLTE NavbarSearch.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'NavbarSearch'
const DATA_KEY = 'lte.navbar-search'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const SELECTOR_TOGGLE_BUTTON = '[data-widget="navbar-search"]'
const SELECTOR_SEARCH_BLOCK = '.navbar-search-block'
const SELECTOR_SEARCH_INPUT = '.form-control'

const CLASS_NAME_OPEN = 'navbar-search-open'

const Default = {
  resetOnClose: true,
  target: SELECTOR_SEARCH_BLOCK
}

/**
 * Class Definition
 * ====================================================
 */

class NavbarSearch {
  constructor(_element, _options) {
    this._element = _element
    this._config = $.extend({}, Default, _options)
  }

  // Public

  open() {
    $(this._config.target).css('display', 'flex').hide().fadeIn().addClass(CLASS_NAME_OPEN)
    $(`${this._config.target} ${SELECTOR_SEARCH_INPUT}`).focus()
  }

  close() {
    $(this._config.target).fadeOut().removeClass(CLASS_NAME_OPEN)

    if (this._config.resetOnClose) {
      $(`${this._config.target} ${SELECTOR_SEARCH_INPUT}`).val('')
    }
  }

  toggle() {
    if ($(this._config.target).hasClass(CLASS_NAME_OPEN)) {
      this.close()
    } else {
      this.open()
    }
  }

  // Static

  static _jQueryInterface(options) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)
      const _options = $.extend({}, Default, $(this).data())

      if (!data) {
        data = new NavbarSearch(this, _options)
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

  if (button.data('widget') !== 'navbar-search') {
    button = button.closest(SELECTOR_TOGGLE_BUTTON)
  }

  NavbarSearch._jQueryInterface.call(button, 'toggle')
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = NavbarSearch._jQueryInterface
$.fn[NAME].Constructor = NavbarSearch
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return NavbarSearch._jQueryInterface
}

export default NavbarSearch
