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

const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`
const EVENT_EXPANDED = `expanded${EVENT_KEY}`

const SELECTOR_CONTROL_SIDEBAR = '.control-sidebar'
const SELECTOR_CONTROL_SIDEBAR_CONTENT = '.control-sidebar-content'
const SELECTOR_DATA_TOGGLE = '[data-widget="control-sidebar"]'
const SELECTOR_HEADER = '.main-header'
const SELECTOR_FOOTER = '.main-footer'

const CLASS_NAME_CONTROL_SIDEBAR_ANIMATE = 'control-sidebar-animate'
const CLASS_NAME_CONTROL_SIDEBAR_OPEN = 'control-sidebar-open'
const CLASS_NAME_CONTROL_SIDEBAR_SLIDE = 'control-sidebar-slide-open'
const CLASS_NAME_LAYOUT_FIXED = 'layout-fixed'
const CLASS_NAME_NAVBAR_FIXED = 'layout-navbar-fixed'
const CLASS_NAME_NAVBAR_SM_FIXED = 'layout-sm-navbar-fixed'
const CLASS_NAME_NAVBAR_MD_FIXED = 'layout-md-navbar-fixed'
const CLASS_NAME_NAVBAR_LG_FIXED = 'layout-lg-navbar-fixed'
const CLASS_NAME_NAVBAR_XL_FIXED = 'layout-xl-navbar-fixed'
const CLASS_NAME_FOOTER_FIXED = 'layout-footer-fixed'
const CLASS_NAME_FOOTER_SM_FIXED = 'layout-sm-footer-fixed'
const CLASS_NAME_FOOTER_MD_FIXED = 'layout-md-footer-fixed'
const CLASS_NAME_FOOTER_LG_FIXED = 'layout-lg-footer-fixed'
const CLASS_NAME_FOOTER_XL_FIXED = 'layout-xl-footer-fixed'

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
      $html.addClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
      $body.removeClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
        $(SELECTOR_CONTROL_SIDEBAR).hide()
        $html.removeClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
        $(this).dequeue()
      })
    } else {
      $body.removeClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN)
    }

    $(this._element).trigger($.Event(EVENT_COLLAPSED))
  }

  show() {
    const $body = $('body')
    const $html = $('html')

    // Collapse the control sidebar
    if (this._config.controlsidebarSlide) {
      $html.addClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
      $(SELECTOR_CONTROL_SIDEBAR).show().delay(10).queue(function () {
        $body.addClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
          $html.removeClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
          $(this).dequeue()
        })
        $(this).dequeue()
      })
    } else {
      $body.addClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN)
    }

    $(this._element).trigger($.Event(EVENT_EXPANDED))
  }

  toggle() {
    const $body = $('body')
    const shouldClose = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) ||
        $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE)

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
      const shouldFixHeight = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) ||
          $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE)

      if (shouldFixHeight) {
        this._fixScrollHeight()
      }
    })
  }

  _fixScrollHeight() {
    const $body = $('body')

    if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
      return
    }

    const heights = {
      scroll: $(document).height(),
      window: $(window).height(),
      header: $(SELECTOR_HEADER).outerHeight(),
      footer: $(SELECTOR_FOOTER).outerHeight()
    }
    const positions = {
      bottom: Math.abs((heights.window + $(window).scrollTop()) - heights.scroll),
      top: $(window).scrollTop()
    }

    const navbarFixed = (
      $body.hasClass(CLASS_NAME_NAVBAR_FIXED) ||
        $body.hasClass(CLASS_NAME_NAVBAR_SM_FIXED) ||
        $body.hasClass(CLASS_NAME_NAVBAR_MD_FIXED) ||
        $body.hasClass(CLASS_NAME_NAVBAR_LG_FIXED) ||
        $body.hasClass(CLASS_NAME_NAVBAR_XL_FIXED)
    ) && $(SELECTOR_HEADER).css('position') === 'fixed'

    const footerFixed = (
      $body.hasClass(CLASS_NAME_FOOTER_FIXED) ||
        $body.hasClass(CLASS_NAME_FOOTER_SM_FIXED) ||
        $body.hasClass(CLASS_NAME_FOOTER_MD_FIXED) ||
        $body.hasClass(CLASS_NAME_FOOTER_LG_FIXED) ||
        $body.hasClass(CLASS_NAME_FOOTER_XL_FIXED)
    ) && $(SELECTOR_FOOTER).css('position') === 'fixed'

    const $controlSidebar = $(SELECTOR_CONTROL_SIDEBAR)
    const $controlsidebarContent = $(`${SELECTOR_CONTROL_SIDEBAR}, ${SELECTOR_CONTROL_SIDEBAR} ${SELECTOR_CONTROL_SIDEBAR_CONTENT}`)

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

    if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
      return
    }

    const heights = {
      window: $(window).height(),
      header: $(SELECTOR_HEADER).outerHeight(),
      footer: $(SELECTOR_FOOTER).outerHeight()
    }

    let sidebarHeight = heights.window - heights.header

    if (
      $body.hasClass(CLASS_NAME_FOOTER_FIXED) ||
          $body.hasClass(CLASS_NAME_FOOTER_SM_FIXED) ||
          $body.hasClass(CLASS_NAME_FOOTER_MD_FIXED) ||
          $body.hasClass(CLASS_NAME_FOOTER_LG_FIXED) ||
          $body.hasClass(CLASS_NAME_FOOTER_XL_FIXED)
    ) {
      if ($(SELECTOR_FOOTER).css('position') === 'fixed') {
        sidebarHeight = heights.window - heights.header - heights.footer
      }
    }

    const $controlSidebar = $(`${SELECTOR_CONTROL_SIDEBAR} ${SELECTOR_CONTROL_SIDEBAR_CONTENT}`)
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
$(document).on('click', SELECTOR_DATA_TOGGLE, function (event) {
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
