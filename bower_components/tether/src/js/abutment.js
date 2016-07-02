/* globals TetherBase */

const {getBounds, updateClasses, defer} = TetherBase.Utils;

TetherBase.modules.push({
  position({top, left}) {
    const {height, width} = this.cache('element-bounds', () => {
      return getBounds(this.element);
    });

    const targetPos = this.getTargetBounds();

    const bottom = top + height;
    const right = left + width;

    const abutted = [];
    if (top <= targetPos.bottom && bottom >= targetPos.top) {
      ['left', 'right'].forEach(side => {
        const targetPosSide = targetPos[side];
        if (targetPosSide === left || targetPosSide === right) {
          abutted.push(side);
        }
      });
    }

    if (left <= targetPos.right && right >= targetPos.left) {
      ['top', 'bottom'].forEach(side => {
        const targetPosSide = targetPos[side];
        if (targetPosSide === top || targetPosSide === bottom) {
          abutted.push(side);
        }
      });
    }

    const allClasses = [];
    const addClasses = [];

    const sides = ['left', 'top', 'right', 'bottom'];
    allClasses.push(this.getClass('abutted'));
    sides.forEach(side => {
      allClasses.push(`${ this.getClass('abutted') }-${ side }`);
    });

    if (abutted.length) {
      addClasses.push(this.getClass('abutted'));
    }

    abutted.forEach(side => {
      addClasses.push(`${ this.getClass('abutted') }-${ side }`);
    });

    defer(() => {
      if (!(this.options.addTargetClasses === false)) {
        updateClasses(this.target, addClasses, allClasses);
      }
      updateClasses(this.element, addClasses, allClasses);
    });

    return true;
  }
});
