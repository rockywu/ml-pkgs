## ml-cross-web-page-invoke

> 一个跨页面通讯库，为了简单的实现多个游览器页中的调用和通讯

#### 安装

`npm i @ml-pkgs/ml-cross-web-page-invoke`

#### 使用

### API介绍

```
/**
 * 工厂
 */
export declare class CrossWebPageInvokeFactory extends EventEmitter {
    channelKey: string;
    private crossHander;
    constructor(channelKey?: string, crossHander?: ICrossHander);
    send(event: string, message: any): void;
    receive(event: string, callback: (event: string, message: any) => void, context?: any): void;
}

/**
 * 实例
 */
export declare const CrossWebPageInvoke: CrossWebPageInvokeFactory;

```



######  模块介绍

__UMD方式直接使用__

```
// <script src="./dist/index.umd.js" ></script>
/**
 * 示例代码
 * page1.html
 */
 var cross = MlCrossWebPage.CrossWebPageInvoke;
 var onClick = function () {
   console.log('click - sec')
   cross.send('sec', {xxx: 2})
 }
 cross.receive('index', function(event, message) {
   console.log('context', this)
   console.log('event', event, 'message', message)

 }, {a: 1})

 /**
 * 示例代码
 * page2.html
 */
 var cross = MlCrossWebPage.CrossWebPageInvoke;
 var onClick = function () {
   console.log('click - index')
   cross.send('index', { xxx: 1 })
 }
 cross.receive('sec', function (event, message) {
   console.log('context', this)
   console.log('event', event, 'message', message)
 }, { a: 2 })
```


__ESM方式使用__

```
/**
 * 示例代码
 * page1.html
 */
import {CrossWebPageInvoke as cross} from '@ml-pkgs/ml-cross-web-page-invoke'
 var onClick = function () {
   console.log('click - index')
   cross.send('index', { xxx: 1 })
 }
 cross.receive('sec', function (event, message) {
   console.log('context', this)
   console.log('event', event, 'message', message)
 }, { a: 2 })

 /**
 * 示例代码
 * page2.html
 */
import {CrossWebPageInvoke as cross} from '@ml-pkgs/ml-cross-web-page-invoke'
 var onClick = function () {
   console.log('click - index')
   cross.send('index', { xxx: 1 })
 }
 cross.receive('sec', function (event, message) {
   console.log('context', this)
   console.log('event', event, 'message', message)
 }, { a: 2 })
```


