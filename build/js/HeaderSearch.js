/**
 * --------------------------------------------
 * AdminLTE HeaderSearch.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'HeaderSearch'
const DATA_KEY = 'lte.header-search'
// const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]
const SELECTOR_SEARCH_BOX = '.main-header input[type=search]'
const SELECTOR_SEARCH_FORM = $(SELECTOR_SEARCH_BOX).parents('form')
const SELECTOR_SEARCH_CANCEL_BTN = $(SELECTOR_SEARCH_BOX).next()

/**
 * Class Definition
 * ====================================================
 */

class HeaderSearch {
  expand() {
    SELECTOR_SEARCH_CANCEL_BTN.children().eq(1).remove()
    SELECTOR_SEARCH_CANCEL_BTN.append(`
      <span class="btn btn-navbar search-site-cancel">
        <i class="fa fa-window-close"></i>
      </span>
    `)

    if ($(document).width() < 480) {
      SELECTOR_SEARCH_FORM.nextAll().css({
        display: 'none'
      })
    }

    SELECTOR_SEARCH_FORM.css({
      width: '100%',
      'padding-right': '5px'
    })
  }

  collapse() {
    SELECTOR_SEARCH_CANCEL_BTN.children().eq(1).remove()
    SELECTOR_SEARCH_FORM.nextAll().css({
      display: 'flex'
    })
  }

  // Static

  static _jQueryInterface(operation) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)

      if (!data) {
        data = new HeaderSearch($(this))
        $(this).data(DATA_KEY, data)
      }

      if (typeof operation === 'string' && operation.match(/expand|collapse/)) {
        data[operation]()
      }
    })
  }
}

/**
 * Data API
 * ====================================================
 */

$(document).on('click focus', SELECTOR_SEARCH_BOX, event => {
  event.preventDefault()
  HeaderSearch._jQueryInterface.call($(SELECTOR_SEARCH_BOX), 'expand')
})

$(document).on('click focusout', '.search-site-cancel', event => {
  event.preventDefault()
  HeaderSearch._jQueryInterface.call($(SELECTOR_SEARCH_BOX), 'collapse')
})

/**
  * jQuery API
  * ====================================================
  */

$.fn[NAME] = HeaderSearch._jQueryInterface
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return HeaderSearch._jQueryInterface
}

export default HeaderSearch
