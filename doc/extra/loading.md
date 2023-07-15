# loading状态控制相关

## useAutoRequest

<preview path="../demo/loading/Demo1.vue"  title="针对单个接口的loading状态" description="多个按钮使用同一个状态，第二个参数可选"></preview>

### 参数
| 参数    | 描述                 | 必选  | 类型        | 默认值 |
| ------- | -------------------- | :---: | ----------- | :----: |
| fun     | 调用远程接口返回数据 | true  | ()=>Promise |   -    |
| options | 调用时的附加选项     | false | 见下文      |   -    |

#### options

| 参数      | 描述            | 必选  | 类型                | 默认值 |
| --------- | --------------- | :---: | ------------------- | :----: |
| loading   | 初始loading状态 | false | boolean             | false  |
| onSuccess | 成功时的回调    | false | (data: any) => void |   -    |


### 返回值
| 参数           | 描述                         | 类型        |
| -------------- | ---------------------------- | ----------- |
| requestLoading | loading状态                  | boolean     |
| run            | 调用函数，参数与入参保持一致 | ()=>Promise |

## useAutoLoading

<preview path="../demo/loading/Demo2.vue"  title="针对多个接口的loading状态" description="多个按钮使用同一个状态，第二个参数可选"></preview>

### 参数
| 参数           | 描述            | 必选  | 类型    | 默认值 |
| -------------- | --------------- | :---: | ------- | :----: |
| defaultLoading | 初始loading状态 | false | boolean | false  |

### 返回值
| 参数           | 描述                                                                                                       | 类型                       |
| -------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------- |
| requestLoading | loading状态                                                                                                | boolean                    |
| run            | 包裹函数，参数为一个promise，回参也是promise，函数内部会监听入参promise的状态，并在适当时机更改loading状态 | (promise:Promise)=>Promise |