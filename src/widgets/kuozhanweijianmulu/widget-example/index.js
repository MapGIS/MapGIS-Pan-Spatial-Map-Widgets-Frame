import { default as MpWidgetExample } from "./widget-example.vue";

MpWidgetExample.install = (Vue) => {
  Vue.component(
    (MpWidgetExample.options && MpWidgetExample.options.name) || MpWidgetExample.name,
    MpWidgetExample
  );
};

export { MpWidgetExample };
