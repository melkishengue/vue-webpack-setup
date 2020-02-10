import "@babel/polyfill";
import Vue from 'vue'
import App from './App.vue'
import { store } from 'Src/store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

if (module && module.hot) {
  module.hot.accept(); 
}