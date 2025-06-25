<template>
  <div class="trading-tester">
    <!-- API Configuration -->
    <div class="api-key-config">
      <h3>📈 Trading API Testing</h3>
      
      <div class="config-row">
        <div class="config-group">
          <label class="config-label">🌐 API Base URL</label>
          <input 
            v-model="API_BASE" 
            type="text" 
            placeholder="https://develop.okd.finance/api" 
            class="api-url-input"
            @input="saveApiConfig"
          />
        </div>
        
        <div class="config-group">
          <label class="config-label">🔑 API Key</label>
          <div class="key-input-group">
            <input 
              v-model="apiKey" 
              type="password" 
              placeholder="Enter your API key (JWT token)" 
              class="api-key-input"
              @input="saveApiConfig"
            />
            <button @click="toggleApiKeyVisibility" class="toggle-key-btn">
              {{ showApiKey ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>
      </div>
      
      <div class="api-status-row">
        <div class="url-status">
          🌐 API: {{ API_BASE || 'Not set' }}
        </div>
        <div class="key-status">
          <span v-if="apiKey" style="color: var(--vp-c-green);">✅ API Key configured ({{ apiKey.length }} chars)</span>
          <span v-else style="color: var(--vp-c-red);">❌ API Key required</span>
        </div>
      </div>
    </div>

    <!-- Place Order -->
    <div class="api-endpoint">
      <h3>📋 Place Trading Order</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="order-symbol">Symbol:</label>
          <select v-model="orderData.symbol" id="order-symbol">
            <option value="BTCUSDT">BTCUSDT</option>
            <option value="ETHUSDT">ETHUSDT</option>
            <option value="ADAUSDT">ADAUSDT</option>
            <option value="DOTUSDT">DOTUSDT</option>
          </select>
          <label for="order-side">Side:</label>
          <select v-model="orderData.side" id="order-side">
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <label for="order-type">Type:</label>
          <select v-model="orderData.type" id="order-type">
            <option value="market">Market</option>
            <option value="limit">Limit</option>
            <option value="stop">Stop</option>
            <option value="stop_limit">Stop Limit</option>
          </select>
          <label for="order-quantity">Quantity:</label>
          <input v-model="orderData.quantity" type="text" id="order-quantity" placeholder="0.001" />
          <label for="order-price">Price (for limit orders):</label>
          <input v-model="orderData.price" type="text" id="order-price" placeholder="45000.00" />
          <label for="order-stop-price">Stop Price (for stop orders):</label>
          <input v-model="orderData.stopPrice" type="text" id="order-stop-price" placeholder="44000.00" />
          <label for="order-time-in-force">Time in Force:</label>
          <select v-model="orderData.timeInForce" id="order-time-in-force">
            <option value="GTC">GTC (Good Till Cancelled)</option>
            <option value="IOC">IOC (Immediate or Cancel)</option>
            <option value="FOK">FOK (Fill or Kill)</option>
          </select>
          <div class="button-group">
            <button @click="testPlaceOrder" class="test-button" :disabled="!apiKey">Place Order</button>
            <button @click="copyCurlPlaceOrder" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="placeOrderResults"></div>
      </div>
    </div>

    <!-- Get Orders -->
    <div class="api-endpoint">
      <h3>📊 Get Orders</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="orders-symbol">Symbol (optional):</label>
          <select v-model="ordersData.symbol" id="orders-symbol">
            <option value="">All symbols</option>
            <option value="BTCUSDT">BTCUSDT</option>
            <option value="ETHUSDT">ETHUSDT</option>
            <option value="ADAUSDT">ADAUSDT</option>
            <option value="DOTUSDT">DOTUSDT</option>
          </select>
          <label for="orders-status">Status (optional):</label>
          <select v-model="ordersData.status" id="orders-status">
            <option value="">All statuses</option>
            <option value="open">Open</option>
            <option value="filled">Filled</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <label for="orders-side">Side (optional):</label>
          <select v-model="ordersData.side" id="orders-side">
            <option value="">All sides</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <label for="orders-limit">Limit:</label>
          <input v-model.number="ordersData.limit" type="number" id="orders-limit" placeholder="50" min="1" max="100" />
          <div class="button-group">
            <button @click="testGetOrders" class="test-button" :disabled="!apiKey">Get Orders</button>
            <button @click="copyCurlGetOrders" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="ordersResults"></div>
      </div>
    </div>

    <!-- Get Specific Order -->
    <div class="api-endpoint">
      <h3>🔍 Get Specific Order</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="specific-order-id">Order ID:</label>
          <input v-model="specificOrderData.orderId" type="text" id="specific-order-id" placeholder="order_123456" />
          <div class="button-group">
            <button @click="testGetSpecificOrder" class="test-button" :disabled="!apiKey || !specificOrderData.orderId">Get Order</button>
            <button @click="copyCurlGetSpecificOrder" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="specificOrderResults"></div>
      </div>
    </div>

    <!-- Cancel Order -->
    <div class="api-endpoint">
      <h3>❌ Cancel Order</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="cancel-order-id">Order ID:</label>
          <input v-model="cancelOrderData.orderId" type="text" id="cancel-order-id" placeholder="order_123456" />
          <div class="button-group">
            <button @click="testCancelOrder" class="test-button" :disabled="!apiKey || !cancelOrderData.orderId">Cancel Order</button>
            <button @click="copyCurlCancelOrder" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="cancelOrderResults"></div>
      </div>
    </div>

    <!-- Cancel All Orders -->
    <div class="api-endpoint">
      <h3>🗑️ Cancel All Orders</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="cancel-all-symbol">Symbol (optional):</label>
          <select v-model="cancelAllData.symbol" id="cancel-all-symbol">
            <option value="">All symbols</option>
            <option value="BTCUSDT">BTCUSDT</option>
            <option value="ETHUSDT">ETHUSDT</option>
            <option value="ADAUSDT">ADAUSDT</option>
            <option value="DOTUSDT">DOTUSDT</option>
          </select>
          <div class="button-group">
            <button @click="testCancelAllOrders" class="test-button" :disabled="!apiKey">Cancel All Orders</button>
            <button @click="copyCurlCancelAllOrders" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="cancelAllOrdersResults"></div>
      </div>
    </div>

    <!-- Get Trades -->
    <div class="api-endpoint">
      <h3>💹 Get Trade History</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="trades-symbol">Symbol (optional):</label>
          <select v-model="tradesData.symbol" id="trades-symbol">
            <option value="">All symbols</option>
            <option value="BTCUSDT">BTCUSDT</option>
            <option value="ETHUSDT">ETHUSDT</option>
            <option value="ADAUSDT">ADAUSDT</option>
            <option value="DOTUSDT">DOTUSDT</option>
          </select>
          <label for="trades-limit">Limit:</label>
          <input v-model.number="tradesData.limit" type="number" id="trades-limit" placeholder="50" min="1" max="100" />
          <div class="button-group">
            <button @click="testGetTrades" class="test-button" :disabled="!apiKey">Get Trades</button>
            <button @click="copyCurlGetTrades" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="tradesResults"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradingTester',
  data() {
    return {
      apiKey: '',
      showApiKey: false,
      API_BASE: 'https://develop.okd.finance/api',
      orderData: {
        symbol: 'BTCUSDT',
        side: 'buy',
        type: 'limit',
        quantity: '0.001',
        price: '45000.00',
        stopPrice: '',
        timeInForce: 'GTC'
      },
      ordersData: {
        symbol: '',
        status: '',
        side: '',
        limit: 50
      },
      specificOrderData: {
        orderId: ''
      },
      cancelOrderData: {
        orderId: ''
      },
      cancelAllData: {
        symbol: ''
      },
      tradesData: {
        symbol: '',
        limit: 50
      }
    }
  },
  mounted() {
    const savedKey = localStorage.getItem('okd_api_key');
    const savedUrl = localStorage.getItem('okd_api_base_url');
    if (savedKey) {
      this.apiKey = savedKey;
    }
    if (savedUrl) {
      this.API_BASE = savedUrl;
    }
  },
  methods: {
    saveApiConfig() {
      localStorage.setItem('okd_api_key', this.apiKey);
      localStorage.setItem('okd_api_base_url', this.API_BASE);
    },
    
    toggleApiKeyVisibility() {
      this.showApiKey = !this.showApiKey;
      const input = this.$el.querySelector('.api-key-input');
      input.type = this.showApiKey ? 'text' : 'password';
    },

    generateFingerprint() {
      const chars = '0123456789abcdef';
      let result = '';
      for (let i = 0; i < 32; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      return result;
    },

    async makeApiRequest(endpoint, options = {}) {
      if (!this.apiKey) {
        return { error: 'Please set your API key first' };
      }
      
      const url = `${this.API_BASE}${endpoint}`;
      const defaultOptions = {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        }
      };
      
      const requestOptions = {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers
        }
      };
      
      try {
        const response = await fetch(url, requestOptions);
        const data = await response.text();
        
        return {
          status: response.status,
          statusText: response.statusText,
          data: data,
          success: response.ok
        };
      } catch (error) {
        return {
          error: error.message,
          status: 0,
          statusText: 'Network Error'
        };
      }
    },

    displayResults(container, result) {
      if (!container) return;
      
      const isSuccess = result.success && !result.error;
      const statusClass = isSuccess ? 'success' : 'error';
      
      container.innerHTML = `
        <div class="api-result ${statusClass}">
          <div class="result-status">
            <span class="status-badge ${statusClass}">
              ${result.status || 'ERROR'} ${result.statusText || ''}
            </span>
            <span class="timestamp">${new Date().toLocaleTimeString()}</span>
          </div>
          <pre class="result-data">${result.data || JSON.stringify(result, null, 2)}</pre>
        </div>
      `;
    },

    async testPlaceOrder() {
      const requestBody = {
        symbol: this.orderData.symbol,
        side: this.orderData.side,
        type: this.orderData.type,
        quantity: this.orderData.quantity,
        timeInForce: this.orderData.timeInForce
      };
      
      if (this.orderData.price) requestBody.price = this.orderData.price;
      if (this.orderData.stopPrice) requestBody.stopPrice = this.orderData.stopPrice;
      
      const result = await this.makeApiRequest('/spot/orders', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      });
      
      this.displayResults(this.$refs.placeOrderResults, result);
    },

    async testGetOrders() {
      let endpoint = '/spot/orders';
      const params = new URLSearchParams();
      
      if (this.ordersData.symbol) params.append('symbol', this.ordersData.symbol);
      if (this.ordersData.status) params.append('status', this.ordersData.status);
      if (this.ordersData.side) params.append('side', this.ordersData.side);
      if (this.ordersData.limit) params.append('limit', this.ordersData.limit);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }
      
      const result = await this.makeApiRequest(endpoint, { method: 'GET' });
      this.displayResults(this.$refs.ordersResults, result);
    },

    async testGetSpecificOrder() {
      const result = await this.makeApiRequest(`/spot/orders/${this.specificOrderData.orderId}`, { method: 'GET' });
      this.displayResults(this.$refs.specificOrderResults, result);
    },

    async testCancelOrder() {
      const result = await this.makeApiRequest(`/spot/orders/${this.cancelOrderData.orderId}`, { method: 'DELETE' });
      this.displayResults(this.$refs.cancelOrderResults, result);
    },

    async testCancelAllOrders() {
      let endpoint = '/spot/orders';
      const params = new URLSearchParams();
      
      if (this.cancelAllData.symbol) params.append('symbol', this.cancelAllData.symbol);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }
      
      const result = await this.makeApiRequest(endpoint, { method: 'DELETE' });
      this.displayResults(this.$refs.cancelAllOrdersResults, result);
    },

    async testGetTrades() {
      let endpoint = '/spot/trades/history';
      const params = new URLSearchParams();
      
      if (this.tradesData.symbol) params.append('symbol', this.tradesData.symbol);
      if (this.tradesData.limit) params.append('limit', this.tradesData.limit);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }
      
      const result = await this.makeApiRequest(endpoint, { method: 'GET' });
      this.displayResults(this.$refs.tradesResults, result);
    },

    copyCurlPlaceOrder() {
      const requestBody = {
        symbol: this.orderData.symbol,
        side: this.orderData.side,
        type: this.orderData.type,
        quantity: this.orderData.quantity,
        timeInForce: this.orderData.timeInForce
      };
      
      if (this.orderData.price) requestBody.price = this.orderData.price;
      if (this.orderData.stopPrice) requestBody.stopPrice = this.orderData.stopPrice;
      
      this.copyCurlCommand('/trading/order', { method: 'POST', body: JSON.stringify(requestBody) });
    },

    copyCurlGetOrders() {
      let endpoint = '/trading/orders';
      const params = new URLSearchParams();
      
      if (this.ordersData.symbol) params.append('symbol', this.ordersData.symbol);
      if (this.ordersData.status) params.append('status', this.ordersData.status);
      if (this.ordersData.side) params.append('side', this.ordersData.side);
      if (this.ordersData.limit) params.append('limit', this.ordersData.limit);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }
      
      this.copyCurlCommand(endpoint, { method: 'GET' });
    },

    copyCurlGetSpecificOrder() {
      this.copyCurlCommand(`/trading/orders/${this.specificOrderData.orderId || 'order_123456'}`, { method: 'GET' });
    },

    copyCurlCancelOrder() {
      this.copyCurlCommand(`/trading/orders/${this.cancelOrderData.orderId || 'order_123456'}`, { method: 'DELETE' });
    },

    copyCurlCancelAllOrders() {
      let endpoint = '/trading/orders';
      const params = new URLSearchParams();
      
      if (this.cancelAllData.symbol) params.append('symbol', this.cancelAllData.symbol);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }
      
      this.copyCurlCommand(endpoint, { method: 'DELETE' });
    },

    copyCurlGetTrades() {
      let endpoint = '/trading/trades';
      const params = new URLSearchParams();
      
      if (this.tradesData.symbol) params.append('symbol', this.tradesData.symbol);
      if (this.tradesData.limit) params.append('limit', this.tradesData.limit);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }
      
      this.copyCurlCommand(endpoint, { method: 'GET' });
    },

    copyCurlCommand(endpoint, options = {}) {
      if (!this.apiKey) {
        alert('Please set your API key first');
        return;
      }
      
      const method = options.method || 'GET';
      const url = `${this.API_BASE}${endpoint}`;
      
      let curlCommand = `curl -X ${method} "${url}" \\\n  -H "Authorization: Bearer ${this.apiKey}" \\\n  -H "Fingerprint: ${this.generateFingerprint()}"`;
      
      if (options.body) {
        curlCommand += ' \\\n  -H "Content-Type: application/json"';
        curlCommand += ` \\\n  -d '${options.body}'`;
      }
      
      this.copyToClipboard(curlCommand);
    },

    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.$nextTick(() => {
          const buttons = this.$el.querySelectorAll('.copy-curl-button');
          buttons.forEach(button => {
            if (button === event.target) {
              const originalText = button.textContent;
              button.textContent = '✅ Copied!';
              setTimeout(() => {
                button.textContent = originalText;
              }, 2000);
            }
          });
        });
      }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✅ Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      });
    }
  }
}
</script>

