import Vue from 'vue';
import Svgicon from './components/Svgicon.vue';
//全局组件
Vue.component('svg-icon',Svgicon);
//  1.读取svg文件 转化成webpack能访问的资源(对象)
const req = require.context('./svg',false, /\.svg$/);
const requireAll = requireContext => {
    return requireContext.keys().map(requireContext);
}

requireAll(req);
//简写
// const req = require.context('./svg', false, /\.svg$/);
// req.keys().map(req);
//  //2.配置webpack
//  //3.下载loader
//  npm install svg-sprite-loader -S