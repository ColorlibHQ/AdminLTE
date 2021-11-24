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
//Summernote WYSIWYG  editor ucun Azerbaycan dili fayli
//Tercume etdi: RAMIL ALIYEV
//Tarix: 20.07.2019
//Baki Azerbaycan
//Website: https://ramilaliyev.com
//Azerbaijan language for Summernote WYSIWYG 
//Translated by: RAMIL ALIYEV
//Date: 20.07.2019
//Baku Azerbaijan
//Website: https://ramilaliyev.com
(function ($) {
  $.extend($.summernote.lang, {
    'az-AZ': {
      font: {
        bold: 'Qalın',
        italic: 'Əyri',
        underline: 'Altı xətli',
        clear: 'Təmizlə',
        height: 'Sətir hündürlüyü',
        name: 'Yazı Tipi',
        strikethrough: 'Üstü xətli',
        subscript: 'Alt simvol',
        superscript: 'Üst simvol',
        size: 'Yazı ölçüsü'
      },
      image: {
        image: 'Şəkil',
        insert: 'Şəkil əlavə et',
        resizeFull: 'Original ölçü',
        resizeHalf: '1/2 ölçü',
        resizeQuarter: '1/4 ölçü',
        floatLeft: 'Sola çək',
        floatRight: 'Sağa çək',
        floatNone: 'Sola-sağa çəkilməni ləğv et',
        shapeRounded: 'Şəkil: yuvarlaq künç',
        shapeCircle: 'Şəkil: Dairə',
        shapeThumbnail: 'Şəkil: Thumbnail',
        shapeNone: 'Şəkil: Yox',
        dragImageHere: 'Bura sürüşdür',
        dropImage: 'Şəkil və ya mətni buraxın',
        selectFromFiles: 'Sənəd seçin',
        maximumFileSize: 'Maksimum sənəd ölçüsü',
        maximumFileSizeError: 'Maksimum sənəd ölçüsünü keçdiniz.',
        url: 'Şəkil linki',
        remove: 'Şəkli sil',
        original: 'Original'
      },
      video: {
        video: 'Video',
        videoLink: 'Video linki',
        insert: 'Video əlavə et',
        url: 'Video linki?',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion və ya Youku)'
      },
      link: {
        link: 'Link',
        insert: 'Link əlavə et',
        unlink: 'Linki sil',
        edit: 'Linkə düzəliş et',
        textToDisplay: 'Ekranda göstəriləcək link adı',
        url: 'Link ünvanı?',
        openInNewWindow: 'Yeni pəncərədə aç'
      },
      table: {
        table: 'Cədvəl',
        addRowAbove: 'Yuxarı sətir əlavə et',
        addRowBelow: 'Aşağı sətir əlavə et',
        addColLeft: 'Sola sütun əlavə et',
        addColRight: 'Sağa sütun əlavə et',
        delRow: 'Sətiri sil',
        delCol: 'Sütunu sil',
        delTable: 'Cədvəli sil'
      },
      hr: {
        insert: 'Üfuqi xətt əlavə et'
      },
      style: {
        style: 'Stil',
        p: 'p',
        blockquote: 'İstinad',
        pre: 'Ön baxış',
        h1: 'Başlıq 1',
        h2: 'Başlıq 2',
        h3: 'Başlıq 3',
        h4: 'Başlıq 4',
        h5: 'Başlıq 5',
        h6: 'Başlıq 6'
      },
      lists: {
        unordered: 'Nizamsız sıra',
        ordered: 'Nizamlı sıra'
      },
      options: {
        help: 'Kömək',
        fullscreen: 'Tam ekran',
        codeview: 'HTML Kodu'
      },
      paragraph: {
        paragraph: 'Paraqraf',
        outdent: 'Girintini artır',
        indent: 'Girintini azalt',
        left: 'Sola çək',
        center: 'Ortaya çək',
        right: 'Sağa çək',
        justify: 'Sola və sağa çək'
      },
      color: {
        recent: 'Son rənk',
        more: 'Daha çox rənk',
        background: 'Arxa fon rəngi',
        foreground: 'Yazı rıngi',
        transparent: 'Şəffaflıq',
        setTransparent: 'Şəffaflığı nizamla',
        reset: 'Sıfırla',
        resetToDefault: 'Susyama görə sıfırla'
      },
      shortcut: {
        shortcuts: 'Qısayollar',
        close: 'Bağla',
        textFormatting: 'Yazı formatlandırmaq',
        action: 'Hadisə',
        paragraphFormatting: 'Paraqraf formatlandırmaq',
        documentStyle: 'Sənəd stili',
        extraKeys: 'Əlavə'
      },
      help: {
        'insertParagraph': 'Paraqraf əlavə etmək',
        'undo': 'Son əmri geri alır',
        'redo': 'Son əmri irəli alır',
        'tab': 'Girintini artırır',
        'untab': 'Girintini azaltır',
        'bold': 'Qalın yazma stilini nizamlayır',
        'italic': 'İtalik yazma stilini nizamlayır',
        'underline': 'Altı xətli yazma stilini nizamlayır',
        'strikethrough': 'Üstü xətli yazma stilini nizamlayır',
        'removeFormat': 'Formatlandırmanı ləğv edir',
        'justifyLeft': 'Yazını sola çəkir',
        'justifyCenter': 'Yazını ortaya çəkir',
        'justifyRight': 'Yazını sağa çəkir',
        'justifyFull': 'Yazını hər iki tərəfə yazır',
        'insertUnorderedList': 'Nizamsız sıra əlavə edir',
        'insertOrderedList': 'Nizamlı sıra əlavə edir',
        'outdent': 'Aktiv paraqrafın girintisini azaltır',
        'indent': 'Aktiv paragrafın girintisini artırır',
        'formatPara': 'Aktiv bloqun formatını paraqraf (p) olaraq dəyişdirir',
        'formatH1': 'Aktiv bloqun formatını başlıq 1 (h1) olaraq dəyişdirir',
        'formatH2': 'Aktiv bloqun formatını başlıq 2 (h2) olaraq dəyişdirir',
        'formatH3': 'Aktiv bloqun formatını başlıq 3 (h3) olaraq dəyişdirir',
        'formatH4': 'Aktiv bloqun formatını başlıq 4 (h4) olaraq dəyişdirir',
        'formatH5': 'Aktiv bloqun formatını başlıq 5 (h5) olaraq dəyişdirir',
        'formatH6': 'Aktiv bloqun formatını başlıq 6 (h6) olaraq dəyişdirir',
        'insertHorizontalRule': 'Üfuqi xətt əlavə edir',
        'linkDialog.show': 'Link parametrləri qutusunu göstərir'
      },
      history: {
        undo: 'Əvvəlki vəziyyət',
        redo: 'Sonrakı vəziyyət'
      },
      specialChar: {
        specialChar: 'Xüsusi simvollar',
        select: 'Xüsusi simvolları seçin'
      }
    }
  });
})(jQuery);
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=summernote-az-AZ.js.map