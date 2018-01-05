'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const prodConfig = require('../config').build;
const baseConf = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//资源路径
function assetsPath(_path) {
  return path.join(prodConfig.staticPath, _path);
}
const prodConf = merge(baseConf, {
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: prodConfig.publicPath,
    filename: assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: assetsPath('js/[name].[chunkhash].js')
  },
  devtool: prodConfig.devtoolType,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: prodConfig.vueloaderConf
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback: 'vue-style-loader'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader', 'postcss-loader'],
          fallback: 'vue-style-loader'
        })
      }
    ]
  },
  plugins: [
    //每个chunk头部添加hey,xc-cli!
    new webpack.BannerPlugin('hey,xc-cli'),

    //压缩js
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      compress: {
        warnings: false
      }
    }),

    //分离入口引用的css,不内嵌到js bundle中!

    new ExtractTextPlugin({
      filename: assetsPath('css/[name].[contenthash].css'),
      allChunks: false
    }),

    //压缩css
    new OptimizeCSSPlugin(),

    //根据模块相对路径生成四位数hash值作为模块id
    new webpack.HashedModuleIdsPlugin(),

    //作用域提升,提升代码在浏览器执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),

    //抽离公共模块,合成一个chunk,在最开始加载一次,便缓存使用,用于提升速度!

    // 1. 第三方库chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        //在node_modules的js文件!
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      }
    }),

    // 2. 缓存chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // 3.异步 公共chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      children: true,
      // (选择所有被选 chunks 的子 chunks)
      async: true,
      // (创建一个异步 公共chunk)
      minChunks: 3
      // (在提取之前需要至少三个子 chunk 共享这个模块)
    }),

    //将整个文件复制到构建输出指定目录下
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: prodConfig.staticPath,
        ignore: ['.*']
      }
    ]),

    //生成html
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../public/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      //根据依赖引入chunk
      chunksSortMode: 'dependency'
    })
  ]
});
module.exports = prodConf;
