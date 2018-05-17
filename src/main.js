import Vue from 'vue'
import App from './App.vue'
import { store } from 'Src/store';

import Helloworld from 'Components/Helloworld.vue';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
