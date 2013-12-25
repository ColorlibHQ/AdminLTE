/*!
xCharts v0.3.0 Copyright (c) 2012, tenXer, Inc. All Rights Reserved.
@license MIT license. http://github.com/tenXer/xcharts for details
*/

(function () {

var xChart,
  _vis = {},
  _scales = {},
  _visutils = {};
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,v=e.reduce,h=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,j=i.bind,w=function(n){return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.3";var A=w.each=w.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(w.has(n,a)&&t.call(e,n[a],a,n)===r)return};w.map=w.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e[e.length]=t.call(r,n,u,i)}),e)};var O="Reduce of empty array with no initial value";w.reduce=w.foldl=w.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduce===v)return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},w.reduceRight=w.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduceRight===h)return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=w.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},w.find=w.detect=function(n,t,r){var e;return E(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},w.filter=w.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)}),e)},w.reject=function(n,t,r){return w.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},w.every=w.all=function(n,t,e){t||(t=w.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var E=w.some=w.any=function(n,t,e){t||(t=w.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};w.contains=w.include=function(n,t){return null==n?!1:y&&n.indexOf===y?-1!=n.indexOf(t):E(n,function(n){return n===t})},w.invoke=function(n,t){var r=o.call(arguments,2);return w.map(n,function(n){return(w.isFunction(t)?t:n[t]).apply(n,r)})},w.pluck=function(n,t){return w.map(n,function(n){return n[t]})},w.where=function(n,t){return w.isEmpty(t)?[]:w.filter(n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},w.max=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.max.apply(Math,n);if(!t&&w.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>=e.computed&&(e={value:n,computed:a})}),e.value},w.min=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.min.apply(Math,n);if(!t&&w.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;e.computed>a&&(e={value:n,computed:a})}),e.value},w.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=w.random(r++),e[r-1]=e[t],e[t]=n}),e};var F=function(n){return w.isFunction(n)?n:function(t){return t[n]}};w.sortBy=function(n,t,r){var e=F(t);return w.pluck(w.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(e>r||void 0===e)return-1}return n.index<t.index?-1:1}),"value")};var k=function(n,t,r,e){var u={},i=F(t||w.identity);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};w.groupBy=function(n,t,r){return k(n,t,r,function(n,t,r){(w.has(n,t)?n[t]:n[t]=[]).push(r)})},w.countBy=function(n,t,r){return k(n,t,r,function(n,t){w.has(n,t)||(n[t]=0),n[t]++})},w.sortedIndex=function(n,t,r,e){r=null==r?w.identity:F(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;u>r.call(e,n[o])?i=o+1:a=o}return i},w.toArray=function(n){return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:n.length===+n.length?n.length:w.keys(n).length},w.first=w.head=w.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},w.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},w.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},w.rest=w.tail=w.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var R=function(n,t,r){return A(n,function(n){w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r};w.flatten=function(n,t){return R(n,t,[])},w.without=function(n){return w.difference(n,o.call(arguments,1))},w.uniq=w.unique=function(n,t,r,e){w.isFunction(t)&&(e=r,r=t,t=!1);var u=r?w.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]))}),i},w.union=function(){return w.uniq(c.apply(e,arguments))},w.intersection=function(n){var t=o.call(arguments,1);return w.filter(w.uniq(n),function(n){return w.every(t,function(t){return w.indexOf(t,n)>=0})})},w.difference=function(n){var t=c.apply(e,o.call(arguments,1));return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++)r[e]=w.pluck(n,""+e);return r},w.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},w.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=w.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},w.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},w.range=function(n,t,r){1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;)i[u++]=n,n+=r;return i};var I=function(){};w.bind=function(n,t){var r,e;if(n.bind===j&&j)return j.apply(n,o.call(arguments,1));if(!w.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));I.prototype=n.prototype;var u=new I;I.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},w.bindAll=function(n){var t=o.call(arguments,1);return 0==t.length&&(t=w.functions(n)),A(t,function(t){n[t]=w.bind(n[t],n)}),n},w.memoize=function(n,t){var r={};return t||(t=w.identity),function(){var e=t.apply(this,arguments);return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},w.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},w.defer=function(n){return w.delay.apply(w,[n,1].concat(o.call(arguments,1)))},w.throttle=function(n,t){var r,e,u,i,a=0,o=function(){a=new Date,u=null,i=n.apply(r,e)};return function(){var c=new Date,l=t-(c-a);return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i}},w.debounce=function(n,t,r){var e,u;return function(){var i=this,a=arguments,o=function(){e=null,r||(u=n.apply(i,a))},c=r&&!e;return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u}},w.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},w.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},w.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},w.after=function(n,t){return 0>=n?t():function(){return 1>--n?t.apply(this,arguments):void 0}},w.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)w.has(n,r)&&(t[t.length]=r);return t},w.values=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push(n[r]);return t},w.pairs=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push([r,n[r]]);return t},w.invert=function(n){var t={};for(var r in n)w.has(n,r)&&(t[n[r]]=r);return t},w.functions=w.methods=function(n){var t=[];for(var r in n)w.isFunction(n[r])&&t.push(r);return t.sort()},w.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},w.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},w.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)w.contains(r,u)||(t[u]=n[u]);return t},w.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)null==n[r]&&(n[r]=t[r])}),n},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==t+"";case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;r.push(n),e.push(t);var a=0,o=!0;if("[object Array]"==u){if(a=n.length,o=a==t.length)for(;a--&&(o=S(n[a],t[a],r,e)););}else{var c=n.constructor,f=t.constructor;if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f))return!1;for(var s in n)if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&S(n[s],t[s],r,e))))break;if(o){for(s in t)if(w.has(t,s)&&!a--)break;o=!a}}return r.pop(),e.pop(),o};w.isEqual=function(n,t){return S(n,t,[],[])},w.isEmpty=function(n){if(null==n)return!0;if(w.isArray(n)||w.isString(n))return 0===n.length;for(var t in n)if(w.has(n,t))return!1;return!0},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=x||function(n){return"[object Array]"==l.call(n)},w.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){w["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return!(!n||!w.has(n,"callee"))}),w.isFunction=function(n){return"function"==typeof n},w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!=+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return void 0===n},w.has=function(n,t){return f.call(n,t)},w.noConflict=function(){return n._=t,this},w.identity=function(n){return n},w.times=function(n,t,r){for(var e=Array(n),u=0;n>u;u++)e[u]=t.call(r,u);return e},w.random=function(n,t){return null==t&&(t=n,n=0),n+(0|Math.random()*(t-n+1))};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};T.unescape=w.invert(T.escape);var M={escape:RegExp("["+w.keys(T.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(T.unescape).join("|")+")","g")};w.each(["escape","unescape"],function(n){w[n]=function(t){return null==t?"":(""+t).replace(M[n],function(t){return T[n][t]})}}),w.result=function(n,t){if(null==n)return null;var r=n[t];return w.isFunction(r)?r.call(n):r},w.mixin=function(n){A(w.functions(n),function(t){var r=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(w,n))}})};var N=0;w.uniqueId=function(n){var t=""+ ++N;return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;w.template=function(n,t,r){r=w.defaults({},r,w.templateSettings);var e=RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(D,function(n){return"\\"+B[n]}),r&&(i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(i+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),a&&(i+="';\n"+a+"\n__p+='"),u=o+t.length,t}),i+="';\n",r.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=Function(r.variable||"obj","_",i)}catch(o){throw o.source=i,o}if(t)return a(t,w);var c=function(n){return a.call(this,n,w)};return c.source="function("+(r.variable||"obj")+"){\n"+i+"}",c},w.chain=function(n){return w(n).chain()};var z=function(n){return this._chain?w(n).chain():n};w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];w.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];w.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),w.extend(w.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);function getInsertionPoint(zIndex) {
  return _.chain(_.range(zIndex, 10)).reverse().map(function (z) {
    return 'g[data-index="' + z + '"]';
  }).value().join(', ');
}

