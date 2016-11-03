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
    NAV_HEADER: '.nav-header',
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
        var _this = this;

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

          if (!_this._config.case_sensitive) {
            value = value.toLowerCase();
          }

          _this.search(value);
        });
      }
    }, {
      key: 'search',
      value: function search(value) {
        var items = this._config.target.find(Selector.LI);
        var headers = this._config.target.find(Selector.NAV_HEADER);

        // If the value is back to null
        if (!value) {
          // Show all headers
          headers.css('display', 'block');

          // Close all treeviews
          items.css('display', 'block').removeClass(ClassName.OPEN).find(Selector.NAV_TREEVIEW).css('display', 'none');

          // Open the originally opened treeviews
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this._open_menus[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var menu = _step.value;

              if (!$(menu).hasClass(ClassName.OPEN)) {
                $(menu).addClass(ClassName.OPEN).css('display', 'block');
                $(menu).children(Selector.NAV_TREEVIEW).css('display', 'block');
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return;
        }

        // Hide all elements
        items.css('display', 'none');
        headers.css('display', 'none');

        // Search through the tree elements
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            var text = $(item).children('a').text();

            if (!this._config.case_sensitive) {
              text = text.toLowerCase();
            }

            if (text.indexOf(value) != -1) {
              // Found the result
              // Make the parent LI visible
              $(item).parents(Selector.LI).css('display', 'block').addClass('menu-open');

              $(item).parents(Selector.NAV_TREEVIEW).css('display', 'block');

              // If this is a treeview parent, make all of its children visible
              $(item).children(Selector.NAV_TREEVIEW).css('display', 'block').children(Selector.LI).css('display', 'block').addClass('menu-open');

              // Make this element visible
              $(item).css('display', 'block');
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
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
