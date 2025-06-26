<template>
  <div class="interactive-api-container">
    <!-- Authentication Header -->
    <div class="auth-header">
      <h2>🔗 WebsocketSubscriptions API Testing</h2>
      <div class="auth-controls">
        <div class="form-group">
          <label>API Base URL:</label>
          <input v-model="apiUrl" placeholder="https://develop.okd.finance/api" />
        </div>
        <div class="form-group">
          <label>Access Token:</label>
          <div class="token-input">
            <input 
              :type="showToken ? 'text' : 'password'"
              v-model="accessToken" 
              placeholder="Enter your access token"
            />
            <button @click="showToken = !showToken" class="toggle-token">
              {{ showToken ? '🙈' : '👁️' }}
            </button>
          </div>
          <small>Bearer prefix will be added automatically</small>
        </div>
      </div>
    </div>

    <!-- API Endpoints -->
    <div class="endpoints-container">
      
        <!-- PATCH /authorization -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge patch">PATCH</span>
              /authorization
            </h3>
            <p class="endpoint-description">Authorize websocket connection.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Request is **{"path": "authorization", "payload": {"accessToken": "", "fingerprint": ""}}**.</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X PATCH \
  "/authorization" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="ws_authorization" 
                :disabled="loading['ws_authorization']"
                class="test-button"
              >
                {{ loading['ws_authorization'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['ws_authorization']" class="error-message">
                ❌ Error: {{ error['ws_authorization'] }}
              </div>
              
              <div v-if="responses['ws_authorization']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['ws_authorization'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PATCH /external -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge patch">PATCH</span>
              /external
            </h3>
            <p class="endpoint-description">Do external market websocket operations. Payload contains bybit request.
https://bybit-exchange.github.io/docs/v5/ws/connect</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Public:
"/external" request is  **("/external", {"direction": "spot"})
"/external" request is  **{"/external", {"op": "subscribe", "args": ["tickers.BTCUSDT", "tickers.BNBUSDT"]})}**.

Private:
"/authorization"
"/external" request is  **{"/external", {"direction": "private"}}**.
"/external" request is  **{"/external", {"op": "subscribe", "args": ["wallet", "order",  "position", "execution", "execution.fast"}**.</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X PATCH \
  "/external" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="ws_external" 
                :disabled="loading['ws_external']"
                class="test-button"
              >
                {{ loading['ws_external'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['ws_external']" class="error-message">
                ❌ Error: {{ error['ws_external'] }}
              </div>
              
              <div v-if="responses['ws_external']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['ws_external'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PATCH /symbols -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge patch">PATCH</span>
              /symbols
            </h3>
            <p class="endpoint-description">Subscribe to symbols events.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Request is **{"path": "/symbols"}**. No need additional payload.</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X PATCH \
  "/symbols" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="ws_symbols" 
                :disabled="loading['ws_symbols']"
                class="test-button"
              >
                {{ loading['ws_symbols'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['ws_symbols']" class="error-message">
                ❌ Error: {{ error['ws_symbols'] }}
              </div>
              
              <div v-if="responses['ws_symbols']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['ws_symbols'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PATCH /unsubscribe -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge patch">PATCH</span>
              /unsubscribe
            </h3>
            <p class="endpoint-description">Unsubscribe from websocket events.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Request is **{"path": "/unsubscribe", "payload": {"path": "/spot/order_events"}}**.
Payload "path" is path of some subscription.</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X PATCH \
  "/unsubscribe" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="ws_unsubscribe" 
                :disabled="loading['ws_unsubscribe']"
                class="test-button"
              >
                {{ loading['ws_unsubscribe'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['ws_unsubscribe']" class="error-message">
                ❌ Error: {{ error['ws_unsubscribe'] }}
              </div>
              
              <div v-if="responses['ws_unsubscribe']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['ws_unsubscribe'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PATCH /user/notifications -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge patch">PATCH</span>
              /user/notifications
            </h3>
            <p class="endpoint-description">Subscribe to notifications.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Request is **{"path": "/user/notifications"}**. No need additional payload.
! Need authorization</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X PATCH \
  "/user/notifications" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="ws_notifications" 
                :disabled="loading['ws_notifications']"
                class="test-button"
              >
                {{ loading['ws_notifications'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['ws_notifications']" class="error-message">
                ❌ Error: {{ error['ws_notifications'] }}
              </div>
              
              <div v-if="responses['ws_notifications']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['ws_notifications'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PATCH /user/profile -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge patch">PATCH</span>
              /user/profile
            </h3>
            <p class="endpoint-description">Subscribe to total balance events.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Request is **{"path": "/user/profile"}**. No need additional payload.
! Need authorization</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X PATCH \
  "/user/profile" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="ws_profile" 
                :disabled="loading['ws_profile']"
                class="test-button"
              >
                {{ loading['ws_profile'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['ws_profile']" class="error-message">
                ❌ Error: {{ error['ws_profile'] }}
              </div>
              
              <div v-if="responses['ws_profile']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['ws_profile'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Reactive state
const apiUrl = ref('https://develop.okd.finance/api')
const accessToken = ref('')
const showToken = ref(false)
const loading = reactive({})
const error = reactive({})
const responses = reactive({})
const requestBodies = reactive({})

// Utility functions
const generateFingerprint = () => {
  return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

// API Methods
const ws_authorization = async () => {
  loading['ws_authorization'] = true;
  error['ws_authorization'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/authorization`, {
      method: 'PATCH',
      headers,
      
    });
    
    const data = await response.json();
    responses['ws_authorization'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['ws_authorization'] = err.message;
  } finally {
    loading['ws_authorization'] = false;
  }
}

const ws_external = async () => {
  loading['ws_external'] = true;
  error['ws_external'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/external`, {
      method: 'PATCH',
      headers,
      
    });
    
    const data = await response.json();
    responses['ws_external'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['ws_external'] = err.message;
  } finally {
    loading['ws_external'] = false;
  }
}

const ws_symbols = async () => {
  loading['ws_symbols'] = true;
  error['ws_symbols'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/symbols`, {
      method: 'PATCH',
      headers,
      
    });
    
    const data = await response.json();
    responses['ws_symbols'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['ws_symbols'] = err.message;
  } finally {
    loading['ws_symbols'] = false;
  }
}

const ws_unsubscribe = async () => {
  loading['ws_unsubscribe'] = true;
  error['ws_unsubscribe'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/unsubscribe`, {
      method: 'PATCH',
      headers,
      
    });
    
    const data = await response.json();
    responses['ws_unsubscribe'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['ws_unsubscribe'] = err.message;
  } finally {
    loading['ws_unsubscribe'] = false;
  }
}

const ws_notifications = async () => {
  loading['ws_notifications'] = true;
  error['ws_notifications'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/user/notifications`, {
      method: 'PATCH',
      headers,
      
    });
    
    const data = await response.json();
    responses['ws_notifications'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['ws_notifications'] = err.message;
  } finally {
    loading['ws_notifications'] = false;
  }
}

const ws_profile = async () => {
  loading['ws_profile'] = true;
  error['ws_profile'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/user/profile`, {
      method: 'PATCH',
      headers,
      
    });
    
    const data = await response.json();
    responses['ws_profile'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['ws_profile'] = err.message;
  } finally {
    loading['ws_profile'] = false;
  }
}
</script>

<style scoped>
.interactive-api-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.auth-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.auth-header h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.auth-controls {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-group input, .form-group textarea {
  padding: 0.75rem;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.token-input {
  position: relative;
  display: flex;
}

.token-input input {
  flex: 1;
  margin-right: 0.5rem;
}

.toggle-token {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toggle-token:hover {
  background: rgba(255, 255, 255, 0.3);
}

.endpoints-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.endpoint-section {
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.endpoint-header {
  background: #f8f9fa;
  padding: 1.5rem;
  border-bottom: 1px solid #e1e5e9;
}

.endpoint-header h3 {
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.3rem;
}

.method-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.method-badge.get { background: #e3f2fd; color: #1976d2; }
.method-badge.post { background: #e8f5e8; color: #388e3c; }
.method-badge.put { background: #fff3e0; color: #f57c00; }
.method-badge.delete { background: #ffebee; color: #d32f2f; }

.endpoint-description {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.endpoint-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 400px;
}

.endpoint-docs {
  padding: 1.5rem;
  border-right: 1px solid #e1e5e9;
  background: #fafafa;
}

.endpoint-testing {
  padding: 1.5rem;
  background: white;
}

.endpoint-docs h4, .endpoint-testing h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

.parameter-list {
  margin-bottom: 1.5rem;
}

.parameter-item {
  padding: 1rem;
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.parameter-item strong {
  color: #333;
  font-size: 0.95rem;
}

.param-type {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.param-required {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.param-required.required {
  background: #ffebee;
  color: #d32f2f;
}

.param-required.optional {
  background: #e8f5e8;
  color: #388e3c;
}

.param-description {
  margin: 0.5rem 0 0 0;
  color: #666;
  font-size: 0.85rem;
}

.code-block {
  background: #f5f5f5;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  padding: 1rem;
  margin: 1rem 0;
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.4;
  color: #333;
}

.json-editor {
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  resize: vertical;
}

.test-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 1rem;
}

.test-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.test-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background: #ffebee;
  color: #d32f2f;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  border-left: 4px solid #d32f2f;
}

.response-section {
  margin-top: 1.5rem;
}

.response-section h5 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-weight: 600;
}

.response-data {
  background: #f8f9fa;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
}

.response-data pre {
  margin: 0;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.4;
  color: #333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .auth-controls {
    grid-template-columns: 1fr;
  }
  
  .endpoint-content {
    grid-template-columns: 1fr;
  }
  
  .endpoint-docs {
    border-right: none;
    border-bottom: 1px solid #e1e5e9;
  }
}
</style>