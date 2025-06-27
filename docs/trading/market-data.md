# Market Data

## Overview

OKD Finance provides comprehensive market data access across multiple exchanges with real-time updates, historical data, and advanced analytics capabilities. This unified API simplifies data consumption and enables sophisticated trading strategies.

## Real-time Data Streams

### Ticker Data

```javascript
// Get single ticker
const ticker = await okdFinance.getTicker('binance', 'BNBETH');
console.log(ticker);
// {
//   symbol: 'BNBETH',
//   last: 45000,
//   bid: 44995,
//   ask: 45005,
//   volume: 1234.56,
//   change: 1250,
//   changePercent: 2.85,
//   high: 45500,
//   low: 43800,
//   timestamp: 1640995200000
// }

// Get all tickers for an exchange
const allTickers = await okdFinance.getAllTickers('bybit');

// Get multiple specific tickers
const tickers = await okdFinance.getTickers('okx', ['BNBETH', 'ETHUSDT', 'ADAUSDT']);
```

### Order Book Data

```javascript
// Get order book with default depth
const orderbook = await okdFinance.getOrderBook('binance', 'BNBETH');
console.log(orderbook);
// {
//   symbol: 'BNBETH',
//   bids: [[44995, 0.5], [44990, 1.2], [44985, 0.8]],
//   asks: [[45005, 0.8], [45010, 0.9], [45015, 1.1]],
//   timestamp: 1640995200000
// }

// Get order book with specific depth
const deepOrderbook = await okdFinance.getOrderBook('bybit', 'ETHUSDT', 50);

// Get aggregated order book across exchanges
const aggregatedBook = await okdFinance.getAggregatedOrderBook(['binance', 'bybit', 'okx'], 'BNBETH');
```

### Trade Data

```javascript
// Get recent trades
const trades = await okdFinance.getTrades('binance', 'BNBETH', 100);
console.log(trades[0]);
// {
//   id: '12345',
//   timestamp: 1640995200000,
//   price: 45000,
//   amount: 0.1,
//   side: 'buy',
//   exchange: 'binance'
// }

// Get trades within time range
const historicalTrades = await okdFinance.getTrades('bybit', 'ETHUSDT', {
  from: Date.now() - 3600000, // 1 hour ago
  to: Date.now(),
  limit: 500
});
```

## Historical Data

### Candlestick Data

```javascript
// Get OHLCV candles
const candles = await okdFinance.getCandles('binance', 'BNBETH', '1h', {
  limit: 100,
  since: Date.now() - 24 * 60 * 60 * 1000 // Last 24 hours
});

console.log(candles[0]);
// [timestamp, open, high, low, close, volume]
// [1640995200000, 44500, 45200, 44300, 45000, 123.45]

// Supported timeframes
const timeframes = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '12h', '1d', '3d', '1w', '1M'];

// Get candles from multiple exchanges
const multiExchangeCandles = await okdFinance.getMultiExchangeCandles(
  ['binance', 'bybit', 'okx'], 
  'BNBETH', 
  '1h', 
  { limit: 50 }
);
```

### Volume Analysis

```javascript
// Get volume profile
const volumeProfile = await okdFinance.getVolumeProfile('binance', 'BNBETH', '1h', 24);
console.log(volumeProfile);
// {
//   priceRanges: [
//     { price: 45000, volume: 123.45, percentage: 15.2 },
//     { price: 44900, volume: 98.76, percentage: 12.1 }
//   ],
//   totalVolume: 1234.56,
//   avgPrice: 44950
// }

// Get volume-weighted average price
const vwap = await okdFinance.getVWAP('bybit', 'ETHUSDT', '1h', 24);
console.log(`24h VWAP: $${vwap}`);
```

## WebSocket Streams

### Setting up WebSocket Connections

```javascript
// Create WebSocket connection
const ws = okdFinance.createWebSocket('binance');

// Subscribe to multiple data types
ws.subscribe('ticker', ['BNBETH', 'ETHUSDT']);
ws.subscribe('orderbook', ['BNBETH'], { levels: 20 });
ws.subscribe('trades', ['BNBETH', 'ETHUSDT']);
ws.subscribe('candles', ['BNBETH'], '1m');

// Handle incoming data
ws.on('ticker', (data) => {
  console.log('Ticker update:', data);
  updatePriceDisplay(data);
});

ws.on('orderbook', (data) => {
  console.log('Order book update:', data);
  updateOrderBookDisplay(data);
});

ws.on('trades', (data) => {
  console.log('New trade:', data);
  updateTradeHistory(data);
});

ws.on('candles', (data) => {
  console.log('New candle:', data);
  updateChart(data);
});
```

