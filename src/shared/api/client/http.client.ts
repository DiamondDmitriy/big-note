import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export default class HttpClient {
  request(conf: AxiosRequestConfig) {
    // axios.interceptors.request.use((config) => {
    //   const token = localStorage.getItem('authToken');
    //   if (token) config.headers.Authorization = `Bearer ${token}`;
    //   return config;
    // });

    return axios({
      baseURL: import.meta.env.VITE_APP_API_HOST,
      withCredentials: true,
      ...conf,
    })
  }
}
