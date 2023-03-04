import router from "next/router";
import { userService } from "../services";

export const fetchWrapper = {
  get,
  post,
  put,
  patch,
  delete: _delete,
};

function get(url) {
  try {
    const requestOptions = {
      method: "GET",
      headers: authHeader(url),
    };
    return fetch(url, requestOptions)
      .then(handleResponse)
      .catch(function (err) {
        console.error("Error: " + err.message);
      });
  } catch (e) {
    return "";
  }
}

function post(url, body) {
  try {
    let bodyContent = JSON.stringify(body);
    if (body.data) {
      bodyContent = JSON.stringify(body.data);
    }

    let headers = {
      "Content-Type": "application/json",
      traceid: "eb9e975c-e648-11ec-8fea-0242ac120002",
      key: "X-XSS-Protection",
      value: "on",
    };
    if (authHeader(url)) {
      headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        key: "X-XSS-Protection",
        value: "on",
        ...authHeader(url),
      };
    }

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: bodyContent,
    };
    return fetch(url, requestOptions)
      .then(handleResponse)
      .catch(function (err) {
        console.error("Error: " + err.message);
      });
  } catch (e) {
    console.error(e.getMessage);
    return "";
  }
}

function patch(url, body) {
  try {
    let bodyContent = JSON.stringify({});
    if (body !== undefined) {
      bodyContent = JSON.stringify(body.data);
    }

    const requestOptions = {
      method: "PATCH",
      headers: requestHeaders(url),
      body: bodyContent,
    };
    return fetch(url, requestOptions)
      .then(handleResponse)
      .catch(function (err) {
        console.error("Error: " + err.message);
      });
  } catch (e) {
    return "";
  }
}

function put(url, body) {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        key: "X-XSS-Protection",
        value: "on",
        ...authHeader(url),
      },
      body: JSON.stringify(body),
    };
    return fetch(url, requestOptions)
      .then(handleResponse)
      .catch(function (err) {
        console.error("Error: " + err.message);
      });
  } catch (e) {
    return "";
  }
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: authHeader(url),
    };
    return fetch(url, requestOptions)
      .then(handleResponse)
      .catch(function (err) {
        console.error("Error: " + err.message);
      });
  } catch (e) {
    return "";
  }
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue;
  const isLoggedIn = user && user.token;
  if (isLoggedIn) {
    return {
      Authorization: `Bearer ${user.token}`,
      traceid: "eb9e975c-e648-11ec-8fea-0242ac120002",
      "Cache-Control": "no-cache",
    };
  } else {
    return {
      traceid: "eb9e975c-e648-11ec-8fea-0242ac120002",
      "Cache-Control": "no-cache",
    };
  }
}

function requestHeaders(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue;
  const isLoggedIn = user && user.token;
  if (isLoggedIn) {
    return {
      Authorization: `Bearer ${user.token}`,
      traceid: "eb9e975c-e648-11ec-8fea-0242ac120002",
      "Content-Type": "application/json",
      key: "X-XSS-Protection",
      value: "on",
    };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && isJsonString(text) && JSON.parse(text);
    if (data.code === 401) {
      userService.logout();
      router.push("/login");
    } else if (!response.ok) {
      if ([401].includes(response.status) && userService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        console.error("Email or Password is incorrect. Please try again.");
        userService.logout();
      } else if ([404].includes(response.status) && userService.userValue) {
        // console.error("Error: 404 Not Found");
      } else if ([403].includes(response.status) && userService.userValue) {
        console.error("Session is expired. Please login to continue");
        // userService.logout();
      } else if ([502].includes(response.status) && userService.userValue) {
        console.error("502 Bad Gateway");
      }

      const error = (data && data.message) || response.statusText;
      return "";
    }

    if (data.code === 409) return false;

    if (data.code === 404) return false;

    return data.results;
  });
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
