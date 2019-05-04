const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = require(path.resolve(__dirname, 'config/theme.json'))

module.exports = (env, options) => {
  console.log('env: ')
  console.log(env)
  console.log('options: ')
  console.log(options)

  return ({
    entry: { 
      theme: './theme/src/index.js' 
    },
    output: {
      path: path.resolve(__dirname, 'wp-content/themes/', config.slug),
      filename: 'js/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(css|pcss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  ctx: {
                    purgecss: options.mode === 'production' ? { content: ['./theme/public/templates/**/*.twig'] } : false,
                    cssnano: options.mode === 'production' ? {} : false
                  }
                }
              }
            },
          ]
        },
        // {
        //   test: /\.scss$/,
        //   use: [
        //       "css-loader", // translates CSS into CommonJS
        //       "sass-loader" // compiles Sass to CSS, using Node Sass by default
        //   ]
        // }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css'
      }),
      new CleanWebpackPlugin(path.resolve(__dirname, 'wp-content/themes/', config.slug)),
      new CopyWebpackPlugin([
        {from: 'theme/public', to: ''},
        {from: 'theme/vendor', to: 'vendor'}
      ]),
    ]
  })
}