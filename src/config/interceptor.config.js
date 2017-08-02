/**
 * Created by NieFZ on 2017/5/9.
 */
const axios = require('axios');

axios.defaults.timeout = 60000;

axios.interceptors.request.use(
  (config) => {
    if (window.localStorage.token) {
      config.headers['x-auth-token'] = `${window.localStorage.token}`;
    }
    return config;
  },
);

axios.interceptors.response.use(
  (response) => {
    if (response && response.data && response.data.code && response.data.code === '0401') {
      window.location.href = '/login';
    }
    return response;
  },
);

module.exports = axios;
