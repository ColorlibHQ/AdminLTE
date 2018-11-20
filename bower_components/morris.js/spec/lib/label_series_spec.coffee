describe '#labelSeries', ->

  it 'should generate decade intervals', ->
    Morris.labelSeries(
      new Date(1952, 0, 1).getTime(),
      new Date(2012, 0, 1).getTime(),
      1000
    ).should.deep.equal([
      ["1960", new Date(1960, 0, 1).getTime()],
      ["1970", new Date(1970, 0, 1).getTime()],
      ["1980", new Date(1980, 0, 1).getTime()],
      ["1990", new Date(1990, 0, 1).getTime()],
      ["2000", new Date(2000, 0, 1).getTime()],
      ["2010", new Date(2010, 0, 1).getTime()]
    ])
    Morris.labelSeries(
      new Date(1952, 3, 1).getTime(),
      new Date(2012, 3, 1).getTime(),
      1000
    ).should.deep.equal([
      ["1960", new Date(1960, 0, 1).getTime()],
      ["1970", new Date(1970, 0, 1).getTime()],
      ["1980", new Date(1980, 0, 1).getTime()],
      ["1990", new Date(1990, 0, 1).getTime()],
      ["2000", new Date(2000, 0, 1).getTime()],
      ["2010", new Date(2010, 0, 1).getTime()]
    ])

  it 'should generate year intervals', ->
    Morris.labelSeries(
      new Date(2007, 0, 1).getTime(),
      new Date(2012, 0, 1).getTime(),
      1000
    ).should.deep.equal([
      ["2007", new Date(2007, 0, 1).getTime()],
      ["2008", new Date(2008, 0, 1).getTime()],
      ["2009", new Date(2009, 0, 1).getTime()],
      ["2010", new Date(2010, 0, 1).getTime()],
      ["2011", new Date(2011, 0, 1).getTime()],
      ["2012", new Date(2012, 0, 1).getTime()]
    ])
    Morris.labelSeries(
      new Date(2007, 3, 1).getTime(),
      new Date(2012, 3, 1).getTime(),
      1000
    ).should.deep.equal([
      ["2008", new Date(2008, 0, 1).getTime()],
      ["2009", new Date(2009, 0, 1).getTime()],
      ["2010", new Date(2010, 0, 1).getTime()],
      ["2011", new Date(2011, 0, 1).getTime()],
      ["2012", new Date(2012, 0, 1).getTime()]
    ])

  it 'should generate month intervals', ->
    Morris.labelSeries(
      new Date(2012, 0, 1).getTime(),
      new Date(2012, 5, 1).getTime(),
      1000
    ).should.deep.equal([
      ["2012-01", new Date(2012, 0, 1).getTime()],
      ["2012-02", new Date(2012, 1, 1).getTime()],
      ["2012-03", new Date(2012, 2, 1).getTime()],
      ["2012-04", new Date(2012, 3, 1).getTime()],
      ["2012-05", new Date(2012, 4, 1).getTime()],
      ["2012-06", new Date(2012, 5, 1).getTime()]
    ])

  it 'should generate week intervals', ->
    Morris.labelSeries(
      new Date(2012, 0, 1).getTime(),
      new Date(2012, 1, 10).getTime(),
      1000
    ).should.deep.equal([
      ["2012-01-01", new Date(2012, 0, 1).getTime()],
      ["2012-01-08", new Date(2012, 0, 8).getTime()],
      ["2012-01-15", new Date(2012, 0, 15).getTime()],
      ["2012-01-22", new Date(2012, 0, 22).getTime()],
      ["2012-01-29", new Date(2012, 0, 29).getTime()],
      ["2012-02-05", new Date(2012, 1, 5).getTime()]
    ])
    
  it 'should generate day intervals', ->
    Morris.labelSeries(
      new Date(2012, 0, 1).getTime(),
      new Date(2012, 0, 6).getTime(),
      1000
    ).should.deep.equal([
      ["2012-01-01", new Date(2012, 0, 1).getTime()],
      ["2012-01-02", new Date(2012, 0, 2).getTime()],
      ["2012-01-03", new Date(2012, 0, 3).getTime()],
      ["2012-01-04", new Date(2012, 0, 4).getTime()],
      ["2012-01-05", new Date(2012, 0, 5).getTime()],
      ["2012-01-06", new Date(2012, 0, 6).getTime()]
    ])

  it 'should generate hour intervals', ->
    Morris.labelSeries(
      new Date(2012, 0, 1, 0).getTime(),
      new Date(2012, 0, 1, 5).getTime(),
      1000
    ).should.deep.equal([
      ["00:00", new Date(2012, 0, 1, 0).getTime()],
      ["01:00", new Date(2012, 0, 1, 1).getTime()],
      ["02:00", new Date(2012, 0, 1, 2).getTime()],
      ["03:00", new Date(2012, 0, 1, 3).getTime()],
      ["04:00", new Date(2012, 0, 1, 4).getTime()],
      ["05:00", new Date(2012, 0, 1, 5).getTime()]
    ])

  it 'should generate half-hour intervals', ->
    Morris.labelSeries(
      new Date(2012, 0, 1, 0, 0).getTime(),
      new Date(2012, 0, 1, 2, 30).getTime(),
      1000
    ).should.deep.equal([
      ["00:00", new Date(2012, 0, 1, 0, 0).getTime()],
      ["00:30", new Date(2012, 0, 1, 0, 30).getTime()],
      ["01:00", new Date(2012, 0, 1, 1, 0).getTime()],
      ["01:30", new Date(2012, 0, 1, 1, 30).getTime()],
      ["02:00", new Date(2012, 0, 1, 2, 0).getTime()],
      ["02:30", new Date(2012, 0, 1, 2, 30).getTime()]
    ])
    Morris.labelSeries(
      new Date(2012, 4, 12, 0, 0).getTime(),
      new Date(2012, 4, 12, 2, 30).getTime(),
      1000
    ).should.deep.equal([
      ["00:00", new Date(2012, 4, 12, 0, 0).getTime()],
      ["00:30", new Date(2012, 4, 12, 0, 30).getTime()],
      ["01:00", new Date(2012, 4, 12, 1, 0).getTime()],
      ["01:30", new Date(2012, 4, 12, 1, 30).getTime()],
      ["02:00", new Date(2012, 4, 12, 2, 0).getTime()],
      ["02:30", new Date(2012, 4, 12, 2, 30).getTime()]
    ])

  it 'should generate fifteen-minute intervals', ->
    Morris.labelSeries(
      new Date(2012, 0, 1, 0, 0).getTime(),
      new Date(2012, 0, 1, 1, 15).getTime(),
      1000
    ).should.deep.equal([
      ["00:00", new Date(2012, 0, 1, 0, 0).getTime()],
      ["00:15", new Date(2012, 0, 1, 0, 15).getTime()],
      ["00:30", new Date(2012, 0, 1, 0, 30).getTime()],
      ["00:45", new Date(2012, 0, 1, 0, 45).getTime()],
      ["01:00", new Date(2012, 0, 1, 1, 0).getTime()],
      ["01:15", new Date(2012, 0, 1, 1, 15).getTime()]
    ])
    Morris.labelSeries(
      new Date(2012, 4, 12, 0, 0).getTime(),
      new Date(2012, 4, 12, 1, 15).getTime(),
      1000
    ).should.deep.equal([
      ["00:00", new Date(2012, 4, 12, 0, 0).getTime()],
      ["00:15", new Date(2012, 4, 12, 0, 15).getTime()],
      ["00:30", new Date(2012, 4, 12, 0, 30).getTime()],
      ["00:45", new Date(2012, 4, 12, 0, 45).getTime()],
      ["01:00", new Date(2012, 4, 12, 1, 0).getTime()],
      ["01:15", new Date(2012, 4, 12, 1, 15).getTime()]
    ])

  it 'should override automatic intervals', ->
    Morris.labelSeries(
      new Date(2011, 11, 12).getTime(),
      new Date(2012, 0, 12).getTime(),
      1000,
      "year"
    ).should.deep.equal([
      ["2012", new Date(2012, 0, 1).getTime()]
    ])

  it 'should apply custom formatters', ->
    Morris.labelSeries(
      new Date(2012, 0, 1).getTime(),
      new Date(2012, 0, 6).getTime(),
      1000,
      "day",
      (d) -> "#{d.getMonth()+1}/#{d.getDate()}/#{d.getFullYear()}"
    ).should.deep.equal([
      ["1/1/2012", new Date(2012, 0, 1).getTime()],
      ["1/2/2012", new Date(2012, 0, 2).getTime()],
      ["1/3/2012", new Date(2012, 0, 3).getTime()],
      ["1/4/2012", new Date(2012, 0, 4).getTime()],
      ["1/5/2012", new Date(2012, 0, 5).getTime()],
      ["1/6/2012", new Date(2012, 0, 6).getTime()]
    ])
