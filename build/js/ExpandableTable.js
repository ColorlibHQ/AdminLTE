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

const CLASS_NAME_HEADER = 'expandable-header'

const SELECTOR_TABLE = '.expandable-table'
const SELECTOR_HEADER = `.${CLASS_NAME_HEADER}`
const SELECTOR_DATA_SELECTOR = 'data-expandable-table'
const SELECTOR_EXPANDED = 'expanded'
const SELECTOR_COLLAPSED = 'collapsed'

/**
  * Class Definition
  * ====================================================
  */
class ExpandableTable {
  constructor(element, config) {
    this._config = config
    this._element = element
  }

  // Public

  init() {
    $(SELECTOR_HEADER).each((_, $header) => {
      // Next Child to the header will have the same column span as header
      $($header).next().children().first().attr('colspan', $($header).children().length)

      // Setting up table design for the first time
      const $type = $($header).next().attr(SELECTOR_DATA_SELECTOR)
      const $body = $($header).next().children().first().children()
      if ($type === SELECTOR_EXPANDED) {
        $body.show()
      } else if ($type === SELECTOR_COLLAPSED) {
        $body.hide()
        $body.parent().parent().addClass('d-none')
      }
    })
  }

  toggleRow() {
    const $element = this._element
    const time = 500
    const $type = $element.next().attr(SELECTOR_DATA_SELECTOR)
    const $body = $element.next().children().first().children()
    $body.stop()
    if ($type === SELECTOR_EXPANDED) {
      $body.slideUp(time, () => {
        $element.next().addClass('d-none')
      })
      $element.next().attr(SELECTOR_DATA_SELECTOR, SELECTOR_COLLAPSED)
      $element.trigger($.Event(EVENT_COLLAPSED))
    } else if ($type === SELECTOR_COLLAPSED) {
      $element.next().removeClass('d-none')
      $body.slideDown(time)
      $element.next().attr(SELECTOR_DATA_SELECTOR, SELECTOR_EXPANDED)
      $element.trigger($.Event(EVENT_EXPANDED))
    }
  }

  // Static

  static _jQueryInterface(config) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)
      if (!data) {
        data = new ExpandableTable($(this))
        $(this).data(DATA_KEY, data)
      }

      if (config === 'init' || config === 'toggleRow') {
        data[config]()
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

$(document).on('click', SELECTOR_HEADER, function () {
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
