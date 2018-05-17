import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { store } from 'Src/store';

import Helloworld from 'Components/Helloworld.vue';

Vue.use(VueRouter)

const routes = [
  { path: '/details', component: Helloworld }
];

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
