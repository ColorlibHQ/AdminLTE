// noinspection EqualityComparisonWithCoercionJS

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
const SELECTOR_DATA_TOGGLE_SCROLL_LEFT = '[data-widget="iframe-scrollleft"]'
const SELECTOR_DATA_TOGGLE_SCROLL_RIGHT = '[data-widget="iframe-scrollright"]'
const SELECTOR_DATA_TOGGLE_FULLSCREEN = '[data-widget="iframe-fullscreen"]'
const SELECTOR_CONTENT_WRAPPER = '.content-wrapper'
const SELECTOR_CONTENT_IFRAME = `${SELECTOR_CONTENT_WRAPPER} iframe`
const SELECTOR_TAB_NAV = `${SELECTOR_CONTENT_WRAPPER}.iframe-mode .nav`
const SELECTOR_TAB_NAVBAR_NAV = `${SELECTOR_CONTENT_WRAPPER}.iframe-mode .navbar-nav`
const SELECTOR_TAB_NAVBAR_NAV_ITEM = `${SELECTOR_TAB_NAVBAR_NAV} .nav-item`
const SELECTOR_TAB_NAVBAR_NAV_LINK = `${SELECTOR_TAB_NAVBAR_NAV} .nav-link`
const SELECTOR_TAB_CONTENT = `${SELECTOR_CONTENT_WRAPPER}.iframe-mode .tab-content`
const SELECTOR_TAB_EMPTY = `${SELECTOR_TAB_CONTENT} .tab-empty`
const SELECTOR_TAB_LOADING = `${SELECTOR_TAB_CONTENT} .tab-loading`
const SELECTOR_TAB_PANE = `${SELECTOR_TAB_CONTENT} .tab-pane`
const SELECTOR_SIDEBAR_MENU_ITEM = '.main-sidebar .nav-item > a.nav-link'
const SELECTOR_SIDEBAR_SEARCH_ITEM = '.sidebar-search-results .list-group-item'
const SELECTOR_HEADER_MENU_ITEM = '.main-header .nav-item a.nav-link'
const SELECTOR_HEADER_DROPDOWN_ITEM = '.main-header a.dropdown-item'
const CLASS_NAME_IFRAME_MODE = 'iframe-mode'
const CLASS_NAME_FULLSCREEN_MODE = 'iframe-mode-fullscreen'

