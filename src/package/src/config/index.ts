type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

interface HookConfig {
  pagination: {
    pageSize: string
    current: string
    resultPageSize: string
    resultTotal: string
    resultCurrent: string
    resultData: string
  }
  responseHandler: <T = any>(res: any) => Promise<T> | T
}

const defaultConfig: HookConfig = {
  pagination: {
    pageSize: 'pageSize',
    current: 'current',
    resultTotal: 'total',
    resultPageSize: 'pageSize',
    resultCurrent: 'current',
    resultData: 'data'
  },
  responseHandler: (res) => {
    return Promise.resolve(res)
  }
}

export function getConfig() {
  return defaultConfig
}

export function initConfig(config: DeepPartial<HookConfig>) {
  mergeObjects(defaultConfig, config)
  console.log(defaultConfig)
}

function mergeObjects(target: any, input: any) {
  // 如果 input 不是对象类型，或者 input 是 null，请直接返回 target
  if (typeof input !== 'object' || input === null) {
    return target
  }

  // 遍历 input 的属性
  for (const key in input) {
    // 如果 input 当前的属性是一个对象，则递归调用 mergeObjects
    if (typeof input[key] === 'object' && input[key] !== null && !Array.isArray(input[key])) {
      // 如果 target 对应的属性不存在或者不是对象类型，创建一个空对象给它
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {}
      }
      // 递归调用 mergeObjects 合并两个对象的属性
      target[key] = mergeObjects(target[key], input[key])
    } else {
      // 否则，直接将 input 的属性值赋给 target 的属性
      target[key] = input[key]
    }
  }

  return target
}
