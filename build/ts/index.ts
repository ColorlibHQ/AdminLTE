/**
 * --------------------------------------------
 * AdminLTE index.ts
 * License MIT
 * --------------------------------------------
 */

const SELECTOR_TOGGLE_BUTTON = '[data-widget="pushmenu"]'
const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse'

class AdminLTE {
  constructor() {
    let btn = document.querySelector(SELECTOR_TOGGLE_BUTTON)
    btn.addEventListener("click", () => {
      return this.toggleSidebar();
    })
  }

  toggleSidebar(){
    console.log('hii')
    if (document.body.classList.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
      document.body.classList.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
    } else {
      document.body.classList.add(CLASS_NAME_SIDEBAR_COLLAPSE)
    }
  }
}

new AdminLTE();

//
