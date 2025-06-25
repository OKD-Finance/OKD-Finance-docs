<template>
  <div class="api-tester">
    <!-- API Key Configuration -->
    <div class="api-key-config">
      <h3>🔧 [API_NAME] API Testing</h3>
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

    <!-- Example Endpoint -->
    <div class="api-endpoint">
      <h3>📋 [ENDPOINT_NAME]</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <!-- Add your form fields here -->
          <label for="example-field">Example Field:</label>
          <input v-model="exampleData.field" type="text" id="example-field" placeholder="Enter value" />
          
          <div class="button-group">
            <button @click="testExampleEndpoint" class="test-button" :disabled="!apiKey">Test</button>
            <button @click="copyCurlExample" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="exampleResults"></div>
      </div>
    </div>

    <!-- Add more endpoints as needed -->
  </div>
</template>

<script>
export default {
  name: '[ComponentName]Tester', // Replace with your component name
  data() {
    return {
      apiKey: '',
      showApiKey: false,
      API_BASE: 'https://develop.okd.finance/api',
      exampleData: {
        field: ''
      }
      // Add more data properties as needed
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

    // Example endpoint method
    async testExampleEndpoint() {
      const result = await this.makeApiRequest('/example/endpoint', {
        method: 'GET' // or POST, PUT, DELETE
        // body: JSON.stringify(this.exampleData) // for POST/PUT requests
      });
      
      this.displayResults(this.$refs.exampleResults, result);
    },

    copyCurlExample() {
      this.copyCurlCommand('/example/endpoint', { method: 'GET' });
    },

    copyCurlCommand(endpoint, options = {}) {
      if (!this.apiKey) {
        alert('Please set your API key first');
        return;
      }
      
      const method = options.method || 'GET';
      const url = `${this.API_BASE}${endpoint}`;
      
      let curlCommand = `curl -X ${method} "${url}" \\
  -H "Authorization: Bearer ${this.apiKey}" \\
  -H "Fingerprint: ${this.generateFingerprint()}"`;
      
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
/* Standard styles - copy from any existing tester component */
.api-tester {
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
.demo-controls select,
.demo-controls textarea {
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