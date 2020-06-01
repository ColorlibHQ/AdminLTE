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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 25:
/***/ (function(module, exports) {

(function ($) {
  $.extend($.summernote.lang, {
    'it-IT': {
      font: {
        bold: 'Testo in grassetto',
        italic: 'Testo in corsivo',
        underline: 'Testo sottolineato',
        clear: 'Elimina la formattazione del testo',
        height: 'Altezza della linea di testo',
        name: 'Famiglia Font',
        strikethrough: 'Testo barrato',
        subscript: 'Subscript',
        superscript: 'Superscript',
        size: 'Dimensione del carattere'
      },
      image: {
        image: 'Immagine',
        insert: 'Inserisci Immagine',
        resizeFull: 'Dimensioni originali',
        resizeHalf: 'Ridimensiona al 50%',
        resizeQuarter: 'Ridimensiona al 25%',
        floatLeft: 'Posiziona a sinistra',
        floatRight: 'Posiziona a destra',
        floatNone: 'Nessun posizionamento',
        shapeRounded: 'Shape: Rounded',
        shapeCircle: 'Shape: Circle',
        shapeThumbnail: 'Shape: Thumbnail',
        shapeNone: 'Shape: None',
        dragImageHere: 'Trascina qui un\'immagine',
        dropImage: 'Drop image or Text',
        selectFromFiles: 'Scegli dai Documenti',
        maximumFileSize: 'Maximum file size',
        maximumFileSizeError: 'Maximum file size exceeded.',
        url: 'URL dell\'immagine',
        remove: 'Rimuovi immagine',
        original: 'Original'
      },
      video: {
        video: 'Video',
        videoLink: 'Collegamento ad un Video',
        insert: 'Inserisci Video',
        url: 'URL del Video',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion o Youku)'
      },
      link: {
        link: 'Collegamento',
        insert: 'Inserisci Collegamento',
        unlink: 'Elimina collegamento',
        edit: 'Modifica collegamento',
        textToDisplay: 'Testo del collegamento',
        url: 'URL del collegamento',
        openInNewWindow: 'Apri in una nuova finestra'
      },
      table: {
        table: 'Tabella',
        addRowAbove: 'Add row above',
        addRowBelow: 'Add row below',
        addColLeft: 'Add column left',
        addColRight: 'Add column right',
        delRow: 'Delete row',
        delCol: 'Delete column',
        delTable: 'Delete table'
      },
      hr: {
        insert: 'Inserisce una linea di separazione'
      },
      style: {
        style: 'Stili',
        p: 'pe',
        blockquote: 'Citazione',
        pre: 'Codice',
        h1: 'Titolo 1',
        h2: 'Titolo 2',
        h3: 'Titolo 3',
        h4: 'Titolo 4',
        h5: 'Titolo 5',
        h6: 'Titolo 6'
      },
      lists: {
        unordered: 'Elenco non ordinato',
        ordered: 'Elenco ordinato'
      },
      options: {
        help: 'Aiuto',
        fullscreen: 'Modalità a tutto schermo',
        codeview: 'Visualizza codice'
      },
      paragraph: {
        paragraph: 'Paragrafo',
        outdent: 'Diminuisce il livello di rientro',
        indent: 'Aumenta il livello di rientro',
        left: 'Allinea a sinistra',
        center: 'Centra',
        right: 'Allinea a destra',
        justify: 'Giustifica (allinea a destra e sinistra)'
      },
      color: {
        recent: 'Ultimo colore utilizzato',
        more: 'Altri colori',
        background: 'Colore di sfondo',
        foreground: 'Colore',
        transparent: 'Trasparente',
        setTransparent: 'Trasparente',
        reset: 'Reimposta',
        resetToDefault: 'Reimposta i colori'
      },
      shortcut: {
        shortcuts: 'Scorciatoie da tastiera',
        close: 'Chiudi',
        textFormatting: 'Formattazione testo',
        action: 'Azioni',
        paragraphFormatting: 'Formattazione paragrafo',
        documentStyle: 'Stili',
        extraKeys: 'Extra keys'
      },
      help: {
        'insertParagraph': 'Insert Paragraph',
        'undo': 'Undoes the last command',
        'redo': 'Redoes the last command',
        'tab': 'Tab',
        'untab': 'Untab',
        'bold': 'Set a bold style',
        'italic': 'Set a italic style',
        'underline': 'Set a underline style',
        'strikethrough': 'Set a strikethrough style',
        'removeFormat': 'Clean a style',
        'justifyLeft': 'Set left align',
        'justifyCenter': 'Set center align',
        'justifyRight': 'Set right align',
        'justifyFull': 'Set full align',
        'insertUnorderedList': 'Toggle unordered list',
        'insertOrderedList': 'Toggle ordered list',
        'outdent': 'Outdent on current paragraph',
        'indent': 'Indent on current paragraph',
        'formatPara': 'Change current block\'s format as a paragraph(P tag)',
        'formatH1': 'Change current block\'s format as H1',
        'formatH2': 'Change current block\'s format as H2',
        'formatH3': 'Change current block\'s format as H3',
        'formatH4': 'Change current block\'s format as H4',
        'formatH5': 'Change current block\'s format as H5',
        'formatH6': 'Change current block\'s format as H6',
        'insertHorizontalRule': 'Insert horizontal rule',
        'linkDialog.show': 'Show Link Dialog'
      },
      history: {
        undo: 'Annulla',
        redo: 'Ripristina'
      },
      specialChar: {
        specialChar: 'SPECIAL CHARACTERS',
        select: 'Select Special characters'
      }
    }
  });
})(jQuery);

/***/ })

/******/ });
});