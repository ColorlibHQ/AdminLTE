describe 'Morris.Grid#autoGridLines', ->

  beforeEach ->
    @subject = Morris.Grid.prototype.autoGridLines

  it 'should draw at fixed intervals', ->
    @subject(0, 4, 5).should.deep.equal [0, 1, 2, 3, 4]
    @subject(0, 400, 5).should.deep.equal [0, 100, 200, 300, 400]

  it 'should pick intervals that show significant numbers', ->
    @subject(102, 499, 5).should.deep.equal [100, 200, 300, 400, 500]

  it 'should draw zero when it falls within [ymin..ymax]', ->
    @subject(-100, 300, 5).should.deep.equal [-100, 0, 100, 200, 300]
    @subject(-50, 350, 5).should.deep.equal [-125, 0, 125, 250, 375]
    @subject(-400, 400, 5).should.deep.equal [-400, -200, 0, 200, 400]
    @subject(100, 500, 5).should.deep.equal [100, 200, 300, 400, 500]
    @subject(-500, -100, 5).should.deep.equal [-500, -400, -300, -200, -100]

  it 'should generate decimal labels to 2 significant figures', ->
    @subject(0, 1, 5).should.deep.equal [0, 0.25, 0.5, 0.75, 1]
    @subject(0.1, 0.5, 5).should.deep.equal [0.1, 0.2, 0.3, 0.4, 0.5]

  it 'should use integer intervals for intervals larger than 1', ->
    @subject(0, 9, 5).should.deep.equal [0, 3, 6, 9, 12]
