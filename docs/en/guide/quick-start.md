# Quick Start Guide

Get started with OKD Finance in just a few minutes.

## Step 1: Create Account

1. Visit [okd.finance](https://okd.finance)
2. Click "Sign Up" 
3. Enter your email and password
4. Verify your email address

## Step 2: Complete KYC

For full trading access, complete identity verification:

1. Go to Account Settings
2. Upload government ID
3. Complete address verification
4. Wait for approval (usually 24-48 hours)

## Step 3: Deposit Funds

### Cryptocurrency Deposit
```bash
# Get your deposit address
curl -X GET "https://develop.okd.finance/api/wallets/deposit-address/USDT" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Bank Transfer
Available in supported regions with full KYC verification.

## Step 4: Start Trading

### Place Your First Order
```javascript
const order = await fetch('https://develop.okd.finance/api/trading/orders', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
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

## Step 5: API Integration

### Get API Keys
1. Go to API Management
2. Create new API key
3. Set permissions (read, trade)
4. Save your keys securely

### First API Call
```bash
curl -X GET "https://develop.okd.finance/api/auth/me" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Next Steps

- [Trading Overview](/en/trading/overview)
- [API Documentation](/en/api/overview)
- [Bybit Integration](/en/bybit/overview) 