/*
 * @Description:
 * @Version:
 * @Company: 杭州凯立通信有限公司
 * @Author: Jesen
 * @Date: 2018-11-28 14:46:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-01-03 15:04:50
 */
import service from './request'
// restful API接口请求方式设置
// 注意常规写法参数(data:params 表示参数是在请求体中以Request PayLoad传递；params: params 表示以地址栏问号拼接以Query String parameters传递)
const base = ''

const postRequest = (url, params) => {
  return service({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
const uploadFileRequest = (url, params) => {
  return service({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
const putRequest = (url, params) => {
  return service({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
const deleteRequest = (url, params) => {
  return service({
    method: 'delete',
    url: `${base}${url}`,
    params: params
  })
}
const getRequestParams = (url, params) => {
  return service({
    method: 'get',
    url: `${base}${url}`,
    params: params
  })
}
// axios get请求 传递数组参数
const qs = require('qs')
const getRequestParamsLIst = (url, params) => {
  return service({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

const request = (method, url, params) => {
  switch (method) {
    case 'get':
      return getRequestParams(url, params)
    case 'post':
      return postRequest(url, params)
    case 'delete':
      return deleteRequest(url, params)
    case 'put':
      return putRequest(url, params)
    case 'upload':
      return uploadFileRequest(url, params)
    case 'getList':
      return getRequestParamsLIst(url, params)
  }
}

export default request
