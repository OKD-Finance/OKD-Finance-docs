# Bybit Market Data Integration

This guide covers how to integrate and synchronize market data from Bybit exchange through OKD Finance platform.

## Overview

OKD Finance provides seamless integration with Bybit's market data streams, offering real-time price feeds, order book updates, and trading statistics. Our platform normalizes Bybit's data format to provide consistent API responses across all supported exchanges.

## Supported Data Types

### Real-time Price Feeds
- **Spot Markets**: All major cryptocurrency pairs
- **Derivatives**: Perpetual contracts and futures
- **Options**: Coming soon
- **Inverse Contracts**: BTC and ETH inverse perpetuals

### Market Data Streams
- Ticker updates (24h statistics)
- Order book snapshots and deltas
- Recent trades
- Kline/Candlestick data
- Liquidation data
- Open interest updates

## WebSocket Connections

### Establishing Connection

```javascript
const ws = new WebSocket('wss://api.okd.finance/v1/ws/bybit');

ws.onopen = function() {
    // Subscribe to Bybit market data
    ws.send(JSON.stringify({
        method: 'subscribe',
        params: {
            exchange: 'bybit',
            channels: ['ticker.BNBETH', 'orderbook.ETHUSDT']
        }
    }));
};
```

### Subscription Channels

#### Ticker Data
```javascript
// Subscribe to ticker updates
{
    "method": "subscribe",
    "params": {
        "exchange": "bybit",
        "channels": ["ticker.BNBETH"]
    }
}
```

#### Order Book
```javascript
// Subscribe to order book updates
{
    "method": "subscribe",
    "params": {
        "exchange": "bybit",
        "channels": ["orderbook.BNBETH"]
    }
}
```

#### Trade Stream
```javascript
// Subscribe to recent trades
{
    "method": "subscribe",
    "params": {
        "exchange": "bybit",
        "channels": ["trades.BNBETH"]
    }
}
```

## REST API Endpoints

### Get Market Summary
```http
GET /api/v1/bybit/market/summary?symbol=BNBETH
```

**Response:**
```json
{
    "success": true,
    "data": {
        "symbol": "BNBETH",
        "lastPrice": "43250.50",
        "priceChange": "1250.30",
        "priceChangePercent": "2.98",
        "volume": "15420.35",
        "quoteVolume": "665847230.45",
        "openPrice": "42000.20",
        "highPrice": "43500.00",
        "lowPrice": "41800.15",
        "timestamp": 1703123456789
    }
}
```

### Get Order Book
```http
GET /api/v1/bybit/market/orderbook?symbol=BNBETH&limit=100
```

**Response:**
```json
{
    "success": true,
    "data": {
        "symbol": "BNBETH",
        "bids": [
            ["43250.50", "0.5420"],
            ["43250.00", "1.2340"]
        ],
        "asks": [
            ["43251.00", "0.8750"],
            ["43251.50", "2.1560"]
        ],
        "timestamp": 1703123456789
    }
}
```

### Get Recent Trades
```http
GET /api/v1/bybit/market/trades?symbol=BNBETH&limit=50
```

## Data Normalization

OKD Finance normalizes Bybit's market data to provide consistent format:

### Price Precision
- All prices are returned as strings to maintain precision
- Decimal places match exchange specifications
- Scientific notation is avoided

### Timestamp Format
- All timestamps are in milliseconds (Unix timestamp)
- UTC timezone is used consistently
- ISO 8601 format available on request

### Symbol Naming
- Unified symbol format: `BASEQUOTE` (e.g., `BNBETH`)
- Exchange-specific symbols mapped automatically
- Support for both spot and derivative symbols

## Rate Limits

### WebSocket Limits
- Maximum 10 connections per API key
- Up to 100 subscriptions per connection
- Heartbeat required every 30 seconds

### REST API Limits
- 1200 requests per minute per IP
- 6000 requests per minute per API key
- Burst limit: 20 requests per second

## Error Handling

