<template>
  <div class="interactive-api-container">
    <!-- Column 1: Navigation -->
    <div class="api-docs-column">
      <h2>Trading API</h2>
      
      <div class="auth-section">
        <h3>Authentication</h3>
        <input 
          v-model="apiToken"
          type="password" 
          placeholder="Enter your access token..." 
          class="token-input"
        />
        <div v-if="apiToken" class="token-status">
          ✅ Token configured
        </div>
      </div>

      <div class="endpoint-nav">
        <a href="#place-order" class="nav-link">POST Place Order</a>
        <a href="#get-orders" class="nav-link">GET Orders</a>
        <a href="#get-order" class="nav-link">GET Specific Order</a>
        <a href="#cancel-order" class="nav-link">DELETE Cancel Order</a>
        <a href="#cancel-all-orders" class="nav-link">DELETE Cancel All Orders</a>
        <a href="#get-trades" class="nav-link">GET Trade History</a>
      </div>
    </div>

    <!-- Column 2: Documentation and Testing -->
    <div class="documentation-column">
      <section id="place-order" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/trading/order</span>
            </div>
            <h3>Place Trading Order</h3>
            <p>Place a new trading order on the exchange.</p>
            
            <h4>Headers</h4>
            <ul>
              <li><code>Authorization: Bearer access_token</code> - JWT access token</li>
              <li><code>Content-Type: application/json</code></li>
              <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
            </ul>
            
            <h4>Body Parameters</h4>
            <ul>
              <li><code>symbol</code> (string, required) - Trading pair symbol (e.g., "BTCUSDT", "ETHUSDT")</li>
              <li><code>side</code> (string, required) - Order side ("buy" or "sell")</li>
              <li><code>type</code> (string, required) - Order type ("market", "limit", "stop", "stop_limit")</li>
              <li><code>quantity</code> (string, required) - Order quantity in base currency</li>
              <li><code>price</code> (string, optional) - Order price (required for limit orders)</li>
              <li><code>stopPrice</code> (string, optional) - Stop price (required for stop orders)</li>
              <li><code>timeInForce</code> (string, optional) - Time in force ("GTC", "IOC", "FOK")</li>
              <li><code>clientOrderId</code> (string, optional) - Client-generated order ID</li>
            </ul>

            <h4>Example Request</h4>
            <pre class="code-block">POST /trading/order
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Fingerprint: 1358cd229b6bceb25941e99f4228997f