function colorClass(el, i) {
  var c = el.getAttribute('class');
  return ((c !== null) ? c.replace(/color\d+/g, '') : '') + ' color' + i;
}

_visutils = {
  getInsertionPoint: getInsertionPoint,
  colorClass: colorClass
};
var local = this,
  defaultSpacing = 0.25;

function _getDomain(data, axis) {
  return _.chain(data)
    .pluck('data')
    .flatten()
    .pluck(axis)
    .uniq()
    .filter(function (d) {
      return d !== undefined && d !== null;
    })
    .value()
    .sort(d3.ascending);
}

_scales.ordinal = function (data, axis, bounds, extents) {
  var domain = _getDomain(data, axis);
  return d3.scale.ordinal()
    .domain(domain)
    .rangeRoundBands(bounds, defaultSpacing);
};

_scales.linear = function (data, axis, bounds, extents) {
  return d3.scale.linear()
    .domain(extents)
    .nice()
    .rangeRound(bounds);
};

_scales.exponential = function (data, axis, bounds, extents) {
  return d3.scale.pow()
    .exponent(0.65)
    .domain(extents)
    .nice()
    .rangeRound(bounds);
};

_scales.time = function (data, axis, bounds, extents) {
  return d3.time.scale()
    .domain(_.map(extents, function (d) { return new Date(d); }))
    .range(bounds);
};

