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

/**
 * @exports create
 */
module.exports = function(theme) {

  // Begin async
  async.waterfall([
    function(callback) { // Copy default to new theme location
      fse.copy(p.join(util.appPath('themes'), 'default'), p.join(util.appPath('themes'), theme), callback)
    }
  ], function(err) {

    if(err) {
      sqwk.end(err)
    }
    else {
      sqwk.write('Successfully created theme ' + chalk.dim(theme))
    }
  
    sqwk.end()

  })

}
