<script setup lang="ts">
import { message } from 'ant-design-vue'
import { useAutoRequest } from '@hooks/components'

const submitFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('执行成功')
    }, 1500)
  })
}

const [loading, submit] = useAutoRequest(submitFetch, {
  onSuccess: (res) => {
    message.success(res)
  }
})
</script>

<template>
  <div>
    <a-space>
      <!-- 多个按钮使用同一个loading状态 -->
      <a-button :loading="loading">取消</a-button>
      <a-button :loading="loading" type="primary" @click="submit">提交</a-button>
    </a-space>
  </div>
</template>

<style lang="less" scoped></style>
