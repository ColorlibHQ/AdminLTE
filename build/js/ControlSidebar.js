/**
 * --------------------------------------------
 * AdminLTE ControlSidebar.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'ControlSidebar'
const DATA_KEY = 'lte.controlsidebar'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Event = {
  COLLAPSED: `collapsed${EVENT_KEY}`,
  EXPANDED: `expanded${EVENT_KEY}`
}

const Selector = {
  CONTROL_SIDEBAR: '.control-sidebar',
  CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',
  DATA_TOGGLE: '[data-widget="control-sidebar"]',
  HEADER: '.main-header',
  FOOTER: '.main-footer'
}

const ClassName = {
  CONTROL_SIDEBAR_ANIMATE: 'control-sidebar-animate',
  CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',
  CONTROL_SIDEBAR_SLIDE: 'control-sidebar-slide-open',
  LAYOUT_FIXED: 'layout-fixed',
  NAVBAR_FIXED: 'layout-navbar-fixed',
  NAVBAR_SM_FIXED: 'layout-sm-navbar-fixed',
  NAVBAR_MD_FIXED: 'layout-md-navbar-fixed',
  NAVBAR_LG_FIXED: 'layout-lg-navbar-fixed',
  NAVBAR_XL_FIXED: 'layout-xl-navbar-fixed',
  FOOTER_FIXED: 'layout-footer-fixed',
  FOOTER_SM_FIXED: 'layout-sm-footer-fixed',
  FOOTER_MD_FIXED: 'layout-md-footer-fixed',
  FOOTER_LG_FIXED: 'layout-lg-footer-fixed',
  FOOTER_XL_FIXED: 'layout-xl-footer-fixed'
}

const Default = {
  controlsidebarSlide: true,
  scrollbarTheme: 'os-theme-light',
  scrollbarAutoHide: 'l'
}

/**
 * Class Definition
 * ====================================================
 */

class ControlSidebar {
  constructor(element, config) {
    this._element = element
    this._config = config

    this._init()
  }

  // Public

