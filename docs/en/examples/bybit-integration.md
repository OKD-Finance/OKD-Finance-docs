# Bybit Integration

## Overview

Bybit integration in OKD Finance provides comprehensive access to spot and derivatives trading through a unified API. This guide covers setup, configuration, and advanced usage patterns for Bybit exchange integration.

## Initial Setup

### API Key Configuration

1. Log into your Bybit account
2. Navigate to "API Management"
3. Create a new API key with required permissions:
   - Read: For data access
   - Trade: For order placement
   - Withdraw: For fund transfers (optional)

### OKD Finance Configuration

```javascript
const config = {
  exchange: 'bybit',
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret',
  testnet: false, // true for testnet environment
  options: {
    defaultType: 'spot', // 'spot', 'linear', 'inverse'
    recvWindow: 5000,
    enableRateLimit: true
  }
};

const okdFinance = new OKDFinance(config);
``` -->

## Supported Markets

### Spot Trading
- All major cryptocurrency pairs
- Fiat pairs (USDT, USDC, EUR)
- Margin trading support

### Derivatives
- USDT Perpetual Contracts
- USDC Perpetual Contracts
- Inverse Perpetual Contracts
- Options (selected pairs)

## Basic Operations

### Account Information

```javascript
// Get account balance
const balance = await okdFinance.getBalance('bybit');
console.log('Spot balance:', balance.spot);
console.log('Derivatives:', balance.derivatives);

// Get trading fees
const fees = await okdFinance.getTradingFees('bybit');
console.log('Maker fee:', fees.maker);
console.log('Taker fee:', fees.taker);
``` -->

### Market Data

```javascript
// Get ticker information
const ticker = await okdFinance.getTicker('bybit', 'BTCUSDT');
console.log('Last price:', ticker.last);
console.log('24h volume:', ticker.volume);

// Get order book
const orderbook = await okdFinance.getOrderBook('bybit', 'BTCUSDT', 20);
console.log('Best bid:', orderbook.bids[0]);
console.log('Best ask:', orderbook.asks[0]);

// Get recent trades
const trades = await okdFinance.getTrades('bybit', 'BTCUSDT', 50);
console.log('Latest trade:', trades[0]);

// Get candlestick data
const candles = await okdFinance.getCandles('bybit', 'BTCUSDT', '1h', {
  limit: 100,
  since: Date.now() - 24 * 60 * 60 * 1000 // Last 24 hours
});
``` -->

### Order Management

```javascript
// Place market order
const marketOrder = await okdFinance.createOrder('bybit', {
  symbol: 'BTCUSDT',
  type: 'market',
  side: 'buy',
  amount: 0.001
});

// Place limit order
const limitOrder = await okdFinance.createOrder('bybit', {
  symbol: 'ETHUSDT',
  type: 'limit',
  side: 'sell',
  amount: 0.1,
  price: 3500,
  timeInForce: 'GTC'
});

// Place stop order
const stopOrder = await okdFinance.createOrder('bybit', {
  symbol: 'BTCUSDT',
  type: 'stop',
  side: 'sell',
  amount: 0.001,
  stopPrice: 44000,
  price: 43900
});
``` -->

## Advanced Trading Features

### Conditional Orders

```javascript
// OCO (One-Cancels-Other) Order
const ocoOrder = await okdFinance.createOCOOrder('bybit', {
  symbol: 'BTCUSDT',
  side: 'sell',
  amount: 0.001,
  price: 46000, // Limit price
  stopPrice: 44000, // Stop price
  stopLimitPrice: 43900 // Stop limit price
});

// Trailing Stop Order
const trailingStop = await okdFinance.createOrder('bybit', {
  symbol: 'BTCUSDT',
  type: 'trailing_stop',
  side: 'sell',
  amount: 0.001,
  callbackRate: 0.02 // 2% trailing distance
});
``` -->

### Position Management (Derivatives)

```javascript
// Set leverage
await okdFinance.setLeverage('bybit', 'BTCUSDT', 10);

// Get current positions
const positions = await okdFinance.getPositions('bybit');
console.log('Open positions:', positions);

// Add margin to position
await okdFinance.addMargin('bybit', 'BTCUSDT', 100);

// Close position
await okdFinance.closePosition('bybit', 'BTCUSDT');

// Set position mode (hedge/one-way)
await okdFinance.setPositionMode('bybit', 'hedge');
``` -->

## WebSocket Integration

### Public Data Streams

