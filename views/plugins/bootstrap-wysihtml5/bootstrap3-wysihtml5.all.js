// TODO: in future try to replace most inline compability checks with polyfills for code readability 

// element.textContent polyfill.
// Unsupporting browsers: IE8

if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
	(function() {
		var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
		Object.defineProperty(Element.prototype, "textContent",
			{
				get: function() {
					return innerText.get.call(this);
				},
				set: function(s) {
					return innerText.set.call(this, s);
				}
			}
		);
	})();
}

// isArray polyfill for ie8
if(!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
};/**
 * @license wysihtml5x v0.4.15
 * https://github.com/Edicy/wysihtml5
 *
 * Author: Christopher Blum (https://github.com/tiff)
 * Secondary author of extended features: Oliver Pulges (https://github.com/pulges)
 *
 * Copyright (C) 2012 XING AG
 * Licensed under the MIT license (MIT)
 *
 */
var wysihtml5 = {
  version: "0.4.15",

  // namespaces
  commands:   {},
  dom:        {},
  quirks:     {},
  toolbar:    {},
  lang:       {},
  selection:  {},
  views:      {},

  INVISIBLE_SPACE: "\uFEFF",

  EMPTY_FUNCTION: function() {},

  ELEMENT_NODE: 1,
  TEXT_NODE:    3,

  BACKSPACE_KEY:  8,
  ENTER_KEY:      13,
  ESCAPE_KEY:     27,
  SPACE_KEY:      32,
  DELETE_KEY:     46
};
;/**
 * Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Copyright 2014, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3alpha.20140804
 * Build date: 4 August 2014
 */

(function(factory, global) {
    if (typeof define == "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
/*
    TODO: look into this properly.
    
    } else if (typeof exports == "object") {
        // Node/CommonJS style for Browserify
        module.exports = factory;
*/
    } else {
        // No AMD or CommonJS support so we place Rangy in a global variable
        global.rangy = factory();
    }
})(function() {

    var OBJECT = "object", FUNCTION = "function", UNDEFINED = "undefined";

    // Minimal set of properties required for DOM Level 2 Range compliance. Comparison constants such as START_TO_START
    // are omitted because ranges in KHTML do not have them but otherwise work perfectly well. See issue 113.
    var domRangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed",
        "commonAncestorContainer"];

    // Minimal set of methods required for DOM Level 2 Range compliance
    var domRangeMethods = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore",
        "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents",
        "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"];

    var textRangeProperties = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"];

    // Subset of TextRange's full set of methods that we're interested in
    var textRangeMethods = ["collapse", "compareEndPoints", "duplicate", "moveToElementText", "parentElement", "select",
        "setEndPoint", "getBoundingClientRect"];

    /*----------------------------------------------------------------------------------------------------------------*/

    // Trio of functions taken from Peter Michaux's article:
    // http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
    function isHostMethod(o, p) {
        var t = typeof o[p];
        return t == FUNCTION || (!!(t == OBJECT && o[p])) || t == "unknown";
    }

    function isHostObject(o, p) {
        return !!(typeof o[p] == OBJECT && o[p]);
    }

    function isHostProperty(o, p) {
        return typeof o[p] != UNDEFINED;
    }

    // Creates a convenience function to save verbose repeated calls to tests functions
    function createMultiplePropertyTest(testFunc) {
        return function(o, props) {
            var i = props.length;
            while (i--) {
                if (!testFunc(o, props[i])) {
                    return false;
                }
            }
            return true;
        };
    }

    // Next trio of functions are a convenience to save verbose repeated calls to previous two functions
    var areHostMethods = createMultiplePropertyTest(isHostMethod);
    var areHostObjects = createMultiplePropertyTest(isHostObject);
    var areHostProperties = createMultiplePropertyTest(isHostProperty);

    function isTextRange(range) {
        return range && areHostMethods(range, textRangeMethods) && areHostProperties(range, textRangeProperties);
    }

    function getBody(doc) {
        return isHostObject(doc, "body") ? doc.body : doc.getElementsByTagName("body")[0];
    }

    var modules = {};

    var api = {
        version: "1.3alpha.20140804",
        initialized: false,
        supported: true,

        util: {
            isHostMethod: isHostMethod,
            isHostObject: isHostObject,
            isHostProperty: isHostProperty,
            areHostMethods: areHostMethods,
            areHostObjects: areHostObjects,
            areHostProperties: areHostProperties,
            isTextRange: isTextRange,
            getBody: getBody
        },

        features: {},

        modules: modules,
        config: {
            alertOnFail: true,
            alertOnWarn: false,
            preferTextRange: false,
            autoInitialize: (typeof rangyAutoInitialize == UNDEFINED) ? true : rangyAutoInitialize
        }
    };

    function consoleLog(msg) {
        if (isHostObject(window, "console") && isHostMethod(window.console, "log")) {
            window.console.log(msg);
        }
    }

    function alertOrLog(msg, shouldAlert) {
        if (shouldAlert) {
            window.alert(msg);
        } else  {
            consoleLog(msg);
        }
    }

    function fail(reason) {
        api.initialized = true;
        api.supported = false;
        alertOrLog("Rangy is not supported on this page in your browser. Reason: " + reason, api.config.alertOnFail);
    }

    api.fail = fail;

    function warn(msg) {
        alertOrLog("Rangy warning: " + msg, api.config.alertOnWarn);
    }

    api.warn = warn;

    // Add utility extend() method
    if ({}.hasOwnProperty) {
        api.util.extend = function(obj, props, deep) {
            var o, p;
            for (var i in props) {
                if (props.hasOwnProperty(i)) {
                    o = obj[i];
                    p = props[i];
                    if (deep && o !== null && typeof o == "object" && p !== null && typeof p == "object") {
                        api.util.extend(o, p, true);
                    }
                    obj[i] = p;
                }
            }
            // Special case for toString, which does not show up in for...in loops in IE <= 8
            if (props.hasOwnProperty("toString")) {
                obj.toString = props.toString;
            }
            return obj;
        };
    } else {
        fail("hasOwnProperty not supported");
    }

    // Test whether Array.prototype.slice can be relied on for NodeLists and use an alternative toArray() if not
    (function() {
        var el = document.createElement("div");
        el.appendChild(document.createElement("span"));
        var slice = [].slice;
        var toArray;
        try {
            if (slice.call(el.childNodes, 0)[0].nodeType == 1) {
                toArray = function(arrayLike) {
                    return slice.call(arrayLike, 0);
                };
            }
        } catch (e) {}

        if (!toArray) {
            toArray = function(arrayLike) {
                var arr = [];
                for (var i = 0, len = arrayLike.length; i < len; ++i) {
                    arr[i] = arrayLike[i];
                }
                return arr;
            };
        }

        api.util.toArray = toArray;
    })();


    // Very simple event handler wrapper function that doesn't attempt to solve issues such as "this" handling or
    // normalization of event properties
    var addListener;
    if (isHostMethod(document, "addEventListener")) {
        addListener = function(obj, eventType, listener) {
            obj.addEventListener(eventType, listener, false);
        };
    } else if (isHostMethod(document, "attachEvent")) {
        addListener = function(obj, eventType, listener) {
            obj.attachEvent("on" + eventType, listener);
        };
    } else {
        fail("Document does not have required addEventListener or attachEvent method");
    }

    api.util.addListener = addListener;

    var initListeners = [];

    function getErrorDesc(ex) {
        return ex.message || ex.description || String(ex);
    }

    // Initialization
    function init() {
        if (api.initialized) {
            return;
        }
        var testRange;
        var implementsDomRange = false, implementsTextRange = false;

        // First, perform basic feature tests

        if (isHostMethod(document, "createRange")) {
            testRange = document.createRange();
            if (areHostMethods(testRange, domRangeMethods) && areHostProperties(testRange, domRangeProperties)) {
                implementsDomRange = true;
            }
        }

        var body = getBody(document);
        if (!body || body.nodeName.toLowerCase() != "body") {
            fail("No body element found");
            return;
        }

        if (body && isHostMethod(body, "createTextRange")) {
            testRange = body.createTextRange();
            if (isTextRange(testRange)) {
                implementsTextRange = true;
            }
        }

        if (!implementsDomRange && !implementsTextRange) {
            fail("Neither Range nor TextRange are available");
            return;
        }

        api.initialized = true;
        api.features = {
            implementsDomRange: implementsDomRange,
            implementsTextRange: implementsTextRange
        };

        // Initialize modules
        var module, errorMessage;
        for (var moduleName in modules) {
            if ( (module = modules[moduleName]) instanceof Module ) {
                module.init(module, api);
            }
        }

        // Call init listeners
        for (var i = 0, len = initListeners.length; i < len; ++i) {
            try {
                initListeners[i](api);
            } catch (ex) {
                errorMessage = "Rangy init listener threw an exception. Continuing. Detail: " + getErrorDesc(ex);
                consoleLog(errorMessage);
            }
        }
    }

    // Allow external scripts to initialize this library in case it's loaded after the document has loaded
    api.init = init;

    // Execute listener immediately if already initialized
    api.addInitListener = function(listener) {
        if (api.initialized) {
            listener(api);
        } else {
            initListeners.push(listener);
        }
    };

    var shimListeners = [];

    api.addShimListener = function(listener) {
        shimListeners.push(listener);
    };

    function shim(win) {
        win = win || window;
        init();

        // Notify listeners
        for (var i = 0, len = shimListeners.length; i < len; ++i) {
            shimListeners[i](win);
        }
    }

    api.shim = api.createMissingNativeApi = shim;

    function Module(name, dependencies, initializer) {
        this.name = name;
        this.dependencies = dependencies;
        this.initialized = false;
        this.supported = false;
        this.initializer = initializer;
    }

    Module.prototype = {
        init: function() {
            var requiredModuleNames = this.dependencies || [];
            for (var i = 0, len = requiredModuleNames.length, requiredModule, moduleName; i < len; ++i) {
                moduleName = requiredModuleNames[i];

                requiredModule = modules[moduleName];
                if (!requiredModule || !(requiredModule instanceof Module)) {
                    throw new Error("required module '" + moduleName + "' not found");
                }

                requiredModule.init();

                if (!requiredModule.supported) {
                    throw new Error("required module '" + moduleName + "' not supported");
                }
            }
            
            // Now run initializer
            this.initializer(this);
        },
        
        fail: function(reason) {
            this.initialized = true;
            this.supported = false;
            throw new Error("Module '" + this.name + "' failed to load: " + reason);
        },

        warn: function(msg) {
            api.warn("Module " + this.name + ": " + msg);
        },

        deprecationNotice: function(deprecated, replacement) {
            api.warn("DEPRECATED: " + deprecated + " in module " + this.name + "is deprecated. Please use " +
                replacement + " instead");
        },

        createError: function(msg) {
            return new Error("Error in Rangy " + this.name + " module: " + msg);
        }
    };
    
    function createModule(isCore, name, dependencies, initFunc) {
        var newModule = new Module(name, dependencies, function(module) {
            if (!module.initialized) {
                module.initialized = true;
                try {
                    initFunc(api, module);
                    module.supported = true;
                } catch (ex) {
                    var errorMessage = "Module '" + name + "' failed to load: " + getErrorDesc(ex);
                    consoleLog(errorMessage);
                }
            }
        });
        modules[name] = newModule;
    }

    api.createModule = function(name) {
        // Allow 2 or 3 arguments (second argument is an optional array of dependencies)
        var initFunc, dependencies;
        if (arguments.length == 2) {
            initFunc = arguments[1];
            dependencies = [];
        } else {
            initFunc = arguments[2];
            dependencies = arguments[1];
        }

        var module = createModule(false, name, dependencies, initFunc);

        // Initialize the module immediately if the core is already initialized
        if (api.initialized) {
            module.init();
        }
    };

    api.createCoreModule = function(name, dependencies, initFunc) {
        createModule(true, name, dependencies, initFunc);
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    // Ensure rangy.rangePrototype and rangy.selectionPrototype are available immediately

    function RangePrototype() {}
    api.RangePrototype = RangePrototype;
    api.rangePrototype = new RangePrototype();

    function SelectionPrototype() {}
    api.selectionPrototype = new SelectionPrototype();

    /*----------------------------------------------------------------------------------------------------------------*/

    // Wait for document to load before running tests

    var docReady = false;

    var loadHandler = function(e) {
        if (!docReady) {
            docReady = true;
            if (!api.initialized && api.config.autoInitialize) {
                init();
            }
        }
    };

    // Test whether we have window and document objects that we will need
    if (typeof window == UNDEFINED) {
        fail("No window found");
        return;
    }
    if (typeof document == UNDEFINED) {
        fail("No document found");
        return;
    }

    if (isHostMethod(document, "addEventListener")) {
        document.addEventListener("DOMContentLoaded", loadHandler, false);
    }

    // Add a fallback in case the DOMContentLoaded event isn't supported
    addListener(window, "load", loadHandler);

    /*----------------------------------------------------------------------------------------------------------------*/
    
    // DOM utility methods used by Rangy
    api.createCoreModule("DomUtil", [], function(api, module) {
        var UNDEF = "undefined";
        var util = api.util;

        // Perform feature tests
        if (!util.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"])) {
            module.fail("document missing a Node creation method");
        }

        if (!util.isHostMethod(document, "getElementsByTagName")) {
            module.fail("document missing getElementsByTagName method");
        }

        var el = document.createElement("div");
        if (!util.areHostMethods(el, ["insertBefore", "appendChild", "cloneNode"] ||
                !util.areHostObjects(el, ["previousSibling", "nextSibling", "childNodes", "parentNode"]))) {
            module.fail("Incomplete Element implementation");
        }

        // innerHTML is required for Range's createContextualFragment method
        if (!util.isHostProperty(el, "innerHTML")) {
            module.fail("Element is missing innerHTML property");
        }

        var textNode = document.createTextNode("test");
        if (!util.areHostMethods(textNode, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"] ||
                !util.areHostObjects(el, ["previousSibling", "nextSibling", "childNodes", "parentNode"]) ||
                !util.areHostProperties(textNode, ["data"]))) {
            module.fail("Incomplete Text Node implementation");
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Removed use of indexOf because of a bizarre bug in Opera that is thrown in one of the Acid3 tests. I haven't been
        // able to replicate it outside of the test. The bug is that indexOf returns -1 when called on an Array that
        // contains just the document as a single element and the value searched for is the document.
        var arrayContains = /*Array.prototype.indexOf ?
            function(arr, val) {
                return arr.indexOf(val) > -1;
            }:*/

            function(arr, val) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === val) {
                        return true;
                    }
                }
                return false;
            };

        // Opera 11 puts HTML elements in the null namespace, it seems, and IE 7 has undefined namespaceURI
        function isHtmlNamespace(node) {
            var ns;
            return typeof node.namespaceURI == UNDEF || ((ns = node.namespaceURI) === null || ns == "http://www.w3.org/1999/xhtml");
        }

        function parentElement(node) {
            var parent = node.parentNode;
            return (parent.nodeType == 1) ? parent : null;
        }

        function getNodeIndex(node) {
            var i = 0;
            while( (node = node.previousSibling) ) {
                ++i;
            }
            return i;
        }

        function getNodeLength(node) {
            switch (node.nodeType) {
                case 7:
                case 10:
                    return 0;
                case 3:
                case 8:
                    return node.length;
                default:
                    return node.childNodes.length;
            }
        }

        function getCommonAncestor(node1, node2) {
            var ancestors = [], n;
            for (n = node1; n; n = n.parentNode) {
                ancestors.push(n);
            }

            for (n = node2; n; n = n.parentNode) {
                if (arrayContains(ancestors, n)) {
                    return n;
                }
            }

            return null;
        }

        function isAncestorOf(ancestor, descendant, selfIsAncestor) {
            var n = selfIsAncestor ? descendant : descendant.parentNode;
            while (n) {
                if (n === ancestor) {
                    return true;
                } else {
                    n = n.parentNode;
                }
            }
            return false;
        }

        function isOrIsAncestorOf(ancestor, descendant) {
            return isAncestorOf(ancestor, descendant, true);
        }

        function getClosestAncestorIn(node, ancestor, selfIsAncestor) {
            var p, n = selfIsAncestor ? node : node.parentNode;
            while (n) {
                p = n.parentNode;
                if (p === ancestor) {
                    return n;
                }
                n = p;
            }
            return null;
        }

        function isCharacterDataNode(node) {
            var t = node.nodeType;
            return t == 3 || t == 4 || t == 8 ; // Text, CDataSection or Comment
        }

        function isTextOrCommentNode(node) {
            if (!node) {
                return false;
            }
            var t = node.nodeType;
            return t == 3 || t == 8 ; // Text or Comment
        }

        function insertAfter(node, precedingNode) {
            var nextNode = precedingNode.nextSibling, parent = precedingNode.parentNode;
            if (nextNode) {
                parent.insertBefore(node, nextNode);
            } else {
                parent.appendChild(node);
            }
            return node;
        }

        // Note that we cannot use splitText() because it is bugridden in IE 9.
        function splitDataNode(node, index, positionsToPreserve) {
            var newNode = node.cloneNode(false);
            newNode.deleteData(0, index);
            node.deleteData(index, node.length - index);
            insertAfter(newNode, node);

            // Preserve positions
            if (positionsToPreserve) {
                for (var i = 0, position; position = positionsToPreserve[i++]; ) {
                    // Handle case where position was inside the portion of node after the split point
                    if (position.node == node && position.offset > index) {
                        position.node = newNode;
                        position.offset -= index;
                    }
                    // Handle the case where the position is a node offset within node's parent
                    else if (position.node == node.parentNode && position.offset > getNodeIndex(node)) {
                        ++position.offset;
                    }
                }
            }
            return newNode;
        }

        function getDocument(node) {
            if (node.nodeType == 9) {
                return node;
            } else if (typeof node.ownerDocument != UNDEF) {
                return node.ownerDocument;
            } else if (typeof node.document != UNDEF) {
                return node.document;
            } else if (node.parentNode) {
                return getDocument(node.parentNode);
            } else {
                throw module.createError("getDocument: no document found for node");
            }
        }

        function getWindow(node) {
            var doc = getDocument(node);
            if (typeof doc.defaultView != UNDEF) {
                return doc.defaultView;
            } else if (typeof doc.parentWindow != UNDEF) {
                return doc.parentWindow;
            } else {
                throw module.createError("Cannot get a window object for node");
            }
        }

        function getIframeDocument(iframeEl) {
            if (typeof iframeEl.contentDocument != UNDEF) {
                return iframeEl.contentDocument;
            } else if (typeof iframeEl.contentWindow != UNDEF) {
                return iframeEl.contentWindow.document;
            } else {
                throw module.createError("getIframeDocument: No Document object found for iframe element");
            }
        }

        function getIframeWindow(iframeEl) {
            if (typeof iframeEl.contentWindow != UNDEF) {
                return iframeEl.contentWindow;
            } else if (typeof iframeEl.contentDocument != UNDEF) {
                return iframeEl.contentDocument.defaultView;
            } else {
                throw module.createError("getIframeWindow: No Window object found for iframe element");
            }
        }

        // This looks bad. Is it worth it?
        function isWindow(obj) {
            return obj && util.isHostMethod(obj, "setTimeout") && util.isHostObject(obj, "document");
        }

        function getContentDocument(obj, module, methodName) {
            var doc;

            if (!obj) {
                doc = document;
            }

            // Test if a DOM node has been passed and obtain a document object for it if so
            else if (util.isHostProperty(obj, "nodeType")) {
                doc = (obj.nodeType == 1 && obj.tagName.toLowerCase() == "iframe") ?
                    getIframeDocument(obj) : getDocument(obj);
            }

            // Test if the doc parameter appears to be a Window object
            else if (isWindow(obj)) {
                doc = obj.document;
            }

            if (!doc) {
                throw module.createError(methodName + "(): Parameter must be a Window object or DOM node");
            }

            return doc;
        }

        function getRootContainer(node) {
            var parent;
            while ( (parent = node.parentNode) ) {
                node = parent;
            }
            return node;
        }

        function comparePoints(nodeA, offsetA, nodeB, offsetB) {
            // See http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Comparing
            var nodeC, root, childA, childB, n;
            if (nodeA == nodeB) {
                // Case 1: nodes are the same
                return offsetA === offsetB ? 0 : (offsetA < offsetB) ? -1 : 1;
            } else if ( (nodeC = getClosestAncestorIn(nodeB, nodeA, true)) ) {
                // Case 2: node C (container B or an ancestor) is a child node of A
                return offsetA <= getNodeIndex(nodeC) ? -1 : 1;
            } else if ( (nodeC = getClosestAncestorIn(nodeA, nodeB, true)) ) {
                // Case 3: node C (container A or an ancestor) is a child node of B
                return getNodeIndex(nodeC) < offsetB  ? -1 : 1;
            } else {
                root = getCommonAncestor(nodeA, nodeB);
                if (!root) {
                    throw new Error("comparePoints error: nodes have no common ancestor");
                }

                // Case 4: containers are siblings or descendants of siblings
                childA = (nodeA === root) ? root : getClosestAncestorIn(nodeA, root, true);
                childB = (nodeB === root) ? root : getClosestAncestorIn(nodeB, root, true);

                if (childA === childB) {
                    // This shouldn't be possible
                    throw module.createError("comparePoints got to case 4 and childA and childB are the same!");
                } else {
                    n = root.firstChild;
                    while (n) {
                        if (n === childA) {
                            return -1;
                        } else if (n === childB) {
                            return 1;
                        }
                        n = n.nextSibling;
                    }
                }
            }
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Test for IE's crash (IE 6/7) or exception (IE >= 8) when a reference to garbage-collected text node is queried
        var crashyTextNodes = false;

        function isBrokenNode(node) {
            var n;
            try {
                n = node.parentNode;
                return false;
            } catch (e) {
                return true;
            }
        }

        (function() {
            var el = document.createElement("b");
            el.innerHTML = "1";
            var textNode = el.firstChild;
            el.innerHTML = "<br>";
            crashyTextNodes = isBrokenNode(textNode);

            api.features.crashyTextNodes = crashyTextNodes;
        })();

        /*----------------------------------------------------------------------------------------------------------------*/

        function inspectNode(node) {
            if (!node) {
                return "[No node]";
            }
            if (crashyTextNodes && isBrokenNode(node)) {
                return "[Broken node]";
            }
            if (isCharacterDataNode(node)) {
                return '"' + node.data + '"';
            }
            if (node.nodeType == 1) {
                var idAttr = node.id ? ' id="' + node.id + '"' : "";
                return "<" + node.nodeName + idAttr + ">[index:" + getNodeIndex(node) + ",length:" + node.childNodes.length + "][" + (node.innerHTML || "[innerHTML not supported]").slice(0, 25) + "]";
            }
            return node.nodeName;
        }

        function fragmentFromNodeChildren(node) {
            var fragment = getDocument(node).createDocumentFragment(), child;
            while ( (child = node.firstChild) ) {
                fragment.appendChild(child);
            }
            return fragment;
        }

        var getComputedStyleProperty;
        if (typeof window.getComputedStyle != UNDEF) {
            getComputedStyleProperty = function(el, propName) {
                return getWindow(el).getComputedStyle(el, null)[propName];
            };
        } else if (typeof document.documentElement.currentStyle != UNDEF) {
            getComputedStyleProperty = function(el, propName) {
                return el.currentStyle[propName];
            };
        } else {
            module.fail("No means of obtaining computed style properties found");
        }

        function NodeIterator(root) {
            this.root = root;
            this._next = root;
        }

        NodeIterator.prototype = {
            _current: null,

            hasNext: function() {
                return !!this._next;
            },

            next: function() {
                var n = this._current = this._next;
                var child, next;
                if (this._current) {
                    child = n.firstChild;
                    if (child) {
                        this._next = child;
                    } else {
                        next = null;
                        while ((n !== this.root) && !(next = n.nextSibling)) {
                            n = n.parentNode;
                        }
                        this._next = next;
                    }
                }
                return this._current;
            },

            detach: function() {
                this._current = this._next = this.root = null;
            }
        };

        function createIterator(root) {
            return new NodeIterator(root);
        }

        function DomPosition(node, offset) {
            this.node = node;
            this.offset = offset;
        }

        DomPosition.prototype = {
            equals: function(pos) {
                return !!pos && this.node === pos.node && this.offset == pos.offset;
            },

            inspect: function() {
                return "[DomPosition(" + inspectNode(this.node) + ":" + this.offset + ")]";
            },

            toString: function() {
                return this.inspect();
            }
        };

        function DOMException(codeName) {
            this.code = this[codeName];
            this.codeName = codeName;
            this.message = "DOMException: " + this.codeName;
        }

        DOMException.prototype = {
            INDEX_SIZE_ERR: 1,
            HIERARCHY_REQUEST_ERR: 3,
            WRONG_DOCUMENT_ERR: 4,
            NO_MODIFICATION_ALLOWED_ERR: 7,
            NOT_FOUND_ERR: 8,
            NOT_SUPPORTED_ERR: 9,
            INVALID_STATE_ERR: 11,
            INVALID_NODE_TYPE_ERR: 24
        };

        DOMException.prototype.toString = function() {
            return this.message;
        };

        api.dom = {
            arrayContains: arrayContains,
            isHtmlNamespace: isHtmlNamespace,
            parentElement: parentElement,
            getNodeIndex: getNodeIndex,
            getNodeLength: getNodeLength,
            getCommonAncestor: getCommonAncestor,
            isAncestorOf: isAncestorOf,
            isOrIsAncestorOf: isOrIsAncestorOf,
            getClosestAncestorIn: getClosestAncestorIn,
            isCharacterDataNode: isCharacterDataNode,
            isTextOrCommentNode: isTextOrCommentNode,
            insertAfter: insertAfter,
            splitDataNode: splitDataNode,
            getDocument: getDocument,
            getWindow: getWindow,
            getIframeWindow: getIframeWindow,
            getIframeDocument: getIframeDocument,
            getBody: util.getBody,
            isWindow: isWindow,
            getContentDocument: getContentDocument,
            getRootContainer: getRootContainer,
            comparePoints: comparePoints,
            isBrokenNode: isBrokenNode,
            inspectNode: inspectNode,
            getComputedStyleProperty: getComputedStyleProperty,
            fragmentFromNodeChildren: fragmentFromNodeChildren,
            createIterator: createIterator,
            DomPosition: DomPosition
        };

        api.DOMException = DOMException;
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // Pure JavaScript implementation of DOM Range
    api.createCoreModule("DomRange", ["DomUtil"], function(api, module) {
        var dom = api.dom;
        var util = api.util;
        var DomPosition = dom.DomPosition;
        var DOMException = api.DOMException;

        var isCharacterDataNode = dom.isCharacterDataNode;
        var getNodeIndex = dom.getNodeIndex;
        var isOrIsAncestorOf = dom.isOrIsAncestorOf;
        var getDocument = dom.getDocument;
        var comparePoints = dom.comparePoints;
        var splitDataNode = dom.splitDataNode;
        var getClosestAncestorIn = dom.getClosestAncestorIn;
        var getNodeLength = dom.getNodeLength;
        var arrayContains = dom.arrayContains;
        var getRootContainer = dom.getRootContainer;
        var crashyTextNodes = api.features.crashyTextNodes;

        /*----------------------------------------------------------------------------------------------------------------*/

        // Utility functions

        function isNonTextPartiallySelected(node, range) {
            return (node.nodeType != 3) &&
                   (isOrIsAncestorOf(node, range.startContainer) || isOrIsAncestorOf(node, range.endContainer));
        }

        function getRangeDocument(range) {
            return range.document || getDocument(range.startContainer);
        }

        function getBoundaryBeforeNode(node) {
            return new DomPosition(node.parentNode, getNodeIndex(node));
        }

        function getBoundaryAfterNode(node) {
            return new DomPosition(node.parentNode, getNodeIndex(node) + 1);
        }

        function insertNodeAtPosition(node, n, o) {
            var firstNodeInserted = node.nodeType == 11 ? node.firstChild : node;
            if (isCharacterDataNode(n)) {
                if (o == n.length) {
                    dom.insertAfter(node, n);
                } else {
                    n.parentNode.insertBefore(node, o == 0 ? n : splitDataNode(n, o));
                }
            } else if (o >= n.childNodes.length) {
                n.appendChild(node);
            } else {
                n.insertBefore(node, n.childNodes[o]);
            }
            return firstNodeInserted;
        }

        function rangesIntersect(rangeA, rangeB, touchingIsIntersecting) {
            assertRangeValid(rangeA);
            assertRangeValid(rangeB);

            if (getRangeDocument(rangeB) != getRangeDocument(rangeA)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }

            var startComparison = comparePoints(rangeA.startContainer, rangeA.startOffset, rangeB.endContainer, rangeB.endOffset),
                endComparison = comparePoints(rangeA.endContainer, rangeA.endOffset, rangeB.startContainer, rangeB.startOffset);

            return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
        }

        function cloneSubtree(iterator) {
            var partiallySelected;
            for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {
                partiallySelected = iterator.isPartiallySelectedSubtree();
                node = node.cloneNode(!partiallySelected);
                if (partiallySelected) {
                    subIterator = iterator.getSubtreeIterator();
                    node.appendChild(cloneSubtree(subIterator));
                    subIterator.detach();
                }

                if (node.nodeType == 10) { // DocumentType
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }
                frag.appendChild(node);
            }
            return frag;
        }

        function iterateSubtree(rangeIterator, func, iteratorState) {
            var it, n;
            iteratorState = iteratorState || { stop: false };
            for (var node, subRangeIterator; node = rangeIterator.next(); ) {
                if (rangeIterator.isPartiallySelectedSubtree()) {
                    if (func(node) === false) {
                        iteratorState.stop = true;
                        return;
                    } else {
                        // The node is partially selected by the Range, so we can use a new RangeIterator on the portion of
                        // the node selected by the Range.
                        subRangeIterator = rangeIterator.getSubtreeIterator();
                        iterateSubtree(subRangeIterator, func, iteratorState);
                        subRangeIterator.detach();
                        if (iteratorState.stop) {
                            return;
                        }
                    }
                } else {
                    // The whole node is selected, so we can use efficient DOM iteration to iterate over the node and its
                    // descendants
                    it = dom.createIterator(node);
                    while ( (n = it.next()) ) {
                        if (func(n) === false) {
                            iteratorState.stop = true;
                            return;
                        }
                    }
                }
            }
        }

        function deleteSubtree(iterator) {
            var subIterator;
            while (iterator.next()) {
                if (iterator.isPartiallySelectedSubtree()) {
                    subIterator = iterator.getSubtreeIterator();
                    deleteSubtree(subIterator);
                    subIterator.detach();
                } else {
                    iterator.remove();
                }
            }
        }

        function extractSubtree(iterator) {
            for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {

                if (iterator.isPartiallySelectedSubtree()) {
                    node = node.cloneNode(false);
                    subIterator = iterator.getSubtreeIterator();
                    node.appendChild(extractSubtree(subIterator));
                    subIterator.detach();
                } else {
                    iterator.remove();
                }
                if (node.nodeType == 10) { // DocumentType
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }
                frag.appendChild(node);
            }
            return frag;
        }

        function getNodesInRange(range, nodeTypes, filter) {
            var filterNodeTypes = !!(nodeTypes && nodeTypes.length), regex;
            var filterExists = !!filter;
            if (filterNodeTypes) {
                regex = new RegExp("^(" + nodeTypes.join("|") + ")$");
            }

            var nodes = [];
            iterateSubtree(new RangeIterator(range, false), function(node) {
                if (filterNodeTypes && !regex.test(node.nodeType)) {
                    return;
                }
                if (filterExists && !filter(node)) {
                    return;
                }
                // Don't include a boundary container if it is a character data node and the range does not contain any
                // of its character data. See issue 190.
                var sc = range.startContainer;
                if (node == sc && isCharacterDataNode(sc) && range.startOffset == sc.length) {
                    return;
                }

                var ec = range.endContainer;
                if (node == ec && isCharacterDataNode(ec) && range.endOffset == 0) {
                    return;
                }

                nodes.push(node);
            });
            return nodes;
        }

        function inspect(range) {
            var name = (typeof range.getName == "undefined") ? "Range" : range.getName();
            return "[" + name + "(" + dom.inspectNode(range.startContainer) + ":" + range.startOffset + ", " +
                    dom.inspectNode(range.endContainer) + ":" + range.endOffset + ")]";
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // RangeIterator code partially borrows from IERange by Tim Ryan (http://github.com/timcameronryan/IERange)

        function RangeIterator(range, clonePartiallySelectedTextNodes) {
            this.range = range;
            this.clonePartiallySelectedTextNodes = clonePartiallySelectedTextNodes;


            if (!range.collapsed) {
                this.sc = range.startContainer;
                this.so = range.startOffset;
                this.ec = range.endContainer;
                this.eo = range.endOffset;
                var root = range.commonAncestorContainer;

                if (this.sc === this.ec && isCharacterDataNode(this.sc)) {
                    this.isSingleCharacterDataNode = true;
                    this._first = this._last = this._next = this.sc;
                } else {
                    this._first = this._next = (this.sc === root && !isCharacterDataNode(this.sc)) ?
                        this.sc.childNodes[this.so] : getClosestAncestorIn(this.sc, root, true);
                    this._last = (this.ec === root && !isCharacterDataNode(this.ec)) ?
                        this.ec.childNodes[this.eo - 1] : getClosestAncestorIn(this.ec, root, true);
                }
            }
        }

        RangeIterator.prototype = {
            _current: null,
            _next: null,
            _first: null,
            _last: null,
            isSingleCharacterDataNode: false,

            reset: function() {
                this._current = null;
                this._next = this._first;
            },

            hasNext: function() {
                return !!this._next;
            },

            next: function() {
                // Move to next node
                var current = this._current = this._next;
                if (current) {
                    this._next = (current !== this._last) ? current.nextSibling : null;

                    // Check for partially selected text nodes
                    if (isCharacterDataNode(current) && this.clonePartiallySelectedTextNodes) {
                        if (current === this.ec) {
                            (current = current.cloneNode(true)).deleteData(this.eo, current.length - this.eo);
                        }
                        if (this._current === this.sc) {
                            (current = current.cloneNode(true)).deleteData(0, this.so);
                        }
                    }
                }

                return current;
            },

            remove: function() {
                var current = this._current, start, end;

                if (isCharacterDataNode(current) && (current === this.sc || current === this.ec)) {
                    start = (current === this.sc) ? this.so : 0;
                    end = (current === this.ec) ? this.eo : current.length;
                    if (start != end) {
                        current.deleteData(start, end - start);
                    }
                } else {
                    if (current.parentNode) {
                        current.parentNode.removeChild(current);
                    } else {
                    }
                }
            },

            // Checks if the current node is partially selected
            isPartiallySelectedSubtree: function() {
                var current = this._current;
                return isNonTextPartiallySelected(current, this.range);
            },

            getSubtreeIterator: function() {
                var subRange;
                if (this.isSingleCharacterDataNode) {
                    subRange = this.range.cloneRange();
                    subRange.collapse(false);
                } else {
                    subRange = new Range(getRangeDocument(this.range));
                    var current = this._current;
                    var startContainer = current, startOffset = 0, endContainer = current, endOffset = getNodeLength(current);

                    if (isOrIsAncestorOf(current, this.sc)) {
                        startContainer = this.sc;
                        startOffset = this.so;
                    }
                    if (isOrIsAncestorOf(current, this.ec)) {
                        endContainer = this.ec;
                        endOffset = this.eo;
                    }

                    updateBoundaries(subRange, startContainer, startOffset, endContainer, endOffset);
                }
                return new RangeIterator(subRange, this.clonePartiallySelectedTextNodes);
            },

            detach: function() {
                this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null;
            }
        };

        /*----------------------------------------------------------------------------------------------------------------*/

        var beforeAfterNodeTypes = [1, 3, 4, 5, 7, 8, 10];
        var rootContainerNodeTypes = [2, 9, 11];
        var readonlyNodeTypes = [5, 6, 10, 12];
        var insertableNodeTypes = [1, 3, 4, 5, 7, 8, 10, 11];
        var surroundNodeTypes = [1, 3, 4, 5, 7, 8];

        function createAncestorFinder(nodeTypes) {
            return function(node, selfIsAncestor) {
                var t, n = selfIsAncestor ? node : node.parentNode;
                while (n) {
                    t = n.nodeType;
                    if (arrayContains(nodeTypes, t)) {
                        return n;
                    }
                    n = n.parentNode;
                }
                return null;
            };
        }

        var getDocumentOrFragmentContainer = createAncestorFinder( [9, 11] );
        var getReadonlyAncestor = createAncestorFinder(readonlyNodeTypes);
        var getDocTypeNotationEntityAncestor = createAncestorFinder( [6, 10, 12] );

        function assertNoDocTypeNotationEntityAncestor(node, allowSelf) {
            if (getDocTypeNotationEntityAncestor(node, allowSelf)) {
                throw new DOMException("INVALID_NODE_TYPE_ERR");
            }
        }

        function assertValidNodeType(node, invalidTypes) {
            if (!arrayContains(invalidTypes, node.nodeType)) {
                throw new DOMException("INVALID_NODE_TYPE_ERR");
            }
        }

        function assertValidOffset(node, offset) {
            if (offset < 0 || offset > (isCharacterDataNode(node) ? node.length : node.childNodes.length)) {
                throw new DOMException("INDEX_SIZE_ERR");
            }
        }

        function assertSameDocumentOrFragment(node1, node2) {
            if (getDocumentOrFragmentContainer(node1, true) !== getDocumentOrFragmentContainer(node2, true)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }
        }

        function assertNodeNotReadOnly(node) {
            if (getReadonlyAncestor(node, true)) {
                throw new DOMException("NO_MODIFICATION_ALLOWED_ERR");
            }
        }

        function assertNode(node, codeName) {
            if (!node) {
                throw new DOMException(codeName);
            }
        }

        function isOrphan(node) {
            return (crashyTextNodes && dom.isBrokenNode(node)) ||
                !arrayContains(rootContainerNodeTypes, node.nodeType) && !getDocumentOrFragmentContainer(node, true);
        }

        function isValidOffset(node, offset) {
            return offset <= (isCharacterDataNode(node) ? node.length : node.childNodes.length);
        }

        function isRangeValid(range) {
            return (!!range.startContainer && !!range.endContainer &&
                    !isOrphan(range.startContainer) &&
                    !isOrphan(range.endContainer) &&
                    isValidOffset(range.startContainer, range.startOffset) &&
                    isValidOffset(range.endContainer, range.endOffset));
        }

        function assertRangeValid(range) {
            if (!isRangeValid(range)) {
                throw new Error("Range error: Range is no longer valid after DOM mutation (" + range.inspect() + ")");
            }
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Test the browser's innerHTML support to decide how to implement createContextualFragment
        var styleEl = document.createElement("style");
        var htmlParsingConforms = false;
        try {
            styleEl.innerHTML = "<b>x</b>";
            htmlParsingConforms = (styleEl.firstChild.nodeType == 3); // Opera incorrectly creates an element node
        } catch (e) {
            // IE 6 and 7 throw
        }

        api.features.htmlParsingConforms = htmlParsingConforms;

        var createContextualFragment = htmlParsingConforms ?

            // Implementation as per HTML parsing spec, trusting in the browser's implementation of innerHTML. See
            // discussion and base code for this implementation at issue 67.
            // Spec: http://html5.org/specs/dom-parsing.html#extensions-to-the-range-interface
            // Thanks to Aleks Williams.
            function(fragmentStr) {
                // "Let node the context object's start's node."
                var node = this.startContainer;
                var doc = getDocument(node);

                // "If the context object's start's node is null, raise an INVALID_STATE_ERR
                // exception and abort these steps."
                if (!node) {
                    throw new DOMException("INVALID_STATE_ERR");
                }

                // "Let element be as follows, depending on node's interface:"
                // Document, Document Fragment: null
                var el = null;

                // "Element: node"
                if (node.nodeType == 1) {
                    el = node;

                // "Text, Comment: node's parentElement"
                } else if (isCharacterDataNode(node)) {
                    el = dom.parentElement(node);
                }

                // "If either element is null or element's ownerDocument is an HTML document
                // and element's local name is "html" and element's namespace is the HTML
                // namespace"
                if (el === null || (
                    el.nodeName == "HTML" &&
                    dom.isHtmlNamespace(getDocument(el).documentElement) &&
                    dom.isHtmlNamespace(el)
                )) {

                // "let element be a new Element with "body" as its local name and the HTML
                // namespace as its namespace.""
                    el = doc.createElement("body");
                } else {
                    el = el.cloneNode(false);
                }

                // "If the node's document is an HTML document: Invoke the HTML fragment parsing algorithm."
                // "If the node's document is an XML document: Invoke the XML fragment parsing algorithm."
                // "In either case, the algorithm must be invoked with fragment as the input
                // and element as the context element."
                el.innerHTML = fragmentStr;

                // "If this raises an exception, then abort these steps. Otherwise, let new
                // children be the nodes returned."

                // "Let fragment be a new DocumentFragment."
                // "Append all new children to fragment."
                // "Return fragment."
                return dom.fragmentFromNodeChildren(el);
            } :

            // In this case, innerHTML cannot be trusted, so fall back to a simpler, non-conformant implementation that
            // previous versions of Rangy used (with the exception of using a body element rather than a div)
            function(fragmentStr) {
                var doc = getRangeDocument(this);
                var el = doc.createElement("body");
                el.innerHTML = fragmentStr;

                return dom.fragmentFromNodeChildren(el);
            };

        function splitRangeBoundaries(range, positionsToPreserve) {
            assertRangeValid(range);

            var sc = range.startContainer, so = range.startOffset, ec = range.endContainer, eo = range.endOffset;
            var startEndSame = (sc === ec);

            if (isCharacterDataNode(ec) && eo > 0 && eo < ec.length) {
                splitDataNode(ec, eo, positionsToPreserve);
            }

            if (isCharacterDataNode(sc) && so > 0 && so < sc.length) {
                sc = splitDataNode(sc, so, positionsToPreserve);
                if (startEndSame) {
                    eo -= so;
                    ec = sc;
                } else if (ec == sc.parentNode && eo >= getNodeIndex(sc)) {
                    eo++;
                }
                so = 0;
            }
            range.setStartAndEnd(sc, so, ec, eo);
        }
        
        function rangeToHtml(range) {
            assertRangeValid(range);
            var container = range.commonAncestorContainer.parentNode.cloneNode(false);
            container.appendChild( range.cloneContents() );
            return container.innerHTML;
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        var rangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed",
            "commonAncestorContainer"];

        var s2s = 0, s2e = 1, e2e = 2, e2s = 3;
        var n_b = 0, n_a = 1, n_b_a = 2, n_i = 3;

        util.extend(api.rangePrototype, {
            compareBoundaryPoints: function(how, range) {
                assertRangeValid(this);
                assertSameDocumentOrFragment(this.startContainer, range.startContainer);

                var nodeA, offsetA, nodeB, offsetB;
                var prefixA = (how == e2s || how == s2s) ? "start" : "end";
                var prefixB = (how == s2e || how == s2s) ? "start" : "end";
                nodeA = this[prefixA + "Container"];
                offsetA = this[prefixA + "Offset"];
                nodeB = range[prefixB + "Container"];
                offsetB = range[prefixB + "Offset"];
                return comparePoints(nodeA, offsetA, nodeB, offsetB);
            },

            insertNode: function(node) {
                assertRangeValid(this);
                assertValidNodeType(node, insertableNodeTypes);
                assertNodeNotReadOnly(this.startContainer);

                if (isOrIsAncestorOf(node, this.startContainer)) {
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }

                // No check for whether the container of the start of the Range is of a type that does not allow
                // children of the type of node: the browser's DOM implementation should do this for us when we attempt
                // to add the node

                var firstNodeInserted = insertNodeAtPosition(node, this.startContainer, this.startOffset);
                this.setStartBefore(firstNodeInserted);
            },

            cloneContents: function() {
                assertRangeValid(this);

                var clone, frag;
                if (this.collapsed) {
                    return getRangeDocument(this).createDocumentFragment();
                } else {
                    if (this.startContainer === this.endContainer && isCharacterDataNode(this.startContainer)) {
                        clone = this.startContainer.cloneNode(true);
                        clone.data = clone.data.slice(this.startOffset, this.endOffset);
                        frag = getRangeDocument(this).createDocumentFragment();
                        frag.appendChild(clone);
                        return frag;
                    } else {
                        var iterator = new RangeIterator(this, true);
                        clone = cloneSubtree(iterator);
                        iterator.detach();
                    }
                    return clone;
                }
            },

            canSurroundContents: function() {
                assertRangeValid(this);
                assertNodeNotReadOnly(this.startContainer);
                assertNodeNotReadOnly(this.endContainer);

                // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
                // no non-text nodes.
                var iterator = new RangeIterator(this, true);
                var boundariesInvalid = (iterator._first && (isNonTextPartiallySelected(iterator._first, this)) ||
                        (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
                iterator.detach();
                return !boundariesInvalid;
            },

            surroundContents: function(node) {
                assertValidNodeType(node, surroundNodeTypes);

                if (!this.canSurroundContents()) {
                    throw new DOMException("INVALID_STATE_ERR");
                }

                // Extract the contents
                var content = this.extractContents();

                // Clear the children of the node
                if (node.hasChildNodes()) {
                    while (node.lastChild) {
                        node.removeChild(node.lastChild);
                    }
                }

                // Insert the new node and add the extracted contents
                insertNodeAtPosition(node, this.startContainer, this.startOffset);
                node.appendChild(content);

                this.selectNode(node);
            },

            cloneRange: function() {
                assertRangeValid(this);
                var range = new Range(getRangeDocument(this));
                var i = rangeProperties.length, prop;
                while (i--) {
                    prop = rangeProperties[i];
                    range[prop] = this[prop];
                }
                return range;
            },

            toString: function() {
                assertRangeValid(this);
                var sc = this.startContainer;
                if (sc === this.endContainer && isCharacterDataNode(sc)) {
                    return (sc.nodeType == 3 || sc.nodeType == 4) ? sc.data.slice(this.startOffset, this.endOffset) : "";
                } else {
                    var textParts = [], iterator = new RangeIterator(this, true);
                    iterateSubtree(iterator, function(node) {
                        // Accept only text or CDATA nodes, not comments
                        if (node.nodeType == 3 || node.nodeType == 4) {
                            textParts.push(node.data);
                        }
                    });
                    iterator.detach();
                    return textParts.join("");
                }
            },

            // The methods below are all non-standard. The following batch were introduced by Mozilla but have since
            // been removed from Mozilla.

            compareNode: function(node) {
                assertRangeValid(this);

                var parent = node.parentNode;
                var nodeIndex = getNodeIndex(node);

                if (!parent) {
                    throw new DOMException("NOT_FOUND_ERR");
                }

                var startComparison = this.comparePoint(parent, nodeIndex),
                    endComparison = this.comparePoint(parent, nodeIndex + 1);

                if (startComparison < 0) { // Node starts before
                    return (endComparison > 0) ? n_b_a : n_b;
                } else {
                    return (endComparison > 0) ? n_a : n_i;
                }
            },

            comparePoint: function(node, offset) {
                assertRangeValid(this);
                assertNode(node, "HIERARCHY_REQUEST_ERR");
                assertSameDocumentOrFragment(node, this.startContainer);

                if (comparePoints(node, offset, this.startContainer, this.startOffset) < 0) {
                    return -1;
                } else if (comparePoints(node, offset, this.endContainer, this.endOffset) > 0) {
                    return 1;
                }
                return 0;
            },

            createContextualFragment: createContextualFragment,

            toHtml: function() {
                return rangeToHtml(this);
            },

            // touchingIsIntersecting determines whether this method considers a node that borders a range intersects
            // with it (as in WebKit) or not (as in Gecko pre-1.9, and the default)
            intersectsNode: function(node, touchingIsIntersecting) {
                assertRangeValid(this);
                assertNode(node, "NOT_FOUND_ERR");
                if (getDocument(node) !== getRangeDocument(this)) {
                    return false;
                }

                var parent = node.parentNode, offset = getNodeIndex(node);
                assertNode(parent, "NOT_FOUND_ERR");

                var startComparison = comparePoints(parent, offset, this.endContainer, this.endOffset),
                    endComparison = comparePoints(parent, offset + 1, this.startContainer, this.startOffset);

                return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
            },

            isPointInRange: function(node, offset) {
                assertRangeValid(this);
                assertNode(node, "HIERARCHY_REQUEST_ERR");
                assertSameDocumentOrFragment(node, this.startContainer);

                return (comparePoints(node, offset, this.startContainer, this.startOffset) >= 0) &&
                       (comparePoints(node, offset, this.endContainer, this.endOffset) <= 0);
            },

            // The methods below are non-standard and invented by me.

            // Sharing a boundary start-to-end or end-to-start does not count as intersection.
            intersectsRange: function(range) {
                return rangesIntersect(this, range, false);
            },

            // Sharing a boundary start-to-end or end-to-start does count as intersection.
            intersectsOrTouchesRange: function(range) {
                return rangesIntersect(this, range, true);
            },

            intersection: function(range) {
                if (this.intersectsRange(range)) {
                    var startComparison = comparePoints(this.startContainer, this.startOffset, range.startContainer, range.startOffset),
                        endComparison = comparePoints(this.endContainer, this.endOffset, range.endContainer, range.endOffset);

                    var intersectionRange = this.cloneRange();
                    if (startComparison == -1) {
                        intersectionRange.setStart(range.startContainer, range.startOffset);
                    }
                    if (endComparison == 1) {
                        intersectionRange.setEnd(range.endContainer, range.endOffset);
                    }
                    return intersectionRange;
                }
                return null;
            },

            union: function(range) {
                if (this.intersectsOrTouchesRange(range)) {
                    var unionRange = this.cloneRange();
                    if (comparePoints(range.startContainer, range.startOffset, this.startContainer, this.startOffset) == -1) {
                        unionRange.setStart(range.startContainer, range.startOffset);
                    }
                    if (comparePoints(range.endContainer, range.endOffset, this.endContainer, this.endOffset) == 1) {
                        unionRange.setEnd(range.endContainer, range.endOffset);
                    }
                    return unionRange;
                } else {
                    throw new DOMException("Ranges do not intersect");
                }
            },

            containsNode: function(node, allowPartial) {
                if (allowPartial) {
                    return this.intersectsNode(node, false);
                } else {
                    return this.compareNode(node) == n_i;
                }
            },

            containsNodeContents: function(node) {
                return this.comparePoint(node, 0) >= 0 && this.comparePoint(node, getNodeLength(node)) <= 0;
            },

            containsRange: function(range) {
                var intersection = this.intersection(range);
                return intersection !== null && range.equals(intersection);
            },

            containsNodeText: function(node) {
                var nodeRange = this.cloneRange();
                nodeRange.selectNode(node);
                var textNodes = nodeRange.getNodes([3]);
                if (textNodes.length > 0) {
                    nodeRange.setStart(textNodes[0], 0);
                    var lastTextNode = textNodes.pop();
                    nodeRange.setEnd(lastTextNode, lastTextNode.length);
                    return this.containsRange(nodeRange);
                } else {
                    return this.containsNodeContents(node);
                }
            },

            getNodes: function(nodeTypes, filter) {
                assertRangeValid(this);
                return getNodesInRange(this, nodeTypes, filter);
            },

            getDocument: function() {
                return getRangeDocument(this);
            },

            collapseBefore: function(node) {
                this.setEndBefore(node);
                this.collapse(false);
            },

            collapseAfter: function(node) {
                this.setStartAfter(node);
                this.collapse(true);
            },
            
            getBookmark: function(containerNode) {
                var doc = getRangeDocument(this);
                var preSelectionRange = api.createRange(doc);
                containerNode = containerNode || dom.getBody(doc);
                preSelectionRange.selectNodeContents(containerNode);
                var range = this.intersection(preSelectionRange);
                var start = 0, end = 0;
                if (range) {
                    preSelectionRange.setEnd(range.startContainer, range.startOffset);
                    start = preSelectionRange.toString().length;
                    end = start + range.toString().length;
                }

                return {
                    start: start,
                    end: end,
                    containerNode: containerNode
                };
            },
            
            moveToBookmark: function(bookmark) {
                var containerNode = bookmark.containerNode;
                var charIndex = 0;
                this.setStart(containerNode, 0);
                this.collapse(true);
                var nodeStack = [containerNode], node, foundStart = false, stop = false;
                var nextCharIndex, i, childNodes;

                while (!stop && (node = nodeStack.pop())) {
                    if (node.nodeType == 3) {
                        nextCharIndex = charIndex + node.length;
                        if (!foundStart && bookmark.start >= charIndex && bookmark.start <= nextCharIndex) {
                            this.setStart(node, bookmark.start - charIndex);
                            foundStart = true;
                        }
                        if (foundStart && bookmark.end >= charIndex && bookmark.end <= nextCharIndex) {
                            this.setEnd(node, bookmark.end - charIndex);
                            stop = true;
                        }
                        charIndex = nextCharIndex;
                    } else {
                        childNodes = node.childNodes;
                        i = childNodes.length;
                        while (i--) {
                            nodeStack.push(childNodes[i]);
                        }
                    }
                }
            },

            getName: function() {
                return "DomRange";
            },

            equals: function(range) {
                return Range.rangesEqual(this, range);
            },

            isValid: function() {
                return isRangeValid(this);
            },
            
            inspect: function() {
                return inspect(this);
            },
            
            detach: function() {
                // In DOM4, detach() is now a no-op.
            }
        });

        function copyComparisonConstantsToObject(obj) {
            obj.START_TO_START = s2s;
            obj.START_TO_END = s2e;
            obj.END_TO_END = e2e;
            obj.END_TO_START = e2s;

            obj.NODE_BEFORE = n_b;
            obj.NODE_AFTER = n_a;
            obj.NODE_BEFORE_AND_AFTER = n_b_a;
            obj.NODE_INSIDE = n_i;
        }

        function copyComparisonConstants(constructor) {
            copyComparisonConstantsToObject(constructor);
            copyComparisonConstantsToObject(constructor.prototype);
        }

        function createRangeContentRemover(remover, boundaryUpdater) {
            return function() {
                assertRangeValid(this);

                var sc = this.startContainer, so = this.startOffset, root = this.commonAncestorContainer;

                var iterator = new RangeIterator(this, true);

                // Work out where to position the range after content removal
                var node, boundary;
                if (sc !== root) {
                    node = getClosestAncestorIn(sc, root, true);
                    boundary = getBoundaryAfterNode(node);
                    sc = boundary.node;
                    so = boundary.offset;
                }

                // Check none of the range is read-only
                iterateSubtree(iterator, assertNodeNotReadOnly);

                iterator.reset();

                // Remove the content
                var returnValue = remover(iterator);
                iterator.detach();

                // Move to the new position
                boundaryUpdater(this, sc, so, sc, so);

                return returnValue;
            };
        }

        function createPrototypeRange(constructor, boundaryUpdater) {
            function createBeforeAfterNodeSetter(isBefore, isStart) {
                return function(node) {
                    assertValidNodeType(node, beforeAfterNodeTypes);
                    assertValidNodeType(getRootContainer(node), rootContainerNodeTypes);

                    var boundary = (isBefore ? getBoundaryBeforeNode : getBoundaryAfterNode)(node);
                    (isStart ? setRangeStart : setRangeEnd)(this, boundary.node, boundary.offset);
                };
            }

            function setRangeStart(range, node, offset) {
                var ec = range.endContainer, eo = range.endOffset;
                if (node !== range.startContainer || offset !== range.startOffset) {
                    // Check the root containers of the range and the new boundary, and also check whether the new boundary
                    // is after the current end. In either case, collapse the range to the new position
                    if (getRootContainer(node) != getRootContainer(ec) || comparePoints(node, offset, ec, eo) == 1) {
                        ec = node;
                        eo = offset;
                    }
                    boundaryUpdater(range, node, offset, ec, eo);
                }
            }

            function setRangeEnd(range, node, offset) {
                var sc = range.startContainer, so = range.startOffset;
                if (node !== range.endContainer || offset !== range.endOffset) {
                    // Check the root containers of the range and the new boundary, and also check whether the new boundary
                    // is after the current end. In either case, collapse the range to the new position
                    if (getRootContainer(node) != getRootContainer(sc) || comparePoints(node, offset, sc, so) == -1) {
                        sc = node;
                        so = offset;
                    }
                    boundaryUpdater(range, sc, so, node, offset);
                }
            }

            // Set up inheritance
            var F = function() {};
            F.prototype = api.rangePrototype;
            constructor.prototype = new F();

            util.extend(constructor.prototype, {
                setStart: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);

                    setRangeStart(this, node, offset);
                },

                setEnd: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);

                    setRangeEnd(this, node, offset);
                },

                /**
                 * Convenience method to set a range's start and end boundaries. Overloaded as follows:
                 * - Two parameters (node, offset) creates a collapsed range at that position
                 * - Three parameters (node, startOffset, endOffset) creates a range contained with node starting at
                 *   startOffset and ending at endOffset
                 * - Four parameters (startNode, startOffset, endNode, endOffset) creates a range starting at startOffset in
                 *   startNode and ending at endOffset in endNode
                 */
                setStartAndEnd: function() {
                    var args = arguments;
                    var sc = args[0], so = args[1], ec = sc, eo = so;

                    switch (args.length) {
                        case 3:
                            eo = args[2];
                            break;
                        case 4:
                            ec = args[2];
                            eo = args[3];
                            break;
                    }

                    boundaryUpdater(this, sc, so, ec, eo);
                },
                
                setBoundary: function(node, offset, isStart) {
                    this["set" + (isStart ? "Start" : "End")](node, offset);
                },

                setStartBefore: createBeforeAfterNodeSetter(true, true),
                setStartAfter: createBeforeAfterNodeSetter(false, true),
                setEndBefore: createBeforeAfterNodeSetter(true, false),
                setEndAfter: createBeforeAfterNodeSetter(false, false),

                collapse: function(isStart) {
                    assertRangeValid(this);
                    if (isStart) {
                        boundaryUpdater(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset);
                    } else {
                        boundaryUpdater(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset);
                    }
                },

                selectNodeContents: function(node) {
                    assertNoDocTypeNotationEntityAncestor(node, true);

                    boundaryUpdater(this, node, 0, node, getNodeLength(node));
                },

                selectNode: function(node) {
                    assertNoDocTypeNotationEntityAncestor(node, false);
                    assertValidNodeType(node, beforeAfterNodeTypes);

                    var start = getBoundaryBeforeNode(node), end = getBoundaryAfterNode(node);
                    boundaryUpdater(this, start.node, start.offset, end.node, end.offset);
                },

                extractContents: createRangeContentRemover(extractSubtree, boundaryUpdater),

                deleteContents: createRangeContentRemover(deleteSubtree, boundaryUpdater),

                canSurroundContents: function() {
                    assertRangeValid(this);
                    assertNodeNotReadOnly(this.startContainer);
                    assertNodeNotReadOnly(this.endContainer);

                    // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
                    // no non-text nodes.
                    var iterator = new RangeIterator(this, true);
                    var boundariesInvalid = (iterator._first && isNonTextPartiallySelected(iterator._first, this) ||
                            (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
                    iterator.detach();
                    return !boundariesInvalid;
                },

                splitBoundaries: function() {
                    splitRangeBoundaries(this);
                },

                splitBoundariesPreservingPositions: function(positionsToPreserve) {
                    splitRangeBoundaries(this, positionsToPreserve);
                },

                normalizeBoundaries: function() {
                    assertRangeValid(this);

                    var sc = this.startContainer, so = this.startOffset, ec = this.endContainer, eo = this.endOffset;

                    var mergeForward = function(node) {
                        var sibling = node.nextSibling;
                        if (sibling && sibling.nodeType == node.nodeType) {
                            ec = node;
                            eo = node.length;
                            node.appendData(sibling.data);
                            sibling.parentNode.removeChild(sibling);
                        }
                    };

                    var mergeBackward = function(node) {
                        var sibling = node.previousSibling;
                        if (sibling && sibling.nodeType == node.nodeType) {
                            sc = node;
                            var nodeLength = node.length;
                            so = sibling.length;
                            node.insertData(0, sibling.data);
                            sibling.parentNode.removeChild(sibling);
                            if (sc == ec) {
                                eo += so;
                                ec = sc;
                            } else if (ec == node.parentNode) {
                                var nodeIndex = getNodeIndex(node);
                                if (eo == nodeIndex) {
                                    ec = node;
                                    eo = nodeLength;
                                } else if (eo > nodeIndex) {
                                    eo--;
                                }
                            }
                        }
                    };

                    var normalizeStart = true;

                    if (isCharacterDataNode(ec)) {
                        if (ec.length == eo) {
                            mergeForward(ec);
                        }
                    } else {
                        if (eo > 0) {
                            var endNode = ec.childNodes[eo - 1];
                            if (endNode && isCharacterDataNode(endNode)) {
                                mergeForward(endNode);
                            }
                        }
                        normalizeStart = !this.collapsed;
                    }

                    if (normalizeStart) {
                        if (isCharacterDataNode(sc)) {
                            if (so == 0) {
                                mergeBackward(sc);
                            }
                        } else {
                            if (so < sc.childNodes.length) {
                                var startNode = sc.childNodes[so];
                                if (startNode && isCharacterDataNode(startNode)) {
                                    mergeBackward(startNode);
                                }
                            }
                        }
                    } else {
                        sc = ec;
                        so = eo;
                    }

                    boundaryUpdater(this, sc, so, ec, eo);
                },

                collapseToPoint: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);
                    this.setStartAndEnd(node, offset);
                }
            });

            copyComparisonConstants(constructor);
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Updates commonAncestorContainer and collapsed after boundary change
        function updateCollapsedAndCommonAncestor(range) {
            range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
            range.commonAncestorContainer = range.collapsed ?
                range.startContainer : dom.getCommonAncestor(range.startContainer, range.endContainer);
        }

        function updateBoundaries(range, startContainer, startOffset, endContainer, endOffset) {
            range.startContainer = startContainer;
            range.startOffset = startOffset;
            range.endContainer = endContainer;
            range.endOffset = endOffset;
            range.document = dom.getDocument(startContainer);

            updateCollapsedAndCommonAncestor(range);
        }

        function Range(doc) {
            this.startContainer = doc;
            this.startOffset = 0;
            this.endContainer = doc;
            this.endOffset = 0;
            this.document = doc;
            updateCollapsedAndCommonAncestor(this);
        }

        createPrototypeRange(Range, updateBoundaries);

        util.extend(Range, {
            rangeProperties: rangeProperties,
            RangeIterator: RangeIterator,
            copyComparisonConstants: copyComparisonConstants,
            createPrototypeRange: createPrototypeRange,
            inspect: inspect,
            toHtml: rangeToHtml,
            getRangeDocument: getRangeDocument,
            rangesEqual: function(r1, r2) {
                return r1.startContainer === r2.startContainer &&
                    r1.startOffset === r2.startOffset &&
                    r1.endContainer === r2.endContainer &&
                    r1.endOffset === r2.endOffset;
            }
        });

        api.DomRange = Range;
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // Wrappers for the browser's native DOM Range and/or TextRange implementation 
    api.createCoreModule("WrappedRange", ["DomRange"], function(api, module) {
        var WrappedRange, WrappedTextRange;
        var dom = api.dom;
        var util = api.util;
        var DomPosition = dom.DomPosition;
        var DomRange = api.DomRange;
        var getBody = dom.getBody;
        var getContentDocument = dom.getContentDocument;
        var isCharacterDataNode = dom.isCharacterDataNode;


        /*----------------------------------------------------------------------------------------------------------------*/

        if (api.features.implementsDomRange) {
            // This is a wrapper around the browser's native DOM Range. It has two aims:
            // - Provide workarounds for specific browser bugs
            // - provide convenient extensions, which are inherited from Rangy's DomRange

            (function() {
                var rangeProto;
                var rangeProperties = DomRange.rangeProperties;

                function updateRangeProperties(range) {
                    var i = rangeProperties.length, prop;
                    while (i--) {
                        prop = rangeProperties[i];
                        range[prop] = range.nativeRange[prop];
                    }
                    // Fix for broken collapsed property in IE 9.
                    range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
                }

                function updateNativeRange(range, startContainer, startOffset, endContainer, endOffset) {
                    var startMoved = (range.startContainer !== startContainer || range.startOffset != startOffset);
                    var endMoved = (range.endContainer !== endContainer || range.endOffset != endOffset);
                    var nativeRangeDifferent = !range.equals(range.nativeRange);

                    // Always set both boundaries for the benefit of IE9 (see issue 35)
                    if (startMoved || endMoved || nativeRangeDifferent) {
                        range.setEnd(endContainer, endOffset);
                        range.setStart(startContainer, startOffset);
                    }
                }

                var createBeforeAfterNodeSetter;

                WrappedRange = function(range) {
                    if (!range) {
                        throw module.createError("WrappedRange: Range must be specified");
                    }
                    this.nativeRange = range;
                    updateRangeProperties(this);
                };

                DomRange.createPrototypeRange(WrappedRange, updateNativeRange);

                rangeProto = WrappedRange.prototype;

                rangeProto.selectNode = function(node) {
                    this.nativeRange.selectNode(node);
                    updateRangeProperties(this);
                };

                rangeProto.cloneContents = function() {
                    return this.nativeRange.cloneContents();
                };

                // Due to a long-standing Firefox bug that I have not been able to find a reliable way to detect,
                // insertNode() is never delegated to the native range.

                rangeProto.surroundContents = function(node) {
                    this.nativeRange.surroundContents(node);
                    updateRangeProperties(this);
                };

                rangeProto.collapse = function(isStart) {
                    this.nativeRange.collapse(isStart);
                    updateRangeProperties(this);
                };

                rangeProto.cloneRange = function() {
                    return new WrappedRange(this.nativeRange.cloneRange());
                };

                rangeProto.refresh = function() {
                    updateRangeProperties(this);
                };

                rangeProto.toString = function() {
                    return this.nativeRange.toString();
                };

                // Create test range and node for feature detection

                var testTextNode = document.createTextNode("test");
                getBody(document).appendChild(testTextNode);
                var range = document.createRange();

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for Firefox 2 bug that prevents moving the start of a Range to a point after its current end and
                // correct for it

                range.setStart(testTextNode, 0);
                range.setEnd(testTextNode, 0);

                try {
                    range.setStart(testTextNode, 1);

                    rangeProto.setStart = function(node, offset) {
                        this.nativeRange.setStart(node, offset);
                        updateRangeProperties(this);
                    };

                    rangeProto.setEnd = function(node, offset) {
                        this.nativeRange.setEnd(node, offset);
                        updateRangeProperties(this);
                    };

                    createBeforeAfterNodeSetter = function(name) {
                        return function(node) {
                            this.nativeRange[name](node);
                            updateRangeProperties(this);
                        };
                    };

                } catch(ex) {

                    rangeProto.setStart = function(node, offset) {
                        try {
                            this.nativeRange.setStart(node, offset);
                        } catch (ex) {
                            this.nativeRange.setEnd(node, offset);
                            this.nativeRange.setStart(node, offset);
                        }
                        updateRangeProperties(this);
                    };

                    rangeProto.setEnd = function(node, offset) {
                        try {
                            this.nativeRange.setEnd(node, offset);
                        } catch (ex) {
                            this.nativeRange.setStart(node, offset);
                            this.nativeRange.setEnd(node, offset);
                        }
                        updateRangeProperties(this);
                    };

                    createBeforeAfterNodeSetter = function(name, oppositeName) {
                        return function(node) {
                            try {
                                this.nativeRange[name](node);
                            } catch (ex) {
                                this.nativeRange[oppositeName](node);
                                this.nativeRange[name](node);
                            }
                            updateRangeProperties(this);
                        };
                    };
                }

                rangeProto.setStartBefore = createBeforeAfterNodeSetter("setStartBefore", "setEndBefore");
                rangeProto.setStartAfter = createBeforeAfterNodeSetter("setStartAfter", "setEndAfter");
                rangeProto.setEndBefore = createBeforeAfterNodeSetter("setEndBefore", "setStartBefore");
                rangeProto.setEndAfter = createBeforeAfterNodeSetter("setEndAfter", "setStartAfter");

                /*--------------------------------------------------------------------------------------------------------*/

                // Always use DOM4-compliant selectNodeContents implementation: it's simpler and less code than testing
                // whether the native implementation can be trusted
                rangeProto.selectNodeContents = function(node) {
                    this.setStartAndEnd(node, 0, dom.getNodeLength(node));
                };

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for and correct WebKit bug that has the behaviour of compareBoundaryPoints round the wrong way for
                // constants START_TO_END and END_TO_START: https://bugs.webkit.org/show_bug.cgi?id=20738

                range.selectNodeContents(testTextNode);
                range.setEnd(testTextNode, 3);

                var range2 = document.createRange();
                range2.selectNodeContents(testTextNode);
                range2.setEnd(testTextNode, 4);
                range2.setStart(testTextNode, 2);

                if (range.compareBoundaryPoints(range.START_TO_END, range2) == -1 &&
                        range.compareBoundaryPoints(range.END_TO_START, range2) == 1) {
                    // This is the wrong way round, so correct for it

                    rangeProto.compareBoundaryPoints = function(type, range) {
                        range = range.nativeRange || range;
                        if (type == range.START_TO_END) {
                            type = range.END_TO_START;
                        } else if (type == range.END_TO_START) {
                            type = range.START_TO_END;
                        }
                        return this.nativeRange.compareBoundaryPoints(type, range);
                    };
                } else {
                    rangeProto.compareBoundaryPoints = function(type, range) {
                        return this.nativeRange.compareBoundaryPoints(type, range.nativeRange || range);
                    };
                }

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for IE 9 deleteContents() and extractContents() bug and correct it. See issue 107.

                var el = document.createElement("div");
                el.innerHTML = "123";
                var textNode = el.firstChild;
                var body = getBody(document);
                body.appendChild(el);

                range.setStart(textNode, 1);
                range.setEnd(textNode, 2);
                range.deleteContents();

                if (textNode.data == "13") {
                    // Behaviour is correct per DOM4 Range so wrap the browser's implementation of deleteContents() and
                    // extractContents()
                    rangeProto.deleteContents = function() {
                        this.nativeRange.deleteContents();
                        updateRangeProperties(this);
                    };

                    rangeProto.extractContents = function() {
                        var frag = this.nativeRange.extractContents();
                        updateRangeProperties(this);
                        return frag;
                    };
                } else {
                }

                body.removeChild(el);
                body = null;

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for existence of createContextualFragment and delegate to it if it exists
                if (util.isHostMethod(range, "createContextualFragment")) {
                    rangeProto.createContextualFragment = function(fragmentStr) {
                        return this.nativeRange.createContextualFragment(fragmentStr);
                    };
                }

                /*--------------------------------------------------------------------------------------------------------*/

                // Clean up
                getBody(document).removeChild(testTextNode);

                rangeProto.getName = function() {
                    return "WrappedRange";
                };

                api.WrappedRange = WrappedRange;

                api.createNativeRange = function(doc) {
                    doc = getContentDocument(doc, module, "createNativeRange");
                    return doc.createRange();
                };
            })();
        }
        
        if (api.features.implementsTextRange) {
            /*
            This is a workaround for a bug where IE returns the wrong container element from the TextRange's parentElement()
            method. For example, in the following (where pipes denote the selection boundaries):

            <ul id="ul"><li id="a">| a </li><li id="b"> b |</li></ul>

            var range = document.selection.createRange();
            alert(range.parentElement().id); // Should alert "ul" but alerts "b"

            This method returns the common ancestor node of the following:
            - the parentElement() of the textRange
            - the parentElement() of the textRange after calling collapse(true)
            - the parentElement() of the textRange after calling collapse(false)
            */
            var getTextRangeContainerElement = function(textRange) {
                var parentEl = textRange.parentElement();
                var range = textRange.duplicate();
                range.collapse(true);
                var startEl = range.parentElement();
                range = textRange.duplicate();
                range.collapse(false);
                var endEl = range.parentElement();
                var startEndContainer = (startEl == endEl) ? startEl : dom.getCommonAncestor(startEl, endEl);

                return startEndContainer == parentEl ? startEndContainer : dom.getCommonAncestor(parentEl, startEndContainer);
            };

            var textRangeIsCollapsed = function(textRange) {
                return textRange.compareEndPoints("StartToEnd", textRange) == 0;
            };

            // Gets the boundary of a TextRange expressed as a node and an offset within that node. This function started
            // out as an improved version of code found in Tim Cameron Ryan's IERange (http://code.google.com/p/ierange/)
            // but has grown, fixing problems with line breaks in preformatted text, adding workaround for IE TextRange
            // bugs, handling for inputs and images, plus optimizations.
            var getTextRangeBoundaryPosition = function(textRange, wholeRangeContainerElement, isStart, isCollapsed, startInfo) {
                var workingRange = textRange.duplicate();
                workingRange.collapse(isStart);
                var containerElement = workingRange.parentElement();

                // Sometimes collapsing a TextRange that's at the start of a text node can move it into the previous node, so
                // check for that
                if (!dom.isOrIsAncestorOf(wholeRangeContainerElement, containerElement)) {
                    containerElement = wholeRangeContainerElement;
                }


                // Deal with nodes that cannot "contain rich HTML markup". In practice, this means form inputs, images and
                // similar. See http://msdn.microsoft.com/en-us/library/aa703950%28VS.85%29.aspx
                if (!containerElement.canHaveHTML) {
                    var pos = new DomPosition(containerElement.parentNode, dom.getNodeIndex(containerElement));
                    return {
                        boundaryPosition: pos,
                        nodeInfo: {
                            nodeIndex: pos.offset,
                            containerElement: pos.node
                        }
                    };
                }

                var workingNode = dom.getDocument(containerElement).createElement("span");

                // Workaround for HTML5 Shiv's insane violation of document.createElement(). See Rangy issue 104 and HTML5
                // Shiv issue 64: https://github.com/aFarkas/html5shiv/issues/64
                if (workingNode.parentNode) {
                    workingNode.parentNode.removeChild(workingNode);
                }

                var comparison, workingComparisonType = isStart ? "StartToStart" : "StartToEnd";
                var previousNode, nextNode, boundaryPosition, boundaryNode;
                var start = (startInfo && startInfo.containerElement == containerElement) ? startInfo.nodeIndex : 0;
                var childNodeCount = containerElement.childNodes.length;
                var end = childNodeCount;

                // Check end first. Code within the loop assumes that the endth child node of the container is definitely
                // after the range boundary.
                var nodeIndex = end;

                while (true) {
                    if (nodeIndex == childNodeCount) {
                        containerElement.appendChild(workingNode);
                    } else {
                        containerElement.insertBefore(workingNode, containerElement.childNodes[nodeIndex]);
                    }
                    workingRange.moveToElementText(workingNode);
                    comparison = workingRange.compareEndPoints(workingComparisonType, textRange);
                    if (comparison == 0 || start == end) {
                        break;
                    } else if (comparison == -1) {
                        if (end == start + 1) {
                            // We know the endth child node is after the range boundary, so we must be done.
                            break;
                        } else {
                            start = nodeIndex;
                        }
                    } else {
                        end = (end == start + 1) ? start : nodeIndex;
                    }
                    nodeIndex = Math.floor((start + end) / 2);
                    containerElement.removeChild(workingNode);
                }


                // We've now reached or gone past the boundary of the text range we're interested in
                // so have identified the node we want
                boundaryNode = workingNode.nextSibling;

                if (comparison == -1 && boundaryNode && isCharacterDataNode(boundaryNode)) {
                    // This is a character data node (text, comment, cdata). The working range is collapsed at the start of
                    // the node containing the text range's boundary, so we move the end of the working range to the
                    // boundary point and measure the length of its text to get the boundary's offset within the node.
                    workingRange.setEndPoint(isStart ? "EndToStart" : "EndToEnd", textRange);

                    var offset;

                    if (/[\r\n]/.test(boundaryNode.data)) {
                        /*
                        For the particular case of a boundary within a text node containing rendered line breaks (within a
                        <pre> element, for example), we need a slightly complicated approach to get the boundary's offset in
                        IE. The facts:
                        
                        - Each line break is represented as \r in the text node's data/nodeValue properties
                        - Each line break is represented as \r\n in the TextRange's 'text' property
                        - The 'text' property of the TextRange does not contain trailing line breaks
                        
                        To get round the problem presented by the final fact above, we can use the fact that TextRange's
                        moveStart() and moveEnd() methods return the actual number of characters moved, which is not
                        necessarily the same as the number of characters it was instructed to move. The simplest approach is
                        to use this to store the characters moved when moving both the start and end of the range to the
                        start of the document body and subtracting the start offset from the end offset (the
                        "move-negative-gazillion" method). However, this is extremely slow when the document is large and
                        the range is near the end of it. Clearly doing the mirror image (i.e. moving the range boundaries to
                        the end of the document) has the same problem.
                        
                        Another approach that works is to use moveStart() to move the start boundary of the range up to the
                        end boundary one character at a time and incrementing a counter with the value returned by the
                        moveStart() call. However, the check for whether the start boundary has reached the end boundary is
                        expensive, so this method is slow (although unlike "move-negative-gazillion" is largely unaffected
                        by the location of the range within the document).
                        
                        The approach used below is a hybrid of the two methods above. It uses the fact that a string
                        containing the TextRange's 'text' property with each \r\n converted to a single \r character cannot
                        be longer than the text of the TextRange, so the start of the range is moved that length initially
                        and then a character at a time to make up for any trailing line breaks not contained in the 'text'
                        property. This has good performance in most situations compared to the previous two methods.
                        */
                        var tempRange = workingRange.duplicate();
                        var rangeLength = tempRange.text.replace(/\r\n/g, "\r").length;

                        offset = tempRange.moveStart("character", rangeLength);
                        while ( (comparison = tempRange.compareEndPoints("StartToEnd", tempRange)) == -1) {
                            offset++;
                            tempRange.moveStart("character", 1);
                        }
                    } else {
                        offset = workingRange.text.length;
                    }
                    boundaryPosition = new DomPosition(boundaryNode, offset);
                } else {

                    // If the boundary immediately follows a character data node and this is the end boundary, we should favour
                    // a position within that, and likewise for a start boundary preceding a character data node
                    previousNode = (isCollapsed || !isStart) && workingNode.previousSibling;
                    nextNode = (isCollapsed || isStart) && workingNode.nextSibling;
                    if (nextNode && isCharacterDataNode(nextNode)) {
                        boundaryPosition = new DomPosition(nextNode, 0);
                    } else if (previousNode && isCharacterDataNode(previousNode)) {
                        boundaryPosition = new DomPosition(previousNode, previousNode.data.length);
                    } else {
                        boundaryPosition = new DomPosition(containerElement, dom.getNodeIndex(workingNode));
                    }
                }

                // Clean up
                workingNode.parentNode.removeChild(workingNode);

                return {
                    boundaryPosition: boundaryPosition,
                    nodeInfo: {
                        nodeIndex: nodeIndex,
                        containerElement: containerElement
                    }
                };
            };

            // Returns a TextRange representing the boundary of a TextRange expressed as a node and an offset within that
            // node. This function started out as an optimized version of code found in Tim Cameron Ryan's IERange
            // (http://code.google.com/p/ierange/)
            var createBoundaryTextRange = function(boundaryPosition, isStart) {
                var boundaryNode, boundaryParent, boundaryOffset = boundaryPosition.offset;
                var doc = dom.getDocument(boundaryPosition.node);
                var workingNode, childNodes, workingRange = getBody(doc).createTextRange();
                var nodeIsDataNode = isCharacterDataNode(boundaryPosition.node);

                if (nodeIsDataNode) {
                    boundaryNode = boundaryPosition.node;
                    boundaryParent = boundaryNode.parentNode;
                } else {
                    childNodes = boundaryPosition.node.childNodes;
                    boundaryNode = (boundaryOffset < childNodes.length) ? childNodes[boundaryOffset] : null;
                    boundaryParent = boundaryPosition.node;
                }

                // Position the range immediately before the node containing the boundary
                workingNode = doc.createElement("span");

                // Making the working element non-empty element persuades IE to consider the TextRange boundary to be within
                // the element rather than immediately before or after it
                workingNode.innerHTML = "&#feff;";

                // insertBefore is supposed to work like appendChild if the second parameter is null. However, a bug report
                // for IERange suggests that it can crash the browser: http://code.google.com/p/ierange/issues/detail?id=12
                if (boundaryNode) {
                    boundaryParent.insertBefore(workingNode, boundaryNode);
                } else {
                    boundaryParent.appendChild(workingNode);
                }

                workingRange.moveToElementText(workingNode);
                workingRange.collapse(!isStart);

                // Clean up
                boundaryParent.removeChild(workingNode);

                // Move the working range to the text offset, if required
                if (nodeIsDataNode) {
                    workingRange[isStart ? "moveStart" : "moveEnd"]("character", boundaryOffset);
                }

                return workingRange;
            };

            /*------------------------------------------------------------------------------------------------------------*/

            // This is a wrapper around a TextRange, providing full DOM Range functionality using rangy's DomRange as a
            // prototype

            WrappedTextRange = function(textRange) {
                this.textRange = textRange;
                this.refresh();
            };

            WrappedTextRange.prototype = new DomRange(document);

            WrappedTextRange.prototype.refresh = function() {
                var start, end, startBoundary;

                // TextRange's parentElement() method cannot be trusted. getTextRangeContainerElement() works around that.
                var rangeContainerElement = getTextRangeContainerElement(this.textRange);

                if (textRangeIsCollapsed(this.textRange)) {
                    end = start = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true,
                        true).boundaryPosition;
                } else {
                    startBoundary = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true, false);
                    start = startBoundary.boundaryPosition;

                    // An optimization used here is that if the start and end boundaries have the same parent element, the
                    // search scope for the end boundary can be limited to exclude the portion of the element that precedes
                    // the start boundary
                    end = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, false, false,
                        startBoundary.nodeInfo).boundaryPosition;
                }

                this.setStart(start.node, start.offset);
                this.setEnd(end.node, end.offset);
            };

            WrappedTextRange.prototype.getName = function() {
                return "WrappedTextRange";
            };

            DomRange.copyComparisonConstants(WrappedTextRange);

            var rangeToTextRange = function(range) {
                if (range.collapsed) {
                    return createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
                } else {
                    var startRange = createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
                    var endRange = createBoundaryTextRange(new DomPosition(range.endContainer, range.endOffset), false);
                    var textRange = getBody( DomRange.getRangeDocument(range) ).createTextRange();
                    textRange.setEndPoint("StartToStart", startRange);
                    textRange.setEndPoint("EndToEnd", endRange);
                    return textRange;
                }
            };

            WrappedTextRange.rangeToTextRange = rangeToTextRange;

            WrappedTextRange.prototype.toTextRange = function() {
                return rangeToTextRange(this);
            };

            api.WrappedTextRange = WrappedTextRange;

            // IE 9 and above have both implementations and Rangy makes both available. The next few lines sets which
            // implementation to use by default.
            if (!api.features.implementsDomRange || api.config.preferTextRange) {
                // Add WrappedTextRange as the Range property of the global object to allow expression like Range.END_TO_END to work
                var globalObj = (function() { return this; })();
                if (typeof globalObj.Range == "undefined") {
                    globalObj.Range = WrappedTextRange;
                }

                api.createNativeRange = function(doc) {
                    doc = getContentDocument(doc, module, "createNativeRange");
                    return getBody(doc).createTextRange();
                };

                api.WrappedRange = WrappedTextRange;
            }
        }

        api.createRange = function(doc) {
            doc = getContentDocument(doc, module, "createRange");
            return new api.WrappedRange(api.createNativeRange(doc));
        };

        api.createRangyRange = function(doc) {
            doc = getContentDocument(doc, module, "createRangyRange");
            return new DomRange(doc);
        };

        api.createIframeRange = function(iframeEl) {
            module.deprecationNotice("createIframeRange()", "createRange(iframeEl)");
            return api.createRange(iframeEl);
        };

        api.createIframeRangyRange = function(iframeEl) {
            module.deprecationNotice("createIframeRangyRange()", "createRangyRange(iframeEl)");
            return api.createRangyRange(iframeEl);
        };

        api.addShimListener(function(win) {
            var doc = win.document;
            if (typeof doc.createRange == "undefined") {
                doc.createRange = function() {
                    return api.createRange(doc);
                };
            }
            doc = win = null;
        });
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // This module creates a selection object wrapper that conforms as closely as possible to the Selection specification
    // in the HTML Editing spec (http://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#selections)
    api.createCoreModule("WrappedSelection", ["DomRange", "WrappedRange"], function(api, module) {
        api.config.checkSelectionRanges = true;

        var BOOLEAN = "boolean";
        var NUMBER = "number";
        var dom = api.dom;
        var util = api.util;
        var isHostMethod = util.isHostMethod;
        var DomRange = api.DomRange;
        var WrappedRange = api.WrappedRange;
        var DOMException = api.DOMException;
        var DomPosition = dom.DomPosition;
        var getNativeSelection;
        var selectionIsCollapsed;
        var features = api.features;
        var CONTROL = "Control";
        var getDocument = dom.getDocument;
        var getBody = dom.getBody;
        var rangesEqual = DomRange.rangesEqual;


        // Utility function to support direction parameters in the API that may be a string ("backward" or "forward") or a
        // Boolean (true for backwards).
        function isDirectionBackward(dir) {
            return (typeof dir == "string") ? /^backward(s)?$/i.test(dir) : !!dir;
        }

        function getWindow(win, methodName) {
            if (!win) {
                return window;
            } else if (dom.isWindow(win)) {
                return win;
            } else if (win instanceof WrappedSelection) {
                return win.win;
            } else {
                var doc = dom.getContentDocument(win, module, methodName);
                return dom.getWindow(doc);
            }
        }

        function getWinSelection(winParam) {
            return getWindow(winParam, "getWinSelection").getSelection();
        }

        function getDocSelection(winParam) {
            return getWindow(winParam, "getDocSelection").document.selection;
        }
        
        function winSelectionIsBackward(sel) {
            var backward = false;
            if (sel.anchorNode) {
                backward = (dom.comparePoints(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset) == 1);
            }
            return backward;
        }

        // Test for the Range/TextRange and Selection features required
        // Test for ability to retrieve selection
        var implementsWinGetSelection = isHostMethod(window, "getSelection"),
            implementsDocSelection = util.isHostObject(document, "selection");

        features.implementsWinGetSelection = implementsWinGetSelection;
        features.implementsDocSelection = implementsDocSelection;

        var useDocumentSelection = implementsDocSelection && (!implementsWinGetSelection || api.config.preferTextRange);

        if (useDocumentSelection) {
            getNativeSelection = getDocSelection;
            api.isSelectionValid = function(winParam) {
                var doc = getWindow(winParam, "isSelectionValid").document, nativeSel = doc.selection;

                // Check whether the selection TextRange is actually contained within the correct document
                return (nativeSel.type != "None" || getDocument(nativeSel.createRange().parentElement()) == doc);
            };
        } else if (implementsWinGetSelection) {
            getNativeSelection = getWinSelection;
            api.isSelectionValid = function() {
                return true;
            };
        } else {
            module.fail("Neither document.selection or window.getSelection() detected.");
        }

        api.getNativeSelection = getNativeSelection;

        var testSelection = getNativeSelection();
        var testRange = api.createNativeRange(document);
        var body = getBody(document);

        // Obtaining a range from a selection
        var selectionHasAnchorAndFocus = util.areHostProperties(testSelection,
            ["anchorNode", "focusNode", "anchorOffset", "focusOffset"]);

        features.selectionHasAnchorAndFocus = selectionHasAnchorAndFocus;

        // Test for existence of native selection extend() method
        var selectionHasExtend = isHostMethod(testSelection, "extend");
        features.selectionHasExtend = selectionHasExtend;
        
        // Test if rangeCount exists
        var selectionHasRangeCount = (typeof testSelection.rangeCount == NUMBER);
        features.selectionHasRangeCount = selectionHasRangeCount;

        var selectionSupportsMultipleRanges = false;
        var collapsedNonEditableSelectionsSupported = true;

        var addRangeBackwardToNative = selectionHasExtend ?
            function(nativeSelection, range) {
                var doc = DomRange.getRangeDocument(range);
                var endRange = api.createRange(doc);
                endRange.collapseToPoint(range.endContainer, range.endOffset);
                nativeSelection.addRange(getNativeRange(endRange));
                nativeSelection.extend(range.startContainer, range.startOffset);
            } : null;

        if (util.areHostMethods(testSelection, ["addRange", "getRangeAt", "removeAllRanges"]) &&
                typeof testSelection.rangeCount == NUMBER && features.implementsDomRange) {

            (function() {
                // Previously an iframe was used but this caused problems in some circumstances in IE, so tests are
                // performed on the current document's selection. See issue 109.

                // Note also that if a selection previously existed, it is wiped by these tests. This should usually be fine
                // because initialization usually happens when the document loads, but could be a problem for a script that
                // loads and initializes Rangy later. If anyone complains, code could be added to save and restore the
                // selection.
                var sel = window.getSelection();
                if (sel) {
                    // Store the current selection
                    var originalSelectionRangeCount = sel.rangeCount;
                    var selectionHasMultipleRanges = (originalSelectionRangeCount > 1);
                    var originalSelectionRanges = [];
                    var originalSelectionBackward = winSelectionIsBackward(sel); 
                    for (var i = 0; i < originalSelectionRangeCount; ++i) {
                        originalSelectionRanges[i] = sel.getRangeAt(i);
                    }
                    
                    // Create some test elements
                    var body = getBody(document);
                    var testEl = body.appendChild( document.createElement("div") );
                    testEl.contentEditable = "false";
                    var textNode = testEl.appendChild( document.createTextNode("\u00a0\u00a0\u00a0") );

                    // Test whether the native selection will allow a collapsed selection within a non-editable element
                    var r1 = document.createRange();

                    r1.setStart(textNode, 1);
                    r1.collapse(true);
                    sel.addRange(r1);
                    collapsedNonEditableSelectionsSupported = (sel.rangeCount == 1);
                    sel.removeAllRanges();

                    // Test whether the native selection is capable of supporting multiple ranges.
                    if (!selectionHasMultipleRanges) {
                        // Doing the original feature test here in Chrome 36 (and presumably later versions) prints a
                        // console error of "Discontiguous selection is not supported." that cannot be suppressed. There's
                        // nothing we can do about this while retaining the feature test so we have to resort to a browser
                        // sniff. I'm not happy about it. See
                        // https://code.google.com/p/chromium/issues/detail?id=399791
                        var chromeMatch = window.navigator.appVersion.match(/Chrome\/(.*?) /);
                        if (chromeMatch && parseInt(chromeMatch[1]) >= 36) {
                            selectionSupportsMultipleRanges = false;
                        } else {
                            var r2 = r1.cloneRange();
                            r1.setStart(textNode, 0);
                            r2.setEnd(textNode, 3);
                            r2.setStart(textNode, 2);
                            sel.addRange(r1);
                            sel.addRange(r2);
                            selectionSupportsMultipleRanges = (sel.rangeCount == 2);
                        }
                    }

                    // Clean up
                    body.removeChild(testEl);
                    sel.removeAllRanges();

                    for (i = 0; i < originalSelectionRangeCount; ++i) {
                        if (i == 0 && originalSelectionBackward) {
                            if (addRangeBackwardToNative) {
                                addRangeBackwardToNative(sel, originalSelectionRanges[i]);
                            } else {
                                api.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend");
                                sel.addRange(originalSelectionRanges[i]);
                            }
                        } else {
                            sel.addRange(originalSelectionRanges[i]);
                        }
                    }
                }
            })();
        }

        features.selectionSupportsMultipleRanges = selectionSupportsMultipleRanges;
        features.collapsedNonEditableSelectionsSupported = collapsedNonEditableSelectionsSupported;

        // ControlRanges
        var implementsControlRange = false, testControlRange;

        if (body && isHostMethod(body, "createControlRange")) {
            testControlRange = body.createControlRange();
            if (util.areHostProperties(testControlRange, ["item", "add"])) {
                implementsControlRange = true;
            }
        }
        features.implementsControlRange = implementsControlRange;

        // Selection collapsedness
        if (selectionHasAnchorAndFocus) {
            selectionIsCollapsed = function(sel) {
                return sel.anchorNode === sel.focusNode && sel.anchorOffset === sel.focusOffset;
            };
        } else {
            selectionIsCollapsed = function(sel) {
                return sel.rangeCount ? sel.getRangeAt(sel.rangeCount - 1).collapsed : false;
            };
        }

        function updateAnchorAndFocusFromRange(sel, range, backward) {
            var anchorPrefix = backward ? "end" : "start", focusPrefix = backward ? "start" : "end";
            sel.anchorNode = range[anchorPrefix + "Container"];
            sel.anchorOffset = range[anchorPrefix + "Offset"];
            sel.focusNode = range[focusPrefix + "Container"];
            sel.focusOffset = range[focusPrefix + "Offset"];
        }

        function updateAnchorAndFocusFromNativeSelection(sel) {
            var nativeSel = sel.nativeSelection;
            sel.anchorNode = nativeSel.anchorNode;
            sel.anchorOffset = nativeSel.anchorOffset;
            sel.focusNode = nativeSel.focusNode;
            sel.focusOffset = nativeSel.focusOffset;
        }

        function updateEmptySelection(sel) {
            sel.anchorNode = sel.focusNode = null;
            sel.anchorOffset = sel.focusOffset = 0;
            sel.rangeCount = 0;
            sel.isCollapsed = true;
            sel._ranges.length = 0;
        }

        function getNativeRange(range) {
            var nativeRange;
            if (range instanceof DomRange) {
                nativeRange = api.createNativeRange(range.getDocument());
                nativeRange.setEnd(range.endContainer, range.endOffset);
                nativeRange.setStart(range.startContainer, range.startOffset);
            } else if (range instanceof WrappedRange) {
                nativeRange = range.nativeRange;
            } else if (features.implementsDomRange && (range instanceof dom.getWindow(range.startContainer).Range)) {
                nativeRange = range;
            }
            return nativeRange;
        }

        function rangeContainsSingleElement(rangeNodes) {
            if (!rangeNodes.length || rangeNodes[0].nodeType != 1) {
                return false;
            }
            for (var i = 1, len = rangeNodes.length; i < len; ++i) {
                if (!dom.isAncestorOf(rangeNodes[0], rangeNodes[i])) {
                    return false;
                }
            }
            return true;
        }

        function getSingleElementFromRange(range) {
            var nodes = range.getNodes();
            if (!rangeContainsSingleElement(nodes)) {
                throw module.createError("getSingleElementFromRange: range " + range.inspect() + " did not consist of a single element");
            }
            return nodes[0];
        }

        // Simple, quick test which only needs to distinguish between a TextRange and a ControlRange
        function isTextRange(range) {
            return !!range && typeof range.text != "undefined";
        }

        function updateFromTextRange(sel, range) {
            // Create a Range from the selected TextRange
            var wrappedRange = new WrappedRange(range);
            sel._ranges = [wrappedRange];

            updateAnchorAndFocusFromRange(sel, wrappedRange, false);
            sel.rangeCount = 1;
            sel.isCollapsed = wrappedRange.collapsed;
        }

        function updateControlSelection(sel) {
            // Update the wrapped selection based on what's now in the native selection
            sel._ranges.length = 0;
            if (sel.docSelection.type == "None") {
                updateEmptySelection(sel);
            } else {
                var controlRange = sel.docSelection.createRange();
                if (isTextRange(controlRange)) {
                    // This case (where the selection type is "Control" and calling createRange() on the selection returns
                    // a TextRange) can happen in IE 9. It happens, for example, when all elements in the selected
                    // ControlRange have been removed from the ControlRange and removed from the document.
                    updateFromTextRange(sel, controlRange);
                } else {
                    sel.rangeCount = controlRange.length;
                    var range, doc = getDocument(controlRange.item(0));
                    for (var i = 0; i < sel.rangeCount; ++i) {
                        range = api.createRange(doc);
                        range.selectNode(controlRange.item(i));
                        sel._ranges.push(range);
                    }
                    sel.isCollapsed = sel.rangeCount == 1 && sel._ranges[0].collapsed;
                    updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], false);
                }
            }
        }

        function addRangeToControlSelection(sel, range) {
            var controlRange = sel.docSelection.createRange();
            var rangeElement = getSingleElementFromRange(range);

            // Create a new ControlRange containing all the elements in the selected ControlRange plus the element
            // contained by the supplied range
            var doc = getDocument(controlRange.item(0));
            var newControlRange = getBody(doc).createControlRange();
            for (var i = 0, len = controlRange.length; i < len; ++i) {
                newControlRange.add(controlRange.item(i));
            }
            try {
                newControlRange.add(rangeElement);
            } catch (ex) {
                throw module.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
            }
            newControlRange.select();

            // Update the wrapped selection based on what's now in the native selection
            updateControlSelection(sel);
        }

        var getSelectionRangeAt;

        if (isHostMethod(testSelection, "getRangeAt")) {
            // try/catch is present because getRangeAt() must have thrown an error in some browser and some situation.
            // Unfortunately, I didn't write a comment about the specifics and am now scared to take it out. Let that be a
            // lesson to us all, especially me.
            getSelectionRangeAt = function(sel, index) {
                try {
                    return sel.getRangeAt(index);
                } catch (ex) {
                    return null;
                }
            };
        } else if (selectionHasAnchorAndFocus) {
            getSelectionRangeAt = function(sel) {
                var doc = getDocument(sel.anchorNode);
                var range = api.createRange(doc);
                range.setStartAndEnd(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset);

                // Handle the case when the selection was selected backwards (from the end to the start in the
                // document)
                if (range.collapsed !== this.isCollapsed) {
                    range.setStartAndEnd(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset);
                }

                return range;
            };
        }

        function WrappedSelection(selection, docSelection, win) {
            this.nativeSelection = selection;
            this.docSelection = docSelection;
            this._ranges = [];
            this.win = win;
            this.refresh();
        }

        WrappedSelection.prototype = api.selectionPrototype;

        function deleteProperties(sel) {
            sel.win = sel.anchorNode = sel.focusNode = sel._ranges = null;
            sel.rangeCount = sel.anchorOffset = sel.focusOffset = 0;
            sel.detached = true;
        }

        var cachedRangySelections = [];

        function actOnCachedSelection(win, action) {
            var i = cachedRangySelections.length, cached, sel;
            while (i--) {
                cached = cachedRangySelections[i];
                sel = cached.selection;
                if (action == "deleteAll") {
                    deleteProperties(sel);
                } else if (cached.win == win) {
                    if (action == "delete") {
                        cachedRangySelections.splice(i, 1);
                        return true;
                    } else {
                        return sel;
                    }
                }
            }
            if (action == "deleteAll") {
                cachedRangySelections.length = 0;
            }
            return null;
        }

        var getSelection = function(win) {
            // Check if the parameter is a Rangy Selection object
            if (win && win instanceof WrappedSelection) {
                win.refresh();
                return win;
            }

            win = getWindow(win, "getNativeSelection");

            var sel = actOnCachedSelection(win);
            var nativeSel = getNativeSelection(win), docSel = implementsDocSelection ? getDocSelection(win) : null;
            if (sel) {
                sel.nativeSelection = nativeSel;
                sel.docSelection = docSel;
                sel.refresh();
            } else {
                sel = new WrappedSelection(nativeSel, docSel, win);
                cachedRangySelections.push( { win: win, selection: sel } );
            }
            return sel;
        };

        api.getSelection = getSelection;

        api.getIframeSelection = function(iframeEl) {
            module.deprecationNotice("getIframeSelection()", "getSelection(iframeEl)");
            return api.getSelection(dom.getIframeWindow(iframeEl));
        };

        var selProto = WrappedSelection.prototype;

        function createControlSelection(sel, ranges) {
            // Ensure that the selection becomes of type "Control"
            var doc = getDocument(ranges[0].startContainer);
            var controlRange = getBody(doc).createControlRange();
            for (var i = 0, el, len = ranges.length; i < len; ++i) {
                el = getSingleElementFromRange(ranges[i]);
                try {
                    controlRange.add(el);
                } catch (ex) {
                    throw module.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)");
                }
            }
            controlRange.select();

            // Update the wrapped selection based on what's now in the native selection
            updateControlSelection(sel);
        }

        // Selecting a range
        if (!useDocumentSelection && selectionHasAnchorAndFocus && util.areHostMethods(testSelection, ["removeAllRanges", "addRange"])) {
            selProto.removeAllRanges = function() {
                this.nativeSelection.removeAllRanges();
                updateEmptySelection(this);
            };

            var addRangeBackward = function(sel, range) {
                addRangeBackwardToNative(sel.nativeSelection, range);
                sel.refresh();
            };

            if (selectionHasRangeCount) {
                selProto.addRange = function(range, direction) {
                    if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
                        addRangeToControlSelection(this, range);
                    } else {
                        if (isDirectionBackward(direction) && selectionHasExtend) {
                            addRangeBackward(this, range);
                        } else {
                            var previousRangeCount;
                            if (selectionSupportsMultipleRanges) {
                                previousRangeCount = this.rangeCount;
                            } else {
                                this.removeAllRanges();
                                previousRangeCount = 0;
                            }
                            // Clone the native range so that changing the selected range does not affect the selection.
                            // This is contrary to the spec but is the only way to achieve consistency between browsers. See
                            // issue 80.
                            this.nativeSelection.addRange(getNativeRange(range).cloneRange());

                            // Check whether adding the range was successful
                            this.rangeCount = this.nativeSelection.rangeCount;

                            if (this.rangeCount == previousRangeCount + 1) {
                                // The range was added successfully

                                // Check whether the range that we added to the selection is reflected in the last range extracted from
                                // the selection
                                if (api.config.checkSelectionRanges) {
                                    var nativeRange = getSelectionRangeAt(this.nativeSelection, this.rangeCount - 1);
                                    if (nativeRange && !rangesEqual(nativeRange, range)) {
                                        // Happens in WebKit with, for example, a selection placed at the start of a text node
                                        range = new WrappedRange(nativeRange);
                                    }
                                }
                                this._ranges[this.rangeCount - 1] = range;
                                updateAnchorAndFocusFromRange(this, range, selectionIsBackward(this.nativeSelection));
                                this.isCollapsed = selectionIsCollapsed(this);
                            } else {
                                // The range was not added successfully. The simplest thing is to refresh
                                this.refresh();
                            }
                        }
                    }
                };
            } else {
                selProto.addRange = function(range, direction) {
                    if (isDirectionBackward(direction) && selectionHasExtend) {
                        addRangeBackward(this, range);
                    } else {
                        this.nativeSelection.addRange(getNativeRange(range));
                        this.refresh();
                    }
                };
            }

            selProto.setRanges = function(ranges) {
                if (implementsControlRange && implementsDocSelection && ranges.length > 1) {
                    createControlSelection(this, ranges);
                } else {
                    this.removeAllRanges();
                    for (var i = 0, len = ranges.length; i < len; ++i) {
                        this.addRange(ranges[i]);
                    }
                }
            };
        } else if (isHostMethod(testSelection, "empty") && isHostMethod(testRange, "select") &&
                   implementsControlRange && useDocumentSelection) {

            selProto.removeAllRanges = function() {
                // Added try/catch as fix for issue #21
                try {
                    this.docSelection.empty();

                    // Check for empty() not working (issue #24)
                    if (this.docSelection.type != "None") {
                        // Work around failure to empty a control selection by instead selecting a TextRange and then
                        // calling empty()
                        var doc;
                        if (this.anchorNode) {
                            doc = getDocument(this.anchorNode);
                        } else if (this.docSelection.type == CONTROL) {
                            var controlRange = this.docSelection.createRange();
                            if (controlRange.length) {
                                doc = getDocument( controlRange.item(0) );
                            }
                        }
                        if (doc) {
                            var textRange = getBody(doc).createTextRange();
                            textRange.select();
                            this.docSelection.empty();
                        }
                    }
                } catch(ex) {}
                updateEmptySelection(this);
            };

            selProto.addRange = function(range) {
                if (this.docSelection.type == CONTROL) {
                    addRangeToControlSelection(this, range);
                } else {
                    api.WrappedTextRange.rangeToTextRange(range).select();
                    this._ranges[0] = range;
                    this.rangeCount = 1;
                    this.isCollapsed = this._ranges[0].collapsed;
                    updateAnchorAndFocusFromRange(this, range, false);
                }
            };

            selProto.setRanges = function(ranges) {
                this.removeAllRanges();
                var rangeCount = ranges.length;
                if (rangeCount > 1) {
                    createControlSelection(this, ranges);
                } else if (rangeCount) {
                    this.addRange(ranges[0]);
                }
            };
        } else {
            module.fail("No means of selecting a Range or TextRange was found");
            return false;
        }

        selProto.getRangeAt = function(index) {
            if (index < 0 || index >= this.rangeCount) {
                throw new DOMException("INDEX_SIZE_ERR");
            } else {
                // Clone the range to preserve selection-range independence. See issue 80.
                return this._ranges[index].cloneRange();
            }
        };

        var refreshSelection;

        if (useDocumentSelection) {
            refreshSelection = function(sel) {
                var range;
                if (api.isSelectionValid(sel.win)) {
                    range = sel.docSelection.createRange();
                } else {
                    range = getBody(sel.win.document).createTextRange();
                    range.collapse(true);
                }

                if (sel.docSelection.type == CONTROL) {
                    updateControlSelection(sel);
                } else if (isTextRange(range)) {
                    updateFromTextRange(sel, range);
                } else {
                    updateEmptySelection(sel);
                }
            };
        } else if (isHostMethod(testSelection, "getRangeAt") && typeof testSelection.rangeCount == NUMBER) {
            refreshSelection = function(sel) {
                if (implementsControlRange && implementsDocSelection && sel.docSelection.type == CONTROL) {
                    updateControlSelection(sel);
                } else {
                    sel._ranges.length = sel.rangeCount = sel.nativeSelection.rangeCount;
                    if (sel.rangeCount) {
                        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                            sel._ranges[i] = new api.WrappedRange(sel.nativeSelection.getRangeAt(i));
                        }
                        updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], selectionIsBackward(sel.nativeSelection));
                        sel.isCollapsed = selectionIsCollapsed(sel);
                    } else {
                        updateEmptySelection(sel);
                    }
                }
            };
        } else if (selectionHasAnchorAndFocus && typeof testSelection.isCollapsed == BOOLEAN && typeof testRange.collapsed == BOOLEAN && features.implementsDomRange) {
            refreshSelection = function(sel) {
                var range, nativeSel = sel.nativeSelection;
                if (nativeSel.anchorNode) {
                    range = getSelectionRangeAt(nativeSel, 0);
                    sel._ranges = [range];
                    sel.rangeCount = 1;
                    updateAnchorAndFocusFromNativeSelection(sel);
                    sel.isCollapsed = selectionIsCollapsed(sel);
                } else {
                    updateEmptySelection(sel);
                }
            };
        } else {
            module.fail("No means of obtaining a Range or TextRange from the user's selection was found");
            return false;
        }

        selProto.refresh = function(checkForChanges) {
            var oldRanges = checkForChanges ? this._ranges.slice(0) : null;
            var oldAnchorNode = this.anchorNode, oldAnchorOffset = this.anchorOffset;

            refreshSelection(this);
            if (checkForChanges) {
                // Check the range count first
                var i = oldRanges.length;
                if (i != this._ranges.length) {
                    return true;
                }

                // Now check the direction. Checking the anchor position is the same is enough since we're checking all the
                // ranges after this
                if (this.anchorNode != oldAnchorNode || this.anchorOffset != oldAnchorOffset) {
                    return true;
                }

                // Finally, compare each range in turn
                while (i--) {
                    if (!rangesEqual(oldRanges[i], this._ranges[i])) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Removal of a single range
        var removeRangeManually = function(sel, range) {
            var ranges = sel.getAllRanges();
            sel.removeAllRanges();
            for (var i = 0, len = ranges.length; i < len; ++i) {
                if (!rangesEqual(range, ranges[i])) {
                    sel.addRange(ranges[i]);
                }
            }
            if (!sel.rangeCount) {
                updateEmptySelection(sel);
            }
        };

        if (implementsControlRange && implementsDocSelection) {
            selProto.removeRange = function(range) {
                if (this.docSelection.type == CONTROL) {
                    var controlRange = this.docSelection.createRange();
                    var rangeElement = getSingleElementFromRange(range);

                    // Create a new ControlRange containing all the elements in the selected ControlRange minus the
                    // element contained by the supplied range
                    var doc = getDocument(controlRange.item(0));
                    var newControlRange = getBody(doc).createControlRange();
                    var el, removed = false;
                    for (var i = 0, len = controlRange.length; i < len; ++i) {
                        el = controlRange.item(i);
                        if (el !== rangeElement || removed) {
                            newControlRange.add(controlRange.item(i));
                        } else {
                            removed = true;
                        }
                    }
                    newControlRange.select();

                    // Update the wrapped selection based on what's now in the native selection
                    updateControlSelection(this);
                } else {
                    removeRangeManually(this, range);
                }
            };
        } else {
            selProto.removeRange = function(range) {
                removeRangeManually(this, range);
            };
        }

        // Detecting if a selection is backward
        var selectionIsBackward;
        if (!useDocumentSelection && selectionHasAnchorAndFocus && features.implementsDomRange) {
            selectionIsBackward = winSelectionIsBackward;

            selProto.isBackward = function() {
                return selectionIsBackward(this);
            };
        } else {
            selectionIsBackward = selProto.isBackward = function() {
                return false;
            };
        }

        // Create an alias for backwards compatibility. From 1.3, everything is "backward" rather than "backwards"
        selProto.isBackwards = selProto.isBackward;

        // Selection stringifier
        // This is conformant to the old HTML5 selections draft spec but differs from WebKit and Mozilla's implementation.
        // The current spec does not yet define this method.
        selProto.toString = function() {
            var rangeTexts = [];
            for (var i = 0, len = this.rangeCount; i < len; ++i) {
                rangeTexts[i] = "" + this._ranges[i];
            }
            return rangeTexts.join("");
        };

        function assertNodeInSameDocument(sel, node) {
            if (sel.win.document != getDocument(node)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }
        }

        // No current browser conforms fully to the spec for this method, so Rangy's own method is always used
        selProto.collapse = function(node, offset) {
            assertNodeInSameDocument(this, node);
            var range = api.createRange(node);
            range.collapseToPoint(node, offset);
            this.setSingleRange(range);
            this.isCollapsed = true;
        };

        selProto.collapseToStart = function() {
            if (this.rangeCount) {
                var range = this._ranges[0];
                this.collapse(range.startContainer, range.startOffset);
            } else {
                throw new DOMException("INVALID_STATE_ERR");
            }
        };

        selProto.collapseToEnd = function() {
            if (this.rangeCount) {
                var range = this._ranges[this.rangeCount - 1];
                this.collapse(range.endContainer, range.endOffset);
            } else {
                throw new DOMException("INVALID_STATE_ERR");
            }
        };

        // The spec is very specific on how selectAllChildren should be implemented so the native implementation is
        // never used by Rangy.
        selProto.selectAllChildren = function(node) {
            assertNodeInSameDocument(this, node);
            var range = api.createRange(node);
            range.selectNodeContents(node);
            this.setSingleRange(range);
        };

        selProto.deleteFromDocument = function() {
            // Sepcial behaviour required for IE's control selections
            if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
                var controlRange = this.docSelection.createRange();
                var element;
                while (controlRange.length) {
                    element = controlRange.item(0);
                    controlRange.remove(element);
                    element.parentNode.removeChild(element);
                }
                this.refresh();
            } else if (this.rangeCount) {
                var ranges = this.getAllRanges();
                if (ranges.length) {
                    this.removeAllRanges();
                    for (var i = 0, len = ranges.length; i < len; ++i) {
                        ranges[i].deleteContents();
                    }
                    // The spec says nothing about what the selection should contain after calling deleteContents on each
                    // range. Firefox moves the selection to where the final selected range was, so we emulate that
                    this.addRange(ranges[len - 1]);
                }
            }
        };

        // The following are non-standard extensions
        selProto.eachRange = function(func, returnValue) {
            for (var i = 0, len = this._ranges.length; i < len; ++i) {
                if ( func( this.getRangeAt(i) ) ) {
                    return returnValue;
                }
            }
        };

        selProto.getAllRanges = function() {
            var ranges = [];
            this.eachRange(function(range) {
                ranges.push(range);
            });
            return ranges;
        };

        selProto.setSingleRange = function(range, direction) {
            this.removeAllRanges();
            this.addRange(range, direction);
        };

        selProto.callMethodOnEachRange = function(methodName, params) {
            var results = [];
            this.eachRange( function(range) {
                results.push( range[methodName].apply(range, params) );
            } );
            return results;
        };
        
        function createStartOrEndSetter(isStart) {
            return function(node, offset) {
                var range;
                if (this.rangeCount) {
                    range = this.getRangeAt(0);
                    range["set" + (isStart ? "Start" : "End")](node, offset);
                } else {
                    range = api.createRange(this.win.document);
                    range.setStartAndEnd(node, offset);
                }
                this.setSingleRange(range, this.isBackward());
            };
        }

        selProto.setStart = createStartOrEndSetter(true);
        selProto.setEnd = createStartOrEndSetter(false);
        
        // Add select() method to Range prototype. Any existing selection will be removed.
        api.rangePrototype.select = function(direction) {
            getSelection( this.getDocument() ).setSingleRange(this, direction);
        };

        selProto.changeEachRange = function(func) {
            var ranges = [];
            var backward = this.isBackward();

            this.eachRange(function(range) {
                func(range);
                ranges.push(range);
            });

            this.removeAllRanges();
            if (backward && ranges.length == 1) {
                this.addRange(ranges[0], "backward");
            } else {
                this.setRanges(ranges);
            }
        };

        selProto.containsNode = function(node, allowPartial) {
            return this.eachRange( function(range) {
                return range.containsNode(node, allowPartial);
            }, true ) || false;
        };

        selProto.getBookmark = function(containerNode) {
            return {
                backward: this.isBackward(),
                rangeBookmarks: this.callMethodOnEachRange("getBookmark", [containerNode])
            };
        };

        selProto.moveToBookmark = function(bookmark) {
            var selRanges = [];
            for (var i = 0, rangeBookmark, range; rangeBookmark = bookmark.rangeBookmarks[i++]; ) {
                range = api.createRange(this.win);
                range.moveToBookmark(rangeBookmark);
                selRanges.push(range);
            }
            if (bookmark.backward) {
                this.setSingleRange(selRanges[0], "backward");
            } else {
                this.setRanges(selRanges);
            }
        };

        selProto.toHtml = function() {
            var rangeHtmls = [];
            this.eachRange(function(range) {
                rangeHtmls.push( DomRange.toHtml(range) );
            });
            return rangeHtmls.join("");
        };

        if (features.implementsTextRange) {
            selProto.getNativeTextRange = function() {
                var sel, textRange;
                if ( (sel = this.docSelection) ) {
                    var range = sel.createRange();
                    if (isTextRange(range)) {
                        return range;
                    } else {
                        throw module.createError("getNativeTextRange: selection is a control selection"); 
                    }
                } else if (this.rangeCount > 0) {
                    return api.WrappedTextRange.rangeToTextRange( this.getRangeAt(0) );
                } else {
                    throw module.createError("getNativeTextRange: selection contains no range");
                }
            };
        }

        function inspect(sel) {
            var rangeInspects = [];
            var anchor = new DomPosition(sel.anchorNode, sel.anchorOffset);
            var focus = new DomPosition(sel.focusNode, sel.focusOffset);
            var name = (typeof sel.getName == "function") ? sel.getName() : "Selection";

            if (typeof sel.rangeCount != "undefined") {
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    rangeInspects[i] = DomRange.inspect(sel.getRangeAt(i));
                }
            }
            return "[" + name + "(Ranges: " + rangeInspects.join(", ") +
                    ")(anchor: " + anchor.inspect() + ", focus: " + focus.inspect() + "]";
        }

        selProto.getName = function() {
            return "WrappedSelection";
        };

        selProto.inspect = function() {
            return inspect(this);
        };

        selProto.detach = function() {
            actOnCachedSelection(this.win, "delete");
            deleteProperties(this);
        };

        WrappedSelection.detachAll = function() {
            actOnCachedSelection(null, "deleteAll");
        };

        WrappedSelection.inspect = inspect;
        WrappedSelection.isDirectionBackward = isDirectionBackward;

        api.Selection = WrappedSelection;

        api.selectionPrototype = selProto;

        api.addShimListener(function(win) {
            if (typeof win.getSelection == "undefined") {
                win.getSelection = function() {
                    return getSelection(win);
                };
            }
            win = null;
        });
    });
    

    /*----------------------------------------------------------------------------------------------------------------*/

    return api;
}, this);;/**
 * Selection save and restore module for Rangy.
 * Saves and restores user selections using marker invisible elements in the DOM.
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Depends on Rangy core.
 *
 * Copyright 2014, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3alpha.20140804
 * Build date: 4 August 2014
 */
(function(factory, global) {
    if (typeof define == "function" && define.amd) {
        // AMD. Register as an anonymous module with a dependency on Rangy.
        define(["rangy"], factory);
        /*
         } else if (typeof exports == "object") {
         // Node/CommonJS style for Browserify
         module.exports = factory;
         */
    } else {
        // No AMD or CommonJS support so we use the rangy global variable
        factory(global.rangy);
    }
})(function(rangy) {
    rangy.createModule("SaveRestore", ["WrappedRange"], function(api, module) {
        var dom = api.dom;

        var markerTextChar = "\ufeff";

        function gEBI(id, doc) {
            return (doc || document).getElementById(id);
        }

        function insertRangeBoundaryMarker(range, atStart) {
            var markerId = "selectionBoundary_" + (+new Date()) + "_" + ("" + Math.random()).slice(2);
            var markerEl;
            var doc = dom.getDocument(range.startContainer);

            // Clone the Range and collapse to the appropriate boundary point
            var boundaryRange = range.cloneRange();
            boundaryRange.collapse(atStart);

            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = doc.createElement("span");
            markerEl.id = markerId;
            markerEl.style.lineHeight = "0";
            markerEl.style.display = "none";
            markerEl.className = "rangySelectionBoundary";
            markerEl.appendChild(doc.createTextNode(markerTextChar));

            boundaryRange.insertNode(markerEl);
            return markerEl;
        }

        function setRangeBoundary(doc, range, markerId, atStart) {
            var markerEl = gEBI(markerId, doc);
            if (markerEl) {
                range[atStart ? "setStartBefore" : "setEndBefore"](markerEl);
                markerEl.parentNode.removeChild(markerEl);
            } else {
                module.warn("Marker element has been removed. Cannot restore selection.");
            }
        }

        function compareRanges(r1, r2) {
            return r2.compareBoundaryPoints(r1.START_TO_START, r1);
        }

        function saveRange(range, backward) {
            var startEl, endEl, doc = api.DomRange.getRangeDocument(range), text = range.toString();

            if (range.collapsed) {
                endEl = insertRangeBoundaryMarker(range, false);
                return {
                    document: doc,
                    markerId: endEl.id,
                    collapsed: true
                };
            } else {
                endEl = insertRangeBoundaryMarker(range, false);
                startEl = insertRangeBoundaryMarker(range, true);

                return {
                    document: doc,
                    startMarkerId: startEl.id,
                    endMarkerId: endEl.id,
                    collapsed: false,
                    backward: backward,
                    toString: function() {
                        return "original text: '" + text + "', new text: '" + range.toString() + "'";
                    }
                };
            }
        }

        function restoreRange(rangeInfo, normalize) {
            var doc = rangeInfo.document;
            if (typeof normalize == "undefined") {
                normalize = true;
            }
            var range = api.createRange(doc);
            if (rangeInfo.collapsed) {
                var markerEl = gEBI(rangeInfo.markerId, doc);
                if (markerEl) {
                    markerEl.style.display = "inline";
                    var previousNode = markerEl.previousSibling;

                    // Workaround for issue 17
                    if (previousNode && previousNode.nodeType == 3) {
                        markerEl.parentNode.removeChild(markerEl);
                        range.collapseToPoint(previousNode, previousNode.length);
                    } else {
                        range.collapseBefore(markerEl);
                        markerEl.parentNode.removeChild(markerEl);
                    }
                } else {
                    module.warn("Marker element has been removed. Cannot restore selection.");
                }
            } else {
                setRangeBoundary(doc, range, rangeInfo.startMarkerId, true);
                setRangeBoundary(doc, range, rangeInfo.endMarkerId, false);
            }

            if (normalize) {
                range.normalizeBoundaries();
            }

            return range;
        }

        function saveRanges(ranges, backward) {
            var rangeInfos = [], range, doc;

            // Order the ranges by position within the DOM, latest first, cloning the array to leave the original untouched
            ranges = ranges.slice(0);
            ranges.sort(compareRanges);

            for (var i = 0, len = ranges.length; i < len; ++i) {
                rangeInfos[i] = saveRange(ranges[i], backward);
            }

            // Now that all the markers are in place and DOM manipulation over, adjust each range's boundaries to lie
            // between its markers
            for (i = len - 1; i >= 0; --i) {
                range = ranges[i];
                doc = api.DomRange.getRangeDocument(range);
                if (range.collapsed) {
                    range.collapseAfter(gEBI(rangeInfos[i].markerId, doc));
                } else {
                    range.setEndBefore(gEBI(rangeInfos[i].endMarkerId, doc));
                    range.setStartAfter(gEBI(rangeInfos[i].startMarkerId, doc));
                }
            }

            return rangeInfos;
        }

        function saveSelection(win) {
            if (!api.isSelectionValid(win)) {
                module.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus.");
                return null;
            }
            var sel = api.getSelection(win);
            var ranges = sel.getAllRanges();
            var backward = (ranges.length == 1 && sel.isBackward());

            var rangeInfos = saveRanges(ranges, backward);

            // Ensure current selection is unaffected
            if (backward) {
                sel.setSingleRange(ranges[0], "backward");
            } else {
                sel.setRanges(ranges);
            }

            return {
                win: win,
                rangeInfos: rangeInfos,
                restored: false
            };
        }

        function restoreRanges(rangeInfos) {
            var ranges = [];

            // Ranges are in reverse order of appearance in the DOM. We want to restore earliest first to avoid
            // normalization affecting previously restored ranges.
            var rangeCount = rangeInfos.length;

            for (var i = rangeCount - 1; i >= 0; i--) {
                ranges[i] = restoreRange(rangeInfos[i], true);
            }

            return ranges;
        }

        function restoreSelection(savedSelection, preserveDirection) {
            if (!savedSelection.restored) {
                var rangeInfos = savedSelection.rangeInfos;
                var sel = api.getSelection(savedSelection.win);
                var ranges = restoreRanges(rangeInfos), rangeCount = rangeInfos.length;

                if (rangeCount == 1 && preserveDirection && api.features.selectionHasExtend && rangeInfos[0].backward) {
                    sel.removeAllRanges();
                    sel.addRange(ranges[0], true);
                } else {
                    sel.setRanges(ranges);
                }

                savedSelection.restored = true;
            }
        }

        function removeMarkerElement(doc, markerId) {
            var markerEl = gEBI(markerId, doc);
            if (markerEl) {
                markerEl.parentNode.removeChild(markerEl);
            }
        }

        function removeMarkers(savedSelection) {
            var rangeInfos = savedSelection.rangeInfos;
            for (var i = 0, len = rangeInfos.length, rangeInfo; i < len; ++i) {
                rangeInfo = rangeInfos[i];
                if (rangeInfo.collapsed) {
                    removeMarkerElement(savedSelection.doc, rangeInfo.markerId);
                } else {
                    removeMarkerElement(savedSelection.doc, rangeInfo.startMarkerId);
                    removeMarkerElement(savedSelection.doc, rangeInfo.endMarkerId);
                }
            }
        }

        api.util.extend(api, {
            saveRange: saveRange,
            restoreRange: restoreRange,
            saveRanges: saveRanges,
            restoreRanges: restoreRanges,
            saveSelection: saveSelection,
            restoreSelection: restoreSelection,
            removeMarkerElement: removeMarkerElement,
            removeMarkers: removeMarkers
        });
    });
    
}, this);;/*
	Base.js, version 1.1a
	Copyright 2006-2010, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

var Base = function() {
	// dummy
};

Base.extend = function(_instance, _static) { // subclass
	var extend = Base.prototype.extend;
	
	// build the prototype
	Base._prototyping = true;
	var proto = new this;
	extend.call(proto, _instance);
  proto.base = function() {
    // call this method from any other method to invoke that method's ancestor
  };
	delete Base._prototyping;
	
	// create the wrapper for the constructor function
	//var constructor = proto.constructor.valueOf(); //-dean
	var constructor = proto.constructor;
	var klass = proto.constructor = function() {
		if (!Base._prototyping) {
			if (this._constructing || this.constructor == klass) { // instantiation
				this._constructing = true;
				constructor.apply(this, arguments);
				delete this._constructing;
			} else if (arguments[0] != null) { // casting
				return (arguments[0].extend || extend).call(arguments[0], proto);
			}
		}
	};
	
	// build the class interface
	klass.ancestor = this;
	klass.extend = this.extend;
	klass.forEach = this.forEach;
	klass.implement = this.implement;
	klass.prototype = proto;
	klass.toString = this.toString;
	klass.valueOf = function(type) {
		//return (type == "object") ? klass : constructor; //-dean
		return (type == "object") ? klass : constructor.valueOf();
	};
	extend.call(klass, _static);
	// class initialisation
	if (typeof klass.init == "function") klass.init();
	return klass;
};

Base.prototype = {	
	extend: function(source, value) {
		if (arguments.length > 1) { // extending with a name/value pair
			var ancestor = this[source];
			if (ancestor && (typeof value == "function") && // overriding a method?
				// the valueOf() comparison is to avoid circular references
				(!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
				/\bbase\b/.test(value)) {
				// get the underlying method
				var method = value.valueOf();
				// override
				value = function() {
					var previous = this.base || Base.prototype.base;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				// point to the underlying method
				value.valueOf = function(type) {
					return (type == "object") ? value : method;
				};
				value.toString = Base.toString;
			}
			this[source] = value;
		} else if (source) { // extending with an object literal
			var extend = Base.prototype.extend;
			// if this object has a customised extend method then use it
			if (!Base._prototyping && typeof this != "function") {
				extend = this.extend || extend;
			}
			var proto = {toSource: null};
			// do the "toString" and other methods manually
			var hidden = ["constructor", "toString", "valueOf"];
			// if we are prototyping then include the constructor
			var i = Base._prototyping ? 0 : 1;
			while (key = hidden[i++]) {
				if (source[key] != proto[key]) {
					extend.call(this, key, source[key]);

				}
			}
			// copy each of the source object's properties to this object
			for (var key in source) {
				if (!proto[key]) extend.call(this, key, source[key]);
			}
		}
		return this;
	}
};

// initialise
Base = Base.extend({
	constructor: function() {
		this.extend(arguments[0]);
	}
}, {
	ancestor: Object,
	version: "1.1",
	
	forEach: function(object, block, context) {
		for (var key in object) {
			if (this.prototype[key] === undefined) {
				block.call(context, object[key], key, object);
			}
		}
	},
		
	implement: function() {
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == "function") {
				// if it's a function, call it
				arguments[i](this.prototype);
			} else {
				// add the interface using the extend method
				this.prototype.extend(arguments[i]);
			}
		}
		return this;
	},
	
	toString: function() {
		return String(this.valueOf());
	}
});;/**
 * Detect browser support for specific features
 */
wysihtml5.browser = (function() {
  var userAgent   = navigator.userAgent,
      testElement = document.createElement("div"),
      // Browser sniffing is unfortunately needed since some behaviors are impossible to feature detect
      isGecko     = userAgent.indexOf("Gecko")        !== -1 && userAgent.indexOf("KHTML") === -1,
      isWebKit    = userAgent.indexOf("AppleWebKit/") !== -1,
      isChrome    = userAgent.indexOf("Chrome/")      !== -1,
      isOpera     = userAgent.indexOf("Opera/")       !== -1;

  function iosVersion(userAgent) {
    return +((/ipad|iphone|ipod/.test(userAgent) && userAgent.match(/ os (\d+).+? like mac os x/)) || [undefined, 0])[1];
  }

  function androidVersion(userAgent) {
    return +(userAgent.match(/android (\d+)/) || [undefined, 0])[1];
  }

  function isIE(version, equation) {
    var rv = -1,
        re;

    if (navigator.appName == 'Microsoft Internet Explorer') {
      re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    } else if (navigator.appName == 'Netscape') {
      re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    }

    if (re && re.exec(navigator.userAgent) != null) {
      rv = parseFloat(RegExp.$1);
    }

    if (rv === -1) { return false; }
    if (!version) { return true; }
    if (!equation) { return version === rv; }
    if (equation === "<") { return version < rv; }
    if (equation === ">") { return version > rv; }
    if (equation === "<=") { return version <= rv; }
    if (equation === ">=") { return version >= rv; }
  }

  return {
    // Static variable needed, publicly accessible, to be able override it in unit tests
    USER_AGENT: userAgent,

    /**
     * Exclude browsers that are not capable of displaying and handling
     * contentEditable as desired:
     *    - iPhone, iPad (tested iOS 4.2.2) and Android (tested 2.2) refuse to make contentEditables focusable
     *    - IE < 8 create invalid markup and crash randomly from time to time
     *
     * @return {Boolean}
     */
    supported: function() {
      var userAgent                   = this.USER_AGENT.toLowerCase(),
          // Essential for making html elements editable
          hasContentEditableSupport   = "contentEditable" in testElement,
          // Following methods are needed in order to interact with the contentEditable area
          hasEditingApiSupport        = document.execCommand && document.queryCommandSupported && document.queryCommandState,
          // document selector apis are only supported by IE 8+, Safari 4+, Chrome and Firefox 3.5+
          hasQuerySelectorSupport     = document.querySelector && document.querySelectorAll,
          // contentEditable is unusable in mobile browsers (tested iOS 4.2.2, Android 2.2, Opera Mobile, WebOS 3.05)
          isIncompatibleMobileBrowser = (this.isIos() && iosVersion(userAgent) < 5) || (this.isAndroid() && androidVersion(userAgent) < 4) || userAgent.indexOf("opera mobi") !== -1 || userAgent.indexOf("hpwos/") !== -1;
      return hasContentEditableSupport
        && hasEditingApiSupport
        && hasQuerySelectorSupport
        && !isIncompatibleMobileBrowser;
    },

    isTouchDevice: function() {
      return this.supportsEvent("touchmove");
    },

    isIos: function() {
      return (/ipad|iphone|ipod/i).test(this.USER_AGENT);
    },

    isAndroid: function() {
      return this.USER_AGENT.indexOf("Android") !== -1;
    },

    /**
     * Whether the browser supports sandboxed iframes
     * Currently only IE 6+ offers such feature <iframe security="restricted">
     *
     * http://msdn.microsoft.com/en-us/library/ms534622(v=vs.85).aspx
     * http://blogs.msdn.com/b/ie/archive/2008/01/18/using-frames-more-securely.aspx
     *
     * HTML5 sandboxed iframes are still buggy and their DOM is not reachable from the outside (except when using postMessage)
     */
    supportsSandboxedIframes: function() {
      return isIE();
    },

    /**
     * IE6+7 throw a mixed content warning when the src of an iframe
     * is empty/unset or about:blank
     * window.querySelector is implemented as of IE8
     */
    throwsMixedContentWarningWhenIframeSrcIsEmpty: function() {
      return !("querySelector" in document);
    },

    /**
     * Whether the caret is correctly displayed in contentEditable elements
     * Firefox sometimes shows a huge caret in the beginning after focusing
     */
    displaysCaretInEmptyContentEditableCorrectly: function() {
      return isIE();
    },

    /**
     * Opera and IE are the only browsers who offer the css value
     * in the original unit, thx to the currentStyle object
     * All other browsers provide the computed style in px via window.getComputedStyle
     */
    hasCurrentStyleProperty: function() {
      return "currentStyle" in testElement;
    },

    /**
     * Firefox on OSX navigates through history when hitting CMD + Arrow right/left
     */
    hasHistoryIssue: function() {
      return isGecko && navigator.platform.substr(0, 3) === "Mac";
    },

    /**
     * Whether the browser inserts a <br> when pressing enter in a contentEditable element
     */
    insertsLineBreaksOnReturn: function() {
      return isGecko;
    },

    supportsPlaceholderAttributeOn: function(element) {
      return "placeholder" in element;
    },

    supportsEvent: function(eventName) {
      return "on" + eventName in testElement || (function() {
        testElement.setAttribute("on" + eventName, "return;");
        return typeof(testElement["on" + eventName]) === "function";
      })();
    },

    /**
     * Opera doesn't correctly fire focus/blur events when clicking in- and outside of iframe
     */
    supportsEventsInIframeCorrectly: function() {
      return !isOpera;
    },

    /**
     * Everything below IE9 doesn't know how to treat HTML5 tags
     *
     * @param {Object} context The document object on which to check HTML5 support
     *
     * @example
     *    wysihtml5.browser.supportsHTML5Tags(document);
     */
    supportsHTML5Tags: function(context) {
      var element = context.createElement("div"),
          html5   = "<article>foo</article>";
      element.innerHTML = html5;
      return element.innerHTML.toLowerCase() === html5;
    },

    /**
     * Checks whether a document supports a certain queryCommand
     * In particular, Opera needs a reference to a document that has a contentEditable in it's dom tree
     * in oder to report correct results
     *
     * @param {Object} doc Document object on which to check for a query command
     * @param {String} command The query command to check for
     * @return {Boolean}
     *
     * @example
     *    wysihtml5.browser.supportsCommand(document, "bold");
     */
    supportsCommand: (function() {
      // Following commands are supported but contain bugs in some browsers
      var buggyCommands = {
        // formatBlock fails with some tags (eg. <blockquote>)
        "formatBlock":          isIE(10, "<="),
         // When inserting unordered or ordered lists in Firefox, Chrome or Safari, the current selection or line gets
         // converted into a list (<ul><li>...</li></ul>, <ol><li>...</li></ol>)
         // IE and Opera act a bit different here as they convert the entire content of the current block element into a list
        "insertUnorderedList":  isIE(),
        "insertOrderedList":    isIE()
      };

      // Firefox throws errors for queryCommandSupported, so we have to build up our own object of supported commands
      var supported = {
        "insertHTML": isGecko
      };

      return function(doc, command) {
        var isBuggy = buggyCommands[command];
        if (!isBuggy) {
          // Firefox throws errors when invoking queryCommandSupported or queryCommandEnabled
          try {
            return doc.queryCommandSupported(command);
          } catch(e1) {}

          try {
            return doc.queryCommandEnabled(command);
          } catch(e2) {
            return !!supported[command];
          }
        }
        return false;
      };
    })(),

    /**
     * IE: URLs starting with:
     *    www., http://, https://, ftp://, gopher://, mailto:, new:, snews:, telnet:, wasis:, file://,
     *    nntp://, newsrc:, ldap://, ldaps://, outlook:, mic:// and url:
     * will automatically be auto-linked when either the user inserts them via copy&paste or presses the
     * space bar when the caret is directly after such an url.
     * This behavior cannot easily be avoided in IE < 9 since the logic is hardcoded in the mshtml.dll
     * (related blog post on msdn
     * http://blogs.msdn.com/b/ieinternals/archive/2009/09/17/prevent-automatic-hyperlinking-in-contenteditable-html.aspx).
     */
    doesAutoLinkingInContentEditable: function() {
      return isIE();
    },

    /**
     * As stated above, IE auto links urls typed into contentEditable elements
     * Since IE9 it's possible to prevent this behavior
     */
    canDisableAutoLinking: function() {
      return this.supportsCommand(document, "AutoUrlDetect");
    },

    /**
     * IE leaves an empty paragraph in the contentEditable element after clearing it
     * Chrome/Safari sometimes an empty <div>
     */
    clearsContentEditableCorrectly: function() {
      return isGecko || isOpera || isWebKit;
    },

    /**
     * IE gives wrong results for getAttribute
     */
    supportsGetAttributeCorrectly: function() {
      var td = document.createElement("td");
      return td.getAttribute("rowspan") != "1";
    },

    /**
     * When clicking on images in IE, Opera and Firefox, they are selected, which makes it easy to interact with them.
     * Chrome and Safari both don't support this
     */
    canSelectImagesInContentEditable: function() {
      return isGecko || isIE() || isOpera;
    },

    /**
     * All browsers except Safari and Chrome automatically scroll the range/caret position into view
     */
    autoScrollsToCaret: function() {
      return !isWebKit;
    },

    /**
     * Check whether the browser automatically closes tags that don't need to be opened
     */
    autoClosesUnclosedTags: function() {
      var clonedTestElement = testElement.cloneNode(false),
          returnValue,
          innerHTML;

      clonedTestElement.innerHTML = "<p><div></div>";
      innerHTML                   = clonedTestElement.innerHTML.toLowerCase();
      returnValue                 = innerHTML === "<p></p><div></div>" || innerHTML === "<p><div></div></p>";

      // Cache result by overwriting current function
      this.autoClosesUnclosedTags = function() { return returnValue; };

      return returnValue;
    },

    /**
     * Whether the browser supports the native document.getElementsByClassName which returns live NodeLists
     */
    supportsNativeGetElementsByClassName: function() {
      return String(document.getElementsByClassName).indexOf("[native code]") !== -1;
    },

    /**
     * As of now (19.04.2011) only supported by Firefox 4 and Chrome
     * See https://developer.mozilla.org/en/DOM/Selection/modify
     */
    supportsSelectionModify: function() {
      return "getSelection" in window && "modify" in window.getSelection();
    },

    /**
     * Opera needs a white space after a <br> in order to position the caret correctly
     */
    needsSpaceAfterLineBreak: function() {
      return isOpera;
    },

    /**
     * Whether the browser supports the speech api on the given element
     * See http://mikepultz.com/2011/03/accessing-google-speech-api-chrome-11/
     *
     * @example
     *    var input = document.createElement("input");
     *    if (wysihtml5.browser.supportsSpeechApiOn(input)) {
     *      // ...
     *    }
     */
    supportsSpeechApiOn: function(input) {
      var chromeVersion = userAgent.match(/Chrome\/(\d+)/) || [undefined, 0];
      return chromeVersion[1] >= 11 && ("onwebkitspeechchange" in input || "speech" in input);
    },

    /**
     * IE9 crashes when setting a getter via Object.defineProperty on XMLHttpRequest or XDomainRequest
     * See https://connect.microsoft.com/ie/feedback/details/650112
     * or try the POC http://tifftiff.de/ie9_crash/
     */
    crashesWhenDefineProperty: function(property) {
      return isIE(9) && (property === "XMLHttpRequest" || property === "XDomainRequest");
    },

    /**
     * IE is the only browser who fires the "focus" event not immediately when .focus() is called on an element
     */
    doesAsyncFocus: function() {
      return isIE();
    },

    /**
     * In IE it's impssible for the user and for the selection library to set the caret after an <img> when it's the lastChild in the document
     */
    hasProblemsSettingCaretAfterImg: function() {
      return isIE();
    },

    hasUndoInContextMenu: function() {
      return isGecko || isChrome || isOpera;
    },

    /**
     * Opera sometimes doesn't insert the node at the right position when range.insertNode(someNode)
     * is used (regardless if rangy or native)
     * This especially happens when the caret is positioned right after a <br> because then
     * insertNode() will insert the node right before the <br>
     */
    hasInsertNodeIssue: function() {
      return isOpera;
    },

    /**
     * IE 8+9 don't fire the focus event of the <body> when the iframe gets focused (even though the caret gets set into the <body>)
     */
    hasIframeFocusIssue: function() {
      return isIE();
    },

    /**
     * Chrome + Safari create invalid nested markup after paste
     *
     *  <p>
     *    foo
     *    <p>bar</p> <!-- BOO! -->
     *  </p>
     */
    createsNestedInvalidMarkupAfterPaste: function() {
      return isWebKit;
    },

    supportsMutationEvents: function() {
        return ("MutationEvent" in window);
    },

    /**
      IE (at least up to 11) does not support clipboardData on event.
      It is on window but cannot return text/html
      Should actually check for clipboardData on paste event, but cannot in firefox
    */
    supportsModenPaste: function () {
      return !("clipboardData" in window);
    }
  };
})();
;wysihtml5.lang.array = function(arr) {
  return {
    /**
     * Check whether a given object exists in an array
     *
     * @example
     *    wysihtml5.lang.array([1, 2]).contains(1);
     *    // => true
     *
     * Can be used to match array with array. If intersection is found true is returned
     */
    contains: function(needle) {
      if (Array.isArray(needle)) {
        for (var i = needle.length; i--;) {
          if (wysihtml5.lang.array(arr).indexOf(needle[i]) !== -1) {
            return true;
          }
        }
        return false;
      } else {
        return wysihtml5.lang.array(arr).indexOf(needle) !== -1;
      }
    },

    /**
     * Check whether a given object exists in an array and return index
     * If no elelemt found returns -1
     *
     * @example
     *    wysihtml5.lang.array([1, 2]).indexOf(2);
     *    // => 1
     */
    indexOf: function(needle) {
        if (arr.indexOf) {
          return arr.indexOf(needle);
        } else {
          for (var i=0, length=arr.length; i<length; i++) {
            if (arr[i] === needle) { return i; }
          }
          return -1;
        }
    },

    /**
     * Substract one array from another
     *
     * @example
     *    wysihtml5.lang.array([1, 2, 3, 4]).without([3, 4]);
     *    // => [1, 2]
     */
    without: function(arrayToSubstract) {
      arrayToSubstract = wysihtml5.lang.array(arrayToSubstract);
      var newArr  = [],
          i       = 0,
          length  = arr.length;
      for (; i<length; i++) {
        if (!arrayToSubstract.contains(arr[i])) {
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },

    /**
     * Return a clean native array
     *
     * Following will convert a Live NodeList to a proper Array
     * @example
     *    var childNodes = wysihtml5.lang.array(document.body.childNodes).get();
     */
    get: function() {
      var i        = 0,
          length   = arr.length,
          newArray = [];
      for (; i<length; i++) {
        newArray.push(arr[i]);
      }
      return newArray;
    },

    /**
     * Creates a new array with the results of calling a provided function on every element in this array.
     * optionally this can be provided as second argument
     *
     * @example
     *    var childNodes = wysihtml5.lang.array([1,2,3,4]).map(function (value, index, array) {
            return value * 2;
     *    });
     *    // => [2,4,6,8]
     */
    map: function(callback, thisArg) {
      if (Array.prototype.map) {
        return arr.map(callback, thisArg);
      } else {
        var len = arr.length >>> 0,
            A = new Array(len),
            i = 0;
        for (; i < len; i++) {
           A[i] = callback.call(thisArg, arr[i], i, arr);
        }
        return A;
      }
    },

    /* ReturnS new array without duplicate entries
     *
     * @example
     *    var uniq = wysihtml5.lang.array([1,2,3,2,1,4]).unique();
     *    // => [1,2,3,4]
     */
    unique: function() {
      var vals = [],
          max = arr.length,
          idx = 0;

      while (idx < max) {
        if (!wysihtml5.lang.array(vals).contains(arr[idx])) {
          vals.push(arr[idx]);
        }
        idx++;
      }
      return vals;
    }

  };
};
;wysihtml5.lang.Dispatcher = Base.extend(
  /** @scope wysihtml5.lang.Dialog.prototype */ {
  on: function(eventName, handler) {
    this.events = this.events || {};
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(handler);
    return this;
  },

  off: function(eventName, handler) {
    this.events = this.events || {};
    var i = 0,
        handlers,
        newHandlers;
    if (eventName) {
      handlers    = this.events[eventName] || [],
      newHandlers = [];
      for (; i<handlers.length; i++) {
        if (handlers[i] !== handler && handler) {
          newHandlers.push(handlers[i]);
        }
      }
      this.events[eventName] = newHandlers;
    } else {
      // Clean up all events
      this.events = {};
    }
    return this;
  },

  fire: function(eventName, payload) {
    this.events = this.events || {};
    var handlers = this.events[eventName] || [],
        i        = 0;
    for (; i<handlers.length; i++) {
      handlers[i].call(this, payload);
    }
    return this;
  },

  // deprecated, use .on()
  observe: function() {
    return this.on.apply(this, arguments);
  },

  // deprecated, use .off()
  stopObserving: function() {
    return this.off.apply(this, arguments);
  }
});
;wysihtml5.lang.object = function(obj) {
  return {
    /**
     * @example
     *    wysihtml5.lang.object({ foo: 1, bar: 1 }).merge({ bar: 2, baz: 3 }).get();
     *    // => { foo: 1, bar: 2, baz: 3 }
     */
    merge: function(otherObj) {
      for (var i in otherObj) {
        obj[i] = otherObj[i];
      }
      return this;
    },

    get: function() {
      return obj;
    },

    /**
     * @example
     *    wysihtml5.lang.object({ foo: 1 }).clone();
     *    // => { foo: 1 }
     *
     *    v0.4.14 adds options for deep clone : wysihtml5.lang.object({ foo: 1 }).clone(true);
     */
    clone: function(deep) {
      var newObj = {},
          i;

      if (obj === null || !wysihtml5.lang.object(obj).isPlainObject()) {
        return obj;
      }

      for (i in obj) {
        if(obj.hasOwnProperty(i)) {
          if (deep) {
            newObj[i] = wysihtml5.lang.object(obj[i]).clone(deep);
          } else {
            newObj[i] = obj[i];
          }
        }
      }
      return newObj;
    },

    /**
     * @example
     *    wysihtml5.lang.object([]).isArray();
     *    // => true
     */
    isArray: function() {
      return Object.prototype.toString.call(obj) === "[object Array]";
    },

    /**
     * @example
     *    wysihtml5.lang.object(function() {}).isFunction();
     *    // => true
     */
    isFunction: function() {
      return Object.prototype.toString.call(obj) === '[object Function]';
    },

    isPlainObject: function () {
      return Object.prototype.toString.call(obj) === '[object Object]';
    }
  };
};
;(function() {
  var WHITE_SPACE_START = /^\s+/,
      WHITE_SPACE_END   = /\s+$/,
      ENTITY_REG_EXP    = /[&<>\t"]/g,
      ENTITY_MAP = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': "&quot;",
        '\t':"&nbsp; "
      };
  wysihtml5.lang.string = function(str) {
    str = String(str);
    return {
      /**
       * @example
       *    wysihtml5.lang.string("   foo   ").trim();
       *    // => "foo"
       */
      trim: function() {
        return str.replace(WHITE_SPACE_START, "").replace(WHITE_SPACE_END, "");
      },

      /**
       * @example
       *    wysihtml5.lang.string("Hello #{name}").interpolate({ name: "Christopher" });
       *    // => "Hello Christopher"
       */
      interpolate: function(vars) {
        for (var i in vars) {
          str = this.replace("#{" + i + "}").by(vars[i]);
        }
        return str;
      },

      /**
       * @example
       *    wysihtml5.lang.string("Hello Tom").replace("Tom").with("Hans");
       *    // => "Hello Hans"
       */
      replace: function(search) {
        return {
          by: function(replace) {
            return str.split(search).join(replace);
          }
        };
      },

      /**
       * @example
       *    wysihtml5.lang.string("hello<br>").escapeHTML();
       *    // => "hello&lt;br&gt;"
       */
      escapeHTML: function(linebreaks, convertSpaces) {
        var html = str.replace(ENTITY_REG_EXP, function(c) { return ENTITY_MAP[c]; });
        if (linebreaks) {
          html = html.replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
        if (convertSpaces) {
          html = html.replace(/  /gi, "&nbsp; ");
        }
        return html;
      }
    };
  };
})();
;/**
 * Find urls in descendant text nodes of an element and auto-links them
 * Inspired by http://james.padolsey.com/javascript/find-and-replace-text-with-javascript/
 *
 * @param {Element} element Container element in which to search for urls
 *
 * @example
 *    <div id="text-container">Please click here: www.google.com</div>
 *    <script>wysihtml5.dom.autoLink(document.getElementById("text-container"));</script>
 */
(function(wysihtml5) {
  var /**
       * Don't auto-link urls that are contained in the following elements:
       */
      IGNORE_URLS_IN        = wysihtml5.lang.array(["CODE", "PRE", "A", "SCRIPT", "HEAD", "TITLE", "STYLE"]),
      /**
       * revision 1:
       *    /(\S+\.{1}[^\s\,\.\!]+)/g
       *
       * revision 2:
       *    /(\b(((https?|ftp):\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;\[\]]*[-A-Z0-9+&@#\/%=~_|])/gim
       *
       * put this in the beginning if you don't wan't to match within a word
       *    (^|[\>\(\{\[\s\>])
       */
      URL_REG_EXP           = /((https?:\/\/|www\.)[^\s<]{3,})/gi,
      TRAILING_CHAR_REG_EXP = /([^\w\/\-](,?))$/i,
      MAX_DISPLAY_LENGTH    = 100,
      BRACKETS              = { ")": "(", "]": "[", "}": "{" };

  function autoLink(element, ignoreInClasses) {
    if (_hasParentThatShouldBeIgnored(element, ignoreInClasses)) {
      return element;
    }

    if (element === element.ownerDocument.documentElement) {
      element = element.ownerDocument.body;
    }

    return _parseNode(element, ignoreInClasses);
  }

  /**
   * This is basically a rebuild of
   * the rails auto_link_urls text helper
   */
  function _convertUrlsToLinks(str) {
    return str.replace(URL_REG_EXP, function(match, url) {
      var punctuation = (url.match(TRAILING_CHAR_REG_EXP) || [])[1] || "",
          opening     = BRACKETS[punctuation];
      url = url.replace(TRAILING_CHAR_REG_EXP, "");

      if (url.split(opening).length > url.split(punctuation).length) {
        url = url + punctuation;
        punctuation = "";
      }
      var realUrl    = url,
          displayUrl = url;
      if (url.length > MAX_DISPLAY_LENGTH) {
        displayUrl = displayUrl.substr(0, MAX_DISPLAY_LENGTH) + "...";
      }
      // Add http prefix if necessary
      if (realUrl.substr(0, 4) === "www.") {
        realUrl = "http://" + realUrl;
      }

      return '<a href="' + realUrl + '">' + displayUrl + '</a>' + punctuation;
    });
  }

  /**
   * Creates or (if already cached) returns a temp element
   * for the given document object
   */
  function _getTempElement(context) {
    var tempElement = context._wysihtml5_tempElement;
    if (!tempElement) {
      tempElement = context._wysihtml5_tempElement = context.createElement("div");
    }
    return tempElement;
  }

  /**
   * Replaces the original text nodes with the newly auto-linked dom tree
   */
  function _wrapMatchesInNode(textNode) {
    var parentNode  = textNode.parentNode,
        nodeValue   = wysihtml5.lang.string(textNode.data).escapeHTML(),
        tempElement = _getTempElement(parentNode.ownerDocument);

    // We need to insert an empty/temporary <span /> to fix IE quirks
    // Elsewise IE would strip white space in the beginning
    tempElement.innerHTML = "<span></span>" + _convertUrlsToLinks(nodeValue);
    tempElement.removeChild(tempElement.firstChild);

    while (tempElement.firstChild) {
      // inserts tempElement.firstChild before textNode
      parentNode.insertBefore(tempElement.firstChild, textNode);
    }
    parentNode.removeChild(textNode);
  }

  function _hasParentThatShouldBeIgnored(node, ignoreInClasses) {
    var nodeName;
    while (node.parentNode) {
      node = node.parentNode;
      nodeName = node.nodeName;
      if (node.className && wysihtml5.lang.array(node.className.split(' ')).contains(ignoreInClasses)) {
        return true;
      }
      if (IGNORE_URLS_IN.contains(nodeName)) {
        return true;
      } else if (nodeName === "body") {
        return false;
      }
    }
    return false;
  }

  function _parseNode(element, ignoreInClasses) {
    if (IGNORE_URLS_IN.contains(element.nodeName)) {
      return;
    }

    if (element.className && wysihtml5.lang.array(element.className.split(' ')).contains(ignoreInClasses)) {
      return;
    }

    if (element.nodeType === wysihtml5.TEXT_NODE && element.data.match(URL_REG_EXP)) {
      _wrapMatchesInNode(element);
      return;
    }

    var childNodes        = wysihtml5.lang.array(element.childNodes).get(),
        childNodesLength  = childNodes.length,
        i                 = 0;

    for (; i<childNodesLength; i++) {
      _parseNode(childNodes[i], ignoreInClasses);
    }

    return element;
  }

  wysihtml5.dom.autoLink = autoLink;

  // Reveal url reg exp to the outside
  wysihtml5.dom.autoLink.URL_REG_EXP = URL_REG_EXP;
})(wysihtml5);
;(function(wysihtml5) {
  var api = wysihtml5.dom;

  api.addClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.add(className);
    }
    if (api.hasClass(element, className)) {
      return;
    }
    element.className += " " + className;
  };

  api.removeClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.remove(className);
    }

    element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ");
  };

  api.hasClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.contains(className);
    }

    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  };
})(wysihtml5);
;wysihtml5.dom.contains = (function() {
  var documentElement = document.documentElement;
  if (documentElement.contains) {
    return function(container, element) {
      if (element.nodeType !== wysihtml5.ELEMENT_NODE) {
        element = element.parentNode;
      }
      return container !== element && container.contains(element);
    };
  } else if (documentElement.compareDocumentPosition) {
    return function(container, element) {
      // https://developer.mozilla.org/en/DOM/Node.compareDocumentPosition
      return !!(container.compareDocumentPosition(element) & 16);
    };
  }
})();
;/**
 * Converts an HTML fragment/element into a unordered/ordered list
 *
 * @param {Element} element The element which should be turned into a list
 * @param {String} listType The list type in which to convert the tree (either "ul" or "ol")
 * @return {Element} The created list
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <span id="pseudo-list">
 *      eminem<br>
 *      dr. dre
 *      <div>50 Cent</div>
 *    </span>
 *
 *    <script>
 *      wysihtml5.dom.convertToList(document.getElementById("pseudo-list"), "ul");
 *    </script>
 *
 *    <!-- Will result in: -->
 *    <ul>
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 */
wysihtml5.dom.convertToList = (function() {
  function _createListItem(doc, list) {
    var listItem = doc.createElement("li");
    list.appendChild(listItem);
    return listItem;
  }

  function _createList(doc, type) {
    return doc.createElement(type);
  }

  function convertToList(element, listType, uneditableClass) {
    if (element.nodeName === "UL" || element.nodeName === "OL" || element.nodeName === "MENU") {
      // Already a list
      return element;
    }

    var doc               = element.ownerDocument,
        list              = _createList(doc, listType),
        lineBreaks        = element.querySelectorAll("br"),
        lineBreaksLength  = lineBreaks.length,
        childNodes,
        childNodesLength,
        childNode,
        lineBreak,
        parentNode,
        isBlockElement,
        isLineBreak,
        currentListItem,
        i;

    // First find <br> at the end of inline elements and move them behind them
    for (i=0; i<lineBreaksLength; i++) {
      lineBreak = lineBreaks[i];
      while ((parentNode = lineBreak.parentNode) && parentNode !== element && parentNode.lastChild === lineBreak) {
        if (wysihtml5.dom.getStyle("display").from(parentNode) === "block") {
          parentNode.removeChild(lineBreak);
          break;
        }
        wysihtml5.dom.insert(lineBreak).after(lineBreak.parentNode);
      }
    }

    childNodes        = wysihtml5.lang.array(element.childNodes).get();
    childNodesLength  = childNodes.length;

    for (i=0; i<childNodesLength; i++) {
      currentListItem   = currentListItem || _createListItem(doc, list);
      childNode         = childNodes[i];
      isBlockElement    = wysihtml5.dom.getStyle("display").from(childNode) === "block";
      isLineBreak       = childNode.nodeName === "BR";

      // consider uneditable as an inline element
      if (isBlockElement && (!uneditableClass || !wysihtml5.dom.hasClass(childNode, uneditableClass))) {
        // Append blockElement to current <li> if empty, otherwise create a new one
        currentListItem = currentListItem.firstChild ? _createListItem(doc, list) : currentListItem;
        currentListItem.appendChild(childNode);
        currentListItem = null;
        continue;
      }

      if (isLineBreak) {
        // Only create a new list item in the next iteration when the current one has already content
        currentListItem = currentListItem.firstChild ? null : currentListItem;
        continue;
      }

      currentListItem.appendChild(childNode);
    }

    if (childNodes.length === 0) {
      _createListItem(doc, list);
    }

    element.parentNode.replaceChild(list, element);
    return list;
  }

  return convertToList;
})();
;/**
 * Copy a set of attributes from one element to another
 *
 * @param {Array} attributesToCopy List of attributes which should be copied
 * @return {Object} Returns an object which offers the "from" method which can be invoked with the element where to
 *    copy the attributes from., this again returns an object which provides a method named "to" which can be invoked
 *    with the element where to copy the attributes to (see example)
 *
 * @example
 *    var textarea    = document.querySelector("textarea"),
 *        div         = document.querySelector("div[contenteditable=true]"),
 *        anotherDiv  = document.querySelector("div.preview");
 *    wysihtml5.dom.copyAttributes(["spellcheck", "value", "placeholder"]).from(textarea).to(div).andTo(anotherDiv);
 *
 */
wysihtml5.dom.copyAttributes = function(attributesToCopy) {
  return {
    from: function(elementToCopyFrom) {
      return {
        to: function(elementToCopyTo) {
          var attribute,
              i         = 0,
              length    = attributesToCopy.length;
          for (; i<length; i++) {
            attribute = attributesToCopy[i];
            if (typeof(elementToCopyFrom[attribute]) !== "undefined" && elementToCopyFrom[attribute] !== "") {
              elementToCopyTo[attribute] = elementToCopyFrom[attribute];
            }
          }
          return { andTo: arguments.callee };
        }
      };
    }
  };
};
;/**
 * Copy a set of styles from one element to another
 * Please note that this only works properly across browsers when the element from which to copy the styles
 * is in the dom
 *
 * Interesting article on how to copy styles
 *
 * @param {Array} stylesToCopy List of styles which should be copied
 * @return {Object} Returns an object which offers the "from" method which can be invoked with the element where to
 *    copy the styles from., this again returns an object which provides a method named "to" which can be invoked
 *    with the element where to copy the styles to (see example)
 *
 * @example
 *    var textarea    = document.querySelector("textarea"),
 *        div         = document.querySelector("div[contenteditable=true]"),
 *        anotherDiv  = document.querySelector("div.preview");
 *    wysihtml5.dom.copyStyles(["overflow-y", "width", "height"]).from(textarea).to(div).andTo(anotherDiv);
 *
 */
(function(dom) {

  /**
   * Mozilla, WebKit and Opera recalculate the computed width when box-sizing: boder-box; is set
   * So if an element has "width: 200px; -moz-box-sizing: border-box; border: 1px;" then
   * its computed css width will be 198px
   *
   * See https://bugzilla.mozilla.org/show_bug.cgi?id=520992
   */
  var BOX_SIZING_PROPERTIES = ["-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing"];

  var shouldIgnoreBoxSizingBorderBox = function(element) {
    if (hasBoxSizingBorderBox(element)) {
       return parseInt(dom.getStyle("width").from(element), 10) < element.offsetWidth;
    }
    return false;
  };

  var hasBoxSizingBorderBox = function(element) {
    var i       = 0,
        length  = BOX_SIZING_PROPERTIES.length;
    for (; i<length; i++) {
      if (dom.getStyle(BOX_SIZING_PROPERTIES[i]).from(element) === "border-box") {
        return BOX_SIZING_PROPERTIES[i];
      }
    }
  };

  dom.copyStyles = function(stylesToCopy) {
    return {
      from: function(element) {
        if (shouldIgnoreBoxSizingBorderBox(element)) {
          stylesToCopy = wysihtml5.lang.array(stylesToCopy).without(BOX_SIZING_PROPERTIES);
        }

        var cssText = "",
            length  = stylesToCopy.length,
            i       = 0,
            property;
        for (; i<length; i++) {
          property = stylesToCopy[i];
          cssText += property + ":" + dom.getStyle(property).from(element) + ";";
        }

        return {
          to: function(element) {
            dom.setStyles(cssText).on(element);
            return { andTo: arguments.callee };
          }
        };
      }
    };
  };
})(wysihtml5.dom);
;/**
 * Event Delegation
 *
 * @example
 *    wysihtml5.dom.delegate(document.body, "a", "click", function() {
 *      // foo
 *    });
 */
(function(wysihtml5) {

  wysihtml5.dom.delegate = function(container, selector, eventName, handler) {
    return wysihtml5.dom.observe(container, eventName, function(event) {
      var target    = event.target,
          match     = wysihtml5.lang.array(container.querySelectorAll(selector));

      while (target && target !== container) {
        if (match.contains(target)) {
          handler.call(target, event);
          break;
        }
        target = target.parentNode;
      }
    });
  };

})(wysihtml5);
;// TODO: Refactor dom tree traversing here
(function(wysihtml5) {
  wysihtml5.dom.domNode = function(node) {
    var defaultNodeTypes = [wysihtml5.ELEMENT_NODE, wysihtml5.TEXT_NODE];

    var _isBlankText = function(node) {
      return node.nodeType === wysihtml5.TEXT_NODE && (/^\s*$/g).test(node.data);
    };

    return {

      // var node = wysihtml5.dom.domNode(element).prev({nodeTypes: [1,3], ignoreBlankTexts: true});
      prev: function(options) {
        var prevNode = node.previousSibling,
            types = (options && options.nodeTypes) ? options.nodeTypes : defaultNodeTypes;
        
        if (!prevNode) {
          return null;
        }

        if (
          (!wysihtml5.lang.array(types).contains(prevNode.nodeType)) || // nodeTypes check.
          (options && options.ignoreBlankTexts && _isBlankText(prevNode)) // Blank text nodes bypassed if set
        ) {
          return wysihtml5.dom.domNode(prevNode).prev(options);
        }
        
        return prevNode;
      },

      // var node = wysihtml5.dom.domNode(element).next({nodeTypes: [1,3], ignoreBlankTexts: true});
      next: function(options) {
        var nextNode = node.nextSibling,
            types = (options && options.nodeTypes) ? options.nodeTypes : defaultNodeTypes;
        
        if (!nextNode) {
          return null;
        }

        if (
          (!wysihtml5.lang.array(types).contains(nextNode.nodeType)) || // nodeTypes check.
          (options && options.ignoreBlankTexts && _isBlankText(nextNode)) // blank text nodes bypassed if set
        ) {
          return wysihtml5.dom.domNode(nextNode).next(options);
        }
        
        return nextNode;
      }



    };
  };
})(wysihtml5);;/**
 * Returns the given html wrapped in a div element
 *
 * Fixing IE's inability to treat unknown elements (HTML5 section, article, ...) correctly
 * when inserted via innerHTML
 *
 * @param {String} html The html which should be wrapped in a dom element
 * @param {Obejct} [context] Document object of the context the html belongs to
 *
 * @example
 *    wysihtml5.dom.getAsDom("<article>foo</article>");
 */
wysihtml5.dom.getAsDom = (function() {

  var _innerHTMLShiv = function(html, context) {
    var tempElement = context.createElement("div");
    tempElement.style.display = "none";
    context.body.appendChild(tempElement);
    // IE throws an exception when trying to insert <frameset></frameset> via innerHTML
    try { tempElement.innerHTML = html; } catch(e) {}
    context.body.removeChild(tempElement);
    return tempElement;
  };

  /**
   * Make sure IE supports HTML5 tags, which is accomplished by simply creating one instance of each element
   */
  var _ensureHTML5Compatibility = function(context) {
    if (context._wysihtml5_supportsHTML5Tags) {
      return;
    }
    for (var i=0, length=HTML5_ELEMENTS.length; i<length; i++) {
      context.createElement(HTML5_ELEMENTS[i]);
    }
    context._wysihtml5_supportsHTML5Tags = true;
  };


  /**
   * List of html5 tags
   * taken from http://simon.html5.org/html5-elements
   */
  var HTML5_ELEMENTS = [
    "abbr", "article", "aside", "audio", "bdi", "canvas", "command", "datalist", "details", "figcaption",
    "figure", "footer", "header", "hgroup", "keygen", "mark", "meter", "nav", "output", "progress",
    "rp", "rt", "ruby", "svg", "section", "source", "summary", "time", "track", "video", "wbr"
  ];

  return function(html, context) {
    context = context || document;
    var tempElement;
    if (typeof(html) === "object" && html.nodeType) {
      tempElement = context.createElement("div");
      tempElement.appendChild(html);
    } else if (wysihtml5.browser.supportsHTML5Tags(context)) {
      tempElement = context.createElement("div");
      tempElement.innerHTML = html;
    } else {
      _ensureHTML5Compatibility(context);
      tempElement = _innerHTMLShiv(html, context);
    }
    return tempElement;
  };
})();
;/**
 * Walks the dom tree from the given node up until it finds a match
 * Designed for optimal performance.
 *
 * @param {Element} node The from which to check the parent nodes
 * @param {Object} matchingSet Object to match against (possible properties: nodeName, className, classRegExp)
 * @param {Number} [levels] How many parents should the function check up from the current node (defaults to 50)
 * @return {null|Element} Returns the first element that matched the desiredNodeName(s)
 * @example
 *    var listElement = wysihtml5.dom.getParentElement(document.querySelector("li"), { nodeName: ["MENU", "UL", "OL"] });
 *    // ... or ...
 *    var unorderedListElement = wysihtml5.dom.getParentElement(document.querySelector("li"), { nodeName: "UL" });
 *    // ... or ...
 *    var coloredElement = wysihtml5.dom.getParentElement(myTextNode, { nodeName: "SPAN", className: "wysiwyg-color-red", classRegExp: /wysiwyg-color-[a-z]/g });
 */
wysihtml5.dom.getParentElement = (function() {

  function _isSameNodeName(nodeName, desiredNodeNames) {
    if (!desiredNodeNames || !desiredNodeNames.length) {
      return true;
    }

    if (typeof(desiredNodeNames) === "string") {
      return nodeName === desiredNodeNames;
    } else {
      return wysihtml5.lang.array(desiredNodeNames).contains(nodeName);
    }
  }

  function _isElement(node) {
    return node.nodeType === wysihtml5.ELEMENT_NODE;
  }

  function _hasClassName(element, className, classRegExp) {
    var classNames = (element.className || "").match(classRegExp) || [];
    if (!className) {
      return !!classNames.length;
    }
    return classNames[classNames.length - 1] === className;
  }

  function _hasStyle(element, cssStyle, styleRegExp) {
    var styles = (element.getAttribute('style') || "").match(styleRegExp) || [];
    if (!cssStyle) {
      return !!styles.length;
    }
    return styles[styles.length - 1] === cssStyle;
  }

  return function(node, matchingSet, levels, container) {
    var findByStyle = (matchingSet.cssStyle || matchingSet.styleRegExp),
        findByClass = (matchingSet.className || matchingSet.classRegExp);

    levels = levels || 50; // Go max 50 nodes upwards from current node

    while (levels-- && node && node.nodeName !== "BODY" && (!container || node !== container)) {
      if (_isElement(node) && _isSameNodeName(node.nodeName, matchingSet.nodeName) &&
          (!findByStyle || _hasStyle(node, matchingSet.cssStyle, matchingSet.styleRegExp)) &&
          (!findByClass || _hasClassName(node, matchingSet.className, matchingSet.classRegExp))
      ) {
        return node;
      }
      node = node.parentNode;
    }
    return null;
  };
})();
;/**
 * Get element's style for a specific css property
 *
 * @param {Element} element The element on which to retrieve the style
 * @param {String} property The CSS property to retrieve ("float", "display", "text-align", ...)
 *
 * @example
 *    wysihtml5.dom.getStyle("display").from(document.body);
 *    // => "block"
 */
wysihtml5.dom.getStyle = (function() {
  var stylePropertyMapping = {
        "float": ("styleFloat" in document.createElement("div").style) ? "styleFloat" : "cssFloat"
      },
      REG_EXP_CAMELIZE = /\-[a-z]/g;

  function camelize(str) {
    return str.replace(REG_EXP_CAMELIZE, function(match) {
      return match.charAt(1).toUpperCase();
    });
  }

  return function(property) {
    return {
      from: function(element) {
        if (element.nodeType !== wysihtml5.ELEMENT_NODE) {
          return;
        }

        var doc               = element.ownerDocument,
            camelizedProperty = stylePropertyMapping[property] || camelize(property),
            style             = element.style,
            currentStyle      = element.currentStyle,
            styleValue        = style[camelizedProperty];
        if (styleValue) {
          return styleValue;
        }

        // currentStyle is no standard and only supported by Opera and IE but it has one important advantage over the standard-compliant
        // window.getComputedStyle, since it returns css property values in their original unit:
        // If you set an elements width to "50%", window.getComputedStyle will give you it's current width in px while currentStyle
        // gives you the original "50%".
        // Opera supports both, currentStyle and window.getComputedStyle, that's why checking for currentStyle should have higher prio
        if (currentStyle) {
          try {
            return currentStyle[camelizedProperty];
          } catch(e) {
            //ie will occasionally fail for unknown reasons. swallowing exception
          }
        }

        var win                 = doc.defaultView || doc.parentWindow,
            needsOverflowReset  = (property === "height" || property === "width") && element.nodeName === "TEXTAREA",
            originalOverflow,
            returnValue;

        if (win.getComputedStyle) {
          // Chrome and Safari both calculate a wrong width and height for textareas when they have scroll bars
          // therfore we remove and restore the scrollbar and calculate the value in between
          if (needsOverflowReset) {
            originalOverflow = style.overflow;
            style.overflow = "hidden";
          }
          returnValue = win.getComputedStyle(element, null).getPropertyValue(property);
          if (needsOverflowReset) {
            style.overflow = originalOverflow || "";
          }
          return returnValue;
        }
      }
    };
  };
})();
;wysihtml5.dom.getTextNodes = function(node, ingoreEmpty){
  var all = [];
  for (node=node.firstChild;node;node=node.nextSibling){
    if (node.nodeType == 3) {
      if (!ingoreEmpty || !(/^\s*$/).test(node.innerText || node.textContent)) {
        all.push(node);
      }
    } else {
      all = all.concat(wysihtml5.dom.getTextNodes(node, ingoreEmpty));
    }
  }
  return all;
};;/**
 * High performant way to check whether an element with a specific tag name is in the given document
 * Optimized for being heavily executed
 * Unleashes the power of live node lists
 *
 * @param {Object} doc The document object of the context where to check
 * @param {String} tagName Upper cased tag name
 * @example
 *    wysihtml5.dom.hasElementWithTagName(document, "IMG");
 */
wysihtml5.dom.hasElementWithTagName = (function() {
  var LIVE_CACHE          = {},
      DOCUMENT_IDENTIFIER = 1;

  function _getDocumentIdentifier(doc) {
    return doc._wysihtml5_identifier || (doc._wysihtml5_identifier = DOCUMENT_IDENTIFIER++);
  }

  return function(doc, tagName) {
    var key         = _getDocumentIdentifier(doc) + ":" + tagName,
        cacheEntry  = LIVE_CACHE[key];
    if (!cacheEntry) {
      cacheEntry = LIVE_CACHE[key] = doc.getElementsByTagName(tagName);
    }

    return cacheEntry.length > 0;
  };
})();
;/**
 * High performant way to check whether an element with a specific class name is in the given document
 * Optimized for being heavily executed
 * Unleashes the power of live node lists
 *
 * @param {Object} doc The document object of the context where to check
 * @param {String} tagName Upper cased tag name
 * @example
 *    wysihtml5.dom.hasElementWithClassName(document, "foobar");
 */
(function(wysihtml5) {
  var LIVE_CACHE          = {},
      DOCUMENT_IDENTIFIER = 1;

  function _getDocumentIdentifier(doc) {
    return doc._wysihtml5_identifier || (doc._wysihtml5_identifier = DOCUMENT_IDENTIFIER++);
  }

  wysihtml5.dom.hasElementWithClassName = function(doc, className) {
    // getElementsByClassName is not supported by IE<9
    // but is sometimes mocked via library code (which then doesn't return live node lists)
    if (!wysihtml5.browser.supportsNativeGetElementsByClassName()) {
      return !!doc.querySelector("." + className);
    }

    var key         = _getDocumentIdentifier(doc) + ":" + className,
        cacheEntry  = LIVE_CACHE[key];
    if (!cacheEntry) {
      cacheEntry = LIVE_CACHE[key] = doc.getElementsByClassName(className);
    }

    return cacheEntry.length > 0;
  };
})(wysihtml5);
;wysihtml5.dom.insert = function(elementToInsert) {
  return {
    after: function(element) {
      element.parentNode.insertBefore(elementToInsert, element.nextSibling);
    },

    before: function(element) {
      element.parentNode.insertBefore(elementToInsert, element);
    },

    into: function(element) {
      element.appendChild(elementToInsert);
    }
  };
};
;wysihtml5.dom.insertCSS = function(rules) {
  rules = rules.join("\n");

  return {
    into: function(doc) {
      var styleElement = doc.createElement("style");
      styleElement.type = "text/css";

      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = rules;
      } else {
        styleElement.appendChild(doc.createTextNode(rules));
      }

      var link = doc.querySelector("head link");
      if (link) {
        link.parentNode.insertBefore(styleElement, link);
        return;
      } else {
        var head = doc.querySelector("head");
        if (head) {
          head.appendChild(styleElement);
        }
      }
    }
  };
};
;// TODO: Refactor dom tree traversing here
(function(wysihtml5) {
  wysihtml5.dom.lineBreaks = function(node) {

    function _isLineBreak(n) {
      return n.nodeName === "BR";
    }

    /**
     * Checks whether the elment causes a visual line break
     * (<br> or block elements)
     */
    function _isLineBreakOrBlockElement(element) {
      if (_isLineBreak(element)) {
        return true;
      }

      if (wysihtml5.dom.getStyle("display").from(element) === "block") {
        return true;
      }

      return false;
    }

    return {

      /* wysihtml5.dom.lineBreaks(element).add();
       *
       * Adds line breaks before and after the given node if the previous and next siblings
       * aren't already causing a visual line break (block element or <br>)
       */
      add: function(options) {
        var doc             = node.ownerDocument,
          nextSibling     = wysihtml5.dom.domNode(node).next({ignoreBlankTexts: true}),
          previousSibling = wysihtml5.dom.domNode(node).prev({ignoreBlankTexts: true});

        if (nextSibling && !_isLineBreakOrBlockElement(nextSibling)) {
          wysihtml5.dom.insert(doc.createElement("br")).after(node);
        }
        if (previousSibling && !_isLineBreakOrBlockElement(previousSibling)) {
          wysihtml5.dom.insert(doc.createElement("br")).before(node);
        }
      },

      /* wysihtml5.dom.lineBreaks(element).remove();
       *
       * Removes line breaks before and after the given node
       */
      remove: function(options) {
        var nextSibling     = wysihtml5.dom.domNode(node).next({ignoreBlankTexts: true}),
            previousSibling = wysihtml5.dom.domNode(node).prev({ignoreBlankTexts: true});

        if (nextSibling && _isLineBreak(nextSibling)) {
          nextSibling.parentNode.removeChild(nextSibling);
        }
        if (previousSibling && _isLineBreak(previousSibling)) {
          previousSibling.parentNode.removeChild(previousSibling);
        }
      }
    };
  };
})(wysihtml5);;/**
 * Method to set dom events
 *
 * @example
 *    wysihtml5.dom.observe(iframe.contentWindow.document.body, ["focus", "blur"], function() { ... });
 */
wysihtml5.dom.observe = function(element, eventNames, handler) {
  eventNames = typeof(eventNames) === "string" ? [eventNames] : eventNames;

  var handlerWrapper,
      eventName,
      i       = 0,
      length  = eventNames.length;

  for (; i<length; i++) {
    eventName = eventNames[i];
    if (element.addEventListener) {
      element.addEventListener(eventName, handler, false);
    } else {
      handlerWrapper = function(event) {
        if (!("target" in event)) {
          event.target = event.srcElement;
        }
        event.preventDefault = event.preventDefault || function() {
          this.returnValue = false;
        };
        event.stopPropagation = event.stopPropagation || function() {
          this.cancelBubble = true;
        };
        handler.call(element, event);
      };
      element.attachEvent("on" + eventName, handlerWrapper);
    }
  }

  return {
    stop: function() {
      var eventName,
          i       = 0,
          length  = eventNames.length;
      for (; i<length; i++) {
        eventName = eventNames[i];
        if (element.removeEventListener) {
          element.removeEventListener(eventName, handler, false);
        } else {
          element.detachEvent("on" + eventName, handlerWrapper);
        }
      }
    }
  };
};
;/**
 * HTML Sanitizer
 * Rewrites the HTML based on given rules
 *
 * @param {Element|String} elementOrHtml HTML String to be sanitized OR element whose content should be sanitized
 * @param {Object} [rules] List of rules for rewriting the HTML, if there's no rule for an element it will
 *    be converted to a "span". Each rule is a key/value pair where key is the tag to convert, and value the
 *    desired substitution.
 * @param {Object} context Document object in which to parse the html, needed to sandbox the parsing
 *
 * @return {Element|String} Depends on the elementOrHtml parameter. When html then the sanitized html as string elsewise the element.
 *
 * @example
 *    var userHTML = '<div id="foo" onclick="alert(1);"><p><font color="red">foo</font><script>alert(1);</script></p></div>';
 *    wysihtml5.dom.parse(userHTML, {
 *      tags {
 *        p:      "div",      // Rename p tags to div tags
 *        font:   "span"      // Rename font tags to span tags
 *        div:    true,       // Keep them, also possible (same result when passing: "div" or true)
 *        script: undefined   // Remove script elements
 *      }
 *    });
 *    // => <div><div><span>foo bar</span></div></div>
 *
 *    var userHTML = '<table><tbody><tr><td>I'm a table!</td></tr></tbody></table>';
 *    wysihtml5.dom.parse(userHTML);
 *    // => '<span><span><span><span>I'm a table!</span></span></span></span>'
 *
 *    var userHTML = '<div>foobar<br>foobar</div>';
 *    wysihtml5.dom.parse(userHTML, {
 *      tags: {
 *        div: undefined,
 *        br:  true
 *      }
 *    });
 *    // => ''
 *
 *    var userHTML = '<div class="red">foo</div><div class="pink">bar</div>';
 *    wysihtml5.dom.parse(userHTML, {
 *      classes: {
 *        red:    1,
 *        green:  1
 *      },
 *      tags: {
 *        div: {
 *          rename_tag:     "p"
 *        }
 *      }
 *    });
 *    // => '<p class="red">foo</p><p>bar</p>'
 */

wysihtml5.dom.parse = function(elementOrHtml_current, config_current) {
  /* TODO: Currently escaped module pattern as otherwise folloowing default swill be shared among multiple editors.
   * Refactor whole code as this method while workind is kind of awkward too */

  /**
   * It's not possible to use a XMLParser/DOMParser as HTML5 is not always well-formed XML
   * new DOMParser().parseFromString('<img src="foo.gif">') will cause a parseError since the
   * node isn't closed
   *
   * Therefore we've to use the browser's ordinary HTML parser invoked by setting innerHTML.
   */
  var NODE_TYPE_MAPPING = {
        "1": _handleElement,
        "3": _handleText,
        "8": _handleComment
      },
      // Rename unknown tags to this
      DEFAULT_NODE_NAME   = "span",
      WHITE_SPACE_REG_EXP = /\s+/,
      defaultRules        = { tags: {}, classes: {} },
      currentRules        = {};

  /**
   * Iterates over all childs of the element, recreates them, appends them into a document fragment
   * which later replaces the entire body content
   */
   function parse(elementOrHtml, config) {
    wysihtml5.lang.object(currentRules).merge(defaultRules).merge(config.rules).get();

    var context       = config.context || elementOrHtml.ownerDocument || document,
        fragment      = context.createDocumentFragment(),
        isString      = typeof(elementOrHtml) === "string",
        clearInternals = false,
        element,
        newNode,
        firstChild;

    if (config.clearInternals === true) {
      clearInternals = true;
    }

    if (isString) {
      element = wysihtml5.dom.getAsDom(elementOrHtml, context);
    } else {
      element = elementOrHtml;
    }

    if (currentRules.selectors) {
      _applySelectorRules(element, currentRules.selectors);
    }

    while (element.firstChild) {
      firstChild = element.firstChild;
      newNode = _convert(firstChild, config.cleanUp, clearInternals, config.uneditableClass);
      if (newNode) {
        fragment.appendChild(newNode);
      }
      if (firstChild !== newNode) {
        element.removeChild(firstChild);
      }
    }

    if (config.unjoinNbsps) {
      // replace joined non-breakable spaces with unjoined
      var txtnodes = wysihtml5.dom.getTextNodes(fragment);
      for (var n = txtnodes.length; n--;) {
        txtnodes[n].nodeValue = txtnodes[n].nodeValue.replace(/([\S\u00A0])\u00A0/gi, "$1 ");
      }
    }

    // Clear element contents
    element.innerHTML = "";

    // Insert new DOM tree
    element.appendChild(fragment);

    return isString ? wysihtml5.quirks.getCorrectInnerHTML(element) : element;
  }

  function _convert(oldNode, cleanUp, clearInternals, uneditableClass) {
    var oldNodeType     = oldNode.nodeType,
        oldChilds       = oldNode.childNodes,
        oldChildsLength = oldChilds.length,
        method          = NODE_TYPE_MAPPING[oldNodeType],
        i               = 0,
        fragment,
        newNode,
        newChild;

    // Passes directly elemets with uneditable class
    if (uneditableClass && oldNodeType === 1 && wysihtml5.dom.hasClass(oldNode, uneditableClass)) {
        return oldNode;
    }

    newNode = method && method(oldNode, clearInternals);

    // Remove or unwrap node in case of return value null or false
    if (!newNode) {
        if (newNode === false) {
            // false defines that tag should be removed but contents should remain (unwrap)
            fragment = oldNode.ownerDocument.createDocumentFragment();

            for (i = oldChildsLength; i--;) {
              if (oldChilds[i]) {
                newChild = _convert(oldChilds[i], cleanUp, clearInternals, uneditableClass);
                if (newChild) {
                  if (oldChilds[i] === newChild) {
                    i--;
                  }
                  fragment.insertBefore(newChild, fragment.firstChild);
                }
              }
            }

            if (wysihtml5.dom.getStyle("display").from(oldNode) === "block") {
              fragment.appendChild(oldNode.ownerDocument.createElement("br"));
            }

            // TODO: try to minimize surplus spaces
            if (wysihtml5.lang.array([
                "div", "pre", "p",
                "table", "td", "th",
                "ul", "ol", "li",
                "dd", "dl",
                "footer", "header", "section",
                "h1", "h2", "h3", "h4", "h5", "h6"
            ]).contains(oldNode.nodeName.toLowerCase()) && oldNode.parentNode.lastChild !== oldNode) {
                // add space at first when unwraping non-textflow elements
                if (!oldNode.nextSibling || oldNode.nextSibling.nodeType !== 3 || !(/^\s/).test(oldNode.nextSibling.nodeValue)) {
                  fragment.appendChild(oldNode.ownerDocument.createTextNode(" "));
                }
            }

            if (fragment.normalize) {
              fragment.normalize();
            }
            return fragment;
        } else {
          // Remove
          return null;
        }
    }

    // Converts all childnodes
    for (i=0; i<oldChildsLength; i++) {
      if (oldChilds[i]) {
        newChild = _convert(oldChilds[i], cleanUp, clearInternals, uneditableClass);
        if (newChild) {
          if (oldChilds[i] === newChild) {
            i--;
          }
          newNode.appendChild(newChild);
        }
      }
    }

    // Cleanup senseless <span> elements
    if (cleanUp &&
        newNode.nodeName.toLowerCase() === DEFAULT_NODE_NAME &&
        (!newNode.childNodes.length ||
         ((/^\s*$/gi).test(newNode.innerHTML) && (clearInternals || (oldNode.className !== "_wysihtml5-temp-placeholder" && oldNode.className !== "rangySelectionBoundary"))) ||
         !newNode.attributes.length)
        ) {
      fragment = newNode.ownerDocument.createDocumentFragment();
      while (newNode.firstChild) {
        fragment.appendChild(newNode.firstChild);
      }
      if (fragment.normalize) {
        fragment.normalize();
      }
      return fragment;
    }

    if (newNode.normalize) {
      newNode.normalize();
    }
    return newNode;
  }

  function _applySelectorRules (element, selectorRules) {
    var sel, method, els;

    for (sel in selectorRules) {
      if (selectorRules.hasOwnProperty(sel)) {
        if (wysihtml5.lang.object(selectorRules[sel]).isFunction()) {
          method = selectorRules[sel];
        } else if (typeof(selectorRules[sel]) === "string" && elementHandlingMethods[selectorRules[sel]]) {
          method = elementHandlingMethods[selectorRules[sel]];
        }
        els = element.querySelectorAll(sel);
        for (var i = els.length; i--;) {
          method(els[i]);
        }
      }
    }
  }

  function _handleElement(oldNode, clearInternals) {
    var rule,
        newNode,
        tagRules    = currentRules.tags,
        nodeName    = oldNode.nodeName.toLowerCase(),
        scopeName   = oldNode.scopeName,
        renameTag;

    /**
     * We already parsed that element
     * ignore it! (yes, this sometimes happens in IE8 when the html is invalid)
     */
    if (oldNode._wysihtml5) {
      return null;
    }
    oldNode._wysihtml5 = 1;

    if (oldNode.className === "wysihtml5-temp") {
      return null;
    }

    /**
     * IE is the only browser who doesn't include the namespace in the
     * nodeName, that's why we have to prepend it by ourselves
     * scopeName is a proprietary IE feature
     * read more here http://msdn.microsoft.com/en-us/library/ms534388(v=vs.85).aspx
     */
    if (scopeName && scopeName != "HTML") {
      nodeName = scopeName + ":" + nodeName;
    }
    /**
     * Repair node
     * IE is a bit bitchy when it comes to invalid nested markup which includes unclosed tags
     * A <p> doesn't need to be closed according HTML4-5 spec, we simply replace it with a <div> to preserve its content and layout
     */
    if ("outerHTML" in oldNode) {
      if (!wysihtml5.browser.autoClosesUnclosedTags() &&
          oldNode.nodeName === "P" &&
          oldNode.outerHTML.slice(-4).toLowerCase() !== "</p>") {
        nodeName = "div";
      }
    }

    if (nodeName in tagRules) {
      rule = tagRules[nodeName];
      if (!rule || rule.remove) {
        return null;
      } else if (rule.unwrap) {
        return false;
      }
      rule = typeof(rule) === "string" ? { rename_tag: rule } : rule;
    } else if (oldNode.firstChild) {
      rule = { rename_tag: DEFAULT_NODE_NAME };
    } else {
      // Remove empty unknown elements
      return null;
    }

    // tests if type condition is met or node should be removed/unwrapped/renamed
    if (rule.one_of_type && !_testTypes(oldNode, currentRules, rule.one_of_type, clearInternals)) {
      if (rule.remove_action) {
        if (rule.remove_action === "unwrap") {
          return false;
        } else if (rule.remove_action === "rename") {
          renameTag = rule.remove_action_rename_to || DEFAULT_NODE_NAME;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }

    newNode = oldNode.ownerDocument.createElement(renameTag || rule.rename_tag || nodeName);
    _handleAttributes(oldNode, newNode, rule, clearInternals);
    _handleStyles(oldNode, newNode, rule);

    oldNode = null;

    if (newNode.normalize) { newNode.normalize(); }
    return newNode;
  }

  function _testTypes(oldNode, rules, types, clearInternals) {
    var definition, type;

    // do not interfere with placeholder span or pasting caret position is not maintained
    if (oldNode.nodeName === "SPAN" && !clearInternals && (oldNode.className === "_wysihtml5-temp-placeholder" || oldNode.className === "rangySelectionBoundary")) {
      return true;
    }

    for (type in types) {
      if (types.hasOwnProperty(type) && rules.type_definitions && rules.type_definitions[type]) {
        definition = rules.type_definitions[type];
        if (_testType(oldNode, definition)) {
          return true;
        }
      }
    }
    return false;
  }

  function array_contains(a, obj) {
      var i = a.length;
      while (i--) {
         if (a[i] === obj) {
             return true;
         }
      }
      return false;
  }

  function _testType(oldNode, definition) {

    var nodeClasses = oldNode.getAttribute("class"),
        nodeStyles =  oldNode.getAttribute("style"),
        classesLength, s, s_corrected, a, attr, currentClass, styleProp;

    // test for methods
    if (definition.methods) {
      for (var m in definition.methods) {
        if (definition.methods.hasOwnProperty(m) && typeCeckMethods[m]) {

          if (typeCeckMethods[m](oldNode)) {
            return true;
          }
        }
      }
    }

    // test for classes, if one found return true
    if (nodeClasses && definition.classes) {
      nodeClasses = nodeClasses.replace(/^\s+/g, '').replace(/\s+$/g, '').split(WHITE_SPACE_REG_EXP);
      classesLength = nodeClasses.length;
      for (var i = 0; i < classesLength; i++) {
        if (definition.classes[nodeClasses[i]]) {
          return true;
        }
      }
    }

    // test for styles, if one found return true
    if (nodeStyles && definition.styles) {

      nodeStyles = nodeStyles.split(';');
      for (s in definition.styles) {
        if (definition.styles.hasOwnProperty(s)) {
          for (var sp = nodeStyles.length; sp--;) {
            styleProp = nodeStyles[sp].split(':');

            if (styleProp[0].replace(/\s/g, '').toLowerCase() === s) {
              if (definition.styles[s] === true || definition.styles[s] === 1 || wysihtml5.lang.array(definition.styles[s]).contains(styleProp[1].replace(/\s/g, '').toLowerCase()) ) {
                return true;
              }
            }
          }
        }
      }
    }

    // test for attributes in general against regex match
    if (definition.attrs) {
        for (a in definition.attrs) {
            if (definition.attrs.hasOwnProperty(a)) {
                attr = wysihtml5.dom.getAttribute(oldNode, a);
                if (typeof(attr) === "string") {
                    if (attr.search(definition.attrs[a]) > -1) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
  }

  function _handleStyles(oldNode, newNode, rule) {
    var s, v;
    if(rule && rule.keep_styles) {
      for (s in rule.keep_styles) {
        if (rule.keep_styles.hasOwnProperty(s)) {
          v = (s === "float") ? oldNode.style.styleFloat || oldNode.style.cssFloat : oldNode.style[s];
          // value can be regex and if so should match or style skipped
          if (rule.keep_styles[s] instanceof RegExp && !(rule.keep_styles[s].test(v))) {
            continue;
          }
          if (s === "float") {
            // IE compability
            newNode.style[(oldNode.style.styleFloat) ? 'styleFloat': 'cssFloat'] = v;
           } else if (oldNode.style[s]) {
             newNode.style[s] = v;
           }
        }
      }
    }
  };

  function _getAttributesBeginningWith(beginning, attributes) {
    var returnAttributes = [];
    for (var attr in attributes) {
      if (attributes.hasOwnProperty(attr) && attr.indexOf(beginning) === 0) {
        returnAttributes.push(attr);
      }
    }
    return returnAttributes;
  }

  function _checkAttribute(attributeName, attributeValue, methodName, nodeName) {
    var method = attributeCheckMethods[methodName],
        newAttributeValue;

    if (method) {
      if (attributeValue || (attributeName === "alt" && nodeName == "IMG")) {
        newAttributeValue = method(attributeValue);
        if (typeof(newAttributeValue) === "string") {
          return newAttributeValue;
        }
      }
    }

    return false;
  }

  function _checkAttributes(oldNode, local_attributes) {
    var globalAttributes  = wysihtml5.lang.object(currentRules.attributes || {}).clone(), // global values for check/convert values of attributes
        checkAttributes   = wysihtml5.lang.object(globalAttributes).merge( wysihtml5.lang.object(local_attributes || {}).clone()).get(),
        attributes        = {},
        oldAttributes     = wysihtml5.dom.getAttributes(oldNode),
        attributeName, newValue, matchingAttributes;

    for (attributeName in checkAttributes) {
      if ((/\*$/).test(attributeName)) {

        matchingAttributes = _getAttributesBeginningWith(attributeName.slice(0,-1), oldAttributes);
        for (var i = 0, imax = matchingAttributes.length; i < imax; i++) {

          newValue = _checkAttribute(matchingAttributes[i], oldAttributes[matchingAttributes[i]], checkAttributes[attributeName], oldNode.nodeName);
          if (newValue !== false) {
            attributes[matchingAttributes[i]] = newValue;
          }
        }
      } else {
        newValue = _checkAttribute(attributeName, oldAttributes[attributeName], checkAttributes[attributeName], oldNode.nodeName);
        if (newValue !== false) {
          attributes[attributeName] = newValue;
        }
      }
    }

    return attributes;
  }

  // TODO: refactor. Too long to read
  function _handleAttributes(oldNode, newNode, rule, clearInternals) {
    var attributes          = {},                         // fresh new set of attributes to set on newNode
        setClass            = rule.set_class,             // classes to set
        addClass            = rule.add_class,             // add classes based on existing attributes
        addStyle            = rule.add_style,             // add styles based on existing attributes
        setAttributes       = rule.set_attributes,        // attributes to set on the current node
        allowedClasses      = currentRules.classes,
        i                   = 0,
        classes             = [],
        styles              = [],
        newClasses          = [],
        oldClasses          = [],
        classesLength,
        newClassesLength,
        currentClass,
        newClass,
        attributeName,
        method;

    if (setAttributes) {
      attributes = wysihtml5.lang.object(setAttributes).clone();
    }

    // check/convert values of attributes
    attributes = wysihtml5.lang.object(attributes).merge(_checkAttributes(oldNode,  rule.check_attributes)).get();

    if (setClass) {
      classes.push(setClass);
    }

    if (addClass) {
      for (attributeName in addClass) {
        method = addClassMethods[addClass[attributeName]];
        if (!method) {
          continue;
        }
        newClass = method(wysihtml5.dom.getAttribute(oldNode, attributeName));
        if (typeof(newClass) === "string") {
          classes.push(newClass);
        }
      }
    }

    if (addStyle) {
      for (attributeName in addStyle) {
        method = addStyleMethods[addStyle[attributeName]];
        if (!method) {
          continue;
        }

        newStyle = method(wysihtml5.dom.getAttribute(oldNode, attributeName));
        if (typeof(newStyle) === "string") {
          styles.push(newStyle);
        }
      }
    }


    if (typeof(allowedClasses) === "string" && allowedClasses === "any" && oldNode.getAttribute("class")) {
      if (currentRules.classes_blacklist) {
        oldClasses = oldNode.getAttribute("class");
        if (oldClasses) {
          classes = classes.concat(oldClasses.split(WHITE_SPACE_REG_EXP));
        }

        classesLength = classes.length;
        for (; i<classesLength; i++) {
          currentClass = classes[i];
          if (!currentRules.classes_blacklist[currentClass]) {
            newClasses.push(currentClass);
          }
        }

        if (newClasses.length) {
          attributes["class"] = wysihtml5.lang.array(newClasses).unique().join(" ");
        }

      } else {
        attributes["class"] = oldNode.getAttribute("class");
      }
    } else {
      // make sure that wysihtml5 temp class doesn't get stripped out
      if (!clearInternals) {
        allowedClasses["_wysihtml5-temp-placeholder"] = 1;
        allowedClasses["_rangySelectionBoundary"] = 1;
        allowedClasses["wysiwyg-tmp-selected-cell"] = 1;
      }

      // add old classes last
      oldClasses = oldNode.getAttribute("class");
      if (oldClasses) {
        classes = classes.concat(oldClasses.split(WHITE_SPACE_REG_EXP));
      }
      classesLength = classes.length;
      for (; i<classesLength; i++) {
        currentClass = classes[i];
        if (allowedClasses[currentClass]) {
          newClasses.push(currentClass);
        }
      }

      if (newClasses.length) {
        attributes["class"] = wysihtml5.lang.array(newClasses).unique().join(" ");
      }
    }

    // remove table selection class if present
    if (attributes["class"] && clearInternals) {
      attributes["class"] = attributes["class"].replace("wysiwyg-tmp-selected-cell", "");
      if ((/^\s*$/g).test(attributes["class"])) {
        delete attributes["class"];
      }
    }

    if (styles.length) {
      attributes["style"] = wysihtml5.lang.array(styles).unique().join(" ");
    }

    // set attributes on newNode
    for (attributeName in attributes) {
      // Setting attributes can cause a js error in IE under certain circumstances
      // eg. on a <img> under https when it's new attribute value is non-https
      // TODO: Investigate this further and check for smarter handling
      try {
        newNode.setAttribute(attributeName, attributes[attributeName]);
      } catch(e) {}
    }

    // IE8 sometimes loses the width/height attributes when those are set before the "src"
    // so we make sure to set them again
    if (attributes.src) {
      if (typeof(attributes.width) !== "undefined") {
        newNode.setAttribute("width", attributes.width);
      }
      if (typeof(attributes.height) !== "undefined") {
        newNode.setAttribute("height", attributes.height);
      }
    }
  }

  var INVISIBLE_SPACE_REG_EXP = /\uFEFF/g;
  function _handleText(oldNode) {
    var nextSibling = oldNode.nextSibling;
    if (nextSibling && nextSibling.nodeType === wysihtml5.TEXT_NODE) {
      // Concatenate text nodes
      nextSibling.data = oldNode.data.replace(INVISIBLE_SPACE_REG_EXP, "") + nextSibling.data.replace(INVISIBLE_SPACE_REG_EXP, "");
    } else {
      // \uFEFF = wysihtml5.INVISIBLE_SPACE (used as a hack in certain rich text editing situations)
      var data = oldNode.data.replace(INVISIBLE_SPACE_REG_EXP, "");
      return oldNode.ownerDocument.createTextNode(data);
    }
  }

  function _handleComment(oldNode) {
    if (currentRules.comments) {
      return oldNode.ownerDocument.createComment(oldNode.nodeValue);
    }
  }

  // ------------ attribute checks ------------ \\
  var attributeCheckMethods = {
    url: (function() {
      var REG_EXP = /^https?:\/\//i;
      return function(attributeValue) {
        if (!attributeValue || !attributeValue.match(REG_EXP)) {
          return null;
        }
        return attributeValue.replace(REG_EXP, function(match) {
          return match.toLowerCase();
        });
      };
    })(),

    src: (function() {
      var REG_EXP = /^(\/|https?:\/\/)/i;
      return function(attributeValue) {
        if (!attributeValue || !attributeValue.match(REG_EXP)) {
          return null;
        }
        return attributeValue.replace(REG_EXP, function(match) {
          return match.toLowerCase();
        });
      };
    })(),

    href: (function() {
      var REG_EXP = /^(#|\/|https?:\/\/|mailto:)/i;
      return function(attributeValue) {
        if (!attributeValue || !attributeValue.match(REG_EXP)) {
          return null;
        }
        return attributeValue.replace(REG_EXP, function(match) {
          return match.toLowerCase();
        });
      };
    })(),

    alt: (function() {
      var REG_EXP = /[^ a-z0-9_\-]/gi;
      return function(attributeValue) {
        if (!attributeValue) {
          return "";
        }
        return attributeValue.replace(REG_EXP, "");
      };
    })(),

    numbers: (function() {
      var REG_EXP = /\D/g;
      return function(attributeValue) {
        attributeValue = (attributeValue || "").replace(REG_EXP, "");
        return attributeValue || null;
      };
    })(),

    any: (function() {
      return function(attributeValue) {
        return attributeValue;
      };
    })()
  };

  // ------------ style converter (converts an html attribute to a style) ------------ \\
  var addStyleMethods = {
    align_text: (function() {
      var mapping = {
        left:     "text-align: left;",
        right:    "text-align: right;",
        center:   "text-align: center;"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),
  };

  // ------------ class converter (converts an html attribute to a class name) ------------ \\
  var addClassMethods = {
    align_img: (function() {
      var mapping = {
        left:   "wysiwyg-float-left",
        right:  "wysiwyg-float-right"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),

    align_text: (function() {
      var mapping = {
        left:     "wysiwyg-text-align-left",
        right:    "wysiwyg-text-align-right",
        center:   "wysiwyg-text-align-center",
        justify:  "wysiwyg-text-align-justify"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),

    clear_br: (function() {
      var mapping = {
        left:   "wysiwyg-clear-left",
        right:  "wysiwyg-clear-right",
        both:   "wysiwyg-clear-both",
        all:    "wysiwyg-clear-both"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),

    size_font: (function() {
      var mapping = {
        "1": "wysiwyg-font-size-xx-small",
        "2": "wysiwyg-font-size-small",
        "3": "wysiwyg-font-size-medium",
        "4": "wysiwyg-font-size-large",
        "5": "wysiwyg-font-size-x-large",
        "6": "wysiwyg-font-size-xx-large",
        "7": "wysiwyg-font-size-xx-large",
        "-": "wysiwyg-font-size-smaller",
        "+": "wysiwyg-font-size-larger"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).charAt(0)];
      };
    })()
  };

  // checks if element is possibly visible
  var typeCeckMethods = {
    has_visible_contet: (function() {
      var txt,
          isVisible = false,
          visibleElements = ['img', 'video', 'picture', 'br', 'script', 'noscript',
                             'style', 'table', 'iframe', 'object', 'embed', 'audio',
                             'svg', 'input', 'button', 'select','textarea', 'canvas'];

      return function(el) {

        // has visible innertext. so is visible
        txt = (el.innerText || el.textContent).replace(/\s/g, '');
        if (txt && txt.length > 0) {
          return true;
        }

        // matches list of visible dimensioned elements
        for (var i = visibleElements.length; i--;) {
          if (el.querySelector(visibleElements[i])) {
            return true;
          }
        }

        // try to measure dimesions in last resort. (can find only of elements in dom)
        if (el.offsetWidth && el.offsetWidth > 0 && el.offsetHeight && el.offsetHeight > 0) {
          return true;
        }

        return false;
      };
    })()
  };

  var elementHandlingMethods = {
    unwrap: function (element) {
      wysihtml5.dom.unwrap(element);
    },

    remove: function (element) {
      element.parentNode.removeChild(element);
    }
  };

  return parse(elementOrHtml_current, config_current);
};
;/**
 * Checks for empty text node childs and removes them
 *
 * @param {Element} node The element in which to cleanup
 * @example
 *    wysihtml5.dom.removeEmptyTextNodes(element);
 */
wysihtml5.dom.removeEmptyTextNodes = function(node) {
  var childNode,
      childNodes        = wysihtml5.lang.array(node.childNodes).get(),
      childNodesLength  = childNodes.length,
      i                 = 0;
  for (; i<childNodesLength; i++) {
    childNode = childNodes[i];
    if (childNode.nodeType === wysihtml5.TEXT_NODE && childNode.data === "") {
      childNode.parentNode.removeChild(childNode);
    }
  }
};
;/**
 * Renames an element (eg. a <div> to a <p>) and keeps its childs
 *
 * @param {Element} element The list element which should be renamed
 * @param {Element} newNodeName The desired tag name
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <ul id="list">
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 *
 *    <script>
 *      wysihtml5.dom.renameElement(document.getElementById("list"), "ol");
 *    </script>
 *
 *    <!-- Will result in: -->
 *    <ol>
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ol>
 */
wysihtml5.dom.renameElement = function(element, newNodeName) {
  var newElement = element.ownerDocument.createElement(newNodeName),
      firstChild;
  while (firstChild = element.firstChild) {
    newElement.appendChild(firstChild);
  }
  wysihtml5.dom.copyAttributes(["align", "className"]).from(element).to(newElement);
  element.parentNode.replaceChild(newElement, element);
  return newElement;
};
;/**
 * Takes an element, removes it and replaces it with it's childs
 *
 * @param {Object} node The node which to replace with it's child nodes
 * @example
 *    <div id="foo">
 *      <span>hello</span>
 *    </div>
 *    <script>
 *      // Remove #foo and replace with it's children
 *      wysihtml5.dom.replaceWithChildNodes(document.getElementById("foo"));
 *    </script>
 */
wysihtml5.dom.replaceWithChildNodes = function(node) {
  if (!node.parentNode) {
    return;
  }

  if (!node.firstChild) {
    node.parentNode.removeChild(node);
    return;
  }

  var fragment = node.ownerDocument.createDocumentFragment();
  while (node.firstChild) {
    fragment.appendChild(node.firstChild);
  }
  node.parentNode.replaceChild(fragment, node);
  node = fragment = null;
};
;/**
 * Unwraps an unordered/ordered list
 *
 * @param {Element} element The list element which should be unwrapped
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <ul id="list">
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 *
 *    <script>
 *      wysihtml5.dom.resolveList(document.getElementById("list"));
 *    </script>
 *
 *    <!-- Will result in: -->
 *    eminem<br>
 *    dr. dre<br>
 *    50 Cent<br>
 */
(function(dom) {
  function _isBlockElement(node) {
    return dom.getStyle("display").from(node) === "block";
  }

  function _isLineBreak(node) {
    return node.nodeName === "BR";
  }

  function _appendLineBreak(element) {
    var lineBreak = element.ownerDocument.createElement("br");
    element.appendChild(lineBreak);
  }

  function resolveList(list, useLineBreaks) {
    if (!list.nodeName.match(/^(MENU|UL|OL)$/)) {
      return;
    }

    var doc             = list.ownerDocument,
        fragment        = doc.createDocumentFragment(),
        previousSibling = wysihtml5.dom.domNode(list).prev({ignoreBlankTexts: true}),
        firstChild,
        lastChild,
        isLastChild,
        shouldAppendLineBreak,
        paragraph,
        listItem;

    if (useLineBreaks) {
      // Insert line break if list is after a non-block element
      if (previousSibling && !_isBlockElement(previousSibling) && !_isLineBreak(previousSibling)) {
        _appendLineBreak(fragment);
      }

      while (listItem = (list.firstElementChild || list.firstChild)) {
        lastChild = listItem.lastChild;
        while (firstChild = listItem.firstChild) {
          isLastChild           = firstChild === lastChild;
          // This needs to be done before appending it to the fragment, as it otherwise will lose style information
          shouldAppendLineBreak = isLastChild && !_isBlockElement(firstChild) && !_isLineBreak(firstChild);
          fragment.appendChild(firstChild);
          if (shouldAppendLineBreak) {
            _appendLineBreak(fragment);
          }
        }

        listItem.parentNode.removeChild(listItem);
      }
    } else {
      while (listItem = (list.firstElementChild || list.firstChild)) {
        if (listItem.querySelector && listItem.querySelector("div, p, ul, ol, menu, blockquote, h1, h2, h3, h4, h5, h6")) {
          while (firstChild = listItem.firstChild) {
            fragment.appendChild(firstChild);
          }
        } else {
          paragraph = doc.createElement("p");
          while (firstChild = listItem.firstChild) {
            paragraph.appendChild(firstChild);
          }
          fragment.appendChild(paragraph);
        }
        listItem.parentNode.removeChild(listItem);
      }
    }

    list.parentNode.replaceChild(fragment, list);
  }

  dom.resolveList = resolveList;
})(wysihtml5.dom);
;/**
 * Sandbox for executing javascript, parsing css styles and doing dom operations in a secure way
 *
 * Browser Compatibility:
 *  - Secure in MSIE 6+, but only when the user hasn't made changes to his security level "restricted"
 *  - Partially secure in other browsers (Firefox, Opera, Safari, Chrome, ...)
 *
 * Please note that this class can't benefit from the HTML5 sandbox attribute for the following reasons:
 *    - sandboxing doesn't work correctly with inlined content (src="javascript:'<html>...</html>'")
 *    - sandboxing of physical documents causes that the dom isn't accessible anymore from the outside (iframe.contentWindow, ...)
 *    - setting the "allow-same-origin" flag would fix that, but then still javascript and dom events refuse to fire
 *    - therefore the "allow-scripts" flag is needed, which then would deactivate any security, as the js executed inside the iframe
 *      can do anything as if the sandbox attribute wasn't set
 *
 * @param {Function} [readyCallback] Method that gets invoked when the sandbox is ready
 * @param {Object} [config] Optional parameters
 *
 * @example
 *    new wysihtml5.dom.Sandbox(function(sandbox) {
 *      sandbox.getWindow().document.body.innerHTML = '<img src=foo.gif onerror="alert(document.cookie)">';
 *    });
 */
(function(wysihtml5) {
  var /**
       * Default configuration
       */
      doc                 = document,
      /**
       * Properties to unset/protect on the window object
       */
      windowProperties    = [
        "parent", "top", "opener", "frameElement", "frames",
        "localStorage", "globalStorage", "sessionStorage", "indexedDB"
      ],
      /**
       * Properties on the window object which are set to an empty function
       */
      windowProperties2   = [
        "open", "close", "openDialog", "showModalDialog",
        "alert", "confirm", "prompt",
        "openDatabase", "postMessage",
        "XMLHttpRequest", "XDomainRequest"
      ],
      /**
       * Properties to unset/protect on the document object
       */
      documentProperties  = [
        "referrer",
        "write", "open", "close"
      ];

  wysihtml5.dom.Sandbox = Base.extend(
    /** @scope wysihtml5.dom.Sandbox.prototype */ {

    constructor: function(readyCallback, config) {
      this.callback = readyCallback || wysihtml5.EMPTY_FUNCTION;
      this.config   = wysihtml5.lang.object({}).merge(config).get();
      this.editableArea   = this._createIframe();
    },

    insertInto: function(element) {
      if (typeof(element) === "string") {
        element = doc.getElementById(element);
      }

      element.appendChild(this.editableArea);
    },

    getIframe: function() {
      return this.editableArea;
    },

    getWindow: function() {
      this._readyError();
    },

    getDocument: function() {
      this._readyError();
    },

    destroy: function() {
      var iframe = this.getIframe();
      iframe.parentNode.removeChild(iframe);
    },

    _readyError: function() {
      throw new Error("wysihtml5.Sandbox: Sandbox iframe isn't loaded yet");
    },

    /**
     * Creates the sandbox iframe
     *
     * Some important notes:
     *  - We can't use HTML5 sandbox for now:
     *    setting it causes that the iframe's dom can't be accessed from the outside
     *    Therefore we need to set the "allow-same-origin" flag which enables accessing the iframe's dom
     *    But then there's another problem, DOM events (focus, blur, change, keypress, ...) aren't fired.
     *    In order to make this happen we need to set the "allow-scripts" flag.
     *    A combination of allow-scripts and allow-same-origin is almost the same as setting no sandbox attribute at all.
     *  - Chrome & Safari, doesn't seem to support sandboxing correctly when the iframe's html is inlined (no physical document)
     *  - IE needs to have the security="restricted" attribute set before the iframe is
     *    inserted into the dom tree
     *  - Believe it or not but in IE "security" in document.createElement("iframe") is false, even
     *    though it supports it
     *  - When an iframe has security="restricted", in IE eval() & execScript() don't work anymore
     *  - IE doesn't fire the onload event when the content is inlined in the src attribute, therefore we rely
     *    on the onreadystatechange event
     */
    _createIframe: function() {
      var that   = this,
          iframe = doc.createElement("iframe");
      iframe.className = "wysihtml5-sandbox";
      wysihtml5.dom.setAttributes({
        "security":           "restricted",
        "allowtransparency":  "true",
        "frameborder":        0,
        "width":              0,
        "height":             0,
        "marginwidth":        0,
        "marginheight":       0
      }).on(iframe);

      // Setting the src like this prevents ssl warnings in IE6
      if (wysihtml5.browser.throwsMixedContentWarningWhenIframeSrcIsEmpty()) {
        iframe.src = "javascript:'<html></html>'";
      }

      iframe.onload = function() {
        iframe.onreadystatechange = iframe.onload = null;
        that._onLoadIframe(iframe);
      };

      iframe.onreadystatechange = function() {
        if (/loaded|complete/.test(iframe.readyState)) {
          iframe.onreadystatechange = iframe.onload = null;
          that._onLoadIframe(iframe);
        }
      };

      return iframe;
    },

    /**
     * Callback for when the iframe has finished loading
     */
    _onLoadIframe: function(iframe) {
      // don't resume when the iframe got unloaded (eg. by removing it from the dom)
      if (!wysihtml5.dom.contains(doc.documentElement, iframe)) {
        return;
      }

      var that           = this,
          iframeWindow   = iframe.contentWindow,
          iframeDocument = iframe.contentWindow.document,
          charset        = doc.characterSet || doc.charset || "utf-8",
          sandboxHtml    = this._getHtml({
            charset:      charset,
            stylesheets:  this.config.stylesheets
          });

      // Create the basic dom tree including proper DOCTYPE and charset
      iframeDocument.open("text/html", "replace");
      iframeDocument.write(sandboxHtml);
      iframeDocument.close();

      this.getWindow = function() { return iframe.contentWindow; };
      this.getDocument = function() { return iframe.contentWindow.document; };

      // Catch js errors and pass them to the parent's onerror event
      // addEventListener("error") doesn't work properly in some browsers
      // TODO: apparently this doesn't work in IE9!
      iframeWindow.onerror = function(errorMessage, fileName, lineNumber) {
        throw new Error("wysihtml5.Sandbox: " + errorMessage, fileName, lineNumber);
      };

      if (!wysihtml5.browser.supportsSandboxedIframes()) {
        // Unset a bunch of sensitive variables
        // Please note: This isn't hack safe!
        // It more or less just takes care of basic attacks and prevents accidental theft of sensitive information
        // IE is secure though, which is the most important thing, since IE is the only browser, who
        // takes over scripts & styles into contentEditable elements when copied from external websites
        // or applications (Microsoft Word, ...)
        var i, length;
        for (i=0, length=windowProperties.length; i<length; i++) {
          this._unset(iframeWindow, windowProperties[i]);
        }
        for (i=0, length=windowProperties2.length; i<length; i++) {
          this._unset(iframeWindow, windowProperties2[i], wysihtml5.EMPTY_FUNCTION);
        }
        for (i=0, length=documentProperties.length; i<length; i++) {
          this._unset(iframeDocument, documentProperties[i]);
        }
        // This doesn't work in Safari 5
        // See http://stackoverflow.com/questions/992461/is-it-possible-to-override-document-cookie-in-webkit
        this._unset(iframeDocument, "cookie", "", true);
      }

      this.loaded = true;

      // Trigger the callback
      setTimeout(function() { that.callback(that); }, 0);
    },

    _getHtml: function(templateVars) {
      var stylesheets = templateVars.stylesheets,
          html        = "",
          i           = 0,
          length;
      stylesheets = typeof(stylesheets) === "string" ? [stylesheets] : stylesheets;
      if (stylesheets) {
        length = stylesheets.length;
        for (; i<length; i++) {
          html += '<link rel="stylesheet" href="' + stylesheets[i] + '">';
        }
      }
      templateVars.stylesheets = html;

      return wysihtml5.lang.string(
        '<!DOCTYPE html><html><head>'
        + '<meta charset="#{charset}">#{stylesheets}</head>'
        + '<body></body></html>'
      ).interpolate(templateVars);
    },

    /**
     * Method to unset/override existing variables
     * @example
     *    // Make cookie unreadable and unwritable
     *    this._unset(document, "cookie", "", true);
     */
    _unset: function(object, property, value, setter) {
      try { object[property] = value; } catch(e) {}

      try { object.__defineGetter__(property, function() { return value; }); } catch(e) {}
      if (setter) {
        try { object.__defineSetter__(property, function() {}); } catch(e) {}
      }

      if (!wysihtml5.browser.crashesWhenDefineProperty(property)) {
        try {
          var config = {
            get: function() { return value; }
          };
          if (setter) {
            config.set = function() {};
          }
          Object.defineProperty(object, property, config);
        } catch(e) {}
      }
    }
  });
})(wysihtml5);
;(function(wysihtml5) {
  var doc = document;
  wysihtml5.dom.ContentEditableArea = Base.extend({
      getContentEditable: function() {
        return this.element;
      },

      getWindow: function() {
        return this.element.ownerDocument.defaultView;
      },

      getDocument: function() {
        return this.element.ownerDocument;
      },

      constructor: function(readyCallback, config, contentEditable) {
        this.callback = readyCallback || wysihtml5.EMPTY_FUNCTION;
        this.config   = wysihtml5.lang.object({}).merge(config).get();
        if (contentEditable) {
            this.element = this._bindElement(contentEditable);
        } else {
            this.element = this._createElement();
        }
      },

      // creates a new contenteditable and initiates it
      _createElement: function() {
        var element = doc.createElement("div");
        element.className = "wysihtml5-sandbox";
        this._loadElement(element);
        return element;
      },

      // initiates an allready existent contenteditable
      _bindElement: function(contentEditable) {
        contentEditable.className = (contentEditable.className && contentEditable.className != '') ? contentEditable.className + " wysihtml5-sandbox" : "wysihtml5-sandbox";
        this._loadElement(contentEditable, true);
        return contentEditable;
      },

      _loadElement: function(element, contentExists) {
          var that = this;
        if (!contentExists) {
            var sandboxHtml = this._getHtml();
            element.innerHTML = sandboxHtml;
        }

        this.getWindow = function() { return element.ownerDocument.defaultView; };
        this.getDocument = function() { return element.ownerDocument; };

        // Catch js errors and pass them to the parent's onerror event
        // addEventListener("error") doesn't work properly in some browsers
        // TODO: apparently this doesn't work in IE9!
        // TODO: figure out and bind the errors logic for contenteditble mode
        /*iframeWindow.onerror = function(errorMessage, fileName, lineNumber) {
          throw new Error("wysihtml5.Sandbox: " + errorMessage, fileName, lineNumber);
        }
        */
        this.loaded = true;
        // Trigger the callback
        setTimeout(function() { that.callback(that); }, 0);
      },

      _getHtml: function(templateVars) {
        return '';
      }

  });
})(wysihtml5);
;(function() {
  var mapping = {
    "className": "class"
  };
  wysihtml5.dom.setAttributes = function(attributes) {
    return {
      on: function(element) {
        for (var i in attributes) {
          element.setAttribute(mapping[i] || i, attributes[i]);
        }
      }
    };
  };
})();
;wysihtml5.dom.setStyles = function(styles) {
  return {
    on: function(element) {
      var style = element.style;
      if (typeof(styles) === "string") {
        style.cssText += ";" + styles;
        return;
      }
      for (var i in styles) {
        if (i === "float") {
          style.cssFloat = styles[i];
          style.styleFloat = styles[i];
        } else {
          style[i] = styles[i];
        }
      }
    }
  };
};
;/**
 * Simulate HTML5 placeholder attribute
 *
 * Needed since
 *    - div[contentEditable] elements don't support it
 *    - older browsers (such as IE8 and Firefox 3.6) don't support it at all
 *
 * @param {Object} parent Instance of main wysihtml5.Editor class
 * @param {Element} view Instance of wysihtml5.views.* class
 * @param {String} placeholderText
 *
 * @example
 *    wysihtml.dom.simulatePlaceholder(this, composer, "Foobar");
 */
(function(dom) {
  dom.simulatePlaceholder = function(editor, view, placeholderText) {
    var CLASS_NAME = "placeholder",
        unset = function() {
          var composerIsVisible   = view.element.offsetWidth > 0 && view.element.offsetHeight > 0;
          if (view.hasPlaceholderSet()) {
            view.clear();
            view.element.focus();
            if (composerIsVisible ) {
              setTimeout(function() {
                var sel = view.selection.getSelection();
                if (!sel.focusNode || !sel.anchorNode) {
                  view.selection.selectNode(view.element.firstChild || view.element);
                }
              }, 0);
            }
          }
          view.placeholderSet = false;
          dom.removeClass(view.element, CLASS_NAME);
        },
        set = function() {
          if (view.isEmpty()) {
            view.placeholderSet = true;
            view.setValue(placeholderText);
            dom.addClass(view.element, CLASS_NAME);
          }
        };

    editor
      .on("set_placeholder", set)
      .on("unset_placeholder", unset)
      .on("focus:composer", unset)
      .on("paste:composer", unset)
      .on("blur:composer", set);

    set();
  };
})(wysihtml5.dom);
;(function(dom) {
  var documentElement = document.documentElement;
  if ("textContent" in documentElement) {
    dom.setTextContent = function(element, text) {
      element.textContent = text;
    };

    dom.getTextContent = function(element) {
      return element.textContent;
    };
  } else if ("innerText" in documentElement) {
    dom.setTextContent = function(element, text) {
      element.innerText = text;
    };

    dom.getTextContent = function(element) {
      return element.innerText;
    };
  } else {
    dom.setTextContent = function(element, text) {
      element.nodeValue = text;
    };

    dom.getTextContent = function(element) {
      return element.nodeValue;
    };
  }
})(wysihtml5.dom);

;/**
 * Get a set of attribute from one element
 *
 * IE gives wrong results for hasAttribute/getAttribute, for example:
 *    var td = document.createElement("td");
 *    td.getAttribute("rowspan"); // => "1" in IE
 *
 * Therefore we have to check the element's outerHTML for the attribute
*/

wysihtml5.dom.getAttribute = function(node, attributeName) {
  var HAS_GET_ATTRIBUTE_BUG = !wysihtml5.browser.supportsGetAttributeCorrectly();
  attributeName = attributeName.toLowerCase();
  var nodeName = node.nodeName;
  if (nodeName == "IMG" && attributeName == "src" && wysihtml5.dom.isLoadedImage(node) === true) {
    // Get 'src' attribute value via object property since this will always contain the
    // full absolute url (http://...)
    // this fixes a very annoying bug in firefox (ver 3.6 & 4) and IE 8 where images copied from the same host
    // will have relative paths, which the sanitizer strips out (see attributeCheckMethods.url)
    return node.src;
  } else if (HAS_GET_ATTRIBUTE_BUG && "outerHTML" in node) {
    // Don't trust getAttribute/hasAttribute in IE 6-8, instead check the element's outerHTML
    var outerHTML      = node.outerHTML.toLowerCase(),
        // TODO: This might not work for attributes without value: <input disabled>
        hasAttribute   = outerHTML.indexOf(" " + attributeName +  "=") != -1;

    return hasAttribute ? node.getAttribute(attributeName) : null;
  } else{
    return node.getAttribute(attributeName);
  }
};
;/**
 * Get all attributes of an element
 *
 * IE gives wrong results for hasAttribute/getAttribute, for example:
 *    var td = document.createElement("td");
 *    td.getAttribute("rowspan"); // => "1" in IE
 *
 * Therefore we have to check the element's outerHTML for the attribute
*/

wysihtml5.dom.getAttributes = function(node) {
  var HAS_GET_ATTRIBUTE_BUG = !wysihtml5.browser.supportsGetAttributeCorrectly(),
      nodeName = node.nodeName,
      attributes = [],
      attr;

  for (attr in node.attributes) {
    if ((node.attributes.hasOwnProperty && node.attributes.hasOwnProperty(attr)) || (!node.attributes.hasOwnProperty && Object.prototype.hasOwnProperty.call(node.attributes, attr)))  {
      if (node.attributes[attr].specified) {
        if (nodeName == "IMG" && node.attributes[attr].name.toLowerCase() == "src" && wysihtml5.dom.isLoadedImage(node) === true) {
          attributes['src'] = node.src;
        } else if (wysihtml5.lang.array(['rowspan', 'colspan']).contains(node.attributes[attr].name.toLowerCase()) && HAS_GET_ATTRIBUTE_BUG) {
          if (node.attributes[attr].value !== 1) {
            attributes[node.attributes[attr].name] = node.attributes[attr].value;
          }
        } else {
          attributes[node.attributes[attr].name] = node.attributes[attr].value;
        }
      }
    }
  }
  return attributes;
};;/**
   * Check whether the given node is a proper loaded image
   * FIXME: Returns undefined when unknown (Chrome, Safari)
*/

wysihtml5.dom.isLoadedImage = function (node) {
  try {
    return node.complete && !node.mozMatchesSelector(":-moz-broken");
  } catch(e) {
    if (node.complete && node.readyState === "complete") {
      return true;
    }
  }
};
;(function(wysihtml5) {

    var api = wysihtml5.dom;

    var MapCell = function(cell) {
      this.el = cell;
      this.isColspan= false;
      this.isRowspan= false;
      this.firstCol= true;
      this.lastCol= true;
      this.firstRow= true;
      this.lastRow= true;
      this.isReal= true;
      this.spanCollection= [];
      this.modified = false;
    };

    var TableModifyerByCell = function (cell, table) {
        if (cell) {
            this.cell = cell;
            this.table = api.getParentElement(cell, { nodeName: ["TABLE"] });
        } else if (table) {
            this.table = table;
            this.cell = this.table.querySelectorAll('th, td')[0];
        }
    };

    function queryInList(list, query) {
        var ret = [],
            q;
        for (var e = 0, len = list.length; e < len; e++) {
            q = list[e].querySelectorAll(query);
            if (q) {
                for(var i = q.length; i--; ret.unshift(q[i]));
            }
        }
        return ret;
    }

    function removeElement(el) {
        el.parentNode.removeChild(el);
    }

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function nextNode(node, tag) {
        var element = node.nextSibling;
        while (element.nodeType !=1) {
            element = element.nextSibling;
            if (!tag || tag == element.tagName.toLowerCase()) {
                return element;
            }
        }
        return null;
    }

    TableModifyerByCell.prototype = {

        addSpannedCellToMap: function(cell, map, r, c, cspan, rspan) {
            var spanCollect = [],
                rmax = r + ((rspan) ? parseInt(rspan, 10) - 1 : 0),
                cmax = c + ((cspan) ? parseInt(cspan, 10) - 1 : 0);

            for (var rr = r; rr <= rmax; rr++) {
                if (typeof map[rr] == "undefined") { map[rr] = []; }
                for (var cc = c; cc <= cmax; cc++) {
                    map[rr][cc] = new MapCell(cell);
                    map[rr][cc].isColspan = (cspan && parseInt(cspan, 10) > 1);
                    map[rr][cc].isRowspan = (rspan && parseInt(rspan, 10) > 1);
                    map[rr][cc].firstCol = cc == c;
                    map[rr][cc].lastCol = cc == cmax;
                    map[rr][cc].firstRow = rr == r;
                    map[rr][cc].lastRow = rr == rmax;
                    map[rr][cc].isReal = cc == c && rr == r;
                    map[rr][cc].spanCollection = spanCollect;

                    spanCollect.push(map[rr][cc]);
                }
            }
        },

        setCellAsModified: function(cell) {
            cell.modified = true;
            if (cell.spanCollection.length > 0) {
              for (var s = 0, smax = cell.spanCollection.length; s < smax; s++) {
                cell.spanCollection[s].modified = true;
              }
            }
        },

        setTableMap: function() {
            var map = [];
            var tableRows = this.getTableRows(),
                ridx, row, cells, cidx, cell,
                c,
                cspan, rspan;

            for (ridx = 0; ridx < tableRows.length; ridx++) {
                row = tableRows[ridx];
                cells = this.getRowCells(row);
                c = 0;
                if (typeof map[ridx] == "undefined") { map[ridx] = []; }
                for (cidx = 0; cidx < cells.length; cidx++) {
                    cell = cells[cidx];

                    // If cell allready set means it is set by col or rowspan,
                    // so increase cols index until free col is found
                    while (typeof map[ridx][c] != "undefined") { c++; }

                    cspan = api.getAttribute(cell, 'colspan');
                    rspan = api.getAttribute(cell, 'rowspan');

                    if (cspan || rspan) {
                        this.addSpannedCellToMap(cell, map, ridx, c, cspan, rspan);
                        c = c + ((cspan) ? parseInt(cspan, 10) : 1);
                    } else {
                        map[ridx][c] = new MapCell(cell);
                        c++;
                    }
                }
            }
            this.map = map;
            return map;
        },

        getRowCells: function(row) {
            var inlineTables = this.table.querySelectorAll('table'),
                inlineCells = (inlineTables) ? queryInList(inlineTables, 'th, td') : [],
                allCells = row.querySelectorAll('th, td'),
                tableCells = (inlineCells.length > 0) ? wysihtml5.lang.array(allCells).without(inlineCells) : allCells;

            return tableCells;
        },

        getTableRows: function() {
          var inlineTables = this.table.querySelectorAll('table'),
              inlineRows = (inlineTables) ? queryInList(inlineTables, 'tr') : [],
              allRows = this.table.querySelectorAll('tr'),
              tableRows = (inlineRows.length > 0) ? wysihtml5.lang.array(allRows).without(inlineRows) : allRows;

          return tableRows;
        },

        getMapIndex: function(cell) {
          var r_length = this.map.length,
              c_length = (this.map && this.map[0]) ? this.map[0].length : 0;

          for (var r_idx = 0;r_idx < r_length; r_idx++) {
              for (var c_idx = 0;c_idx < c_length; c_idx++) {
                  if (this.map[r_idx][c_idx].el === cell) {
                      return {'row': r_idx, 'col': c_idx};
                  }
              }
          }
          return false;
        },

        getElementAtIndex: function(idx) {
            this.setTableMap();
            if (this.map[idx.row] && this.map[idx.row][idx.col] && this.map[idx.row][idx.col].el) {
                return this.map[idx.row][idx.col].el;
            }
            return null;
        },

        getMapElsTo: function(to_cell) {
            var els = [];
            this.setTableMap();
            this.idx_start = this.getMapIndex(this.cell);
            this.idx_end = this.getMapIndex(to_cell);

            // switch indexes if start is bigger than end
            if (this.idx_start.row > this.idx_end.row || (this.idx_start.row == this.idx_end.row && this.idx_start.col > this.idx_end.col)) {
                var temp_idx = this.idx_start;
                this.idx_start = this.idx_end;
                this.idx_end = temp_idx;
            }
            if (this.idx_start.col > this.idx_end.col) {
                var temp_cidx = this.idx_start.col;
                this.idx_start.col = this.idx_end.col;
                this.idx_end.col = temp_cidx;
            }

            if (this.idx_start != null && this.idx_end != null) {
                for (var row = this.idx_start.row, maxr = this.idx_end.row; row <= maxr; row++) {
                    for (var col = this.idx_start.col, maxc = this.idx_end.col; col <= maxc; col++) {
                        els.push(this.map[row][col].el);
                    }
                }
            }
            return els;
        },

        orderSelectionEnds: function(secondcell) {
            this.setTableMap();
            this.idx_start = this.getMapIndex(this.cell);
            this.idx_end = this.getMapIndex(secondcell);

            // switch indexes if start is bigger than end
            if (this.idx_start.row > this.idx_end.row || (this.idx_start.row == this.idx_end.row && this.idx_start.col > this.idx_end.col)) {
                var temp_idx = this.idx_start;
                this.idx_start = this.idx_end;
                this.idx_end = temp_idx;
            }
            if (this.idx_start.col > this.idx_end.col) {
                var temp_cidx = this.idx_start.col;
                this.idx_start.col = this.idx_end.col;
                this.idx_end.col = temp_cidx;
            }

            return {
                "start": this.map[this.idx_start.row][this.idx_start.col].el,
                "end": this.map[this.idx_end.row][this.idx_end.col].el
            };
        },

        createCells: function(tag, nr, attrs) {
            var doc = this.table.ownerDocument,
                frag = doc.createDocumentFragment(),
                cell;
            for (var i = 0; i < nr; i++) {
                cell = doc.createElement(tag);

                if (attrs) {
                    for (var attr in attrs) {
                        if (attrs.hasOwnProperty(attr)) {
                            cell.setAttribute(attr, attrs[attr]);
                        }
                    }
                }

                // add non breaking space
                cell.appendChild(document.createTextNode("\u00a0"));

                frag.appendChild(cell);
            }
            return frag;
        },

        // Returns next real cell (not part of spanned cell unless first) on row if selected index is not real. I no real cells -1 will be returned
        correctColIndexForUnreals: function(col, row) {
            var r = this.map[row],
                corrIdx = -1;
            for (var i = 0, max = col; i < col; i++) {
                if (r[i].isReal){
                    corrIdx++;
                }
            }
            return corrIdx;
        },

        getLastNewCellOnRow: function(row, rowLimit) {
            var cells = this.getRowCells(row),
                cell, idx;

            for (var cidx = 0, cmax = cells.length; cidx < cmax; cidx++) {
                cell = cells[cidx];
                idx = this.getMapIndex(cell);
                if (idx === false || (typeof rowLimit != "undefined" && idx.row != rowLimit)) {
                    return cell;
                }
            }
            return null;
        },

        removeEmptyTable: function() {
            var cells = this.table.querySelectorAll('td, th');
            if (!cells || cells.length == 0) {
                removeElement(this.table);
                return true;
            } else {
                return false;
            }
        },

        // Splits merged cell on row to unique cells
        splitRowToCells: function(cell) {
            if (cell.isColspan) {
                var colspan = parseInt(api.getAttribute(cell.el, 'colspan') || 1, 10),
                    cType = cell.el.tagName.toLowerCase();
                if (colspan > 1) {
                    var newCells = this.createCells(cType, colspan -1);
                    insertAfter(cell.el, newCells);
                }
                cell.el.removeAttribute('colspan');
            }
        },

        getRealRowEl: function(force, idx) {
            var r = null,
                c = null;

            idx = idx || this.idx;

            for (var cidx = 0, cmax = this.map[idx.row].length; cidx < cmax; cidx++) {
                c = this.map[idx.row][cidx];
                if (c.isReal) {
                    r = api.getParentElement(c.el, { nodeName: ["TR"] });
                    if (r) {
                        return r;
                    }
                }
            }

            if (r === null && force) {
                r = api.getParentElement(this.map[idx.row][idx.col].el, { nodeName: ["TR"] }) || null;
            }

            return r;
        },

        injectRowAt: function(row, col, colspan, cType, c) {
            var r = this.getRealRowEl(false, {'row': row, 'col': col}),
                new_cells = this.createCells(cType, colspan);

            if (r) {
                var n_cidx = this.correctColIndexForUnreals(col, row);
                if (n_cidx >= 0) {
                    insertAfter(this.getRowCells(r)[n_cidx], new_cells);
                } else {
                    r.insertBefore(new_cells, r.firstChild);
                }
            } else {
                var rr = this.table.ownerDocument.createElement('tr');
                rr.appendChild(new_cells);
                insertAfter(api.getParentElement(c.el, { nodeName: ["TR"] }), rr);
            }
        },

        canMerge: function(to) {
            this.to = to;
            this.setTableMap();
            this.idx_start = this.getMapIndex(this.cell);
            this.idx_end = this.getMapIndex(this.to);

            // switch indexes if start is bigger than end
            if (this.idx_start.row > this.idx_end.row || (this.idx_start.row == this.idx_end.row && this.idx_start.col > this.idx_end.col)) {
                var temp_idx = this.idx_start;
                this.idx_start = this.idx_end;
                this.idx_end = temp_idx;
            }
            if (this.idx_start.col > this.idx_end.col) {
                var temp_cidx = this.idx_start.col;
                this.idx_start.col = this.idx_end.col;
                this.idx_end.col = temp_cidx;
            }

            for (var row = this.idx_start.row, maxr = this.idx_end.row; row <= maxr; row++) {
                for (var col = this.idx_start.col, maxc = this.idx_end.col; col <= maxc; col++) {
                    if (this.map[row][col].isColspan || this.map[row][col].isRowspan) {
                        return false;
                    }
                }
            }
            return true;
        },

        decreaseCellSpan: function(cell, span) {
            var nr = parseInt(api.getAttribute(cell.el, span), 10) - 1;
            if (nr >= 1) {
                cell.el.setAttribute(span, nr);
            } else {
                cell.el.removeAttribute(span);
                if (span == 'colspan') {
                    cell.isColspan = false;
                }
                if (span == 'rowspan') {
                    cell.isRowspan = false;
                }
                cell.firstCol = true;
                cell.lastCol = true;
                cell.firstRow = true;
                cell.lastRow = true;
                cell.isReal = true;
            }
        },

        removeSurplusLines: function() {
            var row, cell, ridx, rmax, cidx, cmax, allRowspan;

            this.setTableMap();
            if (this.map) {
                ridx = 0;
                rmax = this.map.length;
                for (;ridx < rmax; ridx++) {
                    row = this.map[ridx];
                    allRowspan = true;
                    cidx = 0;
                    cmax = row.length;
                    for (; cidx < cmax; cidx++) {
                        cell = row[cidx];
                        if (!(api.getAttribute(cell.el, "rowspan") && parseInt(api.getAttribute(cell.el, "rowspan"), 10) > 1 && cell.firstRow !== true)) {
                            allRowspan = false;
                            break;
                        }
                    }
                    if (allRowspan) {
                        cidx = 0;
                        for (; cidx < cmax; cidx++) {
                            this.decreaseCellSpan(row[cidx], 'rowspan');
                        }
                    }
                }

                // remove rows without cells
                var tableRows = this.getTableRows();
                ridx = 0;
                rmax = tableRows.length;
                for (;ridx < rmax; ridx++) {
                    row = tableRows[ridx];
                    if (row.childNodes.length == 0 && (/^\s*$/.test(row.textContent || row.innerText))) {
                        removeElement(row);
                    }
                }
            }
        },

        fillMissingCells: function() {
            var r_max = 0,
                c_max = 0,
                prevcell = null;

            this.setTableMap();
            if (this.map) {

                // find maximal dimensions of broken table
                r_max = this.map.length;
                for (var ridx = 0; ridx < r_max; ridx++) {
                    if (this.map[ridx].length > c_max) { c_max = this.map[ridx].length; }
                }

                for (var row = 0; row < r_max; row++) {
                    for (var col = 0; col < c_max; col++) {
                        if (this.map[row] && !this.map[row][col]) {
                            if (col > 0) {
                                this.map[row][col] = new MapCell(this.createCells('td', 1));
                                prevcell = this.map[row][col-1];
                                if (prevcell && prevcell.el && prevcell.el.parent) { // if parent does not exist element is removed from dom
                                    insertAfter(this.map[row][col-1].el, this.map[row][col].el);
                                }
                            }
                        }
                    }
                }
            }
        },

        rectify: function() {
            if (!this.removeEmptyTable()) {
                this.removeSurplusLines();
                this.fillMissingCells();
                return true;
            } else {
                return false;
            }
        },

        unmerge: function() {
            if (this.rectify()) {
                this.setTableMap();
                this.idx = this.getMapIndex(this.cell);

                if (this.idx) {
                    var thisCell = this.map[this.idx.row][this.idx.col],
                        colspan = (api.getAttribute(thisCell.el, "colspan")) ? parseInt(api.getAttribute(thisCell.el, "colspan"), 10) : 1,
                        cType = thisCell.el.tagName.toLowerCase();

                    if (thisCell.isRowspan) {
                        var rowspan = parseInt(api.getAttribute(thisCell.el, "rowspan"), 10);
                        if (rowspan > 1) {
                            for (var nr = 1, maxr = rowspan - 1; nr <= maxr; nr++){
                                this.injectRowAt(this.idx.row + nr, this.idx.col, colspan, cType, thisCell);
                            }
                        }
                        thisCell.el.removeAttribute('rowspan');
                    }
                    this.splitRowToCells(thisCell);
                }
            }
        },

        // merges cells from start cell (defined in creating obj) to "to" cell
        merge: function(to) {
            if (this.rectify()) {
                if (this.canMerge(to)) {
                    var rowspan = this.idx_end.row - this.idx_start.row + 1,
                        colspan = this.idx_end.col - this.idx_start.col + 1;

                    for (var row = this.idx_start.row, maxr = this.idx_end.row; row <= maxr; row++) {
                        for (var col = this.idx_start.col, maxc = this.idx_end.col; col <= maxc; col++) {

                            if (row == this.idx_start.row && col == this.idx_start.col) {
                                if (rowspan > 1) {
                                    this.map[row][col].el.setAttribute('rowspan', rowspan);
                                }
                                if (colspan > 1) {
                                    this.map[row][col].el.setAttribute('colspan', colspan);
                                }
                            } else {
                                // transfer content
                                if (!(/^\s*<br\/?>\s*$/.test(this.map[row][col].el.innerHTML.toLowerCase()))) {
                                    this.map[this.idx_start.row][this.idx_start.col].el.innerHTML += ' ' + this.map[row][col].el.innerHTML;
                                }
                                removeElement(this.map[row][col].el);
                            }
                        }
                    }
                    this.rectify();
                } else {
                    if (window.console) {
                        console.log('Do not know how to merge allready merged cells.');
                    }
                }
            }
        },

        // Decreases rowspan of a cell if it is done on first cell of rowspan row (real cell)
        // Cell is moved to next row (if it is real)
        collapseCellToNextRow: function(cell) {
            var cellIdx = this.getMapIndex(cell.el),
                newRowIdx = cellIdx.row + 1,
                newIdx = {'row': newRowIdx, 'col': cellIdx.col};

            if (newRowIdx < this.map.length) {

                var row = this.getRealRowEl(false, newIdx);
                if (row !== null) {
                    var n_cidx = this.correctColIndexForUnreals(newIdx.col, newIdx.row);
                    if (n_cidx >= 0) {
                        insertAfter(this.getRowCells(row)[n_cidx], cell.el);
                    } else {
                        var lastCell = this.getLastNewCellOnRow(row, newRowIdx);
                        if (lastCell !== null) {
                            insertAfter(lastCell, cell.el);
                        } else {
                            row.insertBefore(cell.el, row.firstChild);
                        }
                    }
                    if (parseInt(api.getAttribute(cell.el, 'rowspan'), 10) > 2) {
                        cell.el.setAttribute('rowspan', parseInt(api.getAttribute(cell.el, 'rowspan'), 10) - 1);
                    } else {
                        cell.el.removeAttribute('rowspan');
                    }
                }
            }
        },

        // Removes a cell when removing a row
        // If is rowspan cell then decreases the rowspan
        // and moves cell to next row if needed (is first cell of rowspan)
        removeRowCell: function(cell) {
            if (cell.isReal) {
               if (cell.isRowspan) {
                   this.collapseCellToNextRow(cell);
               } else {
                   removeElement(cell.el);
               }
            } else {
                if (parseInt(api.getAttribute(cell.el, 'rowspan'), 10) > 2) {
                    cell.el.setAttribute('rowspan', parseInt(api.getAttribute(cell.el, 'rowspan'), 10) - 1);
                } else {
                    cell.el.removeAttribute('rowspan');
                }
            }
        },

        getRowElementsByCell: function() {
            var cells = [];
            this.setTableMap();
            this.idx = this.getMapIndex(this.cell);
            if (this.idx !== false) {
                var modRow = this.map[this.idx.row];
                for (var cidx = 0, cmax = modRow.length; cidx < cmax; cidx++) {
                    if (modRow[cidx].isReal) {
                        cells.push(modRow[cidx].el);
                    }
                }
            }
            return cells;
        },

        getColumnElementsByCell: function() {
            var cells = [];
            this.setTableMap();
            this.idx = this.getMapIndex(this.cell);
            if (this.idx !== false) {
                for (var ridx = 0, rmax = this.map.length; ridx < rmax; ridx++) {
                    if (this.map[ridx][this.idx.col] && this.map[ridx][this.idx.col].isReal) {
                        cells.push(this.map[ridx][this.idx.col].el);
                    }
                }
            }
            return cells;
        },

        // Removes the row of selected cell
        removeRow: function() {
            var oldRow = api.getParentElement(this.cell, { nodeName: ["TR"] });
            if (oldRow) {
                this.setTableMap();
                this.idx = this.getMapIndex(this.cell);
                if (this.idx !== false) {
                    var modRow = this.map[this.idx.row];
                    for (var cidx = 0, cmax = modRow.length; cidx < cmax; cidx++) {
                        if (!modRow[cidx].modified) {
                            this.setCellAsModified(modRow[cidx]);
                            this.removeRowCell(modRow[cidx]);
                        }
                    }
                }
                removeElement(oldRow);
            }
        },

        removeColCell: function(cell) {
            if (cell.isColspan) {
                if (parseInt(api.getAttribute(cell.el, 'colspan'), 10) > 2) {
                    cell.el.setAttribute('colspan', parseInt(api.getAttribute(cell.el, 'colspan'), 10) - 1);
                } else {
                    cell.el.removeAttribute('colspan');
                }
            } else if (cell.isReal) {
                removeElement(cell.el);
            }
        },

        removeColumn: function() {
            this.setTableMap();
            this.idx = this.getMapIndex(this.cell);
            if (this.idx !== false) {
                for (var ridx = 0, rmax = this.map.length; ridx < rmax; ridx++) {
                    if (!this.map[ridx][this.idx.col].modified) {
                        this.setCellAsModified(this.map[ridx][this.idx.col]);
                        this.removeColCell(this.map[ridx][this.idx.col]);
                    }
                }
            }
        },

        // removes row or column by selected cell element
        remove: function(what) {
            if (this.rectify()) {
                switch (what) {
                    case 'row':
                        this.removeRow();
                    break;
                    case 'column':
                        this.removeColumn();
                    break;
                }
                this.rectify();
            }
        },

        addRow: function(where) {
            var doc = this.table.ownerDocument;

            this.setTableMap();
            this.idx = this.getMapIndex(this.cell);
            if (where == "below" && api.getAttribute(this.cell, 'rowspan')) {
                this.idx.row = this.idx.row + parseInt(api.getAttribute(this.cell, 'rowspan'), 10) - 1;
            }

            if (this.idx !== false) {
                var modRow = this.map[this.idx.row],
                    newRow = doc.createElement('tr');

                for (var ridx = 0, rmax = modRow.length; ridx < rmax; ridx++) {
                    if (!modRow[ridx].modified) {
                        this.setCellAsModified(modRow[ridx]);
                        this.addRowCell(modRow[ridx], newRow, where);
                    }
                }

                switch (where) {
                    case 'below':
                        insertAfter(this.getRealRowEl(true), newRow);
                    break;
                    case 'above':
                        var cr = api.getParentElement(this.map[this.idx.row][this.idx.col].el, { nodeName: ["TR"] });
                        if (cr) {
                            cr.parentNode.insertBefore(newRow, cr);
                        }
                    break;
                }
            }
        },

        addRowCell: function(cell, row, where) {
            var colSpanAttr = (cell.isColspan) ? {"colspan" : api.getAttribute(cell.el, 'colspan')} : null;
            if (cell.isReal) {
                if (where != 'above' && cell.isRowspan) {
                    cell.el.setAttribute('rowspan', parseInt(api.getAttribute(cell.el,'rowspan'), 10) + 1);
                } else {
                    row.appendChild(this.createCells('td', 1, colSpanAttr));
                }
            } else {
                if (where != 'above' && cell.isRowspan && cell.lastRow) {
                    row.appendChild(this.createCells('td', 1, colSpanAttr));
                } else if (c.isRowspan) {
                    cell.el.attr('rowspan', parseInt(api.getAttribute(cell.el, 'rowspan'), 10) + 1);
                }
            }
        },

        add: function(where) {
            if (this.rectify()) {
                if (where == 'below' || where == 'above') {
                    this.addRow(where);
                }
                if (where == 'before' || where == 'after') {
                    this.addColumn(where);
                }
            }
        },

        addColCell: function (cell, ridx, where) {
            var doAdd,
                cType = cell.el.tagName.toLowerCase();

            // defines add cell vs expand cell conditions
            // true means add
            switch (where) {
                case "before":
                    doAdd = (!cell.isColspan || cell.firstCol);
                break;
                case "after":
                    doAdd = (!cell.isColspan || cell.lastCol || (cell.isColspan && c.el == this.cell));
                break;
            }

            if (doAdd){
                // adds a cell before or after current cell element
                switch (where) {
                    case "before":
                        cell.el.parentNode.insertBefore(this.createCells(cType, 1), cell.el);
                    break;
                    case "after":
                        insertAfter(cell.el, this.createCells(cType, 1));
                    break;
                }

                // handles if cell has rowspan
                if (cell.isRowspan) {
                    this.handleCellAddWithRowspan(cell, ridx+1, where);
                }

            } else {
                // expands cell
                cell.el.setAttribute('colspan',  parseInt(api.getAttribute(cell.el, 'colspan'), 10) + 1);
            }
        },

        addColumn: function(where) {
            var row, modCell;

            this.setTableMap();
            this.idx = this.getMapIndex(this.cell);
            if (where == "after" && api.getAttribute(this.cell, 'colspan')) {
              this.idx.col = this.idx.col + parseInt(api.getAttribute(this.cell, 'colspan'), 10) - 1;
            }

            if (this.idx !== false) {
                for (var ridx = 0, rmax = this.map.length; ridx < rmax; ridx++ ) {
                    row = this.map[ridx];
                    if (row[this.idx.col]) {
                        modCell = row[this.idx.col];
                        if (!modCell.modified) {
                            this.setCellAsModified(modCell);
                            this.addColCell(modCell, ridx , where);
                        }
                    }
                }
            }
        },

        handleCellAddWithRowspan: function (cell, ridx, where) {
            var addRowsNr = parseInt(api.getAttribute(this.cell, 'rowspan'), 10) - 1,
                crow = api.getParentElement(cell.el, { nodeName: ["TR"] }),
                cType = cell.el.tagName.toLowerCase(),
                cidx, temp_r_cells,
                doc = this.table.ownerDocument,
                nrow;

            for (var i = 0; i < addRowsNr; i++) {
                cidx = this.correctColIndexForUnreals(this.idx.col, (ridx + i));
                crow = nextNode(crow, 'tr');
                if (crow) {
                    if (cidx > 0) {
                        switch (where) {
                            case "before":
                                temp_r_cells = this.getRowCells(crow);
                                if (cidx > 0 && this.map[ridx + i][this.idx.col].el != temp_r_cells[cidx] && cidx == temp_r_cells.length - 1) {
                                     insertAfter(temp_r_cells[cidx], this.createCells(cType, 1));
                                } else {
                                    temp_r_cells[cidx].parentNode.insertBefore(this.createCells(cType, 1), temp_r_cells[cidx]);
                                }

                            break;
                            case "after":
                                insertAfter(this.getRowCells(crow)[cidx], this.createCells(cType, 1));
                            break;
                        }
                    } else {
                        crow.insertBefore(this.createCells(cType, 1), crow.firstChild);
                    }
                } else {
                    nrow = doc.createElement('tr');
                    nrow.appendChild(this.createCells(cType, 1));
                    this.table.appendChild(nrow);
                }
            }
        }
    };

    api.table = {
        getCellsBetween: function(cell1, cell2) {
            var c1 = new TableModifyerByCell(cell1);
            return c1.getMapElsTo(cell2);
        },

        addCells: function(cell, where) {
            var c = new TableModifyerByCell(cell);
            c.add(where);
        },

        removeCells: function(cell, what) {
            var c = new TableModifyerByCell(cell);
            c.remove(what);
        },

        mergeCellsBetween: function(cell1, cell2) {
            var c1 = new TableModifyerByCell(cell1);
            c1.merge(cell2);
        },

        unmergeCell: function(cell) {
            var c = new TableModifyerByCell(cell);
            c.unmerge();
        },

        orderSelectionEnds: function(cell, cell2) {
            var c = new TableModifyerByCell(cell);
            return c.orderSelectionEnds(cell2);
        },

        indexOf: function(cell) {
            var c = new TableModifyerByCell(cell);
            c.setTableMap();
            return c.getMapIndex(cell);
        },

        findCell: function(table, idx) {
            var c = new TableModifyerByCell(null, table);
            return c.getElementAtIndex(idx);
        },

        findRowByCell: function(cell) {
            var c = new TableModifyerByCell(cell);
            return c.getRowElementsByCell();
        },

        findColumnByCell: function(cell) {
            var c = new TableModifyerByCell(cell);
            return c.getColumnElementsByCell();
        },

        canMerge: function(cell1, cell2) {
            var c = new TableModifyerByCell(cell1);
            return c.canMerge(cell2);
        }
    };



})(wysihtml5);
;// does a selector query on element or array of elements

wysihtml5.dom.query = function(elements, query) {
    var ret = [],
        q;

    if (elements.nodeType) {
        elements = [elements];
    }

    for (var e = 0, len = elements.length; e < len; e++) {
        q = elements[e].querySelectorAll(query);
        if (q) {
            for(var i = q.length; i--; ret.unshift(q[i]));
        }
    }
    return ret;
};
;wysihtml5.dom.compareDocumentPosition = (function() {
  var documentElement = document.documentElement;
  if (documentElement.compareDocumentPosition) {
    return function(container, element) {
      return container.compareDocumentPosition(element);
    };
  } else {
    return function( container, element ) {
      // implementation borrowed from https://github.com/tmpvar/jsdom/blob/681a8524b663281a0f58348c6129c8c184efc62c/lib/jsdom/level3/core.js // MIT license
      var thisOwner, otherOwner;

      if( container.nodeType === 9) // Node.DOCUMENT_NODE
        thisOwner = container;
      else
        thisOwner = container.ownerDocument;

      if( element.nodeType === 9) // Node.DOCUMENT_NODE
        otherOwner = element;
      else
        otherOwner = element.ownerDocument;

      if( container === element ) return 0;
      if( container === element.ownerDocument ) return 4 + 16; //Node.DOCUMENT_POSITION_FOLLOWING + Node.DOCUMENT_POSITION_CONTAINED_BY;
      if( container.ownerDocument === element ) return 2 + 8;  //Node.DOCUMENT_POSITION_PRECEDING + Node.DOCUMENT_POSITION_CONTAINS;
      if( thisOwner !== otherOwner ) return 1; // Node.DOCUMENT_POSITION_DISCONNECTED;

      // Text nodes for attributes does not have a _parentNode. So we need to find them as attribute child.
      if( container.nodeType === 2 /*Node.ATTRIBUTE_NODE*/ && container.childNodes && wysihtml5.lang.array(container.childNodes).indexOf( element ) !== -1)
        return 4 + 16; //Node.DOCUMENT_POSITION_FOLLOWING + Node.DOCUMENT_POSITION_CONTAINED_BY;

      if( element.nodeType === 2 /*Node.ATTRIBUTE_NODE*/ && element.childNodes && wysihtml5.lang.array(element.childNodes).indexOf( container ) !== -1)
        return 2 + 8; //Node.DOCUMENT_POSITION_PRECEDING + Node.DOCUMENT_POSITION_CONTAINS;

      var point = container;
      var parents = [ ];
      var previous = null;
      while( point ) {
        if( point == element ) return 2 + 8; //Node.DOCUMENT_POSITION_PRECEDING + Node.DOCUMENT_POSITION_CONTAINS;
        parents.push( point );
        point = point.parentNode;
      }
      point = element;
      previous = null;
      while( point ) {
        if( point == container ) return 4 + 16; //Node.DOCUMENT_POSITION_FOLLOWING + Node.DOCUMENT_POSITION_CONTAINED_BY;
        var location_index = wysihtml5.lang.array(parents).indexOf( point );
        if( location_index !== -1) {
         var smallest_common_ancestor = parents[ location_index ];
         var this_index = wysihtml5.lang.array(smallest_common_ancestor.childNodes).indexOf( parents[location_index - 1]);//smallest_common_ancestor.childNodes.toArray().indexOf( parents[location_index - 1] );
         var other_index = wysihtml5.lang.array(smallest_common_ancestor.childNodes).indexOf( previous ); //smallest_common_ancestor.childNodes.toArray().indexOf( previous );
         if( this_index > other_index ) {
               return 2; //Node.DOCUMENT_POSITION_PRECEDING;
         }
         else {
           return 4; //Node.DOCUMENT_POSITION_FOLLOWING;
         }
        }
        previous = point;
        point = point.parentNode;
      }
      return 1; //Node.DOCUMENT_POSITION_DISCONNECTED;
    };
  }
})();
;wysihtml5.dom.unwrap = function(node) {
  if (node.parentNode) {
    while (node.lastChild) {
      wysihtml5.dom.insert(node.lastChild).after(node);
    }
    node.parentNode.removeChild(node);
  }
};;/* 
 * Methods for fetching pasted html before it gets inserted into content
**/

/* Modern event.clipboardData driven approach.
 * Advantage is that it does not have to loose selection or modify dom to catch the data. 
 * IE does not support though.
**/
wysihtml5.dom.getPastedHtml = function(event) {
  var html;
  if (event.clipboardData) {
    if (wysihtml5.lang.array(event.clipboardData.types).contains('text/html')) {
      html = event.clipboardData.getData('text/html');
    } else if (wysihtml5.lang.array(event.clipboardData.types).contains('text/plain')) {
      html = wysihtml5.lang.string(event.clipboardData.getData('text/plain')).escapeHTML(true, true);
    }
  }
  return html;
};

/* Older temprorary contenteditable as paste source catcher method for fallbacks */
wysihtml5.dom.getPastedHtmlWithDiv = function (composer, f) {
  var selBookmark = composer.selection.getBookmark(),
      doc = composer.element.ownerDocument,
      cleanerDiv = doc.createElement('DIV');
  
  doc.body.appendChild(cleanerDiv);

  cleanerDiv.style.width = "1px";
  cleanerDiv.style.height = "1px";
  cleanerDiv.style.overflow = "hidden";

  cleanerDiv.setAttribute('contenteditable', 'true');
  cleanerDiv.focus();

  setTimeout(function () {
    composer.selection.setBookmark(selBookmark);
    f(cleanerDiv.innerHTML);
    cleanerDiv.parentNode.removeChild(cleanerDiv);
  }, 0);
};;/**
 * Fix most common html formatting misbehaviors of browsers implementation when inserting
 * content via copy & paste contentEditable
 *
 * @author Christopher Blum
 */
wysihtml5.quirks.cleanPastedHTML = (function() {

  var styleToRegex = function (styleStr) {
    var trimmedStr = wysihtml5.lang.string(styleStr).trim(),
        escapedStr = trimmedStr.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

    return new RegExp("^((?!^" + escapedStr + "$).)*$", "i");
  };

  var extendRulesWithStyleExceptions = function (rules, exceptStyles) {
    var newRules = wysihtml5.lang.object(rules).clone(true),
        tag, style;

    for (tag in newRules.tags) {

      if (newRules.tags.hasOwnProperty(tag)) {
        if (newRules.tags[tag].keep_styles) {
          for (style in newRules.tags[tag].keep_styles) {
            if (newRules.tags[tag].keep_styles.hasOwnProperty(style)) {
              if (exceptStyles[style]) {
                newRules.tags[tag].keep_styles[style] = styleToRegex(exceptStyles[style]);
              }
            }
          }
        }
      }
    }

    return newRules;
  };

  var pickRuleset = function(ruleset, html) {
    var pickedSet, defaultSet;

    if (!ruleset) {
      return null;
    }

    for (var i = 0, max = ruleset.length; i < max; i++) {
      if (!ruleset[i].condition) {
        defaultSet = ruleset[i].set;
      }
      if (ruleset[i].condition && ruleset[i].condition.test(html)) {
        return ruleset[i].set;
      }
    }

    return defaultSet;
  };

  return function(html, options) {
    var exceptStyles = {
          'color': wysihtml5.dom.getStyle("color").from(options.referenceNode),
          'fontSize': wysihtml5.dom.getStyle("font-size").from(options.referenceNode)
        },
        rules = extendRulesWithStyleExceptions(pickRuleset(options.rules, html) || {}, exceptStyles),
        newHtml;

    newHtml = wysihtml5.dom.parse(html, {
      "rules": rules,
      "cleanUp": true, // <span> elements, empty or without attributes, should be removed/replaced with their content
      "context": options.referenceNode.ownerDocument,
      "uneditableClass": options.uneditableClass,
      "clearInternals" : true, // don't paste temprorary selection and other markings
      "unjoinNbsps" : true
    });

    return newHtml;
  };

})();;/**
 * IE and Opera leave an empty paragraph in the contentEditable element after clearing it
 *
 * @param {Object} contentEditableElement The contentEditable element to observe for clearing events
 * @exaple
 *    wysihtml5.quirks.ensureProperClearing(myContentEditableElement);
 */
wysihtml5.quirks.ensureProperClearing = (function() {
  var clearIfNecessary = function() {
    var element = this;
    setTimeout(function() {
      var innerHTML = element.innerHTML.toLowerCase();
      if (innerHTML == "<p>&nbsp;</p>" ||
          innerHTML == "<p>&nbsp;</p><p>&nbsp;</p>") {
        element.innerHTML = "";
      }
    }, 0);
  };

  return function(composer) {
    wysihtml5.dom.observe(composer.element, ["cut", "keydown"], clearIfNecessary);
  };
})();
;// See https://bugzilla.mozilla.org/show_bug.cgi?id=664398
//
// In Firefox this:
//      var d = document.createElement("div");
//      d.innerHTML ='<a href="~"></a>';
//      d.innerHTML;
// will result in:
//      <a href="%7E"></a>
// which is wrong
(function(wysihtml5) {
  var TILDE_ESCAPED = "%7E";
  wysihtml5.quirks.getCorrectInnerHTML = function(element) {
    var innerHTML = element.innerHTML;
    if (innerHTML.indexOf(TILDE_ESCAPED) === -1) {
      return innerHTML;
    }

    var elementsWithTilde = element.querySelectorAll("[href*='~'], [src*='~']"),
        url,
        urlToSearch,
        length,
        i;
    for (i=0, length=elementsWithTilde.length; i<length; i++) {
      url         = elementsWithTilde[i].href || elementsWithTilde[i].src;
      urlToSearch = wysihtml5.lang.string(url).replace("~").by(TILDE_ESCAPED);
      innerHTML   = wysihtml5.lang.string(innerHTML).replace(urlToSearch).by(url);
    }
    return innerHTML;
  };
})(wysihtml5);
;/**
 * Force rerendering of a given element
 * Needed to fix display misbehaviors of IE
 *
 * @param {Element} element The element object which needs to be rerendered
 * @example
 *    wysihtml5.quirks.redraw(document.body);
 */
(function(wysihtml5) {
  var CLASS_NAME = "wysihtml5-quirks-redraw";

  wysihtml5.quirks.redraw = function(element) {
    wysihtml5.dom.addClass(element, CLASS_NAME);
    wysihtml5.dom.removeClass(element, CLASS_NAME);

    // Following hack is needed for firefox to make sure that image resize handles are properly removed
    try {
      var doc = element.ownerDocument;
      doc.execCommand("italic", false, null);
      doc.execCommand("italic", false, null);
    } catch(e) {}
  };
})(wysihtml5);
;wysihtml5.quirks.tableCellsSelection = function(editable, editor) {

    var dom = wysihtml5.dom,
        select = {
            table: null,
            start: null,
            end: null,
            cells: null,
            select: selectCells
        },
        selection_class = "wysiwyg-tmp-selected-cell",
        moveHandler = null,
        upHandler = null;

    function init () {

        dom.observe(editable, "mousedown", function(event) {
          var target = wysihtml5.dom.getParentElement(event.target, { nodeName: ["TD", "TH"] });
          if (target) {
              handleSelectionMousedown(target);
          }
        });

        return select;
    }

    function handleSelectionMousedown (target) {
      select.start = target;
      select.end = target;
      select.cells = [target];
      select.table = dom.getParentElement(select.start, { nodeName: ["TABLE"] });

      if (select.table) {
        removeCellSelections();
        dom.addClass(target, selection_class);
        moveHandler = dom.observe(editable, "mousemove", handleMouseMove);
        upHandler = dom.observe(editable, "mouseup", handleMouseUp);
        editor.fire("tableselectstart").fire("tableselectstart:composer");
      }
    }

    // remove all selection classes
    function removeCellSelections () {
        if (editable) {
            var selectedCells = editable.querySelectorAll('.' + selection_class);
            if (selectedCells.length > 0) {
              for (var i = 0; i < selectedCells.length; i++) {
                  dom.removeClass(selectedCells[i], selection_class);
              }
            }
        }
    }

    function addSelections (cells) {
      for (var i = 0; i < cells.length; i++) {
        dom.addClass(cells[i], selection_class);
      }
    }

    function handleMouseMove (event) {
      var curTable = null,
          cell = dom.getParentElement(event.target, { nodeName: ["TD","TH"] }),
          oldEnd;

      if (cell && select.table && select.start) {
        curTable =  dom.getParentElement(cell, { nodeName: ["TABLE"] });
        if (curTable && curTable === select.table) {
          removeCellSelections();
          oldEnd = select.end;
          select.end = cell;
          select.cells = dom.table.getCellsBetween(select.start, cell);
          if (select.cells.length > 1) {
            editor.composer.selection.deselect();
          }
          addSelections(select.cells);
          if (select.end !== oldEnd) {
            editor.fire("tableselectchange").fire("tableselectchange:composer");
          }
        }
      }
    }

    function handleMouseUp (event) {
      moveHandler.stop();
      upHandler.stop();
      editor.fire("tableselect").fire("tableselect:composer");
      setTimeout(function() {
        bindSideclick();
      },0);
    }

    function bindSideclick () {
        var sideClickHandler = dom.observe(editable.ownerDocument, "click", function(event) {
          sideClickHandler.stop();
          if (dom.getParentElement(event.target, { nodeName: ["TABLE"] }) != select.table) {
              removeCellSelections();
              select.table = null;
              select.start = null;
              select.end = null;
              editor.fire("tableunselect").fire("tableunselect:composer");
          }
        });
    }

    function selectCells (start, end) {
        select.start = start;
        select.end = end;
        select.table = dom.getParentElement(select.start, { nodeName: ["TABLE"] });
        selectedCells = dom.table.getCellsBetween(select.start, select.end);
        addSelections(selectedCells);
        bindSideclick();
        editor.fire("tableselect").fire("tableselect:composer");
    }

    return init();

};
;(function(wysihtml5) {
  var RGBA_REGEX     = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d\.]+)\s*\)/i,
      RGB_REGEX      = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i,
      HEX6_REGEX     = /^#([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])/i,
      HEX3_REGEX     = /^#([0-9a-f])([0-9a-f])([0-9a-f])/i;

  var param_REGX = function (p) {
    return new RegExp("(^|\\s|;)" + p + "\\s*:\\s*[^;$]+" , "gi");
  };

  wysihtml5.quirks.styleParser = {

    parseColor: function(stylesStr, paramName) {
      var paramRegex = param_REGX(paramName),
          params = stylesStr.match(paramRegex),
          radix = 10,
          str, colorMatch;

      if (params) {
        for (var i = params.length; i--;) {
          params[i] = wysihtml5.lang.string(params[i].split(':')[1]).trim();
        }
        str = params[params.length-1];

        if (RGBA_REGEX.test(str)) {
          colorMatch = str.match(RGBA_REGEX);
        } else if (RGB_REGEX.test(str)) {
          colorMatch = str.match(RGB_REGEX);
        } else if (HEX6_REGEX.test(str)) {
          colorMatch = str.match(HEX6_REGEX);
          radix = 16;
        } else if (HEX3_REGEX.test(str)) {
          colorMatch = str.match(HEX3_REGEX);
          colorMatch.shift();
          colorMatch.push(1);
          return wysihtml5.lang.array(colorMatch).map(function(d, idx) {
            return (idx < 3) ? (parseInt(d, 16) * 16) + parseInt(d, 16): parseFloat(d);
          });
        }

        if (colorMatch) {
          colorMatch.shift();
          if (!colorMatch[3]) {
            colorMatch.push(1);
          }
          return wysihtml5.lang.array(colorMatch).map(function(d, idx) {
            return (idx < 3) ? parseInt(d, radix): parseFloat(d);
          });
        }
      }
      return false;
    },

    unparseColor: function(val, props) {
      if (props) {
        if (props == "hex") {
          return (val[0].toString(16).toUpperCase()) + (val[1].toString(16).toUpperCase()) + (val[2].toString(16).toUpperCase());
        } else if (props == "hash") {
          return "#" + (val[0].toString(16).toUpperCase()) + (val[1].toString(16).toUpperCase()) + (val[2].toString(16).toUpperCase());
        } else if (props == "rgb") {
          return "rgb(" + val[0] + "," + val[1] + "," + val[2] + ")";
        } else if (props == "rgba") {
          return "rgba(" + val[0] + "," + val[1] + "," + val[2] + "," + val[3] + ")";
        } else if (props == "csv") {
          return  val[0] + "," + val[1] + "," + val[2] + "," + val[3];
        }
      }

      if (val[3] && val[3] !== 1) {
        return "rgba(" + val[0] + "," + val[1] + "," + val[2] + "," + val[3] + ")";
      } else {
        return "rgb(" + val[0] + "," + val[1] + "," + val[2] + ")";
      }
    },

    parseFontSize: function(stylesStr) {
      var params = stylesStr.match(param_REGX('font-size'));
      if (params) {
        return wysihtml5.lang.string(params[params.length - 1].split(':')[1]).trim();
      }
      return false;
    }
  };

})(wysihtml5);
;/**
 * Selection API
 *
 * @example
 *    var selection = new wysihtml5.Selection(editor);
 */
(function(wysihtml5) {
  var dom = wysihtml5.dom;

  function _getCumulativeOffsetTop(element) {
    var top = 0;
    if (element.parentNode) {
      do {
        top += element.offsetTop || 0;
        element = element.offsetParent;
      } while (element);
    }
    return top;
  }

  // Provides the depth of ``descendant`` relative to ``ancestor``
  function getDepth(ancestor, descendant) {
      var ret = 0;
      while (descendant !== ancestor) {
          ret++;
          descendant = descendant.parentNode;
          if (!descendant)
              throw new Error("not a descendant of ancestor!");
      }
      return ret;
  }

  // Should fix the obtained ranges that cannot surrond contents normally to apply changes upon
  // Being considerate to firefox that sets range start start out of span and end inside on doubleclick initiated selection
  function expandRangeToSurround(range) {
      if (range.canSurroundContents()) return;

      var common = range.commonAncestorContainer,
          start_depth = getDepth(common, range.startContainer),
          end_depth = getDepth(common, range.endContainer);

      while(!range.canSurroundContents()) {
        // In the following branches, we cannot just decrement the depth variables because the setStartBefore/setEndAfter may move the start or end of the range more than one level relative to ``common``. So we need to recompute the depth.
        if (start_depth > end_depth) {
            range.setStartBefore(range.startContainer);
            start_depth = getDepth(common, range.startContainer);
        }
        else {
            range.setEndAfter(range.endContainer);
            end_depth = getDepth(common, range.endContainer);
        }
      }
  }

  wysihtml5.Selection = Base.extend(
    /** @scope wysihtml5.Selection.prototype */ {
    constructor: function(editor, contain, unselectableClass) {
      // Make sure that our external range library is initialized
      window.rangy.init();

      this.editor   = editor;
      this.composer = editor.composer;
      this.doc      = this.composer.doc;
      this.contain = contain;
      this.unselectableClass = unselectableClass || false;
    },

    /**
     * Get the current selection as a bookmark to be able to later restore it
     *
     * @return {Object} An object that represents the current selection
     */
    getBookmark: function() {
      var range = this.getRange();
      if (range) expandRangeToSurround(range);
      return range && range.cloneRange();
    },

    /**
     * Restore a selection retrieved via wysihtml5.Selection.prototype.getBookmark
     *
     * @param {Object} bookmark An object that represents the current selection
     */
    setBookmark: function(bookmark) {
      if (!bookmark) {
        return;
      }

      this.setSelection(bookmark);
    },

    /**
     * Set the caret in front of the given node
     *
     * @param {Object} node The element or text node where to position the caret in front of
     * @example
     *    selection.setBefore(myElement);
     */
    setBefore: function(node) {
      var range = rangy.createRange(this.doc);
      range.setStartBefore(node);
      range.setEndBefore(node);
      return this.setSelection(range);
    },

    /**
     * Set the caret after the given node
     *
     * @param {Object} node The element or text node where to position the caret in front of
     * @example
     *    selection.setBefore(myElement);
     */
    setAfter: function(node) {
      var range = rangy.createRange(this.doc);

      range.setStartAfter(node);
      range.setEndAfter(node);
      return this.setSelection(range);
    },

    /**
     * Ability to select/mark nodes
     *
     * @param {Element} node The node/element to select
     * @example
     *    selection.selectNode(document.getElementById("my-image"));
     */
    selectNode: function(node, avoidInvisibleSpace) {
      var range           = rangy.createRange(this.doc),
          isElement       = node.nodeType === wysihtml5.ELEMENT_NODE,
          canHaveHTML     = "canHaveHTML" in node ? node.canHaveHTML : (node.nodeName !== "IMG"),
          content         = isElement ? node.innerHTML : node.data,
          isEmpty         = (content === "" || content === wysihtml5.INVISIBLE_SPACE),
          displayStyle    = dom.getStyle("display").from(node),
          isBlockElement  = (displayStyle === "block" || displayStyle === "list-item");

      if (isEmpty && isElement && canHaveHTML && !avoidInvisibleSpace) {
        // Make sure that caret is visible in node by inserting a zero width no breaking space
        try { node.innerHTML = wysihtml5.INVISIBLE_SPACE; } catch(e) {}
      }

      if (canHaveHTML) {
        range.selectNodeContents(node);
      } else {
        range.selectNode(node);
      }

      if (canHaveHTML && isEmpty && isElement) {
        range.collapse(isBlockElement);
      } else if (canHaveHTML && isEmpty) {
        range.setStartAfter(node);
        range.setEndAfter(node);
      }

      this.setSelection(range);
    },

    /**
     * Get the node which contains the selection
     *
     * @param {Boolean} [controlRange] (only IE) Whether it should return the selected ControlRange element when the selection type is a "ControlRange"
     * @return {Object} The node that contains the caret
     * @example
     *    var nodeThatContainsCaret = selection.getSelectedNode();
     */
    getSelectedNode: function(controlRange) {
      var selection,
          range;

      if (controlRange && this.doc.selection && this.doc.selection.type === "Control") {
        range = this.doc.selection.createRange();
        if (range && range.length) {
          return range.item(0);
        }
      }

      selection = this.getSelection(this.doc);
      if (selection.focusNode === selection.anchorNode) {
        return selection.focusNode;
      } else {
        range = this.getRange(this.doc);
        return range ? range.commonAncestorContainer : this.doc.body;
      }
    },

    fixSelBorders: function() {
      var range = this.getRange();
      expandRangeToSurround(range);
      this.setSelection(range);
    },

    getSelectedOwnNodes: function(controlRange) {
      var selection,
          ranges = this.getOwnRanges(),
          ownNodes = [];

      for (var i = 0, maxi = ranges.length; i < maxi; i++) {
          ownNodes.push(ranges[i].commonAncestorContainer || this.doc.body);
      }
      return ownNodes;
    },

    findNodesInSelection: function(nodeTypes) {
      var ranges = this.getOwnRanges(),
          nodes = [], curNodes;
      for (var i = 0, maxi = ranges.length; i < maxi; i++) {
        curNodes = ranges[i].getNodes([1], function(node) {
            return wysihtml5.lang.array(nodeTypes).contains(node.nodeName);
        });
        nodes = nodes.concat(curNodes);
      }
      return nodes;
    },

    containsUneditable: function() {
      var uneditables = this.getOwnUneditables(),
          selection = this.getSelection();

      for (var i = 0, maxi = uneditables.length; i < maxi; i++) {
        if (selection.containsNode(uneditables[i])) {
          return true;
        }
      }

      return false;
    },

    deleteContents: function()  {
      var ranges = this.getOwnRanges();
      for (var i = ranges.length; i--;) {
        ranges[i].deleteContents();
      }
      this.setSelection(ranges[0]);
    },

    getPreviousNode: function(node, ignoreEmpty) {
      if (!node) {
        var selection = this.getSelection();
        node = selection.anchorNode;
      }

      if (node === this.contain) {
          return false;
      }

      var ret = node.previousSibling,
          parent;

      if (ret === this.contain) {
          return false;
      }

      if (ret && ret.nodeType !== 3 && ret.nodeType !== 1) {
         // do not count comments and other node types
         ret = this.getPreviousNode(ret, ignoreEmpty);
      } else if (ret && ret.nodeType === 3 && (/^\s*$/).test(ret.textContent)) {
        // do not count empty textnodes as previus nodes
        ret = this.getPreviousNode(ret, ignoreEmpty);
      } else if (ignoreEmpty && ret && ret.nodeType === 1 && !wysihtml5.lang.array(["BR", "HR", "IMG"]).contains(ret.nodeName) && (/^[\s]*$/).test(ret.innerHTML)) {
        // Do not count empty nodes if param set.
        // Contenteditable tends to bypass and delete these silently when deleting with caret
        ret = this.getPreviousNode(ret, ignoreEmpty);
      } else if (!ret && node !== this.contain) {
        parent = node.parentNode;
        if (parent !== this.contain) {
            ret = this.getPreviousNode(parent, ignoreEmpty);
        }
      }

      return (ret !== this.contain) ? ret : false;
    },

    getSelectionParentsByTag: function(tagName) {
      var nodes = this.getSelectedOwnNodes(),
          curEl, parents = [];

      for (var i = 0, maxi = nodes.length; i < maxi; i++) {
        curEl = (nodes[i].nodeName &&  nodes[i].nodeName === 'LI') ? nodes[i] : wysihtml5.dom.getParentElement(nodes[i], { nodeName: ['LI']}, false, this.contain);
        if (curEl) {
          parents.push(curEl);
        }
      }
      return (parents.length) ? parents : null;
    },

    getRangeToNodeEnd: function() {
      if (this.isCollapsed()) {
        var range = this.getRange(),
            sNode = range.startContainer,
            pos = range.startOffset,
            lastR = rangy.createRange(this.doc);

        lastR.selectNodeContents(sNode);
        lastR.setStart(sNode, pos);
        return lastR;
      }
    },

    caretIsLastInSelection: function() {
      var r = rangy.createRange(this.doc),
          s = this.getSelection(),
          endc = this.getRangeToNodeEnd().cloneContents(),
          endtxt = endc.textContent;

      return (/^\s*$/).test(endtxt);
    },

    caretIsFirstInSelection: function() {
      var r = rangy.createRange(this.doc),
          s = this.getSelection(),
          range = this.getRange(),
          startNode = range.startContainer;
      
      if (startNode.nodeType === wysihtml5.TEXT_NODE) {
        return this.isCollapsed() && (startNode.nodeType === wysihtml5.TEXT_NODE && (/^\s*$/).test(startNode.data.substr(0,range.startOffset)));
      } else {
        r.selectNodeContents(this.getRange().commonAncestorContainer);
        r.collapse(true);
        return (this.isCollapsed() && (r.startContainer === s.anchorNode || r.endContainer === s.anchorNode) && r.startOffset === s.anchorOffset);
      }
    },

    caretIsInTheBeginnig: function(ofNode) {
        var selection = this.getSelection(),
            node = selection.anchorNode,
            offset = selection.anchorOffset;
        if (ofNode) {
          return (offset === 0 && (node.nodeName && node.nodeName === ofNode.toUpperCase() || wysihtml5.dom.getParentElement(node.parentNode, { nodeName: ofNode }, 1)));
        } else {
          return (offset === 0 && !this.getPreviousNode(node, true));
        }
    },

    caretIsBeforeUneditable: function() {
      var selection = this.getSelection(),
          node = selection.anchorNode,
          offset = selection.anchorOffset;

      if (offset === 0) {
        var prevNode = this.getPreviousNode(node, true);
        if (prevNode) {
          var uneditables = this.getOwnUneditables();
          for (var i = 0, maxi = uneditables.length; i < maxi; i++) {
            if (prevNode === uneditables[i]) {
              return uneditables[i];
            }
          }
        }
      }
      return false;
    },

    // TODO: Figure out a method from following 2 that would work universally
    executeAndRestoreRangy: function(method, restoreScrollPosition) {
      var win = this.doc.defaultView || this.doc.parentWindow,
          sel = rangy.saveSelection(win);

      if (!sel) {
        method();
      } else {
        try {
          method();
        } catch(e) {
          setTimeout(function() { throw e; }, 0);
        }
      }
      rangy.restoreSelection(sel);
    },

    // TODO: has problems in chrome 12. investigate block level and uneditable area inbetween
    executeAndRestore: function(method, restoreScrollPosition) {
      var body                  = this.doc.body,
          oldScrollTop          = restoreScrollPosition && body.scrollTop,
          oldScrollLeft         = restoreScrollPosition && body.scrollLeft,
          className             = "_wysihtml5-temp-placeholder",
          placeholderHtml       = '<span class="' + className + '">' + wysihtml5.INVISIBLE_SPACE + '</span>',
          range                 = this.getRange(true),
          caretPlaceholder,
          newCaretPlaceholder,
          nextSibling, prevSibling,
          node, node2, range2,
          newRange;

      // Nothing selected, execute and say goodbye
      if (!range) {
        method(body, body);
        return;
      }

      if (!range.collapsed) {
        range2 = range.cloneRange();
        node2 = range2.createContextualFragment(placeholderHtml);
        range2.collapse(false);
        range2.insertNode(node2);
        range2.detach();
      }

      node = range.createContextualFragment(placeholderHtml);
      range.insertNode(node);

      if (node2) {
        caretPlaceholder = this.contain.querySelectorAll("." + className);
        range.setStartBefore(caretPlaceholder[0]);
        range.setEndAfter(caretPlaceholder[caretPlaceholder.length -1]);
      }
      this.setSelection(range);

      // Make sure that a potential error doesn't cause our placeholder element to be left as a placeholder
      try {
        method(range.startContainer, range.endContainer);
      } catch(e) {
        setTimeout(function() { throw e; }, 0);
      }
      caretPlaceholder = this.contain.querySelectorAll("." + className);
      if (caretPlaceholder && caretPlaceholder.length) {
        newRange = rangy.createRange(this.doc);
        nextSibling = caretPlaceholder[0].nextSibling;
        if (caretPlaceholder.length > 1) {
          prevSibling = caretPlaceholder[caretPlaceholder.length -1].previousSibling;
        }
        if (prevSibling && nextSibling) {
          newRange.setStartBefore(nextSibling);
          newRange.setEndAfter(prevSibling);
        } else {
          newCaretPlaceholder = this.doc.createTextNode(wysihtml5.INVISIBLE_SPACE);
          dom.insert(newCaretPlaceholder).after(caretPlaceholder[0]);
          newRange.setStartBefore(newCaretPlaceholder);
          newRange.setEndAfter(newCaretPlaceholder);
        }
        this.setSelection(newRange);
        for (var i = caretPlaceholder.length; i--;) {
         caretPlaceholder[i].parentNode.removeChild(caretPlaceholder[i]);
        }

      } else {
        // fallback for when all hell breaks loose
        this.contain.focus();
      }

      if (restoreScrollPosition) {
        body.scrollTop  = oldScrollTop;
        body.scrollLeft = oldScrollLeft;
      }

      // Remove it again, just to make sure that the placeholder is definitely out of the dom tree
      try {
        caretPlaceholder.parentNode.removeChild(caretPlaceholder);
      } catch(e2) {}
    },

    set: function(node, offset) {
      var newRange = rangy.createRange(this.doc);
      newRange.setStart(node, offset || 0);
      this.setSelection(newRange);
    },

    /**
     * Insert html at the caret position and move the cursor after the inserted html
     *
     * @param {String} html HTML string to insert
     * @example
     *    selection.insertHTML("<p>foobar</p>");
     */
    insertHTML: function(html) {
      var range     = rangy.createRange(this.doc),
          node = this.doc.createElement('DIV'),
          fragment = this.doc.createDocumentFragment(),
          lastChild;

      node.innerHTML = html;
      lastChild = node.lastChild;

      while (node.firstChild) {
        fragment.appendChild(node.firstChild);
      }
      this.insertNode(fragment);

      if (lastChild) {
        this.setAfter(lastChild);
      }
    },

    /**
     * Insert a node at the caret position and move the cursor behind it
     *
     * @param {Object} node HTML string to insert
     * @example
     *    selection.insertNode(document.createTextNode("foobar"));
     */
    insertNode: function(node) {
      var range = this.getRange();
      if (range) {
        range.insertNode(node);
      }
    },

    /**
     * Wraps current selection with the given node
     *
     * @param {Object} node The node to surround the selected elements with
     */
    surround: function(nodeOptions) {
      var ranges = this.getOwnRanges(),
          node, nodes = [];
      if (ranges.length == 0) {
        return nodes;
      }

      for (var i = ranges.length; i--;) {
        node = this.doc.createElement(nodeOptions.nodeName);
        nodes.push(node);
        if (nodeOptions.className) {
          node.className = nodeOptions.className;
        }
        if (nodeOptions.cssStyle) {
          node.setAttribute('style', nodeOptions.cssStyle);
        }
        try {
          // This only works when the range boundaries are not overlapping other elements
          ranges[i].surroundContents(node);
          this.selectNode(node);
        } catch(e) {
          // fallback
          node.appendChild(ranges[i].extractContents());
          ranges[i].insertNode(node);
        }
      }
      return nodes;
    },

    deblockAndSurround: function(nodeOptions) {
      var tempElement = this.doc.createElement('div'),
          range = rangy.createRange(this.doc),
          tempDivElements,
          tempElements,
          firstChild;

      tempElement.className = nodeOptions.className;

      this.composer.commands.exec("formatBlock", nodeOptions.nodeName, nodeOptions.className);
      tempDivElements = this.contain.querySelectorAll("." + nodeOptions.className);
      if (tempDivElements[0]) {
        tempDivElements[0].parentNode.insertBefore(tempElement, tempDivElements[0]);

        range.setStartBefore(tempDivElements[0]);
        range.setEndAfter(tempDivElements[tempDivElements.length - 1]);
        tempElements = range.extractContents();

        while (tempElements.firstChild) {
          firstChild = tempElements.firstChild;
          if (firstChild.nodeType == 1 && wysihtml5.dom.hasClass(firstChild, nodeOptions.className)) {
            while (firstChild.firstChild) {
              tempElement.appendChild(firstChild.firstChild);
            }
            if (firstChild.nodeName !== "BR") { tempElement.appendChild(this.doc.createElement('br')); }
            tempElements.removeChild(firstChild);
          } else {
            tempElement.appendChild(firstChild);
          }
        }
      } else {
        tempElement = null;
      }

      return tempElement;
    },

    /**
     * Scroll the current caret position into the view
     * FIXME: This is a bit hacky, there might be a smarter way of doing this
     *
     * @example
     *    selection.scrollIntoView();
     */
    scrollIntoView: function() {
      var doc           = this.doc,
          tolerance     = 5, // px
          hasScrollBars = doc.documentElement.scrollHeight > doc.documentElement.offsetHeight,
          tempElement   = doc._wysihtml5ScrollIntoViewElement = doc._wysihtml5ScrollIntoViewElement || (function() {
            var element = doc.createElement("span");
            // The element needs content in order to be able to calculate it's position properly
            element.innerHTML = wysihtml5.INVISIBLE_SPACE;
            return element;
          })(),
          offsetTop;

      if (hasScrollBars) {
        this.insertNode(tempElement);
        offsetTop = _getCumulativeOffsetTop(tempElement);
        tempElement.parentNode.removeChild(tempElement);
        if (offsetTop >= (doc.body.scrollTop + doc.documentElement.offsetHeight - tolerance)) {
          doc.body.scrollTop = offsetTop;
        }
      }
    },

    /**
     * Select line where the caret is in
     */
    selectLine: function() {
      if (wysihtml5.browser.supportsSelectionModify()) {
        this._selectLine_W3C();
      } else if (this.doc.selection) {
        this._selectLine_MSIE();
      }
    },

    /**
     * See https://developer.mozilla.org/en/DOM/Selection/modify
     */
    _selectLine_W3C: function() {
      var win       = this.doc.defaultView,
          selection = win.getSelection();
      selection.modify("move", "left", "lineboundary");
      selection.modify("extend", "right", "lineboundary");
    },

    _selectLine_MSIE: function() {
      var range       = this.doc.selection.createRange(),
          rangeTop    = range.boundingTop,
          scrollWidth = this.doc.body.scrollWidth,
          rangeBottom,
          rangeEnd,
          measureNode,
          i,
          j;

      if (!range.moveToPoint) {
        return;
      }

      if (rangeTop === 0) {
        // Don't know why, but when the selection ends at the end of a line
        // range.boundingTop is 0
        measureNode = this.doc.createElement("span");
        this.insertNode(measureNode);
        rangeTop = measureNode.offsetTop;
        measureNode.parentNode.removeChild(measureNode);
      }

      rangeTop += 1;

      for (i=-10; i<scrollWidth; i+=2) {
        try {
          range.moveToPoint(i, rangeTop);
          break;
        } catch(e1) {}
      }

      // Investigate the following in order to handle multi line selections
      // rangeBottom = rangeTop + (rangeHeight ? (rangeHeight - 1) : 0);
      rangeBottom = rangeTop;
      rangeEnd = this.doc.selection.createRange();
      for (j=scrollWidth; j>=0; j--) {
        try {
          rangeEnd.moveToPoint(j, rangeBottom);
          break;
        } catch(e2) {}
      }

      range.setEndPoint("EndToEnd", rangeEnd);
      range.select();
    },

    getText: function() {
      var selection = this.getSelection();
      return selection ? selection.toString() : "";
    },

    getNodes: function(nodeType, filter) {
      var range = this.getRange();
      if (range) {
        return range.getNodes([nodeType], filter);
      } else {
        return [];
      }
    },

    fixRangeOverflow: function(range) {
      if (this.contain && this.contain.firstChild && range) {
        var containment = range.compareNode(this.contain);
        if (containment !== 2) {
          if (containment === 1) {
            range.setStartBefore(this.contain.firstChild);
          }
          if (containment === 0) {
            range.setEndAfter(this.contain.lastChild);
          }
          if (containment === 3) {
            range.setStartBefore(this.contain.firstChild);
            range.setEndAfter(this.contain.lastChild);
          }
        } else if (this._detectInlineRangeProblems(range)) {
          var previousElementSibling = range.endContainer.previousElementSibling;
          if (previousElementSibling) {
            range.setEnd(previousElementSibling, this._endOffsetForNode(previousElementSibling));
          }
        }
      }
    },

    _endOffsetForNode: function(node) {
      var range = document.createRange();
      range.selectNodeContents(node);
      return range.endOffset;
    },

    _detectInlineRangeProblems: function(range) {
      var position = dom.compareDocumentPosition(range.startContainer, range.endContainer);
      return (
        range.endOffset == 0 &&
        position & 4 //Node.DOCUMENT_POSITION_FOLLOWING
      );
    },

    getRange: function(dontFix) {
      var selection = this.getSelection(),
          range = selection && selection.rangeCount && selection.getRangeAt(0);

      if (dontFix !== true) {
        this.fixRangeOverflow(range);
      }

      return range;
    },

    getOwnUneditables: function() {
      var allUneditables = dom.query(this.contain, '.' + this.unselectableClass),
          deepUneditables = dom.query(allUneditables, '.' + this.unselectableClass);

      return wysihtml5.lang.array(allUneditables).without(deepUneditables);
    },

    // Returns an array of ranges that belong only to this editable
    // Needed as uneditable block in contenteditabel can split range into pieces
    // If manipulating content reverse loop is usually needed as manipulation can shift subsequent ranges
    getOwnRanges: function()  {
      var ranges = [],
          r = this.getRange(),
          tmpRanges;

      if (r) { ranges.push(r); }

      if (this.unselectableClass && this.contain && r) {
          var uneditables = this.getOwnUneditables(),
              tmpRange;
          if (uneditables.length > 0) {
            for (var i = 0, imax = uneditables.length; i < imax; i++) {
              tmpRanges = [];
              for (var j = 0, jmax = ranges.length; j < jmax; j++) {
                if (ranges[j]) {
                  switch (ranges[j].compareNode(uneditables[i])) {
                    case 2:
                      // all selection inside uneditable. remove
                    break;
                    case 3:
                      //section begins before and ends after uneditable. spilt
                      tmpRange = ranges[j].cloneRange();
                      tmpRange.setEndBefore(uneditables[i]);
                      tmpRanges.push(tmpRange);

                      tmpRange = ranges[j].cloneRange();
                      tmpRange.setStartAfter(uneditables[i]);
                      tmpRanges.push(tmpRange);
                    break;
                    default:
                      // in all other cases uneditable does not touch selection. dont modify
                      tmpRanges.push(ranges[j]);
                  }
                }
                ranges = tmpRanges;
              }
            }
          }
      }
      return ranges;
    },

    getSelection: function() {
      return rangy.getSelection(this.doc.defaultView || this.doc.parentWindow);
    },

    setSelection: function(range) {
      var win       = this.doc.defaultView || this.doc.parentWindow,
          selection = rangy.getSelection(win);
      return selection.setSingleRange(range);
    },

    createRange: function() {
      return rangy.createRange(this.doc);
    },

    isCollapsed: function() {
        return this.getSelection().isCollapsed;
    },

    getHtml: function() {
      return this.getSelection().toHtml();
    },

    isEndToEndInNode: function(nodeNames) {
      var range = this.getRange(),
          parentElement = range.commonAncestorContainer,
          startNode = range.startContainer,
          endNode = range.endContainer;


        if (parentElement.nodeType === wysihtml5.TEXT_NODE) {
          parentElement = parentElement.parentNode;
        }

        if (startNode.nodeType === wysihtml5.TEXT_NODE && !(/^\s*$/).test(startNode.data.substr(range.startOffset))) {
          return false;
        }

        if (endNode.nodeType === wysihtml5.TEXT_NODE && !(/^\s*$/).test(endNode.data.substr(range.endOffset))) {
          return false;
        }

        while (startNode && startNode !== parentElement) {
          if (startNode.nodeType !== wysihtml5.TEXT_NODE && !wysihtml5.dom.contains(parentElement, startNode)) {
            return false;
          }
          if (wysihtml5.dom.domNode(startNode).prev({ignoreBlankTexts: true})) {
            return false;
          }
          startNode = startNode.parentNode;
        }

        while (endNode && endNode !== parentElement) {
          if (endNode.nodeType !== wysihtml5.TEXT_NODE && !wysihtml5.dom.contains(parentElement, endNode)) {
            return false;
          }
          if (wysihtml5.dom.domNode(endNode).next({ignoreBlankTexts: true})) {
            return false;
          }
          endNode = endNode.parentNode;
        }

        return (wysihtml5.lang.array(nodeNames).contains(parentElement.nodeName)) ? parentElement : false;
    },

    deselect: function() {
      var sel = this.getSelection();
      sel && sel.removeAllRanges();
    }
  });

})(wysihtml5);
;/**
 * Inspired by the rangy CSS Applier module written by Tim Down and licensed under the MIT license.
 * http://code.google.com/p/rangy/
 *
 * changed in order to be able ...
 *    - to use custom tags
 *    - to detect and replace similar css classes via reg exp
 */
(function(wysihtml5, rangy) {
  var defaultTagName = "span";

  var REG_EXP_WHITE_SPACE = /\s+/g;

  function hasClass(el, cssClass, regExp) {
    if (!el.className) {
      return false;
    }

    var matchingClassNames = el.className.match(regExp) || [];
    return matchingClassNames[matchingClassNames.length - 1] === cssClass;
  }

  function hasStyleAttr(el, regExp) {
    if (!el.getAttribute || !el.getAttribute('style')) {
      return false;
    }
    var matchingStyles = el.getAttribute('style').match(regExp);
    return  (el.getAttribute('style').match(regExp)) ? true : false;
  }

  function addStyle(el, cssStyle, regExp) {
    if (el.getAttribute('style')) {
      removeStyle(el, regExp);
      if (el.getAttribute('style') && !(/^\s*$/).test(el.getAttribute('style'))) {
        el.setAttribute('style', cssStyle + ";" + el.getAttribute('style'));
      } else {
        el.setAttribute('style', cssStyle);
      }
    } else {
      el.setAttribute('style', cssStyle);
    }
  }

  function addClass(el, cssClass, regExp) {
    if (el.className) {
      removeClass(el, regExp);
      el.className += " " + cssClass;
    } else {
      el.className = cssClass;
    }
  }

  function removeClass(el, regExp) {
    if (el.className) {
      el.className = el.className.replace(regExp, "");
    }
  }

  function removeStyle(el, regExp) {
    var s,
        s2 = [];
    if (el.getAttribute('style')) {
      s = el.getAttribute('style').split(';');
      for (var i = s.length; i--;) {
        if (!s[i].match(regExp) && !(/^\s*$/).test(s[i])) {
          s2.push(s[i]);
        }
      }
      if (s2.length) {
        el.setAttribute('style', s2.join(';'));
      } else {
        el.removeAttribute('style');
      }
    }
  }

  function getMatchingStyleRegexp(el, style) {
    var regexes = [],
        sSplit = style.split(';'),
        elStyle = el.getAttribute('style');

    if (elStyle) {
      elStyle = elStyle.replace(/\s/gi, '').toLowerCase();
      regexes.push(new RegExp("(^|\\s|;)" + style.replace(/\s/gi, '').replace(/([\(\)])/gi, "\\$1").toLowerCase().replace(";", ";?").replace(/rgb\\\((\d+),(\d+),(\d+)\\\)/gi, "\\s?rgb\\($1,\\s?$2,\\s?$3\\)"), "gi"));

      for (var i = sSplit.length; i-- > 0;) {
        if (!(/^\s*$/).test(sSplit[i])) {
          regexes.push(new RegExp("(^|\\s|;)" + sSplit[i].replace(/\s/gi, '').replace(/([\(\)])/gi, "\\$1").toLowerCase().replace(";", ";?").replace(/rgb\\\((\d+),(\d+),(\d+)\\\)/gi, "\\s?rgb\\($1,\\s?$2,\\s?$3\\)"), "gi"));
        }
      }
      for (var j = 0, jmax = regexes.length; j < jmax; j++) {
        if (elStyle.match(regexes[j])) {
          return regexes[j];
        }
      }
    }

    return false;
  }

  function isMatchingAllready(node, tags, style, className) {
    if (style) {
      return getMatchingStyleRegexp(node, style);
    } else if (className) {
      return wysihtml5.dom.hasClass(node, className);
    } else {
      return rangy.dom.arrayContains(tags, node.tagName.toLowerCase());
    }
  }

  function areMatchingAllready(nodes, tags, style, className) {
    for (var i = nodes.length; i--;) {
      if (!isMatchingAllready(nodes[i], tags, style, className)) {
        return false;
      }
    }
    return nodes.length ? true : false;
  }

  function removeOrChangeStyle(el, style, regExp) {

    var exactRegex = getMatchingStyleRegexp(el, style);
    if (exactRegex) {
      // adding same style value on property again removes style
      removeStyle(el, exactRegex);
      return "remove";
    } else {
      // adding new style value changes value
      addStyle(el, style, regExp);
      return "change";
    }
  }

  function hasSameClasses(el1, el2) {
    return el1.className.replace(REG_EXP_WHITE_SPACE, " ") == el2.className.replace(REG_EXP_WHITE_SPACE, " ");
  }

  function replaceWithOwnChildren(el) {
    var parent = el.parentNode;
    while (el.firstChild) {
      parent.insertBefore(el.firstChild, el);
    }
    parent.removeChild(el);
  }

  function elementsHaveSameNonClassAttributes(el1, el2) {
    if (el1.attributes.length != el2.attributes.length) {
      return false;
    }
    for (var i = 0, len = el1.attributes.length, attr1, attr2, name; i < len; ++i) {
      attr1 = el1.attributes[i];
      name = attr1.name;
      if (name != "class") {
        attr2 = el2.attributes.getNamedItem(name);
        if (attr1.specified != attr2.specified) {
          return false;
        }
        if (attr1.specified && attr1.nodeValue !== attr2.nodeValue) {
          return false;
        }
      }
    }
    return true;
  }

  function isSplitPoint(node, offset) {
    if (rangy.dom.isCharacterDataNode(node)) {
      if (offset == 0) {
        return !!node.previousSibling;
      } else if (offset == node.length) {
        return !!node.nextSibling;
      } else {
        return true;
      }
    }

    return offset > 0 && offset < node.childNodes.length;
  }

  function splitNodeAt(node, descendantNode, descendantOffset, container) {
    var newNode;
    if (rangy.dom.isCharacterDataNode(descendantNode)) {
      if (descendantOffset == 0) {
        descendantOffset = rangy.dom.getNodeIndex(descendantNode);
        descendantNode = descendantNode.parentNode;
      } else if (descendantOffset == descendantNode.length) {
        descendantOffset = rangy.dom.getNodeIndex(descendantNode) + 1;
        descendantNode = descendantNode.parentNode;
      } else {
        newNode = rangy.dom.splitDataNode(descendantNode, descendantOffset);
      }
    }
    if (!newNode) {
      if (!container || descendantNode !== container) {

        newNode = descendantNode.cloneNode(false);
        if (newNode.id) {
          newNode.removeAttribute("id");
        }
        var child;
        while ((child = descendantNode.childNodes[descendantOffset])) {
          newNode.appendChild(child);
        }
        rangy.dom.insertAfter(newNode, descendantNode);

      }
    }
    return (descendantNode == node) ? newNode :  splitNodeAt(node, newNode.parentNode, rangy.dom.getNodeIndex(newNode), container);
  }

  function Merge(firstNode) {
    this.isElementMerge = (firstNode.nodeType == wysihtml5.ELEMENT_NODE);
    this.firstTextNode = this.isElementMerge ? firstNode.lastChild : firstNode;
    this.textNodes = [this.firstTextNode];
  }

  Merge.prototype = {
    doMerge: function() {
      var textBits = [], textNode, parent, text;
      for (var i = 0, len = this.textNodes.length; i < len; ++i) {
        textNode = this.textNodes[i];
        parent = textNode.parentNode;
        textBits[i] = textNode.data;
        if (i) {
          parent.removeChild(textNode);
          if (!parent.hasChildNodes()) {
            parent.parentNode.removeChild(parent);
          }
        }
      }
      this.firstTextNode.data = text = textBits.join("");
      return text;
    },

    getLength: function() {
      var i = this.textNodes.length, len = 0;
      while (i--) {
        len += this.textNodes[i].length;
      }
      return len;
    },

    toString: function() {
      var textBits = [];
      for (var i = 0, len = this.textNodes.length; i < len; ++i) {
        textBits[i] = "'" + this.textNodes[i].data + "'";
      }
      return "[Merge(" + textBits.join(",") + ")]";
    }
  };

  function HTMLApplier(tagNames, cssClass, similarClassRegExp, normalize, cssStyle, similarStyleRegExp, container) {
    this.tagNames = tagNames || [defaultTagName];
    this.cssClass = cssClass || ((cssClass === false) ? false : "");
    this.similarClassRegExp = similarClassRegExp;
    this.cssStyle = cssStyle || "";
    this.similarStyleRegExp = similarStyleRegExp;
    this.normalize = normalize;
    this.applyToAnyTagName = false;
    this.container = container;
  }

  HTMLApplier.prototype = {
    getAncestorWithClass: function(node) {
      var cssClassMatch;
      while (node) {
        cssClassMatch = this.cssClass ? hasClass(node, this.cssClass, this.similarClassRegExp) : (this.cssStyle !== "") ? false : true;
        if (node.nodeType == wysihtml5.ELEMENT_NODE && node.getAttribute("contenteditable") != "false" &&  rangy.dom.arrayContains(this.tagNames, node.tagName.toLowerCase()) && cssClassMatch) {
          return node;
        }
        node = node.parentNode;
      }
      return false;
    },

    // returns parents of node with given style attribute
    getAncestorWithStyle: function(node) {
      var cssStyleMatch;
      while (node) {
        cssStyleMatch = this.cssStyle ? hasStyleAttr(node, this.similarStyleRegExp) : false;

        if (node.nodeType == wysihtml5.ELEMENT_NODE && node.getAttribute("contenteditable") != "false" && rangy.dom.arrayContains(this.tagNames, node.tagName.toLowerCase()) && cssStyleMatch) {
          return node;
        }
        node = node.parentNode;
      }
      return false;
    },

    getMatchingAncestor: function(node) {
      var ancestor = this.getAncestorWithClass(node),
          matchType = false;

      if (!ancestor) {
        ancestor = this.getAncestorWithStyle(node);
        if (ancestor) {
          matchType = "style";
        }
      } else {
        if (this.cssStyle) {
          matchType = "class";
        }
      }

      return {
        "element": ancestor,
        "type": matchType
      };
    },

    // Normalizes nodes after applying a CSS class to a Range.
    postApply: function(textNodes, range) {
      var firstNode = textNodes[0], lastNode = textNodes[textNodes.length - 1];

      var merges = [], currentMerge;

      var rangeStartNode = firstNode, rangeEndNode = lastNode;
      var rangeStartOffset = 0, rangeEndOffset = lastNode.length;

      var textNode, precedingTextNode;

      for (var i = 0, len = textNodes.length; i < len; ++i) {
        textNode = textNodes[i];
        precedingTextNode = null;
        if (textNode && textNode.parentNode) {
          precedingTextNode = this.getAdjacentMergeableTextNode(textNode.parentNode, false);
        }
        if (precedingTextNode) {
          if (!currentMerge) {
            currentMerge = new Merge(precedingTextNode);
            merges.push(currentMerge);
          }
          currentMerge.textNodes.push(textNode);
          if (textNode === firstNode) {
            rangeStartNode = currentMerge.firstTextNode;
            rangeStartOffset = rangeStartNode.length;
          }
          if (textNode === lastNode) {
            rangeEndNode = currentMerge.firstTextNode;
            rangeEndOffset = currentMerge.getLength();
          }
        } else {
          currentMerge = null;
        }
      }
      // Test whether the first node after the range needs merging
      if(lastNode && lastNode.parentNode) {
        var nextTextNode = this.getAdjacentMergeableTextNode(lastNode.parentNode, true);
        if (nextTextNode) {
          if (!currentMerge) {
            currentMerge = new Merge(lastNode);
            merges.push(currentMerge);
          }
          currentMerge.textNodes.push(nextTextNode);
        }
      }
      // Do the merges
      if (merges.length) {
        for (i = 0, len = merges.length; i < len; ++i) {
          merges[i].doMerge();
        }
        // Set the range boundaries
        range.setStart(rangeStartNode, rangeStartOffset);
        range.setEnd(rangeEndNode, rangeEndOffset);
      }
    },

    getAdjacentMergeableTextNode: function(node, forward) {
        var isTextNode = (node.nodeType == wysihtml5.TEXT_NODE);
        var el = isTextNode ? node.parentNode : node;
        var adjacentNode;
        var propName = forward ? "nextSibling" : "previousSibling";
        if (isTextNode) {
          // Can merge if the node's previous/next sibling is a text node
          adjacentNode = node[propName];
          if (adjacentNode && adjacentNode.nodeType == wysihtml5.TEXT_NODE) {
            return adjacentNode;
          }
        } else {
          // Compare element with its sibling
          adjacentNode = el[propName];
          if (adjacentNode && this.areElementsMergeable(node, adjacentNode)) {
            return adjacentNode[forward ? "firstChild" : "lastChild"];
          }
        }
        return null;
    },

    areElementsMergeable: function(el1, el2) {
      return rangy.dom.arrayContains(this.tagNames, (el1.tagName || "").toLowerCase())
        && rangy.dom.arrayContains(this.tagNames, (el2.tagName || "").toLowerCase())
        && hasSameClasses(el1, el2)
        && elementsHaveSameNonClassAttributes(el1, el2);
    },

    createContainer: function(doc) {
      var el = doc.createElement(this.tagNames[0]);
      if (this.cssClass) {
        el.className = this.cssClass;
      }
      if (this.cssStyle) {
        el.setAttribute('style', this.cssStyle);
      }
      return el;
    },

    applyToTextNode: function(textNode) {
      var parent = textNode.parentNode;
      if (parent.childNodes.length == 1 && rangy.dom.arrayContains(this.tagNames, parent.tagName.toLowerCase())) {

        if (this.cssClass) {
          addClass(parent, this.cssClass, this.similarClassRegExp);
        }
        if (this.cssStyle) {
          addStyle(parent, this.cssStyle, this.similarStyleRegExp);
        }
      } else {
        var el = this.createContainer(rangy.dom.getDocument(textNode));
        textNode.parentNode.insertBefore(el, textNode);
        el.appendChild(textNode);
      }
    },

    isRemovable: function(el) {
      return rangy.dom.arrayContains(this.tagNames, el.tagName.toLowerCase()) &&
              wysihtml5.lang.string(el.className).trim() === "" &&
              (
                !el.getAttribute('style') ||
                wysihtml5.lang.string(el.getAttribute('style')).trim() === ""
              );
    },

    undoToTextNode: function(textNode, range, ancestorWithClass, ancestorWithStyle) {
      var styleMode = (ancestorWithClass) ? false : true,
          ancestor = ancestorWithClass || ancestorWithStyle,
          styleChanged = false;
      if (!range.containsNode(ancestor)) {
        // Split out the portion of the ancestor from which we can remove the CSS class
        var ancestorRange = range.cloneRange();
            ancestorRange.selectNode(ancestor);

        if (ancestorRange.isPointInRange(range.endContainer, range.endOffset) && isSplitPoint(range.endContainer, range.endOffset)) {
            splitNodeAt(ancestor, range.endContainer, range.endOffset, this.container);
            range.setEndAfter(ancestor);
        }
        if (ancestorRange.isPointInRange(range.startContainer, range.startOffset) && isSplitPoint(range.startContainer, range.startOffset)) {
            ancestor = splitNodeAt(ancestor, range.startContainer, range.startOffset, this.container);
        }
      }

      if (!styleMode && this.similarClassRegExp) {
        removeClass(ancestor, this.similarClassRegExp);
      }

      if (styleMode && this.similarStyleRegExp) {
        styleChanged = (removeOrChangeStyle(ancestor, this.cssStyle, this.similarStyleRegExp) === "change");
      }
      if (this.isRemovable(ancestor) && !styleChanged) {
        replaceWithOwnChildren(ancestor);
      }
    },

    applyToRange: function(range) {
        var textNodes;
        for (var ri = range.length; ri--;) {
            textNodes = range[ri].getNodes([wysihtml5.TEXT_NODE]);

            if (!textNodes.length) {
              try {
                var node = this.createContainer(range[ri].endContainer.ownerDocument);
                range[ri].surroundContents(node);
                this.selectNode(range[ri], node);
                return;
              } catch(e) {}
            }

            range[ri].splitBoundaries();
            textNodes = range[ri].getNodes([wysihtml5.TEXT_NODE]);
            if (textNodes.length) {
              var textNode;

              for (var i = 0, len = textNodes.length; i < len; ++i) {
                textNode = textNodes[i];
                if (!this.getMatchingAncestor(textNode).element) {
                  this.applyToTextNode(textNode);
                }
              }

              range[ri].setStart(textNodes[0], 0);
              textNode = textNodes[textNodes.length - 1];
              range[ri].setEnd(textNode, textNode.length);

              if (this.normalize) {
                this.postApply(textNodes, range[ri]);
              }
            }

        }
    },

    undoToRange: function(range) {
      var textNodes, textNode, ancestorWithClass, ancestorWithStyle, ancestor;
      for (var ri = range.length; ri--;) {

          textNodes = range[ri].getNodes([wysihtml5.TEXT_NODE]);
          if (textNodes.length) {
            range[ri].splitBoundaries();
            textNodes = range[ri].getNodes([wysihtml5.TEXT_NODE]);
          } else {
            var doc = range[ri].endContainer.ownerDocument,
                node = doc.createTextNode(wysihtml5.INVISIBLE_SPACE);
            range[ri].insertNode(node);
            range[ri].selectNode(node);
            textNodes = [node];
          }

          for (var i = 0, len = textNodes.length; i < len; ++i) {
            if (range[ri].isValid()) {
              textNode = textNodes[i];

              ancestor = this.getMatchingAncestor(textNode);
              if (ancestor.type === "style") {
                this.undoToTextNode(textNode, range[ri], false, ancestor.element);
              } else if (ancestor.element) {
                this.undoToTextNode(textNode, range[ri], ancestor.element);
              }
            }
          }

          if (len == 1) {
            this.selectNode(range[ri], textNodes[0]);
          } else {
            range[ri].setStart(textNodes[0], 0);
            textNode = textNodes[textNodes.length - 1];
            range[ri].setEnd(textNode, textNode.length);

            if (this.normalize) {
              this.postApply(textNodes, range[ri]);
            }
          }

      }
    },

    selectNode: function(range, node) {
      var isElement       = node.nodeType === wysihtml5.ELEMENT_NODE,
          canHaveHTML     = "canHaveHTML" in node ? node.canHaveHTML : true,
          content         = isElement ? node.innerHTML : node.data,
          isEmpty         = (content === "" || content === wysihtml5.INVISIBLE_SPACE);

      if (isEmpty && isElement && canHaveHTML) {
        // Make sure that caret is visible in node by inserting a zero width no breaking space
        try { node.innerHTML = wysihtml5.INVISIBLE_SPACE; } catch(e) {}
      }
      range.selectNodeContents(node);
      if (isEmpty && isElement) {
        range.collapse(false);
      } else if (isEmpty) {
        range.setStartAfter(node);
        range.setEndAfter(node);
      }
    },

    getTextSelectedByRange: function(textNode, range) {
      var textRange = range.cloneRange();
      textRange.selectNodeContents(textNode);

      var intersectionRange = textRange.intersection(range);
      var text = intersectionRange ? intersectionRange.toString() : "";
      textRange.detach();

      return text;
    },

    isAppliedToRange: function(range) {
      var ancestors = [],
          appliedType = "full",
          ancestor, styleAncestor, textNodes;

      for (var ri = range.length; ri--;) {

        textNodes = range[ri].getNodes([wysihtml5.TEXT_NODE]);
        if (!textNodes.length) {
          ancestor = this.getMatchingAncestor(range[ri].startContainer).element;

          return (ancestor) ? {
            "elements": [ancestor],
            "coverage": appliedType
          } : false;
        }

        for (var i = 0, len = textNodes.length, selectedText; i < len; ++i) {
          selectedText = this.getTextSelectedByRange(textNodes[i], range[ri]);
          ancestor = this.getMatchingAncestor(textNodes[i]).element;
          if (ancestor && selectedText != "") {
            ancestors.push(ancestor);

            if (wysihtml5.dom.getTextNodes(ancestor, true).length === 1) {
              appliedType = "full";
            } else if (appliedType === "full") {
              appliedType = "inline";
            }
          } else if (!ancestor) {
            appliedType = "partial";
          }
        }

      }

      return (ancestors.length) ? {
        "elements": ancestors,
        "coverage": appliedType
      } : false;
    },

    toggleRange: function(range) {
      var isApplied = this.isAppliedToRange(range),
          parentsExactMatch;

      if (isApplied) {
        if (isApplied.coverage === "full") {
          this.undoToRange(range);
        } else if (isApplied.coverage === "inline") {
          parentsExactMatch = areMatchingAllready(isApplied.elements, this.tagNames, this.cssStyle, this.cssClass);
          this.undoToRange(range);
          if (!parentsExactMatch) {
            this.applyToRange(range);
          }
        } else {
          // partial
          if (!areMatchingAllready(isApplied.elements, this.tagNames, this.cssStyle, this.cssClass)) {
            this.undoToRange(range);
          }
          this.applyToRange(range);
        }
      } else {
        this.applyToRange(range);
      }
    }
  };

  wysihtml5.selection.HTMLApplier = HTMLApplier;

})(wysihtml5, rangy);
;/**
 * Rich Text Query/Formatting Commands
 *
 * @example
 *    var commands = new wysihtml5.Commands(editor);
 */
wysihtml5.Commands = Base.extend(
  /** @scope wysihtml5.Commands.prototype */ {
  constructor: function(editor) {
    this.editor   = editor;
    this.composer = editor.composer;
    this.doc      = this.composer.doc;
  },

  /**
   * Check whether the browser supports the given command
   *
   * @param {String} command The command string which to check (eg. "bold", "italic", "insertUnorderedList")
   * @example
   *    commands.supports("createLink");
   */
  support: function(command) {
    return wysihtml5.browser.supportsCommand(this.doc, command);
  },

  /**
   * Check whether the browser supports the given command
   *
   * @param {String} command The command string which to execute (eg. "bold", "italic", "insertUnorderedList")
   * @param {String} [value] The command value parameter, needed for some commands ("createLink", "insertImage", ...), optional for commands that don't require one ("bold", "underline", ...)
   * @example
   *    commands.exec("insertImage", "http://a1.twimg.com/profile_images/113868655/schrei_twitter_reasonably_small.jpg");
   */
  exec: function(command, value) {
    var obj     = wysihtml5.commands[command],
        args    = wysihtml5.lang.array(arguments).get(),
        method  = obj && obj.exec,
        result  = null;

    this.editor.fire("beforecommand:composer");

    if (method) {
      args.unshift(this.composer);
      result = method.apply(obj, args);
    } else {
      try {
        // try/catch for buggy firefox
        result = this.doc.execCommand(command, false, value);
      } catch(e) {}
    }

    this.editor.fire("aftercommand:composer");
    return result;
  },

  /**
   * Check whether the current command is active
   * If the caret is within a bold text, then calling this with command "bold" should return true
   *
   * @param {String} command The command string which to check (eg. "bold", "italic", "insertUnorderedList")
   * @param {String} [commandValue] The command value parameter (eg. for "insertImage" the image src)
   * @return {Boolean} Whether the command is active
   * @example
   *    var isCurrentSelectionBold = commands.state("bold");
   */
  state: function(command, commandValue) {
    var obj     = wysihtml5.commands[command],
        args    = wysihtml5.lang.array(arguments).get(),
        method  = obj && obj.state;
    if (method) {
      args.unshift(this.composer);
      return method.apply(obj, args);
    } else {
      try {
        // try/catch for buggy firefox
        return this.doc.queryCommandState(command);
      } catch(e) {
        return false;
      }
    }
  },

  /* Get command state parsed value if command has stateValue parsing function */
  stateValue: function(command) {
    var obj     = wysihtml5.commands[command],
        args    = wysihtml5.lang.array(arguments).get(),
        method  = obj && obj.stateValue;
    if (method) {
      args.unshift(this.composer);
      return method.apply(obj, args);
    } else {
      return false;
    }
  }
});
;wysihtml5.commands.bold = {
  exec: function(composer, command) {
    wysihtml5.commands.formatInline.execWithToggle(composer, command, "b");
  },

  state: function(composer, command) {
    // element.ownerDocument.queryCommandState("bold") results:
    // firefox: only <b>
    // chrome:  <b>, <strong>, <h1>, <h2>, ...
    // ie:      <b>, <strong>
    // opera:   <b>, <strong>
    return wysihtml5.commands.formatInline.state(composer, command, "b");
  }
};

;(function(wysihtml5) {
  var undef,
      NODE_NAME = "A",
      dom       = wysihtml5.dom;

  function _format(composer, attributes) {
    var doc             = composer.doc,
        tempClass       = "_wysihtml5-temp-" + (+new Date()),
        tempClassRegExp = /non-matching-class/g,
        i               = 0,
        length,
        anchors,
        anchor,
        hasElementChild,
        isEmpty,
        elementToSetCaretAfter,
        textContent,
        whiteSpace,
        j;
    wysihtml5.commands.formatInline.exec(composer, undef, NODE_NAME, tempClass, tempClassRegExp, undef, undef, true, true);
    anchors = doc.querySelectorAll(NODE_NAME + "." + tempClass);
    length  = anchors.length;
    for (; i<length; i++) {
      anchor = anchors[i];
      anchor.removeAttribute("class");
      for (j in attributes) {
        // Do not set attribute "text" as it is meant for setting string value if created link has no textual data
        if (j !== "text") {
          anchor.setAttribute(j, attributes[j]);
        }
      }
    }

    elementToSetCaretAfter = anchor;
    if (length === 1) {
      textContent = dom.getTextContent(anchor);
      hasElementChild = !!anchor.querySelector("*");
      isEmpty = textContent === "" || textContent === wysihtml5.INVISIBLE_SPACE;
      if (!hasElementChild && isEmpty) {
        dom.setTextContent(anchor, attributes.text || anchor.href);
        whiteSpace = doc.createTextNode(" ");
        composer.selection.setAfter(anchor);
        dom.insert(whiteSpace).after(anchor);
        elementToSetCaretAfter = whiteSpace;
      }
    }
    composer.selection.setAfter(elementToSetCaretAfter);
  }

  // Changes attributes of links
  function _changeLinks(composer, anchors, attributes) {
    var oldAttrs;
    for (var a = anchors.length; a--;) {

      // Remove all old attributes
      oldAttrs = anchors[a].attributes;
      for (var oa = oldAttrs.length; oa--;) {
        anchors[a].removeAttribute(oldAttrs.item(oa).name);
      }

      // Set new attributes
      for (var j in attributes) {
        if (attributes.hasOwnProperty(j)) {
          anchors[a].setAttribute(j, attributes[j]);
        }
      }

    }
  }

  wysihtml5.commands.createLink = {
    /**
     * TODO: Use HTMLApplier or formatInline here
     *
     * Turns selection into a link
     * If selection is already a link, it just changes the attributes
     *
     * @example
     *    // either ...
     *    wysihtml5.commands.createLink.exec(composer, "createLink", "http://www.google.de");
     *    // ... or ...
     *    wysihtml5.commands.createLink.exec(composer, "createLink", { href: "http://www.google.de", target: "_blank" });
     */
    exec: function(composer, command, value) {
      var anchors = this.state(composer, command);
      if (anchors) {
        // Selection contains links then change attributes of these links
        composer.selection.executeAndRestore(function() {
          _changeLinks(composer, anchors, value);
        });
      } else {
        // Create links
        value = typeof(value) === "object" ? value : { href: value };
        _format(composer, value);
      }
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatInline.state(composer, command, "A");
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var dom = wysihtml5.dom;

  function _removeFormat(composer, anchors) {
    var length  = anchors.length,
        i       = 0,
        anchor,
        codeElement,
        textContent;
    for (; i<length; i++) {
      anchor      = anchors[i];
      codeElement = dom.getParentElement(anchor, { nodeName: "code" });
      textContent = dom.getTextContent(anchor);

      // if <a> contains url-like text content, rename it to <code> to prevent re-autolinking
      // else replace <a> with its childNodes
      if (textContent.match(dom.autoLink.URL_REG_EXP) && !codeElement) {
        // <code> element is used to prevent later auto-linking of the content
        codeElement = dom.renameElement(anchor, "code");
      } else {
        dom.replaceWithChildNodes(anchor);
      }
    }
  }

  wysihtml5.commands.removeLink = {
    /*
     * If selection is a link, it removes the link and wraps it with a <code> element
     * The <code> element is needed to avoid auto linking
     *
     * @example
     *    wysihtml5.commands.createLink.exec(composer, "removeLink");
     */

    exec: function(composer, command) {
      var anchors = this.state(composer, command);
      if (anchors) {
        composer.selection.executeAndRestore(function() {
          _removeFormat(composer, anchors);
        });
      }
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatInline.state(composer, command, "A");
    }
  };
})(wysihtml5);
;/**
 * document.execCommand("fontSize") will create either inline styles (firefox, chrome) or use font tags
 * which we don't want
 * Instead we set a css class
 */
(function(wysihtml5) {
  var REG_EXP = /wysiwyg-font-size-[0-9a-z\-]+/g;

  wysihtml5.commands.fontSize = {
    exec: function(composer, command, size) {
        wysihtml5.commands.formatInline.execWithToggle(composer, command, "span", "wysiwyg-font-size-" + size, REG_EXP);
    },

    state: function(composer, command, size) {
      return wysihtml5.commands.formatInline.state(composer, command, "span", "wysiwyg-font-size-" + size, REG_EXP);
    }
  };
})(wysihtml5);
;/* In case font size adjustment to any number defined by user is preferred, we cannot use classes and must use inline styles. */
(function(wysihtml5) {
  var REG_EXP = /(\s|^)font-size\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.fontSizeStyle = {
    exec: function(composer, command, size) {
      size = (typeof(size) == "object") ? size.size : size;
      if (!(/^\s*$/).test(size)) {
        wysihtml5.commands.formatInline.execWithToggle(composer, command, "span", false, false, "font-size:" + size, REG_EXP);
      }
    },

    state: function(composer, command, size) {
      return wysihtml5.commands.formatInline.state(composer, command, "span", false, false, "font-size", REG_EXP);
    },

    stateValue: function(composer, command) {
      var st = this.state(composer, command),
          styleStr, fontsizeMatches,
          val = false;

      if (st && wysihtml5.lang.object(st).isArray()) {
          st = st[0];
      }
      if (st) {
        styleStr = st.getAttribute('style');
        if (styleStr) {
          return wysihtml5.quirks.styleParser.parseFontSize(styleStr);
        }
      }
      return false;
    }
  };
})(wysihtml5);
;/**
 * document.execCommand("foreColor") will create either inline styles (firefox, chrome) or use font tags
 * which we don't want
 * Instead we set a css class
 */
(function(wysihtml5) {
  var REG_EXP = /wysiwyg-color-[0-9a-z]+/g;

  wysihtml5.commands.foreColor = {
    exec: function(composer, command, color) {
        wysihtml5.commands.formatInline.execWithToggle(composer, command, "span", "wysiwyg-color-" + color, REG_EXP);
    },

    state: function(composer, command, color) {
      return wysihtml5.commands.formatInline.state(composer, command, "span", "wysiwyg-color-" + color, REG_EXP);
    }
  };
})(wysihtml5);
;/**
 * document.execCommand("foreColor") will create either inline styles (firefox, chrome) or use font tags
 * which we don't want
 * Instead we set a css class
 */
(function(wysihtml5) {
  var REG_EXP = /(\s|^)color\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.foreColorStyle = {
    exec: function(composer, command, color) {
      var colorVals  = wysihtml5.quirks.styleParser.parseColor((typeof(color) == "object") ? "color:" + color.color : "color:" + color, "color"),
          colString;

      if (colorVals) {
        colString = "color: rgb(" + colorVals[0] + ',' + colorVals[1] + ',' + colorVals[2] + ');';
        if (colorVals[3] !== 1) {
          colString += "color: rgba(" + colorVals[0] + ',' + colorVals[1] + ',' + colorVals[2] + ',' + colorVals[3] + ');';
        }
        wysihtml5.commands.formatInline.execWithToggle(composer, command, "span", false, false, colString, REG_EXP);
      }
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatInline.state(composer, command, "span", false, false, "color", REG_EXP);
    },

    stateValue: function(composer, command, props) {
      var st = this.state(composer, command),
          colorStr;

      if (st && wysihtml5.lang.object(st).isArray()) {
        st = st[0];
      }

      if (st) {
        colorStr = st.getAttribute('style');
        if (colorStr) {
          if (colorStr) {
            val = wysihtml5.quirks.styleParser.parseColor(colorStr, "color");
            return wysihtml5.quirks.styleParser.unparseColor(val, props);
          }
        }
      }
      return false;
    }

  };
})(wysihtml5);
;/* In case background adjustment to any color defined by user is preferred, we cannot use classes and must use inline styles. */
(function(wysihtml5) {
  var REG_EXP = /(\s|^)background-color\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.bgColorStyle = {
    exec: function(composer, command, color) {
      var colorVals  = wysihtml5.quirks.styleParser.parseColor((typeof(color) == "object") ? "background-color:" + color.color : "background-color:" + color, "background-color"),
          colString;

      if (colorVals) {
        colString = "background-color: rgb(" + colorVals[0] + ',' + colorVals[1] + ',' + colorVals[2] + ');';
        if (colorVals[3] !== 1) {
          colString += "background-color: rgba(" + colorVals[0] + ',' + colorVals[1] + ',' + colorVals[2] + ',' + colorVals[3] + ');';
        }
        wysihtml5.commands.formatInline.execWithToggle(composer, command, "span", false, false, colString, REG_EXP);
      }
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatInline.state(composer, command, "span", false, false, "background-color", REG_EXP);
    },

    stateValue: function(composer, command, props) {
      var st = this.state(composer, command),
          colorStr,
          val = false;

      if (st && wysihtml5.lang.object(st).isArray()) {
        st = st[0];
      }

      if (st) {
        colorStr = st.getAttribute('style');
        if (colorStr) {
          val = wysihtml5.quirks.styleParser.parseColor(colorStr, "background-color");
          return wysihtml5.quirks.styleParser.unparseColor(val, props);
        }
      }
      return false;
    }

  };
})(wysihtml5);
;(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
      // Following elements are grouped
      // when the caret is within a H1 and the H4 is invoked, the H1 should turn into H4
      // instead of creating a H4 within a H1 which would result in semantically invalid html
      BLOCK_ELEMENTS_GROUP    = ["H1", "H2", "H3", "H4", "H5", "H6", "P", "PRE", "DIV"];

  /**
   * Remove similiar classes (based on classRegExp)
   * and add the desired class name
   */
  function _addClass(element, className, classRegExp) {
    if (element.className) {
      _removeClass(element, classRegExp);
      element.className = wysihtml5.lang.string(element.className + " " + className).trim();
    } else {
      element.className = className;
    }
  }

  function _addStyle(element, cssStyle, styleRegExp) {
    _removeStyle(element, styleRegExp);
    if (element.getAttribute('style')) {
      element.setAttribute('style', wysihtml5.lang.string(element.getAttribute('style') + " " + cssStyle).trim());
    } else {
      element.setAttribute('style', cssStyle);
    }
  }

  function _removeClass(element, classRegExp) {
    var ret = classRegExp.test(element.className);
    element.className = element.className.replace(classRegExp, "");
    if (wysihtml5.lang.string(element.className).trim() == '') {
        element.removeAttribute('class');
    }
    return ret;
  }

  function _removeStyle(element, styleRegExp) {
    var ret = styleRegExp.test(element.getAttribute('style'));
    element.setAttribute('style', (element.getAttribute('style') || "").replace(styleRegExp, ""));
    if (wysihtml5.lang.string(element.getAttribute('style') || "").trim() == '') {
      element.removeAttribute('style');
    }
    return ret;
  }

  function _removeLastChildIfLineBreak(node) {
    var lastChild = node.lastChild;
    if (lastChild && _isLineBreak(lastChild)) {
      lastChild.parentNode.removeChild(lastChild);
    }
  }

  function _isLineBreak(node) {
    return node.nodeName === "BR";
  }

  /**
   * Execute native query command
   * and if necessary modify the inserted node's className
   */
  function _execCommand(doc, composer, command, nodeName, className) {
    var ranges = composer.selection.getOwnRanges();
    for (var i = ranges.length; i--;){
      composer.selection.getSelection().removeAllRanges();
      composer.selection.setSelection(ranges[i]);
      if (className) {
        var eventListener = dom.observe(doc, "DOMNodeInserted", function(event) {
          var target = event.target,
              displayStyle;
          if (target.nodeType !== wysihtml5.ELEMENT_NODE) {
            return;
          }
          displayStyle = dom.getStyle("display").from(target);
          if (displayStyle.substr(0, 6) !== "inline") {
            // Make sure that only block elements receive the given class
            target.className += " " + className;
          }
        });
      }
      doc.execCommand(command, false, nodeName);

      if (eventListener) {
        eventListener.stop();
      }
    }
  }

  function _selectionWrap(composer, options) {
    if (composer.selection.isCollapsed()) {
        composer.selection.selectLine();
    }

    var surroundedNodes = composer.selection.surround(options);
    for (var i = 0, imax = surroundedNodes.length; i < imax; i++) {
      wysihtml5.dom.lineBreaks(surroundedNodes[i]).remove();
      _removeLastChildIfLineBreak(surroundedNodes[i]);
    }

    // rethink restoring selection
    // composer.selection.selectNode(element, wysihtml5.browser.displaysCaretInEmptyContentEditableCorrectly());
  }

  function _hasClasses(element) {
    return !!wysihtml5.lang.string(element.className).trim();
  }

  function _hasStyles(element) {
    return !!wysihtml5.lang.string(element.getAttribute('style') || '').trim();
  }

  wysihtml5.commands.formatBlock = {
    exec: function(composer, command, nodeName, className, classRegExp, cssStyle, styleRegExp) {
      var doc             = composer.doc,
          blockElements    = this.state(composer, command, nodeName, className, classRegExp, cssStyle, styleRegExp),
          useLineBreaks   = composer.config.useLineBreaks,
          defaultNodeName = useLineBreaks ? "DIV" : "P",
          selectedNodes, classRemoveAction, blockRenameFound, styleRemoveAction, blockElement;
      nodeName = typeof(nodeName) === "string" ? nodeName.toUpperCase() : nodeName;

      if (blockElements.length) {
        composer.selection.executeAndRestoreRangy(function() {
          for (var b = blockElements.length; b--;) {
            if (classRegExp) {
              classRemoveAction = _removeClass(blockElements[b], classRegExp);
            }
            if (styleRegExp) {
              styleRemoveAction = _removeStyle(blockElements[b], styleRegExp);
            }

            if ((styleRemoveAction || classRemoveAction) && nodeName === null && blockElements[b].nodeName != defaultNodeName) {
              // dont rename or remove element when just setting block formating class or style
              return;
            }

            var hasClasses = _hasClasses(blockElements[b]),
                hasStyles = _hasStyles(blockElements[b]);

            if (!hasClasses && !hasStyles && (useLineBreaks || nodeName === "P")) {
              // Insert a line break afterwards and beforewards when there are siblings
              // that are not of type line break or block element
              wysihtml5.dom.lineBreaks(blockElements[b]).add();
              dom.replaceWithChildNodes(blockElements[b]);
            } else {
              // Make sure that styling is kept by renaming the element to a <div> or <p> and copying over the class name
              dom.renameElement(blockElements[b], nodeName === "P" ? "DIV" : defaultNodeName);
            }
          }
        });

        return;
      }

      // Find similiar block element and rename it (<h2 class="foo"></h2>  =>  <h1 class="foo"></h1>)
      if (nodeName === null || wysihtml5.lang.array(BLOCK_ELEMENTS_GROUP).contains(nodeName)) {
        selectedNodes = composer.selection.findNodesInSelection(BLOCK_ELEMENTS_GROUP).concat(composer.selection.getSelectedOwnNodes());
        composer.selection.executeAndRestoreRangy(function() {
          for (var n = selectedNodes.length; n--;) {
            blockElement = dom.getParentElement(selectedNodes[n], {
              nodeName: BLOCK_ELEMENTS_GROUP
            });
            if (blockElement == composer.element) {
              blockElement = null;
            }
            if (blockElement) {
                // Rename current block element to new block element and add class
                if (nodeName) {
                  blockElement = dom.renameElement(blockElement, nodeName);
                }
                if (className) {
                  _addClass(blockElement, className, classRegExp);
                }
                if (cssStyle) {
                  _addStyle(blockElement, cssStyle, styleRegExp);
                }
              blockRenameFound = true;
            }
          }

        });

        if (blockRenameFound) {
          return;
        }
      }

      _selectionWrap(composer, {
        "nodeName": (nodeName || defaultNodeName),
        "className": className || null,
        "cssStyle": cssStyle || null
      });
    },

    state: function(composer, command, nodeName, className, classRegExp, cssStyle, styleRegExp) {
      var nodes = composer.selection.getSelectedOwnNodes(),
          parents = [],
          parent;

      nodeName = typeof(nodeName) === "string" ? nodeName.toUpperCase() : nodeName;

      //var selectedNode = composer.selection.getSelectedNode();
      for (var i = 0, maxi = nodes.length; i < maxi; i++) {
        parent = dom.getParentElement(nodes[i], {
          nodeName:     nodeName,
          className:    className,
          classRegExp:  classRegExp,
          cssStyle:     cssStyle,
          styleRegExp:  styleRegExp
        });
        if (parent && wysihtml5.lang.array(parents).indexOf(parent) == -1) {
          parents.push(parent);
        }
      }
      if (parents.length == 0) {
        return false;
      }
      return parents;
    }


  };
})(wysihtml5);
;/* Formats block for as a <pre><code class="classname"></code></pre> block
 * Useful in conjuction for sytax highlight utility: highlight.js
 *
 * Usage:
 *
 * editorInstance.composer.commands.exec("formatCode", "language-html");
*/

wysihtml5.commands.formatCode = {

  exec: function(composer, command, classname) {
    var pre = this.state(composer),
        code, range, selectedNodes;
    if (pre) {
      // caret is already within a <pre><code>...</code></pre>
      composer.selection.executeAndRestore(function() {
        code = pre.querySelector("code");
        wysihtml5.dom.replaceWithChildNodes(pre);
        if (code) {
          wysihtml5.dom.replaceWithChildNodes(code);
        }
      });
    } else {
      // Wrap in <pre><code>...</code></pre>
      range = composer.selection.getRange();
      selectedNodes = range.extractContents();
      pre = composer.doc.createElement("pre");
      code = composer.doc.createElement("code");

      if (classname) {
        code.className = classname;
      }

      pre.appendChild(code);
      code.appendChild(selectedNodes);
      range.insertNode(pre);
      composer.selection.selectNode(pre);
    }
  },

  state: function(composer) {
    var selectedNode = composer.selection.getSelectedNode();
    if (selectedNode && selectedNode.nodeName && selectedNode.nodeName == "PRE"&&
        selectedNode.firstChild && selectedNode.firstChild.nodeName && selectedNode.firstChild.nodeName == "CODE") {
      return selectedNode;
    } else {
      return wysihtml5.dom.getParentElement(selectedNode, { nodeName: "CODE" }) && wysihtml5.dom.getParentElement(selectedNode, { nodeName: "PRE" });
    }
  }
};;/**
 * formatInline scenarios for tag "B" (| = caret, |foo| = selected text)
 *
 *   #1 caret in unformatted text:
 *      abcdefg|
 *   output:
 *      abcdefg<b>|</b>
 *
 *   #2 unformatted text selected:
 *      abc|deg|h
 *   output:
 *      abc<b>|deg|</b>h
 *
 *   #3 unformatted text selected across boundaries:
 *      ab|c <span>defg|h</span>
 *   output:
 *      ab<b>|c </b><span><b>defg</b>|h</span>
 *
 *   #4 formatted text entirely selected
 *      <b>|abc|</b>
 *   output:
 *      |abc|
 *
 *   #5 formatted text partially selected
 *      <b>ab|c|</b>
 *   output:
 *      <b>ab</b>|c|
 *
 *   #6 formatted text selected across boundaries
 *      <span>ab|c</span> <b>de|fgh</b>
 *   output:
 *      <span>ab|c</span> de|<b>fgh</b>
 */
(function(wysihtml5) {
  var // Treat <b> as <strong> and vice versa
      ALIAS_MAPPING = {
        "strong": "b",
        "em":     "i",
        "b":      "strong",
        "i":      "em"
      },
      htmlApplier = {};

  function _getTagNames(tagName) {
    var alias = ALIAS_MAPPING[tagName];
    return alias ? [tagName.toLowerCase(), alias.toLowerCase()] : [tagName.toLowerCase()];
  }

  function _getApplier(tagName, className, classRegExp, cssStyle, styleRegExp, container) {
    var identifier = tagName;
    
    if (className) {
      identifier += ":" + className;
    }
    if (cssStyle) {
      identifier += ":" + cssStyle;
    }

    if (!htmlApplier[identifier]) {
      htmlApplier[identifier] = new wysihtml5.selection.HTMLApplier(_getTagNames(tagName), className, classRegExp, true, cssStyle, styleRegExp, container);
    }

    return htmlApplier[identifier];
  }

  wysihtml5.commands.formatInline = {
    exec: function(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp, dontRestoreSelect, noCleanup) {
      var range = composer.selection.createRange(),
          ownRanges = composer.selection.getOwnRanges();

      if (!ownRanges || ownRanges.length == 0) {
        return false;
      }
      composer.selection.getSelection().removeAllRanges();

      _getApplier(tagName, className, classRegExp, cssStyle, styleRegExp, composer.element).toggleRange(ownRanges);

      if (!dontRestoreSelect) {
        range.setStart(ownRanges[0].startContainer,  ownRanges[0].startOffset);
        range.setEnd(
          ownRanges[ownRanges.length - 1].endContainer,
          ownRanges[ownRanges.length - 1].endOffset
        );
        composer.selection.setSelection(range);
        composer.selection.executeAndRestore(function() {
          if (!noCleanup) {
            composer.cleanUp();
          }
        }, true, true);
      } else if (!noCleanup) {
        composer.cleanUp();
      }
    },

    // Executes so that if collapsed caret is in a state and executing that state it should unformat that state
    // It is achieved by selecting the entire state element before executing.
    // This works on built in contenteditable inline format commands
    execWithToggle: function(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp) {
      var that = this;

      if (this.state(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp) &&
        composer.selection.isCollapsed() &&
        !composer.selection.caretIsLastInSelection() &&
        !composer.selection.caretIsFirstInSelection()
      ) {
        var state_element = that.state(composer, command, tagName, className, classRegExp)[0];
        composer.selection.executeAndRestoreRangy(function() {
          var parent = state_element.parentNode;
          composer.selection.selectNode(state_element, true);
          wysihtml5.commands.formatInline.exec(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp, true, true);
        });
      } else {
        if (this.state(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp) && !composer.selection.isCollapsed()) {
          composer.selection.executeAndRestoreRangy(function() {
            wysihtml5.commands.formatInline.exec(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp, true, true);
          });
        } else {
          wysihtml5.commands.formatInline.exec(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp);
        }
      }
    },

    state: function(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp) {
      var doc           = composer.doc,
          aliasTagName  = ALIAS_MAPPING[tagName] || tagName,
          ownRanges, isApplied;

      // Check whether the document contains a node with the desired tagName
      if (!wysihtml5.dom.hasElementWithTagName(doc, tagName) &&
          !wysihtml5.dom.hasElementWithTagName(doc, aliasTagName)) {
        return false;
      }

       // Check whether the document contains a node with the desired className
      if (className && !wysihtml5.dom.hasElementWithClassName(doc, className)) {
         return false;
      }

      ownRanges = composer.selection.getOwnRanges();

      if (!ownRanges || ownRanges.length === 0) {
        return false;
      }

      isApplied = _getApplier(tagName, className, classRegExp, cssStyle, styleRegExp, composer.element).isAppliedToRange(ownRanges);

      return (isApplied && isApplied.elements) ? isApplied.elements : false;
    }
  };
})(wysihtml5);
;(function(wysihtml5) {

  wysihtml5.commands.insertBlockQuote = {
    exec: function(composer, command) {
      var state = this.state(composer, command),
          endToEndParent = composer.selection.isEndToEndInNode(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P']),
          prevNode, nextNode;

      composer.selection.executeAndRestore(function() {
        if (state) {
          if (composer.config.useLineBreaks) {
             wysihtml5.dom.lineBreaks(state).add();
          }
          wysihtml5.dom.unwrap(state);
        } else {
          if (composer.selection.isCollapsed()) {
            composer.selection.selectLine();
          }
          
          if (endToEndParent) {
            var qouteEl = endToEndParent.ownerDocument.createElement('blockquote');
            wysihtml5.dom.insert(qouteEl).after(endToEndParent);
            qouteEl.appendChild(endToEndParent);
          } else {
            composer.selection.surround({nodeName: "blockquote"});
          }
        }
      });
    },
    state: function(composer, command) {
      var selectedNode  = composer.selection.getSelectedNode(),
          node = wysihtml5.dom.getParentElement(selectedNode, { nodeName: "BLOCKQUOTE" }, false, composer.element);

      return (node) ? node : false;
    }
  };

})(wysihtml5);;wysihtml5.commands.insertHTML = {
  exec: function(composer, command, html) {
    if (composer.commands.support(command)) {
      composer.doc.execCommand(command, false, html);
    } else {
      composer.selection.insertHTML(html);
    }
  },

  state: function() {
    return false;
  }
};
;(function(wysihtml5) {
  var NODE_NAME = "IMG";

  wysihtml5.commands.insertImage = {
    /**
     * Inserts an <img>
     * If selection is already an image link, it removes it
     *
     * @example
     *    // either ...
     *    wysihtml5.commands.insertImage.exec(composer, "insertImage", "http://www.google.de/logo.jpg");
     *    // ... or ...
     *    wysihtml5.commands.insertImage.exec(composer, "insertImage", { src: "http://www.google.de/logo.jpg", title: "foo" });
     */
    exec: function(composer, command, value) {
      value = typeof(value) === "object" ? value : { src: value };

      var doc     = composer.doc,
          image   = this.state(composer),
          textNode,
          parent;

      if (image) {
        // Image already selected, set the caret before it and delete it
        composer.selection.setBefore(image);
        parent = image.parentNode;
        parent.removeChild(image);

        // and it's parent <a> too if it hasn't got any other relevant child nodes
        wysihtml5.dom.removeEmptyTextNodes(parent);
        if (parent.nodeName === "A" && !parent.firstChild) {
          composer.selection.setAfter(parent);
          parent.parentNode.removeChild(parent);
        }

        // firefox and ie sometimes don't remove the image handles, even though the image got removed
        wysihtml5.quirks.redraw(composer.element);
        return;
      }

      image = doc.createElement(NODE_NAME);

      for (var i in value) {
        image.setAttribute(i === "className" ? "class" : i, value[i]);
      }

      composer.selection.insertNode(image);
      if (wysihtml5.browser.hasProblemsSettingCaretAfterImg()) {
        textNode = doc.createTextNode(wysihtml5.INVISIBLE_SPACE);
        composer.selection.insertNode(textNode);
        composer.selection.setAfter(textNode);
      } else {
        composer.selection.setAfter(image);
      }
    },

    state: function(composer) {
      var doc = composer.doc,
          selectedNode,
          text,
          imagesInSelection;

      if (!wysihtml5.dom.hasElementWithTagName(doc, NODE_NAME)) {
        return false;
      }

      selectedNode = composer.selection.getSelectedNode();
      if (!selectedNode) {
        return false;
      }

      if (selectedNode.nodeName === NODE_NAME) {
        // This works perfectly in IE
        return selectedNode;
      }

      if (selectedNode.nodeType !== wysihtml5.ELEMENT_NODE) {
        return false;
      }

      text = composer.selection.getText();
      text = wysihtml5.lang.string(text).trim();
      if (text) {
        return false;
      }

      imagesInSelection = composer.selection.getNodes(wysihtml5.ELEMENT_NODE, function(node) {
        return node.nodeName === "IMG";
      });

      if (imagesInSelection.length !== 1) {
        return false;
      }

      return imagesInSelection[0];
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var LINE_BREAK = "<br>" + (wysihtml5.browser.needsSpaceAfterLineBreak() ? " " : "");

  wysihtml5.commands.insertLineBreak = {
    exec: function(composer, command) {
      if (composer.commands.support(command)) {
        composer.doc.execCommand(command, false, null);
        if (!wysihtml5.browser.autoScrollsToCaret()) {
          composer.selection.scrollIntoView();
        }
      } else {
        composer.commands.exec("insertHTML", LINE_BREAK);
      }
    },

    state: function() {
      return false;
    }
  };
})(wysihtml5);
;wysihtml5.commands.insertOrderedList = {
  exec: function(composer, command) {
    wysihtml5.commands.insertList.exec(composer, command, "OL");
  },

  state: function(composer, command) {
    return wysihtml5.commands.insertList.state(composer, command, "OL");
  }
};
;wysihtml5.commands.insertUnorderedList = {
  exec: function(composer, command) {
    wysihtml5.commands.insertList.exec(composer, command, "UL");
  },

  state: function(composer, command) {
    return wysihtml5.commands.insertList.state(composer, command, "UL");
  }
};
;wysihtml5.commands.insertList = (function(wysihtml5) {

  var isNode = function(node, name) {
    if (node && node.nodeName) {
      if (typeof name === 'string') {
        name = [name];
      }
      for (var n = name.length; n--;) {
        if (node.nodeName === name[n]) {
          return true;
        }
      }
    }
    return false;
  };

  var findListEl = function(node, nodeName, composer) {
    var ret = {
          el: null,
          other: false
        };

    if (node) {
      var parentLi = wysihtml5.dom.getParentElement(node, { nodeName: "LI" }),
          otherNodeName = (nodeName === "UL") ? "OL" : "UL";

      if (isNode(node, nodeName)) {
        ret.el = node;
      } else if (isNode(node, otherNodeName)) {
        ret = {
          el: node,
          other: true
        };
      } else if (parentLi) {
        if (isNode(parentLi.parentNode, nodeName)) {
          ret.el = parentLi.parentNode;
        } else if (isNode(parentLi.parentNode, otherNodeName)) {
          ret = {
            el : parentLi.parentNode,
            other: true
          };
        }
      }
    }

    // do not count list elements outside of composer
    if (ret.el && !composer.element.contains(ret.el)) {
      ret.el = null;
    }

    return ret;
  };

  var handleSameTypeList = function(el, nodeName, composer) {
    var otherNodeName = (nodeName === "UL") ? "OL" : "UL",
        otherLists, innerLists;
    // Unwrap list
    // <ul><li>foo</li><li>bar</li></ul>
    // becomes:
    // foo<br>bar<br>
    composer.selection.executeAndRestore(function() {
      var otherLists = getListsInSelection(otherNodeName, composer);
      if (otherLists.length) {
        for (var l = otherLists.length; l--;) {
          wysihtml5.dom.renameElement(otherLists[l], nodeName.toLowerCase());
        }
      } else {
        innerLists = getListsInSelection(['OL', 'UL'], composer);
        for (var i = innerLists.length; i--;) {
          wysihtml5.dom.resolveList(innerLists[i], composer.config.useLineBreaks);
        }
        wysihtml5.dom.resolveList(el, composer.config.useLineBreaks);
      }
    });
  };

  var handleOtherTypeList =  function(el, nodeName, composer) {
    var otherNodeName = (nodeName === "UL") ? "OL" : "UL";
    // Turn an ordered list into an unordered list
    // <ol><li>foo</li><li>bar</li></ol>
    // becomes:
    // <ul><li>foo</li><li>bar</li></ul>
    // Also rename other lists in selection
    composer.selection.executeAndRestore(function() {
      var renameLists = [el].concat(getListsInSelection(otherNodeName, composer));

      // All selection inner lists get renamed too
      for (var l = renameLists.length; l--;) {
        wysihtml5.dom.renameElement(renameLists[l], nodeName.toLowerCase());
      }
    });
  };

  var getListsInSelection = function(nodeName, composer) {
      var ranges = composer.selection.getOwnRanges(),
          renameLists = [];

      for (var r = ranges.length; r--;) {
        renameLists = renameLists.concat(ranges[r].getNodes([1], function(node) {
          return isNode(node, nodeName);
        }));
      }

      return renameLists;
  };

  var createListFallback = function(nodeName, composer) {
    // Fallback for Create list
    composer.selection.executeAndRestoreRangy(function() {
      var tempClassName =  "_wysihtml5-temp-" + new Date().getTime(),
          tempElement = composer.selection.deblockAndSurround({
            "nodeName": "div",
            "className": tempClassName
          }),
          isEmpty, list;

      // This space causes new lists to never break on enter 
      var INVISIBLE_SPACE_REG_EXP = /\uFEFF/g;
      tempElement.innerHTML = tempElement.innerHTML.replace(INVISIBLE_SPACE_REG_EXP, "");
      
      if (tempElement) {
        isEmpty = wysihtml5.lang.array(["", "<br>", wysihtml5.INVISIBLE_SPACE]).contains(tempElement.innerHTML);
        list = wysihtml5.dom.convertToList(tempElement, nodeName.toLowerCase(), composer.parent.config.uneditableContainerClassname);
        if (isEmpty) {
          composer.selection.selectNode(list.querySelector("li"), true);
        }
      }
    });
  };

  return {
    exec: function(composer, command, nodeName) {
      var doc           = composer.doc,
          cmd           = (nodeName === "OL") ? "insertOrderedList" : "insertUnorderedList",
          selectedNode  = composer.selection.getSelectedNode(),
          list          = findListEl(selectedNode, nodeName, composer);

      if (!list.el) {
        if (composer.commands.support(cmd)) {
          doc.execCommand(cmd, false, null);
        } else {
          createListFallback(nodeName, composer);
        }
      } else if (list.other) {
        handleOtherTypeList(list.el, nodeName, composer);
      } else {
        handleSameTypeList(list.el, nodeName, composer);
      }
    },

    state: function(composer, command, nodeName) {
      var selectedNode = composer.selection.getSelectedNode(),
          list         = findListEl(selectedNode, nodeName, composer);

      return (list.el && !list.other) ? list.el : false;
    }
  };

})(wysihtml5);;wysihtml5.commands.italic = {
  exec: function(composer, command) {
    wysihtml5.commands.formatInline.execWithToggle(composer, command, "i");
  },

  state: function(composer, command) {
    // element.ownerDocument.queryCommandState("italic") results:
    // firefox: only <i>
    // chrome:  <i>, <em>, <blockquote>, ...
    // ie:      <i>, <em>
    // opera:   only <i>
    return wysihtml5.commands.formatInline.state(composer, command, "i");
  }
};
;(function(wysihtml5) {
  var CLASS_NAME  = "wysiwyg-text-align-center",
      REG_EXP     = /wysiwyg-text-align-[0-9a-z]+/g;

  wysihtml5.commands.justifyCenter = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var CLASS_NAME  = "wysiwyg-text-align-left",
      REG_EXP     = /wysiwyg-text-align-[0-9a-z]+/g;

  wysihtml5.commands.justifyLeft = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var CLASS_NAME  = "wysiwyg-text-align-right",
      REG_EXP     = /wysiwyg-text-align-[0-9a-z]+/g;

  wysihtml5.commands.justifyRight = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var CLASS_NAME  = "wysiwyg-text-align-justify",
      REG_EXP     = /wysiwyg-text-align-[0-9a-z]+/g;

  wysihtml5.commands.justifyFull = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var STYLE_STR  = "text-align: right;",
      REG_EXP = /(\s|^)text-align\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.alignRightStyle = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var STYLE_STR  = "text-align: left;",
      REG_EXP = /(\s|^)text-align\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.alignLeftStyle = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var STYLE_STR  = "text-align: center;",
      REG_EXP = /(\s|^)text-align\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.alignCenterStyle = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    }
  };
})(wysihtml5);
;wysihtml5.commands.redo = {
  exec: function(composer) {
    return composer.undoManager.redo();
  },

  state: function(composer) {
    return false;
  }
};
;wysihtml5.commands.underline = {
  exec: function(composer, command) {
    wysihtml5.commands.formatInline.execWithToggle(composer, command, "u");
  },

  state: function(composer, command) {
    return wysihtml5.commands.formatInline.state(composer, command, "u");
  }
};
;wysihtml5.commands.undo = {
  exec: function(composer) {
    return composer.undoManager.undo();
  },

  state: function(composer) {
    return false;
  }
};
;wysihtml5.commands.createTable = {
  exec: function(composer, command, value) {
      var col, row, html;
      if (value && value.cols && value.rows && parseInt(value.cols, 10) > 0 && parseInt(value.rows, 10) > 0) {
          if (value.tableStyle) {
            html = "<table style=\"" + value.tableStyle + "\">";
          } else {
            html = "<table>";
          }
          html += "<tbody>";
          for (row = 0; row < value.rows; row ++) {
              html += '<tr>';
              for (col = 0; col < value.cols; col ++) {
                  html += "<td>&nbsp;</td>";
              }
              html += '</tr>';
          }
          html += "</tbody></table>";
          composer.commands.exec("insertHTML", html);
          //composer.selection.insertHTML(html);
      }


  },

  state: function(composer, command) {
      return false;
  }
};
;wysihtml5.commands.mergeTableCells = {
  exec: function(composer, command) {
      if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {
          if (this.state(composer, command)) {
              wysihtml5.dom.table.unmergeCell(composer.tableSelection.start);
          } else {
              wysihtml5.dom.table.mergeCellsBetween(composer.tableSelection.start, composer.tableSelection.end);
          }
      }
  },

  state: function(composer, command) {
      if (composer.tableSelection) {
          var start = composer.tableSelection.start,
              end = composer.tableSelection.end;
          if (start && end && start == end &&
              ((
                  wysihtml5.dom.getAttribute(start, "colspan") &&
                  parseInt(wysihtml5.dom.getAttribute(start, "colspan"), 10) > 1
              ) || (
                  wysihtml5.dom.getAttribute(start, "rowspan") &&
                  parseInt(wysihtml5.dom.getAttribute(start, "rowspan"), 10) > 1
              ))
          ) {
              return [start];
          }
      }
      return false;
  }
};
;wysihtml5.commands.addTableCells = {
  exec: function(composer, command, value) {
      if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {

          // switches start and end if start is bigger than end (reverse selection)
          var tableSelect = wysihtml5.dom.table.orderSelectionEnds(composer.tableSelection.start, composer.tableSelection.end);
          if (value == "before" || value == "above") {
              wysihtml5.dom.table.addCells(tableSelect.start, value);
          } else if (value == "after" || value == "below") {
              wysihtml5.dom.table.addCells(tableSelect.end, value);
          }
          setTimeout(function() {
              composer.tableSelection.select(tableSelect.start, tableSelect.end);
          },0);
      }
  },

  state: function(composer, command) {
      return false;
  }
};
;wysihtml5.commands.deleteTableCells = {
  exec: function(composer, command, value) {
      if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {
          var tableSelect = wysihtml5.dom.table.orderSelectionEnds(composer.tableSelection.start, composer.tableSelection.end),
              idx = wysihtml5.dom.table.indexOf(tableSelect.start),
              selCell,
              table = composer.tableSelection.table;

          wysihtml5.dom.table.removeCells(tableSelect.start, value);
          setTimeout(function() {
              // move selection to next or previous if not present
              selCell = wysihtml5.dom.table.findCell(table, idx);

              if (!selCell){
                  if (value == "row") {
                      selCell = wysihtml5.dom.table.findCell(table, {
                          "row": idx.row - 1,
                          "col": idx.col
                      });
                  }

                  if (value == "column") {
                      selCell = wysihtml5.dom.table.findCell(table, {
                          "row": idx.row,
                          "col": idx.col - 1
                      });
                  }
              }
              if (selCell) {
                  composer.tableSelection.select(selCell, selCell);
              }
          }, 0);

      }
  },

  state: function(composer, command) {
      return false;
  }
};
;wysihtml5.commands.indentList = {
  exec: function(composer, command, value) {
    var listEls = composer.selection.getSelectionParentsByTag('LI');
    if (listEls) {
      return this.tryToPushLiLevel(listEls, composer.selection);
    }
    return false;
  },

  state: function(composer, command) {
      return false;
  },

  tryToPushLiLevel: function(liNodes, selection) {
    var listTag, list, prevLi, liNode, prevLiList,
        found = false;

    selection.executeAndRestoreRangy(function() {

      for (var i = liNodes.length; i--;) {
        liNode = liNodes[i];
        listTag = (liNode.parentNode.nodeName === 'OL') ? 'OL' : 'UL';
        list = liNode.ownerDocument.createElement(listTag);
        prevLi = wysihtml5.dom.domNode(liNode).prev({nodeTypes: [wysihtml5.ELEMENT_NODE]});
        prevLiList = (prevLi) ? prevLi.querySelector('ul, ol') : null;

        if (prevLi) {
          if (prevLiList) {
            prevLiList.appendChild(liNode);
          } else {
            list.appendChild(liNode);
            prevLi.appendChild(list);
          }
          found = true;
        }
      }

    });
    return found;
  }
};
;wysihtml5.commands.outdentList = {
  exec: function(composer, command, value) {
    var listEls = composer.selection.getSelectionParentsByTag('LI');
    if (listEls) {
      return this.tryToPullLiLevel(listEls, composer);
    }
    return false;
  },

  state: function(composer, command) {
      return false;
  },

  tryToPullLiLevel: function(liNodes, composer) {
    var listNode, outerListNode, outerLiNode, list, prevLi, liNode, afterList,
        found = false,
        that = this;

    composer.selection.executeAndRestoreRangy(function() {

      for (var i = liNodes.length; i--;) {
        liNode = liNodes[i];
        if (liNode.parentNode) {
          listNode = liNode.parentNode;

          if (listNode.tagName === 'OL' || listNode.tagName === 'UL') {
            found = true;

            outerListNode = wysihtml5.dom.getParentElement(listNode.parentNode, { nodeName: ['OL', 'UL']}, false, composer.element);
            outerLiNode = wysihtml5.dom.getParentElement(listNode.parentNode, { nodeName: ['LI']}, false, composer.element);

            if (outerListNode && outerLiNode) {

              if (liNode.nextSibling) {
                afterList = that.getAfterList(listNode, liNode);
                liNode.appendChild(afterList);
              }
              outerListNode.insertBefore(liNode, outerLiNode.nextSibling);

            } else {

              if (liNode.nextSibling) {
                afterList = that.getAfterList(listNode, liNode);
                liNode.appendChild(afterList);
              }

              for (var j = liNode.childNodes.length; j--;) {
                listNode.parentNode.insertBefore(liNode.childNodes[j], listNode.nextSibling);
              }

              listNode.parentNode.insertBefore(document.createElement('br'), listNode.nextSibling);
              liNode.parentNode.removeChild(liNode);

            }

            // cleanup
            if (listNode.childNodes.length === 0) {
                listNode.parentNode.removeChild(listNode);
            }
          }
        }
      }

    });
    return found;
  },

  getAfterList: function(listNode, liNode) {
    var nodeName = listNode.nodeName,
        newList = document.createElement(nodeName);

    while (liNode.nextSibling) {
      newList.appendChild(liNode.nextSibling);
    }
    return newList;
  }

};;/**
 * Undo Manager for wysihtml5
 * slightly inspired by http://rniwa.com/editing/undomanager.html#the-undomanager-interface
 */
(function(wysihtml5) {
  var Z_KEY               = 90,
      Y_KEY               = 89,
      BACKSPACE_KEY       = 8,
      DELETE_KEY          = 46,
      MAX_HISTORY_ENTRIES = 25,
      DATA_ATTR_NODE      = "data-wysihtml5-selection-node",
      DATA_ATTR_OFFSET    = "data-wysihtml5-selection-offset",
      UNDO_HTML           = '<span id="_wysihtml5-undo" class="_wysihtml5-temp">' + wysihtml5.INVISIBLE_SPACE + '</span>',
      REDO_HTML           = '<span id="_wysihtml5-redo" class="_wysihtml5-temp">' + wysihtml5.INVISIBLE_SPACE + '</span>',
      dom                 = wysihtml5.dom;

  function cleanTempElements(doc) {
    var tempElement;
    while (tempElement = doc.querySelector("._wysihtml5-temp")) {
      tempElement.parentNode.removeChild(tempElement);
    }
  }

  wysihtml5.UndoManager = wysihtml5.lang.Dispatcher.extend(
    /** @scope wysihtml5.UndoManager.prototype */ {
    constructor: function(editor) {
      this.editor = editor;
      this.composer = editor.composer;
      this.element = this.composer.element;

      this.position = 0;
      this.historyStr = [];
      this.historyDom = [];

      this.transact();

      this._observe();
    },

    _observe: function() {
      var that      = this,
          doc       = this.composer.sandbox.getDocument(),
          lastKey;

      // Catch CTRL+Z and CTRL+Y
      dom.observe(this.element, "keydown", function(event) {
        if (event.altKey || (!event.ctrlKey && !event.metaKey)) {
          return;
        }

        var keyCode = event.keyCode,
            isUndo = keyCode === Z_KEY && !event.shiftKey,
            isRedo = (keyCode === Z_KEY && event.shiftKey) || (keyCode === Y_KEY);

        if (isUndo) {
          that.undo();
          event.preventDefault();
        } else if (isRedo) {
          that.redo();
          event.preventDefault();
        }
      });

      // Catch delete and backspace
      dom.observe(this.element, "keydown", function(event) {
        var keyCode = event.keyCode;
        if (keyCode === lastKey) {
          return;
        }

        lastKey = keyCode;

        if (keyCode === BACKSPACE_KEY || keyCode === DELETE_KEY) {
          that.transact();
        }
      });

      this.editor
        .on("newword:composer", function() {
          that.transact();
        })

        .on("beforecommand:composer", function() {
          that.transact();
        });
    },

    transact: function() {
      var previousHtml      = this.historyStr[this.position - 1],
          currentHtml       = this.composer.getValue(false, false),
          composerIsVisible   = this.element.offsetWidth > 0 && this.element.offsetHeight > 0,
          range, node, offset, element, position;

      if (currentHtml === previousHtml) {
        return;
      }

      var length = this.historyStr.length = this.historyDom.length = this.position;
      if (length > MAX_HISTORY_ENTRIES) {
        this.historyStr.shift();
        this.historyDom.shift();
        this.position--;
      }

      this.position++;

      if (composerIsVisible) {
        // Do not start saving selection if composer is not visible
        range   = this.composer.selection.getRange();
        node    = (range && range.startContainer) ? range.startContainer : this.element;
        offset  = (range && range.startOffset) ? range.startOffset : 0;

        if (node.nodeType === wysihtml5.ELEMENT_NODE) {
          element = node;
        } else {
          element  = node.parentNode;
          position = this.getChildNodeIndex(element, node);
        }

        element.setAttribute(DATA_ATTR_OFFSET, offset);
        if (typeof(position) !== "undefined") {
          element.setAttribute(DATA_ATTR_NODE, position);
        }
      }

      var clone = this.element.cloneNode(!!currentHtml);
      this.historyDom.push(clone);
      this.historyStr.push(currentHtml);

      if (element) {
        element.removeAttribute(DATA_ATTR_OFFSET);
        element.removeAttribute(DATA_ATTR_NODE);
      }

    },

    undo: function() {
      this.transact();

      if (!this.undoPossible()) {
        return;
      }

      this.set(this.historyDom[--this.position - 1]);
      this.editor.fire("undo:composer");
    },

    redo: function() {
      if (!this.redoPossible()) {
        return;
      }

      this.set(this.historyDom[++this.position - 1]);
      this.editor.fire("redo:composer");
    },

    undoPossible: function() {
      return this.position > 1;
    },

    redoPossible: function() {
      return this.position < this.historyStr.length;
    },

    set: function(historyEntry) {
      this.element.innerHTML = "";

      var i = 0,
          childNodes = historyEntry.childNodes,
          length = historyEntry.childNodes.length;

      for (; i<length; i++) {
        this.element.appendChild(childNodes[i].cloneNode(true));
      }

      // Restore selection
      var offset,
          node,
          position;

      if (historyEntry.hasAttribute(DATA_ATTR_OFFSET)) {
        offset    = historyEntry.getAttribute(DATA_ATTR_OFFSET);
        position  = historyEntry.getAttribute(DATA_ATTR_NODE);
        node      = this.element;
      } else {
        node      = this.element.querySelector("[" + DATA_ATTR_OFFSET + "]") || this.element;
        offset    = node.getAttribute(DATA_ATTR_OFFSET);
        position  = node.getAttribute(DATA_ATTR_NODE);
        node.removeAttribute(DATA_ATTR_OFFSET);
        node.removeAttribute(DATA_ATTR_NODE);
      }

      if (position !== null) {
        node = this.getChildNodeByIndex(node, +position);
      }

      this.composer.selection.set(node, offset);
    },

    getChildNodeIndex: function(parent, child) {
      var i           = 0,
          childNodes  = parent.childNodes,
          length      = childNodes.length;
      for (; i<length; i++) {
        if (childNodes[i] === child) {
          return i;
        }
      }
    },

    getChildNodeByIndex: function(parent, index) {
      return parent.childNodes[index];
    }
  });
})(wysihtml5);
;/**
 * TODO: the following methods still need unit test coverage
 */
wysihtml5.views.View = Base.extend(
  /** @scope wysihtml5.views.View.prototype */ {
  constructor: function(parent, textareaElement, config) {
    this.parent   = parent;
    this.element  = textareaElement;
    this.config   = config;
    if (!this.config.noTextarea) {
        this._observeViewChange();
    }
  },

  _observeViewChange: function() {
    var that = this;
    this.parent.on("beforeload", function() {
      that.parent.on("change_view", function(view) {
        if (view === that.name) {
          that.parent.currentView = that;
          that.show();
          // Using tiny delay here to make sure that the placeholder is set before focusing
          setTimeout(function() { that.focus(); }, 0);
        } else {
          that.hide();
        }
      });
    });
  },

  focus: function() {
    if (this.element.ownerDocument.querySelector(":focus") === this.element) {
      return;
    }

    try { this.element.focus(); } catch(e) {}
  },

  hide: function() {
    this.element.style.display = "none";
  },

  show: function() {
    this.element.style.display = "";
  },

  disable: function() {
    this.element.setAttribute("disabled", "disabled");
  },

  enable: function() {
    this.element.removeAttribute("disabled");
  }
});
;(function(wysihtml5) {
  var dom       = wysihtml5.dom,
      browser   = wysihtml5.browser;

  wysihtml5.views.Composer = wysihtml5.views.View.extend(
    /** @scope wysihtml5.views.Composer.prototype */ {
    name: "composer",

    // Needed for firefox in order to display a proper caret in an empty contentEditable
    CARET_HACK: "<br>",

    constructor: function(parent, editableElement, config) {
      this.base(parent, editableElement, config);
      if (!this.config.noTextarea) {
          this.textarea = this.parent.textarea;
      } else {
          this.editableArea = editableElement;
      }
      if (this.config.contentEditableMode) {
          this._initContentEditableArea();
      } else {
          this._initSandbox();
      }
    },

    clear: function() {
      this.element.innerHTML = browser.displaysCaretInEmptyContentEditableCorrectly() ? "" : this.CARET_HACK;
    },

    getValue: function(parse, clearInternals) {
      var value = this.isEmpty() ? "" : wysihtml5.quirks.getCorrectInnerHTML(this.element);
      if (parse !== false) {
        value = this.parent.parse(value, (clearInternals === false) ? false : true);
      }

      return value;
    },

    setValue: function(html, parse) {
      if (parse) {
        html = this.parent.parse(html);
      }

      try {
        this.element.innerHTML = html;
      } catch (e) {
        this.element.innerText = html;
      }
    },

    cleanUp: function() {
        this.parent.parse(this.element);
    },

    show: function() {
      this.editableArea.style.display = this._displayStyle || "";

      if (!this.config.noTextarea && !this.textarea.element.disabled) {
        // Firefox needs this, otherwise contentEditable becomes uneditable
        this.disable();
        this.enable();
      }
    },

    hide: function() {
      this._displayStyle = dom.getStyle("display").from(this.editableArea);
      if (this._displayStyle === "none") {
        this._displayStyle = null;
      }
      this.editableArea.style.display = "none";
    },

    disable: function() {
      this.parent.fire("disable:composer");
      this.element.removeAttribute("contentEditable");
    },

    enable: function() {
      this.parent.fire("enable:composer");
      this.element.setAttribute("contentEditable", "true");
    },

    focus: function(setToEnd) {
      // IE 8 fires the focus event after .focus()
      // This is needed by our simulate_placeholder.js to work
      // therefore we clear it ourselves this time
      if (wysihtml5.browser.doesAsyncFocus() && this.hasPlaceholderSet()) {
        this.clear();
      }

      this.base();

      var lastChild = this.element.lastChild;
      if (setToEnd && lastChild && this.selection) {
        if (lastChild.nodeName === "BR") {
          this.selection.setBefore(this.element.lastChild);
        } else {
          this.selection.setAfter(this.element.lastChild);
        }
      }
    },

    getTextContent: function() {
      return dom.getTextContent(this.element);
    },

    hasPlaceholderSet: function() {
      return this.getTextContent() == ((this.config.noTextarea) ? this.editableArea.getAttribute("data-placeholder") : this.textarea.element.getAttribute("placeholder")) && this.placeholderSet;
    },

    isEmpty: function() {
      var innerHTML = this.element.innerHTML.toLowerCase();
      return (/^(\s|<br>|<\/br>|<p>|<\/p>)*$/i).test(innerHTML)  ||
             innerHTML === ""            ||
             innerHTML === "<br>"        ||
             innerHTML === "<p></p>"     ||
             innerHTML === "<p><br></p>" ||
             this.hasPlaceholderSet();
    },

    _initContentEditableArea: function() {
        var that = this;

        if (this.config.noTextarea) {
            this.sandbox = new dom.ContentEditableArea(function() {
                that._create();
            }, {}, this.editableArea);
        } else {
            this.sandbox = new dom.ContentEditableArea(function() {
                that._create();
            });
            this.editableArea = this.sandbox.getContentEditable();
            dom.insert(this.editableArea).after(this.textarea.element);
            this._createWysiwygFormField();
        }
    },

    _initSandbox: function() {
      var that = this;

      this.sandbox = new dom.Sandbox(function() {
        that._create();
      }, {
        stylesheets:  this.config.stylesheets
      });
      this.editableArea  = this.sandbox.getIframe();

      var textareaElement = this.textarea.element;
      dom.insert(this.editableArea).after(textareaElement);

      this._createWysiwygFormField();
    },

    // Creates hidden field which tells the server after submit, that the user used an wysiwyg editor
    _createWysiwygFormField: function() {
        if (this.textarea.element.form) {
          var hiddenField = document.createElement("input");
          hiddenField.type   = "hidden";
          hiddenField.name   = "_wysihtml5_mode";
          hiddenField.value  = 1;
          dom.insert(hiddenField).after(this.textarea.element);
        }
    },

    _create: function() {
      var that = this;
      this.doc                = this.sandbox.getDocument();
      this.element            = (this.config.contentEditableMode) ? this.sandbox.getContentEditable() : this.doc.body;
      if (!this.config.noTextarea) {
          this.textarea           = this.parent.textarea;
          this.element.innerHTML  = this.textarea.getValue(true, false);
      } else {
          this.cleanUp(); // cleans contenteditable on initiation as it may contain html
      }

      // Make sure our selection handler is ready
      this.selection = new wysihtml5.Selection(this.parent, this.element, this.config.uneditableContainerClassname);

      // Make sure commands dispatcher is ready
      this.commands  = new wysihtml5.Commands(this.parent);

      if (!this.config.noTextarea) {
          dom.copyAttributes([
              "className", "spellcheck", "title", "lang", "dir", "accessKey"
          ]).from(this.textarea.element).to(this.element);
      }

      dom.addClass(this.element, this.config.composerClassName);
      //
      // Make the editor look like the original textarea, by syncing styles
      if (this.config.style && !this.config.contentEditableMode) {
        this.style();
      }

      this.observe();

      var name = this.config.name;
      if (name) {
        dom.addClass(this.element, name);
        if (!this.config.contentEditableMode) { dom.addClass(this.editableArea, name); }
      }

      this.enable();

      if (!this.config.noTextarea && this.textarea.element.disabled) {
        this.disable();
      }

      // Simulate html5 placeholder attribute on contentEditable element
      var placeholderText = typeof(this.config.placeholder) === "string"
        ? this.config.placeholder
        : ((this.config.noTextarea) ? this.editableArea.getAttribute("data-placeholder") : this.textarea.element.getAttribute("placeholder"));
      if (placeholderText) {
        dom.simulatePlaceholder(this.parent, this, placeholderText);
      }

      // Make sure that the browser avoids using inline styles whenever possible
      this.commands.exec("styleWithCSS", false);

      this._initAutoLinking();
      this._initObjectResizing();
      this._initUndoManager();
      this._initLineBreaking();

      // Simulate html5 autofocus on contentEditable element
      // This doesn't work on IOS (5.1.1)
      if (!this.config.noTextarea && (this.textarea.element.hasAttribute("autofocus") || document.querySelector(":focus") == this.textarea.element) && !browser.isIos()) {
        setTimeout(function() { that.focus(true); }, 100);
      }

      // IE sometimes leaves a single paragraph, which can't be removed by the user
      if (!browser.clearsContentEditableCorrectly()) {
        wysihtml5.quirks.ensureProperClearing(this);
      }

      // Set up a sync that makes sure that textarea and editor have the same content
      if (this.initSync && this.config.sync) {
        this.initSync();
      }

      // Okay hide the textarea, we are ready to go
      if (!this.config.noTextarea) { this.textarea.hide(); }

      // Fire global (before-)load event
      this.parent.fire("beforeload").fire("load");
    },

    _initAutoLinking: function() {
      var that                           = this,
          supportsDisablingOfAutoLinking = browser.canDisableAutoLinking(),
          supportsAutoLinking            = browser.doesAutoLinkingInContentEditable();
      if (supportsDisablingOfAutoLinking) {
        this.commands.exec("autoUrlDetect", false);
      }

      if (!this.config.autoLink) {
        return;
      }

      // Only do the auto linking by ourselves when the browser doesn't support auto linking
      // OR when he supports auto linking but we were able to turn it off (IE9+)
      if (!supportsAutoLinking || (supportsAutoLinking && supportsDisablingOfAutoLinking)) {
        this.parent.on("newword:composer", function() {
          if (dom.getTextContent(that.element).match(dom.autoLink.URL_REG_EXP)) {
            that.selection.executeAndRestore(function(startContainer, endContainer) {
              var uneditables = that.element.querySelectorAll("." + that.config.uneditableContainerClassname),
                  isInUneditable = false;

              for (var i = uneditables.length; i--;) {
                if (wysihtml5.dom.contains(uneditables[i], endContainer)) {
                  isInUneditable = true;
                }
              }

              if (!isInUneditable) dom.autoLink(endContainer.parentNode, [that.config.uneditableContainerClassname]);
            });
          }
        });

        dom.observe(this.element, "blur", function() {
          dom.autoLink(that.element, [that.config.uneditableContainerClassname]);
        });
      }

      // Assuming we have the following:
      //  <a href="http://www.google.de">http://www.google.de</a>
      // If a user now changes the url in the innerHTML we want to make sure that
      // it's synchronized with the href attribute (as long as the innerHTML is still a url)
      var // Use a live NodeList to check whether there are any links in the document
          links           = this.sandbox.getDocument().getElementsByTagName("a"),
          // The autoLink helper method reveals a reg exp to detect correct urls
          urlRegExp       = dom.autoLink.URL_REG_EXP,
          getTextContent  = function(element) {
            var textContent = wysihtml5.lang.string(dom.getTextContent(element)).trim();
            if (textContent.substr(0, 4) === "www.") {
              textContent = "http://" + textContent;
            }
            return textContent;
          };

      dom.observe(this.element, "keydown", function(event) {
        if (!links.length) {
          return;
        }

        var selectedNode = that.selection.getSelectedNode(event.target.ownerDocument),
            link         = dom.getParentElement(selectedNode, { nodeName: "A" }, 4),
            textContent;

        if (!link) {
          return;
        }

        textContent = getTextContent(link);
        // keydown is fired before the actual content is changed
        // therefore we set a timeout to change the href
        setTimeout(function() {
          var newTextContent = getTextContent(link);
          if (newTextContent === textContent) {
            return;
          }

          // Only set href when new href looks like a valid url
          if (newTextContent.match(urlRegExp)) {
            link.setAttribute("href", newTextContent);
          }
        }, 0);
      });
    },

    _initObjectResizing: function() {
      this.commands.exec("enableObjectResizing", true);

      // IE sets inline styles after resizing objects
      // The following lines make sure that the width/height css properties
      // are copied over to the width/height attributes
      if (browser.supportsEvent("resizeend")) {
        var properties        = ["width", "height"],
            propertiesLength  = properties.length,
            element           = this.element;

        dom.observe(element, "resizeend", function(event) {
          var target = event.target || event.srcElement,
              style  = target.style,
              i      = 0,
              property;

          if (target.nodeName !== "IMG") {
            return;
          }

          for (; i<propertiesLength; i++) {
            property = properties[i];
            if (style[property]) {
              target.setAttribute(property, parseInt(style[property], 10));
              style[property] = "";
            }
          }

          // After resizing IE sometimes forgets to remove the old resize handles
          wysihtml5.quirks.redraw(element);
        });
      }
    },

    _initUndoManager: function() {
      this.undoManager = new wysihtml5.UndoManager(this.parent);
    },

    _initLineBreaking: function() {
      var that                              = this,
          USE_NATIVE_LINE_BREAK_INSIDE_TAGS = ["LI", "P", "H1", "H2", "H3", "H4", "H5", "H6"],
          LIST_TAGS                         = ["UL", "OL", "MENU"];

      function adjust(selectedNode) {
        var parentElement = dom.getParentElement(selectedNode, { nodeName: ["P", "DIV"] }, 2);
        if (parentElement && dom.contains(that.element, parentElement)) {
          that.selection.executeAndRestore(function() {
            if (that.config.useLineBreaks) {
              dom.replaceWithChildNodes(parentElement);
            } else if (parentElement.nodeName !== "P") {
              dom.renameElement(parentElement, "p");
            }
          });
        }
      }

      if (!this.config.useLineBreaks) {
        dom.observe(this.element, ["focus", "keydown"], function() {
          if (that.isEmpty()) {
            var paragraph = that.doc.createElement("P");
            that.element.innerHTML = "";
            that.element.appendChild(paragraph);
            if (!browser.displaysCaretInEmptyContentEditableCorrectly()) {
              paragraph.innerHTML = "<br>";
              that.selection.setBefore(paragraph.firstChild);
            } else {
              that.selection.selectNode(paragraph, true);
            }
          }
        });
      }

      // Under certain circumstances Chrome + Safari create nested <p> or <hX> tags after paste
      // Inserting an invisible white space in front of it fixes the issue
      // This is too hacky and causes selection not to replace content on paste in chrome
     /* if (browser.createsNestedInvalidMarkupAfterPaste()) {
        dom.observe(this.element, "paste", function(event) {
          var invisibleSpace = that.doc.createTextNode(wysihtml5.INVISIBLE_SPACE);
          that.selection.insertNode(invisibleSpace);
        });
      }*/


      dom.observe(this.element, "keydown", function(event) {
        var keyCode = event.keyCode;

        if (event.shiftKey) {
          return;
        }

        if (keyCode !== wysihtml5.ENTER_KEY && keyCode !== wysihtml5.BACKSPACE_KEY) {
          return;
        }
        var blockElement = dom.getParentElement(that.selection.getSelectedNode(), { nodeName: USE_NATIVE_LINE_BREAK_INSIDE_TAGS }, 4);
        if (blockElement) {
          setTimeout(function() {
            // Unwrap paragraph after leaving a list or a H1-6
            var selectedNode = that.selection.getSelectedNode(),
                list;

            if (blockElement.nodeName === "LI") {
              if (!selectedNode) {
                return;
              }

              list = dom.getParentElement(selectedNode, { nodeName: LIST_TAGS }, 2);

              if (!list) {
                adjust(selectedNode);
              }
            }

            if (keyCode === wysihtml5.ENTER_KEY && blockElement.nodeName.match(/^H[1-6]$/)) {
              adjust(selectedNode);
            }
          }, 0);
          return;
        }

        if (that.config.useLineBreaks && keyCode === wysihtml5.ENTER_KEY && !wysihtml5.browser.insertsLineBreaksOnReturn()) {
          event.preventDefault();
          that.commands.exec("insertLineBreak");

        }
      });
    }
  });
})(wysihtml5);
;(function(wysihtml5) {
  var dom             = wysihtml5.dom,
      doc             = document,
      win             = window,
      HOST_TEMPLATE   = doc.createElement("div"),
      /**
       * Styles to copy from textarea to the composer element
       */
      TEXT_FORMATTING = [
        "background-color",
        "color", "cursor",
        "font-family", "font-size", "font-style", "font-variant", "font-weight",
        "line-height", "letter-spacing",
        "text-align", "text-decoration", "text-indent", "text-rendering",
        "word-break", "word-wrap", "word-spacing"
      ],
      /**
       * Styles to copy from textarea to the iframe
       */
      BOX_FORMATTING = [
        "background-color",
        "border-collapse",
        "border-bottom-color", "border-bottom-style", "border-bottom-width",
        "border-left-color", "border-left-style", "border-left-width",
        "border-right-color", "border-right-style", "border-right-width",
        "border-top-color", "border-top-style", "border-top-width",
        "clear", "display", "float",
        "margin-bottom", "margin-left", "margin-right", "margin-top",
        "outline-color", "outline-offset", "outline-width", "outline-style",
        "padding-left", "padding-right", "padding-top", "padding-bottom",
        "position", "top", "left", "right", "bottom", "z-index",
        "vertical-align", "text-align",
        "-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing",
        "-webkit-box-shadow", "-moz-box-shadow", "-ms-box-shadow","box-shadow",
        "-webkit-border-top-right-radius", "-moz-border-radius-topright", "border-top-right-radius",
        "-webkit-border-bottom-right-radius", "-moz-border-radius-bottomright", "border-bottom-right-radius",
        "-webkit-border-bottom-left-radius", "-moz-border-radius-bottomleft", "border-bottom-left-radius",
        "-webkit-border-top-left-radius", "-moz-border-radius-topleft", "border-top-left-radius",
        "width", "height"
      ],
      ADDITIONAL_CSS_RULES = [
        "html                 { height: 100%; }",
        "body                 { height: 100%; padding: 1px 0 0 0; margin: -1px 0 0 0; }",
        "body > p:first-child { margin-top: 0; }",
        "._wysihtml5-temp     { display: none; }",
        wysihtml5.browser.isGecko ?
          "body.placeholder { color: graytext !important; }" :
          "body.placeholder { color: #a9a9a9 !important; }",
        // Ensure that user see's broken images and can delete them
        "img:-moz-broken      { -moz-force-broken-image-icon: 1; height: 24px; width: 24px; }"
      ];

  /**
   * With "setActive" IE offers a smart way of focusing elements without scrolling them into view:
   * http://msdn.microsoft.com/en-us/library/ms536738(v=vs.85).aspx
   *
   * Other browsers need a more hacky way: (pssst don't tell my mama)
   * In order to prevent the element being scrolled into view when focusing it, we simply
   * move it out of the scrollable area, focus it, and reset it's position
   */
  var focusWithoutScrolling = function(element) {
    if (element.setActive) {
      // Following line could cause a js error when the textarea is invisible
      // See https://github.com/xing/wysihtml5/issues/9
      try { element.setActive(); } catch(e) {}
    } else {
      var elementStyle = element.style,
          originalScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop,
          originalScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft,
          originalStyles = {
            position:         elementStyle.position,
            top:              elementStyle.top,
            left:             elementStyle.left,
            WebkitUserSelect: elementStyle.WebkitUserSelect
          };

      dom.setStyles({
        position:         "absolute",
        top:              "-99999px",
        left:             "-99999px",
        // Don't ask why but temporarily setting -webkit-user-select to none makes the whole thing performing smoother
        WebkitUserSelect: "none"
      }).on(element);

      element.focus();

      dom.setStyles(originalStyles).on(element);

      if (win.scrollTo) {
        // Some browser extensions unset this method to prevent annoyances
        // "Better PopUp Blocker" for Chrome http://code.google.com/p/betterpopupblocker/source/browse/trunk/blockStart.js#100
        // Issue: http://code.google.com/p/betterpopupblocker/issues/detail?id=1
        win.scrollTo(originalScrollLeft, originalScrollTop);
      }
    }
  };


  wysihtml5.views.Composer.prototype.style = function() {
    var that                  = this,
        originalActiveElement = doc.querySelector(":focus"),
        textareaElement       = this.textarea.element,
        hasPlaceholder        = textareaElement.hasAttribute("placeholder"),
        originalPlaceholder   = hasPlaceholder && textareaElement.getAttribute("placeholder"),
        originalDisplayValue  = textareaElement.style.display,
        originalDisabled      = textareaElement.disabled,
        displayValueForCopying;

    this.focusStylesHost      = HOST_TEMPLATE.cloneNode(false);
    this.blurStylesHost       = HOST_TEMPLATE.cloneNode(false);
    this.disabledStylesHost   = HOST_TEMPLATE.cloneNode(false);

    // Remove placeholder before copying (as the placeholder has an affect on the computed style)
    if (hasPlaceholder) {
      textareaElement.removeAttribute("placeholder");
    }

    if (textareaElement === originalActiveElement) {
      textareaElement.blur();
    }

    // enable for copying styles
    textareaElement.disabled = false;

    // set textarea to display="none" to get cascaded styles via getComputedStyle
    textareaElement.style.display = displayValueForCopying = "none";

    if ((textareaElement.getAttribute("rows") && dom.getStyle("height").from(textareaElement) === "auto") ||
        (textareaElement.getAttribute("cols") && dom.getStyle("width").from(textareaElement) === "auto")) {
      textareaElement.style.display = displayValueForCopying = originalDisplayValue;
    }

    // --------- iframe styles (has to be set before editor styles, otherwise IE9 sets wrong fontFamily on blurStylesHost) ---------
    dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.editableArea).andTo(this.blurStylesHost);

    // --------- editor styles ---------
    dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.element).andTo(this.blurStylesHost);

    // --------- apply standard rules ---------
    dom.insertCSS(ADDITIONAL_CSS_RULES).into(this.element.ownerDocument);

    // --------- :disabled styles ---------
    textareaElement.disabled = true;
    dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.disabledStylesHost);
    dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.disabledStylesHost);
    textareaElement.disabled = originalDisabled;

    // --------- :focus styles ---------
    textareaElement.style.display = originalDisplayValue;
    focusWithoutScrolling(textareaElement);
    textareaElement.style.display = displayValueForCopying;

    dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.focusStylesHost);
    dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.focusStylesHost);

    // reset textarea
    textareaElement.style.display = originalDisplayValue;

    dom.copyStyles(["display"]).from(textareaElement).to(this.editableArea);

    // Make sure that we don't change the display style of the iframe when copying styles oblur/onfocus
    // this is needed for when the change_view event is fired where the iframe is hidden and then
    // the blur event fires and re-displays it
    var boxFormattingStyles = wysihtml5.lang.array(BOX_FORMATTING).without(["display"]);

    // --------- restore focus ---------
    if (originalActiveElement) {
      originalActiveElement.focus();
    } else {
      textareaElement.blur();
    }

    // --------- restore placeholder ---------
    if (hasPlaceholder) {
      textareaElement.setAttribute("placeholder", originalPlaceholder);
    }

    // --------- Sync focus/blur styles ---------
    this.parent.on("focus:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.focusStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.focusStylesHost).to(that.element);
    });

    this.parent.on("blur:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.blurStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.blurStylesHost).to(that.element);
    });

    this.parent.observe("disable:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.disabledStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.disabledStylesHost).to(that.element);
    });

    this.parent.observe("enable:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.blurStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.blurStylesHost).to(that.element);
    });

    return this;
  };
})(wysihtml5);
;/**
 * Taking care of events
 *  - Simulating 'change' event on contentEditable element
 *  - Handling drag & drop logic
 *  - Catch paste events
 *  - Dispatch proprietary newword:composer event
 *  - Keyboard shortcuts
 */
(function(wysihtml5) {
  var dom       = wysihtml5.dom,
      browser   = wysihtml5.browser,
      /**
       * Map keyCodes to query commands
       */
      shortcuts = {
        "66": "bold",     // B
        "73": "italic",   // I
        "85": "underline" // U
      };

  var deleteAroundEditable = function(selection, uneditable, element) {
    // merge node with previous node from uneditable
    var prevNode = selection.getPreviousNode(uneditable, true),
        curNode = selection.getSelectedNode();

    if (curNode.nodeType !== 1 && curNode.parentNode !== element) { curNode = curNode.parentNode; }
    if (prevNode) {
      if (curNode.nodeType == 1) {
        var first = curNode.firstChild;

        if (prevNode.nodeType == 1) {
          while (curNode.firstChild) {
            prevNode.appendChild(curNode.firstChild);
          }
        } else {
          while (curNode.firstChild) {
            uneditable.parentNode.insertBefore(curNode.firstChild, uneditable);
          }
        }
        if (curNode.parentNode) {
          curNode.parentNode.removeChild(curNode);
        }
        selection.setBefore(first);
      } else {
        if (prevNode.nodeType == 1) {
          prevNode.appendChild(curNode);
        } else {
          uneditable.parentNode.insertBefore(curNode, uneditable);
        }
        selection.setBefore(curNode);
      }
    }
  };

  var handleDeleteKeyPress = function(event, selection, element, composer) {
    if (selection.isCollapsed()) {
      if (selection.caretIsInTheBeginnig('LI')) {
        event.preventDefault();
        composer.commands.exec('outdentList');
      } else if (selection.caretIsInTheBeginnig()) {
        event.preventDefault();
      } else {

        if (selection.caretIsFirstInSelection() &&
            selection.getPreviousNode() &&
            selection.getPreviousNode().nodeName &&
            (/^H\d$/gi).test(selection.getPreviousNode().nodeName)
        ) {
          var prevNode = selection.getPreviousNode();
          event.preventDefault();
          if ((/^\s*$/).test(prevNode.textContent || prevNode.innerText)) {
            // heading is empty
            prevNode.parentNode.removeChild(prevNode);
          } else {
            var range = prevNode.ownerDocument.createRange();
            range.selectNodeContents(prevNode);
            range.collapse(false);
            selection.setSelection(range);
          }
        }

        var beforeUneditable = selection.caretIsBeforeUneditable();
        // Do a special delete if caret would delete uneditable
        if (beforeUneditable) {
          event.preventDefault();
          deleteAroundEditable(selection, beforeUneditable, element);
        }
      }
    } else {
      if (selection.containsUneditable()) {
        event.preventDefault();
        selection.deleteContents();
      }
    }
  };

  var handleTabKeyDown = function(composer, element) {
    if (!composer.selection.isCollapsed()) {
      composer.selection.deleteContents();
    } else if (composer.selection.caretIsInTheBeginnig('LI')) {
      if (composer.commands.exec('indentList')) return;
    }

    // Is &emsp; close enough to tab. Could not find enough counter arguments for now.
    composer.commands.exec("insertHTML", "&emsp;");
  };

  wysihtml5.views.Composer.prototype.observe = function() {
    var that                = this,
        state               = this.getValue(false, false),
        container           = (this.sandbox.getIframe) ? this.sandbox.getIframe() : this.sandbox.getContentEditable(),
        element             = this.element,
        focusBlurElement    = (browser.supportsEventsInIframeCorrectly() || this.sandbox.getContentEditable) ? element : this.sandbox.getWindow(),
        pasteEvents         = ["drop", "paste", "beforepaste"],
        interactionEvents   = ["drop", "paste", "mouseup", "focus", "keyup"];

    // --------- destroy:composer event ---------
    dom.observe(container, "DOMNodeRemoved", function() {
      clearInterval(domNodeRemovedInterval);
      that.parent.fire("destroy:composer");
    });

    // DOMNodeRemoved event is not supported in IE 8
    if (!browser.supportsMutationEvents()) {
        var domNodeRemovedInterval = setInterval(function() {
          if (!dom.contains(document.documentElement, container)) {
            clearInterval(domNodeRemovedInterval);
            that.parent.fire("destroy:composer");
          }
        }, 250);
    }

    // --------- User interaction tracking --

    dom.observe(focusBlurElement, interactionEvents, function() {
      setTimeout(function() {
        that.parent.fire("interaction").fire("interaction:composer");
      }, 0);
    });


    if (this.config.handleTables) {
      if(!this.tableClickHandle && this.doc.execCommand && wysihtml5.browser.supportsCommand(this.doc, "enableObjectResizing") && wysihtml5.browser.supportsCommand(this.doc, "enableInlineTableEditing")) {
        if (this.sandbox.getIframe) {
          this.tableClickHandle = dom.observe(container , ["focus", "mouseup", "mouseover"], function() {
            that.doc.execCommand("enableObjectResizing", false, "false");
            that.doc.execCommand("enableInlineTableEditing", false, "false");
            that.tableClickHandle.stop();
          });
        } else {
          setTimeout(function() {
            that.doc.execCommand("enableObjectResizing", false, "false");
            that.doc.execCommand("enableInlineTableEditing", false, "false");
          }, 0);
        }
      }
      this.tableSelection = wysihtml5.quirks.tableCellsSelection(element, that.parent);
    }

    // --------- Focus & blur logic ---------
    dom.observe(focusBlurElement, "focus", function(event) {
      that.parent.fire("focus", event).fire("focus:composer", event);

      // Delay storing of state until all focus handler are fired
      // especially the one which resets the placeholder
      setTimeout(function() { state = that.getValue(false, false); }, 0);
    });

    dom.observe(focusBlurElement, "blur", function(event) {
      if (state !== that.getValue(false, false)) {
        //create change event if supported (all except IE8)
        var changeevent = event;
        if(typeof Object.create == 'function') {
          changeevent = Object.create(event, { type: { value: 'change' } });
        }
        that.parent.fire("change", changeevent).fire("change:composer", changeevent);
      }
      that.parent.fire("blur", event).fire("blur:composer", event);
    });

    // --------- Drag & Drop logic ---------
    dom.observe(element, "dragenter", function() {
      that.parent.fire("unset_placeholder");
    });

    dom.observe(element, pasteEvents, function(event) {
      that.parent.fire(event.type, event).fire(event.type + ":composer", event);
    });


    if (this.config.copyedFromMarking) {
      // If supported the copied source is based directly on selection
      // Very useful for webkit based browsers where copy will otherwise contain a lot of code and styles based on whatever and not actually in selection.
      dom.observe(element, "copy", function(event) {
        if (event.clipboardData) {
          event.clipboardData.setData("text/html", that.config.copyedFromMarking + that.selection.getHtml());
          event.preventDefault();
        }
        that.parent.fire(event.type, event).fire(event.type + ":composer", event);
      });
    }

    // --------- neword event ---------
    dom.observe(element, "keyup", function(event) {
      var keyCode = event.keyCode;
      if (keyCode === wysihtml5.SPACE_KEY || keyCode === wysihtml5.ENTER_KEY) {
        that.parent.fire("newword:composer");
      }
    });

    this.parent.on("paste:composer", function() {
      setTimeout(function() { that.parent.fire("newword:composer"); }, 0);
    });

    // --------- Make sure that images are selected when clicking on them ---------
    if (!browser.canSelectImagesInContentEditable()) {
      dom.observe(element, "mousedown", function(event) {
        var target = event.target;
        var allImages = element.querySelectorAll('img'),
            notMyImages = element.querySelectorAll('.' + that.config.uneditableContainerClassname + ' img'),
            myImages = wysihtml5.lang.array(allImages).without(notMyImages);

        if (target.nodeName === "IMG" && wysihtml5.lang.array(myImages).contains(target)) {
          that.selection.selectNode(target);
        }
      });
    }

    if (!browser.canSelectImagesInContentEditable()) {
        dom.observe(element, "drop", function(event) {
            // TODO: if I knew how to get dropped elements list from event I could limit it to only IMG element case
            setTimeout(function() {
                that.selection.getSelection().removeAllRanges();
            }, 0);
        });
    }

    if (browser.hasHistoryIssue() && browser.supportsSelectionModify()) {
      dom.observe(element, "keydown", function(event) {
        if (!event.metaKey && !event.ctrlKey) {
          return;
        }

        var keyCode   = event.keyCode,
            win       = element.ownerDocument.defaultView,
            selection = win.getSelection();

        if (keyCode === 37 || keyCode === 39) {
          if (keyCode === 37) {
            selection.modify("extend", "left", "lineboundary");
            if (!event.shiftKey) {
              selection.collapseToStart();
            }
          }
          if (keyCode === 39) {
            selection.modify("extend", "right", "lineboundary");
            if (!event.shiftKey) {
              selection.collapseToEnd();
            }
          }
          event.preventDefault();
        }
      });
    }

    // --------- Shortcut logic ---------
    dom.observe(element, "keydown", function(event) {
      var keyCode  = event.keyCode,
          command  = shortcuts[keyCode];
      if ((event.ctrlKey || event.metaKey) && !event.altKey && command) {
        that.commands.exec(command);
        event.preventDefault();
      }
      if (keyCode === 8) {
        // delete key
        handleDeleteKeyPress(event, that.selection, element, that);
      } else if (that.config.handleTabKey && keyCode === 9) {
        event.preventDefault();
        handleTabKeyDown(that, element);
      }
    });

    // --------- Make sure that when pressing backspace/delete on selected images deletes the image and it's anchor ---------
    dom.observe(element, "keydown", function(event) {
      var target  = that.selection.getSelectedNode(true),
          keyCode = event.keyCode,
          parent;
      if (target && target.nodeName === "IMG" && (keyCode === wysihtml5.BACKSPACE_KEY || keyCode === wysihtml5.DELETE_KEY)) { // 8 => backspace, 46 => delete
        parent = target.parentNode;
        // delete the <img>
        parent.removeChild(target);
        // and it's parent <a> too if it hasn't got any other child nodes
        if (parent.nodeName === "A" && !parent.firstChild) {
          parent.parentNode.removeChild(parent);
        }

        setTimeout(function() { wysihtml5.quirks.redraw(element); }, 0);
        event.preventDefault();
      }
    });

    // --------- IE 8+9 focus the editor when the iframe is clicked (without actually firing the 'focus' event on the <body>) ---------
    if (!this.config.contentEditableMode && browser.hasIframeFocusIssue()) {
      dom.observe(container, "focus", function() {
        setTimeout(function() {
          if (that.doc.querySelector(":focus") !== that.element) {
            that.focus();
          }
        }, 0);
      });

      dom.observe(this.element, "blur", function() {
        setTimeout(function() {
          that.selection.getSelection().removeAllRanges();
        }, 0);
      });
    }

    // --------- Show url in tooltip when hovering links or images ---------
    var titlePrefixes = {
      IMG: "Image: ",
      A:   "Link: "
    };

    dom.observe(element, "mouseover", function(event) {
      var target   = event.target,
          nodeName = target.nodeName,
          title;
      if (nodeName !== "A" && nodeName !== "IMG") {
        return;
      }
      var hasTitle = target.hasAttribute("title");
      if(!hasTitle){
        title = titlePrefixes[nodeName] + (target.getAttribute("href") || target.getAttribute("src"));
        target.setAttribute("title", title);
      }
    });
  };
})(wysihtml5);
;/**
 * Class that takes care that the value of the composer and the textarea is always in sync
 */
(function(wysihtml5) {
  var INTERVAL = 400;

  wysihtml5.views.Synchronizer = Base.extend(
    /** @scope wysihtml5.views.Synchronizer.prototype */ {

    constructor: function(editor, textarea, composer) {
      this.editor   = editor;
      this.textarea = textarea;
      this.composer = composer;

      this._observe();
    },

    /**
     * Sync html from composer to textarea
     * Takes care of placeholders
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the textarea
     */
    fromComposerToTextarea: function(shouldParseHtml) {
      this.textarea.setValue(wysihtml5.lang.string(this.composer.getValue(false, false)).trim(), shouldParseHtml);
    },

    /**
     * Sync value of textarea to composer
     * Takes care of placeholders
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the composer
     */
    fromTextareaToComposer: function(shouldParseHtml) {
      var textareaValue = this.textarea.getValue(false, false);
      if (textareaValue) {
        this.composer.setValue(textareaValue, shouldParseHtml);
      } else {
        this.composer.clear();
        this.editor.fire("set_placeholder");
      }
    },

    /**
     * Invoke syncing based on view state
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the composer/textarea
     */
    sync: function(shouldParseHtml) {
      if (this.editor.currentView.name === "textarea") {
        this.fromTextareaToComposer(shouldParseHtml);
      } else {
        this.fromComposerToTextarea(shouldParseHtml);
      }
    },

    /**
     * Initializes interval-based syncing
     * also makes sure that on-submit the composer's content is synced with the textarea
     * immediately when the form gets submitted
     */
    _observe: function() {
      var interval,
          that          = this,
          form          = this.textarea.element.form,
          startInterval = function() {
            interval = setInterval(function() { that.fromComposerToTextarea(); }, INTERVAL);
          },
          stopInterval  = function() {
            clearInterval(interval);
            interval = null;
          };

      startInterval();

      if (form) {
        // If the textarea is in a form make sure that after onreset and onsubmit the composer
        // has the correct state
        wysihtml5.dom.observe(form, "submit", function() {
          that.sync(true);
        });
        wysihtml5.dom.observe(form, "reset", function() {
          setTimeout(function() { that.fromTextareaToComposer(); }, 0);
        });
      }

      this.editor.on("change_view", function(view) {
        if (view === "composer" && !interval) {
          that.fromTextareaToComposer(true);
          startInterval();
        } else if (view === "textarea") {
          that.fromComposerToTextarea(true);
          stopInterval();
        }
      });

      this.editor.on("destroy:composer", stopInterval);
    }
  });
})(wysihtml5);
;wysihtml5.views.Textarea = wysihtml5.views.View.extend(
  /** @scope wysihtml5.views.Textarea.prototype */ {
  name: "textarea",

  constructor: function(parent, textareaElement, config) {
    this.base(parent, textareaElement, config);

    this._observe();
  },

  clear: function() {
    this.element.value = "";
  },

  getValue: function(parse) {
    var value = this.isEmpty() ? "" : this.element.value;
    if (parse !== false) {
      value = this.parent.parse(value);
    }
    return value;
  },

  setValue: function(html, parse) {
    if (parse) {
      html = this.parent.parse(html);
    }
    this.element.value = html;
  },

  cleanUp: function() {
      var html = this.parent.parse(this.element.value);
      this.element.value = html;
  },

  hasPlaceholderSet: function() {
    var supportsPlaceholder = wysihtml5.browser.supportsPlaceholderAttributeOn(this.element),
        placeholderText     = this.element.getAttribute("placeholder") || null,
        value               = this.element.value,
        isEmpty             = !value;
    return (supportsPlaceholder && isEmpty) || (value === placeholderText);
  },

  isEmpty: function() {
    return !wysihtml5.lang.string(this.element.value).trim() || this.hasPlaceholderSet();
  },

  _observe: function() {
    var element = this.element,
        parent  = this.parent,
        eventMapping = {
          focusin:  "focus",
          focusout: "blur"
        },
        /**
         * Calling focus() or blur() on an element doesn't synchronously trigger the attached focus/blur events
         * This is the case for focusin and focusout, so let's use them whenever possible, kkthxbai
         */
        events = wysihtml5.browser.supportsEvent("focusin") ? ["focusin", "focusout", "change"] : ["focus", "blur", "change"];

    parent.on("beforeload", function() {
      wysihtml5.dom.observe(element, events, function(event) {
        var eventName = eventMapping[event.type] || event.type;
        parent.fire(eventName).fire(eventName + ":textarea");
      });

      wysihtml5.dom.observe(element, ["paste", "drop"], function() {
        setTimeout(function() { parent.fire("paste").fire("paste:textarea"); }, 0);
      });
    });
  }
});
;/**
 * WYSIHTML5 Editor
 *
 * @param {Element} editableElement Reference to the textarea which should be turned into a rich text interface
 * @param {Object} [config] See defaultConfig object below for explanation of each individual config option
 *
 * @events
 *    load
 *    beforeload (for internal use only)
 *    focus
 *    focus:composer
 *    focus:textarea
 *    blur
 *    blur:composer
 *    blur:textarea
 *    change
 *    change:composer
 *    change:textarea
 *    paste
 *    paste:composer
 *    paste:textarea
 *    newword:composer
 *    destroy:composer
 *    undo:composer
 *    redo:composer
 *    beforecommand:composer
 *    aftercommand:composer
 *    enable:composer
 *    disable:composer
 *    change_view
 */
(function(wysihtml5) {
  var undef;

  var defaultConfig = {
    // Give the editor a name, the name will also be set as class name on the iframe and on the iframe's body
    name:                 undef,
    // Whether the editor should look like the textarea (by adopting styles)
    style:                true,
    // Id of the toolbar element, pass falsey value if you don't want any toolbar logic
    toolbar:              undef,
    // Whether toolbar is displayed after init by script automatically.
    // Can be set to false if toolobar is set to display only on editable area focus
    showToolbarAfterInit: true,
    // Whether urls, entered by the user should automatically become clickable-links
    autoLink:             true,
    // Includes table editing events and cell selection tracking
    handleTables:         true,
    // Tab key inserts tab into text as default behaviour. It can be disabled to regain keyboard navigation
    handleTabKey:         true,
    // Object which includes parser rules to apply when html gets cleaned
    // See parser_rules/*.js for examples
    parserRules:          { tags: { br: {}, span: {}, div: {}, p: {} }, classes: {} },
    // Object which includes parser when the user inserts content via copy & paste. If null parserRules will be used instead
    pasteParserRulesets: null,
    // Parser method to use when the user inserts content
    parser:               wysihtml5.dom.parse,
    // Class name which should be set on the contentEditable element in the created sandbox iframe, can be styled via the 'stylesheets' option
    composerClassName:    "wysihtml5-editor",
    // Class name to add to the body when the wysihtml5 editor is supported
    bodyClassName:        "wysihtml5-supported",
    // By default wysihtml5 will insert a <br> for line breaks, set this to false to use <p>
    useLineBreaks:        true,
    // Array (or single string) of stylesheet urls to be loaded in the editor's iframe
    stylesheets:          [],
    // Placeholder text to use, defaults to the placeholder attribute on the textarea element
    placeholderText:      undef,
    // Whether the rich text editor should be rendered on touch devices (wysihtml5 >= 0.3.0 comes with basic support for iOS 5)
    supportTouchDevices:  true,
    // Whether senseless <span> elements (empty or without attributes) should be removed/replaced with their content
    cleanUp:              true,
    // Whether to use div instead of secure iframe
    contentEditableMode: false,
    // Classname of container that editor should not touch and pass through
    // Pass false to disable
    uneditableContainerClassname: "wysihtml5-uneditable-container",
    // Browsers that support copied source handling will get a marking of the origin of the copied source (for determinig code cleanup rules on paste)
    // Also copied source is based directly on selection - 
    // (very useful for webkit based browsers where copy will otherwise contain a lot of code and styles based on whatever and not actually in selection).
    // If falsy value is passed source override is also disabled
    copyedFromMarking: '<meta name="copied-from" content="wysihtml5">'
  };

  wysihtml5.Editor = wysihtml5.lang.Dispatcher.extend(
    /** @scope wysihtml5.Editor.prototype */ {
    constructor: function(editableElement, config) {
      this.editableElement  = typeof(editableElement) === "string" ? document.getElementById(editableElement) : editableElement;
      this.config           = wysihtml5.lang.object({}).merge(defaultConfig).merge(config).get();
      this._isCompatible    = wysihtml5.browser.supported();

      if (this.editableElement.nodeName.toLowerCase() != "textarea") {
          this.config.contentEditableMode = true;
          this.config.noTextarea = true;
      }
      if (!this.config.noTextarea) {
          this.textarea         = new wysihtml5.views.Textarea(this, this.editableElement, this.config);
          this.currentView      = this.textarea;
      }

      // Sort out unsupported/unwanted browsers here
      if (!this._isCompatible || (!this.config.supportTouchDevices && wysihtml5.browser.isTouchDevice())) {
        var that = this;
        setTimeout(function() { that.fire("beforeload").fire("load"); }, 0);
        return;
      }

      // Add class name to body, to indicate that the editor is supported
      wysihtml5.dom.addClass(document.body, this.config.bodyClassName);

      this.composer = new wysihtml5.views.Composer(this, this.editableElement, this.config);
      this.currentView = this.composer;

      if (typeof(this.config.parser) === "function") {
        this._initParser();
      }

      this.on("beforeload", this.handleBeforeLoad);
    },

    handleBeforeLoad: function() {
        if (!this.config.noTextarea) {
            this.synchronizer = new wysihtml5.views.Synchronizer(this, this.textarea, this.composer);
        }
        if (this.config.toolbar) {
          this.toolbar = new wysihtml5.toolbar.Toolbar(this, this.config.toolbar, this.config.showToolbarAfterInit);
        }
    },

    isCompatible: function() {
      return this._isCompatible;
    },

    clear: function() {
      this.currentView.clear();
      return this;
    },

    getValue: function(parse, clearInternals) {
      return this.currentView.getValue(parse, clearInternals);
    },

    setValue: function(html, parse) {
      this.fire("unset_placeholder");

      if (!html) {
        return this.clear();
      }

      this.currentView.setValue(html, parse);
      return this;
    },

    cleanUp: function() {
        this.currentView.cleanUp();
    },

    focus: function(setToEnd) {
      this.currentView.focus(setToEnd);
      return this;
    },

    /**
     * Deactivate editor (make it readonly)
     */
    disable: function() {
      this.currentView.disable();
      return this;
    },

    /**
     * Activate editor
     */
    enable: function() {
      this.currentView.enable();
      return this;
    },

    isEmpty: function() {
      return this.currentView.isEmpty();
    },

    hasPlaceholderSet: function() {
      return this.currentView.hasPlaceholderSet();
    },

    parse: function(htmlOrElement, clearInternals) {
      var parseContext = (this.config.contentEditableMode) ? document : ((this.composer) ? this.composer.sandbox.getDocument() : null);
      var returnValue = this.config.parser(htmlOrElement, {
        "rules": this.config.parserRules,
        "cleanUp": this.config.cleanUp,
        "context": parseContext,
        "uneditableClass": this.config.uneditableContainerClassname,
        "clearInternals" : clearInternals
      });
      if (typeof(htmlOrElement) === "object") {
        wysihtml5.quirks.redraw(htmlOrElement);
      }
      return returnValue;
    },

    /**
     * Prepare html parser logic
     *  - Observes for paste and drop
     */
    _initParser: function() {
      var that = this,
          oldHtml,
          cleanHtml;

      if (wysihtml5.browser.supportsModenPaste()) {
        this.on("paste:composer", function(event) {
          event.preventDefault();
          oldHtml = wysihtml5.dom.getPastedHtml(event);
          if (oldHtml) {
            that._cleanAndPaste(oldHtml);
          }
        });

      } else {
        this.on("beforepaste:composer", function(event) {
          event.preventDefault();
          wysihtml5.dom.getPastedHtmlWithDiv(that.composer, function(pastedHTML) {
            if (pastedHTML) {
              that._cleanAndPaste(pastedHTML);
            }
          });
        });

      }
    },

    _cleanAndPaste: function (oldHtml) {
      var cleanHtml = wysihtml5.quirks.cleanPastedHTML(oldHtml, {
        "referenceNode": this.composer.element,
        "rules": this.config.pasteParserRulesets || [{"set": this.config.parserRules}],
        "uneditableClass": this.config.uneditableContainerClassname
      });
      this.composer.selection.deleteContents();
      this.composer.selection.insertHTML(cleanHtml);
    }
  });
})(wysihtml5);
;/**
 * Toolbar Dialog
 *
 * @param {Element} link The toolbar link which causes the dialog to show up
 * @param {Element} container The dialog container
 *
 * @example
 *    <!-- Toolbar link -->
 *    <a data-wysihtml5-command="insertImage">insert an image</a>
 *
 *    <!-- Dialog -->
 *    <div data-wysihtml5-dialog="insertImage" style="display: none;">
 *      <label>
 *        URL: <input data-wysihtml5-dialog-field="src" value="http://">
 *      </label>
 *      <label>
 *        Alternative text: <input data-wysihtml5-dialog-field="alt" value="">
 *      </label>
 *    </div>
 *
 *    <script>
 *      var dialog = new wysihtml5.toolbar.Dialog(
 *        document.querySelector("[data-wysihtml5-command='insertImage']"),
 *        document.querySelector("[data-wysihtml5-dialog='insertImage']")
 *      );
 *      dialog.observe("save", function(attributes) {
 *        // do something
 *      });
 *    </script>
 */
(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
      CLASS_NAME_OPENED       = "wysihtml5-command-dialog-opened",
      SELECTOR_FORM_ELEMENTS  = "input, select, textarea",
      SELECTOR_FIELDS         = "[data-wysihtml5-dialog-field]",
      ATTRIBUTE_FIELDS        = "data-wysihtml5-dialog-field";


  wysihtml5.toolbar.Dialog = wysihtml5.lang.Dispatcher.extend(
    /** @scope wysihtml5.toolbar.Dialog.prototype */ {
    constructor: function(link, container) {
      this.link       = link;
      this.container  = container;
    },

    _observe: function() {
      if (this._observed) {
        return;
      }

      var that = this,
          callbackWrapper = function(event) {
            var attributes = that._serialize();
            if (attributes == that.elementToChange) {
              that.fire("edit", attributes);
            } else {
              that.fire("save", attributes);
            }
            that.hide();
            event.preventDefault();
            event.stopPropagation();
          };

      dom.observe(that.link, "click", function() {
        if (dom.hasClass(that.link, CLASS_NAME_OPENED)) {
          setTimeout(function() { that.hide(); }, 0);
        }
      });

      dom.observe(this.container, "keydown", function(event) {
        var keyCode = event.keyCode;
        if (keyCode === wysihtml5.ENTER_KEY) {
          callbackWrapper(event);
        }
        if (keyCode === wysihtml5.ESCAPE_KEY) {
          that.fire("cancel");
          that.hide();
        }
      });

      dom.delegate(this.container, "[data-wysihtml5-dialog-action=save]", "click", callbackWrapper);

      dom.delegate(this.container, "[data-wysihtml5-dialog-action=cancel]", "click", function(event) {
        that.fire("cancel");
        that.hide();
        event.preventDefault();
        event.stopPropagation();
      });

      var formElements  = this.container.querySelectorAll(SELECTOR_FORM_ELEMENTS),
          i             = 0,
          length        = formElements.length,
          _clearInterval = function() { clearInterval(that.interval); };
      for (; i<length; i++) {
        dom.observe(formElements[i], "change", _clearInterval);
      }

      this._observed = true;
    },

    /**
     * Grabs all fields in the dialog and puts them in key=>value style in an object which
     * then gets returned
     */
    _serialize: function() {
      var data    = this.elementToChange || {},
          fields  = this.container.querySelectorAll(SELECTOR_FIELDS),
          length  = fields.length,
          i       = 0;

      for (; i<length; i++) {
        data[fields[i].getAttribute(ATTRIBUTE_FIELDS)] = fields[i].value;
      }
      return data;
    },

    /**
     * Takes the attributes of the "elementToChange"
     * and inserts them in their corresponding dialog input fields
     *
     * Assume the "elementToChange" looks like this:
     *    <a href="http://www.google.com" target="_blank">foo</a>
     *
     * and we have the following dialog:
     *    <input type="text" data-wysihtml5-dialog-field="href" value="">
     *    <input type="text" data-wysihtml5-dialog-field="target" value="">
     *
     * after calling _interpolate() the dialog will look like this
     *    <input type="text" data-wysihtml5-dialog-field="href" value="http://www.google.com">
     *    <input type="text" data-wysihtml5-dialog-field="target" value="_blank">
     *
     * Basically it adopted the attribute values into the corresponding input fields
     *
     */
    _interpolate: function(avoidHiddenFields) {
      var field,
          fieldName,
          newValue,
          focusedElement = document.querySelector(":focus"),
          fields         = this.container.querySelectorAll(SELECTOR_FIELDS),
          length         = fields.length,
          i              = 0;
      for (; i<length; i++) {
        field = fields[i];

        // Never change elements where the user is currently typing in
        if (field === focusedElement) {
          continue;
        }

        // Don't update hidden fields
        // See https://github.com/xing/wysihtml5/pull/14
        if (avoidHiddenFields && field.type === "hidden") {
          continue;
        }

        fieldName = field.getAttribute(ATTRIBUTE_FIELDS);
        newValue  = (this.elementToChange && typeof(this.elementToChange) !== 'boolean') ? (this.elementToChange.getAttribute(fieldName) || "") : field.defaultValue;
        field.value = newValue;
      }
    },

    /**
     * Show the dialog element
     */
    show: function(elementToChange) {
      if (dom.hasClass(this.link, CLASS_NAME_OPENED)) {
        return;
      }

      var that        = this,
          firstField  = this.container.querySelector(SELECTOR_FORM_ELEMENTS);
      this.elementToChange = elementToChange;
      this._observe();
      this._interpolate();
      if (elementToChange) {
        this.interval = setInterval(function() { that._interpolate(true); }, 500);
      }
      dom.addClass(this.link, CLASS_NAME_OPENED);
      this.container.style.display = "";
      this.fire("show");
      if (firstField && !elementToChange) {
        try {
          firstField.focus();
        } catch(e) {}
      }
    },

    /**
     * Hide the dialog element
     */
    hide: function() {
      clearInterval(this.interval);
      this.elementToChange = null;
      dom.removeClass(this.link, CLASS_NAME_OPENED);
      this.container.style.display = "none";
      this.fire("hide");
    }
  });
})(wysihtml5);
;/**
 * Converts speech-to-text and inserts this into the editor
 * As of now (2011/03/25) this only is supported in Chrome >= 11
 *
 * Note that it sends the recorded audio to the google speech recognition api:
 * http://stackoverflow.com/questions/4361826/does-chrome-have-buil-in-speech-recognition-for-input-type-text-x-webkit-speec
 *
 * Current HTML5 draft can be found here
 * http://lists.w3.org/Archives/Public/public-xg-htmlspeech/2011Feb/att-0020/api-draft.html
 *
 * "Accessing Google Speech API Chrome 11"
 * http://mikepultz.com/2011/03/accessing-google-speech-api-chrome-11/
 */
(function(wysihtml5) {
  var dom = wysihtml5.dom;

  var linkStyles = {
    position: "relative"
  };

  var wrapperStyles = {
    left:     0,
    margin:   0,
    opacity:  0,
    overflow: "hidden",
    padding:  0,
    position: "absolute",
    top:      0,
    zIndex:   1
  };

  var inputStyles = {
    cursor:     "inherit",
    fontSize:   "50px",
    height:     "50px",
    marginTop:  "-25px",
    outline:    0,
    padding:    0,
    position:   "absolute",
    right:      "-4px",
    top:        "50%"
  };

  var inputAttributes = {
    "x-webkit-speech": "",
    "speech":          ""
  };

  wysihtml5.toolbar.Speech = function(parent, link) {
    var input = document.createElement("input");
    if (!wysihtml5.browser.supportsSpeechApiOn(input)) {
      link.style.display = "none";
      return;
    }
    var lang = parent.editor.textarea.element.getAttribute("lang");
    if (lang) {
      inputAttributes.lang = lang;
    }

    var wrapper = document.createElement("div");

    wysihtml5.lang.object(wrapperStyles).merge({
      width:  link.offsetWidth  + "px",
      height: link.offsetHeight + "px"
    });

    dom.insert(input).into(wrapper);
    dom.insert(wrapper).into(link);

    dom.setStyles(inputStyles).on(input);
    dom.setAttributes(inputAttributes).on(input);

    dom.setStyles(wrapperStyles).on(wrapper);
    dom.setStyles(linkStyles).on(link);

    var eventName = "onwebkitspeechchange" in input ? "webkitspeechchange" : "speechchange";
    dom.observe(input, eventName, function() {
      parent.execCommand("insertText", input.value);
      input.value = "";
    });

    dom.observe(input, "click", function(event) {
      if (dom.hasClass(link, "wysihtml5-command-disabled")) {
        event.preventDefault();
      }

      event.stopPropagation();
    });
  };
})(wysihtml5);
;/**
 * Toolbar
 *
 * @param {Object} parent Reference to instance of Editor instance
 * @param {Element} container Reference to the toolbar container element
 *
 * @example
 *    <div id="toolbar">
 *      <a data-wysihtml5-command="createLink">insert link</a>
 *      <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1">insert h1</a>
 *    </div>
 *
 *    <script>
 *      var toolbar = new wysihtml5.toolbar.Toolbar(editor, document.getElementById("toolbar"));
 *    </script>
 */
(function(wysihtml5) {
  var CLASS_NAME_COMMAND_DISABLED   = "wysihtml5-command-disabled",
      CLASS_NAME_COMMANDS_DISABLED  = "wysihtml5-commands-disabled",
      CLASS_NAME_COMMAND_ACTIVE     = "wysihtml5-command-active",
      CLASS_NAME_ACTION_ACTIVE      = "wysihtml5-action-active",
      dom                           = wysihtml5.dom;

  wysihtml5.toolbar.Toolbar = Base.extend(
    /** @scope wysihtml5.toolbar.Toolbar.prototype */ {
    constructor: function(editor, container, showOnInit) {
      this.editor     = editor;
      this.container  = typeof(container) === "string" ? document.getElementById(container) : container;
      this.composer   = editor.composer;

      this._getLinks("command");
      this._getLinks("action");

      this._observe();
      if (showOnInit) { this.show(); }

      if (editor.config.classNameCommandDisabled != null) {
        CLASS_NAME_COMMAND_DISABLED = editor.config.classNameCommandDisabled;
      }
      if (editor.config.classNameCommandsDisabled != null) {
        CLASS_NAME_COMMANDS_DISABLED = editor.config.classNameCommandsDisabled;
      }
      if (editor.config.classNameCommandActive != null) {
        CLASS_NAME_COMMAND_ACTIVE = editor.config.classNameCommandActive;
      }
      if (editor.config.classNameActionActive != null) {
        CLASS_NAME_ACTION_ACTIVE = editor.config.classNameActionActive;
      }

      var speechInputLinks  = this.container.querySelectorAll("[data-wysihtml5-command=insertSpeech]"),
          length            = speechInputLinks.length,
          i                 = 0;
      for (; i<length; i++) {
        new wysihtml5.toolbar.Speech(this, speechInputLinks[i]);
      }
    },

    _getLinks: function(type) {
      var links   = this[type + "Links"] = wysihtml5.lang.array(this.container.querySelectorAll("[data-wysihtml5-" + type + "]")).get(),
          length  = links.length,
          i       = 0,
          mapping = this[type + "Mapping"] = {},
          link,
          group,
          name,
          value,
          dialog;
      for (; i<length; i++) {
        link    = links[i];
        name    = link.getAttribute("data-wysihtml5-" + type);
        value   = link.getAttribute("data-wysihtml5-" + type + "-value");
        group   = this.container.querySelector("[data-wysihtml5-" + type + "-group='" + name + "']");
        dialog  = this._getDialog(link, name);

        mapping[name + ":" + value] = {
          link:   link,
          group:  group,
          name:   name,
          value:  value,
          dialog: dialog,
          state:  false
        };
      }
    },

    _getDialog: function(link, command) {
      var that          = this,
          dialogElement = this.container.querySelector("[data-wysihtml5-dialog='" + command + "']"),
          dialog,
          caretBookmark;

      if (dialogElement) {
        if (wysihtml5.toolbar["Dialog_" + command]) {
            dialog = new wysihtml5.toolbar["Dialog_" + command](link, dialogElement);
        } else {
            dialog = new wysihtml5.toolbar.Dialog(link, dialogElement);
        }

        dialog.on("show", function() {
          caretBookmark = that.composer.selection.getBookmark();

          that.editor.fire("show:dialog", { command: command, dialogContainer: dialogElement, commandLink: link });
        });

        dialog.on("save", function(attributes) {
          if (caretBookmark) {
            that.composer.selection.setBookmark(caretBookmark);
          }
          that._execCommand(command, attributes);

          that.editor.fire("save:dialog", { command: command, dialogContainer: dialogElement, commandLink: link });
        });

        dialog.on("cancel", function() {
          that.editor.focus(false);
          that.editor.fire("cancel:dialog", { command: command, dialogContainer: dialogElement, commandLink: link });
        });
      }
      return dialog;
    },

    /**
     * @example
     *    var toolbar = new wysihtml5.Toolbar();
     *    // Insert a <blockquote> element or wrap current selection in <blockquote>
     *    toolbar.execCommand("formatBlock", "blockquote");
     */
    execCommand: function(command, commandValue) {
      if (this.commandsDisabled) {
        return;
      }

      var commandObj = this.commandMapping[command + ":" + commandValue];

      // Show dialog when available
      if (commandObj && commandObj.dialog && !commandObj.state) {
        commandObj.dialog.show();
      } else {
        this._execCommand(command, commandValue);
      }
    },

    _execCommand: function(command, commandValue) {
      // Make sure that composer is focussed (false => don't move caret to the end)
      this.editor.focus(false);

      this.composer.commands.exec(command, commandValue);
      this._updateLinkStates();
    },

    execAction: function(action) {
      var editor = this.editor;
      if (action === "change_view") {
        if (editor.textarea) {
            if (editor.currentView === editor.textarea) {
              editor.fire("change_view", "composer");
            } else {
              editor.fire("change_view", "textarea");
            }
        }
      }
      if (action == "showSource") {
          editor.fire("showSource");
      }
    },

    _observe: function() {
      var that      = this,
          editor    = this.editor,
          container = this.container,
          links     = this.commandLinks.concat(this.actionLinks),
          length    = links.length,
          i         = 0;

      for (; i<length; i++) {
        // 'javascript:;' and unselectable=on Needed for IE, but done in all browsers to make sure that all get the same css applied
        // (you know, a:link { ... } doesn't match anchors with missing href attribute)
        if (links[i].nodeName === "A") {
          dom.setAttributes({
            href:         "javascript:;",
            unselectable: "on"
          }).on(links[i]);
        } else {
          dom.setAttributes({ unselectable: "on" }).on(links[i]);
        }
      }

      // Needed for opera and chrome
      dom.delegate(container, "[data-wysihtml5-command], [data-wysihtml5-action]", "mousedown", function(event) { event.preventDefault(); });

      dom.delegate(container, "[data-wysihtml5-command]", "click", function(event) {
        var link          = this,
            command       = link.getAttribute("data-wysihtml5-command"),
            commandValue  = link.getAttribute("data-wysihtml5-command-value");
        that.execCommand(command, commandValue);
        event.preventDefault();
      });

      dom.delegate(container, "[data-wysihtml5-action]", "click", function(event) {
        var action = this.getAttribute("data-wysihtml5-action");
        that.execAction(action);
        event.preventDefault();
      });

      editor.on("interaction:composer", function() {
          that._updateLinkStates();
      });

      editor.on("focus:composer", function() {
        that.bookmark = null;
      });

      if (this.editor.config.handleTables) {
          editor.on("tableselect:composer", function() {
              that.container.querySelectorAll('[data-wysihtml5-hiddentools="table"]')[0].style.display = "";
          });
          editor.on("tableunselect:composer", function() {
              that.container.querySelectorAll('[data-wysihtml5-hiddentools="table"]')[0].style.display = "none";
          });
      }

      editor.on("change_view", function(currentView) {
        // Set timeout needed in order to let the blur event fire first
        if (editor.textarea) {
            setTimeout(function() {
              that.commandsDisabled = (currentView !== "composer");
              that._updateLinkStates();
              if (that.commandsDisabled) {
                dom.addClass(container, CLASS_NAME_COMMANDS_DISABLED);
              } else {
                dom.removeClass(container, CLASS_NAME_COMMANDS_DISABLED);
              }
            }, 0);
        }
      });
    },

    _updateLinkStates: function() {

      var commandMapping    = this.commandMapping,
          actionMapping     = this.actionMapping,
          i,
          state,
          action,
          command;
      // every millisecond counts... this is executed quite often
      for (i in commandMapping) {
        command = commandMapping[i];
        if (this.commandsDisabled) {
          state = false;
          dom.removeClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
          if (command.group) {
            dom.removeClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
          }
          if (command.dialog) {
            command.dialog.hide();
          }
        } else {
          state = this.composer.commands.state(command.name, command.value);
          dom.removeClass(command.link, CLASS_NAME_COMMAND_DISABLED);
          if (command.group) {
            dom.removeClass(command.group, CLASS_NAME_COMMAND_DISABLED);
          }
        }
        if (command.state === state) {
          continue;
        }

        command.state = state;
        if (state) {
          dom.addClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
          if (command.group) {
            dom.addClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
          }
          if (command.dialog) {
            if (typeof(state) === "object" || wysihtml5.lang.object(state).isArray()) {

              if (!command.dialog.multiselect && wysihtml5.lang.object(state).isArray()) {
                // Grab first and only object/element in state array, otherwise convert state into boolean
                // to avoid showing a dialog for multiple selected elements which may have different attributes
                // eg. when two links with different href are selected, the state will be an array consisting of both link elements
                // but the dialog interface can only update one
                state = state.length === 1 ? state[0] : true;
                command.state = state;
              }
              command.dialog.show(state);
            } else {
              command.dialog.hide();
            }
          }
        } else {
          dom.removeClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
          if (command.group) {
            dom.removeClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
          }
          if (command.dialog) {
            command.dialog.hide();
          }
        }
      }

      for (i in actionMapping) {
        action = actionMapping[i];

        if (action.name === "change_view") {
          action.state = this.editor.currentView === this.editor.textarea;
          if (action.state) {
            dom.addClass(action.link, CLASS_NAME_ACTION_ACTIVE);
          } else {
            dom.removeClass(action.link, CLASS_NAME_ACTION_ACTIVE);
          }
        }
      }
    },

    show: function() {
      this.container.style.display = "";
    },

    hide: function() {
      this.container.style.display = "none";
    }
  });

})(wysihtml5);
;(function(wysihtml5) {
    wysihtml5.toolbar.Dialog_createTable = wysihtml5.toolbar.Dialog.extend({
        show: function(elementToChange) {
            this.base(elementToChange);

        }

    });
})(wysihtml5);
;(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
      SELECTOR_FIELDS         = "[data-wysihtml5-dialog-field]",
      ATTRIBUTE_FIELDS        = "data-wysihtml5-dialog-field";

  wysihtml5.toolbar.Dialog_foreColorStyle = wysihtml5.toolbar.Dialog.extend({
    multiselect: true,

    _serialize: function() {
      var data    = {},
          fields  = this.container.querySelectorAll(SELECTOR_FIELDS),
          length  = fields.length,
          i       = 0;

      for (; i<length; i++) {
        data[fields[i].getAttribute(ATTRIBUTE_FIELDS)] = fields[i].value;
      }
      return data;
    },

    _interpolate: function(avoidHiddenFields) {
      var field,
          fieldName,
          newValue,
          focusedElement = document.querySelector(":focus"),
          fields         = this.container.querySelectorAll(SELECTOR_FIELDS),
          length         = fields.length,
          i              = 0,
          firstElement   = (this.elementToChange) ? ((wysihtml5.lang.object(this.elementToChange).isArray()) ? this.elementToChange[0] : this.elementToChange) : null,
          colorStr       = (firstElement) ? firstElement.getAttribute('style') : null,
          color          = (colorStr) ? wysihtml5.quirks.styleParser.parseColor(colorStr, "color") : null;

      for (; i<length; i++) {
        field = fields[i];
        // Never change elements where the user is currently typing in
        if (field === focusedElement) {
          continue;
        }
        // Don't update hidden fields3
        if (avoidHiddenFields && field.type === "hidden") {
          continue;
        }
        if (field.getAttribute(ATTRIBUTE_FIELDS) === "color") {
          if (color) {
            if (color[3] && color[3] != 1) {
              field.value = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ");";
            } else {
              field.value = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ");";
            }
          } else {
            field.value = "rgb(0,0,0);";
          }
        }
      }
    }

  });
})(wysihtml5);
;(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
      SELECTOR_FIELDS         = "[data-wysihtml5-dialog-field]",
      ATTRIBUTE_FIELDS        = "data-wysihtml5-dialog-field";

  wysihtml5.toolbar.Dialog_fontSizeStyle = wysihtml5.toolbar.Dialog.extend({
    multiselect: true,

    _serialize: function() {
      return {"size" : this.container.querySelector('[data-wysihtml5-dialog-field="size"]').value};
    },

    _interpolate: function(avoidHiddenFields) {
      var focusedElement = document.querySelector(":focus"),
          field          = this.container.querySelector("[data-wysihtml5-dialog-field='size']"),
          firstElement   = (this.elementToChange) ? ((wysihtml5.lang.object(this.elementToChange).isArray()) ? this.elementToChange[0] : this.elementToChange) : null,
          styleStr       = (firstElement) ? firstElement.getAttribute('style') : null,
          size           = (styleStr) ? wysihtml5.quirks.styleParser.parseFontSize(styleStr) : null;

      if (field && field !== focusedElement && size && !(/^\s*$/).test(size)) {
        field.value = size;
      }
    }

  });
})(wysihtml5);
/*!

 handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
var Handlebars=function(){var a=function(){"use strict";function a(a){this.string=a}var b;return a.prototype.toString=function(){return""+this.string},b=a}(),b=function(a){"use strict";function b(a){return h[a]||"&amp;"}function c(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])}function d(a){return a instanceof g?a.toString():a||0===a?(a=""+a,j.test(a)?a.replace(i,b):a):""}function e(a){return a||0===a?m(a)&&0===a.length?!0:!1:!0}var f={},g=a,h={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},i=/[&<>"'`]/g,j=/[&<>"'`]/;f.extend=c;var k=Object.prototype.toString;f.toString=k;var l=function(a){return"function"==typeof a};l(/x/)&&(l=function(a){return"function"==typeof a&&"[object Function]"===k.call(a)});var l;f.isFunction=l;var m=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===k.call(a):!1};return f.isArray=m,f.escapeExpression=d,f.isEmpty=e,f}(a),c=function(){"use strict";function a(a,b){var d;b&&b.firstLine&&(d=b.firstLine,a+=" - "+d+":"+b.firstColumn);for(var e=Error.prototype.constructor.call(this,a),f=0;f<c.length;f++)this[c[f]]=e[c[f]];d&&(this.lineNumber=d,this.column=b.firstColumn)}var b,c=["description","fileName","lineNumber","message","name","number","stack"];return a.prototype=new Error,b=a}(),d=function(a,b){"use strict";function c(a,b){this.helpers=a||{},this.partials=b||{},d(this)}function d(a){a.registerHelper("helperMissing",function(a){if(2===arguments.length)return void 0;throw new h("Missing helper: '"+a+"'")}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse||function(){},e=c.fn;return m(b)&&(b=b.call(this)),b===!0?e(this):b===!1||null==b?d(this):l(b)?b.length>0?a.helpers.each(b,c):d(this):e(b)}),a.registerHelper("each",function(a,b){var c,d=b.fn,e=b.inverse,f=0,g="";if(m(a)&&(a=a.call(this)),b.data&&(c=q(b.data)),a&&"object"==typeof a)if(l(a))for(var h=a.length;h>f;f++)c&&(c.index=f,c.first=0===f,c.last=f===a.length-1),g+=d(a[f],{data:c});else for(var i in a)a.hasOwnProperty(i)&&(c&&(c.key=i,c.index=f,c.first=0===f),g+=d(a[i],{data:c}),f++);return 0===f&&(g=e(this)),g}),a.registerHelper("if",function(a,b){return m(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||g.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){return m(a)&&(a=a.call(this)),g.isEmpty(a)?void 0:b.fn(a)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)})}function e(a,b){p.log(a,b)}var f={},g=a,h=b,i="1.3.0";f.VERSION=i;var j=4;f.COMPILER_REVISION=j;var k={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:">= 1.0.0"};f.REVISION_CHANGES=k;var l=g.isArray,m=g.isFunction,n=g.toString,o="[object Object]";f.HandlebarsEnvironment=c,c.prototype={constructor:c,logger:p,log:e,registerHelper:function(a,b,c){if(n.call(a)===o){if(c||b)throw new h("Arg not supported with multiple helpers");g.extend(this.helpers,a)}else c&&(b.not=c),this.helpers[a]=b},registerPartial:function(a,b){n.call(a)===o?g.extend(this.partials,a):this.partials[a]=b}};var p={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(a,b){if(p.level<=a){var c=p.methodMap[a];"undefined"!=typeof console&&console[c]&&console[c].call(console,b)}}};f.logger=p,f.log=e;var q=function(a){var b={};return g.extend(b,a),b};return f.createFrame=q,f}(b,c),e=function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=m;if(b!==c){if(c>b){var d=n[c],e=n[b];throw new l("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new l("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){if(!b)throw new l("No environment passed to template");var c=function(a,c,d,e,f,g){var h=b.VM.invokePartial.apply(this,arguments);if(null!=h)return h;if(b.compile){var i={helpers:e,partials:f,data:g};return f[c]=b.compile(a,{data:void 0!==g},b),f[c](d,i)}throw new l("The partial "+c+" could not be compiled when running in runtime-only mode")},d={escapeExpression:k.escapeExpression,invokePartial:c,programs:[],program:function(a,b,c){var d=this.programs[a];return c?d=g(a,b,c):d||(d=this.programs[a]=g(a,b)),d},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c={},k.extend(c,b),k.extend(c,a)),c},programWithDepth:b.VM.programWithDepth,noop:b.VM.noop,compilerInfo:null};return function(c,e){e=e||{};var f,g,h=e.partial?e:b;e.partial||(f=e.helpers,g=e.partials);var i=a.call(d,h,c,f,g,e.data);return e.partial||b.VM.checkRevision(d.compilerInfo),i}}function f(a,b,c){var d=Array.prototype.slice.call(arguments,3),e=function(a,e){return e=e||{},b.apply(this,[a,e.data||c].concat(d))};return e.program=a,e.depth=d.length,e}function g(a,b,c){var d=function(a,d){return d=d||{},b(a,d.data||c)};return d.program=a,d.depth=0,d}function h(a,b,c,d,e,f){var g={partial:!0,helpers:d,partials:e,data:f};if(void 0===a)throw new l("The partial "+b+" could not be found");return a instanceof Function?a(c,g):void 0}function i(){return""}var j={},k=a,l=b,m=c.COMPILER_REVISION,n=c.REVISION_CHANGES;return j.checkRevision=d,j.template=e,j.programWithDepth=f,j.program=g,j.invokePartial=h,j.noop=i,j}(b,c,d),f=function(a,b,c,d,e){"use strict";var f,g=a,h=b,i=c,j=d,k=e,l=function(){var a=new g.HandlebarsEnvironment;return j.extend(a,g),a.SafeString=h,a.Exception=i,a.Utils=j,a.VM=k,a.template=function(b){return k.template(b,a)},a},m=l();return m.create=l,f=m}(d,a,c,b,e);return f}();this["wysihtml5"] = this["wysihtml5"] || {};
this["wysihtml5"]["tpl"] = this["wysihtml5"]["tpl"] || {};

this["wysihtml5"]["tpl"]["blockquote"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " \n      <span class=\"fa fa-quote-left\"></span>\n    ";
  }

function program5(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-quote\"></span>\n    ";
  }

  buffer += "<li>\n  <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"blockquote\" data-wysihtml5-display-format-name=\"false\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </a>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["color"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

  buffer += "<li class=\"dropdown\">\n  <a class=\"btn btn-default dropdown-toggle ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-toggle=\"dropdown\" tabindex=\"-1\">\n    <span class=\"current-color\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.black)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <b class=\"caret\"></b>\n  </a>\n  <ul class=\"dropdown-menu\">\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"black\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"black\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.black)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"silver\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"silver\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.silver)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"gray\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"gray\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.gray)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"maroon\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"maroon\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.maroon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"red\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"red\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.red)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"purple\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"purple\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.purple)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"green\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"green\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.green)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"olive\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"olive\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.olive)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"navy\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"navy\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.navy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"blue\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"blue\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.blue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"orange\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"orange\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.orange)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n  </ul>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["emphasis"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"small\" title=\"CTRL+S\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.emphasis)),stack1 == null || stack1 === false ? stack1 : stack1.small)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n    ";
  return buffer;
  }

  buffer += "<li>\n  <div class=\"btn-group\">\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"bold\" title=\"CTRL+B\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.emphasis)),stack1 == null || stack1 === false ? stack1 : stack1.bold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"italic\" title=\"CTRL+I\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.emphasis)),stack1 == null || stack1 === false ? stack1 : stack1.italic)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"underline\" title=\"CTRL+U\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.emphasis)),stack1 == null || stack1 === false ? stack1 : stack1.underline)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.emphasis)),stack1 == null || stack1 === false ? stack1 : stack1.small), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["font-styles"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-font\"></span>\n    ";
  }

function program5(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-font\"></span>\n    ";
  }

  buffer += "<li class=\"dropdown\">\n  <a class=\"btn btn-default dropdown-toggle ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-toggle=\"dropdown\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <span class=\"current-font\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.normal)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <b class=\"caret\"></b>\n  </a>\n  <ul class=\"dropdown-menu\">\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"p\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.normal)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h1\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h2\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h2)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h3\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h3)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h4\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h4)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h5\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h5)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h6\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h6)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n  </ul>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n        <span class=\"fa fa-pencil\"></span>\n      ";
  }

function program5(depth0,data) {
  
  
  return "\n        <span class=\"glyphicon glyphicon-pencil\"></span>\n      ";
  }

  buffer += "<li>\n  <div class=\"btn-group\">\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-action=\"change_view\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.html)),stack1 == null || stack1 === false ? stack1 : stack1.edit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n  </div>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["image"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "modal-sm";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-file-image-o\"></span>\n    ";
  }

function program7(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-picture\"></span>\n    ";
  }

  buffer += "<li>\n  <div class=\"bootstrap-wysihtml5-insert-image-modal modal fade\" data-wysihtml5-dialog=\"insertImage\">\n    <div class=\"modal-dialog ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.smallmodals), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <a class=\"close\" data-dismiss=\"modal\">&times;</a>\n          <h3>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.image)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"form-group\">\n            <input value=\"http://\" class=\"bootstrap-wysihtml5-insert-image-url form-control\" data-wysihtml5-dialog-field=\"src\">\n          </div> \n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"btn btn-default\" data-dismiss=\"modal\" data-wysihtml5-dialog-action=\"cancel\" href=\"#\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.image)),stack1 == null || stack1 === false ? stack1 : stack1.cancel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n          <a class=\"btn btn-primary\" data-dismiss=\"modal\"  data-wysihtml5-dialog-action=\"save\" href=\"#\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.image)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"insertImage\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.image)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </a>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["link"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "modal-sm";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-share-square-o\"></span>\n    ";
  }

function program7(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-share\"></span>\n    ";
  }

  buffer += "<li>\n  <div class=\"bootstrap-wysihtml5-insert-link-modal modal fade\" data-wysihtml5-dialog=\"createLink\">\n    <div class=\"modal-dialog ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.smallmodals), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <a class=\"close\" data-dismiss=\"modal\">&times;</a>\n          <h3>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.link)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"form-group\">\n            <input value=\"http://\" class=\"bootstrap-wysihtml5-insert-link-url form-control\" data-wysihtml5-dialog-field=\"href\">\n          </div> \n          <div class=\"checkbox\">\n            <label> \n              <input type=\"checkbox\" class=\"bootstrap-wysihtml5-insert-link-target\" checked>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.link)),stack1 == null || stack1 === false ? stack1 : stack1.target)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            </label>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"btn btn-default\" data-dismiss=\"modal\" data-wysihtml5-dialog-action=\"cancel\" href=\"#\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.link)),stack1 == null || stack1 === false ? stack1 : stack1.cancel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n          <a href=\"#\" class=\"btn btn-primary\" data-dismiss=\"modal\" data-wysihtml5-dialog-action=\"save\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.link)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"createLink\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.link)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </a>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["lists"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-list-ul\"></span>\n    ";
  }

function program5(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-list\"></span>\n    ";
  }

function program7(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-list-ol\"></span>\n    ";
  }

function program9(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-th-list\"></span>\n    ";
  }

function program11(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-outdent\"></span>\n    ";
  }

function program13(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-indent-right\"></span>\n    ";
  }

function program15(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-indent\"></span>\n    ";
  }

function program17(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-indent-left\"></span>\n    ";
  }

  buffer += "<li>\n  <div class=\"btn-group\">\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"insertUnorderedList\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.lists)),stack1 == null || stack1 === false ? stack1 : stack1.unordered)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"insertOrderedList\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.lists)),stack1 == null || stack1 === false ? stack1 : stack1.ordered)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"Outdent\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.lists)),stack1 == null || stack1 === false ? stack1 : stack1.outdent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"Indent\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.lists)),stack1 == null || stack1 === false ? stack1 : stack1.indent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n  </div>\n</li>\n";
  return buffer;
  });(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('bootstrap.wysihtml5', ['jquery', 'wysihtml5', 'bootstrap', 'bootstrap.wysihtml5.templates', 'bootstrap.wysihtml5.commands'], factory);
  } else {
    // Browser globals
    factory(jQuery, wysihtml5); // jshint ignore:line
  }
}(function ($, wysihtml5) {
  'use strict';
  var bsWysihtml5 = function($, wysihtml5) {

    var templates = function(key, locale, options) {
      if(wysihtml5.tpl[key]) {
        return wysihtml5.tpl[key]({locale: locale, options: options});
      }
    };

    var Wysihtml5 = function(el, options) {
      this.el = el;
      var toolbarOpts = $.extend(true, {}, defaultOptions, options);
      for(var t in toolbarOpts.customTemplates) {
        if (toolbarOpts.customTemplates.hasOwnProperty(t)) {
          wysihtml5.tpl[t] = toolbarOpts.customTemplates[t];
        }
      }
      this.toolbar = this.createToolbar(el, toolbarOpts);
      this.editor =  this.createEditor(toolbarOpts);
    };

    Wysihtml5.prototype = {

      constructor: Wysihtml5,

      createEditor: function(options) {
        options = options || {};

        // Add the toolbar to a clone of the options object so multiple instances
        // of the WYISYWG don't break because 'toolbar' is already defined
        options = $.extend(true, {}, options);
        options.toolbar = this.toolbar[0];
        
        this.initializeEditor(this.el[0], options);
      },


      initializeEditor: function(el, options) {
        var editor = new wysihtml5.Editor(this.el[0], options);

        editor.on('beforeload', this.syncBootstrapDialogEvents);
        editor.on('beforeload', this.loadParserRules);

        // #30 - body is in IE 10 not created by default, which leads to nullpointer
        // 2014/02/13 - adapted to wysihtml5-0.4, does not work in IE
        if(editor.composer.editableArea.contentDocument) {
          this.addMoreShortcuts(editor, 
                                editor.composer.editableArea.contentDocument.body || editor.composer.editableArea.contentDocument, 
                                options.shortcuts);
        } else {
          this.addMoreShortcuts(editor, editor.composer.editableArea, options.shortcuts);    
        }

        if(options && options.events) {
          for(var eventName in options.events) {
            if (options.events.hasOwnProperty(eventName)) {
              editor.on(eventName, options.events[eventName]);
            }
          }
        }

        return editor;
      },

      loadParserRules: function() {
        if($.type(this.config.parserRules) === 'string') {
          $.ajax({
            dataType: 'json',
            url: this.config.parserRules,
            context: this,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(errorThrown);
            },
            success: function (parserRules) {
              this.config.parserRules = parserRules;
              console.log('parserrules loaded');
            }
          });
        }

        if(this.config.pasteParserRulesets && $.type(this.config.pasteParserRulesets) === 'string') {
          $.ajax({
            dataType: 'json',
            url: this.config.pasteParserRulesets,
            context: this,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(errorThrown);
            },
            success: function (pasteParserRulesets) {
              this.config.pasteParserRulesets = pasteParserRulesets;
            }
          });
        }
      },

      //sync wysihtml5 events for dialogs with bootstrap events
      syncBootstrapDialogEvents: function() {
        var editor = this;
        $.map(this.toolbar.commandMapping, function(value) {
          return [value];
        }).filter(function(commandObj) {
          return commandObj.dialog;
        }).map(function(commandObj) {
          return commandObj.dialog;
        }).forEach(function(dialog) {
          dialog.on('show', function() {
            $(this.container).modal('show');
          });
          dialog.on('hide', function() {
            $(this.container).modal('hide');
            setTimeout(editor.composer.focus, 0);
          });
          $(dialog.container).on('shown.bs.modal', function () {
            $(this).find('input, select, textarea').first().focus();
          });
        });
        this.on('change_view', function() {
          $(this.toolbar.container.children).find('a.btn').not('[data-wysihtml5-action="change_view"]').toggleClass('disabled');
        });
      },

      createToolbar: function(el, options) {
        var self = this;
        var toolbar = $('<ul/>', {
          'class' : 'wysihtml5-toolbar',
          'style': 'display:none'
        });
        var culture = options.locale || defaultOptions.locale || 'en';
        if(!locale.hasOwnProperty(culture)) {
          console.debug('Locale \'' + culture + '\' not found. Available locales are: ' + Object.keys(locale) + '. Falling back to \'en\'.');
          culture = 'en';
        }
        var localeObject = $.extend(true, {}, locale.en, locale[culture]);
        for(var key in options.toolbar) {
          if(options.toolbar[key]) {
            toolbar.append(templates(key, localeObject, options));
          }
        }

        toolbar.find('a[data-wysihtml5-command="formatBlock"]').click(function(e) {
          var target = e.delegateTarget || e.target || e.srcElement,
          el = $(target),
          showformat = el.data('wysihtml5-display-format-name'),
          formatname = el.data('wysihtml5-format-name') || el.html();
          if(showformat === undefined || showformat === 'true') {
            self.toolbar.find('.current-font').text(formatname);
          }
        });

        toolbar.find('a[data-wysihtml5-command="foreColor"]').click(function(e) {
          var target = e.target || e.srcElement;
          var el = $(target);
          self.toolbar.find('.current-color').text(el.html());
        });

        this.el.before(toolbar);

        return toolbar;
      },

      addMoreShortcuts: function(editor, el, shortcuts) {
        /* some additional shortcuts */
        wysihtml5.dom.observe(el, 'keydown', function(event) {
          var keyCode  = event.keyCode,
          command  = shortcuts[keyCode];
          if ((event.ctrlKey || event.metaKey || event.altKey) && command && wysihtml5.commands[command]) {
            var commandObj = editor.toolbar.commandMapping[command + ':null'];
            if (commandObj && commandObj.dialog && !commandObj.state) {
              commandObj.dialog.show();
            } else {
              wysihtml5.commands[command].exec(editor.composer, command);
            }
            event.preventDefault();
          }
        });
      }
    };

    // these define our public api
    var methods = {
      resetDefaults: function() {
        $.fn.wysihtml5.defaultOptions = $.extend(true, {}, $.fn.wysihtml5.defaultOptionsCache);
      },
      bypassDefaults: function(options) {
        return this.each(function () {
          var $this = $(this);
          $this.data('wysihtml5', new Wysihtml5($this, options));
        });
      },
      shallowExtend: function (options) {
        var settings = $.extend({}, $.fn.wysihtml5.defaultOptions, options || {}, $(this).data());
        var that = this;
        return methods.bypassDefaults.apply(that, [settings]);
      },
      deepExtend: function(options) {
        var settings = $.extend(true, {}, $.fn.wysihtml5.defaultOptions, options || {});
        var that = this;
        return methods.bypassDefaults.apply(that, [settings]);
      },
      init: function(options) {
        var that = this;
        return methods.shallowExtend.apply(that, [options]);
      }
    };

    $.fn.wysihtml5 = function ( method ) {
      if ( methods[method] ) {
        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.wysihtml5' );
      }    
    };

    $.fn.wysihtml5.Constructor = Wysihtml5;

    var defaultOptions = $.fn.wysihtml5.defaultOptions = {
      toolbar: {
        'font-styles': true,
        'color': false,
        'emphasis': {
          'small': true
        },
        'blockquote': true,
        'lists': true,
        'html': false,
        'link': true,
        'image': true,
        'smallmodals': false
      },
      useLineBreaks: false,
      parserRules: {
        classes: {
          'wysiwyg-color-silver' : 1,
          'wysiwyg-color-gray' : 1,
          'wysiwyg-color-white' : 1,
          'wysiwyg-color-maroon' : 1,
          'wysiwyg-color-red' : 1,
          'wysiwyg-color-purple' : 1,
          'wysiwyg-color-fuchsia' : 1,
          'wysiwyg-color-green' : 1,
          'wysiwyg-color-lime' : 1,
          'wysiwyg-color-olive' : 1,
          'wysiwyg-color-yellow' : 1,
          'wysiwyg-color-navy' : 1,
          'wysiwyg-color-blue' : 1,
          'wysiwyg-color-teal' : 1,
          'wysiwyg-color-aqua' : 1,
          'wysiwyg-color-orange' : 1
        },
        tags: {
          'b':  {},
          'i':  {},
          'strong': {},
          'em': {},
          'p': {},
          'br': {},
          'ol': {},
          'ul': {},
          'li': {},
          'h1': {},
          'h2': {},
          'h3': {},
          'h4': {},
          'h5': {},
          'h6': {},
          'blockquote': {},
          'u': 1,
          'img': {
            'check_attributes': {
              'width': 'numbers',
              'alt': 'alt',
              'src': 'url',
              'height': 'numbers'
            }
          },
          'a':  {
            'check_attributes': {
              'href': 'url'
            },
            'set_attributes': {
              'target': '_blank',
              'rel': 'nofollow'
            }
          },
          'span': 1,
          'div': 1,
          'small': 1,
          'code': 1,
          'pre': 1
        }
      },
      locale: 'en',
      shortcuts: {
        '83': 'small',// S
        '75': 'createLink'// K
      }
    };

    if (typeof $.fn.wysihtml5.defaultOptionsCache === 'undefined') {
      $.fn.wysihtml5.defaultOptionsCache = $.extend(true, {}, $.fn.wysihtml5.defaultOptions);
    }

    var locale = $.fn.wysihtml5.locale = {};
  };
  bsWysihtml5($, wysihtml5);
}));
(function(wysihtml5) {
  wysihtml5.commands.small = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatInline.exec(composer, command, "small");
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatInline.state(composer, command, "small");
    }
  };
})(wysihtml5);

/**
 * English translation for bootstrap-wysihtml5
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('bootstrap.wysihtml5.en-US', ['jquery', 'bootstrap.wysihtml5'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
  $.fn.wysihtml5.locale.en = $.fn.wysihtml5.locale['en-US'] = {
    font_styles: {
      normal: 'Normal text',
      h1: 'Heading 1',
      h2: 'Heading 2',
      h3: 'Heading 3',
      h4: 'Heading 4',
      h5: 'Heading 5',
      h6: 'Heading 6'
    },
    emphasis: {
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      small: 'Small'
    },
    lists: {
      unordered: 'Unordered list',
      ordered: 'Ordered list',
      outdent: 'Outdent',
      indent: 'Indent'
    },
    link: {
      insert: 'Insert link',
      cancel: 'Cancel',
      target: 'Open link in new window'
    },
    image: {
      insert: 'Insert image',
      cancel: 'Cancel'
    },
    html: {
      edit: 'Edit HTML'
    },
    colours: {
      black: 'Black',
      silver: 'Silver',
      gray: 'Grey',
      maroon: 'Maroon',
      red: 'Red',
      purple: 'Purple',
      green: 'Green',
      olive: 'Olive',
      navy: 'Navy',
      blue: 'Blue',
      orange: 'Orange'
    }
  };
}));
