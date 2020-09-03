import axios from "axios";
import { AsyncStorage } from "react-native";

var rootUrl  = 'localhost:3000'
exports.rootUrl = rootUrl

var storageKey  = 'token_headers'
exports.storageKey = storageKey

exports.setRootUrl = (newRootUrl) => {
  rootUrl = newRootUrl
}

exports.setStorageKey = (newStorageKey) => {
  storageKey = newStorageKey 
}

const extractTokenHeaders = (headers) => {
  return (({
    "access-token": accessToken,
    client,
    expiry,
    uid,
    "token-type": tokenType,
  }) => ({
    "access-token": accessToken,
    client,
    expiry,
    uid,
    "token-type": tokenType,
  }))(headers);
};

const saveHeaders = (response) => {
  const headers = JSON.stringify(extractTokenHeaders(response.headers));
  if (JSON.parse(headers)["access-token"] !== "") {
    AsyncStorage.setItem(storageKey, headers);
  }
  return response;
};

exports.urlFromPath = (path) => {
  return `${rootUrl}${path}`;
};

exports.httpGet = (onSuccess, onError, path) => {
  AsyncStorage.getItem(storageKey).then((headersString) => {
    axios
      .get(`${rootUrl}${path}`, { headers: JSON.parse(headersString) })
      .then((response) => onSuccess(saveHeaders(response)))
      .catch((error) => {
        saveHeaders(error.response)
        onError(error)
      });
  });
};

exports.httpPost = (onSuccess, onError, path, body) => {
  AsyncStorage.getItem(storageKey).then((headersString) => {
    axios
      .post(`${rootUrl}${path}`, body, { headers: JSON.parse(headersString) })
      .then((response) => onSuccess(saveHeaders(response)))
      .catch((error) => {
        saveHeaders(error.response)
        onError(error)
      });
  });
};

exports.httpPatch = (onSuccess, onError, path, body) => {
  AsyncStorage.getItem(storageKey).then((headersString) => {
    axios
      .patch(`${rootUrl}${path}`, body, { headers: JSON.parse(headersString) })
      .then((response) => onSuccess(saveHeaders(response)))
      .catch((error) => {
        saveHeaders(error.response)
        onError(error)
      });
  });
};

exports.httpPatchFile = (onSuccess, onError, path, body) => {
  AsyncStorage.getItem(storageKey).then((headersString) => {
    const headers = JSON.parse(headersString);
    headers["content-type"] = "multipart/form-data";
    axios
      .patch(`${urlFromPath(path)}`, body, { headers: headers })
      .then((response) => onSuccess(saveHeaders(response)))
      .catch((error) => {
        saveHeaders(error.response)
        onError(error)
      });
  });
};

exports.httpDelete = (onSuccess, onError, path) => {
  AsyncStorage.getItem(storageKey).then((headersString) => {
    axios
      .delete(`${rootUrl}${path}`, { headers: JSON.parse(headersString) })
      .then((response) => onSuccess(saveHeaders(response)))
      .catch((error) => {
        saveHeaders(error.response)
        onError(error)
      });
  });
};