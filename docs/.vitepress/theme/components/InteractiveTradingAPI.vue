<template>
  <!-- Fixed Authentication Header -->
  <div class="auth-header-fixed">
    <div class="auth-container">
      <div class="auth-title">
        <h4>🔐 API Authentication</h4>
      </div>
      <div class="api-config-row">
        <div class="config-group">
          <label class="config-label">🌐 API Base URL</label>
          <input 
            v-model="apiBaseUrl" 
            type="text" 
            placeholder="https://develop.okd.finance/api" 
            class="config-input" 
          />
        </div>
        <div class="config-group token-group">
          <label class="config-label">🔑 Access Token</label>
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
        </div>
      </div>
      <div class="status-row">
        <div v-if="apiBaseUrl" class="url-status">🌐 API: {{ apiBaseUrl }}</div>
        <div v-if="apiToken" class="token-status">✅ Token configured ({{ apiToken.length }} chars)</div>
      </div>
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
              <span class="endpoint-path">/spot/orders</span>
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
                  <code class="param-name">category</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Trading category: "spot"</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">symbol</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Trading pair symbol (e.g., "BNBETH", "ETHUSDT")</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">side</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order side: "Buy" or "Sell"</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">orderType</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order type: "Market" or "Limit"</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">qty</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order quantity in base currency</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">price</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order price (required for limit orders)</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <pre class="code-block">POST /spot/orders
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Fingerprint: 1358cd229b6bceb25941e99f4228997f

