process.env.NODE_ENV = 'development'

const merge = require('webpack-merge')
const common = require('./webpack.common.js')

// webpack config
module.exports = merge(common, {
  devtool: 'inline-source-map',
})
