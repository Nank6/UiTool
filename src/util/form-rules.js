import { mobile_zh, mobile_en } from '@/util/validate'

export const Validator_zh = {
  /* 获取手机号规则校验器*/
  mobile(required) {
    const validPhone = (rule, value, callback) => {
      if (value != null && value !== '') {
        if (!mobile_zh(value)) {
          callback(new Error('请输入正确的手机号!'))
        } else {
          callback()
        }
      } else {
        if (required) {
          callback(new Error('请填写手机号码'))
        } else {
          callback()
        }
      }
    }
    return validPhone
  },

  /* maxLength文本框长度限制*/
  lengthRule(key) {
    const ruls = {
      name: 10,
      supplyName: 100
    }
    return ruls[key]
  },

  // 验证提示信息
  message(value) {
    return value
  }
}

export const Validator_en = {
  /* 获取手机号规则校验器*/
  mobile(required) {
    const validPhone = (rule, value, callback) => {
      if (value != null && value !== '') {
        if (!mobile_en(value)) {
          callback(new Error('Please input the mobile phone number in the correct format'))
        } else {
          callback()
        }
      } else {
        if (required) {
          callback(new Error('Please input your mobile phone number'))
        } else {
          callback()
        }
      }
    }
    return validPhone
  },

  /* maxLength文本框长度限制*/
  lengthRule(key) {
    const ruls = {
      name: 100,
      supplyName: 100
    }
    return ruls[key]
  },

  // 验证提示信息
  message(value) {
    return ''
  }
}
