var autheremin = require('autheremin');
var http = require('http');
var util = require('util');
var port = process.env.PORT || 4824;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, function () {
  util.log('Listening on port ' + port);
  
  if (process.send) {
    process.send('listening');
  }
});

