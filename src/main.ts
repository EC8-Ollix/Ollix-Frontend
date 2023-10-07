import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import store from './config/store'
import router from './config/router'

const app = createApp(App).use(store).use(router)

app.use(Antd).mount('#app')
