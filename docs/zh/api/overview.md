# API 概述

OKD Finance 为所有平台功能提供全面的 REST API。

## 基础 URL
```
https://api.okd.finance
```

## 身份验证

所有 API 请求都需要 JWT 身份验证：

```bash
curl -X GET "https://api.okd.finance/endpoint" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## API 类别

### 身份验证 API
- 用户注册和登录
- 令牌管理
- 个人资料更新

### 钱包 API
- 余额查询
- 存取款操作
- 交易历史

### 交易 API
- 订单下达和管理
- 持仓跟踪
- 市场数据访问

### KYC API
- 文档上传
- 验证状态
- 合规检查

## 速率限制

| 类别 | 限制 |
|------|------|
| 公共端点 | 100 请求/分钟 |
| 私有端点 | 1000 请求/分钟 |
| 交易端点 | 500 请求/分钟 |

## 响应格式

所有响应都遵循此结构：

```json
{
  "success": true,
  "data": {
    // 响应数据
  },
  "error": null
}
```

## 错误处理

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述"
  }
}
```

## WebSocket API

实时数据流：

```javascript
const ws = new WebSocket('wss://api.okd.finance/ws');
ws.send(JSON.stringify({
  action: 'subscribe',
  channel: 'prices',
  symbol: 'BTCUSDT'
}));
```

## SDK 和库

- JavaScript/Node.js SDK
- Python SDK
- PHP SDK
- Go SDK

## 开始使用

1. [身份验证](/zh/api/authentication)
2. [用户管理](/zh/api/users)
3. [钱包操作](/zh/api/wallets)
4. [交易功能](/zh/trading/overview) 