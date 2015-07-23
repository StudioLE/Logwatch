// Core modules
var fs = require('fs')
var p = require('path')

// Begin module
module.exports = {

  /**
   * Prepend the root directory to a path
   * 
   * @method rootDir
   * @param path {String}
   * @return {String}
   */
  rootDir: function(path) {
    if(path === undefined) {
      path = ''
    }
    return p.resolve(__dirname, '../', path)
  },

  /**
   * Return application path
   * 
   * @method appPath
   * @param request {String}
   * @return {String}
   */
  appPath: function(req) {
    vars = {
      // Themes directory
      themes: 'themes',

      // Path to log file SHA
      sample: 'preview/sample.html',
    }
    if(vars[req]) {
      return this.rootDir(vars[req])
    }
    else {
      throw Error('util.appPath (\'' + req + '\') does not exist')
    }
  },
  
  /**
   * Check if theme exists
   * 
   * @method themeExists
   * @param {String} path 
   * @return {String}
   */
  themeExists: function(theme) {
    if( ! theme) return false
    return fs.existsSync(p.join(this.appPath('themes'), theme))
  }

}
