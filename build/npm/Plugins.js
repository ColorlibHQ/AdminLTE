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
    from: 'node_modules/bootstrap/dist/js',
    to  : 'plugins/bootstrap/js'
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
  // overlayScrollbars
  {
    from: 'node_modules/overlayscrollbars/js',
    to  : 'plugins/overlayScrollbars/js'
  },
  {
    from: 'node_modules/overlayscrollbars/css',
    to  : 'plugins/overlayScrollbars/css'
  },
  // Chart.js
  {
    from: 'node_modules/chart.js/dist/',
    to  : 'plugins/chart.js'
  },
  // jQuery UI
  {
    from: 'node_modules/jquery-ui-dist/',
    to  : 'plugins/jquery-ui'
  },
  // Flot
  {
    from: 'node_modules/flot/dist/es5/',
    to  : 'plugins/flot'
  },
  // Summernote
  {
    from: 'node_modules/summernote/dist/',
    to  : 'plugins/summernote'
  },
  // Bootstrap Slider
  {
    from: 'node_modules/bootstrap-slider/dist/',
    to  : 'plugins/bootstrap-slider'
  },
  {
    from: 'node_modules/bootstrap-slider/dist/css',
    to  : 'plugins/bootstrap-slider/css'
  },
  // Bootstrap Colorpicker
  {
    from: 'node_modules/bootstrap-colorpicker/dist/js',
    to  : 'plugins/bootstrap-colorpicker/js'
  },
  {
    from: 'node_modules/bootstrap-colorpicker/dist/css',
    to  : 'plugins/bootstrap-colorpicker/css'
  },
  // Tempusdominus Bootstrap 4
  {
    from: 'node_modules/tempusdominus-bootstrap-4/build/js',
    to  : 'plugins/tempusdominus-bootstrap-4/js'
  },
  {
    from: 'node_modules/tempusdominus-bootstrap-4/build/css',
    to  : 'plugins/tempusdominus-bootstrap-4/css'
  },
  // Moment
  {
    from: 'node_modules/moment/min',
    to  : 'plugins/moment'
  },
  {
    from: 'node_modules/moment/locale',
    to  : 'plugins/moment/locale'
  },
  // FastClick
  {
    from: 'node_modules/fastclick/lib',
    to  : 'plugins/fastclick'
  },
  // Date Range Picker
  {
    from: 'node_modules/daterangepicker/',
    to  : 'plugins/daterangepicker'
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
  // Fullcalendar
  {
    from: 'node_modules/@fullcalendar/core/',
    to  : 'plugins/fullcalendar'
  },
  {
    from: 'node_modules/@fullcalendar/bootstrap/',
    to  : 'plugins/fullcalendar-bootstrap'
  },
  {
    from: 'node_modules/@fullcalendar/daygrid/',
    to  : 'plugins/fullcalendar-daygrid'
  },
  {
    from: 'node_modules/@fullcalendar/timegrid/',
    to  : 'plugins/fullcalendar-timegrid'
  },
  {
    from: 'node_modules/@fullcalendar/interaction/',
    to  : 'plugins/fullcalendar-interaction'
  },
  // icheck bootstrap
  {
    from: 'node_modules/icheck-bootstrap/',
    to  : 'plugins/icheck-bootstrap'
  },
  // inputmask
  {
    from: 'node_modules/inputmask/dist/',
    to  : 'plugins/inputmask'
  },
  // ion-rangeslider
  {
    from: 'node_modules/ion-rangeslider/',
    to  : 'plugins/ion-rangeslider'
  },
  // JQVMap
  {
    from: 'node_modules/jqvmap/dist/',
    to  : 'plugins/jqvmap'
  },
  // jQuery Mapael
  {
    from: 'node_modules/jquery-mapael/js/',
    to  : 'plugins/jquery-mapael'
  },
  // Raphael
  {
    from: 'node_modules/raphael/',
    to  : 'plugins/raphael'
  },
  // jQuery Mousewheel
  {
    from: 'node_modules/jquery-mousewheel/',
    to  : 'plugins/jquery-mousewheel'
  },
  // jQuery Knob
  {
    from: 'node_modules/jquery-knob-chif/dist/',
    to  : 'plugins/jquery-knob'
  },
  // pace-progress
  {
    from: 'node_modules/@lgaitan/pace-progress/dist/',
    to  : 'plugins/pace-progress'
  },
  // Select2
  {
    from: 'node_modules/select2/dist/',
    to  : 'plugins/select2'
  },
  // Sparklines
  {
    from: 'node_modules/sparklines/source/',
    to  : 'plugins/sparklines'
  },
  // SweetAlert2
  {
    from: 'node_modules/sweetalert2/dist/',
    to  : 'plugins/sweetalert2'
  },
  // Toastr
  {
    from: 'node_modules/toastr/build/',
    to  : 'plugins/toastr'
  },
  // jsGrid
  {
    from: 'node_modules/jsgrid/dist',
    to: 'plugins/jsgrid'
  },
  {
    from: 'node_modules/jsgrid/demos/',
    to: 'plugins/jsgrid/demos'
  },
  // flag-icon-css
  {
    from: 'node_modules/flag-icon-css/css',
    to: 'plugins/flag-icon-css/css'
  },
  {
    from: 'node_modules/flag-icon-css/flags',
    to: 'plugins/flag-icon-css/flags'
  },
  // bootstrap4-duallistbox
  {
    from: 'node_modules/bootstrap4-duallistbox/dist',
    to: 'plugins/bootstrap4-duallistbox/'
  },


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
  // overlayScrollbars
  {
    from: 'node_modules/overlayscrollbars/js',
    to  : 'docs/assets/plugins/overlayScrollbars/js'
  },
  {
    from: 'node_modules/overlayscrollbars/css',
    to  : 'docs/assets/plugins/overlayScrollbars/css'
  }
]

module.exports = Plugins
