import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueCarousel from 'vue-carousel';



import './assets/main.css'

const app = createApp(App)

app.use(VueCarousel);

app.use(router)

app.mount('#app')
