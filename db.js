var dirty = require('dirty');


module.exports = function(dbname) {
  var db = dirty(dbname);
  return db;
};

