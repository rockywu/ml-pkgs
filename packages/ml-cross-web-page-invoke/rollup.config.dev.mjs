// rollup.config.dev.mjs

import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default [
  {
    input: 'example/index.ts',
    output: [
      {
        file: `dist/bundle.js`,
        format: 'iife',
      }
    ],
    plugins: [
      commonjs(), //解析commonjs 导入
      resolve(), // 解析导入的第三方模块
      typescript({ tsconfig: './tsconfig.prod.json' }), // 使用 TypeScript 插件
      serve({ // 启动本地服务器
        open: true, // 自动打开浏览器
        contentBase: ['example', 'dist'] // 静态文件根目录
      }),
      livereload({
        watch: ['dist', 'example/*.html']
      }),
    ]
  }
]
