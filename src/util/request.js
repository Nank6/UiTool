import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import router from '../router'
import Auth from '@/util/auth'

var getTokenLock = false
var CancelToken = axios.CancelToken

/**
 * Token校验
 * @param {function} cancel - 中断函数
 * @param {function} callback -  回调
 * @description 校验Token是否过期，如果Token过期则根据配置采用不同方法获取新Token
 *              自动获取Token：过期时自动调用获取Token接口。注意：当有任一请求在获取Token时，其余请求将顺延，直至新Token获取完毕
 *              跳转授权Token：过期时中断当前所有请求并跳转到对应页面获取Token。注意：跳转页面授权最佳实现应在授权页面点击触发
 */
function checkToken(cancel, callback) {
  if (!Auth.hasToken()) {
    // 自动获取Token
    if (Auth.tokenTimeoutMethod === 'getNewToken') {
      // 如果当前有请求正在获取Token
      if (getTokenLock) {
        setTimeout(function() {
          checkToken(cancel, callback)
        }, 500)
      } else {
        getTokenLock = true
        store.dispatch('auth/GetNewToken').then(() => {
          console.log('已获取新token')
          callback()
          getTokenLock = false
        })
      }
    }
    // 跳转授权Token
    if (Auth.tokenTimeoutMethod === 'jumpAuthPage' && Auth.isLogin()) {
      if (router.currentRoute.path !== '/auth') {
        // TODO 无法保证一定会中断所有请求
        cancel()
        router.push('/auth')
      }
    }
  } else {
    callback()
  }
}

// 创建axios实例
const service = axios.create({
  /** 从config文件中dev.env.js和prod.env.js中获取api基础地址 */
  // baseURL: process.env.BASE_API,//api 的 base_url
  /** 或者从config文件中index.js中的代理服务proxyTable，映射到基础api地址*/
  baseURL: '/ms/', // 对接easy-mock接口
  timeout: 5000 // 请求超时时间
})

// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
service.interceptors.request.use(
  config => {
    let cancel
    config.cancelToken = new CancelToken(function executor(c) {
      cancel = c
    })
    checkToken(cancel, function() {
      Auth.setLoginStatus()
      config.headers.Authorization = `${store.state.user.token}`
    })
    // stopRepeatRequest(config.url, cancel)/
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
service.interceptors.response.use(
  response => {
    /** status为非200是抛错 可结合自己业务进行修改*/
    const res = response.data
    if (res.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.status === 401 || res.status === 401 || res.status === 401) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
