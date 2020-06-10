const _ = require('lodash')
const path = require('path')

const tailwindConfig = require('./tailwind.config.js')

const importOptions = {
  resolve: id => id.replace(/^@src/, path.resolve(__dirname, 'theme/src'))
}

const purgecssOptions = {
  content: ['./theme/src/**/*.vue', './theme/templates/**/*.twig'],
  whitelistPatterns: [/flickity-.*/, /js-.*/, /.*-orange/, /.*-gray/, /.*-pink/, /.*-purple/, /.*-green/, /strong/, /b/, /h1/, /h2/, /h3/],
  whitelistPatternsChildren: [/flickity-.*/],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
}

const functionsOptions = {
  functions: {
    themeToBase: function(path) {
      let value = _.get(tailwindConfig.theme, _.trim(path, `'"`))

      if (value.includes('px')) {
        return parseFloat(value.slice(0, -2))
      }

      if (value.includes('rem')) {
        return parseFloat(value.slice(0, -3)) * 16
      }

      return 16
    },
    getCalcContent: function(value) {
      if (value.slice(0, 4) === 'calc') {
        return value.slice(4)
      } else {
        return value
      }
    },
  },
}

module.exports = {
  ident: 'postcss',
  syntax: 'postcss-scss',
  map: {
    inline: true,
  },
  plugins: [
    require('postcss-import')(importOptions),
    require('postcss-for'),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('postcss-easings'),
    require('postcss-advanced-variables'),
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-object-fit-images'),
    require('postcss-functions')(functionsOptions),
    require('autoprefixer'),
    require("postcss-calc"),
    ...(process.env.NODE_ENV === 'production' ? [require('@fullhuman/postcss-purgecss')(purgecssOptions), require('cssnano')] : []),
  ],
}
