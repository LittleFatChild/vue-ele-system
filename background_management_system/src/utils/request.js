import axios from 'axios';
import { Message } from 'element-ui'
import ck from './cookie'

const BASEURL = process.env.NODE_ENV === 'development' ? '/api' :'';
// const http = axios.create();

//跨域 同源策略限制 如果是两个后台发起的网络请求则不存在跨域

const http = axios.create({ // http.defaults.baseURL = 'http://www.web-jshtml.cn/productapi/';
    baseURL: BASEURL
})


const whiteToken = [
    '/login/',
    /register/,
    '/getSms/'
]
// 添加请求头拦截
http.interceptors.request.use(function (config) {
    // console.log(config.url)
    if( whiteToken.indexOf(config.url) != -1 ){
        return config;
    } else {
        if( ck.gT() ){
            config.headers.Tokey = ck.gT();
            config.headers.UserName = ck.gU();
            return config;
        }else{
            const message = '错误，请重新登录'
            Message.error( message );
            return Promise.reject({ error:  message })
        }
    }
}, function(error) {
    return Promise.reject(error);
})

// 添加响应头拦截
http.interceptors.response.use(function (response){
    // console.log(response);
    if ( response.data.resCode != 0) {
        Message.error( response.data.message );
        console.log(response)
        return response(error)
    }
    return response;
}, function(error) {
    return Promise.reject(error)
})

export default http;