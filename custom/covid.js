//Map code start here
var apiPrashantCall = null;
var mapFinalMarkerCoords = null;
var infoWindowContent = null;
var cordinatList = {
  indianState: {
    'Andaman and Nicobar Islands':{
      lat: 11.7401,
      long: 92.6586
    },
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
  var indiaCenter = new google.maps.LatLng(20.5937, 78.9629);
  var indiaBorderBounds={
        north: 40,
        south: 7,
        west: 68.7,
        east: 97.25,
      };
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    mapTypeId: 'roadmap',
    zoom: 0,
    position: markerPosition,
    restriction: {
            latLngBounds: indiaBorderBounds,
            strictBounds: false,
          },
    streetViewControl: false,
    mapTypeControl: false,
    //draggable: false,
    scrollwheel: false,
    //backgroundColor: '#FFF',
    disableDefaultUI: true,
    zoomControl: true,
    scaleControl: false,
    fullscreenControl: true,
    //mapTypeId:google.maps.MapTypeId.ROADMAP
    styles: [{
        "featureType": "administrative.country",
        "stylers": [{
          "weight": 1
        }]
      },
      {
        "featureType": "administrative.locality",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.province",
        "stylers": [{
          "weight": 1.5
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      }
    ]
  };

  // Display a map on the web page
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  map.setTilt(50);

  // Add multiple markers to map
  var infoWindow = new google.maps.InfoWindow(), marker, i;

 // var userGeoMarkerImage = {
   // url: "dist/img/geolocationWithBase.svg",
    //scaledSize: new google.maps.Size(35, 35)
 // }

    // Try HTML5 user geolocation.
   // if (navigator.geolocation) {
     // navigator.geolocation.getCurrentPosition(function(position) {
       // var userGeoLocation = {
         // lat: position.coords.latitude,
         // lng: position.coords.longitude
       // };

       // infoWindow.setPosition(userGeoLocation);
       // infoWindow.setContent('Your Location');
       // infoWindow.open(map);
      // map.setCenter(pos);

       // userGeoMarker = new google.maps.Marker({
         // position: userGeoLocation,
         // map: map,
         // optimized: false,
         // icon: userGeoMarkerImage,
         // title: 'Your Location'
       // });

       //Add info window to user geo location
       // google.maps.event.addListener(userGeoMarker, 'mouseover', (function() {
           // infoWindow.setContent('Your Location');
           // infoWindow.open(map);
       // }));

     // }, function() {
       // handleLocationError(true, infoWindow, map.getCenter());
     // });
   // } else {
     //Browser doesn't support Geolocation
     // handleLocationError(false, infoWindow, map.getCenter());
   // }

  var markerImage = {
    url: "dist/img/marker.svg",
    scaledSize: new google.maps.Size(35, 35)
  }
  // Place each marker on the map
  if (mapFinalMarkerCoords) {
    for (i = 0; i < mapFinalMarkerCoords.length; i++) {
      var markerPosition = new google.maps.LatLng(mapFinalMarkerCoords[i][1], mapFinalMarkerCoords[i][2]);
      bounds.extend(markerPosition);
      marker = new google.maps.Marker({
        position: markerPosition,
        map: map,
        optimized: false,
        icon: markerImage,
        title: mapFinalMarkerCoords[i][0]

      });

      // Add info window to marker
      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
        return function() {
          infoWindow.setContent(infoWindowContent[i][0]);
          infoWindow.open(map, marker);
        }
      })(marker, i));

	   google.maps.event.addListener(marker, 'click', (function(marker, i) {
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

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //infoWindow.setPosition(pos);
  //infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
  //infoWindow.open(map);
}

var coronaCasesSummary=null;

var apiUrlLatestCases = 'https://api.rootnet.in/covid19-in/stats/latest';
var ajaxLatestCases = $.ajax({
  type: "GET",
  url: apiUrlLatestCases,
  dataType: "json",
  success: function(result) {
    coronaCasesSummary=result.data.summary;

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

    $.when(ajaxLatestCases).then(function(){
        generateLineDblGraph(coronaCasesSummary, result.data);
    });

  },
  error: function(results) {
    alert("There is an error. " + results.stringfy);
  },
});

//set values in dashboard tiles
function setDashboardStats(statsSummary) {
  var totalActive = statsSummary.total - statsSummary.discharged - statsSummary.deaths;

  $('#totalCases').html(JSON.stringify(statsSummary.total));
  $('#totalActive').html(totalActive);
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
          '<p><span class="badge badge-secondary">Total Indian cases </span><span class="badge badge-dark float-right ml-5">' + inConfCases + '</span>' +
          '<br><span class="badge badge-warning">Total Foreign cases </span><span class="badge badge-dark float-right ml-5">' + frnConfCases + '</span>' +
          '<br><span class="badge badge-success">Total Cured </span><span class="badge badge-dark float-right ml-5">' + dischargedCont + '</span>' +
          '<br><span class="badge badge-danger">Deaths </span><span class="badge badge-dark float-right ml-5">' + deathCont + '</span>' +
          '</p>' +
          '</div>'
        ];
        mapMarkerHtml.push(mapMarkerHtmlState);
      }
    }
  }
  mapMarkerHtml.length = mapMarkerCoord.length;

  mapFinalMarkerCoords = mapMarkerCoord;
  infoWindowContent = mapMarkerHtml;

  // Load initialize gogle map function initMap
  if(typeof google !== 'undefined')
  google.maps.event.addDomListener(window, 'load', initMap);
}

