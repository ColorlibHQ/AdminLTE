/**
 * --------------------------------------------
 * AdminLTE Dropdown.js
 * License MIT
 * --------------------------------------------
 */

const Dropdown = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'Dropdown'
  const DATA_KEY           = 'lte.dropdown'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Selector = {
    NAVBAR: '.navbar',
    DROPDOWN_MENU: '.dropdown-menu',
    DROPDOWN_MENU_ACTIVE: '.dropdown-menu.show',
    DROPDOWN_TOGGLE: '[data-toggle="dropdown"]',
  }

  const ClassName = {
    DROPDOWN_HOVER: 'dropdown-hover',
    DROPDOWN_RIGHT: 'dropdown-menu-right'
  }

  const Default = {
  }


  /**
   * Class Definition
   * ====================================================
   */

  class Dropdown {
    constructor(element, config) {
      this._config  = config
      this._element = element
    }

    // Public

    toggleSubmenu() {
      this._element.siblings().show().toggleClass("show")

      if (! this._element.next().hasClass('show')) {
        this._element.parents('.dropdown-menu').first().find('.show').removeClass("show").hide()
      }

      this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass("show").hide()
      })
    }

    fixPosition() {
      let elm = $(Selector.DROPDOWN_MENU_ACTIVE)

      if (elm.length !== 0) {
        if (elm.hasClass(ClassName.DROPDOWN_RIGHT)) {
          elm.css('left', 'inherit')
          elm.css('right', 0)
        } else {
          elm.css('left', 0)
          elm.css('right', 'inherit')
        }

        let offset = elm.offset()
        let width = elm.width()
        let windowWidth = $(window).width()
        let visiblePart = windowWidth - offset.left

        if (offset.left < 0) {
          elm.css('left', 'inherit')
          elm.css('right', (offset.left - 5))
        } else {
          if (visiblePart < width) {
            elm.css('left', 'inherit')
            elm.css('right', 0)
          }
        }
      }  
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data      = $(this).data(DATA_KEY)
        const _config = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new Dropdown($(this), _config)
          $(this).data(DATA_KEY, data)
        }

        if (config === 'toggleSubmenu' || config == 'fixPosition') {
          data[config]()
        }
      })
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(Selector.DROPDOWN_MENU + ' ' + Selector.DROPDOWN_TOGGLE).on("click", function(event) {
    event.preventDefault()
    event.stopPropagation()

    Dropdown._jQueryInterface.call($(this), 'toggleSubmenu')
  });

  $(Selector.NAVBAR + ' ' + Selector.DROPDOWN_TOGGLE).on("click", function(event) {
    event.preventDefault()

    setTimeout(function() {
      Dropdown._jQueryInterface.call($(this), 'fixPosition')
    }, 1)
  });

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

  return Dropdown
})(jQuery)

export default Dropdown
