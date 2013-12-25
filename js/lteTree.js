/*
 * Author: Abdullah A Almsaeed
 * Date: 15 Dec 2013
 * Description:
 **/


(function($) {

    $.fn.lteTree = function() {
        return this.each(function() {
            var btn = $(this).children("a").first();
            var menu = $(this).children(".lte-tree-menu").first();
            var isActive = $(this).hasClass('active');

            if (isActive) {
                menu.slideDown();
                btn.children(".fa-angle-right").first().removeClass("fa-angle-right").addClass("fa-angle-down");
            }

            btn.click(function(e) {
                e.preventDefault();
                if (isActive) {
                    menu.slideUp();
                    isActive = false;
                    btn.children(".fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-right");
                } else {
                    menu.slideDown();
                    isActive = true;
                    btn.children(".fa-angle-right").first().removeClass("fa-angle-right").addClass("fa-angle-down");
                }
            });


            menu.find("li > a").each(function() {
                var pad = parseInt($(this).css("padding-left")) + 10;

                $(this).css({"padding-left": pad + "px"});
            });

        });

    };


}(jQuery));