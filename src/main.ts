import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index' // 引入vue-router
import store, { key } from './store/index' // 引入vuex
import './index.css'

// 引入days
// import dayjs from 'dayjs' // load on demand
// dayjs.locale('es') // use Spanish locale globally
// import relativeTime from 'dayjs/plugin/relativeTime'
// dayjs.extend(relativeTime)

const app = createApp(App) // 创建实例
app.use(router) // 挂载路由
app.use(store, key) // 挂载vuex
app.mount('#app')
// app.config.globalProperties.$dayjs = dayjs
