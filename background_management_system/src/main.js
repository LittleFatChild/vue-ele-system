import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './router/permit';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueCompositionApi from '@vue/composition-api';
import './icons/';
import global from './utils/global';

Vue.use(global);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.prototype.$http = axios
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
