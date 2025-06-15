# Trading Orders API

Complete guide for managing trading orders through OKD Finance platform with support for multiple exchanges including Bybit.

## Overview

The Trading Orders API provides comprehensive order management capabilities including order placement, modification, cancellation, and monitoring. Our unified API works across all supported exchanges while maintaining exchange-specific features.

## Order Types

### Market Orders
Execute immediately at the best available price.

```javascript
{
    "type": "market",
    "side": "buy",
    "symbol": "BTCUSDT",
    "quantity": "0.001",
    "exchange": "bybit"
}
```

### Limit Orders
Execute only at specified price or better.

```javascript
{
    "type": "limit",
    "side": "sell",
    "symbol": "BTCUSDT",
    "quantity": "0.001",
    "price": "45000.00",
    "exchange": "bybit",
    "timeInForce": "GTC"
}
```

### Stop Orders
Trigger when price reaches specified level.

```javascript
{
    "type": "stop",
    "side": "sell",
    "symbol": "BTCUSDT",
    "quantity": "0.001",
    "stopPrice": "42000.00",
    "exchange": "bybit"
}
```

### Stop-Limit Orders
Combine stop and limit order features.

```javascript
{
    "type": "stop_limit",
    "side": "buy",
    "symbol": "BTCUSDT",
    "quantity": "0.001",
    "stopPrice": "44000.00",
    "price": "44100.00",
    "exchange": "bybit",
    "timeInForce": "GTC"
}
```

## Order Placement

### Place New Order
```http
POST /api/v1/trading/orders
```

**Request Body:**
```json
{
    "symbol": "BTCUSDT",
    "side": "buy",
    "type": "limit",
    "quantity": "0.001",
    "price": "43000.00",
    "exchange": "bybit",
    "timeInForce": "GTC",
    "clientOrderId": "my-order-123"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "orderId": "12345678901234567890",
        "clientOrderId": "my-order-123",
        "symbol": "BTCUSDT",
        "side": "buy",
        "type": "limit",
        "quantity": "0.001",
        "price": "43000.00",
        "status": "new",
        "timeInForce": "GTC",
        "exchange": "bybit",
        "timestamp": 1703123456789,
        "executedQuantity": "0.000",
        "cummulativeQuoteQty": "0.00"
    }
}
```

### Batch Order Placement
```http
POST /api/v1/trading/orders/batch
```

**Request Body:**
```json
{
    "orders": [
        {
            "symbol": "BTCUSDT",
            "side": "buy",
            "type": "limit",
            "quantity": "0.001",
            "price": "43000.00",
            "clientOrderId": "order-1"
        },
        {
            "symbol": "ETHUSDT",
            "side": "sell",
            "type": "limit",
            "quantity": "0.01",
            "price": "2500.00",
            "clientOrderId": "order-2"
        }
    ],
    "exchange": "bybit"
}
```

## Order Management

### Get Order Status
```http
GET /api/v1/trading/orders/{orderId}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "orderId": "12345678901234567890",
        "clientOrderId": "my-order-123",
        "symbol": "BTCUSDT",
        "side": "buy",
        "type": "limit",
        "quantity": "0.001",
        "price": "43000.00",
        "status": "partially_filled",
        "timeInForce": "GTC",
        "exchange": "bybit",
        "timestamp": 1703123456789,
        "executedQuantity": "0.0005",
        "cummulativeQuoteQty": "21.50",
        "avgPrice": "43000.00",
        "fills": [
            {
                "price": "43000.00",
                "quantity": "0.0005",
                "commission": "0.0215",
                "commissionAsset": "USDT",
                "timestamp": 1703123456789
            }
        ]
    }
}
```

### Get Open Orders
```http
GET /api/v1/trading/orders/open?symbol=BTCUSDT&exchange=bybit
```

### Get Order History
```http
GET /api/v1/trading/orders/history?symbol=BTCUSDT&exchange=bybit&limit=100
```

### Cancel Order
```http
DELETE /api/v1/trading/orders/{orderId}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "orderId": "12345678901234567890",
        "clientOrderId": "my-order-123",
        "symbol": "BTCUSDT",
        "status": "canceled",
        "timestamp": 1703123456789
    }
}
```

### Cancel All Orders
```http
DELETE /api/v1/trading/orders/all?symbol=BTCUSDT&exchange=bybit
```

### Modify Order
```http
PUT /api/v1/trading/orders/{orderId}
```

**Request Body:**
```json
{
    "quantity": "0.002",
    "price": "43500.00"
}
```

## Order Status Types

| Status | Description |
|--------|-------------|
| `new` | Order accepted by the system |
| `partially_filled` | Order partially executed |
| `filled` | Order completely executed |
| `canceled` | Order canceled by user |
| `rejected` | Order rejected by exchange |
| `expired` | Order expired (time-based orders) |
| `pending_cancel` | Cancel request submitted |

## Time in Force Options

| Type | Description |
|------|-------------|
| `GTC` | Good Till Canceled - remains active until filled or canceled |
| `IOC` | Immediate or Cancel - execute immediately, cancel remainder |
| `FOK` | Fill or Kill - execute completely or cancel entirely |
| `GTD` | Good Till Date - remains active until specified date |

## Advanced Order Features

### Iceberg Orders
Break large orders into smaller chunks to hide order size.

```javascript
{
    "type": "limit",
    "side": "buy",
    "symbol": "BTCUSDT",
    "quantity": "1.0",
    "price": "43000.00",
    "icebergQty": "0.1",
    "exchange": "bybit"
}
```

### Bracket Orders
Combine entry, profit target, and stop loss in one order.

