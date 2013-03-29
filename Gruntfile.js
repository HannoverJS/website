module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      all: ['tests/**/*.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.registerTask('default', ['qunit']);
};
