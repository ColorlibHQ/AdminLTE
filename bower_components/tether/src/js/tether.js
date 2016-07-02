/* globals TetherBase, performance */

if (typeof TetherBase === 'undefined') {
  throw new Error('You must include the utils.js file before tether.js');
}

const {
  getScrollParent,
  getBounds,
  getOffsetParent,
  extend,
  addClass,
  removeClass,
  updateClasses,
  defer,
  flush,
  getScrollBarSize
} = TetherBase.Utils;

function within(a, b, diff=1) {
  return (a + diff >= b && b >= a - diff);
}

const transformKey = (() => {
  if(typeof document === 'undefined') {
    return '';
  }
  const el = document.createElement('div');

  const transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (let i = 0; i < transforms.length; ++i) {
    const key = transforms[i];
    if (el.style[key] !== undefined) {
      return key;
    }
  }
})();

const tethers = [];

const position = () => {
  tethers.forEach(tether => {
    tether.position(false);
  });
  flush();
};

function now() {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
    return performance.now();
  }
  return +new Date;
}

(() => {
  let lastCall = null;
  let lastDuration = null;
  let pendingTimeout = null;

  const tick = () => {
    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
      // We voluntarily throttle ourselves if we can't manage 60fps
      lastDuration = Math.min(lastDuration - 16, 250);

      // Just in case this is the last event, remember to position just once more
      pendingTimeout = setTimeout(tick, 250);
      return;
    }

    if (typeof lastCall !== 'undefined' && (now() - lastCall) < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (typeof pendingTimeout !== 'undefined') {
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }

    lastCall = now();
    position();
    lastDuration = now() - lastCall;
  };

  if(typeof window !== 'undefined') {
    ['resize', 'scroll', 'touchmove'].forEach(event => {
      window.addEventListener(event, tick);
    });
  }
})();

const MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left'
};

const MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
};

const OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
};

const autoToFixedAttachment = (attachment, relativeToAttachment) => {
  let {left, top} = attachment;

  if (left === 'auto') {
    left = MIRROR_LR[relativeToAttachment.left];
  }

  if (top === 'auto') {
    top = MIRROR_TB[relativeToAttachment.top];
  }

  return {left, top};
};

const attachmentToOffset = (attachment) => {
  let left = attachment.left;
  let top = attachment.top;

  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
    left = OFFSET_MAP[attachment.left];
  }

  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
    top = OFFSET_MAP[attachment.top];
  }

  return {left, top};
};

function addOffset(...offsets) {
  const out = {top: 0, left: 0};

  offsets.forEach(({top, left}) => {
    if (typeof top === 'string') {
      top = parseFloat(top, 10);
    }
    if (typeof left === 'string') {
      left = parseFloat(left, 10);
    }

    out.top += top;
    out.left += left;
  });

  return out;
}

function offsetToPx(offset, size) {
  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
  }
  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
  }

  return offset;
}

const parseOffset = (value) => {
  const [top, left] = value.split(' ');
  return {top, left};
};
const parseAttachment = parseOffset;

class TetherClass {

  constructor(options) {
    this.position = this.position.bind(this);

    tethers.push(this);

    this.history = [];

    this.setOptions(options, false);

    TetherBase.modules.forEach(module => {
      if (typeof module.initialize !== 'undefined') {
        module.initialize.call(this);
      }
    });

    this.position();
  }

  getClass(key='') {
    const {classes} = this.options;
    if (typeof classes !== 'undefined' && classes[key]) {
      return this.options.classes[key];
    } else if (this.options.classPrefix) {
      return `${ this.options.classPrefix }-${ key }`;
    } else {
      return key;
    }
  }

  setOptions(options, pos=true) {
    const defaults = {
      offset: '0 0',
      targetOffset: '0 0',
      targetAttachment: 'auto auto',
      classPrefix: 'tether'
    };

    this.options = extend(defaults, options);

    let {element, target, targetModifier} = this.options;
    this.element = element;
    this.target = target;
    this.targetModifier = targetModifier;

    if (this.target === 'viewport') {
      this.target = document.body;
      this.targetModifier = 'visible';
    } else if (this.target === 'scroll-handle') {
      this.target = document.body;
      this.targetModifier = 'scroll-handle';
    }

    ['element', 'target'].forEach(key => {
      if (typeof this[key] === 'undefined') {
        throw new Error('Tether Error: Both element and target must be defined');
      }

      if (typeof this[key].jquery !== 'undefined') {
        this[key] = this[key][0];
      } else if (typeof this[key] === 'string') {
        this[key] = document.querySelector(this[key]);
      }
    });

    addClass(this.element, this.getClass('element'));
    if (!(this.options.addTargetClasses === false)) {
      addClass(this.target, this.getClass('target'));
    }

    if (!this.options.attachment) {
      throw new Error('Tether Error: You must provide an attachment');
    }

    this.targetAttachment = parseAttachment(this.options.targetAttachment);
    this.attachment = parseAttachment(this.options.attachment);
    this.offset = parseOffset(this.options.offset);
    this.targetOffset = parseOffset(this.options.targetOffset);

    if (typeof this.scrollParent !== 'undefined') {
      this.disable();
    }

    if (this.targetModifier === 'scroll-handle') {
      this.scrollParent = this.target;
    } else {
      this.scrollParent = getScrollParent(this.target);
    }

    if(!(this.options.enabled === false)) {
      this.enable(pos);
    }
  }

