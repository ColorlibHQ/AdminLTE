let TetherBase;
if (typeof TetherBase === 'undefined') {
  TetherBase = {modules: []};
}

function getScrollParent(el) {
  const {position} = getComputedStyle(el);

  if (position === 'fixed') {
    return el;
  }

  let parent = el;
  while (parent = parent.parentNode) {
    let style;
    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      return parent;
    }

    const {overflow, overflowX, overflowY} = style;
    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        return parent;
      }
    }
  }

  return document.body;
}

const uniqueId = (() => {
  let id = 0;
  return () => ++id;
})();

const zeroPosCache = {};
const getOrigin = (doc) => {
  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
  // jitter as the user scrolls that messes with our ability to detect if two positions
  // are equivilant or not.  We place an element at the top left of the page that will
  // get the same jitter, so we can cancel the two out.
  let node = doc._tetherZeroElement;
  if (typeof node === 'undefined') {
    node = doc.createElement('div');
    node.setAttribute('data-tether-id', uniqueId());
    extend(node.style, {
      top: 0,
      left: 0,
      position: 'absolute'
    });

    doc.body.appendChild(node);

    doc._tetherZeroElement = node;
  }

  const id = node.getAttribute('data-tether-id');
  if (typeof zeroPosCache[id] === 'undefined') {
    zeroPosCache[id] = {};

    const rect = node.getBoundingClientRect();
    for (let k in rect) {
      // Can't use extend, as on IE9, elements don't resolve to be hasOwnProperty
      zeroPosCache[id][k] = rect[k];
    }

    // Clear the cache when this position call is done
    defer(() => {
      delete zeroPosCache[id];
    });
  }

  return zeroPosCache[id];
};

function getBounds(el) {
  let doc;
  if (el === document) {
    doc = document;
    el = document.documentElement;
  } else {
    doc = el.ownerDocument;
  }

  const docEl = doc.documentElement;

  const box = {};
  // The original object returned by getBoundingClientRect is immutable, so we clone it
  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
  const rect = el.getBoundingClientRect();
  for (let k in rect) {
    box[k] = rect[k];
  }

  const origin = getOrigin(doc);

  box.top -= origin.top;
  box.left -= origin.left;

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }
  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top = box.top - docEl.clientTop;
  box.left = box.left - docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  return box;
}

function getOffsetParent(el) {
  return el.offsetParent || document.documentElement;
}

function getScrollBarSize() {
  const inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  const outer = document.createElement('div');
  extend(outer.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  const widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  const width = widthContained - widthScroll;

  return {width, height: width};
}

function extend(out={}) {
  const args = [];

  Array.prototype.push.apply(args, arguments);

  args.slice(1).forEach(obj => {
    if (obj) {
      for (let key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) {
          out[key] = obj[key];
        }
      }
    }
  });

  return out;
}

function removeClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(cls => {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  } else {
    const regex = new RegExp(`(^| )${ name.split(' ').join('|') }( |$)`, 'gi');
    const className = getClassName(el).replace(regex, ' ');
    setClassName(el, className);
  }
}

function addClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(cls => {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  } else {
    removeClass(el, name);
    const cls = getClassName(el) + ` ${name}`;
    setClassName(el, cls);
  }
}

function hasClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    return el.classList.contains(name);
  }
  const className = getClassName(el);
  return new RegExp(`(^| )${ name }( |$)`, 'gi').test(className);
}

function getClassName(el) {
  if (el.className instanceof SVGAnimatedString) {
    return el.className.baseVal;
  }
  return el.className;
}

function setClassName(el, className) {
  el.setAttribute('class', className);
}


function updateClasses(el, add, all) {
  // Of the set of 'all' classes, we need the 'add' classes, and only the
  // 'add' classes to be set.
  all.forEach(cls => {
    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
      removeClass(el, cls);
    }
  });

  add.forEach(cls => {
    if (!hasClass(el, cls)) {
      addClass(el, cls);
    }
  });
}

const deferred = [];

const defer = (fn) => {
  deferred.push(fn);
};

const flush = () => {
  let fn;
  while(fn = deferred.pop()) {
    fn();
  }
};

class Evented {
  on(event, handler, ctx, once=false) {
    if (typeof this.bindings === 'undefined') {
      this.bindings = {};
    }
    if (typeof this.bindings[event] === 'undefined') {
      this.bindings[event] = [];
    }
    this.bindings[event].push({handler, ctx, once});
  }

  once(event, handler, ctx) {
    this.on(event, handler, ctx, true);
  }

  off(event, handler) {
    if (typeof this.bindings !== 'undefined' &&
        typeof this.bindings[event] !== 'undefined') {
      return;
    }

    if (typeof handler === 'undefined') {
      delete this.bindings[event];
    } else {
      let i = 0;
      while (i < this.bindings[event].length) {
        if (this.bindings[event][i].handler === handler) {
          this.bindings[event].splice(i, 1);
        } else {
          ++i;
        }
      }
    }
  }

  trigger(event, ...args) {
    if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
      let i = 0;
      while (i < this.bindings[event].length) {
        const {handler, ctx, once} = this.bindings[event][i];

        let context = ctx;
        if (typeof context === 'undefined') {
          context = this;
        }

        handler.apply(context, args);

        if (once) {
          this.bindings[event].splice(i, 1);
        } else {
          ++i;
        }
      }
    }
  }
}

TetherBase.Utils = {
  getScrollParent,
  getBounds,
  getOffsetParent,
  extend,
  addClass,
  removeClass,
  hasClass,
  updateClasses,
  defer,
  flush,
  uniqueId,
  Evented,
  getScrollBarSize
};
