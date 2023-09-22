const {
  run,
  runNode,
  runRollup,
  cleanDir,
  watchNode,
  printMessage,
} = require('./cli-utils')
const colors = require('colors')
const fs = require('fs')
const pathKit = require('path')
const checkAvailability = fileLocation => {
  const filePath = pathKit.resolve(__dirname, fileLocation)
  // console.log({ filePath })
  return fs.existsSync(filePath) === true
}
// const { checkAvailability } = require('../scripts/fs')

/**
 * @note
 * reading the all cli commands through `funwithflags` package
 * and convert them as object
 */
const argv = require('funwithflags')(process.argv.slice(2), {
  default: {},
})

/**
 * @note
 * COMMANDS
 */
const {
  env,
  useSSR,
  help,
  path,
  create,
  widget,
  component,
  rollup,
  zip,
  preview,
  storybook,
  clean,
  dev,
  build,
  start,
  bundle,
} = argv

if (help === true) {
  const helpInfo = `
    ${colors.dim('--help')}: ${colors.green('shows help')}
    ${colors.dim('--storybook')}: ${colors.green('run storybook')}
    ${colors.dim('--dev')}: ${colors.green('run dev env')}
    ${colors.dim('--production')}: ${colors.green('run production env')}
    ${colors.dim('--clean')}: ${colors.green('cleans the dist folder')}
  `
  printMessage(helpInfo)
}

if (dev === true) {
  run(`yarn dev`)
}

if (build === true) {
  run(`yarn build`)
}

if (storybook === true) {
  run(`yarn run start-storybook -p 9001`, {})
}

if (clean) {
  if (clean === true) {
    const msg =
      colors.red(`clean requires target to proceed!`) +
      colors.grey.underline(`\navailable commands:`) +
      colors.grey(`\npmmt --clean=dist`)
    printMessage(msg)
    return false
  }
  cleanDir(clean)
}
