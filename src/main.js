import Vue from 'vue'
import App from './App.vue'
import { store } from 'Src/store';
import UsersService from 'Services/users.service';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