<style scoped>
.trading-tester {
  max-width: 100%;
  margin: 0 auto;
}

.api-key-config {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.api-key-config h3 {
  margin: 0 0 20px 0;
  color: var(--vp-c-text-1);
}

.config-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 15px;
}

.config-group {
  display: flex;
  flex-direction: column;
}

.config-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.api-url-input {
  padding: 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
}

.key-input-group {
  display: flex;
  gap: 10px;
}

.api-status-row {
  display: flex;
  gap: 20px;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-border-soft);
}

.url-status {
  color: var(--vp-c-brand);
  font-size: 0.85rem;
  font-weight: 500;
  font-family: monospace;
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-border);
}

.api-key-input {
  flex: 1;
  padding: 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.toggle-key-btn {
  padding: 10px 15px;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
}

.api-endpoint {
  margin-bottom: 40px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.api-endpoint h3 {
  margin: 0;
  padding: 15px 20px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
}

.api-demo {
  padding: 20px;
}

.demo-controls {
  display: grid;
  gap: 15px;
  margin-bottom: 20px;
}

.demo-controls label {
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 5px;
  display: block;
}

.demo-controls input,
.demo-controls select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.test-button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.test-button:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.test-button:disabled {
  background: var(--vp-c-gray);
  cursor: not-allowed;
}

.copy-curl-button {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.copy-curl-button:hover {
  background: var(--vp-c-gray-light-1);
}

.results-container {
  min-height: 60px;
}

.api-result {
  border: 1px solid;
  border-radius: 4px;
  padding: 15px;
  margin-top: 15px;
}

.api-result.success {
  border-color: var(--vp-c-green);
  background: var(--vp-c-green-soft);
}

.api-result.error {
  border-color: var(--vp-c-red);
  background: var(--vp-c-red-soft);
}

.result-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.success {
  background: var(--vp-c-green);
  color: white;
}

.status-badge.error {
  background: var(--vp-c-red);
  color: white;
}

.timestamp {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.result-data {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  padding: 12px;
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
  overflow-x: auto;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

@media (max-width: 768px) {
  .config-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .api-status-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .key-input-group {
    flex-direction: column;
  }
}
</style> 