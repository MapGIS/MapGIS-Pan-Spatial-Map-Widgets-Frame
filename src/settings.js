import './widgets/kuozhanweijianmulu/export'

import { WidgetExampleSetting } from './widgets/kuozhanweijianmulu/setting'

const settings = [WidgetExampleSetting]

const install = (Vue) => {
  settings.forEach((setting) => {
    const registerName = setting.options ? setting.options.name : setting.name
    if (registerName in Vue.options.components) {
      console.warn(`发现同名组件${registerName},已取消该组件注册`)
    } else {
      Vue.use(setting)
    }
  })
}

if (typeof window !== 'undefined' && window['MapgisApplicationVueRuntime']) {
  install(window['MapgisApplicationVueRuntime'], {})
}

export { WidgetExampleSetting }

export default {
  install,
}
