/**
 * --------------------------------------------
 * @file AdminLTE layout.ts
 * @description Layout for AdminLTE.
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

const CLASS_NAME_HOLD_TRANSITIONS = 'hold-transition'
const CLASS_NAME_APP_LOADED = 'app-loaded'

/**
 * Class Definition
 * ====================================================
 */

class Layout {
  _element: HTMLElement

  constructor(element: HTMLElement) {
    this._element = element
  }

  holdTransition(): void {
    let resizeTimer: ReturnType<typeof setTimeout>
    window.addEventListener('resize', () => {
      document.body.classList.add(CLASS_NAME_HOLD_TRANSITIONS)
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        document.body.classList.remove(CLASS_NAME_HOLD_TRANSITIONS)
      }, 400)
    })
  }
}

onDOMContentLoaded(() => {
  const data = new Layout(document.body)
  data.holdTransition()
  setTimeout(() => {
    document.body.classList.add(CLASS_NAME_APP_LOADED)
  }, 400)
})

export default Layout
