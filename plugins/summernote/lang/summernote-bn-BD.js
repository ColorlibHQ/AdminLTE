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
    'bn-BD': {
      font: {
        bold: 'গাঢ়',
        italic: 'তির্যক',
        underline: 'নিন্মরেখা',
        clear: 'ফন্টের শৈলী সরান',
        height: 'লাইনের উচ্চতা',
        name: 'ফন্ট পরিবার',
        strikethrough: 'অবচ্ছেদন',
        subscript: 'নিম্নলিপি',
        superscript: 'উর্ধ্বলিপি',
        size: 'ফন্টের আকার',
        sizeunit: 'ফন্টের আকারের একক'
      },
      image: {
        image: 'ছবি',
        insert: 'ছবি যোগ করুন',
        resizeFull: 'পূর্ণ আকারে নিন',
        resizeHalf: 'অর্ধ আকারে নিন',
        resizeQuarter: 'চতুর্থাংশ আকারে নিন',
        resizeNone: 'আসল আকার',
        floatLeft: 'বামে নিন',
        floatRight: 'ডানে নিন',
        floatNone: 'দিক সরান',
        shapeRounded: 'আকৃতি: গোলাকার',
        shapeCircle: 'আকৃতি: বৃত্ত',
        shapeThumbnail: 'আকৃতি: থাম্বনেইল',
        shapeNone: 'আকৃতি: কিছু নয়',
        dragImageHere: 'এখানে ছবি বা লেখা টেনে আনুন',
        dropImage: 'ছবি বা লেখা ছাড়ুন',
        selectFromFiles: 'ফাইল থেকে নির্বাচন করুন',
        maximumFileSize: 'সর্বোচ্চ ফাইলের আকার',
        maximumFileSizeError: 'সর্বোচ্চ ফাইলের আকার অতিক্রম করেছে।',
        url: 'ছবির URL',
        remove: 'ছবি সরান',
        original: 'আসল'
      },
      video: {
        video: 'ভিডিও',
        videoLink: 'ভিডিওর লিঙ্ক',
        insert: 'ভিডিও সন্নিবেশ করুন',
        url: 'ভিডিওর URL',
        providers: '(ইউটিউব, গুগল ড্রাইভ, ভিমিও, ভিন, ইনস্টাগ্রাম, ডেইলিমোশন বা ইউকু)'
      },
      link: {
        link: 'লিঙ্ক',
        insert: 'লিঙ্ক সন্নিবেশ করুন',
        unlink: 'লিঙ্কমুক্ত করুন',
        edit: 'সম্পাদনা করুন',
        textToDisplay: 'দেখানোর জন্য লেখা',
        url: 'এই লিঙ্কটি কোন URL-এ যাবে?',
        openInNewWindow: 'নতুন উইন্ডোতে খুলুন',
        useProtocol: 'পূর্বনির্ধারিত প্রোটোকল ব্যবহার করুন'
      },
      table: {
        table: 'ছক',
        addRowAbove: 'উপরে সারি যোগ করুন',
        addRowBelow: 'নিচে সারি যোগ করুন',
        addColLeft: 'বামে কলাম যোগ করুন',
        addColRight: 'ডানে কলাম যোগ করুন',
        delRow: 'সারি মুছুন',
        delCol: 'কলাম মুছুন',
        delTable: 'ছক মুছুন'
      },
      hr: {
        insert: 'বিভাজক রেখা সন্নিবেশ করুন'
      },
      style: {
        style: 'শৈলী',
        p: 'সাধারণ',
        blockquote: 'উক্তি',
        pre: 'কোড',
        h1: 'শীর্ষক ১',
        h2: 'শীর্ষক ২',
        h3: 'শীর্ষক ৩',
        h4: 'শীর্ষক ৪',
        h5: 'শীর্ষক ৫',
        h6: 'শীর্ষক ৬'
      },
      lists: {
        unordered: 'অবিন্যস্ত তালিকা',
        ordered: 'বিন্যস্ত তালিকা'
      },
      options: {
        help: 'সাহায্য',
        fullscreen: 'পূর্ণ পর্দা',
        codeview: 'কোড দৃশ্য'
      },
      paragraph: {
        paragraph: 'অনুচ্ছেদ',
        outdent: 'ঋণাত্মক প্রান্তিককরণ',
        indent: 'প্রান্তিককরণ',
        left: 'বামে সারিবদ্ধ করুন',
        center: 'কেন্দ্রে সারিবদ্ধ করুন',
        right: 'ডানে সারিবদ্ধ করুন',
        justify: 'যথাযথ ফাঁক দিয়ে সাজান'
      },
      color: {
        recent: 'সাম্প্রতিক রং',
        more: 'আরও রং',
        background: 'পটভূমির রং',
        foreground: 'লেখার রং',
        transparent: 'স্বচ্ছ',
        setTransparent: 'স্বচ্ছ নির্ধারণ করুন',
        reset: 'পুনঃস্থাপন করুন',
        resetToDefault: 'পূর্বনির্ধারিত ফিরিয়ে আনুন',
        cpSelect: 'নির্বাচন করুন'
      },
      shortcut: {
        shortcuts: 'কীবোর্ড শর্টকাট',
        close: 'বন্ধ করুন',
        textFormatting: 'লেখার বিন্যাসন',
        action: 'কার্য',
        paragraphFormatting: 'অনুচ্ছেদের বিন্যাসন',
        documentStyle: 'নথির শৈলী',
        extraKeys: 'অতিরিক্ত কীগুলি'
      },
      help: {
        'escape': 'এস্কেপ',
        'insertParagraph': 'অনুচ্ছেদ সন্নিবেশ',
        'undo': 'শেষ কমান্ড পূর্বাবস্থায় ফেরত',
        'redo': 'শেষ কমান্ড পুনরায় করা',
        'tab': 'ট্যাব',
        'untab': 'অ-ট্যাব',
        'bold': 'গাঢ় শৈলী নির্ধারণ',
        'italic': 'তির্যক শৈলী নির্ধারণ',
        'underline': 'নিম্নরেখার শৈলী নির্ধারণ',
        'strikethrough': 'অবচ্ছেদনের শৈলী নির্ধারণ',
        'removeFormat': 'শৈলী পরিষ্কার',
        'justifyLeft': 'বামের সারিবন্ধন নির্ধারণ',
        'justifyCenter': 'কেন্দ্রের সারিবন্ধন নির্ধারণ',
        'justifyRight': 'ডানের সারিবন্ধন নির্ধারণ',
        'justifyFull': 'পূর্ণ সারিবন্ধন নির্ধারণ',
        'insertUnorderedList': 'অবিন্যস্ত তালিকা টগল',
        'insertOrderedList': 'বিন্যস্ত তালিকা টগল',
        'outdent': 'বর্তমান অনুচ্ছেদে ঋণাত্মক প্রান্তিককরণ',
        'indent': 'বর্তমান অনুচ্ছেদে প্রান্তিককরণ',
        'formatPara': 'বর্তমান ব্লকের বিন্যাসটি অনুচ্ছেদ হিসেবে পরিবর্তন (P ট্যাগ)',
        'formatH1': 'বর্তমান ব্লকের বিন্যাসটি H1 হিসেবে পরিবর্তন',
        'formatH2': 'বর্তমান ব্লকের বিন্যাসটি H2 হিসেবে পরিবর্তন',
        'formatH3': 'বর্তমান ব্লকের বিন্যাসটি H3 হিসেবে পরিবর্তন',
        'formatH4': 'বর্তমান ব্লকের বিন্যাসটি H4 হিসেবে পরিবর্তন',
        'formatH5': 'বর্তমান ব্লকের বিন্যাসটি H5 হিসেবে পরিবর্তন',
        'formatH6': 'বর্তমান ব্লকের বিন্যাসটি H6 হিসেবে পরিবর্তন',
        'insertHorizontalRule': 'বিভাজক রেখা সন্নিবেশ',
        'linkDialog.show': 'লিংক ডায়ালগ প্রদর্শন'
      },
      history: {
        undo: 'পূর্বাবস্থায় আনুন',
        redo: 'পুনঃকরুন'
      },
      specialChar: {
        specialChar: 'বিশেষ অক্ষর',
        select: 'বিশেষ অক্ষর নির্বাচন করুন'
      }
    }
  });
})(jQuery);
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=summernote-bn-BD.js.map