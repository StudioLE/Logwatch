const fs = require('fs')
const p = require('path')
const config = require('config')
const fse = require('fs-extra')
const chalk = require('chalk')
const util = require('./util')
const echo = require('./echo')

// Get command line args
const arg = process.argv.slice(2)

/**
 * @exports install
 */
module.exports = async (theme) => {
  try {
    // Themes directory must exist
    if( ! fs.existsSync(config.get('logwatch_theme_directory'))) {
      throw Error('Logwatch theme directory does not exist')
    }

    // Copy the files
    await fse.copy(p.join(util.appPath('themes'), theme), config.get('logwatch_theme_directory'), {
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
