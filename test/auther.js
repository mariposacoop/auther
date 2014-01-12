var request = require('request');
var fork = require('child_process').fork;
var test = require('tap').test;


var child;
var db = 'test.db';
var port = 6666;
var userPass = 'somePassword';
var userUrl = 'http://127.0.0.1:' + port + '/someUser';

test('setup', function (t) {
  t.plan(1);
  child = fork(__dirname + '/../server.js', [], {env: {PORT: port, DB: db}});
  child.on('message', function(msg) {
    if (msg == 'online') {
      t.ok(true, 'Server is online');
    }
  });
});

test('a PUT request to localhost/someUser returns 200 and ok: true, created: true', function (t) {
  t.plan(3);
  request.put({
    url: userUrl, 
    body: {
      password: userPass
    },
    json: true
  }, function(err, resp, body) {
    if (err) throw err;
    t.equal(resp.statusCode, 200);
    t.ok(body.ok);
    t.ok(body.created);
  });
});

test('a GET request to localhost/someUser with the right password returns ok: true', function(t) {
  t.plan(1);
  request.get({
    url: userUrl, 
    body: {
      password: userPass
    },
    json: true
  }, function(err, resp, body) {
    if (err) throw err;
    t.ok(body.ok);
  });
});

test('a GET request to localhost/someUser with the wrong password returns ok: false', function(t) {
  t.plan(1);
  request.get({
    url: userUrl, 
    body: {
      password: 'badPass'
    },
    json: true
  }, function(err, resp, body) {
    if (err) throw err;
    t.ok(!body.ok);
  });
});

test('a DELETE request to localhost/someUser returns 200', function(t) {
  t.plan(1);
  request.del({
    url: userUrl, 
    json: true
  }, function(err, resp, body) {
    if (err) throw err;
    t.equal(resp.statusCode, 200);
  });
});

test('a GET request to a deleted localhost/someUser returns ok: false', function(t) {
  t.plan(1);
  request.get({
    url: userUrl, 
    body: {
      password: userPass
    },
    json: true
  }, function(err, resp, body) {
    if (err) throw err;
    t.ok(!body.ok);
  });
});

test('teardown', function (t) {
  child.kill();
  t.end();
});
