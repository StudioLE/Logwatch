// Core modules
var fs = require('fs')
var p = require('path')
var http = require('http')

// Node modules
var config = require('config')
var _ = require('lodash')
var opn = require('open')

// App modules
var terminal = require('./terminal')
var util = require('./util')

// Get command line args
var arg = process.argv.slice(2)

// Begin module
module.exports = function() {

  if( ! arg[1]) arg[1] = ''

  var address = 'http://' + config.server_address + ':' + config.server_port + '/' + arg[1]

  terminal.write([
    'Launching preview at ' + address,
    'Close with CTRL + C'
  ])

  opn(address)

  terminal.end(null, false)

  // Create a server
  http.createServer(function(req, res) {

    function response(res, output, content_type, status) {
      // Write the headers
      res.writeHead(status =  status || 200, {
        'Content-Type': content_type || 'text/html',
        'Access-Control-Allow-Origin': '*'
      })

      // Send the result with output
      res.end(output)
      console.log(status + ' ' + req.method + ' ' + req.url)
    }

    var theme = req.url.substr(1)
    var output

    if(req.url == '/') {

      // Read themes directory
      fs.readdir('themes', function(err, themes) {
        output = '<li>'
        _.each(themes, function(theme) {
          output += '<li><a href="/' + theme + '">' + theme + '</a></li>'
        })
        output += '</ul>'
        return response(res, output)
      })

    }
    else if(req.url.substr(0,1) == '/' && util.themeExists(theme)) {

      // Read the template
      var template = {
        header: fs.readFileSync(p.join('themes', theme, 'header.html'), 'utf-8'),
        body: fs.readFileSync(p.join('preview', 'sample.html'), 'utf-8'),
        footer: fs.readFileSync(p.join('themes', theme, 'footer.html'), 'utf-8')
      }

      // Render the template with colours from log
      output = template.header + template.body + template.footer

      return response(res, output)
    }
    else {
      return response(res, '404 Page Not Found', 'text/plain', 404)
    }

  }).listen(config.server_port, config.server_address)

}
