describe '#pad', ->

  it 'should pad numbers', ->
    Morris.pad2(0).should.equal("00")
    Morris.pad2(1).should.equal("01")
    Morris.pad2(2).should.equal("02")
    Morris.pad2(3).should.equal("03")
    Morris.pad2(4).should.equal("04")
    Morris.pad2(5).should.equal("05")
    Morris.pad2(6).should.equal("06")
    Morris.pad2(7).should.equal("07")
    Morris.pad2(8).should.equal("08")
    Morris.pad2(9).should.equal("09")
    Morris.pad2(10).should.equal("10")
    Morris.pad2(12).should.equal("12")
    Morris.pad2(34).should.equal("34")
    Morris.pad2(123).should.equal("123")