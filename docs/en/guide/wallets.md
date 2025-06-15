# Wallets

OKD Finance provides a secure wallet management system for storing and managing cryptocurrency assets.

## Wallet Types

### Spot Wallet
- For trading spot assets
- Instant transfers between wallets
- Support for all major cryptocurrencies

### Futures Wallet
- For trading futures contracts
- Isolated margin and cross margin
- Automatic collateral management

### Savings Wallet
- For earning passive income
- Staking and lending programs
- Flexible and fixed deposits

## Supported Assets

### Major Cryptocurrencies
- **Bitcoin (BTC)** - primary reserve currency
- **Ethereum (ETH)** - for DeFi operations
- **USDT/USDC** - stablecoins for trading
- **BNB** - for reduced fees

### Altcoins
- Over 200 supported tokens
- Regular addition of new assets
- Support for ERC-20, BEP-20, TRC-20

## Wallet Operations

### View Balance

```javascript
const balance = await okdFinance.getWalletBalance();
console.log(balance);

// Result:
{
  "spot": {
    "BTC": "0.5",
    "ETH": "10.0",
    "USDT": "1000.0"
  },
  "futures": {
    "USDT": "500.0"
  },
  "savings": {
    "BTC": "0.1",
    "ETH": "2.0"
  }
}
``` -->

### Transfer Between Wallets

```javascript
const transfer = await okdFinance.transferBetweenWallets({
  asset: 'USDT',
  amount: 100,
  fromWallet: 'spot',
  toWallet: 'futures'
});
``` -->

### Transaction History

```javascript
const history = await okdFinance.getWalletHistory({
  asset: 'BTC',
  type: 'all', // 'deposit', 'withdraw', 'transfer'
  limit: 50,
  startTime: Date.now() - 86400000 // last 24 hours
});
``` -->

## Deposits

### Get Deposit Address

```javascript
const depositAddress = await okdFinance.getDepositAddress('BTC');
console.log(depositAddress);

// Result:
{
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "tag": null,
  "network": "BTC"
}
``` -->

### Supported Networks

| Asset | Networks | Minimum Deposit |
|-------|----------|----------------|
| BTC | Bitcoin | 0.0001 BTC |
| ETH | Ethereum | 0.01 ETH |
| USDT | Ethereum, BSC, Tron | 10 USDT |
| USDC | Ethereum, BSC | 10 USDC |

### Confirmations

- **Bitcoin**: 1 confirmation
- **Ethereum**: 12 confirmations
- **BSC**: 15 confirmations
- **Tron**: 19 confirmations

## Withdrawals

### Create Withdrawal Request

```javascript
const withdrawal = await okdFinance.createWithdrawal({
  asset: 'BTC',
  amount: 0.1,
  address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  network: 'BTC',
  tag: null // for assets requiring memo/tag
});
``` -->

### Withdrawal Fees

| Asset | Network | Fee |
|-------|---------|-----|
| BTC | Bitcoin | 0.0005 BTC |
| ETH | Ethereum | 0.005 ETH |
| USDT | Ethereum | 25 USDT |
| USDT | BSC | 1 USDT |
| USDT | Tron | 1 USDT |

### Withdrawal Limits

- **Unverified users**: 2 BTC per day
- **Basic verification**: 100 BTC per day
- **Advanced verification**: no limits

## Wallet Security

### Two-Factor Authentication (2FA)
```javascript
// Enable 2FA for wallet operations
const enable2FA = await okdFinance.enable2FA({
  type: 'withdrawal',
  secret: 'your-2fa-secret'
});
``` -->

### Address Whitelist
```javascript
// Add address to whitelist
const addToWhitelist = await okdFinance.addWithdrawalAddress({
  asset: 'BTC',
  address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  label: 'My Hardware Wallet'
});
``` -->

### Notifications
- Email notifications for all operations
- SMS for large withdrawals
- Push notifications in mobile app

## Developer API

### Webhook Notifications

```javascript
// Set up webhook for deposits
const webhook = await okdFinance.setWebhook({
  url: 'https://your-server.com/webhook',
  events: ['deposit.confirmed', 'withdrawal.completed']
});
``` -->

### Automatic Transfers

```javascript
// Automatic transfer when balance threshold is reached
const autoTransfer = await okdFinance.setAutoTransfer({
  fromWallet: 'spot',
  toWallet: 'savings',
  asset: 'USDT',
  threshold: 1000, // transfer when balance > 1000 USDT
  amount: 500 // transfer 500 USDT
});
``` -->

## Staking and Yield

### Flexible Staking

```javascript
const flexibleStaking = await okdFinance.stake({
  asset: 'ETH',
  amount: 1.0,
  type: 'flexible',
  apy: 5.2 // current yield
});
``` -->

### Fixed Staking

```javascript
const fixedStaking = await okdFinance.stake({
  asset: 'BTC',
  amount: 0.1,
  type: 'fixed',
  duration: 30, // days
  apy: 8.5
});
``` -->

### Yield by Asset

| Asset | Flexible Staking | Fixed (30 days) |
|-------|------------------|-----------------|
| BTC | 3.5% | 8.5% |
| ETH | 5.2% | 12.0% |
| USDT | 8.0% | 15.0% |
| BNB | 6.5% | 18.0% |

## Monitoring and Analytics

### Portfolio

```javascript
const portfolio = await okdFinance.getPortfolioSummary();
console.log(portfolio);

// Result:
{
  "totalValue": 15000.50, // USD
  "totalPnL": 2500.25,
  "pnlPercentage": 20.0,
  "assets": [
    {
      "asset": "BTC",
      "amount": "0.5",
      "value": 22500.00,
      "percentage": 75.0
    }
  ]
}
``` -->

### Reports

```javascript
const report = await okdFinance.generateWalletReport({
  period: '1M', // 1 month
  format: 'pdf',
  includeTransactions: true
});
``` -->
