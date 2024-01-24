import { MpWidgetExample } from './widget-example'

const widgets = [MpWidgetExample]

const install = (Vue) => {
  widgets.forEach((widget) => {
    if (
      !(
        typeof Vue.component(
          (widget.options && widget.options.name) || widget.name
        ) === 'function'
      )
    ) {
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
