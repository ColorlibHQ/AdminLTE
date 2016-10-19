'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------
 * AdminLTE ControlSidebar.js
 * License MIT
 * --------------------------------------------
 */

var ControlSidebar = function ($) {
  'use strict';

  /**
   * Constants
   * ====================================================
   */

  var NAME = 'ControlSidebar';
  var DATA_KEY = 'lte.control.sidebar';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var DATA_API_KEY = '.data-api';

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var Selector = {
    CONTROL_SIDEBAR: '.control-sidebar',
    DATA_TOGGLE: '[data-widget="control-sidebar"]'
  };

  var ClassName = {
    CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',
    CONTROL_SIDEBAR_SLIDE: 'control-sidebar-slide-open'
  };

  var Default = {
    slide: true
  };

  /**
   * Class Definition
   * ====================================================
   */

  var ControlSidebar = function () {
    function ControlSidebar(element, config) {
      _classCallCheck(this, ControlSidebar);

      this._element = element;
      this._config = this._getConfig(config);
    }

    // Public

    _createClass(ControlSidebar, [{
      key: 'show',
      value: function show() {
        console.log('showing', this._config.slide);
        // Show the control sidebar
        if (this._config.slide) {
          $('body').removeClass(ClassName.CONTROL_SIDEBAR_SLIDE);
        } else {
          $('body').removeClass(ClassName.CONTROL_SIDEBAR_OPEN);
        }
      }
    }, {
      key: 'collapse',
      value: function collapse() {
        // Collapse the control sidebar
        if (this._config.slide) {
          $('body').addClass(ClassName.CONTROL_SIDEBAR_SLIDE);
        } else {
          $('body').addClass(ClassName.CONTROL_SIDEBAR_OPEN);
        }
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)) {
          // Open the control sidebar
          this.show();
        } else {
          // Close the control sidebar
          this.collapse();
        }
      }

      // Private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        return $.extend({}, Default, config);
      }

      // Static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(operation) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new ControlSidebar(this, $(this).data());
            $(this).data(DATA_KEY, data);
          }

          if (data[operation] === undefined) {
            throw new Error(operation + ' is not a function');
          }

          data[operation]();
        });
      }
    }]);

    return ControlSidebar;
  }();

  /**
   *
   * Data Api implementation
   * ====================================================
   */

  $(document).on('click', Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    ControlSidebar._jQueryInterface.call($(this), 'toggle');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = ControlSidebar._jQueryInterface;
  $.fn[NAME].Constructor = ControlSidebar;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ControlSidebar._jQueryInterface;
  };

  return ControlSidebar;
}(jQuery);
//# sourceMappingURL=ControlSidebar.js.map
