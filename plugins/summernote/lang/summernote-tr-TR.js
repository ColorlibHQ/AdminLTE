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
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ({

/***/ 45:
/***/ (function(module, exports) {

(function ($) {
  $.extend($.summernote.lang, {
    'tr-TR': {
      font: {
        bold: 'Kalın',
        italic: 'İtalik',
        underline: 'Altı çizili',
        clear: 'Temizle',
        height: 'Satır yüksekliği',
        name: 'Yazı Tipi',
        strikethrough: 'Üstü çizili',
        subscript: 'Alt Simge',
        superscript: 'Üst Simge',
        size: 'Yazı tipi boyutu'
      },
      image: {
        image: 'Resim',
        insert: 'Resim ekle',
        resizeFull: 'Orjinal boyut',
        resizeHalf: '1/2 boyut',
        resizeQuarter: '1/4 boyut',
        floatLeft: 'Sola hizala',
        floatRight: 'Sağa hizala',
        floatNone: 'Hizalamayı kaldır',
        shapeRounded: 'Şekil: Yuvarlatılmış Köşe',
        shapeCircle: 'Şekil: Daire',
        shapeThumbnail: 'Şekil: K.Resim',
        shapeNone: 'Şekil: Yok',
        dragImageHere: 'Buraya sürükleyin',
        dropImage: 'Resim veya metni bırakın',
        selectFromFiles: 'Dosya seçin',
        maximumFileSize: 'Maksimum dosya boyutu',
        maximumFileSizeError: 'Maksimum dosya boyutu aşıldı.',
        url: 'Resim bağlantısı',
        remove: 'Resimi Kaldır',
        original: 'Original'
      },
      video: {
        video: 'Video',
        videoLink: 'Video bağlantısı',
        insert: 'Video ekle',
        url: 'Video bağlantısı?',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion veya Youku)'
      },
      link: {
        link: 'Bağlantı',
        insert: 'Bağlantı ekle',
        unlink: 'Bağlantıyı kaldır',
        edit: 'Bağlantıyı düzenle',
        textToDisplay: 'Görüntülemek için',
        url: 'Bağlantı adresi?',
        openInNewWindow: 'Yeni pencerede aç'
      },
      table: {
        table: 'Tablo',
        addRowAbove: 'Yukarı satır ekle',
        addRowBelow: 'Aşağı satır ekle',
        addColLeft: 'Sola sütun ekle',
        addColRight: 'Sağa sütun ekle',
        delRow: 'Satırı sil',
        delCol: 'Sütunu sil',
        delTable: 'Tabloyu sil'
      },
      hr: {
        insert: 'Yatay çizgi ekle'
      },
      style: {
        style: 'Biçim',
        p: 'p',
        blockquote: 'Alıntı',
        pre: 'Önbiçimli',
        h1: 'Başlık 1',
        h2: 'Başlık 2',
        h3: 'Başlık 3',
        h4: 'Başlık 4',
        h5: 'Başlık 5',
        h6: 'Başlık 6'
      },
      lists: {
        unordered: 'Madde işaretli liste',
        ordered: 'Numaralı liste'
      },
      options: {
        help: 'Yardım',
        fullscreen: 'Tam ekran',
        codeview: 'HTML Kodu'
      },
      paragraph: {
        paragraph: 'Paragraf',
        outdent: 'Girintiyi artır',
        indent: 'Girintiyi azalt',
        left: 'Sola hizala',
        center: 'Ortaya hizala',
        right: 'Sağa hizala',
        justify: 'Yasla'
      },
      color: {
        recent: 'Son renk',
        more: 'Daha fazla renk',
        background: 'Arka plan rengi',
        foreground: 'Yazı rengi',
        transparent: 'Seffaflık',
        setTransparent: 'Şeffaflığı ayarla',
        reset: 'Sıfırla',
        resetToDefault: 'Varsayılanlara sıfırla'
      },
      shortcut: {
        shortcuts: 'Kısayollar',
        close: 'Kapat',
        textFormatting: 'Yazı biçimlendirme',
        action: 'Eylem',
        paragraphFormatting: 'Paragraf biçimlendirme',
        documentStyle: 'Biçim',
        extraKeys: 'İlave anahtarlar'
      },
      help: {
        'insertParagraph': 'Paragraf ekler',
        'undo': 'Son komudu geri alır',
        'redo': 'Son komudu yineler',
        'tab': 'Girintiyi artırır',
        'untab': 'Girintiyi azaltır',
        'bold': 'Kalın yazma stilini ayarlar',
        'italic': 'İtalik yazma stilini ayarlar',
        'underline': 'Altı çizgili yazma stilini ayarlar',
        'strikethrough': 'Üstü çizgili yazma stilini ayarlar',
        'removeFormat': 'Biçimlendirmeyi temizler',
        'justifyLeft': 'Yazıyı sola hizalar',
        'justifyCenter': 'Yazıyı ortalar',
        'justifyRight': 'Yazıyı sağa hizalar',
        'justifyFull': 'Yazıyı her iki tarafa yazlar',
        'insertUnorderedList': 'Madde işaretli liste ekler',
        'insertOrderedList': 'Numaralı liste ekler',
        'outdent': 'Aktif paragrafın girintisini azaltır',
        'indent': 'Aktif paragrafın girintisini artırır',
        'formatPara': 'Aktif bloğun biçimini paragraf (p) olarak değiştirir',
        'formatH1': 'Aktif bloğun biçimini başlık 1 (h1) olarak değiştirir',
        'formatH2': 'Aktif bloğun biçimini başlık 2 (h2) olarak değiştirir',
        'formatH3': 'Aktif bloğun biçimini başlık 3 (h3) olarak değiştirir',
        'formatH4': 'Aktif bloğun biçimini başlık 4 (h4) olarak değiştirir',
        'formatH5': 'Aktif bloğun biçimini başlık 5 (h5) olarak değiştirir',
        'formatH6': 'Aktif bloğun biçimini başlık 6 (h6) olarak değiştirir',
        'insertHorizontalRule': 'Yatay çizgi ekler',
        'linkDialog.show': 'Bağlantı ayar kutusunu gösterir'
      },
      history: {
        undo: 'Geri al',
        redo: 'Yinele'
      },
      specialChar: {
        specialChar: 'ÖZEL KARAKTERLER',
        select: 'Özel Karakterleri seçin'
      }
    }
  });
})(jQuery);

/***/ })

/******/ });
});