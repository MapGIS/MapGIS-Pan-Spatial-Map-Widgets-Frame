const inquirer = require('inquirer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const { generateConfig } = require('./utils')
const prefix = './src/widgets/'

function main() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'packageName',
        message: '请输入微件创建目录：',
        validate: async function (input) {
          if (!input) {
            return '微件目录是必填的。'
          }

          const packagePath = prefix + input
          if (fs.existsSync(packagePath)) {
            return '微件目录已存在。'
          }

          const packageArr = input.split('/')
          if (packageArr.length > 2) {
            return '目录格式不支持多级，请输入正确的微件目录格式。'
          }
          return true
        },
      },
      {
        type: 'input',
        name: 'widgetName',
        message: '请输入微件名：',
        validate: async function (input) {
          if (!input) {
            return '微件名是必填的。'
          }
          const createWidgetsName = await getWidgetsDirectory()
          if (createWidgetsName.includes(input)) {
            return '微件名已存在。'
          }
          return true
        },
      },
      {
        type: 'list',
        message: '是否创建配置ui？',
        name: 'hasSetting',
        choices: [
          { value: true, name: '是' },
          { value: false, name: '否' },
        ],
      },
    ])
    .then((answers) => {
      generateWidget(answers)
    })
}

async function getWidgetsDirectory() {
  const directoryPath = './src/widgets'
  return new Promise((resolve) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error('无法读取目录:', err)
        return
      }
      const directories = files.filter((file) =>
        fs.statSync(path.join(directoryPath, file)).isDirectory()
      )

      resolve(directories)
    })
  })
}

function getFileContent(path) {
  try {
    const data = fs.readFileSync(path, 'utf8')
    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

function writeFile(path, data) {
  fs.writeFile(path, data, (err) => {
    if (err) throw err
  })
}

function appendFile(path, data) {
  fs.appendFile(path, data, (err) => {
    if (err) throw err
  })
}

function generateWidget(answers) {
  const { packageName, widgetName, hasSetting } = answers
  const hasPackage = packageName.lastIndexOf('/')
  // 目录
  const packagePath = prefix + packageName
  // 组件导出目录
  const exportPackagePath =
    hasPackage > -1
      ? prefix + packageName.substr(0, hasPackage)
      : prefix + packageName
  // 模块导出包名
  const moduleExportPackage =
    hasPackage > -1
      ? packageName.substr(0, packageName.indexOf('/'))
      : packageName
  // 模块导出目录
  const moduleExportPath = prefix + moduleExportPackage
  // 文件名
  const fileName =
    hasPackage > -1 ? packageName.substr(hasPackage + 1) : packageName
  // 创建文件夹目录
  if (!fs.existsSync(packagePath)) {
    fs.mkdirSync(packagePath, { recursive: true })
  }
  // 创建配置ui文件夹
  if (hasSetting && !fs.existsSync(packagePath + '/setting')) {
    fs.mkdirSync(packagePath + '/setting', { recursive: true })
  }

  const componentTemplate = getFileContent('./template/componentTemplate.temp')

  const templateFile = handlebars.compile(componentTemplate)
  const widgetTemplateData = templateFile({ widgetName }).replace(/^`|`$/g, '')
  writeFile(`${packagePath}/${fileName}.vue`, widgetTemplateData)

  if (hasSetting) {
    const settingTemplateData = templateFile({
      widgetName: `${widgetName}Setting`,
    }).replace(/^`|`$/g, '')
    writeFile(
      `${packagePath}/setting/${fileName}-setting.vue`,
      settingTemplateData
    )
  }

  const installFile = handlebars.compile(
    getFileContent('./template/componentInstallTemplate.temp')
  )
  const widgetInstallData = installFile({ widgetName, fileName }).replace(
    /^`|`$/g,
    ''
  )
  writeFile(`${packagePath}/index.js`, widgetInstallData)

  if (hasSetting) {
    const settingInstallData = installFile({
      widgetName: `${widgetName}Setting`,
      fileName: `${fileName}-setting`,
    })
    writeFile(`${packagePath}/setting/index.js`, settingInstallData)
  }

  const exportFile = handlebars.compile(
    getFileContent('./template/componentExportTemplate.temp')
  )
  const widgetExportData = exportFile({
    widgetName,
    fileName: hasPackage > -1 ? fileName : 'index',
  }).replace(/^`|`$/g, '')

  const widgetExportFile = `${exportPackagePath}/widgets.js`
  if (!fs.existsSync(widgetExportFile)) {
    writeFile(widgetExportFile, widgetExportData)
  } else {
    appendFile(widgetExportFile, widgetExportData)
  }

  if (hasSetting) {
    const settingExportData = exportFile({
      widgetName: `${widgetName}Setting`,
      fileName: hasPackage > -1 ? `${fileName}/setting` : 'setting',
    }).replace(/^`|`$/g, '')

    const settingExportFile = `${exportPackagePath}/settings.js`

    if (!fs.existsSync(settingExportFile)) {
      writeFile(settingExportFile, settingExportData)
    } else {
      appendFile(settingExportFile, settingExportData)
    }
  }

  const moduleExportFile = handlebars.compile(
    getFileContent('./template/moduleExportTemplate.temp')
  )
  const widgetModuleExportData = moduleExportFile({
    widgetName,
    fileName: `${moduleExportPackage}/widgets`,
  }).replace(/^`|`$/g, '')

  const widgetModuleExportFile = `${prefix}/widgets.js`
  if (!fs.existsSync(widgetModuleExportFile)) {
    writeFile(widgetModuleExportFile, widgetModuleExportData)
  } else {
    appendFile(widgetModuleExportFile, widgetModuleExportData)
  }

  if (hasSetting) {
    const settingModuleExportData = moduleExportFile({
      widgetName: `${widgetName}Setting`,
      fileName: `${moduleExportPackage}/settings`,
    }).replace(/^`|`$/g, '')
    const settingModuleExportFile = `${prefix}/settings.js`
    if (!fs.existsSync(settingModuleExportFile)) {
      writeFile(settingModuleExportFile, settingModuleExportData)
    } else {
      appendFile(settingModuleExportFile, settingModuleExportData)
    }
  }
}

main()
