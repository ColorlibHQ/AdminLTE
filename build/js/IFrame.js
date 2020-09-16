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
const SELECTOR_TAB_CONTENT = `${SELECTOR_DATA_TOGGLE}.iframe-mode .tab-content`
const SELECTOR_SIDEBAR_MENU_ITEM = '.main-sidebar .nav-item a.nav-link'
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

    const newNavItem = `<li class="nav-item" role="presentation"><a class="nav-link active" id="${navId}" data-toggle="tab" href="#${tabId}" role="tab" aria-controls="${tabId}" aria-selected="true">${title}</a></li>`
    $(SELECTOR_TAB_NAVBAR_NAV).append(newNavItem)

    const newTabItem = `<div class="tab-pane fade" id="${tabId}" role="tabpanel" aria-labelledby="${navId}"><iframe src="${link}"></iframe></div>`
    $(SELECTOR_TAB_CONTENT).append(newTabItem)

    // eslint-disable-next-line no-console
    console.log($(SELECTOR_TAB_CONTENT))
  }

  openTabSidebar(item) {
    const title = $(item).find('p').text()
    const link = $(item).attr('href')

    this.createTab(title, link)
  }

  // Private

  _init() {
    if ($(SELECTOR_CONTENT_WRAPPER).hasClass(CLASS_NAME_IFRAME_MODE)) {
      this._setupListeners()
      $(SELECTOR_TAB_NAVBAR_NAV)

      $(SELECTOR_CONTENT_IFRAME).height($(SELECTOR_CONTENT_WRAPPER).height())
    }
  }

  _setupListeners() {
    $(document).on('click', SELECTOR_SIDEBAR_MENU_ITEM, e => {
      e.preventDefault()
      this.openTabSidebar(e.target)
    })
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
