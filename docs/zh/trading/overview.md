# 交易 API 概述

OKD Finance 交易 API 提供全面的加密货币交易功能，支持多个主流交易所的统一接口。

## 概述

我们的交易 API 设计用于满足从个人交易者到机构客户的各种需求。通过统一的接口，您可以访问多个交易所的流动性，同时享受高级交易功能和风险管理工具。

## 核心功能

### 多交易所支持
- **Bybit**: 现货、永续合约、期货、期权
- **Binance**: 现货、期货、期权（即将推出）
- **OKX**: 现货、永续合约（即将推出）
- **更多交易所**: 持续扩展中

### 交易类型
- **现货交易**: 即时买卖加密货币
- **保证金交易**: 使用杠杆进行交易
- **期货交易**: 合约到期交割
- **永续合约**: 无到期日的合约交易
- **期权交易**: 买卖期权合约

### 订单类型
- **市价单**: 以当前市场价格立即执行
- **限价单**: 以指定价格或更好价格执行
- **止损单**: 价格达到指定水平时触发
- **止损限价单**: 结合止损和限价功能
- **冰山订单**: 隐藏大额订单规模
- **时间加权平均价格 (TWAP)**: 分散执行大额订单

## 快速开始

### 1. 初始化客户端

```javascript
const { OKDClient } = require('okd-finance-sdk');

const client = new OKDClient({
    apiKey: process.env.OKD_API_KEY,
    apiSecret: process.env.OKD_API_SECRET,
    sandbox: false // 生产环境设置为 false
});
``` -->

### 2. 获取市场数据

```javascript
async function getMarketOverview() {
    try {
        // 获取所有交易对
        const symbols = await client.market.getSymbols();
        console.log('可用交易对:', symbols.length);
        
        // 获取24小时统计
        const stats = await client.market.get24hrStats();
        console.log('24小时统计:', stats);
        
        // 获取热门交易对价格
        const tickers = await client.market.getTickers(['BTCUSDT', 'ETHUSDT', 'ADAUSDT']);
        console.log('热门币种价格:', tickers);
        
        return { symbols, stats, tickers };
    } catch (error) {
        console.error('获取市场数据失败:', error);
    }
}
``` -->

### 3. 账户管理

```javascript
async function manageAccount() {
    try {
        // 获取账户信息
        const account = await client.account.getInfo();
        console.log('账户信息:', account);
        
        // 获取余额
        const balances = await client.account.getBalances();
        console.log('账户余额:', balances);
        
        // 获取交易历史
        const trades = await client.account.getTradeHistory({
            limit: 50,
            symbol: 'BTCUSDT'
        });
        console.log('交易历史:', trades);
        
        return { account, balances, trades };
    } catch (error) {
        console.error('账户管理失败:', error);
    }
}
``` -->

## 交易执行

### 基础交易操作

