# Order Management Guide

## Overview

This comprehensive guide covers order management in OKD Finance, from basic order types to advanced trading strategies. Learn how to place, monitor, and manage orders across multiple exchanges efficiently.

## Basic Order Types

### Market Orders

Market orders execute immediately at the current market price:

```javascript
// Simple market buy
const marketBuy = await okdFinance.createOrder('binance', {
  symbol: 'BTCUSDT',
  type: 'market',
  side: 'buy',
  amount: 0.001
});

// Market sell with quote amount
const marketSell = await okdFinance.createOrder('bybit', {
  symbol: 'ETHUSDT',
  type: 'market',
  side: 'sell',
  quoteOrderQty: 1000 // Sell $1000 worth of ETH
});
``` -->

### Limit Orders

Limit orders execute only at a specified price or better:

```javascript
// Basic limit order
const limitOrder = await okdFinance.createOrder('okx', {
  symbol: 'BTCUSDT',
  type: 'limit',
  side: 'buy',
  amount: 0.1,
  price: 44000,
  timeInForce: 'GTC' // Good Till Canceled
});

// Limit order with expiration
const expiringLimit = await okdFinance.createOrder('binance', {
  symbol: 'ADAUSDT',
  type: 'limit',
  side: 'sell',
  amount: 1000,
  price: 0.55,
  timeInForce: 'GTD', // Good Till Date
  expirationTime: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
});
``` -->

### Stop Orders

Stop orders become market orders when a trigger price is reached:

```javascript
// Stop-loss order
const stopLoss = await okdFinance.createOrder('bybit', {
  symbol: 'BTCUSDT',
  type: 'stop',
  side: 'sell',
  amount: 0.1,
  stopPrice: 43000 // Trigger price
});

// Stop-limit order
const stopLimit = await okdFinance.createOrder('binance', {
  symbol: 'ETHUSDT',
  type: 'stop_limit',
  side: 'buy',
  amount: 1.0,
  stopPrice: 3600, // Trigger price
  price: 3610 // Limit price after trigger
});
``` -->

## Advanced Order Types

### OCO Orders (One-Cancels-Other)

OCO orders combine a limit order with a stop order:

```javascript
const ocoOrder = await okdFinance.createOCOOrder('binance', {
  symbol: 'BTCUSDT',
  side: 'sell',
  amount: 0.1,
  price: 46000, // Take profit price
  stopPrice: 43000, // Stop loss trigger
  stopLimitPrice: 42900 // Stop loss limit price
});

console.log('OCO Order created:', ocoOrder);
// {
//   orderListId: 123456,
//   orders: [
//     { orderId: 789, type: 'limit', price: 46000 },
//     { orderId: 790, type: 'stop_limit', stopPrice: 43000 }
//   ]
// }
``` -->

### Iceberg Orders

Hide large orders by showing only small portions:

```javascript
const icebergOrder = await okdFinance.createOrder('binance', {
  symbol: 'BTCUSDT',
  type: 'limit',
  side: 'buy',
  amount: 5.0, // Total amount
  price: 44000,
  icebergQty: 0.1, // Show only 0.1 BTC at a time
  timeInForce: 'GTC'
});
``` -->

### Trailing Stop Orders

Stop orders that follow the price at a fixed distance:

```javascript
const trailingStop = await okdFinance.createOrder('bybit', {
  symbol: 'ETHUSDT',
  type: 'trailing_stop',
  side: 'sell',
  amount: 2.0,
  callbackRate: 0.02 // 2% trailing distance
});

// Trailing stop with activation price
const conditionalTrailing = await okdFinance.createOrder('okx', {
  symbol: 'BTCUSDT',
  type: 'trailing_stop',
  side: 'sell',
  amount: 0.5,
  activationPrice: 45000, // Start trailing when price reaches this
  callbackRate: 0.03 // 3% trailing distance
});
``` -->

## Order Management

### Retrieving Orders

