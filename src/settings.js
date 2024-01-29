import './widgets/kuozhanweijianmulu/export'

import * as WidgetExampleSetting from './widgets/kuozhanweijianmulu/settings'

const settings = { ...WidgetExampleSetting }

const install = (Vue) => {
  for (const name in settings) {
    const com = settings[name]
    const registerName = com.options ? com.options.name : com.name
    if (registerName in Vue.options.components) {
      console.log(`发现同名组件[${registerName}],已取消该组件的注册`)
    } else {
      Vue.component(registerName, com)
    }
  }
}

if (typeof window !== 'undefined' && window['MapgisApplicationVueRuntime']) {
  install(window['MapgisApplicationVueRuntime'], {})
}

export default {
  install,
}
