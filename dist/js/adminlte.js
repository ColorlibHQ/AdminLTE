/*!
 * AdminLTE v3.0.0-alpha.2 (https://adminlte.io)
 * Copyright 2014-2018 Abdullah Almsaeed <abdullah@almsaeedstudio.com>
 * Licensed under MIT (https://github.com/almasaeed2010/AdminLTE/blob/master/LICENSE)
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.adminlte = {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/**
 * --------------------------------------------
 * AdminLTE ControlSidebar.js
 * License MIT
 * --------------------------------------------
 */

var ControlSidebar = function ($) {
  /**
   * Constants
   * ====================================================
   */

  var NAME = 'ControlSidebar';
  var DATA_KEY = 'lte.control.sidebar';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    CONTROL_SIDEBAR: '.control-sidebar',
    DATA_TOGGLE: '[data-widget="control-sidebar"]',
    MAIN_HEADER: '.main-header'
  };

  var ClassName = {
    CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',
    CONTROL_SIDEBAR_SLIDE: 'control-sidebar-slide-open'
  };

  var Default = {
    slide: true

    /**
     * Class Definition
     * ====================================================
     */

  };
  var ControlSidebar = function () {
    function ControlSidebar(element, config) {
      classCallCheck(this, ControlSidebar);

      this._element = element;
      this._config = this._getConfig(config);
    }

    // Public

    ControlSidebar.prototype.show = function show() {
      // Show the control sidebar
      if (this._config.slide) {
        $('body').removeClass(ClassName.CONTROL_SIDEBAR_SLIDE);
      } else {
        $('body').removeClass(ClassName.CONTROL_SIDEBAR_OPEN);
      }
    };

    ControlSidebar.prototype.collapse = function collapse() {
      // Collapse the control sidebar
      if (this._config.slide) {
        $('body').addClass(ClassName.CONTROL_SIDEBAR_SLIDE);
      } else {
        $('body').addClass(ClassName.CONTROL_SIDEBAR_OPEN);
      }
    };

    ControlSidebar.prototype.toggle = function toggle() {
      this._setMargin();

      var shouldOpen = $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE);
      if (shouldOpen) {
        // Open the control sidebar
        this.show();
      } else {
        // Close the control sidebar
        this.collapse();
      }
    };

    // Private

    ControlSidebar.prototype._getConfig = function _getConfig(config) {
      return $.extend({}, Default, config);
    };

    ControlSidebar.prototype._setMargin = function _setMargin() {
      $(Selector.CONTROL_SIDEBAR).css({
        top: $(Selector.MAIN_HEADER).outerHeight()
      });
    };

    // Static

    ControlSidebar._jQueryInterface = function _jQueryInterface(operation) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new ControlSidebar(this, $(this).data());
          $(this).data(DATA_KEY, data);
        }

        if (data[operation] === 'undefined') {
          throw new Error(operation + ' is not a function');
        }

        data[operation]();
      });
    };

    return ControlSidebar;
  }();

  /**
   *
   * Data Api implementation
   * ====================================================
   */


  $(document).on('click', Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    ControlSidebar._jQueryInterface.call($(this), 'toggle');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = ControlSidebar._jQueryInterface;
  $.fn[NAME].Constructor = ControlSidebar;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ControlSidebar._jQueryInterface;
  };

  return ControlSidebar;
}(jQuery);

/**
 * --------------------------------------------
 * AdminLTE Layout.js
 * License MIT
 * --------------------------------------------
 */

