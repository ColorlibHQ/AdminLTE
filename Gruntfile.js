// AdminLTE Gruntfile

module.exports = function (grunt) {

  'use strict';
  // Load all grunt tasks
  var configs = require('load-grunt-config')(grunt,{
    configPath: __dirname +  '/grunt-tasks',
    data:{
      pkg: grunt.file.readJSON("package.json")
    }
  });

  grunt.initConfig(configs);

  // Linting task
  grunt.registerTask('lint', ['jshint', 'csslint', 'bootlint']);

  // The default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
};
