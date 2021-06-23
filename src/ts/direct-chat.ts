/**
 * --------------------------------------------
 * AdminLTE direct-chat.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady,
} from './util/index'

/**
 * Constants
 * ====================================================
 */

const SELECTOR_DATA_TOGGLE = '[data-lte-toggle="chat-pane"]'
const SELECTOR_DIRECT_CHAT = '.direct-chat'

const CLASS_NAME_DIRECT_CHAT_OPEN = 'direct-chat-contacts-open'

/**
 * Class Definition
 * ====================================================
 */

class DirectChat {
  toggle(chatPane: Element): void {
    // chatPane
    chatPane.closest(SELECTOR_DIRECT_CHAT)?.classList.toggle(CLASS_NAME_DIRECT_CHAT_OPEN)
  }
}

/**
 *
 * Data Api implementation
 * ====================================================
 */

domReady(() => {
  const button = document.querySelectorAll(SELECTOR_DATA_TOGGLE)

  for (const btn of button) {
    btn.addEventListener('click', event => {
      event.preventDefault()
      const chatPane = event.target as Element
      const data = new DirectChat()
      data.toggle(chatPane)
    })
  }
})

export default DirectChat
