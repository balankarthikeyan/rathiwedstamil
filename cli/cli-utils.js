const { execSync } = require('child_process')
const boxen = require('boxen')

/**
 * @see
 * https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options
 */
const run = async(cmd = '', options = {}) => {
    const { env, ...rest } = options
    console.log({ rest, cmd })

    try {
        const cliOptions = {
            stdio: 'inherit',
            env: {
                ...process.env,
                NODE_ENV: env || 'development',
                ...rest,
            },
        }

        await execSync(cmd, cliOptions)
    } catch (syncException) {
        printMessage('could not exec command' + syncException)
    }
}

/**
 * @note
 * compile the file with node
 */
const runNode = (script = '', opts = undefined) => {
    run(`node ${script}`, opts)
}

/**
 * @note
 * rollup commands will be done here
 */
const runRollup = (filePath = '', opts = undefined) =>
    run(`rollup -c ${filePath}`, opts)

/**
 * @note
 * remove/delete the dist folder
 */
const cleanDir = (dir = undefined) =>
    runNode('scripts/clean.js', {
        DIR: dir,
    })

/**
 * @note
 * watching the node server on each changes
 */
const watchNode = (script = '', opts = undefined) => {
    run(`npx nodemon ${script}`, opts)
}

const printMessage = (msg = '') => {
    const view = boxen(msg, {
        borderColor: 'blue',
        padding: 1,
        borderStyle: 'classic',
    })
    console.log(view)
}

module.exports = {
    run,
    runNode,
    runRollup,
    cleanDir,
    watchNode,
    printMessage,
}