'use strict';

const path = require('path');
const prodConfig = require('../config').build;

//拼接路径
function resolve(track) {
  return path.join(__dirname, '..', track);
}
//资源路径
function assetsPath(_path) {
  return path.join(prodConfig.staticPath, _path);
}

//webpack 基本设置

module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  resolve: {
    //模块解析规则
    extensions: ['.js', '.vue', '.json'],
    //别名映射
    alias: {
      // import Vue from 'vue/dist/vue.esm.js'可以写成 import Vue from 'vue'
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      utils: resolve('src/utils'),
      components: resolve('src/components'),
      public: resolve('public')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        include: resolve('src')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};
