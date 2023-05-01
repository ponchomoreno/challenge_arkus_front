import axios from "axios";

const axiosInterceptorRequest = axios.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token');
      config.headers.Authorization = 'Bearer ' + token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

export default axiosInterceptorRequest;