### Multi-Exchange WebSocket

```javascript
class MultiExchangeDataFeed {
  constructor(exchanges) {
    this.exchanges = exchanges;
    this.connections = new Map();
    this.subscribers = new Map();
  }

  async initialize() {
    for (const exchange of this.exchanges) {
      const ws = okdFinance.createWebSocket(exchange);
      this.connections.set(exchange, ws);
      
      ws.on('ticker', (data) => this.handleTicker(exchange, data));
      ws.on('orderbook', (data) => this.handleOrderBook(exchange, data));
      ws.on('trades', (data) => this.handleTrades(exchange, data));
    }
  }

  subscribe(dataType, symbols, callback) {
    const key = `${dataType}:${symbols.join(',')}`;
    this.subscribers.set(key, callback);

    // Subscribe on all exchanges
    this.connections.forEach((ws, exchange) => {
      ws.subscribe(dataType, symbols);
    });
  }

  handleTicker(exchange, data) {
    const key = `ticker:${data.symbol}`;
    const callback = this.subscribers.get(key);
    if (callback) {
      callback({ ...data, exchange });
    }
  }

  // Aggregate order books from multiple exchanges
  handleOrderBook(exchange, data) {
    if (!this.orderBooks) this.orderBooks = new Map();
    
    this.orderBooks.set(exchange, data);
    
    // Merge order books
    const aggregated = this.mergeOrderBooks(Array.from(this.orderBooks.values()));
    
    const key = `orderbook:${data.symbol}`;
    const callback = this.subscribers.get(key);
    if (callback) {
      callback(aggregated);
    }
  }

  mergeOrderBooks(orderBooks) {
    const allBids = [];
    const allAsks = [];

    orderBooks.forEach(book => {
      allBids.push(...book.bids.map(([price, size]) => [parseFloat(price), parseFloat(size)]));
      allAsks.push(...book.asks.map(([price, size]) => [parseFloat(price), parseFloat(size)]));
    });

    // Sort and aggregate
    const aggregatedBids = this.aggregatePriceLevels(allBids, 'desc');
    const aggregatedAsks = this.aggregatePriceLevels(allAsks, 'asc');

    return {
      bids: aggregatedBids.slice(0, 20),
      asks: aggregatedAsks.slice(0, 20),
      timestamp: Date.now()
    };
  }

  aggregatePriceLevels(levels, sortOrder) {
    const priceMap = new Map();
    
    levels.forEach(([price, size]) => {
      const key = price.toFixed(2); // Group by price with 2 decimal precision
      priceMap.set(key, (priceMap.get(key) || 0) + size);
    });

    const aggregated = Array.from(priceMap.entries())
      .map(([price, size]) => [parseFloat(price), size])
      .sort((a, b) => sortOrder === 'desc' ? b[0] - a[0] : a[0] - b[0]);

    return aggregated;
  }
}
```

## Technical Indicators

### Built-in Indicators

```javascript
// Moving Averages
const sma20 = await okdFinance.getSMA('binance', 'BNBETH', '1h', 20);
const ema20 = await okdFinance.getEMA('binance', 'BNBETH', '1h', 20);
const wma20 = await okdFinance.getWMA('binance', 'BNBETH', '1h', 20);

// Momentum Indicators
const rsi = await okdFinance.getRSI('bybit', 'ETHUSDT', '1h', 14);
const macd = await okdFinance.getMACD('okx', 'BNBETH', '1h');
const stoch = await okdFinance.getStochastic('binance', 'ADAUSDT', '1h', 14, 3);

// Volatility Indicators
const bb = await okdFinance.getBollingerBands('bybit', 'BNBETH', '1h', 20, 2);
const atr = await okdFinance.getATR('binance', 'ETHUSDT', '1h', 14);

// Volume Indicators
const obv = await okdFinance.getOBV('okx', 'BNBETH', '1h');
const volumeSMA = await okdFinance.getVolumeSMA('binance', 'ETHUSDT', '1h', 20);

console.log('RSI:', rsi);
console.log('MACD:', macd);
console.log('Bollinger Bands:', bb);
```

### Custom Indicators

