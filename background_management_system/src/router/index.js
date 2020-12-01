import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
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

//  // 路由守卫
router.beforeEach((to, from, next) => {
    // console.log(to);// 去
    // console.log(from);// 来自
    const isLogin = localStorage.getItem('ele_login') ? true : false;
    const reg = /(login\/)?(sign)|(register)/
    if( reg.test(to.path) ){
        next();
        console.log(true);
    } else{
        isLogin ? next('/') : next('/login');
        console.log(to.path);
        console.log(reg.test(to.path) )
        console.log('Please login first');
    }
})

export default router;
