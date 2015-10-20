/**
 * Bootstrap Table Swedish translation
 * Author: C Bratt <bratt@inix.se>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['sv-SE'] = {
        formatLoadingMessage: function () {
            return 'Laddar, vänligen vänta...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' rader per sida';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Visa ' + pageFrom + ' till ' + pageTo + ' av ' + totalRows + ' rader';
        },
        formatSearch: function () {
            return 'Sök';
        },
        formatNoMatches: function () {
            return 'Inga matchande resultat funna.';
        },
        formatRefresh: function () {
            return 'Uppdatera';
        },
        formatToggle: function () {
            return 'Skifta';
        },
        formatColumns: function () {
            return 'kolumn';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['sv-SE']);

})(jQuery);
