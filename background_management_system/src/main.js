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
import moment from 'moment';
// import 'default-passive-events';
// import gbcss from "./styles/main.scss";
Vue.use(global);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.prototype.$http = axios
Vue.prototype.$moment = moment
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
