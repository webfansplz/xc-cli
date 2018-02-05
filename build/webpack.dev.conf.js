"use strict";
//引入node path路径模块
const path = require("path");
//引入webpack
const webpack = require("webpack");
//引入webpack开发环境配置参数
const devConfig = require("../config").dev;
//引入webpack基本配置
const baseConf = require("./webpack.base.conf");
//一个webpack配置合并模块,可简单的理解为与Object.assign()功能类似！
const merge = require("webpack-merge");
//一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require("html-webpack-plugin");
//一个编译提示的webpack插件！
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
//发送系统通知的一个node模块！
const notifier = require("node-notifier");
//将webpack基本配置与开发环境配置合并！
const devConf = merge(baseConf, {
  //项目出口,webpack-dev-server 生成的包并没有写入硬盘,而是放在内存中！
  output: {
    //文件名
    filename: "[name].js",
    //html引用资源路径,在dev-server中,引用的是内存中文件！
    publicPath: devConfig.publicPath
  },
  //生成sourceMaps(方便调试)
  devtool: devConfig.devtoolType,
  //
  //启动一个express服务器,使我们可以在本地进行开发！！！
  devServer: {
    //HMR控制台log等级
    clientLogLevel: "warning",
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
    //处理模块的规则(可在此处使用不同的loader来处理模块！)
    rules: [
      //使用vue-loader处理以vue结尾的文件！
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: devConfig.vueloaderConf
      },
      //使用vue-style-loader!css-loader!postcss-loader处理以css结尾的文件！
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      //使用vue-style-loader!css-loader!postcss-loader处理以less结尾的文件！
      {
        test: /\.less$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //开启HMR(热替换功能,替换更新部分,不重载页面！)
    new webpack.HotModuleReplacementPlugin(),

    //显示模块相对路径
    new webpack.NamedModulesPlugin(),

    //编译出错时,该插件可跳过输出,确保输出资源不会包含错误!
    // new webpack.NoEmitOnErrorsPlugin(),

    //配置html入口信息
    new HtmlWebpackPlugin({
      title: "hello,xc-cli!",
      filename: "index.html",
      template: "index.html",
      //js资源插入位置,true表示插入到body元素底部
      inject: true
    }),

    //编译提示插件
    new FriendlyErrorsPlugin({
      //编译成功提示！
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${devConfig.host}:${devConfig.port}`
        ]
      },
      //编译出错！
      onErrors: function(severity, errors) {
        if (severity !== "error") {
          return;
        }
        const error = errors[0];
        const filename = error.file.split("!").pop();
        //编译出错时,右下角弹出错误提示！
        notifier.notify({
          title: "xc-cli",
          message: severity + ": " + error.name,
          subtitle: filename || "",
          icon: path.join(__dirname, "xc-cli.png")
        });
      }
    })
  ]
});
module.exports = devConf;
