"use strict";

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    goatee: {
      pkg: grunt.file.readJSON('package.json'),
      dist: './dist',
      src: './src'
    },
    concat: {
      dist: {
        src: ['src/main.js', 'src/utils.js', 'src/command_dispatcher.js', 'src/connection_manager.js'],
        dest: '<%= goatee.dist %>/<%= goatee.pkg.name %>'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= goatee.pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= goatee.dist %>/goatee.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      files: ['src/**/*.js'],
      tasks: ['concat']
    }
  });

  grunt.registerTask('default', ['concat', 'uglify']);
};