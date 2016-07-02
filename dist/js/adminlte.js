'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * AdminLTE v3.0.0-alpha (https://almsaeedstudio.com)
 * Copyright 2014-2016 Abdullah Almsaeed <abdullah@almsaeedstudio.com>
 * Project website Almsaeed Studio (https://almsaeedstudio.com)
 * Licensed under MIT (https://github.com/almasaeed2010/AdminLTE/blob/master/LICENSE)
 */
var Layout = function ($) {
  'use strict';

  /**
   * Constants
   * ====================================================
   */

  var NAME = 'Layout';
  var DATA_KEY = 'lte.layout';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    SIDEBAR: 'sidebar'
  };

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
  };

  /**
   * Class Definition
   * ====================================================
   */

  var Layout = function () {
    function Layout(element) {
      _classCallCheck(this, Layout);

      this._element = element;

      this._init();
    }

    // Public

    _createClass(Layout, [{
      key: 'fixLayoutHeight',
      value: function fixLayoutHeight() {
        var heights = [$(window).height(), $(Selector.HEADER).outerHeight(), $(Selector.FOOTER).outerHeight()];

        $(Selector.CONTENT).css('min-height', heights[0] - (heights[1] + heights[2]));
        console.log(heights[0] - (heights[1] + heights[2]));
      }

      // Private

    }, {
      key: '_init',
      value: function _init() {
        var _this = this;

        $('body').removeClass(ClassName.HOLD);

        this.fixLayoutHeight();
        $(Selector.SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview', function () {
          _this.fixLayoutHeight();
        });
        $(window).resize(function () {
          _this.fixLayoutHeight();
        });
      }
    }, {
      key: '_max',
      value: function _max(numbers) {
        var max = 0;

        numbers.forEach(function (v) {
          if (v > max) {
            max = v;
          }
        });

        return max;
      }

      // Static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(operation) {
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
      }
    }]);

    return Layout;
  }();

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
    accordion: false
  };

  /**
   * Class Definition
   * ====================================================
   */

  var Treeview = function () {
    function Treeview(element, config) {
      _classCallCheck(this, Treeview);

      this._config = config;
      this._element = element;
    }

    // Public

    _createClass(Treeview, [{
      key: 'init',
      value: function init() {
        this._setupListeners();
      }
    }, {
      key: 'expand',
      value: function expand(treeviewMenu, parentLi) {
        var _this2 = this;

        var expandedEvent = $.Event(Event.EXPANDED);

        if (this._config.accordion) {
          var openMenuLi = parentLi.siblings(Selector.OPEN).first();
          var openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first();
          this.collapse(openTreeview, openMenuLi);
        }

        treeviewMenu.slideDown(this._config.animationSpeed, function () {
          parentLi.addClass(ClassName.OPEN);
          $(_this2._element).trigger(expandedEvent);
        });
      }
    }, {
      key: 'collapse',
      value: function collapse(treeviewMenu, parentLi) {
        var _this3 = this;

        var collapsedEvent = $.Event(Event.COLLAPSED);

        treeviewMenu.slideUp(this._config.animationSpeed, function () {
          parentLi.removeClass(ClassName.OPEN);
          $(_this3._element).trigger(collapsedEvent);
          treeviewMenu.find(Selector.OPEN + ' > ' + Selector.TREEVIEW_MENU).slideUp();
          treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN);
        });
      }
    }, {
      key: 'collapseAll',
      value: function collapseAll() {}
    }, {
      key: 'expandAll',
      value: function expandAll() {}
    }, {
      key: 'toggle',
      value: function toggle(event) {
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
      }

      // Private

    }, {
      key: '_setupListeners',
      value: function _setupListeners() {
        var _this4 = this;

        $(document).on('click', this._config.trigger, function (event) {
          _this4.toggle(event);
        });
      }

      // Static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
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
      }
    }]);

    return Treeview;
  }();

  /**
   * Data API
   * ====================================================
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_WIDGET).each(function () {
      var $treeview = $(this);
      Treeview._jQueryInterface.call($treeview, 'init');
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

var PushMenu = function ($) {
  'use strict';

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

  var Selector = {
    COLLAPSED: 'sidebar-collapse',
    TOGGLE_BUTTON: '[data-widget="pushmenu"]'
  };

  /**
   * Class Definition
   * ====================================================
   */

  var PushMenu = function () {
    function PushMenu(element) {
      _classCallCheck(this, PushMenu);

      this._element = element;
      this._isShown = !$('body').hasClass(Selector.COLLAPSED) || $('body').hasClass('sidebar-open');
    }

    // Public

    _createClass(PushMenu, [{
      key: 'show',
      value: function show() {
        $('body').addClass('sidebar-open').removeClass(Selector.COLLAPSED);

        this._isShown = true;

        var shownEvent = $.Event(Event.SHOWN);
        $(this._element).trigger(shownEvent);
      }
    }, {
      key: 'collapse',
      value: function collapse() {
        $('body').removeClass('sidebar-open').addClass(Selector.COLLAPSED);

        this._isShown = false;

        var collapsedEvent = $.Event(Event.COLLAPSED);
        $(this._element).trigger(collapsedEvent);
      }
    }, {
      key: 'toggle',
      value: function toggle() {

        if (typeof this._isShown === 'undefined') {
          this._isShown = !$('body').hasClass(Selector.COLLAPSED) || $('body').hasClass('sidebar-open');
        }

        if (this._isShown) {
          this.collapse();
        } else {
          this.show();
        }
      }

      // Static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(operation) {
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
      }
    }]);

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

var Widget = function ($) {
  'use strict';

  var Widget = function () {
    function Widget(element) {
      _classCallCheck(this, Widget);

      this._element = element;
    }

    _createClass(Widget, null, [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(element) {
        var $this = $(element);
        $this.show();
      }
    }]);

    return Widget;
  }();

  return Widget;
}(jQuery);
//# sourceMappingURL=adminlte.js.map
