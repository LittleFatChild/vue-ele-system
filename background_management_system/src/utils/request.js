import axios from 'axios'

const http = axios.create();
// 添加请求头拦截
http.interceptors.request.use(function (config) {
    console.log('请求拦截');
    console.log(config.headers)
    return config;
}, function(error) {
    console.log('错误拦截')
    return Promise.reject(error);
})

// 添加响应头拦截
http.interceptors.response.use(function (response){
    console.log('响应拦截')
    return response;
}, function(error) {
    console.log('响应错误');
    return Pormise.reject(error)
})

export default http;