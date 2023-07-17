<script setup lang="ts">
import { usePaginationTable } from '@hooks/components'

function getPaginationData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 10,
        current: 1,
        pageSize: 10,
        data: [
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
          },
          {
            id: 4,
            name: '赵六'
          },
          {
            id: 5,
            name: '田七'
          },
          {
            id: 6,
            name: '张三'
          },
          {
            id: 7,
            name: '李四'
          },
          {
            id: 8,
            name: '王五'
          },
          {
            id: 9,
            name: '赵六'
          },
          {
            id: 10,
            name: '田七'
          }
        ]
      })
    }, 3000)
  })
}

const pgTable = usePaginationTable({
  apiFun: getPaginationData
})

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 400,
    align: 'center'
  }
]
</script>

<template>
  <div style="width: 500px">
    <a-table
      style="width: 100%"
      rowKey="id"
      :columns="columns"
      v-bind="pgTable.bindProps"
    ></a-table>
  </div>
</template>

<style lang="less" scoped></style>
