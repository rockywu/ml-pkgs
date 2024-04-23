import { IOPlanRetryAdapter, IORequestHandle, IOPlanNetworkError } from '../src';


class MockIORequestHandle implements IORequestHandle<any> {
  request(...args) {
    const err = args?.[0];
    if (err === 'error') {
      throw new Error('Mock error')
    } else if (err === 'network') {
      throw new IOPlanNetworkError("Network")
    }
    return [...args]
  }
}


// 测试 IOPlanRetryAdapter 类
describe('IOPlanRetryAdapter', () => {
  // 测试构造函数
  test('执行：构造函数入参', () => {
    const ioRetryAdapter = new IOPlanRetryAdapter(new MockIORequestHandle(), 5, 2000);
    expect(ioRetryAdapter['ioRequestHandle']).toBeInstanceOf(MockIORequestHandle);
    expect(ioRetryAdapter['maxRetries']).toBe(5);
    expect(ioRetryAdapter['retryInterval']).toBe(2000);
  });

  // 测试 execute 方法
  test('执行：未出现网络异常时的返回值', async () => {
    const ioRetryAdapter = new IOPlanRetryAdapter(new MockIORequestHandle(), 3, 100);
    const result = await ioRetryAdapter.execute(...[0, 1, 2]);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(2);
  });

  // 测试 execute 方法在达到最大重试次数后是否抛出异常
  test('执行：当出现其他异常时的返回值', async () => {
    const ioRetryAdapter = new IOPlanRetryAdapter(new MockIORequestHandle(), 3, 100);
    await expect(ioRetryAdapter.execute('error')).rejects.toThrow('Mock error');
  });

  test('执行：网络异常时多次运行的返回值', async () => {
    const ioRetryAdapter = new IOPlanRetryAdapter(new MockIORequestHandle(), 3, 100);
    await expect(ioRetryAdapter.execute('network')).rejects.toThrow('Network');
  });
});
