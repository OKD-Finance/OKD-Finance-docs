# Trading API

The Trading API provides endpoints for placing orders, managing positions, and accessing trading data.

## Base URL
```
https://develop.okd.finance/api
```

## Authentication
All endpoints require authentication via Bearer token:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpoints

### POST /trading/order
Place a new trading order.

**Parameters:**
- `symbol` (string, required) - Trading pair symbol (e.g., "BTCUSDT")
- `side` (string, required) - Order side ("buy" or "sell")
- `type` (string, required) - Order type ("market", "limit", "stop", "stop_limit")
- `quantity` (string, required) - Order quantity
- `price` (string, optional) - Order price (required for limit orders)
- `stopPrice` (string, optional) - Stop price (required for stop orders)
- `timeInForce` (string, optional) - Time in force ("GTC", "IOC", "FOK")

**Example Request:**
```bash
curl -X POST "https://develop.okd.finance/api/trading/order" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BTCUSDT",
    "side": "buy",
    "type": "limit",
    "quantity": "0.001",
    "price": "45000.00",
    "timeInForce": "GTC"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "order_123456",
    "symbol": "BTCUSDT",
    "side": "buy",
    "type": "limit",
    "quantity": "0.001",
    "price": "45000.00",
    "status": "open",
    "timeInForce": "GTC",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### GET /trading/orders
Get all orders for the authenticated user.

**Query Parameters:**
- `symbol` (string, optional) - Filter by trading pair
- `status` (string, optional) - Filter by status (open, filled, cancelled)
- `side` (string, optional) - Filter by side (buy, sell)
- `limit` (integer, optional) - Number of orders to return (default: 50)
- `offset` (integer, optional) - Number of orders to skip (default: 0)

**Example Request:**
```bash
curl -X GET "https://develop.okd.finance/api/trading/orders?symbol=BTCUSDT&status=open" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "orderId": "order_123456",
        "symbol": "BTCUSDT",
        "side": "buy",
        "type": "limit",
        "quantity": "0.001",
        "price": "45000.00",
        "filledQuantity": "0.000",
        "status": "open",
        "timeInForce": "GTC",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 10,
      "limit": 50,
      "offset": 0,
      "hasMore": false
    }
  }
}
```

### GET /trading/orders/{orderId}
Get details of a specific order.

**Path Parameters:**
- `orderId` (string, required) - Order ID

**Example Request:**
```bash
curl -X GET "https://develop.okd.finance/api/trading/orders/order_123456" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "order_123456",
    "symbol": "BTCUSDT",
    "side": "buy",
    "type": "limit",
    "quantity": "0.001",
    "price": "45000.00",
    "filledQuantity": "0.001",
    "remainingQuantity": "0.000",
    "status": "filled",
    "timeInForce": "GTC",
    "avgFillPrice": "44950.00",
    "commission": "0.00000075",
    "commissionAsset": "BTC",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:35:00Z"
  }
}
```

### DELETE /trading/orders/{orderId}
Cancel a specific order.

**Path Parameters:**
- `orderId` (string, required) - Order ID

**Example Request:**
```bash
curl -X DELETE "https://develop.okd.finance/api/trading/orders/order_123456" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "order_123456",
    "status": "cancelled",
    "cancelledAt": "2024-01-15T10:32:00Z"
  }
}
```

### DELETE /trading/orders
Cancel all open orders.

**Query Parameters:**
- `symbol` (string, optional) - Cancel orders for specific symbol only

**Example Request:**
```bash
curl -X DELETE "https://develop.okd.finance/api/trading/orders?symbol=BTCUSDT" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "cancelledOrders": [
      {
        "orderId": "order_123456",
        "symbol": "BTCUSDT",
        "status": "cancelled"
      }
    ],
    "totalCancelled": 1
  }
}
```

### GET /trading/trades
Get trade history for the authenticated user.

**Query Parameters:**
- `symbol` (string, optional) - Filter by trading pair
- `orderId` (string, optional) - Filter by order ID
- `limit` (integer, optional) - Number of trades to return (default: 50)
- `offset` (integer, optional) - Number of trades to skip (default: 0)
- `startDate` (string, optional) - Start date (ISO 8601 format)
- `endDate` (string, optional) - End date (ISO 8601 format)

**Example Request:**
```bash
curl -X GET "https://develop.okd.finance/api/trading/trades?symbol=BTCUSDT&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "trades": [
      {
        "tradeId": "trade_789012",
        "orderId": "order_123456",
        "symbol": "BTCUSDT",
        "side": "buy",
        "quantity": "0.001",
        "price": "44950.00",
        "commission": "0.00000075",
        "commissionAsset": "BTC",
        "isMaker": false,
        "timestamp": "2024-01-15T10:35:00Z"
      }
    ],
    "pagination": {
      "total": 50,
      "limit": 10,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

### GET /trading/positions
Get current trading positions.

**Query Parameters:**
- `symbol` (string, optional) - Filter by trading pair

**Example Request:**
```bash
curl -X GET "https://develop.okd.finance/api/trading/positions" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "positions": [
      {
        "symbol": "BTCUSDT",
        "side": "long",
        "size": "0.5",
        "entryPrice": "45000.00",
        "markPrice": "46000.00",
        "unrealizedPnl": "500.00",
        "realizedPnl": "0.00",
        "leverage": "10x",
        "marginUsed": "2250.00",
        "liquidationPrice": "40500.00"
      }
    ]
  }
}
```

### GET /trading/account
Get trading account information.

**Example Request:**
```bash
curl -X GET "https://develop.okd.finance/api/trading/account" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accountType": "spot",
    "totalBalance": "10000.00",
    "availableBalance": "8500.00",
    "lockedBalance": "1500.00",
    "totalEquity": "10500.00",
    "totalMarginUsed": "2250.00",
    "freeMargin": "8250.00",
    "marginLevel": "466.67",
    "canTrade": true,
    "canWithdraw": true,
    "canDeposit": true
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "INVALID_SYMBOL",
    "message": "Trading pair not supported"
  }
}
```

### 400 Insufficient Balance
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient balance to place order"
  }
}
```

### 404 Order Not Found
```json
{
  "success": false,
  "error": {
    "code": "ORDER_NOT_FOUND",
    "message": "Order not found or already cancelled"
  }
}
```

