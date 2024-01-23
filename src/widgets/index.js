import { MpWidgetExample } from "./widget-example";

const widgets = [MpWidgetExample];

const install = (Vue) => {
  widgets.forEach((widget) => {
    Vue.use(widget);
  });
};

if (typeof window !== "undefined" && window["MapgisApplicationVueRuntime"]) {
  install(window["MapgisApplicationVueRuntime"], {});
}

export { MpWidgetExample };

export default {
  install,
};
