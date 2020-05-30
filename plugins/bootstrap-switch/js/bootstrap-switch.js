/**
  * bootstrap-switch - Turn checkboxes and radio buttons into toggle switches.
  *
  * @version v3.4.0
  * @homepage https://bttstrp.github.io/bootstrap-switch
  * @author Mattia Larentis <mattia@larentis.eu> (http://larentis.eu)
  * @license MIT
  */

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jquery);
    global.bootstrapSwitch = mod.exports;
  }
})(this, function (_jquery) {
  'use strict';

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var $ = _jquery2.default || window.jQuery || window.$;

  function getClasses(options, id) {
    var state = options.state,
        size = options.size,
        disabled = options.disabled,
        readonly = options.readonly,
        indeterminate = options.indeterminate,
        inverse = options.inverse;

    return [state ? 'on' : 'off', size, disabled ? 'disabled' : undefined, readonly ? 'readonly' : undefined, indeterminate ? 'indeterminate' : undefined, inverse ? 'inverse' : undefined, id ? 'id-' + id : undefined].filter(function (v) {
      return v == null;
    });
  }

  function prvgetElementOptions() {
    return {
      state: this.$element.is(':checked'),
      size: this.$element.data('size'),
      animate: this.$element.data('animate'),
      disabled: this.$element.is(':disabled'),
      readonly: this.$element.is('[readonly]'),
      indeterminate: this.$element.data('indeterminate'),
      inverse: this.$element.data('inverse'),
      radioAllOff: this.$element.data('radio-all-off'),
      onColor: this.$element.data('on-color'),
      offColor: this.$element.data('off-color'),
      onText: this.$element.data('on-text'),
      offText: this.$element.data('off-text'),
      labelText: this.$element.data('label-text'),
      handleWidth: this.$element.data('handle-width'),
      labelWidth: this.$element.data('label-width'),
      baseClass: this.$element.data('base-class'),
      wrapperClass: this.$element.data('wrapper-class')
    };
  }

  function prvwidth() {
    var _this = this;

    var $handles = this.$on.add(this.$off).add(this.$label).css('width', '');
    var handleWidth = this.options.handleWidth === 'auto' ? Math.round(Math.max(this.$on.width(), this.$off.width())) : this.options.handleWidth;
    $handles.width(handleWidth);
    this.$label.width(function (index, width) {
      if (_this.options.labelWidth !== 'auto') {
        return _this.options.labelWidth;
      }
      if (width < handleWidth) {
        return handleWidth;
      }
      return width;
    });
    this.privateHandleWidth = this.$on.outerWidth();
    this.privateLabelWidth = this.$label.outerWidth();
    this.$container.width(this.privateHandleWidth * 2 + this.privateLabelWidth);
    return this.$wrapper.width(this.privateHandleWidth + this.privateLabelWidth);
  }

  function prvcontainerPosition() {
    var _this2 = this;

    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.ope;

    this.$container.css('margin-left', function () {
      var values = [0, '-' + _this2.privateHandleWidth + 'px'];
      if (_this2.options.indeterminate) {
        return '-' + _this2.privateHandleWidth / 2 + 'px';
      }
      if (state) {
        if (_this2.options.inverse) {
          return values[1];
        }
        return values[0];
      }
      if (_this2.options.inverse) {
        return values[0];
      }
      return values[1];
    });
  }

  function prvgetClass(name) {
    return this.options.baseClass + '-' + name;
  }

  function prvinit() {
    var _this3 = this;

    var init = function init() {
      _this3.setPrevOptions();
      prvwidth.call(_this3);
      prvcontainerPosition.call(_this3);
      setTimeout(function () {
        return _this3.options.animate && _this3.$wrapper.addClass(prvgetClass.call(_this3, 'animate'));
      }, 50);
    };
    if (this.$wrapper.is(':visible')) {
      init();
      return;
    }
    var initInterval = window.setInterval(function () {
      return _this3.$wrapper.is(':visible') && (init() || true) && window.clearInterval(initInterval);
    }, 50);
  }

  function prvelementHandlers() {
    var _this4 = this;

    return this.$element.on({
      'setPreviousOptions.bootstrapSwitch': function setPreviousOptionsBootstrapSwitch() {
        return _this4.setPrevOptions();
      },

      'previousState.bootstrapSwitch': function previousStateBootstrapSwitch() {
        _this4.options = _this4.prevOptions;
        if (_this4.options.indeterminate) {
          _this4.$wrapper.addClass(prvgetClass.call(_this4, 'indeterminate'));
        }
        _this4.$element.prop('checked', _this4.options.state).trigger('change.bootstrapSwitch', true);
      },

      'change.bootstrapSwitch': function changeBootstrapSwitch(event, skip) {
        event.preventDefault();
        event.stopImmediatePropagation();
        var state = _this4.$element.is(':checked');
        prvcontainerPosition.call(_this4, state);
        if (state === _this4.options.state) {
          return;
        }
        _this4.options.state = state;
        _this4.$wrapper.toggleClass(prvgetClass.call(_this4, 'off')).toggleClass(prvgetClass.call(_this4, 'on'));
        if (!skip) {
          if (_this4.$element.is(':radio')) {
            $('[name="' + _this4.$element.attr('name') + '"]').not(_this4.$element).prop('checked', false).trigger('change.bootstrapSwitch', true);
          }
          _this4.$element.trigger('switchChange.bootstrapSwitch', [state]);
        }
      },

      'focus.bootstrapSwitch': function focusBootstrapSwitch(event) {
        event.preventDefault();
        _this4.$wrapper.addClass(prvgetClass.call(_this4, 'focused'));
      },

      'blur.bootstrapSwitch': function blurBootstrapSwitch(event) {
        event.preventDefault();
        _this4.$wrapper.removeClass(prvgetClass.call(_this4, 'focused'));
      },

      'keydown.bootstrapSwitch': function keydownBootstrapSwitch(event) {
        if (!event.which || _this4.options.disabled || _this4.options.readonly) {
          return;
        }
        if (event.which === 37 || event.which === 39) {
          event.preventDefault();
          event.stopImmediatePropagation();
          _this4.state(event.which === 39);
        }
      }
    });
  }

  function prvhandleHandlers() {
    var _this5 = this;

    this.$on.on('click.bootstrapSwitch', function (event) {
      event.preventDefault();
      event.stopPropagation();
      _this5.state(false);
      return _this5.$element.trigger('focus.bootstrapSwitch');
    });
    return this.$off.on('click.bootstrapSwitch', function (event) {
      event.preventDefault();
      event.stopPropagation();
      _this5.state(true);
      return _this5.$element.trigger('focus.bootstrapSwitch');
    });
  }

  function prvlabelHandlers() {
    var _this6 = this;

    var dragStart = void 0;
    var dragEnd = void 0;
    var handlers = {
      click: function click(event) {
        event.stopPropagation();
      },


      'mousedown.bootstrapSwitch touchstart.bootstrapSwitch': function mousedownBootstrapSwitchTouchstartBootstrapSwitch(event) {
        if (dragStart || _this6.options.disabled || _this6.options.readonly) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        dragStart = (event.pageX || event.originalEvent.touches[0].pageX) - parseInt(_this6.$container.css('margin-left'), 10);
        if (_this6.options.animate) {
          _this6.$wrapper.removeClass(prvgetClass.call(_this6, 'animate'));
        }
        _this6.$element.trigger('focus.bootstrapSwitch');
      },

      'mousemove.bootstrapSwitch touchmove.bootstrapSwitch': function mousemoveBootstrapSwitchTouchmoveBootstrapSwitch(event) {
        if (dragStart == null) {
          return;
        }
        var difference = (event.pageX || event.originalEvent.touches[0].pageX) - dragStart;
        event.preventDefault();
        if (difference < -_this6.privateHandleWidth || difference > 0) {
          return;
        }
        dragEnd = difference;
        _this6.$container.css('margin-left', dragEnd + 'px');
      },

      'mouseup.bootstrapSwitch touchend.bootstrapSwitch': function mouseupBootstrapSwitchTouchendBootstrapSwitch(event) {
        if (!dragStart) {
          return;
        }
        event.preventDefault();
        if (_this6.options.animate) {
          _this6.$wrapper.addClass(prvgetClass.call(_this6, 'animate'));
        }
        if (dragEnd) {
          var state = dragEnd > -(_this6.privateHandleWidth / 2);
          dragEnd = false;
          _this6.state(_this6.options.inverse ? !state : state);
        } else {
          _this6.state(!_this6.options.state);
        }
        dragStart = false;
      },

      'mouseleave.bootstrapSwitch': function mouseleaveBootstrapSwitch() {
        _this6.$label.trigger('mouseup.bootstrapSwitch');
      }
    };
    this.$label.on(handlers);
  }

  function prvexternalLabelHandler() {
    var _this7 = this;

    var $externalLabel = this.$element.closest('label');
    $externalLabel.on('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.target === $externalLabel[0]) {
        _this7.toggleState();
      }
    });
  }

  function prvformHandler() {
    function isBootstrapSwitch() {
      return $(this).data('bootstrap-switch');
    }

    function performReset() {
      return $(this).bootstrapSwitch('state', this.checked);
    }

    var $form = this.$element.closest('form');
    if ($form.data('bootstrap-switch')) {
      return;
    }
    $form.on('reset.bootstrapSwitch', function () {
      window.setTimeout(function () {
        $form.find('input').filter(isBootstrapSwitch).each(performReset);
      }, 1);
    }).data('bootstrap-switch', true);
  }

  function prvgetClasses(classes) {
    var _this8 = this;

    if (!$.isArray(classes)) {
      return [prvgetClass.call(this, classes)];
    }
    return classes.map(function (v) {
      return prvgetClass.call(_this8, v);
    });
  }

  var BootstrapSwitch = function () {
    function BootstrapSwitch(element) {
      var _this9 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, BootstrapSwitch);

      this.$element = $(element);
      this.options = $.extend({}, $.fn.bootstrapSwitch.defaults, prvgetElementOptions.call(this), options);
      this.prevOptions = {};
      this.$wrapper = $('<div>', {
        class: function _class() {
          return getClasses(_this9.options, _this9.$element.attr('id')).map(function (v) {
            return prvgetClass.call(_this9, v);
          }).concat([_this9.options.baseClass], prvgetClasses.call(_this9, _this9.options.wrapperClass)).join(' ');
        }
      });
      this.$container = $('<div>', { class: prvgetClass.call(this, 'container') });
      this.$on = $('<span>', {
        html: this.options.onText,
        class: prvgetClass.call(this, 'handle-on') + ' ' + prvgetClass.call(this, this.options.onColor)
      });
      this.$off = $('<span>', {
        html: this.options.offText,
        class: prvgetClass.call(this, 'handle-off') + ' ' + prvgetClass.call(this, this.options.offColor)
      });
      this.$label = $('<span>', {
        html: this.options.labelText,
        class: prvgetClass.call(this, 'label')
      });

      this.$element.on('init.bootstrapSwitch', function () {
        return _this9.options.onInit(element);
      });
      this.$element.on('switchChange.bootstrapSwitch', function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var changeState = _this9.options.onSwitchChange.apply(element, args);
        if (changeState === false) {
          if (_this9.$element.is(':radio')) {
            $('[name="' + _this9.$element.attr('name') + '"]').trigger('previousState.bootstrapSwitch', true);
          } else {
            _this9.$element.trigger('previousState.bootstrapSwitch', true);
          }
        }
      });

      this.$container = this.$element.wrap(this.$container).parent();
      this.$wrapper = this.$container.wrap(this.$wrapper).parent();
      this.$element.before(this.options.inverse ? this.$off : this.$on).before(this.$label).before(this.options.inverse ? this.$on : this.$off);

      if (this.options.indeterminate) {
        this.$element.prop('indeterminate', true);
      }

      prvinit.call(this);
      prvelementHandlers.call(this);
      prvhandleHandlers.call(this);
      prvlabelHandlers.call(this);
      prvformHandler.call(this);
      prvexternalLabelHandler.call(this);
      this.$element.trigger('init.bootstrapSwitch', this.options.state);
    }

    _createClass(BootstrapSwitch, [{
      key: 'setPrevOptions',
      value: function setPrevOptions() {
        this.prevOptions = _extends({}, this.options);
      }
    }, {
      key: 'state',
      value: function state(value, skip) {
        if (typeof value === 'undefined') {
          return this.options.state;
        }
        if (this.options.disabled || this.options.readonly || this.options.state && !this.options.radioAllOff && this.$element.is(':radio')) {
          return this.$element;
        }
        if (this.$element.is(':radio')) {
          $('[name="' + this.$element.attr('name') + '"]').trigger('setPreviousOptions.bootstrapSwitch');
        } else {
          this.$element.trigger('setPreviousOptions.bootstrapSwitch');
        }
        if (this.options.indeterminate) {
          this.indeterminate(false);
        }
        this.$element.prop('checked', Boolean(value)).trigger('change.bootstrapSwitch', skip);
        return this.$element;
      }
    }, {
      key: 'toggleState',
      value: function toggleState(skip) {
        if (this.options.disabled || this.options.readonly) {
          return this.$element;
        }
        if (this.options.indeterminate) {
          this.indeterminate(false);
          return this.state(true);
        }
        return this.$element.prop('checked', !this.options.state).trigger('change.bootstrapSwitch', skip);
      }
    }, {
      key: 'size',
      value: function size(value) {
        if (typeof value === 'undefined') {
          return this.options.size;
        }
        if (this.options.size != null) {
          this.$wrapper.removeClass(prvgetClass.call(this, this.options.size));
        }
        if (value) {
          this.$wrapper.addClass(prvgetClass.call(this, value));
        }
        prvwidth.call(this);
        prvcontainerPosition.call(this);
        this.options.size = value;
        return this.$element;
      }
    }, {
      key: 'animate',
      value: function animate(value) {
        if (typeof value === 'undefined') {
          return this.options.animate;
        }
        if (this.options.animate === Boolean(value)) {
          return this.$element;
        }
        return this.toggleAnimate();
      }
    }, {
      key: 'toggleAnimate',
      value: function toggleAnimate() {
        this.options.animate = !this.options.animate;
        this.$wrapper.toggleClass(prvgetClass.call(this, 'animate'));
        return this.$element;
      }
    }, {
      key: 'disabled',
      value: function disabled(value) {
        if (typeof value === 'undefined') {
          return this.options.disabled;
        }
        if (this.options.disabled === Boolean(value)) {
          return this.$element;
        }
        return this.toggleDisabled();
      }
    }, {
      key: 'toggleDisabled',
      value: function toggleDisabled() {
        this.options.disabled = !this.options.disabled;
        this.$element.prop('disabled', this.options.disabled);
        this.$wrapper.toggleClass(prvgetClass.call(this, 'disabled'));
        return this.$element;
      }
    }, {
      key: 'readonly',
      value: function readonly(value) {
        if (typeof value === 'undefined') {
          return this.options.readonly;
        }
        if (this.options.readonly === Boolean(value)) {
          return this.$element;
        }
        return this.toggleReadonly();
      }
    }, {
      key: 'toggleReadonly',
      value: function toggleReadonly() {
        this.options.readonly = !this.options.readonly;
        this.$element.prop('readonly', this.options.readonly);
        this.$wrapper.toggleClass(prvgetClass.call(this, 'readonly'));
        return this.$element;
      }
    }, {
      key: 'indeterminate',
      value: function indeterminate(value) {
        if (typeof value === 'undefined') {
          return this.options.indeterminate;
        }
        if (this.options.indeterminate === Boolean(value)) {
          return this.$element;
        }
        return this.toggleIndeterminate();
      }
    }, {
      key: 'toggleIndeterminate',
      value: function toggleIndeterminate() {
        this.options.indeterminate = !this.options.indeterminate;
        this.$element.prop('indeterminate', this.options.indeterminate);
        this.$wrapper.toggleClass(prvgetClass.call(this, 'indeterminate'));
        prvcontainerPosition.call(this);
        return this.$element;
      }
    }, {
      key: 'inverse',
      value: function inverse(value) {
        if (typeof value === 'undefined') {
          return this.options.inverse;
        }
        if (this.options.inverse === Boolean(value)) {
          return this.$element;
        }
        return this.toggleInverse();
      }
    }, {
      key: 'toggleInverse',
      value: function toggleInverse() {
        this.$wrapper.toggleClass(prvgetClass.call(this, 'inverse'));
        var $on = this.$on.clone(true);
        var $off = this.$off.clone(true);
        this.$on.replaceWith($off);
        this.$off.replaceWith($on);
        this.$on = $off;
        this.$off = $on;
        this.options.inverse = !this.options.inverse;
        return this.$element;
      }
    }, {
      key: 'onColor',
      value: function onColor(value) {
        if (typeof value === 'undefined') {
          return this.options.onColor;
        }
        if (this.options.onColor) {
          this.$on.removeClass(prvgetClass.call(this, this.options.onColor));
        }
        this.$on.addClass(prvgetClass.call(this, value));
        this.options.onColor = value;
        return this.$element;
      }
    }, {
      key: 'offColor',
      value: function offColor(value) {
        if (typeof value === 'undefined') {
          return this.options.offColor;
        }
        if (this.options.offColor) {
          this.$off.removeClass(prvgetClass.call(this, this.options.offColor));
        }
        this.$off.addClass(prvgetClass.call(this, value));
        this.options.offColor = value;
        return this.$element;
      }
    }, {
      key: 'onText',
      value: function onText(value) {
        if (typeof value === 'undefined') {
          return this.options.onText;
        }
        this.$on.html(value);
        prvwidth.call(this);
        prvcontainerPosition.call(this);
        this.options.onText = value;
        return this.$element;
      }
    }, {
      key: 'offText',
      value: function offText(value) {
        if (typeof value === 'undefined') {
          return this.options.offText;
        }
        this.$off.html(value);
        prvwidth.call(this);
        prvcontainerPosition.call(this);
        this.options.offText = value;
        return this.$element;
      }
    }, {
      key: 'labelText',
      value: function labelText(value) {
        if (typeof value === 'undefined') {
          return this.options.labelText;
        }
        this.$label.html(value);
        prvwidth.call(this);
        this.options.labelText = value;
        return this.$element;
      }
    }, {
      key: 'handleWidth',
      value: function handleWidth(value) {
        if (typeof value === 'undefined') {
          return this.options.handleWidth;
        }
        this.options.handleWidth = value;
        prvwidth.call(this);
        prvcontainerPosition.call(this);
        return this.$element;
      }
    }, {
      key: 'labelWidth',
      value: function labelWidth(value) {
        if (typeof value === 'undefined') {
          return this.options.labelWidth;
        }
        this.options.labelWidth = value;
        prvwidth.call(this);
        prvcontainerPosition.call(this);
        return this.$element;
      }
    }, {
      key: 'baseClass',
      value: function baseClass() {
        return this.options.baseClass;
      }
    }, {
      key: 'wrapperClass',
      value: function wrapperClass(value) {
        if (typeof value === 'undefined') {
          return this.options.wrapperClass;
        }
        var wrapperClass = value || $.fn.bootstrapSwitch.defaults.wrapperClass;
        this.$wrapper.removeClass(prvgetClasses.call(this, this.options.wrapperClass).join(' '));
        this.$wrapper.addClass(prvgetClasses.call(this, wrapperClass).join(' '));
        this.options.wrapperClass = wrapperClass;
        return this.$element;
      }
    }, {
      key: 'radioAllOff',
      value: function radioAllOff(value) {
        if (typeof value === 'undefined') {
          return this.options.radioAllOff;
        }
        var val = Boolean(value);
        if (this.options.radioAllOff === val) {
          return this.$element;
        }
        this.options.radioAllOff = val;
        return this.$element;
      }
    }, {
      key: 'onInit',
      value: function onInit(value) {
        if (typeof value === 'undefined') {
          return this.options.onInit;
        }
        this.options.onInit = value || $.fn.bootstrapSwitch.defaults.onInit;
        return this.$element;
      }
    }, {
      key: 'onSwitchChange',
      value: function onSwitchChange(value) {
        if (typeof value === 'undefined') {
          return this.options.onSwitchChange;
        }
        this.options.onSwitchChange = value || $.fn.bootstrapSwitch.defaults.onSwitchChange;
        return this.$element;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var $form = this.$element.closest('form');
        if ($form.length) {
          $form.off('reset.bootstrapSwitch').removeData('bootstrap-switch');
        }
        this.$container.children().not(this.$element).remove();
        this.$element.unwrap().unwrap().off('.bootstrapSwitch').removeData('bootstrap-switch');
        return this.$element;
      }
    }]);

    return BootstrapSwitch;
  }();

  function bootstrapSwitch(option) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    function reducer(ret, next) {
      var $this = $(next);
      var existingData = $this.data('bootstrap-switch');
      var data = existingData || new BootstrapSwitch(next, option);
      if (!existingData) {
        $this.data('bootstrap-switch', data);
      }
      if (typeof option === 'string') {
        return data[option].apply(data, args);
      }
      return ret;
    }
    return Array.prototype.reduce.call(this, reducer, this);
  }

  $.fn.bootstrapSwitch = bootstrapSwitch;
  $.fn.bootstrapSwitch.Constructor = BootstrapSwitch;
  $.fn.bootstrapSwitch.defaults = {
    state: true,
    size: null,
    animate: true,
    disabled: false,
    readonly: false,
    indeterminate: false,
    inverse: false,
    radioAllOff: false,
    onColor: 'primary',
    offColor: 'default',
    onText: 'ON',
    offText: 'OFF',
    labelText: '&nbsp',
    handleWidth: 'auto',
    labelWidth: 'auto',
    baseClass: 'bootstrap-switch',
    wrapperClass: 'wrapper',
    onInit: function onInit() {},
    onSwitchChange: function onSwitchChange() {}
  };
});
