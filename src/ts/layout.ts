/**
 * ----------------------------------------------------------------------------
 * @file AdminLTE layout.ts
 * @description Layout for AdminLTE.
 * @license MIT
 * ----------------------------------------------------------------------------
 */

import {
  onDOMContentLoaded
} from './util/index'

/**
 * ----------------------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------------------
 */

const CLASS_NAME_HOLD_TRANSITIONS = 'hold-transition'
const CLASS_NAME_APP_LOADED = 'app-loaded'

/**
 * ----------------------------------------------------------------------------
 * Class Definition
 * ----------------------------------------------------------------------------
 */

class Layout {
  _element: HTMLElement
  _holdTransitionTimer: ReturnType<typeof setTimeout> | undefined

  constructor(element: HTMLElement) {
    this._element = element
    this._holdTransitionTimer = undefined
  }

  /*
   * Hold the layout transitions by the specified time. This will disable CSS
   * transitions and animations of the main layout elements (sidebar, navbar,
   * content) for the given time.
   *
   * @param time Number of milliseconds to hold the transitions.
   */
  holdTransition(time: number = 100): void {
    // If a timer is already running, clear it

    if (this._holdTransitionTimer) {
      clearTimeout(this._holdTransitionTimer)
    }

    // Add the hold-transition class to the body, and remove it after the
    // specified time.

    document.body.classList.add(CLASS_NAME_HOLD_TRANSITIONS)

    this._holdTransitionTimer = setTimeout(() => {
      document.body.classList.remove(CLASS_NAME_HOLD_TRANSITIONS)
    }, time)
  }
}

/**
 * ----------------------------------------------------------------------------
 * Data Api implementation
 * ----------------------------------------------------------------------------
 */

onDOMContentLoaded(() => {
  // Hold layout transitions on window resize.

  const layout = new Layout(document.body)
  window.addEventListener('resize', () => layout.holdTransition(200))

  // Mark app as loaded after initialization.

  setTimeout(() => {
    document.body.classList.add(CLASS_NAME_APP_LOADED)
  }, 400)
})

export default Layout
