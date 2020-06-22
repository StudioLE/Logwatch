const fs = require('fs')
const p = require('path')
const fse = require('fs-extra')
const chalk = require('chalk')
const util = require('./util')
const echo = require('./echo')
const { theme_directory } = require('./config')

// Get command line args
const arg = process.argv.slice(2)

/**
 * @exports install
 */
module.exports = async (theme) => {
  try {
    // Themes directory must exist
    if( ! fs.existsSync(theme_directory)) {
      throw Error('Logwatch theme directory does not exist')
    }

    // Copy the files
    await fse.copy(p.join(util.appPath('themes'), theme), theme_directory, {
      // Overwrite existing files
      // clobber: true
    })

    echo('Successfully installed theme ' + chalk.dim(arg[1]))
  }
  catch(err) {
    if(err.message) {
      return echo(chalk.red(err.message))
    }
    echo(err)
  }
}
