// SCSS
import './assets/styles/styles.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import axios from 'axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.provide('$axios', axios.create({}))

app.mount('#app')
