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
    'sr-RS': {
      font: {
        bold: 'Подебљано',
        italic: 'Курзив',
        underline: 'Подвучено',
        clear: 'Уклони стилове фонта',
        height: 'Висина линије',
        name: 'Font Family',
        strikethrough: 'Прецртано',
        subscript: 'Subscript',
        superscript: 'Superscript',
        size: 'Величина фонта'
      },
      image: {
        image: 'Слика',
        insert: 'Уметни слику',
        resizeFull: 'Пуна величина',
        resizeHalf: 'Умањи на 50%',
        resizeQuarter: 'Умањи на 25%',
        floatLeft: 'Уз леву ивицу',
        floatRight: 'Уз десну ивицу',
        floatNone: 'Без равнања',
        shapeRounded: 'Shape: Rounded',
        shapeCircle: 'Shape: Circle',
        shapeThumbnail: 'Shape: Thumbnail',
        shapeNone: 'Shape: None',
        dragImageHere: 'Превуци слику овде',
        dropImage: 'Drop image or Text',
        selectFromFiles: 'Изабери из датотеке',
        maximumFileSize: 'Maximum file size',
        maximumFileSizeError: 'Maximum file size exceeded.',
        url: 'Адреса слике',
        remove: 'Уклони слику',
        original: 'Original'
      },
      video: {
        video: 'Видео',
        videoLink: 'Веза ка видеу',
        insert: 'Уметни видео',
        url: 'URL видео',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion или Youku)'
      },
      link: {
        link: 'Веза',
        insert: 'Уметни везу',
        unlink: 'Уклони везу',
        edit: 'Уреди',
        textToDisplay: 'Текст за приказ',
        url: 'Интернет адреса',
        openInNewWindow: 'Отвори у новом прозору'
      },
      table: {
        table: 'Табела',
        addRowAbove: 'Add row above',
        addRowBelow: 'Add row below',
        addColLeft: 'Add column left',
        addColRight: 'Add column right',
        delRow: 'Delete row',
        delCol: 'Delete column',
        delTable: 'Delete table'
      },
      hr: {
        insert: 'Уметни хоризонталну линију'
      },
      style: {
        style: 'Стил',
        p: 'Нормални',
        blockquote: 'Цитат',
        pre: 'Код',
        h1: 'Заглавље 1',
        h2: 'Заглавље 2',
        h3: 'Заглавље 3',
        h4: 'Заглавље 4',
        h5: 'Заглавље 5',
        h6: 'Заглавље 6'
      },
      lists: {
        unordered: 'Обична листа',
        ordered: 'Нумерисана листа'
      },
      options: {
        help: 'Помоћ',
        fullscreen: 'Преко целог екрана',
        codeview: 'Изворни код'
      },
      paragraph: {
        paragraph: 'Параграф',
        outdent: 'Смањи увлачење',
        indent: 'Повечај увлачење',
        left: 'Поравнај у лево',
        center: 'Центрирано',
        right: 'Поравнај у десно',
        justify: 'Поравнај обострано'
      },
      color: {
        recent: 'Последња боја',
        more: 'Више боја',
        background: 'Боја позадине',
        foreground: 'Боја текста',
        transparent: 'Провидна',
        setTransparent: 'Провидна',
        reset: 'Опозив',
        resetToDefault: 'Подразумевана'
      },
      shortcut: {
        shortcuts: 'Пречице са тастатуре',
        close: 'Затвори',
        textFormatting: 'Форматирање текста',
        action: 'Акција',
        paragraphFormatting: 'Форматирање параграфа',
        documentStyle: 'Стил документа',
        extraKeys: 'Додатне комбинације'
      },
      help: {
        'insertParagraph': 'Insert Paragraph',
        'undo': 'Undoes the last command',
        'redo': 'Redoes the last command',
        'tab': 'Tab',
        'untab': 'Untab',
        'bold': 'Set a bold style',
        'italic': 'Set a italic style',
        'underline': 'Set a underline style',
        'strikethrough': 'Set a strikethrough style',
        'removeFormat': 'Clean a style',
        'justifyLeft': 'Set left align',
        'justifyCenter': 'Set center align',
        'justifyRight': 'Set right align',
        'justifyFull': 'Set full align',
        'insertUnorderedList': 'Toggle unordered list',
        'insertOrderedList': 'Toggle ordered list',
        'outdent': 'Outdent on current paragraph',
        'indent': 'Indent on current paragraph',
        'formatPara': 'Change current block\'s format as a paragraph(P tag)',
        'formatH1': 'Change current block\'s format as H1',
        'formatH2': 'Change current block\'s format as H2',
        'formatH3': 'Change current block\'s format as H3',
        'formatH4': 'Change current block\'s format as H4',
        'formatH5': 'Change current block\'s format as H5',
        'formatH6': 'Change current block\'s format as H6',
        'insertHorizontalRule': 'Insert horizontal rule',
        'linkDialog.show': 'Show Link Dialog'
      },
      history: {
        undo: 'Поништи',
        redo: 'Понови'
      },
      specialChar: {
        specialChar: 'SPECIAL CHARACTERS',
        select: 'Select Special characters'
      }
    }
  });
})(jQuery);
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=summernote-sr-RS.js.map