/**
 * Created by Administrator on 2018/7/20.
 */
import emitter from './Emitter'
import axios from 'axios';
axios.defaults.withCredentials=true;
axios.defaults.timeout = 1000*60*30;
axios.defaults.baseURL ='';
//axios.defaults.baseURL ='http:127.0.0.1:3000';

//http request 拦截器
/*axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);*/

//http response 拦截器
/*axios.interceptors.response.use(
  response => {
    if(response.data.status ==='not-logged-in'){
      console.log('拦截成功 返回 讲入登录面');
      emitter.trigger('not-logged-in')
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)*/

export default axios;
