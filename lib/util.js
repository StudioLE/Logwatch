const fs = require('fs')
const p = require('path')

/**
 * @exports util
 */
module.exports = {

  /**
   * Prepend the root directory to a path
   *
   * @method rootDir
   * @param {String} path
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
   * @param {String} request
   * @return {String}
   */
  appPath: function(req) {
    const vars = {
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
   * @param {String} theme
   * @return {Boolean}
   */
  themeExists: function(theme) {
    const path = p.join(this.appPath('themes'), theme)
    if( ! theme) {
      return false
    }
    else if( ! fs.existsSync(p.join(path, 'header.html'))) {
      return false
    }
    else if( ! fs.existsSync(p.join(path, 'footer.html'))) {
      return false
    }
    else {
      return true
    }
  }

}
