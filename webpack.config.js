/* eslint-env node */

const path = require('path');

const webpack = require('webpack');

const StringReplacePlugin = require('string-replace-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json');

function config(grunt) {
    const date = grunt.config.get('date');
    const dt = date.toISOString().replace(/T.*/, '');
    const year = date.getFullYear();
    return {
        mode: 'production',
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
                                replacement: () => grunt.config.get('gitinfo.local.branch.current.shortSHA') || '',
                            },
                        ],
                    }),
                },
                {
                    test: /baron(\.min)?\.js$/,
                    loader: 'exports-loader?baron; delete window.baron;',
                },
                { test: /pikaday\.js$/, loader: 'uglify-loader' },
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: { cacheDirectory: true },
                },
                {
                    test: /argon2\.wasm/,
                    type: 'javascript/auto',
                    loader: 'base64-loader',
                },
                { test: /argon2(\.min)?\.js/, loader: 'raw-loader' },
                { test: /\.scss$/, loader: 'raw-loader' },
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
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
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
    const devServerConfig = config(grunt);
    Object.assign(devServerConfig, {
        mode: 'development',
        devtool: 'source-map',
    });
    Object.assign(devServerConfig.resolve.alias, {
        baron: 'baron/baron.js',
        qrcode: 'jsqrcode/dist/qrcode.js',
        argon2: 'argon2-browser/dist/argon2.js',
    });
    return devServerConfig;
}

module.exports.config = config;
module.exports.devServerConfig = devServerConfig;
