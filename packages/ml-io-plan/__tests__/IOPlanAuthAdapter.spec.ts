/* eslint-disable @typescript-eslint/no-unused-vars */
import { IOPlanAuthError, IOPlanNetworkError, IOPlanRetryAdapter, IOPlanAuthAdapter, IORequestAuthHandle, IORequestHandle, PromiseType } from '../src';


class TestAuthRequest implements IORequestAuthHandle<any> {
  requestAuth(): PromiseType<void> {
    throw new Error('Method not implemented.');
  }
  async request(params) {
    return params;
  }
}

describe('IOPlanAuthAdapter', () => {
  let adapter;

  beforeEach(() => {
    adapter = new IOPlanAuthAdapter(new TestAuthRequest())
  })

  test('', async () => {
    expect(1).toBe(1);
  });


})



// import { IOAuthPlanAdapter, IOAuthPlanExpiredError } from '../src/IOAuthPlanAdapter';

// class Store {
//   public value: string;
//   get() {
//     return this.value;
//   }
//   set(value: string) {
//     this.value = value;
//   }
// }

describe('IOAuthPlanAdapter', () => {
  // let requestAuthMock;
  // let ioFunctionMock;
  // let adapter;
  // let store;

  beforeEach(() => {
    // store = new Store();
    // requestAuthMock = jest.fn();
    // ioFunctionMock = jest.fn();
    // adapter = new IOAuthPlanAdapter(requestAuthMock, ioFunctionMock);
  });
  // test('如果令牌过期，executeWithRequest应该调用requestAuth', async () => {
  //   ioFunctionMock.mockReturnValue(new Promise((resolve, reject) => {
  //     const token = store.get();
  //     if (!token) {
  //       reject(new IOAuthPlanExpiredError('token过期了'))
  //     }
  //     resolve(null)
  //   }))
  //   requestAuthMock.mockReturnValue(new Promise((resolve) => {
  //     store.set('token')
  //     resolve(null)
  //   }))
  //   adapter.execute()
  //   expect(requestAuthMock).toHaveBeenCalledTimes(1);
  // })

  test('test', async () => {
    expect(1).toBe(1);
  });

  //   test('executeWithRequest should call requestAuth if token is expired', async () => {
  //     ioFunctionMock.mockReturnValue(Promise.reject(new IOAuthPlanExpiredError('Token expired')))
  //     // 设置 requestAuth 方法返回的 promise
  //     const requestAuthPromise = Promise.resolve();
  //     requestAuthMock.mockReturnValue(requestAuthPromise);

  //     // 调用被测试的方法
  //     let res = await Promise.all([
  //       adapter.executeWithRequest(1),
  //       adapter.executeWithRequest(2),
  //       adapter.executeWithRequest(3),
  //     ])
  //     console.log(444, res)

  //     // 验证 requestAuth 方法被调用了一次
  //     expect(requestAuthMock).toHaveBeenCalledTimes(1);
  //   });

  //   // test('executeWithRequest should call ioFunction after requesting auth', async () => {
  //   //   // 设置 requestAuth 方法返回的 promise
  //   //   const requestAuthPromise = Promise.resolve();
  //   //   requestAuthMock.mockReturnValue(requestAuthPromise);

  //   //   // 调用被测试的方法
  //   //   await adapter.executeWithRequest();

  //   //   // 验证 ioFunction 方法被调用了一次
  //   //   expect(ioFunctionMock).toHaveBeenCalledTimes(1);
  //   // });

  //   // 添加更多的测试用例...
});