### Common Error Codes
- `1001`: Invalid symbol
- `1002`: Rate limit exceeded
- `1003`: Subscription limit reached
- `1004`: Invalid channel format
- `1005`: Exchange connection error

### Retry Strategy
```javascript
function connectWithRetry() {
    const ws = new WebSocket('wss://api.okd.finance/v1/ws/bybit');
    
    ws.onclose = function(event) {
        if (event.code !== 1000) {
            // Exponential backoff retry
            setTimeout(() => {
                connectWithRetry();
            }, Math.min(1000 * Math.pow(2, retryCount), 30000));
        }
    };
}
```

## Performance Optimization

### Connection Pooling
- Reuse WebSocket connections when possible
- Implement connection health checks
- Handle reconnection gracefully

### Data Caching
- Cache frequently requested data
- Implement TTL for cached responses
- Use Redis for distributed caching

### Compression
- Enable gzip compression for REST API
- Use binary frames for WebSocket when available

## Monitoring and Alerts

### Health Checks
```http
GET /api/v1/bybit/health
```

### Latency Monitoring
- Track API response times
- Monitor WebSocket message delays
- Set up alerts for degraded performance

### Data Quality Checks
- Validate price movements
- Check for missing data points
- Monitor order book integrity

## Best Practices

1. **Connection Management**
   - Implement proper connection lifecycle
   - Handle network interruptions gracefully
   - Use connection pooling for high-frequency requests

2. **Data Processing**
   - Process market data asynchronously
   - Implement proper error handling
   - Use appropriate data structures for performance

3. **Security**
   - Validate all incoming data
   - Implement rate limiting on client side
   - Use secure WebSocket connections (WSS)

4. **Scalability**
   - Design for horizontal scaling
   - Implement proper load balancing
   - Use message queues for high-volume data

## Code Examples

### Complete Market Data Client
```javascript
class BybitMarketDataClient {
    constructor(apiKey, apiSecret) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.ws = null;
        this.subscriptions = new Set();
    }
    
    connect() {
        this.ws = new WebSocket('wss://api.okd.finance/v1/ws/bybit');
        
        this.ws.onopen = () => {
            console.log('Connected to Bybit market data');
            this.authenticate();
        };
        
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
        };
        
        this.ws.onclose = () => {
            console.log('Connection closed, reconnecting...');
            setTimeout(() => this.connect(), 5000);
        };
    }
    
    subscribe(channels) {
        channels.forEach(channel => {
            if (!this.subscriptions.has(channel)) {
                this.ws.send(JSON.stringify({
                    method: 'subscribe',
                    params: {
                        exchange: 'bybit',
                        channels: [channel]
                    }
                }));
                this.subscriptions.add(channel);
            }
        });
    }
    
    handleMessage(data) {
        switch(data.type) {
            case 'ticker':
                this.onTicker(data);
                break;
            case 'orderbook':
                this.onOrderBook(data);
                break;
            case 'trade':
                this.onTrade(data);
                break;
        }
    }
    
    onTicker(data) {
        console.log('Ticker update:', data);
    }
    
    onOrderBook(data) {
        console.log('Order book update:', data);
    }
    
    onTrade(data) {
        console.log('Trade update:', data);
    }
}

// Usage
const client = new BybitMarketDataClient('your-api-key', 'your-api-secret');
client.connect();
client.subscribe(['ticker.BNBETH', 'orderbook.ETHUSDT', 'trades.ADAUSDT']);
```

## Troubleshooting

### Common Issues

1. **Connection Drops**
   - Check network stability
   - Verify API key permissions
   - Implement proper reconnection logic

2. **Missing Data**
   - Verify subscription parameters
   - Check rate limits
   - Monitor exchange status

3. **High Latency**
   - Use closest server region
   - Optimize network configuration
   - Consider dedicated connections

### Support

For technical support and questions:
- Documentation: [https://docs.okd.finance](https://docs.okd.finance)
- Support: support@okd.finance
- GitHub: [https://github.com/OKD-Finance/Backend](https://github.com/OKD-Finance/Backend)
