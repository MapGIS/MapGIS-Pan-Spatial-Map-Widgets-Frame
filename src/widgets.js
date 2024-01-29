import './widgets/kuozhanweijianmulu/export'

import * as exampleWidgets from './widgets/kuozhanweijianmulu/widgets'

const widgets = { ...MpWidgetExample }

const install = (Vue) => {
  for (const name in widgets) {
    const com = widgets[name]
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
