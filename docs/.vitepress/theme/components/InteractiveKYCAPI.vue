<template>
  <div class="interactive-api-container">
    <!-- Authentication Header -->
    <div class="auth-header">
      <h2>🔗 KYC API Testing</h2>
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
      
        <!-- POST /amlbot/callback -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /amlbot/callback
            </h3>
            <p class="endpoint-description">Receives callback messages during KYC procedure</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Receives callback messages during KYC procedure</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X POST \
  "/amlbot/callback" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              <div class="form-group">
                <label>Request Body (JSON):</label>
                <textarea 
                  v-model="requestBodies['callback']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="callback" 
                :disabled="loading['callback']"
                class="test-button"
              >
                {{ loading['callback'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['callback']" class="error-message">
                ❌ Error: {{ error['callback'] }}
              </div>
              
              <div v-if="responses['callback']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['callback'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /kyc/token -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /kyc/token
            </h3>
            <p class="endpoint-description">Queries and returns temporary access token needed for KYC procedure.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>! Need access token in bearer token authorization</p>
              
              
              <h4>📝 Parameters</h4>
              <div class="parameter-list">
                
                <div class="parameter-item">
                  <strong>Fingerprint</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">user device unique id</p>
                </div>
                
                <div class="parameter-item">
                  <strong>kind</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Kind of the flow that should be run with the requested access token
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/kyc/token" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="token" 
                :disabled="loading['token']"
                class="test-button"
              >
                {{ loading['token'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['token']" class="error-message">
                ❌ Error: {{ error['token'] }}
              </div>
              
              <div v-if="responses['token']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['token'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /kyc/webhook -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /kyc/webhook
            </h3>
            <p class="endpoint-description">Receives webhook messages during KYC procedure</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Receives webhook messages during KYC procedure</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X POST \
  "/kyc/webhook" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              <div class="form-group">
                <label>Request Body (JSON):</label>
                <textarea 
                  v-model="requestBodies['webhook']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="webhook" 
                :disabled="loading['webhook']"
                class="test-button"
              >
                {{ loading['webhook'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['webhook']" class="error-message">
                ❌ Error: {{ error['webhook'] }}
              </div>
              
              <div v-if="responses['webhook']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['webhook'], null, 2) }}</code></pre>
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
const requestBodies = reactive({'callback': '', 'webhook': ''})

// Utility functions
const generateFingerprint = () => {
  return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

// API Methods
const callback = async () => {
  loading['callback'] = true;
  error['callback'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['callback'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/amlbot/callback`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['callback'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['callback'] = err.message;
  } finally {
    loading['callback'] = false;
  }
}

const token = async () => {
  loading['token'] = true;
  error['token'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/kyc/token`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['token'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['token'] = err.message;
  } finally {
    loading['token'] = false;
  }
}

const webhook = async () => {
  loading['webhook'] = true;
  error['webhook'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['webhook'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/kyc/webhook`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['webhook'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['webhook'] = err.message;
  } finally {
    loading['webhook'] = false;
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