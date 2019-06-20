import Cookies from 'js-cookie'
import {defaultRouter,asyncRouter} from "../../router/index";
import router from "../../router/index"
import store from '../../store/index'
export default {
  getInfo(state,info) {
    //设置权限并防止刷新页面丢失数据
    //通过cookie存储
    state.info = info;
    Cookies.set('info',state.info,{expire:1/24});
  },
  setRole(state,options) {
    //重置权限
    state.info = {
      role:options.role,
      permissions:options.permissions
    }
    Cookies.set('info',state.info,{expire:1/24});

    store.dispatch('newRoutes',options.permissions);

    router.addRoutes(store.getters.addRouters);
  },
  setRouters: (state, routers) => {
    state.addRouters = routers  // 保存动态路由用来addRouter
    state.routers = defaultRouter.concat(routers) // 所有有权限的路由表，用来生成菜单列表
  }
}
