/**
 * --------------------------------------------
 * AdminLTE Widget.js
 * License MIT
 * --------------------------------------------
 */

const Widget = (($) => {
  'use strict'

  class Widget {

    constructor(element) {
      this._element = element
    }

    static _jQueryInterface(element) {
      let $this = $(element)
      $this.show()
    }
  }

  return Widget

})(jQuery)
