<script setup lang="ts">
import { message } from 'ant-design-vue'
import { useAutoLoading } from '@hooks/components'

const submitFetch = (type: number) => {
  return new Promise((resolve) => {
    console.log('submitFetch', type)
    setTimeout(() => {
      resolve('执行成功')
    }, 1500)
  })
}

const saveFetch = (type: number) => {
  return new Promise((resolve) => {
    console.log('saveFetch', type)

    setTimeout(() => {
      resolve('执行成功')
    }, 1500)
  })
}

const [loading, run] = useAutoLoading()

function submit(type: number) {
  if (type === 1) {
    run(submitFetch(type)).then((res) => {
      message.success(res)
    })
  } else {
    run(saveFetch(type)).then((res) => {
      message.success(res)
    })
  }
}
</script>

<template>
  <div>
    <a-space>
      <!-- 多个按钮使用同一个loading状态 -->
      <a-button :loading="loading" @click="submit(2)">暂存</a-button>
      <a-button :loading="loading" type="primary" @click="submit(1)">提交</a-button>
    </a-space>
  </div>
</template>

<style lang="less" scoped></style>
