/**
 * --------------------------------------------
 * AdminLTE layout.ts
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

const CLASS_NAME_HOLD_TRANSITIONS = 'hold-transition'

/**
 * Class Definition
 * ====================================================
 */

class Layout {
  _element: HTMLElement
  _config: undefined

  constructor(element: HTMLElement, config: undefined) {
    this._element = element
    this._config = config as unknown as undefined
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

domReady(() => {
  const data = new Layout(document.body, undefined)
  data.holdTransition()
})

export default Layout
