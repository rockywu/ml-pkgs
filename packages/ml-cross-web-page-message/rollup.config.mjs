// rollup.config.js

import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
const name = "index"

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/${name}.umd.js`,
      format: 'umd',
      name: "CrossWebPage"
    },
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
  ]
};