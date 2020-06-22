const fs = require('fs')
const p = require('path')
const http = require('http')
const config = require('config')
const util = require('./util')
const echo = require('./echo')

// Get command line args
const arg = process.argv.slice(2)

/**
 * @exports preview
 */
module.exports = function() {

  if( ! arg[1]) arg[1] = ''

  const address = `http://${config.server_address}:${config.server_port}/${arg[1]}`

  echo([ 'Launching preview at ' + address, 'Close with CTRL + C' ])

  // Create a server
  http.createServer(function(req, res) {

    const response = function(res, output, content_type, status) {
      if( ! status) status = 200
      // Write the headers
      res.writeHead(status, {
        'Content-Type': content_type || 'text/html',
        'Access-Control-Allow-Origin': '*'
      })

      // Send the result with output
      res.end(output)
      console.log(status + ' ' + req.method + ' ' + req.url)
    }

    const theme = req.url.substr(1)
    let output

    if(req.url == '/') {

      // Read themes directory
      const themes = fs.readdirSync(util.appPath('themes'))

      output = '<ul>'
      themes.forEach((theme) => {
        output += '<li><a href="/' + theme + '">' + theme + '</a></li>'
      })
      output += '</ul>'

      return response(res, output)

    }
    else if(req.url.substr(0,1) == '/' && util.themeExists(theme)) {
      // Read the template
      const template = {
        header: fs.readFileSync(p.join(util.appPath('themes'), theme, 'header.html'), 'utf-8'),
        body: fs.readFileSync(util.appPath('sample'), 'utf-8'),
        footer: fs.readFileSync(p.join(util.appPath('themes'), theme, 'footer.html'), 'utf-8')
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
