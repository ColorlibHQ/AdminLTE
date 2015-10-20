/**
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 * @version: v1.0.0
 *
 * @update zhixin wen <wenzhixin2010@gmail.com>
 */

!function ($) {

    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        keyEvents: false
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init;

    BootstrapTable.prototype.init = function () {
        _init.apply(this, Array.prototype.slice.apply(arguments));
        this.initKeyEvents();
    };

    BootstrapTable.prototype.initKeyEvents = function () {
        if (this.options.keyEvents) {
            var that = this;

            $(document).off('keydown').on('keydown', function (e) {
                var $search = that.$toolbar.find('.search input'),
                    $refresh = that.$toolbar.find('button[name="refresh"]'),
                    $toggle = that.$toolbar.find('button[name="toggle"]'),
                    $paginationSwitch = that.$toolbar.find('button[name="paginationSwitch"]');

                if (document.activeElement === $search.get(0)) {
                    return true;
                }

                switch (e.keyCode) {
                    case 83: //s
                        if (!that.options.search) {
                            return;
                        }
                        $search.focus();
                        return false;
                    case 82: //r
                        if (!that.options.showRefresh) {
                            return;
                        }
                        $refresh.click();
                        return false;
                    case 84: //t
                        if (!that.options.showToggle) {
                            return;
                        }
                        $toggle.click();
                        return false;
                    case 80: //p
                        if (!that.options.showPaginationSwitch) {
                            return;
                        }
                        $paginationSwitch.click();
                        return false;
                    case 37: // left
                        if (!that.options.pagination) {
                            return;
                        }
                        that.prevPage();
                        return false;
                    case 39: // right
                        if (!that.options.pagination) {
                            return;
                        }
                        that.nextPage();
                        return;
                }
            });
        }
    };
}(jQuery);
