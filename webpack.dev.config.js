/**
 * Created by NieFZ on 2017/5/8.
 */
const glob = require('glob');
const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');
const config = require('./webpack.base.config');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const htmlWebpackPlugins = () => {
  const htmlPlugins = [];
  const entryHtml = glob.sync(`${APP_PATH}/**/index.html`);
  entryHtml.forEach((filePath) => {
    let filename = /.*\/(.*)\/(index.html)\.*/.exec(filePath)[1];
    filename = filename === 'src' ? 'index' : filename + '/index';
    const htmlPluginConfig = {
      filename: `${filename}.html`,
      template: `${filePath}`,
      chunksSortMode: 'dependency',
      inject: 'body',
      base: '/'
    };
    if (filename in config.entry) {
      htmlPluginConfig.chunks = ['common/vendor', 'common/common', filename];
    }
    htmlPlugins.push(new HtmlWebpackPlugin(htmlPluginConfig));
  });
  return htmlPlugins;
};

module.exports = webpackMerge(config, {
  output: {
    path: APP_PATH
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    compress: true,
    contentBase: APP_PATH,
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    inline: true,
    // quiet: true,
    port: 3033,
    publicPath: "/",
    stats: {
      assets: true,
      colors: true,
      errors: true,
      errorDetails: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new OpenBrowserPlugin({url: 'http://localhost:3033/performance/'})
  ].concat(htmlWebpackPlugins())
});