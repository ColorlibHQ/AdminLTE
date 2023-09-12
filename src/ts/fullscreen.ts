/**
 * ----------------------------------------------------------------------------
 * AdminLTE fullscreen.ts
 * License MIT
 * ----------------------------------------------------------------------------
 */

import {
  onDOMContentLoaded
} from './util/index'

/**
 * Constants
 * ============================================================================
 */
const DATA_KEY = 'lte.fullscreen'
const EVENT_KEY = `.${DATA_KEY}`
const EVENT_MAXIMIZED = `maximized${EVENT_KEY}`
const EVENT_MINIMIZED = `minimized${EVENT_KEY}`

const SELECTOR_FULLSCREEN_TOGGLE = '[data-lte-toggle="fullscreen"]'
const SELECTOR_MAXIMIZE_ICON = '[data-lte-icon="maximize"]'
const SELECTOR_MINIMIZE_ICON = '[data-lte-icon="minimize"]'

/**
 * Class Definition.
 * ============================================================================
 */
class FullScreen {
  _element: HTMLElement

  constructor(element: HTMLElement) {
    this._element = element
  }

  /**
   * toggleFullScreen.
   */
  toggleFullScreen(): void {
    const iconMaximize = document.querySelector<HTMLElement>(SELECTOR_MAXIMIZE_ICON)
    const iconMinimize = document.querySelector<HTMLElement>(SELECTOR_MINIMIZE_ICON)
    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        const event = new Event(EVENT_MAXIMIZED)
        void document.documentElement.requestFullscreen()
        if (iconMaximize) {
          iconMaximize.style.display = 'none'
        }

        if (iconMinimize) {
          iconMinimize.style.display = 'block'
        }

        this._element.dispatchEvent(event)
      } else if (document.exitFullscreen) {
        const event = new Event(EVENT_MINIMIZED)
        void document.exitFullscreen()
        if (iconMaximize) {
          iconMaximize.style.display = 'block'
        }

        if (iconMinimize) {
          iconMinimize.style.display = 'none'
        }

        this._element.dispatchEvent(event)
      }
    }
  }
}

/**
 * Data Api implementation
 * ============================================================================
 */
onDOMContentLoaded(() => {
  const button = document.querySelectorAll(SELECTOR_FULLSCREEN_TOGGLE)
  button.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault()
      const target = event.target as HTMLElement
      const fsButton = target.closest(SELECTOR_FULLSCREEN_TOGGLE) as HTMLElement | undefined

      if (fsButton) {
        const data = new FullScreen(fsButton)
        data.toggleFullScreen()
      }
    })
  })
  document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.key === 'Escape') {
      const iconMaximize = document.querySelector<HTMLElement>(SELECTOR_MAXIMIZE_ICON)
      const iconMinimize = document.querySelector<HTMLElement>(SELECTOR_MINIMIZE_ICON)
      if (iconMaximize) {
        iconMaximize.style.display = 'block'
      }

      if (iconMinimize) {
        iconMinimize.style.display = 'none'
      }
    }
  })
})

export default FullScreen
