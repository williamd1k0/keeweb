/* eslint-env node */

const path = require('path');

const webpack = require('webpack');

const StringReplacePlugin = require('string-replace-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json');

function config(grunt, mode = 'production') {
    const date = grunt.config.get('date');
    const dt = date.toISOString().replace(/T.*/, '');
    const year = date.getFullYear();
    return {
        mode: mode,
        entry: {
            app: 'index',
            vendor: [
                'redux',
                'redux-thunk',
                'reselect',
                'preact',
                'preact-redux',
                'kdbxweb',
                'baron',
                'pikaday',
                'jsqrcode',
                'argon2-wasm',
                'argon2',
            ],
        },
        output: {
            path: path.resolve('.', 'tmp/js'),
            filename: '[name].js',
        },
        target: 'web',
        performance: {
            hints: false,
        },
        stats: {
            colors: false,
            modules: true,
            reasons: true,
        },
        progress: false,
        failOnError: true,
        resolve: {
            modules: [path.join(__dirname, 'app/scripts'), path.join(__dirname, 'node_modules')],
            alias: {
                react: 'preact',
                'react-dom': 'preact',
                'react-redux': 'preact-redux',
                kdbxweb: 'kdbxweb/dist/kdbxweb.js',
                baron: 'baron/baron.min.js',
                pikaday: 'pikaday/pikaday.js',
                qrcode: 'jsqrcode/dist/qrcode.min.js',
                argon2: 'argon2-browser/dist/argon2.min.js',
                'argon2-wasm': 'argon2-browser/dist/argon2.wasm',
                resources: path.join(__dirname, 'app/resources'),
                locales: path.join(__dirname, 'app/locales'),
                'babel-helpers': path.join(__dirname, 'app/lib/babel-helpers'),
            },
        },
        module: {
            rules: [
                {
                    test: /store\/env\/init\.js$/,
                    loader: StringReplacePlugin.replace({
                        replacements: [
                            {
                                pattern: /@@VERSION/g,
                                replacement: () => pkg.version,
                            },
                            { pattern: /@@DATE/g, replacement: () => dt },
                            {
                                pattern: /@@COMMIT/g,
                                replacement: () =>
                                    grunt.config.get('gitinfo.local.branch.current.shortSHA') || '',
                            },
                        ],
                    }),
                },
                {
                    test: /baron(\.min)?\.js$/,
                    loader: 'exports-loader?baron; delete window.baron;',
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        envName: mode,
                    },
                },
                {
                    test: /argon2\.wasm/,
                    type: 'javascript/auto',
                    loader: 'base64-loader',
                },
                { test: /argon2(\.min)?\.js/, loader: 'raw-loader' },
                { test: /\.scss$/, loader: 'raw-loader' },
                {
                    test: /\.svg$/,
                    use: [
                        { loader: 'babel-loader', options: { presets: ['@babel/preset-react'] } },
                        { loader: 'react-svg-loader', options: { jsx: true } },
                    ],
                },
            ],
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                    },
                },
            },
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    terserOptions: {
                        ie8: false,
                        safari10: false,
                        mangle: true,
                        module: false,
                        output: null,
                    },
                }),
                new BundleAnalyzerPlugin({
                    openAnalyzer: false,
                    analyzerMode: 'static',
                    reportFilename: '../stats/analyzer_report.html',
                    generateStatsFile: true,
                    statsFilename: '../stats/stats.json',
                }),
            ],
        },
        plugins: [
            new webpack.BannerPlugin(
                'keeweb v' +
                    pkg.version +
                    ', (c) ' +
                    year +
                    ' ' +
                    pkg.author.name +
                    ', opensource.org/licenses/' +
                    pkg.license
            ),
            new webpack.IgnorePlugin(/^(moment)$/),
            new StringReplacePlugin(),
        ],
        node: {
            console: false,
            process: false,
            crypto: false,
            Buffer: false,
            __filename: false,
            __dirname: false,
            fs: false,
            setImmediate: false,
            path: false,
        },
        externals: {
            xmldom: 'null',
            crypto: 'null',
            fs: 'null',
            path: 'null',
        },
    };
}

function devServerConfig(grunt) {
    const devServerConfig = config(grunt, 'development');
    Object.assign(devServerConfig, {
        devtool: 'source-map',
    });
    Object.assign(devServerConfig.resolve.alias, {
        baron: 'baron/baron.js',
        qrcode: 'jsqrcode/dist/qrcode.js',
        argon2: 'argon2-browser/dist/argon2.js',
        react: 'preact-compat',
        'react-dom': 'preact-compat',
    });
    return devServerConfig;
}

module.exports.config = config;
module.exports.devServerConfig = devServerConfig;
