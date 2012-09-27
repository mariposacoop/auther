var dirty = require('dirty');


var db = dirty(process.env.DB || 'auther.db');

db.del = db.rm;

db.getSync = db.get;

db.get = function(key, cb) {
  cb(null, db.getSync(key));
};

module.exports = db;
