/**
 * --------------------------------------------
 * AdminLTE Toasts.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'Toasts'
const DATA_KEY = 'lte.toasts'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]

const EVENT_INIT = `init${EVENT_KEY}`
const EVENT_CREATED = `created${EVENT_KEY}`
const EVENT_REMOVED = `removed${EVENT_KEY}`

const SELECTOR_CONTAINER_TOP_RIGHT = '#toastsContainerTopRight'
const SELECTOR_CONTAINER_TOP_LEFT = '#toastsContainerTopLeft'
const SELECTOR_CONTAINER_BOTTOM_RIGHT = '#toastsContainerBottomRight'
const SELECTOR_CONTAINER_BOTTOM_LEFT = '#toastsContainerBottomLeft'

const CLASS_NAME_TOP_RIGHT = 'toasts-top-right'
const CLASS_NAME_TOP_LEFT = 'toasts-top-left'
const CLASS_NAME_BOTTOM_RIGHT = 'toasts-bottom-right'
const CLASS_NAME_BOTTOM_LEFT = 'toasts-bottom-left'

const POSITION_TOP_RIGHT = 'topRight'
const POSITION_TOP_LEFT = 'topLeft'
const POSITION_BOTTOM_RIGHT = 'bottomRight'
const POSITION_BOTTOM_LEFT = 'bottomLeft'

const Default = {
  position: POSITION_TOP_RIGHT,
  fixed: true,
  autohide: false,
  autoremove: true,
  delay: 1000,
  fade: true,
  icon: null,
  image: null,
  imageAlt: null,
  imageHeight: '25px',
  title: null,
  subtitle: null,
  close: true,
  body: null,
  class: null
}

/**
 * Class Definition
 * ====================================================
 */
class Toasts {
  constructor(element, config) {
    this._config = config
    this._prepareContainer()

    $('body').trigger($.Event(EVENT_INIT))
  }

  // Public

  create() {
    const toast = $('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>')

    toast.data('autohide', this._config.autohide)
    toast.data('animation', this._config.fade)

    if (this._config.class) {
      toast.addClass(this._config.class)
    }

    if (this._config.delay && this._config.delay != 500) {
      toast.data('delay', this._config.delay)
    }

    const toastHeader = $('<div class="toast-header">')

    if (this._config.image != null) {
      const toastImage = $('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt)

      if (this._config.imageHeight != null) {
        toastImage.height(this._config.imageHeight).width('auto')
      }

      toastHeader.append(toastImage)
    }

    if (this._config.icon != null) {
      toastHeader.append($('<i />').addClass('mr-2').addClass(this._config.icon))
    }

    if (this._config.title != null) {
      toastHeader.append($('<strong />').addClass('mr-auto').html(this._config.title))
    }

    if (this._config.subtitle != null) {
      toastHeader.append($('<small />').html(this._config.subtitle))
    }

    if (this._config.close == true) {
      const toastClose = $('<button data-dismiss="toast" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden="true">&times;</span>')

      if (this._config.title == null) {
        toastClose.toggleClass('ml-2 ml-auto')
      }

      toastHeader.append(toastClose)
    }

    toast.append(toastHeader)

    if (this._config.body != null) {
      toast.append($('<div class="toast-body" />').html(this._config.body))
    }

    $(this._getContainerId()).prepend(toast)

    const $body = $('body')

    $body.trigger($.Event(EVENT_CREATED))
    toast.toast('show')

    if (this._config.autoremove) {
      toast.on('hidden.bs.toast', function () {
        $(this).delay(200).remove()
        $body.trigger($.Event(EVENT_REMOVED))
      })
    }
  }

  // Static

  _getContainerId() {
    if (this._config.position == POSITION_TOP_RIGHT) {
      return SELECTOR_CONTAINER_TOP_RIGHT
    }

    if (this._config.position == POSITION_TOP_LEFT) {
      return SELECTOR_CONTAINER_TOP_LEFT
    }

    if (this._config.position == POSITION_BOTTOM_RIGHT) {
      return SELECTOR_CONTAINER_BOTTOM_RIGHT
    }

    if (this._config.position == POSITION_BOTTOM_LEFT) {
      return SELECTOR_CONTAINER_BOTTOM_LEFT
    }
  }

  _prepareContainer() {
    if ($(this._getContainerId()).length === 0) {
      const container = $('<div />').attr('id', this._getContainerId().replace('#', ''))
      if (this._config.position == POSITION_TOP_RIGHT) {
        container.addClass(CLASS_NAME_TOP_RIGHT)
      } else if (this._config.position == POSITION_TOP_LEFT) {
        container.addClass(CLASS_NAME_TOP_LEFT)
      } else if (this._config.position == POSITION_BOTTOM_RIGHT) {
        container.addClass(CLASS_NAME_BOTTOM_RIGHT)
      } else if (this._config.position == POSITION_BOTTOM_LEFT) {
        container.addClass(CLASS_NAME_BOTTOM_LEFT)
      }

      $('body').append(container)
    }

    if (this._config.fixed) {
      $(this._getContainerId()).addClass('fixed')
    } else {
      $(this._getContainerId()).removeClass('fixed')
    }
  }

  // Static

  static _jQueryInterface(option, config) {
    return this.each(function () {
      const _options = $.extend({}, Default, config)
      const toast = new Toasts($(this), _options)

      if (option === 'create') {
        toast[option]()
      }
    })
  }
}

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Toasts._jQueryInterface
$.fn[NAME].Constructor = Toasts
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Toasts._jQueryInterface
}

export default Toasts
