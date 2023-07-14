<script setup lang="ts">
import { useBtnRequest } from '@hooks/components'
import { message } from 'ant-design-vue'

const submitFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('执行成功')
    }, 1500)
  })
}

const submit = useBtnRequest({
  apiFun: submitFetch,
  onSuccess(data) {
    message.success(data)
  }
})
</script>

<template>
  <div class="col">
    <a-button v-bind="submit" type="primary">提交</a-button>
  </div>
</template>

<style lang="less" scoped></style>
