# 基础使用示例

本指南提供了使用 OKD Finance API 的基础示例，帮助您快速开始加密货币交易。

## 概述

OKD Finance 提供统一的 API 接口，支持多个交易所的交易功能。本文档包含最常用的 API 调用示例和最佳实践。

## 环境设置

### 安装依赖

```bash
npm install okd-finance-sdk
# 或者
yarn add okd-finance-sdk
```

### 初始化客户端

```javascript
const { OKDClient } = require('okd-finance-sdk');

const client = new OKDClient({
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
    sandbox: true // 测试环境
});
```

## 基础 API 调用

### 获取账户信息

```javascript
async function getAccountInfo() {
    try {
        const account = await client.account.getInfo();
        console.log('账户信息:', account);
        return account;
    } catch (error) {
        console.error('获取账户信息失败:', error);
    }
}

// 调用示例
getAccountInfo();
```

**响应示例:**
```json
{
    "success": true,
    "data": {
        "userId": "12345",
        "email": "user@example.com",
        "balances": [
            {
                "asset": "USDT",
                "free": "1000.00",
                "locked": "50.00"
            },
            {
                "asset": "BTC",
                "free": "0.05",
                "locked": "0.00"
            }
        ],
        "permissions": ["spot", "futures"],
        "timestamp": 1703123456789
    }
}
```

### 获取市场数据

```javascript
async function getMarketData(symbol) {
    try {
        // 获取价格信息
        const ticker = await client.market.getTicker(symbol);
        console.log(`${symbol} 价格:`, ticker.price);
        
        // 获取订单簿
        const orderbook = await client.market.getOrderBook(symbol, 10);
        console.log('订单簿:', orderbook);
        
        // 获取最近交易
        const trades = await client.market.getRecentTrades(symbol, 5);
        console.log('最近交易:', trades);
        
        return { ticker, orderbook, trades };
    } catch (error) {
        console.error('获取市场数据失败:', error);
    }
}

// 调用示例
getMarketData('BTCUSDT');
```

### 下单交易

```javascript
async function placeOrder(orderData) {
    try {
        // 验证订单参数
        const validation = await client.trading.validateOrder(orderData);
        if (!validation.valid) {
            console.error('订单验证失败:', validation.errors);
            return;
        }
        
        // 下单
        const order = await client.trading.placeOrder(orderData);
        console.log('订单已提交:', order);
        
        // 监控订单状态
        const status = await client.trading.getOrderStatus(order.orderId);
        console.log('订单状态:', status);
        
        return order;
    } catch (error) {
        console.error('下单失败:', error);
    }
}

// 市价买单示例
const marketBuyOrder = {
    symbol: 'BTCUSDT',
    side: 'buy',
    type: 'market',
    quantity: '0.001',
    exchange: 'bybit'
};

// 限价卖单示例
const limitSellOrder = {
    symbol: 'BTCUSDT',
    side: 'sell',
    type: 'limit',
    quantity: '0.001',
    price: '45000.00',
    exchange: 'bybit',
    timeInForce: 'GTC'
};

// 调用示例
placeOrder(marketBuyOrder);
```

## WebSocket 实时数据

### 连接 WebSocket

