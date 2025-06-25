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
        <a href="#get-trades" class="nav-link">GET Trade History</a>
      </div>
    </div>

    <!-- Column 2: Documentation -->
    <div class="documentation-column">
      <section id="place-order" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge post">POST</span>
          <span class="endpoint-path">/trading/order</span>
        </div>
        <h3>Place Trading Order</h3>
        <p>Place a new trading order.</p>
        
        <h4>Body Parameters</h4>
        <ul>
          <li><code>symbol</code> (string, required) - Trading pair symbol (e.g., "BTCUSDT")</li>
          <li><code>side</code> (string, required) - Order side ("buy" or "sell")</li>
          <li><code>type</code> (string, required) - Order type ("market", "limit", "stop", "stop_limit")</li>
          <li><code>quantity</code> (string, required) - Order quantity</li>
          <li><code>price</code> (string, optional) - Order price (required for limit orders)</li>
          <li><code>stopPrice</code> (string, optional) - Stop price (required for stop orders)</li>
          <li><code>timeInForce</code> (string, optional) - Time in force ("GTC", "IOC", "FOK")</li>
        </ul>
      </section>

      <section id="get-orders" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/trading/orders</span>
        </div>
        <h3>Get Orders</h3>
        <p>Get all orders for the authenticated user.</p>
        
        <h4>Query Parameters</h4>
        <ul>
          <li><code>symbol</code> (string, optional) - Filter by trading pair</li>
          <li><code>status</code> (string, optional) - Filter by status (open, filled, cancelled)</li>
          <li><code>side</code> (string, optional) - Filter by side (buy, sell)</li>
          <li><code>limit</code> (integer, optional) - Number of orders to return (default: 50)</li>
        </ul>
      </section>

      <section id="get-order" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/trading/orders/{orderId}</span>
        </div>
        <h3>Get Specific Order</h3>
        <p>Get details of a specific order.</p>
        
        <h4>Path Parameters</h4>
        <ul>
          <li><code>orderId</code> (string, required) - Order ID</li>
        </ul>
      </section>

      <section id="cancel-order" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge delete">DELETE</span>
          <span class="endpoint-path">/trading/orders/{orderId}</span>
        </div>
        <h3>Cancel Order</h3>
        <p>Cancel a specific order.</p>
        
        <h4>Path Parameters</h4>
        <ul>
          <li><code>orderId</code> (string, required) - Order ID</li>
        </ul>
      </section>

      <section id="get-trades" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/trading/trades</span>
        </div>
        <h3>Get Trade History</h3>
        <p>Get trade history for the authenticated user.</p>
        
        <h4>Query Parameters</h4>
        <ul>
          <li><code>symbol</code> (string, optional) - Filter by trading pair</li>
          <li><code>orderId</code> (string, optional) - Filter by order ID</li>
          <li><code>limit</code> (integer, optional) - Number of trades to return (default: 50)</li>
        </ul>
      </section>
    </div>

    <!-- Column 3: Testing -->
    <div class="testing-column">
      <h3>Live Testing</h3>
      
      <div class="test-section">
        <h4>POST Place Order</h4>
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

      <div class="test-section">
        <h4>GET Orders</h4>
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

      <div class="test-section">
        <h4>GET Specific Order</h4>
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

      <div class="test-section">
        <h4>DELETE Cancel Order</h4>
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

      <div class="test-section">
        <h4>GET Trade History</h4>
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
  trades: null
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
</script>

<style scoped>
.interactive-api-container {
  display: grid;
  grid-template-columns: 250px 1fr 350px;
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
  padding: 0 2rem;
}

.endpoint-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-border);
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

.testing-column {
  border-left: 1px solid var(--vp-c-border);
  padding-left: 2rem;
}

.test-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
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
}

.test-btn:hover {
  background: var(--vp-c-brand-dark);
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

@media (max-width: 1200px) {
  .interactive-api-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .api-docs-column,
  .testing-column {
    border: none;
    padding: 0;
  }
}
</style> 