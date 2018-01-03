'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const prodConfig = require('../config').build;
const baseConf = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const prodConf = merge(baseConf, {
  output: {
    publicPath: prodConfig.publicPath
  },
  devtool: prodConfig.devtoolType,
  plugins: [
    //每个trunk头部添加hey,xc-cli!
    new webpack.BannerPlugin('hey,xc-cli'),

    //压缩js
    new UglifyJsPlugin({
      parallel: true
    })
  ]
});
