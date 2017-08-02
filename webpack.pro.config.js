/**
 * Created by NieFZ on 2017/5/8.
 */
const glob = require('glob');
const path = require('path');
const buildPath = path.resolve(__dirname, 'dist');
const APP_PATH = path.resolve(__dirname, 'src');
const config = require('./webpack.base.config');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer');

const entryHtml = glob.sync(`${APP_PATH}/**/index.html`);
const htmlWebpackPlugins = () => {
  const htmlPlugins = [];
  entryHtml.forEach((filePath) => {
    let filename = /.*\/(.*)\/(index.html)\.*/.exec(filePath)[1];
    filename = filename === 'src' ? 'index' : filename + '/index';
    const htmlPluginConfig = {
      filename: `${filename}.html`,
      template: `${filePath}`,
      chunksSortMode: 'dependency',
      inject: 'body',
      base: '/',
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      }
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
    path: buildPath
  },
  plugins: [
    new CleanPlugin(buildPath),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      preserveComments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      }
    }),
    new BundleAnalyzer.BundleAnalyzerPlugin(),
    // new WebpackSftpClient({
    //   port: '22',
    //   host: '',
    //   username: '',
    //   password: '',
    //   path: buildPath,
    //   remotePath: '',
    //   verbose: true
    // }),
  ].concat(htmlWebpackPlugins())
});