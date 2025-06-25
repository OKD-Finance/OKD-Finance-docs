<template>
  <div class="wallets-tester">
    <!-- API Key Configuration -->
    <div class="api-key-config">
      <h3>💰 Wallets API Testing</h3>
      <div class="key-input-group">
        <input 
          v-model="apiKey" 
          type="password" 
          placeholder="Enter your API key (JWT token)" 
          class="api-key-input"
          @input="saveApiKey"
        />
        <button @click="toggleApiKeyVisibility" class="toggle-key-btn">
          {{ showApiKey ? '🙈' : '👁️' }}
        </button>
      </div>
      <div class="api-key-status">
        <span v-if="apiKey" style="color: var(--vp-c-green);">✅ API Key configured</span>
        <span v-else style="color: var(--vp-c-red);">❌ API Key required</span>
      </div>
    </div>

    <!-- Get All Balances -->
    <div class="api-endpoint">
      <h3>📊 Get All Balances</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <div class="button-group">
            <button @click="testGetAllBalances" class="test-button" :disabled="!apiKey">Test</button>
            <button @click="copyCurlAllBalances" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="allBalancesResults"></div>
      </div>
    </div>

    <!-- Get Specific Balance -->
    <div class="api-endpoint">
      <h3>💎 Get Specific Balance</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="balance-currency">Currency:</label>
          <select v-model="balanceData.currency" id="balance-currency">
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
          </select>
          <div class="button-group">
            <button @click="testGetBalance" class="test-button" :disabled="!apiKey">Test</button>
            <button @click="copyCurlBalance" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="balanceResults"></div>
      </div>
    </div>

    <!-- Generate Deposit Address -->
    <div class="api-endpoint">
      <h3>🏠 Generate Deposit Address</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="address-currency">Currency:</label>
          <select v-model="addressData.currency" id="address-currency">
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
          </select>
          <label for="address-label">Label (optional):</label>
          <input v-model="addressData.label" type="text" id="address-label" placeholder="Main deposit address" />
          <div class="button-group">
            <button @click="testGenerateAddress" class="test-button" :disabled="!apiKey">Generate Address</button>
            <button @click="copyCurlGenerateAddress" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="generateAddressResults"></div>
      </div>
    </div>

    <!-- Get All Addresses -->
    <div class="api-endpoint">
      <h3>📋 Get All Addresses</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="addresses-currency">Currency (optional):</label>
          <select v-model="addressesData.currency" id="addresses-currency">
            <option value="">All currencies</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
          </select>
          <label for="addresses-limit">Limit:</label>
          <input v-model.number="addressesData.limit" type="number" id="addresses-limit" placeholder="50" min="1" max="100" />
          <div class="button-group">
            <button @click="testGetAddresses" class="test-button" :disabled="!apiKey">Get Addresses</button>
            <button @click="copyCurlGetAddresses" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="addressesResults"></div>
      </div>
    </div>

    <!-- Get Deposits -->
    <div class="api-endpoint">
      <h3>💸 Get Deposits</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="deposits-currency">Currency (optional):</label>
          <select v-model="depositsData.currency" id="deposits-currency">
            <option value="">All currencies</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
          </select>
          <label for="deposits-status">Status (optional):</label>
          <select v-model="depositsData.status" id="deposits-status">
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="failed">Failed</option>
          </select>
          <label for="deposits-limit">Limit:</label>
          <input v-model.number="depositsData.limit" type="number" id="deposits-limit" placeholder="50" min="1" max="100" />
          <div class="button-group">
            <button @click="testGetDeposits" class="test-button" :disabled="!apiKey">Get Deposits</button>
            <button @click="copyCurlGetDeposits" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="depositsResults"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WalletsTester',
  data() {
    return {
      apiKey: '',
      showApiKey: false,
      API_BASE: 'https://develop.okd.finance/api',
      balanceData: {
        currency: 'BTC'
      },
      addressData: {
        currency: 'BTC',
        label: ''
      },
      addressesData: {
        currency: '',
        limit: 50
      },
      depositsData: {
        currency: '',
        status: '',
        limit: 50
      }
    }
  },
  mounted() {
    const savedKey = localStorage.getItem('okd_api_key');
    if (savedKey) {
      this.apiKey = savedKey;
    }
  },
  methods: {
    saveApiKey() {
      localStorage.setItem('okd_api_key', this.apiKey);
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

    async testGetAllBalances() {
      const result = await this.makeApiRequest('/wallets/balance', { method: 'GET' });
      this.displayResults(this.$refs.allBalancesResults, result);
    },

    async testGetBalance() {
      const result = await this.makeApiRequest(`/wallets/balance/${this.balanceData.currency}`, { method: 'GET' });
      this.displayResults(this.$refs.balanceResults, result);
    },

    async testGenerateAddress() {
      const requestBody = {
        currency: this.addressData.currency
      };
      
      if (this.addressData.label) {
        requestBody.label = this.addressData.label;
      }
      
      const result = await this.makeApiRequest('/wallets/address', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      });
      
      this.displayResults(this.$refs.generateAddressResults, result);
    },

    async testGetAddresses() {
      let endpoint = '/wallets/addresses';
      const params = new URLSearchParams();
      
      if (this.addressesData.currency) params.append('currency', this.addressesData.currency);
      if (this.addressesData.limit) params.append('limit', this.addressesData.limit);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }
      
      const result = await this.makeApiRequest(endpoint, { method: 'GET' });
      this.displayResults(this.$refs.addressesResults, result);
    },

    async testGetDeposits() {
      let endpoint = '/wallets/deposits';
      const params = new URLSearchParams();
      
      if (this.depositsData.currency) params.append('currency', this.depositsData.currency);
      if (this.depositsData.status) params.append('status', this.depositsData.status);
      if (this.depositsData.limit) params.append('limit', this.depositsData.limit);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }
      
      const result = await this.makeApiRequest(endpoint, { method: 'GET' });
      this.displayResults(this.$refs.depositsResults, result);
    },

    copyCurlAllBalances() {
      this.copyCurlCommand('/wallets/balance', { method: 'GET' });
    },

    copyCurlBalance() {
      this.copyCurlCommand(`/wallets/balance/${this.balanceData.currency}`, { method: 'GET' });
    },

    copyCurlGenerateAddress() {
      const requestBody = {
        currency: this.addressData.currency
      };
      
      if (this.addressData.label) {
        requestBody.label = this.addressData.label;
      }
      
      this.copyCurlCommand('/wallets/address', { method: 'POST', body: JSON.stringify(requestBody) });
    },

    copyCurlGetAddresses() {
      let endpoint = '/wallets/addresses';
      const params = new URLSearchParams();
      
      if (this.addressesData.currency) params.append('currency', this.addressesData.currency);
      if (this.addressesData.limit) params.append('limit', this.addressesData.limit);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }
      
      this.copyCurlCommand(endpoint, { method: 'GET' });
    },

    copyCurlGetDeposits() {
      let endpoint = '/wallets/deposits';
      const params = new URLSearchParams();
      
      if (this.depositsData.currency) params.append('currency', this.depositsData.currency);
      if (this.depositsData.status) params.append('status', this.depositsData.status);
      if (this.depositsData.limit) params.append('limit', this.depositsData.limit);
      
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
.wallets-tester {
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
  margin: 0 0 15px 0;
  color: var(--vp-c-text-1);
}

.key-input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
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
  .button-group {
    flex-direction: column;
  }
  
  .key-input-group {
    flex-direction: column;
  }
}
</style> 