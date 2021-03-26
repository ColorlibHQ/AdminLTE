/**
 * --------------------------------------------
 * AdminLTE pushmenu.ts
 * License MIT
 * --------------------------------------------
 */

import {
  windowReady
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const CLASS_NAME_SIDEBAR_MINI = 'sidebar-mini'
const CLASS_NAME_SIDEBAR_MINI_HAD = 'sidebar-mini-had'
const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse'
const CLASS_NAME_SIDEBAR_CLOSE = 'sidebar-close'
const CLASS_NAME_SIDEBAR_OPEN = 'sidebar-open'
const CLASS_NAME_SIDEBAR_OPENING = 'sidebar-is-opening'
const CLASS_NAME_SIDEBAR_COLLAPSING = 'sidebar-is-collapsing'
const CLASS_NAME_SIDEBAR_SM = 'sidebar-sm'
const CLASS_NAME_SIDEBAR_HOVER = 'sidebar-hover'

const SELECTOR_SIDEBAR = '.sidebar'
// const SELECTOR_MAIN_SIDEBAR = '.main-sidebar'
// const SELECTOR_CONTENT_WRAPPER = '.content-wrapper'
const SELECTOR_MINI_TOGGLE = '[data-pushmenu="mini"]'
const SELECTOR_FULL_TOGGLE = '[data-pushmenu="full"]'
const SELECTOR_SIDEBAR_SM = `.${CLASS_NAME_SIDEBAR_SM}`
const SELECTOR_CONTENT = '.content'

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  sidebarOpening(): void {
    const bodyClass = document.body.classList

    bodyClass.add(CLASS_NAME_SIDEBAR_OPENING)
    setTimeout(() => {
      bodyClass.remove(CLASS_NAME_SIDEBAR_OPENING)
    }, 1000)
  }

  sidebarColllapsing(): void {
    const bodyClass = document.body.classList

    bodyClass.add(CLASS_NAME_SIDEBAR_COLLAPSING)
    setTimeout(() => {
      bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSING)
    }, 1000)
  }

  expand(): void {
    this.sidebarOpening()
    const bodyClass = document.body.classList
    bodyClass.remove(CLASS_NAME_SIDEBAR_CLOSE)
    bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
    bodyClass.add(CLASS_NAME_SIDEBAR_OPEN)
  }

  collapse(): void {
    this.sidebarColllapsing()
    const bodyClass = document.body.classList
    bodyClass.add(CLASS_NAME_SIDEBAR_COLLAPSE)
  }

  close(): void {
    const bodyClass = document.body.classList
    bodyClass.add(CLASS_NAME_SIDEBAR_CLOSE)
    // if (bodyClass.contains(CLASS_NAME_SIDEBAR_SM)) {
    bodyClass.remove(CLASS_NAME_SIDEBAR_OPEN)
    // }
  }

  toggleFull(): void {
    const bodyClass = document.body.classList

    if (bodyClass.contains(CLASS_NAME_SIDEBAR_CLOSE)) {
      this.expand()
    } else {
      this.close()
    }

    if (bodyClass.contains(CLASS_NAME_SIDEBAR_MINI)) {
      bodyClass.remove(CLASS_NAME_SIDEBAR_MINI)
      bodyClass.add(CLASS_NAME_SIDEBAR_MINI_HAD)
    }
  }

  toggleMini(): void {
    const bodyClass = document.body.classList

    if (bodyClass.contains(CLASS_NAME_SIDEBAR_MINI_HAD)) {
      bodyClass.remove(CLASS_NAME_SIDEBAR_MINI_HAD)
      bodyClass.add(CLASS_NAME_SIDEBAR_MINI)
    }

    if (bodyClass.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  toggle(state: string): void {
    if (state === 'full') {
      this.toggleFull()
    } else if (state === 'mini') {
      this.toggleMini()
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

windowReady(() => {
  function addSidebaBreakPoint() {
    const widthOutput: number = window.innerWidth
    const bodyClass = document.body.classList
    if (widthOutput >= 576) {
      bodyClass.remove(CLASS_NAME_SIDEBAR_SM)
    } else {
      bodyClass.add(CLASS_NAME_SIDEBAR_SM)
    }
  }

  addSidebaBreakPoint()

  window.addEventListener('resize', addSidebaBreakPoint)

  const fullBtn = document.querySelectorAll(SELECTOR_FULL_TOGGLE)
  const miniBtn = document.querySelectorAll(SELECTOR_MINI_TOGGLE)

  for (const btn of fullBtn) {
    btn.addEventListener('click', () => {
      const data = new PushMenu()
      data.toggle('full')
    })
  }

  for (const btn of miniBtn) {
    btn.addEventListener('click', () => {
      const data = new PushMenu()
      data.toggle('mini')
    })
  }

  const selSidebar = document.querySelector(SELECTOR_SIDEBAR)

  selSidebar?.addEventListener('mouseover', () => {
    const bodyClass = document.body.classList
    bodyClass.add(CLASS_NAME_SIDEBAR_HOVER)
  })

  selSidebar?.addEventListener('mouseout', () => {
    const bodyClass = document.body.classList
    bodyClass.remove(CLASS_NAME_SIDEBAR_HOVER)
  })

  function removeOverlaySidebar() {
    const bodyClass = document.body.classList
    if (bodyClass.contains(CLASS_NAME_SIDEBAR_SM)) {
      bodyClass.remove(CLASS_NAME_SIDEBAR_OPEN)
      bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
      bodyClass.add(CLASS_NAME_SIDEBAR_CLOSE)
    }
  }

  let selSidebarSm = document.querySelector(SELECTOR_SIDEBAR_SM)
  let selContentWrapper = selSidebarSm?.querySelector(SELECTOR_CONTENT)

  window.addEventListener('resize', () => {
    selSidebarSm = document.querySelector(SELECTOR_SIDEBAR_SM)
    selContentWrapper = selSidebarSm?.querySelector(SELECTOR_CONTENT)
    selContentWrapper?.addEventListener('touchstart', removeOverlaySidebar)
    selContentWrapper?.addEventListener('click', removeOverlaySidebar)
  })

  selContentWrapper?.addEventListener('touchstart', removeOverlaySidebar)
  selContentWrapper?.addEventListener('click', removeOverlaySidebar)

  window.addEventListener('resize', removeOverlaySidebar)
})

export default PushMenu

//
