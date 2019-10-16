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
    MAIN_SIDEBAR   : '.main-sidebar',
    SIDEBAR        : '.main-sidebar .sidebar',
    CONTENT        : '.content-wrapper',
    BRAND          : '.brand-link',
    CONTENT_HEADER : '.content-header',
    WRAPPER        : '.wrapper',
    CONTROL_SIDEBAR: '.control-sidebar',
    LAYOUT_FIXED   : '.layout-fixed',
    FOOTER         : '.main-footer',
    LOGIN_BOX      : '.login-box',
    REGISTER_BOX   : '.register-box'
  }

  const ClassName = {
    HOLD           : 'hold-transition',
    SIDEBAR        : 'main-sidebar',
    CONTENT_FIXED  : 'content-fixed',
    SIDEBAR_FOCUSED: 'sidebar-focused',
    LAYOUT_FIXED   : 'layout-fixed',
    NAVBAR_FIXED   : 'layout-navbar-fixed',
    FOOTER_FIXED   : 'layout-footer-fixed',
    LOGIN_PAGE     : 'login-page',
    REGISTER_PAGE  : 'register-page',
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
        window: $(window).height(),
        header: $(Selector.HEADER).length !== 0 ? $(Selector.HEADER).outerHeight() : 0,
        footer: $(Selector.FOOTER).length !== 0 ? $(Selector.FOOTER).outerHeight() : 0,
        sidebar: $(Selector.SIDEBAR).length !== 0 ? $(Selector.SIDEBAR).height() : 0,
      }

      const max = this._max(heights)

      if (max == heights.window) {
        $(Selector.CONTENT).css('min-height', max - heights.header - heights.footer)
      } else {
        $(Selector.CONTENT).css('min-height', max - heights.header)
      }

      if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
        $(Selector.CONTENT).css('min-height', max - heights.header - heights.footer)

        if (typeof $.fn.overlayScrollbars !== 'undefined') {
          $(Selector.SIDEBAR).overlayScrollbars({
            className       : this._config.scrollbarTheme,
            sizeAutoCapable : true,
            scrollbars : {
              autoHide: this._config.scrollbarAutoHide, 
              clickScrolling : true
            }
          })
        }
      }
    }

    // Private

    _init() {
      // Activate layout height watcher
      this.fixLayoutHeight()
      $(Selector.SIDEBAR)
        .on('collapsed.lte.treeview expanded.lte.treeview collapsed.lte.pushmenu expanded.lte.pushmenu', () => {
          this.fixLayoutHeight()
        })

      $(window).resize(() => {
        this.fixLayoutHeight()
      })

      if (!$('body').hasClass(ClassName.LOGIN_PAGE) && !$('body').hasClass(ClassName.REGISTER_PAGE)) {
        $('body, html').css('height', 'auto')
      } else if ($('body').hasClass(ClassName.LOGIN_PAGE) || $('body').hasClass(ClassName.REGISTER_PAGE)) {
        let box_height = $(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).height()

        $('body').css('min-height', box_height);
      }

      $('body.hold-transition').removeClass('hold-transition')
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

  $(Selector.SIDEBAR + ' a').on('focusin', () => {
    $(Selector.MAIN_SIDEBAR).addClass(ClassName.SIDEBAR_FOCUSED);
  })

  $(Selector.SIDEBAR + ' a').on('focusout', () => {
    $(Selector.MAIN_SIDEBAR).removeClass(ClassName.SIDEBAR_FOCUSED);
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
