var assert = require("assert");
var request = require("request");
var fork = require("child_process").fork;

describe('auther', function () {
  var child,
      port = 6666;

  before( function (done) {
    child = fork('server.js', null, {env: {PORT: port}});
    child.on('message', function (msg) {
      if (msg === 'listening') {
        done();
      }
    });
  });

  after( function () {
    child.kill();
  });

  it('has a pid', function(done) {
    assert(child.pid !== null);
    assert(child.pid !== undefined);
    assert(child.pid !== '');
    assert(child.pid !== false);
    done();
  });


  it('listens on the specified port', function (done) {
    request('http://127.0.0.1:' +port, function(err, resp, body) {
      assert(resp.statusCode === 200);
      done();
    });
  });

  //when we send a put request to localhost/some_username with a request body contaning a password and an api key, author will return 200 ok
  it('returns 200 when we send a PUT request to localhost/someUser', function () {
    // start up auther server
    // form the request
    // send the request
    // get the response
    // response body should be 200
  });
});
