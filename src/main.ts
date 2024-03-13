// SCSS
import './assets/styles/styles.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'

const app = createApp(App)

library.add(fas, far)
app.component('font-awesome-icon', FontAwesomeIcon)

app.config.globalProperties.axios = axios

app.use(createPinia())
app.use(router)

app.mount('#app')
