'use strict';

module.exports = function (path) {
  return {
    js: {
      files: [
        'gruntfile.js',
        'grunt/*.js',
        'src/*.js'
      ],
      tasks: ['jshint', 'clean:bundles','concat:dist', 'copy:dist','ngtemplates:dist'],
      options: {
        spawn : false,
        livereload: true
      }
    },
    less: {
      files: [
        'styles/*.less'
      ],
      tasks: ['less', 'autoprefixer', 'clean:bundles','concat:dist', 'copy:dist'],
      options: {
        spawn : false,
        livereload: true
      }
    },
    livereload: {
      options: {
        spawn : false,
        livereload: true
      },
      files: [
        'views/md-sheet/**/*.html',
        './**/*.{png,jpg,jpeg,gif,webp,svg}'
      ],
      tasks : ['ngtemplates:dist']
    }
  };
};