  collapse() {
    const $body = $('body')
    const $html = $('html')

    // Show the control sidebar
    if (this._config.controlsidebarSlide) {
      $html.addClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
      $body.removeClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
        $(Selector.CONTROL_SIDEBAR).hide()
        $html.removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
        $(this).dequeue()
      })
    } else {
      $body.removeClass(ClassName.CONTROL_SIDEBAR_OPEN)
    }

    $(this._element).trigger($.Event(Event.COLLAPSED))
  }

  show() {
    const $body = $('body')
    const $html = $('html')

    // Collapse the control sidebar
    if (this._config.controlsidebarSlide) {
      $html.addClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
      $(Selector.CONTROL_SIDEBAR).show().delay(10).queue(function () {
        $body.addClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
          $html.removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
          $(this).dequeue()
        })
        $(this).dequeue()
      })
    } else {
      $body.addClass(ClassName.CONTROL_SIDEBAR_OPEN)
    }

    $(this._element).trigger($.Event(Event.EXPANDED))
  }

  toggle() {
    const $body = $('body')
    const shouldClose = $body.hasClass(ClassName.CONTROL_SIDEBAR_OPEN) ||
        $body.hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)

    if (shouldClose) {
      // Close the control sidebar
      this.collapse()
    } else {
      // Open the control sidebar
      this.show()
    }
  }

  // Private

  _init() {
    this._fixHeight()
    this._fixScrollHeight()

    $(window).resize(() => {
      this._fixHeight()
      this._fixScrollHeight()
    })

    $(window).scroll(() => {
      const $body = $('body')
      const shouldFixHeight = $body.hasClass(ClassName.CONTROL_SIDEBAR_OPEN) ||
          $body.hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)

      if (shouldFixHeight) {
        this._fixScrollHeight()
      }
    })
  }

  _fixScrollHeight() {
    const $body = $('body')

    if (!$body.hasClass(ClassName.LAYOUT_FIXED)) {
      return
    }

    const heights = {
      scroll: $(document).height(),
      window: $(window).height(),
      header: $(Selector.HEADER).outerHeight(),
      footer: $(Selector.FOOTER).outerHeight()
    }
    const positions = {
      bottom: Math.abs((heights.window + $(window).scrollTop()) - heights.scroll),
      top: $(window).scrollTop()
    }

    let navbarFixed = false
    let footerFixed = false

    if (
      $body.hasClass(ClassName.NAVBAR_FIXED) ||
        $body.hasClass(ClassName.NAVBAR_SM_FIXED) ||
        $body.hasClass(ClassName.NAVBAR_MD_FIXED) ||
        $body.hasClass(ClassName.NAVBAR_LG_FIXED) ||
        $body.hasClass(ClassName.NAVBAR_XL_FIXED)
    ) {
      if ($(Selector.HEADER).css('position') === 'fixed') {
        navbarFixed = true
      }
    }

    if (
      $body.hasClass(ClassName.FOOTER_FIXED) ||
        $body.hasClass(ClassName.FOOTER_SM_FIXED) ||
        $body.hasClass(ClassName.FOOTER_MD_FIXED) ||
        $body.hasClass(ClassName.FOOTER_LG_FIXED) ||
        $body.hasClass(ClassName.FOOTER_XL_FIXED)
    ) {
      if ($(Selector.FOOTER).css('position') === 'fixed') {
        footerFixed = true
      }
    }

    const $controlSidebar = $(Selector.CONTROL_SIDEBAR)
    const $controlsidebarContent = $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT)

    if (positions.top === 0 && positions.bottom === 0) {
      $controlSidebar.css({
        bottom: heights.footer,
        top: heights.header
      })
      $controlsidebarContent.css('height', heights.window - (heights.header + heights.footer))
    } else if (positions.bottom <= heights.footer) {
      if (footerFixed === false) {
        $controlSidebar.css('bottom', heights.footer - positions.bottom)
        $controlsidebarContent.css('height', heights.window - (heights.footer - positions.bottom))
      } else {
        $controlSidebar.css('bottom', heights.footer)
      }
    } else if (positions.top <= heights.header) {
      if (navbarFixed === false) {
        $controlSidebar.css('top', heights.header - positions.top)
        $controlsidebarContent.css('height', heights.window - (heights.header - positions.top))
      } else {
        $controlSidebar.css('top', heights.header)
      }
    } else if (navbarFixed === false) {
      $controlSidebar.css('top', 0)
      $controlsidebarContent.css('height', heights.window)
    } else {
      $controlSidebar.css('top', heights.header)
    }
  }

  _fixHeight() {
    const $body = $('body')

    if (!$body.hasClass(ClassName.LAYOUT_FIXED)) {
      return
    }

    const heights = {
      window: $(window).height(),
      header: $(Selector.HEADER).outerHeight(),
      footer: $(Selector.FOOTER).outerHeight()
    }

    let sidebarHeight = heights.window - heights.header

    if (
      $body.hasClass(ClassName.FOOTER_FIXED) ||
          $body.hasClass(ClassName.FOOTER_SM_FIXED) ||
          $body.hasClass(ClassName.FOOTER_MD_FIXED) ||
          $body.hasClass(ClassName.FOOTER_LG_FIXED) ||
          $body.hasClass(ClassName.FOOTER_XL_FIXED)
    ) {
      if ($(Selector.FOOTER).css('position') === 'fixed') {
        sidebarHeight = heights.window - heights.header - heights.footer
      }
    }

    const $controlSidebar = $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT)
    $controlSidebar.css('height', sidebarHeight)

    if (typeof $.fn.overlayScrollbars !== 'undefined') {
      $controlSidebar.overlayScrollbars({
        className: this._config.scrollbarTheme,
        sizeAutoCapable: true,
        scrollbars: {
          autoHide: this._config.scrollbarAutoHide,
          clickScrolling: true
        }
      })
    }
  }

  // Static

  static _jQueryInterface(operation) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)
      const _options = $.extend({}, Default, $(this).data())

      if (!data) {
        data = new ControlSidebar(this, _options)
        $(this).data(DATA_KEY, data)
      }

      if (data[operation] === 'undefined') {
        throw new Error(`${operation} is not a function`)
      }

      data[operation]()
    })
  }
}

/**
 *
 * Data Api implementation
 * ====================================================
 */
$(document).on('click', Selector.DATA_TOGGLE, function (event) {
  event.preventDefault()

  ControlSidebar._jQueryInterface.call($(this), 'toggle')
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = ControlSidebar._jQueryInterface
$.fn[NAME].Constructor = ControlSidebar
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return ControlSidebar._jQueryInterface
}

export default ControlSidebar
