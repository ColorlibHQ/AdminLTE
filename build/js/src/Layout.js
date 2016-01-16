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

  const NAME               = 'Layout'
  const DATA_KEY           = 'lte.layout'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    SIDEBAR: 'sidebar'
  }

  const Selector = {
    SIDEBAR: '.main-sidebar',
    HEADER: '.main-header',
    CONTENT: '.content-wrapper',
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

  const Default = {}

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
      let $elements = $(`${Selector.CONTENT}, ${Selector.SIDEBAR}, ${Selector.CONTROL_SIDEBAR}`)
      let maxHeight

      $elements.css('min-height', 0)

      let heights = [
        $(window).height(),
        $(Selector.SIDEBAR).height(),
        $(Selector.HEADER).outerHeight(),
        $(Selector.CONTROL_SIDEBAR).height(),
        $(Selector.CONTENT).outerHeight(),
        $(Selector.FOOTER).outerHeight()
      ]

      maxHeight = this._max(heights)

      // $elements.css('min-height', maxHeight)

      // $(Selector.CONTENT).css('min-height', maxHeight - (heights[2] + heights[5]))
    }

    // Private

    _init() {
      $('body').removeClass(ClassName.HOLD)

      this.fixLayoutHeight()
      $(Selector.SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview', () => {
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
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Layout._jQueryInterface
  }

  return Layout

})(jQuery)