```javascript
class TradingManager {
    constructor(client) {
        this.client = client;
        this.activeOrders = new Map();
    }
    
    async placeMarketOrder(symbol, side, quantity, exchange = 'bybit') {
        const order = {
            symbol,
            side,
            type: 'market',
            quantity: quantity.toString(),
            exchange
        };
        
        try {
            const result = await this.client.trading.placeOrder(order);
            console.log(`${side.toUpperCase()} 市价单已提交:`, result.orderId);
            return result;
        } catch (error) {
            console.error('市价单失败:', error);
            throw error;
        }
    }
    
    async placeLimitOrder(symbol, side, quantity, price, exchange = 'bybit') {
        const order = {
            symbol,
            side,
            type: 'limit',
            quantity: quantity.toString(),
            price: price.toString(),
            exchange,
            timeInForce: 'GTC'
        };
        
        try {
            const result = await this.client.trading.placeOrder(order);
            this.activeOrders.set(result.orderId, result);
            console.log(`${side.toUpperCase()} 限价单已提交:`, result.orderId);
            return result;
        } catch (error) {
            console.error('限价单失败:', error);
            throw error;
        }
    }
    
    async placeStopLossOrder(symbol, side, quantity, stopPrice, exchange = 'bybit') {
        const order = {
            symbol,
            side,
            type: 'stop',
            quantity: quantity.toString(),
            stopPrice: stopPrice.toString(),
            exchange
        };
        
        try {
            const result = await this.client.trading.placeOrder(order);
            console.log(`${side.toUpperCase()} 止损单已提交:`, result.orderId);
            return result;
        } catch (error) {
            console.error('止损单失败:', error);
            throw error;
        }
    }
    
    async cancelOrder(orderId) {
        try {
            const result = await this.client.trading.cancelOrder(orderId);
            this.activeOrders.delete(orderId);
            console.log('订单已取消:', orderId);
            return result;
        } catch (error) {
            console.error('取消订单失败:', error);
            throw error;
        }
    }
    
    async cancelAllOrders(symbol) {
        try {
            const result = await this.client.trading.cancelAllOrders({ symbol });
            console.log(`${symbol} 所有订单已取消`);
            
            // 清理本地订单记录
            for (const [orderId, order] of this.activeOrders) {
                if (order.symbol === symbol) {
                    this.activeOrders.delete(orderId);
                }
            }
            
            return result;
        } catch (error) {
            console.error('取消所有订单失败:', error);
            throw error;
        }
    }
    
    async getOrderStatus(orderId) {
        try {
            const order = await this.client.trading.getOrder(orderId);
            
            // 更新本地订单状态
            if (this.activeOrders.has(orderId)) {
                this.activeOrders.set(orderId, order);
            }
            
            return order;
        } catch (error) {
            console.error('获取订单状态失败:', error);
            throw error;
        }
    }
    
    getActiveOrders() {
        return Array.from(this.activeOrders.values());
    }
}

// 使用示例
const trading = new TradingManager(client);

// 市价买入
await trading.placeMarketOrder('BTCUSDT', 'buy', '0.001');

// 限价卖出
await trading.placeLimitOrder('BTCUSDT', 'sell', '0.001', '45000.00');

// 设置止损
await trading.placeStopLossOrder('BTCUSDT', 'sell', '0.001', '42000.00');
``` -->

### 高级交易策略

