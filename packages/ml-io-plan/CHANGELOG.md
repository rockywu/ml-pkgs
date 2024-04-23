# Change Log

这里保留了改动记录

## [1.0.0] - 2024-04-23

#### 对象调整

- `IORetryAdapter` 更名为 `IOPlanRetryAdapter` IO重试计划适配器
- `IOAuthPlanAdapter` 更名为 `IOPlanAuthAdapter` IO认证计划适配器
- `IORetryAdapter.executeWithRetry` api已移除
- `IOAuthPlanAdapter.executeWithRequest` api已移除

#### Error更名
- `IOAuthPlanExpiredError` 更名为 `IOPlanAuthError` 用于监听授权失败

#### Error新增
- `IOPlanNetworkError` 用于描述网络异常

#### 参数调整

- `IOPlanRetryAdapter` 调整constructor参数
- `IOPlanAuthAdapter`调整constructor参数

#### 完成工程单元测试

## [0.0.9] - 2024-04-19

- 不再维护版本，请使用最新版本