```javascript
class CustomIndicators {
  // Custom momentum indicator
  static async getMomentumOscillator(exchange, symbol, timeframe, period) {
    const candles = await okdFinance.getCandles(exchange, symbol, timeframe, { limit: period + 1 });
    
    const momentum = [];
    for (let i = period; i < candles.length; i++) {
      const current = candles[i][4]; // Close price
      const previous = candles[i - period][4];
      momentum.push((current - previous) / previous * 100);
    }
    
    return momentum[momentum.length - 1]; // Return latest value
  }

  // Price Rate of Change
  static async getPriceROC(exchange, symbol, timeframe, period) {
    const candles = await okdFinance.getCandles(exchange, symbol, timeframe, { limit: period + 1 });
    
    if (candles.length < period + 1) return null;
    
    const current = candles[candles.length - 1][4];
    const previous = candles[candles.length - 1 - period][4];
    
    return ((current - previous) / previous) * 100;
  }

  // Volume-Price Trend
  static async getVPT(exchange, symbol, timeframe, period) {
    const candles = await okdFinance.getCandles(exchange, symbol, timeframe, { limit: period });
    
    let vpt = 0;
    for (let i = 1; i < candles.length; i++) {
      const currentClose = candles[i][4];
      const previousClose = candles[i - 1][4];
      const volume = candles[i][5];
      
      vpt += volume * ((currentClose - previousClose) / previousClose);
    }
    
    return vpt;
  }
}
```

## Market Analysis

### Correlation Analysis

```javascript
// Calculate correlation between symbols
const correlation = await okdFinance.getCorrelation(
  'binance',
  ['BNBETH', 'ETHUSDT'],
  '1h',
  168 // 1 week of hourly data
);

console.log(`BTC/ETH correlation: ${correlation.toFixed(3)}`);

// Multi-asset correlation matrix
const symbols = ['BNBETH', 'ETHUSDT', 'ADAUSDT', 'DOTUSDT'];
const correlationMatrix = await okdFinance.getCorrelationMatrix('binance', symbols, '1h', 168);

console.log('Correlation Matrix:');
console.table(correlationMatrix);
```

### Volatility Analysis

```javascript
// Historical volatility
const volatility = await okdFinance.getHistoricalVolatility('binance', 'BNBETH', '1h', 24);
console.log(`24h volatility: ${(volatility * 100).toFixed(2)}%`);

// Realized vs Implied volatility comparison
const realizedVol = await okdFinance.getRealizedVolatility('bybit', 'BNBETH', 30);
const impliedVol = await okdFinance.getImpliedVolatility('bybit', 'BNBETH');

console.log(`Realized volatility: ${realizedVol.toFixed(2)}%`);
console.log(`Implied volatility: ${impliedVol.toFixed(2)}%`);
```

### Market Sentiment

```javascript
// Fear & Greed Index
const fearGreed = await okdFinance.getFearGreedIndex();
console.log(`Fear & Greed Index: ${fearGreed.value} (${fearGreed.classification})`);

// Social sentiment analysis
const sentiment = await okdFinance.getSocialSentiment('BNBETH');
console.log('Social sentiment:', sentiment);
// {
//   overall: 0.65, // 0-1 scale
//   sources: {
//     twitter: 0.7,
//     reddit: 0.6,
//     news: 0.65
//   },
//   volume: 1250 // Number of mentions
// }
```

## Data Quality and Monitoring

### Data Validation

