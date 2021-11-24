/*!
 * 
 * Super simple WYSIWYG editor v0.8.20
 * https://summernote.org
 *
 *
 * Copyright 2013- Alan Hong and contributors
 * Summernote may be freely distributed under the MIT license.
 *
 * Date: 2021-10-14T21:15Z
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
})(self, function() {
return /******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
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
        providers: '(YouTube, Google Drive, Vimeo, Vine, Instagram, DailyMotion or Youku)'
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
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=summernote-ar-AR.js.map