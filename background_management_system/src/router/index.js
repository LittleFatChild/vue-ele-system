import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "Home",
        component: Home,
    }, 
    {
        path: '/Homepage',
        name: '/Homepage',
        component: () => import('../views/Homepage.vue')
    },
    
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),//webpackChunkName: "about"
        redirect: '/login/sign',
        children:[
            {   
                path: "/login/sign",
                name: "Sign",
                component: () => import("../views/login/Sign.vue")
            }, {
                path: "/login/register",
                name: "Register",
                component: () => import("../views/login/Register.vue")
            }
        ]
    },
    // {
    //     path: '/index',
    //     component: () => import("../views/index.vue")
    // },
    {
        path: '/',
        redirect: '/home'
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

// //  // 路由守卫
// router.beforeEach((to, from, next) => {
//     // console.log(to);// 去
//     // console.log(from);// 来自
    
//     const isLogin = localStorage.getItem('ele_login') ? true : false;
//     const lreg = /^(\/login)?=\/(\/s)|(sign$)|(register)$/
//     // if( lreg.test(to.path) ){
//     //     next();
//     // } else{
//     //     isLogin ? next('/') : next('/login');
//     //     console.log(to.path);
//     //     console.log(reg.test(to.path) )
//     //     console.log('Please login first');
//     // }

//     const isHome = localStorage.getItem('ele_home') ? true : false;
//     const hreg = /^\/home$/
//     // if ( hreg.test(to.path) ) {
//     //     next();
//     // } else {
//     //     isHome ? next('/') : next('/home');
//     //     console.log(to.path);
//     //     console.log(reg.test(to.path))
//     //     console.log('Please login first');
//     // }

//     if ( hreg.test(to.path) || lreg.test(to.path)) {
//         next();
//     } else {
//         if ( isHome || isLogin ){
//             next('/')
//         }else{
//             next('/home')
//         }
//         // (isHome || isLogin) ? next('/') : next('/home') || next('/login');
//         // console.log('Please login first');
//     }
// })

export default router;
