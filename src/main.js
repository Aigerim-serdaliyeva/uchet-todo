import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

import { router } from './router';
import { store } from './store';
import 'bootstrap';
import './validate';

Vue.use(VueRouter);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;
import "./assets/scss/main.scss";

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
