'use strict';
var path = require('path');
var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var autoPrefixerBrowsers = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 31',
    'safari >= 6.1',
    'opera >= 23',
    'ios >= 6.1',
    'android >= 2.3',
    'bb >= 10'
];

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, 'client/App.dev.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.LoaderOptionsPlugin({
        debug: true,
        minimize: true,
        postcss: [
            autoprefixer({
                browsers: autoPrefixerBrowsers
            })
        ]
    })            
  ],
  resolve: {
    modules: [
      'web_modules',
      'node_modules',
      'client'
    ],
    extensions: ['.js', '.jsx', 'scss','jpg','svg']
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.(jsx|js)$/, loader: 'eslint-loader', exclude: /node_modules/ },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015", "stage-0", "react-hmre"],
          plugins: ["transform-decorators-legacy","transform-object-assign"]
        }
      }, 
      {
        test: /\.json?$/,
        loader: 'json-loader'
      }, 
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      },
      { test: /\.jpg$/, loader: "file-loader?name=[path][name].[ext]" },
      { test: /\.svg$/, loader: "file-loader?name=[path][name].[ext]" },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      },
      { test: /\.scss$/, 
        loader: ['style-loader?sourceMap', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']  
    }
    ]
  }
};

