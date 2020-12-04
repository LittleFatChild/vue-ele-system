const path = require("path");
// console.log( path.resolve( __dirname, "./src/components") )
module.exports = {
    
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
               "@" : path.resolve( __dirname, "./src")
           }
       } 
    }
}