const path = require('path');
const webpackBase = require('./webpack.base.conf');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();

const config = {
    // 配置源码显示方式
    mode: 'production',
    entry: {
        app: ['./src/index.jsx']
    },
    output: {
        filename: './js/[name].[hash].js',
        hashDigestLength: 7,
        path: path.resolve('./', 'dist'),
        publicPath: './'
    },
    resolve: webpackBase.resolve,
    module: webpackBase.module,
    stats: webpackBase.stats,
    optimization: webpackBase.optimization,
    plugins: [
        webpackBase.plugins.cleanWebpack,
        webpackBase.plugins.html,
        webpackBase.plugins.miniCssExtract,
        webpackBase.plugins.optimizeCssAssets,
        webpackBase.plugins.progressBarPlugin,
        webpackBase.plugins.ContextReplacementPlugin,
        webpackBase.plugins.DefinePlugin,
        webpackBase.plugins.AntdDayjsWebpackPlugin
    ]
    // externals: webpackBase.externals
};

module.exports = smp.wrap(config);
