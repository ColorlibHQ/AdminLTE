describe 'Morris.Grid#setData', ->

  it 'should not alter user-supplied data', ->
    my_data = [{x: 1, y: 1}, {x: 2, y: 2}]
    expected_data = [{x: 1, y: 1}, {x: 2, y: 2}]
    Morris.Line
      element: 'graph'
      data: my_data
      xkey: 'x'
      ykeys: ['y']
      labels: ['dontcare']
    my_data.should.deep.equal expected_data

  describe 'ymin/ymax', ->
    beforeEach ->
      @defaults =
        element: 'graph'
        xkey: 'x'
        ykeys: ['y', 'z']
        labels: ['y', 'z']

    it 'should use a user-specified minimum and maximum value', ->
      line = Morris.Line $.extend @defaults,
        data: [{x: 1, y: 1}]
        ymin: 10
        ymax: 20
      line.ymin.should.equal 10
      line.ymax.should.equal 20

    describe 'auto', ->

      it 'should automatically calculate the minimum and maximum value', ->
        line = Morris.Line $.extend @defaults,
          data: [{x: 1, y: 10}, {x: 2, y: 15}, {x: 3, y: null}, {x: 4}]
          ymin: 'auto'
          ymax: 'auto'
        line.ymin.should.equal 10
        line.ymax.should.equal 15

      it 'should automatically calculate the minimum and maximum value given no y data', ->
        line = Morris.Line $.extend @defaults,
          data: [{x: 1}, {x: 2}, {x: 3}, {x: 4}]
          ymin: 'auto'
          ymax: 'auto'
        line.ymin.should.equal 0
        line.ymax.should.equal 1

    describe 'auto [n]', ->

      it 'should automatically calculate the minimum and maximum value', ->
        line = Morris.Line $.extend @defaults,
          data: [{x: 1, y: 10}, {x: 2, y: 15}, {x: 3, y: null}, {x: 4}]
          ymin: 'auto 11'
          ymax: 'auto 13'
        line.ymin.should.equal 10
        line.ymax.should.equal 15

      it 'should automatically calculate the minimum and maximum value given no data', ->
        line = Morris.Line $.extend @defaults,
          data: [{x: 1}, {x: 2}, {x: 3}, {x: 4}]
          ymin: 'auto 11'
          ymax: 'auto 13'
        line.ymin.should.equal 11
        line.ymax.should.equal 13

      it 'should use a user-specified minimum and maximum value', ->
        line = Morris.Line $.extend @defaults,
          data: [{x: 1, y: 10}, {x: 2, y: 15}, {x: 3, y: null}, {x: 4}]
          ymin: 'auto 5'
          ymax: 'auto 20'
        line.ymin.should.equal 5
        line.ymax.should.equal 20

      it 'should use a user-specified minimum and maximum value given no data', ->
        line = Morris.Line $.extend @defaults,
          data: [{x: 1}, {x: 2}, {x: 3}, {x: 4}]
          ymin: 'auto 5'
          ymax: 'auto 20'
        line.ymin.should.equal 5
        line.ymax.should.equal 20

  describe 'xmin/xmax', ->

    it 'should calculate the horizontal range', ->
      line = Morris.Line
        element: 'graph'
        data: [{x: 2, y: 2}, {x: 1, y: 1}, {x: 4, y: 4}, {x: 3, y: 3}]
        xkey: 'x'
        ykeys: ['y']
        labels: ['y']
      line.xmin.should == 1
      line.xmax.should == 4

    it "should pad the range if there's only one data point", ->
      line = Morris.Line
        element: 'graph'
        data: [{x: 2, y: 2}]
        xkey: 'x'
        ykeys: ['y']
        labels: ['y']
      line.xmin.should == 1
      line.xmax.should == 3

  describe 'sorting', ->

    it 'should sort data when parseTime is true', ->
      line = Morris.Line
        element: 'graph'
        data: [
          {x: '2012 Q1', y: 2},
          {x: '2012 Q3', y: 1},
          {x: '2012 Q4', y: 4},
          {x: '2012 Q2', y: 3}]
        xkey: 'x'
        ykeys: ['y']
        labels: ['y']
      line.data.map((row) -> row.label).should.deep.equal ['2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4']

    it 'should not sort data when parseTime is false', ->
      line = Morris.Line
        element: 'graph'
        data: [{x: 1, y: 2}, {x: 4, y: 1}, {x: 3, y: 4}, {x: 2, y: 3}]
        xkey: 'x'
        ykeys: ['y']
        labels: ['y']
        parseTime: false
      line.data.map((row) -> row.label).should.deep.equal [1, 4, 3, 2]

  describe 'timestamp data', ->

    it 'should generate default labels for timestamp x-values', ->
      d = [
        new Date 2012, 0, 1
        new Date 2012, 0, 2
        new Date 2012, 0, 3
        new Date 2012, 0, 4
      ]
      line = Morris.Line
        element: 'graph'
        data: [
          {x: d[0].getTime(), y: 2},
          {x: d[1].getTime(), y: 1},
          {x: d[2].getTime(), y: 4},
          {x: d[3].getTime(), y: 3}]
        xkey: 'x'
        ykeys: ['y']
        labels: ['y']
      line.data.map((row) -> row.label).should.deep.equal d.map((t) -> t.toString())

    it 'should use a user-supplied formatter for labels', ->
      line = Morris.Line
        element: 'graph'
        data: [
          {x: new Date(2012, 0, 1).getTime(), y: 2},
          {x: new Date(2012, 0, 2).getTime(), y: 1},
          {x: new Date(2012, 0, 3).getTime(), y: 4},
          {x: new Date(2012, 0, 4).getTime(), y: 3}]
        xkey: 'x'
        ykeys: ['y']
        labels: ['y']
        dateFormat: (ts) ->
          date = new Date(ts)
          "#{date.getFullYear()}-#{date.getMonth()+1}-#{date.getDate()}"
      line.data.map((row) -> row.label).should.deep.equal ['2012-1-1', '2012-1-2', '2012-1-3', '2012-1-4']

  it 'should parse y-values in strings', ->
    line = Morris.Line
      element: 'graph'
      data: [{x: 2, y: '12'}, {x: 1, y: '13.5'}, {x: 4, y: '14'}, {x: 3, y: '16'}]
      xkey: 'x'
      ykeys: ['y']
      labels: ['y']
    line.ymin.should == 12
    line.ymax.should == 16
    line.data.map((row) -> row.y).should.deep.equal [[13.5], [12], [16], [14]]

  it 'should clear the chart when empty data is supplied', ->
    line = Morris.Line
      element: 'graph',
      data: [{x: 2, y: '12'}, {x: 1, y: '13.5'}, {x: 4, y: '14'}, {x: 3, y: '16'}]
      xkey: 'x'
      ykeys: ['y']
      labels: ['y']
    line.data.length.should.equal 4
    line.setData([])
    line.data.length.should.equal 0
    line.setData([{x: 2, y: '12'}, {x: 1, y: '13.5'}, {x: 4, y: '14'}, {x: 3, y: '16'}])
    line.data.length.should.equal 4

  it 'should be able to add data if the chart is initialised with empty data', ->
    line = Morris.Line
      element: 'graph',
      data: []
      xkey: 'x'
      ykeys: ['y']
      labels: ['y']
    line.data.length.should.equal 0
    line.setData([{x: 2, y: '12'}, {x: 1, y: '13.5'}, {x: 4, y: '14'}, {x: 3, y: '16'}])
    line.data.length.should.equal 4

  it 'should automatically choose significant numbers for y-labels', ->
    line = Morris.Line
      element: 'graph',
      data: [{x: 1, y: 0}, {x: 2, y: 3600}]
      xkey: 'x'
      ykeys: ['y']
      labels: ['y']
    line.grid.should == [0, 1000, 2000, 3000, 4000]
