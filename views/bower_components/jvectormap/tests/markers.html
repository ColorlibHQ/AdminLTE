<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Maps</title>
  <link rel="stylesheet" media="all" href="../jquery-jvectormap.css"/>
  <style>
    ul {
      padding: 0;
      list-style: none;
    }

    .jvectormap-legend .jvectormap-legend-tick-sample {
      height: 26px;
    }

    .jvectormap-legend-icons {
      background: white;
      border: black 1px solid;
    }

    .jvectormap-legend-icons {
      color: black;
    }
  </style>

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

  <script src="assets/jquery-jvectormap-us-aea-en.js"></script>
  <script>
    $(function(){
      var markers = [
            [61.18, -149.53],
            [21.18, -157.49],
            {latLng: [40.66, -73.56], name: 'New York City', style: {r: 8, fill: 'yellow'}},
            {latLng: [41.52, -87.37], style: {fill: 'red', r: 10}},
            {latLng: [35.22, -80.84]},
            {latLng: [31.52, -87.37]}
          ],
          values1 = [408, 512, 550, 781],
          values2 = [1, 2, 3, 4],
          values3 = {
            '4': 'bank',
            '5': 'factory'
          };

      var map = new jvm.Map({
        container: $('.map'),
        map: 'us_aea_en',
        labels: {
          regions: {
            render: function(code){
              var doNotShow = ['US-RI', 'US-DC'];

              if (doNotShow.indexOf(code) === -1) {
                return code.split('-')[1];
              }
            },
            offsets: function(code){
              return {
                'CA': [-10, 10],
                'ID': [0, 40],
                'OK': [25, 0],
                'LA': [-20, 0],
                'FL': [45, 0],
                'KY': [10, 5],
                'VA': [15, 5],
                'MI': [30, 30],
                'AK': [50, -25],
                'HI': [25, 50]
              }[code.split('-')[1]];
            }
          },
          markers: {
            render: function(index){
              return 'Marker '+index;
            }
          }
        },
        markers: markers,
        series: {
          markers: [{
            attribute: 'fill',
            scale: ['#C8EEFF', '#0071A4'],
            normalizeFunction: 'polynomial',
            values: values1,
            legend: {
              vertical: true
            }
          },{
            attribute: 'r',
            scale: [5, 20],
            normalizeFunction: 'polynomial',
            values: values2
          },{
            attribute: 'image',
            scale: {
              bank: 'assets/icon-bank.png',
              factory: 'assets/icon-factory.png'
            },
            values: values3,
            legend: {
              horizontal: true,
              cssClass: 'jvectormap-legend-icons',
              title: 'Business type'
            }
          }],
          regions: [{
            scale: {
              red: '#ff0000',
              green: '#00ff00'
            },
            attribute: 'fill',
            values: {
              "US-KS": 'red',
              "US-MO": 'red',
              "US-IA": 'green',
              "US-NE": 'green'
            },
            legend: {
              horizontal: true,
              title: 'Color'
            }
          },{
            values: {
              "US-NY": 'blue',
              "US-FL": 'blue'
            },
            attribute: 'fill'
          },{
            scale: {
              redGreen: 'assets/bg-red-green.png',
              yellowBlue: 'assets/bg-yellow-blue.png'
            },
            values: {
              "US-TX": 'redGreen',
              "US-CA": 'yellowBlue'
            },
            attribute: 'fill',
            legend: {
              horizontal: true,
              cssClass: 'jvectormap-legend-bg',
              title: 'Pattern',
              labelRender: function(v){
                return {
                  redGreen: 'Low',
                  yellowBlue: 'High'
                }[v];
              }
            }
          }]
        },
        regionsSelectable: true,
        markersSelectable: true,
        markersSelectableOne: true,
        selectedRegions: JSON.parse( window.localStorage.getItem('jvectormap-selected-regions') || '[]' ),
        selectedMarkers: JSON.parse( window.localStorage.getItem('jvectormap-selected-markers') || '[]' ),

        onMarkerTipShow: function(event, tip, index){
          tip.html(tip.html()+' (modified marker)');
        },
        onMarkerOver: function(event, index){
          console.log('marker-over', index);
        },
        onMarkerOut: function(event, index){
          console.log('marker-out', index);
        },
        onMarkerClick: function(event, index){
          console.log('marker-click', index);
        },
        onMarkerSelected: function(event, index, isSelected, selectedMarkers){
          console.log('marker-select', index, isSelected, selectedMarkers);
          if (window.localStorage) {
            window.localStorage.setItem(
              'jvectormap-selected-markers',
              JSON.stringify(selectedMarkers)
            );
          }
        },

        onRegionTipShow: function(event, tip, code){
          tip.html(tip.html()+' (modified)');
        },
        onRegionOver: function(event, code){
          console.log('region-over', code, map.getRegionName(code));
        },
        onRegionOut: function(event, code){
          console.log('region-out', code);
        },
        onRegionClick: function(event, code){
          console.log('region-click', code);
        },
        onRegionSelected: function(event, code, isSelected, selectedRegions){
          console.log('region-select', code, isSelected, selectedRegions);
          if (window.localStorage) {
            window.localStorage.setItem(
              'jvectormap-selected-regions',
              JSON.stringify(selectedRegions)
            );
          }
        },
        onViewportChange: function(e, scale, transX, transY){
            console.log('viewportChange', scale, transX, transY);
        }
      });

      $('.list-markers :checkbox').change(function(){
        var index = $(this).closest('li').attr('data-marker-index');

        if ($(this).prop('checked')) {
          map.addMarker( index, markers[index], [values1[index], values2[index], values3[index]] );
        } else {
          map.removeMarkers( [index] );
        }
      });
      $('.button-add-all').click(function(){
        $('.list-markers :checkbox').prop('checked', true);
        map.addMarkers(markers, [values1, values2, values3]);
      });
      $('.button-remove-all').click(function(){
        $('.list-markers :checkbox').prop('checked', false);
        map.removeAllMarkers();
      });
      $('.button-clear-selected-regions').click(function(){
        map.clearSelectedRegions();
      });
      $('.button-clear-selected-markers').click(function(){
        map.clearSelectedMarkers();
      });
      $('.button-remove-map').click(function(){
        map.remove();
      });
      $('.button-change-values').click(function(){
        map.series.regions[1].clear();
        map.series.regions[1].setValues({
          "US-TX": "black",
          "US-CA": "black"
        });
      });
      $('.button-reset-map').click(function(){
        map.reset();
      });
    });
  </script>
