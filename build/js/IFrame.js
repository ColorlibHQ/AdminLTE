/**
 * --------------------------------------------
 * AdminLTE IFrame.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'IFrame'
const DATA_KEY = 'lte.iframe'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const SELECTOR_DATA_TOGGLE = '[data-widget="iframe"]'
const SELECTOR_CONTENT_WRAPPER = '.content-wrapper'
const SELECTOR_CONTENT_IFRAME = `${SELECTOR_CONTENT_WRAPPER} iframe`
const SELECTOR_TAB_NAVBAR_NAV = `${SELECTOR_DATA_TOGGLE}.iframe-mode .navbar-nav`
const SELECTOR_TAB_NAVBAR_NAV_ITEM = `${SELECTOR_TAB_NAVBAR_NAV} .nav-item`
const SELECTOR_NAV_LINK = '.nav-link[role="tab"]'
const SELECTOR_TAB_NAVBAR_NAV_LINK = `${SELECTOR_TAB_NAVBAR_NAV} ${SELECTOR_NAV_LINK}`
const SELECTOR_TAB_CONTENT = `${SELECTOR_DATA_TOGGLE}.iframe-mode .tab-content`
const SELECTOR_TAB_EMPTY = `${SELECTOR_TAB_CONTENT} .tab-empty`
const SELECTOR_SIDEBAR_MENU_ITEM = '.main-sidebar .nav-item > a.nav-link'
const CLASS_NAME_IFRAME_MODE = 'iframe-mode'

const Default = {
  click(item) {
    return item
  },
  changed(item) {
    return item
  }
}

/**
 * Class Definition
 * ====================================================
 */

class IFrame {
  constructor(element, config) {
    this._config = config
    this._element = element

    this._init()
  }

  // Public

  click(item) {
    this._config.click.call(item)
  }

  changed(item) {
    this._config.changed.call(item)
  }

  createTab(title, link) {
    const tabId = `panel-${link.replace('.html', '').replace('./', '').replace('/', '-')}-${Math.floor(Math.random() * 1000)}`
    const navId = `tab-${link.replace('.html', '').replace('./', '').replace('/', '-')}-${Math.floor(Math.random() * 1000)}`

    const newNavItem = `<li class="nav-item" role="presentation"><a class="nav-link" data-toggle="row" id="${navId}" href="#${tabId}" role="tab" aria-controls="${tabId}" aria-selected="false">${title}</a></li>`
    $(SELECTOR_TAB_NAVBAR_NAV).append(newNavItem)

    const newTabItem = `<div class="tab-pane fade" id="${tabId}" role="tabpanel" aria-labelledby="${navId}"><iframe src="${link}"></iframe></div>`
    $(SELECTOR_TAB_CONTENT).append(newTabItem)
  }

  openTabSidebar(item) {
    const title = $(item).find('p').text()
    const link = $(item).attr('href')
    $(`${SELECTOR_TAB_NAVBAR_NAV} .nav-link[role="tab"]`).tab('dispose')

    this.createTab(title, link)

    // eslint-disable-next-line no-console
    console.log($(SELECTOR_TAB_NAVBAR_NAV))
    $(`${SELECTOR_TAB_NAVBAR_NAV} ${SELECTOR_NAV_LINK}`).tab()
  }

  // Private

  _init() {
    if ($(SELECTOR_CONTENT_WRAPPER).hasClass(CLASS_NAME_IFRAME_MODE)) {
      this._setupListeners()
      this._fixHeight(true)
    }
  }

  _setupListeners() {
    $(window).on('resize', () => {
      setTimeout(() => {
        this._fixHeight()
      }, 1)
    })
    $(document).on('click', SELECTOR_SIDEBAR_MENU_ITEM, e => {
      e.preventDefault()
      // eslint-disable-next-line no-console
      console.log($(e.target))
      this.openTabSidebar(e.target)
    })
    $(document).on('click', SELECTOR_TAB_NAVBAR_NAV_ITEM, e => {
      e.preventDefault()
      $(SELECTOR_TAB_EMPTY).hide()
      $(`${SELECTOR_TAB_NAVBAR_NAV} .active`).removeClass('active')
      $(SELECTOR_TAB_NAVBAR_NAV_LINK).tab('dispose')
      this._fixHeight()
      $(e.target).tab('show')
      $(e.target).parents('li').addClass('active')
    })
  }

  _fixHeight(tabEmpty = false) {
    const contentWrapperHeight = parseFloat($(SELECTOR_CONTENT_WRAPPER).css('min-height'))
    const panelOffset = $('body').data('panel-auto-height')
    if (tabEmpty == true) {
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log(parseFloat(contentWrapperHeight + (panelOffset < 0 ? Math.abs(panelOffset) : panelOffset)))
        $(SELECTOR_TAB_EMPTY).height(contentWrapperHeight)
      }, 50)
    } else {
      $(SELECTOR_CONTENT_IFRAME).height(contentWrapperHeight)
    }
  }

  // Static

  static _jQueryInterface(operation) {
    let data = $(this).data(DATA_KEY)
    const _options = $.extend({}, Default, $(this).data())

    if (!data) {
      data = new IFrame(this, _options)
      $(this).data(DATA_KEY, data)
    }

    if (typeof operation === 'string' && operation.match(/openTabSidebar/)) {
      data[operation]()
    }
  }
}

/**
 * Data API
 * ====================================================
 */

$(window).on('load', () => {
  const gfg = window.frameElement

  if (gfg) {
    document.body.classList.add(CLASS_NAME_IFRAME_MODE)
  } else {
    IFrame._jQueryInterface.call($(SELECTOR_DATA_TOGGLE))
  }
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = IFrame._jQueryInterface
$.fn[NAME].Constructor = IFrame
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return IFrame._jQueryInterface
}

export default IFrame
