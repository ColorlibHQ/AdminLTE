// Validate CSS files
'use strict';

module.exports = function (grunt) {
	return {
		options: {
      csslintrc: 'build/less/.csslintrc'
    },
    dist: [
      'dist/css/AdminLTE.css',
    ]
  }

};
