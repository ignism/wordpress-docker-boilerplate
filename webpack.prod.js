const merge = require('webpack-merge')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const common = require('./webpack.common.js')
const config = require(path.resolve(__dirname, 'config/theme.json'))

process.env.NODE_ENV = 'production'

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(path.resolve(__dirname, 'wp-content/themes', config.slug)),
  ],

  optimization: {
    minimizer: [new UglifyJSPlugin()],
  },
})
