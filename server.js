var http = require('http');
var rut = require('rut');
var scalpel = require('scalpel');
var settings = require('./settings');
var stack = require('stack');

var port = process.env.PORT || 4824;
var db = require('./db');

stack.errorHandler = function error(req, res, err) {
  res.setHeader('Content-Type', 'application/json');
  if (err) {
    console.error(err.stack);
    res.writeHead(500);
    res.end(JSON.stringify({
      ok: false, 
      error: err.message
    }));
    return;
  }
  res.writeHead(404);
  res.end('{"ok":false, "error":"not found"}');
};

db.on('load', function() { 
  http.createServer(stack(
    scalpel,
    rut('/', require('./routes')),
    rut.put('/*', require('./routes/create')),
    rut.get('/*', require('./routes/validate')),
    rut.delete('/*', require('./routes/remove'))
  )).listen(port, function () {
    console.log('Listening on port ' + port);
    if (process.send) {
      process.send('listening');
    }
  });
});
