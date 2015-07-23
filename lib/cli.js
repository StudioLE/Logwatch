// Node modules
var chalk = require('chalk')

// App modules
var install = require('./install')
var preview = require('./preview')
var create = require('./create')
var terminal = require('./terminal')
var util = require('./util')

// Get command line args
var arg = process.argv.slice(2)

// Capture user input
terminal.init({
  // reset: false
})

// Install theme
if(arg[0] == 'install') {
  install()
}
// Preview theme
else if(arg[0] == 'preview') {
  preview()
}
// Create theme
else if(arg[0] == 'create') {
  if( ! arg[1]) {
    terminal.write('Theme name is required')
    terminal.end()
  }
  if(util.themeExists(arg[1])) {
    terminal.write('A theme named ' + chalk.dim(arg[1]) + ' already exists')
    terminal.end()
  }
  else {
    create(arg[1])
  }
}
// Invalid
else {
  terminal.write([
    'Invalid arguments',
    chalk.dim('Usage:'),
    chalk.dim('node logwatch install [THEME_NAME]'),
    chalk.dim('node logwatch create THEME_NAME'),
    chalk.dim('node logwatch preview [THEME_NAME]')
  ])
  terminal.end()
}


