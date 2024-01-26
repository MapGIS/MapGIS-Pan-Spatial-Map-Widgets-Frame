import { MpWidgetExample } from './widget-example'

const widgets = [MpWidgetExample]

const install = (Vue) => {
  widgets.forEach((widget) => {
    const registerName = widget.options ? widget.options.name : widget.name
    if (registerName in Vue.options.components) {
      console.warn(`发现同名组件${registerName},已取消该组件注册`)
    } else {
      Vue.use(widget)
    }
  })
}

if (typeof window !== 'undefined' && window['MapgisApplicationVueRuntime']) {
  install(window['MapgisApplicationVueRuntime'], {})
}

export { MpWidgetExample }

export default {
  install,
}
