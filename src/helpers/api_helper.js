import axios from "axios";
import { api } from "../config";
import { decrypData } from "../util/crypto";

const axiosApi = axios.create({
  baseURL:  api.API_URL,
});
// default
//axios.defaults.baseURL = api.API_URL;
// content type
axiosApi.defaults.headers.post["Content-Type"] = "application/json";

// content type
let cuurentToken = null
let storage =  localStorage.getItem("authenticatication-crm") || null
if(storage){
  const descryptedData = decrypData(storage);
  cuurentToken = JSON.parse(descryptedData).token;
}
const token = cuurentToken;
if (token)
axiosApi.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axiosApi.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axiosApi.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}

export async function postFile(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { 
          headers: {
              "Content-Type": "multipart/form-data"
          }
     })
    .then(response => response.data);
}

// class APIClient {
//   /**
//    * Fetches data from given url
//    */

//   //  get = (url, params) => {
//   //   return axios.get(url, params);
//   // };
//   get = (url, params) => {
//     let response;

//     let paramKeys = [];

//     if (params) {
//       Object.keys(params).map(key => {
//         paramKeys.push(key + '=' + params[key]);
//         return paramKeys;
//       });

//       const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
//       response = axios.get(`${url}?${queryString}`, params);
//     } else {
//       response = axios.get(`${url}`, params);
//     }

//     return response;
//   };
//   /**
//    * post given data to url
//    */
//   create = (url, data) => {
//     return axios.post(url, data);
//   };
//   /**
//    * Updates data
//    */
//   update = (url, data) => {
//     return axios.patch(url, data);
//   };

//   put = (url, data) => {
//     return axios.put(url, data);
//   };
//   /**
//    * Delete
//    */
//   delete = (url, config) => {
//     return axios.delete(url, { ...config });
//   };
// }
const getLoggedinUser = () => {
  const user = localStorage.getItem("authenticatication-crm");
  if (!user) {
    return null;
  } else {
    const descryptedData = decrypData(user)
    return JSON.parse(descryptedData);
  }
};

export { setAuthorization, getLoggedinUser };