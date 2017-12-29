const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../config');
const baseConf = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConf = merge(baseConf, {
  devServer: {
    clientLogLevel: 'warning',
    // 热模块更新
    hot: true,
    //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    historyApiFallback: true,
    //地址
    host: config.dev.host,
    //设置默认监听端口
    port: config.dev.port,
    //配置反向代理解决跨域
    proxy: config.dev.proxyTable,
    //为你的代码进行压缩。加快开发流程和优化的作用
    compress: true,
    quiet: true,
    inline: true
  },
  plugins: [
    new webpack.BannerPlugin('hey,xc-cli'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
});
module.exports = devConf;
