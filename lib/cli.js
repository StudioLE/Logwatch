const chalk = require('chalk')
const sqwk = require('sqwk')
const install = require('./install')
const preview = require('./preview')
const create = require('./create')
const util = require('./util')

// Get command line args
const arg = process.argv.slice(2)

// Capture user input
sqwk.init({
  title: 'Theme Logwatch'
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
    sqwk.write('Theme name is required')
    sqwk.end()
  }
  if(util.themeExists(arg[1])) {
    sqwk.write('A theme named ' + chalk.dim(arg[1]) + ' already exists')
    sqwk.end()
  }
  else {
    create(arg[1])
  }
}
// Invalid
else {
  sqwk.write([
    'Invalid arguments',
    chalk.dim('Usage:'),
    chalk.dim('node-logwatch install [THEME_NAME]'),
    chalk.dim('node-logwatch create THEME_NAME'),
    chalk.dim('node-logwatch preview [THEME_NAME]')
  ])
  sqwk.end()
}
