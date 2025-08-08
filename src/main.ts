import './assets/styles/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import VueClickAway from 'vue3-click-away'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueClickAway)
app.use(ElementPlus)

app.mount('#app')
