const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    stats: {
        entrypoints: false,
        children: false
    },
    cache: {
        type: 'filesystem',
        // 可选配置
        buildDependencies: {
            // eslint-disable-next-line no-undef
            config: [__filename] // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
        },
        name: ''
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
        splitChunks: { chunks: 'all' }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less', '.json'],
        alias: {
            '@mobx': path.resolve(__dirname, '../src/mobx/'),
            '@src': path.resolve(__dirname, '../src/'),
            '@components': path.resolve(__dirname, '../src/components/'),
            '@assets': path.resolve(__dirname, '../src/assets/'),
            '@locales': path.resolve(__dirname, '../src/locales/'),
            '@utils': path.resolve(__dirname, '../src/utils/'),
            '@servers': path.resolve(__dirname, '../src/servers/'),
            '@pages': path.resolve(__dirname, '../src/pages/'),
            '@mock': path.resolve(__dirname, '../src/mock/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: true,
                    emitWarning: true,
                    failOnError: true
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                use: [
                    process.env.ENV_LWD == 'development'
                        ? {
                              loader: 'style-loader'
                          }
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: './assets/images',
                    publicPath: '../assets/images/',
                    esModule: false
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                // loader: 'file-loader',
                // options: {
                //     esModule: false
                // }
                type: 'asset/inline'
            }
        ]
    },
    plugins: {
        // 配置入口页面
        html: new HtmlWebpackPlugin({
            title: 'tristana',
            template: 'public/index.html',
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }),
        // 清理dist包
        cleanWebpack: new CleanWebpackPlugin(),
        // 抽取css
        miniCssExtract: new MiniCssExtractPlugin({
            filename:
                process.env.ENV_LWD == 'development'
                    ? './css/[name].css'
                    : './css/[name].[contenthash].css',
            chunkFilename:
                process.env.ENV_LWD == 'development'
                    ? './css/[id].css'
                    : './css/[id].[contenthash].css',
            ignoreOrder: true
        }),
        // 生成包依赖图
        bundleAnalyzer: new BundleAnalyzerPlugin({
            analyzerPort: 8081
        }),
        // 打包进度
        progressBarPlugin: new ProgressBarPlugin(),
        // 加载中文包
        ContextReplacementPlugin: new webpack.ContextReplacementPlugin(/moment\/locale$/, /zh-cn/),
        CompressionPlugin: new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.ts$|\.tsx$|\.js$|\.jsx$|\.css$|\.less$|\.html$/,
            threshold: 10240
        }),
        // 替换ant moment
        AntdDayjsWebpackPlugin: new AntdDayjsWebpackPlugin(),
        DefinePlugin: new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.ENV_LWD)
        }),
        CopyPlugin: new CopyPlugin({
            patterns: [
                {
                    from: './src/assets/js',
                    to: '../dist/assets/js',
                    toType: 'dir',
                    noErrorOnMissing: true
                }
            ]
        }),
        HotModuleReplacementPlugin: new webpack.HotModuleReplacementPlugin()
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        historyApiFallback: true,
        compress: true
    },
    watchOptions: {
        aggregateTimeout: 600
    },
    // externals 排除对应的包，注：排除掉的包必须要用script标签引入下
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'socket.io-client': 'io'
    }
};
