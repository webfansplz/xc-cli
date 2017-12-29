const path = require('path');
const config = require('../config');
const envConfig =
  process.env.NODE_ENV == 'production' ? config.build : config.dev;

//拼接路径
function resolve(track) {
  return path.join(__dirname, '..', track);
}

//webpack 基本设置

module.exports = {
  // context: path.resolve(__dirname, '../'),
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].js',
    publicPath: envConfig.publicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      utils: resolve('src/utils'),
      components: resolve('src/components'),
      public: resolve('public')
    }
  },
  devtool: envConfig.devtoolType
  // module: {
  //   rules: [
  //     {
  //       test: /\.vue$/,
  //       loader: 'vue-loader'
  //     },
  //     {
  //       test: /\.js$/,
  //       use: {
  //         loader: 'babel-loader'
  //       },
  //       include: resolve('src')
  //     }
  //   ]
  // }
};
