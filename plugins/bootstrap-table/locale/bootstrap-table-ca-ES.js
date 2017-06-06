/**
 * Bootstrap Table Catalan translation
 * Author: Marc Pina<iwalkalone69@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['ca-ES'] = {
        formatLoadingMessage: function () {
            return 'Si us plau esperi...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' resultats per pàgina';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Mostrant de ' + pageFrom + ' fins ' + pageTo + ' - total ' + totalRows + ' resultats';
        },
        formatSearch: function () {
            return 'Buscar';
        },
        formatNoMatches: function () {
            return 'No s\'han trobat resultats';
        },
        formatPaginationSwitch: function () {
            return 'Amagar/Mostrar paginació';
        },
        formatRefresh: function () {
            return 'Refrescar';
        },
        formatToggle: function () {
            return 'Amagar/Mostrar';
        },
        formatColumns: function () {
            return 'Columnes';
        },
        formatAllRows: function () {
            return 'Tots';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['ca-ES']);

})(jQuery);
