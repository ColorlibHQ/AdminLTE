/**
 * --------------------------------------------
 * AdminLTE Treeview.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'Treeview'
const DATA_KEY = 'lte.treeview'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Event = {
  EXPANDED: `expanded${EVENT_KEY}`,
  COLLAPSED: `collapsed${EVENT_KEY}`,
  LOAD_DATA_API: `load${EVENT_KEY}`
}

const Selector = {
  LI: '.nav-item',
  LINK: '.nav-link',
  TREEVIEW_MENU: '.nav-treeview',
  OPEN: '.menu-open',
  DATA_WIDGET: '[data-widget="treeview"]'
}

const ClassName = {
  OPEN: 'menu-open',
  IS_OPENING: 'menu-is-opening',
  SIDEBAR_COLLAPSED: 'sidebar-collapse'
}

const Default = {
  trigger: `${Selector.DATA_WIDGET} ${Selector.LINK}`,
  animationSpeed: 300,
  accordion: true,
  expandSidebar: false,
  sidebarButtonSelector: '[data-widget="pushmenu"]'
}

/**
 * Class Definition
 * ====================================================
 */
class Treeview {
  constructor(element, config) {
    this._config = config
    this._element = element
  }

  // Public

  init() {
    $(`${Selector.LI}${Selector.OPEN} ${Selector.TREEVIEW_MENU}`).css('display', 'block')
    this._setupListeners()
  }

  expand(treeviewMenu, parentLi) {
    const expandedEvent = $.Event(Event.EXPANDED)

    if (this._config.accordion) {
      const openMenuLi = parentLi.siblings(Selector.OPEN).first()
      const openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first()
      this.collapse(openTreeview, openMenuLi)
    }

    parentLi.addClass(ClassName.IS_OPENING)
    treeviewMenu.stop().slideDown(this._config.animationSpeed, () => {
      parentLi.addClass(ClassName.OPEN)
      $(this._element).trigger(expandedEvent)
    })

    if (this._config.expandSidebar) {
      this._expandSidebar()
    }
  }

  collapse(treeviewMenu, parentLi) {
    const collapsedEvent = $.Event(Event.COLLAPSED)

    parentLi.removeClass(`${ClassName.IS_OPENING} ${ClassName.OPEN}`)
    treeviewMenu.stop().slideUp(this._config.animationSpeed, () => {
      $(this._element).trigger(collapsedEvent)
      treeviewMenu.find(`${Selector.OPEN} > ${Selector.TREEVIEW_MENU}`).slideUp()
      treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN)
    })
  }

  toggle(event) {
    const $relativeTarget = $(event.currentTarget)
    const $parent = $relativeTarget.parent()

    let treeviewMenu = $parent.find('> ' + Selector.TREEVIEW_MENU)

    if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
      if (!$parent.is(Selector.LI)) {
        treeviewMenu = $parent.parent().find('> ' + Selector.TREEVIEW_MENU)
      }

      if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
        return
      }
    }

    event.preventDefault()

    const parentLi = $relativeTarget.parents(Selector.LI).first()
    const isOpen = parentLi.hasClass(ClassName.OPEN)

    if (isOpen) {
      this.collapse($(treeviewMenu), parentLi)
    } else {
      this.expand($(treeviewMenu), parentLi)
    }
  }

  // Private

  _setupListeners() {
    $(document).on('click', this._config.trigger, event => {
      this.toggle(event)
    })
  }

  _expandSidebar() {
    if ($('body').hasClass(ClassName.SIDEBAR_COLLAPSED)) {
      $(this._config.sidebarButtonSelector).PushMenu('expand')
    }
  }

  // Static

  static _jQueryInterface(config) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)
      const _options = $.extend({}, Default, $(this).data())

      if (!data) {
        data = new Treeview($(this), _options)
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

$(window).on(Event.LOAD_DATA_API, () => {
  $(Selector.DATA_WIDGET).each(function () {
    Treeview._jQueryInterface.call($(this), 'init')
  })
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Treeview._jQueryInterface
$.fn[NAME].Constructor = Treeview
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Treeview._jQueryInterface
}

export default Treeview
