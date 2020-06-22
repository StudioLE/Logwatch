const p = require('path')
const async = require('async')
const fse = require('fs-extra')
const chalk = require('chalk')
const util = require('./util')
const echo = require('./echo')

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
      echo(err)
    }
    else {
      echo('Successfully created theme ' + chalk.dim(theme))
    }

  })

}
