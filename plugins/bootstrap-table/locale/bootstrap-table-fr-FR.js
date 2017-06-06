/**
 * Bootstrap Table French (France) translation
 * Author: Dennis Hernández (http://djhvscf.github.io/Blog/)
 * Modification: Tidalf (https://github.com/TidalfFR)
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['fr-FR'] = {
        formatLoadingMessage: function () {
            return 'Chargement en cours, patientez, s´il vous plaît ...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' lignes par page';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Affichage des lignes ' + pageFrom + ' à ' + pageTo + ' sur ' + totalRows + ' lignes au total';
        },
        formatSearch: function () {
            return 'Rechercher';
        },
        formatNoMatches: function () {
            return 'Aucun résultat trouvé';
        },
        formatRefresh: function () {
            return 'Rafraîchir';
        },
        formatToggle: function () {
            return 'Alterner';
        },
        formatColumns: function () {
            return 'Colonnes';
        },
        formatAllRows: function () {
            return 'Tous';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['fr-FR']);

})(jQuery);
