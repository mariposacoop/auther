var assert = require("assert");
var request = require("request");
var cp = require("child_process");

describe('auther', function () {
  var auther = require("../auther");

  it('exists', function () {

    it('should not be null', function () {
      assert.notEqual(auther, null);
    });

    it('should not be undefined', function () {
      assert.notEqual(auther, undefined);
    });
  });

  it('starts a server that listens on port 4824 by default', function (done) {
    cp.exec('node ../auther.js', function (err, stdout, stderr) {
      request('http://localhost:4824', function(err, resp, body) {
        assert(resp.statusCode === 200);
        done();
      });
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
