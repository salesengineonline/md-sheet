'use strict';

module.exports = function (path) {
    return {
        src: {
            options: {
                jshintrc: '.jshintrc',
                reporterOutput: ''
            },
            src: [
                'gruntfile.js',
                'grunt/*.js',
                'js/*.js',
            ]
        }
    };
};