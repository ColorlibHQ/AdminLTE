/**
 * --------------------------------------------
 * AdminLTE card-widget.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady,
  slideUp,
  slideDown
} from './util/index'

/**
 * Constants
 * ====================================================
 */

const DATA_KEY = 'lte.card-widget'
const EVENT_KEY = `.${DATA_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`
const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_REMOVE = `remove${EVENT_KEY}`
const EVENT_MAXIMIZED = `maximized${EVENT_KEY}`
const EVENT_MINIMIZED = `minimized${EVENT_KEY}`

const CLASS_NAME_CARD = 'card'
const CLASS_NAME_COLLAPSED = 'collapsed-card'
const CLASS_NAME_COLLAPSING = 'collapsing-card'
const CLASS_NAME_EXPANDING = 'expanding-card'
const CLASS_NAME_WAS_COLLAPSED = 'was-collapsed'
const CLASS_NAME_MAXIMIZED = 'maximized-card'

const SELECTOR_DATA_REMOVE = '[data-lte-dismiss="card-remove"]'
const SELECTOR_DATA_COLLAPSE = '[data-lte-toggle="card-collapse"]'
const SELECTOR_DATA_MAXIMIZE = '[data-lte-toggle="card-maximize"]'
const SELECTOR_CARD = `.${CLASS_NAME_CARD}`
const SELECTOR_CARD_HEADER = '.card-header'
const SELECTOR_CARD_BODY = '.card-body'
const SELECTOR_CARD_FOOTER = '.card-footer'

const Default = {
  animationSpeed: 500,
  collapseTrigger: SELECTOR_DATA_COLLAPSE,
  removeTrigger: SELECTOR_DATA_REMOVE,
  maximizeTrigger: SELECTOR_DATA_MAXIMIZE,
  collapseIcon: 'fa-minus',
  expandIcon: 'fa-plus',
  maximizeIcon: 'fa-expand',
  minimizeIcon: 'fa-compress'
}

type Config = {
  animationSpeed: number;
  collapseTrigger: string;
  removeTrigger: string;
  maximizeTrigger: string;
  collapseIcon: string;
  expandIcon: string;
  maximizeIcon: string;
  minimizeIcon: string;
}

class CardWidget {
  _element: HTMLElement
  _parent: HTMLElement | undefined
  _config: Config
  constructor(element: HTMLElement, config: Config) {
    this._element = element
    this._parent = element.closest(SELECTOR_CARD) as HTMLElement | undefined

    if (element.classList.contains(CLASS_NAME_CARD)) {
      this._parent = element
    }

    this._config = { ...Default, ...config }
  }

  collapse() {
    const event = new Event(EVENT_COLLAPSED)

    if (this._parent) {
      this._parent.classList.add(CLASS_NAME_COLLAPSING)

      const elm = this._parent?.querySelectorAll(`${SELECTOR_CARD_BODY}, ${SELECTOR_CARD_FOOTER}`)

      elm.forEach(el => {
        if (el instanceof HTMLElement) {
          slideUp(el, this._config.animationSpeed)
        }
      })

      setTimeout(() => {
        if (this._parent) {
          this._parent.classList.add(CLASS_NAME_COLLAPSED)
          this._parent.classList.remove(CLASS_NAME_COLLAPSING)
        }
      }, this._config.animationSpeed)
    }

    const icon = this._parent?.querySelector(`${SELECTOR_CARD_HEADER} ${this._config.collapseTrigger} .${this._config.collapseIcon}`)

    if (icon) {
      icon.classList.remove(this._config.collapseIcon)
      icon.classList.add(this._config.expandIcon)
    }

    this._element?.dispatchEvent(event)
  }

