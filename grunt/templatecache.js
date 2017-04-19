'use strict';

module.exports = function (path) {
    return {
        dist: {
            options : {
                module : "md-sheet",
                htmlmin: {
                    collapseBooleanAttributes:      true,
                    collapseWhitespace:             true,
                    removeAttributeQuotes:          true,
                    removeComments:                 true,
                    removeEmptyAttributes:          true,
                    removeRedundantAttributes:      true,
                    removeScriptTypeAttributes:     true,
                    removeStyleLinkTypeAttributes:  true
                }
            },
            files: [{
                src: ['views/md-sheet/*.html'],
                dest: 'dist/js/templates.js'
            }]
        }
    };
};