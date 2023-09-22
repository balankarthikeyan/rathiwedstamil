const alias = require('./alias')
const target = process.env.NODE_ENV === 'production' ? 'server' : 'serverless'

module.exports = {
  target: 'server',
  devIndicators: {
    autoPrerender: false,
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/myworkspace': { page: '/myworkspace' },
      '/contactus': { page: '/contactus' },
      '/resetpasword': { page: '/resetpasword' },
      '/search': { page: '/search' },
      '/terms': { page: '/terms' },
    }
  },
  webpack: config => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...alias,
    }
    // Important: return the modified config
    return config
  },
}
