// rollup.config.js

import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import {join} from 'path'
const name = "index"

//删除dist文件夹中的所有文件
const delDir = (path) => {
  const files = fs.readdirSync(path);
  files.forEach(file => {
    const filePath = join(path, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      fs.unlinkSync(filePath);
    } else if (stats.isDirectory()) {
      delDir(filePath);
    }
  });
};
//尝试删除构建的文件夹
delDir('dist');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `dist/${name}.umd.js`,
        format: 'umd',
        name: "MlCrossWebPage"
      },
    ],
    plugins: [
      commonjs(), //解析commonjs 导入
      resolve(), // 解析导入的第三方模块
      typescript({ tsconfig: './tsconfig.prod.json' }), // 使用 TypeScript 插件
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
