/**
 * --------------------------------------------
 * AdminLTE ExpandableTable.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'

/**
  * Constants
  * ====================================================
  */

const NAME = 'ExpandableTable'
const DATA_KEY = 'lte.expandableTable'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]

const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`

const SELECTOR_TABLE = '.expandable-table'
const SELECTOR_DATA_TOGGLE = '[data-widget="expandable-table"]'
const SELECTOR_ARIA_ATTR = 'aria-expanded'

/**
  * Class Definition
  * ====================================================
  */
class ExpandableTable {
  constructor(element, options) {
    this._options = options
    this._element = element
  }

  // Public

  init() {
    $(SELECTOR_DATA_TOGGLE).each((_, $header) => {
      const $type = $($header).attr(SELECTOR_ARIA_ATTR)
      const $body = $($header).next().children().first().children()
      if ($type === 'true') {
        $body.show()
      } else if ($type === 'false') {
        $body.hide()
        $body.parent().parent().addClass('d-none')
      }
    })
  }

  toggleRow() {
    const $element = this._element
    const time = 500
    const $type = $element.attr(SELECTOR_ARIA_ATTR)
    const $body = $element.next().children().first().children()

    $body.stop()
    if ($type === 'true') {
      $body.slideUp(time, () => {
        $element.next().addClass('d-none')
      })
      $element.attr(SELECTOR_ARIA_ATTR, 'false')
      $element.trigger($.Event(EVENT_COLLAPSED))
    } else if ($type === 'false') {
      $element.next().removeClass('d-none')
      $body.slideDown(time)
      $element.attr(SELECTOR_ARIA_ATTR, 'true')
      $element.trigger($.Event(EVENT_EXPANDED))
    }
  }

  // Static

  static _jQueryInterface(operation) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)

      if (!data) {
        data = new ExpandableTable($(this))
        $(this).data(DATA_KEY, data)
      }

      if (typeof operation === 'string' && operation.match(/init|toggleRow/)) {
        data[operation]()
      }
    })
  }
}

/**
  * Data API
  * ====================================================
  */
$(SELECTOR_TABLE).ready(function () {
  ExpandableTable._jQueryInterface.call($(this), 'init')
})

$(document).on('click', SELECTOR_DATA_TOGGLE, function () {
  ExpandableTable._jQueryInterface.call($(this), 'toggleRow')
})

/**
  * jQuery API
  * ====================================================
  */

$.fn[NAME] = ExpandableTable._jQueryInterface
$.fn[NAME].Constructor = ExpandableTable
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return ExpandableTable._jQueryInterface
}

export default ExpandableTable
