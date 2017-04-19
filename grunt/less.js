'use strict';

module.exports = function (path) {
  return {
    app: {
      files: {
        'dist/styles.css': 'styles/md-sheet.less'
      }
    }
  };
};