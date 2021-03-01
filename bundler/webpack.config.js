const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // webpack start building the bundle from this file
  entry: {
    path: path.resolve(__dirname, '../src/index.js')
  },

  // Webpack output name folder and bundle name
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.bundle.js'
  },

  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico')
    })
  ],

  module: {
    rules: [
      {
        // Javascript: use babel to transpile js and jsx files
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        type: 'javascript/auto'
      },
      {
        // Images: use asset/ressource module to copy images and put in static/images folder when you build
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: './static/images/[fullhash][ext][query]'
        }
      },
      {
        // Fonts: use asset/ressource module to copy images and put in static/fonts folder when you build
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: './static/fonts/[fullhash][ext][query]'
        }
      },
      {
        // Style: inject CSS into the head with source maps
        test: /\.(scss|sass|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: true }
          },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  // You can choose not to add file extensions when importing.
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};
