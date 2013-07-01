module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['gruntfile.js', 'src/underscore-template-fetcher.js', 'test/test.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  // Load all the NPM modules
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-shell');

  // Register Tasks
  grunt.registerTask('default', ['jshint', 'qunit']);

  // Server Task
  grunt.registerTask('serve', 'Serves any directory on given port', function (env) {
    var shell = require('shelljs');
    var port  = grunt.option('port') || 8000;
    var dir   = grunt.option('dir')  || '.';
    console.log(['Serving', dir,'on port:', port].join(' '))
    shell.exec('cd '+ dir +' && python -m SimpleHTTPServer ' + port);
  });

};