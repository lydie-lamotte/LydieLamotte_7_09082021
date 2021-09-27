import { createApp } from 'vue'
import App from './App.vue'

//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' 

library.add(fas)

//router
import router from './router';

//formatage date
import dayjs from 'dayjs';

createApp(App).component('fa',FontAwesomeIcon).use(router).use(dayjs).mount('#app')







