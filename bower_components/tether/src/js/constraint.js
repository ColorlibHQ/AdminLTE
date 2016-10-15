/* globals TetherBase */

const {
  getBounds,
  extend,
  updateClasses,
  defer
} = TetherBase.Utils;

const BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

function getBoundingRect(tether, to) {
  if (to === 'scrollParent') {
    to = tether.scrollParents[0];
  } else if (to === 'window') {
    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
  }

  if (to === document) {
    to = to.documentElement;
  }

  if (typeof to.nodeType !== 'undefined') {
    const node = to;
    const size = getBounds(to);
    const pos = size;
    const style = getComputedStyle(to);

    to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];
  
    // Account any parent Frames scroll offset
    if (node.ownerDocument !== document) {
      let win = node.ownerDocument.defaultView;
      to[0] += win.pageXOffset;
      to[1] += win.pageYOffset;
      to[2] += win.pageXOffset;
      to[3] += win.pageYOffset;
    }
  
    BOUNDS_FORMAT.forEach((side, i) => {
      side = side[0].toUpperCase() + side.substr(1);
      if (side === 'Top' || side === 'Left') {
        to[i] += parseFloat(style[`border${ side }Width`]);
      } else {
        to[i] -= parseFloat(style[`border${ side }Width`]);
      }
    });
  }

  return to;
}

