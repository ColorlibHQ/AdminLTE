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

const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`

const SELECTOR_LI = '.nav-item'
const SELECTOR_LINK = '.nav-link'
const SELECTOR_TREEVIEW_MENU = '.nav-treeview'
const SELECTOR_OPEN = '.menu-open'
const SELECTOR_DATA_WIDGET = '[data-widget="treeview"]'

const CLASS_NAME_OPEN = 'menu-open'
const CLASS_NAME_IS_OPENING = 'menu-is-opening'
const CLASS_NAME_SIDEBAR_COLLAPSED = 'sidebar-collapse'

const Default = {
  trigger: `${SELECTOR_DATA_WIDGET} ${SELECTOR_LINK}`,
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
    $(`${SELECTOR_LI}${SELECTOR_OPEN} ${SELECTOR_TREEVIEW_MENU}`).css('display', 'block')
    this._setupListeners()
  }

  expand(treeviewMenu, parentLi) {
    const expandedEvent = $.Event(EVENT_EXPANDED)

    if (this._config.accordion) {
      const openMenuLi = parentLi.siblings(SELECTOR_OPEN).first()
      const openTreeview = openMenuLi.find(SELECTOR_TREEVIEW_MENU).first()
      this.collapse(openTreeview, openMenuLi)
    }

    parentLi.addClass(CLASS_NAME_IS_OPENING)
    treeviewMenu.stop().slideDown(this._config.animationSpeed, () => {
      parentLi.addClass(CLASS_NAME_OPEN)
      $(this._element).trigger(expandedEvent)
    })

    if (this._config.expandSidebar) {
      this._expandSidebar()
    }
  }

  collapse(treeviewMenu, parentLi) {
    const collapsedEvent = $.Event(EVENT_COLLAPSED)

    parentLi.removeClass(`${CLASS_NAME_IS_OPENING} ${CLASS_NAME_OPEN}`)
    treeviewMenu.stop().slideUp(this._config.animationSpeed, () => {
      $(this._element).trigger(collapsedEvent)
      treeviewMenu.find(`${SELECTOR_OPEN} > ${SELECTOR_TREEVIEW_MENU}`).slideUp()
      treeviewMenu.find(SELECTOR_OPEN).removeClass(CLASS_NAME_OPEN)
    })
  }

  toggle(event) {
    const $relativeTarget = $(event.currentTarget)
    const $parent = $relativeTarget.parent()

    let treeviewMenu = $parent.find(`> ${SELECTOR_TREEVIEW_MENU}`)

    if (!treeviewMenu.is(SELECTOR_TREEVIEW_MENU)) {
      if (!$parent.is(SELECTOR_LI)) {
        treeviewMenu = $parent.parent().find(`> ${SELECTOR_TREEVIEW_MENU}`)
      }

      if (!treeviewMenu.is(SELECTOR_TREEVIEW_MENU)) {
        return
      }
    }

    event.preventDefault()

    const parentLi = $relativeTarget.parents(SELECTOR_LI).first()
    const isOpen = parentLi.hasClass(CLASS_NAME_OPEN)

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
    if ($('body').hasClass(CLASS_NAME_SIDEBAR_COLLAPSED)) {
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

$(window).on(EVENT_LOAD_DATA_API, () => {
  $(SELECTOR_DATA_WIDGET).each(function () {
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
