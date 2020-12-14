import router from './index';
import ck from '../utils/cookie';
import store from '../store/index'

const whiteRouter = [ '/home', '/detail' ]
router.beforeEach((to, from, next) => {
    if( ck.gT() ){
       if( to.path === '/home'){
            ck.rT();
            ck.rU();
            store.commit('app/SET_USERNAME','');
            store.commit('app/SET_TOKEN', '')
       }
       next()
    }else{
        if (whiteRouter.indexOf(to.path) != -1) {
            next();
        }
        next('/home');
    }
    
})