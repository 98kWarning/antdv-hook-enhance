import { onMounted, ref, UnwrapRef } from 'vue'
import { TApiFun } from '../type'
import { hookResult } from '../utils'

/* 下拉框组件需要的数据格式
 */
export interface SelectOptions<T = any> {
  value: string
  label: string
  disabled?: boolean
  key?: string
  title?: string
  extra?: T
}

export interface IAutoSelectProps<TData, TParams extends any[]> {
  /* 查询远程数据用的接口 */
  apiFun: TApiFun<TData, TParams>

  /* 在页面挂载时自动调用接口查询 */
  queryInMount?: boolean

  /* 查询条件 */
  initQueryParams?: TParams

  /* 将接口返回的数据转换为下拉框需要的数据格式 */
  transformDataFun?: (data: TData) => SelectOptions<TData>[]

  /* select的默认提示文案 */
  placeholder?: string
}

/* 结果类型*/
/* ref包裹的数据，放到reactive中时，会被自动解包，所以这里的loading等不需要使用Ref包裹 */
export interface IAutoSelectResult<TData, TParams extends any[]> {
  bindProps: UnwrapRef<{
    options: SelectOptions<TData>[]
    loading: boolean
    // disabled: boolean;
    placeholder: string
  }>
  loadData: TApiFun<TData, TParams>
  // loading: Ref<boolean>;
  setOptions: (data: SelectOptions<TData>[]) => void
}

/*  接管下拉框的渲染逻辑，
 ** 从调用接口时切换loading状态，
 ** 到接口完成展示结果或错误
 **手动调用 loadData 方法可以更新数据
 */
export function useAutoSelect<TData = any, TParams extends any[] = any[]>(
  prop: IAutoSelectProps<TData, TParams>
): IAutoSelectResult<TData, TParams> {
  const {
    queryInMount = true,
    placeholder = '请选择',
    initQueryParams = [],
    transformDataFun
  } = prop

  const options = ref<SelectOptions<TData>[]>([])

  const loading = ref(false)

  const placeholderText = ref(placeholder)

  onMounted(() => {
    if (queryInMount) {
      loadData(...(initQueryParams as TParams))
    }
  })

  /* 调用接口请求数据 */
  const loadData: TApiFun<TData, TParams> = (...params) => {
    if (!loading.value) {
      placeholderText.value = '加载中...'
      loading.value = true
    }
    setOptions([])
    return prop.apiFun(...params).then(
      (res) => {
        let data
        //   转换数据
        if (transformDataFun) {
          data = transformDataFun(res)
        } else {
          data = res as SelectOptions[]
        }

        options.value = data
        placeholderText.value = placeholder

        loading.value = false
        return res
      },
      (err) => {
        // 未知错误，可能是代码抛出的错误，或是网络错误
        loading.value = false
        placeholderText.value = err.message
        options.value = [
          {
            value: '-1',
            label: err.message,
            disabled: true
          }
        ]
        // 接着抛出错误
        return Promise.reject(err)
      }
    )
  }

  function setOptions(data: SelectOptions[]) {
    options.value = data
  }

  // 脱ref
  return hookResult(
    {
      loadData,
      setOptions
    },
    {
      placeholder: placeholderText,
      options,
      loading
    }
  )
}
