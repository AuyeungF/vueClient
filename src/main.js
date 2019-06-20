// 获取vue全局对象
import Vue from 'vue'
// 渲染对象
import App from './App'
// 单页面内路由规则配置
import router from './router'
// 按需引入element-ui框架
import './plugins/element'
// //按需引入echarts
import './plugins/echarts'
//公共样式
import './assets/css/index.css'
//状态管理Store
import store from './store/index'
//引入cookies
import Cookies from 'js-cookie'


//请求全局配置
import {getRequest,postRequest,deleteRequest,putRequest} from './assets/js/framework';
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.Cookies = Cookies;

//注册全局eventBus
Vue.prototype.evenBus = new Vue();

Vue.config.productionTip = false;
var  whiteList=['/login','/register'];
/*路由拦截*/
router.beforeEach((to,from,next)=>{
    if(store.getters.token) {
      //路由的显示
     if(!store.getters.info.role){
       store.dispatch('getInfo',store.getters.token).then( res =>{
         next({...to});
        });
      } else {
       next();
     }
    } else if(whiteList.indexOf(to.path) == -1) {
      next({path:'/login'})
     }  else {

       next();
    }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
