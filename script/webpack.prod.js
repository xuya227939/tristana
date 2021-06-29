const webpackBase = require('./webpack.base.conf');
const path = require('path');

const config = {
    // 配置源码显示方式
    mode: 'production',
    output: {
        filename: './js/[name].js?v=' + new Date().getTime(),
        hashDigestLength: 7,
        path: path.resolve('./', 'dist'),
        publicPath: ''
    },
    resolve: webpackBase.resolve,
    module: webpackBase.module,
    stats: webpackBase.stats,
    optimization: webpackBase.optimization,
    plugins: [
        webpackBase.plugins.cleanWebpack,
        webpackBase.plugins.html,
        webpackBase.plugins.miniCssExtract,
        webpackBase.plugins.progressBarPlugin,
        webpackBase.plugins.ContextReplacementPlugin,
        webpackBase.plugins.DefinePlugin,
        webpackBase.plugins.AntdDayjsWebpackPlugin,
        webpackBase.plugins.CopyPlugin
    ]
    // externals: webpackBase.externals
};

module.exports = config;
