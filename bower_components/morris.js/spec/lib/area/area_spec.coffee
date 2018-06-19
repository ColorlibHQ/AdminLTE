describe 'Morris.Area', ->

  describe 'svg structure', ->
    defaults =
      element: 'graph'
      data: [{x: '2012 Q1', y: 1}, {x: '2012 Q2', y: 1}]
      lineColors: [ '#0b62a4', '#7a92a3']
      gridLineColor: '#aaa'
      xkey: 'x'
      ykeys: ['y']
      labels: ['Y']

    it 'should contain a line path for each line', ->
      chart = Morris.Area $.extend {}, defaults
      $('#graph').find("path[stroke='#0b62a4']").size().should.equal 1

    it 'should contain a path with stroke-width 0 for each line', ->
      chart = Morris.Area $.extend {}, defaults
      $('#graph').find("path[stroke='#0b62a4']").size().should.equal 1

    it 'should contain 5 grid lines', ->
      chart = Morris.Area $.extend {}, defaults
      $('#graph').find("path[stroke='#aaaaaa']").size().should.equal 5

    it 'should contain 9 text elements', ->
      chart = Morris.Area $.extend {}, defaults
      $('#graph').find("text").size().should.equal 9

  describe 'svg attributes', ->
    defaults =
      element: 'graph'
      data: [{x: '2012 Q1', y: 1}, {x: '2012 Q2', y: 1}]
      xkey: 'x'
      ykeys: ['y']
      labels: ['Y']
      lineColors: [ '#0b62a4', '#7a92a3']
      lineWidth: 3
      pointWidths: [5]
      pointStrokeColors: ['#ffffff']
      gridLineColor: '#aaa'
      gridStrokeWidth: 0.5
      gridTextColor: '#888'
      gridTextSize: 12

    it 'should not be cumulative if behaveLikeLine', ->
      chart = Morris.Area $.extend {}, defaults, behaveLikeLine: true
      chart.cumulative.should.equal false

    it 'should have a line with transparent fill if behaveLikeLine', ->
      chart = Morris.Area $.extend {}, defaults, behaveLikeLine: true
      $('#graph').find("path[fill-opacity='0.8']").size().should.equal 1

    it 'should not have a line with transparent fill', ->
      chart = Morris.Area $.extend {}, defaults
      $('#graph').find("path[fill-opacity='0.8']").size().should.equal 0

    it 'should have a line with the fill of a modified line color', ->
      chart = Morris.Area $.extend {}, defaults
      $('#graph').find("path[fill='#0b62a4']").size().should.equal 0
      $('#graph').find("path[fill='#7a92a3']").size().should.equal 0
