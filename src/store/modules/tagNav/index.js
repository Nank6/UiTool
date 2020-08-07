const state = {
  // 是否要刷新当前页面
  refresh: false,
  // 元素位置坐标
  index: 0,
  // 是否要缓存页面，默认不缓存
  cachePage: true,
  // 已经打开的页面
  openedPageList: [],
  // 缓存的页面
  cachedPageName: []
}

const mutations = {
  setFresh: (state, data) => {
    state.refresh = data
  },
  addTagNav(state, data) {
    if (data.path.indexOf('redirect') >= 0) return
    if (state.openedPageList.some(v => v.path === data.path)) return
    if (state.cachedPageName.includes(data.name)) {
      console.error(`${data.name} 组件出现命名重复，请检查组件中的name字段。当前组件所在的路由地址为：${data.path}`)
      return
    }
    if (state.refresh) {
      console.log(state.index)
      state.openedPageList.splice(state.index, 0, data)
      if (state.cachePage) {
        state.cachedPageName.splice(state.index, 0, data.name)
      }
    } else {
      state.openedPageList.push(data)
      if (state.cachePage) {
        state.cachedPageName.push(data.name)
      }
    }
  },
  removeTagNav(state, data) {
    if (data) {
      for (const [i, v] of state.openedPageList.entries()) {
        if (v.path === data.path) {
          state.openedPageList.splice(i, 1)
        }
      }

      if (state.cachePage) {
        const index = state.cachedPageName.indexOf(data.name)
        if (index >= 0) {
          state.cachedPageName.splice(index, 1)
        }
      }
    } else {
      state.openedPageList = []
      state.cachedPageName = []
    }
  },
  delCachedView: (state, data) => {
    for (const i of state.cachedPageName) {
      if (i === data.name) {
        const index = state.cachedPageName.indexOf(i)
        state.index = index
        state.cachedPageName.splice(index, 1)
        state.openedPageList.splice(index, 1)
        break
      }
    }
  },
  delCachedView_NavBar: (state, data) => {
    for (const i of state.cachedPageName) {
      if (i === data.meta.name) {
        const index = state.cachedPageName.indexOf(i)
        state.index = index
        state.cachedPageName.splice(index, 1)
        state.openedPageList.splice(index, 1)
        break
      }
    }
  },
  delOthersTagNav(state, data) {
    if (data) {
      state.openedPageList = state.openedPageList.filter(item => item.path === data.path)

      if (state.cachePage) {
        const index = state.cachedPageName.indexOf(data.name)
        if (index >= 0) {
          state.cachedPageName = state.cachedPageName.filter(item => item === data.name)
        }
      }
    }
  },
  delAllTagNav(state) {
    state.openedPageList = []
    state.cachedPageName = []
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
