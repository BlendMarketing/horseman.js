/* eslint-disable */

// karma.conf.js
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        files: [
            {pattern: './src/**/*.spec.js', watched: false, included: true, served: true}
        ],
        preprocessors: {
            './src/**/*.spec.js': ['webpack']
        },
        reporters: ['mocha'],
        webpack: Object.assign(webpackConfig, {
          externals: {
            cheerio: 'window',
            'react/addons': 'react',
            'react/lib/ExecutionEnvironment': 'react',
            'react/lib/ReactContext': 'react',
          },
        }),
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true
        }
    });
};
