/**
 * --------------------------------------------
 * AdminLTE Layout.js
 * License MIT
 * --------------------------------------------
 */

const Layout = (($) => {
  'use strict'

  /**
   * Constants
   * ====================================================
   */

  const NAME = 'Layout'
  const DATA_KEY = 'lte.layout'
  const EVENT_KEY = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    SIDEBAR: 'sidebar'
  }

  const Selector = {
    SIDEBAR: '.main-sidebar',
    HEADER: '.main-header',
    CONTENT: '.content-wrapper',
    CONTENT_HEADER: '.content-header',
    WRAPPER: '.wrapper',
    CONTROL_SIDEBAR: '.control-sidebar',
    LAYOUT_FIXED: '.layout-fixed',
    FOOTER: '.main-footer'
  }

  const ClassName = {
    HOLD: 'hold-transition',
    SIDEBAR: 'main-sidebar',
    LAYOUT_FIXED: 'layout-fixed'
  }

  /**
   * Class Definition
   * ====================================================
   */

  class Layout {

    constructor(element) {
      this._element = element

      this._init()
    }

    // Public

    fixLayoutHeight() {
      let heights = [
          $(window).height(),
          $(Selector.HEADER).outerHeight(),
          $(Selector.FOOTER).outerHeight(),
          $(Selector.SIDEBAR).height()
        ],
        max = this._max(heights)

      $(Selector.CONTENT).css('min-height', max - (heights[1] + heights[2]))
    }

    // Private

    _init() {
      $('body').removeClass(ClassName.HOLD)

      this.fixLayoutHeight()
      $(Selector.SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview collapsed.lte.pushmenu expanded.lte.pushmenu', () => {
        this.fixLayoutHeight()
      })
      $(window).resize(() => {
        this.fixLayoutHeight()
      })
    }

    _max(numbers) {
      let max = 0

      numbers.forEach((v) => {
        if (v > max) {
          max = v
        }
      })

      return max
    }

    // Static

    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)

        if (!data) {
          data = new Layout(this)
          $(this).data(DATA_KEY, data)
        }

        if (operation) {
          data[operation]()
        }
      })
    }
  }

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Layout._jQueryInterface
  $.fn[NAME].Constructor = Layout
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Layout._jQueryInterface
  }

  return Layout

})(jQuery)
