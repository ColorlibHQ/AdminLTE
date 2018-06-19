class Morris.Hover
  # Displays contextual information in a floating HTML div.

  @defaults:
    class: 'morris-hover morris-default-style'

  constructor: (options = {}) ->
    @options = $.extend {}, Morris.Hover.defaults, options
    @el = $ "<div class='#{@options.class}'></div>"
    @el.hide()
    @options.parent.append(@el)

  update: (html, x, y) ->
    if not html
      @hide()
    else
      @html(html)
      @show()
      @moveTo(x, y)

  html: (content) ->
    @el.html(content)

  moveTo: (x, y) ->
    parentWidth  = @options.parent.innerWidth()
    parentHeight = @options.parent.innerHeight()
    hoverWidth   = @el.outerWidth()
    hoverHeight  = @el.outerHeight()
    left = Math.min(Math.max(0, x - hoverWidth / 2), parentWidth - hoverWidth)
    if y?
      top = y - hoverHeight - 10
      if top < 0
        top = y + 10
        if top + hoverHeight > parentHeight
          top = parentHeight / 2 - hoverHeight / 2
    else
      top = parentHeight / 2 - hoverHeight / 2
    @el.css(left: left + "px", top: parseInt(top) + "px")

  show: ->
    @el.show()

  hide: ->
    @el.hide()
