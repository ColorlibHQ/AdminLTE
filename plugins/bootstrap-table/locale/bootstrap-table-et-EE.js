/**
 * Bootstrap Table Estonian translation
 * Author: kristjan@logist.it>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['et-EE'] = {
        formatLoadingMessage: function () {
            return 'Päring käib, palun oota...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' rida lehe kohta';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Näitan tulemusi ' + pageFrom + ' kuni ' + pageTo + ' - kokku ' + totalRows + ' tulemust';
        },
        formatSearch: function () {
            return 'Otsi';
        },
        formatNoMatches: function () {
            return 'Päringu tingimustele ei vastanud ühtegi tulemust';
        },
        formatPaginationSwitch: function () {
            return 'Näita/Peida lehtedeks jagamine';
        },
        formatRefresh: function () {
            return 'Värskenda';
        },
        formatToggle: function () {
            return 'Lülita';
        },
        formatColumns: function () {
            return 'Veerud';
        },
        formatAllRows: function () {
            return 'Kõik';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['et-EE']);

})(jQuery);