var Layout = function ($) {
  /**
   * Constants
   * ====================================================
   */

  var NAME = 'Layout';
  var DATA_KEY = 'lte.layout';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Selector = {
    SIDEBAR: '.main-sidebar',
    HEADER: '.main-header',
    CONTENT: '.content-wrapper',
    CONTENT_HEADER: '.content-header',
    WRAPPER: '.wrapper',
    CONTROL_SIDEBAR: '.control-sidebar',
    LAYOUT_FIXED: '.layout-fixed',
    FOOTER: '.main-footer'
  };

  var ClassName = {
    HOLD: 'hold-transition',
    SIDEBAR: 'main-sidebar',
    LAYOUT_FIXED: 'layout-fixed'

    /**
     * Class Definition
     * ====================================================
     */

  };
  var Layout = function () {
    function Layout(element) {
      classCallCheck(this, Layout);

      this._element = element;

      this._init();
    }

    // Public

    Layout.prototype.fixLayoutHeight = function fixLayoutHeight() {
      var heights = {
        window: $(window).height(),
        header: $(Selector.HEADER).outerHeight(),
        footer: $(Selector.FOOTER).outerHeight(),
        sidebar: $(Selector.SIDEBAR).height()
      };
      var max = this._max(heights);

      $(Selector.CONTENT).css('min-height', max - heights.header);
      $(Selector.SIDEBAR).css('min-height', max - heights.header);
    };

    // Private

    Layout.prototype._init = function _init() {
      var _this = this;

      // Enable transitions
      $('body').removeClass(ClassName.HOLD);

      // Activate layout height watcher
      this.fixLayoutHeight();
      $(Selector.SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview collapsed.lte.pushmenu expanded.lte.pushmenu', function () {
        _this.fixLayoutHeight();
      });

      $(window).resize(function () {
        _this.fixLayoutHeight();
      });

      $('body, html').css('height', 'auto');
    };

    Layout.prototype._max = function _max(numbers) {
      // Calculate the maximum number in a list
      var max = 0;

      Object.keys(numbers).forEach(function (key) {
        if (numbers[key] > max) {
          max = numbers[key];
        }
      });

      return max;
    };

    // Static

    Layout._jQueryInterface = function _jQueryInterface(operation) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Layout(this);
          $(this).data(DATA_KEY, data);
        }

        if (operation) {
          data[operation]();
        }
      });
    };

    return Layout;
  }();

  /**
   * Data API
   * ====================================================
   */


  $(window).on('load', function () {
    Layout._jQueryInterface.call($('body'));
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Layout._jQueryInterface;
  $.fn[NAME].Constructor = Layout;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Layout._jQueryInterface;
  };

  return Layout;
}(jQuery);

/**
 * --------------------------------------------
 * AdminLTE PushMenu.js
 * License MIT
 * --------------------------------------------
 */

var PushMenu = function ($) {
  /**
   * Constants
   * ====================================================
   */

  var NAME = 'PushMenu';
  var DATA_KEY = 'lte.pushmenu';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    COLLAPSED: 'collapsed' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY
  };

  var Default = {
    screenCollapseSize: 768
  };

  var Selector = {
    TOGGLE_BUTTON: '[data-widget="pushmenu"]',
    SIDEBAR_MINI: '.sidebar-mini',
    SIDEBAR_COLLAPSED: '.sidebar-collapse',
    BODY: 'body',
    OVERLAY: '#sidebar-overlay',
    WRAPPER: '.wrapper'
  };

  var ClassName = {
    SIDEBAR_OPEN: 'sidebar-open',
    COLLAPSED: 'sidebar-collapse',
    OPEN: 'sidebar-open',
    SIDEBAR_MINI: 'sidebar-mini'

    /**
     * Class Definition
     * ====================================================
     */

  };
  var PushMenu = function () {
    function PushMenu(element, options) {
      classCallCheck(this, PushMenu);

      this._element = element;
      this._options = $.extend({}, Default, options);

      if (!$(Selector.OVERLAY).length) {
        this._addOverlay();
      }
    }

    // Public

    PushMenu.prototype.show = function show() {
      $(Selector.BODY).addClass(ClassName.OPEN).removeClass(ClassName.COLLAPSED);

      var shownEvent = $.Event(Event.SHOWN);
      $(this._element).trigger(shownEvent);
    };

    PushMenu.prototype.collapse = function collapse() {
      $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.COLLAPSED);

      var collapsedEvent = $.Event(Event.COLLAPSED);
      $(this._element).trigger(collapsedEvent);
    };

    PushMenu.prototype.toggle = function toggle() {
      var isShown = void 0;
      if ($(window).width() >= this._options.screenCollapseSize) {
        isShown = !$(Selector.BODY).hasClass(ClassName.COLLAPSED);
      } else {
        isShown = $(Selector.BODY).hasClass(ClassName.OPEN);
      }

      if (isShown) {
        this.collapse();
      } else {
        this.show();
      }
    };

    // Private


    PushMenu.prototype._addOverlay = function _addOverlay() {
      var _this = this;

      var overlay = $('<div />', {
        id: 'sidebar-overlay'
      });

      overlay.on('click', function () {
        _this.collapse();
      });

      $(Selector.WRAPPER).append(overlay);
    };

    // Static

    PushMenu._jQueryInterface = function _jQueryInterface(operation) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new PushMenu(this);
          $(this).data(DATA_KEY, data);
        }

        if (operation) {
          data[operation]();
        }
      });
    };

    return PushMenu;
  }();

  /**
   * Data API
   * ====================================================
   */

  $(document).on('click', Selector.TOGGLE_BUTTON, function (event) {
    event.preventDefault();

    var button = event.currentTarget;

    if ($(button).data('widget') !== 'pushmenu') {
      button = $(button).closest(Selector.TOGGLE_BUTTON);
    }

    PushMenu._jQueryInterface.call($(button), 'toggle');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = PushMenu._jQueryInterface;
  $.fn[NAME].Constructor = PushMenu;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return PushMenu._jQueryInterface;
  };

  return PushMenu;
}(jQuery);

