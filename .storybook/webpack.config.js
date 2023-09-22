const path = require('path')
const alias = require('../alias')

module.exports = ({ config, mode }) => {
  config.resolve.alias = alias
  return config
}