```javascript
// Get specific order
const order = await okdFinance.getOrder('binance', 'order_id_123');
console.log('Order status:', order.status);

// Get all open orders
const openOrders = await okdFinance.getOpenOrders('bybit');
console.log(`${openOrders.length} open orders`);

// Get open orders for specific symbol
const btcOrders = await okdFinance.getOpenOrders('binance', 'BTCUSDT');

// Get order history with filters
const orderHistory = await okdFinance.getOrderHistory('okx', {
  symbol: 'ETHUSDT',
  startTime: Date.now() - 7 * 24 * 60 * 60 * 1000, // Last 7 days
  limit: 100
});
``` -->

### Modifying Orders

```javascript
// Modify order price and quantity
const modifiedOrder = await okdFinance.modifyOrder('binance', 'order_id_123', {
  price: 45000,
  amount: 0.15
});

// Modify only price
await okdFinance.modifyOrderPrice('bybit', 'order_id_456', 3650);

// Modify only quantity
await okdFinance.modifyOrderQuantity('okx', 'order_id_789', 2.5);
``` -->

### Canceling Orders

```javascript
// Cancel single order
await okdFinance.cancelOrder('binance', 'order_id_123');

// Cancel multiple orders
await okdFinance.cancelOrders('bybit', ['order_id_1', 'order_id_2', 'order_id_3']);

// Cancel all orders for a symbol
await okdFinance.cancelAllOrders('okx', 'BTCUSDT');

// Cancel all orders on exchange
await okdFinance.cancelAllOrders('binance');

// Cancel orders with filters
await okdFinance.cancelOrdersWhere('bybit', {
  symbol: 'ETHUSDT',
  side: 'buy',
  priceBelow: 3500
});
``` -->

## Order Monitoring

### Real-time Order Updates

```javascript
class OrderMonitor {
  constructor() {
    this.activeOrders = new Map();
    this.orderCallbacks = new Map();
  }

  async startMonitoring(exchange) {
    const ws = okdFinance.createWebSocket(exchange);
    
    // Subscribe to order updates
    ws.subscribe('orders');
    
    ws.on('orderUpdate', (data) => {
      this.handleOrderUpdate(data);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.reconnect(exchange);
    });
  }

  handleOrderUpdate(orderData) {
    const { orderId, status, executedQty, price } = orderData;
    
    // Update local order tracking
    this.activeOrders.set(orderId, orderData);
    
    // Execute callbacks
    const callback = this.orderCallbacks.get(orderId);
    if (callback) {
      callback(orderData);
    }
    
    // Handle different order statuses
    switch (status) {
      case 'filled':
        this.handleOrderFilled(orderData);
        break;
      case 'partially_filled':
        this.handlePartialFill(orderData);
        break;
      case 'canceled':
        this.handleOrderCanceled(orderData);
        break;
      case 'rejected':
        this.handleOrderRejected(orderData);
        break;
    }
  }

  handleOrderFilled(orderData) {
    console.log(`Order ${orderData.orderId} filled:`, orderData);
    
    // Send notification
    this.sendNotification('Order Filled', {
      symbol: orderData.symbol,
      side: orderData.side,
      amount: orderData.executedQty,
      price: orderData.price
    });
    
    // Clean up
    this.activeOrders.delete(orderData.orderId);
    this.orderCallbacks.delete(orderData.orderId);
  }

  handlePartialFill(orderData) {
    const fillPercent = (orderData.executedQty / orderData.origQty) * 100;
    console.log(`Order ${orderData.orderId} ${fillPercent.toFixed(1)}% filled`);
  }

  handleOrderCanceled(orderData) {
    console.log(`Order ${orderData.orderId} canceled`);
    this.activeOrders.delete(orderData.orderId);
    this.orderCallbacks.delete(orderData.orderId);
  }

  handleOrderRejected(orderData) {
    console.error(`Order ${orderData.orderId} rejected:`, orderData.rejectReason);
    this.activeOrders.delete(orderData.orderId);
    this.orderCallbacks.delete(orderData.orderId);
  }

  // Register callback for specific order
  onOrderUpdate(orderId, callback) {
    this.orderCallbacks.set(orderId, callback);
  }

  sendNotification(title, data) {
    // Implement your notification system
    console.log(`📢 ${title}:`, data);
  }
}
``` -->

### Order Analytics