{
  "symbol": "BTCUSDT",
  "side": "buy",
  "type": "limit",
  "quantity": "0.001",
  "price": "45000.00",
  "timeInForce": "GTC",
  "clientOrderId": "my_order_123"
}</pre>

            <h4>Response</h4>
            <div class="response-example">
              <div class="response-status success">200 OK</div>
              <pre class="code-block">{
  "success": true,
  "data": {
    "orderId": "ord_1234567890abcdef",
    "clientOrderId": "my_order_123",
    "symbol": "BTCUSDT",
    "side": "buy",
    "type": "limit",
    "quantity": "0.00100000",
    "price": "45000.00000000",
    "stopPrice": null,
    "status": "new",
    "timeInForce": "GTC",
    "filledQuantity": "0.00000000",
    "remainingQuantity": "0.00100000",
    "avgFillPrice": "0.00000000",
    "commission": "0.00000000",
    "commissionAsset": "BTC",
    "createdAt": "2024-01-15T14:30:00Z",
    "updatedAt": "2024-01-15T14:30:00Z"
  },
  "error": null
}</pre>
            </div>

            <div class="response-example">
              <div class="response-status error">400 Bad Request</div>
              <pre class="code-block">{
  "success": false,
  "data": null,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient USDT balance to place buy order",
    "details": {
      "required": "45.00",
      "available": "20.50"
    }
  }
}</pre>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4>Live Testing</h4>
            <div class="test-section">
              <select v-model="orderData.symbol" class="test-input">
                <option value="BTCUSDT">BTCUSDT</option>
                <option value="ETHUSDT">ETHUSDT</option>
                <option value="ADAUSDT">ADAUSDT</option>
                <option value="DOTUSDT">DOTUSDT</option>
              </select>
              <select v-model="orderData.side" class="test-input">
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
              <select v-model="orderData.type" class="test-input">
                <option value="market">Market</option>
                <option value="limit">Limit</option>
                <option value="stop">Stop</option>
                <option value="stop_limit">Stop Limit</option>
              </select>
              <input v-model="orderData.quantity" type="text" placeholder="Quantity (0.001)" class="test-input" />
              <input v-model="orderData.price" type="text" placeholder="Price (for limit orders)" class="test-input" />
              <input v-model="orderData.stopPrice" type="text" placeholder="Stop Price (for stop orders)" class="test-input" />
              <select v-model="orderData.timeInForce" class="test-input">
                <option value="GTC">GTC (Good Till Cancelled)</option>
                <option value="IOC">IOC (Immediate or Cancel)</option>
                <option value="FOK">FOK (Fill or Kill)</option>
              </select>
              <button @click="testPlaceOrder" class="test-btn">Test Request</button>
              <div v-if="results.placeOrder" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.placeOrder.status }}</span>
                  <span class="timestamp">{{ results.placeOrder.timestamp }}</span>
                </div>
                <pre class="result-data">{{ results.placeOrder.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="get-orders" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/trading/orders</span>
            </div>
            <h3>Get Orders</h3>
            <p>Get all orders for the authenticated user with optional filtering.</p>
            
            <h4>Headers</h4>
            <ul>
              <li><code>Authorization: Bearer access_token</code> - JWT access token</li>
              <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
            </ul>
            
            <h4>Query Parameters</h4>
            <ul>
              <li><code>symbol</code> (string, optional) - Filter by trading pair (e.g., "BTCUSDT")</li>
              <li><code>status</code> (string, optional) - Filter by status ("new", "partially_filled", "filled", "cancelled", "rejected")</li>
              <li><code>side</code> (string, optional) - Filter by side ("buy" or "sell")</li>
              <li><code>type</code> (string, optional) - Filter by order type ("market", "limit", "stop", "stop_limit")</li>
              <li><code>limit</code> (integer, optional) - Number of orders to return (default: 50, max: 500)</li>
              <li><code>offset</code> (integer, optional) - Number of orders to skip (default: 0)</li>
              <li><code>startTime</code> (integer, optional) - Start time timestamp (milliseconds)</li>
              <li><code>endTime</code> (integer, optional) - End time timestamp (milliseconds)</li>
            </ul>

            <h4>Example Request</h4>
            <pre class="code-block">GET /trading/orders?symbol=BTCUSDT&status=filled&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Fingerprint: 1358cd229b6bceb25941e99f4228997f</pre>

            <h4>Response</h4>
            <div class="response-example">
              <div class="response-status success">200 OK</div>
              <pre class="code-block">{
  "success": true,
  "data": {
    "orders": [
      {
        "orderId": "ord_1234567890abcdef",
        "clientOrderId": "my_order_123",
        "symbol": "BTCUSDT",
        "side": "buy",
        "type": "limit",
        "quantity": "0.00100000",
        "price": "45000.00000000",
        "stopPrice": null,
        "status": "filled",
        "timeInForce": "GTC",
        "filledQuantity": "0.00100000",
        "remainingQuantity": "0.00000000",
        "avgFillPrice": "44950.00000000",
        "commission": "0.00000075",
        "commissionAsset": "BTC",
        "createdAt": "2024-01-15T14:30:00Z",
        "updatedAt": "2024-01-15T14:35:00Z",
        "fills": [
          {
            "tradeId": "trade_987654321",
            "price": "44950.00000000",
            "quantity": "0.00100000",
            "commission": "0.00000075",
            "commissionAsset": "BTC",
            "timestamp": "2024-01-15T14:35:00Z"
          }
        ]
      }
    ],
    "pagination": {
      "total": 25,
      "limit": 10,
      "offset": 0,
      "hasMore": true
    }
  },
  "error": null
}</pre>
            </div>

            <div class="response-example">
              <div class="response-status error">400 Bad Request</div>
              <pre class="code-block">{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid symbol format",
    "details": {
      "symbol": "Symbol must be in format BASEQUOTE (e.g., BTCUSDT)"
    }
  }
}</pre>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4>Live Testing</h4>
            <div class="test-section">
              <select v-model="ordersData.symbol" class="test-input">
                <option value="">All symbols</option>
                <option value="BTCUSDT">BTCUSDT</option>
                <option value="ETHUSDT">ETHUSDT</option>
                <option value="ADAUSDT">ADAUSDT</option>
              </select>
              <select v-model="ordersData.status" class="test-input">
                <option value="">All statuses</option>
                <option value="open">Open</option>
                <option value="filled">Filled</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select v-model="ordersData.side" class="test-input">
                <option value="">All sides</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
              <input v-model.number="ordersData.limit" type="number" placeholder="Limit (50)" class="test-input" />
              <button @click="testGetOrders" class="test-btn">Test Request</button>
              <div v-if="results.orders" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.orders.status }}</span>
                  <span class="timestamp">{{ results.orders.timestamp }}</span>
                </div>
                <pre class="result-data">{{ results.orders.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="get-order" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/trading/orders/{orderId}</span>
            </div>
            <h3>Get Specific Order</h3>
            <p>Get detailed information about a specific order by its ID.</p>
            
            <h4>Headers</h4>
            <ul>
              <li><code>Authorization: Bearer access_token</code> - JWT access token</li>
              <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
            </ul>
            
            <h4>Path Parameters</h4>
            <ul>
              <li><code>orderId</code> (string, required) - Unique order identifier</li>
            </ul>

            <h4>Example Request</h4>
            <pre class="code-block">GET /trading/orders/ord_1234567890abcdef
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Fingerprint: 1358cd229b6bceb25941e99f4228997f</pre>

            <h4>Response</h4>
            <div class="response-example">
              <div class="response-status success">200 OK</div>
              <pre class="code-block">{
  "success": true,
  "data": {
    "orderId": "ord_1234567890abcdef",
    "clientOrderId": "my_order_123",
    "symbol": "BTCUSDT",
    "side": "buy",
    "type": "limit",
    "quantity": "0.00100000",
    "price": "45000.00000000",
    "stopPrice": null,
    "status": "filled",
    "timeInForce": "GTC",
    "filledQuantity": "0.00100000",
    "remainingQuantity": "0.00000000",
    "avgFillPrice": "44950.00000000",
    "commission": "0.00000075",
    "commissionAsset": "BTC",
    "createdAt": "2024-01-15T14:30:00Z",
    "updatedAt": "2024-01-15T14:35:00Z",
    "fills": [
      {
        "tradeId": "trade_987654321",
        "price": "44950.00000000",
        "quantity": "0.00100000",
        "commission": "0.00000075",
        "commissionAsset": "BTC",
        "timestamp": "2024-01-15T14:35:00Z",
        "isMaker": false
      }
    ],
    "events": [
      {
        "type": "order_created",
        "timestamp": "2024-01-15T14:30:00Z"
      },
      {
        "type": "order_filled",
        "timestamp": "2024-01-15T14:35:00Z",
        "details": {
          "fillPrice": "44950.00000000",
          "fillQuantity": "0.00100000"
        }
      }
    ]
  },
  "error": null
}</pre>
            </div>

            <div class="response-example">
              <div class="response-status error">404 Not Found</div>
              <pre class="code-block">{
  "success": false,
  "data": null,
  "error": {
    "code": "ORDER_NOT_FOUND",
    "message": "Order not found or does not belong to this user"
  }
}</pre>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4>Live Testing</h4>
            <div class="test-section">
              <input v-model="specificOrderData.orderId" type="text" placeholder="Order ID" class="test-input" />
              <button @click="testGetSpecificOrder" class="test-btn">Test Request</button>
              <div v-if="results.specificOrder" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.specificOrder.status }}</span>
                  <span class="timestamp">{{ results.specificOrder.timestamp }}</span>
                </div>
                <pre class="result-data">{{ results.specificOrder.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cancel-order" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge delete">DELETE</span>
              <span class="endpoint-path">/trading/orders/{orderId}</span>
            </div>
            <h3>Cancel Order</h3>
            <p>Cancel a specific open order. Only orders with status "new" or "partially_filled" can be cancelled.</p>
            
            <h4>Headers</h4>
            <ul>
              <li><code>Authorization: Bearer access_token</code> - JWT access token</li>
              <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
            </ul>
            
            <h4>Path Parameters</h4>
            <ul>
              <li><code>orderId</code> (string, required) - Unique order identifier to cancel</li>
            </ul>

            <h4>Example Request</h4>
            <pre class="code-block">DELETE /trading/orders/ord_1234567890abcdef
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Fingerprint: 1358cd229b6bceb25941e99f4228997f</pre>

            <h4>Response</h4>
            <div class="response-example">
              <div class="response-status success">200 OK</div>
              <pre class="code-block">{
  "success": true,
  "data": {
    "orderId": "ord_1234567890abcdef",
    "clientOrderId": "my_order_123",
    "symbol": "BTCUSDT",
    "side": "buy",
    "type": "limit",
    "quantity": "0.00100000",
    "price": "45000.00000000",
    "status": "cancelled",
    "timeInForce": "GTC",
    "filledQuantity": "0.00050000",
    "remainingQuantity": "0.00050000",
    "avgFillPrice": "44980.00000000",
    "commission": "0.0000003",
    "commissionAsset": "BTC",
    "createdAt": "2024-01-15T14:30:00Z",
    "updatedAt": "2024-01-15T14:40:00Z",
    "cancelledAt": "2024-01-15T14:40:00Z",
    "cancelReason": "user_requested"
  },
  "error": null
}</pre>
            </div>

            <div class="response-example">
              <div class="response-status error">400 Bad Request</div>
              <pre class="code-block">{
  "success": false,
  "data": null,
  "error": {
    "code": "CANNOT_CANCEL_ORDER",
    "message": "Order cannot be cancelled",
    "details": {
      "currentStatus": "filled",
      "reason": "Order is already filled and cannot be cancelled"
    }
  }
}</pre>
            </div>

            <div class="response-example">
              <div class="response-status error">404 Not Found</div>
              <pre class="code-block">{
  "success": false,
  "data": null,
  "error": {
    "code": "ORDER_NOT_FOUND",
    "message": "Order not found or does not belong to this user"
  }
}</pre>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4>Live Testing</h4>
            <div class="test-section">
              <input v-model="cancelOrderData.orderId" type="text" placeholder="Order ID" class="test-input" />
              <button @click="testCancelOrder" class="test-btn">Test Request</button>
              <div v-if="results.cancelOrder" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.cancelOrder.status }}</span>
                  <span class="timestamp">{{ results.cancelOrder.timestamp }}</span>
                </div>
                <pre class="result-data">{{ results.cancelOrder.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="get-trades" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/trading/trades</span>
            </div>
            <h3>Get Trade History</h3>
            <p>Get detailed trade execution history for the authenticated user with optional filtering.</p>
            
            <h4>Headers</h4>
            <ul>
              <li><code>Authorization: Bearer access_token</code> - JWT access token</li>
              <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
            </ul>
            
            <h4>Query Parameters</h4>
            <ul>
              <li><code>symbol</code> (string, optional) - Filter by trading pair (e.g., "BTCUSDT")</li>
              <li><code>orderId</code> (string, optional) - Filter by specific order ID</li>
              <li><code>side</code> (string, optional) - Filter by trade side ("buy" or "sell")</li>
              <li><code>limit</code> (integer, optional) - Number of trades to return (default: 50, max: 1000)</li>
              <li><code>offset</code> (integer, optional) - Number of trades to skip (default: 0)</li>
              <li><code>startTime</code> (integer, optional) - Start time timestamp (milliseconds)</li>
              <li><code>endTime</code> (integer, optional) - End time timestamp (milliseconds)</li>
              <li><code>fromTradeId</code> (string, optional) - Start from specific trade ID</li>
            </ul>

            <h4>Example Request</h4>
            <pre class="code-block">GET /trading/trades?symbol=BTCUSDT&limit=10&startTime=1705320600000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Fingerprint: 1358cd229b6bceb25941e99f4228997f</pre>

            <h4>Response</h4>
            <div class="response-example">
              <div class="response-status success">200 OK</div>
              <pre class="code-block">{
  "success": true,
  "data": {
    "trades": [
      {
        "tradeId": "trade_987654321",
        "orderId": "ord_1234567890abcdef",
        "clientOrderId": "my_order_123",
        "symbol": "BTCUSDT",
        "side": "buy",
        "price": "44950.00000000",
        "quantity": "0.00100000",
        "quoteQuantity": "44.95000000",
        "commission": "0.00000075",
        "commissionAsset": "BTC",
        "isMaker": false,
        "isBuyer": true,
        "timestamp": "2024-01-15T14:35:00Z",
        "orderType": "limit",
        "feeRate": "0.001"
      },
      {
        "tradeId": "trade_987654320",
        "orderId": "ord_0987654321fedcba",
        "clientOrderId": "my_order_124",
        "symbol": "BTCUSDT",
        "side": "sell",
        "price": "45100.00000000",
        "quantity": "0.00050000",
        "quoteQuantity": "22.55000000",
        "commission": "0.02255000",
        "commissionAsset": "USDT",
        "isMaker": true,
        "isBuyer": false,
        "timestamp": "2024-01-15T15:20:00Z",
        "orderType": "limit",
        "feeRate": "0.001"
      }
    ],
    "pagination": {
      "total": 156,
      "limit": 10,
      "offset": 0,
      "hasMore": true
    },
    "summary": {
      "totalVolume": "67.50000000",
      "totalCommission": "0.04510075",
      "profitLoss": "+2.60000000",
      "currency": "USDT"
    }
  },
  "error": null
}</pre>
            </div>

            <div class="response-example">
              <div class="response-status error">400 Bad Request</div>
              <pre class="code-block">{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_TIME_RANGE",
    "message": "Invalid time range specified",
    "details": {
      "startTime": "Start time cannot be greater than end time",
      "maxRange": "Maximum time range is 30 days"
    }
  }
}</pre>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4>Live Testing</h4>
            <div class="test-section">
              <select v-model="tradesData.symbol" class="test-input">
                <option value="">All symbols</option>
                <option value="BTCUSDT">BTCUSDT</option>
                <option value="ETHUSDT">ETHUSDT</option>
                <option value="ADAUSDT">ADAUSDT</option>
              </select>
              <input v-model.number="tradesData.limit" type="number" placeholder="Limit (50)" class="test-input" />
              <button @click="testGetTrades" class="test-btn">Test Request</button>
              <div v-if="results.trades" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.trades.status }}</span>
                  <span class="timestamp">{{ results.trades.timestamp }}</span>
                </div>
                <pre class="result-data">{{ results.trades.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Cancel All Orders -->
      <section id="cancel-all-orders" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge delete">DELETE</span>
              <span class="endpoint-path">/trading/orders</span>
            </div>
            <h3>Cancel All Orders</h3>
            <p>Cancel all open orders for the authenticated user. Only orders with status "new" or "partially_filled" will be cancelled.</p>
            
            <h4>Headers</h4>
            <ul>
              <li><code>Authorization: Bearer access_token</code> - JWT access token</li>
              <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
            </ul>
            
            <h4>Query Parameters</h4>
            <ul>
              <li><code>symbol</code> (string, optional) - Cancel orders for specific trading pair only (e.g., "BTCUSDT")</li>
              <li><code>side</code> (string, optional) - Cancel orders for specific side only ("buy" or "sell")</li>
              <li><code>type</code> (string, optional) - Cancel orders of specific type only ("market", "limit", "stop", "stop_limit")</li>
            </ul>

            <h4>Example Request</h4>
            <pre class="code-block">DELETE /trading/orders?symbol=BTCUSDT&side=buy
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Fingerprint: 1358cd229b6bceb25941e99f4228997f</pre>

            <h4>Response</h4>
            <div class="response-example">
              <div class="response-status success">200 OK</div>
              <pre class="code-block">{
  "success": true,
  "data": {
    "cancelledOrders": [
      {
        "orderId": "ord_1234567890abcdef",
        "clientOrderId": "my_order_123",
        "symbol": "BTCUSDT",
        "side": "buy",
        "type": "limit",
        "quantity": "0.00100000",
        "price": "45000.00000000",
        "status": "cancelled",
        "cancelledAt": "2024-01-15T14:45:00Z",
        "cancelReason": "user_requested_bulk"
      },
      {
        "orderId": "ord_2345678901bcdefg",
        "clientOrderId": "my_order_124",
        "symbol": "BTCUSDT",
        "side": "buy",
        "type": "limit",
        "quantity": "0.00200000",
        "price": "44500.00000000",
        "status": "cancelled",
        "cancelledAt": "2024-01-15T14:45:00Z",
        "cancelReason": "user_requested_bulk"
      }
    ],
    "summary": {
      "totalOrders": 5,
      "cancelledCount": 2,
      "failedCount": 0,
      "skippedCount": 3,
      "skippedReasons": [
        "already_filled",
        "already_cancelled"
      ]
    }
  },
  "error": null
}</pre>
            </div>

            <div class="response-example">
              <div class="response-status success">200 OK - No Orders</div>
              <pre class="code-block">{
  "success": true,
  "data": {
    "cancelledOrders": [],
    "summary": {
      "totalOrders": 0,
      "cancelledCount": 0,
      "failedCount": 0,
      "skippedCount": 0,
      "message": "No open orders found matching the criteria"
    }
  },
  "error": null
}</pre>
            </div>

            <div class="response-example">
              <div class="response-status error">400 Bad Request</div>
              <pre class="code-block">{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_SYMBOL",
    "message": "Invalid trading symbol",
    "details": {
      "symbol": "Symbol must be in format BASEQUOTE (e.g., BTCUSDT)"
    }
  }
}</pre>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4>Live Testing</h4>
            <div class="test-section">
              <select v-model="cancelAllOrdersData.symbol" class="test-input">
                <option value="">All symbols</option>
                <option value="BTCUSDT">BTCUSDT</option>
                <option value="ETHUSDT">ETHUSDT</option>
                <option value="ADAUSDT">ADAUSDT</option>
              </select>
              <select v-model="cancelAllOrdersData.side" class="test-input">
                <option value="">All sides</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
              <button @click="testCancelAllOrders" class="test-btn">Cancel All Orders</button>
              <div v-if="results.cancelAllOrders" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.cancelAllOrders.status }}</span>
                  <span class="timestamp">{{ results.cancelAllOrders.timestamp }}</span>
                </div>
                <pre class="result-data">{{ results.cancelAllOrders.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const apiToken = ref('')

const orderData = reactive({
  symbol: 'BTCUSDT',
  side: 'buy',
  type: 'limit',
  quantity: '0.001',
  price: '45000.00',
  stopPrice: '',
  timeInForce: 'GTC'
})

const ordersData = reactive({
  symbol: '',
  status: '',
  side: '',
  limit: 50
})

const specificOrderData = reactive({
  orderId: ''
})

const cancelOrderData = reactive({
  orderId: ''
})

const tradesData = reactive({
  symbol: '',
  limit: 50
})

const cancelAllOrdersData = reactive({
  symbol: '',
  side: ''
})

const generateFingerprint = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const results = reactive({
  placeOrder: null,
  orders: null,
  specificOrder: null,
  cancelOrder: null,
  trades: null,
  cancelAllOrders: null
})

const testPlaceOrder = async () => {
  try {
    const requestBody = {
      symbol: orderData.symbol,
      side: orderData.side,
      type: orderData.type,
      quantity: orderData.quantity,
      timeInForce: orderData.timeInForce
    }
    
    if (orderData.price) requestBody.price = orderData.price
    if (orderData.stopPrice) requestBody.stopPrice = orderData.stopPrice
    
    const response = await fetch('https://develop.okd.finance/api/trading/order', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      },
      body: JSON.stringify(requestBody)
    })
    
    const data = await response.text()
    results.placeOrder = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.placeOrder = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testGetOrders = async () => {
  try {
    let endpoint = '/trading/orders'
    const params = new URLSearchParams()
    
    if (ordersData.symbol) params.append('symbol', ordersData.symbol)
    if (ordersData.status) params.append('status', ordersData.status)
    if (ordersData.side) params.append('side', ordersData.side)
    if (ordersData.limit) params.append('limit', ordersData.limit)
    
    if (params.toString()) {
      endpoint += '?' + params.toString()
    }
    
    const response = await fetch(`https://develop.okd.finance/api${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      }
    })
    
    const data = await response.text()
    results.orders = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.orders = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testGetSpecificOrder = async () => {
  try {
    const response = await fetch(`https://develop.okd.finance/api/trading/orders/${specificOrderData.orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      }
    })
    
    const data = await response.text()
    results.specificOrder = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.specificOrder = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testCancelOrder = async () => {
  try {
    const response = await fetch(`https://develop.okd.finance/api/trading/orders/${cancelOrderData.orderId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      }
    })
    
    const data = await response.text()
    results.cancelOrder = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.cancelOrder = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testGetTrades = async () => {
  try {
    let endpoint = '/trading/trades'
    const params = new URLSearchParams()
    
    if (tradesData.symbol) params.append('symbol', tradesData.symbol)
    if (tradesData.limit) params.append('limit', tradesData.limit)
    
    if (params.toString()) {
      endpoint += '?' + params.toString()
    }
    
    const response = await fetch(`https://develop.okd.finance/api${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      }
    })
    
    const data = await response.text()
    results.trades = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.trades = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testCancelAllOrders = async () => {
  try {
    let endpoint = '/trading/orders'
    const params = new URLSearchParams()
    
    if (cancelAllOrdersData.symbol) params.append('symbol', cancelAllOrdersData.symbol)
    if (cancelAllOrdersData.side) params.append('side', cancelAllOrdersData.side)
    
    if (params.toString()) {
      endpoint += '?' + params.toString()
    }
    
    const response = await fetch(`https://develop.okd.finance/api${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      }
    })
    
    const data = await response.text()
    results.cancelAllOrders = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.cancelAllOrders = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}
</script>

<style scoped>
.interactive-api-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.api-docs-column {
  border-right: 1px solid var(--vp-c-border);
  padding-right: 1rem;
}

.auth-section {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.token-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  font-family: monospace;
  margin-bottom: 0.5rem;
}

.token-status {
  color: var(--vp-c-green);
  font-size: 0.9rem;
}

.endpoint-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.nav-link:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}

.documentation-column {
  padding: 0 1rem;
}

.endpoint-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.endpoint-layout {
  display: flex;
  gap: 2rem;
}

.endpoint-docs {
  flex: 1;
  min-width: 0;
  width: 50%;
}

.endpoint-testing {
  flex: 1;
  min-width: 0;
  width: 50%;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.method-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.method-badge.get {
  background: #e3f2fd;
  color: #1976d2;
}

.method-badge.post {
  background: #e8f5e8;
  color: #2e7d32;
}

.method-badge.delete {
  background: #ffebee;
  color: #c62828;
}

.endpoint-path {
  font-family: monospace;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.test-section {
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.endpoint-testing {
  border-left: 1px solid var(--vp-c-border);
  padding-left: 1.5rem;
}

.endpoint-testing h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
  font-size: 1rem;
}

.test-section h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.test-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.test-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  background: var(--vp-c-brand);
  color: white;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.test-btn:hover {
  background: var(--vp-c-brand-light);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.test-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* Dark theme specific button hover */
.dark .test-btn:hover {
  background: var(--vp-c-brand-dark);
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
}

.result-container {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 1rem;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  background: #e8f5e8;
  color: #2e7d32;
}

.timestamp {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.result-data {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
}

.code-block {
  background: var(--vp-code-bg);
  color: var(--vp-code-color);
  padding: 1rem;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.7;
  overflow-x: auto;
  margin: 1rem 0;
}

.response-example {
  margin: 1rem 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  overflow: hidden;
}

.response-status {
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.response-status.success {
  background: #f0f9ff;
  color: #0369a1;
  border-bottom: 1px solid #e0f2fe;
}

.response-status.error {
  background: #fef2f2;
  color: #dc2626;
  border-bottom: 1px solid #fecaca;
}

.response-example .code-block {
  margin: 0;
  border-radius: 0;
  border: none;
}

@media (max-width: 1200px) {
  .interactive-api-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .api-docs-column {
    border: none;
    padding: 0;
  }

  .endpoint-layout {
    flex-direction: column;
    gap: 1rem;
  }

  .endpoint-testing {
    border-left: none;
    border-top: 1px solid var(--vp-c-border);
    padding-left: 0;
    padding-top: 1rem;
  }
}
</style> 