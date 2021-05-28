/* eslint-disable no-undef */
/* ChartJS
  * -------
  * Here we will create a few charts using ChartJS
  */

//-----------------------
// - MONTHLY SALES CHART -
//-----------------------

// Get context with querySelector - using Chart.js .getContext('2d') method.
const salesChartCanvas = document.querySelector('#salesChart').getContext('2d')

const salesChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Digital Goods',
      backgroundColor: 'rgba(60,141,188,0.9)',
      borderColor: 'rgba(60,141,188,0.8)',
      fill: true,
      pointRadius: 0,
      pointColor: '#3b8bba',
      pointStrokeColor: 'rgba(60,141,188,1)',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(60,141,188,1)',
      data: [28, 48, 40, 19, 86, 27, 90]
    },
    {
      label: 'Electronics',
      backgroundColor: 'rgba(210, 214, 222, 1)',
      borderColor: 'rgba(210, 214, 222, 1)',
      fill: true,
      pointRadius: 0,
      pointColor: 'rgba(210, 214, 222, 1)',
      pointStrokeColor: '#c1c7d1',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
}

const salesChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  tension: 0.4,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    xAxes: [{
      grid: {
        display: false
      }
    }],
    yAxes: [{
      grid: {
        display: false
      }
    }]
  }
}

// This will get the first returned node in the jQuery collection.
// eslint-disable-next-line no-unused-vars
const salesChart = new Chart(salesChartCanvas, {
  type: 'line',
  data: salesChartData,
  options: salesChartOptions
})

//---------------------------
// - END MONTHLY SALES CHART -
//---------------------------

//-------------
// - PIE CHART -
//-------------

// Get context with querySelector - using Chart.js .getContext('2d') method.
const pieChartCanvas = document.querySelector('#pieChart').getContext('2d')

const pieData = {
  labels: [
    'Chrome',
    'IE',
    'FireFox',
    'Safari',
    'Opera',
    'Navigator'
  ],
  datasets: [
    {
      data: [700, 500, 400, 600, 300, 100],
      backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de']
    }
  ]
}
const pieOptions = {
  plugins: {
    legend: {
      display: false
    }
  }
}
// Create pie or douhnut chart
// You can switch between pie and douhnut using the method below.
// eslint-disable-next-line no-unused-vars
const pieChart = new Chart(pieChartCanvas, {
  type: 'doughnut',
  data: pieData,
  options: pieOptions
})

//-----------------
// - END PIE CHART -
//-----------------
