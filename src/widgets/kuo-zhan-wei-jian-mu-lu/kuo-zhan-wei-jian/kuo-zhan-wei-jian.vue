<template>
  <div>
    扩展微件
    <mp-window-wrapper :visible="visible">
      <mp-window
        title="微件内部弹出框"
        :visible="true"
        :vertical-offset="50"
        :max-width="360"
        :has-padding="false"
        anchor="bottom-center"
      >
        <div>微件内部弹出框</div>
      </mp-window>
    </mp-window-wrapper>
  </div>
</template>

<script lang="ts">
import {
  WidgetMixin,
  LayerType,
  IGSSceneSublayerType,
  LoadStatus,
  Objects,
} from '@mapgis/web-app-framework'

import { api, baseConfigInstance } from '../../../model'

export default {
  name: 'KuoZhanWeiJian',
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
     * 保存微件配置到管理平台
     */
    saveConfig() {
      const { ip, port } = this
      const config = { ip, port }
      api
        .saveWidgetConfig({
          name: 'kuo-zhan-wei-jian',
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
<style lang="less" scoped></style>
