var data = [
  {
    path: '/home',
    name: '配置中心',
    icon: 'el-icon-star-on'
  },
  {
    name: '抓取报文管理',
    path: '/responseList',
    icon: 'el-icon-warning',
    permission: ['query', 'add', 'edit', 'delete']
  }, {
    name: '标准报文管理',
    path: '/standardList',
    icon: 'el-icon-warning',
    permission: ['query', 'add', 'edit', 'delete']
  },
  {
    name: '对比报文管理',
    path: '/compareList',
    icon: 'el-icon-warning',
    permission: ['query', 'add', 'edit', 'delete']
  }
]

export default [{
  path: '/user/navlist',
  data: data
}]
