/**
 * --------------------------------------------
 * AdminLTE Treeview.js
 * License MIT
 * --------------------------------------------
 */

const Treeview = (($) => {

  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'Treeview'
  const DATA_KEY           = 'lte.treeview'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const EVENT = {
    SELECTED: `selected${EVENT_KEY}`
  }

  const Selector = {
    LI: '.nav-item',
    LINK: '.nav-link',
    DATA_WIDGET: '[data-widget="treeview"]'
  }

  /**
   * Class Definition
   * ====================================================
   */
  class Treeview {

    constructor(element, config) {
      this._config  = config
      this._element = element
    }

    // Public

    // Private

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        this._config = config

      })
    }

  }

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME]             = Treeview._jQueryInterface
  $.fn[NAME].Constructor = Treeview
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Treeview._jQueryInterface
  }

  return Treeview

})(jQuery)
