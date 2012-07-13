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
});
