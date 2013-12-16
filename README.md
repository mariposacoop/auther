# auther [![Build Status](https://secure.travis-ci.org/mariposacoop/auther.png)](http://travis-ci.org/mariposacoop/auther)

Dirt-simple authentication server for use within trusted networks.

## API

### GET /username `{"password": "xxxxxx"}`
- 200 `{"ok": true}` if found
- 400 `{"ok": false, "error": "Bad request"}` if request not understood
- 404 `{"ok": false, "error": "Not found"}` if username with that password not found

### PUT /username `{"password": "xxxxxx"}`
- 200 `{"ok": true}` if created
- 400 `{"ok": false, "error": "Bad request"}` if request not understood

### DELETE /username
- 200 `{"ok": true}` if deleted
