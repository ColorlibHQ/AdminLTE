/**
 * Bootstrap Table danish translation
 * Author: Your Name Jan Borup Coyle, github@coyle.dk
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['da-DK'] = {
        formatLoadingMessage: function () {
            return 'Indlæser, vent venligst...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' poster pr side';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Viser ' + pageFrom + ' til ' + pageTo + ' af ' + totalRows + ' rækker';
        },
        formatSearch: function () {
            return 'Søg';
        },
        formatNoMatches: function () {
            return 'Ingen poster fundet';
        },
        formatRefresh: function () {
            return 'Opdater';
        },
        formatToggle: function () {
            return 'Skift';
        },
        formatColumns: function () {
            return 'Kolonner';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['da-DK']);

})(jQuery);