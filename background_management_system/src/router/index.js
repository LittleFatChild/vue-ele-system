import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "Home",
        hidden: true,
        mate: {
            name: ''
        },
        component: Home,
    }, 
    {
        path: '/home/Homepage',
        name: '/Homepage',
        hidden: false,
        mate: {
            name: '控制台',
            icon: 'console'
        },
        component: () => import('../views/Homepage.vue'),
        redirect: '/index',
        children: [
            {
                path: '/index',
                mate: {
                    id: new Date().getTime(),
                    name: 'index'
                },
                component: () => import('../views/Console/index.vue')
            }
        ]
    },
    {
        path: '/home/information',
        name: '/information',
        hidden: false,
        mate: {
            name: '信息管理',
            icon: 'info'
        },
        component: () => import('../views/Homepage.vue'),
        redirect: '/list',
        children: [
            {
                path: '/list',
                mate: {
                    id: "2020-12-9-pm15.42.30",
                    name: '信息列表'
                },
                component: () => import('../views/Information/ifmation-list.vue')
            },
            {
                path: '/class',
                mate: {
                    id: "2020-12-9-pm15.42.31",
                    name: '信息分类'
                },
                component: () => import('../views/Information/ifmation-class.vue')
            }
        ]
    },
    {
        path: '/home/users',
        name: '/user',
        hidden: false,
        mate: {
            name: '用户管理',
            icon:'user'
        },
        component: () => import('../views/Homepage.vue'),
        redirect: '/ulist',
        children: [
            {
                path: '/ulist',
                mate: {
                    id: "2020-12-9-pm15.42.30",
                    name: '用户列表'
                },
                component: () => import('../views/UserManagement/user-list.vue')
            },
            {
                path: '/uclass',
                mate: {
                    id: "2020-12-9-pm15.42.31",
                    name: '用户分类'
                },
                component: () => import('../views/UserManagement/user-class.vue')
            }
        ]
    },
    
    {
        path: '/',
        hidden: true,
        mate: {
            name: ''
        },
        redirect: '/home'
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router;
