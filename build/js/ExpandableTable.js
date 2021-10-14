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

const EVENT_EXPAND = `expand${EVENT_KEY}`
const EVENT_COLLAPSE = `collapse${EVENT_KEY}`
const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`

const SELECTOR_TABLE = '.expandable-table'
const SELECTOR_EXPANDABLE_BODY = '.expandable-body'
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
      const $body = $($header).next(SELECTOR_EXPANDABLE_BODY).children().first().children()
      if ($type === 'true') {
        $body.show()
      } else if ($type === 'false') {
        $body.hide()
        $body.parent().parent().addClass('d-none')
      }
    })
  }

  toggleRow(relatedTarget) {
    const $element = this._element
    const time = 500
    const $type = $element.attr(SELECTOR_ARIA_ATTR)
    const $body = $element.next(SELECTOR_EXPANDABLE_BODY).children().first().children()

    $body.stop()
    if ($type === 'true') {
      const collapseEvent = $.Event(EVENT_COLLAPSE)
      $element.trigger(collapseEvent)
      if (collapseEvent.isDefaultPrevented()) {
        return
      }

      $body.slideUp(time, () => {
        $element.next(SELECTOR_EXPANDABLE_BODY).addClass('d-none')
      })
      $element.attr(SELECTOR_ARIA_ATTR, 'false')
      const collapsedEvent = $.Event(EVENT_COLLAPSED)
      collapsedEvent.relatedTarget = relatedTarget
      $element.trigger(collapsedEvent)
    } else if ($type === 'false') {
      const expandEvent = $.Event(EVENT_EXPAND)
      $element.trigger(expandEvent)
      if (expandEvent.isDefaultPrevented()) {
        return
      }
      
      $element.next(SELECTOR_EXPANDABLE_BODY).removeClass('d-none')
      $body.slideDown(time)
      $element.attr(SELECTOR_ARIA_ATTR, 'true')
      const expandedEvent = $.Event(EVENT_EXPANDED)
      expandedEvent.relatedTarget = relatedTarget
      $element.trigger(expandedEvent)
    }
  }

  // Static

  static _jQueryInterface(operation, relatedTarget) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)

      if (!data) {
        data = new ExpandableTable($(this))
        $(this).data(DATA_KEY, data)
      }

      if (typeof operation === 'string' && /init|toggleRow/.test(operation)) {
        data[operation](relatedTarget)
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

$(document).on('click', SELECTOR_DATA_TOGGLE, function (e) {
  ExpandableTable._jQueryInterface.call($(this), 'toggleRow', e.target)
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
