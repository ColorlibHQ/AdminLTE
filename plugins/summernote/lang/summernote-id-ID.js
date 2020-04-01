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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/***/ (function(module, exports) {

(function ($) {
  $.extend($.summernote.lang, {
    'id-ID': {
      font: {
        bold: 'Tebal',
        italic: 'Miring',
        underline: 'Garis bawah',
        clear: 'Bersihkan gaya',
        height: 'Jarak baris',
        name: 'Jenis Tulisan',
        strikethrough: 'Coret',
        subscript: 'Subscript',
        superscript: 'Superscript',
        size: 'Ukuran font'
      },
      image: {
        image: 'Gambar',
        insert: 'Sisipkan gambar',
        resizeFull: 'Ukuran penuh',
        resizeHalf: 'Ukuran 50%',
        resizeQuarter: 'Ukuran 25%',
        floatLeft: 'Rata kiri',
        floatRight: 'Rata kanan',
        floatNone: 'Tanpa perataan',
        shapeRounded: 'Bentuk: Membundar',
        shapeCircle: 'Bentuk: Bundar',
        shapeThumbnail: 'Bentuk: Thumbnail',
        shapeNone: 'Bentuk: Tidak ada',
        dragImageHere: 'Tarik gambar ke area ini',
        dropImage: 'Letakkan gambar atau teks',
        selectFromFiles: 'Pilih gambar dari berkas',
        maximumFileSize: 'Ukuran maksimal berkas',
        maximumFileSizeError: 'Ukuran maksimal berkas terlampaui.',
        url: 'URL gambar',
        remove: 'Hapus Gambar',
        original: 'Original'
      },
      video: {
        video: 'Video',
        videoLink: 'Link video',
        insert: 'Sisipkan video',
        url: 'Tautan video',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion atau Youku)'
      },
      link: {
        link: 'Tautan',
        insert: 'Tambah tautan',
        unlink: 'Hapus tautan',
        edit: 'Edit',
        textToDisplay: 'Tampilan teks',
        url: 'Tautan tujuan',
        openInNewWindow: 'Buka di jendela baru'
      },
      table: {
        table: 'Tabel',
        addRowAbove: 'Tambahkan baris ke atas',
        addRowBelow: 'Tambahkan baris ke bawah',
        addColLeft: 'Tambahkan kolom ke kiri',
        addColRight: 'Tambahkan kolom ke kanan',
        delRow: 'Hapus baris',
        delCol: 'Hapus kolom',
        delTable: 'Hapus tabel'
      },
      hr: {
        insert: 'Masukkan garis horizontal'
      },
      style: {
        style: 'Gaya',
        p: 'p',
        blockquote: 'Kutipan',
        pre: 'Kode',
        h1: 'Heading 1',
        h2: 'Heading 2',
        h3: 'Heading 3',
        h4: 'Heading 4',
        h5: 'Heading 5',
        h6: 'Heading 6'
      },
      lists: {
        unordered: 'Pencacahan',
        ordered: 'Penomoran'
      },
      options: {
        help: 'Bantuan',
        fullscreen: 'Layar penuh',
        codeview: 'Kode HTML'
      },
      paragraph: {
        paragraph: 'Paragraf',
        outdent: 'Outdent',
        indent: 'Indent',
        left: 'Rata kiri',
        center: 'Rata tengah',
        right: 'Rata kanan',
        justify: 'Rata kanan kiri'
      },
      color: {
        recent: 'Warna sekarang',
        more: 'Selengkapnya',
        background: 'Warna latar',
        foreground: 'Warna font',
        transparent: 'Transparan',
        setTransparent: 'Atur transparansi',
        reset: 'Atur ulang',
        resetToDefault: 'Kembalikan kesemula'
      },
      shortcut: {
        shortcuts: 'Jalan pintas',
        close: 'Tutup',
        textFormatting: 'Format teks',
        action: 'Aksi',
        paragraphFormatting: 'Format paragraf',
        documentStyle: 'Gaya dokumen',
        extraKeys: 'Shortcut tambahan'
      },
      help: {
        'insertParagraph': 'Tambahkan paragraf',
        'undo': 'Urungkan perintah terakhir',
        'redo': 'Kembalikan perintah terakhir',
        'tab': 'Tab',
        'untab': 'Untab',
        'bold': 'Mengaktifkan gaya tebal',
        'italic': 'Mengaktifkan gaya italic',
        'underline': 'Mengaktifkan gaya underline',
        'strikethrough': 'Mengaktifkan gaya strikethrough',
        'removeFormat': 'Hapus semua gaya',
        'justifyLeft': 'Atur rata kiri',
        'justifyCenter': 'Atur rata tengah',
        'justifyRight': 'Atur rata kanan',
        'justifyFull': 'Atur rata kiri-kanan',
        'insertUnorderedList': 'Nyalakan urutan tanpa nomor',
        'insertOrderedList': 'Nyalakan urutan bernomor',
        'outdent': 'Outdent di paragraf terpilih',
        'indent': 'Indent di paragraf terpilih',
        'formatPara': 'Ubah format gaya tulisan terpilih menjadi paragraf',
        'formatH1': 'Ubah format gaya tulisan terpilih menjadi Heading 1',
        'formatH2': 'Ubah format gaya tulisan terpilih menjadi Heading 2',
        'formatH3': 'Ubah format gaya tulisan terpilih menjadi Heading 3',
        'formatH4': 'Ubah format gaya tulisan terpilih menjadi Heading 4',
        'formatH5': 'Ubah format gaya tulisan terpilih menjadi Heading 5',
        'formatH6': 'Ubah format gaya tulisan terpilih menjadi Heading 6',
        'insertHorizontalRule': 'Masukkan garis horizontal',
        'linkDialog.show': 'Tampilkan Link Dialog'
      },
      history: {
        undo: 'Kembali',
        redo: 'Ulang'
      },
      specialChar: {
        specialChar: 'KARAKTER KHUSUS',
        select: 'Pilih karakter khusus'
      }
    }
  });
})(jQuery);

/***/ })

/******/ });
});