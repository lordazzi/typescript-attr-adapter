module.exports = function (config) {
    config.set({

        basePath: '',

        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-typescript'),
            require('karma-typescript-preprocessor'),
            require('karma-systemjs')
        ],
        frameworks: [
            'systemjs', 'jasmine'
        ],

        files: [
            { pattern: './src/test.ts', watched: false }
        ],

        preprocessors: {
            './src/test.ts': ['typescript']
        },

        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },

        typescriptPreprocessor: {
            // options passed to the typescript compiler 
            options: {
                noImplicitAny: true,
                declaration: true,
                emitDecoratorMetadata: true,
                strictNullChecks: false,
                experimentalDecorators: true,
                lib: [
                    "es6",
                    "dom"
                ],
                module: "commonjs",
                moduleResolution: "node",
                sourceMap: false,
                target: "es5"
            },
        },

        systemjs: {

            serveFiles: [],

            config: {
                transpiler: 'typescript',
                packages: {
                    src: {
                        defaultExtension: 'ts'
                    }
                }
            }
        },

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
