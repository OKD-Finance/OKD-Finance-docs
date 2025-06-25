# Trading Flow Examples

## Overview

This guide provides comprehensive examples of trading flows using OKD Finance platform. Learn how to implement various trading strategies from simple buy/sell operations to complex algorithmic trading systems.

## Basic Trading Flow

### Simple Buy/Sell Operations

```javascript
// Basic market buy
const buyOrder = await okdFinance.createOrder('binance', {
  symbol: 'BNBETH',
  type: 'market',
  side: 'buy',
  amount: 0.1
});

// Basic limit sell
const sellOrder = await okdFinance.createOrder('binance', {
  symbol: 'BNBETH',
  type: 'limit',
  side: 'sell',
  amount: 0.1,
  price: 46000
});
```

### Order Management Flow

```javascript
class BasicTradingFlow {
  async executeTrade(symbol, side, amount, targetPrice) {
    try {
      // 1. Check balance
      const balance = await okdFinance.getBalance('binance');
      if (!this.hasEnoughBalance(balance, side, amount, targetPrice)) {
        throw new Error('Insufficient balance');
      }

      // 2. Place order
      const order = await okdFinance.createOrder('binance', {
        symbol,
        type: 'limit',
        side,
        amount,
        price: targetPrice
      });

      // 3. Monitor order
      return await this.monitorOrder(order.id);
    } catch (error) {
      console.error('Trading error:', error);
      throw error;
    }
  }

  async monitorOrder(orderId) {
    return new Promise((resolve, reject) => {
      const checkOrder = async () => {
        try {
          const order = await okdFinance.getOrder('binance', orderId);
          
          if (order.status === 'filled') {
            resolve(order);
          } else if (order.status === 'canceled' || order.status === 'rejected') {
            reject(new Error(`Order ${order.status}`));
          } else {
            setTimeout(checkOrder, 1000); // Check again in 1 second
          }
        } catch (error) {
          reject(error);
        }
      };
      
      checkOrder();
    });
  }
}
```

## Advanced Trading Strategies

### Dollar Cost Averaging (DCA)

```javascript
class DCAStrategy {
  constructor(config) {
    this.symbol = config.symbol;
    this.totalAmount = config.totalAmount;
    this.intervals = config.intervals;
    this.frequency = config.frequency; // 'daily', 'weekly', 'monthly'
    this.exchange = config.exchange;
  }

  async start() {
    const amountPerOrder = this.totalAmount / this.intervals;
    const intervalMs = this.getIntervalMs();

    for (let i = 0; i < this.intervals; i++) {
      setTimeout(async () => {
        await this.executeDCAOrder(amountPerOrder);
      }, i * intervalMs);
    }
  }

  async executeDCAOrder(amount) {
    try {
      const ticker = await okdFinance.getTicker(this.exchange, this.symbol);
      const quantity = amount / ticker.last;

      const order = await okdFinance.createOrder(this.exchange, {
        symbol: this.symbol,
        type: 'market',
        side: 'buy',
        amount: quantity
      });

      console.log(`DCA order executed: ${quantity} at ${ticker.last}`);
      return order;
    } catch (error) {
      console.error('DCA order failed:', error);
    }
  }

  getIntervalMs() {
    const intervals = {
      'daily': 24 * 60 * 60 * 1000,
      'weekly': 7 * 24 * 60 * 60 * 1000,
      'monthly': 30 * 24 * 60 * 60 * 1000
    };
    return intervals[this.frequency];
  }
}

// Usage
const dcaStrategy = new DCAStrategy({
  symbol: 'BNBETH',
  totalAmount: 1000, // $1000
  intervals: 10,
  frequency: 'daily',
  exchange: 'binance'
});

dcaStrategy.start();
```

### Grid Trading Strategy