```javascript
const ws = okdFinance.createWebSocket('bybit');

// Subscribe to ticker updates
ws.subscribe('ticker', ['BTCUSDT', 'ETHUSDT']);

// Subscribe to order book updates
ws.subscribe('orderbook', ['BTCUSDT'], { levels: 25 });

// Subscribe to trade updates
ws.subscribe('trades', ['BTCUSDT']);

// Subscribe to candlestick updates
ws.subscribe('candles', ['BTCUSDT'], '1m');

// Handle incoming data
ws.on('ticker', (data) => {
  console.log('Ticker update:', data);
});

ws.on('orderbook', (data) => {
  console.log('Order book update:', data);
});

ws.on('trades', (data) => {
  console.log('New trade:', data);
});
``` -->

### Private Data Streams

```javascript
// Subscribe to account updates
ws.subscribe('balance');
ws.subscribe('orders');
ws.subscribe('positions');

// Handle private updates
ws.on('balance', (data) => {
  console.log('Balance updated:', data);
  updatePortfolioDisplay(data);
});

ws.on('orders', (data) => {
  console.log('Order update:', data);
  handleOrderUpdate(data);
});

ws.on('positions', (data) => {
  console.log('Position update:', data);
  updatePositionDisplay(data);
});
``` -->

## Risk Management

### Stop Loss and Take Profit

```javascript
// Order with automatic stop loss and take profit
const orderWithSLTP = await okdFinance.createOrder('bybit', {
  symbol: 'BTCUSDT',
  type: 'market',
  side: 'buy',
  amount: 0.001,
  stopLoss: {
    type: 'percentage',
    value: 2 // 2% stop loss
  },
  takeProfit: {
    type: 'percentage',
    value: 5 // 5% take profit
  }
});
``` -->

### Position Size Calculation

```javascript
class BybitRiskManager {
  constructor(config) {
    this.maxRiskPerTrade = config.maxRiskPerTrade || 0.02; // 2%
    this.maxPositionSize = config.maxPositionSize || 0.1; // 10% of portfolio
  }

  calculatePositionSize(accountBalance, entryPrice, stopLoss) {
    const riskAmount = accountBalance * this.maxRiskPerTrade;
    const priceRisk = Math.abs(entryPrice - stopLoss);
    const positionSize = riskAmount / priceRisk;
    
    const maxSize = accountBalance * this.maxPositionSize / entryPrice;
    
    return Math.min(positionSize, maxSize);
  }

  async createRiskManagedOrder(symbol, side, entryPrice, stopLoss) {
    const balance = await okdFinance.getBalance('bybit');
    const accountValue = balance.total.USDT;
    
    const positionSize = this.calculatePositionSize(
      accountValue, 
      entryPrice, 
      stopLoss
    );

    return await okdFinance.createOrder('bybit', {
      symbol,
      type: 'limit',
      side,
      amount: positionSize,
      price: entryPrice,
      stopLoss: {
        type: 'price',
        value: stopLoss
      }
    });
  }
}
``` -->

## Error Handling

### Common Error Scenarios

```javascript
class BybitErrorHandler {
  async executeOrderWithRetry(orderParams, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await okdFinance.createOrder('bybit', orderParams);
      } catch (error) {
        console.log(`Order attempt ${attempt} failed:`, error.message);
        
        if (this.isRetryableError(error)) {
          if (attempt < maxRetries) {
            await this.delay(1000 * attempt); // Exponential backoff
            continue;
          }
        }
        
        throw this.handleSpecificError(error);
      }
    }
  }

  isRetryableError(error) {
    const retryableCodes = [
      'NETWORK_ERROR',
      'TIMEOUT',
      'RATE_LIMIT_EXCEEDED',
      'SERVER_ERROR'
    ];
    
    return retryableCodes.includes(error.code);
  }

  handleSpecificError(error) {
    switch (error.code) {
      case 'INSUFFICIENT_BALANCE':
        return new Error('Insufficient balance for this trade');
      case 'INVALID_SYMBOL':
        return new Error('Trading pair not supported');
      case 'MIN_NOTIONAL':
        return new Error('Order size below minimum requirement');
      case 'PRICE_FILTER':
        return new Error('Price outside allowed range');
      default:
        return error;
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
``` -->

## Performance Optimization

### Connection Pooling

