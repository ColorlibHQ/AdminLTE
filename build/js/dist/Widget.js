'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------
 * AdminLTE Widget.js
 * License MIT
 * --------------------------------------------
 */

var Widget = (function ($) {
  'use strict';

  var Widget = (function () {
    function Widget(element) {
      _classCallCheck(this, Widget);

      this._element = element;
    }

    _createClass(Widget, null, [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(element) {
        var $this = $(element);
        $this.show();
      }
    }]);

    return Widget;
  })();

  return Widget;
})(jQuery);
//# sourceMappingURL=Widget.js.map
