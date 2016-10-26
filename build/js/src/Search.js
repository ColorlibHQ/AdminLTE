/**
 * --------------------------------------------
 * AdminLTE Search.js
 * License MIT
 * --------------------------------------------
 */

const Search = (($) => {

  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'Search'
  const DATA_KEY           = 'lte.search'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    LOAD_DATA_API: `load${EVENT_KEY}`
  }

  const Selector = {
    LI           : '.nav-item',
    LINK         : '.nav-link',
    OPEN         : '.menu-open',
    ACTIVE       : '.active',
    TREEVIEW_MENU: '[data-widget="treeview"]',
    NAV_TREEVIEW : '.nav-treeview',
    DATA_WIDGET  : '[data-widget="search"]'
  }

  const ClassName = {
    LI          : 'nav-item',
    LINK        : 'nav-link',
    NAV_TREEVIEW: 'nav-treeview',
    OPEN        : 'menu-open'
  }

  const Default = {
    target        : '',
    case_sensitive: false
  }

  /**
   * Class Definition
   * ====================================================
   */
  class Search {

    constructor(element, config) {
      this._config     = config
      this._element    = element
      this._open_menus = null
    }

    // Public

    init() {
      if (this._config.target === '') {
        this._config.target = this._element.closest(Selector.TREEVIEW_MENU)
      } else {
        this._config.target = $(this._config.target)
      }

      // Set treeview original state
      this._open_menus = this._config.target.find(Selector.OPEN)

      // Prevent form submission
      this._element.parents('form').first().submit(function (event) {
        event.preventDefault()
      })

      // Setup search function
      this._element.keyup(function (event) {
        event.preventDefault()

        let value = $(event.currentTarget).val()

        if (!this._config.case_sensitive) {
          value = value.toLowerCase()
        }

        this.search(value)
      }.bind(this))
    }

    search(value) {
      let _that = this

      // If the value is back to null
      if (!value) {
        // Close all treeviews
        this._config.target.find(Selector.LI)
          .css('display', 'block')
          .find(Selector.NAV_TREEVIEW)
          .css('display', 'none')

        // Open the originally opened treeviews
        this._config.target.find(Selector.OPEN).find(Selector.NAV_TREEVIEW).css('display', 'block')
        this._open_menus.each(function () {
          if (!$(this).hasClass(ClassName.OPEN)) {
            $(this).addClass(Selector.OPEN).css('display', 'block')
            $(this).children(Selector.NAV_TREEVIEW).css('display', 'block')
          }
        })
        return
      }

      // Search through the tree elements
      this._config.target.find(Selector.LI).each(function () {
        let text = $(this).children(Selector.LINK).first().text()

        if (!_that._config.case_sensitive) {
          text = text.toLowerCase()
        }

        if (text.search(value) == -1) {
          // No results
          $(this).css('display', 'none')
        } else { // Found the result
          // Make the parent LI visible
          $(this).parents(Selector.LI)
            .css('display', 'block')

          // Make the parent nav-treeview visible
          $(this).parents(Selector.NAV_TREEVIEW)
            .addClass('menu-open')
            .css('display', 'block')

          // Make this element visible
          $(this).css('display', 'block')
        }
      })
    }


    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data    = $(this).data(DATA_KEY)
        let _config = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new Search($(this), _config)
          $(this).data(DATA_KEY, data)
        }

        if (config === 'init') {
          data[config]()
        }
      })
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(window).on(Event.LOAD_DATA_API, () => {
    $(Selector.DATA_WIDGET).each(function () {
      Search._jQueryInterface.call($(this), 'init')
    })
  })

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Search._jQueryInterface
  $.fn[NAME].Constructor = Search
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Search._jQueryInterface
  }

  return Search

})(jQuery)
