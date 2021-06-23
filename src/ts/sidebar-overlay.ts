/**
 * --------------------------------------------
 * AdminLTE sidebar-overlay.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady,
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse'
const CLASS_NAME_SIDEBAR_CLOSE = 'sidebar-close'
const CLASS_NAME_SIDEBAR_OPEN = 'sidebar-open'
const CLASS_NAME_LAYOUT_MOBILE = 'layout-mobile'
const CLASS_NAME_HEADER_MOBILE_OPEN = 'header-mobile-open'

const SELECTOR_SIDEBAR_SM = `.${CLASS_NAME_LAYOUT_MOBILE}`
const SELECTOR_CONTENT_WRAPPER = '.content-wrapper'

const Defaults = {
  onLayouMobile: 992,
}

class SidebarOverlay {
  addSidebaBreakPoint(): void {
    const bodyClass = document.body.classList
    const widthOutput: number = window.innerWidth
    if (widthOutput >= Defaults.onLayouMobile) {
      bodyClass.remove(CLASS_NAME_LAYOUT_MOBILE)
    } else {
      bodyClass.add(CLASS_NAME_LAYOUT_MOBILE)
    }
  }

  removeOverlaySidebar(): void {
    const bodyClass = document.body.classList
    if (bodyClass.contains(CLASS_NAME_LAYOUT_MOBILE)) {
      bodyClass.remove(CLASS_NAME_SIDEBAR_OPEN)
      bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
      bodyClass.remove(CLASS_NAME_HEADER_MOBILE_OPEN)
      bodyClass.add(CLASS_NAME_SIDEBAR_CLOSE)
    }
  }

  closeSidebar(): void {
    const widthOutput: number = window.innerWidth
    if (widthOutput < Defaults.onLayouMobile) {
      document.body.classList.add(CLASS_NAME_SIDEBAR_CLOSE)
    }
  }

  init(): void {
    const selSidebarSm = document.querySelector(SELECTOR_SIDEBAR_SM)
    const selContentWrapper = selSidebarSm?.querySelector(SELECTOR_CONTENT_WRAPPER)

    if (selContentWrapper) {
      selContentWrapper.addEventListener('touchstart', this.removeOverlaySidebar)
      selContentWrapper.addEventListener('click', this.removeOverlaySidebar)
    }
  }
}

domReady(() => {
  const data = new SidebarOverlay()

  data.addSidebaBreakPoint()
  data.init()
  data.closeSidebar()

  window.addEventListener('resize', () => {
    data.addSidebaBreakPoint()
    data.init()
  })
})

export default SidebarOverlay
