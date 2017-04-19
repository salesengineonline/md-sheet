'use strict';

module.exports = function (path) {
    return {
        options: {
            mangle: false
        },
        dist: {
            files: [{
                expand: true,
                cwd: 'dist/js/',
                src: '*.js',
                dest: 'dist/js/'
            }]
        }
    };
};