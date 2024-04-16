import { IORetryAdapter } from '../src/IORetryAdapter';

// 模拟一个 IO 函数
async function mockIOFunction(...args: any[]): Promise<number> {
  // 模拟一个成功的 IO 请求
  return 42;
}

// 测试 IORetryAdapter 类
describe('IORetryAdapter', () => {
  // 测试构造函数
  test('constructor should initialize properties correctly', () => {
    const ioRetryAdapter = new IORetryAdapter(mockIOFunction, 5, 2000);
    expect(ioRetryAdapter['ioFunction']).toBe(mockIOFunction);
    expect(ioRetryAdapter['maxRetries']).toBe(5);
    expect(ioRetryAdapter['retryInterval']).toBe(2000);
  });

  // 测试 executeWithRetry 方法
  test('executeWithRetry should retry and resolve with correct result', async () => {
    const ioRetryAdapter = new IORetryAdapter(mockIOFunction, 3, 100);
    const result = await ioRetryAdapter.executeWithRetry();
    expect(result).toBe(42); // 由于 mockIOFunction 返回的是 42，所以期望结果也应该是 42
  });

  // 测试 executeWithRetry 方法在达到最大重试次数后是否抛出异常
  test('executeWithRetry should throw error after max retries', async () => {
    const ioRetryAdapter = new IORetryAdapter(async () => {
      throw new Error('Mock error');
    }, 3, 100);
    await expect(ioRetryAdapter.executeWithRetry()).rejects.toThrow('Mock error');
  });
});