function _extendDomain(domain, axis) {
  var min = domain[0],
    max = domain[1],
    diff,
    e;

  if (min === max) {
    e = Math.max(Math.round(min / 10), 4);
    min -= e;
    max += e;
  }

  diff = max - min;
  min = (min) ? min - (diff / 10) : min;
  min = (domain[0] > 0) ? Math.max(min, 0) : min;
  max = (max) ? max + (diff / 10) : max;
  max = (domain[1] < 0) ? Math.min(max, 0) : max;

  return [min, max];
}

function _getExtents(options, data, xType, yType) {
  var extents,
    nData = _.chain(data)
      .pluck('data')
      .flatten()
      .value();

  extents = {
    x: d3.extent(nData, function (d) { return d.x; }),
    y: d3.extent(nData, function (d) { return d.y; })
  };

  _.each([xType, yType], function (type, i) {
    var axis = (i) ? 'y' : 'x',
      extended;
    extents[axis] = d3.extent(nData, function (d) { return d[axis]; });
    if (type === 'ordinal') {
      return;
    }

    _.each([axis + 'Min', axis + 'Max'], function (minMax, i) {
      if (type !== 'time') {
        extended = _extendDomain(extents[axis]);
      }

      if (options.hasOwnProperty(minMax) && options[minMax] !== null) {
        extents[axis][i] = options[minMax];
      } else if (type !== 'time') {
        extents[axis][i] = extended[i];
      }
    });
  });

  return extents;
}

