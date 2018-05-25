import Abstract from '../views/common/abstract.vue';

export default [{
  path: '/',
  name: '主页',
  component: (resolve) => require(['../views/index.vue'], resolve),
  children: [{
    path: '/roles',
    name: '平台-角色管理',
    meta: {
      name: '角色管理'
    },
    component: (resolve) => require(['../views/roles.vue'], resolve)
  },
    {
      path:'/home',
      name:'首页',
      meta:{
        name:'首页'
      },
      component: (resolve) => require(['../views/home/home.vue'],resolve),
      children:[
        {
          path:'mysouces',
          name:'我的资源',
          meta:{

          },
          component:(resolve) => require(['../views/home/mysouces.vue'],resolve)
        },
        {
          path:'allsouces',
          name:'所有资源',
          meta:{

          },
          component:(resolve) => require(['../views/home/allsouces.vue'],resolve)
        },
        {
          path:'discretedata',
          name:'离散数据',
          meta:{

          },
          component:(resolve) => require(['../views/home/discretedata.vue'],resolve)
        }
      ]
    },
    {
      path:'/testrouter',
      name:'测试',
      meta:{
        name:'测试'
      },
      component: (resolve) => require(['../views/home.vue'],resolve),
      children:[{
        path:'mysouces',
        name:'账号信息',
        meta:{

        },
        component:(resolve) => require(['../views/home/mysouces.vue'],resolve)
      }]
    },
    {
    path: '/accounts',
    name: '平台-账号管理',
    meta: {
      name: '账号管理'
    },
    component: (resolve) => require(['../views/accounts.vue'], resolve),
    children:[{
      path:'mysouces',
      name:'账号信息',
      meta:{

      },
      component:(resolve) => require(['../views/home/mysouces.vue'],resolve)
    }]
  }, {
    path: '/goods',
    name: '商品管理',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'list',
      name: '商品信息',
      meta: {

      },
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }
    ]
  }]
}];
