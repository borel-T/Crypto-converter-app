import axios from "axios";
import { BASE_URL } from "./endpoints";

const defaultConfig = {
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-language": "en",
  },
};

/********* HTTTP Helper Methods *********/
// HTTP error object
class RequestError {
  constructor(status, statusText, data) {
    this.status = status;
    this.data = data;
    this.statusText = statusText;
    this.name = "ApiRequestError";
  }
}

// HTTP error handler
function httpErrorHandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new RequestError(
      error.response.status,
      error.response.statusText,
      error.response.data
    );
  } else if (error.request) {
    // The http error was trigerred during request setting up
    throw new RequestError(500, null, "Server Request error");
  }
}

// Method : setHeaders, set's Access token in header
export function setHeaders(accessToken) {
  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };
  return config;
}

/**************** PUBLIC HTTP REQUEST METHODS *****************/

// Axios HTTTP GET Request
export function getRequest(path, params = {}, customConfig = {}) {
  // check 2nd argument is does not have headers, to be sure it is params that are provided
  if (params["headers"]) {
    return axios
      .get(path, params)
      .then((response) => {
        // The request success range of 2xx

        const { status, statusText, data, headers } = response;
        return {
          headers: headers,
          status: status,
          statusText: statusText,
          data: data,
        };
      })
      .catch((error) => {
        httpErrorHandler(error);
      });
  } else {
    // set-up config
    let axiosConfig = { ...defaultConfig, ...customConfig };

    // else if params & header args are provided
    return axios
      .get(path, { params: params, ...axiosConfig })
      .then((response) => {
        // The request success range of 2xx

        const { status, statusText, data, headers } = response;

        return {
          headers: headers,
          status: status,
          statusText: statusText,
          data: data,
        };
      })
      .catch((error) => {
        httpErrorHandler(error);
      });
  }
}

// Axios HTTTP POST Request
export function postRequest(path, data = {}, customConfig = {}) {
  // set-up config
  let axiosConfig = { ...defaultConfig, ...customConfig };

  return axios
    .post(path, data, axiosConfig)
    .then((response) => {
      // The request success range of 2xx
      const { status = "", statusText = "", data = {}, headers } = response;

      return {
        headers: headers,
        status: status,
        statusText: statusText,
        data: data,
      };
    })
    .catch((error) => {
      httpErrorHandler(error);
    });
}

// Axios HTTTP PUT Request
export function putRequest(path, data = {}, customConfig = {}) {
  // set-up config
  let axiosConfig = { ...defaultConfig, ...customConfig };

  return axios
    .put(path, data, axiosConfig)
    .then((response) => {
      // The request success range of 2xx
      const { status = "", statusText = "", data = {}, headers } = response;

      return {
        headers: headers,
        status: status,
        statusText: statusText,
        data: data,
      };
    })
    .catch((error) => {
      httpErrorHandler(error);
    });
}

// Axios HTTTP DELETE Request
export function deleteRequest(path, params = {}, customConfig = {}) {
  // set-up config
  let axiosConfig = { ...defaultConfig, ...customConfig };

  return axios
    .delete(path, params, axiosConfig)
    .then((response) => {
      // The request success range of 2xx
      const { status = "", statusText = "", data = {}, headers } = response;

      return {
        headers: headers,
        status: status,
        statusText: statusText,
        data: data,
      };
    })
    .catch((error) => {
      httpErrorHandler(error);
    });
}
