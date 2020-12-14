import axios from 'axios';
import { Message } from 'element-ui'
import ck from './cookie'

const BASEURL = process.env.NODE_ENV === 'development' ? '/api' :'';
// const http = axios.create();

//跨域 同源策略限制 如果是两个后台发起的网络请求则不存在跨域

const http = axios.create({ // http.defaults.baseURL = 'http://www.web-jshtml.cn/productapi/';
    baseURL: BASEURL
})


// 添加请求头拦截
http.interceptors.request.use(function (config) {
    // console.log('请求拦截');
    // console.log( config )
//    console.log( config )
    if(ck.gT()){
        config.headers.token = ck.gT();
    }
    // console.log(config)
    return config;
}, function(error) {
    //console.log('错误拦截')
    return Promise.reject(error);
})

// 添加响应头拦截
http.interceptors.response.use(function (response){
    console.log(response);
    if ( response.data.resCode != 0) {
        Message.error( response.data.message );
        // console.log('响应拦截');
        console.log(response.data );
        // console.log(response)
        return response(error)
    }
    return response;
}, function(error) {
    //console.log('响应错误');
    return Promise.reject(error)
})

export default http;