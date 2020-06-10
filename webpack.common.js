const path = require('path')

// webpack plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

// common
const settings = require('./webpack.settings.js')

// configurations
const configureCleanWebpack = () => {
  return [
    path.resolve(__dirname, 'server/wp-content/themes', settings.theme.slug),
  ]
}

const configureCopyWebpack = () => {
  return [
    {
      from: 'theme/include',
      to: ''
    }, {
      from: 'theme/templates',
      to: 'templates'
    }
  ]
}

const configureMiniCssExtract = () => {
  return {
    filename: process.env.NODE_ENV == 'development' ? 'css/[name].css' : 'css/[name].[hash:8].css',
    chunkFilename: process.env.NODE_ENV == 'development' ? 'css/[id].css' : 'css/[name].[hash:8].css',
  }
}

const configureManifest = () => {
  return { publicPath: settings.publicPath }
}

module.exports = {
  mode: process.env.NODE_ENV,

  entry: {
    main: path.resolve(__dirname, 'theme/src/index.js'),
    head: path.resolve(__dirname, 'theme/src/head.js'),
  },

  output: {
    filename: process.env.NODE_ENV == 'development' ? 'js/[name].js' : 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'server/wp-content/themes', settings.theme.slug),
    publicPath: settings.publicPath
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|pcss)$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: settings.publicPath,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(woff(2)?|otf|ttf|eot|svg)$/,

        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: settings.publicPath,
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@root': path.resolve(__dirname),
      '@src': path.resolve(__dirname, 'theme/src'),
      vue$: 'vue/dist/vue.esm.js',
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin(configureCopyWebpack()),
    new CleanWebpackPlugin(configureCleanWebpack()),
    new MiniCssExtractPlugin(configureMiniCssExtract()),
    new ManifestPlugin(configureManifest()),
  ],

  stats: {
    excludeAssets: [/.*templates\/.*/],
  },

  devServer: {
    contentBase: path.join(__dirname, 'server/public'),
    writeToDisk: true,
    proxy: {
      '/': 'http://localhost:8080',
    },
  },
}
