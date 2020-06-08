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
}

const Selector = {
  DATA_TOGGLE: '[data-widget="expandable-table"]',
  ARIA_ATTR: 'aria-expanded'
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
    $(Selector.DATA_TOGGLE).each((_, $header) => {
      const $type = $($header).attr(Selector.ARIA_ATTR)
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
    const $type = $element.attr(Selector.ARIA_ATTR)
    const $body = $element.next().children().first().children()

    $body.stop()
    if ($type === 'true') {
      $body.slideUp(time, () => {
        $element.next().addClass('d-none')
      })
      $element.attr(Selector.ARIA_ATTR, 'false')
      $element.trigger($.Event(Event.COLLAPSED))
    } else if ($type === 'false') {
      $element.next().removeClass('d-none')
      $body.slideDown(time)
      $element.attr(Selector.ARIA_ATTR, 'true')
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

$(document).on('click', Selector.DATA_TOGGLE, function () {
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