var randomColorGenerator = function () {
    return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
};

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
         // randomColorGenerator(),
        //randomColorGenerator(),
          //randomColorGenerator()
		   'rgba(255,99,132,1)',
           'rgba(144,238,144,1)',
           'rgba(105,105,105, 1)'

        ],
         borderColor: [
          'rgba(0,0,0,5)',
		  'rgba(0,0,0,5)',
		  'rgba(0,0,0,5)'
        //   'rgba(144,238,144, 5)',
        //   'rgba(105,105,105, 5)'
        //
         ],
        borderWidth: 1
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
  var totalCasesData = [];
  var totalActiveCasesData = [];
  var dailyCaseCountData = [];

var i=0;
  for (dayIndex in dailyStats) {
    var dayStats = dailyStats[dayIndex];
    dateLable.push(dayStats.day);
    totalCasesData.push(dayStats.summary.total);
    totalActiveCasesData.push(dayStats.summary.total - dayStats.summary.deaths - dayStats.summary.discharged);
    var dayCaseCount = totalCasesData[i]-totalCasesData[i-1];
    dayCaseCount = dayCaseCount<0?0:dayCaseCount;
    dailyCaseCountData.push(dayCaseCount);
    i++;
  }
  totalCasesData.length = dateLable.length;

  var ctx = document.getElementById("lineChart").getContext("2d");
  var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dateLable,
      datasets: [{
        label: "Total Cases Reached",
        data: totalCasesData,
        backgroundColor: ['rgba(0, 0, 0, 0.1)'],
        borderColor: randomColorGenerator(),
        borderWidth: 2,
        fill: false
      },
      {
        label: "Total Active Cases Reached",
        data: totalActiveCasesData,
        backgroundColor: ['rgba(0, 0, 0, 0.1)'],
        borderColor: randomColorGenerator(),
        borderWidth: 2,
        fill: false
      },
      {
        label: "Daily Increase Count",
        data: dailyCaseCountData,
        backgroundColor: ['rgba(0, 0, 0, 0.1)'],
        borderColor: randomColorGenerator(),
        borderWidth: 2,
        fill: false
      }
    ]
    },
    options: {
      //cutoutPercentage: 40,
      responsive: true,
      xAxisID: "dd"

    }
  });
}


//generate bar graph for doubling corona Cases daywise
function generateLineDblGraph(statsSummary, dailyStats) {

var dublingCasesDateArr =[];
var dublingCasesDayCountArr =[];
var dublingCasesValArr =[];

var totalCaseCount =statsSummary.total
var ttcase= totalCaseCount;
var expectedDublingArr=[totalCaseCount];

  while(ttcase != 0 && ttcase > 0){
    var halfOfTtlCase = parseInt(ttcase/2);
    expectedDublingArr.unshift(halfOfTtlCase);
    ttcase = halfOfTtlCase;
    //expectedDublingArr.push(expectedDublingArr);
  }

    dublingCasesDateArr.push(dailyStats[dailyStats.length-1].day);
    dublingCasesValArr.push(dailyStats[dailyStats.length-1].summary.total);
    var dayIndex = dailyStats.length-1;

    for(var k=expectedDublingArr.length-2; k>0; k--){
          var tempDate=null;
          var tempVal=null;
          if(dayIndex==0)
          break;
          var dayStats = dailyStats[dayIndex];
          while(expectedDublingArr[k]<dayStats.summary.total && (expectedDublingArr[k+1]>dayStats.summary.total || expectedDublingArr[k+1]==dayStats.summary.total))
          {
            tempDate=dayStats.day;
            tempVal=dayStats.summary.total;

            if(dayIndex==0)
            break;

            dayIndex--;
            dayStats = dailyStats[dayIndex];
          }
          dublingCasesDateArr.unshift(tempDate);
          dublingCasesValArr.unshift(tempVal);
        }


//dublingCasesDayCountArr.push(0);
dublingCasesDayCountArr.push((moment(dublingCasesDateArr[0]) - moment(dailyStats[0].day))/1000/60/60/24);

for(y=1; y<dublingCasesDateArr.length; y++){
  var dayDiff = moment(dublingCasesDateArr[y]) - moment(dublingCasesDateArr[y-1]);
  dublingCasesDayCountArr.push(dayDiff/1000/60/60/24);
}
//expectedDublingArr.length = dublingCasesDateArr.length;

console.log(expectedDublingArr);
console.log(dublingCasesValArr);
console.log(dublingCasesDateArr);

  var ctx = document.getElementById("lineChart2").getContext("2d");
  var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dublingCasesValArr ,
      datasets: [{
        label: "Total Cases Almost Doubled In",
        data: dublingCasesDayCountArr,
        backgroundColor: ['rgba(0, 0, 0, 0.1)'],
        borderColor: randomColorGenerator(),
        borderWidth: 2,
        fill: false
      }
    ]
    },
    options: {
      //cutoutPercentage: 40,
      responsive: true,
      xAxisID: "dd"

    }
  });
}
