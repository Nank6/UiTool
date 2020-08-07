var data = {
  "total": 100,
  "items|5-15": [{
    id: '@increment',
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    url: 'http://127.0.0.1:8080',
    address: '/postMail',
    params: "{'org_code': '001','user_name': 'Jack','tel': '1888888888' }",
    // content_short: '我是测试数据',
    // forecast: '@float(0, 100, 2, 2)',
    // importance: '@integer(1, 3)',
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    // 'status|1': ['published', 'draft', 'deleted'],
    timestamp: '@datetime',
    // comment_disabled: true,
    // pageviews: '@integer(300, 5000)',
    // platforms: ['a-platform']
  }]
}

export default [{
  path: '/article/list',
  data: data
}]