```javascript
{
    "type": "bracket",
    "side": "buy",
    "symbol": "BTCUSDT",
    "quantity": "0.001",
    "price": "43000.00",
    "takeProfitPrice": "45000.00",
    "stopLossPrice": "41000.00",
    "exchange": "bybit"
}
```

### Trailing Stop Orders
Automatically adjust stop price as market moves favorably.

```javascript
{
    "type": "trailing_stop",
    "side": "sell",
    "symbol": "BTCUSDT",
    "quantity": "0.001",
    "callbackRate": "0.02",
    "exchange": "bybit"
}
```

## Order Validation

### Pre-trade Checks
- Account balance verification
- Position size limits
- Risk management rules
- Exchange-specific requirements

### Real-time Validation
```javascript
// Validate order before placement
const validation = await okd.trading.validateOrder({
    symbol: "BTCUSDT",
    side: "buy",
    type: "limit",
    quantity: "0.001",
    price: "43000.00",
    exchange: "bybit"
});

if (validation.valid) {
    // Place order
    const order = await okd.trading.placeOrder(orderData);
} else {
    console.error('Order validation failed:', validation.errors);
}
```

## Error Handling

### Common Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `2001` | Insufficient balance | Add funds or reduce order size |
| `2002` | Invalid symbol | Check symbol format |
| `2003` | Order size too small | Increase quantity |
| `2004` | Order size too large | Reduce quantity |
| `2005` | Price out of range | Adjust price within limits |
| `2006` | Rate limit exceeded | Implement backoff strategy |
| `2007` | Market closed | Wait for market hours |
| `2008` | Order not found | Verify order ID |

### Error Response Format
```json
{
    "success": false,
    "error": {
        "code": 2001,
        "message": "Insufficient balance",
        "details": {
            "required": "43.00 USDT",
            "available": "25.50 USDT"
        }
    }
}
```

## WebSocket Order Updates

### Subscribe to Order Updates
```javascript
const ws = new WebSocket('wss://api.okd.finance/v1/ws/orders');

ws.onopen = function() {
    ws.send(JSON.stringify({
        method: 'subscribe',
        params: {
            channels: ['orders'],
            exchange: 'bybit'
        }
    }));
};

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.type === 'order_update') {
        console.log('Order update:', data.order);
    }
};
```

### Order Update Events
```json
{
    "type": "order_update",
    "timestamp": 1703123456789,
    "order": {
        "orderId": "12345678901234567890",
        "symbol": "BTCUSDT",
        "status": "filled",
        "executedQuantity": "0.001",
        "avgPrice": "43000.00"
    }
}
```

## Best Practices

### Order Management
1. **Use Client Order IDs**: Always provide unique client order IDs for tracking
2. **Implement Timeouts**: Set reasonable timeouts for order operations
3. **Handle Partial Fills**: Design logic to handle partially filled orders
4. **Monitor Order Status**: Subscribe to real-time order updates

### Risk Management
1. **Position Sizing**: Never risk more than you can afford to lose
2. **Stop Losses**: Always use stop losses for risk management
3. **Diversification**: Don't put all capital in single trades
4. **Regular Monitoring**: Monitor positions and market conditions

### Performance Optimization
1. **Batch Operations**: Use batch APIs for multiple orders
2. **Connection Pooling**: Reuse connections for better performance
3. **Caching**: Cache frequently accessed data
4. **Async Processing**: Use asynchronous operations

## Code Examples

### Complete Order Management Class
```javascript
class OrderManager {
    constructor(apiKey, apiSecret) {
        this.client = new OKDClient(apiKey, apiSecret);
        this.orders = new Map();
    }
    
    async placeOrder(orderData) {
        try {
            const order = await this.client.trading.placeOrder(orderData);
            this.orders.set(order.orderId, order);
            return order;
        } catch (error) {
            console.error('Failed to place order:', error);
            throw error;
        }
    }
    
    async cancelOrder(orderId) {
        try {
            const result = await this.client.trading.cancelOrder(orderId);
            if (this.orders.has(orderId)) {
                this.orders.get(orderId).status = 'canceled';
            }
            return result;
        } catch (error) {
            console.error('Failed to cancel order:', error);
            throw error;
        }
    }
    
    async getOrderStatus(orderId) {
        try {
            const order = await this.client.trading.getOrder(orderId);
            this.orders.set(orderId, order);
            return order;
        } catch (error) {
            console.error('Failed to get order status:', error);
            throw error;
        }
    }
    
    getOpenOrders() {
        return Array.from(this.orders.values())
            .filter(order => ['new', 'partially_filled'].includes(order.status));
    }
}

// Usage
const orderManager = new OrderManager('your-api-key', 'your-api-secret');

// Place a limit order
const order = await orderManager.placeOrder({
    symbol: 'BTCUSDT',
    side: 'buy',
    type: 'limit',
    quantity: '0.001',
    price: '43000.00',
    exchange: 'bybit'
});

console.log('Order placed:', order.orderId);
```

## Rate Limits

### Order Placement Limits
- **Spot Trading**: 100 orders per 10 seconds
- **Derivatives**: 200 orders per 10 seconds
- **Batch Orders**: 20 batches per minute

### Query Limits
- **Order Status**: 1000 requests per minute
- **Order History**: 100 requests per minute
- **Open Orders**: 200 requests per minute

## Support

For technical support and questions:
- Documentation: [https://docs.okd.finance](https://docs.okd.finance)
- Support: support@okd.finance
- GitHub: [https://github.com/OKD-Finance/Backend](https://github.com/OKD-Finance/Backend)
