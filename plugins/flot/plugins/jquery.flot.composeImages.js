/** ## jquery.flot.composeImages.js

This plugin is used to expose a function used to overlap several canvases and
SVGs, for the purpose of creating a snaphot out of them.

### When composeImages is used:
When multiple canvases and SVGs have to be overlapped into a single image
and their offset on the page, must be preserved.

### Where can be used:
In creating a downloadable snapshot of the plots, axes, cursors etc of a graph.

### How it works:
The entry point is composeImages function. It expects an array of objects,
which should be either canvases or SVGs (or a mix). It does a prevalidation
of them, by verifying if they will be usable or not, later in the flow.
After selecting only usable sources, it passes them to getGenerateTempImg
function, which generates temporary images out of them. This function
expects that some of the passed sources (canvas or SVG) may still have
problems being converted to an image and makes sure the promises system,
used by composeImages function, moves forward. As an example, SVGs with
missing information from header or with unsupported content, may lead to
failure in generating the temporary image. Temporary images are required
mostly on extracting content from SVGs, but this is also where the x/y
offsets are extracted for each image which will be added. For SVGs in
particular, their CSS rules have to be applied.
After all temporary images are generated, they are overlapped using
getExecuteImgComposition function. This is where the destination canvas
is set to the proper dimensions. It is then output by composeImages.
This function returns a promise, which can be used to wait for the whole
composition process. It requires to be asynchronous, because this is how
temporary images load their data.
*/

