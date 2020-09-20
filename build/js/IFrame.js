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
const SELECTOR_DATA_TOGGLE_CLOSE = '[data-widget="iframe-close"]'
const SELECTOR_CONTENT_WRAPPER = '.content-wrapper'
const SELECTOR_CONTENT_IFRAME = `${SELECTOR_CONTENT_WRAPPER} iframe`
const SELECTOR_TAB_NAV = `${SELECTOR_DATA_TOGGLE}.iframe-mode .nav`
const SELECTOR_TAB_NAVBAR_NAV = `${SELECTOR_DATA_TOGGLE}.iframe-mode .navbar-nav`
const SELECTOR_TAB_NAVBAR_NAV_ITEM = `${SELECTOR_TAB_NAVBAR_NAV} .nav-item`
const SELECTOR_TAB_CONTENT = `${SELECTOR_DATA_TOGGLE}.iframe-mode .tab-content`
const SELECTOR_TAB_EMPTY = `${SELECTOR_TAB_CONTENT} .tab-empty`
const SELECTOR_TAB_LOADING = `${SELECTOR_TAB_CONTENT} .tab-loading`
const SELECTOR_SIDEBAR_MENU_ITEM = '.main-sidebar .nav-item > a.nav-link'
const SELECTOR_HEADER_MENU_ITEM = '.main-header .nav-item a.nav-link'
const SELECTOR_HEADER_DROPDOWN_ITEM = '.main-header a.dropdown-item'
const CLASS_NAME_IFRAME_MODE = 'iframe-mode'

const Default = {
  tabClick(item) {
    return item
  },
  tabChanged(item) {
    return item
  },
  tabCreated(item) {
    return item
  },
  autoIframeMode: true,
  autoItemActive: true,
  autoShowNewTab: true,
  loadingScreen: true,
  useNavbarItems: true
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

  tabClick(item) {
    this._config.tabClick(item)
  }

  tabChanged(item) {
    this._config.tabChanged(item)
  }

  tabCreated(item) {
    this._config.tabCreated(item)
  }

  createTab(title, link, autoOpen) {
    const tabId = `panel-${link.replace('.html', '').replace('./', '').replaceAll('/', '-')}-${Math.floor(Math.random() * 1000)}`
    const navId = `tab-${link.replace('.html', '').replace('./', '').replaceAll('/', '-')}-${Math.floor(Math.random() * 1000)}`

    const newNavItem = `<li class="nav-item" role="presentation"><a class="nav-link" data-toggle="row" id="${navId}" href="#${tabId}" role="tab" aria-controls="${tabId}" aria-selected="false">${title}</a></li>`
    $(SELECTOR_TAB_NAVBAR_NAV).append(newNavItem)

    const newTabItem = `<div class="tab-pane fade" id="${tabId}" role="tabpanel" aria-labelledby="${navId}"><iframe src="${link}"></iframe></div>`
    $(SELECTOR_TAB_CONTENT).append(newTabItem)

    if (autoOpen) {
      this.switchTab(`#${navId}`, this._config.loadingScreen)
    }

    this.tabCreated($(`#${navId}`))
  }

  openTabSidebar(item) {
    let $item = $(item).clone()
    if ($item.attr('href') === undefined) {
      $item = $(item).parent('a').clone()
    }

    $item.find('.right').remove()
    let title = $item.find('p').text()
    if (title === '') {
      title = $item.text()
    }

    const link = $item.attr('href')
    if (link === '#' || link === '' || link === undefined) {
      return
    }

    this.createTab(title, link, this._config.autoShowNewTab)
  }

  switchTab(item, loadingScreen = null) {
    $(SELECTOR_TAB_EMPTY).hide()
    $(`${SELECTOR_TAB_NAVBAR_NAV} .active`).tab('dispose').removeClass('active')
    this._fixHeight()
    const $item = $(item)
    const tabId = $item.attr('href')

    if (loadingScreen) {
      const $loadingScreen = $(SELECTOR_TAB_LOADING)
      $loadingScreen.fadeIn()
      $(`${tabId} iframe`).ready(() => {
        if (typeof loadingScreen === 'number') {
          setTimeout(() => {
            $loadingScreen.fadeOut()
          }, loadingScreen)
        } else {
          $loadingScreen.fadeOut()
        }
      })
    }

    $item.tab('show')
    $item.parents('li').addClass('active')
    this.tabChanged($item)

    if (this._config.autoItemActive) {
      this.setItemActive($(`${tabId} iframe`).attr('src'))
    }
  }

  setItemActive(href) {
    $(`${SELECTOR_SIDEBAR_MENU_ITEM}, ${SELECTOR_HEADER_DROPDOWN_ITEM}`).removeClass('active')
    $(SELECTOR_HEADER_MENU_ITEM).parent().removeClass('active')

    const $headerMenuItem = $(`${SELECTOR_HEADER_MENU_ITEM}[href$="${href}"]`)
    const $headerDropdownItem = $(`${SELECTOR_HEADER_DROPDOWN_ITEM}[href$="${href}"]`)
    const $sidebarMenuItem = $(`${SELECTOR_SIDEBAR_MENU_ITEM}[href$="${href}"]`)

    $headerMenuItem.each((i, e) => {
      $(e).parent().addClass('active')
    })
    $headerDropdownItem.each((i, e) => {
      $(e).addClass('active')
    })
    $sidebarMenuItem.each((i, e) => {
      $(e).addClass('active')
      $(e).parents('.nav-treeview').prevAll('.nav-link').addClass('active')
    })
  }

  removeActiveTab() {
    $(`${SELECTOR_TAB_NAVBAR_NAV_ITEM}.active`).parent().remove()
    $('.tab-pane.active').remove()

    if ($(SELECTOR_TAB_CONTENT).children().length == $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).length) {
      $(SELECTOR_TAB_EMPTY).show()
    }
  }

  // Private

  _init() {
    if (window.frameElement && this._config.autoIframeMode) {
      $('body').addClass(CLASS_NAME_IFRAME_MODE)
    } else if ($(SELECTOR_CONTENT_WRAPPER).hasClass(CLASS_NAME_IFRAME_MODE)) {
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
    $(document).on('click', `${SELECTOR_SIDEBAR_MENU_ITEM}, ${SELECTOR_HEADER_MENU_ITEM}, ${SELECTOR_HEADER_DROPDOWN_ITEM}`, e => {
      e.preventDefault()
      this.tabClick(e.target)
      this.openTabSidebar(e.target)
    })
    $(document).on('click', SELECTOR_TAB_NAVBAR_NAV_ITEM, e => {
      e.preventDefault()
      this.tabClick(e.target)
      this.switchTab(e.target)
    })
    $(document).on('click', SELECTOR_DATA_TOGGLE_CLOSE, e => {
      e.preventDefault()
      this.removeActiveTab()
    })
  }

  _fixHeight(tabEmpty = false) {
    const contentWrapperHeight = parseFloat($(SELECTOR_CONTENT_WRAPPER).css('min-height'))
    const navbarHeight = $(SELECTOR_TAB_NAV).outerHeight()
    if (tabEmpty == true) {
      setTimeout(() => {
        $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).height(contentWrapperHeight - navbarHeight)
      }, 50)
    } else {
      $(SELECTOR_CONTENT_IFRAME).height(contentWrapperHeight - navbarHeight)
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
  IFrame._jQueryInterface.call($(SELECTOR_DATA_TOGGLE))
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
