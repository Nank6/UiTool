// 生产环境中注释掉以下语句
import 'sysStatic/css/theme-dark.scss'
import '../mock/index.js'

import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import request from './util/restful-api'
import globalFun from '@/util/fun-global' // 引入全局工具函数
import i18n from './util/i18n'
import './assets/font/iconfont.css' // 引入阿里字体图标
import App from './index'
import './icons' // icon

import * as filters from './filters' // 全局过滤器
import './components/GlobalComponents/index' // 自动注册全局业务组件
import './plugins/install'

// 注册组件到Vue
// 对接restful APi交互方式工具类
Vue.prototype.request = request
Vue.prototype.$gFun = globalFun

Vue.use(ElementUI, {
  size: 'mini',
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
