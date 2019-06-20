import axios from 'axios'
import { MessageBox } from 'element-ui';
import { Notification } from 'element-ui';

// 获取远程访问地址
export const getRemoteURI = () => {
  return "http://localhost:8081";
};

let base = getRemoteURI();

// 让ajax携带cookie
axios.defaults.withCredentials=true;

//ajax请求拦截
// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config){
  // 处理请求之前的配置
  return config;

}, function (error){
  Notification.warning({title: '提示信息',message: '当前网络状态似乎存在问题，请检查设置'});
  // 请求失败的处理
  return Promise.reject(error);
});

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response){
  if(response.status == 200) {
    var result = response.data;
    return result;
  }

}, function (error){
  MessageBox.alert('当前网络状态似乎存在问题，请检查设置', '提示信息', {
    confirmButtonText: '确定',
    callback: action => {
     window.location.href = window.location.origin + '/#/login';
     window.location.reload();
    }
  });
  // 处理响应失败
  return Promise.reject(error);
});
//get请求
export const getRequest = (url)=>{
  return axios({
    method:"get",
    url:`${base}${url}`
  })
};
//post请求
export const postRequest = (url,param) =>{
  //let data = qs.stringify(param);
  return axios({
    method:"POST",
    url:`${base}${url}`,
    data:param,
    headers: {
      'Content-Type': 'application/json'
    }
  })
};
//put请求
export const putRequest = (url,param) =>{
  return axios({
    method:"put",
    url:`${base}${url}`,
    data:param,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
};
//delete请求

export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}

