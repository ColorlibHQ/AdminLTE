// Concat compiled JS files
'use strict';

module.exports = function (grunt) {
  return {
    options : {
      stripBanners: true,
      banner      : '<%= banner %>'
    },
    adminlte: {
      src : [
        'build/js/src/Layout.js',
        'build/js/src/Treeview.js',
        'build/js/src/PushMenu.js',
        'build/js/src/Widget.js',
        'build/js/src/ControlSidebar.js',
        'build/js/src/Search.js'
      ],
      dest: 'build/js/src/AdminLTE.js'
    }
  };
};
