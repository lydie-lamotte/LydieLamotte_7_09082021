/*import { createApp } from 'vue'
import App from './App.vue'


//fontAwasome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' 

library.add(fas)

//router
import router from './router';

//store
import store from './store';


createApp(App).component('fa',FontAwesomeIcon).use(router).use(store).mount('#app')*/

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')






