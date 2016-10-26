// Lint ECMASCRIPT 
'use strict';

module.exports = function (grunt) {
  return {
    options: {
      configFile: 'build/js/.eslintrc'
    },
    target : 'build/js/src/*.js'
  };
};
