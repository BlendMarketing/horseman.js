/* eslint-disable */

// karma.conf.js
module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        files: [
            {pattern: 'src/__tests__/*-test.js*', watched: false, included: true, served: true}
        ],
        preprocessors: {
            'src/__tests__/*-test.js*': ['babel']
        },
        reporters: ['dots'],
        babelPreprocessor: {
            options: {
                presets: ['es2015', 'stage-2', 'react'],
            },
        },
    });
};
