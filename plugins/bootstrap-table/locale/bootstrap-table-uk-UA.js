/**
 * Bootstrap Table Ukrainian translation
 * Author: Vitaliy Timchenko <vitaliy.timchenko@gmail.com>
 */
 (function ($) {
    'use strict';
    
    $.fn.bootstrapTable.locales['uk-UA'] = {
        formatLoadingMessage: function () {
            return 'Завантаження, будь ласка, зачекайте...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' записів на сторінку';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Показано з ' + pageFrom + ' по ' + pageTo + '. Всього: ' + totalRows;
        },
        formatSearch: function () {
            return 'Пошук';
        },
        formatNoMatches: function () {
            return 'Не знайдено жодного запису';
        },
        formatRefresh: function () {
            return 'Оновити';
        },
        formatToggle: function () {
            return 'Змінити';
        },
        formatColumns: function () {
            return 'Стовпці';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['uk-UA']);

})(jQuery);
