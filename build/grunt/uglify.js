// Uglify task info. Compress the js files.
'use strict';

module.exports = function (grunt) {
  return {
    options: {
      mangle          : true,
      preserveComments: 'some'
    },
    target : {
      files: {
        'dist/js/adminlte.min.js': ['dist/js/adminlte.js']
      }
    }
  };
};
