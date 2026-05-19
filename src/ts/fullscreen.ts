/**
 * --------------------------------------------
 * @file AdminLTE fullscreen.ts
 * @description Fullscreen plugin for AdminLTE.
 * @license MIT
 * --------------------------------------------
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
  _config: undefined

  constructor(element: HTMLElement, config?: undefined) {
    this._element = element
    this._config = config
  }

  inFullScreen(): void {
    const event = new Event(EVENT_MAXIMIZED)

    const iconMaximize = document.querySelector<HTMLElement>(SELECTOR_MAXIMIZE_ICON)
    const iconMinimize = document.querySelector<HTMLElement>(SELECTOR_MINIMIZE_ICON)

    void document.documentElement.requestFullscreen()

    // Toggle Bootstrap's .d-none utility instead of hardcoding inline
    // display:block. The previous approach overrode the icon library's
    // natural display value (eg. some icon fonts use inline-block) and
    // caused the icon to shift its position. Fixes #6021.
    if (iconMaximize) {
      iconMaximize.classList.add('d-none')
    }

    if (iconMinimize) {
      iconMinimize.classList.remove('d-none')
    }

    this._element.dispatchEvent(event)
  }

  outFullscreen(): void {
    const event = new Event(EVENT_MINIMIZED)

    const iconMaximize = document.querySelector<HTMLElement>(SELECTOR_MAXIMIZE_ICON)
    const iconMinimize = document.querySelector<HTMLElement>(SELECTOR_MINIMIZE_ICON)

    void document.exitFullscreen()

    if (iconMaximize) {
      iconMaximize.classList.remove('d-none')
    }

    if (iconMinimize) {
      iconMinimize.classList.add('d-none')
    }

    this._element.dispatchEvent(event)
  }

  toggleFullScreen(): void {
    if (document.fullscreenEnabled) {
      if (document.fullscreenElement) {
        this.outFullscreen()
      } else {
        this.inFullScreen()
      }
    }
  }
}

/**
 * Data Api implementation
 * ============================================================================
 */
onDOMContentLoaded(() => {
  const buttons = document.querySelectorAll(SELECTOR_FULLSCREEN_TOGGLE)

  buttons.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault()

      const target = event.target as HTMLElement
      const button = target.closest(SELECTOR_FULLSCREEN_TOGGLE) as HTMLElement | undefined

      if (button) {
        const data = new FullScreen(button, undefined)
        data.toggleFullScreen()
      }
    })
  })
})

export default FullScreen
