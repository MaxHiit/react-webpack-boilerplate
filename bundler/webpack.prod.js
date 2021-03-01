/* eslint-disable max-len */
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerplugin = require('css-minimizer-webpack-plugin');
const webpackCommon = require('./webpack.config.js');

module.exports = merge(webpackCommon, {
  // Set the mode to production
  mode: 'production',

  // Control how source maps are generated in production
  devtool: 'source-map',

  plugins: [
    // Extracts CSS into separate files in style folder when you build
    // Note: style-loader is for development, MiniCssExtractPlugin is for production
    new MiniCssExtractPlugin({
      filename: './style/style.[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerplugin(), '...'],
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    // runtimeChunk: {
    //   name: "runtime",
    // },
  },
});
