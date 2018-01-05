'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const devConfig = require('../config').dev;
const baseConf = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const devConf = merge(baseConf, {
  output: {
    filename: '[name].js',
    publicPath: devConfig.publicPath
  },
  devtool: devConfig.devtoolType,
  devServer: {
    clientLogLevel: 'warning',
    // 热加载
    hot: true,
    //自动刷新
    inline: true,
    //自动打开浏览器
    open: true,
    //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    historyApiFallback: true,
    //主机名
    host: devConfig.host,
    //端口号
    port: devConfig.port,
    //配置反向代理解决跨域
    proxy: devConfig.proxyTable,
    //为你的代码进行压缩。加快开发流程和优化的作用
    compress: true,
    // 在浏览器上全屏显示编译的errors或warnings。
    overlay: {
      errors: true,
      warnings: false
    },
    // 终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的
    quiet: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: devConfig.vueloaderConf
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //开启HMR
    new webpack.HotModuleReplacementPlugin(),

    //显示模块相对路径
    new webpack.NamedModulesPlugin(),

    //编译出错时,该插件可跳过输出,确保输出资源不会包含错误!
    // new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      title: 'hello,xc-cli!',
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),

    //编译提示插件
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${devConfig.host}:${
            devConfig.port
          }`
        ]
      },
      onErrors: function(severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        const filename = error.file.split('!').pop();

        notifier.notify({
          title: 'xc-cli',
          message: severity + ': ' + error.name,
          subtitle: filename || '',
          icon: path.join(__dirname, 'logo.png')
        });
      }
    })
  ]
});
module.exports = devConf;
