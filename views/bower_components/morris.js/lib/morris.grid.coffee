class Morris.Grid extends Morris.EventEmitter
  # A generic pair of axes for line/area/bar charts.
  #
  # Draws grid lines and axis labels.
  #
  constructor: (options) ->
    # find the container to draw the graph in
    if typeof options.element is 'string'
      @el = $ document.getElementById(options.element)
    else
      @el = $ options.element
    if not @el? or @el.length == 0
      throw new Error("Graph container element not found")

    if @el.css('position') == 'static'
      @el.css('position', 'relative')

    @options = $.extend {}, @gridDefaults, (@defaults || {}), options

    # backwards compatibility for units -> postUnits
    if typeof @options.units is 'string'
      @options.postUnits = options.units

    # the raphael drawing instance
    @raphael = new Raphael(@el[0])

    # some redraw stuff
    @elementWidth = null
    @elementHeight = null
    @dirty = false

    # range selection
    @selectFrom = null

    # more stuff
    @init() if @init

    # load data
    @setData @options.data

    # hover
    @el.bind 'mousemove', (evt) =>
      offset = @el.offset()
      x = evt.pageX - offset.left
      if @selectFrom
        left = @data[@hitTest(Math.min(x, @selectFrom))]._x
        right = @data[@hitTest(Math.max(x, @selectFrom))]._x
        width = right - left
        @selectionRect.attr({ x: left, width: width })
      else
        @fire 'hovermove', x, evt.pageY - offset.top

    @el.bind 'mouseleave', (evt) =>
      if @selectFrom
        @selectionRect.hide()
        @selectFrom = null
      @fire 'hoverout'

    @el.bind 'touchstart touchmove touchend', (evt) =>
      touch = evt.originalEvent.touches[0] or evt.originalEvent.changedTouches[0]
      offset = @el.offset()
      @fire 'hovermove', touch.pageX - offset.left, touch.pageY - offset.top

    @el.bind 'click', (evt) =>
      offset = @el.offset()
      @fire 'gridclick', evt.pageX - offset.left, evt.pageY - offset.top

    if @options.rangeSelect
      @selectionRect = @raphael.rect(0, 0, 0, @el.innerHeight())
        .attr({ fill: @options.rangeSelectColor, stroke: false })
        .toBack()
        .hide()

      @el.bind 'mousedown', (evt) =>
        offset = @el.offset()
        @startRange evt.pageX - offset.left

      @el.bind 'mouseup', (evt) =>
        offset = @el.offset()
        @endRange evt.pageX - offset.left
        @fire 'hovermove', evt.pageX - offset.left, evt.pageY - offset.top

    if @options.resize
      $(window).bind 'resize', (evt) =>
        if @timeoutId?
          window.clearTimeout @timeoutId
        @timeoutId = window.setTimeout @resizeHandler, 100

    # Disable tap highlight on iOS.
    @el.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)')

    @postInit() if @postInit

  # Default options
  #
  gridDefaults:
    dateFormat: null
    axes: true
    grid: true
    gridLineColor: '#aaa'
    gridStrokeWidth: 0.5
    gridTextColor: '#888'
    gridTextSize: 12
    gridTextFamily: 'sans-serif'
    gridTextWeight: 'normal'
    hideHover: false
    yLabelFormat: null
    xLabelAngle: 0
    numLines: 5
    padding: 25
    parseTime: true
    postUnits: ''
    preUnits: ''
    ymax: 'auto'
    ymin: 'auto 0'
    goals: []
    goalStrokeWidth: 1.0
    goalLineColors: [
      '#666633'
      '#999966'
      '#cc6666'
      '#663333'
    ]
    events: []
    eventStrokeWidth: 1.0
    eventLineColors: [
      '#005a04'
      '#ccffbb'
      '#3a5f0b'
      '#005502'
    ]
    rangeSelect: null
    rangeSelectColor: '#eef'
    resize: false

  # Update the data series and redraw the chart.
  #
  setData: (data, redraw = true) ->
    @options.data = data

    if !data? or data.length == 0
      @data = []
      @raphael.clear()
      @hover.hide() if @hover?
      return

    ymax = if @cumulative then 0 else null
    ymin = if @cumulative then 0 else null

    if @options.goals.length > 0
      minGoal = Math.min @options.goals...
      maxGoal = Math.max @options.goals...
      ymin = if ymin? then Math.min(ymin, minGoal) else minGoal
      ymax = if ymax? then Math.max(ymax, maxGoal) else maxGoal

    @data = for row, index in data
      ret = {src: row}

      ret.label = row[@options.xkey]
      if @options.parseTime
        ret.x = Morris.parseDate(ret.label)
        if @options.dateFormat
          ret.label = @options.dateFormat ret.x
        else if typeof ret.label is 'number'
          ret.label = new Date(ret.label).toString()
      else
        ret.x = index
        if @options.xLabelFormat
          ret.label = @options.xLabelFormat ret
      total = 0
      ret.y = for ykey, idx in @options.ykeys
        yval = row[ykey]
        yval = parseFloat(yval) if typeof yval is 'string'
        yval = null if yval? and typeof yval isnt 'number'
        if yval?
          if @cumulative
            total += yval
          else
            if ymax?
              ymax = Math.max(yval, ymax)
              ymin = Math.min(yval, ymin)
            else
              ymax = ymin = yval
        if @cumulative and total?
          ymax = Math.max(total, ymax)
          ymin = Math.min(total, ymin)
        yval
      ret

    if @options.parseTime
      @data = @data.sort (a, b) -> (a.x > b.x) - (b.x > a.x)

    # calculate horizontal range of the graph
    @xmin = @data[0].x
    @xmax = @data[@data.length - 1].x

    @events = []
    if @options.events.length > 0
      if @options.parseTime
        @events = (Morris.parseDate(e) for e in @options.events)
      else
        @events = @options.events
      @xmax = Math.max(@xmax, Math.max(@events...))
      @xmin = Math.min(@xmin, Math.min(@events...))

    if @xmin is @xmax
      @xmin -= 1
      @xmax += 1

    @ymin = @yboundary('min', ymin)
    @ymax = @yboundary('max', ymax)

    if @ymin is @ymax
      @ymin -= 1 if ymin
      @ymax += 1

    if @options.axes in [true, 'both', 'y'] or @options.grid is true
      if (@options.ymax == @gridDefaults.ymax and
          @options.ymin == @gridDefaults.ymin)
        # calculate 'magic' grid placement
        @grid = @autoGridLines(@ymin, @ymax, @options.numLines)
        @ymin = Math.min(@ymin, @grid[0])
        @ymax = Math.max(@ymax, @grid[@grid.length - 1])
      else
        step = (@ymax - @ymin) / (@options.numLines - 1)
        @grid = (y for y in [@ymin..@ymax] by step)

    @dirty = true
    @redraw() if redraw

  yboundary: (boundaryType, currentValue) ->
    boundaryOption = @options["y#{boundaryType}"]
    if typeof boundaryOption is 'string'
      if boundaryOption[0..3] is 'auto'
        if boundaryOption.length > 5
          suggestedValue = parseInt(boundaryOption[5..], 10)
          return suggestedValue unless currentValue?
          Math[boundaryType](currentValue, suggestedValue)
        else
          if currentValue? then currentValue else 0
      else
        parseInt(boundaryOption, 10)
    else
      boundaryOption

  autoGridLines: (ymin, ymax, nlines) ->
    span = ymax - ymin
    ymag = Math.floor(Math.log(span) / Math.log(10))
    unit = Math.pow(10, ymag)

    # calculate initial grid min and max values
    gmin = Math.floor(ymin / unit) * unit
    gmax = Math.ceil(ymax / unit) * unit
    step = (gmax - gmin) / (nlines - 1)
    if unit == 1 and step > 1 and Math.ceil(step) != step
      step = Math.ceil(step)
      gmax = gmin + step * (nlines - 1)

    # ensure zero is plotted where the range includes zero
    if gmin < 0 and gmax > 0
      gmin = Math.floor(ymin / step) * step
      gmax = Math.ceil(ymax / step) * step

    # special case for decimal numbers
    if step < 1
      smag = Math.floor(Math.log(step) / Math.log(10))
      grid = for y in [gmin..gmax] by step
        parseFloat(y.toFixed(1 - smag))
    else
      grid = (y for y in [gmin..gmax] by step)
    grid

  _calc: ->
    w = @el.width()
    h = @el.height()

    if @elementWidth != w or @elementHeight != h or @dirty
      @elementWidth = w
      @elementHeight = h
      @dirty = false
      # recalculate grid dimensions
      @left = @options.padding
      @right = @elementWidth - @options.padding
      @top = @options.padding
      @bottom = @elementHeight - @options.padding
      if @options.axes in [true, 'both', 'y']
        yLabelWidths = for gridLine in @grid
          @measureText(@yAxisFormat(gridLine)).width
        @left += Math.max(yLabelWidths...)
      if @options.axes in [true, 'both', 'x']
        bottomOffsets = for i in [0...@data.length]
          @measureText(@data[i].text, -@options.xLabelAngle).height
        @bottom -= Math.max(bottomOffsets...)
      @width = Math.max(1, @right - @left)
      @height = Math.max(1, @bottom - @top)
      @dx = @width / (@xmax - @xmin)
      @dy = @height / (@ymax - @ymin)
      @calc() if @calc

  # Quick translation helpers
  #
  transY: (y) -> @bottom - (y - @ymin) * @dy
  transX: (x) ->
    if @data.length == 1
      (@left + @right) / 2
    else
      @left + (x - @xmin) * @dx

  # Draw it!
  #
  # If you need to re-size your charts, call this method after changing the
  # size of the container element.
  redraw: ->
    @raphael.clear()
    @_calc()
    @drawGrid()
    @drawGoals()
    @drawEvents()
    @draw() if @draw

  # @private
  #
  measureText: (text, angle = 0) ->
    tt = @raphael.text(100, 100, text)
      .attr('font-size', @options.gridTextSize)
      .attr('font-family', @options.gridTextFamily)
      .attr('font-weight', @options.gridTextWeight)
      .rotate(angle)
    ret = tt.getBBox()
    tt.remove()
    ret

  # @private
  #
  yAxisFormat: (label) -> @yLabelFormat(label)

  # @private
  #
  yLabelFormat: (label) ->
    if typeof @options.yLabelFormat is 'function'
      @options.yLabelFormat(label)
    else
      "#{@options.preUnits}#{Morris.commas(label)}#{@options.postUnits}"

  # draw y axis labels, horizontal lines
  #
  drawGrid: ->
    return if @options.grid is false and @options.axes not in [true, 'both', 'y']
    for lineY in @grid
      y = @transY(lineY)
      if @options.axes in [true, 'both', 'y']
        @drawYAxisLabel(@left - @options.padding / 2, y, @yAxisFormat(lineY))
      if @options.grid
        @drawGridLine("M#{@left},#{y}H#{@left + @width}")

  # draw goals horizontal lines
  #
  drawGoals: ->
    for goal, i in @options.goals
      color = @options.goalLineColors[i % @options.goalLineColors.length]
      @drawGoal(goal, color)

  # draw events vertical lines
  drawEvents: ->
    for event, i in @events
      color = @options.eventLineColors[i % @options.eventLineColors.length]
      @drawEvent(event, color)

  drawGoal: (goal, color) ->
    @raphael.path("M#{@left},#{@transY(goal)}H#{@right}")
      .attr('stroke', color)
      .attr('stroke-width', @options.goalStrokeWidth)

  drawEvent: (event, color) ->
    @raphael.path("M#{@transX(event)},#{@bottom}V#{@top}")
      .attr('stroke', color)
      .attr('stroke-width', @options.eventStrokeWidth)

  drawYAxisLabel: (xPos, yPos, text) ->
    @raphael.text(xPos, yPos, text)
      .attr('font-size', @options.gridTextSize)
      .attr('font-family', @options.gridTextFamily)
      .attr('font-weight', @options.gridTextWeight)
      .attr('fill', @options.gridTextColor)
      .attr('text-anchor', 'end')

  drawGridLine: (path) ->
    @raphael.path(path)
      .attr('stroke', @options.gridLineColor)
      .attr('stroke-width', @options.gridStrokeWidth)

  # Range selection
  #
  startRange: (x) ->
    @hover.hide()
    @selectFrom = x
    @selectionRect.attr({ x: x, width: 0 }).show()

  endRange: (x) ->
    if @selectFrom
      start = Math.min(@selectFrom, x)
      end = Math.max(@selectFrom, x)
      @options.rangeSelect.call @el,
        start: @data[@hitTest(start)].x
        end: @data[@hitTest(end)].x
      @selectFrom = null

  resizeHandler: =>
    @timeoutId = null
    @raphael.setSize @el.width(), @el.height()
    @redraw()

