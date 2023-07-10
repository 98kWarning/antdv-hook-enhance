<script setup lang="ts">
import SelectDemo from '../demo/select/SelectDemo.vue'
import SelectDemo2 from '../demo/select/SelectDemo2.vue'
import SelectDemo3 from '../demo/select/SelectDemo3.vue'
</script>

# useAutoSelect

## 示例

#### 简单用法

<SelectDemo />

```vue
<script setup lang="ts">
import { useAutoSelect } from '@hooks/components'

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

#### 手动执行

<SelectDemo2 />

```vue
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
```

#### 转换结果

<SelectDemo3 />

```vue
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
```



## 参数
| 参数             | 描述                            | 必选  | 类型             | 默认值 |
| ---------------- | ------------------------------- | :---: | ---------------- | :----: |
| apiFun           | 调用远程接口返回数据            | true  | ()=>[]           |   -    |
| queryInMount     | 在onMounted时调用接口初始化数据 | false | boolean          |  true  |
| initQueryParams  | 调用远程接口时传入的默认参数    | false | any[]            |   -    |
| transformDataFun | 远程接口返回数据转化为option    | false | (data:any[])=>[] |   -    |
| placeholder      | 组件的placeholder               | false | string           |   -    |


## 实例属性与方法
| 参数       | 描述                       | 类型               |
| ---------- | -------------------------- | ------------------ |
| bindProps  | 绑定给组件的属性值         | {}                 |
| loadData   | 手动调用远程接口           | ()=>promise        |
| setOptions | 手动设置select的option属性 | (options:[])=>void |