```javascript
class AdvancedTradingStrategies {
    constructor(client) {
        this.client = client;
    }
    
    // DCA (定投) 策略
    async dollarCostAveraging(symbol, totalAmount, intervals, exchange = 'bybit') {
        const amountPerOrder = totalAmount / intervals;
        const results = [];
        
        for (let i = 0; i < intervals; i++) {
            try {
                const order = await this.client.trading.placeOrder({
                    symbol,
                    side: 'buy',
                    type: 'market',
                    quoteOrderQty: amountPerOrder.toString(),
                    exchange
                });
                
                results.push(order);
                console.log(`DCA 第 ${i + 1} 次买入完成:`, order.orderId);
                
                // 等待间隔时间（这里简化为1分钟）
                if (i < intervals - 1) {
                    await this.sleep(60000);
                }
            } catch (error) {
                console.error(`DCA 第 ${i + 1} 次买入失败:`, error);
            }
        }
        
        return results;
    }
    
    // 网格交易策略
    async gridTrading(symbol, basePrice, gridSize, gridCount, orderAmount, exchange = 'bybit') {
        const orders = [];
        
        // 创建买入网格
        for (let i = 1; i <= gridCount; i++) {
            const price = basePrice * (1 - (gridSize * i / 100));
            
            try {
                const buyOrder = await this.client.trading.placeOrder({
                    symbol,
                    side: 'buy',
                    type: 'limit',
                    quantity: orderAmount.toString(),
                    price: price.toFixed(2),
                    exchange
                });
                
                orders.push(buyOrder);
                console.log(`网格买单 ${i} 已下达，价格: ${price.toFixed(2)}`);
            } catch (error) {
                console.error(`网格买单 ${i} 失败:`, error);
            }
        }
        
        // 创建卖出网格
        for (let i = 1; i <= gridCount; i++) {
            const price = basePrice * (1 + (gridSize * i / 100));
            
            try {
                const sellOrder = await this.client.trading.placeOrder({
                    symbol,
                    side: 'sell',
                    type: 'limit',
                    quantity: orderAmount.toString(),
                    price: price.toFixed(2),
                    exchange
                });
                
                orders.push(sellOrder);
                console.log(`网格卖单 ${i} 已下达，价格: ${price.toFixed(2)}`);
            } catch (error) {
                console.error(`网格卖单 ${i} 失败:`, error);
            }
        }
        
        return orders;
    }
    
    // 套利策略
    async arbitrageTrading(symbol, exchange1, exchange2, minProfitPercent = 0.5) {
        try {
            // 获取两个交易所的价格
            const [ticker1, ticker2] = await Promise.all([
                this.client.market.getTicker(symbol, exchange1),
                this.client.market.getTicker(symbol, exchange2)
            ]);
            
            const price1 = parseFloat(ticker1.price);
            const price2 = parseFloat(ticker2.price);
            const priceDiff = Math.abs(price1 - price2);
            const profitPercent = (priceDiff / Math.min(price1, price2)) * 100;
            
            console.log(`${exchange1} 价格: ${price1}, ${exchange2} 价格: ${price2}`);
            console.log(`价差: ${priceDiff.toFixed(2)}, 利润率: ${profitPercent.toFixed(2)}%`);
            
            if (profitPercent >= minProfitPercent) {
                const buyExchange = price1 < price2 ? exchange1 : exchange2;
                const sellExchange = price1 < price2 ? exchange2 : exchange1;
                const quantity = '0.001'; // 套利数量
                
                console.log(`套利机会发现！在 ${buyExchange} 买入，在 ${sellExchange} 卖出`);
                
                // 同时下买单和卖单
                const [buyOrder, sellOrder] = await Promise.all([
                    this.client.trading.placeOrder({
                        symbol,
                        side: 'buy',
                        type: 'market',
                        quantity,
                        exchange: buyExchange
                    }),
                    this.client.trading.placeOrder({
                        symbol,
                        side: 'sell',
                        type: 'market',
                        quantity,
                        exchange: sellExchange
                    })
                ]);
                
                return { buyOrder, sellOrder, profitPercent };
            } else {
                console.log('暂无套利机会');
                return null;
            }
        } catch (error) {
            console.error('套利交易失败:', error);
            throw error;
        }
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 使用示例
const strategies = new AdvancedTradingStrategies(client);

// 执行 DCA 策略
await strategies.dollarCostAveraging('BTCUSDT', 1000, 10); // 1000 USDT 分10次买入

// 执行网格交易
await strategies.gridTrading('BTCUSDT', 43000, 2, 5, 0.001); // 基准价43000，网格间距2%，5层网格

// 检查套利机会
await strategies.arbitrageTrading('BTCUSDT', 'bybit', 'binance', 0.3); // 最小利润率0.3%
``` -->

## 风险管理

### 仓位管理

