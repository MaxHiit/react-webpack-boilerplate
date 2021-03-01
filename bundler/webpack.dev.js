const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const webpackCommon = require('./webpack.config.js');

module.exports = merge(webpackCommon, {
  // Set the mode to development
  mode: 'development',

  // Control how source maps are generated in development
  devtool: 'eval-cheap-source-map',

  // Run webpack-dev-server
  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    open: true,
    noInfo: true,
    overlay: {
      errors: true
    },
    hot: true,
    compress: true
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin()
  ]
});