  expand() {
    const event = new Event(EVENT_EXPANDED)

    if (this._parent) {
      this._parent.classList.add(CLASS_NAME_EXPANDING)

      const elm = this._parent?.querySelectorAll(`${SELECTOR_CARD_BODY}, ${SELECTOR_CARD_FOOTER}`)

      elm.forEach(el => {
        if (el instanceof HTMLElement) {
          slideDown(el, this._config.animationSpeed)
        }
      })

      setTimeout(() => {
        if (this._parent) {
          this._parent.classList.remove(CLASS_NAME_COLLAPSED)
          this._parent.classList.remove(CLASS_NAME_EXPANDING)
        }
      }, this._config.animationSpeed)
    }

    const icon = this._parent?.querySelector(`${SELECTOR_CARD_HEADER} ${this._config.collapseTrigger} .${this._config.expandIcon}`)

    if (icon) {
      icon.classList.add(this._config.collapseIcon)
      icon.classList.remove(this._config.expandIcon)
    }

    this._element?.dispatchEvent(event)
  }

  remove() {
    const event = new Event(EVENT_REMOVE)

    if (this._parent) {
      slideUp(this._parent, this._config.animationSpeed)
    }

    this._element?.dispatchEvent(event)
  }

  toggle() {
    if (this._parent?.classList.contains(CLASS_NAME_COLLAPSED)) {
      this.expand()
      return
    }

    this.collapse()
  }

  maximize() {
    const event = new Event(EVENT_MAXIMIZED)

    if (this._parent) {
      const maxElm = this._parent.querySelector(`${this._config.maximizeTrigger} .${this._config.maximizeIcon}`)

      if (maxElm) {
        maxElm.classList.add(this._config.minimizeIcon)
        maxElm.classList.remove(this._config.maximizeIcon)
      }

      this._parent.style.height = `${this._parent.scrollHeight}px`
      this._parent.style.width = `${this._parent.scrollWidth}px`
      this._parent.style.transition = 'all .15s'

      setTimeout(() => {
        const htmlTag = document.querySelector('html')

        if (htmlTag) {
          htmlTag.classList.add(CLASS_NAME_MAXIMIZED)
        }

        if (this._parent) {
          this._parent.classList.add(CLASS_NAME_MAXIMIZED)

          if (this._parent.classList.contains(CLASS_NAME_COLLAPSED)) {
            this._parent.classList.add(CLASS_NAME_WAS_COLLAPSED)
          }
        }
      }, 150)
    }

    this._element?.dispatchEvent(event)
  }

  minimize() {
    const event = new Event(EVENT_MINIMIZED)

    if (this._parent) {
      const minElm = this._parent.querySelector(`${this._config.maximizeTrigger} .${this._config.minimizeIcon}`)

      if (minElm) {
        minElm.classList.add(this._config.maximizeIcon)
        minElm.classList.remove(this._config.minimizeIcon)
      }

      this._parent.style.cssText = `height: ${this._parent.style.height} !important; width: ${this._parent.style.width} !important; transition: all .15s;`

      setTimeout(() => {
        const htmlTag = document.querySelector('html')

        if (htmlTag) {
          htmlTag.classList.remove(CLASS_NAME_MAXIMIZED)
        }

        if (this._parent) {
          this._parent.classList.remove(CLASS_NAME_MAXIMIZED)

          if (this._parent?.classList.contains(CLASS_NAME_WAS_COLLAPSED)) {
            this._parent.classList.remove(CLASS_NAME_WAS_COLLAPSED)
          }
        }
      }, 10)
    }

    this._element?.dispatchEvent(event)
  }

  toggleMaximize() {
    if (this._parent?.classList.contains(CLASS_NAME_MAXIMIZED)) {
      this.minimize()
      return
    }

    this.maximize()
  }
}

/**
 *
 * Data Api implementation
 * ====================================================
 */

domReady(() => {
  const collapseBtn = document.querySelectorAll(SELECTOR_DATA_COLLAPSE)

  collapseBtn.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault()
      const target = event.target as HTMLElement
      const data = new CardWidget(target, Default)
      data.toggle()
    })
  })

  const removeBtn = document.querySelectorAll(SELECTOR_DATA_REMOVE)

  removeBtn.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault()
      const target = event.target as HTMLElement
      const data = new CardWidget(target, Default)
      data.remove()
    })
  })

  const maxBtn = document.querySelectorAll(SELECTOR_DATA_MAXIMIZE)

  maxBtn.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault()
      const target = event.target as HTMLElement
      const data = new CardWidget(target, Default)
      data.toggleMaximize()
    })
  })
})

export default CardWidget
