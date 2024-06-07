/**
 * --------------------------------------------
 * @file AdminLTE control-sidebar.ts
 * @description Control Sidebar for AdminLTE.
 * @license MIT
 * --------------------------------------------
 */

import {
  onDOMContentLoaded
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'ControlSidebar'
const EVENT_COLLAPSED = `collapsed${NAME}`
const EVENT_COLLAPSED_DONE = `collapsed-done${NAME}`
const EVENT_EXPANDED = `expanded${NAME}`

const SELECTOR_CONTROL_SIDEBAR = '.control-sidebar'
const SELECTOR_CONTROL_SIDEBAR_CONTENT = '.control-sidebar-content'
const SELECTOR_DATA_TOGGLE = '[data-widget="control-sidebar"]'
const SELECTOR_HEADER = '.app-header'
const SELECTOR_FOOTER = '.app-footer'

const CLASS_NAME_CONTROL_SIDEBAR_ANIMATE = 'control-sidebar-animate'
const CLASS_NAME_CONTROL_SIDEBAR_OPEN = 'control-sidebar-open'
const CLASS_NAME_CONTROL_SIDEBAR_SLIDE = 'control-sidebar-slide-open'
const CLASS_NAME_LAYOUT_FIXED = 'layout-fixed'
const CLASS_NAME_NAVBAR_FIXED = 'layout-navbar-fixed'
const CLASS_NAME_NAVBAR_SM_FIXED = 'layout-sm-navbar-fixed'
const CLASS_NAME_NAVBAR_MD_FIXED = 'layout-md-navbar-fixed'
const CLASS_NAME_NAVBAR_LG_FIXED = 'layout-lg-navbar-fixed'
const CLASS_NAME_NAVBAR_XL_FIXED = 'layout-xl-navbar-fixed'
const CLASS_NAME_FOOTER_FIXED = 'layout-footer-fixed'
const CLASS_NAME_FOOTER_SM_FIXED = 'layout-sm-footer-fixed'
const CLASS_NAME_FOOTER_MD_FIXED = 'layout-md-footer-fixed'
const CLASS_NAME_FOOTER_LG_FIXED = 'layout-lg-footer-fixed'
const CLASS_NAME_FOOTER_XL_FIXED = 'layout-xl-footer-fixed'

type ControlSidebarOptions = {
  controlSidebarSlide: boolean;
  scrollbarTheme: string;
  scrollbarAutoHide: string;
  target: string;
  animationSpeed: number;
}

const Default: ControlSidebarOptions = {
  controlSidebarSlide: true,
  scrollbarTheme: 'os-theme-light',
  scrollbarAutoHide: 'l',
  target: SELECTOR_CONTROL_SIDEBAR,
  animationSpeed: 300
}

// ControlSidebar Class
class ControlSidebar {
  private readonly _element: Element
  private readonly _config: ControlSidebarOptions

  constructor(element: Element, config: Partial<ControlSidebarOptions>) {
    this._element = element
    this._config = { ...Default, ...config }
  }

  // Public methods
  collapse(): void {
    const { body, documentElement } = document
    const html = documentElement

    // Show the control sidebar
    if (this._config.controlSidebarSlide) {
      html.classList.add(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
      body.classList.remove(CLASS_NAME_CONTROL_SIDEBAR_SLIDE)
      setTimeout(() => {
        const controlSidebar = document?.querySelector(this._config.target) as HTMLElement | undefined
        if (controlSidebar) {
          controlSidebar.style.display = 'none'
        }

        html.classList.remove(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
      }, 300)
    } else {
      body.classList.remove(CLASS_NAME_CONTROL_SIDEBAR_OPEN)
    }

    this._element.dispatchEvent(new CustomEvent(EVENT_COLLAPSED))

    setTimeout(() => {
      this._element.dispatchEvent(new CustomEvent(EVENT_COLLAPSED_DONE))
    }, this._config.animationSpeed)
  }

  show(toggle = false): void {
    const { body, documentElement } = document
    const html = documentElement
    const controlSidebar: HTMLElement = document.querySelector(this._config.target)!
    if (toggle) {
      controlSidebar.style.display = 'none'
    }

    // Collapse the control sidebar
    if (this._config.controlSidebarSlide) {
      html.classList.add(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
      setTimeout(() => {
        controlSidebar.style.display = 'block'
        setTimeout(() => {
          body.classList.add(CLASS_NAME_CONTROL_SIDEBAR_SLIDE)
          setTimeout(() => {
            html.classList.remove(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
          }, 300)
        }, 10)
      })
    } else {
      body.classList.add(CLASS_NAME_CONTROL_SIDEBAR_OPEN)
    }

    this._fixHeight()
    this._fixScrollHeight()

    this._element.dispatchEvent(new CustomEvent(EVENT_EXPANDED))
  }

  toggle(): void {
    const { body } = document
    const target = document.querySelector(this._config.target)!

    const notVisible = !target || getComputedStyle(target).display === 'none'
    const shouldClose = body.classList.contains(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || body.classList.contains(CLASS_NAME_CONTROL_SIDEBAR_SLIDE)
    const shouldToggle = notVisible && (body.classList.contains(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || body.classList.contains(CLASS_NAME_CONTROL_SIDEBAR_SLIDE))

    if (notVisible || shouldToggle) {
      // Open the control sidebar
      this.show(notVisible)
    } else if (shouldClose) {
      // Close the control sidebar
      this.collapse()
    }
  }

  _init(): void {
    const { body } = document
    const shouldNotHideAll = body.classList.contains(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || body.classList.contains(CLASS_NAME_CONTROL_SIDEBAR_SLIDE)

    if (shouldNotHideAll) {
      const controlSidebar: HTMLElement = document.querySelector(this._config.target)!
      if (controlSidebar) {
        controlSidebar.style.display = 'block'
      }
    } else {
      const controlSidebars = document.querySelectorAll(SELECTOR_CONTROL_SIDEBAR)
      controlSidebars.forEach(sidebar => {
        (sidebar as HTMLElement).style.display = 'none'
      })
    }

    this._fixHeight()
    this._fixScrollHeight()

    window.addEventListener('resize', () => {
      this._fixHeight()
      this._fixScrollHeight()
    })

    window.addEventListener('scroll', () => {
      const shouldFixHeight = body.classList.contains(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || body.classList.contains(CLASS_NAME_CONTROL_SIDEBAR_SLIDE)

      if (shouldFixHeight) {
        this._fixScrollHeight()
      }
    })
  }

  private _isNavbarFixed(): boolean {
    const { body } = document
    return body.classList.contains(CLASS_NAME_NAVBAR_FIXED) || body.classList.contains(CLASS_NAME_NAVBAR_SM_FIXED) || body.classList.contains(CLASS_NAME_NAVBAR_MD_FIXED) || body.classList.contains(CLASS_NAME_NAVBAR_LG_FIXED) || body.classList.contains(CLASS_NAME_NAVBAR_XL_FIXED)
  }

  private _isFooterFixed(): boolean {
    const { body } = document
    return body.classList.contains(CLASS_NAME_FOOTER_FIXED) || body.classList.contains(CLASS_NAME_FOOTER_SM_FIXED) || body.classList.contains(CLASS_NAME_FOOTER_MD_FIXED) || body.classList.contains(CLASS_NAME_FOOTER_LG_FIXED) || body.classList.contains(CLASS_NAME_FOOTER_XL_FIXED)
  }

  private _fixScrollHeight(): void {
    const { body } = document
    const controlSidebar: HTMLElement = document.querySelector(this._config.target)!

    if (!controlSidebar || !body.classList.contains(CLASS_NAME_LAYOUT_FIXED)) {
      return
    }

    const heights = {
      scroll: body.scrollHeight,
      window: window.innerHeight,
      header: document.querySelector(SELECTOR_HEADER)?.clientHeight ?? 0,
      footer: document.querySelector(SELECTOR_FOOTER)?.clientHeight ?? 0
    }

    const positions = {
      bottom: Math.abs((heights.window + window.scrollY) - heights.scroll),
      top: window.scrollY
    }

    const navbarFixed = this._isNavbarFixed()
    const footerFixed = this._isFooterFixed()

    const controlSidebarContent: HTMLElement = controlSidebar.querySelector(SELECTOR_CONTROL_SIDEBAR_CONTENT)!

    if (positions.top === 0 && positions.bottom === 0) {
      controlSidebar.style.bottom = `${heights.footer}px`
      controlSidebar.style.top = `${heights.header}px`
      controlSidebarContent.style.height = `${heights.window - (heights.header + heights.footer)}px`
    } else if (positions.bottom <= heights.footer) {
      if (footerFixed) {
        controlSidebar.style.bottom = `${heights.footer}px`
      } else {
        const top = heights.header - positions.top
        controlSidebar.style.bottom = `${heights.footer - positions.bottom}px`
        controlSidebar.style.top = `${top >= 0 ? top : 0}px`
        controlSidebarContent.style.height = `${heights.window - (heights.footer - positions.bottom)}px`
      }
    } else if (positions.top <= heights.header) {
      if (navbarFixed) {
        controlSidebar.style.top = `${heights.header}px`
      } else {
        controlSidebar.style.top = `${heights.header - positions.top}px`
        controlSidebarContent.style.height = `${heights.window - (heights.header - positions.top)}px`
      }
    } else if (navbarFixed) {
      controlSidebar.style.top = `${heights.header}px`
    } else {
      controlSidebar.style.top = '0px'
      controlSidebarContent.style.height = `${heights.window}px`
    }

    if (footerFixed && navbarFixed) {
      controlSidebarContent.style.height = '100%'
      controlSidebar.style.height = ''
    } else if (footerFixed || navbarFixed) {
      controlSidebarContent.style.height = '100%'
      controlSidebar.style.height = ''
    }
  }

  private _fixHeight(): void {
    const { body } = document
    const controlSidebarContent: HTMLElement = document.querySelector(`${this._config.target} ${SELECTOR_CONTROL_SIDEBAR_CONTENT}`)!

    if (!controlSidebarContent || !body.classList.contains(CLASS_NAME_LAYOUT_FIXED)) {
      return
    }

    const heights = {
      window: window.innerHeight,
      header: document.querySelector(SELECTOR_HEADER)?.clientHeight ?? 0,
      footer: document.querySelector(SELECTOR_FOOTER)?.clientHeight ?? 0
    }

    let sidebarHeight = heights.window - heights.header

    if (this._isFooterFixed()) {
      sidebarHeight = heights.window - heights.header - heights.footer
    }

    controlSidebarContent.style.height = `${sidebarHeight}px`
  }
}
// Data API implementation

onDOMContentLoaded(() => {
  const controlSidebarElements = document.querySelectorAll(SELECTOR_DATA_TOGGLE)
  controlSidebarElements.forEach(element => {
    const controlSidebar = new ControlSidebar(element, Default)
    element.addEventListener('click', event => {
      event.preventDefault()
      controlSidebar.toggle()
    })
    controlSidebar._init()
  })
})

// Export the class
export default ControlSidebar
