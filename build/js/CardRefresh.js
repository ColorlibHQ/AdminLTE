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
  responseType: '',
  overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
  onLoadStart() {
  },
  onLoadDone(response) {
    return response
  }
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
    let data = $(this).data(DATA_KEY)
    const _options = $.extend({}, Default, $(this).data())

    if (!data) {
      data = new CardRefresh($(this), _options)
      $(this).data(DATA_KEY, typeof config === 'string' ? data : config)
    }

    if (typeof config === 'string' && config.match(/load/)) {
      data[config]()
    } else {
      data._init($(this))
    }
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
