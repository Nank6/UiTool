const Layout = () =>
  import( /* webpackChunkName: 'index' */ '../views/layout')

const staticRoute = [{
  path: '/',
  redirect: '/home'
},
{
  path: '/error',
  component: () =>
    import( /* webpackChunkName: 'error' */ '../views/error'),
  children: [{
    path: '401',
    component: () =>
      import( /* webpackChunkName: 'error' */ '../views/error/401')
  },
  {
    path: '403',
    component: () =>
      import( /* webpackChunkName: 'error' */ '../views/error/403')
  },
  {
    path: '404',
    component: () =>
      import( /* webpackChunkName: 'error' */ '../views/error/404')
  },
  {
    path: '500',
    component: () =>
      import( /* webpackChunkName: 'error' */ '../views/error/500')
  }
  ]
},
{
  path: '/redirect/:path*', // path为默认名称 通配符*必须存在 反之404
  component: Layout,
  meta: {
    name: 'redirect',
    icon: 'redirect'
  },
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'redirect' */ '../views/redirect')
  }]
},
{
  path: '/home',
  component: Layout,
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'home' */ '../views/home')
  }]
},
{
  path: '/login',
  component: () =>
    import( /* webpackChunkName: 'login' */ '../views/login')
},
{
  path: '/components',
  component: Layout,
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'components' */ '../views/components')
  },
  {
    path: 'pageNotes',
    component: () =>
      import( /* webpackChunkName: 'components' */ '../views/components/assist/pageNotes')
  },
  {
    path: 'permission',
    component: () =>
      import( /* webpackChunkName: 'components' */ '../views/components/function/permission')
  },
  {
    path: 'pageTable',
    component: () =>
      import( /* webpackChunkName: 'components' */ '../views/components/function/pageTable')
  },
  {
    path: 'pageSearch',
    component: () =>
      import( /* webpackChunkName: 'components' */ '../views/components/ui/pageSearch')
  },
  {
    path: 'pageSection',
    component: () =>
      import( /* webpackChunkName: 'components' */ '../views/components/ui/pageSection')
  },
  {
    path: 'pageTitle',
    component: () =>
      import( /* webpackChunkName: 'components' */ '../views/components/ui/pageTitle')
  },
  {
    path: 'pageToolbar',
    component: () =>
      import( /* webpackChunkName: 'components' */ '../views/components/ui/pageToolbar')
  }
  ]
},
{
  path: '/example',
  component: Layout,
  children: [{
    path: 'complexTable',
    component: () =>
      import( /* webpackChunkName: 'example' */ '../views/example/complexTable')
  }, {
    path: 'table',
    component: () =>
      import( /* webpackChunkName: 'example' */ '../views/example/table')
  },
  {
    path: 'charts',
    component: () =>
      import( /* webpackChunkName: 'example' */ '../views/example/charts')
  },
  {
    path: 'map',
    component: () =>
      import( /* webpackChunkName: 'example' */ '../views/example/map')
  }
  ]
},
{
  path: '/i18n',
  component: Layout,
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'i18n' */ '../views/i18n')
  }]
},
{
  path: '/icons',
  component: Layout,
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'icons' */ '../views/icons')
  }]
},
{
  path: '/theme',
  component: Layout,
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'themeChange' */ '../views/themeChange')
  }]
},
{
  path: '*',
  redirect: '/error/404'
},
{
  path: '/richText',
  component: Layout,
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'themeChange' */ '../views/richText')
  }]
}, {
  path: '/upload',
  component: Layout,
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'chart' */ '../views/upload')
  }]
}, {
  path: '/chart1',
  component: Layout,
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'chart' */ '../views/vcharts')
  }]
},
{
  path: '/responseList',
  component: Layout,
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'themeChange' */ '../views/scan/responseList')
  }]
},
{
  path: '/standardList',
  component: Layout,
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'themeChange' */ '../views/scan/standardList')
  }]
},
{
  path: '/compareList',
  component: Layout,
  children: [{
    path: '',
    component: () =>
      import( /* webpackChunkName: 'themeChange' */ '../views/scan/compareList')
  }]
}
]

export default staticRoute
