const _path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//vue-loader基本配置
const baseVueLoaderConf = {
  //引入postcss插件
  postcss: {
    config: {
      path: _path.resolve("../")
    }
  },
  //转为require调用,让webpack处理目标资源!
  transformToRequire: {
    video: "src",
    source: "src",
    img: "src",
    image: "xlink:href"
  }
};

//vue-loader 开发环境配置
const devVueLoaderConf = Object.assign({}, baseVueLoaderConf, {
  //loaders
  loaders: {
    css: ["vue-style-loader", "css-loader"],
    less: ["vue-style-loader", "css-loader", "postcss-loader", "less-loader"]
  },
  cssSourceMap: true
});

//vue-loader 生产环境配置
const buildVueLoaderConf = Object.assign({}, baseVueLoaderConf, {
  //loaders
  loaders: ExtractTextPlugin.extract({
    use: ["css-loader", "postcss-loader", "less-loader"],
    fallback: "vue-style-loader"
  }),
  cssSourceMap: false
});

//开发/生产环境 配置参数！
module.exports = {
  dev: {
    publicPath: "/",
    devtoolType: "cheap-module-eval-source-map",
    vueloaderConf: devVueLoaderConf,
    host: "localhost",
    port: "1234",
    proxyTable: {}
  },
  build: {
    publicPath: "/",
    devtoolType: "source-map",
    vueloaderConf: buildVueLoaderConf,
    staticPath: "static"
  }
};
