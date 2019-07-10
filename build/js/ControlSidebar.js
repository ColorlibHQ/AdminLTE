/**
 * --------------------------------------------
 * AdminLTE ControlSidebar.js
 * License MIT
 * --------------------------------------------
 */

const ControlSidebar = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'ControlSidebar'
  const DATA_KEY           = 'lte.control.sidebar'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  const DATA_API_KEY       = '.data-api'

  const Event = {
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }

  const Selector = {
    CONTROL_SIDEBAR: '.control-sidebar',
    DATA_TOGGLE    : '[data-widget="control-sidebar"]',
    MAIN_HEADER    : '.main-header'
  }

  const ClassName = {
    CONTROL_SIDEBAR_ANIMATE: 'control-sidebar-animate',
    CONTROL_SIDEBAR_OPEN   : 'control-sidebar-open',
    CONTROL_SIDEBAR_SLIDE  : 'control-sidebar-slide-open'
  }

  const Default = {
    slide: true
  }

  /**
   * Class Definition
   * ====================================================
   */

  class ControlSidebar {
    constructor(element, config) {
      this._element = element
      this._config  = this._getConfig(config)
    }

    // Public

    show() {
      // Show the control sidebar
      if (this._config.slide) {
        $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
        $('body').removeClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function(){
          $(Selector.CONTROL_SIDEBAR).hide()
          $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
          $(this).dequeue()
        })
      } else {
        $('body').removeClass(ClassName.CONTROL_SIDEBAR_OPEN)
      }
    }

    collapse() {
      // Collapse the control sidebar
      if (this._config.slide) {
        $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
        $(Selector.CONTROL_SIDEBAR).show().delay(100).queue(function(){
          $('body').addClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function(){
            $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
            $(this).dequeue()
          })
          $(this).dequeue()
        })
      } else {
        $('body').addClass(ClassName.CONTROL_SIDEBAR_OPEN)
      }
    }

    toggle() {
      this._setMargin()

      const shouldOpen = $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body')
        .hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)
      if (shouldOpen) {
        // Open the control sidebar
        this.show()
      } else {
        // Close the control sidebar
        this.collapse()
      }
    }

    // Private

    _getConfig(config) {
      return $.extend({}, Default, config)
    }

    _setMargin() {
      $(Selector.CONTROL_SIDEBAR).css({
        top: $(Selector.MAIN_HEADER).innerHeight()
      })
    }

    // Static

    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)

        if (!data) {
          data = new ControlSidebar(this, $(this).data())
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
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return ControlSidebar._jQueryInterface
  }

  return ControlSidebar
})(jQuery)

export default ControlSidebar
