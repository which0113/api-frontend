export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录', path: '/user/login', component: './User/Login'},
      {
        name: '注册账号',
        path: '/user/register',
        component: './User/Register',
      },
      {
        name: '注册账号',
        path: '/user/register/:id',
        component: './User/Register',
        hideInMenu: true,
      },
    ],
  },
  {path: '/:id', name: '欢迎', icon: 'smile', component: './Welcome', hideInMenu: true,},
  {path: '/', name: '欢迎', icon: 'smile', component: './Welcome'},
  {path: '/interface/list', name: '接口广场', icon: 'RedditOutlined', component: './InterfaceSquare'},
  {
    path: '/account/center',
    name: '个人中心',
    icon: 'UserOutlined',
    access: 'canUser',
    component: './User/UserInfo',
    hideInMenu: true,
  },
  {path: '/analyse', name: '智能分析', icon: 'barChart', component: './AddChartAsync'},
  {path: '/chart', name: '我的图表', icon: 'pieChart', access: 'canUser', component: './MyChart'},
  {
    path: '/interfaceInfo/:id',
    name: '接口详情',
    component: './InterfaceInfo',
    hideInMenu: true,
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        icon: 'ApiOutlined',
        path: '/admin/interface/list',
        component: './Admin/InterfaceInfoList',
      },
      {
        name: '图表管理',
        icon: 'ApiOutlined',
        path: '/admin/chart/list',
        component: './Admin/ChartList',
      },
      {
        name: '用户管理',
        icon: 'TeamOutlined',
        path: '/admin/user/list',
        component: './Admin/UserList',
      },
    ],
  },
];
