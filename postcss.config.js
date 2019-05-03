module.exports = ({ options }) => ({
  // syntax: 'postcss-scss',
  plugins: {
    'postcss-import': {},
    'tailwindcss': 'tailwind.js',
    'autoprefixer': {},
    '@fullhuman/postcss-purgecss': options.purgecss,
    'cssnano': options.cssnano
  }
})