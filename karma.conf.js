/* eslint-disable */

// karma.conf.js
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'polyfill'],
    polyfill: ['Promise', 'fetch'],
    files: [
      'test/**/*.spec.js',
      {pattern: './src/**/*.js', watched: true, included: false}
    ],
    preprocessors: {
      './test/**/*.spec.js': ['webpack', 'sourcemap']
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
