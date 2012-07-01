auther
======

authentication module 

API
---
We're borrowing some ideas here from http://slide.blorkmark.com. Signature should be the password hashed with the timestamp. Key is the API key. Possible errorMessage values are as follows:
- Malformed request
- Not found

**Request** `GET /username {signature: xxxxxx, timestamp: 23523443, key: abc123}`<br>
**Response** `{success: true, authtoken:abe3458340ab}` or `{success: false, error: errorMessage}`

**Request** `GET /username {authtoken: abe3458340ab, key: abc123}`<br>
**Response** `{success: true}` or `{success: false, error: errorMessage}`

**Request** `PUT /username {password: xxxxxx, key: abc123}`<br>
**Response** `{success: true, created: true/false}` where created is false if the username exists and password was reset or `{success: false, error: errorMessage}`

**Request** `DELETE /username {key: abc123}`<br>
**Response** `{success: true}` or `{success: false, error: errorMessage}`
