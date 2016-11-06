'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------
 * AdminLTE Layout.js
 * License MIT
 * --------------------------------------------
 */

var Layout = function ($) {
  'use strict';

  /**
   * Constants
   * ====================================================
   */

  var NAME = 'Layout';
  var DATA_KEY = 'lte.layout';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    SIDEBAR: 'sidebar'
  };

  var Selector = {
    SIDEBAR: '.main-sidebar',
    HEADER: '.main-header',
    CONTENT: '.content-wrapper',
    CONTENT_HEADER: '.content-header',
    WRAPPER: '.wrapper',
    CONTROL_SIDEBAR: '.control-sidebar',
    LAYOUT_FIXED: '.layout-fixed',
    FOOTER: '.main-footer'
  };

  var ClassName = {
    HOLD: 'hold-transition',
    SIDEBAR: 'main-sidebar',
    LAYOUT_FIXED: 'layout-fixed'
  };

  /**
   * Class Definition
   * ====================================================
   */

  var Layout = function () {
    function Layout(element) {
      _classCallCheck(this, Layout);

      this._element = element;

      this._init();
    }

    // Public

    _createClass(Layout, [{
      key: 'fixLayoutHeight',
      value: function fixLayoutHeight() {
        var heights = [$(window).height(), $(Selector.HEADER).outerHeight(), $(Selector.FOOTER).outerHeight(), $(Selector.SIDEBAR).height()],
            max = this._max(heights);

        $(Selector.CONTENT).css('min-height', max - (heights[1] + heights[2]));
      }

      // Private

    }, {
      key: '_init',
      value: function _init() {
        var _this = this;

        // Enable transitions
        $('body').removeClass(ClassName.HOLD);

        // Activate layout height watcher
        this.fixLayoutHeight();
        $(Selector.SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview collapsed.lte.pushmenu expanded.lte.pushmenu', function () {
          _this.fixLayoutHeight();
        });
        $(window).resize(function () {
          _this.fixLayoutHeight();
        });

        $('body, html').css('height', 'auto');
      }
    }, {
      key: '_max',
      value: function _max(numbers) {
        // Calculate the maximum number in a list
        var max = 0;

        numbers.forEach(function (v) {
          if (v > max) {
            max = v;
          }
        });

        return max;
      }

      // Static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(operation) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Layout(this);
            $(this).data(DATA_KEY, data);
          }

          if (operation) {
            data[operation]();
          }
        });
      }
    }]);

    return Layout;
  }();

  /**
   * Data API
   * ====================================================
   */


  $(window).on('load', function () {
    Layout._jQueryInterface.call($('body'));
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Layout._jQueryInterface;
  $.fn[NAME].Constructor = Layout;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Layout._jQueryInterface;
  };

  return Layout;
}(jQuery);
//# sourceMappingURL=Layout.js.map
