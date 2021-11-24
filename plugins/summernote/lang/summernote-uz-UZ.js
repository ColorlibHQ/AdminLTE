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
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=summernote-uz-UZ.js.map