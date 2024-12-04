// SCSS
import './public/assets/styles/styles.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import focus from './directives/focus'

import { createHead } from '@unhead/vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'

const app = createApp(App)
const head = createHead()

app.config.globalProperties.axios = axios

app
    .use(createPinia())
    .use(router)
    .use(head)

app.directive('focus', focus)

library.add(fas, far)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
