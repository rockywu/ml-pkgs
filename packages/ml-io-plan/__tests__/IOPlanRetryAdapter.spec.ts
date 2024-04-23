import { IOPlanRetryAdapter, IORequestHandle, IOPlanNetworkError } from '../src';
import { delay } from '../src/utils';


class MockIORequestHandle implements IORequestHandle<any> {
  cnt: number = 0;
  async request(...args) {
    await delay(100);
    const err = args?.[0];
    if (err === 'error') {
      throw new Error('Mock error')
    } else if (err === 'network') {
      throw new IOPlanNetworkError("Network")
    } else if (err === 'shake') {
      this.cnt++
      if (this.cnt < 2) {
        throw new IOPlanNetworkError("Network")
      }
    } else if (err === 'shakeError') {
      this.cnt++
      if (this.cnt < 2) {
        throw new IOPlanNetworkError("Network")
      } else {
        throw new Error('Mock error')
      }
    }
    return [...args]
  }
}

// 测试 IOPlanRetryAdapter 类
describe('IOPlanRetryAdapter', () => {
  let ioAdapter;
  beforeEach(() => {
    ioAdapter = new IOPlanRetryAdapter(new MockIORequestHandle(), { maxRetries: 2, retryInterval: 100 });
  })

  // 测试构造函数
  test('执行：构造函数入参', () => {
    expect(ioAdapter['ioRequestHandle']).toBeInstanceOf(MockIORequestHandle);
    expect(ioAdapter.ioOptions['maxRetries']).toBe(2);
    expect(ioAdapter.ioOptions['retryInterval']).toBe(100);
  });

  // 测试 execute 方法
  test('执行：未出现网络异常时的返回值', async () => {
    const result = await ioAdapter.execute(...[0, 1, 2]);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(2);
  });

  // 测试 execute 方法在达到最大重试次数后是否抛出异常
  test('执行：当出现其他异常时的返回值', async () => {
    await expect(ioAdapter.execute('error')).rejects.toThrow('Mock error');
  });

  test('执行：网络异常无法恢复时是否返回多次运行的返回值', async () => {
    await expect(ioAdapter.execute('network')).rejects.toThrow('Network');
  });

  test('执行：网络异常抖动时，一次网络异常,并返回成功值', async () => {
    let times = 0;
    ioAdapter = new IOPlanRetryAdapter(new MockIORequestHandle(), {
      maxRetries: 2, retryInterval: 100, retryCallback: (ts: number) => {
        console.log('times', times)
        times = ts
      }
    });
    const result = await ioAdapter.execute('shake', 1);
    //一共网络波动了一次
    expect(times).toBe(1);
    expect(result?.[0]).toBe('shake');
    expect(result?.[1]).toBe(1);
  });

  test('执行：网络异常抖动时，一次网络异常,并返回接口异常', async () => {
    let times = 0;
    ioAdapter = new IOPlanRetryAdapter(new MockIORequestHandle(), {
      maxRetries: 2, retryInterval: 100, retryCallback: (ts: number) => {
        times = ts
      }
    });
    await expect(ioAdapter.execute('shakeError')).rejects.toThrow('Mock error');
    expect(times).toBe(1);
  });
});
