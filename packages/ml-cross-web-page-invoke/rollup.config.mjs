// rollup.config.js

import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import path from 'path'
import fs from 'fs'
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const isProduction = process.env.NODE_ENV === 'production';

//删除dist文件夹中的所有文件
function deleteFolderRecursive(folderPath) {
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
//尝试删除构建的文件夹
deleteFolderRecursive('./dist');
const name = "index"

const MLBanner = `
/*!
 * ${packageJson.name} v${packageJson.version}
 * (c) 2024 ML Pkgs ${packageJson.homepage}
 * Auther: ${packageJson.author}
 * Released under the ${packageJson.license} License.
 */
`;

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `dist/${name}.umd.js`,
        format: 'umd',
        name: "MlCrossWebPage",
      }
    ],
    plugins: [
      commonjs(), //解析commonjs 导入
      resolve(), // 解析导入的第三方模块
      typescript({ tsconfig: './tsconfig.prod.json' }), // 使用 TypeScript 插件
      isProduction ? terser({
        maxWorkers: 4,
        output: {
          comments: false,
          preamble: MLBanner
        },
      }) : null
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: `dist/${name}.cjs.js`,
        format: 'cjs' // CommonJS 格式
      },
      {
        file: `dist/${name}.esm.js`, // ES模块格式输出文件
        format: 'es',
      },
    ],
    plugins: [
      commonjs(), //解析commonjs 导入
      resolve(), // 解析导入的第三方模块
      typescript({ tsconfig: './tsconfig.prod.json' }), // 使用 TypeScript 插件
    ],
    external: ['eventemitter3']
  }
]
