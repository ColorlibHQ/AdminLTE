{uniqueId} = Tether.Utils

SETUP_JS = """
yellowBox = $('.yellow-box', $output);
greenBox = $('.green-box', $output);
scrollBox = $('.scroll-box', $output);
"""

OUTPUT_HTML = (key) -> """
<div class="scroll-box">
  <div class="scroll-content">
    <div class="yellow-box" data-example="#{ key }"></div>
    <div class="green-box" data-example="#{ key }"></div>
  </div>
</div>
"""

tethers = {}

getOutput = ($block) ->
  key = $block.data('example')
  if key and typeof key is 'string'
    return $("output[data-example='#{ key }']")
  else
    return $block.parents('pre').nextAll('output').first()

run = (key) ->
  if typeof key is 'string'
    $block = $("code[data-example='#{ key }']")
  else
    $block = key

  key = $block.attr('data-example')

  $output = getOutput $block

  code = $block.text()
  code = SETUP_JS + code

  window.$output = $output
  tethers[key] = eval code

setupBlock = ($block) ->
  key = $block.data('example')

  $output = getOutput $block

  if not key
    key = uniqueId()
    $block.attr('data-example', key)
    $output.attr('data-example', key)
    $output.find('.tether-element').attr('data-example', key)

  $output.html OUTPUT_HTML(key)

  $scrollBox = $output.find('.scroll-box')
  $scrollContent = $scrollBox.find('.scroll-content')
  $scrollBox.scrollTop(parseInt($scrollContent.css('height')) / 2 - $scrollBox.height() / 2)
  $scrollBox.scrollLeft(parseInt($scrollContent.css('width')) / 2 - $scrollBox.width() / 2)
  setTimeout ->
    $scrollBox.on 'scroll', ->
      $output.addClass 'scrolled'

  $scrollBox.css 'height', "#{ $block.parent().outerHeight() }px"

  if not $output.attr('deactivated')?
    run $block

$(document.body).on 'click', (e) ->
  if $(e.target).is('output[deactivated]')
    activate $(e.target)
    false
  else if $(e.target).is('output[activated]')
    deactivate $(e.target)
    false

activate = ($output) ->
  $block = $output.prev().find('code')

  run $block

  $output.find('.tether-element').show()

  key = $output.data('example')
  $(tethers[key].element).show()
  tethers[key].enable()

  $output.removeAttr('deactivated')
  $output.attr('activated', true)

deactivate = ($output) ->
  $block = $output.prev().find('code')
  key = $output.data('example')

  tethers[key].disable()

  $el = $(tethers[key].element)
  $el.detach()
  $output.find('.scroll-content').append $el
  $el.hide()

  $output.removeAttr('activated')
  $output.attr('deactivated', true)

init = ->
  $blocks = $('code[data-example]')

  setupBlock($ block) for block in $blocks

window.EXECUTR_OPTIONS =
  codeSelector: 'code[executable]'

$ init
