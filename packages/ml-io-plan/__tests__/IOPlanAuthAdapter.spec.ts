import { IOPlanAuthAdapter, IOPlanAuthError, IOPlanNetworkError, IORequestAuthHandle } from '../src';
import { delay } from '../src/utils';

const K_MOCK_AUTH_FAIL = 'Mock Auth Fail';
const K_MOCK_AUTH_Error = 'Mock Auth Error';

class MockIORequestAuthHandle implements IORequestAuthHandle<any> {
  cnt: number = 0;
  authSuccess: boolean = false;
  canNext: boolean = false;
  errorType: string = '';
  async requestAuth(): Promise<void> {
    await delay(100)
    if (this.authSuccess === true) {
      this.canNext = true;
    } else {
      throw new Error(K_MOCK_AUTH_FAIL)
    }
  }
  async request(...args) {
    await delay(100)
    this.errorType = args?.[0];
    this.authSuccess = !!args?.[1];
    if (this.errorType === 'authError' && !this.canNext) {
      throw new IOPlanAuthError(K_MOCK_AUTH_Error)
    }
    return args?.[2];
  }
}

class MockIORequestAuthInitShouldFailHande extends MockIORequestAuthHandle {
  async requestAuth(): Promise<void> {
    await delay(100)
    throw new Error(K_MOCK_AUTH_FAIL)
  }
}

class MockIORequestAuthInitShouldAuthErrorHande extends MockIORequestAuthHandle {
  async requestAuth(): Promise<void> {
    await delay(100)
    throw new Error(K_MOCK_AUTH_Error)
  }
}

class MockIORequestAuthInitShouldSuccessHande extends MockIORequestAuthHandle {
  async requestAuth(): Promise<void> {
    await delay(100)
    this.canNext = true;
  }
}

// 测试 IOPlanRetryAdapter 类
describe('IOPlanRetryAdapter', () => {
  let ioAdapter;
  beforeEach(() => {
    ioAdapter = new IOPlanAuthAdapter(new MockIORequestAuthHandle(), { initialShouldRequestAuth: false });
  })

  // 测试构造函数
  test('执行：构造函数入参', () => {
    expect(ioAdapter['ioRequestHandle']).toBeInstanceOf(MockIORequestAuthHandle);
  });

  test('执行：一个请求，等待认证失败的返回值', async () => {
    await expect(ioAdapter.execute('authError', false)).rejects.toThrow(K_MOCK_AUTH_FAIL);
  });

  test('执行：多个并发请求存在部分成功,等待认证失败的返回值', async () => {
    await expect(Promise.all([
      ioAdapter.execute('authError'),
      ioAdapter.execute('authError', true),
      ioAdapter.execute('authError', true),
      ioAdapter.execute('authError'),
    ])).rejects.toThrow(K_MOCK_AUTH_FAIL);
  })

  test('执行：一个请求，等待认证成功的返回', async () => {
    await expect(ioAdapter.execute('authError', true, 'name')).resolves.toBe('name')
  })

  test('执行：多个并发请求,存在部分重新认证,等待认证成功的返回值', async () => {
    await expect(Promise.all([
      ioAdapter.execute('authError', true, 1),
      ioAdapter.execute('authError', true, 2),
      ioAdapter.execute('authError', true, 3),
      ioAdapter.execute(null, true, 4),
    ])).resolves.toEqual([1, 2, 3, 4])
  })

  test('执行：默认启动进行auth认证,等待认证失败的返回值', async () => {
    ioAdapter = new IOPlanAuthAdapter(new MockIORequestAuthInitShouldFailHande(), { initialShouldRequestAuth: true });
    await expect(ioAdapter.execute('authError')).rejects.toThrow(K_MOCK_AUTH_FAIL);
  })

  test('执行：默认启动进行auth认证,等待认证成功的返回值', async () => {
    ioAdapter = new IOPlanAuthAdapter(new MockIORequestAuthInitShouldSuccessHande(), { initialShouldRequestAuth: true });
    await expect(ioAdapter.execute('authError', null, 'name')).resolves.toBe('name')
  })

  test('执行：默认启动进行auth认证, 模拟认证时返回认证异常的场景，等待认证失败返回', async () => {
    ioAdapter = new IOPlanAuthAdapter(new MockIORequestAuthInitShouldAuthErrorHande(), { initialShouldRequestAuth: true });
    await expect(ioAdapter.execute('authError', true, 'name')).rejects.toThrow(K_MOCK_AUTH_Error)
  })

});
