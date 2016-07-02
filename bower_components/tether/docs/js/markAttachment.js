/* globals Tether */

'use strict';

Tether.modules.push({
  initialize: function initialize() {
    var _this = this;

    this.markers = {};

    ['target', 'element'].forEach(function (type) {
      var el = document.createElement('div');
      el.className = _this.getClass('' + type + '-marker');

      var dot = document.createElement('div');
      dot.className = _this.getClass('marker-dot');
      el.appendChild(dot);

      _this[type].appendChild(el);

      _this.markers[type] = { dot: dot, el: el };
    });
  },

  position: function position(_ref) {
    var manualOffset = _ref.manualOffset;
    var manualTargetOffset = _ref.manualTargetOffset;

    var offsets = {
      element: manualOffset,
      target: manualTargetOffset
    };

    for (var type in offsets) {
      var offset = offsets[type];
      for (var side in offset) {
        var val = offset[side];
        var notString = typeof val !== 'string';
        if (notString || val.indexOf('%') === -1 && val.indexOf('px') === -1) {
          val += 'px';
        }

        if (this.markers[type].dot.style[side] !== val) {
          this.markers[type].dot.style[side] = val;
        }
      }
    }

    return true;
  }
});
