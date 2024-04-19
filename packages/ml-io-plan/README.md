## ml-io-plan

>  目标是设计一个通用的IO 计划机制

#### 安装

`npm i @ml-pkgs/ml-io-plan`

#### 使用 Api

1. IORetryAdapter IO重试适配器
2. IOAuthPlanAdapter IO认证适配器
3. IOAuthPlanExpiredError IO认证异常Error

**Version 0.1.0 之后将废弃函数**

`IORetryAdapter.executeWithRetry` 请使用 `IORetryAdapter.execute`

`IOAuthPlanAdapter.executeWithRequest` 请使用 `executeWithRequest.execute`


######  1、IORetryAdapter

> IO 重试机制

```
import {IORetryAdapter} from '@ml-pkgs/ml-io-plan'
/**
 * IORetryAdapter example
 */

async fetchData(...args) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(args);
        }, 300);
    })
}

const ioRetryImpl = new IORetryAdapter(fetchData, 5, 2000);
/**
 * Old Demo
 */
async function run() {
    let res = await ioRetryImpl.executeWithRetry('test1', 'test2')
    console.log('result', res);
    //console.log ["test1", "test2"]
}

/**
 * New Demo
 */
async function run() {
    let res = await ioRetryImpl.execute('test1', 'test2')
    console.log('result', res);
    //console.log ["test1", "test2"]
}

```


######  2、IOAuthPlanAdapter

> IO 认证方案适配器

```
import { IOAuthPlanAdapter, IOAuthPlanExpiredError, IORetryAdapter, delay } from '@ml-pkgs/ml-io-plan'

const store = {
    value: '',
    expired: 0
}

const getToken = () => {
    if(store.expired < Date.now()) {
        return null;
    }
    return store.value;
}

//5秒过期
const setToken = (value) => {
    store.value = value;
    store.expired = Date.now() + 5 * 1000;
}


/**
 * retry the token within 3 times, Wait 100ms after each failure
 */
const authHandle = new IORetryAdapter(async () => {
  await delay(1000)
  const rd = Math.random();
  if (rd > 0.5) {
    setToken('my token')
    return;
  }
  throw new Error("获取token失败")
}, 3, 100)

/**
 * get Request data
 */
async function ioRequest(p) {
  console.log('p', p)
  await delay(500)
  const token = getToken();
  if (!token) {
    console.log("token已过期")
    throw new IOAuthPlanExpiredError('TokenExpired')
  }
  return p
}

//尝试模拟IO认证机制
const io = new IOAuthPlanAdapter(authHandle.executeWithRetry.bind(authHandle), ioRequest);

/**
 * Old Demo 1
 */
async function run() {
  const res = await Promise.all([
    io.executeWithRequest(1),
    io.executeWithRequest(2),
    io.executeWithRequest(3),
    io.executeWithRequest(4)
  ])
  console.log('result', JSON.stringify(res))
}

/**
 * New Demo 2
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

run();
```

