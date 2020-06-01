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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ({

/***/ 32:
/***/ (function(module, exports) {

(function ($) {
  $.extend($.summernote.lang, {
    'nl-NL': {
      font: {
        bold: 'Vet',
        italic: 'Cursief',
        underline: 'Onderstrepen',
        clear: 'Stijl verwijderen',
        height: 'Regelhoogte',
        name: 'Lettertype',
        strikethrough: 'Doorhalen',
        subscript: 'Subscript',
        superscript: 'Superscript',
        size: 'Tekstgrootte'
      },
      image: {
        image: 'Afbeelding',
        insert: 'Afbeelding invoegen',
        resizeFull: 'Volledige breedte',
        resizeHalf: 'Halve breedte',
        resizeQuarter: 'Kwart breedte',
        floatLeft: 'Links uitlijnen',
        floatRight: 'Rechts uitlijnen',
        floatNone: 'Geen uitlijning',
        shapeRounded: 'Shape: Rounded',
        shapeCircle: 'Shape: Circle',
        shapeThumbnail: 'Shape: Thumbnail',
        shapeNone: 'Shape: None',
        dragImageHere: 'Sleep hier een afbeelding naar toe',
        dropImage: 'Drop image or Text',
        selectFromFiles: 'Selecteer een bestand',
        maximumFileSize: 'Maximum file size',
        maximumFileSizeError: 'Maximum file size exceeded.',
        url: 'URL van de afbeelding',
        remove: 'Verwijder afbeelding',
        original: 'Original'
      },
      video: {
        video: 'Video',
        videoLink: 'Video link',
        insert: 'Video invoegen',
        url: 'URL van de video',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion of Youku)'
      },
      link: {
        link: 'Link',
        insert: 'Link invoegen',
        unlink: 'Link verwijderen',
        edit: 'Wijzigen',
        textToDisplay: 'Tekst van link',
        url: 'Naar welke URL moet deze link verwijzen?',
        openInNewWindow: 'Open in nieuw venster'
      },
      table: {
        table: 'Tabel',
        addRowAbove: 'Rij hierboven invoegen',
        addRowBelow: 'Rij hieronder invoegen',
        addColLeft: 'Kolom links toevoegen',
        addColRight: 'Kolom rechts toevoegen',
        delRow: 'Verwijder rij',
        delCol: 'Verwijder kolom',
        delTable: 'Verwijder tabel'
      },
      hr: {
        insert: 'Horizontale lijn invoegen'
      },
      style: {
        style: 'Stijl',
        p: 'Normaal',
        blockquote: 'Quote',
        pre: 'Code',
        h1: 'Kop 1',
        h2: 'Kop 2',
        h3: 'Kop 3',
        h4: 'Kop 4',
        h5: 'Kop 5',
        h6: 'Kop 6'
      },
      lists: {
        unordered: 'Ongeordende lijst',
        ordered: 'Geordende lijst'
      },
      options: {
        help: 'Help',
        fullscreen: 'Volledig scherm',
        codeview: 'Bekijk Code'
      },
      paragraph: {
        paragraph: 'Paragraaf',
        outdent: 'Inspringen verkleinen',
        indent: 'Inspringen vergroten',
        left: 'Links uitlijnen',
        center: 'Centreren',
        right: 'Rechts uitlijnen',
        justify: 'Uitvullen'
      },
      color: {
        recent: 'Recente kleur',
        more: 'Meer kleuren',
        background: 'Achtergrond kleur',
        foreground: 'Tekst kleur',
        transparent: 'Transparant',
        setTransparent: 'Transparant',
        reset: 'Standaard',
        resetToDefault: 'Standaard kleur'
      },
      shortcut: {
        shortcuts: 'Toetsencombinaties',
        close: 'sluiten',
        textFormatting: 'Tekststijlen',
        action: 'Acties',
        paragraphFormatting: 'Paragraafstijlen',
        documentStyle: 'Documentstijlen',
        extraKeys: 'Extra keys'
      },
      help: {
        'insertParagraph': 'Alinea invoegen',
        'undo': 'Laatste handeling ongedaan maken',
        'redo': 'Laatste handeling opnieuw uitvoeren',
        'tab': 'Tab',
        'untab': 'Herstel tab',
        'bold': 'Stel stijl in als vet',
        'italic': 'Stel stijl in als cursief',
        'underline': 'Stel stijl in als onderstreept',
        'strikethrough': 'Stel stijl in als doorgestreept',
        'removeFormat': 'Verwijder stijl',
        'justifyLeft': 'Lijn links uit',
        'justifyCenter': 'Set center align',
        'justifyRight': 'Lijn rechts uit',
        'justifyFull': 'Lijn uit op volledige breedte',
        'insertUnorderedList': 'Zet ongeordende lijstweergave aan',
        'insertOrderedList': 'Zet geordende lijstweergave aan',
        'outdent': 'Verwijder inspringing huidige alinea',
        'indent': 'Inspringen op huidige alinea',
        'formatPara': 'Wijzig formattering huidig blok in alinea(P tag)',
        'formatH1': 'Formatteer huidig blok als H1',
        'formatH2': 'Formatteer huidig blok als H2',
        'formatH3': 'Formatteer huidig blok als H3',
        'formatH4': 'Formatteer huidig blok als H4',
        'formatH5': 'Formatteer huidig blok als H5',
        'formatH6': 'Formatteer huidig blok als H6',
        'insertHorizontalRule': 'Invoegen horizontale lijn',
        'linkDialog.show': 'Toon Link Dialoogvenster'
      },
      history: {
        undo: 'Ongedaan maken',
        redo: 'Opnieuw doorvoeren'
      },
      specialChar: {
        specialChar: 'SPECIALE TEKENS',
        select: 'Selecteer Speciale Tekens'
      }
    }
  });
})(jQuery);

/***/ })

/******/ });
});