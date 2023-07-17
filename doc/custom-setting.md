# 个性化

各个项目对接口请求的封装不尽相同，为了抹平差异，让老项目无需修改就可以使用，这里推出了可以自定义配置的选项


## 请求结果格式统一转化

默认情况下，hook的apiFun要求返回的结果直接在then中取到，错误则在catch中捕捉
```ts
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

getSelectOptionAPI().then(res=>{
    console.log(res)// res直接是前端需要的结果数组
}).catch(e=>{
    console.error(e) // 报错则在catch中获取
})
```

但大多数情况下，现存项目中的请求结果是这样的
```ts
function getSelectOptionAPI() {
  return new Promise((resolve) => {
    // 请求结果封装了一层
    const res = {
        code:200,
        msg:'success',
        data:[
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
        ]
    }
    setTimeout(() => {
      resolve(res)
    }, 1000)
  })
}

getSelectOptionAPI().then(res=>{
   // res外面封装了一层
    if(res.code === 200){
        console.log(res.data)
    }else{
        console.error(res.msg) 
    }
}).catch(e=>{
    // catch 的出场率很低
    console.error(e) 
})
```
为了能适配所有的接口请求格式，增加了一个`responseHandler`配置，示例如下

- 在`main.ts`中
```ts
import './assets/main.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initConfig } from '@hooks/config'

import App from './App.vue'
import router from './router'

initConfig({
  responseHandler: (res: any) => {
    if (res.code === 0) {
      return res.data
    }
    // 抛出的错误使用 Error 包装
    throw new Error(res.msg)
    // 或者
    // return Promise.reject(new Error(res.msg))
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
```

- 对应的接口就可以正常使用
```ts
function getSelectOptionAPI() {
  return new Promise((resolve) => {
    // 请求结果封装了一层
    const res = {
        code:200,
        msg:'success',
        data:[
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
        ]
    }
    setTimeout(() => {
      resolve(res)
    }, 1000)
  })
}

// 请求结果经过 responseHandler 转换，`useAutoSelect` 中可以正常处理结果
const result = useAutoSelect({
  apiFun: getSelectOptionAPI
})
```


## 分页器格式

这个就很好理解了，各个项目分页接口字段不尽相同

- `main.ts`中
```ts
initConfig({
  pagination: {
    pageSize: 'size',
    current: 'current'
  },
})
```

## 全部配置
| 参数            | 描述         | 必选  | 类型                                            | 默认值 |
| --------------- | ------------ | :---: | ----------------------------------------------- | :----: |
| pagination      | 分页器       | false | [见下文](/custom-setting.html#pagination分页器) |   -    |
| responseHandler | 接口格式转换 | false | \<T = any\>(res: any) => Promise\<T\> \| T      |   -    |


####  `pagination`分页器 

| 参数           | 描述                         | 必选  | 类型   |   默认值   |
| -------------- | ---------------------------- | :---: | ------ | :--------: |
| pageSize       | 分页接口需要的页尺寸字段     | false | string | 'pageSize' |
| current        | 分页接口需要的当前页码字段   | false | string | 'current'  |
| resultPageSize | 分页接口返回的页尺寸字段     | false | string | 'pageSize' |
| resultTotal    | 分页接口返回的数据总数量字段 | false | string |  'total'   |
| resultCurrent  | 分页接口返回的当前页字段     | false | string | 'current'  |
| resultData     | 分页接口返回的当前页数据字段 | false | string |   'data'   |