/* eslint-disable */

// karma.conf.js
module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        files: [
            {pattern: '__tests__/*-test.js*', watched: false, included: true, served: true}
        ],
        preprocessors: {
            '__tests__/*-test.js*': ['babel']
        },
        reporters: ['dots'],
        babelPreprocessor: {
            options: {
                presets: ['es2015', 'stage-2', 'react'],
            },
        },
    });
};
