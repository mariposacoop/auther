auther
======

authentication module 

API
---
We're borrowing some ideas here from http://slide.blorkmark.com. Signature 
should be the password hashed with the timestamp. Key is the API key. 
Possible errorMessage values are as follows:
- Malformed request
- Not found

    GET /username {signature: xxxxxx, timestamp: 23523443, key: abc123}

Response is `{success: true, authtoken:abe3458340ab}` or 
`{success: false, error: errorMessage}`.

    GET /username {authtoken: abe3458340ab, key: abc123}

Response is `{success: true}` or `{success: false, error: errorMessage}`.

    PUT /username {password: xxxxxx, key: abc123}

Response is `{success: true, created: true/false}` where created is false
if the username exists and password was reset or 
`{success: false, error: errorMessage}`.

    DELETE /username {key: abc123}

Response is `{success: true}` or `{success: false, error: errorMessage}`.
