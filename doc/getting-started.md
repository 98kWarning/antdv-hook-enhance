# 为什么要使用hook

通常情况下，我们使用的组件库为了通用性，考虑到大部分的使用情况，就会把组件的参数设置的比较细，比较大众化，然后就可以适应各种使用场景。
但是通用性强的同时，就会让参数多了起来，我们如果想要做到实现某个功能，就需要给组件传递多个参数。如果业务稍微复杂，那么还涉及到多个状态和生命周期。

不过，在`vue3`中，使用组合式api，我们可以将多个参数收集到一个hook中，并在hook中处理数据变化逻辑，最后只需要将hook函数返回的结果绑定给组件，
我们就能当甩手掌柜啦！

## 安装

```shell
pnpm add ant-design-vue-hook
```

## 使用
```vue
<script setup lang="ts">
import { useAutoSelect } from 'ant-design-vue-hook'

function getSelectOptionAPI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          value: 1,
          label: '张三'
        },
        {
          value: 2,
          label: '李四'
        },
        {
          value: 3,
          label: '王五'
        }
      ])
    }, 1000)
  })
}

const result = useAutoSelect({
  apiFun: getSelectOptionAPI
})
</script>

<template>
  <div class="col">
    <a-select v-bind="result.bindProps"></a-select>
  </div>
</template>
```
# 其他

除此之外，我们还准备了一些扩展hook函数，如控制loading的[useAutoRequest](/extra/loading.html)
