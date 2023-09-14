/**
 * --------------------------------------------
 * AdminLTE CardRefresh.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
 * Constants
 * ====================================================
 */

const NAME = 'CardRefresh'
const DATA_KEY = 'lte.cardrefresh'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]

const EVENT_LOADED = `loaded${EVENT_KEY}`
const EVENT_OVERLAY_ADDED = `overlay.added${EVENT_KEY}`
const EVENT_OVERLAY_REMOVED = `overlay.removed${EVENT_KEY}`

const CLASS_NAME_CARD = 'card'

const SELECTOR_CARD = `.${CLASS_NAME_CARD}`
const SELECTOR_DATA_REFRESH = '[data-card-widget="card-refresh"]'

const Default = {
  source: '',
  sourceSelector: '',
  params: {},
  trigger: SELECTOR_DATA_REFRESH,
  content: '.card-body',
  loadInContent: true,
  loadOnInit: true,
  loadErrorTemplate: true,
  responseType: '',
  overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
  errorTemplate: '<span class="text-danger"></span>',
  onLoadStart() {},
  onLoadDone(response) {
    return response
  },
  onLoadFail(_jqXHR, _textStatus, _errorThrown) {}
}

class CardRefresh {
  constructor(element, settings) {
    this._element = element
    this._parent = element.parents(SELECTOR_CARD).first()
    this._settings = $.extend({}, Default, settings)
    this._overlay = $(this._settings.overlayTemplate)

    if (element.hasClass(CLASS_NAME_CARD)) {
      this._parent = element
    }

    if (this._settings.source === '') {
      throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.')
    }
  }

  load() {
    this._addOverlay()
    this._settings.onLoadStart.call($(this))

    $.get(this._settings.source, this._settings.params, response => {
      if (this._settings.loadInContent) {
        if (this._settings.sourceSelector !== '') {
          response = $(response).find(this._settings.sourceSelector).html()
        }

        this._parent.find(this._settings.content).html(response)
      }

      this._settings.onLoadDone.call($(this), response)
      this._removeOverlay()
    }, this._settings.responseType !== '' && this._settings.responseType)
    .fail((jqXHR, textStatus, errorThrown) => {
      this._removeOverlay()

      if (this._settings.loadErrorTemplate) {
        const msg = $(this._settings.errorTemplate).text(errorThrown)
        this._parent.find(this._settings.content).empty().append(msg)
      }

      this._settings.onLoadFail.call($(this), jqXHR, textStatus, errorThrown)
    })

    $(this._element).trigger($.Event(EVENT_LOADED))
  }

  _addOverlay() {
    this._parent.append(this._overlay)
    $(this._element).trigger($.Event(EVENT_OVERLAY_ADDED))
  }

  _removeOverlay() {
    this._parent.find(this._overlay).remove()
    $(this._element).trigger($.Event(EVENT_OVERLAY_REMOVED))
  }

  // Private

  _init() {
    $(this).find(this._settings.trigger).on('click', () => {
      this.load()
    })

    if (this._settings.loadOnInit) {
      this.load()
    }
  }

  // Static
  static _jQueryInterface(config) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)
      const _config = $.extend({}, Default, typeof config === 'object' ? config : $(this).data())

      if (!data) {
        data = new CardRefresh($(this), _config)
        $(this).data(DATA_KEY, data)
        data._init()
      } else if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]()
      } else if (typeof config === 'undefined') {
        data._init()
      }
    })
  }
}

/**
 * Data API
 * ====================================================
 */

$(document).on('click', SELECTOR_DATA_REFRESH, function (event) {
  if (event) {
    event.preventDefault()
  }

  CardRefresh._jQueryInterface.call($(this), 'load')
})

$(() => {
  $(SELECTOR_DATA_REFRESH).each(function () {
    CardRefresh._jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = CardRefresh._jQueryInterface
$.fn[NAME].Constructor = CardRefresh
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return CardRefresh._jQueryInterface
}

export default CardRefresh