const Default = {
  onTabClick(item) {
    return item
  },
  onTabChanged(item) {
    return item
  },
  onTabCreated(item) {
    return item
  },
  autoIframeMode: true,
  autoItemActive: true,
  autoShowNewTab: true,
  autoDarkMode: false,
  allowDuplicates: false,
  allowReload: true,
  loadingScreen: true,
  useNavbarItems: true,
  scrollOffset: 40,
  scrollBehaviorSwap: false,
  iconMaximize: 'fa-expand',
  iconMinimize: 'fa-compress'
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

  onTabClick(item) {
    this._config.onTabClick(item)
  }

  onTabChanged(item) {
    this._config.onTabChanged(item)
  }

  onTabCreated(item) {
    this._config.onTabCreated(item)
  }

  createTab(title, link, uniqueName, autoOpen) {
    let tabId = `panel-${uniqueName}`
    let navId = `tab-${uniqueName}`

    if (this._config.allowDuplicates) {
      tabId += `-${Math.floor(Math.random() * 1000)}`
      navId += `-${Math.floor(Math.random() * 1000)}`
    }

    const newNavItem = `<li class="nav-item" role="presentation"><a href="#" class="btn-iframe-close" data-widget="iframe-close" data-type="only-this"><i class="fas fa-times"></i></a><a class="nav-link" data-toggle="row" id="${navId}" href="#${tabId}" role="tab" aria-controls="${tabId}" aria-selected="false">${title}</a></li>`
    $(SELECTOR_TAB_NAVBAR_NAV).append(unescape(escape(newNavItem)))

    const newTabItem = `<div class="tab-pane fade" id="${tabId}" role="tabpanel" aria-labelledby="${navId}"><iframe src="${link}"></iframe></div>`
    $(SELECTOR_TAB_CONTENT).append(unescape(escape(newTabItem)))

    if (autoOpen) {
      if (this._config.loadingScreen) {
        const $loadingScreen = $(SELECTOR_TAB_LOADING)

        if (!$loadingScreen.is(':animated')) {
          $loadingScreen.fadeIn()
        }

        $(`${tabId} iframe`).ready(() => {
          if (typeof this._config.loadingScreen === 'number') {
            this.switchTab(`#${navId}`)
            setTimeout(() => {
              $loadingScreen.fadeOut()
            }, this._config.loadingScreen)
          } else {
            this.switchTab(`#${navId}`)
            $loadingScreen.fadeOut()
          }
        })
      } else {
        this.switchTab(`#${navId}`)
      }
    }

    this.onTabCreated($(`#${navId}`))
  }

  openTabSidebar(item, autoOpen = this._config.autoShowNewTab) {
    let $item = $(item).clone()
    if ($item.attr('href') === undefined) {
      $item = $(item).parent('a').clone()
    }

    $item.find('.right, .search-path').remove()
    let title = $item.find('p').text()
    if (title === '') {
      title = $item.text()
    }

    const link = $item.attr('href')
    if (link === '#' || link === '' || link === undefined) {
      return
    }

    const uniqueName = unescape(link).replace('./', '').replace(/["#&'./:=?[\]]/gi, '-').replace(/(--)/gi, '')
    const navId = `tab-${uniqueName}`

    if (!this._config.allowDuplicates && $(`#${navId}`).length > 0) {
      return this.switchTab(`#${navId}`, this._config.allowReload)
    }

    if ((!this._config.allowDuplicates && $(`#${navId}`).length === 0) || this._config.allowDuplicates) {
      this.createTab(title, link, uniqueName, autoOpen)
    }
  }

  switchTab(item, reload = false) {
    const $item = $(item)
    const tabId = $item.attr('href')

    $(SELECTOR_TAB_EMPTY).hide()

    if (reload) {
      const $loadingScreen = $(SELECTOR_TAB_LOADING)
      if (this._config.loadingScreen) {
        $loadingScreen.show(0, () => {
          $(`${tabId} iframe`).attr('src', $(`${tabId} iframe`).attr('src')).ready(() => {
            if (this._config.loadingScreen) {
              if (typeof this._config.loadingScreen === 'number') {
                setTimeout(() => {
                  $loadingScreen.fadeOut()
                }, this._config.loadingScreen)
              } else {
                $loadingScreen.fadeOut()
              }
            }
          })
        })
      } else {
        $(`${tabId} iframe`).attr('src', $(`${tabId} iframe`).attr('src'))
      }
    }

    $(`${SELECTOR_TAB_NAVBAR_NAV} .active`).tab('dispose').removeClass('active')

    this._fixHeight()

    $item.tab('show')
    $item.parents('li').addClass('active')
    this.onTabChanged($item)

    if (this._config.autoItemActive) {
      this._setItemActive($(`${tabId} iframe`).attr('src'))
    }
  }

  removeActiveTab(type, element) {
    if (type == 'all') {
      $(SELECTOR_TAB_NAVBAR_NAV_ITEM).remove()
      $(SELECTOR_TAB_PANE).remove()
      $(SELECTOR_TAB_EMPTY).show()
    } else if (type == 'all-other') {
      $(`${SELECTOR_TAB_NAVBAR_NAV_ITEM}:not(.active)`).remove()
      $(`${SELECTOR_TAB_PANE}:not(.active)`).remove()
    } else if (type == 'only-this') {
      const $navClose = $(element)
      const $navItem = $navClose.parent('.nav-item')
      const $navItemParent = $navItem.parent()
      const navItemIndex = $navItem.index()
      const tabId = $navClose.siblings('.nav-link').attr('aria-controls')
      $navItem.remove()
      $(`#${tabId}`).remove()
      if ($(SELECTOR_TAB_CONTENT).children().length == $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).length) {
        $(SELECTOR_TAB_EMPTY).show()
      } else {
        const prevNavItemIndex = navItemIndex - 1
        this.switchTab($navItemParent.children().eq(prevNavItemIndex).find('a.nav-link'))
      }
    } else {
      const $navItem = $(`${SELECTOR_TAB_NAVBAR_NAV_ITEM}.active`)
      const $navItemParent = $navItem.parent()
      const navItemIndex = $navItem.index()
      $navItem.remove()
      $(`${SELECTOR_TAB_PANE}.active`).remove()
      if ($(SELECTOR_TAB_CONTENT).children().length == $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).length) {
        $(SELECTOR_TAB_EMPTY).show()
      } else {
        const prevNavItemIndex = navItemIndex - 1
        this.switchTab($navItemParent.children().eq(prevNavItemIndex).find('a.nav-link'))
      }
    }
  }

  toggleFullscreen() {
    if ($('body').hasClass(CLASS_NAME_FULLSCREEN_MODE)) {
      $(`${SELECTOR_DATA_TOGGLE_FULLSCREEN} i`).removeClass(this._config.iconMinimize).addClass(this._config.iconMaximize)
      $('body').removeClass(CLASS_NAME_FULLSCREEN_MODE)
      $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).height('100%')
      $(SELECTOR_CONTENT_WRAPPER).height('100%')
      $(SELECTOR_CONTENT_IFRAME).height('100%')
    } else {
      $(`${SELECTOR_DATA_TOGGLE_FULLSCREEN} i`).removeClass(this._config.iconMaximize).addClass(this._config.iconMinimize)
      $('body').addClass(CLASS_NAME_FULLSCREEN_MODE)
    }

    $(window).trigger('resize')
    this._fixHeight(true)
  }

  // Private

  _init() {
    const usingDefTab = ($(SELECTOR_TAB_CONTENT).children().length > 2)

    this._setupListeners()
    this._fixHeight(true)

    if (usingDefTab) {
      const $el = $(`${SELECTOR_TAB_PANE}`).first()
      const uniqueName = $el.attr('id').replace('panel-', '')
      const navId = `#tab-${uniqueName}`

      this.switchTab(navId, true)
    }
  }

  _initFrameElement() {
    if (window.frameElement && this._config.autoIframeMode) {
      const $body = $('body')
      $body.addClass(CLASS_NAME_IFRAME_MODE)

      if (this._config.autoDarkMode) {
        $body.addClass('dark-mode')
      }
    }
  }

  _navScroll(offset) {
    const leftPos = $(SELECTOR_TAB_NAVBAR_NAV).scrollLeft()
    $(SELECTOR_TAB_NAVBAR_NAV).animate({ scrollLeft: (leftPos + offset) }, 250, 'linear')
  }

  _setupListeners() {
    $(window).on('resize', () => {
      setTimeout(() => {
        this._fixHeight()
      }, 1)
    })
    if ($(SELECTOR_CONTENT_WRAPPER).hasClass(CLASS_NAME_IFRAME_MODE)) {
      $(document).on('click', `${SELECTOR_SIDEBAR_MENU_ITEM}, ${SELECTOR_SIDEBAR_SEARCH_ITEM}`, e => {
        e.preventDefault()
        this.openTabSidebar(e.target)
      })
      if (this._config.useNavbarItems) {
        $(document).on('click', `${SELECTOR_HEADER_MENU_ITEM}, ${SELECTOR_HEADER_DROPDOWN_ITEM}`, e => {
          e.preventDefault()
          this.openTabSidebar(e.target)
        })
      }
    }

    $(document).on('click', SELECTOR_TAB_NAVBAR_NAV_LINK, e => {
      e.preventDefault()
      this.onTabClick(e.target)
      this.switchTab(e.target)
    })
    $(document).on('click', SELECTOR_TAB_NAVBAR_NAV_LINK, e => {
      e.preventDefault()
      this.onTabClick(e.target)
      this.switchTab(e.target)
    })
    $(document).on('click', SELECTOR_DATA_TOGGLE_CLOSE, e => {
      e.preventDefault()
      let { target } = e

      if (target.nodeName === 'I') {
        target = e.target.offsetParent
      }

      this.removeActiveTab(target.attributes['data-type'] ? target.attributes['data-type'].nodeValue : null, target)
    })
    $(document).on('click', SELECTOR_DATA_TOGGLE_FULLSCREEN, e => {
      e.preventDefault()
      this.toggleFullscreen()
    })
    let mousedown = false
    let mousedownInterval = null
    $(document).on('mousedown', SELECTOR_DATA_TOGGLE_SCROLL_LEFT, e => {
      e.preventDefault()
      clearInterval(mousedownInterval)

      let { scrollOffset } = this._config

      if (!this._config.scrollBehaviorSwap) {
        scrollOffset = -scrollOffset
      }

      mousedown = true
      this._navScroll(scrollOffset)

      mousedownInterval = setInterval(() => {
        this._navScroll(scrollOffset)
      }, 250)
    })
    $(document).on('mousedown', SELECTOR_DATA_TOGGLE_SCROLL_RIGHT, e => {
      e.preventDefault()
      clearInterval(mousedownInterval)

      let { scrollOffset } = this._config

      if (this._config.scrollBehaviorSwap) {
        scrollOffset = -scrollOffset
      }

      mousedown = true
      this._navScroll(scrollOffset)

      mousedownInterval = setInterval(() => {
        this._navScroll(scrollOffset)
      }, 250)
    })
    $(document).on('mouseup', () => {
      if (mousedown) {
        mousedown = false
        clearInterval(mousedownInterval)
        mousedownInterval = null
      }
    })
  }

  _setItemActive(href) {
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

  _fixHeight(tabEmpty = false) {
    if ($('body').hasClass(CLASS_NAME_FULLSCREEN_MODE)) {
      const windowHeight = $(window).height()
      const navbarHeight = $(SELECTOR_TAB_NAV).outerHeight()
      $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}, ${SELECTOR_CONTENT_IFRAME}`).height(windowHeight - navbarHeight)
      $(SELECTOR_CONTENT_WRAPPER).height(windowHeight)
    } else {
      const contentWrapperHeight = parseFloat($(SELECTOR_CONTENT_WRAPPER).css('height'))
      const navbarHeight = $(SELECTOR_TAB_NAV).outerHeight()
      if (tabEmpty == true) {
        setTimeout(() => {
          $(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).height(contentWrapperHeight - navbarHeight)
        }, 50)
      } else {
        $(SELECTOR_CONTENT_IFRAME).height(contentWrapperHeight - navbarHeight)
      }
    }
  }

  // Static
  // eslint-disable-next-line max-params
  static _jQueryInterface(config, name, link, id, reload) {
    if ($(SELECTOR_DATA_TOGGLE).length > 0) {
      let data = $(this).data(DATA_KEY)

      if (!data) {
        data = $(this).data()
      }

      const _options = $.extend({}, Default, typeof config === 'object' ? config : data)
      localStorage.setItem('AdminLTE:IFrame:Options', JSON.stringify(_options))
      const plugin = new IFrame($(this), _options)
      window.iFrameInstance = plugin
      $(this).data(DATA_KEY, typeof config === 'object' ? config : { link, name, id, reload, ...data })
      if (typeof config === 'string' && /createTab|openTabSidebar|switchTab|removeActiveTab/.test(config)) {
        plugin[config](name, link, id, reload)
      }
    } else {
      window.iFrameInstance = new IFrame($(this), JSON.parse(localStorage.getItem('AdminLTE:IFrame:Options')))._initFrameElement()
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
