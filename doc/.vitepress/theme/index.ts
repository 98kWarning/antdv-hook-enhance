import DefaultTheme from 'vitepress/theme'
import Antd from 'ant-design-vue'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import 'ant-design-vue/dist/antd.css'
// import 'ant-design-vue/dist/antd.dark.css'

import '@vitepress-demo-preview/component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-preview', AntDesignContainer)
    app.use(Antd)
  }
}
