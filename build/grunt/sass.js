// SASS compiler

'use strict';

module.exports = function (grunt) {
  return {
    development: {
      options: {
        precision     : 6,
        sourceComments: false,
        sourceMap     : true,
        outputStyle   : 'expanded'
      },
      files  : {
        'dist/css/adminlte.css': 'build/scss/AdminLTE.scss'
      }
    },
    production : {
      options: {
        sourceComments: false,
        sourceMap     : true,
        outputStyle   : 'compressed'
      },
      files  : {
        'dist/css/adminlte.min.css': 'build/scss/AdminLTE.scss'
      }
    }
  };
};
