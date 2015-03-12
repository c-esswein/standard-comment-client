var path = require('path');

module.exports = function(grunt) {
  'use strict';

  // Initializes Plovr Configuration file
  grunt.task.registerTask('initConfig', 'Initializes config variables.', function() {
    // Some other task  where you can do some initialization
  });

  // Config is stored in the grunt-tasks/ folder - check out aliases.json first, task list is stored in the package.json file
  require('load-grunt-config')(grunt, {
    data: {
      assetPath: 'asset',
      buildPath: 'build',
    },
    configPath: path.join(process.cwd(), 'build/grunt-tasks'),
      loadGruntTasks: {
        pattern: ['grunt-*']
      }
  });
};
