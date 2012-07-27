var assert = require("assert");

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


  //when we send a put request to localhost/some_username with a request body contaning a password and an api key, author will return 200 ok
  it('returns 200 when we send a PUT request to localhost/someUser', function () {
    // start up auther server
    // form the request
    // send the request
    // get the response
    // response body should be 200
  });
});
