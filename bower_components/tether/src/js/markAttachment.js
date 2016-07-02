/* globals Tether */

Tether.modules.push({
  initialize() {
    this.markers = {};

    ['target', 'element'].forEach(type => {
      const el = document.createElement('div');
      el.className = this.getClass(`${ type }-marker`);

      const dot = document.createElement('div');
      dot.className = this.getClass('marker-dot');
      el.appendChild(dot);

      this[type].appendChild(el);

      this.markers[type] = {dot, el};
    });
  },

  position({manualOffset, manualTargetOffset}) {
    const offsets = {
      element: manualOffset,
      target: manualTargetOffset
    };

    for (let type in offsets) {
      const offset = offsets[type];
      for (let side in offset) {
        let val = offset[side];
        const notString = typeof val !== 'string';
        if (notString ||
            val.indexOf('%') === -1 &&
            val.indexOf('px') === -1) {
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
