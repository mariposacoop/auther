var http = require('http');
var rut = require('rut');
var scalpel = require('scalpel');
var settings = require('./settings');
var stack = require('stack');
var util = require('util');

var port = process.env.PORT || 4824;
var db = require('./db');
var autheremin = require('autheremin')(db);

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
    keyCheck,
    rut.put('/*', require('./routes/create')),
    rut.get('/*', require('./routes/validate')),
    rut.delete('/*', require('./routes/remove'))
  )).listen(port, function () {
    util.log('Listening on port ' + port);
    if (process.send) {
      process.send('listening');
    }
  });
});

function keyCheck(req, res, next) {
  if (req.body.key != settings.key) {
    util.log('Stopped attempted access with key ' + req.body.key);
    res.writeHead(401)
    return res.end()
  }
  next();
}
