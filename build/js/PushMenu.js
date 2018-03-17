/**
 * --------------------------------------------
 * AdminLTE PushMenu.js
 * License MIT
 * --------------------------------------------
 */

const PushMenu = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'PushMenu'
  const DATA_KEY           = 'lte.pushmenu'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    COLLAPSED: `collapsed${EVENT_KEY}`,
    SHOWN    : `shown${EVENT_KEY}`
  }

  const Default = {
    screenCollapseSize: 768
  }

  const Selector = {
    TOGGLE_BUTTON    : '[data-widget="pushmenu"]',
    SIDEBAR_MINI     : '.sidebar-mini',
    SIDEBAR_COLLAPSED: '.sidebar-collapse',
    BODY             : 'body',
    OVERLAY          : '#sidebar-overlay',
    WRAPPER          : '.wrapper'
  }

  const ClassName = {
    SIDEBAR_OPEN: 'sidebar-open',
    COLLAPSED   : 'sidebar-collapse',
    OPEN        : 'sidebar-open',
    SIDEBAR_MINI: 'sidebar-mini'
  }

  /**
   * Class Definition
   * ====================================================
   */

  class PushMenu {
    constructor(element, options) {
      this._element = element
      this._options = $.extend({}, Default, options)

      if (!$(Selector.OVERLAY).length) {
        this._addOverlay()
      }
    }

    // Public

    show() {
      $(Selector.BODY).addClass(ClassName.OPEN).removeClass(ClassName.COLLAPSED)

      const shownEvent = $.Event(Event.SHOWN)
      $(this._element).trigger(shownEvent)
    }

    collapse() {
      $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.COLLAPSED)

      const collapsedEvent = $.Event(Event.COLLAPSED)
      $(this._element).trigger(collapsedEvent)
    }

    toggle() {
      let isShown
      if ($(window).width() >= this._options.screenCollapseSize) {
        isShown = !$(Selector.BODY).hasClass(ClassName.COLLAPSED)
      } else {
        isShown = $(Selector.BODY).hasClass(ClassName.OPEN)
      }

      if (isShown) {
        this.collapse()
      } else {
        this.show()
      }
    }

    // Private
    _addOverlay() {
      const overlay = $('<div />', {
        id: 'sidebar-overlay'
      })

      overlay.on('click', () => {
        this.collapse()
      })

      $(Selector.WRAPPER).append(overlay)
    }

    // Static

    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)

        if (!data) {
          data = new PushMenu(this)
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

  $(document).on('click', Selector.TOGGLE_BUTTON, (event) => {
    event.preventDefault()

    let button = event.currentTarget

    if ($(button).data('widget') !== 'pushmenu') {
      button = $(button).closest(Selector.TOGGLE_BUTTON)
    }

    PushMenu._jQueryInterface.call($(button), 'toggle')
  })

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = PushMenu._jQueryInterface
  $.fn[NAME].Constructor = PushMenu
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return PushMenu._jQueryInterface
  }

  return PushMenu
})(jQuery)

export default PushMenu
