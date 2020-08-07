import Cookies from 'js-cookie'

const state = {
  // 用户名
  name: '',
  // 用户头像
  avatar: ''
}

const mutations = {
  setName: (state, data) => {
    if (data) {
      Cookies.set('userName', encodeURIComponent(data))
    } else {
      Cookies.remove('userName')
    }
    state.name = data
  },
  setAvatar: (state, avatar) => {
    if (avatar) {
      Cookies.set('userAvatar', encodeURIComponent(avatar))
    } else {
      Cookies.remove('userAvatar')
    }
    state.avatar = avatar
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
