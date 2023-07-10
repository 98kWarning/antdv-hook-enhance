import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'antdv-hook-enhance',
  description: 'A VitePress Site',
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
        text: 'hook列表',
        items: [
          { text: 'select', link: '/components/select' },
          { text: 'button', link: '/components/button' },
          { text: 'table', link: '/components/table' }
        ]
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
