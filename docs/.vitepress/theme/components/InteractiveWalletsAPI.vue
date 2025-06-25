<template>
  <div class="interactive-api-container">
    <!-- Column 1: Navigation -->
    <div class="api-docs-column">
      <h2>Wallets API</h2>
      
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
        <a href="#get-balances" class="nav-link">GET All Balances</a>
        <a href="#get-balance" class="nav-link">GET Specific Balance</a>
        <a href="#generate-address" class="nav-link">POST Generate Address</a>
        <a href="#get-addresses" class="nav-link">GET Addresses</a>
        <a href="#get-deposits" class="nav-link">GET Deposits</a>
      </div>
    </div>

    <!-- Column 2: Documentation -->
    <div class="documentation-column">
      <section id="get-balances" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/wallets/balance</span>
        </div>
        <h3>Get All Balances</h3>
        <p>Retrieves all wallet balances for the authenticated user.</p>
        
        <h4>Headers</h4>
        <ul>
          <li><code>Authorization: Bearer access_token</code> - JWT access token</li>
          <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
        </ul>

        <h4>Example Request</h4>
        <pre class="code-block">GET /wallets/balance
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Fingerprint: 1358cd229b6bceb25941e99f4228997f</pre>

        <h4>Response</h4>
        <div class="response-example">
          <div class="response-status success">200 OK</div>
          <pre class="code-block">{
  "success": true,
  "data": {
    "balances": [
      {
        "currency": "BTC",
        "available": "0.54320000",
        "locked": "0.00000000",
        "total": "0.54320000",
        "valueUSD": "23456.78"
      },
      {
        "currency": "ETH",
        "available": "12.34560000",
        "locked": "2.10000000",
        "total": "14.44560000",
        "valueUSD": "28901.23"
      },
      {
        "currency": "USDT",
        "available": "1000.00000000",
        "locked": "500.00000000",
        "total": "1500.00000000",
        "valueUSD": "1500.00"
      }
    ],
    "totalValueUSD": "53857.01",
    "lastUpdated": "2024-01-15T14:30:00Z"
  },
  "error": null
}</pre>
        </div>
      </section>

      <section id="get-balance" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/wallets/balance/{currency}</span>
        </div>
        <h3>Get Specific Balance</h3>
        <p>Get balance for a specific currency.</p>
        
        <h4>Path Parameters</h4>
        <ul>
          <li><code>currency</code> (string, required) - Currency code (BTC, ETH, USDT, etc.)</li>
        </ul>
      </section>

      <section id="generate-address" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge post">POST</span>
          <span class="endpoint-path">/wallets/address</span>
        </div>
        <h3>Generate Deposit Address</h3>
        <p>Generate a new deposit address for a specific currency.</p>
        
        <h4>Headers</h4>
        <ul>
          <li><code>Authorization: Bearer access_token</code> - JWT access token</li>
          <li><code>Content-Type: application/json</code></li>
          <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
        </ul>
        
        <h4>Body Parameters</h4>
        <ul>
          <li><code>currency</code> (string, required) - Currency code (BTC, ETH, USDT, etc.)</li>
          <li><code>label</code> (string, optional) - Address label for identification</li>
          <li><code>network</code> (string, optional) - Network type (for multi-network currencies like USDT)</li>
        </ul>

        <h4>Example Request</h4>
        <pre class="code-block">POST /wallets/address
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Fingerprint: 1358cd229b6bceb25941e99f4228997f

