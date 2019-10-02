/**
 * --------------------------------------------
 * AdminLTE Toasts.js
 * License MIT
 * --------------------------------------------
 */

const Toasts = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'Toasts'
  const DATA_KEY           = 'lte.toasts'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    INIT: `init${EVENT_KEY}`,
    CREATED: `created${EVENT_KEY}`,
    REMOVED: `removed${EVENT_KEY}`,
  }

  const Selector = {
    BODY: 'toast-body',
    CONTAINER_TOP_RIGHT: '#toastsContainerTopRight',
    CONTAINER_TOP_LEFT: '#toastsContainerTopLeft',
    CONTAINER_BOTTOM_RIGHT: '#toastsContainerBottomRight',
    CONTAINER_BOTTOM_LEFT: '#toastsContainerBottomLeft',
  }

  const ClassName = {
    TOP_RIGHT: 'toasts-top-right',
    TOP_LEFT: 'toasts-top-left',
    BOTTOM_RIGHT: 'toasts-bottom-right',
    BOTTOM_LEFT: 'toasts-bottom-left',
    FADE: 'fade',
  }

  const Position = {
    TOP_RIGHT: 'topRight',
    TOP_LEFT: 'topLeft',
    BOTTOM_RIGHT: 'bottomRight',
    BOTTOM_LEFT: 'bottomLeft',
  }

  const Id = {
    CONTAINER_TOP_RIGHT: 'toastsContainerTopRight',
    CONTAINER_TOP_LEFT: 'toastsContainerTopLeft',
    CONTAINER_BOTTOM_RIGHT: 'toastsContainerBottomRight',
    CONTAINER_BOTTOM_LEFT: 'toastsContainerBottomLeft',
  }

  const Default = {
    position: Position.TOP_RIGHT,
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
    class: null,
  }

  /**
   * Class Definition
   * ====================================================
   */
  class Toasts {
    constructor(element, config) {
      this._config  = config

      this._prepareContainer();

      const initEvent = $.Event(Event.INIT)
      $('body').trigger(initEvent)
    }

    // Public

    create() {
      var toast = $('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>')

      toast.data('autohide', this._config.autohide)
      toast.data('animation', this._config.fade)
      
      if (this._config.class) {
        toast.addClass(this._config.class)
      }

      if (this._config.delay && this._config.delay != 500) {
        toast.data('delay', this._config.delay)
      }

      var toast_header = $('<div class="toast-header">')

      if (this._config.image != null) {
        var toast_image = $('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt)
        
        if (this._config.imageHeight != null) {
          toast_image.height(this._config.imageHeight).width('auto')
        }

        toast_header.append(toast_image)
      }

      if (this._config.icon != null) {
        toast_header.append($('<i />').addClass('mr-2').addClass(this._config.icon))
      }

      if (this._config.title != null) {
        toast_header.append($('<strong />').addClass('mr-auto').html(this._config.title))
      }

      if (this._config.subtitle != null) {
        toast_header.append($('<small />').html(this._config.subtitle))
      }

      if (this._config.close == true) {
        var toast_close = $('<button data-dismiss="toast" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden="true">&times;</span>')
        
        if (this._config.title == null) {
          toast_close.toggleClass('ml-2 ml-auto')
        }
        
        toast_header.append(toast_close)
      }

      toast.append(toast_header)

      if (this._config.body != null) {
        toast.append($('<div class="toast-body" />').html(this._config.body))
      }

      $(this._getContainerId()).prepend(toast)

      const createdEvent = $.Event(Event.CREATED)
      $('body').trigger(createdEvent)

      toast.toast('show')


      if (this._config.autoremove) {
        toast.on('hidden.bs.toast', function () {
          $(this).delay(200).remove();

          const removedEvent = $.Event(Event.REMOVED)
          $('body').trigger(removedEvent)
        })
      }


    }

    // Static

    _getContainerId() {
      if (this._config.position == Position.TOP_RIGHT) {
        return Selector.CONTAINER_TOP_RIGHT;
      } else if (this._config.position == Position.TOP_LEFT) {
        return Selector.CONTAINER_TOP_LEFT;
      } else if (this._config.position == Position.BOTTOM_RIGHT) {
        return Selector.CONTAINER_BOTTOM_RIGHT;
      } else if (this._config.position == Position.BOTTOM_LEFT) {
        return Selector.CONTAINER_BOTTOM_LEFT;
      }
    }

    _prepareContainer() {
      if ($(this._getContainerId()).length === 0) {
        var container = $('<div />').attr('id', this._getContainerId().replace('#', ''))
        if (this._config.position == Position.TOP_RIGHT) {
          container.addClass(ClassName.TOP_RIGHT)
        } else if (this._config.position == Position.TOP_LEFT) {
          container.addClass(ClassName.TOP_LEFT)
        } else if (this._config.position == Position.BOTTOM_RIGHT) {
          container.addClass(ClassName.BOTTOM_RIGHT)
        } else if (this._config.position == Position.BOTTOM_LEFT) {
          container.addClass(ClassName.BOTTOM_LEFT)
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
        const _config = $.extend({}, Default, config)
        var toast = new Toasts($(this), _config)

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
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Toasts._jQueryInterface
  }

  return Toasts
})(jQuery)

export default Toasts