```javascript
class GridTradingStrategy {
  constructor(config) {
    this.symbol = config.symbol;
    this.upperPrice = config.upperPrice;
    this.lowerPrice = config.lowerPrice;
    this.gridLevels = config.gridLevels;
    this.investment = config.investment;
    this.exchange = config.exchange;
    this.orders = new Map();
  }

  async initialize() {
    const priceStep = (this.upperPrice - this.lowerPrice) / (this.gridLevels - 1);
    const amountPerGrid = this.investment / this.gridLevels;

    // Place initial grid orders
    for (let i = 0; i < this.gridLevels; i++) {
      const price = this.lowerPrice + (i * priceStep);
      const quantity = amountPerGrid / price;

      // Place buy orders below current price
      if (price < await this.getCurrentPrice()) {
        await this.placeBuyOrder(price, quantity);
      }
      // Place sell orders above current price
      else {
        await this.placeSellOrder(price, quantity);
      }
    }

    // Start monitoring
    this.startMonitoring();
  }

  async placeBuyOrder(price, quantity) {
    try {
      const order = await okdFinance.createOrder(this.exchange, {
        symbol: this.symbol,
        type: 'limit',
        side: 'buy',
        amount: quantity,
        price: price
      });

      this.orders.set(order.id, { ...order, gridPrice: price });
      console.log(`Grid buy order placed: ${quantity} at ${price}`);
    } catch (error) {
      console.error('Failed to place buy order:', error);
    }
  }

  async placeSellOrder(price, quantity) {
    try {
      const order = await okdFinance.createOrder(this.exchange, {
        symbol: this.symbol,
        type: 'limit',
        side: 'sell',
        amount: quantity,
        price: price
      });

      this.orders.set(order.id, { ...order, gridPrice: price });
      console.log(`Grid sell order placed: ${quantity} at ${price}`);
    } catch (error) {
      console.error('Failed to place sell order:', error);
    }
  }

  startMonitoring() {
    const ws = okdFinance.createWebSocket(this.exchange);
    ws.subscribe('orders');

    ws.on('orderUpdate', async (data) => {
      if (this.orders.has(data.orderId) && data.status === 'filled') {
        await this.handleFilledOrder(data);
      }
    });
  }

  async handleFilledOrder(filledOrder) {
    const orderInfo = this.orders.get(filledOrder.orderId);
    this.orders.delete(filledOrder.orderId);

    // Place opposite order
    if (filledOrder.side === 'buy') {
      // Place sell order at higher price
      const sellPrice = orderInfo.gridPrice * 1.02; // 2% profit
      await this.placeSellOrder(sellPrice, filledOrder.executedQty);
    } else {
      // Place buy order at lower price
      const buyPrice = orderInfo.gridPrice * 0.98; // 2% below
      await this.placeBuyOrder(buyPrice, filledOrder.executedQty);
    }
  }

  async getCurrentPrice() {
    const ticker = await okdFinance.getTicker(this.exchange, this.symbol);
    return ticker.last;
  }
}
```

### Arbitrage Trading

```javascript
class ArbitrageStrategy {
  constructor(config) {
    this.symbol = config.symbol;
    this.exchanges = config.exchanges;
    this.minProfitPercent = config.minProfitPercent || 0.5;
    this.maxOrderSize = config.maxOrderSize || 1.0;
  }

  async start() {
    // Subscribe to tickers from all exchanges
    this.exchanges.forEach(exchange => {
      const ws = okdFinance.createWebSocket(exchange);
      ws.subscribe('ticker', [this.symbol]);
      
      ws.on('ticker', (data) => {
        this.checkArbitrageOpportunity(exchange, data);
      });
    });
  }

  async checkArbitrageOpportunity(exchange, ticker) {
    // Get prices from other exchanges
    const prices = await Promise.all(
      this.exchanges
        .filter(ex => ex !== exchange)
        .map(async ex => ({
          exchange: ex,
          ticker: await okdFinance.getTicker(ex, this.symbol)
        }))
    );

    // Find best arbitrage opportunity
    const opportunities = this.findOpportunities(ticker, prices);
    
    for (const opportunity of opportunities) {
      if (opportunity.profitPercent >= this.minProfitPercent) {
        await this.executeArbitrage(opportunity);
      }
    }
  }

  findOpportunities(currentTicker, otherPrices) {
    const opportunities = [];

    otherPrices.forEach(({ exchange, ticker }) => {
      // Buy low, sell high
      if (currentTicker.ask < ticker.bid) {
        const profitPercent = ((ticker.bid - currentTicker.ask) / currentTicker.ask) * 100;
        opportunities.push({
          buyExchange: currentTicker.exchange,
          sellExchange: exchange,
          buyPrice: currentTicker.ask,
          sellPrice: ticker.bid,
          profitPercent
        });
      }
    });

    return opportunities.sort((a, b) => b.profitPercent - a.profitPercent);
  }

  async executeArbitrage(opportunity) {
    try {
      const orderSize = Math.min(this.maxOrderSize, await this.getMaxOrderSize(opportunity));

      // Execute both orders simultaneously
      const [buyOrder, sellOrder] = await Promise.all([
        okdFinance.createOrder(opportunity.buyExchange, {
          symbol: this.symbol,
          type: 'market',
          side: 'buy',
          amount: orderSize
        }),
        okdFinance.createOrder(opportunity.sellExchange, {
          symbol: this.symbol,
          type: 'market',
          side: 'sell',
          amount: orderSize
        })
      ]);

      console.log(`Arbitrage executed: ${opportunity.profitPercent.toFixed(2)}% profit`);
      return { buyOrder, sellOrder };
    } catch (error) {
      console.error('Arbitrage execution failed:', error);
    }
  }

  async getMaxOrderSize(opportunity) {
    // Check balances and order book depth
    const [buyBalance, sellBalance] = await Promise.all([
      okdFinance.getBalance(opportunity.buyExchange),
      okdFinance.getBalance(opportunity.sellExchange)
    ]);

    const maxBuySize = buyBalance.USDT / opportunity.buyPrice;
    const maxSellSize = sellBalance[this.symbol.replace('USDT', '')];

    return Math.min(maxBuySize, maxSellSize, this.maxOrderSize);
  }
}
```

