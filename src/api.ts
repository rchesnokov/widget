import Vue from 'vue';
import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
});

instance.interceptors.request.use(
  async (config) => {
    try {
      const token = await Vue.$auth.getToken();
      if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
      }
    } catch (e) {}

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
