import axios from "axios";
import { AsyncStorage } from "react-native";
import getEnvVars from "../environment";
const { rootUrl } = getEnvVars();

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

export const saveHeaders = (response) => {
  const headers = JSON.stringify(extractTokenHeaders(response.headers));
  if (JSON.parse(headers)["access-token"] !== "") {
    AsyncStorage.setItem("token_headers", headers);
  }
  return response;
};

export const urlFromPath = (path) => {
  return `${rootUrl}${path}`;
};

export const httpGet = (onSuccess, onError, path) => {
  AsyncStorage.getItem("token_headers").then((headersString) => {
    axios
      .get(`${rootUrl}${path}`, { headers: JSON.parse(headersString) })
      .then((response) => onSuccess(saveHeaders(response)))
      .catch((error) => {
        saveHeaders(error.response)
        onError(error)
      });
  });
};

export const httpPost = (onSuccess, onError, path, body) => {
  AsyncStorage.getItem("token_headers").then((headersString) => {
    axios
      .post(`${rootUrl}${path}`, body, { headers: JSON.parse(headersString) })
      .then((response) => onSuccess(saveHeaders(response)))
      .catch((error) => {
        saveHeaders(error.response)
        onError(error)
      });
  });
};

export const httpPatch = (onSuccess, onError, path, body) => {
  AsyncStorage.getItem("token_headers").then((headersString) => {
    axios
      .patch(`${rootUrl}${path}`, body, { headers: JSON.parse(headersString) })
      .then((response) => onSuccess(saveHeaders(response)))
      .catch((error) => {
        saveHeaders(error.response)
        onError(error)
      });
  });
};

export const httpPatchImage = (onSuccess, onError, path, body) => {
  AsyncStorage.getItem("token_headers").then((headersString) => {
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

export const httpDelete = (onSuccess, onError, path) => {
  AsyncStorage.getItem("token_headers").then((headersString) => {
    axios
      .delete(`${rootUrl}${path}`, { headers: JSON.parse(headersString) })
      .then((response) => onSuccess(saveHeaders(response)))
      .catch((error) => {
        saveHeaders(error.response)
        onError(error)
      });
  });
};