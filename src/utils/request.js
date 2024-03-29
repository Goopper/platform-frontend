import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'api',
    timeout: 3000
  })
  instance.interceptors.request.use(config => {
    // 若存在token则带token
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    // 放行
    return config;
  }, err => {
    console.log("请求拦截=>", err);
    return err;
  })
  return instance(config);
}