```javascript
class MarketDataStream {
    constructor(apiKey, apiSecret) {
        this.client = new OKDClient({ apiKey, apiSecret });
        this.ws = null;
        this.subscriptions = new Set();
    }
    
    connect() {
        this.ws = new WebSocket('wss://api.okd.finance/v1/ws');
        
        this.ws.onopen = () => {
            console.log('WebSocket 连接已建立');
            this.authenticate();
        };
        
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
        };
        
        this.ws.onclose = () => {
            console.log('WebSocket 连接已关闭，正在重连...');
            setTimeout(() => this.connect(), 5000);
        };
        
        this.ws.onerror = (error) => {
            console.error('WebSocket 错误:', error);
        };
    }
    
    authenticate() {
        const authMessage = {
            method: 'auth',
            params: {
                apiKey: this.client.apiKey,
                timestamp: Date.now(),
                signature: this.client.generateSignature()
            }
        };
        this.ws.send(JSON.stringify(authMessage));
    }
    
    subscribe(channels) {
        channels.forEach(channel => {
            if (!this.subscriptions.has(channel)) {
                const message = {
                    method: 'subscribe',
                    params: { channels: [channel] }
                };
                this.ws.send(JSON.stringify(message));
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
            case 'order_update':
                this.onOrderUpdate(data);
                break;
        }
    }
    
    onTicker(data) {
        console.log('价格更新:', data);
    }
    
    onOrderBook(data) {
        console.log('订单簿更新:', data);
    }
    
    onTrade(data) {
        console.log('交易更新:', data);
    }
    
    onOrderUpdate(data) {
        console.log('订单状态更新:', data);
    }
}

// 使用示例
const stream = new MarketDataStream('your-api-key', 'your-api-secret');
stream.connect();
stream.subscribe(['ticker.BTCUSDT', 'orderbook.ETHUSDT', 'orders']);
```

## 错误处理

### 统一错误处理

```javascript
class APIErrorHandler {
    static handle(error) {
        if (error.response) {
            // API 错误响应
            const { status, data } = error.response;
            console.error(`API 错误 ${status}:`, data.message);
            
            switch(status) {
                case 401:
                    console.error('认证失败，请检查 API 密钥');
                    break;
                case 403:
                    console.error('权限不足');
                    break;
                case 429:
                    console.error('请求频率过高，请稍后重试');
                    break;
                case 500:
                    console.error('服务器内部错误');
                    break;
                default:
                    console.error('未知错误');
            }
        } else if (error.request) {
            // 网络错误
            console.error('网络连接错误:', error.message);
        } else {
            // 其他错误
            console.error('错误:', error.message);
        }
    }
}

// 在 API 调用中使用
async function safeApiCall(apiFunction) {
    try {
        return await apiFunction();
    } catch (error) {
        APIErrorHandler.handle(error);
        throw error;
    }
}
```

### 重试机制

```javascript
async function withRetry(fn, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            
            console.log(`重试 ${i + 1}/${maxRetries}...`);
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
    }
}

// 使用示例
const result = await withRetry(() => client.market.getTicker('BTCUSDT'));
```

## 完整交易示例

### 简单交易机器人

