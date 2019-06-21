import Vue from 'vue'
import Router from 'vue-router'
import Framework from '@/components/framework'

Vue.use(Router)
let defaultRouter = [
  {
    path:"/",
    redirect:"/dashboard",
    hidden:true
  },
  {
    path:"/",
    name:"",
    component:Framework,
    leaf:true,
    icon:"el-icon-s-home",
    children:[
      {
        path: "/dashboard",
        name:"首页",
        meta:{requireAuth:true,title:"首页"},
        component: resolve => require(['@/components/index'], resolve),
      }
    ]
  },
  {
    path:"customer",
    icon:"el-icon-s-custom",
    meta:{
      role:['超级管理员','管理员'],
      title:'基础管理'
    },
    component:Framework,
    hidden:false,
    children:[
      {
        path:"/customer",
        meta:{role:['超级管理员','管理员'],title:'客户管理'},
        component:resolve => require(['@/components/frameBasic/customer'], resolve)
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden:true,
    component: resolve => require(['@/components/login'], resolve),
    children: []
  },
  {
    path:"/register",
    name:"register",
    hidden:true,
    component: resolve => require(['@/components/register'], resolve),
    children: []
  }
];
export default new Router({
  routes: defaultRouter
})
//异步挂载的路由
//动态需要根据权限加载的路由表
let asyncRouter = [
  {
    path:"permission",
    icon:"el-icon-s-help",
    meta:{
      role:['超级管理员'],
      title:'权限管理'
    },
    component:Framework,
    hidden:false,
    children:[
      {
        path:"/permission",
        meta:{role:['超级管理员'],title:'角色管理'},
        component:resolve => require(['@/components/framePermissions/permissions'], resolve)
      },
      {
        path:"/imap",
        meta:{role:['超级管理员'],title:'地图管理'},
        component:resolve => require(['@/components/frameMap/imap'], resolve)
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

export {defaultRouter,asyncRouter}
