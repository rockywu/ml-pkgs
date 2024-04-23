## ml-io-plan

>  目标是设计一个通用的IO 计划机制

### 安装

`npm i @ml-pkgs/ml-io-plan`

### CHANGELOG

[点击查看](https://github.com/rockywu/ml-pkgs/blob/HEAD/packages/ml-io-plan/CHANGELOG.md)

### API

#### IOPlanRetryAdapter IO重试适配器

```
/**
 * 通用适配器
 * @param ioRequestHandle  请求句柄 请实现接口 IORequestHandle
 * @param ioOptions 请求配置  {
    maxRetries?: number, //最大重试次数
    retryInterval?: number, //每次重试等待毫秒数ms
    retryCallback?: (time: number) => void | Prmise<void> //网络错误回调支持监听网络重试次数
  }
 */
constructor(
  public readonly ioRequestHandle: IORequestHandle<T, Args>,
  ioOptions?: IOPlanRetryOptions
)
```

#### IOPlanAuthAdapter IO认证适配器

```
/**
 * 
 * @param ioRequestHandle 认证请求句柄auth权限, IORequestAuthHandle 实现接口
 * @param ioOptions 认证计划配置 {
    initialShouldRequestAuth?: boolean //启动时是否默认检查认证，默认为false 不自动检查
 * }
 */
constructor(
  ioRequestHandle: IORequestAuthHandle<T, Args>, 
  ioOptions?: IOPlanAuthOptions
)
```

#### IORequestHandle 对象接口

```
export interface IORequestHandle<T, Args extends any[] = any[]> {
    request(...args: Args): PromiseType<T>;
}
```

#### IORequestAuthHandle 认证对象接口

```
export interface IORequestAuthHandle<T, Args extends any[] = any[]> extends IORequestHandle<T, Args> {
    requestAuth(): PromiseType<void>;
}
```

#### IOPlanNetworkError

```
/**
 * 定义网络异常
 */
export class IOPlanNetworkError extends Error {
  name:string = 'IOPlanNetworkError';
  message: string = 'IOPlanNetworkError';
}
```

#### IOPlanAuthError

```
/**
 * 定义认证异常
 */
export class IOPlanAuthError extends Error {
  name = 'IOPlanAuthError';
  message: string = 'IOPlanAuthError';
}
```


### 如何使用

> 简单介绍API的使用方式

#####  1、IORetryAdapter

- IO 重试机制

```
import {IOPlanRetryAdapter, IOPlanNetworkError, IORequestHandle} from '@ml-pkgs/ml-io-plan'

class MockIORequestHandle implements IORequestHandle<any> {
  async request(...args) {
    try {
      //mock request fetch
      return await fetch(...args)
    } catch(e) {
      if(/* IF is NetworkError */) {
        //模拟网络异常
        throw new IOPlanNetworkError()
      }
      throw e;
    }
  }
}
const ioRetryImpl = new IOPlanRetryAdapter(MockIORequestHandle, {
  maxRetries: 2, //最多重试2次
  retryInterval: 100, //每次重试间隔100ms
  //重试回调函数
  retryCallback: async (ts: number) => {
    console.log('time', ts)
  }
});


/**
 * Run Demo
 */
async function run() {
  const result = await ioRetryImpl.execute('test1', 'test2')
  console.log("result', result)
}
```


######  2、IOAuthPlanAdapter

- IO 认证方案适配器

```
import { IOPlanAuthAdapter, IOPlanAuthError, IORequestAuthHandle} from '@ml-pkgs/ml-io-plan'

class MockIORequestAuthHandle implements IORequestAuthHandle<any> {
  async requestAuth() {
    // mock auth request fetch
    return await fetchAuth();
  }
  async request(...args) {
    try {
      //use ioRetryImpl for mock request fetch
      return await ioRetryImpl.request(...args);
    } catch(e) {
      if(/* IF is AuthError */) {
        //模拟认证异常
        throw new IOPlanAuthError()
      }
      throw e;
    }
  }
}

/**
 * 如何两个计划联合使用
 */
const ioAuthImpl = new IOPlanAuthAdapter(new MockIORequestAuthHandle(), {
  initialShouldRequestAuth: false, //启动时默认是否进行默认认证
});


/**
 * Run Demo
 */
 async function run() {
  const res = await Promise.all([
    io.execute(1),
    io.execute(2),
    io.execute(3),
    io.execute(4)
  ])
  console.log('result', JSON.stringify(res))
}

```

