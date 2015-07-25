// Core modules
var fs = require('fs')
var p = require('path')

// Node modules
var config = require('config')
var async = require('async')
var fse = require('fs-extra')
var chalk = require('chalk')
var sqwk = require('sqwk')

// App modules
var util = require('./util')

// Get command line args
var arg = process.argv.slice(2)

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
        sqwk.write('Select a theme to install', themes, callback)
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
        sqwk.end(err)
      }
    }
    else {
      sqwk.write('Successfully installed theme ' + chalk.dim(arg[1]))
    }

    sqwk.end()

  })

}
