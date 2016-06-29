// Compile ECMA6 to ECMA5
'use strict';

module.exports = function (grunt) {
  return {
    options: {
      sourceMap: true,
      presets: ['es2015']
    },
    dist: {
      files: {
        'build/js/dist/Layout.js': 'build/js/src/Layout.js',
        'build/js/dist/Treeview.js': 'build/js/src/Treeview.js',
        'build/js/dist/PushMenu.js': 'build/js/src/PushMenu.js',
        'build/js/dist/Widget.js': 'build/js/src/Widget.js',
        'dist/js/adminlte.js': 'build/js/src/AdminLTE.js'
      }
    }
  };
};
