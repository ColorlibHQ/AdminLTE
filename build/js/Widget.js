/**
 * --------------------------------------------
 * AdminLTE Widget.js
 * License MIT
 * --------------------------------------------
 */

const Widget = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'Widget'
  const DATA_KEY           = 'lte.widget'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    EXPANDED : `expanded${EVENT_KEY}`,
    COLLAPSED: `collapsed${EVENT_KEY}`,
    REMOVED  : `removed${EVENT_KEY}`
  }

  const Selector = {
    DATA_REMOVE  : '[data-widget="remove"]',
    DATA_COLLAPSE: '[data-widget="collapse"]',
    CARD         : '.card',
    CARD_HEADER  : '.card-header',
    CARD_BODY    : '.card-body',
    CARD_FOOTER  : '.card-footer',
    COLLAPSED    : '.collapsed-card'
  }

  const ClassName = {
    COLLAPSED: 'collapsed-card'
  }

  const Default = {
    animationSpeed : 'normal',
    collapseTrigger: Selector.DATA_COLLAPSE,
    removeTrigger  : Selector.DATA_REMOVE
  }

  class Widget {
    constructor(element, settings) {
      this._element  = element
      this._parent   = element.parents(Selector.CARD).first()
      this._settings = $.extend({}, Default, settings)
    }

    collapse() {
      this._parent.children(`${Selector.CARD_BODY}, ${Selector.CARD_FOOTER}`)
        .slideUp(this._settings.animationSpeed, () => {
          this._parent.addClass(ClassName.COLLAPSED)
        })

      const collapsed = $.Event(Event.COLLAPSED)

      this._element.trigger(collapsed, this._parent)
    }

    expand() {
      this._parent.children(`${Selector.CARD_BODY}, ${Selector.CARD_FOOTER}`)
        .slideDown(this._settings.animationSpeed, () => {
          this._parent.removeClass(ClassName.COLLAPSED)
        })

      const expanded = $.Event(Event.EXPANDED)

      this._element.trigger(expanded, this._parent)
    }

    remove() {
      this._parent.slideUp()

      const removed = $.Event(Event.REMOVED)

      this._element.trigger(removed, this._parent)
    }

    toggle() {
      if (this._parent.hasClass(ClassName.COLLAPSED)) {
        this.expand()
        return
      }

      this.collapse()
    }

    // Private

    _init(card) {
      this._parent = card

      $(this).find(this._settings.collapseTrigger).click(() => {
        this.toggle()
      })

      $(this).find(this._settings.removeTrigger).click(() => {
        this.remove()
      })
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)

        if (!data) {
          data = new Widget($(this), data)
          $(this).data(DATA_KEY, typeof config === 'string' ? data : config)
        }

        if (typeof config === 'string' && config.match(/remove|toggle/)) {
          data[config]()
        } else if (typeof config === 'object') {
          data._init($(this))
        }
      })
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(document).on('click', Selector.DATA_COLLAPSE, function (event) {
    if (event) {
      event.preventDefault()
    }

    Widget._jQueryInterface.call($(this), 'toggle')
  })

  $(document).on('click', Selector.DATA_REMOVE, function (event) {
    if (event) {
      event.preventDefault()
    }

    Widget._jQueryInterface.call($(this), 'remove')
  })

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Widget._jQueryInterface
  $.fn[NAME].Constructor = Widget
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Widget._jQueryInterface
  }

  return Widget
})(jQuery)

export default Widget
