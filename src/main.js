import '@/assets/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import phoneMask from '@/directives/phoneMask'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('phone-mask', phoneMask)

app.mount('#app')
