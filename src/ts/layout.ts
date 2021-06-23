/**
 * --------------------------------------------
 * AdminLTE layout.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady,
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const CLASS_NAME_HOLD_TRANSITIONs = 'hold-transition'

const SELECTOR_SIDEBAR = '.sidebar'

const Default = {
  scrollbarTheme: 'os-theme-light',
  scrollbarAutoHide: 'leave',
}

interface Config {
  scrollbarTheme: string;
  scrollbarAutoHide: string;
}

/**
 * Class Definition
 * ====================================================
 */

class Layout {
  _element: HTMLElement
  _config: Config

  constructor(element: HTMLElement, config: Config) {
    this._element = element
    this._config = Object.assign({}, Default, config)
  }

  holdTransition(): void {
    let resizeTimer: number | undefined
    window.addEventListener('resize', () => {
      document.body.classList.add(CLASS_NAME_HOLD_TRANSITIONs)
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        document.body.classList.remove(CLASS_NAME_HOLD_TRANSITIONs)
      }, 400)
    })
  }
}

domReady(() => {
  const data = new Layout(document.body, Default)
  data.holdTransition()
  // @ts-expect-error
  if (typeof OverlayScrollbars !== 'undefined') {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    OverlayScrollbars(document.querySelectorAll(SELECTOR_SIDEBAR), { // eslint-disable-line new-cap
      className: Default.scrollbarTheme,
      sizeAutoCapable: true,
      scrollbars: {
        autoHide: Default.scrollbarAutoHide,
        clickScrolling: true,
      },
    })
  }
})

export default Layout
