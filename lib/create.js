// Core modules
var fs = require('fs')
var p = require('path')

// Node modules
var config = require('config')
var async = require('async')
var fse = require('fs-extra')
var chalk = require('chalk')

// App modules
var terminal = require('./terminal')
var util = require('./util')

// Begin module
module.exports = function(theme) {

  // Begin async
  async.waterfall([
    function(callback) { // Copy default to new theme location
      fse.copy(p.join(util.appPath('themes'), 'default'), p.join(util.appPath('themes'), theme), callback)
    }
  ], function(err) {

    if(err) {
      terminal.end(err)
      throw err
    }
    else {
      terminal.write('Successfully created theme ' + chalk.dim(theme))
    }
  
    terminal.end()

  })

}
