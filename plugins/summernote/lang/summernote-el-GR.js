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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ (function(module, exports) {

(function ($) {
  $.extend($.summernote.lang, {
    'el-GR': {
      font: {
        bold: 'Έντονα',
        italic: 'Πλάγια',
        underline: 'Υπογραμμισμένα',
        clear: 'Καθαρισμός',
        height: 'Ύψος',
        name: 'Γραμματοσειρά',
        strikethrough: 'Διεγραμμένα',
        subscript: 'Δείκτης',
        superscript: 'Εκθέτης',
        size: 'Μέγεθος'
      },
      image: {
        image: 'εικόνα',
        insert: 'Εισαγωγή',
        resizeFull: 'Πλήρες μέγεθος',
        resizeHalf: 'Μισό μέγεθος',
        resizeQuarter: '1/4 μέγεθος',
        floatLeft: 'Μετατόπιση αριστερά',
        floatRight: 'Μετατόπιση δεξιά',
        floatNone: 'Χωρίς μετατόπιση',
        shapeRounded: 'Σχήμα: Στρογγυλεμένο',
        shapeCircle: 'Σχήμα: Κύκλος',
        shapeThumbnail: 'Σχήμα: Thumbnail',
        shapeNone: 'Σχήμα: Κανένα',
        dragImageHere: 'Σύρτε την εικόνα εδώ',
        dropImage: 'Αφήστε την εικόνα',
        selectFromFiles: 'Επιλογή από αρχεία',
        maximumFileSize: 'Μέγιστο μέγεθος αρχείου',
        maximumFileSizeError: 'Το μέγεθος είναι μεγαλύτερο από το μέγιστο επιτρεπτό.',
        url: 'URL',
        remove: 'Αφαίρεση',
        original: 'Original'
      },
      link: {
        link: 'Σύνδεσμος',
        insert: 'Εισαγωγή συνδέσμου',
        unlink: 'Αφαίρεση συνδέσμου',
        edit: 'Επεξεργασία συνδέσμου',
        textToDisplay: 'Κείμενο συνδέσμου',
        url: 'URL',
        openInNewWindow: 'Άνοιγμα σε νέο παράθυρο'
      },
      video: {
        video: 'Βίντεο',
        videoLink: 'Σύνδεσμος Βίντεο',
        insert: 'Εισαγωγή',
        url: 'URL',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)'
      },
      table: {
        table: 'Πίνακας',
        addRowAbove: 'Add row above',
        addRowBelow: 'Add row below',
        addColLeft: 'Add column left',
        addColRight: 'Add column right',
        delRow: 'Delete row',
        delCol: 'Delete column',
        delTable: 'Delete table'
      },
      hr: {
        insert: 'Εισαγωγή οριζόντιας γραμμής'
      },
      style: {
        style: 'Στυλ',
        normal: 'Κανονικό',
        blockquote: 'Παράθεση',
        pre: 'Ως έχει',
        h1: 'Κεφαλίδα 1',
        h2: 'συνδέσμου 2',
        h3: 'συνδέσμου 3',
        h4: 'συνδέσμου 4',
        h5: 'συνδέσμου 5',
        h6: 'συνδέσμου 6'
      },
      lists: {
        unordered: 'Αταξινόμητη λίστα',
        ordered: 'Ταξινομημένη λίστα'
      },
      options: {
        help: 'Βοήθεια',
        fullscreen: 'Πλήρης οθόνη',
        codeview: 'Προβολή HTML'
      },
      paragraph: {
        paragraph: 'Παράγραφος',
        outdent: 'Μείωση εσοχής',
        indent: 'Άυξηση εσοχής',
        left: 'Αριστερή στοίχιση',
        center: 'Στοίχιση στο κέντρο',
        right: 'Δεξιά στοίχιση',
        justify: 'Πλήρης στοίχιση'
      },
      color: {
        recent: 'Πρόσφατη επιλογή',
        more: 'Περισσότερα',
        background: 'Υπόβαθρο',
        foreground: 'Μπροστά',
        transparent: 'Διαφανές',
        setTransparent: 'Επιλογή διαφάνειας',
        reset: 'Επαναφορά',
        resetToDefault: 'Επαναφορά στις προκαθορισμένες τιμές'
      },
      shortcut: {
        shortcuts: 'Συντομεύσεις',
        close: 'Κλείσιμο',
        textFormatting: 'Διαμόρφωση κειμένου',
        action: 'Ενέργεια',
        paragraphFormatting: 'Διαμόρφωση παραγράφου',
        documentStyle: 'Στυλ κειμένου',
        extraKeys: 'Επιπλέον συντομεύσεις'
      },
      help: {
        'insertParagraph': 'Εισαγωγή παραγράφου',
        'undo': 'Αναιρεί την προηγούμενη εντολή',
        'redo': 'Επαναλαμβάνει την προηγούμενη εντολή',
        'tab': 'Εσοχή',
        'untab': 'Αναίρεση εσοχής',
        'bold': 'Ορισμός έντονου στυλ',
        'italic': 'Ορισμός πλάγιου στυλ',
        'underline': 'Ορισμός υπογεγραμμένου στυλ',
        'strikethrough': 'Ορισμός διεγραμμένου στυλ',
        'removeFormat': 'Αφαίρεση στυλ',
        'justifyLeft': 'Ορισμός αριστερής στοίχισης',
        'justifyCenter': 'Ορισμός κεντρικής στοίχισης',
        'justifyRight': 'Ορισμός δεξιάς στοίχισης',
        'justifyFull': 'Ορισμός πλήρους στοίχισης',
        'insertUnorderedList': 'Ορισμός μη-ταξινομημένης λίστας',
        'insertOrderedList': 'Ορισμός ταξινομημένης λίστας',
        'outdent': 'Προεξοχή παραγράφου',
        'indent': 'Εσοχή παραγράφου',
        'formatPara': 'Αλλαγή της μορφής του τρέχοντος μπλοκ σε παράγραφο (P tag)',
        'formatH1': 'Αλλαγή της μορφής του τρέχοντος μπλοκ σε H1',
        'formatH2': 'Αλλαγή της μορφής του τρέχοντος μπλοκ σε H2',
        'formatH3': 'Αλλαγή της μορφής του τρέχοντος μπλοκ σε H3',
        'formatH4': 'Αλλαγή της μορφής του τρέχοντος μπλοκ σε H4',
        'formatH5': 'Αλλαγή της μορφής του τρέχοντος μπλοκ σε H5',
        'formatH6': 'Αλλαγή της μορφής του τρέχοντος μπλοκ σε H6',
        'insertHorizontalRule': 'Εισαγωγή οριζόντιας γραμμής',
        'linkDialog.show': 'Εμφάνιση διαλόγου συνδέσμου'
      },
      history: {
        undo: 'Αναίρεση',
        redo: 'Επαναληψη'
      },
      specialChar: {
        specialChar: 'SPECIAL CHARACTERS',
        select: 'Επιλέξτε ειδικούς χαρακτήρες'
      }
    }
  });
})(jQuery);

/***/ })

/******/ });
});