//Map code start here
var apiPrashantCall = null;
var markers = null;
var infoWindowContent = null;
var cordinatList = {
  indianState: {
    'Delhi': {
      lat: 28.6139,
      long: 77.2090
    },
    'Andhra Pradesh': {
      lat: 15.9129,
      long: 79.7400
    },
    'Bihar': {
      lat: 25.0961,
      long: 85.3131
    },
    'Chhattisgarh': {
      lat: 21.2787,
      long: 81.8661
    },
    'Gujarat': {
      lat: 22.2587,
      long: 71.1924
    },
    'Haryana': {
      lat: 29.0588,
      long: 76.0856
    },
    'Himachal Pradesh': {
      lat: 31.1048,
      long: 77.1734
    },
    'Karnataka': {
      lat: 15.3173,
      long: 75.7139
    },
    'Kerala': {
      lat: 10.8505,
      long: 76.2711
    },
    'Madhya Pradesh': {
      lat: 22.9734,
      long: 78.6569
    },
    'Maharashtra': {
      lat: 19.7515,
      long: 75.7139
    },
    'Odisha': {
      lat: 20.9517,
      long: 85.0985
    },
    'Puducherry': {
      lat: 11.9416,
      long: 79.8083
    },
    'Punjab': {
      lat: 31.1471,
      long: 75.3412
    },
    'Rajasthan': {
      lat: 27.0238,
      long: 74.2179
    },
    'Tamil Nadu': {
      lat: 11.1271,
      long: 78.6569
    },
    'Telangana': {
      lat: 18.1124,
      long: 79.0193
    },
    'Chandigarh': {
      lat: 30.7333,
      long: 76.7794
    },
    'Jammu and Kashmir': {
      lat: 33.7782,
      long: 76.5762
    },
    'Ladakh': {
      lat: 34.152588,
      long: 77.577049
    },
    'Uttar Pradesh': {
      lat: 26.8467,
      long: 80.9462
    },
    'Uttarakhand': {
      lat: 30.0668,
      long: 79.0193
    },
    'West Bengal': {
      lat: 22.9868,
      long: 87.8550
    },
    'Goa': {
      lat: 15.2993,
      long: 74.1240
    },
    'Jharkhand': {
      lat: 23.6102,
      long: 85.2799
    },
    'Manipur': {
      lat: 24.6637,
      long: 93.9063
    },
    'Mizoram': {
      lat: 23.1645,
      long: 92.9376
    },
    'Assam': {
      lat: 26.2006,
      long: 92.9376
    },
    'Nagaland': {
      lat: 26.1584,
      long: 94.5624
    },
    'Tripura': {
      lat: 23.9408,
      long: 91.9882
    },
    'Meghalaya': {
      lat: 25.4670,
      long: 91.3662
    },
    'Sikkim': {
      lat: 27.5330,
      long: 88.5122
    },
    'Arunachal Pradesh': {
      lat: 28.2180,
      long: 94.7278
    }
  }
};

function initMap() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    mapTypeId: 'roadmap'
  };

  // Display a map on the web page
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  map.setTilt(50);

  // Add multiple markers to map
  var infoWindow = new google.maps.InfoWindow(),
    marker, i;

  // Place each marker on the map
  if (markers) {
    for (i = 0; i < markers.length; i++) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0]
      });

      // Add info window to marker
      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
        return function() {
          infoWindow.setContent(infoWindowContent[i][0]);
          infoWindow.open(map, marker);
        }
      })(marker, i));

      // Center the map to fit all markers on the screen
      map.fitBounds(bounds);
    }
  }
  // Set zoom level
  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
    this.setZoom(4.6);
    google.maps.event.removeListener(boundsListener);
  });

}


var apiUrlLatestCases = 'https://api.rootnet.in/covid19-in/stats/latest';
ajaxLatestCases = $.ajax({
  type: "GET",
  url: apiUrlLatestCases,
  dataType: "json",
  success: function(result) {
    //set values in dashboard tiles
    setDashboardStats(result.data.summary);

    //generate and set donut Chart for covi19 cases
    generateDonutChart(result.data.summary);

    //generate and set markers coordinate and marker html for map
    generateMapMarkers(result.data.regional);
  },
  error: function(results) {
    alert("There is an error. " + results.stringfy);
  },
});


