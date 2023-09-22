const path = require('path')
const getRootPath = srcPath => path.resolve(__dirname, srcPath)

module.exports = {
  '@adm': getRootPath('../components/adm'),
  '@widgets': getRootPath('../components/widgets'),
  '@iconsGallery': getRootPath('../components/IconsGallery'),
  '@formKit': getRootPath('../components/FormKit'),
  '@utils': getRootPath('../components/utils'),
  '@template': getRootPath('../components/template'),
  '@fixture': getRootPath('../components/fixture'),
  '@api': getRootPath('../components/api'),
  '@states': getRootPath('../components/states'),
}
