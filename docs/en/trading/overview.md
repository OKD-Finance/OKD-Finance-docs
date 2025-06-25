# Trading API Overview

Advanced cryptocurrency trading with Bybit integration.

## Trading Features

### Spot Trading
- Major cryptocurrency pairs
- Real-time order execution
- Advanced order types

### Futures Trading  
- Perpetual contracts
- Up to 100x leverage
- Cross and isolated margin

### Order Types
- Market orders
- Limit orders  
- Stop loss orders
- Take profit orders
- Conditional orders

## Market Data

### Real-time Prices
```bash
curl -X GET "https://develop.okd.finance/api/trading/ticker/BNBETH"
```

### Order Book
```bash
curl -X GET "https://develop.okd.finance/api/trading/orderbook/BNBETH"
```

### Trade History
```bash
curl -X GET "https://develop.okd.finance/api/trading/trades/BNBETH"
```

## Order Management

### Place Order
```bash
curl -X POST "https://develop.okd.finance/api/trading/orders" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "symbol": "BNBETH",
    "side": "Buy", 
    "orderType": "Limit",
    "qty": "0.001",
    "price": "45000"
  }'
```

### Cancel Order
```bash
curl -X DELETE "https://develop.okd.finance/api/trading/orders/ORDER_ID" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Position Management

### Get Positions
```bash
curl -X GET "https://develop.okd.finance/api/trading/positions" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Close Position
```bash
curl -X POST "https://develop.okd.finance/api/trading/positions/close" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "symbol": "BNBETH",
    "qty": "0.001"
  }'
```

## Risk Management

- Position size limits
- Stop loss automation
- Margin requirements
- Liquidation protection

## Fees

### Spot Trading
- Maker: 0.1%
- Taker: 0.1%

### Futures Trading  
- Maker: 0.02%
- Taker: 0.06%

## Integration Guides

- [Basic Usage](/en/examples/basic-usage)
- [Advanced Strategies](/en/examples/trading-flow)
- [Bybit Integration](/en/bybit/overview) 