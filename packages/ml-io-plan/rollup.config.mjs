// rollup.config.js

import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import eslint from '@rollup/plugin-eslint';
import { getCopyright, deleteFolderRecursive, packageJson } from './tools.mjs'
const isProduction = process.env.NODE_ENV === 'production';

//尝试删除构建的文件夹
deleteFolderRecursive('./dist');
const name = "index"
export default [
  /**
   * 基本搭建
   */
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
    external: [], //外部依赖包
  },
  /**
   * UMD包生成
   */
  {
    input: 'src/index.ts',
    output: [
      {
        file: `dist/${name}.umd.js`,
        format: 'umd',
        name: packageJson.umdName,
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
          preamble: getCopyright()
        },
      }) : null
    ]
  },

]
