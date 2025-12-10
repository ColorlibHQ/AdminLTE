import { onDOMContentLoaded } from './util/index.js'
import Layout from './layout.js'
import CardWidget from './card-widget.js'
import Treeview from './treeview.js'
import DirectChat from './direct-chat.js'
import FullScreen from './fullscreen.js'
import PushMenu from './push-menu.js'
import { initAccessibility } from './accessibility.js'
import permissionManager from './permission.js'

/**
 * AdminLTE v4.0.0-rc5
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
  
  /**
   * Initialize Permission Management System
   * ---------------------------------------
   */
  fetch('./js/permission-example.json')
    .then(response => response.json())
    .then(permissionData => {
      permissionManager.init(permissionData);
    })
    .catch(error => {
      console.warn('权限配置文件未找到，将使用默认权限配置');
      // 使用默认权限配置
      permissionManager.init({
        user: {
          id: 0,
          username: 'guest',
          name: 'Guest User'
        },
        roles: ['viewer'],
        rolePriority: {
          admin: 3,
          editor: 2,
          viewer: 1
        },
        routePermissions: { '/*': ['viewer'] },
        menuPermissions: { '/*': ['viewer'] },
        elementPermissions: { '/*': ['viewer'] }
      });
    });
  
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
  permissionManager,
  FullScreen,
  PushMenu,
  initAccessibility
}
