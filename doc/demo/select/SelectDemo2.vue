<script setup lang="ts">
import { useAutoSelect } from '@hooks/components'
import { onMounted } from 'vue'

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
  apiFun: getSelectOptionAPI,
  queryInMount: false
})

onMounted(() => {
  result.loadData()
})
</script>

<template>
  <div class="col">
    <a-select v-bind="result.bindProps"></a-select>
  </div>
</template>
