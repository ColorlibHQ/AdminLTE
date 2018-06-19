beforeEach ->
  placeholder = $('<div id="graph" style="width: 600px; height: 400px"></div>')
  $('#test').append(placeholder)

afterEach ->
  $('#test').empty()
