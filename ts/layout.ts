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

const CLASS_NAME_RESIZE_ANIMATION_STOPPER = 'resize-animation-stopper'

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
})

export default Layout