### Trend Following Strategy

```javascript
class TrendFollowingStrategy {
  constructor(config) {
    this.symbol = config.symbol;
    this.exchange = config.exchange;
    this.timeframe = config.timeframe || '1h';
    this.maPeriod = config.maPeriod || 20;
    this.rsiPeriod = config.rsiPeriod || 14;
    this.position = null;
  }

  async start() {
    // Subscribe to candle updates
    const ws = okdFinance.createWebSocket(this.exchange);
    ws.subscribe('candles', [this.symbol], this.timeframe);

    ws.on('candles', async (candle) => {
      await this.analyzeAndTrade(candle);
    });
  }

  async analyzeAndTrade(newCandle) {
    try {
      // Get historical data
      const candles = await okdFinance.getCandles(
        this.exchange, 
        this.symbol, 
        this.timeframe, 
        { limit: 100 }
      );

      // Calculate indicators
      const ma = this.calculateMA(candles, this.maPeriod);
      const rsi = await okdFinance.getRSI(this.exchange, this.symbol, this.timeframe, this.rsiPeriod);
      const currentPrice = newCandle[4]; // Close price

      // Generate signals
      const signal = this.generateSignal(currentPrice, ma, rsi);

      // Execute trades based on signals
      await this.executeSignal(signal, currentPrice);
    } catch (error) {
      console.error('Analysis error:', error);
    }
  }

  generateSignal(price, ma, rsi) {
    if (price > ma && rsi < 70 && !this.position) {
      return 'BUY';
    } else if (price < ma && rsi > 30 && this.position) {
      return 'SELL';
    }
    return 'HOLD';
  }

  async executeSignal(signal, price) {
    if (signal === 'BUY') {
      await this.openPosition('buy', price);
    } else if (signal === 'SELL') {
      await this.closePosition(price);
    }
  }

  async openPosition(side, price) {
    try {
      const balance = await okdFinance.getBalance(this.exchange);
      const amount = (balance.USDT * 0.9) / price; // Use 90% of balance

      const order = await okdFinance.createOrder(this.exchange, {
        symbol: this.symbol,
        type: 'market',
        side,
        amount
      });

      this.position = {
        side,
        amount,
        entryPrice: price,
        orderId: order.id
      };

      console.log(`Position opened: ${side} ${amount} at ${price}`);
    } catch (error) {
      console.error('Failed to open position:', error);
    }
  }

  async closePosition(price) {
    if (!this.position) return;

    try {
      const order = await okdFinance.createOrder(this.exchange, {
        symbol: this.symbol,
        type: 'market',
        side: this.position.side === 'buy' ? 'sell' : 'buy',
        amount: this.position.amount
      });

      const profit = (price - this.position.entryPrice) * this.position.amount;
      console.log(`Position closed: Profit ${profit.toFixed(2)} USDT`);

      this.position = null;
    } catch (error) {
      console.error('Failed to close position:', error);
    }
  }

  calculateMA(candles, period) {
    const closes = candles.slice(-period).map(c => c[4]);
    return closes.reduce((sum, close) => sum + close, 0) / period;
  }
}
```

