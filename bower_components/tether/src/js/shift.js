/* globals TetherBase */

TetherBase.modules.push({
  position({top, left}) {
    if (!this.options.shift) {
      return;
    }

    let shift = this.options.shift;
    if (typeof this.options.shift === 'function') {
      shift = this.options.shift.call(this, {top, left});
    }

    let shiftTop, shiftLeft;
    if (typeof shift === 'string') {
      shift = shift.split(' ');
      shift[1] = shift[1] || shift[0];

      ([shiftTop, shiftLeft] = shift);

      shiftTop = parseFloat(shiftTop, 10);
      shiftLeft = parseFloat(shiftLeft, 10);
    } else {
      ([shiftTop, shiftLeft] = [shift.top, shift.left]);
    }

    top += shiftTop;
    left += shiftLeft;

    return {top, left};
  }
});
