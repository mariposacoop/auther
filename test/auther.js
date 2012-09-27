var assert = require('assert');
var request = require('request');
var fork = require('child_process').fork;

describe('auther', function() {
  var apiKey = 'SEKRIT',
      child,
      db = 'test/test.db',
      port = 6666,
      userPass = 'somePassword',
      userUrl = 'http://127.0.0.1:' + port + '/someUser';

  before(function(done) {
    child = fork('server.js', [], {env: {PORT: port, DB: db}});
    child.on('message', function(msg) {
      if (msg == 'listening') {
        done();
      }
    });
  });

  after(function() {
    child.kill();
  });

  it('returns 401 when we send a PUT request with the wrong API key', function(done) {
    request.put({
      url: userUrl, 
      body: {
        password: userPass,
        key: 'NOT_SEKRIT'
      },
      json: true
    }, function(err, resp, body) {
      if (err) throw err;
      assert(resp.statusCode === 401);
      done();
    });
  });

  it('returns 200 and ok: true, created: true when we send a PUT request to localhost/someUser', function(done) {
    request.put({
      url: userUrl, 
      body: {
        password: userPass,
        key: apiKey
      },
      json: true
    }, function(err, resp, body) {
      if (err) throw err;
      assert(resp.statusCode === 200);
      assert(body.ok);
      assert(body.created);
      done();
    });
  });

  it('returns ok: true when we send a GET request to localhost/someUser with the right password', function(done) {
    request.get({
      url: userUrl, 
      body: {
        password: userPass,
        key: apiKey
      },
      json: true
    }, function(err, resp, body) {
      //console.log('body:', body);
      if (err) throw err;
      assert(body.ok);
      done();
    });
  });

  it('returns ok: false when we send a GET request to localhost/someUser with the wrong password', function(done) {
    request.get({
      url: userUrl, 
      body: {
        password: 'badPass',
        key: apiKey
      },
      json: true
    }, function(err, resp, body) {
      //console.log('body:', body);
      if (err) throw err;
      assert(!body.ok);
      done();
    });
  });

  it('returns 200 when we send a DELETE request to localhost/someUser', function(done) {
    request.del({
      url: userUrl, 
      body: {
        key: apiKey
      },
      json: true
    }, function(err, resp, body) {
      if (err) throw err;
      assert(resp.statusCode === 200);
      done();
    });
  });

  it('returns ok: false when we send a GET request to a deleted localhost/someUser', function(done) {
    request.get({
      url: userUrl, 
      body: {
        password: userPass,
        key: apiKey
      },
      json: true
    }, function(err, resp, body) {
      //console.log('body:', body);
      if (err) throw err;
      assert(!body.ok);
      done();
    });
  });
});
