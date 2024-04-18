## ml-cross-web-page-invoke

> 一个跨页面通讯库，为了简单的实现多个游览器页中的调用和通讯

#### 安装

`npm i @ml-pkgs/ml-cross-web-page-invoke`

#### 使用

### API介绍

使用了eventemmiter3，相关文档请查看：https://nodejs.org/api/events.html#class-eventemitter

所有event的callback通用返回格式：

```
export type IMessage<T extends any = any> = {
    event: string,
    message: T
}

export interface CallbackFunction<T extends any = any> {
    (message: IMessage<T>['message'], event: IMessage['event']): void
}
```

```
/**
 * 工厂
 */
export declare class CrossWebPageInvokeFactory extends EventEmitter {
    send(event: string, message: any): void;
    on(event: string, callback: CallbackFunction, context?: any): void;
    once(event: string, callback: CallbackFunction, context?: any): void;
    ...
}

/**
 * 实例
 */
export declare const CrossWebPageInvoke: CrossWebPageInvokeFactory;

```



######  模块介绍

__UMD方式直接使用__

```
/**
 * 示例代码
 * page1.html
 */
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Index Cross</title>
</head>

<body>
  <button id="app" onclick="onClick()">send sec</button>
</body>
<script src="../dist/index.umd.js"></script>
<script>
  var cross = MlCrossWebPage.CrossWebPageInvoke;
  var onClick = function () {
    console.log('click - sec')
    cross.send('sec', {'message': 'sec'})
  }
  cross.on('index', function(message, event) {
    console.log('context', this)
    console.log('event', event, 'message', message)

  }, {context: 1})
  cross.once('index', function(message, event) {
    console.log('once-context', this)
    console.log('once-event', event, 'message', message)
  }, {context: 2})
</script>

</html>

 /**
 * 示例代码
 * page2.html
 */
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sec Cross</title>
</head>

<body>
  <button id="app" onclick="onClick()">send index</button>
</body>
<script src="../dist/index.umd.js"></script>
<script>
  var cross = MlCrossWebPage.CrossWebPageInvoke;
  var onClick = function () {
    console.log('click - sec')
    cross.send('index', {'message': 'index'})
  }
  cross.on('sec', function(message, event) {
    console.log('context', this)
    console.log('event', event, 'message', message)

  }, {context: 1})
  cross.once('sec', function(message, event) {
    console.log('once-context', this)
    console.log('once-event', event, 'message', message)
  }, {context: 2})
</script>

</html>
```


__ES方式使用__

```
/**
 * 示例代码
 * page1.html
 */
import {CrossWebPageInvoke as cross} from '@ml-pkgs/ml-cross-web-page-invoke'
var onClick = function () {
  console.log('click - sec')
  cross.send('sec', {'message': 'sec'})
}
cross.on('index', function(message, event) {
  console.log('context', this)
  console.log('event', event, 'message', message)

}, {context: 1})
cross.once('index', function(message, event) {
  console.log('once-context', this)
  console.log('once-event', event, 'message', message)
}, {context: 2})
 /**
 * 示例代码
 * page2.html
 */
import {CrossWebPageInvoke as cross} from '@ml-pkgs/ml-cross-web-page-invoke'
var onClick = function () {
  console.log('click - sec')
  cross.send('index', {'message': 'index'})
}
cross.on('sec', function(message, event) {
  console.log('context', this)
  console.log('event', event, 'message', message)

}, {context: 1})
cross.once('sec', function(message, event) {
  console.log('once-context', this)
  console.log('once-event', event, 'message', message)
}, {context: 2})
```


