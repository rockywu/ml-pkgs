// .eslintrc.js

module.exports = {
  root: true, // 指定根目录下的文件生效
  parser: '@typescript-eslint/parser', // 指定解析器为 @typescript-eslint/parser
  plugins: ['@typescript-eslint'], // 指定插件为 @typescript-eslint
  extends: [
    'eslint:recommended', // 使用推荐的 ESLint 规则
    'plugin:@typescript-eslint/recommended' // 使用 @typescript-eslint 推荐的规则
  ],
  parserOptions: {
    ecmaVersion: 2021, // 使用 ECMAScript 2021 语法
    sourceType: 'module' // 使用 ECMAScript 模块
  },
  globals: {
    console: 'readonly',
    document: 'readonly',
    window: 'readonly',
    process: 'readonly',
    require: 'readonly',
    module: 'readonly',
    __dirname: 'readonly',
    __filename: 'readonly'
  },
  rules: {
    // 代码风格规则
    indent: ['error', 2],         // 缩进为 2 个空格
    semi: ['error', 'always'],    // 总是需要分号
    quotes: ['error', 'single'],  // 使用单引号
    'comma-dangle': ['error', 'never'], // 不允许末尾逗号
    'no-console': 'warn', // 禁止使用 console，警告级别
    'no-unused-vars': 'error', // 禁止未使用的变量，错误级别
    'no-undef': 'error', // 禁止使用未声明的变量，错误级别
    'no-extra-semi': 'error', // 禁止额外的分号，错误级别
    curly: 'error', // if 语句必须使用大括号包裹，错误级别
    eqeqeq: 'error', // 使用严格相等 === 和 !==，错误级别
    yoda: 'error', // 不允许 yoda 条件，错误级别
    'prefer-template': 'error', // 推荐使用模板字符串，错误级别
    'arrow-spacing': 'error', // => 箭头函数前后需要空格，错误级别
    'no-var': 'error' // 不允许使用 var，错误级别
    // 更多规则可在官方文档中查找：https://eslint.org/docs/rules/
  }
};
