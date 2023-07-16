import { ref, reactive } from 'vue'
import { TApiFun } from '../type'
import { getConfig } from '../config'
interface BtnRequestProps<TData, TParams extends any[]> {
  apiFun: TApiFun<TData, TParams>
  paramsFun?: () => any
  onSuccess?: (data: any) => void
}

/* 控制loading状态的自动切换hook */
export function useBtnRequest<TData, TParams extends any[] = any[]>(
  props: BtnRequestProps<TData, TParams>
) {
  const { apiFun, paramsFun, onSuccess } = props

  const { responseHandler } = getConfig()

  const requestLoading = ref(false)

  const run = () => {
    const params = paramsFun ? paramsFun() : []
    requestLoading.value = true
    return apiFun(...params)
      .then(responseHandler<TData>)
      .then((res) => {
        onSuccess && onSuccess(res)
        return res
      })
      .finally(() => {
        requestLoading.value = false
      })
  }

  return reactive({
    loading: requestLoading,
    onClick: run
  })
}
