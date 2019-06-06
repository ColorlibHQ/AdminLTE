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
    HEADER         : '.main-header',
    SIDEBAR        : '.main-sidebar .sidebar',
    CONTENT        : '.content-wrapper',
    BRAND          : '.brand-link',
    CONTENT_HEADER : '.content-header',
    WRAPPER        : '.wrapper',
    CONTROL_SIDEBAR: '.control-sidebar',
    LAYOUT_FIXED   : '.layout-fixed',
    FOOTER         : '.main-footer'
  }

  const ClassName = {
    HOLD         : 'hold-transition',
    SIDEBAR      : 'main-sidebar',
    CONTENT_FIXED: 'content-fixed',
    LAYOUT_FIXED : 'layout-fixed',
    NAVBAR_FIXED : 'layout-navbar-fixed',
    FOOTER_FIXED : 'layout-footer-fixed',
  }

  const Default = {
    scrollbarTheme : 'os-theme-light',
    scrollbarAutoHide: 'l'
  }

  /**
   * Class Definition
   * ====================================================
   */

  class Layout {
    constructor(element, config) {
      this._config  = config
      this._element = element

      this._init()
    }

    // Public

    fixLayoutHeight() {
      const heights = {
        window     : $(window).height(),
        header     : $(Selector.HEADER).outerHeight(),
        footer     : $(Selector.FOOTER).outerHeight(),
        sidebar    : $(Selector.SIDEBAR).height(),
      }

      const max = this._max(heights)


      if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
        $(Selector.CONTENT).css('min-height', max - heights.header - heights.footer)
        // $(Selector.SIDEBAR).css('min-height', max - heights.header)
        $(Selector.CONTROL_SIDEBAR + ' .control-sidebar-content').css('height', max - heights.header)
        
        if (typeof $.fn.overlayScrollbars !== 'undefined') {
          $(Selector.SIDEBAR).overlayScrollbars({
            className       : this._config.scrollbarTheme,
            sizeAutoCapable : true,
            scrollbars : {
              autoHide: this._config.scrollbarAutoHide, 
              clickScrolling : true
            }
          })
          $(Selector.CONTROL_SIDEBAR + ' .control-sidebar-content').overlayScrollbars({
            className       : this._config.scrollbarTheme,
            sizeAutoCapable : true,
            scrollbars : {
              autoHide: this._config.scrollbarAutoHide, 
              clickScrolling : true
            }
          })
        }
      } else {
        if (heights.window > heights.sidebar) {
          $(Selector.CONTENT).css('min-height', heights.window - heights.header - heights.footer)
        } else {
          $(Selector.CONTENT).css('min-height', heights.sidebar - heights.header)
        }
      }
      if ($('body').hasClass(ClassName.NAVBAR_FIXED)) {
          $(Selector.BRAND).css('height', heights.header)
          $(Selector.SIDEBAR).css('margin-top', heights.header)
          $(Selector.SIDEBAR).css('margin-top', heights.header)
      }
      if ($('body').hasClass(ClassName.FOOTER_FIXED)) {
        $(Selector.CONTENT).css('margin-bottom', heights.footer)
      }
      if ($('body').hasClass(ClassName.CONTENT_FIXED)) {
        $(Selector.CONTENT).css('height', $(Selector.CONTENT).css('min-height'))
      } 
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

    static _jQueryInterface(config) {
      return this.each(function () {
        let data      = $(this).data(DATA_KEY)
        const _config = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new Layout($(this), _config)
          $(this).data(DATA_KEY, data)
        }

        if (config === 'init') {
          data[config]()
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
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Layout._jQueryInterface
  }

  return Layout
})(jQuery)

export default Layout
