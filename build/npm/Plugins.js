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
    from: 'node_modules/@fortawesome/fontawesome-free/css',
    to  : 'plugins/fontawesome-free/css'
  },
  {
    from: 'node_modules/@fortawesome/fontawesome-free/webfonts',
    to  : 'plugins/fontawesome-free/webfonts'
  },
  // Chart.js 2
  {
    from: 'node_modules/chart.js/dist/',
    to  : 'plugins/chart.js'
  },
  // CKEditor
  {
    from: 'node_modules/@ckeditor/ckeditor5-build-classic/build/',
    to  : 'plugins/ckeditor'
  },
  // DataTables
  {
    from: 'node_modules/datatables.net/js',
    to: 'plugins/datatables'
  },
  {
    from: 'node_modules/datatables.net-bs4/js',
    to: 'plugins/datatables'
  },
  {
    from: 'node_modules/datatables.net-bs4/css',
    to: 'plugins/datatables'
  },

  // Doc Assets
  // AdminLTE Dist
  {
    from: 'dist/css',
    to  : 'docs/assets/css'
  },
  {
    from: 'dist/js',
    to  : 'docs/assets/js'
  },
  // jQuery
  {
    from: 'node_modules/jquery/dist',
    to  : 'docs/assets/plugins/jquery'
  },
  // Popper
  {
    from: 'node_modules/popper.js/dist',
    to  : 'docs/assets/plugins/popper'
  },
  // Bootstrap
  {
    from: 'node_modules/bootstrap/dist/js',
    to  : 'docs/assets/plugins/bootstrap/js'
  },
  // Font Awesome
  {
    from: 'node_modules/@fortawesome/fontawesome-free/css',
    to  : 'docs/assets/plugins/fontawesome-free/css'
  },
  {
    from: 'node_modules/@fortawesome/fontawesome-free/webfonts',
    to  : 'docs/assets/plugins/fontawesome-free/webfonts'
  },
  {
    from: 'plugins/slimScroll',
    to  : 'docs/assets/plugins/slimScroll'
  }
]

module.exports = Plugins
