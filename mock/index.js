import Mock from 'mockjs'
import navlist from './navlist'
import login from './login'
import echarts from './echarts'
import table from './table'
import groupList from './groupList'
import getToken from './getToken'
import tableList from './tableList'

let data = [].concat(navlist, login, echarts, table, groupList, getToken, tableList)

data.forEach(function (res) {
  Mock.mock(res.path, res.data)
})

export default Mock
