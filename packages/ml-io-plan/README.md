## ml-io-plan

>  目标是设计一个通用的IO 计划机制

#### 安装

`npm i @ml-pkgs/ml-io-plan`

#### 使用


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
async function run() {
    let res = await ioRetryImpl.executeWithRetry('test1', 'test2')
    console.log('result', res);
    //delay 300ms console.log ["test1", "test2"]
}

```


