'use strict';

module.exports = function (path) {
  return {
    dist: {
      files: [{
        expand: true,
        cwd: 'public/dist/styles/',
        src: ['*.css', '!*.min.css'],
        dest: 'public/dist/styles/'
      }]
    }
  };
};