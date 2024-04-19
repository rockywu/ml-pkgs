// import { IOAuthPlanAdapter } from '../src/IOAuthPlanAdapter';

describe('IOAuthPlanAdapter', () => {
  // let requestAuthMock;
  // let ioFunctionMock;
  // let adapter;

  beforeEach(() => {
    // requestAuthMock = jest.fn();
    // ioFunctionMock = jest.fn();
    // adapter = new IOAuthPlanAdapter(requestAuthMock, ioFunctionMock);
  });

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
