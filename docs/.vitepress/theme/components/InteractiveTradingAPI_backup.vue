<template>
  <!-- Fixed Authentication Header -->
  <div class="auth-header-fixed">
    <div class="auth-container">
      <div class="auth-title">
        <h4>🔐 API Authentication</h4>
      </div>
      <div class="token-input-group">
        <input 
          v-model="apiToken" 
          :type="showToken ? 'text' : 'password'" 
          placeholder="Paste your access token here (without 'Bearer')" 
          class="token-input" 
        />
        <button @click="showToken = !showToken" class="token-toggle" :title="showToken ? 'Hide token' : 'Show token'">
          {{ showToken ? '🙈' : '👁️' }}
        </button>
      </div>
      <div v-if="apiToken" class="token-status">✅ Token configured ({{ apiToken.length }} chars)</div>
      <div class="token-hint">💡 Don't include "Bearer" - it's added automatically</div>
    </div>
  </div>

  <div class="interactive-api-container">
    <!-- Main Documentation and Testing Column -->
    <div class="main-content">
      <section id="place-order" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/trading/order</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">📈 Place Trading Order</h3>
              <p class="endpoint-description">Place a new trading order on the exchange with comprehensive order types and parameters.</p>
            </div>
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            <div class="api-section">
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                <div class="param-item required">
                  <code class="param-name">symbol</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Trading pair symbol (e.g., "BTCUSDT", "ETHUSDT")</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">side</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order side: "buy" or "sell"</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">type</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order type: "market", "limit", "stop", "stop_limit"</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">quantity</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order quantity in base currency</span>
                </div>
                <div class="param-item">
                  <code class="param-name">price</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order price (required for limit orders)</span>
                </div>
                <div class="param-item">
                  <code class="param-name">stopPrice</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Stop price (required for stop orders)</span>
                </div>
                <div class="param-item">
                  <code class="param-name">timeInForce</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Time in force: "GTC", "IOC", "FOK"</span>
                </div>
                <div class="param-item">
                  <code class="param-name">clientOrderId</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Client-generated order ID</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
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
            </div>

            <div class="api-section">
              <h4 class="section-title">✅ Response Examples</h4>
              <div class="response-example">
                <div class="response-status success">200 OK - Success</div>
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
                <div class="response-status error">400 Bad Request - Error</div>
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
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Trading Pair</label>
                <select v-model="orderData.symbol" class="test-input">
                  <option value="BTCUSDT">BTCUSDT</option>
                  <option value="ETHUSDT">ETHUSDT</option>
                  <option value="ADAUSDT">ADAUSDT</option>
                  <option value="DOTUSDT">DOTUSDT</option>
                </select>
              </div>
              <div class="form-group">
                <label>Side</label>
                <select v-model="orderData.side" class="test-input">
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              <div class="form-group">
                <label>Order Type</label>
                <select v-model="orderData.type" class="test-input">
                  <option value="market">Market</option>
                  <option value="limit">Limit</option>
                  <option value="stop">Stop</option>
                  <option value="stop_limit">Stop Limit</option>
                </select>
              </div>
              <div class="form-group">
                <label>Quantity</label>
                <input v-model="orderData.quantity" type="text" placeholder="0.001" class="test-input" />
              </div>
              <div class="form-group">
                <label>Price (for limit orders)</label>
                <input v-model="orderData.price" type="text" placeholder="45000.00" class="test-input" />
              </div>
              <div class="form-group">
                <label>Stop Price (for stop orders)</label>
                <input v-model="orderData.stopPrice" type="text" placeholder="44000.00" class="test-input" />
              </div>
              <div class="form-group">
                <label>Time in Force</label>
                <select v-model="orderData.timeInForce" class="test-input">
                  <option value="GTC">GTC (Good Till Cancelled)</option>
                  <option value="IOC">IOC (Immediate or Cancel)</option>
                  <option value="FOK">FOK (Fill or Kill)</option>
                </select>
              </div>
              <button @click="testPlaceOrder" class="test-btn" :disabled="!apiToken">
                {{ !apiToken ? '🔒 Enter API Token First' : '🚀 Test Request' }}
              </button>
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
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Get Orders</h3>
              <p class="endpoint-description">Retrieve all orders for the authenticated user with optional filtering capabilities.</p>
            </div>
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            <div class="api-section">
              <h4 class="section-title">🔍 Query Parameters</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">symbol</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Filter by trading pair (e.g., "BTCUSDT")</span>
                </div>
                <div class="param-item">
                  <code class="param-name">status</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Filter by status: "new", "partially_filled", "filled", "cancelled", "rejected"</span>
                </div>
                <div class="param-item">
                  <code class="param-name">side</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Filter by side: "buy" or "sell"</span>
                </div>
                <div class="param-item">
                  <code class="param-name">type</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Filter by order type: "market", "limit", "stop", "stop_limit"</span>
                </div>
                <div class="param-item">
                  <code class="param-name">limit</code>
                  <span class="param-type">integer</span>
                  <span class="param-desc">Number of orders to return (default: 50, max: 500)</span>
                </div>
                <div class="param-item">
                  <code class="param-name">offset</code>
                  <span class="param-type">integer</span>
                  <span class="param-desc">Number of orders to skip (default: 0)</span>
                </div>
                <div class="param-item">
                  <code class="param-name">startTime</code>
                  <span class="param-type">integer</span>
                  <span class="param-desc">Start time timestamp (milliseconds)</span>
                </div>
                <div class="param-item">
                  <code class="param-name">endTime</code>
                  <span class="param-type">integer</span>
                  <span class="param-desc">End time timestamp (milliseconds)</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <pre class="code-block">GET /trading/orders?symbol=BTCUSDT&status=filled&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Fingerprint: 1358cd229b6bceb25941e99f4228997f</pre>
            </div>

            <div class="api-section">
              <h4 class="section-title">✅ Response Examples</h4>
              <div class="response-example">
                <div class="response-status success">200 OK - Success</div>
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
        "updatedAt": "2024-01-15T14:35:00Z"
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
                <div class="response-status error">400 Bad Request - Error</div>
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
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Symbol (optional)</label>
                <select v-model="ordersData.symbol" class="test-input">
                  <option value="">All symbols</option>
                  <option value="BTCUSDT">BTCUSDT</option>
                  <option value="ETHUSDT">ETHUSDT</option>
                  <option value="ADAUSDT">ADAUSDT</option>
                </select>
              </div>
              <div class="form-group">
                <label>Status (optional)</label>
                <select v-model="ordersData.status" class="test-input">
                  <option value="">All statuses</option>
                  <option value="new">New</option>
                  <option value="partially_filled">Partially Filled</option>
                  <option value="filled">Filled</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div class="form-group">
                <label>Side (optional)</label>
                <select v-model="ordersData.side" class="test-input">
                  <option value="">All sides</option>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              <div class="form-group">
                <label>Limit</label>
                <input v-model.number="ordersData.limit" type="number" placeholder="50" class="test-input" />
              </div>
              <button @click="testGetOrders" class="test-btn" :disabled="!apiToken">
                {{ !apiToken ? '🔒 Enter API Token First' : '🚀 Test Request' }}
              </button>
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

      <!-- Additional sections would continue here with the same pattern... -->
      
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const apiToken = ref('')
const showToken = ref(false)

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
  orders: null
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
</script>

