/*!
 * 
 * Super simple wysiwyg editor v0.8.18
 * https://summernote.org
 * 
 * 
 * Copyright 2013- Alan Hong. and other contributors
 * summernote may be freely distributed under the MIT license.
 * 
 * Date: 2020-05-20T16:47Z
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
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports) {

(function ($) {
  $.extend($.summernote.lang, {
    'de-DE': {
      font: {
        bold: 'Fett',
        italic: 'Kursiv',
        underline: 'Unterstreichen',
        clear: 'Zurücksetzen',
        height: 'Zeilenhöhe',
        name: 'Schriftart',
        strikethrough: 'Durchgestrichen',
        subscript: 'Tiefgestellt',
        superscript: 'Hochgestellt',
        size: 'Schriftgröße'
      },
      image: {
        image: 'Bild',
        insert: 'Bild einfügen',
        resizeFull: 'Originalgröße',
        resizeHalf: '1/2 Größe',
        resizeQuarter: '1/4 Größe',
        floatLeft: 'Linksbündig',
        floatRight: 'Rechtsbündig',
        floatNone: 'Kein Textfluss',
        shapeRounded: 'Abgerundeter Rahmen',
        shapeCircle: 'Kreisförmiger Rahmen',
        shapeThumbnail: 'Rahmenvorschau',
        shapeNone: 'Kein Rahmen',
        dragImageHere: 'Bild hierher ziehen',
        dropImage: 'Bild oder Text nehmen',
        selectFromFiles: 'Datei auswählen',
        maximumFileSize: 'Maximale Dateigröße',
        maximumFileSizeError: 'Maximale Dateigröße überschritten',
        url: 'Bild URL',
        remove: 'Bild entfernen',
        original: 'Original'
      },
      video: {
        video: 'Video',
        videoLink: 'Videolink',
        insert: 'Video einfügen',
        url: 'Video URL',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion oder Youku)'
      },
      link: {
        link: 'Link',
        insert: 'Link einfügen',
        unlink: 'Link entfernen',
        edit: 'Bearbeiten',
        textToDisplay: 'Anzeigetext',
        url: 'Link URL',
        openInNewWindow: 'In neuem Fenster öffnen'
      },
      table: {
        table: 'Tabelle',
        addRowAbove: '+ Zeile oberhalb',
        addRowBelow: '+ Zeile unterhalb',
        addColLeft: '+ Spalte links',
        addColRight: '+ Spalte rechts',
        delRow: 'Reihe löschen',
        delCol: 'Spalte löschen',
        delTable: 'Tabelle löschen'
      },
      hr: {
        insert: 'Horizontale Linie einfügen'
      },
      style: {
        style: 'Stil',
        normal: 'Normal',
        p: 'Normal',
        blockquote: 'Zitat',
        pre: 'Quellcode',
        h1: 'Überschrift 1',
        h2: 'Überschrift 2',
        h3: 'Überschrift 3',
        h4: 'Überschrift 4',
        h5: 'Überschrift 5',
        h6: 'Überschrift 6'
      },
      lists: {
        unordered: 'Unnummerierte Liste',
        ordered: 'Nummerierte Liste'
      },
      options: {
        help: 'Hilfe',
        fullscreen: 'Vollbild',
        codeview: 'Quellcode anzeigen'
      },
      paragraph: {
        paragraph: 'Absatz',
        outdent: 'Einzug verkleinern',
        indent: 'Einzug vergrößern',
        left: 'Links ausrichten',
        center: 'Zentriert ausrichten',
        right: 'Rechts ausrichten',
        justify: 'Blocksatz'
      },
      color: {
        recent: 'Letzte Farbe',
        more: 'Weitere Farben',
        background: 'Hintergrundfarbe',
        foreground: 'Schriftfarbe',
        transparent: 'Transparenz',
        setTransparent: 'Transparenz setzen',
        reset: 'Zurücksetzen',
        resetToDefault: 'Auf Standard zurücksetzen'
      },
      shortcut: {
        shortcuts: 'Tastenkürzel',
        close: 'Schließen',
        textFormatting: 'Textformatierung',
        action: 'Aktion',
        paragraphFormatting: 'Absatzformatierung',
        documentStyle: 'Dokumentenstil',
        extraKeys: 'Weitere Tasten'
      },
      help: {
        'insertParagraph': 'Absatz einfügen',
        'undo': 'Letzte Anweisung rückgängig',
        'redo': 'Letzte Anweisung wiederholen',
        'tab': 'Einzug hinzufügen',
        'untab': 'Einzug entfernen',
        'bold': 'Schrift Fett',
        'italic': 'Schrift Kursiv',
        'underline': 'Unterstreichen',
        'strikethrough': 'Durchstreichen',
        'removeFormat': 'Entfernt Format',
        'justifyLeft': 'Linksbündig',
        'justifyCenter': 'Mittig',
        'justifyRight': 'Rechtsbündig',
        'justifyFull': 'Blocksatz',
        'insertUnorderedList': 'Unnummerierte Liste',
        'insertOrderedList': 'Nummerierte Liste',
        'outdent': 'Aktuellen Absatz ausrücken',
        'indent': 'Aktuellen Absatz einrücken',
        'formatPara': 'Formatiert aktuellen Block als Absatz (P-Tag)',
        'formatH1': 'Formatiert aktuellen Block als H1',
        'formatH2': 'Formatiert aktuellen Block als H2',
        'formatH3': 'Formatiert aktuellen Block als H3',
        'formatH4': 'Formatiert aktuellen Block als H4',
        'formatH5': 'Formatiert aktuellen Block als H5',
        'formatH6': 'Formatiert aktuellen Block als H6',
        'insertHorizontalRule': 'Fügt eine horizontale Linie ein',
        'linkDialog.show': 'Zeigt Linkdialog'
      },
      history: {
        undo: 'Rückgängig',
        redo: 'Wiederholen'
      },
      specialChar: {
        specialChar: 'Sonderzeichen',
        select: 'Zeichen auswählen'
      }
    }
  });
})(jQuery);

/***/ })

/******/ });
});