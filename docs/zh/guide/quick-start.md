# 快速开始指南

几分钟内开始使用 OKD Finance。

## 步骤 1：创建账户

1. 访问 [okd.finance](https://okd.finance)
2. 点击"注册"
3. 输入您的邮箱和密码
4. 验证您的邮箱地址

## 步骤 2：完成 KYC

为了获得完整的交易权限，请完成身份验证：

1. 进入账户设置
2. 上传政府身份证件
3. 完成地址验证
4. 等待审批（通常 24-48 小时）

## 步骤 3：充值资金

### 加密货币充值
```bash
# 获取您的充值地址
curl -X GET "https://develop.okd.finance/api/wallets/deposit-address/USDT" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 银行转账
在支持的地区提供，需要完整的 KYC 验证。

## 步骤 4：开始交易

### 下您的第一个订单
```javascript
const order = await fetch('https://develop.okd.finance/api/trading/orders', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    symbol: 'BTCUSDT',
    side: 'Buy',
    orderType: 'Market',
    qty: '0.001'
  })
});
```

## 步骤 5：API 集成

### 获取 API 密钥
1. 进入 API 管理
2. 创建新的 API 密钥
3. 设置权限（读取、交易）
4. 安全保存您的密钥

### 第一个 API 调用
```bash
curl -X GET "https://develop.okd.finance/api/auth/me" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 下一步

- [交易概述](/zh/trading/overview)
- [API 文档](/zh/api/overview)
- [Bybit 集成](/zh/bybit/overview) 