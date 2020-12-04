import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueCompositionApi from '@vue/composition-api';




// import gbcss from "./styles/main.scss";
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.prototype.$http = axios

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    // gbcss,
    render: h => h(App)
}).$mount("#app");
