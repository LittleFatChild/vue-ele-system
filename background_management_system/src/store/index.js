import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [

        ]
    },
    mutations: {
        increment( state, payload ){
            console.log(payload)
            state.users.push(payload)
        }
    },
    actions: {},
    modules: {}
});
