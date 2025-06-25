<template>
  <div class="api-tester">
    <!-- API Key Configuration -->
    <div class="api-key-config">
      <h3>🔑 API Configuration</h3>
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

    <!-- Get User Profile -->
    <div class="api-endpoint">
      <h3>👤 Get User Profile</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <div class="button-group">
            <button @click="testGetProfile" class="test-button" :disabled="!apiKey">Test</button>
            <button @click="copyCurlCommand('/user/profile', {method: 'GET'})" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="profileResults"></div>
      </div>
      
      <div class="code-example">
        <pre><code>curl -X GET "https://develop.okd.finance/api/auth/profile" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"</code></pre>
      </div>
    </div>

    <!-- Update User Profile -->
    <div class="api-endpoint">
      <h3>✏️ Update User Profile</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="update-username">Username:</label>
          <input v-model="updateProfile.username" type="text" id="update-username" placeholder="john_doe" />
          <label for="update-firstname">First Name:</label>
          <input v-model="updateProfile.firstName" type="text" id="update-firstname" placeholder="John" />
          <label for="update-lastname">Last Name:</label>
          <input v-model="updateProfile.lastName" type="text" id="update-lastname" placeholder="Doe" />
          <label for="update-phone">Phone:</label>
          <input v-model="updateProfile.phone" type="text" id="update-phone" placeholder="+1234567890" />
          <div class="button-group">
            <button @click="testUpdateProfile" class="test-button" :disabled="!apiKey">Test</button>
            <button @click="copyCurlCommand('/user/profile', {method: 'PUT', body: JSON.stringify(updateProfile)})" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="updateProfileResults"></div>
      </div>
    </div>

    <!-- Get User Settings -->
    <div class="api-endpoint">
      <h3>⚙️ Get User Settings</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <div class="button-group">
            <button @click="testGetSettings" class="test-button" :disabled="!apiKey">Test</button>
            <button @click="copyCurlCommand('/user/settings', {method: 'GET'})" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="settingsResults"></div>
      </div>
      
      <div class="code-example">
        <pre><code>curl -X GET "https://develop.okd.finance/api/user/settings" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"</code></pre>
      </div>
    </div>

    <!-- Update User Settings -->
    <div class="api-endpoint">
      <h3>🔧 Update User Settings</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="settings-language">Language:</label>
          <select v-model="settings.language" id="settings-language">
            <option value="en">English</option>
            <option value="ru">Russian</option>
            <option value="zh">Chinese</option>
          </select>
          <label for="settings-currency">Currency:</label>
          <select v-model="settings.currency" id="settings-currency">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="BTC">BTC</option>
          </select>
          <label>
            <input v-model="settings.emailNotifications" type="checkbox" id="settings-email-notifications" /> Email Notifications
          </label>
          <label>
            <input v-model="settings.tradingNotifications" type="checkbox" id="settings-trading-notifications" /> Trading Notifications
          </label>
          <div class="button-group">
            <button @click="testUpdateSettings" class="test-button" :disabled="!apiKey">Test</button>
            <button @click="copyCurlCommand('/user/settings', {method: 'PUT', body: JSON.stringify(settings)})" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="updateSettingsResults"></div>
      </div>
    </div>

    <!-- Change Password -->
    <div class="api-endpoint">
      <h3>🔒 Change Password</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="current-password">Current Password:</label>
          <input v-model="passwordChange.currentPassword" type="password" id="current-password" placeholder="Current password" />
          <label for="new-password">New Password:</label>
          <input v-model="passwordChange.newPassword" type="password" id="new-password" placeholder="New password" />
          <div class="button-group">
            <button @click="testChangePassword" class="test-button" :disabled="!apiKey">Test</button>
            <button @click="copyCurlCommand('/user/change-password', {method: 'POST', body: JSON.stringify(passwordChange)})" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="changePasswordResults"></div>
      </div>
    </div>

    <!-- Get User Activity -->
    <div class="api-endpoint">
      <h3>📊 Get User Activity</h3>
      <div class="api-demo">
        <div class="demo-controls">
          <label for="activity-limit">Limit:</label>
          <input v-model.number="activity.limit" type="number" id="activity-limit" placeholder="50" min="1" max="100" />
          <label for="activity-type">Type:</label>
          <select v-model="activity.type" id="activity-type">
            <option value="">All Types</option>
            <option value="login">Login</option>
            <option value="trade">Trade</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
          <div class="button-group">
            <button @click="testGetActivity" class="test-button" :disabled="!apiKey">Test</button>
            <button @click="copyCurlActivity" class="copy-curl-button">📋 Copy curl</button>
          </div>
        </div>
        <div class="results-container" ref="activityResults"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiTester',
  data() {
    return {
      apiKey: '',
      showApiKey: false,
      API_BASE: 'https://develop.okd.finance/api',
      updateProfile: {
        username: '',
        firstName: '',
        lastName: '',
        phone: ''
      },
      settings: {
        language: 'en',
        currency: 'USD',
        emailNotifications: true,
        tradingNotifications: false
      },
      passwordChange: {
        currentPassword: '',
        newPassword: ''
      },
      activity: {
        limit: 50,
        type: ''
      }
    }
  },
  mounted() {
    // Load API key from localStorage
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

    async makeApiRequest(endpoint, options = {}) {
      if (!this.apiKey) {
        return { error: 'Please set your API key first' };
      }
      
      const url = `${this.API_BASE}${endpoint}`;
      const defaultOptions = {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
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
        const data = await response.json();
        
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
          <pre class="result-data">${JSON.stringify(result.data || result, null, 2)}</pre>
        </div>
      `;
    },

    async testGetProfile() {
      const result = await this.makeApiRequest('/user/profile', { method: 'GET' });
      this.displayResults(this.$refs.profileResults, result);
    },

    async testUpdateProfile() {
      const requestBody = {};
      if (this.updateProfile.username) requestBody.username = this.updateProfile.username;
      if (this.updateProfile.firstName) requestBody.firstName = this.updateProfile.firstName;
      if (this.updateProfile.lastName) requestBody.lastName = this.updateProfile.lastName;
      if (this.updateProfile.phone) requestBody.phone = this.updateProfile.phone;
      
      const result = await this.makeApiRequest('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(requestBody)
      });
      
      this.displayResults(this.$refs.updateProfileResults, result);
    },

    async testGetSettings() {
      const result = await this.makeApiRequest('/user/settings', { method: 'GET' });
      this.displayResults(this.$refs.settingsResults, result);
    },

    async testUpdateSettings() {
      const result = await this.makeApiRequest('/user/settings', {
        method: 'PUT',
        body: JSON.stringify(this.settings)
      });
      
      this.displayResults(this.$refs.updateSettingsResults, result);
    },

    async testChangePassword() {
      if (!this.passwordChange.currentPassword || !this.passwordChange.newPassword) {
        this.displayResults(this.$refs.changePasswordResults, { error: 'Please fill in both password fields' });
        return;
      }
      
      const result = await this.makeApiRequest('/user/change-password', {
        method: 'POST',
        body: JSON.stringify(this.passwordChange)
      });
      
      this.displayResults(this.$refs.changePasswordResults, result);
    },

    async testGetActivity() {
      let endpoint = '/user/activity';
      const params = new URLSearchParams();
      
      if (this.activity.limit) params.append('limit', this.activity.limit);
      if (this.activity.type) params.append('type', this.activity.type);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }
      
      const result = await this.makeApiRequest(endpoint, { method: 'GET' });
      this.displayResults(this.$refs.activityResults, result);
    },

    copyCurlCommand(endpoint, options = {}) {
      if (!this.apiKey) {
        alert('Please set your API key first');
        return;
      }
      
      const method = options.method || 'GET';
      const url = `${this.API_BASE}${endpoint}`;
      
      let curlCommand = `curl -X ${method} "${url}" \\\n  -H "Authorization: Bearer ${this.apiKey}"`;
      
      if (options.body) {
        curlCommand += ' \\\n  -H "Content-Type: application/json"';
        curlCommand += ` \\\n  -d '${options.body}'`;
      }
      
      this.copyToClipboard(curlCommand);
    },

    copyCurlActivity() {
      if (!this.apiKey) {
        alert('Please set your API key first');
        return;
      }

      let endpoint = '/user/activity';
      const params = new URLSearchParams();
      
      if (this.activity.limit) params.append('limit', this.activity.limit);
      if (this.activity.type) params.append('type', this.activity.type);
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }

      const curlCommand = `curl -X GET "${this.API_BASE}${endpoint}" \\\n  -H "Authorization: Bearer ${this.apiKey}"`;
      this.copyToClipboard(curlCommand);
    },

    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
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
        // Fallback for older browsers
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
.demo-controls select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.demo-controls input[type="checkbox"] {
  width: auto;
  margin-right: 8px;
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

.code-example {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-border);
  padding: 15px 20px;
}

.code-example pre {
  margin: 0;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  padding: 12px;
  font-size: 13px;
  line-height: 1.4;
  overflow-x: auto;
}

.code-example code {
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