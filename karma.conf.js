/* eslint-disable */

// karma.conf.js
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        files: [
            {pattern: './src/**/*-test.js*', watched: false, included: true, served: true}
        ],
        preprocessors: {
            './src/**/*-test.js*': ['webpack']
        },
        reporters: ['dots'],
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true
        }
    });
};
