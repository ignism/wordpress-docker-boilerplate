const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

process.env.NODE_ENV = 'production'

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new BundleAnalyzerPlugin()
  ],

  optimization: {
    minimizer: [new UglifyJSPlugin()],
  },
})
