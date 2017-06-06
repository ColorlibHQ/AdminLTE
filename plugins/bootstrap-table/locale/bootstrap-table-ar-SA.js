/**
 * Bootstrap Table English translation
 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['ar-SA'] = {
        formatLoadingMessage: function () {
            return 'جاري التحميل, يرجى الإنتظار...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' سجل لكل صفحة';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'الظاهر ' + pageFrom + ' إلى ' + pageTo + ' من ' + totalRows + ' سجل';
        },
        formatSearch: function () {
            return 'بحث';
        },
        formatNoMatches: function () {
            return 'لا توجد نتائج مطابقة للبحث';
        },
        formatPaginationSwitch: function () {
            return 'إخفاء\إظهار ترقيم الصفحات';
        },
        formatRefresh: function () {
            return 'تحديث';
        },
        formatToggle: function () {
            return 'تغيير';
        },
        formatColumns: function () {
            return 'أعمدة';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['ar-SA']);

})(jQuery);
