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

const Event = {
  EXPANDED: `expanded${EVENT_KEY}`,
  COLLAPSED: `collapsed${EVENT_KEY}`
}

const ClassName = {
  HEADER: 'expandable-header'
}

const Selector = {
  HEADER: `.${ClassName.HEADER}`,
  DATA_SELECTOR: 'data-expandable-table',
  EXPANDED: 'expanded',
  COLLAPSED: 'collapsed'
}

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
    $(Selector.HEADER).each((_, $header) => {
      // Next Child to the header will have the same column span as header
      $($header).next().children().first().attr('colSpan', $($header).children().length)

      // Setting up table design for the first time
      const $type = $($header).next().attr(Selector.DATA_SELECTOR)
      const $body = $($header).next().children().first().children()
      if ($type === Selector.EXPANDED) {
        $body.show()
      } else if ($type === Selector.COLLAPSED) {
        $body.hide()
        $body.parent().parent().addClass('d-none')
      }
    })
  }

  toggleRow() {
    const $element = this._element
    const time = 500
    const $type = $element.next().attr(Selector.DATA_SELECTOR)
    const $body = $element.next().children().first().children()
    $body.stop()
    if ($type === Selector.EXPANDED) {
      $body.slideUp(time, () => {
        $element.next().addClass('d-none')
      })
      $element.next().attr(Selector.DATA_SELECTOR, Selector.COLLAPSED)
      $element.trigger($.Event(Event.COLLAPSED))
    } else if ($type === Selector.COLLAPSED) {
      $element.next().removeClass('d-none')
      $body.slideDown(time)
      $element.next().attr(Selector.DATA_SELECTOR, Selector.EXPANDED)
      $element.trigger($.Event(Event.EXPANDED))
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
$(ClassName.TABLE).ready(function () {
  ExpandableTable._jQueryInterface.call($(this), 'init')
})

$(document).on('click', Selector.HEADER, function () {
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
