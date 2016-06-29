// SASS compiler

'use strict';

module.exports = function (grunt) {
  return {
      development: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/AdminLTE.css': 'build/scss/AdminLTE.scss'
        }
      },
      production: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/adminlte.min.css': 'build/scss/AdminLTE.scss'
        }
      }
    };
};
