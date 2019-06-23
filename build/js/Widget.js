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
    MAXIMIZED: `maximized${EVENT_KEY}`,
    MINIMIZED: `minimized${EVENT_KEY}`,
    REMOVED  : `removed${EVENT_KEY}`
  }

  const Selector = {
    DATA_REMOVE   : '[data-widget="remove"]',
    DATA_COLLAPSE : '[data-widget="collapse"]',
    DATA_MAXIMIZE : '[data-widget="maximize"]',
    CARD          : '.card',
    CARD_HEADER   : '.card-header',
    CARD_BODY     : '.card-body',
    CARD_FOOTER   : '.card-footer',
    COLLAPSED     : '.collapsed-card',
    COLLAPSE_ICON : '.fa-minus',
    EXPAND_ICON   : '.fa-plus'
  }

  const ClassName = {
    COLLAPSED     : 'collapsed-card',
    WAS_COLLAPSED : 'was-collapsed',
    MAXIMIZED     : 'maximized-card',
    COLLAPSE_ICON : 'fa-minus',
    EXPAND_ICON   : 'fa-plus',
    MAXIMIZE_ICON : 'fa-expand',
    MINIMIZE_ICON : 'fa-compress',
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

      this._element.children(Selector.COLLAPSE_ICON)
        .addClass(ClassName.EXPAND_ICON)
        .removeClass(ClassName.COLLAPSE_ICON)

      const collapsed = $.Event(Event.COLLAPSED)

      this._element.trigger(collapsed, this._parent)
    }

    expand() {
      this._parent.children(`${Selector.CARD_BODY}, ${Selector.CARD_FOOTER}`)
        .slideDown(this._settings.animationSpeed, () => {
          this._parent.removeClass(ClassName.COLLAPSED)
        })

      this._element.children(Selector.EXPAND_ICON)
        .addClass(ClassName.COLLAPSE_ICON)
        .removeClass(ClassName.EXPAND_ICON)

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
    
    toggleMaximize() {
      var button = this._element.find('i')

      if (this._parent.hasClass(ClassName.MAXIMIZED)) {
        button.addClass(ClassName.MAXIMIZE_ICON).removeClass(ClassName.MINIMIZE_ICON)
        this._parent.css('cssText', 'height:' + this._parent[0].style.height + ' !important;' +
          'width:' + this._parent[0].style.width + ' !important; transition: all .15s;'
        ).delay(100).queue(function(){
          $(this).removeClass(ClassName.MAXIMIZED)
          $('html').removeClass(ClassName.MAXIMIZED)
          $(this).trigger(Event.MINIMIZED)
          $(this).css({
            'height': 'inherit',
            'width': 'inherit'
          })
          if ($(this).hasClass(ClassName.WAS_COLLAPSED)) {
            $(this).removeClass(ClassName.WAS_COLLAPSED)
          }
          $(this).dequeue()
        })
      } else {
        button.addClass(ClassName.MINIMIZE_ICON).removeClass(ClassName.MAXIMIZE_ICON)
        this._parent.css({
          'height': this._parent.height(),
          'width': this._parent.width(),
          'transition': 'all .15s'
        }).delay(150).queue(function(){
          $(this).addClass(ClassName.MAXIMIZED)
          $('html').addClass(ClassName.MAXIMIZED)
          $(this).trigger(Event.MAXIMIZED)
          if ($(this).hasClass(ClassName.COLLAPSED)) {
            $(this).addClass(ClassName.WAS_COLLAPSED)
          }
          $(this).dequeue()
        })
      }
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

  $(document).on('click', Selector.DATA_MAXIMIZE, function (event) {
    if (event) {
      event.preventDefault()
    }

    Widget._jQueryInterface.call($(this), 'toggleMaximize')
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
