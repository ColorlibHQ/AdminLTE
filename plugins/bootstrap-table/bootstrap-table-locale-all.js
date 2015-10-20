/**
 * Bootstrap Table Afrikaans translation
 * Author: Phillip Kruger <phillip.kruger@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['af-ZA'] = {
        formatLoadingMessage: function () {
            return 'Besig om te laai, wag asseblief ...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' rekords per bladsy';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Resultate ' + pageFrom + ' tot ' + pageTo + ' van ' + totalRows + ' rye';
        },
        formatSearch: function () {
            return 'Soek';
        },
        formatNoMatches: function () {
            return 'Geen rekords gevind nie';
        },
        formatPaginationSwitch: function () {
            return 'Wys/verberg bladsy nummering';
        },
        formatRefresh: function () {
            return 'Herlaai';
        },
        formatToggle: function () {
            return 'Wissel';
        },
        formatColumns: function () {
            return 'Kolomme';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['af-ZA']);

})(jQuery);

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

/**
 * Bootstrap Table Czech translation
 * Author: Lukas Kral (monarcha@seznam.cz)
 * Author: Jakub Svestka <svestka1999@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['cs-CZ'] = {
        formatLoadingMessage: function () {
            return 'Čekejte, prosím...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' položek na stránku';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Zobrazena ' + pageFrom + '. - ' + pageTo + '. položka z celkových ' + totalRows;
        },
        formatSearch: function () {
            return 'Vyhledávání';
        },
        formatNoMatches: function () {
            return 'Nenalezena žádná vyhovující položka';
        },
        formatPaginationSwitch: function () {
            return 'Skrýt/Zobrazit stránkování';
        },
        formatRefresh: function () {
            return 'Aktualizovat';
        },
        formatToggle: function () {
            return 'Přepni';
        },
        formatColumns: function () {
            return 'Sloupce';
        },
        formatAllRows: function () {
            return 'Vše';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['cs-CZ']);

})(jQuery);

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
/**
* Bootstrap Table German translation
* Author: Paul Mohr - Sopamo<p.mohr@sopamo.de>
*/
(function ($) {
  'use strict';

  $.fn.bootstrapTable.locales['de-DE'] = {
    formatLoadingMessage: function () {
      return 'Lade, bitte warten...';
    },
    formatRecordsPerPage: function (pageNumber) {
      return pageNumber + ' Einträge pro Seite';
    },
    formatShowingRows: function (pageFrom, pageTo, totalRows) {
      return 'Zeige ' + pageFrom + ' bis ' + pageTo + ' von ' + totalRows + ' Zeile' + ((totalRows > 1) ? "n" : "");
    },
    formatSearch: function () {
      return 'Suchen';
    },
    formatNoMatches: function () {
      return 'Keine passenden Ergebnisse gefunden';
    },
    formatRefresh: function () {
      return 'Neu laden';
    },
    formatToggle: function () {
      return 'Umschalten';
    },
    formatColumns: function () {
      return 'Spalten';
    }
  };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['de-DE']);

})(jQuery);

