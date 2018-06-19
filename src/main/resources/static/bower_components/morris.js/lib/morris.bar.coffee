class Morris.Bar extends Morris.Grid
  constructor: (options) ->
    return new Morris.Bar(options) unless (@ instanceof Morris.Bar)
    super($.extend {}, options, parseTime: false)

  init: ->
    @cumulative = @options.stacked

    if @options.hideHover isnt 'always'
      @hover = new Morris.Hover(parent: @el)
      @on('hovermove', @onHoverMove)
      @on('hoverout', @onHoverOut)
      @on('gridclick', @onGridClick)

  # Default configuration
  #
  defaults:
    barSizeRatio: 0.75
    barGap: 3
    barColors: [
      '#0b62a4'
      '#7a92a3'
      '#4da74d'
      '#afd8f8'
      '#edc240'
      '#cb4b4b'
      '#9440ed'
    ],
    barOpacity: 1.0
    barRadius: [0, 0, 0, 0]
    xLabelMargin: 50

  # Do any size-related calculations
  #
  # @private
  calc: ->
    @calcBars()
    if @options.hideHover is false
      @hover.update(@hoverContentForRow(@data.length - 1)...)

  # calculate series data bars coordinates and sizes
  #
  # @private
  calcBars: ->
    for row, idx in @data
      row._x = @left + @width * (idx + 0.5) / @data.length
      row._y = for y in row.y
        if y? then @transY(y) else null

  # Draws the bar chart.
  #
  draw: ->
    @drawXAxis() if @options.axes in [true, 'both', 'x']
    @drawSeries()

  # draw the x-axis labels
  #
  # @private
  drawXAxis: ->
    # draw x axis labels
    ypos = @bottom + (@options.xAxisLabelTopPadding || @options.padding / 2)
    prevLabelMargin = null
    prevAngleMargin = null
    for i in [0...@data.length]
      row = @data[@data.length - 1 - i]
      label = @drawXAxisLabel(row._x, ypos, row.label)
      textBox = label.getBBox()
      label.transform("r#{-@options.xLabelAngle}")
      labelBox = label.getBBox()
      label.transform("t0,#{labelBox.height / 2}...")
      if @options.xLabelAngle != 0
        offset = -0.5 * textBox.width *
          Math.cos(@options.xLabelAngle * Math.PI / 180.0)
        label.transform("t#{offset},0...")
      # try to avoid overlaps
      if (not prevLabelMargin? or
          prevLabelMargin >= labelBox.x + labelBox.width or
          prevAngleMargin? and prevAngleMargin >= labelBox.x) and
         labelBox.x >= 0 and (labelBox.x + labelBox.width) < @el.width()
        if @options.xLabelAngle != 0
          margin = 1.25 * @options.gridTextSize /
            Math.sin(@options.xLabelAngle * Math.PI / 180.0)
          prevAngleMargin = labelBox.x - margin
        prevLabelMargin = labelBox.x - @options.xLabelMargin
      else
        label.remove()

  # draw the data series
  #
  # @private
  drawSeries: ->
    groupWidth = @width / @options.data.length
    numBars = if @options.stacked then 1 else @options.ykeys.length
    barWidth = (groupWidth * @options.barSizeRatio - @options.barGap * (numBars - 1)) / numBars
    barWidth = Math.min(barWidth, @options.barSize) if @options.barSize
    spaceLeft = groupWidth - barWidth * numBars - @options.barGap * (numBars - 1)
    leftPadding = spaceLeft / 2
    zeroPos = if @ymin <= 0 and @ymax >= 0 then @transY(0) else null
    @bars = for row, idx in @data
      lastTop = 0
      for ypos, sidx in row._y
        if ypos != null
          if zeroPos
            top = Math.min(ypos, zeroPos)
            bottom = Math.max(ypos, zeroPos)
          else
            top = ypos
            bottom = @bottom

          left = @left + idx * groupWidth + leftPadding
          left += sidx * (barWidth + @options.barGap) unless @options.stacked
          size = bottom - top

          if @options.verticalGridCondition and @options.verticalGridCondition(row.x)
            @drawBar(@left + idx * groupWidth, @top, groupWidth, Math.abs(@top - @bottom), @options.verticalGridColor, @options.verticalGridOpacity, @options.barRadius)

          top -= lastTop if @options.stacked
          @drawBar(left, top, barWidth, size, @colorFor(row, sidx, 'bar'),
              @options.barOpacity, @options.barRadius)

          lastTop += size
        else
          null

  # @private
  #
  # @param row  [Object] row data
  # @param sidx [Number] series index
  # @param type [String] "bar", "hover" or "label"
  colorFor: (row, sidx, type) ->
    if typeof @options.barColors is 'function'
      r = { x: row.x, y: row.y[sidx], label: row.label }
      s = { index: sidx, key: @options.ykeys[sidx], label: @options.labels[sidx] }
      @options.barColors.call(@, r, s, type)
    else
      @options.barColors[sidx % @options.barColors.length]

  # hit test - returns the index of the row at the given x-coordinate
  #
  hitTest: (x) ->
    return null if @data.length == 0
    x = Math.max(Math.min(x, @right), @left)
    Math.min(@data.length - 1,
      Math.floor((x - @left) / (@width / @data.length)))

  # click on grid event handler
  #
  # @private
  onGridClick: (x, y) =>
    index = @hitTest(x)
    @fire 'click', index, @data[index].src, x, y

  # hover movement event handler
  #
  # @private
  onHoverMove: (x, y) =>
    index = @hitTest(x)
    @hover.update(@hoverContentForRow(index)...)

  # hover out event handler
  #
  # @private
  onHoverOut: =>
    if @options.hideHover isnt false
      @hover.hide()

  # hover content for a point
  #
  # @private
  hoverContentForRow: (index) ->
    row = @data[index]
    content = "<div class='morris-hover-row-label'>#{row.label}</div>"
    for y, j in row.y
      content += """
        <div class='morris-hover-point' style='color: #{@colorFor(row, j, 'label')}'>
          #{@options.labels[j]}:
          #{@yLabelFormat(y)}
        </div>
      """
    if typeof @options.hoverCallback is 'function'
      content = @options.hoverCallback(index, @options, content, row.src)
    x = @left + (index + 0.5) * @width / @data.length
    [content, x]

  drawXAxisLabel: (xPos, yPos, text) ->
    label = @raphael.text(xPos, yPos, text)
      .attr('font-size', @options.gridTextSize)
      .attr('font-family', @options.gridTextFamily)
      .attr('font-weight', @options.gridTextWeight)
      .attr('fill', @options.gridTextColor)

  drawBar: (xPos, yPos, width, height, barColor, opacity, radiusArray) ->
    maxRadius = Math.max(radiusArray...)
    if maxRadius == 0 or maxRadius > height
      path = @raphael.rect(xPos, yPos, width, height)
    else
      path = @raphael.path @roundedRect(xPos, yPos, width, height, radiusArray)
    path
      .attr('fill', barColor)
      .attr('fill-opacity', opacity)
      .attr('stroke', 'none')

  roundedRect: (x, y, w, h, r = [0,0,0,0]) ->
    [ "M", x, r[0] + y, "Q", x, y, x + r[0], y,
      "L", x + w - r[1], y, "Q", x + w, y, x + w, y + r[1],
      "L", x + w, y + h - r[2], "Q", x + w, y + h, x + w - r[2], y + h,
      "L", x + r[3], y + h, "Q", x, y + h, x, y + h - r[3], "Z" ]

