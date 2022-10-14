'use strict';

const merge = require('webpack-merge');
const webpackCommon = require('./webpack-common.config');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = merge(webpackCommon, {
  mode: 'production',
  entry: {
    index: './src/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }]
      },
      {
        test: /\.(woff|ttf|ico|woff2|jpg|jpeg|png|svg|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: Math.Infinity
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom'
  },

  devtool: 'none'
});
