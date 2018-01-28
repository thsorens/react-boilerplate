
'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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

var browsers = JSON.stringify({ browsers: autoPrefixerBrowsers });

module.exports = {
  entry: [
    path.join(__dirname, 'client/App.prod.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      'web_modules',
      'node_modules',
      'client'
    ],
    extensions: ['.js', '.jsx', 'scss','jpg','svg']
  },  
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }    
    }),    
    new ExtractTextPlugin({ filename: '[name][hash].css', disable: false, allChunks: true }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/index-prod.html',
      inject: 'body',
      filename: 'index-prod.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true,
        postcss: [
            autoprefixer({
                browsers: autoPrefixerBrowsers
            })
        ]
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ["es2015", "stage-0", "react"],
        plugins: ["transform-decorators-legacy","transform-object-assign"]        
      }
    }, {
      test: /\.json?$/,
      loader: 'json-loader'
    }, 
    { test: /\.scss$/, 
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader?sourceMap', use: 'css-loader?sourceMap&minimize!postcss-loader?sourceMap&' + browsers + '!sass-loader?sourceMap' })},        
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({fallback: 'style-loader?sourceMap', use: 'css-loader?sourceMap&modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader?sourceMap'})
    },
    { test: /\.jpg$/, loader: "file-loader?name=[path][name].[ext]" },
    { test: /\.svg$/, loader: "file-loader?name=[path][name].[ext]" },
    {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader'
    } 
    ]
  }
};