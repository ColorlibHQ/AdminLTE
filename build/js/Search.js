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
    NAV_HEADER   : '.nav-header',
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
    caseSensitive: false
  }

  /**
   * Class Definition
   * ====================================================
   */
  class Search {

    constructor(element, config) {
      this._config     = config
      this._element    = element
      this._openMenus = null
    }

    // Public

    init() {
      if (this._config.target === '') {
        this._config.target = this._element.closest(Selector.TREEVIEW_MENU)
      } else {
        this._config.target = $(this._config.target)
      }

      // Set treeview original state
      this._openMenus = this._config.target.find(Selector.OPEN)

      // Prevent form submission
      this._element.parents('form').first().submit((event) => {
        event.preventDefault()
      })

      // Setup search function
      this._element.keyup((event) => {
        event.preventDefault()

        let value = $(event.currentTarget).val()

        if (!this._config.caseSensitive) {
          value = value.toLowerCase()
        }

        this.search(value)
      })
    }

    search(value) {
      const items   = this._config.target.find(Selector.LI)
      const headers = this._config.target.find(Selector.NAV_HEADER)

      // If the value is back to null
      if (!value) {
        // Show all headers
        headers.css('display', 'block')

        // Close all treeviews
        items.css('display', 'block')
          .removeClass(ClassName.OPEN)
          .find(Selector.NAV_TREEVIEW)
          .css('display', 'none')

        // Open the originally opened treeviews
        for (const menu of this._openMenus) {
          if (!$(menu).hasClass(ClassName.OPEN)) {
            $(menu).addClass(ClassName.OPEN).css('display', 'block')
            $(menu).children(Selector.NAV_TREEVIEW).css('display', 'block')
          }
        }

        return
      }

      // Hide all elements
      items.css('display', 'none')
      headers.css('display', 'none')

      // Search through the tree elements
      for (const item of items) {
        let text = $(item).children('a').text()

        if (!this._config.caseSensitive) {
          text = text.toLowerCase()
        }

        if (parseInt(text.indexOf(value)) !== -1) {
          // Found the result
          // Make the parent LI visible
          $(item).parents(Selector.LI)
            .css('display', 'block')
            .addClass('menu-open')

          $(item).parents(Selector.NAV_TREEVIEW)
            .css('display', 'block')

          // If this is a treeview parent, make all of its children visible
          $(item).children(Selector.NAV_TREEVIEW)
            .css('display', 'block')
            .children(Selector.LI)
            .css('display', 'block')
            .addClass('menu-open')

          // Make this element visible
          $(item).css('display', 'block')
        }
      }
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data    = $(this).data(DATA_KEY)
        const _config = $.extend({}, Default, $(this).data())

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

export default Search
