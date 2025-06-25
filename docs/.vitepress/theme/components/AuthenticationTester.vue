<template>
  <div class="auth-tester">
    <!-- API Key Configuration -->
    <div class="api-key-config">
      <h3>🔑 Authentication API Testing</h3>
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
        <span v-else style="color: var(--vp-c-red);">❌ API Key required for some endpoints</span>
      </div>
    </div>

    <!-- User Registration -->
    <div class="api-endpoint">
      <h3>📝 User Registration</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="signup-email">Email:</label>
          <input v-model="signupData.email" type="email" id="signup-email" placeholder="user@example.com" />
          <label for="signup-password">Password:</label>
          <input v-model="signupData.password" type="password" id="signup-password" placeholder="min 8 characters" />
          <label for="signup-recaptcha">X-RECAPTCHA:</label>
          <input v-model="signupData.recaptcha" type="text" id="signup-recaptcha" placeholder="recaptcha_token" />
          <label for="signup-platform-id">X-PLATFORM-ID:</label>
          <input v-model="signupData.platformId" type="text" id="signup-platform-id" placeholder="platform_id" />
          <div class="button-group">
            <button @click="testSignUp" class="test-button">Test Registration</button>
            <button @click="copyCurlSignUp" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="signupResults"></div>
      </div>
    </div>

    <!-- User Login -->
    <div class="api-endpoint">
      <h3>🔐 User Login</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="signin-email">Email:</label>
          <input v-model="signinData.email" type="email" id="signin-email" placeholder="user@example.com" />
          <label for="signin-password">Password:</label>
          <input v-model="signinData.password" type="password" id="signin-password" placeholder="securepassword123" />
          <label for="signin-recaptcha">X-RECAPTCHA:</label>
          <input v-model="signinData.recaptcha" type="text" id="signin-recaptcha" placeholder="recaptcha_token" />
          <label for="signin-platform-id">X-PLATFORM-ID:</label>
          <input v-model="signinData.platformId" type="text" id="signin-platform-id" placeholder="platform_id" />
          <div class="button-group">
            <button @click="testSignIn" class="test-button">Test Login</button>
            <button @click="copyCurlSignIn" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="signinResults"></div>
      </div>
    </div>

    <!-- Refresh Token -->
    <div class="api-endpoint">
      <h3>🔄 Refresh Token</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="refresh-token">Refresh Token:</label>
          <input v-model="refreshData.refreshToken" type="text" id="refresh-token" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
          <div class="button-group">
            <button @click="testRefreshToken" class="test-button">Test Refresh</button>
            <button @click="copyCurlRefresh" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="refreshResults"></div>
      </div>
    </div>

    <!-- Get Profile -->
    <div class="api-endpoint">
      <h3>👤 Get User Profile</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <div class="button-group">
            <button @click="testGetProfile" class="test-button" :disabled="!apiKey">Test</button>
            <button @click="copyCurlProfile" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="profileResults"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthenticationTester',
  data() {
    return {
      apiKey: '',
      showApiKey: false,
      API_BASE: 'https://develop.okd.finance/api',
      signupData: {
        email: '',
        password: '',
        recaptcha: '',
        platformId: ''
      },
      signinData: {
        email: '',
        password: '',
        recaptcha: '',
        platformId: ''
      },
      refreshData: {
        refreshToken: ''
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
      const url = `${this.API_BASE}${endpoint}`;
      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        }
      };
      
      if (this.apiKey && !options.skipAuth) {
        defaultOptions.headers['Authorization'] = `Bearer ${this.apiKey}`;
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

    async testSignUp() {
      if (!this.signupData.email || !this.signupData.password) {
        this.displayResults(this.$refs.signupResults, { error: 'Email and password are required' });
        return;
      }

      const result = await this.makeApiRequest('/auth/sign-up', {
        method: 'POST',
        skipAuth: true,
        headers: {
          'X-RECAPTCHA': this.signupData.recaptcha || 'test_recaptcha_token',
          'X-PLATFORM-ID': this.signupData.platformId || 'test_platform_id'
        },
        body: JSON.stringify({
          email: this.signupData.email,
          password: this.signupData.password
        })
      });
      
      this.displayResults(this.$refs.signupResults, result);
    },

    async testSignIn() {
      if (!this.signinData.email || !this.signinData.password) {
        this.displayResults(this.$refs.signinResults, { error: 'Email and password are required' });
        return;
      }

      const result = await this.makeApiRequest('/auth/sign-in', {
        method: 'POST',
        skipAuth: true,
        headers: {
          'X-RECAPTCHA': this.signinData.recaptcha || 'test_recaptcha_token',
          'X-PLATFORM-ID': this.signinData.platformId || 'test_platform_id'
        },
        body: JSON.stringify({
          email: this.signinData.email,
          password: this.signinData.password
        })
      });
      
      this.displayResults(this.$refs.signinResults, result);
    },

    async testRefreshToken() {
      if (!this.refreshData.refreshToken) {
        this.displayResults(this.$refs.refreshResults, { error: 'Refresh token is required' });
        return;
      }

      const result = await this.makeApiRequest('/auth/refresh', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify({
          refreshToken: this.refreshData.refreshToken
        })
      });
      
      this.displayResults(this.$refs.refreshResults, result);
    },

    async testGetProfile() {
      const result = await this.makeApiRequest('/auth/profile', { method: 'GET' });
      this.displayResults(this.$refs.profileResults, result);
    },

    copyCurlSignUp() {
      const curlCommand = `curl -X POST "${this.API_BASE}/auth/sign-up" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: ${this.generateFingerprint()}" \\
  -H "X-RECAPTCHA: ${this.signupData.recaptcha || 'test_recaptcha_token'}" \\
  -H "X-PLATFORM-ID: ${this.signupData.platformId || 'test_platform_id'}" \\
  -d '{
    "email": "${this.signupData.email || 'user@example.com'}",
    "password": "${this.signupData.password || 'securepassword123'}"
  }'`;
      
      this.copyToClipboard(curlCommand);
    },

    copyCurlSignIn() {
      const curlCommand = `curl -X POST "${this.API_BASE}/auth/sign-in" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: ${this.generateFingerprint()}" \\
  -H "X-RECAPTCHA: ${this.signinData.recaptcha || 'test_recaptcha_token'}" \\
  -H "X-PLATFORM-ID: ${this.signinData.platformId || 'test_platform_id'}" \\
  -d '{
    "email": "${this.signinData.email || 'user@example.com'}",
    "password": "${this.signinData.password || 'securepassword123'}"
  }'`;
      
      this.copyToClipboard(curlCommand);
    },

    copyCurlRefresh() {
      const curlCommand = `curl -X POST "${this.API_BASE}/auth/refresh" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: ${this.generateFingerprint()}" \\
  -d '{
    "refreshToken": "${this.refreshData.refreshToken || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'}"
  }'`;
      
      this.copyToClipboard(curlCommand);
    },

    copyCurlProfile() {
      if (!this.apiKey) {
        alert('Please set your API key first');
        return;
      }
      
      const curlCommand = `curl -X GET "${this.API_BASE}/auth/profile" \\
  -H "Authorization: Bearer ${this.apiKey}" \\
  -H "Fingerprint: ${this.generateFingerprint()}"`;
      
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
.auth-tester {
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

.demo-controls input {
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