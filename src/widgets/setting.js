import { WidgetExampleSetting } from "./widget-example/setting";

const widgets = [WidgetExampleSetting];

const install = (Vue) => {
  widgets.forEach((widget) => {
    Vue.use(widget);
  });
};

export { WidgetExampleSetting };

export default {
  install,
};
