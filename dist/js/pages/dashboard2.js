$(function () {

  'use strict'

  /* ChartJS
   * -------
   * Here we will create a few charts using ChartJS
   */

  //-----------------------
  //- MONTHLY SALES CHART -
  //-----------------------

  // Get context with jQuery - using jQuery's .get() method.
  var salesChartCanvas = $('#salesChart').get(0).getContext('2d')

  var salesChartData = {
    labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label               : 'Digital Goods',
        backgroundColor     : 'rgba(60,141,188,0.9)',
        borderColor         : 'rgba(60,141,188,0.8)',
        pointRadius          : false,
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label               : 'Electronics',
        backgroundColor     : 'rgba(210, 214, 222, 1)',
        borderColor         : 'rgba(210, 214, 222, 1)',
        pointRadius         : false,
        pointColor          : 'rgba(210, 214, 222, 1)',
        pointStrokeColor    : '#c1c7d1',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data                : [65, 59, 80, 81, 56, 55, 40]
      },
    ]
  }

  var salesChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines : {
          display : false,
        }
      }],
      yAxes: [{
        gridLines : {
          display : false,
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  var salesChart = new Chart(salesChartCanvas, { 
      type: 'line', 
      data: salesChartData, 
      options: salesChartOptions
    }
  )

  //---------------------------
  //- END MONTHLY SALES CHART -
  //---------------------------

  //-------------
  //- PIE CHART -
  //-------------
  // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
    var pieData        = {
      labels: [
          'Chrome', 
          'IE',
          'FireFox', 
          'Safari', 
          'Opera', 
          'Navigator', 
      ],
      datasets: [
        {
          data: [700,500,400,600,300,100],
          backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
        }
      ]
    }
    var pieOptions     = {
      legend: {
        display: false
      }
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    var pieChart = new Chart(pieChartCanvas, {
      type: 'doughnut',
      data: pieData,
      options: pieOptions      
    })

  //-----------------
  //- END PIE CHART -
  //-----------------

  /* jVector Maps
   * ------------
   * Create a world map with markers
   */
  $('#world-map-markers').mapael({
      map: {
        name : "world_countries",
        zoom: {
          enabled: true,
          maxLevel: 10
        },
        defaultPlot: {
          size: 12,
          attrs: {
            "stroke-width": 0,
            "stroke-linejoin": "round"
          },
          attrsHover: {
            size: 15,
            "fill": '#28a745',
            "stroke-width": 0,
            animDuration: 0
          },
        }
      },
      plots: {
        "marker1": {
          latitude: 41.90,
          longitude: 12.45,
          href: '#',
          tooltip: {
            content: 'Vatican City'
          }
        },
        "marker2": {
          latitude: 43.73,
          longitude: 7.41,
          href: '#',
          tooltip: {
            content: 'Monaco'
          }
        },
        "marker3": {
          latitude: -0.52,
          longitude: 166.93,
          href: '#',
          tooltip: {
            content: 'Nauru'
          }
        },
        "marker4": {
          latitude: -8.51,
          longitude: 179.21,
          href: '#',
          tooltip: {
            content: 'Tuvalu'
          }
        },
        "marker5": {
          latitude: 43.93,
          longitude: 12.46,
          href: '#',
          tooltip: {
            content: 'San Marino'
          }
        },
        "marker6": {
          latitude: 47.14,
          longitude: 9.52,
          href: '#',
          tooltip: {
            content: 'Liechtenstein'
          }
        },
        "marker7": {
          latitude: 7.11,
          longitude: 171.06,
          href: '#',
          tooltip: {
            content: 'Marshall Islands'
          }
        },
        "marker8": {
          latitude: 17.3,
          longitude: -62.73,
          href: '#',
          tooltip: {
            content: 'Saint Kitts and Nevis'
          }
        },
        "marker9": {
          latitude: 3.2,
          longitude: 73.22,
          href: '#',
          tooltip: {
            content: 'Maldives'
          }
        },
        "marker10": {
          latitude: 35.88,
          longitude: 14.5,
          href: '#',
          tooltip: {
            content: 'Malta'
          }
        },
        "marker11": {
          latitude: 12.05,
          longitude: -61.75,
          href: '#',
          tooltip: {
            content: 'Grenada'
          }
        },
        "marker12": {
          latitude: 13.16,
          longitude: -61.23,
          href: '#',
          tooltip: {
            content: 'Saint Vincent and the Grenadines'
          }
        },
        "marker13": {
          latitude: 13.16,
          longitude: -59.55,
          href: '#',
          tooltip: {
            content: 'Barbados'
          }
        },
        "marker14": {
          latitude: 17.11,
          longitude: -61.85,
          href: '#',
          tooltip: {
            content: 'Antigua and Barbuda'
          }
        },
        "marker15": {
          latitude: -4.61,
          longitude: 55.45,
          href: '#',
          tooltip: {
            content: 'Seychelles'
          }
        },
        "marker16": {
          latitude: 7.35,
          longitude: 134.46,
          href: '#',
          tooltip: {
            content: 'Palau'
          }
        },
        "marker17": {
          latitude: 42.5,
          longitude: 1.51,
          href: '#',
          tooltip: {
            content: 'Andorra'
          }
        },
        "marker18": {
          latitude: 14.01,
          longitude: -60.98,
          href: '#',
          tooltip: {
            content: 'Saint Lucia'
          }
        },
        "marker19": {
          latitude: 6.91,
          longitude: 158.18,
          href: '#',
          tooltip: {
            content: 'Federated States of Micronesia'
          }
        },
        "marker20": {
          latitude: 1.3,
          longitude: 103.8,
          href: '#',
          tooltip: {
            content: 'Singapore'
          }
        },
        "marker21": {
          latitude: 1.46,
          longitude: 173.03,
          href: '#',
          tooltip: {
            content: 'Kiribati'
          }
        },
        "marker22": {
          latitude: -21.13,
          longitude: -175.2,
          href: '#',
          tooltip: {
            content: 'Tonga'
          }
        },
        "marker23": {
          latitude: 15.3,
          longitude: -61.38,
          href: '#',
          tooltip: {
            content: 'Dominica'
          }
        },
        "marker24": {
          latitude: -20.2,
          longitude: 57.5,
          href: '#',
          tooltip: {
            content: 'Mauritius'
          }
        },
        "marker25": {
          latitude: 26.02,
          longitude: 50.55,
          href: '#',
          tooltip: {
            content: 'Bahrain'
          }
        },
        "marker26": {
          latitude: 0.33,
          longitude: 6.73,
          href: '#',
          tooltip: {
            content: 'São Tomé and Príncipe'
          }
        }
      }
    }
  );

  // $('#world-map-markers').vectorMap({
  //   map              : 'world_en',
  //   normalizeFunction: 'polynomial',
  //   hoverOpacity     : 0.7,
  //   hoverColor       : false,
  //   backgroundColor  : 'transparent',
  //   regionStyle      : {
  //     initial      : {
  //       fill            : 'rgba(210, 214, 222, 1)',
  //       'fill-opacity'  : 1,
  //       stroke          : 'none',
  //       'stroke-width'  : 0,
  //       'stroke-opacity': 1
  //     },
  //     hover        : {
  //       'fill-opacity': 0.7,
  //       cursor        : 'pointer'
  //     },
  //     selected     : {
  //       fill: 'yellow'
  //     },
  //     selectedHover: {}
  //   },
  //   markerStyle      : {
  //     initial: {
  //       fill  : '#00a65a',
  //       stroke: '#111'
  //     }
  //   },
  //   markers          : [
  //     {
  //       latLng: [41.90, 12.45],
  //       name  : 'Vatican City'
  //     },
  //     {
  //       latLng: [43.73, 7.41],
  //       name  : 'Monaco'
  //     },
  //     {
  //       latLng: [-0.52, 166.93],
  //       name  : 'Nauru'
  //     },
  //     {
  //       latLng: [-8.51, 179.21],
  //       name  : 'Tuvalu'
  //     },
  //     {
  //       latLng: [43.93, 12.46],
  //       name  : 'San Marino'
  //     },
  //     {
  //       latLng: [47.14, 9.52],
  //       name  : 'Liechtenstein'
  //     },
  //     {
  //       latLng: [7.11, 171.06],
  //       name  : 'Marshall Islands'
  //     },
  //     {
  //       latLng: [17.3, -62.73],
  //       name  : 'Saint Kitts and Nevis'
  //     },
  //     {
  //       latLng: [3.2, 73.22],
  //       name  : 'Maldives'
  //     },
  //     {
  //       latLng: [35.88, 14.5],
  //       name  : 'Malta'
  //     },
  //     {
  //       latLng: [12.05, -61.75],
  //       name  : 'Grenada'
  //     },
  //     {
  //       latLng: [13.16, -61.23],
  //       name  : 'Saint Vincent and the Grenadines'
  //     },
  //     {
  //       latLng: [13.16, -59.55],
  //       name  : 'Barbados'
  //     },
  //     {
  //       latLng: [17.11, -61.85],
  //       name  : 'Antigua and Barbuda'
  //     },
  //     {
  //       latLng: [-4.61, 55.45],
  //       name  : 'Seychelles'
  //     },
  //     {
  //       latLng: [7.35, 134.46],
  //       name  : 'Palau'
  //     },
  //     {
  //       latLng: [42.5, 1.51],
  //       name  : 'Andorra'
  //     },
  //     {
  //       latLng: [14.01, -60.98],
  //       name  : 'Saint Lucia'
  //     },
  //     {
  //       latLng: [6.91, 158.18],
  //       name  : 'Federated States of Micronesia'
  //     },
  //     {
  //       latLng: [1.3, 103.8],
  //       name  : 'Singapore'
  //     },
  //     {
  //       latLng: [1.46, 173.03],
  //       name  : 'Kiribati'
  //     },
  //     {
  //       latLng: [-21.13, -175.2],
  //       name  : 'Tonga'
  //     },
  //     {
  //       latLng: [15.3, -61.38],
  //       name  : 'Dominica'
  //     },
  //     {
  //       latLng: [-20.2, 57.5],
  //       name  : 'Mauritius'
  //     },
  //     {
  //       latLng: [26.02, 50.55],
  //       name  : 'Bahrain'
  //     },
  //     {
  //       latLng: [0.33, 6.73],
  //       name  : 'São Tomé and Príncipe'
  //     }
  //   ]
  // })

})
