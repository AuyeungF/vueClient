import {defaultRouter,asyncRouter} from "../../router/index";
import {postRequest} from "../../assets/js/framework";
import router from "../../router/index";
import store from '../../store/index';
export default {
  getInfo({commit},token){
    var param = {
      username:token
    };

    return new Promise((resolve,reject)=>{

      postRequest('/api/LoginUserInfo',param).then(res=>{
        let newData = res.data;
        commit('getInfo',newData);
        store.dispatch('newRoutes',newData.permissions);
        router.addRoutes(store.getters.addRouters);
        resolve(newData)
      }).catch(err=>{
       reject(err);
      })
    })
  },
  setRole({commit},options) {
    commit('setRole',options);
  },
  newRoutes({commit},role) {
    function eachSelect (routers, userRole) {
      for (let j = 0; j < routers.length; j++) {
        if (routers[j].meta && routers[j].meta.role.length && routers[j].meta.role.indexOf(userRole) === -1) {
          routers.splice(j, 1);
          j = j !== 0 ? j - 1 : j
        }
        if (routers[j].children && routers[j].children.length) {
          eachSelect(routers[j].children, userRole)
        }
      }
    }
    let newArr = [...asyncRouter];
    eachSelect(newArr, role);
    commit('setRouters', newArr)
  }
}
