// Core modules
var fs = require('fs')
var p = require('path')

// Begin module
module.exports = {

  themeExists: function(theme) {
    if( ! theme) return false
    return fs.existsSync(p.join('themes', theme))
  }

}
