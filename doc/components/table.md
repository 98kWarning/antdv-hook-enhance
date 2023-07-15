# usePaginationTable

## 示例

<preview path="../demo/table/TableDemo1.vue" title="数据展示" description="接管表格中的查询、分页事件"></preview>

## 参数
| 参数           | 描述                           | 必选  | 类型                | 默认值 |
| -------------- | ------------------------------ | :---: | ------------------- | :----: |
| apiFun         | 调用远程接口返回数据           | true  | ()=>[]              |   -    |
| current        | 初始页码                       | false | ()=>any             |   1    |
| pageSize       | 初始一页尺寸                   | false | (any)=>void         |   10   |
| queryInMount   | 是否在挂载是调用接口初始化数据 | false | (any)=>void         | false  |
| transformData  | 接口数据转换                   | false | (data:any[])=>any[] |   -    |
| getQueryParams | 获取参数回调                   | false | (page)=>any         |   -    |


## 实例属性与方法
| 参数      | 描述                       | 类型                                       |
| --------- | -------------------------- | ------------------------------------------ |
| bindProps | 绑定给组件的属性集合       | [见下文](/components/table.html#bindprops) |
| refresh   | 刷新当前页面               | ()=>promise                                |
| resetPage | 将表格的分页重置           | ()=>promise                                |
| reload    | 重置表格的分页，并刷新接口 | ()=>promise                                |
| loading   | 表格当前的加载状态         | boolean                                    |

## bindProps
| 参数       | 描述                     | 类型    |
| ---------- | ------------------------ | ------- |
| loading    | 控制按钮的loading状态    | boolean |
| pagination | 表格的分页数据           | {}      |
| dataSource | 表格当前页数据           | any[]   |
| onChange   | 表格分页改变时的事件监听 | event   |
