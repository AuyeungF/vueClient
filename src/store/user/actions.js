import {postRequest,deleteRequest} from "../../assets/js/framework";
import { Message } from 'element-ui'
export default {
  editUserInfo({state,commit},param){
    return new Promise((resolve,reject)=>{
      postRequest('/api/editUser/'+state.id,param)
        .then(res=>{
          Message({
            message: '修改成功！',
            type: 'success'
          });
          resolve(res)
      }).catch(err=>{
        reject(err)
      })
    });
  },
  delUserInfo({state,commit}){
    return new Promise((resolve,reject)=>{
      deleteRequest('/api/delUser/'+state.id).then(res=>{
        Message({
          message: '删除成功！',
          type: 'success'
        });
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}
