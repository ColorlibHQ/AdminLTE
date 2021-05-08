/**
 * --------------------------------------------
 * AdminLTE treeview.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse'
const CLASS_NAME_SIDEBAR_CLOSE = 'sidebar-close'
const CLASS_NAME_SIDEBAR_OPEN = 'sidebar-open'
const CLASS_NAME_SIDEBAR_SM = 'sidebar-sm'

const SELECTOR_SIDEBAR_SM = `.${CLASS_NAME_SIDEBAR_SM}`
const SELECTOR_CONTENT = '.content'

class SidebarOverlay {
  addSidebaBreakPoint(): void {
    const bodyClass = document.body.classList
    const widthOutput: number = window.innerWidth
    if (widthOutput > 576) {
      bodyClass.remove(CLASS_NAME_SIDEBAR_SM)
    } else {
      bodyClass.add(CLASS_NAME_SIDEBAR_SM)
    }
  }

  removeOverlaySidebar(): void {
    const bodyClass = document.body.classList
    if (bodyClass.contains(CLASS_NAME_SIDEBAR_SM)) {
      bodyClass.remove(CLASS_NAME_SIDEBAR_OPEN)
      bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
      bodyClass.add(CLASS_NAME_SIDEBAR_CLOSE)
    }
  }

  init(): void {
    const selSidebarSm = document.querySelector(SELECTOR_SIDEBAR_SM)
    const selContentWrapper = selSidebarSm?.querySelector(SELECTOR_CONTENT)

    selContentWrapper?.addEventListener('touchstart', this.removeOverlaySidebar)
    selContentWrapper?.addEventListener('click', this.removeOverlaySidebar)
  }
}

domReady(() => {
  const data = new SidebarOverlay()

  data.addSidebaBreakPoint()
  data.init()

  window.addEventListener('resize', () => {
    data.addSidebaBreakPoint()
    data.init()
  })
})

export default SidebarOverlay
