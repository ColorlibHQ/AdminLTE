/* global Chart:false */

const ticksStyle = {
  fontColor: '#495057',
  fontStyle: 'bold'
}

const mode = 'index'
const intersect = true

const salesChartSelector = document.querySelector('#sales-chart')
// eslint-disable-next-line no-unused-vars
const salesChart = new Chart(salesChartSelector, {
  type: 'bar',
  data: {
    labels: ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
})

const visitorsChartSelector = document.querySelector('#visitors-chart')
// eslint-disable-next-line no-unused-vars
const visitorsChart = new Chart(visitorsChartSelector, {
  data: {
    labels: ['18th', '20th', '22nd', '24th', '26th', '28th', '30th'],
    datasets: [{
      type: 'line',
      data: [100, 120, 170, 167, 180, 177, 160],
      backgroundColor: 'transparent',
      borderColor: '#007bff',
      pointBorderColor: '#007bff',
      pointBackgroundColor: '#007bff'
      // pointHoverBackgroundColor: '#007bff',
      // pointHoverBorderColor    : '#007bff'
    },
    {
      type: 'line',
      data: [60, 80, 70, 67, 80, 77, 100],
      backgroundColor: 'tansparent',
      borderColor: '#ced4da',
      pointBorderColor: '#ced4da',
      pointBackgroundColor: '#ced4da'
      // pointHoverBackgroundColor: '#ced4da',
      // pointHoverBorderColor    : '#ced4da'
    }]
  },
  options: {
    maintainAspectRatio: false,
    tooltip: {
      mode,
      intersect
    },
    hover: {
      mode,
      intersect
    },
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      yAxes: [{
        // display: false,
        grid: {
          display: true,
          lineWidth: '4px',
          color: 'rgba(0, 0, 0, .2)',
          zeroLineColor: 'transparent'
        },
        ticks: Object.assign({
          beginAtZero: true,
          suggestedMax: 200
        }, ticksStyle)
      }],
      xAxes: [{
        display: true,
        grid: {
          display: false
        },
        ticks: ticksStyle
      }]
    }
  }
})

// lgtm [js/unused-local-variable]
