const webpack = require('webpack')

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  outputDir: 'dist-libs',
  configureWebpack: {
    externals: {
      '@mapgis/web-app-framework': '@mapgis/web-app-framework',
    },
  },
}
