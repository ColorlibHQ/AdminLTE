'use strict';

module.exports = function (grunt) {
  return {
      // If any .less file changes in directory "build/less/" run the "less"-task.
      // files: ["build/less/*.less", "build/less/skins/*.less", "dist/js/app.js"],
      files: [
        "build/scss/*.scss", 
        "build/scss/skins/*.scss", 
        "dist/js/app.js"
        ],
      tasks: ["sass", "uglify"]
    };
};