```javascript
class SimpleTradingBot {
    constructor(apiKey, apiSecret) {
        this.client = new OKDClient({ apiKey, apiSecret });
        this.isRunning = false;
        this.positions = new Map();
    }
    
    async start() {
        this.isRunning = true;
        console.log('交易机器人已启动');
        
        while (this.isRunning) {
            try {
                await this.checkMarket();
                await this.sleep(5000); // 5秒检查一次
            } catch (error) {
                console.error('机器人运行错误:', error);
                await this.sleep(10000); // 错误后等待10秒
            }
        }
    }
    
    async checkMarket() {
        const symbols = ['BTCUSDT', 'ETHUSDT'];
        
        for (const symbol of symbols) {
            const ticker = await this.client.market.getTicker(symbol);
            const price = parseFloat(ticker.price);
            
            // 简单的移动平均策略
            const signal = await this.getSignal(symbol, price);
            
            if (signal === 'buy' && !this.positions.has(symbol)) {
                await this.buy(symbol, price);
            } else if (signal === 'sell' && this.positions.has(symbol)) {
                await this.sell(symbol, price);
            }
        }
    }
    
    async getSignal(symbol, currentPrice) {
        // 这里实现您的交易策略
        // 示例：简单的价格阈值策略
        const threshold = 0.02; // 2%
        
        if (Math.random() > 0.8) { // 模拟买入信号
            return 'buy';
        } else if (Math.random() < 0.2) { // 模拟卖出信号
            return 'sell';
        }
        
        return 'hold';
    }
    
    async buy(symbol, price) {
        try {
            const order = await this.client.trading.placeOrder({
                symbol,
                side: 'buy',
                type: 'market',
                quantity: '0.001',
                exchange: 'bybit'
            });
            
            this.positions.set(symbol, {
                orderId: order.orderId,
                price,
                quantity: 0.001,
                timestamp: Date.now()
            });
            
            console.log(`买入 ${symbol} 价格: ${price}`);
        } catch (error) {
            console.error(`买入 ${symbol} 失败:`, error);
        }
    }
    
    async sell(symbol, price) {
        try {
            const position = this.positions.get(symbol);
            
            const order = await this.client.trading.placeOrder({
                symbol,
                side: 'sell',
                type: 'market',
                quantity: position.quantity.toString(),
                exchange: 'bybit'
            });
            
            const profit = (price - position.price) * position.quantity;
            console.log(`卖出 ${symbol} 价格: ${price}, 盈亏: ${profit.toFixed(4)} USDT`);
            
            this.positions.delete(symbol);
        } catch (error) {
            console.error(`卖出 ${symbol} 失败:`, error);
        }
    }
    
    stop() {
        this.isRunning = false;
        console.log('交易机器人已停止');
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 使用示例
const bot = new SimpleTradingBot('your-api-key', 'your-api-secret');
bot.start();

// 停止机器人
// setTimeout(() => bot.stop(), 60000); // 1分钟后停止
```

## 最佳实践

### 1. API 密钥安全
```javascript
// 使用环境变量存储敏感信息
const client = new OKDClient({
    apiKey: process.env.OKD_API_KEY,
    apiSecret: process.env.OKD_API_SECRET,
    sandbox: process.env.NODE_ENV !== 'production'
});
```

### 2. 请求频率控制
```javascript
class RateLimiter {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }
    
    async waitIfNeeded() {
        const now = Date.now();
        this.requests = this.requests.filter(time => now - time < this.timeWindow);
        
        if (this.requests.length >= this.maxRequests) {
            const oldestRequest = Math.min(...this.requests);
            const waitTime = this.timeWindow - (now - oldestRequest);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        
        this.requests.push(now);
    }
}

const rateLimiter = new RateLimiter(100, 60000); // 每分钟100次请求

// 在 API 调用前使用
await rateLimiter.waitIfNeeded();
const result = await client.market.getTicker('BTCUSDT');
```

### 3. 数据验证
```javascript
function validateOrderData(order) {
    const required = ['symbol', 'side', 'type', 'quantity'];
    const missing = required.filter(field => !order[field]);
    
    if (missing.length > 0) {
        throw new Error(`缺少必需字段: ${missing.join(', ')}`);
    }
    
    if (!['buy', 'sell'].includes(order.side)) {
        throw new Error('无效的订单方向');
    }
    
    if (parseFloat(order.quantity) <= 0) {
        throw new Error('订单数量必须大于0');
    }
    
    return true;
}
```

### 4. 日志记录
```javascript
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'trading.log' }),
        new winston.transports.Console()
    ]
});

// 在交易操作中使用
logger.info('下单', { symbol: 'BTCUSDT', side: 'buy', quantity: '0.001' });
```

## 常见问题

### Q: 如何处理网络连接问题？
A: 实现重试机制和连接池，使用指数退避策略。

### Q: 如何优化 API 调用性能？
A: 使用批量操作、缓存频繁访问的数据、合理使用 WebSocket。

### Q: 如何确保交易安全？
A: 使用止损单、设置仓位限制、定期检查账户状态。

## 技术支持

如需技术支持和咨询：
- 文档：[https://docs.okd.finance](https://docs.okd.finance)
- 支持：support@okd.finance
- GitHub：[https://github.com/OKD-Finance/Backend](https://github.com/OKD-Finance/Backend)
