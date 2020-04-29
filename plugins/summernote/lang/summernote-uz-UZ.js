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
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ({

/***/ 47:
/***/ (function(module, exports) {

(function ($) {
  $.extend($.summernote.lang, {
    'uz-UZ': {
      font: {
        bold: 'қалин',
        italic: 'Курсив',
        underline: 'Белгиланган',
        clear: 'Ҳарф турларини олиб ташлаш',
        height: 'Чизиқ баландлиги',
        name: 'Ҳарф',
        strikethrough: 'Ўчирилган',
        subscript: 'Пастки индекс',
        superscript: 'Юқори индекс',
        size: 'ҳарф ҳажми'
      },
      image: {
        image: 'Расм',
        insert: 'расмни қўйиш',
        resizeFull: 'Ҳажмни тиклаш',
        resizeHalf: '50% гача кичрайтириш',
        resizeQuarter: '25% гача кичрайтириш',
        floatLeft: 'Чапда жойлаштириш',
        floatRight: 'Ўнгда жойлаштириш',
        floatNone: 'Стандарт бўйича жойлашув',
        shapeRounded: 'Шакли: Юмалоқ',
        shapeCircle: 'Шакли: Доира',
        shapeThumbnail: 'Шакли: Миниатюра',
        shapeNone: 'Шакли: Йўқ',
        dragImageHere: 'Суратни кўчириб ўтинг',
        dropImage: 'Суратни кўчириб ўтинг',
        selectFromFiles: 'Файллардан бирини танлаш',
        url: 'суратлар URL и',
        remove: 'Суратни ўчириш'
      },
      video: {
        video: 'Видео',
        videoLink: 'Видеога ҳавола',
        insert: 'Видео',
        url: 'URL видео',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion или Youku)'
      },
      link: {
        link: 'Ҳавола',
        insert: 'Ҳаволани қўйиш',
        unlink: 'Ҳаволани олиб ташлаш',
        edit: 'Таҳрир қилиш',
        textToDisplay: 'Кўринадиган матн',
        url: 'URL ўтиш учун',
        openInNewWindow: 'Янги дарчада очиш'
      },
      table: {
        table: 'Жадвал'
      },
      hr: {
        insert: 'Горизонтал чизиқни қўйиш'
      },
      style: {
        style: 'Услуб',
        p: 'Яхши',
        blockquote: 'Жумла',
        pre: 'Код',
        h1: 'Сарлавҳа 1',
        h2: 'Сарлавҳа  2',
        h3: 'Сарлавҳа  3',
        h4: 'Сарлавҳа  4',
        h5: 'Сарлавҳа  5',
        h6: 'Сарлавҳа  6'
      },
      lists: {
        unordered: 'Белгиланган рўйҳат',
        ordered: 'Рақамланган рўйҳат'
      },
      options: {
        help: 'Ёрдам',
        fullscreen: 'Бутун экран бўйича',
        codeview: 'Бошланғич код'
      },
      paragraph: {
        paragraph: 'Параграф',
        outdent: 'Орқага қайтишни камайтириш',
        indent: 'Орқага қайтишни кўпайтириш',
        left: 'Чап қирғоққа тўғрилаш',
        center: 'Марказга тўғрилаш',
        right: 'Ўнг қирғоққа тўғрилаш',
        justify: 'Эни бўйлаб чўзиш'
      },
      color: {
        recent: 'Охирги ранг',
        more: 'Яна ранглар',
        background: 'Фон  ранги',
        foreground: 'Ҳарф ранги',
        transparent: 'Шаффоф',
        setTransparent: 'Шаффофдай қилиш',
        reset: 'Бекор қилиш',
        resetToDefault: 'Стандартга оид тиклаш'
      },
      shortcut: {
        shortcuts: 'Клавишларнинг ҳамохҳанглиги',
        close: 'Ёпиқ',
        textFormatting: 'Матнни ',
        action: 'Ҳаркат',
        paragraphFormatting: 'Параграфни форматлаш',
        documentStyle: 'Ҳужжатнинг тури',
        extraKeys: 'Қўшимча имкониятлар'
      },
      history: {
        undo: 'Бекор қилиш',
        redo: 'Қайтариш'
      }
    }
  });
})(jQuery);

/***/ })

/******/ });
});