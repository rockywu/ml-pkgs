import { IORetryAdapter, IORequestHandle } from '../src';


class MockIORequestHandle implements IORequestHandle {
  request(...args) {
    const isError = args?.[0] === 'error'
    if (isError) {
      throw new Error('Mock error')
    }
    return [...args]
  }
}


// 测试 IORetryAdapter 类
describe('IORetryAdapter', () => {
  // 测试构造函数
  test('constructor should initialize properties correctly', () => {
    const ioRetryAdapter = new IORetryAdapter(new MockIORequestHandle(), 5, 2000);
    expect(ioRetryAdapter['maxRetries']).toBe(5);
    expect(ioRetryAdapter['retryInterval']).toBe(2000);
  });

  // 测试 execute 方法
  test('execute should retry and resolve with correct result', async () => {
    const ioRetryAdapter = new IORetryAdapter(new MockIORequestHandle(), 3, 100);
    const result = await ioRetryAdapter.execute(...[0, 1, 2]);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(2);
  });

  // 测试 execute 方法在达到最大重试次数后是否抛出异常
  test('execute should throw error after max retries', async () => {
    const ioRetryAdapter = new IORetryAdapter(new MockIORequestHandle(), 3, 100);
    await expect(ioRetryAdapter.execute('error')).rejects.toThrow('Mock error');
  });
});
