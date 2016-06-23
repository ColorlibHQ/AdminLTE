// SASS compiler

'use strict';

module.exports = function (grunt) {
  return {
      development: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/tmp/AdminLTE.css': 'build/scss/AdminLTE.scss'
        }
      },
      production: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/tmp/AdminLTE.min.css': 'build/scss/AdminLTE.scss'
        }
      }
    };
};
