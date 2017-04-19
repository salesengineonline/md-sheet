'use strict';

module.exports = function (path) {
  return {
    dist: {
      src: [
        'dist/js/md-sheet.js','dist/js/templates.js'
      ],
      dest: 'dist/js/md-sheet.min.js'
    }
  };
};