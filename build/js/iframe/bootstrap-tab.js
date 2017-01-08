var addTabs = function (options) {
    var defaultTabOptions = {
        id: Math.random() * 200,
        urlType: "relative",
        title: "新页面"
    };

    options = $.extend(true, defaultTabOptions, options);

    if (options.urlType == "relative") {
        // var url = window.location.protocol + '//' + window.location.host + "/";
        var basePath = window.location.pathname + "/../";
        options.url = basePath + options.url;
    }

    var id = "tab_" + options.id;
    var title = "", content = "";

    //如果TAB不存在，创建一个新的TAB
    var $tab = $("#" + id);
    if (!$tab[0]) {
        var mainHeight = App.getViewPort().height - $('.page-footer').outerHeight() - $('.page-header').outerHeight() - $(".content-tabs").height();
        //固定TAB中IFRAME高度
        // mainHeight = $(document.body).height() - 90;
        //创建新TAB的title
        title = '<a href="javascript:void(0);" id="tab_' + id + '"  data-id="' + id + '"  class="menu_tab" >' + options.title;
        //是否允许关闭
        if (options.close) {
            title += ' <i class="fa fa-remove page_tab_close" style="cursor: pointer;" data-id="' + id + '" onclick="closeTab(this)"></i>';
        }
        title += '</a>';
        var loadIframe = "";
        //是否指定TAB内容
        if (options.content) {
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' + options.content + '</div>';
        } else { //没有内容，使用IFRAME打开链接
            //    App.startPageLoading({ message: '加载中......' });

            //    App.stopPageLoading();

            App.blockUI({
                target: '#tab-content',
                boxed: true,
                message: '加载中......'//,
                // animate: true
            });

            content = '<div role="tabpanel" class="tab-pane" id="' + id + '">';

            loadIframe = '<iframe onload="javascript:App.unblockUI(\'#tab-content\');" src="' + options.url + '" width="100%" height="' + mainHeight +
                '" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes"  allowtransparency="yes" id="iframe_' + id + '" class="  tab_iframe"></iframe>';

            content += loadIframe;
            content += '</div>';

        }

        //加入TABS
        $(".page-tabs-content").append(title);

        $tab = $(content);
        $("#tab-content").append($tab);

        //iframe 加载完成事件
        $tab.find("iframe").load(function () {
            App.fixIframeCotent();
        });
    }

    $(".page-tabs-content > a.active").removeClass("active");

    $("#tab-content").find(".active").removeClass("active");

    //var height = $(".tab_iframe").height() + 1;
    //$(".tab_iframe").css({
    //    height: height
    //});

    //激活TAB
    $("#tab_" + id).addClass('active');

    // if (isNewOpen===false) {
    scrollToTab($('.menu_tab.active'));
    // }
    $tab.addClass("active");

};


var closeTab = function (item) {
    var id = $(item).attr("data-id");
    //如果关闭的是当前激活的TAB，激活他的前一个TAB
    if ($(".page-tabs-content > a.active").attr('id') === "tab_" + id) {
        var prev = $("#tab_" + id).prev();
        var prevIframe = $("#" + id).prev();

        setTimeout(function () { //某种bug，需要延迟执行
            prev.addClass('active');
            prevIframe.addClass('active');
        }, 300);
    }

    ////关闭TAB
    $("#tab_" + id).remove();
    $("#" + id).remove();

};
var closeCurrentTab = function () {
    var currentTab = $('.page-tabs-content').find('.active').find('.fa-remove').parents('a');
    if (currentTab) {
        closeTab(currentTab);
    }
};
var refreshTab = function () {
    var currentId = $('.page-tabs-content').find('.active').attr('data-id');
    var target = $('#iframe_' + currentId);
    var url = target.attr('src');

    target.attr('src', url);
};

var closeOtherTabs = function (isAll) {
    if (isAll) {
        $('.page-tabs-content').children("[data-id]").find('.fa-remove').parents('a').each(function () {
            $('#' + $(this).data('id')).remove();
            $(this).remove();
        });
        var firstChild = $(".page-tabs-content").children(); //选中那些删不掉的第一个菜单
        if (firstChild) {
            $('#' + firstChild.data('id')).addClass('active');
            firstChild.addClass('active');
        }
    } else {
        $('.page-tabs-content').children("[data-id]").find('.fa-remove').parents('a').not(".active").each(function () {
            $('#' + $(this).data('id')).remove();
            $(this).remove();
        });

    }
};
//计算宽度
var calSumWidth = function (element) {
    var width = 0;
    $(element).each(function () {
        width += $(this).outerWidth(true);
    });
    return width;
};

//滚动条滚动到右边
var scrollTabRight = function () {
    var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
    var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".menuTabs"));
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
    var scrollVal = 0;
    if ($(".page-tabs-content").width() < visibleWidth) {
        return false;
    } else {
        var tabElement = $(".menu_tab:first");
        var offsetVal = 0;
        while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
        }
        offsetVal = 0;
        while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
        }
        scrollVal = calSumWidth($(tabElement).prevAll());
        if (scrollVal > 0) {
            $('.page-tabs-content').animate({
                marginLeft: 0 - scrollVal + 'px'
            }, "fast");
        }
    }
};
//滚动条滚动
var scrollToTab = function (element) {
    var marginLeftVal = calSumWidth($(element).prevAll()), marginRightVal = calSumWidth($(element).nextAll());
    var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".menuTabs"));
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
    var scrollVal = 0;
    if ($(".page-tabs-content").outerWidth() < visibleWidth) {
        scrollVal = 0;
    } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
        if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
            scrollVal = marginLeftVal;
            var tabElement = element;
            while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                scrollVal -= $(tabElement).prev().outerWidth();
                tabElement = $(tabElement).prev();
            }
        }
    } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
        scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
    }
    $('.page-tabs-content').animate({
        marginLeft: 0 - scrollVal + 'px'
    }, "fast");
};
//滚动条滚动到左边
var scrollTabLeft = function () {
    var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
    var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".menuTabs"));
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
    var scrollVal = 0;
    if ($(".page-tabs-content").width() < visibleWidth) {
        return false;
    } else {
        var tabElement = $(".menu_tab:first");
        var offsetVal = 0;
        while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
        }
        offsetVal = 0;
        if (calSumWidth($(tabElement).prevAll()) > visibleWidth) {
            while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).prev();
            }
            scrollVal = calSumWidth($(tabElement).prevAll());
        }
    }
    $('.page-tabs-content').animate({
        marginLeft: 0 - scrollVal + 'px'
    }, "fast");
};
//激活Tab
var activeTab = function () {
    var id = $(this).attr("data-id");
    $(".menu_tab").removeClass("active");
    $("#tab-content > .active").removeClass("active");
    //激活TAB
    $("#tab_" + id).addClass('active');
    $("#" + id).addClass("active");
    scrollToTab($('.menu_tab.active'));
};

$(function () {
    $(".menuTabs").on("click", ".menu_tab", activeTab);
});