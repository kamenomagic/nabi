# Nabi Requests
A wrapper around axios that automatically stores and uses authentication tokens in each request

# Current assumptions
Currently uses the structure of tokens from devise_token_auth, replacing the tokens if new ones are sent back.
Uses AsyncStorage.

# Installation
`npm install nabi-requests` or `yarn add nabi-requests`

# Usage
```node.js
import {urlFromPath, httpPost} from "nabi-requests";

setRootUrl('localhost:3000')
setStorageKey('token_headers')

httpPost((response) => {
    // Do some awesome react state and screen stuff
  }, (error) => {
    // Log your errors for posterity
  },
  '/users',
  {
    "email": "example@example.com",
    "password": "strong_password",
    "password_confirmation": "strong_password",
  }
)
```

# Methods
The following returns a full url with path, based on rootUrl:
```node.js
urlFromPath(path)
```

Http methods with onSuccess and onError hooks, path and body parameters where appropriate:
```node.js
httpGet(onSuccess, onError, path)
httpPost(onSuccess, onError, path, body)
httpPatch(onSuccess, onError, path, body)
httpPatchFile(onSuccess, onError, path, body): used for multipart uploads (like images)
httpDelete(onSuccess, onError, path)
```

# Future work
Allow static configuration/overriding of:
- The storage technique of the tokens and storage key
- The structure/header names of the tokens
- More useful http methods