# Parse a date into a javascript timestamp
#
#
Morris.parseDate = (date) ->
  if typeof date is 'number'
    return date
  m = date.match /^(\d+) Q(\d)$/
  n = date.match /^(\d+)-(\d+)$/
  o = date.match /^(\d+)-(\d+)-(\d+)$/
  p = date.match /^(\d+) W(\d+)$/
  q = date.match /^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/
  r = date.match /^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/
  if m
    new Date(
      parseInt(m[1], 10),
      parseInt(m[2], 10) * 3 - 1,
      1).getTime()
  else if n
    new Date(
      parseInt(n[1], 10),
      parseInt(n[2], 10) - 1,
      1).getTime()
  else if o
    new Date(
      parseInt(o[1], 10),
      parseInt(o[2], 10) - 1,
      parseInt(o[3], 10)).getTime()
  else if p
    # calculate number of weeks in year given
    ret = new Date(parseInt(p[1], 10), 0, 1);
    # first thursday in year (ISO 8601 standard)
    if ret.getDay() isnt 4
      ret.setMonth(0, 1 + ((4 - ret.getDay()) + 7) % 7);
    # add weeks
    ret.getTime() + parseInt(p[2], 10) * 604800000
  else if q
    if not q[6]
      # no timezone info, use local
      new Date(
        parseInt(q[1], 10),
        parseInt(q[2], 10) - 1,
        parseInt(q[3], 10),
        parseInt(q[4], 10),
        parseInt(q[5], 10)).getTime()
    else
      # timezone info supplied, use UTC
      offsetmins = 0
      if q[6] != 'Z'
        offsetmins = parseInt(q[8], 10) * 60 + parseInt(q[9], 10)
        offsetmins = 0 - offsetmins if q[7] == '+'
      Date.UTC(
        parseInt(q[1], 10),
        parseInt(q[2], 10) - 1,
        parseInt(q[3], 10),
        parseInt(q[4], 10),
        parseInt(q[5], 10) + offsetmins)
  else if r
    secs = parseFloat(r[6])
    isecs = Math.floor(secs)
    msecs = Math.round((secs - isecs) * 1000)
    if not r[8]
      # no timezone info, use local
      new Date(
        parseInt(r[1], 10),
        parseInt(r[2], 10) - 1,
        parseInt(r[3], 10),
        parseInt(r[4], 10),
        parseInt(r[5], 10),
        isecs,
        msecs).getTime()
    else
      # timezone info supplied, use UTC
      offsetmins = 0
      if r[8] != 'Z'
        offsetmins = parseInt(r[10], 10) * 60 + parseInt(r[11], 10)
        offsetmins = 0 - offsetmins if r[9] == '+'
      Date.UTC(
        parseInt(r[1], 10),
        parseInt(r[2], 10) - 1,
        parseInt(r[3], 10),
        parseInt(r[4], 10),
        parseInt(r[5], 10) + offsetmins,
        isecs,
        msecs)
  else
    new Date(parseInt(date, 10), 0, 1).getTime()

