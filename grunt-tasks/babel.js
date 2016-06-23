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
        'dist/js/AdminLTE.js': 'build/js/AdminLTE.js'
      }
    }
  };
};