{
  "category": "spot",
  "symbol": "BNBETH",
  "side": "Buy",
  "orderType": "Limit",
  "qty": "2",
  "price": "0.2"
}</pre>
            </div>

            <div class="api-section">
              <h4 class="section-title">✅ Response Examples</h4>
              <div class="response-example">
                <div class="response-status success">200 OK - Success</div>
                <pre class="code-block">{
  "orderId": "1980690610151328512",
  "orderLinkId": "1980690610151328513"
}</pre>
              </div>

              <div class="response-example">
                <div class="response-status error">400 Bad Request - Error</div>
                <pre class="code-block">{
  "code": 400591,
  "message": "unknown category"
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
                  <option value="BNBETH">BNBETH</option>
                  <option value="ETHUSDT">ETHUSDT</option>
                  <option value="ADAUSDT">ADAUSDT</option>
                  <option value="DOTUSDT">DOTUSDT</option>
                </select>
              </div>
              <div class="form-group">
                <label>Category</label>
                <select v-model="orderData.category" class="test-input">
                  <option value="spot">Spot</option>
                </select>
              </div>
              <div class="form-group">
                <label>Side</label>
                <select v-model="orderData.side" class="test-input">
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </select>
              </div>
              <div class="form-group">
                <label>Order Type</label>
                <select v-model="orderData.orderType" class="test-input">
                  <option value="Market">Market</option>
                  <option value="Limit">Limit</option>
                </select>
              </div>
              <div class="form-group">
                <label>Quantity</label>
                <input v-model="orderData.qty" type="text" placeholder="2" class="test-input" />
              </div>
              <div class="form-group">
                <label>Price</label>
                <input v-model="orderData.price" type="text" placeholder="0.2" class="test-input" />
              </div>
              <button @click="testPlaceOrder" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.placeOrder" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.placeOrder.status }}</span>
                  <span class="timestamp">{{ results.placeOrder.timestamp }}</span>
                  <button @click="copyToClipboard(results.placeOrder.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.placeOrder.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.placeOrder.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.placeOrder.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.placeOrder.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
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
              <span class="endpoint-path">/spot/orders/open</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Get Open Orders</h3>
              <p class="endpoint-description">Retrieve all active (open) orders for the authenticated user with optional filtering capabilities.</p>
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
                <div class="param-item required">
                  <code class="param-name">category</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Trading category: "spot"</span>
                </div>
                <div class="param-item">
                  <code class="param-name">symbol</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Filter by trading pair (e.g., "BNBETH")</span>
                </div>
                <div class="param-item">
                  <code class="param-name">limit</code>
                  <span class="param-type">integer</span>
                  <span class="param-desc">Number of orders to return (default: 50, max: 500)</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <pre class="code-block">GET /spot/orders/open?category=spot&symbol=BNBETH&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Fingerprint: 1358cd229b6bceb25941e99f4228997f</pre>
            </div>

            <div class="api-section">
              <h4 class="section-title">✅ Response Examples</h4>
              <div class="response-example">
                <div class="response-status success">200 OK - Success</div>
                <pre class="code-block">{
  "category": "spot",
  "nextPageCursor": "1980696465315826432%3A1750853418446%2C1980675399004556032%3A1750850907146",
  "list": [
    {
      "orderId": "1980696465315826432",
      "orderLinkId": "1980696465315826433",
      "blockTradeId": "",
      "symbol": "BNBETH",
      "price": "0.2",
      "qty": "1.00",
      "side": "Buy",
      "isLeverage": "0",
      "positionIdx": 0,
      "orderStatus": "New",
      "createType": "",
      "cancelType": "UNKNOWN",
      "rejectReason": "EC_NoError",
      "avgPrice": "0.0",
      "leavesQty": "1",
      "leavesValue": "0.200",
      "cumExecQty": "0",
      "cumExecValue": "0.000",
      "cumExecFee": "0",
      "timeInForce": "GTC",
      "orderType": "Limit",
      "triggerPrice": "0.0",
      "takeProfit": "0",
      "stopLoss": "0",
      "basePrice": "0.2",
      "reduceOnly": false,
      "closeOnTrigger": false,
      "smpType": "None",
      "smpGroup": 0,
      "smpOrderId": "",
      "createdTime": "1750853418446",
      "updatedTime": "1750853418450",
      "baseCoin": "BNB",
      "quoteCoin": "ETH"
    }
  ]
}</pre>
              </div>

              <div class="response-example">
                <div class="response-status error">400 Bad Request - Error</div>
                <pre class="code-block">{
  "code": 400591,
  "message": "unknown category"
}</pre>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Category</label>
                <select v-model="ordersData.category" class="test-input">
                  <option value="spot">Spot</option>
                </select>
              </div>
              <div class="form-group">
                <label>Symbol (optional)</label>
                <select v-model="ordersData.symbol" class="test-input">
                  <option value="">All symbols</option>
                  <option value="BNBETH">BNBETH</option>
                  <option value="ETHUSDT">ETHUSDT</option>
                  <option value="ADAUSDT">ADAUSDT</option>
                </select>
              </div>
              <div class="form-group">
                <label>Limit</label>
                <input v-model.number="ordersData.limit" type="number" placeholder="50" class="test-input" />
              </div>
              <button @click="testGetOrders" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.orders" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.orders.status }}</span>
                  <span class="timestamp">{{ results.orders.timestamp }}</span>
                  <button @click="copyToClipboard(results.orders.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.orders.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.orders.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.orders.headers }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.orders.data }}</pre>
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
const showToken = ref(false)
const apiBaseUrl = ref('https://develop.okd.finance/api')

const orderData = reactive({
  category: 'spot',
  symbol: 'BNBETH',
  side: 'Buy',
  orderType: 'Limit',
  qty: '2',
  price: '0.2'
})

const ordersData = reactive({
  symbol: '',
  limit: 50,
  category: 'spot'
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
      category: orderData.category,
      symbol: orderData.symbol,
      side: orderData.side,
      orderType: orderData.orderType,
      qty: orderData.qty,
      price: orderData.price
    }
    
    const fullUrl = `${apiBaseUrl.value}/spot/orders`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    const bodyString = JSON.stringify(requestBody)
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: headers,
      body: bodyString
    })
    
    const data = await response.text()
    results.placeOrder = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.placeOrder = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testGetOrders = async () => {
  try {
    let endpoint = '/spot/orders/open'
    const params = new URLSearchParams()
    
    if (ordersData.symbol) params.append('symbol', ordersData.symbol)
    if (ordersData.limit) params.append('limit', ordersData.limit)
    if (ordersData.category) params.append('category', ordersData.category)
    
    if (params.toString()) {
      endpoint += '?' + params.toString()
    }
    
    const fullUrl = `${apiBaseUrl.value}${endpoint}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.orders = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.orders = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const copyToClipboard = (text, event) => {
  navigator.clipboard.writeText(text).then(() => {
    const button = event.target
    const originalText = button.textContent
    button.textContent = '✅ Copied!'
    button.style.background = 'linear-gradient(135deg, #4caf50, #45a049)'
    setTimeout(() => {
      button.textContent = originalText
      button.style.background = ''
    }, 2000)
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    const button = event.target
    const originalText = button.textContent
    button.textContent = '✅ Copied!'
    button.style.background = 'linear-gradient(135deg, #4caf50, #45a049)'
    setTimeout(() => {
      button.textContent = originalText
      button.style.background = ''
    }, 2000)
  })
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
  padding: 0.65rem 0;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.auth-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.auth-title h4 {
  margin: 0 0 0.65rem 0;
  color: var(--vp-c-brand);
  font-size: 1rem;
}

.api-config-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 0.65rem;
}

.config-group {
  display: flex;
  flex-direction: column;
}

.config-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.config-input {
  padding: 0.75rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.config-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.token-input-group {
  display: flex;
  gap: 0.5rem;
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

.status-row {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.url-status {
  color: var(--vp-c-brand);
  font-size: 0.85rem;
  font-weight: 500;
  font-family: monospace;
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
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
  background: linear-gradient(135deg, #1976d2, #1565c0);
  color: white;
  margin-top: 1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
}

.test-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #0d47a1, #1565c0);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(13, 71, 161, 0.6);
}

.test-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(13, 71, 161, 0.4);
}

.test-btn:disabled {
  background: var(--vp-c-text-3);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Dark theme button adjustments */
.dark .test-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #1565c0, #1976d2);
  box-shadow: 0 8px 25px rgba(21, 101, 192, 0.7);
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
  gap: 1rem;
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

.copy-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #6c757d, #5a6268);
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.copy-btn:hover {
  background: linear-gradient(135deg, #5a6268, #495057);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.4);
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

.request-info {
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-brand);
}

.request-info h5 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.request-data {
  background: var(--vp-code-bg);
  padding: 0.75rem;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0 0 1rem 0;
  color: var(--vp-code-color);
  max-height: 150px;
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
  
  .api-config-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .status-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
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