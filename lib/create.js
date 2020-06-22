const p = require('path')
const async = require('async')
const fse = require('fs-extra')
const chalk = require('chalk')
const sqwk = require('sqwk')
const util = require('./util')

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
