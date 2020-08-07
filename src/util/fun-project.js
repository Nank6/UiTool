// 二次确认弹框方法提取
export function confirm(message = this.$t('common.deleteMsg')) {
  return new Promise((resolve, reject) => {
    this.$confirm(message, this.$t('common.prompt'), {
      type: 'warning'
    }).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}
// 导出方法提取
export function exportMethod(params) {
  const paramsStr = JSON.stringify(params)
  window.location.href = '/api/kaili-basic/export/do?data=' + encodeURI(encodeURI(paramsStr))
}
// 新版本导出方法提取
export function exportTransform(url, params) {
  function transformRequest(data) {
    let ret = ''
    for (const it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }
  window.location.href = `/api/${url}?${transformRequest(params)}`
}
