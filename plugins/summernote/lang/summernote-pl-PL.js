/*!
 * 
 * Super simple WYSIWYG editor v0.8.20
 * https://summernote.org
 *
 *
 * Copyright 2013- Alan Hong and contributors
 * Summernote may be freely distributed under the MIT license.
 *
 * Date: 2021-10-14T21:15Z
 *
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
(function ($) {
  $.extend($.summernote.lang, {
    'pl-PL': {
      font: {
        bold: 'Pogrubienie',
        italic: 'Pochylenie',
        underline: 'Podkreślenie',
        clear: 'Usuń formatowanie',
        height: 'Interlinia',
        name: 'Czcionka',
        strikethrough: 'Przekreślenie',
        subscript: 'Indeks dolny',
        superscript: 'Indeks górny',
        size: 'Rozmiar'
      },
      image: {
        image: 'Grafika',
        insert: 'Wstaw grafikę',
        resizeFull: 'Zmień rozmiar na 100%',
        resizeHalf: 'Zmień rozmiar na 50%',
        resizeQuarter: 'Zmień rozmiar na 25%',
        floatLeft: 'Po lewej',
        floatRight: 'Po prawej',
        floatNone: 'Równo z tekstem',
        shapeRounded: 'Kształt: zaokrąglone',
        shapeCircle: 'Kształt: okrąg',
        shapeThumbnail: 'Kształt: miniatura',
        shapeNone: 'Kształt: brak',
        dragImageHere: 'Przeciągnij grafikę lub tekst tutaj',
        dropImage: 'Przeciągnij grafikę lub tekst',
        selectFromFiles: 'Wybierz z dysku',
        maximumFileSize: 'Limit wielkości pliku',
        maximumFileSizeError: 'Przekroczono limit wielkości pliku.',
        url: 'Adres URL grafiki',
        remove: 'Usuń grafikę',
        original: 'Oryginał'
      },
      video: {
        video: 'Wideo',
        videoLink: 'Adres wideo',
        insert: 'Wstaw wideo',
        url: 'Adres wideo',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion lub Youku)'
      },
      link: {
        link: 'Odnośnik',
        insert: 'Wstaw odnośnik',
        unlink: 'Usuń odnośnik',
        edit: 'Edytuj',
        textToDisplay: 'Tekst do wyświetlenia',
        url: 'Na jaki adres URL powinien przenosić ten odnośnik?',
        openInNewWindow: 'Otwórz w nowym oknie'
      },
      table: {
        table: 'Tabela',
        addRowAbove: 'Dodaj wiersz powyżej',
        addRowBelow: 'Dodaj wiersz poniżej',
        addColLeft: 'Dodaj kolumnę po lewej',
        addColRight: 'Dodaj kolumnę po prawej',
        delRow: 'Usuń wiersz',
        delCol: 'Usuń kolumnę',
        delTable: 'Usuń tabelę'
      },
      hr: {
        insert: 'Wstaw poziomą linię'
      },
      style: {
        style: 'Styl',
        p: 'pny',
        blockquote: 'Cytat',
        pre: 'Kod',
        h1: 'Nagłówek 1',
        h2: 'Nagłówek 2',
        h3: 'Nagłówek 3',
        h4: 'Nagłówek 4',
        h5: 'Nagłówek 5',
        h6: 'Nagłówek 6'
      },
      lists: {
        unordered: 'Lista wypunktowana',
        ordered: 'Lista numerowana'
      },
      options: {
        help: 'Pomoc',
        fullscreen: 'Pełny ekran',
        codeview: 'Źródło'
      },
      paragraph: {
        paragraph: 'Akapit',
        outdent: 'Zmniejsz wcięcie',
        indent: 'Zwiększ wcięcie',
        left: 'Wyrównaj do lewej',
        center: 'Wyrównaj do środka',
        right: 'Wyrównaj do prawej',
        justify: 'Wyrównaj do lewej i prawej'
      },
      color: {
        recent: 'Ostani kolor',
        more: 'Więcej kolorów',
        background: 'Tło',
        foreground: 'Czcionka',
        transparent: 'Przeźroczysty',
        setTransparent: 'Przeźroczyste',
        reset: 'Zresetuj',
        resetToDefault: 'Domyślne'
      },
      shortcut: {
        shortcuts: 'Skróty klawiaturowe',
        close: 'Zamknij',
        textFormatting: 'Formatowanie tekstu',
        action: 'Akcja',
        paragraphFormatting: 'Formatowanie akapitu',
        documentStyle: 'Styl dokumentu',
        extraKeys: 'Dodatkowe klawisze'
      },
      help: {
        'insertParagraph': 'Wstaw paragraf',
        'undo': 'Cofnij poprzednią operację',
        'redo': 'Przywróć poprzednią operację',
        'tab': 'Tabulacja',
        'untab': 'Usuń tabulację',
        'bold': 'Pogrubienie',
        'italic': 'Kursywa',
        'underline': 'Podkreślenie',
        'strikethrough': 'Przekreślenie',
        'removeFormat': 'Usuń formatowanie',
        'justifyLeft': 'Wyrównaj do lewej',
        'justifyCenter': 'Wyrównaj do środka',
        'justifyRight': 'Wyrównaj do prawej',
        'justifyFull': 'Justyfikacja',
        'insertUnorderedList': 'Nienumerowana lista',
        'insertOrderedList': 'Wypunktowana lista',
        'outdent': 'Zmniejsz wcięcie paragrafu',
        'indent': 'Zwiększ wcięcie paragrafu',
        'formatPara': 'Zamień format bloku na paragraf (tag P)',
        'formatH1': 'Zamień format bloku na H1',
        'formatH2': 'Zamień format bloku na H2',
        'formatH3': 'Zamień format bloku na H3',
        'formatH4': 'Zamień format bloku na H4',
        'formatH5': 'Zamień format bloku na H5',
        'formatH6': 'Zamień format bloku na H6',
        'insertHorizontalRule': 'Wstaw poziomą linię',
        'linkDialog.show': 'Pokaż dialog linkowania'
      },
      history: {
        undo: 'Cofnij',
        redo: 'Ponów'
      },
      specialChar: {
        specialChar: 'ZNAKI SPECJALNE',
        select: 'Wybierz Znak specjalny'
      }
    }
  });
})(jQuery);
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=summernote-pl-PL.js.map