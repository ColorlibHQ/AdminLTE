/*!
 * 
 * Super simple wysiwyg editor v0.8.18
 * https://summernote.org
 * 
 * 
 * Copyright 2013- Alan Hong. and other contributors
 * summernote may be freely distributed under the MIT license.
 * 
 * Date: 2020-05-20T16:47Z
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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ({

/***/ 20:
/***/ (function(module, exports) {

(function ($) {
  $.extend($.summernote.lang, {
    'gl-ES': {
      font: {
        bold: 'Negrita',
        italic: 'Cursiva',
        underline: 'Subliñado',
        clear: 'Quitar estilo de fonte',
        height: 'Altura de liña',
        name: 'Fonte',
        strikethrough: 'Riscado',
        superscript: 'Superíndice',
        subscript: 'Subíndice',
        size: 'Tamaño da fonte'
      },
      image: {
        image: 'Imaxe',
        insert: 'Inserir imaxe',
        resizeFull: 'Redimensionar a tamaño completo',
        resizeHalf: 'Redimensionar á metade',
        resizeQuarter: 'Redimensionar a un cuarto',
        floatLeft: 'Flotar á esquerda',
        floatRight: 'Flotar á dereita',
        floatNone: 'Non flotar',
        shapeRounded: 'Forma: Redondeado',
        shapeCircle: 'Forma: Círculo',
        shapeThumbnail: 'Forma: Marco',
        shapeNone: 'Forma: Ningunha',
        dragImageHere: 'Arrastrar unha imaxe ou texto aquí',
        dropImage: 'Solta a imaxe ou texto',
        selectFromFiles: 'Seleccionar desde os arquivos',
        maximumFileSize: 'Tamaño máximo do arquivo',
        maximumFileSizeError: 'Superaches o tamaño máximo do arquivo.',
        url: 'URL da imaxe',
        remove: 'Eliminar imaxe',
        original: 'Original'
      },
      video: {
        video: 'Vídeo',
        videoLink: 'Ligazón do vídeo',
        insert: 'Insertar vídeo',
        url: 'URL do vídeo?',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion, o Youku)'
      },
      link: {
        link: 'Ligazón',
        insert: 'Inserir Ligazón',
        unlink: 'Quitar Ligazón',
        edit: 'Editar',
        textToDisplay: 'Texto para amosar',
        url: 'Cara a que URL leva a ligazón?',
        openInNewWindow: 'Abrir nunha nova xanela'
      },
      table: {
        table: 'Táboa',
        addRowAbove: 'Add row above',
        addRowBelow: 'Add row below',
        addColLeft: 'Add column left',
        addColRight: 'Add column right',
        delRow: 'Delete row',
        delCol: 'Delete column',
        delTable: 'Delete table'
      },
      hr: {
        insert: 'Inserir liña horizontal'
      },
      style: {
        style: 'Estilo',
        p: 'Normal',
        blockquote: 'Cita',
        pre: 'Código',
        h1: 'Título 1',
        h2: 'Título 2',
        h3: 'Título 3',
        h4: 'Título 4',
        h5: 'Título 5',
        h6: 'Título 6'
      },
      lists: {
        unordered: 'Lista desordenada',
        ordered: 'Lista ordenada'
      },
      options: {
        help: 'Axuda',
        fullscreen: 'Pantalla completa',
        codeview: 'Ver código fonte'
      },
      paragraph: {
        paragraph: 'Parágrafo',
        outdent: 'Menos tabulación',
        indent: 'Máis tabulación',
        left: 'Aliñar á esquerda',
        center: 'Aliñar ao centro',
        right: 'Aliñar á dereita',
        justify: 'Xustificar'
      },
      color: {
        recent: 'Última cor',
        more: 'Máis cores',
        background: 'Cor de fondo',
        foreground: 'Cor de fuente',
        transparent: 'Transparente',
        setTransparent: 'Establecer transparente',
        reset: 'Restaurar',
        resetToDefault: 'Restaurar por defecto'
      },
      shortcut: {
        shortcuts: 'Atallos de teclado',
        close: 'Pechar',
        textFormatting: 'Formato de texto',
        action: 'Acción',
        paragraphFormatting: 'Formato de parágrafo',
        documentStyle: 'Estilo de documento',
        extraKeys: 'Teclas adicionais'
      },
      help: {
        'insertParagraph': 'Inserir parágrafo',
        'undo': 'Desfacer última acción',
        'redo': 'Refacer última acción',
        'tab': 'Tabular',
        'untab': 'Eliminar tabulación',
        'bold': 'Establecer estilo negrita',
        'italic': 'Establecer estilo cursiva',
        'underline': 'Establecer estilo subliñado',
        'strikethrough': 'Establecer estilo riscado',
        'removeFormat': 'Limpar estilo',
        'justifyLeft': 'Aliñar á esquerda',
        'justifyCenter': 'Aliñar ao centro',
        'justifyRight': 'Aliñar á dereita',
        'justifyFull': 'Xustificar',
        'insertUnorderedList': 'Inserir lista desordenada',
        'insertOrderedList': 'Inserir lista ordenada',
        'outdent': 'Reducir tabulación do parágrafo',
        'indent': 'Aumentar tabulación do parágrafo',
        'formatPara': 'Mudar estilo do bloque a parágrafo (etiqueta P)',
        'formatH1': 'Mudar estilo do bloque a H1',
        'formatH2': 'Mudar estilo do bloque a H2',
        'formatH3': 'Mudar estilo do bloque a H3',
        'formatH4': 'Mudar estilo do bloque a H4',
        'formatH5': 'Mudar estilo do bloque a H5',
        'formatH6': 'Mudar estilo do bloque a H6',
        'insertHorizontalRule': 'Inserir liña horizontal',
        'linkDialog.show': 'Amosar panel ligazóns'
      },
      history: {
        undo: 'Desfacer',
        redo: 'Refacer'
      },
      specialChar: {
        specialChar: 'CARACTERES ESPECIAIS',
        select: 'Selecciona Caracteres especiais'
      }
    }
  });
})(jQuery);

/***/ })

/******/ });
});