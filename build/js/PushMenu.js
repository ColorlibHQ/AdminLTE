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
    SHOWN: `shown${EVENT_KEY}`
  }

  const Default = {
    autoCollapseSize: false,
    enableRemember: false,
    noTransitionAfterReload: true
  }

  const Selector = {
    TOGGLE_BUTTON: '[data-widget="pushmenu"]',
    SIDEBAR_MINI: '.sidebar-mini',
    SIDEBAR_COLLAPSED: '.sidebar-collapse',
    BODY: 'body',
    OVERLAY: '#sidebar-overlay',
    WRAPPER: '.wrapper'
  }

  const ClassName = {
    SIDEBAR_OPEN: 'sidebar-open',
    COLLAPSED: 'sidebar-collapse',
    OPEN: 'sidebar-open'
  }

  /**
   * Class Definition
   * ====================================================
   */

  class PushMenu {
    constructor(element, options) {
      this._element = element
      this._options = $.extend({}, Default, options)


      if (!$(Selector.BODY).hasClass(ClassName.COLLAPSED) && !$(Selector.BODY).hasClass(ClassName.OPEN)) {
        $(Selector.BODY).addClass(ClassName.OPEN)
      }

      if (!$(Selector.OVERLAY).length) {
        this._addOverlay()
      }

      this._init()
    }

    // Public

    show() {
      $(Selector.BODY).addClass(ClassName.OPEN).removeClass(ClassName.COLLAPSED)

      if(this._options.enableRemember) {
          localStorage.setItem(`remember${EVENT_KEY}`, ClassName.OPEN)
      }

      const shownEvent = $.Event(Event.SHOWN)
      $(this._element).trigger(shownEvent)
    }

    collapse() {
      $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.COLLAPSED)

      if(this._options.enableRemember) {
          localStorage.setItem(`remember${EVENT_KEY}`, ClassName.COLLAPSED)
      }

      const collapsedEvent = $.Event(Event.COLLAPSED)
      $(this._element).trigger(collapsedEvent)
    }

    toggle() {
      if ($(Selector.BODY).hasClass(ClassName.OPEN)) {
        this.collapse()
      } else {
        this.show()
      }
    }

    autoCollapse() {
      if (this._options.autoCollapseSize) {
        if ($(window).width() <= this._options.autoCollapseSize) {
          if ($(Selector.BODY).hasClass(ClassName.OPEN)) {
            this.toggle()
          }
        } else {
          if (!$(Selector.BODY).hasClass(ClassName.OPEN)) {
            this.toggle()
          }
        }
      }
    }

    remember() {
      if(this._options.enableRemember) {
        let toggleState = localStorage.getItem(`remember${EVENT_KEY}`)
        if (toggleState == ClassName.COLLAPSED){
          if (this._options.noTransitionAfterReload) {
              $("body").addClass('hold-transition').addClass(ClassName.COLLAPSED).delay(50).queue(function() {
                $(this).removeClass('hold-transition')
                $(this).dequeue()
              })
          } else {
            $("body").addClass(ClassName.COLLAPSED)
          }
        } else {
          if (this._options.noTransitionAfterReload) {
            $("body").addClass('hold-transition').removeClass(ClassName.COLLAPSED).delay(50).queue(function() {
              $(this).removeClass('hold-transition')
              $(this).dequeue()
            })
          } else {
            $("body").removeClass(ClassName.COLLAPSED)
          }
        }
      }
    }

    // Private

    _init() {
      this.remember()
      this.autoCollapse()

      $(window).resize(() => {
        this.autoCollapse()
      })
    }

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
        const _options = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new PushMenu(this, _options)
          $(this).data(DATA_KEY, data)
        }

        if (operation === 'toggle') {
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

  $(window).on('load', () => {
    PushMenu._jQueryInterface.call($(Selector.TOGGLE_BUTTON))
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