/**
 * --------------------------------------------
 * AdminLTE Treeview.js
 * License MIT
 * --------------------------------------------
 */

var Treeview = function ($) {
  /**
   * Constants
   * ====================================================
   */

  var NAME = 'Treeview';
  var DATA_KEY = 'lte.treeview';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    SELECTED: 'selected' + EVENT_KEY,
    EXPANDED: 'expanded' + EVENT_KEY,
    COLLAPSED: 'collapsed' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY
  };

  var Selector = {
    LI: '.nav-item',
    LINK: '.nav-link',
    TREEVIEW_MENU: '.nav-treeview',
    OPEN: '.menu-open',
    DATA_WIDGET: '[data-widget="treeview"]'
  };

  var ClassName = {
    LI: 'nav-item',
    LINK: 'nav-link',
    TREEVIEW_MENU: 'nav-treeview',
    OPEN: 'menu-open'
  };

  var Default = {
    trigger: Selector.DATA_WIDGET + ' ' + Selector.LINK,
    animationSpeed: 300,
    accordion: true

    /**
     * Class Definition
     * ====================================================
     */
  };
  var Treeview = function () {
    function Treeview(element, config) {
      classCallCheck(this, Treeview);

      this._config = config;
      this._element = element;
    }

    // Public

    Treeview.prototype.init = function init() {
      this._setupListeners();
    };

    Treeview.prototype.expand = function expand(treeviewMenu, parentLi) {
      var _this = this;

      var expandedEvent = $.Event(Event.EXPANDED);

      if (this._config.accordion) {
        var openMenuLi = parentLi.siblings(Selector.OPEN).first();
        var openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first();
        this.collapse(openTreeview, openMenuLi);
      }

      treeviewMenu.slideDown(this._config.animationSpeed, function () {
        parentLi.addClass(ClassName.OPEN);
        $(_this._element).trigger(expandedEvent);
      });
    };

    Treeview.prototype.collapse = function collapse(treeviewMenu, parentLi) {
      var _this2 = this;

      var collapsedEvent = $.Event(Event.COLLAPSED);

      treeviewMenu.slideUp(this._config.animationSpeed, function () {
        parentLi.removeClass(ClassName.OPEN);
        $(_this2._element).trigger(collapsedEvent);
        treeviewMenu.find(Selector.OPEN + ' > ' + Selector.TREEVIEW_MENU).slideUp();
        treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN);
      });
    };

    Treeview.prototype.toggle = function toggle(event) {
      var $relativeTarget = $(event.currentTarget);
      var treeviewMenu = $relativeTarget.next();

      if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
        return;
      }

      event.preventDefault();

      var parentLi = $relativeTarget.parents(Selector.LI).first();
      var isOpen = parentLi.hasClass(ClassName.OPEN);

      if (isOpen) {
        this.collapse($(treeviewMenu), parentLi);
      } else {
        this.expand($(treeviewMenu), parentLi);
      }
    };

    // Private

    Treeview.prototype._setupListeners = function _setupListeners() {
      var _this3 = this;

      $(document).on('click', this._config.trigger, function (event) {
        _this3.toggle(event);
      });
    };

    // Static

    Treeview._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if (!data) {
          data = new Treeview($(this), _config);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'init') {
          data[config]();
        }
      });
    };

    return Treeview;
  }();

  /**
   * Data API
   * ====================================================
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_WIDGET).each(function () {
      Treeview._jQueryInterface.call($(this), 'init');
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Treeview._jQueryInterface;
  $.fn[NAME].Constructor = Treeview;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Treeview._jQueryInterface;
  };

  return Treeview;
}(jQuery);

/**
 * --------------------------------------------
 * AdminLTE Widget.js
 * License MIT
 * --------------------------------------------
 */

