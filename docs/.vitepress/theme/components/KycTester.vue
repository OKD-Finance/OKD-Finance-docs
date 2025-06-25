<template>
  <div class="kyc-tester">
    <!-- API Key Configuration -->
    <div class="api-key-config">
      <h3>🆔 KYC API Testing</h3>
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

    <!-- Submit KYC Documents -->
    <div class="api-endpoint">
      <h3>📋 Submit KYC Documents</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="kyc-first-name">First Name:</label>
          <input v-model="kycData.firstName" type="text" id="kyc-first-name" placeholder="John" />
          <label for="kyc-last-name">Last Name:</label>
          <input v-model="kycData.lastName" type="text" id="kyc-last-name" placeholder="Doe" />
          <label for="kyc-date-of-birth">Date of Birth:</label>
          <input v-model="kycData.dateOfBirth" type="date" id="kyc-date-of-birth" />
          <label for="kyc-nationality">Nationality:</label>
          <select v-model="kycData.nationality" id="kyc-nationality">
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="JP">Japan</option>
            <option value="RU">Russia</option>
          </select>
          <label for="kyc-document-type">Document Type:</label>
          <select v-model="kycData.documentType" id="kyc-document-type">
            <option value="passport">Passport</option>
            <option value="driver_license">Driver License</option>
            <option value="national_id">National ID</option>
          </select>
          <label for="kyc-document-number">Document Number:</label>
          <input v-model="kycData.documentNumber" type="text" id="kyc-document-number" placeholder="Document number" />
          <label for="kyc-address">Address:</label>
          <textarea v-model="kycData.address" id="kyc-address" placeholder="Your full address" rows="3"></textarea>
          <div class="button-group">
            <button @click="testSubmitKyc" class="test-button" :disabled="!apiKey">Submit KYC</button>
            <button @click="copyCurlSubmitKyc" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="submitKycResults"></div>
      </div>
    </div>

    <!-- Get KYC Status -->
    <div class="api-endpoint">
      <h3>📊 Get KYC Status</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <div class="button-group">
            <button @click="testGetKycStatus" class="test-button" :disabled="!apiKey">Get Status</button>
            <button @click="copyCurlGetStatus" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="kycStatusResults"></div>
      </div>
    </div>

    <!-- Upload KYC Documents -->
    <div class="api-endpoint">
      <h3>📎 Upload KYC Documents</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="kyc-document-front">Document Front Side:</label>
          <input type="file" @change="handleDocumentFrontSelect" id="kyc-document-front" class="file-input" accept="image/*,.pdf" />
          <label for="kyc-document-back">Document Back Side (optional):</label>
          <input type="file" @change="handleDocumentBackSelect" id="kyc-document-back" class="file-input" accept="image/*,.pdf" />
          <label for="kyc-selfie">Selfie with Document:</label>
          <input type="file" @change="handleSelfieSelect" id="kyc-selfie" class="file-input" accept="image/*" />
          <div class="button-group">
            <button @click="testUploadDocuments" class="test-button" :disabled="!apiKey || !documentFront">Upload Documents</button>
            <button @click="copyCurlUploadDocuments" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="uploadDocumentsResults"></div>
      </div>
    </div>

    <!-- Get KYC History -->
    <div class="api-endpoint">
      <h3>📜 Get KYC History</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="kyc-limit">Limit:</label>
          <input v-model.number="historyData.limit" type="number" id="kyc-limit" placeholder="50" min="1" max="100" />
          <div class="button-group">
            <button @click="testGetKycHistory" class="test-button" :disabled="!apiKey">Get History</button>
            <button @click="copyCurlGetHistory" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="kycHistoryResults"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KycTester',
  data() {
    return {
      apiKey: '',
      showApiKey: false,
      API_BASE: 'https://develop.okd.finance/api',
      kycData: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationality: 'US',
        documentType: 'passport',
        documentNumber: '',
        address: ''
      },
      documentFront: null,
      documentBack: null,
      selfie: null,
      historyData: {
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
          'Fingerprint': this.generateFingerprint()
        }
      };

      // Don't set Content-Type for FormData requests
      if (!options.isFormData) {
        defaultOptions.headers['Content-Type'] = 'application/json';
      }
      
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

    async testSubmitKyc() {
      if (!this.kycData.firstName || !this.kycData.lastName || !this.kycData.dateOfBirth) {
        this.displayResults(this.$refs.submitKycResults, { error: 'First name, last name, and date of birth are required' });
        return;
      }

      const result = await this.makeApiRequest('/kyc/submit', {
        method: 'POST',
        body: JSON.stringify(this.kycData)
      });
      
      this.displayResults(this.$refs.submitKycResults, result);
    },

    async testGetKycStatus() {
      const result = await this.makeApiRequest('/kyc/status', { method: 'GET' });
      this.displayResults(this.$refs.kycStatusResults, result);
    },

    async testUploadDocuments() {
      if (!this.documentFront) {
        this.displayResults(this.$refs.uploadDocumentsResults, { error: 'Document front side is required' });
        return;
      }

      const formData = new FormData();
      formData.append('documentFront', this.documentFront);
      
      if (this.documentBack) {
        formData.append('documentBack', this.documentBack);
      }
      
      if (this.selfie) {
        formData.append('selfie', this.selfie);
      }

      const result = await this.makeApiRequest('/kyc/upload', {
        method: 'POST',
        body: formData,
        isFormData: true
      });
      
      this.displayResults(this.$refs.uploadDocumentsResults, result);
    },

    async testGetKycHistory() {
      let endpoint = '/kyc/history';
      const params = new URLSearchParams();
      
      if (this.historyData.limit) params.append('limit', this.historyData.limit);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }
      
      const result = await this.makeApiRequest(endpoint, { method: 'GET' });
      this.displayResults(this.$refs.kycHistoryResults, result);
    },

    handleDocumentFrontSelect(event) {
      this.documentFront = event.target.files[0];
    },

    handleDocumentBackSelect(event) {
      this.documentBack = event.target.files[0];
    },

    handleSelfieSelect(event) {
      this.selfie = event.target.files[0];
    },

    copyCurlSubmitKyc() {
      const curlCommand = `curl -X POST "${this.API_BASE}/kyc/submit" \\
  -H "Authorization: Bearer ${this.apiKey || 'YOUR_TOKEN'}" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: ${this.generateFingerprint()}" \\
  -d '${JSON.stringify(this.kycData, null, 2)}'`;
      
      this.copyToClipboard(curlCommand);
    },

    copyCurlGetStatus() {
      this.copyCurlCommand('/kyc/status', { method: 'GET' });
    },

    copyCurlUploadDocuments() {
      const curlCommand = `curl -X POST "${this.API_BASE}/kyc/upload" \\
  -H "Authorization: Bearer ${this.apiKey || 'YOUR_TOKEN'}" \\
  -H "Fingerprint: ${this.generateFingerprint()}" \\
  -F "documentFront=@/path/to/document-front.jpg" \\
  ${this.documentBack ? '-F "documentBack=@/path/to/document-back.jpg" \\' : ''}
  ${this.selfie ? '-F "selfie=@/path/to/selfie.jpg"' : ''}`;
      
      this.copyToClipboard(curlCommand);
    },

    copyCurlGetHistory() {
      let endpoint = '/kyc/history';
      const params = new URLSearchParams();
      
      if (this.historyData.limit) params.append('limit', this.historyData.limit);
      
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
.kyc-tester {
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
  font-family: inherit;
}

.demo-controls textarea {
  resize: vertical;
  min-height: 80px;
}

.file-input {
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