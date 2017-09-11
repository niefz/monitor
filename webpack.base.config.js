/**
 * Created by NieFZ on 2017/5/8.
 */
const glob = require('glob');
const path = require('path');
const MODULES_PATH = path.resolve(__dirname, 'node_modules');
const APP_PATH = path.resolve(__dirname, 'src');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * 多页面
 */
const entries = {};
const entryJs = glob.sync(`${APP_PATH}/**/index.js`);
entryJs.forEach((filePath) => {
  let filename = /.*\/(.*)\/(index.js)\.*/.exec(filePath)[1];
  filename = filename === 'src' ? 'index' : filename + '/index';
  entries[filename] = filePath;
});

module.exports = {
  entry: Object.assign(
    entries,
    {
      'common/vendor': ['vue', 'vue-router']
    }
  ),
  output: {
    filename: 'assets/js/[name].min.js?v=[hash:8]',
    chunkFilename: 'assets/js/[name].min.js?v=[chunkhash:8]',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html',
          },
          {
            loader: 'htmllint'
          }
        ]
      },
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint'
          }
        ],
        include: APP_PATH,
        exclude: [MODULES_PATH]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: [MODULES_PATH]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue',
            options: {
              loaders: {
                js: 'babel',
                css: ExtractTextPlugin.extract({
                  fallback: 'vue-style',
                  use: [
                    {
                      loader: 'css',
                      options: {
                        minimize: true
                      }
                    }
                  ]
                }),
                sass: ExtractTextPlugin.extract({
                  fallback: 'vue-style',
                  use: [
                    {
                      loader: 'css',
                      options: {
                        importLoaders: 1,
                        minimize: true
                      }
                    },
                    {
                      loader: 'sass'
                    }
                  ]
                })
              }
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            {
              loader: 'css',
              options: {
                importLoaders: 2,
                minimize: true
              }
            },
            {
              loader: 'postcss',
            },
            {
              loader: 'sass'
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url',
            options: {
              limit: 8192,
              name: 'assets/images/[name].[ext]?v=[hash:8]'
            }
          },
          {
            loader: 'image-webpack',
            query: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: true
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: '60-80',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'file',
            options: {
              limit: 8192,
              name: 'assets/fonts/[name].[ext]?v=[hash:8]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Vue: 'vue',
      VueRouter: 'vueRouter',
      highcharts: 'highCharts',
      axios: 'httpAxios',
      api: 'api',
      util: 'util',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common/common', 'common/vendor'],
      minChunks: 2
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].min.css?v=[hash:8]',
      allChunks: true,
    }),
  ],
  resolve: {
    modules: [MODULES_PATH],
    extensions: ['.js', '.vue', '.scss', '.css', '.png', '.jpg', '.json'],
    alias: {
      vue: `${MODULES_PATH}/vue/dist/vue.js`,
      vueRouter: `${MODULES_PATH}/vue-router/dist/vue-router.js`,
      highCharts: `${MODULES_PATH}/highCharts/highCharts.js`,
      httpAxios: `${APP_PATH}/config/interceptor.config.js`,
      api: `${APP_PATH}/config/api.config.js`,
      util: `${APP_PATH}/config/util.config.js`,
      assets: `${APP_PATH}/assets/`,
      components: `${APP_PATH}/components/`,
      config: `${APP_PATH}/config`,
      scss: `${APP_PATH}/scss`,
      templates: `${APP_PATH}/templates/`
    }
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  }
};