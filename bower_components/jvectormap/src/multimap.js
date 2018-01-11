/**
 * Creates map with drill-down functionality.
 * @constructor
 * @param {Object} params Parameters to initialize map with.
 * @param {Number} params.maxLevel Maximum number of levels user can go through
 * @param {Object} params.main Config of the main map. See <a href="./jvm-map/">jvm.Map</a> for more information.
 * @param {Function} params.mapNameByCode Function go generate map name by region code. Default value is:
<pre>
function(code, multiMap) {
  return code.toLowerCase()+'_'+
         multiMap.defaultProjection+'_en';
}
</pre>
 * @param {Function} params.mapUrlByCode Function to generate map url by region code. Default value is:
<pre>
function(code, multiMap){
  return 'jquery-jvectormap-data-'+
         code.toLowerCase()+'-'+
         multiMap.defaultProjection+'-en.js';
}
</pre>
 */
jvm.MultiMap = function(params) {
  var that = this;

  this.maps = {};
  this.params = jvm.$.extend(true, {}, jvm.MultiMap.defaultParams, params);
  this.params.maxLevel = this.params.maxLevel || Number.MAX_VALUE;
  this.params.main = this.params.main || {};
  this.params.main.multiMapLevel = 0;
  this.history = [ this.addMap(this.params.main.map, this.params.main) ];
  this.defaultProjection = this.history[0].mapData.projection.type;
  this.mapsLoaded = {};

  this.params.container.css({position: 'relative'});
  this.backButton = jvm.$('<div/>').addClass('jvectormap-goback').text('Back').appendTo(this.params.container);
  this.backButton.hide();
  this.backButton.click(function(){
    that.goBack();
  });

  this.spinner = jvm.$('<div/>').addClass('jvectormap-spinner').appendTo(this.params.container);
  this.spinner.hide();
};

jvm.MultiMap.prototype = {
  addMap: function(name, config){
    var cnt = jvm.$('<div/>').css({
      width: '100%',
      height: '100%'
    });

    this.params.container.append(cnt);

    this.maps[name] = new jvm.Map(jvm.$.extend(config, {container: cnt}));
    if (this.params.maxLevel > config.multiMapLevel) {
      this.maps[name].container.on('regionClick.jvectormap', {scope: this}, function(e, code){
        var multimap = e.data.scope,
            mapName = multimap.params.mapNameByCode(code, multimap);

        if (!multimap.drillDownPromise || multimap.drillDownPromise.state() !== 'pending') {
          multimap.drillDown(mapName, code);
        }
      });
    }


    return this.maps[name];
  },

  downloadMap: function(code){
    var that = this,
        deferred = jvm.$.Deferred();

    if (!this.mapsLoaded[code]) {
      jvm.$.get(this.params.mapUrlByCode(code, this)).then(function(){
        that.mapsLoaded[code] = true;
        deferred.resolve();
      }, function(){
        deferred.reject();
      });
    } else {
      deferred.resolve();
    }
    return deferred;
  },

  drillDown: function(name, code){
    var currentMap = this.history[this.history.length - 1],
        that = this,
        focusPromise = currentMap.setFocus({region: code, animate: true}),
        downloadPromise = this.downloadMap(code);

    focusPromise.then(function(){
      if (downloadPromise.state() === 'pending') {
        that.spinner.show();
      }
    });
    downloadPromise.always(function(){
      that.spinner.hide();
    });
    this.drillDownPromise = jvm.$.when(downloadPromise, focusPromise);
    this.drillDownPromise.then(function(){
      currentMap.params.container.hide();
      if (!that.maps[name]) {
        that.addMap(name, {map: name, multiMapLevel: currentMap.params.multiMapLevel + 1});
      } else {
        that.maps[name].params.container.show();
      }
      that.history.push( that.maps[name] );
      that.backButton.show();
    });
  },

  goBack: function(){
    var currentMap = this.history.pop(),
        prevMap = this.history[this.history.length - 1],
        that = this;

    currentMap.setFocus({scale: 1, x: 0.5, y: 0.5, animate: true}).then(function(){
      currentMap.params.container.hide();
      prevMap.params.container.show();
      prevMap.updateSize();
      if (that.history.length === 1) {
        that.backButton.hide();
      }
      prevMap.setFocus({scale: 1, x: 0.5, y: 0.5, animate: true});
    });
  }
};

jvm.MultiMap.defaultParams = {
  mapNameByCode: function(code, multiMap){
    return code.toLowerCase()+'_'+multiMap.defaultProjection+'_en';
  },
  mapUrlByCode: function(code, multiMap){
    return 'jquery-jvectormap-data-'+code.toLowerCase()+'-'+multiMap.defaultProjection+'-en.js';
  }
}