```javascript
class PositionManager {
    constructor(client, config) {
        this.client = client;
        this.config = {
            maxPositionPercent: config.maxPositionPercent || 10, // 单个仓位最大占比
            maxTotalExposure: config.maxTotalExposure || 80, // 总仓位最大占比
            stopLossPercent: config.stopLossPercent || 5, // 止损百分比
            takeProfitPercent: config.takeProfitPercent || 15 // 止盈百分比
        };
    }
    
    async checkPositionLimits(symbol, orderValue) {
        const account = await this.client.account.getInfo();
        const totalBalance = parseFloat(account.totalWalletBalance);
        
        // 检查单个仓位限制
        const maxPositionValue = totalBalance * (this.config.maxPositionPercent / 100);
        if (orderValue > maxPositionValue) {
            throw new Error(`订单价值 ${orderValue} 超过单个仓位限制 ${maxPositionValue}`);
        }
        
        // 检查总仓位限制
        const positions = await this.client.account.getPositions();
        const totalExposure = positions.reduce((sum, pos) => sum + Math.abs(pos.notional), 0);
        const maxTotalExposure = totalBalance * (this.config.maxTotalExposure / 100);
        
        if (totalExposure + orderValue > maxTotalExposure) {
            throw new Error(`总仓位 ${totalExposure + orderValue} 超过限制 ${maxTotalExposure}`);
        }
        
        return true;
    }
    
    async setStopLossAndTakeProfit(symbol, entryPrice, side, quantity, exchange = 'bybit') {
        const stopLossPrice = side === 'buy' 
            ? entryPrice * (1 - this.config.stopLossPercent / 100)
            : entryPrice * (1 + this.config.stopLossPercent / 100);
            
        const takeProfitPrice = side === 'buy'
            ? entryPrice * (1 + this.config.takeProfitPercent / 100)
            : entryPrice * (1 - this.config.takeProfitPercent / 100);
        
        try {
            // 设置止损单
            const stopLossOrder = await this.client.trading.placeOrder({
                symbol,
                side: side === 'buy' ? 'sell' : 'buy',
                type: 'stop',
                quantity: quantity.toString(),
                stopPrice: stopLossPrice.toFixed(2),
                exchange
            });
            
            // 设置止盈单
            const takeProfitOrder = await this.client.trading.placeOrder({
                symbol,
                side: side === 'buy' ? 'sell' : 'buy',
                type: 'limit',
                quantity: quantity.toString(),
                price: takeProfitPrice.toFixed(2),
                exchange
            });
            
            console.log(`止损单已设置: ${stopLossPrice.toFixed(2)}`);
            console.log(`止盈单已设置: ${takeProfitPrice.toFixed(2)}`);
            
            return { stopLossOrder, takeProfitOrder };
        } catch (error) {
            console.error('设置止损止盈失败:', error);
            throw error;
        }
    }
    
    async monitorPositions() {
        try {
            const positions = await this.client.account.getPositions();
            
            for (const position of positions) {
                const unrealizedPnlPercent = (position.unrealizedPnl / position.notional) * 100;
                
                // 检查是否需要强制平仓
                if (Math.abs(unrealizedPnlPercent) > this.config.stopLossPercent * 2) {
                    console.warn(`仓位 ${position.symbol} 亏损过大 (${unrealizedPnlPercent.toFixed(2)}%)，考虑强制平仓`);
                    
                    // 可以在这里实现自动平仓逻辑
                    // await this.forceClosePosition(position);
                }
                
                // 记录仓位状态
                console.log(`仓位 ${position.symbol}: 数量=${position.size}, 未实现盈亏=${position.unrealizedPnl}`);
            }
        } catch (error) {
            console.error('监控仓位失败:', error);
        }
    }
}
``` -->

## 实时数据处理

### WebSocket 数据流

```javascript
class RealTimeDataProcessor {
    constructor(client) {
        this.client = client;
        this.ws = null;
        this.subscriptions = new Set();
        this.dataHandlers = new Map();
    }
    
    connect() {
        this.ws = new WebSocket('wss://api.okd.finance/v1/ws/trading');
        
        this.ws.onopen = () => {
            console.log('交易 WebSocket 连接已建立');
            this.authenticate();
        };
        
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.processMessage(data);
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
                timestamp: Date.now()
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
    
    processMessage(data) {
        const handler = this.dataHandlers.get(data.type);
        if (handler) {
            handler(data);
        } else {
            console.log('未处理的消息类型:', data.type);
        }
    }
    
    onTicker(callback) {
        this.dataHandlers.set('ticker', callback);
    }
    
    onOrderBook(callback) {
        this.dataHandlers.set('orderbook', callback);
    }
    
    onTrade(callback) {
        this.dataHandlers.set('trade', callback);
    }
    
    onOrderUpdate(callback) {
        this.dataHandlers.set('order_update', callback);
    }
    
    onPositionUpdate(callback) {
        this.dataHandlers.set('position_update', callback);
    }
}

// 使用示例
const dataProcessor = new RealTimeDataProcessor(client);

// 设置数据处理回调
dataProcessor.onTicker((data) => {
    console.log('价格更新:', data.symbol, data.price);
});

dataProcessor.onOrderUpdate((data) => {
    console.log('订单状态更新:', data.orderId, data.status);
});

dataProcessor.onPositionUpdate((data) => {
    console.log('仓位更新:', data.symbol, data.size);
});

// 连接并订阅数据
dataProcessor.connect();
dataProcessor.subscribe([
    'ticker.BTCUSDT',
    'orderbook.ETHUSDT',
    'orders',
    'positions'
]);
``` -->

