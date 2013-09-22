[![Build Status](https://secure.travis-ci.org/mariposacoop/auther.png)](http://travis-ci.org/mariposacoop/auther)

auther
======

authentication module 

API
---
Possible errorMessage values are as follows:
- Malformed request
- Not found

**Request** `GET /username {password: xxxxxx}`<br>
**Response** `{ok: true}` or `{ok: false, error: errorMessage}`

**Request** `PUT /username {password: xxxxxx}`<br>
**Response** `{ok: true, created: true/false}` where created is false if the username exists and password was reset or `{ok: false, error: errorMessage}`

**Request** `DELETE /username`<br>
**Response** `{ok: true}` or `{ok: false, error: errorMessage}`
