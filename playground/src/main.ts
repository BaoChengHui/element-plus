import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import opComponents from "op-components";
import elementPlus from "element-plus";

createApp(App).use(opComponents).use(elementPlus).mount('#app')
