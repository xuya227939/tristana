const webpackBase = require('./webpack.base.conf');

module.exports = {
    // 配置源码显示方式
    devtool: 'eval-source-map',
    mode: 'development',
    entry: {
        app: ['./src/index.jsx']
    },
    resolve: webpackBase.resolve,
    module: webpackBase.module,
    stats: webpackBase.stats,
    optimization: webpackBase.optimization,
    plugins: [
        webpackBase.plugins.html,
        webpackBase.plugins.miniCssExtract,
        webpackBase.plugins.optimizeCssAssets,
        webpackBase.plugins.ContextReplacementPlugin,
        webpackBase.plugins.DefinePlugin,
        webpackBase.plugins.AntdDayjsWebpackPlugin,
        webpackBase.plugins.ReactRefreshWebpackPlugin
        // webpackBase.plugins.HotModuleReplacementPlugin
    ],
    devServer: webpackBase.devServer,
    watchOptions: webpackBase.watchOptions
    // externals: webpackBase.externals
};