## 性能优化

### 批量操作

```javascript
class BatchOperations {
    constructor(client) {
        this.client = client;
        this.batchSize = 10;
        this.orderQueue = [];
        this.cancelQueue = [];
    }
    
    async batchPlaceOrders(orders) {
        const batches = this.chunkArray(orders, this.batchSize);
        const results = [];
        
        for (const batch of batches) {
            try {
                const batchResult = await this.client.trading.batchPlaceOrders(batch);
                results.push(...batchResult);
                console.log(`批量下单完成: ${batch.length} 个订单`);
            } catch (error) {
                console.error('批量下单失败:', error);
            }
        }
        
        return results;
    }
    
    async batchCancelOrders(orderIds) {
        const batches = this.chunkArray(orderIds, this.batchSize);
        const results = [];
        
        for (const batch of batches) {
            try {
                const batchResult = await this.client.trading.batchCancelOrders(batch);
                results.push(...batchResult);
                console.log(`批量取消完成: ${batch.length} 个订单`);
            } catch (error) {
                console.error('批量取消失败:', error);
            }
        }
        
        return results;
    }
    
    chunkArray(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
}
``` -->

## 错误处理和重试

### 智能重试机制

```javascript
class SmartRetryHandler {
    constructor(maxRetries = 3, baseDelay = 1000) {
        this.maxRetries = maxRetries;
        this.baseDelay = baseDelay;
    }
    
    async executeWithRetry(fn, context = '') {
        let lastError;
        
        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;
                
                if (this.shouldRetry(error) && attempt < this.maxRetries) {
                    const delay = this.calculateDelay(attempt);
                    console.log(`${context} 第 ${attempt} 次尝试失败，${delay}ms 后重试:`, error.message);
                    await this.sleep(delay);
                } else {
                    break;
                }
            }
        }
        
        console.error(`${context} 所有重试都失败了:`, lastError);
        throw lastError;
    }
    
    shouldRetry(error) {
        // 网络错误、超时、服务器错误等可以重试
        const retryableErrors = [
            'ECONNRESET',
            'ETIMEDOUT',
            'ENOTFOUND',
            'rate_limit_exceeded',
            'server_error'
        ];
        
        return retryableErrors.some(errorType => 
            error.code === errorType || 
            error.message.includes(errorType)
        );
    }
    
    calculateDelay(attempt) {
        // 指数退避 + 随机抖动
        const exponentialDelay = this.baseDelay * Math.pow(2, attempt - 1);
        const jitter = Math.random() * 1000;
        return Math.min(exponentialDelay + jitter, 30000); // 最大30秒
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 使用示例
const retryHandler = new SmartRetryHandler(3, 1000);

const result = await retryHandler.executeWithRetry(
    () => client.trading.placeOrder(orderData),
    '下单操作'
);
``` -->

## 监控和告警

### 交易监控系统

