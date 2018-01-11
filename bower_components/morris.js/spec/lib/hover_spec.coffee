describe "Morris.Hover", ->

  describe "with dummy content", ->

    beforeEach ->
      parent = $('<div style="width:200px;height:180px"></div>')
        .appendTo($('#test'))
      @hover = new Morris.Hover(parent:  parent)
      @element = $('#test .morris-hover')

    it "should initialise a hidden, empty popup", ->
      @element.should.exist
      @element.should.be.hidden
      @element.should.be.empty

    describe "#show", ->
      it "should show the popup", ->
        @hover.show()
        @element.should.be.visible

    describe "#hide", ->
      it "should hide the popup", ->
        @hover.show()
        @hover.hide()
        @element.should.be.hidden

    describe "#html", ->
      it "should replace the contents of the element", ->
        @hover.html('<div>Foobarbaz</div>')
        @element.should.have.html('<div>Foobarbaz</div>')

    describe "#moveTo", ->
      beforeEach ->
        @hover.html('<div style="width:84px;height:84px"></div>')

      it "should place the popup directly above the given point", ->
        @hover.moveTo(100, 150)
        @element.should.have.css('left', '50px')
        @element.should.have.css('top', '40px')

      it "should place the popup below the given point if it does not fit above", ->
        @hover.moveTo(100, 50)
        @element.should.have.css('left', '50px')
        @element.should.have.css('top', '60px')

      it "should center the popup vertically if it will not fit above or below", ->
        @hover.moveTo(100, 100)
        @element.should.have.css('left', '50px')
        @element.should.have.css('top', '40px')

      it "should center the popup vertically if no y value is supplied", ->
        @hover.moveTo(100)
        @element.should.have.css('left', '50px')
        @element.should.have.css('top', '40px')

  describe "#update", ->
    it "should update content, show and reposition the popup", ->
      hover = new Morris.Hover(parent: $('#test'))
      html = "<div style='width:84px;height:84px'>Hello, Everyone!</div>"
      hover.update(html, 150, 200)
      el = $('#test .morris-hover')
      el.should.have.css('left', '100px')
      el.should.have.css('top', '90px')
      el.should.have.text('Hello, Everyone!')