```javascript
class OrderAnalytics {
  constructor() {
    this.orderHistory = [];
    this.metrics = {};
  }

  recordOrder(order) {
    this.orderHistory.push({
      ...order,
      timestamp: Date.now()
    });
    
    this.updateMetrics();
  }

  updateMetrics() {
    const orders = this.orderHistory;
    const filledOrders = orders.filter(o => o.status === 'filled');
    
    this.metrics = {
      totalOrders: orders.length,
      filledOrders: filledOrders.length,
      fillRate: filledOrders.length / orders.length,
      averageFillTime: this.calculateAverageFillTime(filledOrders),
      slippageAnalysis: this.analyzeSlippage(filledOrders),
      feeAnalysis: this.analyzeFees(filledOrders)
    };
  }

  calculateAverageFillTime(orders) {
    if (orders.length === 0) return 0;
    
    const fillTimes = orders
      .filter(o => o.fillTime && o.createTime)
      .map(o => o.fillTime - o.createTime);
    
    return fillTimes.reduce((sum, time) => sum + time, 0) / fillTimes.length;
  }

  analyzeSlippage(orders) {
    const marketOrders = orders.filter(o => o.type === 'market');
    
    if (marketOrders.length === 0) return { average: 0, max: 0 };
    
    const slippages = marketOrders.map(order => {
      const expectedPrice = order.expectedPrice || order.price;
      const actualPrice = order.avgPrice || order.price;
      return Math.abs(actualPrice - expectedPrice) / expectedPrice;
    });
    
    return {
      average: slippages.reduce((sum, s) => sum + s, 0) / slippages.length,
      max: Math.max(...slippages),
      distribution: this.calculateSlippageDistribution(slippages)
    };
  }

  analyzeFees(orders) {
    const totalFees = orders.reduce((sum, order) => sum + (order.fee || 0), 0);
    const totalVolume = orders.reduce((sum, order) => sum + (order.quoteQty || 0), 0);
    
    return {
      totalFees,
      totalVolume,
      averageFeeRate: totalVolume > 0 ? totalFees / totalVolume : 0,
      feesByExchange: this.groupFeesByExchange(orders)
    };
  }

  generateReport(period = '24h') {
    const periodMs = this.parsePeriod(period);
    const cutoff = Date.now() - periodMs;
    const recentOrders = this.orderHistory.filter(o => o.timestamp > cutoff);
    
    return {
      period,
      orderCount: recentOrders.length,
      fillRate: this.calculateFillRate(recentOrders),
      averageOrderSize: this.calculateAverageOrderSize(recentOrders),
      mostTradedSymbols: this.getMostTradedSymbols(recentOrders),
      performanceMetrics: this.calculatePerformanceMetrics(recentOrders)
    };
  }

  parsePeriod(period) {
    const units = { h: 3600000, d: 86400000, w: 604800000 };
    const match = period.match(/^(\d+)([hdw])$/);
    if (!match) throw new Error('Invalid period format');
    return parseInt(match[1]) * units[match[2]];
  }
}
``` -->

## Conditional Orders

### Price-Based Conditions