_scales.xy = function (self, data, xType, yType) {
  var o = self._options,
    extents = _getExtents(o, data, xType, yType),
    scales = {},
    horiz = [o.axisPaddingLeft, self._width],
    vert = [self._height, o.axisPaddingTop],
    xScale,
    yScale;

  _.each([xType, yType], function (type, i) {
    var axis = (i === 0) ? 'x' : 'y',
      bounds = (i === 0) ? horiz : vert,
      fn = xChart.getScale(type);
    scales[axis] = fn(data, axis, bounds, extents[axis]);
  });

  return scales;
};
(function () {
  var zIndex = 2,
    selector = 'g.bar',
    insertBefore = _visutils.getInsertionPoint(zIndex);

  function postUpdateScale(self, scaleData, mainData, compData) {
    self.xScale2 = d3.scale.ordinal()
      .domain(d3.range(0, mainData.length))
      .rangeRoundBands([0, self.xScale.rangeBand()], 0.08);
  }

  function enter(self, storage, className, data, callbacks) {
    var barGroups, bars,
      yZero = self.yZero;

    barGroups = self._g.selectAll(selector + className)
      .data(data, function (d) {
        return d.className;
      });

    barGroups.enter().insert('g', insertBefore)
      .attr('data-index', zIndex)
      .style('opacity', 0)
      .attr('class', function (d, i) {
        var cl = _.uniq((className + d.className).split('.')).join(' ');
        return cl + ' bar ' + _visutils.colorClass(this, i);
      })
      .attr('transform', function (d, i) {
        return 'translate(' + self.xScale2(i) + ',0)';
      });

    bars = barGroups.selectAll('rect')
      .data(function (d) {
        return d.data;
      }, function (d) {
        return d.x;
      });

    bars.enter().append('rect')
      .attr('width', 0)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('x', function (d) {
        return self.xScale(d.x) + (self.xScale2.rangeBand() / 2);
      })
      .attr('height', function (d) {
        return Math.abs(yZero - self.yScale(d.y));
      })
      .attr('y', function (d) {
        return (d.y < 0) ? yZero : self.yScale(d.y);
      })
      .on('mouseover', callbacks.mouseover)
      .on('mouseout', callbacks.mouseout)
      .on('click', callbacks.click);

    storage.barGroups = barGroups;
    storage.bars = bars;
  }

  function update(self, storage, timing) {
    var yZero = self.yZero;

    storage.barGroups
      .attr('class', function (d, i) {
        return _visutils.colorClass(this, i);
      })
      .transition().duration(timing)
      .style('opacity', 1)
      .attr('transform', function (d, i) {
        return 'translate(' + self.xScale2(i) + ',0)';
      });

    storage.bars.transition().duration(timing)
      .attr('width', self.xScale2.rangeBand())
      .attr('x', function (d) {
        return self.xScale(d.x);
      })
      .attr('height', function (d) {
        return Math.abs(yZero - self.yScale(d.y));
      })
      .attr('y', function (d) {
        return (d.y < 0) ? yZero : self.yScale(d.y);
      });
  }

  function exit(self, storage, timing) {
    storage.bars.exit()
      .transition().duration(timing)
      .attr('width', 0)
      .remove();
    storage.barGroups.exit()
      .transition().duration(timing)
      .style('opacity', 0)
      .remove();
  }

  function destroy(self, storage, timing) {
    var band = (self.xScale2) ? self.xScale2.rangeBand() / 2 : 0;
    delete self.xScale2;
    storage.bars
      .transition().duration(timing)
      .attr('width', 0)
      .attr('x', function (d) {
        return self.xScale(d.x) + band;
      });
  }

  _vis.bar = {
    postUpdateScale: postUpdateScale,
    enter: enter,
    update: update,
    exit: exit,
    destroy: destroy
  };
}());
(function () {

  var zIndex = 3,
    selector = 'g.line',
    insertBefore = _visutils.getInsertionPoint(zIndex);

  function enter(self, storage, className, data, callbacks) {
    var inter = self._options.interpolation,
      x = function (d, i) {
        if (!self.xScale2 && !self.xScale.rangeBand) {
          return self.xScale(d.x);
        }
        return self.xScale(d.x) + (self.xScale.rangeBand() / 2);
      },
      y = function (d) { return self.yScale(d.y); },
      line = d3.svg.line()
        .x(x)
        .interpolate(inter),
      area = d3.svg.area()
        .x(x)
        .y1(self.yZero)
        .interpolate(inter),
      container,
      fills,
      paths;

    function datum(d) {
      return [d.data];
    }

    container = self._g.selectAll(selector + className)
      .data(data, function (d) {
        return d.className;
      });

    container.enter().insert('g', insertBefore)
      .attr('data-index', zIndex)
      .attr('class', function (d, i) {
        var cl = _.uniq((className + d.className).split('.')).join(' ');
        return cl + ' line ' + _visutils.colorClass(this, i);
      });

    fills = container.selectAll('path.fill')
      .data(datum);

    fills.enter().append('path')
      .attr('class', 'fill')
      .style('opacity', 0)
      .attr('d', area.y0(y));

    paths = container.selectAll('path.line')
      .data(datum);

    paths.enter().append('path')
      .attr('class', 'line')
      .style('opacity', 0)
      .attr('d', line.y(y));

    storage.lineContainers = container;
    storage.lineFills = fills;
    storage.linePaths = paths;
    storage.lineX = x;
    storage.lineY = y;
    storage.lineA = area;
    storage.line = line;
  }

  function update(self, storage, timing) {
    storage.lineContainers
      .attr('class', function (d, i) {
        return _visutils.colorClass(this, i);
      });

    storage.lineFills.transition().duration(timing)
      .style('opacity', 1)
      .attr('d', storage.lineA.y0(storage.lineY));

    storage.linePaths.transition().duration(timing)
      .style('opacity', 1)
      .attr('d', storage.line.y(storage.lineY));
  }

  function exit(self, storage) {
    storage.linePaths.exit()
      .style('opacity', 0)
      .remove();
    storage.lineFills.exit()
      .style('opacity', 0)
      .remove();

    storage.lineContainers.exit()
      .remove();
  }

  function destroy(self, storage, timing) {
    storage.linePaths.transition().duration(timing)
      .style('opacity', 0);
    storage.lineFills.transition().duration(timing)
      .style('opacity', 0);
  }

  _vis.line = {
    enter: enter,
    update: update,
    exit: exit,
    destroy: destroy
  };
}());
(function () {
  var line = _vis.line;

  function enter(self, storage, className, data, callbacks) {
    var circles;

    line.enter(self, storage, className, data, callbacks);

    circles = storage.lineContainers.selectAll('circle')
      .data(function (d) {
        return d.data;
      }, function (d) {
        return d.x;
      });

    circles.enter().append('circle')
      .style('opacity', 0)
      .attr('cx', storage.lineX)
      .attr('cy', storage.lineY)
      .attr('r', 5)
      .on('mouseover', callbacks.mouseover)
      .on('mouseout', callbacks.mouseout)
      .on('click', callbacks.click);

    storage.lineCircles = circles;
  }

  function update(self, storage, timing) {
    line.update.apply(null, _.toArray(arguments));

    storage.lineCircles.transition().duration(timing)
      .style('opacity', 1)
      .attr('cx', storage.lineX)
      .attr('cy', storage.lineY);
  }

  function exit(self, storage) {
    storage.lineCircles.exit()
      .remove();
    line.exit.apply(null, _.toArray(arguments));
  }

  function destroy(self, storage, timing) {
    line.destroy.apply(null, _.toArray(arguments));
    if (!storage.lineCircles) {
      return;
    }
    storage.lineCircles.transition().duration(timing)
      .style('opacity', 0);
  }

  _vis['line-dotted'] = {
    enter: enter,
    update: update,
    exit: exit,
    destroy: destroy
  };
}());
(function () {
  var line = _vis['line-dotted'];

  function enter(self, storage, className, data, callbacks) {
    line.enter(self, storage, className, data, callbacks);
  }

  function _accumulate_data(data) {
    function reduce(memo, num) {
      return memo + num.y;
    }

    var nData = _.map(data, function (set) {
      var i = set.data.length,
        d = _.clone(set.data);
      set = _.clone(set);
      while (i) {
        i -= 1;
        // Need to clone here, otherwise we are actually setting the same
        // data onto the original data set.
        d[i] = _.clone(set.data[i]);
        d[i].y0 = set.data[i].y;
        d[i].y = _.reduce(_.first(set.data, i), reduce, set.data[i].y);
      }
      return _.extend(set, { data: d });
    });

    return nData;
  }

  function _resetData(self) {
    if (!self.hasOwnProperty('cumulativeOMainData')) {
      return;
    }
    self._mainData = self.cumulativeOMainData;
    delete self.cumulativeOMainData;
    self._compData = self.cumulativeOCompData;
    delete self.cumulativeOCompData;
  }

  function preUpdateScale(self, data) {
    _resetData(self);
    self.cumulativeOMainData = self._mainData;
    self._mainData = _accumulate_data(self._mainData);
    self.cumulativeOCompData = self._compData;
    self._compData = _accumulate_data(self._compData);
  }

  function destroy(self, storage, timing) {
    _resetData(self);
    line.destroy.apply(null, _.toArray(arguments));
  }

  _vis.cumulative = {
    preUpdateScale: preUpdateScale,
    enter: enter,
    update: line.update,
    exit: line.exit,
    destroy: destroy
  };
}());
var emptyData = [[]],
  defaults = {
    // User interaction callbacks
    mouseover: function (data, i) {},
    mouseout: function (data, i) {},
    click: function (data, i) {},

    // Padding between the axes and the contents of the chart
    axisPaddingTop: 0,
    axisPaddingRight: 0,
    axisPaddingBottom: 5,
    axisPaddingLeft: 20,

    // Padding around the edge of the chart (space for axis labels, etc)
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 20,
    paddingLeft: 60,

    // Axis tick formatting
    tickHintX: 10,
    tickFormatX: function (x) { return x; },
    tickHintY: 10,
    tickFormatY: function (y) { return y; },

    // Min/Max Axis Values
    xMin: null,
    xMax: null,
    yMin: null,
    yMax: null,

    // Pre-format input data
    dataFormatX: function (x) { return x; },
    dataFormatY: function (y) { return y; },

    unsupported: function (selector) {
      d3.select(selector).text('SVG is not supported on your browser');
    },

    // Callback functions if no data
    empty: function (self, selector, d) {},
    notempty: function (self, selector) {},

    timing: 750,

    // Line interpolation
    interpolation: 'monotone',

    // Data sorting
    sortX: function (a, b) {
      return (!a.x && !b.x) ? 0 : (a.x < b.x) ? -1 : 1;
    }
  };