TetherBase.modules.push({
  position({top, left, targetAttachment}) {
    if (!this.options.constraints) {
      return true;
    }

    let {height, width} = this.cache('element-bounds', () => {
      return getBounds(this.element);
    });

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      // Handle the item getting hidden as a result of our positioning without glitching
      // the classes in and out
      ({width, height} = this.lastSize);
    }

    const targetSize = this.cache('target-bounds', () => {
      return this.getTargetBounds();
    });

    const {height: targetHeight, width: targetWidth} = targetSize;

    const allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

    this.options.constraints.forEach(constraint => {
      const {outOfBoundsClass, pinnedClass} = constraint;
      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }
      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });

    allClasses.forEach(cls => {
      ['left', 'top', 'right', 'bottom'].forEach(side => {
        allClasses.push(`${ cls }-${ side }`);
      });
    });

    const addClasses = [];

    const tAttachment = extend({}, targetAttachment);
    const eAttachment = extend({}, this.attachment);

    this.options.constraints.forEach(constraint => {
      let {to, attachment, pin} = constraint;

      if (typeof attachment === 'undefined') {
        attachment = '';
      }

      let changeAttachX, changeAttachY;
      if (attachment.indexOf(' ') >= 0) {
        [changeAttachY, changeAttachX] = attachment.split(' ');
      } else {
        changeAttachX = changeAttachY = attachment;
      }

      const bounds = getBoundingRect(this, to);

      if (changeAttachY === 'target' || changeAttachY === 'both') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          top += targetHeight;
          tAttachment.top = 'bottom';
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          top -= targetHeight;
          tAttachment.top = 'top';
        }
      }

      if (changeAttachY === 'together') {
        if (tAttachment.top === 'top') {
          if (eAttachment.top === 'bottom' && top < bounds[1]) {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top += height;
            eAttachment.top = 'top';

          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
            top -= height - targetHeight;
            tAttachment.top = 'bottom';

            eAttachment.top = 'bottom';
          }
        }

        if (tAttachment.top === 'bottom') {
          if (eAttachment.top === 'top' && top + height > bounds[3]) {
            top -= targetHeight;
            tAttachment.top = 'top';

            top -= height;
            eAttachment.top = 'bottom';

          } else if (eAttachment.top === 'bottom'&& top < bounds[1] && top + (height*2 - targetHeight) <= bounds[3]) {
            top += height - targetHeight;
            tAttachment.top = 'top';

            eAttachment.top = 'top';

          }
        }

        if (tAttachment.top === 'middle') {
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';

          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
        }
      }

      if (changeAttachX === 'target' || changeAttachX === 'both') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          left += targetWidth;
          tAttachment.left = 'right';
        }

        if (left + width > bounds[2] && tAttachment.left === 'right') {
          left -= targetWidth;
          tAttachment.left = 'left';
        }
      }

      if (changeAttachX === 'together') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          if (eAttachment.left === 'right') {
            left += targetWidth;
            tAttachment.left = 'right';

            left += width;
            eAttachment.left = 'left';

          } else if (eAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';

            left -= width;
            eAttachment.left = 'right';
          }

        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
          if (eAttachment.left === 'left') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left -= width;
            eAttachment.left = 'right';

          } else if (eAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left += width;
            eAttachment.left = 'left';
          }

        } else if (tAttachment.left === 'center') {
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';

          } else if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
        }
      }

      if (changeAttachY === 'element' || changeAttachY === 'both') {
        if (top < bounds[1] && eAttachment.top === 'bottom') {
          top += height;
          eAttachment.top = 'top';
        }

        if (top + height > bounds[3] && eAttachment.top === 'top') {
          top -= height;
          eAttachment.top = 'bottom';
        }
      }

      if (changeAttachX === 'element' || changeAttachX === 'both') {
        if (left < bounds[0]) {
          if (eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'center') {
            left += (width / 2);
            eAttachment.left = 'left';
          }
        }

        if (left + width > bounds[2]) {
          if (eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'center') {
            left -= (width / 2);
            eAttachment.left = 'right';
          }
        }
      }

      if (typeof pin === 'string') {
        pin = pin.split(',').map(p => p.trim());
      } else if (pin === true) {
        pin = ['top', 'left', 'right', 'bottom'];
      }

      pin = pin || [];

      const pinned = [];
      const oob = [];

      if (top < bounds[1]) {
        if (pin.indexOf('top') >= 0) {
          top = bounds[1];
          pinned.push('top');
        } else {
          oob.push('top');
        }
      }

      if (top + height > bounds[3]) {
        if (pin.indexOf('bottom') >= 0) {
          top = bounds[3] - height;
          pinned.push('bottom');
        } else {
          oob.push('bottom');
        }
      }

      if (left < bounds[0]) {
        if (pin.indexOf('left') >= 0) {
          left = bounds[0];
          pinned.push('left');
        } else {
          oob.push('left');
        }
      }

      if (left + width > bounds[2]) {
        if (pin.indexOf('right') >= 0) {
          left = bounds[2] - width;
          pinned.push('right');
        } else {
          oob.push('right');
        }
      }

      if (pinned.length) {
        let pinnedClass;
        if (typeof this.options.pinnedClass !== 'undefined') {
          pinnedClass = this.options.pinnedClass;
        } else {
          pinnedClass = this.getClass('pinned');
        }

        addClasses.push(pinnedClass);
        pinned.forEach(side => {
          addClasses.push(`${ pinnedClass }-${ side }`);
        });
      }

      if (oob.length) {
        let oobClass;
        if (typeof this.options.outOfBoundsClass !== 'undefined') {
          oobClass = this.options.outOfBoundsClass;
        } else {
          oobClass = this.getClass('out-of-bounds');
        }

        addClasses.push(oobClass);
        oob.forEach(side => {
          addClasses.push(`${ oobClass }-${ side }`);
        });
      }

      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
        eAttachment.left = tAttachment.left = false;
      }
      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
        eAttachment.top = tAttachment.top = false;
      }

      if (tAttachment.top !== targetAttachment.top ||
          tAttachment.left !== targetAttachment.left ||
          eAttachment.top !== this.attachment.top ||
          eAttachment.left !== this.attachment.left) {
        this.updateAttachClasses(eAttachment, tAttachment);
        this.trigger('update', {
          attachment: eAttachment,
          targetAttachment: tAttachment,
        });
      }
    });

    defer(() => {
      if (!(this.options.addTargetClasses === false)) {
        updateClasses(this.target, addClasses, allClasses);
      }
      updateClasses(this.element, addClasses, allClasses);
    });

    return {top, left};
  }
});
