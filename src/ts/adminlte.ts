import { onDOMContentLoaded } from './util/index.js'
import Layout from './layout.js'
import CardWidget from './card-widget.js'
import Treeview from './treeview.js'
import DirectChat from './direct-chat.js'
import FullScreen from './fullscreen.js'
import PushMenu from './push-menu.js'
import { initAccessibility } from './accessibility.js'

/**
 * AdminLTE v4.0.0-rc3
 * Author: Colorlib
 * Website: AdminLTE.io <https://adminlte.io>
 * License: Open source - MIT <https://opensource.org/licenses/MIT>
 */

onDOMContentLoaded(() => {
  /**
   * Initialize AdminLTE Core Components
   * -------------------------------
   */
  const layout = new Layout(document.body)
  layout.holdTransition()
  
  /**
   * Initialize Accessibility Features - WCAG 2.1 AA Compliance
   * --------------------------------------------------------
   */
  const accessibilityManager = initAccessibility({
    announcements: true,
    skipLinks: true,
    focusManagement: true,
    keyboardNavigation: true,
    reducedMotion: true
  })
  
  // Add semantic landmarks
  accessibilityManager.addLandmarks()
  
  // Mark app as loaded after initialization
  setTimeout(() => {
    document.body.classList.add('app-loaded')
  }, 400)
})

export {
  Layout,
  CardWidget,
  Treeview,
  DirectChat,
  FullScreen,
  PushMenu,
  initAccessibility
}
