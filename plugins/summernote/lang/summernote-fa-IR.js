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
    'fa-IR': {
      font: {
        bold: 'درشت',
        italic: 'خمیده',
        underline: 'میان خط',
        clear: 'پاک کردن فرمت فونت',
        height: 'فاصله ی خطی',
        name: 'اسم فونت',
        strikethrough: 'Strike',
        subscript: 'Subscript',
        superscript: 'Superscript',
        size: 'اندازه ی فونت'
      },
      image: {
        image: 'تصویر',
        insert: 'وارد کردن تصویر',
        resizeFull: 'تغییر به اندازه ی کامل',
        resizeHalf: 'تغییر به اندازه نصف',
        resizeQuarter: 'تغییر به اندازه یک چهارم',
        floatLeft: 'چسباندن به چپ',
        floatRight: 'چسباندن به راست',
        floatNone: 'بدون چسبندگی',
        shapeRounded: 'Shape: Rounded',
        shapeCircle: 'Shape: Circle',
        shapeThumbnail: 'Shape: Thumbnail',
        shapeNone: 'Shape: None',
        dragImageHere: 'یک تصویر را اینجا بکشید',
        dropImage: 'Drop image or Text',
        selectFromFiles: 'فایل ها را انتخاب کنید',
        maximumFileSize: 'حداکثر اندازه پرونده',
        maximumFileSizeError: 'Maximum file size exceeded.',
        url: 'آدرس تصویر',
        remove: 'حذف تصویر',
        original: 'Original'
      },
      video: {
        video: 'ویدیو',
        videoLink: 'لینک ویدیو',
        insert: 'افزودن ویدیو',
        url: 'آدرس ویدیو ؟',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion یا Youku)'
      },
      link: {
        link: 'لینک',
        insert: 'اضافه کردن لینک',
        unlink: 'حذف لینک',
        edit: 'ویرایش',
        textToDisplay: 'متن جهت نمایش',
        url: 'این لینک به چه آدرسی باید برود ؟',
        openInNewWindow: 'در یک پنجره ی جدید باز شود'
      },
      table: {
        table: 'جدول',
        addRowAbove: 'افزودن ردیف بالا',
        addRowBelow: 'افزودن ردیف پایین',
        addColLeft: 'افزودن ستون چپ',
        addColRight: 'افزودن ستون راست',
        delRow: 'حذف ردیف',
        delCol: 'حذف ستون',
        delTable: 'حذف جدول'
      },
      hr: {
        insert: 'افزودن خط افقی'
      },
      style: {
        style: 'استیل',
        p: 'نرمال',
        blockquote: 'نقل قول',
        pre: 'کد',
        h1: 'سرتیتر 1',
        h2: 'سرتیتر 2',
        h3: 'سرتیتر 3',
        h4: 'سرتیتر 4',
        h5: 'سرتیتر 5',
        h6: 'سرتیتر 6'
      },
      lists: {
        unordered: 'لیست غیر ترتیبی',
        ordered: 'لیست ترتیبی'
      },
      options: {
        help: 'راهنما',
        fullscreen: 'نمایش تمام صفحه',
        codeview: 'مشاهده ی کد'
      },
      paragraph: {
        paragraph: 'پاراگراف',
        outdent: 'کاهش تو رفتگی',
        indent: 'افزایش تو رفتگی',
        left: 'چپ چین',
        center: 'میان چین',
        right: 'راست چین',
        justify: 'بلوک چین'
      },
      color: {
        recent: 'رنگ اخیرا استفاده شده',
        more: 'رنگ بیشتر',
        background: 'رنگ پس زمینه',
        foreground: 'رنگ متن',
        transparent: 'بی رنگ',
        setTransparent: 'تنظیم حالت بی رنگ',
        reset: 'بازنشاندن',
        resetToDefault: 'حالت پیش فرض'
      },
      shortcut: {
        shortcuts: 'دکمه های میان بر',
        close: 'بستن',
        textFormatting: 'فرمت متن',
        action: 'عملیات',
        paragraphFormatting: 'فرمت پاراگراف',
        documentStyle: 'استیل سند',
        extraKeys: 'Extra keys'
      },
      help: {
        'insertParagraph': 'افزودن پاراگراف',
        'undo': 'آخرین فرمان را لغو می کند',
        'redo': 'دستور آخر را دوباره اجرا می کند',
        'tab': 'تب',
        'untab': 'لغو تب',
        'bold': 'استایل ضخیم میدهد',
        'italic': 'استایل مورب میدهد',
        'underline': 'استایل زیرخط دار میدهد',
        'strikethrough': 'استایل خط خورده میدهد',
        'removeFormat': 'حذف همه استایل ها',
        'justifyLeft': 'چپ چین',
        'justifyCenter': 'وسط چین',
        'justifyRight': 'راست چین',
        'justifyFull': 'چینش در کل عرض',
        'insertUnorderedList': 'تغییر بع لیست غیرترتیبی',
        'insertOrderedList': 'تغییر بع لیست ترتیبی',
        'outdent': 'گذر از پاراگراف فعلی',
        'indent': 'قرارگیری بر روی پاراگراف جاری',
        'formatPara': 'تغییر فرمت متن به تگ <p>',
        'formatH1': 'تغییر فرمت متن به تگ <h1>',
        'formatH2': 'تغییر فرمت متن به تگ <h2>',
        'formatH3': 'تغییر فرمت متن به تگ <h3>',
        'formatH4': 'تغییر فرمت متن به تگ <h4>',
        'formatH5': 'تغییر فرمت متن به تگ <h5>',
        'formatH6': 'تغییر فرمت متن به تگ <h6>',
        'insertHorizontalRule': 'وارد کردن به صورت افقی',
        'linkDialog.show': 'نمایش پیام لینک'
      },
      history: {
        undo: 'واچیدن',
        redo: 'بازچیدن'
      },
      specialChar: {
        specialChar: 'کاراکتر خاص',
        select: 'انتخاب کاراکتر خاص'
      }
    }
  });
})(jQuery);
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=summernote-fa-IR.js.map