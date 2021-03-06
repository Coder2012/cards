const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const fontsInput = 'fonts'
const fontsOutput = 'fonts'
const imagesInput = 'images'
const imagesOutput = 'images'

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: 'dist',
    inline: true
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'standard-loader',
      exclude: /(node_modules|bower_components)/,
      options: {
        error: false,
        snazzy: true
      }
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader"],
        publicPath: "/dist"
      })
    },
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { modules: false }]
          ]
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Deck of Cards',
      hash: true,
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: `${imagesInput}`, to: `${imagesOutput}` },
      { from: `${fontsInput}`, to: `${fontsOutput}` }
    ]),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: false,
      allChunks: true
    })
  ]
}
