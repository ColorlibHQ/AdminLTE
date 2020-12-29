/**
 * --------------------------------------------
 * AdminLTE Dropdown.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'Dropdown'
const DATA_KEY = 'lte.dropdown'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const SELECTOR_NAVBAR = '.navbar'
const SELECTOR_DROPDOWN_MENU = '.dropdown-menu'
const SELECTOR_DROPDOWN_MENU_ACTIVE = '.dropdown-menu.show'
const SELECTOR_DROPDOWN_TOGGLE = '[data-toggle="dropdown"]'

const CLASS_NAME_DROPDOWN_RIGHT = 'dropdown-menu-right'
const CLASS_NAME_DROPDOWN_SUBMENU = 'dropdown-submenu'

// TODO: this is unused; should be removed along with the extend?
const Default = {}

/**
 * Class Definition
 * ====================================================
 */

class Dropdown {
  constructor(element, config) {
    this._config = config
    this._element = element
  }

  // Public

  toggleSubmenu() {
    this._element.siblings().show().toggleClass('show')

    if (!this._element.next().hasClass('show')) {
      this._element.parents(SELECTOR_DROPDOWN_MENU).first().find('.show').removeClass('show').hide()
    }

    this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', () => {
      $('.dropdown-submenu .show').removeClass('show').hide()
    })
  }

  fixPosition() {
    const $element = $(SELECTOR_DROPDOWN_MENU_ACTIVE)

    if ($element.length === 0) {
      return
    }

    if ($element.hasClass(CLASS_NAME_DROPDOWN_RIGHT)) {
      $element.css({
        left: 'inherit',
        right: 0
      })
    } else {
      $element.css({
        left: 0,
        right: 'inherit'
      })
    }

    const offset = $element.offset()
    const width = $element.width()
    const visiblePart = $(window).width() - offset.left

    if (offset.left < 0) {
      $element.css({
        left: 'inherit',
        right: offset.left - 5
      })
    } else if (visiblePart < width) {
      $element.css({
        left: 'inherit',
        right: 0
      })
    }
  }

  // Static

  static _jQueryInterface(config) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)
      const _config = $.extend({}, Default, $(this).data())

      if (!data) {
        data = new Dropdown($(this), _config)
        $(this).data(DATA_KEY, data)
      }

      if (config === 'toggleSubmenu' || config === 'fixPosition') {
        data[config]()
      }
    })
  }
}

/**
 * Data API
 * ====================================================
 */

$(`${SELECTOR_DROPDOWN_MENU} ${SELECTOR_DROPDOWN_TOGGLE}`).on('click', function (event) {
  event.preventDefault()
  event.stopPropagation()

  Dropdown._jQueryInterface.call($(this), 'toggleSubmenu')
})

$(`${SELECTOR_NAVBAR} ${SELECTOR_DROPDOWN_TOGGLE}`).on('click', event => {
  event.preventDefault()

  if ($(event.target).parent().hasClass(CLASS_NAME_DROPDOWN_SUBMENU)) {
    return
  }

  setTimeout(function () {
    Dropdown._jQueryInterface.call($(this), 'fixPosition')
  }, 1)
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Dropdown._jQueryInterface
$.fn[NAME].Constructor = Dropdown
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Dropdown._jQueryInterface
}

export default Dropdown