  getTargetBounds() {
    if (typeof this.targetModifier !== 'undefined') {
      if (this.targetModifier === 'visible') {
        if (this.target === document.body) {
          return {top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth};
        } else {
          const bounds = getBounds(this.target);

          const out = {
            height: bounds.height,
            width: bounds.width,
            top: bounds.top,
            left: bounds.left
          };

          out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
          out.height = Math.min(out.height, bounds.height - ((bounds.top + bounds.height) - (pageYOffset + innerHeight)));
          out.height = Math.min(innerHeight, out.height);
          out.height -= 2;

          out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
          out.width = Math.min(out.width, bounds.width - ((bounds.left + bounds.width) - (pageXOffset + innerWidth)));
          out.width = Math.min(innerWidth, out.width);
          out.width -= 2;

          if (out.top < pageYOffset) {
            out.top = pageYOffset;
          }
          if (out.left < pageXOffset) {
            out.left = pageXOffset;
          }

          return out;
        }
      } else if (this.targetModifier === 'scroll-handle') {
        let bounds;
        let target = this.target;
        if (target === document.body) {
          target = document.documentElement;

          bounds = {
            left: pageXOffset,
            top: pageYOffset,
            height: innerHeight,
            width: innerWidth
          };
        } else {
          bounds = getBounds(target);
        }

        const style = getComputedStyle(target);

        const hasBottomScroll = (
          target.scrollWidth > target.clientWidth ||
          [style.overflow, style.overflowX].indexOf('scroll') >= 0 ||
          this.target !== document.body
        );

        let scrollBottom = 0;
        if (hasBottomScroll) {
          scrollBottom = 15;
        }

        const height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

        const out = {
          width: 15,
          height: height * 0.975 * (height / target.scrollHeight),
          left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
        };

        let fitAdj = 0;
        if (height < 408 && this.target === document.body) {
          fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
        }

        if (this.target !== document.body) {
          out.height = Math.max(out.height, 24);
        }

        const scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
        out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

        if (this.target === document.body) {
          out.height = Math.max(out.height, 24);
        }

        return out;
      }
    } else {
      return getBounds(this.target);
    }
  }

  clearCache() {
    this._cache = {};
  }

  cache(k, getter) {
    // More than one module will often need the same DOM info, so
    // we keep a cache which is cleared on each position call
    if (typeof this._cache === 'undefined') {
      this._cache = {};
    }

    if (typeof this._cache[k] === 'undefined') {
      this._cache[k] = getter.call(this);
    }

    return this._cache[k];
  }

  enable(pos=true) {
    if (!(this.options.addTargetClasses === false)) {
      addClass(this.target, this.getClass('enabled'));
    }
    addClass(this.element, this.getClass('enabled'));
    this.enabled = true;

    if (this.scrollParent !== document) {
      this.scrollParent.addEventListener('scroll', this.position);
    }

    if (pos) {
      this.position();
    }
  }

  disable() {
    removeClass(this.target, this.getClass('enabled'));
    removeClass(this.element, this.getClass('enabled'));
    this.enabled = false;

    if (typeof this.scrollParent !== 'undefined') {
      this.scrollParent.removeEventListener('scroll', this.position);
    }
  }

  destroy() {
    this.disable();

    tethers.forEach((tether, i) => {
      if (tether === this) {
        tethers.splice(i, 1);
        return;
      }
    });
  }

  updateAttachClasses(elementAttach, targetAttach) {
    elementAttach = elementAttach || this.attachment;
    targetAttach = targetAttach || this.targetAttachment;
    const sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

    if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
      // updateAttachClasses can be called more than once in a position call, so
      // we need to clean up after ourselves such that when the last defer gets
      // ran it doesn't add any extra classes from previous calls.
      this._addAttachClasses.splice(0, this._addAttachClasses.length);
    }

    if (typeof this._addAttachClasses === 'undefined') {
      this._addAttachClasses = [];
    }
    const add = this._addAttachClasses;

