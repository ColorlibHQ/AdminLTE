<!DOCTYPE html>
<html>
<head>
  <title>jVectorMap demo</title>
  <link rel="stylesheet" media="all" href="../jquery-jvectormap.css"/>
  <script src="assets/jquery-1.8.2.js"></script>
  <script src="../jquery-jvectormap.js"></script>
  <script src="../lib/jquery-mousewheel.js"></script>

  <script src="../src/jvectormap.js"></script>

  <script src="../src/abstract-element.js"></script>
  <script src="../src/abstract-canvas-element.js"></script>
  <script src="../src/abstract-shape-element.js"></script>

  <script src="../src/svg-element.js"></script>
  <script src="../src/svg-group-element.js"></script>
  <script src="../src/svg-canvas-element.js"></script>
  <script src="../src/svg-shape-element.js"></script>
  <script src="../src/svg-path-element.js"></script>
  <script src="../src/svg-circle-element.js"></script>
  <script src="../src/svg-image-element.js"></script>
  <script src="../src/svg-text-element.js"></script>

  <script src="../src/vml-element.js"></script>
  <script src="../src/vml-group-element.js"></script>
  <script src="../src/vml-canvas-element.js"></script>
  <script src="../src/vml-shape-element.js"></script>
  <script src="../src/vml-path-element.js"></script>
  <script src="../src/vml-circle-element.js"></script>
  <script src="../src/vml-image-element.js"></script>

  <script src="../src/map-object.js"></script>
  <script src="../src/region.js"></script>
  <script src="../src/marker.js"></script>

  <script src="../src/vector-canvas.js"></script>
  <script src="../src/simple-scale.js"></script>
  <script src="../src/ordinal-scale.js"></script>
  <script src="../src/numeric-scale.js"></script>
  <script src="../src/color-scale.js"></script>
  <script src="../src/legend.js"></script>
  <script src="../src/data-series.js"></script>
  <script src="../src/proj.js"></script>
  <script src="../src/map.js"></script>

  <script src="assets/jquery-jvectormap-us-lcc-en.js"></script>
  <script>
    $(function(){
      var map,
          markerIndex = 0,
          markersCoords = {};

      map = new jvm.Map({
          map: 'us_lcc_en',
          markerStyle: {
            initial: {
              fill: 'red'
            }
          },
          container: $('#map'),
          onMarkerTipShow: function(e, tip, code){
            map.tip.text(markersCoords[code].lat.toFixed(2)+' '+markersCoords[code].lng.toFixed(2));
          },
          onMarkerClick: function(e, code){
            map.removeMarkers([code]);
            map.tip.hide();
          }
      });

      $('#map').click(function(e){
          var x = e.pageX - map.container.offset().left,
              y = e.pageY - map.container.offset().top,
              latLng = map.pointToLatLng(x, y),
              targetCls = $(e.target).attr('class');

          if (latLng && (!targetCls || targetCls.indexOf('jvectormap-marker') === -1)) {
            markersCoords[markerIndex] = latLng;
            map.addMarker(markerIndex, {latLng: [latLng.lat, latLng.lng]});
            markerIndex += 1;
          }
      });
      $('#map').bind('');
    });
  </script>
</head>
<body>
  <div id="map" style="width: 900px; height: 600px"></div>
</body>
</html>