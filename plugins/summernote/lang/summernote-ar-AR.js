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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 7:
/***/ (function(module, exports) {

(function ($) {
  $.extend($.summernote.lang, {
    'ar-AR': {
      font: {
        bold: 'عريض',
        italic: 'مائل',
        underline: 'تحته خط',
        clear: 'مسح التنسيق',
        height: 'إرتفاع السطر',
        name: 'الخط',
        strikethrough: 'فى وسطه خط',
        subscript: 'مخطوطة',
        superscript: 'حرف فوقي',
        size: 'الحجم'
      },
      image: {
        image: 'صورة',
        insert: 'إضافة صورة',
        resizeFull: 'الحجم بالكامل',
        resizeHalf: 'تصغير للنصف',
        resizeQuarter: 'تصغير للربع',
        floatLeft: 'تطيير لليسار',
        floatRight: 'تطيير لليمين',
        floatNone: 'ثابته',
        shapeRounded: 'الشكل: تقريب',
        shapeCircle: 'الشكل: دائرة',
        shapeThumbnail: 'الشكل: صورة مصغرة',
        shapeNone: 'الشكل: لا شيء',
        dragImageHere: 'إدرج الصورة هنا',
        dropImage: 'إسقاط صورة أو نص',
        selectFromFiles: 'حدد ملف',
        maximumFileSize: 'الحد الأقصى لحجم الملف',
        maximumFileSizeError: 'تم تجاوز الحد الأقصى لحجم الملف',
        url: 'رابط الصورة',
        remove: 'حذف الصورة',
        original: 'Original'
      },
      video: {
        video: 'فيديو',
        videoLink: 'رابط الفيديو',
        insert: 'إدراج الفيديو',
        url: 'رابط الفيديو',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion ou Youku)'
      },
      link: {
        link: 'رابط',
        insert: 'إدراج',
        unlink: 'حذف الرابط',
        edit: 'تعديل',
        textToDisplay: 'النص',
        url: 'مسار الرابط',
        openInNewWindow: 'فتح في نافذة جديدة'
      },
      table: {
        table: 'جدول',
        addRowAbove: 'إضافة سطر أعلاه',
        addRowBelow: 'إضافة سطر أدناه',
        addColLeft: 'إضافة عمود قبله',
        addColRight: 'إضافة عمود بعده',
        delRow: 'حذف سطر',
        delCol: 'حذف عمود',
        delTable: 'حذف الجدول'
      },
      hr: {
        insert: 'إدراج خط أفقي'
      },
      style: {
        style: 'تنسيق',
        p: 'عادي',
        blockquote: 'إقتباس',
        pre: 'شفيرة',
        h1: 'عنوان رئيسي 1',
        h2: 'عنوان رئيسي 2',
        h3: 'عنوان رئيسي 3',
        h4: 'عنوان رئيسي 4',
        h5: 'عنوان رئيسي 5',
        h6: 'عنوان رئيسي 6'
      },
      lists: {
        unordered: 'قائمة مُنقطة',
        ordered: 'قائمة مُرقمة'
      },
      options: {
        help: 'مساعدة',
        fullscreen: 'حجم الشاشة بالكامل',
        codeview: 'شفيرة المصدر'
      },
      paragraph: {
        paragraph: 'فقرة',
        outdent: 'محاذاة للخارج',
        indent: 'محاذاة للداخل',
        left: 'محاذاة لليسار',
        center: 'توسيط',
        right: 'محاذاة لليمين',
        justify: 'ملئ السطر'
      },
      color: {
        recent: 'تم إستخدامه',
        more: 'المزيد',
        background: 'لون الخلفية',
        foreground: 'لون النص',
        transparent: 'شفاف',
        setTransparent: 'بدون خلفية',
        reset: 'إعادة الضبط',
        resetToDefault: 'إعادة الضبط',
        cpSelect: 'اختار'
      },
      shortcut: {
        shortcuts: 'إختصارات',
        close: 'غلق',
        textFormatting: 'تنسيق النص',
        action: 'Action',
        paragraphFormatting: 'تنسيق الفقرة',
        documentStyle: 'تنسيق المستند',
        extraKeys: 'أزرار إضافية'
      },
      help: {
        'insertParagraph': 'إدراج فقرة',
        'undo': 'تراجع عن آخر أمر',
        'redo': 'إعادة تنفيذ آخر أمر',
        'tab': 'إزاحة (تاب)',
        'untab': 'سحب النص باتجاه البداية',
        'bold': 'تنسيق عريض',
        'italic': 'تنسيق مائل',
        'underline': 'تنسيق خط سفلي',
        'strikethrough': 'تنسيق خط متوسط للنص',
        'removeFormat': 'إزالة التنسيقات',
        'justifyLeft': 'محاذاة لليسار',
        'justifyCenter': 'محاذاة توسيط',
        'justifyRight': 'محاذاة لليمين',
        'justifyFull': 'محاذاة كاملة',
        'insertUnorderedList': 'قائمة منقّطة',
        'insertOrderedList': 'قائمة مرقّمة',
        'outdent': 'إزاحة للأمام على الفقرة الحالية',
        'indent': 'إزاحة للخلف على الفقرة الحالية',
        'formatPara': 'تغيير التنسيق للكتلة الحالية إلى فقرة',
        'formatH1': 'تغيير التنسيق للكتلة الحالية إلى ترويسة 1',
        'formatH2': 'تغيير التنسيق للكتلة الحالية إلى ترويسة 2',
        'formatH3': 'تغيير التنسيق للكتلة الحالية إلى ترويسة 3',
        'formatH4': 'تغيير التنسيق للكتلة الحالية إلى ترويسة 4',
        'formatH5': 'تغيير التنسيق للكتلة الحالية إلى ترويسة 5',
        'formatH6': 'تغيير التنسيق للكتلة الحالية إلى ترويسة 6',
        'insertHorizontalRule': 'إدراج خط أفقي',
        'linkDialog.show': 'إظهار خصائص الرابط'
      },
      history: {
        undo: 'تراجع',
        redo: 'إعادة'
      },
      specialChar: {
        specialChar: 'محارف خاصة',
        select: 'اختر المحرف الخاص'
      }
    }
  });
})(jQuery);

/***/ })

/******/ });
});