/**
 * Bootstrap Table Greek translation
 * Author: giannisdallas
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['el-GR'] = {
        formatLoadingMessage: function () {
            return 'Φορτώνει, παρακαλώ περιμένετε...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' αποτελέσματα ανά σελίδα';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Εμφανίζονται από την ' + pageFrom + ' ως την ' + pageTo + ' από σύνολο ' + totalRows + ' σειρών';
        },
        formatSearch: function () {
            return 'Αναζητήστε';
        },
        formatNoMatches: function () {
            return 'Δεν βρέθηκαν αποτελέσματα';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['el-GR']);

})(jQuery);

/**
 * Bootstrap Table English translation
 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['en-US'] = {
        formatLoadingMessage: function () {
            return 'Loading, please wait...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' records per page';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Showing ' + pageFrom + ' to ' + pageTo + ' of ' + totalRows + ' rows';
        },
        formatSearch: function () {
            return 'Search';
        },
        formatNoMatches: function () {
            return 'No matching records found';
        },
        formatPaginationSwitch: function () {
            return 'Hide/Show pagination';
        },
        formatRefresh: function () {
            return 'Refresh';
        },
        formatToggle: function () {
            return 'Toggle';
        },
        formatColumns: function () {
            return 'Columns';
        },
        formatAllRows: function () {
            return 'All';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['en-US']);

})(jQuery);
/**
 * Bootstrap Table Spanish (Argentina) translation
 * Author: Felix Vera (felix.vera@gmail.com)
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['es-AR'] = {
        formatLoadingMessage: function () {
            return 'Cargando, espere por favor...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' registros por página';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Mostrando ' + pageFrom + ' a ' + pageTo + ' de ' + totalRows + ' filas';
        },
        formatSearch: function () {
            return 'Buscar';
        },
        formatNoMatches: function () {
            return 'No se encontraron registros';
        },
        formatAllRows: function () {
            return 'Todo';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['es-AR']);

})(jQuery);
/**
 * Bootstrap Table Spanish (Costa Rica) translation
 * Author: Dennis Hernández (http://djhvscf.github.io/Blog/)
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['es-CR'] = {
        formatLoadingMessage: function () {
            return 'Cargando, por favor espere...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' registros por página';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Mostrando de ' + pageFrom + ' a ' + pageTo + ' registros de ' + totalRows + ' registros en total';
        },
        formatSearch: function () {
            return 'Buscar';
        },
        formatNoMatches: function () {
            return 'No se encontraron registros';
        },
        formatRefresh: function () {
            return 'Refrescar';
        },
        formatToggle: function () {
            return 'Alternar';
        },
        formatColumns: function () {
            return 'Columnas';
        },
        formatAllRows: function () {
            return 'Todo';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['es-CR']);

})(jQuery);

/**
 * Bootstrap Table Spanish Spain translation
 * Author: Marc Pina<iwalkalone69@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['es-ES'] = {
        formatLoadingMessage: function () {
            return 'Por favor espere...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' resultados por página';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Mostrando desde ' + pageFrom + ' hasta ' + pageTo + ' - En total ' + totalRows + ' resultados';
        },
        formatSearch: function () {
            return 'Buscar';
        },
        formatNoMatches: function () {
            return 'No se encontraron resultados';
        },
        formatPaginationSwitch: function () {
            return 'Ocultar/Mostrar paginación';
        },
        formatRefresh: function () {
            return 'Refrescar';
        },
        formatToggle: function () {
            return 'Ocultar/Mostrar';
        },
        formatColumns: function () {
            return 'Columnas';
        },
        formatAllRows: function () {
            return 'Todos';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['es-ES']);

})(jQuery);

/**
 * Bootstrap Table Spanish (México) translation (Obtenido de traducción de Argentina)
 * Author: Felix Vera (felix.vera@gmail.com) 
 * Copiado: Mauricio Vera (mauricioa.vera@gmail.com)
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['es-MX'] = {
        formatLoadingMessage: function () {
            return 'Cargando, espere por favor...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' registros por página';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Mostrando ' + pageFrom + ' a ' + pageTo + ' de ' + totalRows + ' filas';
        },
        formatSearch: function () {
            return 'Buscar';
        },
        formatNoMatches: function () {
            return 'No se encontraron registros';
        },
        formatAllRows: function () {
            return 'Todo';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['es-MX']);

})(jQuery);

/**
 * Bootstrap Table Spanish (Nicaragua) translation
 * Author: Dennis Hernández (http://djhvscf.github.io/Blog/)
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['es-NI'] = {
        formatLoadingMessage: function () {
            return 'Cargando, por favor espere...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' registros por página';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Mostrando de ' + pageFrom + ' a ' + pageTo + ' registros de ' + totalRows + ' registros en total';
        },
        formatSearch: function () {
            return 'Buscar';
        },
        formatNoMatches: function () {
            return 'No se encontraron registros';
        },
        formatRefresh: function () {
            return 'Refrescar';
        },
        formatToggle: function () {
            return 'Alternar';
        },
        formatColumns: function () {
            return 'Columnas';
        },
        formatAllRows: function () {
            return 'Todo';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['es-NI']);

})(jQuery);

/**
 * Bootstrap Table Spanish (España) translation
 * Author: Antonio Pérez <anpegar@gmail.com>
 */
 (function ($) {
    'use strict';
    
    $.fn.bootstrapTable.locales['es-SP'] = {
        formatLoadingMessage: function () {
            return 'Cargando, por favor espera...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' registros por p&#225;gina.';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return pageFrom + ' - ' + pageTo + ' de ' + totalRows + ' registros.';
        },
        formatSearch: function () {
            return 'Buscar';
        },
        formatNoMatches: function () {
            return 'No se han encontrado registros.';
        },
        formatRefresh: function () {
            return 'Actualizar';
        },
        formatToggle: function () {
            return 'Alternar';
        },
        formatColumns: function () {
            return 'Columnas';
        },
        formatAllRows: function () {
            return 'Todo';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['es-SP']);

})(jQuery);
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
/**
 * Bootstrap Table Persian translation
 * Author: MJ Vakili <mjv.1989@Gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['fa-IR'] = {
        formatLoadingMessage: function () {
            return 'در حال بارگذاری, لطفا صبر کنید...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' رکورد در صفحه';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'نمایش ' + pageFrom + ' تا ' + pageTo + ' از ' + totalRows + ' ردیف';
        },
        formatSearch: function () {
            return 'جستجو';
        },
        formatNoMatches: function () {
            return 'رکوردی یافت نشد.';
        },
        formatPaginationSwitch: function () {
            return 'نمایش/مخفی صفحه بندی';
        },
        formatRefresh: function () {
            return 'به روز رسانی';
        },
        formatToggle: function () {
            return 'تغییر نمایش';
        },
        formatColumns: function () {
            return 'سطر ها';
        },
        formatAllRows: function () {
            return 'همه';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['fa-IR']);

})(jQuery);
/**
 * Bootstrap Table French (Belgium) translation
 * Author: Julien Bisconti (julien.bisconti@gmail.com)
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['fr-BE'] = {
        formatLoadingMessage: function () {
            return 'Chargement en cours...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' entrées par page';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Affiche de' + pageFrom + ' à ' + pageTo + ' sur ' + totalRows + ' lignes';
        },
        formatSearch: function () {
            return 'Recherche';
        },
        formatNoMatches: function () {
            return 'Pas de fichiers trouvés';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['fr-BE']);

})(jQuery);

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

/**
 * Bootstrap Table Croatian translation
 * Author: Petra Štrbenac (petra.strbenac@gmail.com)
 * Author: Petra Štrbenac (petra.strbenac@gmail.com)
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['hr-HR'] = {
        formatLoadingMessage: function () {
            return 'Molimo pričekajte ...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' broj zapisa po stranici';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Prikazujem ' + pageFrom + '. - ' + pageTo + '. od ukupnog broja zapisa ' + totalRows;
        },
        formatSearch: function () {
            return 'Pretraži';
        },
        formatNoMatches: function () {
            return 'Nije pronađen niti jedan zapis';
        },
        formatPaginationSwitch: function () {
            return 'Prikaži/sakrij stranice';
        },
        formatRefresh: function () {
            return 'Osvježi';
        },
        formatToggle: function () {
            return 'Promijeni prikaz';
        },
        formatColumns: function () {
            return 'Kolone';
        },
        formatAllRows: function () {
            return 'Sve';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['hr-HR']);

})(jQuery);

/**
 * Bootstrap Table Hungarian translation
 * Author: Nagy Gergely <info@nagygergely.eu>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['hu-HU'] = {
        formatLoadingMessage: function () {
            return 'Betöltés, kérem várjon...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' rekord per oldal';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Megjelenítve ' + pageFrom + ' - ' + pageTo + ' / ' + totalRows + ' összesen';
        },
        formatSearch: function () {
            return 'Keresés';
        },
        formatNoMatches: function () {
            return 'Nincs találat';
        },
        formatPaginationSwitch: function () {
            return 'Lapozó elrejtése/megjelenítése';
        },
        formatRefresh: function () {
            return 'Frissítés';
        },
        formatToggle: function () {
            return 'Összecsuk/Kinyit';
        },
        formatColumns: function () {
            return 'Oszlopok';
        },
        formatAllRows: function () {
            return 'Összes';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['hu-HU']);

})(jQuery);

/**
 * Bootstrap Table Italian translation
 * Author: Davide Renzi<davide.renzi@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['it-IT'] = {
        formatLoadingMessage: function () {
            return 'Caricamento in corso...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' records per pagina';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Pagina ' + pageFrom + ' di ' + pageTo + ' (' + totalRows + ' records)';
        },
        formatSearch: function () {
            return 'Cerca';
        },
        formatNoMatches: function () {
            return 'Nessun record trovato';
        },
        formatRefresh: function () {
            return 'Rinfrescare';
        },
        formatToggle: function () {
            return 'Alternare';
        },
        formatColumns: function () {
            return 'Colonne';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['it-IT']);

})(jQuery);

/**
 * Bootstrap Table Japanese translation
 * Author: Azamshul Azizy <azamshul@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['ja-JP'] = {
        formatLoadingMessage: function () {
            return '読み込み中です。少々お待ちください。';
        },
        formatRecordsPerPage: function (pageNumber) {
            return 'ページ当たり最大' + pageNumber + '件';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return '全' + totalRows + '件から、'+ pageFrom + 'から' + pageTo + '件目まで表示しています';
        },
        formatSearch: function () {
            return '検索';
        },
        formatNoMatches: function () {
            return '該当するレコードが見つかりません';
        },
        formatPaginationSwitch: function () {
            return 'ページ数を表示・非表示';
        },
        formatRefresh: function () {
            return '更新';
        },
        formatToggle: function () {
            return 'トグル';
        },
        formatColumns: function () {
            return '列';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['ja-JP']);

})(jQuery);
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

/**
 * Bootstrap Table Korean translation
 * Author: Yi Tae-Hyeong (jsonobject@gmail.com)
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['ko-KR'] = {
        formatLoadingMessage: function () {
            return '데이터를 불러오는 중입니다...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return '페이지 당 ' + pageNumber + '개 데이터 출력';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return '전체 ' + totalRows + '개 중 ' + pageFrom + '~' + pageTo + '번째 데이터 출력,';
        },
        formatSearch: function () {
            return '검색';
        },
        formatNoMatches: function () {
            return '조회된 데이터가 없습니다.';
        },
        formatRefresh: function () {
            return '새로 고침';
        },
        formatToggle: function () {
            return '전환';
        },
        formatColumns: function () {
            return '컬럼 필터링';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['ko-KR']);

})(jQuery);
/**
 * Bootstrap Table Malay translation
 * Author: Azamshul Azizy <azamshul@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['ms-MY'] = {
        formatLoadingMessage: function () {
            return 'Permintaan sedang dimuatkan. Sila tunggu sebentar...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' rekod setiap muka surat';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Sedang memaparkan rekod ' + pageFrom + ' hingga ' + pageTo + ' daripada jumlah ' + totalRows + ' rekod';
        },
        formatSearch: function () {
            return 'Cari';
        },
        formatNoMatches: function () {
            return 'Tiada rekod yang menyamai permintaan';
        },
        formatPaginationSwitch: function () {
            return 'Tunjuk/sembunyi muka surat';
        },
        formatRefresh: function () {
            return 'Muatsemula';
        },
        formatToggle: function () {
            return 'Tukar';
        },
        formatColumns: function () {
            return 'Lajur';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['ms-MY']);

})(jQuery);

/**
 * Bootstrap Table norwegian translation
 * Author: Jim Nordbø, jim@nordb.no
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['nb-NO'] = {
        formatLoadingMessage: function () {
            return 'Oppdaterer, vennligst vent...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' poster pr side';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Viser ' + pageFrom + ' til ' + pageTo + ' av ' + totalRows + ' rekker';
        },
        formatSearch: function () {
            return 'Søk';
        },
        formatNoMatches: function () {
            return 'Ingen poster funnet';
        },
        formatRefresh: function () {
            return 'Oppdater';
        },
        formatToggle: function () {
            return 'Endre';
        },
        formatColumns: function () {
            return 'Kolonner';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['nb-NO']);

})(jQuery);
/**
 * Bootstrap Table Dutch translation
 * Author: Your Name <info@a2hankes.nl>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['nl-NL'] = {
        formatLoadingMessage: function () {
            return 'Laden, even geduld...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' records per pagina';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Toon ' + pageFrom + ' tot ' + pageTo + ' van ' + totalRows + ' records';
        },
        formatSearch: function () {
            return 'Zoeken';
        },
        formatNoMatches: function () {
            return 'Geen resultaten gevonden';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['nl-NL']);

})(jQuery);

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

/**
 * Bootstrap Table Brazilian Portuguese Translation
 * Author: Eduardo Cerqueira<egcerqueira@gmail.com>
 * Update: João Mello<jmello@hotmail.com.br>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['pt-BR'] = {
        formatLoadingMessage: function () {
            return 'Carregando, aguarde...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' registros por página';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Exibindo ' + pageFrom + ' até ' + pageTo + ' de ' + totalRows + ' linhas';
        },
        formatSearch: function () { 
            return 'Pesquisar';
        },
        formatRefresh: function () { 
            return 'Recarregar';
        },
        formatToggle: function () { 
            return 'Alternar';
        },
        formatColumns: function () { 
            return 'Colunas';
        },
        formatPaginationSwitch: function () { 
            return 'Ocultar/Exibir paginação';
        },
        formatNoMatches: function () {
            return 'Nenhum registro encontrado';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['pt-BR']);

})(jQuery);

/**
 * Bootstrap Table Portuguese Portugal Translation
 * Author: Burnspirit<burnspirit@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['pt-PT'] = {
        formatLoadingMessage: function () {
            return 'A carregar, aguarde...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' registos por página';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'A mostrar ' + pageFrom + ' até ' + pageTo + ' de ' + totalRows + ' linhas';
        },
        formatSearch: function () {
            return 'Pesquisa';
        },
        formatNoMatches: function () {
            return 'Nenhum registo encontrado';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['pt-PT']);

})(jQuery);

/**
 * Bootstrap Table Romanian translation
 * Author: cristake <cristianiosif@me.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['ro-RO'] = {
        formatLoadingMessage: function () {
            return 'Se incarca, va rugam asteptati...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' inregistrari pe pagina';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Arata de la ' + pageFrom + ' pana la ' + pageTo + ' din ' + totalRows + ' randuri';
        },
        formatSearch: function () {
            return 'Cauta';
        },
        formatNoMatches: function () {
            return 'Nu au fost gasite inregistrari';
        },
        formatPaginationSwitch: function () {
            return 'Ascunde/Arata paginatia';
        },
        formatRefresh: function () {
            return 'Reincarca';
        },
        formatToggle: function () {
            return 'Comuta';
        },
        formatColumns: function () {
            return 'Coloane';
        },
        formatAllRows: function () {
            return 'Toate';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['ro-RO']);

})(jQuery);
/**
 * Bootstrap Table Russian translation
 * Author: Dunaevsky Maxim <dunmaksim@yandex.ru>
 */
(function ($) {
    'use strict';
    $.fn.bootstrapTable.locales['ru-RU'] = {
        formatLoadingMessage: function () {
            return 'Пожалуйста, подождите, идёт загрузка...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' записей на страницу';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Записи с ' + pageFrom + ' по ' + pageTo + ' из ' + totalRows;
        },
        formatSearch: function () {
            return 'Поиск';
        },
        formatNoMatches: function () {
            return 'Ничего не найдено';
        },
        formatRefresh: function () {
            return 'Обновить';
        },
        formatToggle: function () {
            return 'Переключить';
        },
        formatColumns: function () {
            return 'Колонки';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['ru-RU']);

})(jQuery);

/**
 * Bootstrap Table Slovak translation
 * Author: Jozef Dúc<jozef.d13@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['sk-SK'] = {
        formatLoadingMessage: function () {
            return 'Prosím čakajte ...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' záznamov na stranu';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Zobrazená ' + pageFrom + '. - ' + pageTo + '. položka z celkových ' + totalRows;
        },
        formatSearch: function () {
            return 'Vyhľadávanie';
        },
        formatNoMatches: function () {
            return 'Nenájdená žiadne vyhovujúca položka';
        },
        formatRefresh: function () {
            return 'Obnoviť';
        },
        formatToggle: function () {
            return 'Prepni';
        },
        formatColumns: function () {
            return 'Stĺpce';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['sk-SK']);

})(jQuery);
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

/**
 * Bootstrap Table Thai translation
 * Author: Monchai S.<monchais@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['th-TH'] = {
        formatLoadingMessage: function () {
            return 'กำลังโหลดข้อมูล, กรุณารอสักครู่...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' รายการต่อหน้า';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'รายการที่ ' + pageFrom + ' ถึง ' + pageTo + ' จากทั้งหมด ' + totalRows + ' รายการ';
        },
        formatSearch: function () {
            return 'ค้นหา';
        },
        formatNoMatches: function () {
            return 'ไม่พบรายการที่ค้นหา !';
        },
        formatRefresh: function () {
            return 'รีเฟรส';
        },
        formatToggle: function () {
            return 'สลับมุมมอง';
        },
        formatColumns: function () {
            return 'คอลัมน์';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['th-TH']);

})(jQuery);

/**
 * Bootstrap Table Turkish translation
 * Author: Emin Şen
 * Author: Sercan Cakir <srcnckr@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['tr-TR'] = {
        formatLoadingMessage: function () {
            return 'Yükleniyor, lütfen bekleyin...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return 'Sayfa başına ' + pageNumber + ' kayıt.';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return totalRows + ' kayıttan ' + pageFrom + '-' + pageTo + ' arası gösteriliyor.';
        },
        formatSearch: function () {
            return 'Ara';
        },
        formatNoMatches: function () {
            return 'Eşleşen kayıt bulunamadı.';
        },
        formatRefresh: function () {
            return 'Yenile';
        },
        formatToggle: function () {
            return 'Değiştir';
        },
        formatColumns: function () {
            return 'Sütunlar';
        },
        formatAllRows: function () {
            return 'Tüm Satırlar';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['tr-TR']);

})(jQuery);

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

/**
 * Bootstrap Table Urdu translation
 * Author: Malik <me@malikrizwan.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['ur-PK'] = {
        formatLoadingMessage: function () {
            return 'براۓ مہربانی انتظار کیجئے';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' ریکارڈز فی صفہ ';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'دیکھیں ' + pageFrom + ' سے ' + pageTo + ' کے ' +  totalRows + 'ریکارڈز';
        },
        formatSearch: function () {
            return 'تلاش';
        },
        formatNoMatches: function () {
            return 'کوئی ریکارڈ نہیں ملا';
        },
        formatRefresh: function () {
            return 'تازہ کریں';
        },
        formatToggle: function () {
            return 'تبدیل کریں';
        },
        formatColumns: function () {
            return 'کالم';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['ur-PK']);

})(jQuery);

/**
 * Bootstrap Table Vietnamese translation
 * Author: Duc N. PHAM <pngduc@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['vi-VN'] = {
        formatLoadingMessage: function () {
            return 'Đang tải...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' bản ghi mỗi trang';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Hiển thị từ trang ' + pageFrom + ' đến ' + pageTo + ' của ' + totalRows + ' bảng ghi';
        },
        formatSearch: function () {
            return 'Tìm kiếm';
        },
        formatNoMatches: function () {
            return 'Không có dữ liệu';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['vi-VN']);

})(jQuery);
/**
 * Bootstrap Table Chinese translation
 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['zh-CN'] = {
        formatLoadingMessage: function () {
            return '正在努力地加载数据中，请稍候……';
        },
        formatRecordsPerPage: function (pageNumber) {
            return '每页显示 ' + pageNumber + ' 条记录';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return '显示第 ' + pageFrom + ' 到第 ' + pageTo + ' 条记录，总共 ' + totalRows + ' 条记录';
        },
        formatSearch: function () {
            return '搜索';
        },
        formatNoMatches: function () {
            return '没有找到匹配的记录';
        },
        formatPaginationSwitch: function () {
            return '隐藏/显示分页';
        },
        formatRefresh: function () {
            return '刷新';
        },
        formatToggle: function () {
            return '切换';
        },
        formatColumns: function () {
            return '列';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

})(jQuery);
/**
 * Bootstrap Table Chinese translation
 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['zh-TW'] = {
        formatLoadingMessage: function () {
            return '正在努力地載入資料，請稍候……';
        },
        formatRecordsPerPage: function (pageNumber) {
            return '每頁顯示 ' + pageNumber + ' 項記錄';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return '顯示第 ' + pageFrom + ' 到第 ' + pageTo + ' 項記錄，總共 ' + totalRows + ' 項記錄';
        },
        formatSearch: function () {
            return '搜尋';
        },
        formatNoMatches: function () {
            return '沒有找符合的結果';
        },
        formatPaginationSwitch: function () {
            return '隱藏/顯示分頁';
        },
        formatRefresh: function () {
            return '刷新';
        },
        formatToggle: function () {
            return '切換';
        },
        formatColumns: function () {
            return '列';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-TW']);

})(jQuery);
