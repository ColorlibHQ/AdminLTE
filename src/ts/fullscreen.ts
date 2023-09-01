/**
 * --------------------------------------------
 * AdminLTE fullscreen.ts
 * License MIT
 * --------------------------------------------
 */

import {
  onDOMContentLoaded
} from './util/index'

/**
 * Constants
 * ====================================================
 */

const CLASS_NAME_FULLSCREEN = 'fullscreen'
const CLASS_NAME_FULLSCREEN_ICON = 'fullscreen-icon'
const CLASS_NAME_LTE_SHOW = 'lte-show'

/**
 * Class Definition
 * ====================================================
 */
class FullScreen {
  toggleFullScreen(): void {
    if (document.fullscreenEnabled) {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          void document.exitFullscreen()
        }
      } else {
        void document.documentElement.requestFullscreen()
      }
    }
  }
}

/**
 *
 * Data Api implementation
 * ====================================================
 */

onDOMContentLoaded(() => {
  const button = Array.from(document.getElementsByClassName(CLASS_NAME_FULLSCREEN))

  for (const btn of button) {
    btn.addEventListener('click', event => {
      event.preventDefault()
      const data = new FullScreen()
      data.toggleFullScreen()
    })
  }

  /**
  * If F12 DevTools are open and in the browser window then the
  * height/width will be off and this does not work as expected
  */
  window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth * window.devicePixelRatio
    const windowHeight = window.innerHeight * window.devicePixelRatio
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height
    if (((windowWidth / screenWidth) >= 0.95) && ((windowHeight / screenHeight) >= 0.95)) {
      const icon = Array.from(document.getElementsByClassName(CLASS_NAME_FULLSCREEN_ICON))
      for (const i of icon) {
        i.classList.toggle(CLASS_NAME_LTE_SHOW)
      }
    } else {
      const icon = Array.from(document.getElementsByClassName(CLASS_NAME_FULLSCREEN_ICON))
      for (const i of icon) {
        i.classList.toggle(CLASS_NAME_LTE_SHOW)
      }
    }
  })
})

export default FullScreen
