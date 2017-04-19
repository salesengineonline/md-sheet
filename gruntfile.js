'use strict';

var path = require('path');
var argv = require('yargs').argv;
var webpack = require('webpack');

module.exports = function (grunt) {
    /** Load all grunt related task */
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        /** JShint task */
        jshint: require('./grunt/jshint')(path),

        /** Less task */
        less: require('./grunt/less')(path),

        /** Connect task */
        connect: require('./grunt/connect')(path),

        /** Watch task */
        watch: require('./grunt/watch')(path),

        /** Copy task */
        copy: require('./grunt/copy')(path),

        /** concat task */
        concat: require('./grunt/concat')(path),

        /** Clean task */
        clean: require('./grunt/clean')(path),

        /** Cssmin task */
        cssmin: require('./grunt/cssmin')(path),

        /** uglify task */
        uglify: require('./grunt/uglify')(path),

        /** templatecache task */
        ngtemplates: require('./grunt/templatecache')(path)
    });

    /**
     * serve task
     * @usage: grunt serve
     */
    grunt.registerTask('serve', [
        'jshint',
        'less',
        'autoprefixer',
        'clean:bundles',
        'connect:src',
        'watch'
    ]);

    /**
     * dist task
     * if --min flag is present, all javascript, stylesheet, html and image file
     * will be minified and compress
     * @usage: grunt dist / grunt dist --min
     */
    var distTask = ['clean:dist','copy:dist'];

    /** if --min flag is present */
    if (argv.min) {
        distTask.push('less','cssmin:dist','ngtemplates:dist', 'uglify:dist','concat:dist');
    }

    grunt.registerTask('dist', distTask);
};