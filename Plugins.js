const Plugins = [
  // jQuery
  {
    from: 'node_modules/jquery/dist',
    to: 'plugins/jquery'
  },
  // Popper
  {
    from: 'node_modules/popper.js/dist',
    to: 'plugins/popper'
  },
  // Bootstrap
  {
    from: 'node_modules/bootstrap/dist',
    to: 'plugins/bootstrap'
  },
  // Font Awesome
  {
    from: 'node_modules/font-awesome/css',
    to  : 'plugins/font-awesome/css'
  },
  {
    from: 'node_modules/font-awesome/fonts',
    to  : 'plugins/font-awesome/fonts'
  }
]

module.exports = Plugins
