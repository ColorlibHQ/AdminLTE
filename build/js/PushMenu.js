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

  const NAME = 'PushMenu'
  const DATA_KEY = 'lte.pushmenu'
  const EVENT_KEY = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    COLLAPSED: `collapsed${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`
  }

  const Selector = {
    COLLAPSED: 'sidebar-collapse',
    TOGGLE_BUTTON: '[data-widget="pushmenu"]'
  }

  /**
   * Class Definition
   * ====================================================
   */

  class PushMenu {

    constructor(element) {
      this._element = element
      this._isShown = !$('body').hasClass(Selector.COLLAPSED) || $('body').hasClass('sidebar-open')
    }

    // Public

    show() {
      $('body').addClass('sidebar-open')
        .removeClass(Selector.COLLAPSED)

      this._isShown = true

      const shownEvent = $.Event(Event.SHOWN)
      $(this._element).trigger(shownEvent)
    }

    collapse() {
      $('body').removeClass('sidebar-open')
        .addClass(Selector.COLLAPSED)

      this._isShown = false

      const collapsedEvent = $.Event(Event.COLLAPSED)
      $(this._element).trigger(collapsedEvent)
    }

    toggle() {

      if (typeof this._isShown === 'undefined') {
        this._isShown = !$('body').hasClass(Selector.COLLAPSED) || $('body').hasClass('sidebar-open')
      }

      if (this._isShown) {
        this.collapse()
      } else {
        this.show()
      }
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
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return PushMenu._jQueryInterface
  }

  return PushMenu

})(jQuery)

export default PushMenu
