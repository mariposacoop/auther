var assert = require("assert");
var request = require("request");
var fork = require("child_process").fork;

describe('auther', function() {
  var child,
      port = 6666,
      userUrl = 'http://127.0.0.1:' + port + '/someUser';

  before(function(done) {
    child = fork('server.js', [], {env: {PORT: port}});
    child.on('message', function(msg) {
      if (msg == 'listening') {
        done();
      }
    });
  });

  after(function() {
    child.kill();
  });

  it('has a pid', function(done) {
    assert(child.pid !== null);
    assert(child.pid !== undefined);
    assert(child.pid !== '');
    assert(child.pid !== false);
    done();
  });

  it('returns 401 when we send a PUT request with the wrong API key', function(done) {
    request.put({
      url: userUrl, 
      body: {
        password: 'somePassword',
        key: 'NOT_SEKRIT'
      },
      json: true
    }, function(err, resp, body) {
      if (err) throw err;
      assert(resp.statusCode === 401);
      done();
    });
  });

  it('returns 200 when we send a PUT request to localhost/someUser', function(done) {
    request.put({
      url: userUrl, 
      body: {
        password: 'somePassword',
        key: 'SEKRIT'
      },
      json: true
    }, function(err, resp, body) {
      if (err) throw err;
      assert(resp.statusCode === 200);
      done();
    });
  });

  it('returns 200 when we send a DELETE request to localhost/someUser', function(done) {
    request.del({
      url: userUrl, 
      body: {
        key: 'SEKRIT'
      },
      json: true
    }, function(err, resp, body) {
      if (err) throw err;
      assert(resp.statusCode === 200);
      done();
    });
  });

  it('returns success: true, created:true when we send a PUT request to localhost/someUser', function(done) {
    request.put({
      url: userUrl, 
      body: {
        password: 'somePassword',
        key: 'SEKRIT'
      },
      json: true
    }, function(err, resp, body) {
      //console.log("body:", body);
      if (err) throw err;
      assert(body.success);
      assert(body.created);
      done();
    });
  });


});
