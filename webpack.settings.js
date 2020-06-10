const path = require('path')
const theme = require(path.resolve(__dirname, 'config/theme.json'))

const urls = {
  live: 'http://localhost:8080/public',
  local: 'http://localhost:8080/public',
  critical: 'http://localhost:8080/',
}

module.exports = {
  theme: theme,
  publicPath: '/public/wp-content/themes/' + theme.slug + '/',
  buildPath: 'dist/',
  // publicPath: process.env.NODE_ENV == 'development' ? urls.local + '/dist/' : urls.live + '/dist/',
  // buildPath: process.env.NODE_ENV == 'development' ? urls.local + '/dist/' : urls.live + '/dist/',
  urls: urls,
  criticalCssConfig: {
    base: './server/wp-content/themes/' + theme.slug + '/css/',
    suffix: '_critical.min.css',
    criticalHeight: 1200,
    criticalWidth: 1200,
    ampPrefix: 'amp_',
    ampCriticalHeight: 19200,
    ampCriticalWidth: 600,
    pages: [
      {
        url: '',
        template: 'index'
      },
      {
        url: '',
        template: 'amp_index'
      }
    ]
  }
}
