'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------
 * AdminLTE PushMenu.js
 * License MIT
 * --------------------------------------------
 */

var PushMenu = function ($) {
  'use strict';

  /**
   * Constants
   * ====================================================
   */

  var NAME = 'PushMenu';
  var DATA_KEY = 'lte.pushmenu';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    COLLAPSED: 'collapsed' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY
  };

  var Selector = {
    COLLAPSED: 'sidebar-collapse',
    TOGGLE_BUTTON: '[data-widget="pushmenu"]'
  };

  /**
   * Class Definition
   * ====================================================
   */

  var PushMenu = function () {
    function PushMenu(element) {
      _classCallCheck(this, PushMenu);

      this._element = element;
      this._isShown = !$('body').hasClass(Selector.COLLAPSED) || $('body').hasClass('sidebar-open');
    }

    // Public

    _createClass(PushMenu, [{
      key: 'show',
      value: function show() {
        $('body').addClass('sidebar-open').removeClass(Selector.COLLAPSED);

        this._isShown = true;

        var shownEvent = $.Event(Event.SHOWN);
        $(this._element).trigger(shownEvent);
      }
    }, {
      key: 'collapse',
      value: function collapse() {
        $('body').removeClass('sidebar-open').addClass(Selector.COLLAPSED);

        this._isShown = false;

        var collapsedEvent = $.Event(Event.COLLAPSED);
        $(this._element).trigger(collapsedEvent);
      }
    }, {
      key: 'toggle',
      value: function toggle() {

        if (typeof this._isShown === 'undefined') {
          this._isShown = !$('body').hasClass(Selector.COLLAPSED) || $('body').hasClass('sidebar-open');
        }

        if (this._isShown) {
          this.collapse();
        } else {
          this.show();
        }
      }

      // Static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(operation) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new PushMenu(this);
            $(this).data(DATA_KEY, data);
          }

          if (operation) {
            data[operation]();
          }
        });
      }
    }]);

    return PushMenu;
  }();

  /**
   * Data API
   * ====================================================
   */

  $(document).on('click', Selector.TOGGLE_BUTTON, function (event) {
    event.preventDefault();

    var button = event.currentTarget;

    if ($(button).data('widget') !== 'pushmenu') {
      button = $(button).closest(Selector.TOGGLE_BUTTON);
    }

    PushMenu._jQueryInterface.call($(button), 'toggle');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = PushMenu._jQueryInterface;
  $.fn[NAME].Constructor = PushMenu;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return PushMenu._jQueryInterface;
  };

  return PushMenu;
}(jQuery);
//# sourceMappingURL=PushMenu.js.map
