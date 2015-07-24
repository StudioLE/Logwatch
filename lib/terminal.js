// Node modules
var _ = require('lodash')
var t_menu = require('terminal-menu')
var chalk = require('chalk')

// Globals
var terminal

// Begin module
module.exports = {

  options: {
    title: chalk.bold('Theme Logwatch ' + chalk.dim(require('../package.json').version)),
    reset: true,
    menu: { width: 70 }
  },

  /**
   * Capture user input
   * @param {String} Title
   */
  init: function(user_opts) {

    // Set options
    this.options = _.defaults(user_opts, this.options)

    // Set title
    // this.options.title = chalk.bold(this.options.title)

    // Without this, we would only get streams once enter is pressed
    process.stdin.setRawMode(true)
    // Resume stdin in the parent process (node app won't quit all by itself
    // unless an error or process.exit() happens)
    process.stdin.resume()
  },

  /**
   * Write a menu to the terminal
   *
   * @param {String|Array} Message or messages
   * @param {Array} Selectable menu options
   * @param {Function} Callback
   * @return {Object} Terminal object
   */
  write: function(message, options, callback) {
    // If no callback given create one
    if( ! callback) callback = function() {}

    // If a previous terminal has been opened then close it
    if(terminal) terminal.close()

    terminal = t_menu(this.options.menu)

    // Reset the terminal, clearing all contents
    if(this.options.reset) terminal.reset()

    terminal.write(this.options.title + '\n\n')

    // Write message or messages to the console
    if(_.isString(message)) message = [message]
    _.each(message, function(message) {
      terminal.write(chalk.bold(message + '\n'))
    })

    terminal.write('\n')

    // If options were given write them to the console
    if(options) {
      _.each(options, function(option) {
        terminal.add(option)
      })

      terminal.write('\n')
      terminal.add('Cancel')
    }

    // Pipe the terminal menu to the console
    process.stdin.pipe(terminal.createStream()).pipe(process.stdout)

    // Run callback when a terminal item is selected
    terminal.on('select', function(item, index) {
      if(item == 'Cancel') return callback(Error('Cancelled by user'))
      callback(null, item, index)
    })

    terminal.on('error', function(err) {
      callback(err)
    })

    process.stdin.on('error', function(err) {
      callback(err)
    })

    return terminal
  },

  /**
   * Close terminal and exit process
   *
   * @param {Object} Error
   * @param {Boolean} Don't exit
   */
  end: function(err, exit) {
    // Close the terminal
    if(terminal) terminal.close()

    // If there was an error throw it before exit
    if(err) throw err

    // process.stdin.resume() prevents node from exiting.
    // process.exit() overrides in more cases than stdin.pause() or stdin.end()
    // it also means we don't need to call process.stdin.setRawMode(false)
    if(exit === undefined || exit) {
      process.exit()
    }
    else {
      process.stdin.setRawMode(false)
      process.stdin.end()
    }
  }
}
