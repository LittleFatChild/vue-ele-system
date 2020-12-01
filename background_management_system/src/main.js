import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import gbcss from "./styles/main.scss";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    // gbcss,
    render: h => h(App)
}).$mount("#app");
