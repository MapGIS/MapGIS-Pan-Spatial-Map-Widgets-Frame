const fs = require("fs");

// 项目当前打包模式
const mode = process.env.VUE_APP_MODE;
// 项目打包类型
const packageType = process.env.VUE_ITEM;
// 打包生成的文件夹名称
const distDir =
  packageType === "widget" ? "dist-libs/widget" : "dist-libs/setting";
// 打包后静态资源存放路径
const targetDir = "dist-libs/widget";
// 打包后css、js文件的名称
const packageName = packageType === "widget" ? "widget" : "setting";
// 打包前的资源目录
const directoryPath = "./widgets";

function getWidgetsArr() {
  return new Promise((resolve) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("读取文件夹出错:", err);
        return;
      }
      const targetFilePathArr = [];

      files.forEach((file) => {
        targetFilePathArr.push(file);
      });
      resolve(targetFilePathArr);
    });
  });
}

function copyFile(sourceFile, targetFile, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(sourceFile)) {
    fs.copyFile(sourceFile, targetFile, (err) => {
      if (err) throw err;
    });
  }
}

async function generateConfig() {
  const widgetArr = [];
  const widgetsFolder = await getWidgetsArr();
  if (widgetsFolder && widgetsFolder.length > 0) {
    const firstWidgetPath = widgetsFolder[0];
    widgetArr.push({
      from: `${distDir}/${packageName}${
        mode === "prod" ? ".umd.min.js" : ".umd.js"
      }`,
      to: `${targetDir}/${firstWidgetPath}/${packageType}.js`,
      destDir: `${targetDir}/${firstWidgetPath}`,
    });
    widgetArr.push({
      from: `${distDir}/${packageName}.css`,
      to: `${targetDir}/${firstWidgetPath}/${packageType}.css`,
      destDir: `${targetDir}/${firstWidgetPath}`,
    });
  }
  widgetArr.forEach((item) => {
    const { from, to, destDir } = item;
    copyFile(from, to, destDir);
  });
}

exports.generateConfig = generateConfig;
exports.distDir = distDir;
