# useBtnRequest

## 示例

<preview path="../demo/button/ButtonDemo1.vue" title="提交按钮" description="接管提交业务中的loading与点击事件"></preview>

## 参数
| 参数      | 描述                               | 必选  | 类型        | 默认值 |
| --------- | ---------------------------------- | :---: | ----------- | :----: |
| apiFun    | 调用远程接口返回数据               | true  | ()=>[]      |   -    |
| paramsFun | 允许点击时获取参数，传递给接口使用 | false | ()=>any     |   -    |
| onSuccess | 结果成功时的回调                   | false | (any)=>void |   -    |


## 实例属性与方法
| 参数    | 描述                  | 类型        |
| ------- | --------------------- | ----------- |
| loading | 控制按钮的loading状态 | boolean     |
| onClick | 接管按钮的点击事件    | ()=>promise |