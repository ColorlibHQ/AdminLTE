'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------
 * AdminLTE SiteSearch.js
 * License MIT
 * --------------------------------------------
 */

var SiteSearch = function ($) {
  'use strict';

  /**
   * Constants
   * ====================================================
   */

  var NAME = 'SiteSearch';
  var DATA_KEY = 'lte.site-search';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {};

  var Selector = {
    TOGGLE_BUTTON: '[data-widget="site-search"]',
    SEARCH_BLOCK: '.site-search-block',
    SEARCH_BACKDROP: '.site-search-backdrop',
    SEARCH_INPUT: '.site-search-block .form-control'
  };

  var ClassName = {
    OPEN: 'site-search-open'
  };

  var Default = {
    transitionSpeed: 300
  };

  /**
   * Class Definition
   * ====================================================
   */

  var SiteSearch = function () {
    function SiteSearch(_element, _options) {
      _classCallCheck(this, SiteSearch);

      this.element = _element;
      this.options = $.extend({}, Default, _options);
    }

    // Public

    _createClass(SiteSearch, [{
      key: 'open',
      value: function open() {
        $(Selector.SEARCH_BLOCK).slideDown(this.options.transitionSpeed);
        $(Selector.SEARCH_BACKDROP).show(0);
        $(Selector.SEARCH_INPUT).focus();
        $(Selector.SEARCH_BLOCK).addClass(ClassName.OPEN);
      }
    }, {
      key: 'close',
      value: function close() {
        $(Selector.SEARCH_BLOCK).slideUp(this.options.transitionSpeed);
        $(Selector.SEARCH_BACKDROP).hide(0);
        $(Selector.SEARCH_BLOCK).removeClass(ClassName.OPEN);
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        if ($(Selector.SEARCH_BLOCK).hasClass(ClassName.OPEN)) {
          this.close();
        } else {
          this.open();
        }
      }

      // Static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(options) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new SiteSearch(this, options);
            $(this).data(DATA_KEY, data);
          }

          if (!/toggle|close/.test(options)) {
            throw Error('Undefined method ' + options);
          }

          data[options]();
        });
      }
    }]);

    return SiteSearch;
  }();

  /**
   * Data API
   * ====================================================
   */


  $(document).on('click', Selector.TOGGLE_BUTTON, function (event) {
    event.preventDefault();

    var button = $(event.currentTarget);

    if (button.data('widget') !== 'site-search') {
      button = button.closest(Selector.TOGGLE_BUTTON);
    }

    SiteSearch._jQueryInterface.call(button, 'toggle');
  });

  $(document).on('click', Selector.SEARCH_BACKDROP, function (event) {
    var backdrop = $(event.currentTarget);
    SiteSearch._jQueryInterface.call(backdrop, 'close');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = SiteSearch._jQueryInterface;
  $.fn[NAME].Constructor = SiteSearch;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return SiteSearch._jQueryInterface;
  };

  return SiteSearch;
}(jQuery);
//# sourceMappingURL=SiteSearch.js.map
