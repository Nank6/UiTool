import Cookies from 'js-cookie'
import { Validator_zh, Validator_en } from '@/util/form-rules'
import Vue from 'vue'

export default {
  setLang(state, data) {
    if (data) {
      Cookies.set('lang', data)
    } else {
      Cookies.remove('lang')
    }
    state.lang = data

    // el-form表单验证规则引入
    let validator = Validator_zh
    if (data === 'zhCN') {
      validator = Validator_zh
    } else if (data === 'en') {
      validator = Validator_en
    }
    Object.defineProperty(Vue.prototype, '$valid', {
      value: validator,
      configurable: true
    })
  },
  addLangPack(state, data) {
    if (data) {
      state.langPack.push(data)
    }
  },
  setThemeColor(state, data) {
    state.theme = data
  },
  changeSwitch(state, data) {
    state.collapsed = data
  }
}
