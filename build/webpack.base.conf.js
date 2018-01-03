'use strict';

const path = require('path');

//拼接路径
function resolve(track) {
  return path.join(__dirname, '..', track);
}

//webpack 基本设置

module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  // output: {
  //   path: path.resolve(__dirname, '../public'),
  //   filename: '[name].js'
  // },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      utils: resolve('src/utils'),
      components: resolve('src/components'),
      public: resolve('public')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        include: resolve('src')
      }
    ]
  }
};
