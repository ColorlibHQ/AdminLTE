/**
 * @license Highcharts JS v7.2.0 (2019-09-03)
 *
 * 3D features for Highcharts JS
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/highcharts-3d', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'parts-3d/Math.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        // Mathematical Functionility
        var deg2rad = H.deg2rad, pick = H.pick;
        /* eslint-disable max-len */
        /**
         * Apply 3-D rotation
         * Euler Angles (XYZ):
         *     cosA = cos(Alfa|Roll)
         *     cosB = cos(Beta|Pitch)
         *     cosG = cos(Gamma|Yaw)
         *
         * Composite rotation:
         * |          cosB * cosG             |           cosB * sinG            |    -sinB    |
         * | sinA * sinB * cosG - cosA * sinG | sinA * sinB * sinG + cosA * cosG | sinA * cosB |
         * | cosA * sinB * cosG + sinA * sinG | cosA * sinB * sinG - sinA * cosG | cosA * cosB |
         *
         * Now, Gamma/Yaw is not used (angle=0), so we assume cosG = 1 and sinG = 0, so
         * we get:
         * |     cosB    |   0    |   - sinB    |
         * | sinA * sinB |  cosA  | sinA * cosB |
         * | cosA * sinB | - sinA | cosA * cosB |
         *
         * But in browsers, y is reversed, so we get sinA => -sinA. The general result
         * is:
         * |      cosB     |   0    |    - sinB     |     | x |     | px |
         * | - sinA * sinB |  cosA  | - sinA * cosB |  x  | y |  =  | py |
         * |  cosA * sinB  |  sinA  |  cosA * cosB  |     | z |     | pz |
         *
         * @private
         * @function rotate3D
         */
        /* eslint-enable max-len */
        /**
         * @private
         * @param {number} x
         *        X coordinate
         * @param {number} y
         *        Y coordinate
         * @param {number} z
         *        Z coordinate
         * @param {Highcharts.Rotation3dObject} angles
         *        Rotation angles
         * @return {Highcharts.Rotation3dObject}
         *         Rotated position
         */
        function rotate3D(x, y, z, angles) {
            return {
                x: angles.cosB * x - angles.sinB * z,
                y: -angles.sinA * angles.sinB * x + angles.cosA * y -
                    angles.cosB * angles.sinA * z,
                z: angles.cosA * angles.sinB * x + angles.sinA * y +
                    angles.cosA * angles.cosB * z
            };
        }
        /**
         * Perspective3D function is available in global Highcharts scope because is
         * needed also outside of perspective() function (#8042).
         * @private
         * @function Highcharts.perspective3D
         * @param {Highcharts.Position3dObject} coordinate
         *        3D position
         * @param {Highcharts.Position3dObject} origin
         *        3D root position
         * @param {number} distance
         *        Perspective distance
         * @return {Highcharts.PositionObject}
         *         Perspective 3D Position
         */
        H.perspective3D = function (coordinate, origin, distance) {
            var projection = ((distance > 0) && (distance < Number.POSITIVE_INFINITY)) ?
                distance / (coordinate.z + origin.z + distance) :
                1;
            return {
                x: coordinate.x * projection,
                y: coordinate.y * projection
            };
        };
        /**
         * Transforms a given array of points according to the angles in chart.options.
         *
         * @private
         * @function Highcharts.perspective
         * @param {Array<Highcharts.Position3dObject>} points
         *        The array of points
         * @param {Highcharts.Chart} chart
         *        The chart
         * @param {boolean} [insidePlotArea]
         *        Wether to verifiy the points are inside the plotArea
         * @return {Array<Highcharts.Position3dObject>}
         *         An array of transformed points
         */
        H.perspective = function (points, chart, insidePlotArea) {
            var options3d = chart.options.chart.options3d, inverted = insidePlotArea ? chart.inverted : false, origin = {
                x: chart.plotWidth / 2,
                y: chart.plotHeight / 2,
                z: options3d.depth / 2,
                vd: pick(options3d.depth, 1) * pick(options3d.viewDistance, 0)
            }, scale = chart.scale3d || 1, beta = deg2rad * options3d.beta * (inverted ? -1 : 1), alpha = deg2rad * options3d.alpha * (inverted ? -1 : 1), angles = {
                cosA: Math.cos(alpha),
                cosB: Math.cos(-beta),
                sinA: Math.sin(alpha),
                sinB: Math.sin(-beta)
            };
            if (!insidePlotArea) {
                origin.x += chart.plotLeft;
                origin.y += chart.plotTop;
            }
            // Transform each point
            return points.map(function (point) {
                var rotated = rotate3D((inverted ? point.y : point.x) - origin.x, (inverted ? point.x : point.y) - origin.y, (point.z || 0) - origin.z, angles), 
                // Apply perspective
                coordinate = H.perspective3D(rotated, origin, origin.vd);
                // Apply translation
                coordinate.x = coordinate.x * scale + origin.x;
                coordinate.y = coordinate.y * scale + origin.y;
                coordinate.z = rotated.z * scale + origin.z;
                return {
                    x: (inverted ? coordinate.y : coordinate.x),
                    y: (inverted ? coordinate.x : coordinate.y),
                    z: coordinate.z
                };
            });
        };
        /**
         * Calculate a distance from camera to points - made for calculating zIndex of
         * scatter points.
         *
         * @private
         * @function Highcharts.pointCameraDistance
         * @param {Highcharts.Dictionary<number>} coordinates
         *        Coordinates of the specific point
         * @param {Highcharts.Chart} chart
         *        Related chart
         * @return {number}
         *         Distance from camera to point
         */
        H.pointCameraDistance = function (coordinates, chart) {
            var options3d = chart.options.chart.options3d, cameraPosition = {
                x: chart.plotWidth / 2,
                y: chart.plotHeight / 2,
                z: pick(options3d.depth, 1) * pick(options3d.viewDistance, 0) +
                    options3d.depth
            }, distance = Math.sqrt(Math.pow(cameraPosition.x - coordinates.plotX, 2) +
                Math.pow(cameraPosition.y - coordinates.plotY, 2) +
                Math.pow(cameraPosition.z - coordinates.plotZ, 2));
            return distance;
        };
        /**
         * Calculate area of a 2D polygon using Shoelace algorithm
         * http://en.wikipedia.org/wiki/Shoelace_formula
         *
         * @private
         * @function Highcharts.shapeArea
         * @param {Array<Highcharts.PositionObject>} vertexes
         *        2D Polygon
         * @return {number}
         *         Calculated area
         */
        H.shapeArea = function (vertexes) {
            var area = 0, i, j;
            for (i = 0; i < vertexes.length; i++) {
                j = (i + 1) % vertexes.length;
                area += vertexes[i].x * vertexes[j].y - vertexes[j].x * vertexes[i].y;
            }
            return area / 2;
        };
        /**
         * Calculate area of a 3D polygon after perspective projection
         *
         * @private
         * @function Highcharts.shapeArea3d
         * @param {Array<Highcharts.Position3dObject>} vertexes
         *        3D Polygon
         * @param {Highcharts.Chart} chart
         *        Related chart
         * @param {boolean} [insidePlotArea]
         *        Wether to verifiy the points are inside the plotArea
         * @return {number}
         *         Calculated area
         */
        H.shapeArea3d = function (vertexes, chart, insidePlotArea) {
            return H.shapeArea(H.perspective(vertexes, chart, insidePlotArea));
        };

    });
    _registerModule(_modules, 'parts-3d/SVGRenderer.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  Extensions to the SVGRenderer class to enable 3D shapes
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined, objectEach = U.objectEach;
        var cos = Math.cos, PI = Math.PI, sin = Math.sin;
        var animObject = H.animObject, charts = H.charts, color = H.color, deg2rad = H.deg2rad, extend = H.extend, merge = H.merge, perspective = H.perspective, pick = H.pick, SVGElement = H.SVGElement, SVGRenderer = H.SVGRenderer, 
        // internal:
        dFactor, element3dMethods, cuboidMethods;
        /*
            EXTENSION TO THE SVG-RENDERER TO ENABLE 3D SHAPES
        */
        // HELPER METHODS
        dFactor = (4 * (Math.sqrt(2) - 1) / 3) / (PI / 2);
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * Method to construct a curved path. Can 'wrap' around more then 180 degrees.
         * @private
         */
        function curveTo(cx, cy, rx, ry, start, end, dx, dy) {
            var result = [], arcAngle = end - start;
            if ((end > start) && (end - start > Math.PI / 2 + 0.0001)) {
                result = result.concat(curveTo(cx, cy, rx, ry, start, start + (Math.PI / 2), dx, dy));
                result = result.concat(curveTo(cx, cy, rx, ry, start + (Math.PI / 2), end, dx, dy));
                return result;
            }
            if ((end < start) && (start - end > Math.PI / 2 + 0.0001)) {
                result = result.concat(curveTo(cx, cy, rx, ry, start, start - (Math.PI / 2), dx, dy));
                result = result.concat(curveTo(cx, cy, rx, ry, start - (Math.PI / 2), end, dx, dy));
                return result;
            }
            return [
                'C',
                cx + (rx * Math.cos(start)) -
                    ((rx * dFactor * arcAngle) * Math.sin(start)) + dx,
                cy + (ry * Math.sin(start)) +
                    ((ry * dFactor * arcAngle) * Math.cos(start)) + dy,
                cx + (rx * Math.cos(end)) +
                    ((rx * dFactor * arcAngle) * Math.sin(end)) + dx,
                cy + (ry * Math.sin(end)) -
                    ((ry * dFactor * arcAngle) * Math.cos(end)) + dy,
                cx + (rx * Math.cos(end)) + dx,
                cy + (ry * Math.sin(end)) + dy
            ];
        }
        SVGRenderer.prototype.toLinePath = function (points, closed) {
            var result = [];
            // Put "L x y" for each point
            points.forEach(function (point) {
                result.push('L', point.x, point.y);
            });
            if (points.length) {
                // Set the first element to M
                result[0] = 'M';
                // If it is a closed line, add Z
                if (closed) {
                    result.push('Z');
                }
            }
            return result;
        };
        SVGRenderer.prototype.toLineSegments = function (points) {
            var result = [], m = true;
            points.forEach(function (point) {
                result.push(m ? 'M' : 'L', point.x, point.y);
                m = !m;
            });
            return result;
        };
        // A 3-D Face is defined by it's 3D vertexes, and is only visible if it's
        // vertexes are counter-clockwise (Back-face culling). It is used as a
        // polyhedron Element
        SVGRenderer.prototype.face3d = function (args) {
            var renderer = this, ret = this.createElement('path');
            ret.vertexes = [];
            ret.insidePlotArea = false;
            ret.enabled = true;
            ret.attr = function (hash) {
                if (typeof hash === 'object' &&
                    (defined(hash.enabled) ||
                        defined(hash.vertexes) ||
                        defined(hash.insidePlotArea))) {
                    this.enabled = pick(hash.enabled, this.enabled);
                    this.vertexes = pick(hash.vertexes, this.vertexes);
                    this.insidePlotArea = pick(hash.insidePlotArea, this.insidePlotArea);
                    delete hash.enabled;
                    delete hash.vertexes;
                    delete hash.insidePlotArea;
                    var chart = charts[renderer.chartIndex], vertexes2d = perspective(this.vertexes, chart, this.insidePlotArea), path = renderer.toLinePath(vertexes2d, true), area = H.shapeArea(vertexes2d), visibility = (this.enabled && area > 0) ? 'visible' : 'hidden';
                    hash.d = path;
                    hash.visibility = visibility;
                }
                return SVGElement.prototype.attr.apply(this, arguments);
            };
            ret.animate = function (params) {
                if (typeof params === 'object' &&
                    (defined(params.enabled) ||
                        defined(params.vertexes) ||
                        defined(params.insidePlotArea))) {
                    this.enabled = pick(params.enabled, this.enabled);
                    this.vertexes = pick(params.vertexes, this.vertexes);
                    this.insidePlotArea = pick(params.insidePlotArea, this.insidePlotArea);
                    delete params.enabled;
                    delete params.vertexes;
                    delete params.insidePlotArea;
                    var chart = charts[renderer.chartIndex], vertexes2d = perspective(this.vertexes, chart, this.insidePlotArea), path = renderer.toLinePath(vertexes2d, true), area = H.shapeArea(vertexes2d), visibility = (this.enabled && area > 0) ? 'visible' : 'hidden';
                    params.d = path;
                    this.attr('visibility', visibility);
                }
                return SVGElement.prototype.animate.apply(this, arguments);
            };
            return ret.attr(args);
        };
        // A Polyhedron is a handy way of defining a group of 3-D faces. It's only
        // attribute is `faces`, an array of attributes of each one of it's Face3D
        // instances.
        SVGRenderer.prototype.polyhedron = function (args) {
            var renderer = this, result = this.g(), destroy = result.destroy;
            if (!this.styledMode) {
                result.attr({
                    'stroke-linejoin': 'round'
                });
            }
            result.faces = [];
            // destroy all children
            result.destroy = function () {
                for (var i = 0; i < result.faces.length; i++) {
                    result.faces[i].destroy();
                }
                return destroy.call(this);
            };
            result.attr = function (hash, val, complete, continueAnimation) {
                if (typeof hash === 'object' && defined(hash.faces)) {
                    while (result.faces.length > hash.faces.length) {
                        result.faces.pop().destroy();
                    }
                    while (result.faces.length < hash.faces.length) {
                        result.faces.push(renderer.face3d().add(result));
                    }
                    for (var i = 0; i < hash.faces.length; i++) {
                        if (renderer.styledMode) {
                            delete hash.faces[i].fill;
                        }
                        result.faces[i].attr(hash.faces[i], null, complete, continueAnimation);
                    }
                    delete hash.faces;
                }
                return SVGElement.prototype.attr.apply(this, arguments);
            };
            result.animate = function (params, duration, complete) {
                if (params && params.faces) {
                    while (result.faces.length > params.faces.length) {
                        result.faces.pop().destroy();
                    }
                    while (result.faces.length < params.faces.length) {
                        result.faces.push(renderer.face3d().add(result));
                    }
                    for (var i = 0; i < params.faces.length; i++) {
                        result.faces[i].animate(params.faces[i], duration, complete);
                    }
                    delete params.faces;
                }
                return SVGElement.prototype.animate.apply(this, arguments);
            };
            return result.attr(args);
        };
        // Base, abstract prototype member for 3D elements
        element3dMethods = {
            /**
             * The init is used by base - renderer.Element
             * @private
             */
            initArgs: function (args) {
                var elem3d = this, renderer = elem3d.renderer, paths = renderer[elem3d.pathType + 'Path'](args), zIndexes = paths.zIndexes;
                // build parts
                elem3d.parts.forEach(function (part) {
                    elem3d[part] = renderer.path(paths[part]).attr({
                        'class': 'highcharts-3d-' + part,
                        zIndex: zIndexes[part] || 0
                    }).add(elem3d);
                });
                elem3d.attr({
                    'stroke-linejoin': 'round',
                    zIndex: zIndexes.group
                });
                // store original destroy
                elem3d.originalDestroy = elem3d.destroy;
                elem3d.destroy = elem3d.destroyParts;
            },
            /**
             * Single property setter that applies options to each part
             * @private
             */
            singleSetterForParts: function (prop, val, values, verb, duration, complete) {
                var elem3d = this, newAttr = {}, optionsToApply = [null, null, (verb || 'attr'), duration, complete], hasZIndexes = values && values.zIndexes;
                if (!values) {
                    newAttr[prop] = val;
                    optionsToApply[0] = newAttr;
                }
                else {
                    objectEach(values, function (partVal, part) {
                        newAttr[part] = {};
                        newAttr[part][prop] = partVal;
                        // include zIndexes if provided
                        if (hasZIndexes) {
                            newAttr[part].zIndex = values.zIndexes[part] || 0;
                        }
                    });
                    optionsToApply[1] = newAttr;
                }
                return elem3d.processParts.apply(elem3d, optionsToApply);
            },
            /**
             * Calls function for each part. Used for attr, animate and destroy.
             * @private
             */
            processParts: function (props, partsProps, verb, duration, complete) {
                var elem3d = this;
                elem3d.parts.forEach(function (part) {
                    // if different props for different parts
                    if (partsProps) {
                        props = H.pick(partsProps[part], false);
                    }
                    // only if something to set, but allow undefined
                    if (props !== false) {
                        elem3d[part][verb](props, duration, complete);
                    }
                });
                return elem3d;
            },
            /**
             * Destroy all parts
             * @private
             */
            destroyParts: function () {
                this.processParts(null, null, 'destroy');
                return this.originalDestroy();
            }
        };
        // CUBOID
        cuboidMethods = H.merge(element3dMethods, {
            parts: ['front', 'top', 'side'],
            pathType: 'cuboid',
            attr: function (args, val, complete, continueAnimation) {
                // Resolve setting attributes by string name
                if (typeof args === 'string' && typeof val !== 'undefined') {
                    var key = args;
                    args = {};
                    args[key] = val;
                }
                if (args.shapeArgs || defined(args.x)) {
                    return this.singleSetterForParts('d', null, this.renderer[this.pathType + 'Path'](args.shapeArgs || args));
                }
                return SVGElement.prototype.attr.call(this, args, undefined, complete, continueAnimation);
            },
            animate: function (args, duration, complete) {
                if (defined(args.x) && defined(args.y)) {
                    var paths = this.renderer[this.pathType + 'Path'](args);
                    this.singleSetterForParts('d', null, paths, 'animate', duration, complete);
                    this.attr({
                        zIndex: paths.zIndexes.group
                    });
                }
                else {
                    SVGElement.prototype.animate.call(this, args, duration, complete);
                }
                return this;
            },
            fillSetter: function (fill) {
                this.singleSetterForParts('fill', null, {
                    front: fill,
                    top: color(fill).brighten(0.1).get(),
                    side: color(fill).brighten(-0.1).get()
                });
                // fill for animation getter (#6776)
                this.color = this.fill = fill;
                return this;
            }
        });
        // set them up
        SVGRenderer.prototype.elements3d = {
            base: element3dMethods,
            cuboid: cuboidMethods
        };
        /**
         * return result, generalization
         * @private
         */
        SVGRenderer.prototype.element3d = function (type, shapeArgs) {
            // base
            var ret = this.g();
            // extend
            H.extend(ret, this.elements3d[type]);
            // init
            ret.initArgs(shapeArgs);
            // return
            return ret;
        };
        // generelized, so now use simply
        SVGRenderer.prototype.cuboid = function (shapeArgs) {
            return this.element3d('cuboid', shapeArgs);
        };
        // Generates a cuboid path and zIndexes
        H.SVGRenderer.prototype.cuboidPath = function (shapeArgs) {
            var x = shapeArgs.x, y = shapeArgs.y, z = shapeArgs.z, h = shapeArgs.height, w = shapeArgs.width, d = shapeArgs.depth, chart = charts[this.chartIndex], front, back, top, bottom, left, right, shape, path1, path2, path3, isFront, isTop, isRight, options3d = chart.options.chart.options3d, alpha = options3d.alpha, 
            // Priority for x axis is the biggest,
            // because of x direction has biggest influence on zIndex
            incrementX = 10000, 
            // y axis has the smallest priority in case of our charts
            // (needs to be set because of stacking)
            incrementY = 10, incrementZ = 100, zIndex = 0, 
            // The 8 corners of the cube
            pArr = [{
                    x: x,
                    y: y,
                    z: z
                }, {
                    x: x + w,
                    y: y,
                    z: z
                }, {
                    x: x + w,
                    y: y + h,
                    z: z
                }, {
                    x: x,
                    y: y + h,
                    z: z
                }, {
                    x: x,
                    y: y + h,
                    z: z + d
                }, {
                    x: x + w,
                    y: y + h,
                    z: z + d
                }, {
                    x: x + w,
                    y: y,
                    z: z + d
                }, {
                    x: x,
                    y: y,
                    z: z + d
                }], pickShape;
            // apply perspective
            pArr = perspective(pArr, chart, shapeArgs.insidePlotArea);
            /**
             * helper method to decide which side is visible
             * @private
             */
            function mapPath(i) {
                return pArr[i];
            }
            /**
             * First value - path with specific side
             * Second  value - added information about side for later calculations.
             * Possible second values are 0 for path1, 1 for path2 and -1 for no path
             * chosen.
             * @private
             */
            pickShape = function (path1, path2) {
                var ret = [[], -1];
                path1 = path1.map(mapPath);
                path2 = path2.map(mapPath);
                if (H.shapeArea(path1) < 0) {
                    ret = [path1, 0];
                }
                else if (H.shapeArea(path2) < 0) {
                    ret = [path2, 1];
                }
                return ret;
            };
            // front or back
            front = [3, 2, 1, 0];
            back = [7, 6, 5, 4];
            shape = pickShape(front, back);
            path1 = shape[0];
            isFront = shape[1];
            // top or bottom
            top = [1, 6, 7, 0];
            bottom = [4, 5, 2, 3];
            shape = pickShape(top, bottom);
            path2 = shape[0];
            isTop = shape[1];
            // side
            right = [1, 2, 5, 6];
            left = [0, 7, 4, 3];
            shape = pickShape(right, left);
            path3 = shape[0];
            isRight = shape[1];
            /* New block used for calculating zIndex. It is basing on X, Y and Z
               position of specific columns. All zIndexes (for X, Y and Z values) are
               added to the final zIndex, where every value has different priority. The
               biggest priority is in X and Z directions, the lowest index is for
               stacked columns (Y direction and the same X and Z positions). Big
               differences between priorities is made because we need to ensure that
               even for big changes in Y and Z parameters all columns will be drawn
               correctly. */
            if (isRight === 1) {
                zIndex += incrementX * (1000 - x);
            }
            else if (!isRight) {
                zIndex += incrementX * x;
            }
            zIndex += incrementY * (!isTop ||
                // Numbers checked empirically
                (alpha >= 0 && alpha <= 180 || alpha < 360 && alpha > 357.5) ?
                chart.plotHeight - y : 10 + y);
            if (isFront === 1) {
                zIndex += incrementZ * (z);
            }
            else if (!isFront) {
                zIndex += incrementZ * (1000 - z);
            }
            return {
                front: this.toLinePath(path1, true),
                top: this.toLinePath(path2, true),
                side: this.toLinePath(path3, true),
                zIndexes: {
                    group: Math.round(zIndex)
                },
                // additional info about zIndexes
                isFront: isFront,
                isTop: isTop
            }; // #4774
        };
        // SECTORS //
        H.SVGRenderer.prototype.arc3d = function (attribs) {
            var wrapper = this.g(), renderer = wrapper.renderer, customAttribs = ['x', 'y', 'r', 'innerR', 'start', 'end'];
            /**
             * Get custom attributes. Don't mutate the original object and return an
             * object with only custom attr.
             * @private
             */
            function suckOutCustom(params) {
                var hasCA = false, ca = {}, key;
                params = merge(params); // Don't mutate the original object
                for (key in params) {
                    if (customAttribs.indexOf(key) !== -1) {
                        ca[key] = params[key];
                        delete params[key];
                        hasCA = true;
                    }
                }
                return hasCA ? ca : false;
            }
            attribs = merge(attribs);
            attribs.alpha = (attribs.alpha || 0) * deg2rad;
            attribs.beta = (attribs.beta || 0) * deg2rad;
            // Create the different sub sections of the shape
            wrapper.top = renderer.path();
            wrapper.side1 = renderer.path();
            wrapper.side2 = renderer.path();
            wrapper.inn = renderer.path();
            wrapper.out = renderer.path();
            // Add all faces
            wrapper.onAdd = function () {
                var parent = wrapper.parentGroup, className = wrapper.attr('class');
                wrapper.top.add(wrapper);
                // These faces are added outside the wrapper group because the z index
                // relates to neighbour elements as well
                ['out', 'inn', 'side1', 'side2'].forEach(function (face) {
                    wrapper[face]
                        .attr({
                        'class': className + ' highcharts-3d-side'
                    })
                        .add(parent);
                });
            };
            // Cascade to faces
            ['addClass', 'removeClass'].forEach(function (fn) {
                wrapper[fn] = function () {
                    var args = arguments;
                    ['top', 'out', 'inn', 'side1', 'side2'].forEach(function (face) {
                        wrapper[face][fn].apply(wrapper[face], args);
                    });
                };
            });
            /**
             * Compute the transformed paths and set them to the composite shapes
             * @private
             */
            wrapper.setPaths = function (attribs) {
                var paths = wrapper.renderer.arc3dPath(attribs), zIndex = paths.zTop * 100;
                wrapper.attribs = attribs;
                wrapper.top.attr({ d: paths.top, zIndex: paths.zTop });
                wrapper.inn.attr({ d: paths.inn, zIndex: paths.zInn });
                wrapper.out.attr({ d: paths.out, zIndex: paths.zOut });
                wrapper.side1.attr({ d: paths.side1, zIndex: paths.zSide1 });
                wrapper.side2.attr({ d: paths.side2, zIndex: paths.zSide2 });
                // show all children
                wrapper.zIndex = zIndex;
                wrapper.attr({ zIndex: zIndex });
                // Set the radial gradient center the first time
                if (attribs.center) {
                    wrapper.top.setRadialReference(attribs.center);
                    delete attribs.center;
                }
            };
            wrapper.setPaths(attribs);
            /**
             * Apply the fill to the top and a darker shade to the sides
             * @private
             */
            wrapper.fillSetter = function (value) {
                var darker = color(value).brighten(-0.1).get();
                this.fill = value;
                this.side1.attr({ fill: darker });
                this.side2.attr({ fill: darker });
                this.inn.attr({ fill: darker });
                this.out.attr({ fill: darker });
                this.top.attr({ fill: value });
                return this;
            };
            // Apply the same value to all. These properties cascade down to the
            // children when set to the composite arc3d.
            ['opacity', 'translateX', 'translateY', 'visibility'].forEach(function (setter) {
                wrapper[setter + 'Setter'] = function (value, key) {
                    wrapper[key] = value;
                    ['out', 'inn', 'side1', 'side2', 'top'].forEach(function (el) {
                        wrapper[el].attr(key, value);
                    });
                };
            });
            // Override attr to remove shape attributes and use those to set child paths
            wrapper.attr = function (params) {
                var ca;
                if (typeof params === 'object') {
                    ca = suckOutCustom(params);
                    if (ca) {
                        extend(wrapper.attribs, ca);
                        wrapper.setPaths(wrapper.attribs);
                    }
                }
                return SVGElement.prototype.attr.apply(wrapper, arguments);
            };
            // Override the animate function by sucking out custom parameters related to
            // the shapes directly, and update the shapes from the animation step.
            wrapper.animate = function (params, animation, complete) {
                var ca, from = this.attribs, to, anim, randomProp = 'data-' + Math.random().toString(26).substring(2, 9);
                // Attribute-line properties connected to 3D. These shouldn't have been
                // in the attribs collection in the first place.
                delete params.center;
                delete params.z;
                delete params.depth;
                delete params.alpha;
                delete params.beta;
                anim = animObject(pick(animation, this.renderer.globalAnimation));
                if (anim.duration) {
                    ca = suckOutCustom(params);
                    // Params need to have a property in order for the step to run
                    // (#5765, #7097, #7437)
                    wrapper[randomProp] = 0;
                    params[randomProp] = 1;
                    wrapper[randomProp + 'Setter'] = H.noop;
                    if (ca) {
                        to = ca;
                        anim.step = function (a, fx) {
                            /**
                             * @private
                             */
                            function interpolate(key) {
                                return from[key] + (pick(to[key], from[key]) -
                                    from[key]) * fx.pos;
                            }
                            if (fx.prop === randomProp) {
                                fx.elem.setPaths(merge(from, {
                                    x: interpolate('x'),
                                    y: interpolate('y'),
                                    r: interpolate('r'),
                                    innerR: interpolate('innerR'),
                                    start: interpolate('start'),
                                    end: interpolate('end')
                                }));
                            }
                        };
                    }
                    animation = anim; // Only when duration (#5572)
                }
                return SVGElement.prototype.animate.call(this, params, animation, complete);
            };
            // destroy all children
            wrapper.destroy = function () {
                this.top.destroy();
                this.out.destroy();
                this.inn.destroy();
                this.side1.destroy();
                this.side2.destroy();
                return SVGElement.prototype.destroy.call(this);
            };
            // hide all children
            wrapper.hide = function () {
                this.top.hide();
                this.out.hide();
                this.inn.hide();
                this.side1.hide();
                this.side2.hide();
            };
            wrapper.show = function (inherit) {
                this.top.show(inherit);
                this.out.show(inherit);
                this.inn.show(inherit);
                this.side1.show(inherit);
                this.side2.show(inherit);
            };
            return wrapper;
        };
        // Generate the paths required to draw a 3D arc
        SVGRenderer.prototype.arc3dPath = function (shapeArgs) {
            var cx = shapeArgs.x, // x coordinate of the center
            cy = shapeArgs.y, // y coordinate of the center
            start = shapeArgs.start, // start angle
            end = shapeArgs.end - 0.00001, // end angle
            r = shapeArgs.r, // radius
            ir = shapeArgs.innerR || 0, // inner radius
            d = shapeArgs.depth || 0, // depth
            alpha = shapeArgs.alpha, // alpha rotation of the chart
            beta = shapeArgs.beta; // beta rotation of the chart
            // Derived Variables
            var cs = Math.cos(start), // cosinus of the start angle
            ss = Math.sin(start), // sinus of the start angle
            ce = Math.cos(end), // cosinus of the end angle
            se = Math.sin(end), // sinus of the end angle
            rx = r * Math.cos(beta), // x-radius
            ry = r * Math.cos(alpha), // y-radius
            irx = ir * Math.cos(beta), // x-radius (inner)
            iry = ir * Math.cos(alpha), // y-radius (inner)
            dx = d * Math.sin(beta), // distance between top and bottom in x
            dy = d * Math.sin(alpha); // distance between top and bottom in y
            // TOP
            var top = ['M', cx + (rx * cs), cy + (ry * ss)];
            top = top.concat(curveTo(cx, cy, rx, ry, start, end, 0, 0));
            top = top.concat([
                'L', cx + (irx * ce), cy + (iry * se)
            ]);
            top = top.concat(curveTo(cx, cy, irx, iry, end, start, 0, 0));
            top = top.concat(['Z']);
            // OUTSIDE
            var b = (beta > 0 ? Math.PI / 2 : 0), a = (alpha > 0 ? 0 : Math.PI / 2);
            var start2 = start > -b ? start : (end > -b ? -b : start), end2 = end < PI - a ? end : (start < PI - a ? PI - a : end), midEnd = 2 * PI - a;
            // When slice goes over bottom middle, need to add both, left and right
            // outer side. Additionally, when we cross right hand edge, create sharp
            // edge. Outer shape/wall:
            //
            //            -------
            //          /    ^    \
            //    4)   /   /   \   \  1)
            //        /   /     \   \
            //       /   /       \   \
            // (c)=> ====         ==== <=(d)
            //       \   \       /   /
            //        \   \<=(a)/   /
            //         \   \   /   / <=(b)
            //    3)    \    v    /  2)
            //            -------
            //
            // (a) - inner side
            // (b) - outer side
            // (c) - left edge (sharp)
            // (d) - right edge (sharp)
            // 1..n - rendering order for startAngle = 0, when set to e.g 90, order
            // changes clockwise (1->2, 2->3, n->1) and counterclockwise for negative
            // startAngle
            var out = ['M', cx + (rx * cos(start2)), cy + (ry * sin(start2))];
            out = out.concat(curveTo(cx, cy, rx, ry, start2, end2, 0, 0));
            // When shape is wide, it can cross both, (c) and (d) edges, when using
            // startAngle
            if (end > midEnd && start < midEnd) {
                // Go to outer side
                out = out.concat([
                    'L', cx + (rx * cos(end2)) + dx, cy + (ry * sin(end2)) + dy
                ]);
                // Curve to the right edge of the slice (d)
                out = out.concat(curveTo(cx, cy, rx, ry, end2, midEnd, dx, dy));
                // Go to the inner side
                out = out.concat([
                    'L', cx + (rx * cos(midEnd)), cy + (ry * sin(midEnd))
                ]);
                // Curve to the true end of the slice
                out = out.concat(curveTo(cx, cy, rx, ry, midEnd, end, 0, 0));
                // Go to the outer side
                out = out.concat([
                    'L', cx + (rx * cos(end)) + dx, cy + (ry * sin(end)) + dy
                ]);
                // Go back to middle (d)
                out = out.concat(curveTo(cx, cy, rx, ry, end, midEnd, dx, dy));
                out = out.concat([
                    'L', cx + (rx * cos(midEnd)), cy + (ry * sin(midEnd))
                ]);
                // Go back to the left edge
                out = out.concat(curveTo(cx, cy, rx, ry, midEnd, end2, 0, 0));
                // But shape can cross also only (c) edge:
            }
            else if (end > PI - a && start < PI - a) {
                // Go to outer side
                out = out.concat([
                    'L',
                    cx + (rx * Math.cos(end2)) + dx,
                    cy + (ry * Math.sin(end2)) + dy
                ]);
                // Curve to the true end of the slice
                out = out.concat(curveTo(cx, cy, rx, ry, end2, end, dx, dy));
                // Go to the inner side
                out = out.concat([
                    'L', cx + (rx * Math.cos(end)), cy + (ry * Math.sin(end))
                ]);
                // Go back to the artifical end2
                out = out.concat(curveTo(cx, cy, rx, ry, end, end2, 0, 0));
            }
            out = out.concat([
                'L', cx + (rx * Math.cos(end2)) + dx, cy + (ry * Math.sin(end2)) + dy
            ]);
            out = out.concat(curveTo(cx, cy, rx, ry, end2, start2, dx, dy));
            out = out.concat(['Z']);
            // INSIDE
            var inn = ['M', cx + (irx * cs), cy + (iry * ss)];
            inn = inn.concat(curveTo(cx, cy, irx, iry, start, end, 0, 0));
            inn = inn.concat([
                'L', cx + (irx * Math.cos(end)) + dx, cy + (iry * Math.sin(end)) + dy
            ]);
            inn = inn.concat(curveTo(cx, cy, irx, iry, end, start, dx, dy));
            inn = inn.concat(['Z']);
            // SIDES
            var side1 = [
                'M', cx + (rx * cs), cy + (ry * ss),
                'L', cx + (rx * cs) + dx, cy + (ry * ss) + dy,
                'L', cx + (irx * cs) + dx, cy + (iry * ss) + dy,
                'L', cx + (irx * cs), cy + (iry * ss),
                'Z'
            ];
            var side2 = [
                'M', cx + (rx * ce), cy + (ry * se),
                'L', cx + (rx * ce) + dx, cy + (ry * se) + dy,
                'L', cx + (irx * ce) + dx, cy + (iry * se) + dy,
                'L', cx + (irx * ce), cy + (iry * se),
                'Z'
            ];
            // correction for changed position of vanishing point caused by alpha and
            // beta rotations
            var angleCorr = Math.atan2(dy, -dx), angleEnd = Math.abs(end + angleCorr), angleStart = Math.abs(start + angleCorr), angleMid = Math.abs((start + end) / 2 + angleCorr);
            /**
             * set to 0-PI range
             * @private
             */
            function toZeroPIRange(angle) {
                angle = angle % (2 * Math.PI);
                if (angle > Math.PI) {
                    angle = 2 * Math.PI - angle;
                }
                return angle;
            }
            angleEnd = toZeroPIRange(angleEnd);
            angleStart = toZeroPIRange(angleStart);
            angleMid = toZeroPIRange(angleMid);
            // *1e5 is to compensate pInt in zIndexSetter
            var incPrecision = 1e5, a1 = angleMid * incPrecision, a2 = angleStart * incPrecision, a3 = angleEnd * incPrecision;
            return {
                top: top,
                // max angle is PI, so this is always higher
                zTop: Math.PI * incPrecision + 1,
                out: out,
                zOut: Math.max(a1, a2, a3),
                inn: inn,
                zInn: Math.max(a1, a2, a3),
                side1: side1,
                zSide1: a3 * 0.99,
                side2: side2,
                zSide2: a2 * 0.99
            };
        };

    });
    _registerModule(_modules, 'parts-3d/Chart.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  Extension for 3D charts
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var isArray = U.isArray;
        var addEvent = H.addEvent, Chart = H.Chart, merge = H.merge, perspective = H.perspective, pick = H.pick, wrap = H.wrap;
        /**
         * Shorthand to check the is3d flag.
         * @private
         * @return {boolean}
         *         Whether it is a 3D chart.
         */
        Chart.prototype.is3d = function () {
            return (this.options.chart.options3d &&
                this.options.chart.options3d.enabled); // #4280
        };
        Chart.prototype.propsRequireDirtyBox.push('chart.options3d');
        Chart.prototype.propsRequireUpdateSeries.push('chart.options3d');
        /* eslint-disable no-invalid-this */
        // Legacy support for HC < 6 to make 'scatter' series in a 3D chart route to the
        // real 'scatter3d' series type.
        addEvent(Chart, 'afterInit', function () {
            var options = this.options;
            if (this.is3d()) {
                (options.series || []).forEach(function (s) {
                    var type = s.type ||
                        options.chart.type ||
                        options.chart.defaultSeriesType;
                    if (type === 'scatter') {
                        s.type = 'scatter3d';
                    }
                });
            }
        });
        // And do it on dynamic add (#8407)
        addEvent(Chart, 'addSeries', function (e) {
            if (this.is3d()) {
                if (e.options.type === 'scatter') {
                    e.options.type = 'scatter3d';
                }
            }
        });
        /**
         * Calculate scale of the 3D view. That is required to
         * fit chart's 3D projection into the actual plotting area. Reported as #4933.
         * @notice This function should ideally take the plot values instead of a chart
         *         object, but since the chart object is needed for perspective it is
         *         not practical. Possible to make both getScale and perspective more
         *         logical and also immutable.
         *
         * @private
         * @function getScale
         *
         * @param {Highcharts.Chart} chart
         *        Chart object
         *
         * @param {number} depth
         *        The depth of the chart
         *
         * @return {number}
         *         The scale to fit the 3D chart into the plotting area.
         */
        function getScale(chart, depth) {
            var plotLeft = chart.plotLeft, plotRight = chart.plotWidth + plotLeft, plotTop = chart.plotTop, plotBottom = chart.plotHeight + plotTop, originX = plotLeft + chart.plotWidth / 2, originY = plotTop + chart.plotHeight / 2, bbox3d = {
                minX: Number.MAX_VALUE,
                maxX: -Number.MAX_VALUE,
                minY: Number.MAX_VALUE,
                maxY: -Number.MAX_VALUE
            }, corners, scale = 1;
            // Top left corners:
            corners = [{
                    x: plotLeft,
                    y: plotTop,
                    z: 0
                }, {
                    x: plotLeft,
                    y: plotTop,
                    z: depth
                }];
            // Top right corners:
            [0, 1].forEach(function (i) {
                corners.push({
                    x: plotRight,
                    y: corners[i].y,
                    z: corners[i].z
                });
            });
            // All bottom corners:
            [0, 1, 2, 3].forEach(function (i) {
                corners.push({
                    x: corners[i].x,
                    y: plotBottom,
                    z: corners[i].z
                });
            });
            // Calculate 3D corners:
            corners = perspective(corners, chart, false);
            // Get bounding box of 3D element:
            corners.forEach(function (corner) {
                bbox3d.minX = Math.min(bbox3d.minX, corner.x);
                bbox3d.maxX = Math.max(bbox3d.maxX, corner.x);
                bbox3d.minY = Math.min(bbox3d.minY, corner.y);
                bbox3d.maxY = Math.max(bbox3d.maxY, corner.y);
            });
            // Left edge:
            if (plotLeft > bbox3d.minX) {
                scale = Math.min(scale, 1 - Math.abs((plotLeft + originX) / (bbox3d.minX + originX)) % 1);
            }
            // Right edge:
            if (plotRight < bbox3d.maxX) {
                scale = Math.min(scale, (plotRight - originX) / (bbox3d.maxX - originX));
            }
            // Top edge:
            if (plotTop > bbox3d.minY) {
                if (bbox3d.minY < 0) {
                    scale = Math.min(scale, (plotTop + originY) / (-bbox3d.minY + plotTop + originY));
                }
                else {
                    scale = Math.min(scale, 1 - (plotTop + originY) / (bbox3d.minY + originY) % 1);
                }
            }
            // Bottom edge:
            if (plotBottom < bbox3d.maxY) {
                scale = Math.min(scale, Math.abs((plotBottom - originY) / (bbox3d.maxY - originY)));
            }
            return scale;
        }
        H.wrap(H.Chart.prototype, 'isInsidePlot', function (proceed) {
            return this.is3d() || proceed.apply(this, [].slice.call(arguments, 1));
        });
        var defaultOptions = H.getOptions();
        /**
         * @optionparent
         */
        var extendedOptions = {
            chart: {
                /**
                 * Options to render charts in 3 dimensions. This feature requires
                 * `highcharts-3d.js`, found in the download package or online at
                 * [code.highcharts.com/highcharts-3d.js](http://code.highcharts.com/highcharts-3d.js).
                 *
                 * @since   4.0
                 * @product highcharts
                 */
                options3d: {
                    /**
                     * Wether to render the chart using the 3D functionality.
                     *
                     * @since   4.0
                     * @product highcharts
                     */
                    enabled: false,
                    /**
                     * One of the two rotation angles for the chart.
                     *
                     * @since   4.0
                     * @product highcharts
                     */
                    alpha: 0,
                    /**
                     * One of the two rotation angles for the chart.
                     *
                     * @since   4.0
                     * @product highcharts
                     */
                    beta: 0,
                    /**
                     * The total depth of the chart.
                     *
                     * @since   4.0
                     * @product highcharts
                     */
                    depth: 100,
                    /**
                     * Whether the 3d box should automatically adjust to the chart plot
                     * area.
                     *
                     * @since   4.2.4
                     * @product highcharts
                     */
                    fitToPlot: true,
                    /**
                     * Defines the distance the viewer is standing in front of the
                     * chart, this setting is important to calculate the perspective
                     * effect in column and scatter charts. It is not used for 3D pie
                     * charts.
                     *
                     * @since   4.0
                     * @product highcharts
                     */
                    viewDistance: 25,
                    /**
                     * Set it to `"auto"` to automatically move the labels to the best
                     * edge.
                     *
                     * @type    {"auto"|null}
                     * @since   5.0.12
                     * @product highcharts
                     */
                    axisLabelPosition: null,
                    /**
                     * Provides the option to draw a frame around the charts by defining
                     * a bottom, front and back panel.
                     *
                     * @since   4.0
                     * @product highcharts
                     */
                    frame: {
                        /**
                         * Whether the frames are visible.
                         */
                        visible: 'default',
                        /**
                         * General pixel thickness for the frame faces.
                         */
                        size: 1,
                        /**
                         * The bottom of the frame around a 3D chart.
                         *
                         * @since   4.0
                         * @product highcharts
                         */
                        /**
                         * The color of the panel.
                         *
                         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         * @default   transparent
                         * @since     4.0
                         * @product   highcharts
                         * @apioption chart.options3d.frame.bottom.color
                         */
                        /**
                         * The thickness of the panel.
                         *
                         * @type      {number}
                         * @default   1
                         * @since     4.0
                         * @product   highcharts
                         * @apioption chart.options3d.frame.bottom.size
                         */
                        /**
                         * Whether to display the frame. Possible values are `true`,
                         * `false`, `"auto"` to display only the frames behind the data,
                         * and `"default"` to display faces behind the data based on the
                         * axis layout, ignoring the point of view.
                         *
                         * @sample {highcharts} highcharts/3d/scatter-frame/
                         *         Auto frames
                         *
                         * @type      {boolean|"default"|"auto"}
                         * @default   default
                         * @since     5.0.12
                         * @product   highcharts
                         * @apioption chart.options3d.frame.bottom.visible
                         */
                        /**
                         * The bottom of the frame around a 3D chart.
                         */
                        bottom: {},
                        /**
                         * The top of the frame around a 3D chart.
                         *
                         * @extends chart.options3d.frame.bottom
                         */
                        top: {},
                        /**
                         * The left side of the frame around a 3D chart.
                         *
                         * @extends chart.options3d.frame.bottom
                         */
                        left: {},
                        /**
                         * The right of the frame around a 3D chart.
                         *
                         * @extends chart.options3d.frame.bottom
                         */
                        right: {},
                        /**
                         * The back side of the frame around a 3D chart.
                         *
                         * @extends chart.options3d.frame.bottom
                         */
                        back: {},
                        /**
                         * The front of the frame around a 3D chart.
                         *
                         * @extends chart.options3d.frame.bottom
                         */
                        front: {}
                    }
                }
            }
        };
        merge(true, defaultOptions, extendedOptions);
        // Add the required CSS classes for column sides (#6018)
        addEvent(Chart, 'afterGetContainer', function () {
            if (this.styledMode) {
                this.renderer.definition({
                    tagName: 'style',
                    textContent: '.highcharts-3d-top{' +
                        'filter: url(#highcharts-brighter)' +
                        '}\n' +
                        '.highcharts-3d-side{' +
                        'filter: url(#highcharts-darker)' +
                        '}\n'
                });
                // Add add definitions used by brighter and darker faces of the cuboids.
                [{
                        name: 'darker',
                        slope: 0.6
                    }, {
                        name: 'brighter',
                        slope: 1.4
                    }].forEach(function (cfg) {
                    this.renderer.definition({
                        tagName: 'filter',
                        id: 'highcharts-' + cfg.name,
                        children: [{
                                tagName: 'feComponentTransfer',
                                children: [{
                                        tagName: 'feFuncR',
                                        type: 'linear',
                                        slope: cfg.slope
                                    }, {
                                        tagName: 'feFuncG',
                                        type: 'linear',
                                        slope: cfg.slope
                                    }, {
                                        tagName: 'feFuncB',
                                        type: 'linear',
                                        slope: cfg.slope
                                    }]
                            }]
                    });
                }, this);
            }
        });
        wrap(Chart.prototype, 'setClassName', function (proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));
            if (this.is3d()) {
                this.container.className += ' highcharts-3d-chart';
            }
        });
        addEvent(H.Chart, 'afterSetChartSize', function () {
            var chart = this, options3d = chart.options.chart.options3d;
            if (chart.is3d()) {
                var inverted = chart.inverted, clipBox = chart.clipBox, margin = chart.margin, x = inverted ? 'y' : 'x', y = inverted ? 'x' : 'y', w = inverted ? 'height' : 'width', h = inverted ? 'width' : 'height';
                clipBox[x] = -(margin[3] || 0);
                clipBox[y] = -(margin[0] || 0);
                clipBox[w] =
                    chart.chartWidth + (margin[3] || 0) + (margin[1] || 0);
                clipBox[h] =
                    chart.chartHeight + (margin[0] || 0) + (margin[2] || 0);
                // Set scale, used later in perspective method():
                // getScale uses perspective, so scale3d has to be reset.
                chart.scale3d = 1;
                if (options3d.fitToPlot === true) {
                    chart.scale3d = getScale(chart, options3d.depth);
                }
                // Recalculate the 3d frame with every call of setChartSize,
                // instead of doing it after every redraw(). It avoids ticks
                // and axis title outside of chart.
                chart.frame3d = this.get3dFrame(); // #7942
            }
        });
        addEvent(Chart, 'beforeRedraw', function () {
            if (this.is3d()) {
                // Set to force a redraw of all elements
                this.isDirtyBox = true;
            }
        });
        addEvent(Chart, 'beforeRender', function () {
            if (this.is3d()) {
                this.frame3d = this.get3dFrame();
            }
        });
        // Draw the series in the reverse order (#3803, #3917)
        wrap(Chart.prototype, 'renderSeries', function (proceed) {
            var series, i = this.series.length;
            if (this.is3d()) {
                while (i--) {
                    series = this.series[i];
                    series.translate();
                    series.render();
                }
            }
            else {
                proceed.call(this);
            }
        });
        addEvent(Chart, 'afterDrawChartBox', function () {
            if (this.is3d()) {
                var chart = this, renderer = chart.renderer, options3d = this.options.chart.options3d, frame = chart.get3dFrame(), xm = this.plotLeft, xp = this.plotLeft + this.plotWidth, ym = this.plotTop, yp = this.plotTop + this.plotHeight, zm = 0, zp = options3d.depth, xmm = xm - (frame.left.visible ? frame.left.size : 0), xpp = xp + (frame.right.visible ? frame.right.size : 0), ymm = ym - (frame.top.visible ? frame.top.size : 0), ypp = yp + (frame.bottom.visible ? frame.bottom.size : 0), zmm = zm - (frame.front.visible ? frame.front.size : 0), zpp = zp + (frame.back.visible ? frame.back.size : 0), verb = chart.hasRendered ? 'animate' : 'attr';
                this.frame3d = frame;
                if (!this.frameShapes) {
                    this.frameShapes = {
                        bottom: renderer.polyhedron().add(),
                        top: renderer.polyhedron().add(),
                        left: renderer.polyhedron().add(),
                        right: renderer.polyhedron().add(),
                        back: renderer.polyhedron().add(),
                        front: renderer.polyhedron().add()
                    };
                }
                this.frameShapes.bottom[verb]({
                    'class': 'highcharts-3d-frame highcharts-3d-frame-bottom',
                    zIndex: frame.bottom.frontFacing ? -1000 : 1000,
                    faces: [{
                            fill: H.color(frame.bottom.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xpp,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xpp,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xmm,
                                    y: ypp,
                                    z: zpp
                                }],
                            enabled: frame.bottom.visible
                        },
                        {
                            fill: H.color(frame.bottom.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xm,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zm
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zm
                                }],
                            enabled: frame.bottom.visible
                        },
                        {
                            fill: H.color(frame.bottom.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xmm,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zm
                                }],
                            enabled: frame.bottom.visible && !frame.left.visible
                        },
                        {
                            fill: H.color(frame.bottom.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xpp,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zm
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zp
                                }],
                            enabled: frame.bottom.visible && !frame.right.visible
                        },
                        {
                            fill: H.color(frame.bottom.color).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xmm,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zm
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zm
                                }],
                            enabled: frame.bottom.visible && !frame.front.visible
                        },
                        {
                            fill: H.color(frame.bottom.color).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xpp,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zp
                                }],
                            enabled: frame.bottom.visible && !frame.back.visible
                        }]
                });
                this.frameShapes.top[verb]({
                    'class': 'highcharts-3d-frame highcharts-3d-frame-top',
                    zIndex: frame.top.frontFacing ? -1000 : 1000,
                    faces: [{
                            fill: H.color(frame.top.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xmm,
                                    y: ymm,
                                    z: zmm
                                }],
                            enabled: frame.top.visible
                        },
                        {
                            fill: H.color(frame.top.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xm,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zp
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zp
                                }],
                            enabled: frame.top.visible
                        },
                        {
                            fill: H.color(frame.top.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xmm,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zp
                                }],
                            enabled: frame.top.visible && !frame.left.visible
                        },
                        {
                            fill: H.color(frame.top.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zp
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zm
                                }],
                            enabled: frame.top.visible && !frame.right.visible
                        },
                        {
                            fill: H.color(frame.top.color).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zm
                                }],
                            enabled: frame.top.visible && !frame.front.visible
                        },
                        {
                            fill: H.color(frame.top.color).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xmm,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zp
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zp
                                }],
                            enabled: frame.top.visible && !frame.back.visible
                        }]
                });
                this.frameShapes.left[verb]({
                    'class': 'highcharts-3d-frame highcharts-3d-frame-left',
                    zIndex: frame.left.frontFacing ? -1000 : 1000,
                    faces: [{
                            fill: H.color(frame.left.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zm
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xmm,
                                    y: ypp,
                                    z: zpp
                                }],
                            enabled: frame.left.visible && !frame.bottom.visible
                        },
                        {
                            fill: H.color(frame.left.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zp
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xmm,
                                    y: ymm,
                                    z: zmm
                                }],
                            enabled: frame.left.visible && !frame.top.visible
                        },
                        {
                            fill: H.color(frame.left.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xmm,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xmm,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xmm,
                                    y: ypp,
                                    z: zmm
                                }],
                            enabled: frame.left.visible
                        },
                        {
                            fill: H.color(frame.left.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xm,
                                    y: ym,
                                    z: zp
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zm
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zm
                                }],
                            enabled: frame.left.visible
                        },
                        {
                            fill: H.color(frame.left.color).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xmm,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zm
                                }],
                            enabled: frame.left.visible && !frame.front.visible
                        },
                        {
                            fill: H.color(frame.left.color).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xmm,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zp
                                }],
                            enabled: frame.left.visible && !frame.back.visible
                        }]
                });
                this.frameShapes.right[verb]({
                    'class': 'highcharts-3d-frame highcharts-3d-frame-right',
                    zIndex: frame.right.frontFacing ? -1000 : 1000,
                    faces: [{
                            fill: H.color(frame.right.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zm
                                }, {
                                    x: xpp,
                                    y: ypp,
                                    z: zmm
                                }],
                            enabled: frame.right.visible && !frame.bottom.visible
                        },
                        {
                            fill: H.color(frame.right.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zp
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zpp
                                }],
                            enabled: frame.right.visible && !frame.top.visible
                        },
                        {
                            fill: H.color(frame.right.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xp,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zm
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zp
                                }],
                            enabled: frame.right.visible
                        },
                        {
                            fill: H.color(frame.right.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xpp,
                                    y: ypp,
                                    z: zpp
                                }],
                            enabled: frame.right.visible
                        },
                        {
                            fill: H.color(frame.right.color).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xpp,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zm
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zm
                                }],
                            enabled: frame.right.visible && !frame.front.visible
                        },
                        {
                            fill: H.color(frame.right.color).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zp
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zp
                                }],
                            enabled: frame.right.visible && !frame.back.visible
                        }]
                });
                this.frameShapes.back[verb]({
                    'class': 'highcharts-3d-frame highcharts-3d-frame-back',
                    zIndex: frame.back.frontFacing ? -1000 : 1000,
                    faces: [{
                            fill: H.color(frame.back.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xmm,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zp
                                }],
                            enabled: frame.back.visible && !frame.bottom.visible
                        },
                        {
                            fill: H.color(frame.back.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zp
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zp
                                }],
                            enabled: frame.back.visible && !frame.top.visible
                        },
                        {
                            fill: H.color(frame.back.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xmm,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zp
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zp
                                }],
                            enabled: frame.back.visible && !frame.left.visible
                        },
                        {
                            fill: H.color(frame.back.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xpp,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zp
                                }],
                            enabled: frame.back.visible && !frame.right.visible
                        },
                        {
                            fill: H.color(frame.back.color).get(),
                            vertexes: [{
                                    x: xm,
                                    y: ym,
                                    z: zp
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zp
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zp
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zp
                                }],
                            enabled: frame.back.visible
                        },
                        {
                            fill: H.color(frame.back.color).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xpp,
                                    y: ypp,
                                    z: zpp
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zpp
                                }, {
                                    x: xmm,
                                    y: ymm,
                                    z: zpp
                                }],
                            enabled: frame.back.visible
                        }]
                });
                this.frameShapes.front[verb]({
                    'class': 'highcharts-3d-frame highcharts-3d-frame-front',
                    zIndex: frame.front.frontFacing ? -1000 : 1000,
                    faces: [{
                            fill: H.color(frame.front.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xpp,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zm
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zm
                                }],
                            enabled: frame.front.visible && !frame.bottom.visible
                        },
                        {
                            fill: H.color(frame.front.color).brighten(0.1).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xmm,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zm
                                }],
                            enabled: frame.front.visible && !frame.top.visible
                        },
                        {
                            fill: H.color(frame.front.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xmm,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xmm,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zm
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zm
                                }],
                            enabled: frame.front.visible && !frame.left.visible
                        },
                        {
                            fill: H.color(frame.front.color).brighten(-0.1).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xp,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zm
                                }],
                            enabled: frame.front.visible && !frame.right.visible
                        },
                        {
                            fill: H.color(frame.front.color).get(),
                            vertexes: [{
                                    x: xp,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xm,
                                    y: ym,
                                    z: zm
                                }, {
                                    x: xm,
                                    y: yp,
                                    z: zm
                                }, {
                                    x: xp,
                                    y: yp,
                                    z: zm
                                }],
                            enabled: frame.front.visible
                        },
                        {
                            fill: H.color(frame.front.color).get(),
                            vertexes: [{
                                    x: xpp,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xmm,
                                    y: ypp,
                                    z: zmm
                                }, {
                                    x: xmm,
                                    y: ymm,
                                    z: zmm
                                }, {
                                    x: xpp,
                                    y: ymm,
                                    z: zmm
                                }],
                            enabled: frame.front.visible
                        }]
                });
            }
        });
        Chart.prototype.retrieveStacks = function (stacking) {
            var series = this.series, stacks = {}, stackNumber, i = 1;
            this.series.forEach(function (s) {
                stackNumber = pick(s.options.stack, (stacking ? 0 : series.length - 1 - s.index)); // #3841, #4532
                if (!stacks[stackNumber]) {
                    stacks[stackNumber] = { series: [s], position: i };
                    i++;
                }
                else {
                    stacks[stackNumber].series.push(s);
                }
            });
            stacks.totalStacks = i + 1;
            return stacks;
        };
        Chart.prototype.get3dFrame = function () {
            var chart = this, options3d = chart.options.chart.options3d, frameOptions = options3d.frame, xm = chart.plotLeft, xp = chart.plotLeft + chart.plotWidth, ym = chart.plotTop, yp = chart.plotTop + chart.plotHeight, zm = 0, zp = options3d.depth, faceOrientation = function (vertexes) {
                var area = H.shapeArea3d(vertexes, chart);
                // Give it 0.5 squared-pixel as a margin for rounding errors.
                if (area > 0.5) {
                    return 1;
                }
                if (area < -0.5) {
                    return -1;
                }
                return 0;
            }, bottomOrientation = faceOrientation([
                { x: xm, y: yp, z: zp },
                { x: xp, y: yp, z: zp },
                { x: xp, y: yp, z: zm },
                { x: xm, y: yp, z: zm }
            ]), topOrientation = faceOrientation([
                { x: xm, y: ym, z: zm },
                { x: xp, y: ym, z: zm },
                { x: xp, y: ym, z: zp },
                { x: xm, y: ym, z: zp }
            ]), leftOrientation = faceOrientation([
                { x: xm, y: ym, z: zm },
                { x: xm, y: ym, z: zp },
                { x: xm, y: yp, z: zp },
                { x: xm, y: yp, z: zm }
            ]), rightOrientation = faceOrientation([
                { x: xp, y: ym, z: zp },
                { x: xp, y: ym, z: zm },
                { x: xp, y: yp, z: zm },
                { x: xp, y: yp, z: zp }
            ]), frontOrientation = faceOrientation([
                { x: xm, y: yp, z: zm },
                { x: xp, y: yp, z: zm },
                { x: xp, y: ym, z: zm },
                { x: xm, y: ym, z: zm }
            ]), backOrientation = faceOrientation([
                { x: xm, y: ym, z: zp },
                { x: xp, y: ym, z: zp },
                { x: xp, y: yp, z: zp },
                { x: xm, y: yp, z: zp }
            ]), defaultShowBottom = false, defaultShowTop = false, defaultShowLeft = false, defaultShowRight = false, defaultShowFront = false, defaultShowBack = true;
            // The 'default' criteria to visible faces of the frame is looking up every
            // axis to decide whenever the left/right//top/bottom sides of the frame
            // will be shown
            []
                .concat(chart.xAxis, chart.yAxis, chart.zAxis)
                .forEach(function (axis) {
                if (axis) {
                    if (axis.horiz) {
                        if (axis.opposite) {
                            defaultShowTop = true;
                        }
                        else {
                            defaultShowBottom = true;
                        }
                    }
                    else {
                        if (axis.opposite) {
                            defaultShowRight = true;
                        }
                        else {
                            defaultShowLeft = true;
                        }
                    }
                }
            });
            var getFaceOptions = function (sources, faceOrientation, defaultVisible) {
                var faceAttrs = ['size', 'color', 'visible'];
                var options = {};
                for (var i = 0; i < faceAttrs.length; i++) {
                    var attr = faceAttrs[i];
                    for (var j = 0; j < sources.length; j++) {
                        if (typeof sources[j] === 'object') {
                            var val = sources[j][attr];
                            if (val !== undefined && val !== null) {
                                options[attr] = val;
                                break;
                            }
                        }
                    }
                }
                var isVisible = defaultVisible;
                if (options.visible === true || options.visible === false) {
                    isVisible = options.visible;
                }
                else if (options.visible === 'auto') {
                    isVisible = faceOrientation > 0;
                }
                return {
                    size: pick(options.size, 1),
                    color: pick(options.color, 'none'),
                    frontFacing: faceOrientation > 0,
                    visible: isVisible
                };
            };
            // docs @TODO: Add all frame options (left, right, top, bottom, front, back)
            // to apioptions JSDoc once the new system is up.
            var ret = {
                axes: {},
                // FIXME: Previously, left/right, top/bottom and front/back pairs shared
                // size and color.
                // For compatibility and consistency sake, when one face have
                // size/color/visibility set, the opposite face will default to the same
                // values. Also, left/right used to be called 'side', so that's also
                // added as a fallback
                bottom: getFaceOptions([frameOptions.bottom, frameOptions.top, frameOptions], bottomOrientation, defaultShowBottom),
                top: getFaceOptions([frameOptions.top, frameOptions.bottom, frameOptions], topOrientation, defaultShowTop),
                left: getFaceOptions([
                    frameOptions.left,
                    frameOptions.right,
                    frameOptions.side,
                    frameOptions
                ], leftOrientation, defaultShowLeft),
                right: getFaceOptions([
                    frameOptions.right,
                    frameOptions.left,
                    frameOptions.side,
                    frameOptions
                ], rightOrientation, defaultShowRight),
                back: getFaceOptions([frameOptions.back, frameOptions.front, frameOptions], backOrientation, defaultShowBack),
                front: getFaceOptions([frameOptions.front, frameOptions.back, frameOptions], frontOrientation, defaultShowFront)
            };
            // Decide the bast place to put axis title/labels based on the visible
            // faces. Ideally, The labels can only be on the edge between a visible face
            // and an invisble one. Also, the Y label should be one the left-most edge
            // (right-most if opposite),
            if (options3d.axisLabelPosition === 'auto') {
                var isValidEdge = function (face1, face2) {
                    return ((face1.visible !== face2.visible) ||
                        (face1.visible &&
                            face2.visible &&
                            (face1.frontFacing !== face2.frontFacing)));
                };
                var yEdges = [];
                if (isValidEdge(ret.left, ret.front)) {
                    yEdges.push({
                        y: (ym + yp) / 2,
                        x: xm,
                        z: zm,
                        xDir: { x: 1, y: 0, z: 0 }
                    });
                }
                if (isValidEdge(ret.left, ret.back)) {
                    yEdges.push({
                        y: (ym + yp) / 2,
                        x: xm,
                        z: zp,
                        xDir: { x: 0, y: 0, z: -1 }
                    });
                }
                if (isValidEdge(ret.right, ret.front)) {
                    yEdges.push({
                        y: (ym + yp) / 2,
                        x: xp,
                        z: zm,
                        xDir: { x: 0, y: 0, z: 1 }
                    });
                }
                if (isValidEdge(ret.right, ret.back)) {
                    yEdges.push({
                        y: (ym + yp) / 2,
                        x: xp,
                        z: zp,
                        xDir: { x: -1, y: 0, z: 0 }
                    });
                }
                var xBottomEdges = [];
                if (isValidEdge(ret.bottom, ret.front)) {
                    xBottomEdges.push({
                        x: (xm + xp) / 2,
                        y: yp,
                        z: zm,
                        xDir: { x: 1, y: 0, z: 0 }
                    });
                }
                if (isValidEdge(ret.bottom, ret.back)) {
                    xBottomEdges.push({
                        x: (xm + xp) / 2,
                        y: yp,
                        z: zp,
                        xDir: { x: -1, y: 0, z: 0 }
                    });
                }
                var xTopEdges = [];
                if (isValidEdge(ret.top, ret.front)) {
                    xTopEdges.push({
                        x: (xm + xp) / 2,
                        y: ym,
                        z: zm,
                        xDir: { x: 1, y: 0, z: 0 }
                    });
                }
                if (isValidEdge(ret.top, ret.back)) {
                    xTopEdges.push({
                        x: (xm + xp) / 2,
                        y: ym,
                        z: zp,
                        xDir: { x: -1, y: 0, z: 0 }
                    });
                }
                var zBottomEdges = [];
                if (isValidEdge(ret.bottom, ret.left)) {
                    zBottomEdges.push({
                        z: (zm + zp) / 2,
                        y: yp,
                        x: xm,
                        xDir: { x: 0, y: 0, z: -1 }
                    });
                }
                if (isValidEdge(ret.bottom, ret.right)) {
                    zBottomEdges.push({
                        z: (zm + zp) / 2,
                        y: yp,
                        x: xp,
                        xDir: { x: 0, y: 0, z: 1 }
                    });
                }
                var zTopEdges = [];
                if (isValidEdge(ret.top, ret.left)) {
                    zTopEdges.push({
                        z: (zm + zp) / 2,
                        y: ym,
                        x: xm,
                        xDir: { x: 0, y: 0, z: -1 }
                    });
                }
                if (isValidEdge(ret.top, ret.right)) {
                    zTopEdges.push({
                        z: (zm + zp) / 2,
                        y: ym,
                        x: xp,
                        xDir: { x: 0, y: 0, z: 1 }
                    });
                }
                var pickEdge = function (edges, axis, mult) {
                    if (edges.length === 0) {
                        return null;
                    }
                    if (edges.length === 1) {
                        return edges[0];
                    }
                    var best = 0, projections = perspective(edges, chart, false);
                    for (var i = 1; i < projections.length; i++) {
                        if (mult * projections[i][axis] >
                            mult * projections[best][axis]) {
                            best = i;
                        }
                        else if ((mult * projections[i][axis] ===
                            mult * projections[best][axis]) &&
                            (projections[i].z < projections[best].z)) {
                            best = i;
                        }
                    }
                    return edges[best];
                };
                ret.axes = {
                    y: {
                        'left': pickEdge(yEdges, 'x', -1),
                        'right': pickEdge(yEdges, 'x', +1)
                    },
                    x: {
                        'top': pickEdge(xTopEdges, 'y', -1),
                        'bottom': pickEdge(xBottomEdges, 'y', +1)
                    },
                    z: {
                        'top': pickEdge(zTopEdges, 'y', -1),
                        'bottom': pickEdge(zBottomEdges, 'y', +1)
                    }
                };
            }
            else {
                ret.axes = {
                    y: {
                        'left': { x: xm, z: zm, xDir: { x: 1, y: 0, z: 0 } },
                        'right': { x: xp, z: zm, xDir: { x: 0, y: 0, z: 1 } }
                    },
                    x: {
                        'top': { y: ym, z: zm, xDir: { x: 1, y: 0, z: 0 } },
                        'bottom': { y: yp, z: zm, xDir: { x: 1, y: 0, z: 0 } }
                    },
                    z: {
                        'top': {
                            x: defaultShowLeft ? xp : xm,
                            y: ym,
                            xDir: defaultShowLeft ?
                                { x: 0, y: 0, z: 1 } :
                                { x: 0, y: 0, z: -1 }
                        },
                        'bottom': {
                            x: defaultShowLeft ? xp : xm,
                            y: yp,
                            xDir: defaultShowLeft ?
                                { x: 0, y: 0, z: 1 } :
                                { x: 0, y: 0, z: -1 }
                        }
                    }
                };
            }
            return ret;
        };
        // Animation setter for matrix property.
        H.Fx.prototype.matrixSetter = function () {
            var interpolated;
            if (this.pos < 1 &&
                (isArray(this.start) || isArray(this.end))) {
                var start = this.start || [1, 0, 0, 1, 0, 0];
                var end = this.end || [1, 0, 0, 1, 0, 0];
                interpolated = [];
                for (var i = 0; i < 6; i++) {
                    interpolated.push(this.pos * end[i] + (1 - this.pos) * start[i]);
                }
            }
            else {
                interpolated = this.end;
            }
            this.elem.attr(this.prop, interpolated, null, true);
        };
        /**
         * Note: As of v5.0.12, `frame.left` or `frame.right` should be used instead.
         *
         * The side for the frame around a 3D chart.
         *
         * @deprecated
         * @since     4.0
         * @product   highcharts
         * @apioption chart.options3d.frame.side
         */
        /**
         * The color of the panel.
         *
         * @deprecated
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @default   transparent
         * @since     4.0
         * @product   highcharts
         * @apioption chart.options3d.frame.side.color
         */
        /**
         * The thickness of the panel.
         *
         * @deprecated
         * @type      {number}
         * @default   1
         * @since     4.0
         * @product   highcharts
         * @apioption chart.options3d.frame.side.size
         */
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'parts-3d/Axis.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  Extenstion for 3d axes
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var splat = U.splat;
        var ZAxis, addEvent = H.addEvent, Axis = H.Axis, Chart = H.Chart, deg2rad = H.deg2rad, extend = H.extend, merge = H.merge, perspective = H.perspective, perspective3D = H.perspective3D, pick = H.pick, shapeArea = H.shapeArea, Tick = H.Tick, wrap = H.wrap;
        /**
         * @optionparent xAxis
         */
        var extendedOptions = {
            labels: {
                /**
                 * Defines how the labels are be repositioned according to the 3D chart
                 * orientation.
                 *
                 * - `'offset'`: Maintain a fixed horizontal/vertical distance from the
                 *   tick marks, despite the chart orientation. This is the backwards
                 *   compatible behavior, and causes skewing of X and Z axes.
                 *
                 * - `'chart'`: Preserve 3D position relative to the chart.
                 *   This looks nice, but hard to read if the text isn't
                 *   forward-facing.
                 *
                 * - `'flap'`: Rotated text along the axis to compensate for the chart
                 *   orientation. This tries to maintain text as legible as possible
                 *   on all orientations.
                 *
                 * - `'ortho'`: Rotated text along the axis direction so that the labels
                 *   are orthogonal to the axis. This is very similar to `'flap'`,
                 *   but prevents skewing the labels (X and Y scaling are still
                 *   present).
                 *
                 * @sample highcharts/3d/skewed-labels/
                 *         Skewed labels
                 *
                 * @since      5.0.15
                 * @validvalue ['offset', 'chart', 'flap', 'ortho']
                 * @product    highcharts
                 */
                position3d: 'offset',
                /**
                 * If enabled, the axis labels will skewed to follow the perspective.
                 *
                 * This will fix overlapping labels and titles, but texts become less
                 * legible due to the distortion.
                 *
                 * The final appearance depends heavily on `labels.position3d`.
                 *
                 * @sample highcharts/3d/skewed-labels/
                 *         Skewed labels
                 *
                 * @since   5.0.15
                 * @product highcharts
                 */
                skew3d: false
            },
            title: {
                /**
                 * Defines how the title is repositioned according to the 3D chart
                 * orientation.
                 *
                 * - `'offset'`: Maintain a fixed horizontal/vertical distance from the
                 *   tick marks, despite the chart orientation. This is the backwards
                 *   compatible behavior, and causes skewing of X and Z axes.
                 *
                 * - `'chart'`: Preserve 3D position relative to the chart.
                 *   This looks nice, but hard to read if the text isn't
                 *   forward-facing.
                 *
                 * - `'flap'`: Rotated text along the axis to compensate for the chart
                 *   orientation. This tries to maintain text as legible as possible on
                 *   all orientations.
                 *
                 * - `'ortho'`: Rotated text along the axis direction so that the labels
                 *   are orthogonal to the axis. This is very similar to `'flap'`, but
                 *   prevents skewing the labels (X and Y scaling are still present).
                 *
                 * - `undefined`: Will use the config from `labels.position3d`
                 *
                 * @sample highcharts/3d/skewed-labels/
                 *         Skewed labels
                 *
                 * @type       {"offset"|"chart"|"flap"|"ortho"|null}
                 * @since      5.0.15
                 * @product    highcharts
                 */
                position3d: null,
                /**
                 * If enabled, the axis title will skewed to follow the perspective.
                 *
                 * This will fix overlapping labels and titles, but texts become less
                 * legible due to the distortion.
                 *
                 * The final appearance depends heavily on `title.position3d`.
                 *
                 * A `null` value will use the config from `labels.skew3d`.
                 *
                 * @sample highcharts/3d/skewed-labels/
                 *         Skewed labels
                 *
                 * @type    {boolean|null}
                 * @since   5.0.15
                 * @product highcharts
                 */
                skew3d: null
            }
        };
        /* eslint-disable no-invalid-this */
        merge(true, Axis.prototype.defaultOptions, extendedOptions);
        addEvent(Axis, 'afterSetOptions', function () {
            var options;
            if (this.chart.is3d && this.chart.is3d() && this.coll !== 'colorAxis') {
                options = this.options;
                options.tickWidth = pick(options.tickWidth, 0);
                options.gridLineWidth = pick(options.gridLineWidth, 1);
            }
        });
        wrap(Axis.prototype, 'getPlotLinePath', function (proceed) {
            var path = proceed.apply(this, [].slice.call(arguments, 1));
            // Do not do this if the chart is not 3D
            if (!this.chart.is3d() || this.coll === 'colorAxis') {
                return path;
            }
            if (path === null) {
                return path;
            }
            var chart = this.chart, options3d = chart.options.chart.options3d, d = this.isZAxis ? chart.plotWidth : options3d.depth, frame = chart.frame3d;
            var pArr = [
                this.swapZ({ x: path[1], y: path[2], z: 0 }),
                this.swapZ({ x: path[1], y: path[2], z: d }),
                this.swapZ({ x: path[4], y: path[5], z: 0 }),
                this.swapZ({ x: path[4], y: path[5], z: d })
            ];
            var pathSegments = [];
            if (!this.horiz) { // Y-Axis
                if (frame.front.visible) {
                    pathSegments.push(pArr[0], pArr[2]);
                }
                if (frame.back.visible) {
                    pathSegments.push(pArr[1], pArr[3]);
                }
                if (frame.left.visible) {
                    pathSegments.push(pArr[0], pArr[1]);
                }
                if (frame.right.visible) {
                    pathSegments.push(pArr[2], pArr[3]);
                }
            }
            else if (this.isZAxis) { // Z-Axis
                if (frame.left.visible) {
                    pathSegments.push(pArr[0], pArr[2]);
                }
                if (frame.right.visible) {
                    pathSegments.push(pArr[1], pArr[3]);
                }
                if (frame.top.visible) {
                    pathSegments.push(pArr[0], pArr[1]);
                }
                if (frame.bottom.visible) {
                    pathSegments.push(pArr[2], pArr[3]);
                }
            }
            else { // X-Axis
                if (frame.front.visible) {
                    pathSegments.push(pArr[0], pArr[2]);
                }
                if (frame.back.visible) {
                    pathSegments.push(pArr[1], pArr[3]);
                }
                if (frame.top.visible) {
                    pathSegments.push(pArr[0], pArr[1]);
                }
                if (frame.bottom.visible) {
                    pathSegments.push(pArr[2], pArr[3]);
                }
            }
            pathSegments = perspective(pathSegments, this.chart, false);
            return this.chart.renderer.toLineSegments(pathSegments);
        });
        // Do not draw axislines in 3D
        wrap(Axis.prototype, 'getLinePath', function (proceed) {
            // Do not do this if the chart is not 3D
            if (!this.chart.is3d() || this.coll === 'colorAxis') {
                return proceed.apply(this, [].slice.call(arguments, 1));
            }
            return [];
        });
        wrap(Axis.prototype, 'getPlotBandPath', function (proceed) {
            // Do not do this if the chart is not 3D
            if (!this.chart.is3d() || this.coll === 'colorAxis') {
                return proceed.apply(this, [].slice.call(arguments, 1));
            }
            var args = arguments, from = args[1], to = args[2], path = [], fromPath = this.getPlotLinePath({ value: from }), toPath = this.getPlotLinePath({ value: to });
            if (fromPath && toPath) {
                for (var i = 0; i < fromPath.length; i += 6) {
                    path.push('M', fromPath[i + 1], fromPath[i + 2], 'L', fromPath[i + 4], fromPath[i + 5], 'L', toPath[i + 4], toPath[i + 5], 'L', toPath[i + 1], toPath[i + 2], 'Z');
                }
            }
            return path;
        });
        /**
         * @private
         * @param {Highcharts.Axis} axis
         *        Related axis
         * @param {Highcharts.Position3dObject} pos
         *        Position to fix
         * @param {boolean} [isTitle]
         *        Whether this is a title position
         * @return {Highcharts.Position3dObject}
         *         Fixed position
         */
        function fix3dPosition(axis, pos, isTitle) {
            // Do not do this if the chart is not 3D
            if (!axis.chart.is3d() || axis.coll === 'colorAxis') {
                return pos;
            }
            var chart = axis.chart, alpha = deg2rad * chart.options.chart.options3d.alpha, beta = deg2rad * chart.options.chart.options3d.beta, positionMode = pick(isTitle && axis.options.title.position3d, axis.options.labels.position3d), skew = pick(isTitle && axis.options.title.skew3d, axis.options.labels.skew3d), frame = chart.frame3d, plotLeft = chart.plotLeft, plotRight = chart.plotWidth + plotLeft, plotTop = chart.plotTop, plotBottom = chart.plotHeight + plotTop, 
            // Indicates we are labelling an X or Z axis on the "back" of the chart
            reverseFlap = false, offsetX = 0, offsetY = 0, vecX, vecY = { x: 0, y: 1, z: 0 };
            pos = axis.swapZ({ x: pos.x, y: pos.y, z: 0 });
            if (axis.isZAxis) { // Z Axis
                if (axis.opposite) {
                    if (frame.axes.z.top === null) {
                        return {};
                    }
                    offsetY = pos.y - plotTop;
                    pos.x = frame.axes.z.top.x;
                    pos.y = frame.axes.z.top.y;
                    vecX = frame.axes.z.top.xDir;
                    reverseFlap = !frame.top.frontFacing;
                }
                else {
                    if (frame.axes.z.bottom === null) {
                        return {};
                    }
                    offsetY = pos.y - plotBottom;
                    pos.x = frame.axes.z.bottom.x;
                    pos.y = frame.axes.z.bottom.y;
                    vecX = frame.axes.z.bottom.xDir;
                    reverseFlap = !frame.bottom.frontFacing;
                }
            }
            else if (axis.horiz) { // X Axis
                if (axis.opposite) {
                    if (frame.axes.x.top === null) {
                        return {};
                    }
                    offsetY = pos.y - plotTop;
                    pos.y = frame.axes.x.top.y;
                    pos.z = frame.axes.x.top.z;
                    vecX = frame.axes.x.top.xDir;
                    reverseFlap = !frame.top.frontFacing;
                }
                else {
                    if (frame.axes.x.bottom === null) {
                        return {};
                    }
                    offsetY = pos.y - plotBottom;
                    pos.y = frame.axes.x.bottom.y;
                    pos.z = frame.axes.x.bottom.z;
                    vecX = frame.axes.x.bottom.xDir;
                    reverseFlap = !frame.bottom.frontFacing;
                }
            }
            else { // Y Axis
                if (axis.opposite) {
                    if (frame.axes.y.right === null) {
                        return {};
                    }
                    offsetX = pos.x - plotRight;
                    pos.x = frame.axes.y.right.x;
                    pos.z = frame.axes.y.right.z;
                    vecX = frame.axes.y.right.xDir;
                    // Rotate 90º on opposite edge
                    vecX = { x: vecX.z, y: vecX.y, z: -vecX.x };
                }
                else {
                    if (frame.axes.y.left === null) {
                        return {};
                    }
                    offsetX = pos.x - plotLeft;
                    pos.x = frame.axes.y.left.x;
                    pos.z = frame.axes.y.left.z;
                    vecX = frame.axes.y.left.xDir;
                }
            }
            if (positionMode === 'chart') {
                // Labels preserve their direction relative to the chart
                // nothing to do
            }
            else if (positionMode === 'flap') {
                // Labels are be rotated around the axis direction to face the screen
                if (!axis.horiz) { // Y Axis
                    vecX = { x: Math.cos(beta), y: 0, z: Math.sin(beta) };
                }
                else { // X and Z Axis
                    var sin = Math.sin(alpha);
                    var cos = Math.cos(alpha);
                    if (axis.opposite) {
                        sin = -sin;
                    }
                    if (reverseFlap) {
                        sin = -sin;
                    }
                    vecY = { x: vecX.z * sin, y: cos, z: -vecX.x * sin };
                }
            }
            else if (positionMode === 'ortho') {
                // Labels will be rotated to be ortogonal to the axis
                if (!axis.horiz) { // Y Axis
                    vecX = { x: Math.cos(beta), y: 0, z: Math.sin(beta) };
                }
                else { // X and Z Axis
                    var sina = Math.sin(alpha);
                    var cosa = Math.cos(alpha);
                    var sinb = Math.sin(beta);
                    var cosb = Math.cos(beta);
                    var vecZ = { x: sinb * cosa, y: -sina, z: -cosa * cosb };
                    vecY = {
                        x: vecX.y * vecZ.z - vecX.z * vecZ.y,
                        y: vecX.z * vecZ.x - vecX.x * vecZ.z,
                        z: vecX.x * vecZ.y - vecX.y * vecZ.x
                    };
                    var scale = 1 / Math.sqrt(vecY.x * vecY.x + vecY.y * vecY.y + vecY.z * vecY.z);
                    if (reverseFlap) {
                        scale = -scale;
                    }
                    vecY = { x: scale * vecY.x, y: scale * vecY.y, z: scale * vecY.z };
                }
            }
            else { // positionMode  == 'offset'
                // Labels will be skewd to maintain vertical / horizontal offsets from
                // axis
                if (!axis.horiz) { // Y Axis
                    vecX = { x: Math.cos(beta), y: 0, z: Math.sin(beta) };
                }
                else { // X and Z Axis
                    vecY = {
                        x: Math.sin(beta) * Math.sin(alpha),
                        y: Math.cos(alpha),
                        z: -Math.cos(beta) * Math.sin(alpha)
                    };
                }
            }
            pos.x += offsetX * vecX.x + offsetY * vecY.x;
            pos.y += offsetX * vecX.y + offsetY * vecY.y;
            pos.z += offsetX * vecX.z + offsetY * vecY.z;
            var projected = perspective([pos], axis.chart)[0];
            if (skew) {
                // Check if the label text would be mirrored
                var isMirrored = shapeArea(perspective([
                    pos,
                    { x: pos.x + vecX.x, y: pos.y + vecX.y, z: pos.z + vecX.z },
                    { x: pos.x + vecY.x, y: pos.y + vecY.y, z: pos.z + vecY.z }
                ], axis.chart)) < 0;
                if (isMirrored) {
                    vecX = { x: -vecX.x, y: -vecX.y, z: -vecX.z };
                }
                var pointsProjected = perspective([
                    { x: pos.x, y: pos.y, z: pos.z },
                    { x: pos.x + vecX.x, y: pos.y + vecX.y, z: pos.z + vecX.z },
                    { x: pos.x + vecY.x, y: pos.y + vecY.y, z: pos.z + vecY.z }
                ], axis.chart);
                projected.matrix = [
                    pointsProjected[1].x - pointsProjected[0].x,
                    pointsProjected[1].y - pointsProjected[0].y,
                    pointsProjected[2].x - pointsProjected[0].x,
                    pointsProjected[2].y - pointsProjected[0].y,
                    projected.x,
                    projected.y
                ];
                projected.matrix[4] -= projected.x * projected.matrix[0] +
                    projected.y * projected.matrix[2];
                projected.matrix[5] -= projected.x * projected.matrix[1] +
                    projected.y * projected.matrix[3];
            }
            return projected;
        }
        /*
        Tick extensions
         */
        wrap(Tick.prototype, 'getMarkPath', function (proceed) {
            var path = proceed.apply(this, [].slice.call(arguments, 1));
            var pArr = [
                fix3dPosition(this.axis, { x: path[1], y: path[2], z: 0 }),
                fix3dPosition(this.axis, { x: path[4], y: path[5], z: 0 })
            ];
            return this.axis.chart.renderer.toLineSegments(pArr);
        });
        addEvent(Tick, 'afterGetLabelPosition', function (e) {
            extend(e.pos, fix3dPosition(this.axis, e.pos));
        });
        wrap(Axis.prototype, 'getTitlePosition', function (proceed) {
            var pos = proceed.apply(this, [].slice.call(arguments, 1));
            return fix3dPosition(this, pos, true);
        });
        addEvent(Axis, 'drawCrosshair', function (e) {
            if (this.chart.is3d() && this.coll !== 'colorAxis') {
                if (e.point) {
                    e.point.crosshairPos = this.isXAxis ?
                        e.point.axisXpos :
                        this.len - e.point.axisYpos;
                }
            }
        });
        addEvent(Axis, 'destroy', function () {
            ['backFrame', 'bottomFrame', 'sideFrame'].forEach(function (prop) {
                if (this[prop]) {
                    this[prop] = this[prop].destroy();
                }
            }, this);
        });
        /*
        Z-AXIS
         */
        Axis.prototype.swapZ = function (p, insidePlotArea) {
            if (this.isZAxis) {
                var plotLeft = insidePlotArea ? 0 : this.chart.plotLeft;
                return {
                    x: plotLeft + p.z,
                    y: p.y,
                    z: p.x - plotLeft
                };
            }
            return p;
        };
        ZAxis = H.ZAxis = function () {
            this.init.apply(this, arguments);
        };
        extend(ZAxis.prototype, Axis.prototype);
        extend(ZAxis.prototype, {
            isZAxis: true,
            setOptions: function (userOptions) {
                userOptions = merge({
                    offset: 0,
                    lineWidth: 0
                }, userOptions);
                Axis.prototype.setOptions.call(this, userOptions);
                this.coll = 'zAxis';
            },
            setAxisSize: function () {
                Axis.prototype.setAxisSize.call(this);
                this.width = this.len =
                    this.chart.options.chart.options3d.depth;
                this.right = this.chart.chartWidth - this.width - this.left;
            },
            getSeriesExtremes: function () {
                var axis = this, chart = axis.chart;
                axis.hasVisibleSeries = false;
                // Reset properties in case we're redrawing (#3353)
                axis.dataMin =
                    axis.dataMax =
                        axis.ignoreMinPadding =
                            axis.ignoreMaxPadding = null;
                if (axis.buildStacks) {
                    axis.buildStacks();
                }
                // loop through this axis' series
                axis.series.forEach(function (series) {
                    if (series.visible ||
                        !chart.options.chart.ignoreHiddenSeries) {
                        var seriesOptions = series.options, zData, threshold = seriesOptions.threshold;
                        axis.hasVisibleSeries = true;
                        // Validate threshold in logarithmic axes
                        if (axis.positiveValuesOnly && threshold <= 0) {
                            threshold = null;
                        }
                        zData = series.zData;
                        if (zData.length) {
                            axis.dataMin = Math.min(pick(axis.dataMin, zData[0]), Math.min.apply(null, zData));
                            axis.dataMax = Math.max(pick(axis.dataMax, zData[0]), Math.max.apply(null, zData));
                        }
                    }
                });
            }
        });
        // Get the Z axis in addition to the default X and Y.
        addEvent(Chart, 'afterGetAxes', function () {
            var chart = this, options = this.options, zAxisOptions = options.zAxis = splat(options.zAxis || {});
            if (!chart.is3d()) {
                return;
            }
            this.zAxis = [];
            zAxisOptions.forEach(function (axisOptions, i) {
                axisOptions.index = i;
                // Z-Axis is shown horizontally, so it's kind of a X-Axis
                axisOptions.isX = true;
                var zAxis = new ZAxis(chart, axisOptions);
                zAxis.setScale();
            });
        });
        // Wrap getSlotWidth function to calculate individual width value for each slot
        // (#8042).
        wrap(Axis.prototype, 'getSlotWidth', function (proceed, tick) {
            if (this.chart.is3d() &&
                tick &&
                tick.label &&
                this.categories &&
                this.chart.frameShapes) {
                var chart = this.chart, ticks = this.ticks, gridGroup = this.gridGroup.element.childNodes, firstGridLine = gridGroup[0].getBBox(), frame3DLeft = chart.frameShapes.left.getBBox(), options3d = chart.options.chart.options3d, origin = {
                    x: chart.plotWidth / 2,
                    y: chart.plotHeight / 2,
                    z: options3d.depth / 2,
                    vd: pick(options3d.depth, 1) * pick(options3d.viewDistance, 0)
                }, labelPos, prevLabelPos, nextLabelPos, slotWidth, tickId = tick.pos, prevTick = ticks[tickId - 1], nextTick = ticks[tickId + 1];
                // Check whether the tick is not the first one and previous tick exists,
                // then calculate position of previous label.
                if (tickId !== 0 && prevTick && prevTick.label.xy) { // #8621
                    prevLabelPos = perspective3D({
                        x: prevTick.label.xy.x,
                        y: prevTick.label.xy.y,
                        z: null
                    }, origin, origin.vd);
                }
                // If next label position is defined, then recalculate its position
                // basing on the perspective.
                if (nextTick && nextTick.label.xy) {
                    nextLabelPos = perspective3D({
                        x: nextTick.label.xy.x,
                        y: nextTick.label.xy.y,
                        z: null
                    }, origin, origin.vd);
                }
                labelPos = {
                    x: tick.label.xy.x,
                    y: tick.label.xy.y,
                    z: null
                };
                labelPos = perspective3D(labelPos, origin, origin.vd);
                // If tick is first one, check whether next label position is already
                // calculated, then return difference between the first and the second
                // label. If there is no next label position calculated, return the
                // difference between the first grid line and left 3d frame.
                slotWidth = Math.abs(prevLabelPos ?
                    labelPos.x - prevLabelPos.x : nextLabelPos ?
                    nextLabelPos.x - labelPos.x :
                    firstGridLine.x - frame3DLeft.x);
                return slotWidth;
            }
            return proceed.apply(this, [].slice.call(arguments, 1));
        });

    });
    _registerModule(_modules, 'parts-3d/Series.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  Extension to the Series object in 3D charts.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = H.addEvent, perspective = H.perspective, pick = H.pick;
        /* eslint-disable no-invalid-this */
        // Wrap the translate method to post-translate points into 3D perspective
        addEvent(H.Series, 'afterTranslate', function () {
            if (this.chart.is3d()) {
                this.translate3dPoints();
            }
        });
        // Translate the plotX, plotY properties and add plotZ.
        H.Series.prototype.translate3dPoints = function () {
            var series = this, chart = series.chart, zAxis = pick(series.zAxis, chart.options.zAxis[0]), rawPoints = [], rawPoint, projectedPoints, projectedPoint, zValue, i;
            for (i = 0; i < series.data.length; i++) {
                rawPoint = series.data[i];
                if (zAxis && zAxis.translate) {
                    zValue = zAxis.isLog && zAxis.val2lin ?
                        zAxis.val2lin(rawPoint.z) :
                        rawPoint.z; // #4562
                    rawPoint.plotZ = zAxis.translate(zValue);
                    rawPoint.isInside = rawPoint.isInside ?
                        (zValue >= zAxis.min &&
                            zValue <= zAxis.max) :
                        false;
                }
                else {
                    rawPoint.plotZ = 0;
                }
                rawPoint.axisXpos = rawPoint.plotX;
                rawPoint.axisYpos = rawPoint.plotY;
                rawPoint.axisZpos = rawPoint.plotZ;
                rawPoints.push({
                    x: rawPoint.plotX,
                    y: rawPoint.plotY,
                    z: rawPoint.plotZ
                });
            }
            projectedPoints = perspective(rawPoints, chart, true);
            for (i = 0; i < series.data.length; i++) {
                rawPoint = series.data[i];
                projectedPoint = projectedPoints[i];
                rawPoint.plotX = projectedPoint.x;
                rawPoint.plotY = projectedPoint.y;
                rawPoint.plotZ = projectedPoint.z;
            }
        };

    });
    _registerModule(_modules, 'parts-3d/Column.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = H.addEvent, perspective = H.perspective, pick = H.pick, Series = H.Series, seriesTypes = H.seriesTypes, svg = H.svg, wrap = H.wrap;
        /**
         * Depth of the columns in a 3D column chart. Requires `highcharts-3d.js`.
         *
         * @type      {number}
         * @default   25
         * @since     4.0
         * @product   highcharts
         * @apioption plotOptions.column.depth
         */
        /**
         * 3D columns only. The color of the edges. Similar to `borderColor`,
         *  except it defaults to the same color as the column.
         *
         * @type      {Highcharts.ColorString}
         * @product   highcharts
         * @apioption plotOptions.column.edgeColor
         */
        /**
         * 3D columns only. The width of the colored edges.
         *
         * @type      {number}
         * @default   1
         * @product   highcharts
         * @apioption plotOptions.column.edgeWidth
         */
        /**
         * The spacing between columns on the Z Axis in a 3D chart. Requires
         * `highcharts-3d.js`.
         *
         * @type      {number}
         * @default   1
         * @since     4.0
         * @product   highcharts
         * @apioption plotOptions.column.groupZPadding
         */
        /* eslint-disable no-invalid-this */
        wrap(seriesTypes.column.prototype, 'translate', function (proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));
            // Do not do this if the chart is not 3D
            if (this.chart.is3d()) {
                this.translate3dShapes();
            }
        });
        // In 3D we need to pass point.outsidePlot option to the justifyDataLabel
        // method for disabling justifying dataLabels in columns outside plot
        wrap(H.Series.prototype, 'alignDataLabel', function (proceed) {
            arguments[3].outside3dPlot = arguments[1].outside3dPlot;
            proceed.apply(this, [].slice.call(arguments, 1));
        });
        // Don't use justifyDataLabel when point is outsidePlot
        wrap(H.Series.prototype, 'justifyDataLabel', function (proceed) {
            return !(arguments[2].outside3dPlot) ?
                proceed.apply(this, [].slice.call(arguments, 1)) :
                false;
        });
        seriesTypes.column.prototype.translate3dPoints = function () { };
        seriesTypes.column.prototype.translate3dShapes = function () {
            var series = this, chart = series.chart, seriesOptions = series.options, depth = seriesOptions.depth || 25, stack = seriesOptions.stacking ?
                (seriesOptions.stack || 0) :
                series.index, // #4743
            z = stack * (depth + (seriesOptions.groupZPadding || 1)), borderCrisp = series.borderWidth % 2 ? 0.5 : 0;
            if (chart.inverted && !series.yAxis.reversed) {
                borderCrisp *= -1;
            }
            if (seriesOptions.grouping !== false) {
                z = 0;
            }
            z += (seriesOptions.groupZPadding || 1);
            series.data.forEach(function (point) {
                // #7103 Reset outside3dPlot flag
                point.outside3dPlot = null;
                if (point.y !== null) {
                    var shapeArgs = point.shapeArgs, tooltipPos = point.tooltipPos, 
                    // Array for final shapeArgs calculation.
                    // We are checking two dimensions (x and y).
                    dimensions = [['x', 'width'], ['y', 'height']], borderlessBase; // Crisped rects can have +/- 0.5 pixels offset.
                    // #3131 We need to check if column is inside plotArea.
                    dimensions.forEach(function (d) {
                        borderlessBase = shapeArgs[d[0]] - borderCrisp;
                        if (borderlessBase < 0) {
                            // If borderLessBase is smaller than 0, it is needed to set
                            // its value to 0 or 0.5 depending on borderWidth
                            // borderWidth may be even or odd.
                            shapeArgs[d[1]] +=
                                shapeArgs[d[0]] + borderCrisp;
                            shapeArgs[d[0]] = -borderCrisp;
                            borderlessBase = 0;
                        }
                        if ((borderlessBase + shapeArgs[d[1]] >
                            series[d[0] + 'Axis'].len) &&
                            // Do not change height/width of column if 0 (#6708)
                            shapeArgs[d[1]] !== 0) {
                            shapeArgs[d[1]] =
                                series[d[0] + 'Axis'].len -
                                    shapeArgs[d[0]];
                        }
                        if (
                        // Do not remove columns with zero height/width.
                        (shapeArgs[d[1]] !== 0) &&
                            (shapeArgs[d[0]] >=
                                series[d[0] + 'Axis'].len ||
                                shapeArgs[d[0]] + shapeArgs[d[1]] <=
                                    borderCrisp)) {
                            // Set args to 0 if column is outside the chart.
                            for (var key in shapeArgs) { // eslint-disable-line guard-for-in
                                shapeArgs[key] = 0;
                            }
                            // #7103 outside3dPlot flag is set on Points which are
                            // currently outside of plot.
                            point.outside3dPlot = true;
                        }
                    });
                    // Change from 2d to 3d
                    if (point.shapeType === 'rect') {
                        point.shapeType = 'cuboid';
                    }
                    shapeArgs.z = z;
                    shapeArgs.depth = depth;
                    shapeArgs.insidePlotArea = true;
                    // Translate the tooltip position in 3d space
                    tooltipPos = perspective([{
                            x: tooltipPos[0],
                            y: tooltipPos[1],
                            z: z
                        }], chart, true)[0];
                    point.tooltipPos = [tooltipPos.x, tooltipPos.y];
                }
            });
            // store for later use #4067
            series.z = z;
        };
        wrap(seriesTypes.column.prototype, 'animate', function (proceed) {
            if (!this.chart.is3d()) {
                proceed.apply(this, [].slice.call(arguments, 1));
            }
            else {
                var args = arguments, init = args[1], yAxis = this.yAxis, series = this, reversed = this.yAxis.reversed;
                if (svg) { // VML is too slow anyway
                    if (init) {
                        series.data.forEach(function (point) {
                            if (point.y !== null) {
                                point.height = point.shapeArgs.height;
                                point.shapey = point.shapeArgs.y; // #2968
                                point.shapeArgs.height = 1;
                                if (!reversed) {
                                    if (point.stackY) {
                                        point.shapeArgs.y =
                                            point.plotY +
                                                yAxis.translate(point.stackY);
                                    }
                                    else {
                                        point.shapeArgs.y =
                                            point.plotY +
                                                (point.negative ?
                                                    -point.height :
                                                    point.height);
                                    }
                                }
                            }
                        });
                    }
                    else { // run the animation
                        series.data.forEach(function (point) {
                            if (point.y !== null) {
                                point.shapeArgs.height = point.height;
                                point.shapeArgs.y = point.shapey; // #2968
                                // null value do not have a graphic
                                if (point.graphic) {
                                    point.graphic.animate(point.shapeArgs, series.options.animation);
                                }
                            }
                        });
                        // redraw datalabels to the correct position
                        this.drawDataLabels();
                        // delete this function to allow it only once
                        series.animate = null;
                    }
                }
            }
        });
        // In case of 3d columns there is no sense to add this columns to a specific
        // series group - if series is added to a group all columns will have the same
        // zIndex in comparison with different series.
        wrap(seriesTypes.column.prototype, 'plotGroup', function (proceed, prop, name, visibility, zIndex, parent) {
            if (this.chart.is3d()) {
                if (this[prop]) {
                    delete this[prop];
                }
                if (parent) {
                    if (!this.chart.columnGroup) {
                        this.chart.columnGroup =
                            this.chart.renderer.g('columnGroup').add(parent);
                    }
                    this[prop] = this.chart.columnGroup;
                    this.chart.columnGroup.attr(this.getPlotBox());
                    this[prop].survive = true;
                    if (prop === 'group' || prop === 'markerGroup') {
                        arguments[3] = 'visible';
                        // For 3D column group and markerGroup should be visible
                    }
                }
            }
            return proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        });
        // When series is not added to group it is needed to change setVisible method to
        // allow correct Legend funcionality. This wrap is basing on pie chart series.
        wrap(seriesTypes.column.prototype, 'setVisible', function (proceed, vis) {
            var series = this, pointVis;
            if (series.chart.is3d()) {
                series.data.forEach(function (point) {
                    point.visible = point.options.visible = vis =
                        vis === undefined ?
                            !pick(series.visible, point.visible) : vis;
                    pointVis = vis ? 'visible' : 'hidden';
                    series.options.data[series.data.indexOf(point)] =
                        point.options;
                    if (point.graphic) {
                        point.graphic.attr({
                            visibility: pointVis
                        });
                    }
                });
            }
            proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        });
        seriesTypes.column.prototype
            .handle3dGrouping = true;
        addEvent(Series, 'afterInit', function () {
            if (this.chart.is3d() &&
                this.handle3dGrouping) {
                var seriesOptions = this.options, grouping = seriesOptions.grouping, stacking = seriesOptions.stacking, reversedStacks = pick(this.yAxis.options.reversedStacks, true), z = 0;
                if (!(grouping !== undefined && !grouping)) {
                    var stacks = this.chart.retrieveStacks(stacking), stack = seriesOptions.stack || 0, i; // position within the stack
                    for (i = 0; i < stacks[stack].series.length; i++) {
                        if (stacks[stack].series[i] === this) {
                            break;
                        }
                    }
                    z = (10 * (stacks.totalStacks - stacks[stack].position)) +
                        (reversedStacks ? i : -i); // #4369
                    // In case when axis is reversed, columns are also reversed inside
                    // the group (#3737)
                    if (!this.xAxis.reversed) {
                        z = (stacks.totalStacks * 10) - z;
                    }
                }
                seriesOptions.zIndex = z;
            }
        });
        // eslint-disable-next-line valid-jsdoc
        /**
         * @private
         */
        function pointAttribs(proceed) {
            var attr = proceed.apply(this, [].slice.call(arguments, 1));
            if (this.chart.is3d && this.chart.is3d()) {
                // Set the fill color to the fill color to provide a smooth edge
                attr.stroke = this.options.edgeColor || attr.fill;
                attr['stroke-width'] = pick(this.options.edgeWidth, 1); // #4055
            }
            return attr;
        }
        // eslint-disable-next-line valid-jsdoc
        /**
         * In 3D mode, all column-series are rendered in one main group. Because of that
         * we need to apply inactive state on all points.
         * @private
         */
        function setState(proceed, state, inherit) {
            var is3d = this.chart.is3d && this.chart.is3d();
            if (is3d) {
                this.options.inactiveOtherPoints = true;
            }
            proceed.call(this, state, inherit);
            if (is3d) {
                this.options.inactiveOtherPoints = false;
            }
        }
        wrap(seriesTypes.column.prototype, 'pointAttribs', pointAttribs);
        wrap(seriesTypes.column.prototype, 'setState', setState);
        if (seriesTypes.columnrange) {
            wrap(seriesTypes.columnrange.prototype, 'pointAttribs', pointAttribs);
            wrap(seriesTypes.columnrange.prototype, 'setState', setState);
            seriesTypes.columnrange.prototype.plotGroup =
                seriesTypes.column.prototype.plotGroup;
            seriesTypes.columnrange.prototype.setVisible =
                seriesTypes.column.prototype.setVisible;
        }
        wrap(Series.prototype, 'alignDataLabel', function (proceed) {
            // Only do this for 3D columns and it's derived series
            if (this.chart.is3d() &&
                this instanceof seriesTypes.column) {
                var series = this, chart = series.chart;
                var args = arguments, alignTo = args[4], point = args[1];
                var pos = ({ x: alignTo.x, y: alignTo.y, z: series.z });
                pos = perspective([pos], chart, true)[0];
                alignTo.x = pos.x;
                // #7103 If point is outside of plotArea, hide data label.
                alignTo.y = point.outside3dPlot ? -9e9 : pos.y;
            }
            proceed.apply(this, [].slice.call(arguments, 1));
        });
        // Added stackLabels position calculation for 3D charts.
        wrap(H.StackItem.prototype, 'getStackBox', function (proceed, chart) {
            var stackBox = proceed.apply(this, [].slice.call(arguments, 1));
            // Only do this for 3D chart.
            if (chart.is3d()) {
                var pos = ({
                    x: stackBox.x,
                    y: stackBox.y,
                    z: 0
                });
                pos = H.perspective([pos], chart, true)[0];
                stackBox.x = pos.x;
                stackBox.y = pos.y;
            }
            return stackBox;
        });

    });
    _registerModule(_modules, 'parts-3d/Pie.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  3D pie series
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var deg2rad = H.deg2rad, pick = H.pick, seriesTypes = H.seriesTypes, svg = H.svg, wrap = H.wrap;
        /**
         * The thickness of a 3D pie. Requires `highcharts-3d.js`
         *
         * @type      {number}
         * @default   0
         * @since     4.0
         * @product   highcharts
         * @apioption plotOptions.pie.depth
         */
        /* eslint-disable no-invalid-this */
        wrap(seriesTypes.pie.prototype, 'translate', function (proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));
            // Do not do this if the chart is not 3D
            if (!this.chart.is3d()) {
                return;
            }
            var series = this, seriesOptions = series.options, depth = seriesOptions.depth || 0, options3d = series.chart.options.chart.options3d, alpha = options3d.alpha, beta = options3d.beta, z = seriesOptions.stacking ?
                (seriesOptions.stack || 0) * depth :
                series._i * depth;
            z += depth / 2;
            if (seriesOptions.grouping !== false) {
                z = 0;
            }
            series.data.forEach(function (point) {
                var shapeArgs = point.shapeArgs, angle;
                point.shapeType = 'arc3d';
                shapeArgs.z = z;
                shapeArgs.depth = depth * 0.75;
                shapeArgs.alpha = alpha;
                shapeArgs.beta = beta;
                shapeArgs.center = series.center;
                angle = (shapeArgs.end + shapeArgs.start) / 2;
                point.slicedTranslation = {
                    translateX: Math.round(Math.cos(angle) *
                        seriesOptions.slicedOffset *
                        Math.cos(alpha * deg2rad)),
                    translateY: Math.round(Math.sin(angle) *
                        seriesOptions.slicedOffset *
                        Math.cos(alpha * deg2rad))
                };
            });
        });
        wrap(seriesTypes.pie.prototype.pointClass.prototype, 'haloPath', function (proceed) {
            var args = arguments;
            return this.series.chart.is3d() ? [] : proceed.call(this, args[1]);
        });
        wrap(seriesTypes.pie.prototype, 'pointAttribs', function (proceed, point, state) {
            var attr = proceed.call(this, point, state), options = this.options;
            if (this.chart.is3d() && !this.chart.styledMode) {
                attr.stroke = options.edgeColor || point.color || this.color;
                attr['stroke-width'] = pick(options.edgeWidth, 1);
            }
            return attr;
        });
        wrap(seriesTypes.pie.prototype, 'drawDataLabels', function (proceed) {
            if (this.chart.is3d()) {
                var series = this, chart = series.chart, options3d = chart.options.chart.options3d;
                series.data.forEach(function (point) {
                    var shapeArgs = point.shapeArgs, r = shapeArgs.r, 
                    // #3240 issue with datalabels for 0 and null values
                    a1 = (shapeArgs.alpha || options3d.alpha) * deg2rad, b1 = (shapeArgs.beta || options3d.beta) * deg2rad, a2 = (shapeArgs.start + shapeArgs.end) / 2, labelPosition = point.labelPosition, connectorPosition = labelPosition.connectorPosition, yOffset = (-r * (1 - Math.cos(a1)) * Math.sin(a2)), xOffset = r * (Math.cos(b1) - 1) * Math.cos(a2);
                    // Apply perspective on label positions
                    [
                        labelPosition.natural,
                        connectorPosition.breakAt,
                        connectorPosition.touchingSliceAt
                    ].forEach(function (coordinates) {
                        coordinates.x += xOffset;
                        coordinates.y += yOffset;
                    });
                });
            }
            proceed.apply(this, [].slice.call(arguments, 1));
        });
        wrap(seriesTypes.pie.prototype, 'addPoint', function (proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));
            if (this.chart.is3d()) {
                // destroy (and rebuild) everything!!!
                this.update(this.userOptions, true); // #3845 pass the old options
            }
        });
        wrap(seriesTypes.pie.prototype, 'animate', function (proceed) {
            if (!this.chart.is3d()) {
                proceed.apply(this, [].slice.call(arguments, 1));
            }
            else {
                var args = arguments, init = args[1], animation = this.options.animation, attribs, center = this.center, group = this.group, markerGroup = this.markerGroup;
                if (svg) { // VML is too slow anyway
                    if (animation === true) {
                        animation = {};
                    }
                    // Initialize the animation
                    if (init) {
                        // Scale down the group and place it in the center
                        group.oldtranslateX = group.translateX;
                        group.oldtranslateY = group.translateY;
                        attribs = {
                            translateX: center[0],
                            translateY: center[1],
                            scaleX: 0.001,
                            scaleY: 0.001
                        };
                        group.attr(attribs);
                        if (markerGroup) {
                            markerGroup.attrSetters = group.attrSetters;
                            markerGroup.attr(attribs);
                        }
                        // Run the animation
                    }
                    else {
                        attribs = {
                            translateX: group.oldtranslateX,
                            translateY: group.oldtranslateY,
                            scaleX: 1,
                            scaleY: 1
                        };
                        group.animate(attribs, animation);
                        if (markerGroup) {
                            markerGroup.animate(attribs, animation);
                        }
                        // Delete this function to allow it only once
                        this.animate = null;
                    }
                }
            }
        });

    });
    _registerModule(_modules, 'parts-3d/Scatter.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  Scatter 3D series.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var Point = H.Point, seriesType = H.seriesType, seriesTypes = H.seriesTypes;
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.scatter3d
         *
         * @augments Highcharts.Series
         */
        seriesType('scatter3d', 'scatter', 
        /**
         * A 3D scatter plot uses x, y and z coordinates to display values for three
         * variables for a set of data.
         *
         * @sample {highcharts} highcharts/3d/scatter/
         *         Simple 3D scatter
         * @sample {highcharts} highcharts/demo/3d-scatter-draggable
         *         Draggable 3d scatter
         *
         * @extends      plotOptions.scatter
         * @excluding    dragDrop
         * @product      highcharts
         * @optionparent plotOptions.scatter3d
         */
        {
            tooltip: {
                pointFormat: 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>'
            }
            // Series class
        }, {
            pointAttribs: function (point) {
                var attribs = seriesTypes.scatter.prototype.pointAttribs
                    .apply(this, arguments);
                if (this.chart.is3d() && point) {
                    attribs.zIndex =
                        H.pointCameraDistance(point, this.chart);
                }
                return attribs;
            },
            axisTypes: ['xAxis', 'yAxis', 'zAxis'],
            pointArrayMap: ['x', 'y', 'z'],
            parallelArrays: ['x', 'y', 'z'],
            // Require direct touch rather than using the k-d-tree, because the
            // k-d-tree currently doesn't take the xyz coordinate system into
            // account (#4552)
            directTouch: true
            // Point class
        }, {
            applyOptions: function () {
                Point.prototype.applyOptions.apply(this, arguments);
                if (this.z === undefined) {
                    this.z = 0;
                }
                return this;
            }
        });
        /**
         * A `scatter3d` series. If the [type](#series.scatter3d.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * scatter3d](#plotOptions.scatter3d).
         *
         * @extends   series,plotOptions.scatter3d
         * @product   highcharts
         * @apioption series.scatter3d
         */
        /**
         * An array of data points for the series. For the `scatter3d` series
         * type, points can be given in the following ways:
         *
         * 1.  An array of arrays with 3 values. In this case, the values correspond
         * to `x,y,z`. If the first value is a string, it is applied as the name
         * of the point, and the `x` value is inferred.
         *
         *  ```js
         *     data: [
         *         [0, 0, 1],
         *         [1, 8, 7],
         *         [2, 9, 2]
         *     ]
         *  ```
         *
         * 3.  An array of objects with named values. The following snippet shows only a
         * few settings, see the complete options set below. If the total number of data
         * points exceeds the series'
         * [turboThreshold](#series.scatter3d.turboThreshold), this option is not
         * available.
         *
         *  ```js
         *     data: [{
         *         x: 1,
         *         y: 2,
         *         z: 24,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         x: 1,
         *         y: 4,
         *         z: 12,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         *
         * @sample {highcharts} highcharts/chart/reflow-true/
         *         Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<number>|*>}
         * @extends   series.scatter.data
         * @product   highcharts
         * @apioption series.scatter3d.data
         */
        /**
         * The z value for each data point.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.scatter3d.data.z
         */
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'parts-3d/VMLRenderer.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  Extension to the VML Renderer
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = H.addEvent, Axis = H.Axis, SVGRenderer = H.SVGRenderer, VMLRenderer = H.VMLRenderer;
        if (VMLRenderer) {
            H.setOptions({ animate: false });
            VMLRenderer.prototype.face3d = SVGRenderer.prototype.face3d;
            VMLRenderer.prototype.polyhedron = SVGRenderer.prototype.polyhedron;
            VMLRenderer.prototype.elements3d = SVGRenderer.prototype.elements3d;
            VMLRenderer.prototype.element3d = SVGRenderer.prototype.element3d;
            VMLRenderer.prototype.cuboid = SVGRenderer.prototype.cuboid;
            VMLRenderer.prototype.cuboidPath = SVGRenderer.prototype.cuboidPath;
            VMLRenderer.prototype.toLinePath = SVGRenderer.prototype.toLinePath;
            VMLRenderer.prototype.toLineSegments = SVGRenderer.prototype.toLineSegments;
            VMLRenderer.prototype.arc3d = function (shapeArgs) {
                var result = SVGRenderer.prototype.arc3d.call(this, shapeArgs);
                result.css({ zIndex: result.zIndex });
                return result;
            };
            H.VMLRenderer.prototype.arc3dPath = H.SVGRenderer.prototype.arc3dPath;
            /* eslint-disable no-invalid-this */
            addEvent(Axis, 'render', function () {
                // VML doesn't support a negative z-index
                if (this.sideFrame) {
                    this.sideFrame.css({ zIndex: 0 });
                    this.sideFrame.front.attr({
                        fill: this.sideFrame.color
                    });
                }
                if (this.bottomFrame) {
                    this.bottomFrame.css({ zIndex: 1 });
                    this.bottomFrame.front.attr({
                        fill: this.bottomFrame.color
                    });
                }
                if (this.backFrame) {
                    this.backFrame.css({ zIndex: 0 });
                    this.backFrame.front.attr({
                        fill: this.backFrame.color
                    });
                }
            });
            /* eslint-enable no-invalid-this */
        }

    });
    _registerModule(_modules, 'masters/highcharts-3d.src.js', [], function () {


    });
}));