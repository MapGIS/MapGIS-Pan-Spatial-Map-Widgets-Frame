const CopyPlugin = require('copy-webpack-plugin')
const utils = require('./build/utils')

const distDir = utils.distDir

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  outputDir: distDir,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {},
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        stream: false,
      },
    },
    externals: {
      '@mapgis/web-app-framework': '@mapgis/web-app-framework',
      '@mapgis/webclient-vue-eventbus': '@mapgis/webclient-vue-eventbus',
      '@mapgis/webclient-vue-ui': '@mapgis/webclient-vue-ui',
      '@mapgis/webclient-vue-mapboxgl': '@mapgis/webclient-vue-mapboxgl',
      '@mapgis/webclient-vue-cesium': '@mapgis/webclient-vue-cesium',
    },
    plugins: [
      new CopyPlugin(
        process.env.VUE_ITEM === 'widget' ? [{ from: 'widgets', to: '' }] : []
      ),
      function CustomPlugin(compiler) {
        const filename = compiler.options.output.filename
        compiler.hooks.done.tap('CustomPlugin', () => {
          if (filename.indexOf('.umd.min.js') > -1) {
            utils.generateConfig()
          }
        })
      },
    ],
    module: {
      rules: [
        {
          test: /\.umd\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          ],
        },
      ],
    },
  },
}
