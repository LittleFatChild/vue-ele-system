import Vue from "vue";
import Vuex from "vuex";
import app from './modles/app';
import params from './modles/params';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    },
    mutations: {
        
    },
    actions: {},
    modules: {
        app,
        params
    }
});