## Risk Management Integration

### Stop Loss and Take Profit

```javascript
class RiskManagedTrading {
  async createOrderWithRiskManagement(orderParams, riskParams) {
    const order = await okdFinance.createOrder(orderParams.exchange, orderParams);

    // Set stop loss
    if (riskParams.stopLoss) {
      await this.setStopLoss(order, riskParams.stopLoss);
    }

    // Set take profit
    if (riskParams.takeProfit) {
      await this.setTakeProfit(order, riskParams.takeProfit);
    }

    return order;
  }

  async setStopLoss(order, stopLossPercent) {
    const stopPrice = order.side === 'buy' 
      ? order.price * (1 - stopLossPercent / 100)
      : order.price * (1 + stopLossPercent / 100);

    return await okdFinance.createOrder(order.exchange, {
      symbol: order.symbol,
      type: 'stop',
      side: order.side === 'buy' ? 'sell' : 'buy',
      amount: order.amount,
      stopPrice
    });
  }

  async setTakeProfit(order, takeProfitPercent) {
    const targetPrice = order.side === 'buy'
      ? order.price * (1 + takeProfitPercent / 100)
      : order.price * (1 - takeProfitPercent / 100);

    return await okdFinance.createOrder(order.exchange, {
      symbol: order.symbol,
      type: 'limit',
      side: order.side === 'buy' ? 'sell' : 'buy',
      amount: order.amount,
      price: targetPrice
    });
  }
}
```

## Performance Monitoring

### Trading Analytics

```javascript
class TradingAnalytics {
  constructor() {
    this.trades = [];
    this.metrics = {};
  }

  recordTrade(trade) {
    this.trades.push({
      ...trade,
      timestamp: Date.now()
    });
    this.updateMetrics();
  }

  updateMetrics() {
    const profits = this.trades.map(t => t.profit || 0);
    const winningTrades = profits.filter(p => p > 0);
    
    this.metrics = {
      totalTrades: this.trades.length,
      winRate: winningTrades.length / this.trades.length,
      totalProfit: profits.reduce((sum, p) => sum + p, 0),
      averageProfit: profits.reduce((sum, p) => sum + p, 0) / profits.length,
      maxDrawdown: this.calculateMaxDrawdown(),
      sharpeRatio: this.calculateSharpeRatio()
    };
  }

  calculateMaxDrawdown() {
    let peak = 0;
    let maxDrawdown = 0;
    let runningTotal = 0;

    for (const trade of this.trades) {
      runningTotal += trade.profit || 0;
      if (runningTotal > peak) {
        peak = runningTotal;
      }
      const drawdown = (peak - runningTotal) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    return maxDrawdown;
  }

  calculateSharpeRatio() {
    const profits = this.trades.map(t => t.profit || 0);
    const avgReturn = profits.reduce((sum, p) => sum + p, 0) / profits.length;
    const variance = profits.reduce((sum, p) => sum + Math.pow(p - avgReturn, 2), 0) / profits.length;
    const stdDev = Math.sqrt(variance);
    
    return stdDev === 0 ? 0 : avgReturn / stdDev;
  }

  generateReport() {
    return {
      summary: this.metrics,
      recentTrades: this.trades.slice(-10),
      recommendations: this.generateRecommendations()
    };
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.metrics.winRate < 0.4) {
      recommendations.push('Consider reviewing your entry criteria - win rate is below 40%');
    }
    
    if (this.metrics.maxDrawdown > 0.2) {
      recommendations.push('High drawdown detected - consider implementing stricter risk management');
    }
    
    if (this.metrics.sharpeRatio < 1) {
      recommendations.push('Low risk-adjusted returns - consider optimizing your strategy');
    }
    
    return recommendations;
  }
}
```
