interface HookConfig {
  pagination?: {
    pageSize?: string
    current?: string
  }
  responseHandler?: (res: any) => Promise<any>
}

const defaultConfig: HookConfig = {
  pagination: {
    pageSize: 'pageSize',
    current: 'current'
  },
  responseHandler: (res) => {
    return Promise.resolve(res)
  }
}

export function getConfig() {
  return defaultConfig
}

export function initConfig(config: HookConfig) {
  Object.assign(defaultConfig, config)
}
