const path = require("path");
// console.log( path.resolve( __dirname, "./src/components") )
module.exports = {
    //基本路径
    //publicPath: process.env.NODE_ENV=='production' :
    // 语法检测
    lintOnSave: false,
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: true,
        // css预设器配置项
        loaderOptions: {
            scss: {
                prependData: `@import "./src/styles/main.scss";`
            }
        },
    },
    //    //配置接卸svg的loader
    chainWebpack: (config) => {
        const svgRule = config.module.rule("svg");
        svgRule.uses.clear();
        svgRule
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
                .options({
                    symbolId: "icon-[name]",
                    include: ["./src/icons"]
                });
    },
    // // 配置目录的别名
    configureWebpack: (config) => {
       config.resolve = {
           extensions:[
               '.js',
               '.json',
               '.vue'
           ],
           alias: {
               "@c": path.resolve( __dirname, "./src/components" ),//绝对路径
               "@" : path.resolve( __dirname, "./src"),
               vue$: 'vue/dist/vue.esm.js'
           }
       } 
    },
    //代理
    devServer:{
        port: 8000,
        //logLevel: 'debug',
        open: true,//启动项目自动打开浏览器
        proxy:{
            '/api': {
                target: 'http://www.web-jshtml.cn/productapi/token/',//目标接口
                //重写url
                changeOrigin: true, //是否跨域//不写等于上下白写
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    
}