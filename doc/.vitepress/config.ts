import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'antdv-hook-enhance',
  description: 'A VitePress Site',
  appearance: false,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/getting-started' }
    ],

    sidebar: [
      {
        text: '起步',
        items: [
          { text: '起步', link: '/getting-started' },
          { text: '示例', link: '/api-examples' }
        ]
      },
      {
        text: '组件相关',
        items: [
          { text: 'select', link: '/components/select' },
          { text: 'button', link: '/components/button' },
          { text: 'table', link: '/components/table' }
        ]
      },
      {
        text: '扩展用法',
        items: [{ text: 'loading', link: '/extra/loading' }]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  },
  vite: {
    resolve: {
      alias: {
        '@hooks': fileURLToPath(new URL('../../src/package/src', import.meta.url))
      }
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  }
  // markdown: {
  //   config: (md) => {
  //     md.use(demoblockPlugin)
  //   }
  // },
  // vite: {
  //   plugins: [demoblockVitePlugin()]
  // }
})
