/*
 * Author: Abdullah A Almsaeed
 * Date: 17 Dec 2012
 * Description:
 *      This file should be included in all the documents that use this theme
 **/
var current_nav_color = "bg-blue";
$(function() {

    //sidebar on xs screen
    //var xs_open = false;
    $(".lte-menu-sm").click(function(e) {
        e.preventDefault();

        $(".lte-sidebar").toggleClass("hidden-xs");
        $(".lte-sidebar").toggleClass("fixed");
    });
    
    //Sidebar full length
    _sidebar_fix();
    $(window).resize(function() {
        _sidebar_fix();
    });
    $(".navbar-selector li").not(".noClick").click(function(e) {
        e.preventDefault();
        var bg = $(this).data("color");
        $(".navbar-theme").removeClass(current_nav_color).addClass(bg);
        current_nav_color = bg;
        _icon_color();
    });

    //Remove widget when clicking the times icon
    $(".box > .box-header > .box-tools > .off").click(function(e) {
        e.preventDefault();
        $(this).parents(".box").first().hide();
        //_sidebar_fix();
    });

    //LTE Tree
    $(".lte-tree").lteTree();

    //Icon color
    _icon_color();

    //Add close and slide up functionality to boxes    
    $(".box").lteWidget();

    //Todo list
    $(".todo-list").lteTodo();
});
function _icon_color() {
    $(".lte-sidebar-menu > .active > a > .fa, .lte-tree-menu > .active > a > .fa, .page-header > .fa").css({
        color: $(".navbar-theme").css("background-color")
    });
}

function _sidebar_fix() {
    $(".lte-main-container").css("min-height", ($(window).height() - ($("nav").outerHeight(true) + $("footer").outerHeight(true))));
    if ($(window).width() > 767) {
        $(".lte-sidebar").removeClass("fixed");
        $(".lte-sidebar").addClass("hidden-xs");
        $(".lte-menu-sm").css("margin-left", "0px");
    }
}

(function($) {

    $.fn.lteWidget = function() {
        return this.each(function() {
            var box = $(this);
            //Remove widget when clicking the times icon
            $(".box-header > .box-tools > .off", box).click(function(e) {
                e.preventDefault();
                $(this).parents(".box").first().hide();
            });

            $(".box-header > .box-tools > .lte-hider", box).click(function(e) {
                e.preventDefault();
                if (box.hasClass("closed-box")) {
                    box.find(".box-body, .table-container, .box-footer").slideDown();
                    $(".box-header > .box-tools > .lte-hider", box).removeClass("fa-angle-up").addClass("fa-angle-down");
                } else {
                    box.find(".box-body, .table-container, .box-footer").slideUp();
                    $(".box-header > .box-tools > .lte-hider", box).removeClass("fa-angle-down").addClass("fa-angle-up");
                }
                box.toggleClass("closed-box");
            });
        });

    };


}(jQuery));

(function($) {

    $.fn.lteTodo = function(options) {
        var settings = $.extend({
            //li in these fns is the containing li from the list
            done: function(li) {
                //After the checkbox gets checked
                //For example, set task as done in database
            },
            uncheck: function(li) {
                //What happens if the checkbox got unchecked?
            },
            taskAdded: function(li) {
                //What happens if new task gets added?
            }
        }, options);

        return this.each(function() {
            var list = $(this);

            var addBtn = list.attr("data-addBtn");
            var addText = list.attr("data-addText");

            $(":checkbox", list).change(function() {
                var parent = $(this).parents("li").first();

                done(parent);
            });

            function done(li) {
                li.toggleClass("done");
                if (li.hasClass("done"))
                    settings.done(li);
                else
                    settings.uncheck(li);
            }

            $(addBtn).click(function(e) {
                e.preventDefault();

                var value = $(addText).val();
                if (value == '')
                    return;
                var element = $("<li />");
                var checkbox = $("<input type='checkbox' />");

                element.append(checkbox);
                element.append(value);
                element.append("<div class='pull-right label label-danger'>New</div>")
                $(":checkbox", element).change(function() {
                    var parent = $(this).parents("li").first();

                    done(parent);
                });

                list.prepend(element);
                $(addText).val("");
                settings.taskAdded(element);
            });
        });

    };


}(jQuery));