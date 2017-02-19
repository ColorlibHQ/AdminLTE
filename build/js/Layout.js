/* Layout
 * ======
 * Fixes the layout height in case min-height fails.
 *
 * @usage activated automatically upon window load
 */
+function ($) {
  'use strict'

  var DataKey = 'lte.layout'

  var Default = {
    slimscroll: true
  }

  var Selector = {
    wrapper       : '.wrapper',
    contentWrapper: '.content-wrapper',
    layoutBoxed   : '.layout-boxed',
    mainFooter    : '.main-footer',
    mainHeader    : '.main-header',
    sidebar       : '.sidebar',
    controlSidebar: '.control-sidebar',
    fixed         : '.fixed',
    sidebarMenu   : '.sidebar-menu'
  }

  var ClassName = {
    fixed: 'fixed'
  }

  var Layout = function (options) {
    this.options = options
    this.activate()
  }

  Layout.prototype.activate = function () {
    this.fix()
    this.fixSidebar()

    $('body').removeClass('hold-transition')
    $('body, html, ' + Selector.wrapper).css('height', 'auto')

    $(window).resize(function () {
      this.fix()
      this.fixSidebar()
    }.bind(this))

    $(Selector.sidebarMenu).on('expanded.tree', function () {
      this.fix()
      this.fixSidebar()
    }.bind(this))

    $(Selector.sidebarMenu).on('collapsed.tree', function () {
      this.fix()
      this.fixSidebar()
    }.bind(this))
  }

  Layout.prototype.fix = function () {
    // Remove overflow from .wrapper if layout-boxed exists
    $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden')

    // Get window height and the wrapper height
    var footerHeight  = $(Selector.mainFooter).outerHeight() || 0
    var neg           = $(Selector.mainHeader).outerHeight() + footerHeight
    var windowHeight  = $(window).height()
    var sidebarHeight = $(Selector.sidebar).height() || 0

    // Set the min-height of the content and sidebar based on the
    // the height of the document.
    if ($('body').hasClass(ClassName.fixed)) {
      $(Selector.contentWrapper).css('min-height', windowHeight - footerHeight)
    } else {
      var postSetWidth

      if (windowHeight >= sidebarHeight) {
        $(Selector.contentWrapper).css('min-height', windowHeight - neg)
        postSetWidth = windowHeight - neg
      } else {
        $(Selector.contentWrapper).css('min-height', sidebarHeight)
        postSetWidth = sidebarHeight
      }

      // Fix for the control sidebar height
      var $controlSidebar = $(Selector.controlSidebar)
      if (typeof $controlSidebar !== 'undefined') {
        if ($controlSidebar.height() > postSetWidth)
          $(Selector.contentWrapper).css('min-height', $controlSidebar.height())
      }
    }
  }

  Layout.prototype.fixSidebar = function () {
    // Make sure the body tag has the .fixed class
    if (!$('body').hasClass(ClassName.fixed)) {
      if (typeof $.fn.slimScroll != 'undefined') {
        $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')
      }
      return
    }

    // Enable slimscroll for fixed layout
    if (this.options.slimscroll) {
      if (typeof $.fn.slimScroll != 'undefined') {
        // Destroy if it exists
        $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')

        // Add slimscroll
        $(Selector.sidebar).slimScroll({
          height: ($(window).height() - $(Selector.mainHeader).height()) + 'px',
          color : 'rgba(0,0,0,0.2)',
          size  : '3px'
        })
      }
    }
  }

  // Plugin Definition
  // =================
  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data(DataKey)
      var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data(DataKey, (data = new Layout(options)))
    })
  }

  var old = $.fn.layout

  $.fn.layout            = Plugin
  $.fn.layout.Constuctor = Layout

  // No conflict mode
  // ================
  $.fn.layout.noConflict = function () {
    $.fn.layout = old
    return this
  }

  // Layout DATA-API
  // ===============
  $(window).on('load', function () {
    Plugin.call($('body'), $('body').data())
  })
}(jQuery)
