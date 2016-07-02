// AdminLTE Gruntfile

module.exports = function (grunt) {

  'use strict';
  //loading the configurations and grunt tasks
  var configs = require('load-grunt-config')(grunt,{
    configPath: __dirname +  '/build/grunt-tasks',
    data:{
      // Metadata.
      pkg: grunt.file.readJSON('package.json'),
      banner: '/*!\n' +
      ' * AdminLTE v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
      ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Project website Almsaeed Studio (https://almsaeedstudio.com)\n' +
      ' * Licensed under MIT (https://github.com/almasaeed2010/AdminLTE/blob/master/LICENSE)\n' +
      ' */\n'
    }
  });

  grunt.initConfig(configs);

  // Linting task
  grunt.registerTask('lint', ['jscs', 'eslint', 'csslint', 'bootlint'])
  // JS Build Task
  grunt.registerTask('build-js', ['babel', 'concat', 'uglify'])
  // The default task (running 'grunt' in console) is 'watch'
  grunt.registerTask('default', ['watch'])
}
