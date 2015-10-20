/**
 * Bootstrap Table Georgian translation
 * Author: Levan Lotuashvili <l.lotuashvili@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['ka-GE'] = {
        formatLoadingMessage: function() {
            return 'იტვირთება, გთხოვთ მოიცადოთ...';
        },
        formatRecordsPerPage: function(pageNumber) {
            return pageNumber + ' ჩანაწერი თითო გვერდზე';
        },
        formatShowingRows: function(pageFrom, pageTo, totalRows) {
            return 'ნაჩვენებია ' + pageFrom + '-დან ' + pageTo + '-მდე ჩანაწერი ჯამური ' + totalRows + '-დან';
        },
        formatSearch: function() {
            return 'ძებნა';
        },
        formatNoMatches: function() {
            return 'მონაცემები არ არის';
        },
        formatPaginationSwitch: function() {
            return 'გვერდების გადამრთველის დამალვა/გამოჩენა';
        },
        formatRefresh: function() {
            return 'განახლება';
        },
        formatToggle: function() {
            return 'ჩართვა/გამორთვა';
        },
        formatColumns: function() {
            return 'სვეტები';
        }
    };
    
    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['ka-GE']);

})(jQuery);
