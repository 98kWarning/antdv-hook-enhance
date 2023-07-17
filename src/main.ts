import './assets/main.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initConfig } from '@hooks/config'

import App from './App.vue'
import router from './router'

initConfig({
  pagination: {
    pageSize: 'size',
    current: 'current'
  },
  responseHandler: (res: any) => {
    if (res.code === 0) {
      return res.data
    }
    throw new Error(res.msg)
    // return Promise.reject(new Error(res.msg))
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
