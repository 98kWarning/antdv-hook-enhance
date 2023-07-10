<script setup lang="ts">
import { useAutoSelect } from '@hooks/components'

function getSelectOptionAPI() {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        }
      ])
    }, 1000)
  })
}

const result = useAutoSelect({
  apiFun: getSelectOptionAPI,
  placeholder: '选择吧',
  transformDataFun(data) {
    return data.map((e) => {
      return {
        value: e.id,
        label: e.name
      }
    })
  }
})
</script>

<template>
  <div class="col">
    <a-select v-bind="result.bindProps"></a-select>
  </div>
</template>
