var http = require('http');
var rut = require('rut');
var scalpel = require('scalpel');
var settings = require('./settings');
var stack = require('stack');
var util = require('util');

var port = process.env.PORT || 4824;
var db = require('./db')(process.env.DB || 'auther.db');
var autheremin = require('autheremin')(db);


http.createServer(stack(
  scalpel,
  keyCheck,
  rut.put('/*', createUser),
  rut.get('/*', validateUser),
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

function createUser(req, res, next, username) {
  // TODO: actually process the put by adding the user to the db.
  //util.log('got method ' + req.method);
  //util.log('got user ' + req.url.substr(1));
  if (!req.body.password) {
    next();
    //util.log('got password ' + req.body.password);
  }
  autheremin.create(username, req.body.password, function(err) {
    // TODO: extend autheremin to get created or overwritten
    if (err) next(err);
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      created: true
    }));
  });
}

function validateUser(req, res, next, username) {
  res.writeHead(200);
  res.end();
}
