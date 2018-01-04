'use strict';
//node loading
const ora = require('ora');
// rm-rf for node
const rm = require('rimraf');
//console for node
const chalk = require('chalk');
//
const path = require('path');

const webpack = require('webpack');
//webpack production setting
const config = require('./webpack.prod.conf');

const rmFile = path.resolve(__dirname, '../public/static');

const spinner = ora('building for production...');
spinner.start();

rm(rmFile, function(err) {
  if (err) throw err;
  webpack(config, function(err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    );

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(
      chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
          "  Opening index.html over file:// won't work.\n"
      )
    );
  });
});
