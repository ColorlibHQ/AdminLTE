'use strict';

module.exports = function (grunt) {
  return  {
    options: {
      jshintrc: '.jshintrc'
    },
    core: {
      src: 'dist/js/app.js'
    },
    demo: {
      src: 'dist/js/demo.js'
    },
    pages: {
      src: 'dist/js/pages/*.js'
    }
  };
};
