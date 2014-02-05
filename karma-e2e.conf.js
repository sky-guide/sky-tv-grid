module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['ng-scenario'],

        files: ['test/e2e/**/*.js'],
        exclude: [],

        port: 9003,

        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],

        singleRun: true,

        proxies: {
            '/': 'http://localhost:9001/'
        },

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-scenario'
        ],

        junitReporter : {
            outputFile: 'test_out/e2e.xml',
            suite: 'e2e'
        }
    });
};
