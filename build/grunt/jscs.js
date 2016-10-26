// Lint JS code
'use strict';

module.exports = function (grunt) {
  return {
    options: {
      config: 'build/js/.jscsrc'
    },
    grunt  : {
      src: ['Gruntfile.js']
    },
    core   : {
      src: 'js/src/*.js'
    }
    /*app: {
     src: 'dist/js/app.js'
     }*/
  };
};
