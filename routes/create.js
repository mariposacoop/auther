var autheremin = require('autheremin')(require('../db'));

module.exports = function createUser(req, res, next, username) {
  if (!req.body.password) {
    next();
  }
  autheremin.create(username, req.body.password, function(err) {
    // TODO: extend autheremin to return created or overwritten
    if (err) next(err);
    res.writeHead(200);
    res.end(JSON.stringify({
      ok: true,
      created: true
    }));
  });
};
