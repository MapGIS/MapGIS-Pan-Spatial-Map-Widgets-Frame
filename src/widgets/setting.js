import { WidgetExampleSetting } from './widget-example/setting'

const settings = [WidgetExampleSetting]

const install = (Vue) => {
  settings.forEach((setting) => {
    if (
      !(
        typeof Vue.component(
          (setting.options && setting.options.name) || setting.name
        ) === 'function'
      )
    ) {
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
