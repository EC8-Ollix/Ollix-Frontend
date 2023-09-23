import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
//import "ant-design-vue/dist/antd.css";
import './style.css'

const app = createApp(App);

app.use(Antd).mount('#app');