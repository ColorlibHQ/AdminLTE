/*
 * JavaScript Canvas to Blob Test
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global describe, it, Blob, chai, dataURLtoBlob */

;(function () {
  'use strict'

  var expect = chai.expect
  var canvasToBlob = function (canvas, callback, type, quality) {
    setTimeout(function () {
      callback(dataURLtoBlob(canvas.toDataURL(type, quality)))
    })
  }

  // 80x60px GIF image (color black, base64 data):
  var b64Data =
    'R0lGODdhUAA8AIABAAAAAP///ywAAAAAUAA8AAACS4SPqcvtD6' +
    'OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofE' +
    'ovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5PKsAAA7'
  var imageUrl = 'data:image/gif;base64,' + b64Data
  var blob = dataURLtoBlob(imageUrl)

  describe('canvas.toBlob', function () {
    it('Converts a canvas element to a blob and passes it to the callback function', function (
      done
    ) {
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(canvas, function (newBlob) {
            expect(newBlob).to.be.a.instanceOf(Blob)
            done()
          })
        },
        { canvas: true }
      )
    })

    it('Converts a canvas element to a PNG blob', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(
            canvas,
            function (newBlob) {
              expect(newBlob.type).to.equal('image/png')
              done()
            },
            'image/png'
          )
        },
        { canvas: true }
      )
    })

    it('Converts a canvas element to a JPG blob', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(
            canvas,
            function (newBlob) {
              expect(newBlob.type).to.equal('image/jpeg')
              done()
            },
            'image/jpeg'
          )
        },
        { canvas: true }
      )
    })

    it('Keeps the aspect ratio of the canvas image', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(canvas, function (newBlob) {
            window.loadImage(newBlob, function (img) {
              expect(img.width).to.equal(canvas.width)
              expect(img.height).to.equal(canvas.height)
              done()
            })
          })
        },
        { canvas: true }
      )
    })

    it('Keeps the image data of the canvas image', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(canvas, function (newBlob) {
            window.loadImage(
              newBlob,
              function (newCanvas) {
                var canvasData = canvas
                  .getContext('2d')
                  .getImageData(0, 0, canvas.width, canvas.height)
                var newCanvasData = newCanvas
                  .getContext('2d')
                  .getImageData(0, 0, newCanvas.width, newCanvas.height)
                expect(canvasData.width).to.equal(newCanvasData.width)
                expect(canvasData.height).to.equal(newCanvasData.height)
                done()
              },
              { canvas: true }
            )
          })
        },
        { canvas: true }
      )
    })
  })
})()
