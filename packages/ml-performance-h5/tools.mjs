
import path from 'path'
import fs from 'fs'
export const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));



/**
 * 删除文件夹路下和本身的所有内容
 * @param {*} folderPath 
 */
export function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach(function (file, index) {
      var curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

/**
 * 版权信息
 */
export function getCopyright() {
  const MLBanner = `
/*!
 * ${packageJson.name} v${packageJson.version}
 * (c) 2024 ML Pkgs ${packageJson.homepage}
 * Auther: ${packageJson.author}
 * Released under the ${packageJson.license} License.
 */
`;
  return MLBanner;
}