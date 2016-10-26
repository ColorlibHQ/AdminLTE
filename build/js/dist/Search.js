'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------
 * AdminLTE Search.js
 * License MIT
 * --------------------------------------------
 */

var Search = function ($) {

  /**
   * Constants
   * ====================================================
   */

  var NAME = 'Search';
  var DATA_KEY = 'lte.search';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    LOAD_DATA_API: 'load' + EVENT_KEY
  };

  var Selector = {
    LI: '.nav-item',
    LINK: '.nav-link',
    OPEN: '.menu-open',
    ACTIVE: '.active',
    TREEVIEW_MENU: '[data-widget="treeview"]',
    NAV_TREEVIEW: '.nav-treeview',
    DATA_WIDGET: '[data-widget="search"]'
  };

  var ClassName = {
    LI: 'nav-item',
    LINK: 'nav-link',
    NAV_TREEVIEW: 'nav-treeview',
    OPEN: 'menu-open'
  };

  var Default = {
    target: '',
    case_sensitive: false
  };

  /**
   * Class Definition
   * ====================================================
   */

  var Search = function () {
    function Search(element, config) {
      _classCallCheck(this, Search);

      this._config = config;
      this._element = element;
      this._open_menus = null;
    }

    // Public

    _createClass(Search, [{
      key: 'init',
      value: function init() {
        if (this._config.target === '') {
          this._config.target = this._element.closest(Selector.TREEVIEW_MENU);
        } else {
          this._config.target = $(this._config.target);
        }

        // Set treeview original state
        this._open_menus = this._config.target.find(Selector.OPEN);

        // Prevent form submission
        this._element.parents('form').first().submit(function (event) {
          event.preventDefault();
        });

        // Setup search function
        this._element.keyup(function (event) {
          event.preventDefault();

          var value = $(event.currentTarget).val();

          if (!this._config.case_sensitive) {
            value = value.toLowerCase();
          }

          this.search(value);
        }.bind(this));
      }
    }, {
      key: 'search',
      value: function search(value) {
        var _that = this;

        // If the value is back to null
        if (!value) {
          // Close all treeviews
          this._config.target.find(Selector.LI).css('display', 'block').find(Selector.NAV_TREEVIEW).css('display', 'none');

          // Open the originally opened treeviews
          this._config.target.find(Selector.OPEN).find(Selector.NAV_TREEVIEW).css('display', 'block');
          this._open_menus.each(function () {
            if (!$(this).hasClass(ClassName.OPEN)) {
              $(this).addClass(Selector.OPEN).css('display', 'block');
              $(this).children(Selector.NAV_TREEVIEW).css('display', 'block');
            }
          });
          return;
        }

        // Search through the tree elements
        this._config.target.find(Selector.LI).each(function () {
          var text = $(this).children(Selector.LINK).first().text();

          if (!_that._config.case_sensitive) {
            text = text.toLowerCase();
          }

          if (text.search(value) == -1) {
            // No results
            $(this).css('display', 'none');
          } else {
            // Found the result
            // Make the parent LI visible
            $(this).parents(Selector.LI).css('display', 'block');

            // Make the parent nav-treeview visible
            $(this).parents(Selector.NAV_TREEVIEW).addClass('menu-open').css('display', 'block');

            // Make this element visible
            $(this).css('display', 'block');
          }
        });
      }

      // Static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new Search($(this), _config);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'init') {
            data[config]();
          }
        });
      }
    }]);

    return Search;
  }();

  /**
   * Data API
   * ====================================================
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_WIDGET).each(function () {
      Search._jQueryInterface.call($(this), 'init');
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Search._jQueryInterface;
  $.fn[NAME].Constructor = Search;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Search._jQueryInterface;
  };

  return Search;
}(jQuery);
//# sourceMappingURL=Search.js.map
