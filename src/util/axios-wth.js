import axios from 'axios'
import qs from 'qs'
let service = axios.create({
  baseURL: '/api/',
  timeout: 5000 // 请求超时时间
})
// 请求拦截器
service.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
export default service