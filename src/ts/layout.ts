/**
 * --------------------------------------------
 * AdminLTE treeview.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady
} from './util/index'

import OverlayScrollbars from 'overlayscrollbars'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const CLASS_NAME_RESIZE_ANIMATION_STOPPER = 'resize-animation-stopper'

const SELECTOR_SIDEBAR = '.sidebar'

const Default = {
  scrollbarTheme: 'os-theme-light',
  scrollbarAutoHide: 'leave'
}

/**
 * Class Definition
 * ====================================================
 */

class Layout {
  holdTransition(): void {
    let resizeTimer: number | undefined
    window.addEventListener('resize', () => {
      document.body.classList.add(CLASS_NAME_RESIZE_ANIMATION_STOPPER)
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        document.body.classList.remove(CLASS_NAME_RESIZE_ANIMATION_STOPPER)
      }, 400)
    })
  }
}

domReady(() => {
  const data = new Layout()
  data.holdTransition()

  if (typeof OverlayScrollbars !== 'undefined') {
    // @ts-expect-error
    // eslint-disable-next-line new-cap
    OverlayScrollbars(document.querySelectorAll(SELECTOR_SIDEBAR), {
      className: Default.scrollbarTheme,
      sizeAutoCapable: true,
      scrollbars: {
        autoHide: Default.scrollbarAutoHide,
        clickScrolling: true
      }
    })
  }
})

export default Layout
