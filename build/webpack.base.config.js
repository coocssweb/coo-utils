const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {resolve} = require('./utils');

module.exports = function webpackBaseConfig (NODE_ENV = 'development') {
    let plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['index'],
            hash: false,
            inject: 'body',
            xhtml: false,
            minify: {
                removeComments: true,
            }
        })
    ];

    const webpackConfig = {
        entry: {
            index: './index.js'
        },
        output: {
            path: resolve('../dist'),
            publicPath: '',
            filename: '[name].js',
            chunkFilename: '[name].js'
        },
        externals: {

        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules)/,
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
            ]
        },
        plugins,
        resolve: {
            alias: {

            },
        },
    };

    // 开发环境服务器配置
    if (NODE_ENV === 'development') {
        webpackConfig.devServer = {
            contentBase: resolve('dist'),
            compress: false,
            host: '127.0.0.1',
            port: '7777',
            hot: true,                                  // 热启动
            disableHostCheck: true,
            historyApiFallback: true
        };

        // webpack watch 配置
        webpackConfig.watchOptions = {
            poll: 500,
            aggregeateTimeout: 500,
            ignored: 'node_modules'
        };
    } else {
        webpackConfig.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    dead_code: true
                },
                sourceMap: false,
                output: {
                    comments: false
                }
            })
        );
    }

    return webpackConfig;
};
