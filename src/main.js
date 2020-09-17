import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import 'element-ui/lib/theme-chalk/index.css';
const app = createApp(App)
app.use(router)
app.mount('#app')