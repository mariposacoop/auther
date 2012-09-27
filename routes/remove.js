var autheremin = require('autheremin')(require('../db'));

module.exports = function remove(req, res, next, username) {
  autheremin.delete(username, function(err) {
    if (err) next(err);
    res.writeHead(200);
    res.end(JSON.stringify({
      ok: true,
      created: true
    }));
  });
};
