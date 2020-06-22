const fs = require('fs')
const p = require('path')
const config = require('config')
const async = require('async')
const fse = require('fs-extra')
const chalk = require('chalk')
const util = require('./util')
const echo = require('./echo')

// Get command line args
const arg = process.argv.slice(2)

/**
 * @exports install
 */
module.exports = function() {

  // Begin async
  async.waterfall([
    function(callback) { // Check logwatch_theme_directory exists

      if( ! fs.existsSync(config.get('logwatch_theme_directory'))) {
        callback('Logwatch theme directory does not exist')
      }
      // Read themes directory
      fs.readdir(util.appPath('themes'), callback)
    },
    function(themes, callback) { // INPUT: Select theme

      if(arg[1] && util.themeExists(arg[1])) {
        callback(null, arg[1], null)
      }
      else {
        callback('Please specify a theme to install')
      }

    },

    function(theme, index, callback) { // Copy theme files

      arg[1] = theme

      fse.copy(p.join(util.appPath('themes'), theme), config.get('logwatch_theme_directory'), {
        // Overwrite existing files
        // clobber: true
      }, callback)

    }
  ], function(err) {

    if(err) {
      if(err.message == 'Cancelled by user') {
        // Do nothing
      }
      else {
        echo(err)
      }
    }
    else {
      echo('Successfully installed theme ' + chalk.dim(arg[1]))
    }

  })

}
