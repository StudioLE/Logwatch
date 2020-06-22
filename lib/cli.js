const chalk = require('chalk')
const install = require('./install')
const preview = require('./preview')
const create = require('./create')
const util = require('./util')
const echo = require('./echo')
const version = require('../package.json').version

// Get command line args
const arg = process.argv.slice(2)

// Echo title
echo(chalk.bold('Theme Logwatch ' + chalk.dim(version)))

// Install theme
if(arg[0] == 'install') {
  if( ! arg[1]) {
    echo(chalk.red('Theme name is required'))
  }
  else if( ! util.themeExists(arg[1])) {
    echo(chalk.red('A theme named ' + chalk.dim(arg[1]) + ' already exists'))
  }
  else {
    install(arg[1])
  }
}
// Preview theme
else if(arg[0] == 'preview') {
  preview()
}
// Create theme
else if(arg[0] == 'create') {
  if( ! arg[1]) {
    echo(chalk.red('Theme name is required'))
  }
  else if(util.themeExists(arg[1])) {
    echo(chalk.red('The specified theme does not exist'))
  }
  else {
    create(arg[1])
  }
}
// Invalid
else {
  echo([
    'Invalid arguments',
    chalk.dim('Usage:'),
    chalk.dim('node-logwatch install [THEME_NAME]'),
    chalk.dim('node-logwatch create THEME_NAME'),
    chalk.dim('node-logwatch preview [THEME_NAME]')
  ])
}
