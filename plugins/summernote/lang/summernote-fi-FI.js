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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
/***/ (function(module, exports) {

(function ($) {
  $.extend($.summernote.lang, {
    'fi-FI': {
      font: {
        bold: 'Lihavointi',
        italic: 'Kursivointi',
        underline: 'Alleviivaus',
        clear: 'Tyhjennä muotoilu',
        height: 'Riviväli',
        name: 'Kirjasintyyppi',
        strikethrough: 'Yliviivaus',
        subscript: 'Alaindeksi',
        superscript: 'Yläindeksi',
        size: 'Kirjasinkoko'
      },
      image: {
        image: 'Kuva',
        insert: 'Lisää kuva',
        resizeFull: 'Koko leveys',
        resizeHalf: 'Puolikas leveys',
        resizeQuarter: 'Neljäsosa leveys',
        floatLeft: 'Sijoita vasemmalle',
        floatRight: 'Sijoita oikealle',
        floatNone: 'Ei sijoitusta',
        shapeRounded: 'Muoto: Pyöristetty',
        shapeCircle: 'Muoto: Ympyrä',
        shapeThumbnail: 'Muoto: Esikatselukuva',
        shapeNone: 'Muoto: Ei muotoilua',
        dragImageHere: 'Vedä kuva tähän',
        selectFromFiles: 'Valitse tiedostoista',
        maximumFileSize: 'Maksimi tiedosto koko',
        maximumFileSizeError: 'Maksimi tiedosto koko ylitetty.',
        url: 'URL-osoitteen mukaan',
        remove: 'Poista kuva',
        original: 'Alkuperäinen'
      },
      video: {
        video: 'Video',
        videoLink: 'Linkki videoon',
        insert: 'Lisää video',
        url: 'Videon URL-osoite',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion tai Youku)'
      },
      link: {
        link: 'Linkki',
        insert: 'Lisää linkki',
        unlink: 'Poista linkki',
        edit: 'Muokkaa',
        textToDisplay: 'Näytettävä teksti',
        url: 'Linkin URL-osoite',
        openInNewWindow: 'Avaa uudessa ikkunassa'
      },
      table: {
        table: 'Taulukko',
        addRowAbove: 'Lisää rivi yläpuolelle',
        addRowBelow: 'Lisää rivi alapuolelle',
        addColLeft: 'Lisää sarake vasemmalle puolelle',
        addColRight: 'Lisää sarake oikealle puolelle',
        delRow: 'Poista rivi',
        delCol: 'Poista sarake',
        delTable: 'Poista taulukko'
      },
      hr: {
        insert: 'Lisää vaakaviiva'
      },
      style: {
        style: 'Tyyli',
        p: 'Normaali',
        blockquote: 'Lainaus',
        pre: 'Koodi',
        h1: 'Otsikko 1',
        h2: 'Otsikko 2',
        h3: 'Otsikko 3',
        h4: 'Otsikko 4',
        h5: 'Otsikko 5',
        h6: 'Otsikko 6'
      },
      lists: {
        unordered: 'Luettelomerkitty luettelo',
        ordered: 'Numeroitu luettelo'
      },
      options: {
        help: 'Ohje',
        fullscreen: 'Koko näyttö',
        codeview: 'HTML-näkymä'
      },
      paragraph: {
        paragraph: 'Kappale',
        outdent: 'Pienennä sisennystä',
        indent: 'Suurenna sisennystä',
        left: 'Tasaa vasemmalle',
        center: 'Keskitä',
        right: 'Tasaa oikealle',
        justify: 'Tasaa'
      },
      color: {
        recent: 'Viimeisin väri',
        more: 'Lisää värejä',
        background: 'Korostusväri',
        foreground: 'Tekstin väri',
        transparent: 'Läpinäkyvä',
        setTransparent: 'Aseta läpinäkyväksi',
        reset: 'Palauta',
        resetToDefault: 'Palauta oletusarvoksi'
      },
      shortcut: {
        shortcuts: 'Pikanäppäimet',
        close: 'Sulje',
        textFormatting: 'Tekstin muotoilu',
        action: 'Toiminto',
        paragraphFormatting: 'Kappaleen muotoilu',
        documentStyle: 'Asiakirjan tyyli'
      },
      help: {
        'insertParagraph': 'Lisää kappale',
        'undo': 'Kumoa viimeisin komento',
        'redo': 'Tee uudelleen kumottu komento',
        'tab': 'Sarkain',
        'untab': 'Sarkainmerkin poisto',
        'bold': 'Lihavointi',
        'italic': 'Kursiivi',
        'underline': 'Alleviivaus',
        'strikethrough': 'Yliviivaus',
        'removeFormat': 'Poista asetetut tyylit',
        'justifyLeft': 'Tasaa vasemmalle',
        'justifyCenter': 'Keskitä',
        'justifyRight': 'Tasaa oikealle',
        'justifyFull': 'Tasaa',
        'insertUnorderedList': 'Luettelomerkillä varustettu lista',
        'insertOrderedList': 'Numeroitu lista',
        'outdent': 'Pienennä sisennystä',
        'indent': 'Suurenna sisennystä',
        'formatPara': 'Muuta kappaleen formaatti p',
        'formatH1': 'Muuta kappaleen formaatti H1',
        'formatH2': 'Muuta kappaleen formaatti H2',
        'formatH3': 'Muuta kappaleen formaatti H3',
        'formatH4': 'Muuta kappaleen formaatti H4',
        'formatH5': 'Muuta kappaleen formaatti H5',
        'formatH6': 'Muuta kappaleen formaatti H6',
        'insertHorizontalRule': 'Lisää vaakaviiva',
        'linkDialog.show': 'Lisää linkki'
      },
      history: {
        undo: 'Kumoa',
        redo: 'Toista'
      },
      specialChar: {
        specialChar: 'ERIKOISMERKIT',
        select: 'Valitse erikoismerkit'
      }
    }
  });
})(jQuery);

/***/ })

/******/ });
});