```javascript
class DataQualityMonitor {
  constructor() {
    this.metrics = {
      latency: [],
      gaps: [],
      errors: []
    };
  }

  validateTicker(ticker) {
    const issues = [];
    
    if (!ticker.last || ticker.last <= 0) {
      issues.push('Invalid last price');
    }
    
    if (ticker.bid >= ticker.ask) {
      issues.push('Bid-ask spread invalid');
    }
    
    if (ticker.volume < 0) {
      issues.push('Negative volume');
    }
    
    const age = Date.now() - ticker.timestamp;
    if (age > 5000) { // 5 seconds
      issues.push('Stale data');
    }
    
    return issues;
  }

  validateOrderBook(orderbook) {
    const issues = [];
    
    if (!orderbook.bids.length || !orderbook.asks.length) {
      issues.push('Empty order book');
    }
    
    // Check bid/ask ordering
    for (let i = 1; i < orderbook.bids.length; i++) {
      if (orderbook.bids[i][0] >= orderbook.bids[i-1][0]) {
        issues.push('Bids not properly sorted');
        break;
      }
    }
    
    for (let i = 1; i < orderbook.asks.length; i++) {
      if (orderbook.asks[i][0] <= orderbook.asks[i-1][0]) {
        issues.push('Asks not properly sorted');
        break;
      }
    }
    
    // Check spread
    const spread = orderbook.asks[0][0] - orderbook.bids[0][0];
    const midPrice = (orderbook.asks[0][0] + orderbook.bids[0][0]) / 2;
    const spreadPercent = (spread / midPrice) * 100;
    
    if (spreadPercent > 1) { // 1% spread seems excessive
      issues.push(`Wide spread: ${spreadPercent.toFixed(3)}%`);
    }
    
    return issues;
  }

  monitorDataStream(exchange, symbol) {
    const ws = okdFinance.createWebSocket(exchange);
    ws.subscribe('ticker', [symbol]);
    ws.subscribe('orderbook', [symbol]);
    
    let lastTickerTime = Date.now();
    let lastOrderBookTime = Date.now();
    
    ws.on('ticker', (data) => {
      const now = Date.now();
      const latency = now - data.timestamp;
      
      this.metrics.latency.push(latency);
      
      const issues = this.validateTicker(data);
      if (issues.length > 0) {
        console.warn(`Ticker issues for ${symbol}:`, issues);
      }
      
      // Check for gaps
      const gap = now - lastTickerTime;
      if (gap > 10000) { // 10 seconds
        this.metrics.gaps.push({ type: 'ticker', gap, timestamp: now });
      }
      
      lastTickerTime = now;
    });
    
    ws.on('orderbook', (data) => {
      const issues = this.validateOrderBook(data);
      if (issues.length > 0) {
        console.warn(`Order book issues for ${symbol}:`, issues);
      }
    });
    
    ws.on('error', (error) => {
      this.metrics.errors.push({ timestamp: Date.now(), error });
      console.error(`WebSocket error for ${exchange}:`, error);
    });
  }

  getQualityReport() {
    const avgLatency = this.metrics.latency.reduce((a, b) => a + b, 0) / this.metrics.latency.length;
    
    return {
      averageLatency: avgLatency,
      totalGaps: this.metrics.gaps.length,
      totalErrors: this.metrics.errors.length,
      dataQualityScore: this.calculateQualityScore()
    };
  }

  calculateQualityScore() {
    let score = 100;
    
    // Penalize high latency
    const avgLatency = this.metrics.latency.reduce((a, b) => a + b, 0) / this.metrics.latency.length;
    if (avgLatency > 1000) score -= 20;
    else if (avgLatency > 500) score -= 10;
    
    // Penalize gaps
    score -= this.metrics.gaps.length * 5;
    
    // Penalize errors
    score -= this.metrics.errors.length * 10;
    
    return Math.max(0, score);
  }
}
```

## Performance Optimization

### Caching Strategies

```javascript
class MarketDataCache {
  constructor() {
    this.cache = new Map();
    this.ttl = new Map(); // Time to live
  }

  set(key, data, ttlMs = 1000) {
    this.cache.set(key, data);
    this.ttl.set(key, Date.now() + ttlMs);
  }

  get(key) {
    if (this.ttl.get(key) < Date.now()) {
      this.cache.delete(key);
      this.ttl.delete(key);
      return null;
    }
    
    return this.cache.get(key);
  }

  async getTicker(exchange, symbol) {
    const key = `ticker:${exchange}:${symbol}`;
    let ticker = this.get(key);
    
    if (!ticker) {
      ticker = await okdFinance.getTicker(exchange, symbol);
      this.set(key, ticker, 1000); // Cache for 1 second
    }
    
    return ticker;
  }

  async getOrderBook(exchange, symbol, depth = 20) {
    const key = `orderbook:${exchange}:${symbol}:${depth}`;
    let orderbook = this.get(key);
    
    if (!orderbook) {
      orderbook = await okdFinance.getOrderBook(exchange, symbol, depth);
      this.set(key, orderbook, 500); // Cache for 0.5 seconds
    }
    
    return orderbook;
  }
}
```

### Batch Data Requests

```javascript
class BatchDataFetcher {
  constructor() {
    this.requestQueue = [];
    this.batchSize = 10;
    this.batchTimeout = 100; // 100ms
  }

  async getTicker(exchange, symbol) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({
        type: 'ticker',
        exchange,
        symbol,
        resolve,
        reject
      });

      if (this.requestQueue.length >= this.batchSize) {
        this.processBatch();
      } else if (this.requestQueue.length === 1) {
        setTimeout(() => this.processBatch(), this.batchTimeout);
      }
    });
  }

  async processBatch() {
    if (this.requestQueue.length === 0) return;

    const batch = this.requestQueue.splice(0, this.batchSize);
    
    // Group by exchange and type
    const groups = batch.reduce((acc, req) => {
      const key = `${req.exchange}:${req.type}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(req);
      return acc;
    }, {});

    // Process each group
    for (const [key, requests] of Object.entries(groups)) {
      const [exchange, type] = key.split(':');
      
      try {
        if (type === 'ticker') {
          const symbols = requests.map(r => r.symbol);
          const tickers = await okdFinance.getTickers(exchange, symbols);
          
          requests.forEach((req, index) => {
            req.resolve(tickers[index]);
          });
        }
      } catch (error) {
        requests.forEach(req => req.reject(error));
      }
    }
  }
}
```
