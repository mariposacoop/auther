var autheremin = require('autheremin')(require('../db'));

module.exports = function validate(req, res, next, username) {
  if (!req.body.password) {
    res.writeHead(400);
    return res.end(JSON.stringify({
      ok: false,
      error: 'Malformed request'
    }));
  }
  autheremin.verify(username, req.body.password, function(err) {
    if (err) {
      res.writeHead(404);
      return res.end(JSON.stringify({
        ok: false,
        error: 'Not found'
      }));
    }
    res.writeHead(200);
    res.end(JSON.stringify({
      ok: true
    }));
  });
};
