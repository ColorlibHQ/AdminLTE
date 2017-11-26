# Donut charts.
#
# @example
#   Morris.Donut({
#     el: $('#donut-container'),
#     data: [
#       { label: 'yin',  value: 50 },
#       { label: 'yang', value: 50 }
#     ]
#   });
class Morris.Donut extends Morris.EventEmitter
  defaults:
    colors: [
      '#0B62A4'
      '#3980B5'
      '#679DC6'
      '#95BBD7'
      '#B0CCE1'
      '#095791'
      '#095085'
      '#083E67'
      '#052C48'
      '#042135'
    ],
    backgroundColor: '#FFFFFF', 
    labelColor: '#000000',
    formatter: Morris.commas
    resize: false

  # Create and render a donut chart.
  #
  constructor: (options) ->
    return new Morris.Donut(options) unless (@ instanceof Morris.Donut)
    @options = $.extend {}, @defaults, options

    if typeof options.element is 'string'
      @el = $ document.getElementById(options.element)
    else
      @el = $ options.element

    if @el == null || @el.length == 0
      throw new Error("Graph placeholder not found.")

    # bail if there's no data
    if options.data is undefined or options.data.length is 0
      return

    @raphael = new Raphael(@el[0])

    if @options.resize
      $(window).bind 'resize', (evt) =>
        if @timeoutId?
          window.clearTimeout @timeoutId
        @timeoutId = window.setTimeout @resizeHandler, 100

    @setData options.data

  # Clear and redraw the chart.
  redraw: ->
    @raphael.clear()

    cx = @el.width() / 2
    cy = @el.height() / 2
    w = (Math.min(cx, cy) - 10) / 3

    total = 0
    total += value for value in @values

    min = 5 / (2 * w)
    C = 1.9999 * Math.PI - min * @data.length

    last = 0
    idx = 0
    @segments = []
    for value, i in @values
      next = last + min + C * (value / total)
      seg = new Morris.DonutSegment(
        cx, cy, w*2, w, last, next,
        @data[i].color || @options.colors[idx % @options.colors.length],
        @options.backgroundColor, idx, @raphael)
      seg.render()
      @segments.push seg
      seg.on 'hover', @select
      seg.on 'click', @click
      last = next
      idx += 1

    @text1 = @drawEmptyDonutLabel(cx, cy - 10, @options.labelColor, 15, 800)
    @text2 = @drawEmptyDonutLabel(cx, cy + 10, @options.labelColor, 14)

    max_value = Math.max @values...
    idx = 0
    for value in @values
      if value == max_value
        @select idx
        break
      idx += 1

  setData: (data) ->
    @data = data
    @values = (parseFloat(row.value) for row in @data)
    @redraw()

  # @private
  click: (idx) =>
    @fire 'click', idx, @data[idx]

  # Select the segment at the given index.
  select: (idx) =>
    s.deselect() for s in @segments
    segment = @segments[idx]
    segment.select()
    row = @data[idx]
    @setLabels(row.label, @options.formatter(row.value, row))



  # @private
  setLabels: (label1, label2) ->
    inner = (Math.min(@el.width() / 2, @el.height() / 2) - 10) * 2 / 3
    maxWidth = 1.8 * inner
    maxHeightTop = inner / 2
    maxHeightBottom = inner / 3
    @text1.attr(text: label1, transform: '')
    text1bbox = @text1.getBBox()
    text1scale = Math.min(maxWidth / text1bbox.width, maxHeightTop / text1bbox.height)
    @text1.attr(transform: "S#{text1scale},#{text1scale},#{text1bbox.x + text1bbox.width / 2},#{text1bbox.y + text1bbox.height}")
    @text2.attr(text: label2, transform: '')
    text2bbox = @text2.getBBox()
    text2scale = Math.min(maxWidth / text2bbox.width, maxHeightBottom / text2bbox.height)
    @text2.attr(transform: "S#{text2scale},#{text2scale},#{text2bbox.x + text2bbox.width / 2},#{text2bbox.y}")

  drawEmptyDonutLabel: (xPos, yPos, color, fontSize, fontWeight) ->
    text = @raphael.text(xPos, yPos, '')
      .attr('font-size', fontSize)
      .attr('fill', color)
    text.attr('font-weight', fontWeight) if fontWeight?
    return text

  resizeHandler: =>
    @timeoutId = null
    @raphael.setSize @el.width(), @el.height()
    @redraw()


# A segment within a donut chart.
#
# @private
class Morris.DonutSegment extends Morris.EventEmitter
  constructor: (@cx, @cy, @inner, @outer, p0, p1, @color, @backgroundColor, @index, @raphael) ->
    @sin_p0 = Math.sin(p0)
    @cos_p0 = Math.cos(p0)
    @sin_p1 = Math.sin(p1)
    @cos_p1 = Math.cos(p1)
    @is_long = if (p1 - p0) > Math.PI then 1 else 0
    @path = @calcSegment(@inner + 3, @inner + @outer - 5)
    @selectedPath = @calcSegment(@inner + 3, @inner + @outer)
    @hilight = @calcArc(@inner)

  calcArcPoints: (r) ->
    return [
      @cx + r * @sin_p0,
      @cy + r * @cos_p0,
      @cx + r * @sin_p1,
      @cy + r * @cos_p1]

  calcSegment: (r1, r2) ->
    [ix0, iy0, ix1, iy1] = @calcArcPoints(r1)
    [ox0, oy0, ox1, oy1] = @calcArcPoints(r2)
    return (
      "M#{ix0},#{iy0}" +
      "A#{r1},#{r1},0,#{@is_long},0,#{ix1},#{iy1}" +
      "L#{ox1},#{oy1}" +
      "A#{r2},#{r2},0,#{@is_long},1,#{ox0},#{oy0}" +
      "Z")

  calcArc: (r) ->
    [ix0, iy0, ix1, iy1] = @calcArcPoints(r)
    return (
      "M#{ix0},#{iy0}" +
      "A#{r},#{r},0,#{@is_long},0,#{ix1},#{iy1}")

  render: ->
    @arc = @drawDonutArc(@hilight, @color)
    @seg = @drawDonutSegment(
      @path, 
      @color, 
      @backgroundColor, 
      => @fire('hover', @index),
      => @fire('click', @index)
    )

  drawDonutArc: (path, color) ->
    @raphael.path(path)
      .attr(stroke: color, 'stroke-width': 2, opacity: 0)

  drawDonutSegment: (path, fillColor, strokeColor, hoverFunction, clickFunction) ->
    @raphael.path(path)
      .attr(fill: fillColor, stroke: strokeColor, 'stroke-width': 3)
      .hover(hoverFunction)
      .click(clickFunction)

  select: =>
    unless @selected
      @seg.animate(path: @selectedPath, 150, '<>')
      @arc.animate(opacity: 1, 150, '<>')
      @selected = true

  deselect: =>
    if @selected
      @seg.animate(path: @path, 150, '<>')
      @arc.animate(opacity: 0, 150, '<>')
      @selected = false
