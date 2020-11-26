/**
 * --------------------------------------------
 * AdminLTE Layout.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'Layout'
const DATA_KEY = 'lte.layout'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const SELECTOR_HEADER = '.main-header'
const SELECTOR_MAIN_SIDEBAR = '.main-sidebar'
const SELECTOR_SIDEBAR = '.main-sidebar .sidebar'
const SELECTOR_CONTENT = '.content-wrapper'
const SELECTOR_CONTROL_SIDEBAR_CONTENT = '.control-sidebar-content'
const SELECTOR_CONTROL_SIDEBAR_BTN = '[data-widget="control-sidebar"]'
const SELECTOR_FOOTER = '.main-footer'
const SELECTOR_PUSHMENU_BTN = '[data-widget="pushmenu"]'
const SELECTOR_LOGIN_BOX = '.login-box'
const SELECTOR_REGISTER_BOX = '.register-box'

const CLASS_NAME_SIDEBAR_FOCUSED = 'sidebar-focused'
const CLASS_NAME_LAYOUT_FIXED = 'layout-fixed'
const CLASS_NAME_CONTROL_SIDEBAR_SLIDE_OPEN = 'control-sidebar-slide-open'
const CLASS_NAME_CONTROL_SIDEBAR_OPEN = 'control-sidebar-open'
const CLASS_NAME_LAYOUT_TOP_NAV = 'layout-top-nav'

const Default = {
  scrollbarTheme: 'os-theme-light',
  scrollbarAutoHide: 'l',
  panelAutoHeight: true,
  panelAutoHeightMode: 'min-height',
  loginRegisterAutoHeight: true
}

/**
 * Class Definition
 * ====================================================
 */

class Layout {
  constructor(element, config) {
    this._config = config
    this._element = element

    this._init()
  }

  // Public

  fixLayoutHeight(extra = null) {
    const $body = $('body')
    let controlSidebar = 0

    if ($body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE_OPEN) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || extra === 'control_sidebar') {
      controlSidebar = $(SELECTOR_CONTROL_SIDEBAR_CONTENT).height()
    }

    const heights = {
      window: $(window).height(),
      header: $(SELECTOR_HEADER).length !== 0 ? $(SELECTOR_HEADER).outerHeight() : 0,
      footer: $(SELECTOR_FOOTER).length !== 0 ? $(SELECTOR_FOOTER).outerHeight() : 0,
      sidebar: $(SELECTOR_SIDEBAR).length !== 0 ? $(SELECTOR_SIDEBAR).height() : 0,
      controlSidebar
    }

    const max = this._max(heights)
    let offset = this._config.panelAutoHeight

    if (offset === true) {
      offset = 0
    }

    const $contentSelector = $(SELECTOR_CONTENT)

    if (offset !== false) {
      if (max === heights.controlSidebar) {
        if ($body.hasClass(CLASS_NAME_LAYOUT_TOP_NAV)) {
          $contentSelector.css(this._config.panelAutoHeightMode, (max + offset) + heights.header + heights.footer)
        } else {
          $contentSelector.css(this._config.panelAutoHeightMode, (max + offset))
        }
      } else if (max === heights.window) {
        $contentSelector.css(this._config.panelAutoHeightMode, (max + offset) - heights.header - heights.footer)
      } else {
        $contentSelector.css(this._config.panelAutoHeightMode, (max + offset) - heights.header)
      }

      if (this._isFooterFixed()) {
        $contentSelector.css(this._config.panelAutoHeightMode, parseFloat($contentSelector.css(this._config.panelAutoHeightMode)) + heights.footer)
      }
    }

    if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
      return
    }

    if (offset !== false) {
      $contentSelector.css(this._config.panelAutoHeightMode, (max + offset) - heights.header - heights.footer)
    }

    if (typeof $.fn.overlayScrollbars !== 'undefined') {
      $(SELECTOR_SIDEBAR).overlayScrollbars({
        className: this._config.scrollbarTheme,
        sizeAutoCapable: true,
        scrollbars: {
          autoHide: this._config.scrollbarAutoHide,
          clickScrolling: true
        }
      })
    }
  }

  fixLoginRegisterHeight() {
    const $body = $('body')
    const $selector = $(`${SELECTOR_LOGIN_BOX}, ${SELECTOR_REGISTER_BOX}`)

    if ($selector.length === 0) {
      $body.css('height', 'auto')
      $('html').css('height', 'auto')
    } else {
      const boxHeight = $selector.height()

      if ($body.css(this._config.panelAutoHeightMode) !== boxHeight) {
        $body.css(this._config.panelAutoHeightMode, boxHeight)
      }
    }
  }

  // Private

  _init() {
    // Activate layout height watcher
    this.fixLayoutHeight()

    if (this._config.loginRegisterAutoHeight === true) {
      this.fixLoginRegisterHeight()
    } else if (this._config.loginRegisterAutoHeight === parseInt(this._config.loginRegisterAutoHeight, 10)) {
      setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight)
    }

    $(SELECTOR_SIDEBAR)
      .on('collapsed.lte.treeview expanded.lte.treeview', () => {
        this.fixLayoutHeight()
      })

    $(SELECTOR_PUSHMENU_BTN)
      .on('collapsed.lte.pushmenu shown.lte.pushmenu', () => {
        this.fixLayoutHeight()
      })

    $(SELECTOR_CONTROL_SIDEBAR_BTN)
      .on('collapsed.lte.controlsidebar', () => {
        this.fixLayoutHeight()
      })
      .on('expanded.lte.controlsidebar', () => {
        this.fixLayoutHeight('control_sidebar')
      })

    $(window).resize(() => {
      this.fixLayoutHeight()
    })

    $(document).ready(() => {
      this.fixLayoutHeight()
    })

    setTimeout(() => {
      $('body.hold-transition').removeClass('hold-transition')
    }, 50)
  }

  _max(numbers) {
    // Calculate the maximum number in a list
    let max = 0

    Object.keys(numbers).forEach(key => {
      if (numbers[key] > max) {
        max = numbers[key]
      }
    })

    return max
  }

  _isFooterFixed() {
    return $(SELECTOR_FOOTER).css('position') === 'fixed'
  }

  // Static

  static _jQueryInterface(config = '') {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)
      const _options = $.extend({}, Default, $(this).data())

      if (!data) {
        data = new Layout($(this), _options)
        $(this).data(DATA_KEY, data)
      }

      if (config === 'init' || config === '') {
        data._init()
      } else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {
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

$(`${SELECTOR_SIDEBAR} a`).on('focusin', () => {
  $(SELECTOR_MAIN_SIDEBAR).addClass(CLASS_NAME_SIDEBAR_FOCUSED)
})

$(`${SELECTOR_SIDEBAR} a`).on('focusout', () => {
  $(SELECTOR_MAIN_SIDEBAR).removeClass(CLASS_NAME_SIDEBAR_FOCUSED)
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

export default Layout