```javascript
class BybitConnectionManager {
  constructor() {
    this.connections = new Map();
    this.maxConnections = 5;
  }

  getConnection(type = 'default') {
    if (!this.connections.has(type)) {
      if (this.connections.size >= this.maxConnections) {
        // Reuse least recently used connection
        const oldestKey = this.connections.keys().next().value;
        this.connections.delete(oldestKey);
      }
      
      this.connections.set(type, this.createNewConnection());
    }
    
    return this.connections.get(type);
  }

  createNewConnection() {
    return okdFinance.createWebSocket('bybit', {
      compression: true,
      reconnect: true,
      maxReconnectAttempts: 10
    });
  }
}
``` -->

### Batch Operations

```javascript
class BybitBatchProcessor {
  constructor() {
    this.orderQueue = [];
    this.batchSize = 10;
    this.batchTimeout = 1000; // 1 second
  }

  queueOrder(orderParams) {
    return new Promise((resolve, reject) => {
      this.orderQueue.push({
        params: orderParams,
        resolve,
        reject
      });

      if (this.orderQueue.length >= this.batchSize) {
        this.processBatch();
      } else if (this.orderQueue.length === 1) {
        setTimeout(() => this.processBatch(), this.batchTimeout);
      }
    });
  }

  async processBatch() {
    if (this.orderQueue.length === 0) return;

    const batch = this.orderQueue.splice(0, this.batchSize);
    
    try {
      const results = await Promise.allSettled(
        batch.map(item => okdFinance.createOrder('bybit', item.params))
      );

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          batch[index].resolve(result.value);
        } else {
          batch[index].reject(result.reason);
        }
      });
    } catch (error) {
      batch.forEach(item => item.reject(error));
    }
  }
}
``` -->

## Monitoring and Analytics

### Performance Metrics

```javascript
class BybitPerformanceMonitor {
  constructor() {
    this.metrics = {
      orderLatency: [],
      fillRates: [],
      slippage: [],
      errors: []
    };
  }

  recordOrderLatency(startTime, endTime) {
    const latency = endTime - startTime;
    this.metrics.orderLatency.push(latency);
    
    if (latency > 1000) { // Alert if > 1 second
      console.warn(`High order latency detected: ${latency}ms`);
    }
  }

  recordSlippage(expectedPrice, actualPrice) {
    const slippage = Math.abs(actualPrice - expectedPrice) / expectedPrice;
    this.metrics.slippage.push(slippage);
    
    if (slippage > 0.001) { // Alert if > 0.1%
      console.warn(`High slippage detected: ${(slippage * 100).toFixed(3)}%`);
    }
  }

  generateReport() {
    return {
      averageLatency: this.average(this.metrics.orderLatency),
      averageSlippage: this.average(this.metrics.slippage),
      errorRate: this.metrics.errors.length / this.getTotalOrders(),
      recommendations: this.generateRecommendations()
    };
  }

  average(arr) {
    return arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.average(this.metrics.orderLatency) > 500) {
      recommendations.push('Consider using WebSocket for faster order execution');
    }
    
    if (this.average(this.metrics.slippage) > 0.005) {
      recommendations.push('Consider using limit orders to reduce slippage');
    }
    
    return recommendations;
  }
}
``` -->

## Testing and Simulation

### Paper Trading

```javascript
class BybitPaperTrading {
  constructor(initialBalance = 10000) {
    this.balance = { USDT: initialBalance };
    this.positions = new Map();
    this.orders = new Map();
    this.tradeHistory = [];
  }

  async createOrder(orderParams) {
    // Simulate order execution
    const order = {
      id: this.generateOrderId(),
      ...orderParams,
      status: 'filled',
      timestamp: Date.now()
    };

    // Update balance and positions
    this.updateBalanceAndPositions(order);
    
    // Record trade
    this.tradeHistory.push(order);
    
    return order;
  }

  updateBalanceAndPositions(order) {
    const { symbol, side, amount, price } = order;
    const cost = amount * price;
    
    if (side === 'buy') {
      this.balance.USDT -= cost;
      this.balance[symbol.replace('USDT', '')] = 
        (this.balance[symbol.replace('USDT', '')] || 0) + amount;
    } else {
      this.balance.USDT += cost;
      this.balance[symbol.replace('USDT', '')] -= amount;
    }
  }

  getPerformanceReport() {
    const totalTrades = this.tradeHistory.length;
    const profits = this.tradeHistory.map(t => t.profit || 0);
    const totalProfit = profits.reduce((sum, p) => sum + p, 0);
    
    return {
      totalTrades,
      totalProfit,
      winRate: profits.filter(p => p > 0).length / totalTrades,
      currentBalance: this.balance,
      roi: (totalProfit / 10000) * 100 // Assuming $10k initial
    };
  }

  generateOrderId() {
    return 'paper_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
``` -->