(function($) {
    "use strict";
    const GENERALFAILURECALLBACKERROR = -100; //simply a negative number
    const SUCCESSFULIMAGEPREPARATION = 0;
    const EMPTYARRAYOFIMAGESOURCES = -1;
    const NEGATIVEIMAGESIZE = -2;
    var pixelRatio = 1;
    var browser = $.plot.browser;
    var getPixelRatio = browser.getPixelRatio;

    function composeImages(canvasOrSvgSources, destinationCanvas) {
        var validCanvasOrSvgSources = canvasOrSvgSources.filter(isValidSource);
        pixelRatio = getPixelRatio(destinationCanvas.getContext('2d'));

        var allImgCompositionPromises = validCanvasOrSvgSources.map(function(validCanvasOrSvgSource) {
            var tempImg = new Image();
            var currentPromise = new Promise(getGenerateTempImg(tempImg, validCanvasOrSvgSource));
            return currentPromise;
        });

        var lastPromise = Promise.all(allImgCompositionPromises).then(getExecuteImgComposition(destinationCanvas), failureCallback);
        return lastPromise;
    }

    function isValidSource(canvasOrSvgSource) {
        var isValidFromCanvas = true;
        var isValidFromContent = true;
        if ((canvasOrSvgSource === null) || (canvasOrSvgSource === undefined)) {
            isValidFromContent = false;
        } else {
            if (canvasOrSvgSource.tagName === 'CANVAS') {
                if ((canvasOrSvgSource.getBoundingClientRect().right === canvasOrSvgSource.getBoundingClientRect().left) ||
                    (canvasOrSvgSource.getBoundingClientRect().bottom === canvasOrSvgSource.getBoundingClientRect().top)) {
                    isValidFromCanvas = false;
                }
            }
        }
        return isValidFromContent && isValidFromCanvas && (window.getComputedStyle(canvasOrSvgSource).visibility === 'visible');
    }

    function getGenerateTempImg(tempImg, canvasOrSvgSource) {
        tempImg.sourceDescription = '<info className="' + canvasOrSvgSource.className + '" tagName="' + canvasOrSvgSource.tagName + '" id="' + canvasOrSvgSource.id + '">';
        tempImg.sourceComponent = canvasOrSvgSource;

        return function doGenerateTempImg(successCallbackFunc, failureCallbackFunc) {
            tempImg.onload = function(evt) {
                tempImg.successfullyLoaded = true;
                successCallbackFunc(tempImg);
            };

            tempImg.onabort = function(evt) {
                tempImg.successfullyLoaded = false;
                console.log('Can\'t generate temp image from ' + tempImg.sourceDescription + '. It is possible that it is missing some properties or its content is not supported by this browser. Source component:', tempImg.sourceComponent);
                successCallbackFunc(tempImg); //call successCallback, to allow snapshot of all working images
            };

            tempImg.onerror = function(evt) {
                tempImg.successfullyLoaded = false;
                console.log('Can\'t generate temp image from ' + tempImg.sourceDescription + '. It is possible that it is missing some properties or its content is not supported by this browser. Source component:', tempImg.sourceComponent);
                successCallbackFunc(tempImg); //call successCallback, to allow snapshot of all working images
            };

            generateTempImageFromCanvasOrSvg(canvasOrSvgSource, tempImg);
        };
    }

    function getExecuteImgComposition(destinationCanvas) {
        return function executeImgComposition(tempImgs) {
            var compositionResult = copyImgsToCanvas(tempImgs, destinationCanvas);
            return compositionResult;
        };
    }

    function copyCanvasToImg(canvas, img) {
        img.src = canvas.toDataURL('image/png');
    }

    function getCSSRules(document) {
        var styleSheets = document.styleSheets,
            rulesList = [];
        for (var i = 0; i < styleSheets.length; i++) {
            // CORS requests for style sheets throw and an exception on Chrome > 64
            try {
                // in Chrome, the external CSS files are empty when the page is directly loaded from disk
                var rules = styleSheets[i].cssRules || [];
                for (var j = 0; j < rules.length; j++) {
                    var rule = rules[j];
                    rulesList.push(rule.cssText);
                }
            } catch (e) {
                console.log('Failed to get some css rules');
            }
        }
        return rulesList;
    }

    function embedCSSRulesInSVG(rules, svg) {
        var text = [
            '<svg class="snapshot ' + svg.classList + '" width="' + svg.width.baseVal.value * pixelRatio + '" height="' + svg.height.baseVal.value * pixelRatio + '" viewBox="0 0 ' + svg.width.baseVal.value + ' ' + svg.height.baseVal.value + '" xmlns="http://www.w3.org/2000/svg">',
            '<style>',
            '/* <![CDATA[ */',
            rules.join('\n'),
            '/* ]]> */',
            '</style>',
            svg.innerHTML,
            '</svg>'
        ].join('\n');
        return text;
    }

    function copySVGToImgMostBrowsers(svg, img) {
        var rules = getCSSRules(document),
            source = embedCSSRulesInSVG(rules, svg);

        source = patchSVGSource(source);

        var blob = new Blob([source], {type: "image/svg+xml;charset=utf-8"}),
            domURL = self.URL || self.webkitURL || self,
            url = domURL.createObjectURL(blob);
        img.src = url;
    }

    function copySVGToImgSafari(svg, img) {
        // Use this method to convert a string buffer array to a binary string.
        // Do so by breaking up large strings into smaller substrings; this is necessary to avoid the
        // "maximum call stack size exceeded" exception that can happen when calling 'String.fromCharCode.apply'
        // with a very long array.
        function buildBinaryString (arrayBuffer) {
            var binaryString = "";
            const utf8Array = new Uint8Array(arrayBuffer);
            const blockSize = 16384;
            for (var i = 0; i < utf8Array.length; i = i + blockSize) {
                const binarySubString = String.fromCharCode.apply(null, utf8Array.subarray(i, i + blockSize));
                binaryString = binaryString + binarySubString;
            }
            return binaryString;
        };

        var rules = getCSSRules(document),
            source = embedCSSRulesInSVG(rules, svg),
            data,
            utf8BinaryString;

        source = patchSVGSource(source);

        // Encode the string as UTF-8 and convert it to a binary string. The UTF-8 encoding is required to
        // capture unicode characters correctly.
        utf8BinaryString = buildBinaryString(new (TextEncoder || TextEncoderLite)('utf-8').encode(source));

        data = "data:image/svg+xml;base64," + btoa(utf8BinaryString);
        img.src = data;
    }

    function patchSVGSource(svgSource) {
        var source = '';
        //add name spaces.
        if (!svgSource.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = svgSource.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!svgSource.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
            source = svgSource.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        //add xml declaration
        return '<?xml version="1.0" standalone="no"?>\r\n' + source;
    }

    function copySVGToImg(svg, img) {
        if (browser.isSafari() || browser.isMobileSafari()) {
            copySVGToImgSafari(svg, img);
        } else {
            copySVGToImgMostBrowsers(svg, img);
        }
    }

    function adaptDestSizeToZoom(destinationCanvas, sources) {
        function containsSVGs(source) {
            return source.srcImgTagName === 'svg';
        }

        if (sources.find(containsSVGs) !== undefined) {
            if (pixelRatio < 1) {
                destinationCanvas.width = destinationCanvas.width * pixelRatio;
                destinationCanvas.height = destinationCanvas.height * pixelRatio;
            }
        }
    }

    function prepareImagesToBeComposed(sources, destination) {
        var result = SUCCESSFULIMAGEPREPARATION;
        if (sources.length === 0) {
            result = EMPTYARRAYOFIMAGESOURCES; //nothing to do if called without sources
        } else {
            var minX = sources[0].genLeft;
            var minY = sources[0].genTop;
            var maxX = sources[0].genRight;
            var maxY = sources[0].genBottom;
            var i = 0;

            for (i = 1; i < sources.length; i++) {
                if (minX > sources[i].genLeft) {
                    minX = sources[i].genLeft;
                }

                if (minY > sources[i].genTop) {
                    minY = sources[i].genTop;
                }
            }

            for (i = 1; i < sources.length; i++) {
                if (maxX < sources[i].genRight) {
                    maxX = sources[i].genRight;
                }

                if (maxY < sources[i].genBottom) {
                    maxY = sources[i].genBottom;
                }
            }

            if ((maxX - minX <= 0) || (maxY - minY <= 0)) {
                result = NEGATIVEIMAGESIZE; //this might occur on hidden images
            } else {
                destination.width = Math.round(maxX - minX);
                destination.height = Math.round(maxY - minY);

                for (i = 0; i < sources.length; i++) {
                    sources[i].xCompOffset = sources[i].genLeft - minX;
                    sources[i].yCompOffset = sources[i].genTop - minY;
                }

                adaptDestSizeToZoom(destination, sources);
            }
        }
        return result;
    }

    function copyImgsToCanvas(sources, destination) {
        var prepareImagesResult = prepareImagesToBeComposed(sources, destination);
        if (prepareImagesResult === SUCCESSFULIMAGEPREPARATION) {
            var destinationCtx = destination.getContext('2d');

            for (var i = 0; i < sources.length; i++) {
                if (sources[i].successfullyLoaded === true) {
                    destinationCtx.drawImage(sources[i], sources[i].xCompOffset * pixelRatio, sources[i].yCompOffset * pixelRatio);
                }
            }
        }
        return prepareImagesResult;
    }

    function adnotateDestImgWithBoundingClientRect(srcCanvasOrSvg, destImg) {
        destImg.genLeft = srcCanvasOrSvg.getBoundingClientRect().left;
        destImg.genTop = srcCanvasOrSvg.getBoundingClientRect().top;

        if (srcCanvasOrSvg.tagName === 'CANVAS') {
            destImg.genRight = destImg.genLeft + srcCanvasOrSvg.width;
            destImg.genBottom = destImg.genTop + srcCanvasOrSvg.height;
        }

        if (srcCanvasOrSvg.tagName === 'svg') {
            destImg.genRight = srcCanvasOrSvg.getBoundingClientRect().right;
            destImg.genBottom = srcCanvasOrSvg.getBoundingClientRect().bottom;
        }
    }

    function generateTempImageFromCanvasOrSvg(srcCanvasOrSvg, destImg) {
        if (srcCanvasOrSvg.tagName === 'CANVAS') {
            copyCanvasToImg(srcCanvasOrSvg, destImg);
        }

        if (srcCanvasOrSvg.tagName === 'svg') {
            copySVGToImg(srcCanvasOrSvg, destImg);
        }

        destImg.srcImgTagName = srcCanvasOrSvg.tagName;
        adnotateDestImgWithBoundingClientRect(srcCanvasOrSvg, destImg);
    }

    function failureCallback() {
        return GENERALFAILURECALLBACKERROR;
    }

    // used for testing
    $.plot.composeImages = composeImages;

    function init(plot) {
        // used to extend the public API of the plot
        plot.composeImages = composeImages;
    }

    $.plot.plugins.push({
        init: init,
        name: 'composeImages',
        version: '1.0'
    });
})(jQuery);
