/**
 * --------------------------------------------
 * AdminLTE Widget.js
 * License MIT
 * --------------------------------------------
 */

const Widget = (($) => {

  class Widget {

    constructor(element) {
      this._element = element
    }

    static _jQueryInterface(element) {
      $(element).show()
    }
  }

  return Widget

})(jQuery)

export default Widget
