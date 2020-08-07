import {
  login,
  logout,
  getNavList,
  getNewToken
} from './api'
import Auth from '@/util/auth'
import Cookies from 'js-cookie'

const state = {
  token: '',
  navList: []
}

const mutations = {
  setToken: (state, token) => {
    if (token) {
      Auth.setToken(token)
      Auth.setLoginStatus()
    } else {
      Auth.removeToken()
      Auth.removeLoginStatus()
    }
    state.token = token
  },
  setNavList: (state, data) => {
    state.navList = data
  }
}

const actions = {

  // 登录
  Login({
    commit
  }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      login(username, userInfo.password).then(response => {
        const data = response.data
        commit('setToken', data.token)
        commit('user/setName', data.name, {
          root: true
        })
        commit('user/setAvatar', data.avatar, {
          root: true
        })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重新登录==>登陆后手动刷新页面
  relogin({
    dispatch,
    commit,
    state
  }) {
    return new Promise((resolve) => {
      // 根据Token进行重新登录
      const token = Cookies.get('token')
      if (!token) {
        // 这里需要根据实际情况确认token刷新协议
        // 若直接使用时因state.token不存在，将无法获得新的token
        dispatch('GetNewToken').then(() => {
          commit('setToken', state.token)
        })
      } else {
        commit('setToken', token)
      }
      commit('user/setName', decodeURIComponent(Cookies.get('userName')), {
        root: true
      })
      commit('user/setAvatar', decodeURIComponent(Cookies.get('userAvatar')), {
        root: true
      })
      resolve()
    })
  },

  // 获取新Token
  GetNewToken({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getNewToken(state.token).then(response => {
        const data = response.data
        commit('setToken', data)
        resolve()
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取该用户的菜单列表
  GetNavList({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getNavList(state.token).then(response => {
        const data = response.data
        commit('setNavList', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  LogOut({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('setToken', '')
        commit('user/setName', '', {
          root: true
        })
        commit('tagNav/removeTagNav', '', {
          root: true
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 将菜单列表扁平化形成权限列表
  getPermissionList({
    state
  }) {
    return new Promise((resolve) => {
      const permissionList = []
      // 将菜单数据扁平化为一级
      function flatNavList(arr) {
        for (const v of arr) {
          if (v.child && v.child.length) {
            flatNavList(v.child)
          } else {
            permissionList.push(v)
          }
        }
      }
      flatNavList(state.navList)
      resolve(permissionList)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
