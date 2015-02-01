'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      // if any .less file changes in directory "build/less/" run the "less"-task.
      files: ["build/less/*.less", "build/less/skins/*.less"],
      tasks: ["less"]
    },
    // "less"-task configuration
    less: {
      //Development not compressed
      development: {
        options: {
          // Specifies directories to scan for @import directives when parsing. 
          // Default value is the directory of the source, which is probably what you want.
          paths: ["dist/css/"],
          compress: false
        },
        files: {
          // compilation.css  :  source.less
          "dist/css/AdminLTE.css": "build/less/AdminLTE.less"
        }
      },
      //production compresses version
      production: {
        options: {
          // Specifies directories to scan for @import directives when parsing. 
          // Default value is the directory of the source, which is probably what you want.
          paths: ["dist/css/"],
          compress: true
        },
        files: {
          // compilation.css  :  source.less
          "dist/css/AdminLTE.min.css": "build/less/AdminLTE.less"
        }
      }
    }
  });
  // the default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
};