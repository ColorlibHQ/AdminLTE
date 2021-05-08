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

const CLASS_NAME_SIDEBAR_HOVER = 'sidebar-hover'

const SELECTOR_SIDEBAR = '.sidebar'

class SidebarHover {
  onHover(): void {
    const bodyClass = document.body.classList
    bodyClass.add(CLASS_NAME_SIDEBAR_HOVER)
  }

  notHover(): void {
    const bodyClass = document.body.classList
    bodyClass.remove(CLASS_NAME_SIDEBAR_HOVER)
  }

  init(): void {
    const selSidebar = document.querySelector(SELECTOR_SIDEBAR)
    selSidebar?.addEventListener('mouseover', () => {
      this.onHover()
    })

    selSidebar?.addEventListener('mouseout', () => {
      this.notHover()
    })
  }
}

domReady(() => {
  const data = new SidebarHover()
  data.init()
})

export default SidebarHover
