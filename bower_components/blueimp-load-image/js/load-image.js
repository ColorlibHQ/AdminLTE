/*
 * JavaScript Load Image
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, URL, webkitURL, FileReader */

;(function ($) {
  'use strict'

  // Loads an image for a given File object.
  // Invokes the callback with an img or optional canvas
  // element (if supported by the browser) as parameter:
  function loadImage (file, callback, options) {
    var img = document.createElement('img')
    var url
    img.onerror = function (event) {
      return loadImage.onerror(img, event, file, callback, options)
    }
    img.onload = function (event) {
      return loadImage.onload(img, event, file, callback, options)
    }
    if (typeof file === 'string') {
      loadImage.fetchBlob(
        file,
        function (blob) {
          if (blob) {
            file = blob
            url = loadImage.createObjectURL(file)
          } else {
            url = file
            if (options && options.crossOrigin) {
              img.crossOrigin = options.crossOrigin
            }
          }
          img.src = url
        },
        options
      )
      return img
    } else if (
      loadImage.isInstanceOf('Blob', file) ||
      // Files are also Blob instances, but some browsers
      // (Firefox 3.6) support the File API but not Blobs:
      loadImage.isInstanceOf('File', file)
    ) {
      url = img._objectURL = loadImage.createObjectURL(file)
      if (url) {
        img.src = url
        return img
      }
      return loadImage.readFile(file, function (e) {
        var target = e.target
        if (target && target.result) {
          img.src = target.result
        } else if (callback) {
          callback(e)
        }
      })
    }
  }
  // The check for URL.revokeObjectURL fixes an issue with Opera 12,
  // which provides URL.createObjectURL but doesn't properly implement it:
  var urlAPI =
    ($.createObjectURL && $) ||
    ($.URL && URL.revokeObjectURL && URL) ||
    ($.webkitURL && webkitURL)

  function revokeHelper (img, options) {
    if (img._objectURL && !(options && options.noRevoke)) {
      loadImage.revokeObjectURL(img._objectURL)
      delete img._objectURL
    }
  }

  // If the callback given to this function returns a blob, it is used as image
  // source instead of the original url and overrides the file argument used in
  // the onload and onerror event callbacks:
  loadImage.fetchBlob = function (url, callback, options) {
    callback()
  }

  loadImage.isInstanceOf = function (type, obj) {
    // Cross-frame instanceof check
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }

  loadImage.transform = function (img, options, callback, file, data) {
    callback(img, data)
  }

  loadImage.onerror = function (img, event, file, callback, options) {
    revokeHelper(img, options)
    if (callback) {
      callback.call(img, event)
    }
  }

  loadImage.onload = function (img, event, file, callback, options) {
    revokeHelper(img, options)
    if (callback) {
      loadImage.transform(img, options, callback, file, {})
    }
  }

  loadImage.createObjectURL = function (file) {
    return urlAPI ? urlAPI.createObjectURL(file) : false
  }

  loadImage.revokeObjectURL = function (url) {
    return urlAPI ? urlAPI.revokeObjectURL(url) : false
  }

  // Loads a given File object via FileReader interface,
  // invokes the callback with the event object (load or error).
  // The result can be read via event.target.result:
  loadImage.readFile = function (file, callback, method) {
    if ($.FileReader) {
      var fileReader = new FileReader()
      fileReader.onload = fileReader.onerror = callback
      method = method || 'readAsDataURL'
      if (fileReader[method]) {
        fileReader[method](file)
        return fileReader
      }
    }
    return false
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return loadImage
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = loadImage
  } else {
    $.loadImage = loadImage
  }
})((typeof window !== 'undefined' && window) || this)
