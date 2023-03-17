export {
  api,
  getRequest,
  ProjectionTransformationUtil,
  events,
  eventBus,
  baseConfigInstance,
  loadConfigs,
  markerIconInstance,
  dataCatalogManagerInstance,
  DataCatalogManager,
  DataFlowList,
  ActiveResultSet,
  DataStoreCatalog,
  ProjectorManager,
} from './model'

import { KuoZhanWeiJian } from './widgets/kuo-zhan-wei-jian-mu-lu'

const components = [KuoZhanWeiJian]

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(
      (component.options && component.options.name) || component.name,
      component
    )
  })
}

export default {
  install,
}
