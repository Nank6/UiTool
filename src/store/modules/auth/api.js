// import request from '@/util/request'
import request from '@/util/axios-mock' // mock接口集成

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getNavList(token) {
  return request({
    url: '/user/navlist',
    method: 'post',
    params: {
      // token // mock 移除token
    }
  })
}

export function getNewToken(token) {
  return request({
    url: '/getToken',
    method: 'post',
    params: {
      // token // mock 移除token
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
