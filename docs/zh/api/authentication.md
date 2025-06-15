# 身份验证 API

用户身份验证和授权的 API 端点。

## 基础 URL
``` -->
https://api.okd.finance
``` -->

## 端点

### POST /auth/register
使用 Firebase 令牌注册新用户。

### POST /auth/login
用户登录并获取 JWT 令牌。

### POST /auth/refresh
刷新 JWT 令牌。

### GET /auth/me
获取当前用户信息。

### POST /auth/logout
用户登出。

## 身份验证流程

1. 使用 Firebase 进行身份验证
2. 将 Firebase 令牌交换为 JWT
3. 使用 JWT 进行 API 请求
4. 需要时刷新 JWT

## 速率限制

- 注册：5 请求/小时
- 登录：10 请求/5 分钟
- 其他：1000 请求/小时

详细示例请参见 [基本用法](/zh/examples/basic-usage)。 