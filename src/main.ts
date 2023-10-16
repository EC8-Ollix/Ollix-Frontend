import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import store from './config/store'
import router from './config/router'
import { notifyError, notifySuccess } from './config/notificationHelper'

const app = createApp(App).use(store).use(router)

app.config.globalProperties.$notifyError = notifyError
app.config.globalProperties.$notifySuccess = notifySuccess

app.use(Antd).mount('#app')
