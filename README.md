# 目录结构

```plain
|── src
   |── widgets                              # 微件
      |── kuo-zhan-wei-jian                 # 扩展微件插件
      |── index.ts                          # 入口文件
      |── shims-vue.d.ts                    # .vue适配文件
|── .editorconfig                           # editor配置
|── .eslintignore                           # ESlint忽略路径
|── .eslintrc.js                            # ESlint配置
|── .gitignore                              # GIT忽略路径
|── .prettierrc                             # 代码格式化配置
|── babel.config.js                         # babel配置文件
|── package.json                            # npm脚本和依赖项
|── README.md                               # 您的网站/应用程序的自述文件
|── tsconfig.json                           # ts配置
|── vue.config.js                           # vue配置文件
```

# 安装依赖及打包

从 GitLab 上拉取 mapgis-pan-spatial-map-widgets 代码，执行 yarn 命令安装依赖

```
yarn
```

在 Web-App-Framework 包下执行 yarn link 命令

```
yarn link
```

在 mapgis-pan-spatial-map-widgets 包下执行 yarn link @mapgis/web-app-framework 命令软链接 Web-App-Framework 包

```
yarn link @mapgis/web-app-framework
```

执行 yarn build 命令进行打包，打包后文件输出至 dist-libs 目录下

```
yarn build
```

![](./images/%E6%89%93%E5%8C%85%E6%96%87%E4%BB%B6%E7%A4%BA%E4%BE%8B.png)

# 引入方式

支持 src 引入及 dist-libs 两种引入方式，默认情况下为 dist-libs 引入。如需修改为 src 引入方式，可在 package.json 文件当中修改"main"为"main1"，"module1"为"module"。

![](./images/%E4%BF%AE%E6%94%B9%E5%BC%95%E7%94%A8%E8%B7%AF%E5%BE%84.png)

成功引入至 mapgis-pan-spatial-map 框架包后执行 yarn dev:mock 命令运行，在前台页面可以看见微件显示效果

![](./images/%E6%95%88%E6%9E%9C%E5%B1%95%E7%A4%BA.png)

# 微件扩展指南

详见 [微件扩展指南](./docs/微件扩展指南.md)
