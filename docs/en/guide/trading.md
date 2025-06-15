# Trading

OKD Finance provides a powerful trading platform with Bybit integration for cryptocurrency trading.

## Core Features

### Order Types

- **Market Order** - executes immediately at current market price
- **Limit Order** - executes only when specified price is reached
- **Stop Loss** - automatically closes position at loss
- **Take Profit** - automatically closes position at profit

### Supported Instruments

- **Spot Trading** - trade spot assets
- **Futures** - trade futures contracts
- **Options** - trade options (coming soon)

## Creating Orders

### Via API

```javascript
const order = await okdFinance.createOrder({
  symbol: 'BTCUSDT',
  side: 'buy',
  type: 'limit',
  quantity: 0.001,
  price: 45000,
  timeInForce: 'GTC'
});
```

### Order Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `symbol` | string | Trading pair (e.g., BTCUSDT) |
| `side` | string | Direction: 'buy' or 'sell' |
| `type` | string | Order type: 'market', 'limit', 'stop' |
| `quantity` | number | Amount of base asset |
| `price` | number | Price (for limit orders) |
| `timeInForce` | string | Time in force: 'GTC', 'IOC', 'FOK' |

## Position Management

### View Open Positions

```javascript
const positions = await okdFinance.getPositions();
console.log(positions);
```

### Close Position

```javascript
const result = await okdFinance.closePosition({
  symbol: 'BTCUSDT',
  quantity: 0.001
});
```

## Risk Management

### Set Stop Loss

```javascript
const stopLoss = await okdFinance.setStopLoss({
  symbol: 'BTCUSDT',
  stopPrice: 44000,
  quantity: 0.001
});
```

### Set Take Profit

```javascript
const takeProfit = await okdFinance.setTakeProfit({
  symbol: 'BTCUSDT',
  targetPrice: 46000,
  quantity: 0.001
});
```

## Trading Strategies

### DCA (Dollar Cost Averaging)

```javascript
const dcaStrategy = {
  symbol: 'BTCUSDT',
  amount: 100, // USDT
  interval: '1d', // daily
  duration: 30 // days
};

await okdFinance.createDCAStrategy(dcaStrategy);
```

### Grid Trading

```javascript
const gridStrategy = {
  symbol: 'BTCUSDT',
  lowerPrice: 40000,
  upperPrice: 50000,
  gridCount: 10,
  investment: 1000 // USDT
};

await okdFinance.createGridStrategy(gridStrategy);
```

## Fees

| Trading Type | Maker | Taker |
|--------------|-------|-------|
| Spot | 0.1% | 0.1% |
| Futures | 0.02% | 0.05% |
| Options | 0.03% | 0.03% |

## Limits

- **Minimum order size**: 10 USDT
- **Maximum leverage**: 100x (for futures)
- **Maximum open orders**: 200

## Security

- All trading operations require API keys with trading permissions
- IP whitelist support for additional security
- Two-factor authentication (2FA) required for trading

## Monitoring

### Trading History

```javascript
const history = await okdFinance.getTradeHistory({
  symbol: 'BTCUSDT',
  limit: 100,
  startTime: Date.now() - 86400000 // last 24 hours
});
```

### Trading Statistics

```javascript
const stats = await okdFinance.getTradingStats({
  period: '30d'
});

console.log('PnL:', stats.totalPnL);
console.log('Win Rate:', stats.winRate);
console.log('Total Trades:', stats.totalTrades);
```
