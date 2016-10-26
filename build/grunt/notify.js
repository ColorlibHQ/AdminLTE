// Notify end of copilation tasks
'use strict';

module.exports = function (grunt) {
  return {
    watch: {
      options: {
        title  : 'Task Complete',  // optional
        message: 'SASS and Uglify finished running', //required
      }
    }
  };
};
