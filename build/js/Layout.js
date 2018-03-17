/**
 * --------------------------------------------
 * AdminLTE Layout.js
 * License MIT
 * --------------------------------------------
 */

const Layout = (($) => {
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
    SIDEBAR        : '.main-sidebar',
    HEADER         : '.main-header',
    CONTENT        : '.content-wrapper',
    CONTENT_HEADER : '.content-header',
    WRAPPER        : '.wrapper',
    CONTROL_SIDEBAR: '.control-sidebar',
    LAYOUT_FIXED   : '.layout-fixed',
    FOOTER         : '.main-footer'
  }

  const ClassName = {
    HOLD        : 'hold-transition',
    SIDEBAR     : 'main-sidebar',
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
      const heights = {
        window : $(window).height(),
        header : $(Selector.HEADER).outerHeight(),
        footer : $(Selector.FOOTER).outerHeight(),
        sidebar: $(Selector.SIDEBAR).height()
      }
      const max     = this._max(heights)

      $(Selector.CONTENT).css('min-height', max - (heights.header))
      $(Selector.SIDEBAR).css('min-height', max - heights.header)
    }

    // Private

    _init() {
      // Enable transitions
      $('body').removeClass(ClassName.HOLD)

      // Activate layout height watcher
      this.fixLayoutHeight()
      $(Selector.SIDEBAR)
        .on('collapsed.lte.treeview expanded.lte.treeview collapsed.lte.pushmenu expanded.lte.pushmenu', () => {
          this.fixLayoutHeight()
        })

      $(window).resize(() => {
        this.fixLayoutHeight()
      })

      $('body, html').css('height', 'auto')
    }

    _max(numbers) {
      // Calculate the maximum number in a list
      let max = 0

      Object.keys(numbers).forEach((key) => {
        if (numbers[key] > max) {
          max = numbers[key]
        }
      })

      return max
    }

    // Static

    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $(this)
          .data(DATA_KEY)

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
   * Data API
   * ====================================================
   */
  $(window).on('load', () => {
    Layout._jQueryInterface.call($('body'))
  })

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

export default Layout
