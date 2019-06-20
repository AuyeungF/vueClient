import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
//登录
import LoginGetters from './login/getters'
import LoginMutations from './login/mutations'
import LoginActions from './login/actions'
//权限
import rolesMutations from './index/mutaions'
import rolesActions from './index/actions'
import rolesGetters from './index/getters'
//用户信息
import userMutations from './user/mutations'
import userActions from './user/actions'
import userGetters from './user/getters'




Vue.use(Vuex);
Vue.use(Cookies);
//登录管理
const login = {
  state:{
    token:Cookies.get('token')
  },
  getters:LoginGetters,
  mutations:LoginMutations,
  actions:LoginActions
};
//权限管理
const roles = {
  state:{
    info:"",
    routers: [],
    addRouters: []
  },
  getters:rolesGetters,
  mutations:rolesMutations,
  actions:rolesActions
};
//用户管理
const user = {
  state:{
    id:"",
  },
  mutations:userMutations,
  actions:userActions,
  getters:userGetters
};



export default new Vuex.Store({
  modules:{
    login,
    roles,
    user
  }
})