```javascript
class TradingMonitor {
    constructor(client) {
        this.client = client;
        this.metrics = {
            totalTrades: 0,
            successfulTrades: 0,
            totalVolume: 0,
            totalPnl: 0,
            maxDrawdown: 0,
            winRate: 0
        };
        this.alerts = [];
    }
    
    async startMonitoring() {
        console.log('交易监控系统已启动');
        
        setInterval(async () => {
            await this.updateMetrics();
            await this.checkAlerts();
            this.logMetrics();
        }, 60000); // 每分钟更新一次
    }
    
    async updateMetrics() {
        try {
            const account = await this.client.account.getInfo();
            const trades = await this.client.account.getTradeHistory({ limit: 100 });
            const positions = await this.client.account.getPositions();
            
            // 更新交易指标
            this.metrics.totalTrades = trades.length;
            this.metrics.successfulTrades = trades.filter(t => t.realizedPnl > 0).length;
            this.metrics.totalVolume = trades.reduce((sum, t) => sum + parseFloat(t.quoteQty), 0);
            this.metrics.totalPnl = trades.reduce((sum, t) => sum + parseFloat(t.realizedPnl), 0);
            this.metrics.winRate = (this.metrics.successfulTrades / this.metrics.totalTrades) * 100;
            
            // 计算最大回撤
            this.calculateMaxDrawdown(trades);
            
        } catch (error) {
            console.error('更新指标失败:', error);
        }
    }
    
    calculateMaxDrawdown(trades) {
        let peak = 0;
        let maxDrawdown = 0;
        let runningPnl = 0;
        
        for (const trade of trades) {
            runningPnl += parseFloat(trade.realizedPnl);
            if (runningPnl > peak) {
                peak = runningPnl;
            }
            const drawdown = (peak - runningPnl) / peak * 100;
            if (drawdown > maxDrawdown) {
                maxDrawdown = drawdown;
            }
        }
        
        this.metrics.maxDrawdown = maxDrawdown;
    }
    
    async checkAlerts() {
        // 检查账户余额告警
        const account = await this.client.account.getInfo();
        if (parseFloat(account.totalWalletBalance) < 1000) {
            this.addAlert('low_balance', '账户余额过低', account.totalWalletBalance);
        }
        
        // 检查最大回撤告警
        if (this.metrics.maxDrawdown > 20) {
            this.addAlert('high_drawdown', '最大回撤过高', this.metrics.maxDrawdown);
        }
        
        // 检查胜率告警
        if (this.metrics.winRate < 30) {
            this.addAlert('low_winrate', '胜率过低', this.metrics.winRate);
        }
    }
    
    addAlert(type, message, value) {
        const alert = {
            type,
            message,
            value,
            timestamp: new Date().toISOString()
        };
        
        this.alerts.push(alert);
        console.warn('告警:', alert);
        
        // 这里可以集成邮件、短信或其他通知方式
        // await this.sendNotification(alert);
    }
    
    logMetrics() {
        console.log('=== 交易指标 ===');
        console.log(`总交易次数: ${this.metrics.totalTrades}`);
        console.log(`成功交易: ${this.metrics.successfulTrades}`);
        console.log(`总交易量: ${this.metrics.totalVolume.toFixed(2)} USDT`);
        console.log(`总盈亏: ${this.metrics.totalPnl.toFixed(2)} USDT`);
        console.log(`胜率: ${this.metrics.winRate.toFixed(2)}%`);
        console.log(`最大回撤: ${this.metrics.maxDrawdown.toFixed(2)}%`);
        console.log('================');
    }
}

// 启动监控
const monitor = new TradingMonitor(client);
monitor.startMonitoring();
``` -->

## 最佳实践

### 1. 安全性
- 使用环境变量存储 API 密钥
- 设置 IP 白名单
- 定期轮换 API 密钥
- 启用双因素认证

### 2. 风险管理
- 设置止损和止盈
- 控制仓位大小
- 分散投资风险
- 定期评估策略表现

### 3. 性能优化
- 使用 WebSocket 获取实时数据
- 实现连接池管理
- 批量处理订单操作
- 缓存频繁访问的数据

### 4. 错误处理
- 实现智能重试机制
- 记录详细日志
- 监控系统健康状态
- 设置告警机制

## 技术支持

如需技术支持和咨询：
- 文档：[https://docs.okd.finance](https://docs.okd.finance)
- 支持：support@okd.finance
- GitHub：[https://github.com/OKD-Finance/Backend](https://github.com/OKD-Finance/Backend)
- 社区：[https://community.okd.finance](https://community.okd.finance)