var Widget = function ($) {
  /**
   * Constants
   * ====================================================
   */

  var NAME = 'Widget';
  var DATA_KEY = 'lte.widget';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    EXPANDED: 'expanded' + EVENT_KEY,
    COLLAPSED: 'collapsed' + EVENT_KEY,
    REMOVED: 'removed' + EVENT_KEY
  };

  var Selector = {
    DATA_REMOVE: '[data-widget="remove"]',
    DATA_COLLAPSE: '[data-widget="collapse"]',
    CARD: '.card',
    CARD_HEADER: '.card-header',
    CARD_BODY: '.card-body',
    CARD_FOOTER: '.card-footer',
    COLLAPSED: '.collapsed-card'
  };

  var ClassName = {
    COLLAPSED: 'collapsed-card'
  };

  var Default = {
    animationSpeed: 'normal',
    collapseTrigger: Selector.DATA_COLLAPSE,
    removeTrigger: Selector.DATA_REMOVE
  };

  var Widget = function () {
    function Widget(element, settings) {
      classCallCheck(this, Widget);

      this._element = element;
      this._parent = element.parents(Selector.CARD).first();
      this._settings = $.extend({}, Default, settings);
    }

    Widget.prototype.collapse = function collapse() {
      var _this = this;

      this._parent.children(Selector.CARD_BODY + ', ' + Selector.CARD_FOOTER).slideUp(this._settings.animationSpeed, function () {
        _this._parent.addClass(ClassName.COLLAPSED);
      });

      var collapsed = $.Event(Event.COLLAPSED);

      this._element.trigger(collapsed, this._parent);
    };

    Widget.prototype.expand = function expand() {
      var _this2 = this;

      this._parent.children(Selector.CARD_BODY + ', ' + Selector.CARD_FOOTER).slideDown(this._settings.animationSpeed, function () {
        _this2._parent.removeClass(ClassName.COLLAPSED);
      });

      var expanded = $.Event(Event.EXPANDED);

      this._element.trigger(expanded, this._parent);
    };

    Widget.prototype.remove = function remove() {
      this._parent.slideUp();

      var removed = $.Event(Event.REMOVED);

      this._element.trigger(removed, this._parent);
    };

    Widget.prototype.toggle = function toggle() {
      if (this._parent.hasClass(ClassName.COLLAPSED)) {
        this.expand();
        return;
      }

      this.collapse();
    };

    // Private

    Widget.prototype._init = function _init(card) {
      var _this3 = this;

      this._parent = card;

      $(this).find(this._settings.collapseTrigger).click(function () {
        _this3.toggle();
      });

      $(this).find(this._settings.removeTrigger).click(function () {
        _this3.remove();
      });
    };

    // Static

    Widget._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Widget($(this), data);
          $(this).data(DATA_KEY, typeof config === 'string' ? data : config);
        }

        if (typeof config === 'string' && config.match(/remove|toggle/)) {
          data[config]();
        } else if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          data._init($(this));
        }
      });
    };

    return Widget;
  }();

  /**
   * Data API
   * ====================================================
   */

  $(document).on('click', Selector.DATA_COLLAPSE, function (event) {
    if (event) {
      event.preventDefault();
    }

    Widget._jQueryInterface.call($(this), 'toggle');
  });

  $(document).on('click', Selector.DATA_REMOVE, function (event) {
    if (event) {
      event.preventDefault();
    }

    Widget._jQueryInterface.call($(this), 'remove');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Widget._jQueryInterface;
  $.fn[NAME].Constructor = Widget;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Widget._jQueryInterface;
  };

  return Widget;
}(jQuery);

exports.ControlSidebar = ControlSidebar;
exports.Layout = Layout;
exports.PushMenu = PushMenu;
exports.Treeview = Treeview;
exports.Widget = Widget;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=adminlte.js.map
