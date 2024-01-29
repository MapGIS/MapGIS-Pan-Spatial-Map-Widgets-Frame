import { default as WidgetExampleSetting } from "./widget-example-setting.vue";

WidgetExampleSetting.install = (Vue) => {
  Vue.component(
    (WidgetExampleSetting.options && WidgetExampleSetting.options.name) || WidgetExampleSetting.name,
    WidgetExampleSetting
  );
};

export { WidgetExampleSetting };
