describe '#commas', ->

  it 'should insert commas into long numbers', ->
    # zero
    Morris.commas(0).should.equal("0")

    # positive integers
    Morris.commas(1).should.equal("1")
    Morris.commas(12).should.equal("12")
    Morris.commas(123).should.equal("123")
    Morris.commas(1234).should.equal("1,234")
    Morris.commas(12345).should.equal("12,345")
    Morris.commas(123456).should.equal("123,456")
    Morris.commas(1234567).should.equal("1,234,567")

    # negative integers
    Morris.commas(-1).should.equal("-1")
    Morris.commas(-12).should.equal("-12")
    Morris.commas(-123).should.equal("-123")
    Morris.commas(-1234).should.equal("-1,234")
    Morris.commas(-12345).should.equal("-12,345")
    Morris.commas(-123456).should.equal("-123,456")
    Morris.commas(-1234567).should.equal("-1,234,567")

    # positive decimals
    Morris.commas(1.2).should.equal("1.2")
    Morris.commas(12.34).should.equal("12.34")
    Morris.commas(123.456).should.equal("123.456")
    Morris.commas(1234.56).should.equal("1,234.56")

    # negative decimals
    Morris.commas(-1.2).should.equal("-1.2")
    Morris.commas(-12.34).should.equal("-12.34")
    Morris.commas(-123.456).should.equal("-123.456")
    Morris.commas(-1234.56).should.equal("-1,234.56")

    # null
    Morris.commas(null).should.equal('-')
