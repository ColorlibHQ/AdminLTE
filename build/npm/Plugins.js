const Plugins = [
  // jQuery
  {
    from: 'node_modules/jquery/dist',
    to  : 'plugins/jquery'
  },
  // Popper
  {
    from: 'node_modules/popper.js/dist',
    to  : 'plugins/popper'
  },
  // Bootstrap
  {
    from: 'node_modules/bootstrap/dist',
    to  : 'plugins/bootstrap'
  },
  // Font Awesome
  {
    from: 'node_modules/font-awesome/css',
    to  : 'plugins/font-awesome/css'
  },
  {
    from: 'node_modules/font-awesome/fonts',
    to  : 'plugins/font-awesome/fonts'
  },
  // Chart.js 2
  {
    from: 'node_modules/chart.js/dist/',
    to  : 'plugins/chart.js'
  },
  // CKEditor
  {
    from: 'node_modules/@ckeditor/ckeditor5-build-classic/build',
    to  : 'plugins/ckeditor'
  }
]

module.exports = Plugins