    if (elementAttach.top) {
      add.push(`${ this.getClass('element-attached') }-${ elementAttach.top }`);
    }
    if (elementAttach.left) {
      add.push(`${ this.getClass('element-attached') }-${ elementAttach.left }`);
    }
    if (targetAttach.top) {
      add.push(`${ this.getClass('target-attached') }-${ targetAttach.top }`);
    }
    if (targetAttach.left) {
      add.push(`${ this.getClass('target-attached') }-${ targetAttach.left }`);
    }

    const all = [];
    sides.forEach(side => {
      all.push(`${ this.getClass('element-attached') }-${ side }`);
      all.push(`${ this.getClass('target-attached') }-${ side }`);
    });

    defer(() => {
      if (!(typeof this._addAttachClasses !== 'undefined')) {
        return;
      }

      updateClasses(this.element, this._addAttachClasses, all);
      if (!(this.options.addTargetClasses === false)) {
        updateClasses(this.target, this._addAttachClasses, all);
      }

      delete this._addAttachClasses;
    });
  }

  position(flushChanges=true) {
    // flushChanges commits the changes immediately, leave true unless you are positioning multiple
    // tethers (in which case call Tether.Utils.flush yourself when you're done)

    if (!this.enabled) {
      return;
    }

    this.clearCache();

    // Turn 'auto' attachments into the appropriate corner or edge
    const targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

    this.updateAttachClasses(this.attachment, targetAttachment);

    const elementPos = this.cache('element-bounds', () => {
      return getBounds(this.element);
    });

    let {width, height} = elementPos;

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      // We cache the height and width to make it possible to position elements that are
      // getting hidden.
      ({width, height} = this.lastSize);
    } else {
      this.lastSize = {width, height};
    }

    const targetPos = this.cache('target-bounds', () => {
      return this.getTargetBounds();
    });
    const targetSize = targetPos;

    // Get an actual px offset from the attachment
    let offset = offsetToPx(attachmentToOffset(this.attachment), {width, height});
    let targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

    const manualOffset = offsetToPx(this.offset, {width, height});
    const manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

    // Add the manually provided offset
    offset = addOffset(offset, manualOffset);
    targetOffset = addOffset(targetOffset, manualTargetOffset);

    // It's now our goal to make (element position + offset) == (target position + target offset)
    let left = targetPos.left + targetOffset.left - offset.left;
    let top = targetPos.top + targetOffset.top - offset.top;

    for (let i = 0; i < TetherBase.modules.length; ++i) {
      const module = TetherBase.modules[i];
      const ret = module.position.call(this, {
        left,
        top,
        targetAttachment,
        targetPos,
        elementPos,
        offset,
        targetOffset,
        manualOffset,
        manualTargetOffset,
        scrollbarSize,
        attachment: this.attachment
      });

      if (ret === false) {
        return false;
      } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
        continue;
      } else {
        ({top, left} = ret);
      }
    }

    // We describe the position three different ways to give the optimizer
    // a chance to decide the best possible way to position the element
    // with the fewest repaints.
    const next = {
      // It's position relative to the page (absolute positioning when
      // the element is a child of the body)
      page: {
        top: top,
        left: left
      },

      // It's position relative to the viewport (fixed positioning)
      viewport: {
        top: top - pageYOffset,
        bottom: pageYOffset - top - height + innerHeight,
        left: left - pageXOffset,
        right: pageXOffset - left - width + innerWidth
      }
    };

    let scrollbarSize;
    if (document.body.scrollWidth > window.innerWidth) {
      scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
      next.viewport.bottom -= scrollbarSize.height;
    }

    if (document.body.scrollHeight > window.innerHeight) {
      scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
      next.viewport.right -= scrollbarSize.width;
    }

    if (['', 'static'].indexOf(document.body.style.position) === -1 ||
        ['', 'static'].indexOf(document.body.parentElement.style.position) === -1) {
      // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
      next.page.bottom = document.body.scrollHeight - top - height;
      next.page.right = document.body.scrollWidth - left - width;
    }

    if (typeof this.options.optimizations !== 'undefined' &&
        this.options.optimizations.moveElement !== false &&
        !(typeof this.targetModifier !== 'undefined')) {
      const offsetParent = this.cache('target-offsetparent', () => getOffsetParent(this.target));
      const offsetPosition = this.cache('target-offsetparent-bounds', () => getBounds(offsetParent));
      const offsetParentStyle = getComputedStyle(offsetParent);
      const offsetParentSize = offsetPosition;

      const offsetBorder = {};
      ['Top', 'Left', 'Bottom', 'Right'].forEach(side => {
        offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle[`border${ side }Width`]);
      });

      offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
      offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

      if (next.page.top >= (offsetPosition.top + offsetBorder.top) && next.page.bottom >= offsetPosition.bottom) {
        if (next.page.left >= (offsetPosition.left + offsetBorder.left) && next.page.right >= offsetPosition.right) {
          // We're within the visible part of the target's scroll parent
          const scrollTop = offsetParent.scrollTop;
          const scrollLeft = offsetParent.scrollLeft;

          // It's position relative to the target's offset parent (absolute positioning when
          // the element is moved to be a child of the target's offset parent).
          next.offset = {
            top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
            left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
          };
        }
      }
    }


    // We could also travel up the DOM and try each containing context, rather than only
    // looking at the body, but we're gonna get diminishing returns.

    this.move(next);

    this.history.unshift(next);

    if (this.history.length > 3) {
      this.history.pop();
    }

    if (flushChanges) {
      flush();
    }

    return true;
  }

  // THE ISSUE
  move(pos) {
    if (!(typeof this.element.parentNode !== 'undefined')) {
      return;
    }

    const same = {};

    for (let type in pos) {
      same[type] = {};

      for (let key in pos[type]) {
        let found = false;

        for (let i = 0; i < this.history.length; ++i) {
          const point = this.history[i];
          if (typeof point[type] !== 'undefined' &&
              !within(point[type][key], pos[type][key])) {
            found = true;
            break;
          }

        }

        if (!found) {
          same[type][key] = true;
        }
      }
    }

    let css = {top: '', left: '', right: '', bottom: ''};

    const transcribe = (_same, _pos) => {
      const hasOptimizations = typeof this.options.optimizations !== 'undefined';
      const gpu = hasOptimizations ? this.options.optimizations.gpu : null;
      if (gpu !== false) {
        let yPos, xPos;
        if (_same.top) {
          css.top = 0;
          yPos = _pos.top;
        } else {
          css.bottom = 0;
          yPos = -_pos.bottom;
        }

        if (_same.left) {
          css.left = 0;
          xPos = _pos.left;
        } else {
          css.right = 0;
          xPos = -_pos.right;
        }

        css[transformKey] = `translateX(${ Math.round(xPos) }px) translateY(${ Math.round(yPos) }px)`;

        if (transformKey !== 'msTransform') {
          // The Z transform will keep this in the GPU (faster, and prevents artifacts),
          // but IE9 doesn't support 3d transforms and will choke.
          css[transformKey] += " translateZ(0)";
        }

      } else {
        if (_same.top) {
          css.top = `${ _pos.top }px`;
        } else {
          css.bottom = `${ _pos.bottom }px`;
        }

        if (_same.left) {
          css.left = `${ _pos.left }px`;
        } else {
          css.right = `${ _pos.right }px`;
        }
      }
    };

    let moved = false;
    if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
      css.position = 'absolute';
      transcribe(same.page, pos.page);

    } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
      css.position = 'fixed';
      transcribe(same.viewport, pos.viewport);

    } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
      css.position = 'absolute';
      const offsetParent = this.cache('target-offsetparent', () => getOffsetParent(this.target));

      if (getOffsetParent(this.element) !== offsetParent) {
        defer(() => {
          this.element.parentNode.removeChild(this.element);
          offsetParent.appendChild(this.element);
        });
      }

      transcribe(same.offset, pos.offset);
      moved = true;

    } else {
      css.position = 'absolute';
      transcribe({top: true, left: true}, pos.page);
    }

    if (!moved) {
      let offsetParentIsBody = true;
      let currentNode = this.element.parentNode;
      while (currentNode && currentNode.tagName !== 'BODY') {
        if (getComputedStyle(currentNode).position !== 'static') {
          offsetParentIsBody = false;
          break;
        }

        currentNode = currentNode.parentNode;
      }

      if (!offsetParentIsBody) {
        this.element.parentNode.removeChild(this.element);
        document.body.appendChild(this.element);
      }
    }

    // Any css change will trigger a repaint, so let's avoid one if nothing changed
    const writeCSS = {};
    let write = false;
    for (let key in css) {
      let val = css[key];
      let elVal = this.element.style[key];

      if (elVal !== '' && val !== '' && ['top', 'left', 'bottom', 'right'].indexOf(key) >= 0) {
        elVal = parseFloat(elVal);
        val = parseFloat(val);
      }

      if (elVal !== val) {
        write = true;
        writeCSS[key] = val;
      }
    }

    if (write) {
      defer(() => {
        extend(this.element.style, writeCSS);
      });
    }
  }
}

TetherClass.modules = [];

TetherBase.position = position;

let Tether = extend(TetherClass, TetherBase);
