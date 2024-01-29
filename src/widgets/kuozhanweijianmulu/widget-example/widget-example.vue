<template>
  <div>
    示例微件
    <mp-window-wrapper :visible="true">
      <mp-window
        title="微件内部弹出框"
        :visible="true"
        :vertical-offset="50"
        :max-width="360"
        :has-padding="false"
        anchor="bottom-center"
      >
        <div>
          微件内部弹出框
          <widget-component />
        </div>
      </mp-window>
    </mp-window-wrapper>
  </div>
</template>

<script>
import {
  WidgetMixin,
  LayerType,
  IGSSceneSublayerType,
  LoadStatus,
  api,
  baseConfigInstance,
} from '@mapgis/web-app-framework'
import WidgetComponent from './components/WidgetComponent.vue'

export default {
  name: 'MpWidgetExample',
  components: {
    WidgetComponent,
  },
  // 混入WidgetMixin，可以获取微件的状态及微件生命周期事件，
  // 以及地图对象，在微件中可以直接通过this.XXX获取，
  // 比如this.map(二维地图对象),this.mapbox(MapBox 库),this.viewer(三维场景对象),this.Cesium(Ceisum 库),this.vueCesium(Ceisum vue 对象)
  mixins: [WidgetMixin],
  computed: {
    // 从微件配置里获取ip
    ip() {
      return this.widgetInfo.config.ip || baseConfigInstance.config.ip
    },
    // 从微件配置里获取port
    port() {
      return this.widgetInfo.config.port || baseConfigInstance.config.ip
    },
  },
  /**
   * 动态获取基础目录树上已勾选的三维数据(地形和模型)
   */
  watch: {
    document: {
      immediate: true,
      deep: true,
      handler() {
        if (!this.document) return
        const layers = []
        this.document.defaultMap
          .clone()
          .getFlatLayers()
          .forEach((layer, index) => {
            if (layer.loadStatus === LoadStatus.loaded) {
              if (layer.type === LayerType.IGSScene) {
                if (layer.activeScene) {
                  const { type } = layer.activeScene.sublayers[0]
                  if (
                    type === IGSSceneSublayerType.elevation ||
                    type === IGSSceneSublayerType.modelCache
                  ) {
                    // 剖切分析支持地形和模型
                    layers.push(layer)
                  }
                }
              }
            }
          })
        console.log(layers)
      },
    },
  },
  methods: {
    /**
     * 微件打开事件
     */
    onOpen() {},
    /**
     * 微件关闭事件
     */
    onClose() {},
    /**
     * 微件激活事件
     */
    onActive() {},
    /**
     * 微件不激活事件
     */
    onDeActive() {},
    /**
     * 微件大小被手动调整时，如果微件所在的面板不支持大小调整，则不会响应，如果不支持高度调整，则高度为 undefined。
     * @param width 窗口宽度
     * @param height 窗口高度
     */
    onResize(width, height) {},
    /**
     * 微件切换最大和常规模式时，`max`：最大化；`normal`：常规，如果微件所在的面板不支持窗口模式切换，则不会响应。
     * @param mode 窗口模式
     */
    onWindowSize(mode) {},
    /**
     * 保存微件配置到管理平台
     */
    saveConfig() {
      const { ip, port } = this
      const config = { ip, port }
      api
        .saveWidgetConfig({
          name: 'widget-example',
          config: JSON.stringify(config),
        })
        .then(() => {
          console.log('保存配置成功')
        })
        .catch(() => {
          console.log('保存配置失败')
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