var apiUrlDailyStats = 'https://api.rootnet.in/covid19-in/stats/daily';
ajaxDailyStats = $.ajax({
  type: "GET",
  url: apiUrlDailyStats,
  dataType: "json",
  success: function(result) {
    //generate line graph for corona Cases daywise
    generateLineGraph(result.data);
  },
  error: function(results) {
    alert("There is an error. " + results.stringfy);
  },
});

//set values in dashboard tiles
function setDashboardStats(statsSummary) {
  var totalCases= statsSummary.total+statsSummary.discharged + statsSummary.deaths;
  $('#totalCases').html(totalCases);
  $('#totalActive').html(JSON.stringify(statsSummary.total));
  $('#cic').html(JSON.stringify(statsSummary.confirmedCasesIndian));
  $('#cfc').html(JSON.stringify(statsSummary.confirmedCasesForeign));
  $('#discharged').html(JSON.stringify(statsSummary.discharged));
  $('#deaths').html(JSON.stringify(statsSummary.deaths));
  $('#clu').html(JSON.stringify(statsSummary.confirmedButLocationUnidentified));
}

//generate and set markers coordinate and marker html for map
function generateMapMarkers(regionalData) {

  var mapMarkerCoord = [];
  var mapMarkerHtml = [];

  for (key in regionalData) {
    var apiInSateDtl = regionalData[key]
    var apiInSateName = apiInSateDtl.loc;
    var inConfCases = apiInSateDtl.confirmedCasesIndian;
    var frnConfCases = apiInSateDtl.confirmedCasesForeign;
    var dischargedCont = apiInSateDtl.discharged;
    var deathCont = apiInSateDtl.deaths;

    var inStateDtlHardCode = cordinatList.indianState;
    for (inStateName in inStateDtlHardCode) {
      if (inStateName == apiInSateName) {
        var inStateLat = inStateDtlHardCode[inStateName].lat;
        var inStateLong = inStateDtlHardCode[inStateName].long;

        var mapMarkerCoordState = [inStateName, inStateLat, inStateLong];
        mapMarkerCoord.push(mapMarkerCoordState);

        var mapMarkerHtmlState = [
          '<div class="info_content">' +
          '<h6>' + inStateName + '</h6>' +
          '<p>Total Confirmed cases (Indian National)-' + inConfCases +
          '<br>Total Confirmed cases ( Foreign National )' + frnConfCases +
          '<br>Cured/Discharged/Migrated-' + dischargedCont +
          '<br>Death-' + deathCont +
          '</p>' +
          '</div>'
        ];
        mapMarkerHtml.push(mapMarkerHtmlState);
      }
    }
  }
  mapMarkerHtml.length = mapMarkerCoord.length;

  markers = mapMarkerCoord;
  infoWindowContent = mapMarkerHtml;

  // Load initialize gogle map function initMap
  google.maps.event.addDomListener(window, 'load', initMap);
}

//generate and set donut Chart for covi19 cases
function generateDonutChart(statsSummary) {
  var dognutChartValArry = [statsSummary.total, statsSummary.discharged, statsSummary.deaths];

  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Total Active Cases', 'Total Cured', 'Total Deaths'],
      datasets: [{
        label: 'Cases 2019-nCoV',
        data: dognutChartValArry,
        backgroundColor: [
          'rgba(255, 99, 132, 2)',
          'rgba(144,238,144, 2)',
          'rgba(105,105,105, 2)'

        ],
        borderColor: [
          'rgba(255,99,132,5)',
          'rgba(144,238,144, 5)',
          'rgba(105,105,105, 5)'

        ],
        borderWidth: 2
      }]
    },
    options: {
      //cutoutPercentage: 40,
      responsive: true,

    }
  });
}

//generate line graph for corona Cases daywise
function generateLineGraph(dailyStats) {
  var dateLable = [];
  var casesLable = [];
  for (dayIndex in dailyStats) {
    var dayStats = dailyStats[dayIndex];
    dateLable.push(dayStats.day);
    casesLable.push(dayStats.summary.total);
  }
  casesLable.length = dateLable.length;

  var ctx = document.getElementById("lineChart").getContext("2d");
  var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dateLable,

      datasets: [{
        label: "Tota Cases Reached",
        data: casesLable,
        backgroundColor: ['rgba(0, 0, 0, 0.1)'],
        borderColor: ['rgba(255,99,132,5)'],
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      //cutoutPercentage: 40,
      responsive: true,
      xAxisID: "dd"

    }
  });
}