```javascript
class ConditionalOrderManager {
  constructor() {
    this.conditions = new Map();
    this.activeConditions = new Set();
  }

  // Create order that executes when price condition is met
  async createPriceConditionalOrder(exchange, orderParams, condition) {
    const conditionId = this.generateConditionId();
    
    this.conditions.set(conditionId, {
      type: 'price',
      condition,
      orderParams,
      exchange,
      created: Date.now()
    });
    
    this.activeConditions.add(conditionId);
    
    // Start monitoring
    this.monitorCondition(conditionId);
    
    return conditionId;
  }

  async monitorCondition(conditionId) {
    const conditionData = this.conditions.get(conditionId);
    if (!conditionData || !this.activeConditions.has(conditionId)) {
      return;
    }
    
    const { condition, orderParams, exchange } = conditionData;
    
    try {
      const ticker = await okdFinance.getTicker(exchange, orderParams.symbol);
      const currentPrice = ticker.last;
      
      if (this.evaluateCondition(condition, currentPrice)) {
        // Condition met, execute order
        await this.executeConditionalOrder(conditionId);
      } else {
        // Check again in 1 second
        setTimeout(() => this.monitorCondition(conditionId), 1000);
      }
    } catch (error) {
      console.error(`Error monitoring condition ${conditionId}:`, error);
      setTimeout(() => this.monitorCondition(conditionId), 5000);
    }
  }

  evaluateCondition(condition, currentPrice) {
    switch (condition.operator) {
      case '>':
        return currentPrice > condition.price;
      case '<':
        return currentPrice < condition.price;
      case '>=':
        return currentPrice >= condition.price;
      case '<=':
        return currentPrice <= condition.price;
      case '==':
        return Math.abs(currentPrice - condition.price) < 0.01;
      default:
        return false;
    }
  }

  async executeConditionalOrder(conditionId) {
    const conditionData = this.conditions.get(conditionId);
    
    try {
      const order = await okdFinance.createOrder(
        conditionData.exchange,
        conditionData.orderParams
      );
      
      console.log(`Conditional order executed: ${order.orderId}`);
      
      // Clean up
      this.activeConditions.delete(conditionId);
      
      return order;
    } catch (error) {
      console.error(`Failed to execute conditional order:`, error);
      throw error;
    }
  }

  // Cancel conditional order
  cancelConditionalOrder(conditionId) {
    this.activeConditions.delete(conditionId);
    this.conditions.delete(conditionId);
  }

  generateConditionId() {
    return 'cond_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Usage examples
const conditionalManager = new ConditionalOrderManager();

// Buy when price goes above $45,000
const buyCondition = await conditionalManager.createPriceConditionalOrder(
  'binance',
  {
    symbol: 'BTCUSDT',
    type: 'market',
    side: 'buy',
    amount: 0.1
  },
  {
    operator: '>',
    price: 45000
  }
);

// Sell when price drops below $43,000
const sellCondition = await conditionalManager.createPriceConditionalOrder(
  'binance',
  {
    symbol: 'BTCUSDT',
    type: 'market',
    side: 'sell',
    amount: 0.1
  },
  {
    operator: '<',
    price: 43000
  }
);
``` -->

### Time-Based Orders

```javascript
class ScheduledOrderManager {
  constructor() {
    this.scheduledOrders = new Map();
  }

  scheduleOrder(exchange, orderParams, executeAt) {
    const orderId = this.generateOrderId();
    const delay = executeAt - Date.now();
    
    if (delay <= 0) {
      throw new Error('Execution time must be in the future');
    }
    
    const timeoutId = setTimeout(async () => {
      try {
        const order = await okdFinance.createOrder(exchange, orderParams);
        console.log(`Scheduled order executed: ${order.orderId}`);
        this.scheduledOrders.delete(orderId);
      } catch (error) {
        console.error(`Scheduled order failed:`, error);
      }
    }, delay);
    
    this.scheduledOrders.set(orderId, {
      timeoutId,
      exchange,
      orderParams,
      executeAt
    });
    
    return orderId;
  }

  cancelScheduledOrder(orderId) {
    const scheduledOrder = this.scheduledOrders.get(orderId);
    if (scheduledOrder) {
      clearTimeout(scheduledOrder.timeoutId);
      this.scheduledOrders.delete(orderId);
      return true;
    }
    return false;
  }

  getScheduledOrders() {
    return Array.from(this.scheduledOrders.entries()).map(([id, data]) => ({
      id,
      exchange: data.exchange,
      symbol: data.orderParams.symbol,
      executeAt: data.executeAt,
      timeRemaining: Math.max(0, data.executeAt - Date.now())
    }));
  }

  generateOrderId() {
    return 'sched_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Usage
const scheduler = new ScheduledOrderManager();

// Schedule order for 1 hour from now
const scheduledOrderId = scheduler.scheduleOrder(
  'binance',
  {
    symbol: 'BTCUSDT',
    type: 'market',
    side: 'buy',
    amount: 0.1
  },
  Date.now() + 60 * 60 * 1000 // 1 hour
);
``` -->

## Best Practices

### Order Validation