<style scoped>
/* Fixed Authentication Header */
.auth-header-fixed {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--vp-c-bg);
  border-bottom: 2px solid var(--vp-c-brand);
  padding: 1rem 0;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.auth-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.auth-title h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand);
  font-size: 1.1rem;
}

.token-input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.token-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.token-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.token-toggle {
  padding: 0.75rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.2s;
}

.token-toggle:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.token-status {
  color: var(--vp-c-green);
  font-size: 0.9rem;
  font-weight: 500;
}

.token-hint {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

/* Main Container */
.interactive-api-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.main-content {
  width: 100%;
}

.endpoint-section {
  margin-bottom: 4rem;
  padding-bottom: 3rem;
  border-bottom: 2px solid var(--vp-c-border);
}

.endpoint-layout {
  display: flex;
  gap: 3rem;
}

.endpoint-docs {
  flex: 1;
  min-width: 0;
}

.endpoint-testing {
  flex: 0 0 400px;
  border-left: 2px solid var(--vp-c-border);
  padding-left: 2rem;
}

/* Method Header */
.method-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.method-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.method-badge.get {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  color: #1976d2;
  border: 2px solid #1976d2;
}

.method-badge.post {
  background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
  color: #2e7d32;
  border: 2px solid #2e7d32;
}

.method-badge.delete {
  background: linear-gradient(135deg, #ffebee, #ffcdd2);
  color: #c62828;
  border: 2px solid #c62828;
}

.endpoint-path {
  font-family: var(--vp-font-family-mono);
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

/* Endpoint Info */
.endpoint-info {
  margin-bottom: 2rem;
}

.endpoint-title {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.endpoint-description {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* API Sections */
.api-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.param-list {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
}

.param-item {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--vp-c-border-soft);
}

.param-item:last-child {
  border-bottom: none;
}

.param-item.required .param-name::after {
  content: " *";
  color: #ff4444;
  font-weight: bold;
}

.param-name {
  font-family: var(--vp-font-family-mono);
  font-weight: bold;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.param-type {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-border);
}

.param-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Code Blocks */
.code-block {
  background: var(--vp-code-bg);
  color: var(--vp-code-color);
  padding: 1.5rem;
  border-radius: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid var(--vp-c-border);
}

/* Response Examples */
.response-example {
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.response-status {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.response-status.success {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  color: #0369a1;
  border-bottom: 1px solid #0369a1;
}

.response-status.success::before {
  content: "✅";
}

.response-status.error {
  background: linear-gradient(135deg, #fef2f2, #fecaca);
  color: #dc2626;
  border-bottom: 1px solid #dc2626;
}

.response-status.error::before {
  content: "❌";
}

.response-example .code-block {
  margin: 0;
  border-radius: 0;
  border: none;
}

/* Testing Panel */
.testing-title {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-brand);
  font-size: 1.1rem;
}

.test-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-border);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.test-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.test-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.test-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  color: white;
  margin-top: 1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.test-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #1976d2, #42a5f5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4);
}

.test-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.4);
}

.test-btn:disabled {
  background: var(--vp-c-text-3);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Dark theme button adjustments */
.dark .test-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--vp-c-brand-dark), var(--vp-c-brand));
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

.result-container {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid var(--vp-c-border);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green);
}

.timestamp {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  font-family: var(--vp-font-family-mono);
}

.result-data {
  background: var(--vp-code-bg);
  padding: 1rem;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
  color: var(--vp-code-color);
  max-height: 300px;
  overflow-y: auto;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .endpoint-layout {
    flex-direction: column;
    gap: 2rem;
  }

  .endpoint-testing {
    flex: none;
    border-left: none;
    border-top: 2px solid var(--vp-c-border);
    padding-left: 0;
    padding-top: 2rem;
  }
  
  .param-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

@media (max-width: 768px) {
  .auth-header-fixed {
    padding: 0.75rem 0;
  }
  
  .token-input-group {
    flex-direction: column;
  }
  
  .interactive-api-container {
    padding: 0 0.5rem;
  }
  
  .endpoint-layout {
    gap: 1.5rem;
  }
}
</style> 