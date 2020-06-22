const p = require('path')
const fse = require('fs-extra')
const chalk = require('chalk')
const util = require('./util')
const echo = require('./echo')

/**
 * @exports create
 */
module.exports = async (theme) => {
  try {
    const src = p.join(util.appPath('themes'), 'default')
    const dest = p.join(util.appPath('themes'), theme)
    await fse.copy(src, dest)
    echo('Successfully created theme ' + chalk.dim(theme))
  }
  catch(err) {
    if(err.message) {
      return echo(chalk.red(err.message))
    }
    echo(err)
  }
}
