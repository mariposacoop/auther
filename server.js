var autheremin = require('autheremin');
var http = require('http');
var scalpel = require('scalpel');
var settings = require('./settings');
var stack = require('stack');
var util = require('util');

var port = process.env.PORT || 4824;

http.createServer(stack(
  scalpel,
  keyCheck,
  function(req, res) {
    res.writeHead(200)
    res.end()
  }
)).listen(port, function () {
  util.log('Listening on port ' + port);
  
  if (process.send) {
    process.send('listening');
  }
});

function keyCheck(req, res, next) {
  if (req.body.key != settings.key) {
    util.log('Stopped attempted access with key ' + req.body.key);
    res.writeHead(401)
    return res.end()
  }
  next();
}
