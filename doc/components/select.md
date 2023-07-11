# useAutoSelect

## 示例

#### 简单用法

<preview path="../demo/select/SelectDemo.vue"  title="title" description="component description content"></preview>
#### 手动执行

<preview path="../demo/select/SelectDemo2.vue"></preview>

#### 转换结果

<preview path="../demo/select/SelectDemo3.vue"></preview>

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