(function() {
  var Evented, MIRROR_ATTACH, addClass, allDrops, clickEvent, createContext, extend, hasClass, removeClass, sortAttach, touchDevice, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = Tether.Utils, extend = _ref.extend, addClass = _ref.addClass, removeClass = _ref.removeClass, hasClass = _ref.hasClass, Evented = _ref.Evented;

  touchDevice = 'ontouchstart' in document.documentElement;

  clickEvent = touchDevice ? 'touchstart' : 'click';

  sortAttach = function(str) {
    var first, second, _ref1, _ref2;
    _ref1 = str.split(' '), first = _ref1[0], second = _ref1[1];
    if (first === 'left' || first === 'right') {
      _ref2 = [second, first], first = _ref2[0], second = _ref2[1];
    }
    return [first, second].join(' ');
  };

  MIRROR_ATTACH = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top',
    middle: 'middle',
    center: 'center'
  };

  allDrops = {};

  createContext = function(options) {
    var DropInstance, defaultOptions, drop, _name;
    if (options == null) {
      options = {};
    }
    drop = function() {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(DropInstance, arguments, function(){});
    };
    extend(drop, {
      createContext: createContext,
      drops: [],
      defaults: {}
    });
    defaultOptions = {
      classPrefix: 'drop',
      defaults: {
        attach: 'bottom left',
        openOn: 'click',
        constrainToScrollParent: true,
        constrainToWindow: true,
        classes: '',
        tetherOptions: {}
      }
    };
    extend(drop, defaultOptions, options);
    extend(drop.defaults, defaultOptions.defaults, options.defaults);
    if (allDrops[_name = drop.classPrefix] == null) {
      allDrops[_name] = [];
    }
    drop.updateBodyClasses = function() {
      var anyOpen, _drop, _i, _len, _ref1;
      anyOpen = false;
      _ref1 = allDrops[drop.classPrefix];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        _drop = _ref1[_i];
        if (!(_drop.isOpened())) {
          continue;
        }
        anyOpen = true;
        break;
      }
      if (anyOpen) {
        return addClass(document.body, "" + drop.classPrefix + "-open");
      } else {
        return removeClass(document.body, "" + drop.classPrefix + "-open");
      }
    };
    DropInstance = (function(_super) {
      __extends(DropInstance, _super);

      function DropInstance(options) {
        this.options = options;
        this.options = extend({}, drop.defaults, this.options);
        this.target = this.options.target;
        if (this.target == null) {
          throw new Error('Drop Error: You must provide a target.');
        }
        drop.drops.push(this);
        allDrops[drop.classPrefix].push(this);
        this.setupElements();
        this.setupEvents();
        this.setupTether();
      }

      DropInstance.prototype.setupElements = function() {
        this.drop = document.createElement('div');
        addClass(this.drop, drop.classPrefix);
        if (this.options.classes) {
          addClass(this.drop, this.options.classes);
        }
        this.dropContent = document.createElement('div');
        addClass(this.dropContent, "" + drop.classPrefix + "-content");
        if (typeof this.options.content === 'object') {
          this.dropContent.appendChild(this.options.content);
        } else {
          this.dropContent.innerHTML = this.options.content;
        }
        return this.drop.appendChild(this.dropContent);
      };

      DropInstance.prototype.setupTether = function() {
        var constraints, dropAttach;
        dropAttach = this.options.position.split(' ');
        dropAttach[0] = MIRROR_ATTACH[dropAttach[0]];
        dropAttach = dropAttach.join(' ');
        constraints = [];
        if (this.options.constrainToScrollParent) {
          constraints.push({
            to: 'scrollParent',
            pin: 'top, bottom',
            attachment: 'together none'
          });
        }
        if (this.options.constrainToWindow !== false) {
          constraints.push({
            to: 'window',
            pin: true,
            attachment: 'together'
          });
        }
        constraints.push({
          to: 'scrollParent'
        });
        options = {
          element: this.drop,
          target: this.target,
          attachment: sortAttach(dropAttach),
          targetAttachment: sortAttach(this.options.position),
          classPrefix: drop.classPrefix,
          offset: '0 0',
          targetOffset: '0 0',
          enabled: false,
          constraints: constraints
        };
        if (this.options.tether !== false) {
          return this.tether = new Tether(extend({}, options, this.options.tether));
        }
      };

      DropInstance.prototype.setupEvents = function() {
        var events,
          _this = this;
        if (!this.options.openOn) {
          return;
        }
        events = this.options.openOn.split(' ');
        if (__indexOf.call(events, 'click') >= 0) {
          this.target.addEventListener(clickEvent, function() {
            return _this.toggle();
          });
          document.addEventListener(clickEvent, function(event) {
            if (!_this.isOpened()) {
              return;
            }
            if (event.target === _this.drop || _this.drop.contains(event.target)) {
              return;
            }
            if (event.target === _this.target || _this.target.contains(event.target)) {
              return;
            }
            return _this.close();
          });
        }
        if (__indexOf.call(events, 'hover') >= 0) {
          this.target.addEventListener('mouseover', function() {
            return _this.open();
          });
          return this.target.addEventListener('mouseout', function() {
            return _this.close();
          });
        }
      };

      DropInstance.prototype.isOpened = function() {
        return hasClass(this.drop, "" + drop.classPrefix + "-open");
      };

      DropInstance.prototype.toggle = function() {
        if (this.isOpened()) {
          return this.close();
        } else {
          return this.open();
        }
      };

      DropInstance.prototype.open = function() {
        var _ref1;
        if (!this.drop.parentNode) {
          document.body.appendChild(this.drop);
        }
        addClass(this.target, "" + drop.classPrefix + "-open");
        addClass(this.drop, "" + drop.classPrefix + "-open");
        if ((_ref1 = this.tether) != null) {
          _ref1.enable();
        }
        this.trigger('open');
        return drop.updateBodyClasses();
      };

      DropInstance.prototype.close = function() {
        var _ref1;
        removeClass(this.target, "" + drop.classPrefix + "-open");
        removeClass(this.drop, "" + drop.classPrefix + "-open");
        this.trigger('close');
        if ((_ref1 = this.tether) != null) {
          _ref1.disable();
        }
        return drop.updateBodyClasses();
      };

      return DropInstance;

    })(Evented);
    return drop;
  };

  window.Drop = createContext();

  document.addEventListener('DOMContentLoaded', function() {
    return Drop.updateBodyClasses();
  });

}).call(this);