{
  "currency": "BTC",
  "label": "Main deposit address",
  "network": "bitcoin"
}</pre>

        <h4>Response</h4>
        <div class="response-example">
          <div class="response-status success">200 OK</div>
          <pre class="code-block">{
  "success": true,
  "data": {
    "id": "addr_1234567890abcdef",
    "currency": "BTC",
    "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "label": "Main deposit address",
    "network": "bitcoin",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "createdAt": "2024-01-15T14:30:00Z",
    "isActive": true
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
    "code": "UNSUPPORTED_CURRENCY",
    "message": "Currency BTC is not supported for address generation"
  }
}</pre>
        </div>
      </section>

      <section id="get-addresses" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/wallets/addresses</span>
        </div>
        <h3>Get All Addresses</h3>
        <p>Get all deposit addresses for the authenticated user.</p>
        
        <h4>Query Parameters</h4>
        <ul>
          <li><code>currency</code> (string, optional) - Filter by currency</li>
          <li><code>limit</code> (integer, optional) - Number of addresses to return (default: 50)</li>
          <li><code>offset</code> (integer, optional) - Number of addresses to skip (default: 0)</li>
        </ul>
      </section>

      <section id="get-deposits" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/wallets/deposits</span>
        </div>
        <h3>Get Deposits</h3>
        <p>Get deposit history for the authenticated user.</p>
        
        <h4>Query Parameters</h4>
        <ul>
          <li><code>currency</code> (string, optional) - Filter by currency</li>
          <li><code>status</code> (string, optional) - Filter by status (pending, confirmed, failed)</li>
          <li><code>limit</code> (integer, optional) - Number of deposits to return (default: 50)</li>
        </ul>
      </section>
    </div>

    <!-- Column 3: Testing -->
    <div class="testing-column">
      <h3>Live Testing</h3>
      
      <div class="test-section">
        <h4>GET All Balances</h4>
        <button @click="testGetAllBalances" class="test-btn">Test Request</button>
        <div v-if="results.allBalances" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.allBalances.status }}</span>
            <span class="timestamp">{{ results.allBalances.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.allBalances.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>GET Specific Balance</h4>
        <select v-model="balanceData.currency" class="test-input">
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="USDC">USDC</option>
        </select>
        <button @click="testGetBalance" class="test-btn">Test Request</button>
        <div v-if="results.balance" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.balance.status }}</span>
            <span class="timestamp">{{ results.balance.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.balance.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>POST Generate Address</h4>
        <select v-model="addressData.currency" class="test-input">
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="USDC">USDC</option>
        </select>
        <input v-model="addressData.label" type="text" placeholder="Label (optional)" class="test-input" />
        <button @click="testGenerateAddress" class="test-btn">Test Request</button>
        <div v-if="results.generateAddress" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.generateAddress.status }}</span>
            <span class="timestamp">{{ results.generateAddress.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.generateAddress.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>GET Addresses</h4>
        <select v-model="addressesData.currency" class="test-input">
          <option value="">All currencies</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="USDC">USDC</option>
        </select>
        <input v-model.number="addressesData.limit" type="number" placeholder="Limit (50)" class="test-input" />
        <button @click="testGetAddresses" class="test-btn">Test Request</button>
        <div v-if="results.addresses" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.addresses.status }}</span>
            <span class="timestamp">{{ results.addresses.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.addresses.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>GET Deposits</h4>
        <select v-model="depositsData.currency" class="test-input">
          <option value="">All currencies</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
        </select>
        <select v-model="depositsData.status" class="test-input">
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="failed">Failed</option>
        </select>
        <input v-model.number="depositsData.limit" type="number" placeholder="Limit (50)" class="test-input" />
        <button @click="testGetDeposits" class="test-btn">Test Request</button>
        <div v-if="results.deposits" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.deposits.status }}</span>
            <span class="timestamp">{{ results.deposits.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.deposits.data }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const apiToken = ref('')

const balanceData = reactive({
  currency: 'BTC'
})

const addressData = reactive({
  currency: 'BTC',
  label: ''
})

const addressesData = reactive({
  currency: '',
  limit: 50
})

const depositsData = reactive({
  currency: '',
  status: '',
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
  allBalances: null,
  balance: null,
  generateAddress: null,
  addresses: null,
  deposits: null
})

const testGetAllBalances = async () => {
  try {
    const response = await fetch('https://develop.okd.finance/api/wallets/balance', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      }
    })
    
    const data = await response.text()
    results.allBalances = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.allBalances = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testGetBalance = async () => {
  try {
    const response = await fetch(`https://develop.okd.finance/api/wallets/balance/${balanceData.currency}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      }
    })
    
    const data = await response.text()
    results.balance = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.balance = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testGenerateAddress = async () => {
  try {
    const requestBody = {
      currency: addressData.currency
    }
    
    if (addressData.label) {
      requestBody.label = addressData.label
    }
    
    const response = await fetch('https://develop.okd.finance/api/wallets/address', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      },
      body: JSON.stringify(requestBody)
    })
    
    const data = await response.text()
    results.generateAddress = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.generateAddress = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testGetAddresses = async () => {
  try {
    let endpoint = '/wallets/addresses'
    const params = new URLSearchParams()
    
    if (addressesData.currency) params.append('currency', addressesData.currency)
    if (addressesData.limit) params.append('limit', addressesData.limit)
    
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
    results.addresses = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.addresses = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testGetDeposits = async () => {
  try {
    let endpoint = '/wallets/deposits'
    const params = new URLSearchParams()
    
    if (depositsData.currency) params.append('currency', depositsData.currency)
    if (depositsData.status) params.append('status', depositsData.status)
    if (depositsData.limit) params.append('limit', depositsData.limit)
    
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
    results.deposits = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.deposits = {
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
  
  .api-docs-column,
  .testing-column {
    border: none;
    padding: 0;
  }
}
</style> 