```javascript
class OrderValidator {
  constructor() {
    this.exchangeLimits = {
      binance: {
        minOrderSize: { BTCUSDT: 0.00001, ETHUSDT: 0.0001 },
        maxOrderSize: { BTCUSDT: 9000, ETHUSDT: 100000 },
        priceFilter: { tickSize: 0.01 }
      },
      bybit: {
        minOrderSize: { BTCUSDT: 0.001, ETHUSDT: 0.01 },
        maxOrderSize: { BTCUSDT: 100, ETHUSDT: 1000 }
      }
    };
  }

  validateOrder(exchange, orderParams) {
    const errors = [];
    
    // Basic validation
    if (!orderParams.symbol) errors.push('Symbol is required');
    if (!orderParams.side) errors.push('Side is required');
    if (!orderParams.amount && !orderParams.quoteOrderQty) {
      errors.push('Amount or quote quantity is required');
    }
    
    // Exchange-specific validation
    const limits = this.exchangeLimits[exchange];
    if (limits) {
      const symbolLimits = limits.minOrderSize[orderParams.symbol];
      if (symbolLimits && orderParams.amount < symbolLimits) {
        errors.push(`Order size below minimum: ${symbolLimits}`);
      }
    }
    
    // Price validation for limit orders
    if (orderParams.type === 'limit' && !orderParams.price) {
      errors.push('Price is required for limit orders');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  async validateOrderWithMarketData(exchange, orderParams) {
    const validation = this.validateOrder(exchange, orderParams);
    if (!validation.isValid) return validation;
    
    try {
      // Get current market data
      const ticker = await okdFinance.getTicker(exchange, orderParams.symbol);
      const orderbook = await okdFinance.getOrderBook(exchange, orderParams.symbol, 5);
      
      // Additional market-based validation
      if (orderParams.type === 'limit') {
        const priceDeviation = Math.abs(orderParams.price - ticker.last) / ticker.last;
        if (priceDeviation > 0.1) { // 10% deviation
          validation.errors.push('Price deviates significantly from market price');
        }
      }
      
      // Check liquidity
      if (orderParams.type === 'market') {
        const availableLiquidity = this.calculateAvailableLiquidity(
          orderbook, 
          orderParams.side, 
          orderParams.amount
        );
        
        if (availableLiquidity < orderParams.amount) {
          validation.errors.push('Insufficient liquidity for market order');
        }
      }
      
      validation.isValid = validation.errors.length === 0;
      return validation;
    } catch (error) {
      validation.errors.push(`Failed to validate with market data: ${error.message}`);
      validation.isValid = false;
      return validation;
    }
  }

  calculateAvailableLiquidity(orderbook, side, amount) {
    const levels = side === 'buy' ? orderbook.asks : orderbook.bids;
    let totalLiquidity = 0;
    
    for (const [price, size] of levels) {
      totalLiquidity += size;
      if (totalLiquidity >= amount) break;
    }
    
    return totalLiquidity;
  }
}
``` -->

### Error Recovery

```javascript
class OrderErrorRecovery {
  constructor() {
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  async createOrderWithRetry(exchange, orderParams) {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        return await okdFinance.createOrder(exchange, orderParams);
      } catch (error) {
        console.warn(`Order attempt ${attempt} failed:`, error.message);
        
        if (attempt === this.retryAttempts) {
          throw error;
        }
        
        // Handle specific errors
        if (this.isRetryableError(error)) {
          await this.handleRetryableError(error, orderParams);
          await this.delay(this.retryDelay * attempt);
        } else {
          throw error; // Non-retryable error
        }
      }
    }
  }

  isRetryableError(error) {
    const retryableErrors = [
      'network error',
      'timeout',
      'rate limit',
      'server error',
      'insufficient balance' // Might be temporary
    ];
    
    return retryableErrors.some(errorType => 
      error.message.toLowerCase().includes(errorType)
    );
  }

  async handleRetryableError(error, orderParams) {
    if (error.message.includes('insufficient balance')) {
      // Check if balance has been updated
      const balance = await okdFinance.getBalance(orderParams.exchange);
      console.log('Current balance:', balance);
    } else if (error.message.includes('rate limit')) {
      // Increase delay for rate limit errors
      this.retryDelay *= 2;
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
``` -->
