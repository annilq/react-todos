import axios from "axios";
import Spiner from "./spin";
import { browserHistory } from "react-router";
import Notify from "./notify";
let Request = {};
axios.defaults.baseURL = "http://127.0.0.1:8080/api";
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    Spiner.show();
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    Spiner.close();
    return response;
  },
  function(error) {
    // Do something with response error
    Spiner.close();
    return Promise.reject(error);
  }
);
// data service
Request.get = function(url, param = {}) {
  var promise = new Promise(function(resolve, reject) {
    axios
      .get(url, { params: param })
      .then(function(response) {
        if (response.data) {
          if (response.data.code === -2) {
            Request.logout();
          } else if (response.data.code === 0) {
            resolve(response.data.data);
          } else {
            console.log("ajax info", response.data);
          }
        } else {
          reject(response.data);
        }
      })
      .catch(function(error) {
        reject(error);
      });
  });
  return promise;
};
Request.delete = function(url) {
  var promise = new Promise(function(resolve, reject) {
    axios
      .delete(url)
      .then(function(response) {
        if (response.data) {
          if (response.data.code === -2) {
            Request.logout();
          } else if (response.data.code === 0) {
            resolve(response.data.data);
          } else {
            console.log("ajax info", response.data);
          }
        } else {
          reject(response.data);
        }
      })
      .catch(function(error) {
        reject(error);
      });
  });
  return promise;
};
Request.put = function(url, data = {}) {
  var promise = new Promise(function(resolve, reject) {
    axios
      .put(url, data)
      .then(function(response) {
        if (response.data) {
          if (response.data.code === -2) {
            Request.logout();
          } else if (response.data.code === 0) {
            resolve(response.data.data);
          } else {
            console.log("ajax info", response.data);
          }
        } else {
          reject(response.data);
        }
      })
      .catch(function(error) {
        reject(error);
      });
  });
  return promise;
};
Request.post = function(url, data = {}) {
  var promise = new Promise(function(resolve, reject) {
    axios
      .post(url, data)
      .then(function(response) {
        if (response.data) {
          if (response.data.code === -2) {
            Request.logout();
          } else if (response.data.code === 0) {
            resolve(response.data.data);
          } else {
            Notify("error", response.data.message);
            console.log("ajax info", response.data);
          }
        } else {
          reject(response.data);
        }
      })
      .catch(function(error) {
        reject(error);
      });
  });
  return promise;
};
Request.logout = function() {
  Notify("warn", "登录过期，请重新登录");
  browserHistory.replace("/login");
};
export default Request;
