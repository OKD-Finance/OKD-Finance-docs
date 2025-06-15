# Wallets API

Wallet operations and balance management.

## Endpoints

### GET /wallets/balance
Get account balance for all currencies.

### GET /wallets/balance/{currency}
Get balance for specific currency.

### GET /wallets/deposit-address/{currency}
Get deposit address for currency.

### POST /wallets/withdraw
Submit withdrawal request.

### GET /wallets/transactions
Get transaction history.

### GET /wallets/deposits
Get deposit history.

### GET /wallets/withdrawals
Get withdrawal history.

## Supported Currencies

- BTC, ETH, USDT, USDC
- BNB, ADA, DOT, SOL
- MATIC, DOGE, SHIB, AVAX

## Examples

```bash
# Get balance
curl -X GET "https://api.okd.finance/wallets/balance" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get deposit address
curl -X GET "https://api.okd.finance/wallets/deposit-address/USDT" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Withdraw
curl -X POST "https://api.okd.finance/wallets/withdraw" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "currency": "USDT",
    "amount": "100.00",
    "address": "TQrZ9wHAG..."
  }'
``` 