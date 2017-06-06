/**
 * Bootstrap Table Polish translation
 * Author: zergu <michal.zagdan @ gmail com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['pl-PL'] = {
        formatLoadingMessage: function () {
            return 'Ładowanie, proszę czekać...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' rekordów na stronę';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Wyświetlanie rekordów od ' + pageFrom + ' do ' + pageTo + ' z ' + totalRows;
        },
        formatSearch: function () {
            return 'Szukaj';
        },
        formatNoMatches: function () {
            return 'Niestety, nic nie znaleziono';
        },
        formatRefresh: function () {
            return 'Odśwież';
        },
        formatToggle: function () {
            return 'Przełącz';
        },
        formatColumns: function () {
            return 'Kolumny';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['pl-PL']);

})(jQuery);