</head>
<body>
  <div class="map" style="width: 800px; height: 500px"></div>
  <ul class="list-markers">
    <li data-marker-index="0"><label><input checked type="checkbox"/> Marker 1</label></li>
    <li data-marker-index="1"><label><input checked type="checkbox"/> Marker 2</label></li>
    <li data-marker-index="2"><label><input checked type="checkbox"/> Marker 3</label></li>
    <li data-marker-index="3"><label><input checked type="checkbox"/> Marker 4</label></li>
    <li data-marker-index="4"><label><input checked type="checkbox"/> Marker 5</label></li>
    <li data-marker-index="5"><label><input checked type="checkbox"/> Marker 6</label></li>
  </ul>
  <input type="button" value="Add all" class="button-add-all"/>
  <input type="button" value="Remove all" class="button-remove-all"/>
  &nbsp;&nbsp;&nbsp;
  <input type="button" value="Clear selected regions" class="button-clear-selected-regions"/>
  <input type="button" value="Clear selected markers" class="button-clear-selected-markers"/>
  &nbsp;&nbsp;&nbsp;
  <input type="button" value="Remove map" class="button-remove-map"/>
  &nbsp;&nbsp;&nbsp;
  <input type="button" value="Change values" class="button-change-values"/>
  &nbsp;&nbsp;&nbsp;
  <input type="button" value="Reset map" class="button-reset-map"/>
</body>
</html>