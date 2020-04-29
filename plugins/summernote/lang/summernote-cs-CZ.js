/*!
 * 
 * Super simple wysiwyg editor v0.8.16
 * https://summernote.org
 * 
 * 
 * Copyright 2013- Alan Hong. and other contributors
 * summernote may be freely distributed under the MIT license.
 * 
 * Date: 2020-02-19T09:12Z
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports) {

(function ($) {
  $.extend($.summernote.lang, {
    'cs-CZ': {
      font: {
        bold: 'Tučné',
        italic: 'Kurzíva',
        underline: 'Podtržené',
        clear: 'Odstranit styl písma',
        height: 'Výška řádku',
        strikethrough: 'Přeškrtnuté',
        size: 'Velikost písma'
      },
      image: {
        image: 'Obrázek',
        insert: 'Vložit obrázek',
        resizeFull: 'Původní velikost',
        resizeHalf: 'Poloviční velikost',
        resizeQuarter: 'Čtvrteční velikost',
        floatLeft: 'Umístit doleva',
        floatRight: 'Umístit doprava',
        floatNone: 'Neobtékat textem',
        shapeRounded: 'Shape: Rounded',
        shapeCircle: 'Shape: Circle',
        shapeThumbnail: 'Shape: Thumbnail',
        shapeNone: 'Shape: None',
        dragImageHere: 'Přetáhnout sem obrázek',
        dropImage: 'Drop image or Text',
        selectFromFiles: 'Vybrat soubor',
        url: 'URL obrázku',
        remove: 'Remove Image',
        original: 'Original'
      },
      video: {
        video: 'Video',
        videoLink: 'Odkaz videa',
        insert: 'Vložit video',
        url: 'URL videa?',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion nebo Youku)'
      },
      link: {
        link: 'Odkaz',
        insert: 'Vytvořit odkaz',
        unlink: 'Zrušit odkaz',
        edit: 'Upravit',
        textToDisplay: 'Zobrazovaný text',
        url: 'Na jaké URL má tento odkaz vést?',
        openInNewWindow: 'Otevřít v novém okně'
      },
      table: {
        table: 'Tabulka',
        addRowAbove: 'Add row above',
        addRowBelow: 'Add row below',
        addColLeft: 'Add column left',
        addColRight: 'Add column right',
        delRow: 'Delete row',
        delCol: 'Delete column',
        delTable: 'Delete table'
      },
      hr: {
        insert: 'Vložit vodorovnou čáru'
      },
      style: {
        style: 'Styl',
        p: 'Normální',
        blockquote: 'Citace',
        pre: 'Kód',
        h1: 'Nadpis 1',
        h2: 'Nadpis 2',
        h3: 'Nadpis 3',
        h4: 'Nadpis 4',
        h5: 'Nadpis 5',
        h6: 'Nadpis 6'
      },
      lists: {
        unordered: 'Odrážkový seznam',
        ordered: 'Číselný seznam'
      },
      options: {
        help: 'Nápověda',
        fullscreen: 'Celá obrazovka',
        codeview: 'HTML kód'
      },
      paragraph: {
        paragraph: 'Odstavec',
        outdent: 'Zvětšit odsazení',
        indent: 'Zmenšit odsazení',
        left: 'Zarovnat doleva',
        center: 'Zarovnat na střed',
        right: 'Zarovnat doprava',
        justify: 'Zarovnat oboustranně'
      },
      color: {
        recent: 'Aktuální barva',
        more: 'Další barvy',
        background: 'Barva pozadí',
        foreground: 'Barva písma',
        transparent: 'Průhlednost',
        setTransparent: 'Nastavit průhlednost',
        reset: 'Obnovit',
        resetToDefault: 'Obnovit výchozí',
        cpSelect: 'Vybrat'
      },
      shortcut: {
        shortcuts: 'Klávesové zkratky',
        close: 'Zavřít',
        textFormatting: 'Formátování textu',
        action: 'Akce',
        paragraphFormatting: 'Formátování odstavce',
        documentStyle: 'Styl dokumentu'
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
        undo: 'Krok vzad',
        redo: 'Krok vpřed'
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