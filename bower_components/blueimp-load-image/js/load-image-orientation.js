/*
 * JavaScript Load Image Orientation
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define */

;(function (factory) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    // Register as an anonymous AMD module:
    define(['./load-image', './load-image-scale', './load-image-meta'], factory)
  } else if (typeof module === 'object' && module.exports) {
    factory(
      require('./load-image'),
      require('./load-image-scale'),
      require('./load-image-meta')
    )
  } else {
    // Browser globals:
    factory(window.loadImage)
  }
})(function (loadImage) {
  'use strict'

  var originalHasCanvasOption = loadImage.hasCanvasOption
  var originalHasMetaOption = loadImage.hasMetaOption
  var originalTransformCoordinates = loadImage.transformCoordinates
  var originalGetTransformedOptions = loadImage.getTransformedOptions

  // Determines if the target image should be a canvas element:
  loadImage.hasCanvasOption = function (options) {
    return (
      !!options.orientation || originalHasCanvasOption.call(loadImage, options)
    )
  }

  // Determines if meta data should be loaded automatically:
  loadImage.hasMetaOption = function (options) {
    return (
      (options && options.orientation === true) ||
      originalHasMetaOption.call(loadImage, options)
    )
  }

  // Transform image orientation based on
  // the given EXIF orientation option:
  loadImage.transformCoordinates = function (canvas, options) {
    originalTransformCoordinates.call(loadImage, canvas, options)
    var ctx = canvas.getContext('2d')
    var width = canvas.width
    var height = canvas.height
    var styleWidth = canvas.style.width
    var styleHeight = canvas.style.height
    var orientation = options.orientation
    if (!orientation || orientation > 8) {
      return
    }
    if (orientation > 4) {
      canvas.width = height
      canvas.height = width
      canvas.style.width = styleHeight
      canvas.style.height = styleWidth
    }
    switch (orientation) {
      case 2:
        // horizontal flip
        ctx.translate(width, 0)
        ctx.scale(-1, 1)
        break
      case 3:
        // 180° rotate left
        ctx.translate(width, height)
        ctx.rotate(Math.PI)
        break
      case 4:
        // vertical flip
        ctx.translate(0, height)
        ctx.scale(1, -1)
        break
      case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI)
        ctx.scale(1, -1)
        break
      case 6:
        // 90° rotate right
        ctx.rotate(0.5 * Math.PI)
        ctx.translate(0, -height)
        break
      case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI)
        ctx.translate(width, -height)
        ctx.scale(-1, 1)
        break
      case 8:
        // 90° rotate left
        ctx.rotate(-0.5 * Math.PI)
        ctx.translate(-width, 0)
        break
    }
  }

  // Transforms coordinate and dimension options
  // based on the given orientation option:
  loadImage.getTransformedOptions = function (img, opts, data) {
    var options = originalGetTransformedOptions.call(loadImage, img, opts)
    var orientation = options.orientation
    var newOptions
    var i
    if (orientation === true && data && data.exif) {
      orientation = data.exif.get('Orientation')
    }
    if (!orientation || orientation > 8 || orientation === 1) {
      return options
    }
    newOptions = {}
    for (i in options) {
      if (options.hasOwnProperty(i)) {
        newOptions[i] = options[i]
      }
    }
    newOptions.orientation = orientation
    switch (orientation) {
      case 2:
        // horizontal flip
        newOptions.left = options.right
        newOptions.right = options.left
        break
      case 3:
        // 180° rotate left
        newOptions.left = options.right
        newOptions.top = options.bottom
        newOptions.right = options.left
        newOptions.bottom = options.top
        break
      case 4:
        // vertical flip
        newOptions.top = options.bottom
        newOptions.bottom = options.top
        break
      case 5:
        // vertical flip + 90 rotate right
        newOptions.left = options.top
        newOptions.top = options.left
        newOptions.right = options.bottom
        newOptions.bottom = options.right
        break
      case 6:
        // 90° rotate right
        newOptions.left = options.top
        newOptions.top = options.right
        newOptions.right = options.bottom
        newOptions.bottom = options.left
        break
      case 7:
        // horizontal flip + 90 rotate right
        newOptions.left = options.bottom
        newOptions.top = options.right
        newOptions.right = options.top
        newOptions.bottom = options.left
        break
      case 8:
        // 90° rotate left
        newOptions.left = options.bottom
        newOptions.top = options.left
        newOptions.right = options.top
        newOptions.bottom = options.right
        break
    }
    if (newOptions.orientation > 4) {
      newOptions.maxWidth = options.maxHeight
      newOptions.maxHeight = options.maxWidth
      newOptions.minWidth = options.minHeight
      newOptions.minHeight = options.minWidth
      newOptions.sourceWidth = options.sourceHeight
      newOptions.sourceHeight = options.sourceWidth
    }
    return newOptions
  }
})
