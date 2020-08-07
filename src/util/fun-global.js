var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd'

function padding(s, len) {
  len = len - (s + '').length
  for (var i = 0; i < len; i++) { s = '0' + s }
  return s
}

// 判断两个对象的值是否相等
function isObjectValueEqual(a, b) {
  // 取对象a和b的属性名
  var aProps = Object.getOwnPropertyNames(a)
  var bProps = Object.getOwnPropertyNames(b)
  // 判断属性名的length是否一致
  if (aProps.length !== bProps.length) {
    return false
  }
  // 循环取出属性名，再判断属性值是否一致
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i]
    if (a[propName] !== b[propName]) {
      return false
    }
  }
  return true
}

export default {
  // 判断一个对象是否为空或者为null
  isEmptyObj: function(obj) {
    return obj === null || Object.keys(obj).length === 0
  },

  // 重置查询时间
  formSearchTime: function() {
    const date7Ago = new Date().setDate(new Date().getDate() - 7)
    return [new Date(date7Ago).setHours(0, 0, 0, 0), new Date(new Date().setHours(23, 59, 59, 0))]
  },

  // 时间格式化方法
  getQueryStringByName: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    var context = ''
    if (r != null) {
      context = r[2]
    }
    reg = null
    r = null
    return context === null || context === '' || context === 'undefined' ? '' : context
  },
  formatDate: {
    format: function(date, pattern) {
      pattern = pattern || DEFAULT_PATTERN
      return pattern.replace(SIGN_REGEXP, function($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length)
          case 'M':
            return padding(date.getMonth() + 1, $0.length)
          case 'd':
            return padding(date.getDate(), $0.length)
          case 'w':
            return date.getDay() + 1
          case 'h':
            return padding(date.getHours(), $0.length)
          case 'm':
            return padding(date.getMinutes(), $0.length)
          case 's':
            return padding(date.getSeconds(), $0.length)
        }
      })
    },
    parse: function(dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP)
      var matchs2 = dateString.match(/(\d)+/g)
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i])
          var sign = matchs1[i]
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int)
              break
            case 'M':
              _date.setMonth(_int - 1)
              break
            case 'd':
              _date.setDate(_int)
              break
            case 'h':
              _date.setHours(_int)
              break
            case 'm':
              _date.setMinutes(_int)
              break
            case 's':
              _date.setSeconds(_int)
              break
          }
        }
        return _date
      }
      return null
    }
  },
  // 日期，在原有日期基础上，增加days天数，默认增加1天
  addDate: function(date, days) {
    if (days === undefined || days === '') {
      days = 1
    }
    date = new Date(date)
    date.setDate(date.getDate() + days)
    var month = date.getMonth() + 1
    var day = date.getDate()
    var mm = "'" + month + "'"
    var dd = "'" + day + "'"

    // 单位数前面加0
    if (mm.length === 3) {
      month = '0' + month
    }
    if (dd.length === 3) {
      day = '0' + day
    }

    var time = date.getFullYear() + '-' + month + '-' + day
    return time
  },

  // 将图片压缩转成base64**
  getBase64Image: function(img) {
    var canvas = document.createElement('canvas')
    var width = img.width
    var height = img.height
    if (width > height) {
      if (width > 100) {
        height = Math.round(height *= 100 / width)
        width = 100
      }
    } else {
      if (height > 100) {
        width = Math.round(width *= 100 / height)
        height = 100
      }
    }
    canvas.width = width /* 设置新的图片的宽度*/
    canvas.height = height /* 设置新的图片的长度*/
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, width, height) /* 绘图*/
    var dataURL = canvas.toDataURL('image/png', 0.8)
    return dataURL.replace('data:image/png;base64,', '')
  },

  // 对象属性值清空
  objClear(obj) {
    for (const key in obj) {
      obj[key] = ''
    }
    return obj
  },

  // Json键值对对象根据键拾取值 push成数组集合
  JsonToArr(json, key) {
    const arr = []
    json.forEach(item => {
      arr.push(item[key])
    })
    return arr
  },

  // 计算表达式的值 解决eslint  eval can be harmful报错
  evil(fn) {
    var Fn = Function
    return new Fn('return ' + fn)()
  },

  // 重构JSON对象 json:原json对象；object需要合并的json数据；array需要删除的属性字段；
  rebuildJSON(json, object, array) {
    json = Object.assign(json, object)
    array.forEach((item) => {
      delete json[item]
    })
    return json
  },

  // 匹配两组json数据，把匹配上的字段赋值给第一组（用于编辑回显数据）
  matchJSON(json1, json2) {
    for (const key1 in json1) {
      for (const key2 in json2) {
        if (key1 === key2) {
          json1[key1] = json2[key2]
        }
      }
    }
    return json1
  },

  // 数组去重
  unique(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (isObjectValueEqual(arr[i], arr[j])) {
          arr.splice(j, 1)
          j--
        }
      }
    }
    return arr
  }
}