// What/how should the warning/error be presented?
function svgEnabled() {
  var d = document;
  return (!!d.createElementNS &&
    !!d.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
}

/**
 * Creates a new chart
 *
 * @param string type       The drawing type for the main data
 * @param array data        Data to render in the chart
 * @param string selector   CSS Selector for the parent element for the chart
 * @param object options    Optional. See `defaults` for options
 *
 * Examples:
 *    var data = {
 *        "main": [
 *          {
 *            "data": [
 *              {
 *                "x": "2012-08-09T07:00:00.522Z",
 *                "y": 68
 *              },
 *              {
 *                "x": "2012-08-10T07:00:00.522Z",
 *                "y": 295
 *              },
 *              {
 *                "x": "2012-08-11T07:00:00.522Z",
 *                "y": 339
 *              },
 *            ],
 *            "className": ".foo"
 *          }
 *        ],
 *        "xScale": "ordinal",
 *        "yScale": "linear",
 *        "comp": [
 *          {
 *            "data": [
 *              {
 *                "x": "2012-08-09T07:00:00.522Z",
 *                "y": 288
 *              },
 *              {
 *                "x": "2012-08-10T07:00:00.522Z",
 *                "y": 407
 *              },
 *              {
 *                "x": "2012-08-11T07:00:00.522Z",
 *                "y": 459
 *              }
 *            ],
 *            "className": ".comp.comp_foo",
 *            "type": "line-arrowed"
 *          }
 *        ]
 *      },
 *      myChart = new Chart('bar', data, '#chart');
 *
 */
function xChart(type, data, selector, options) {
  var self = this,
    resizeLock;

  self._options = options = _.defaults(options || {}, defaults);

  if (svgEnabled() === false) {
    return options.unsupported(selector);
  }

  self._selector = selector;
  self._container = d3.select(selector);
  self._drawSvg();
  self._mainStorage = {};
  self._compStorage = {};

  data = _.clone(data);
  if (type && !data.type) {
    data.type = type;
  }

  self.setData(data);

  d3.select(window).on('resize.for.' + selector, function () {
    if (resizeLock) {
      clearTimeout(resizeLock);
    }
    resizeLock = setTimeout(function () {
      resizeLock = null;
      self._resize();
    }, 500);
  });
}

/**
 * Add a visualization type
 *
 * @param string type   Unique key/name used with setType
 * @param object vis    object map of vis methods
 */
xChart.setVis = function (type, vis) {
  if (_vis.hasOwnProperty(type)) {
    throw 'Cannot override vis type "' + type + '".';
  }
  _vis[type] = vis;
};

/**
 * Get a clone of a visualization
 * Useful for extending vis functionality
 *
 * @param string type   Unique key/name of the vis
 */
xChart.getVis = function (type) {
  if (!_vis.hasOwnProperty(type)) {
    throw 'Vis type "' + type + '" does not exist.';
  }

  return _.clone(_vis[type]);
};

xChart.setScale = function (name, fn) {
  if (_scales.hasOwnProperty(name)) {
    throw 'Scale type "' + name + '" already exists.';
  }

  _scales[name] = fn;
};

xChart.getScale = function (name) {
  if (!_scales.hasOwnProperty(name)) {
    throw 'Scale type "' + name + '" does not exist.';
  }
  return _scales[name];
};

xChart.visutils = _visutils;

_.defaults(xChart.prototype, {
  /**
   * Set or change the drawing type for the main data.
   *
   * @param string type   Must be an available drawing type
   *
   */
  setType: function (type, skipDraw) {
    var self = this;

    if (self._type && type === self._type) {
      return;
    }

    if (!_vis.hasOwnProperty(type)) {
      throw 'Vis type "' + type + '" is not defined.';
    }

    if (self._type) {
      self._destroy(self._vis, self._mainStorage);
    }

    self._type = type;
    self._vis = _vis[type];
    if (!skipDraw) {
      self._draw();
    }
  },

  /**
   * Set and update the data for the chart. Optionally skip drawing.
   *
   * @param object data       New data. See new xChart example for format
   *
   */
  setData: function (data) {
    var self = this,
      o = self._options,
      nData = _.clone(data);

    if (!data.hasOwnProperty('main')) {
      throw 'No "main" key found in given chart data.';
    }

    switch (data.type) {
    case 'bar':
      // force the xScale to be ordinal
      data.xScale = 'ordinal';
      break;
    case undefined:
      data.type = self._type;
      break;
    }

    o.xMin = (isNaN(parseInt(data.xMin, 10))) ? o.xMin : data.xMin;
    o.xMax = (isNaN(parseInt(data.xMax, 10))) ? o.xMax : data.xMax;
    o.yMin = (isNaN(parseInt(data.yMin, 10))) ? o.yMin : data.yMin;
    o.yMax = (isNaN(parseInt(data.yMax, 10))) ? o.yMax : data.yMax;

    if (self._vis) {
      self._destroy(self._vis, self._mainStorage);
    }

    self.setType(data.type, true);

    function _mapData(set) {
      var d = _.map(_.clone(set.data), function (p) {
        var np = _.clone(p);
        if (p.hasOwnProperty('x')) {
          np.x = o.dataFormatX(p.x);
        }
        if (p.hasOwnProperty('y')) {
          np.y = o.dataFormatY(p.y);
        }
        return np;
      }).sort(o.sortX);
      return _.extend(_.clone(set), { data: d });
    }

    nData.main = _.map(nData.main, _mapData);
    self._mainData = nData.main;
    self._xScaleType = nData.xScale;
    self._yScaleType = nData.yScale;

    if (nData.hasOwnProperty('comp')) {
      nData.comp = _.map(nData.comp, _mapData);
      self._compData = nData.comp;
    } else {
      self._compData = [];
    }

    self._draw();
  },

  /**
   * Change the scale of an axis
   *
   * @param string axis   Name of an axis. One of 'x' or 'y'
   * @param string type   Name of the scale type
   *
   */
  setScale: function (axis, type) {
    var self = this;

    switch (axis) {
    case 'x':
      self._xScaleType = type;
      break;
    case 'y':
      self._yScaleType = type;
      break;
    default:
      throw 'Cannot change scale of unknown axis "' + axis + '".';
    }

    self._draw();
  },

  /**
   * Create the SVG element and g container. Resize if necessary.
   */
  _drawSvg: function () {
    var self = this,
      c = self._container,
      options = self._options,
      width = parseInt(c.style('width').replace('px', ''), 10),
      height = parseInt(c.style('height').replace('px', ''), 10),
      svg,
      g,
      gScale;

    svg = c.selectAll('svg')
      .data(emptyData);

    svg.enter().append('svg')
      // Inherit the height and width from the parent element
      .attr('height', height)
      .attr('width', width)
      .attr('class', 'xchart');

    svg.transition()
      .attr('width', width)
      .attr('height', height);

    g = svg.selectAll('g')
      .data(emptyData);

    g.enter().append('g')
      .attr(
        'transform',
        'translate(' + options.paddingLeft + ',' + options.paddingTop + ')'
      );

    gScale = g.selectAll('g.scale')
      .data(emptyData);

    gScale.enter().append('g')
      .attr('class', 'scale');

    self._svg = svg;
    self._g = g;
    self._gScale = gScale;

    self._height = height - options.paddingTop - options.paddingBottom -
      options.axisPaddingTop - options.axisPaddingBottom;
    self._width = width - options.paddingLeft - options.paddingRight -
      options.axisPaddingLeft - options.axisPaddingRight;
  },

  /**
   * Resize the visualization
   */
  _resize: function (event) {
    var self = this;

    self._drawSvg();
    self._draw();
  },

  /**
   * Draw the x and y axes
   */
  _drawAxes: function () {
    if (this._noData) {
      return;
    }
    var self = this,
      o = self._options,
      t = self._gScale.transition().duration(o.timing),
      xTicks = o.tickHintX,
      yTicks = o.tickHintY,
      bottom = self._height + o.axisPaddingTop + o.axisPaddingBottom,
      zeroLine = d3.svg.line().x(function (d) { return d; }),
      zLine,
      zLinePath,
      xAxis,
      xRules,
      yAxis,
      yRules,
      labels;

    xRules = d3.svg.axis()
      .scale(self.xScale)
      .ticks(xTicks)
      .tickSize(-self._height)
      .tickFormat(o.tickFormatX)
      .orient('bottom');

    xAxis = self._gScale.selectAll('g.axisX')
      .data(emptyData);

    xAxis.enter().append('g')
      .attr('class', 'axis axisX')
      .attr('transform', 'translate(0,' + bottom + ')');

    xAxis.call(xRules);

    labels = self._gScale.selectAll('.axisX g')[0];
    if (labels.length > (self._width / 80)) {
      labels.sort(function (a, b) {
        var r = /translate\(([^,)]+)/;
        a = a.getAttribute('transform').match(r);
        b = b.getAttribute('transform').match(r);
        return parseFloat(a[1], 10) - parseFloat(b[1], 10);
      });

      d3.selectAll(labels)
        .filter(function (d, i) {
          return i % (Math.ceil(labels.length / xTicks) + 1);
        })
        .remove();
    }

    yRules = d3.svg.axis()
      .scale(self.yScale)
      .ticks(yTicks)
      .tickSize(-self._width - o.axisPaddingRight - o.axisPaddingLeft)
      .tickFormat(o.tickFormatY)
      .orient('left');

    yAxis = self._gScale.selectAll('g.axisY')
      .data(emptyData);

    yAxis.enter().append('g')
      .attr('class', 'axis axisY')
      .attr('transform', 'translate(0,0)');

    t.selectAll('g.axisY')
      .call(yRules);

    // zero line
    zLine = self._gScale.selectAll('g.axisZero')
      .data([[]]);

    zLine.enter().append('g')
      .attr('class', 'axisZero');

    zLinePath = zLine.selectAll('line')
      .data([[]]);

    zLinePath.enter().append('line')
      .attr('x1', 0)
      .attr('x2', self._width + o.axisPaddingLeft + o.axisPaddingRight)
      .attr('y1', self.yZero)
      .attr('y2', self.yZero);

    zLinePath.transition().duration(o.timing)
      .attr('y1', self.yZero)
      .attr('y2', self.yZero);
  },

  /**
   * Update the x and y scales (used when drawing)
   *
   * Optional methods in drawing types:
   *    preUpdateScale
   *    postUpdateScale
   *
   * Example implementation in vis type:
   *
   *    function postUpdateScale(self, scaleData, mainData, compData) {
   *      self.xScale2 = d3.scale.ordinal()
   *        .domain(d3.range(0, mainData.length))
   *        .rangeRoundBands([0, self.xScale.rangeBand()], 0.08);
   *    }
   *
   */
  _updateScale: function () {
    var self = this,
      _unionData = function () {
        return _.union(self._mainData, self._compData);
      },
      scaleData = _unionData(),
      vis = self._vis,
      scale,
      min;

    delete self.xScale;
    delete self.yScale;
    delete self.yZero;

    if (vis.hasOwnProperty('preUpdateScale')) {
      vis.preUpdateScale(self, scaleData, self._mainData, self._compData);
    }

    // Just in case preUpdateScale modified
    scaleData = _unionData();
    scale = _scales.xy(self, scaleData, self._xScaleType, self._yScaleType);

    self.xScale = scale.x;
    self.yScale = scale.y;

    min = self.yScale.domain()[0];
    self.yZero = (min > 0) ? self.yScale(min) : self.yScale(0);

    if (vis.hasOwnProperty('postUpdateScale')) {
      vis.postUpdateScale(self, scaleData, self._mainData, self._compData);
    }
  },

  /**
   * Create (Enter) the elements for the vis
   *
   * Required method
   *
   * Example implementation in vis type:
   *
   *    function enter(self, data, callbacks) {
   *      var foo = self._g.selectAll('g.foobar')
   *        .data(data);
   *      foo.enter().append('g')
   *        .attr('class', 'foobar');
   *      self.foo = foo;
   *    }
   */
  _enter: function (vis, storage, data, className) {
    var self = this,
      callbacks = {
        click: self._options.click,
        mouseover: self._options.mouseover,
        mouseout: self._options.mouseout
      };
    self._checkVisMethod(vis, 'enter');
    vis.enter(self, storage, className, data, callbacks);
  },

  /**
   * Update the elements opened by the select method
   *
   * Required method
   *
   * Example implementation in vis type:
   *
   *    function update(self, timing) {
   *      self.bars.transition().duration(timing)
   *        .attr('width', self.xScale2.rangeBand())
   *        .attr('height', function (d) {
   *          return self.yScale(d.y);
   *        });
   *    }
   */
  _update: function (vis, storage) {
    var self = this;
    self._checkVisMethod(vis, 'update');
    vis.update(self, storage, self._options.timing);
  },

  /**
   * Remove or transition out the elements that no longer have data
   *
   * Required method
   *
   * Example implementation in vis type:
   *
   *    function exit(self) {
   *      self.bars.exit().remove();
   *    }
   */
  _exit: function (vis, storage) {
    var self = this;
    self._checkVisMethod(vis, 'exit');
    vis.exit(self, storage, self._options.timing);
  },

  /**
   * Destroy the current vis type (transition to new type)
   *
   * Required method
   *
   * Example implementation in vis type:
   *
   *    function destroy(self, timing) {
   *      self.bars.transition().duration(timing)
   *        attr('height', 0);
   *      delete self.bars;
   *    }
   */
  _destroy: function (vis, storage) {
    var self = this;
    self._checkVisMethod(vis, 'destroy');
    try {
      vis.destroy(self, storage, self._options.timing);
    } catch (e) {}
  },

  /**
   * Draw the visualization
   */
  _draw: function () {
    var self = this,
      o = self._options,
      comp,
      compKeys;

    self._noData = _.flatten(_.pluck(self._mainData, 'data')
      .concat(_.pluck(self._compData, 'data'))).length === 0;

    self._updateScale();
    self._drawAxes();

    self._enter(self._vis, self._mainStorage, self._mainData, '.main');
    self._exit(self._vis, self._mainStorage);
    self._update(self._vis, self._mainStorage);

    comp = _.chain(self._compData).groupBy(function (d) {
      return d.type;
    });
    compKeys = comp.keys();

    // Find old comp vis items and remove any that no longer exist
    _.each(self._compStorage, function (d, key) {
      if (-1 === compKeys.indexOf(key).value()) {
        var vis = _vis[key];
        self._enter(vis, d, [], '.comp.' + key.replace(/\W+/g, ''));
        self._exit(vis, d);
      }
    });

    comp.each(function (d, key) {
      var vis = _vis[key], storage;
      if (!self._compStorage.hasOwnProperty(key)) {
        self._compStorage[key] = {};
      }
      storage = self._compStorage[key];
      self._enter(vis, storage, d, '.comp.' + key.replace(/\W+/g, ''));
      self._exit(vis, storage);
      self._update(vis, storage);
    });

    if (self._noData) {
      o.empty(self, self._selector, self._mainData);
    } else {
      o.notempty(self, self._selector);
    }
  },

  /**
   * Ensure drawing method exists
   */
  _checkVisMethod: function (vis, method) {
    var self = this;
    if (!vis[method]) {
      throw 'Required method "' + method + '" not found on vis type "' +
        self._type + '".';
    }
  }
});
if (typeof define === 'function' && define.amd && typeof define.amd === 'object') {
  define(function () {
    return xChart;
  });
  return;
}

window.xChart = xChart;

}());
