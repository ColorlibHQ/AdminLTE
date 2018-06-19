describe 'Morris.Bar', ->
  describe 'when using vertical grid', ->
    defaults =
      element: 'graph'
      data: [{x: 'foo', y: 2, z: 3}, {x: 'bar', y: 4, z: 6}]
      xkey: 'x'
      ykeys: ['y', 'z']
      labels: ['Y', 'Z']
      barColors: [ '#0b62a4', '#7a92a3']
      gridLineColor: '#aaa'
      gridStrokeWidth: 0.5
      gridTextColor: '#888'
      gridTextSize: 12
      verticalGridCondition: (index) -> index % 2
      verticalGridColor: '#888888'
      verticalGridOpacity: '0.2'

    describe 'svg structure', ->
      it 'should contain extra rectangles for vertical grid', ->
        $('#graph').css('height', '250px').css('width', '800px')
        chart = Morris.Bar $.extend {}, defaults
        $('#graph').find("rect").size().should.equal 6

    describe 'svg attributes', ->
      it 'should have to bars with verticalGrid.color', ->
        chart = Morris.Bar $.extend {}, defaults
        $('#graph').find("rect[fill='#{defaults.verticalGridColor}']").size().should.equal 2
      it 'should have to bars with verticalGrid.color', ->
        chart = Morris.Bar $.extend {}, defaults
        $('#graph').find("rect[fill-opacity='#{defaults.verticalGridOpacity}']").size().should.equal 2

  describe 'svg structure', ->
    defaults =
      element: 'graph'
      data: [{x: 'foo', y: 2, z: 3}, {x: 'bar', y: 4, z: 6}]
      xkey: 'x'
      ykeys: ['y', 'z']
      labels: ['Y', 'Z']

    it 'should contain a rect for each bar', ->
      chart = Morris.Bar $.extend {}, defaults
      $('#graph').find("rect").size().should.equal 4

    it 'should contain 5 grid lines', ->
      chart = Morris.Bar $.extend {}, defaults
      $('#graph').find("path").size().should.equal 5

    it 'should contain 7 text elements', ->
      chart = Morris.Bar $.extend {}, defaults
      $('#graph').find("text").size().should.equal 7

  describe 'svg attributes', ->
    defaults =
      element: 'graph'
      data: [{x: 'foo', y: 2, z: 3}, {x: 'bar', y: 4, z: 6}]
      xkey: 'x'
      ykeys: ['y', 'z']
      labels: ['Y', 'Z']
      barColors: [ '#0b62a4', '#7a92a3']
      gridLineColor: '#aaa'
      gridStrokeWidth: 0.5
      gridTextColor: '#888'
      gridTextSize: 12

    it 'should have a bar with the first default color', ->
      chart = Morris.Bar $.extend {}, defaults
      $('#graph').find("rect[fill='#0b62a4']").size().should.equal 2

    it 'should have a bar with no stroke', ->
      chart = Morris.Bar $.extend {}, defaults
      $('#graph').find("rect[stroke='none']").size().should.equal 4

    it 'should have text with configured fill color', ->
      chart = Morris.Bar $.extend {}, defaults
      $('#graph').find("text[fill='#888888']").size().should.equal 7

    it 'should have text with configured font size', ->
      chart = Morris.Bar $.extend {}, defaults
      $('#graph').find("text[font-size='12px']").size().should.equal 7

  describe 'when setting bar radius', ->
    describe 'svg structure', ->
      defaults =
        element: 'graph'
        data: [{x: 'foo', y: 2, z: 3}, {x: 'bar', y: 4, z: 6}]
        xkey: 'x'
        ykeys: ['y', 'z']
        labels: ['Y', 'Z']
        barRadius: [5, 5, 0, 0]

      it 'should contain a path for each bar', ->
        chart = Morris.Bar $.extend {}, defaults
        $('#graph').find("path").size().should.equal 9

      it 'should use rects if radius is too big', ->
        delete defaults.barStyle
        chart = Morris.Bar $.extend {}, defaults,
            barRadius: [300, 300, 0, 0]
        $('#graph').find("rect").size().should.equal 4

  describe 'barSize option', ->
    describe 'svg attributes', ->
      defaults =
        element: 'graph'
        barSize: 20
        data: [
          {x: '2011 Q1', y: 3, z: 2, a: 3}
          {x: '2011 Q2', y: 2, z: null, a: 1}
          {x: '2011 Q3', y: 0, z: 2, a: 4}
          {x: '2011 Q4', y: 2, z: 4, a: 3}
        ],
        xkey: 'x'
        ykeys: ['y', 'z', 'a']
        labels: ['Y', 'Z', 'A']

      it 'should calc the width if too narrow for barSize', ->
        $('#graph').width('200px')
        chart = Morris.Bar $.extend {}, defaults
        $('#graph').find("rect").filter((i) ->
          parseFloat($(@).attr('width'), 10) < 10
        ).size().should.equal 11

      it 'should set width to @options.barSize if possible', ->
        chart = Morris.Bar $.extend {}, defaults
        $('#graph').find("rect[width='#{defaults.barSize}']").size().should.equal 11


