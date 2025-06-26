<template>
  <div class="interactive-api-container">
    <!-- Authentication Header -->
    <div class="auth-header">
      <h2>🔗 Wa API Testing</h2>
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
      
        <!-- GET /wallet/balances -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /wallet/balances
            </h3>
            <p class="endpoint-description">Get balances</p>
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
                  <strong>type</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Balance type
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>coin</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Comma-separated list of coins. Can be empty</p>
                </div>
                
                <div class="parameter-item">
                  <strong>sortBy</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Comma-separated list of sort balances. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *coin, total, available,locked*
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/wallet/balances" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="list_wallet_balances" 
                :disabled="loading['list_wallet_balances']"
                class="test-button"
              >
                {{ loading['list_wallet_balances'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['list_wallet_balances']" class="error-message">
                ❌ Error: {{ error['list_wallet_balances'] }}
              </div>
              
              <div v-if="responses['list_wallet_balances']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['list_wallet_balances'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /wallet/total-balance -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /wallet/total-balance
            </h3>
            <p class="endpoint-description">Get total balance in USD</p>
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
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/wallet/total-balance" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="get_wallet_total_balance" 
                :disabled="loading['get_wallet_total_balance']"
                class="test-button"
              >
                {{ loading['get_wallet_total_balance'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['get_wallet_total_balance']" class="error-message">
                ❌ Error: {{ error['get_wallet_total_balance'] }}
              </div>
              
              <div v-if="responses['get_wallet_total_balance']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['get_wallet_total_balance'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /wallet/transactions -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /wallet/transactions
            </h3>
            <p class="endpoint-description">Get user transactions history.</p>
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
                  <strong>statuses</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Comma-separated list of transaction statuses
  Available values: *new, rejected, completed, pending, failed*
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>coin</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Transaction coin
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>amount</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Amount of transaction
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>type</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Type of transaction
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>from</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Get transactions created after the _from_ timestamp (in seconds)
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>to</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Get transactions created before the _to_ timestamp (in seconds)
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>sortBy</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *created_at, type, amount, coin, status*
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>limit</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Limit of records in request
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>offset</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Offset of records in request
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>search</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">User ID; wallet address; transaction hash; Recipient email (for internal transfer sent by email);
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/wallet/transactions" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="wallet_transactions" 
                :disabled="loading['wallet_transactions']"
                class="test-button"
              >
                {{ loading['wallet_transactions'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['wallet_transactions']" class="error-message">
                ❌ Error: {{ error['wallet_transactions'] }}
              </div>
              
              <div v-if="responses['wallet_transactions']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['wallet_transactions'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /wallet/transactions/deposit -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /wallet/transactions/deposit
            </h3>
            <p class="endpoint-description">Returns deposit address for coin+chain. Result is described here.
https://bybit-exchange.github.io/docs/v5/asset/deposit/sub-deposit-addr</p>
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
                  <strong>coin</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Coin</p>
                </div>
                
                <div class="parameter-item">
                  <strong>chainType</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Chain type</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/wallet/transactions/deposit" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="get_deposit_address" 
                :disabled="loading['get_deposit_address']"
                class="test-button"
              >
                {{ loading['get_deposit_address'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['get_deposit_address']" class="error-message">
                ❌ Error: {{ error['get_deposit_address'] }}
              </div>
              
              <div v-if="responses['get_deposit_address']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['get_deposit_address'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /wallet/transactions/transfer -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /wallet/transactions/transfer
            </h3>
            <p class="endpoint-description">Create internal transfer (operation) between users.</p>
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
                  <strong>Body</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description"></p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X POST \
  "/wallet/transactions/transfer" \
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
                  v-model="requestBodies['create_transfer']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="create_transfer" 
                :disabled="loading['create_transfer']"
                class="test-button"
              >
                {{ loading['create_transfer'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['create_transfer']" class="error-message">
                ❌ Error: {{ error['create_transfer'] }}
              </div>
              
              <div v-if="responses['create_transfer']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['create_transfer'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /wallet/transactions/withdraw -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /wallet/transactions/withdraw
            </h3>
            <p class="endpoint-description">Create withdrawal (operation) for specified assets</p>
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
                  <strong>Body</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description"></p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X POST \
  "/wallet/transactions/withdraw" \
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
                  v-model="requestBodies['create_withdrawal']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="create_withdrawal" 
                :disabled="loading['create_withdrawal']"
                class="test-button"
              >
                {{ loading['create_withdrawal'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['create_withdrawal']" class="error-message">
                ❌ Error: {{ error['create_withdrawal'] }}
              </div>
              
              <div v-if="responses['create_withdrawal']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['create_withdrawal'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /wallet/transactions/withdraw/{uuid}/reject -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /wallet/transactions/withdraw/{uuid}/reject
            </h3>
            <p class="endpoint-description">Reject withdrawal confirmed by user.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>! Need Bearer token and OTP authorization</p>
              
              
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
                  <strong>uuid</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Transaction UUID
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>type</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Reject type
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X PUT \
  "/wallet/transactions/withdraw/{uuid}/reject" \
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
                  v-model="requestBodies['wallets_transactions_reject']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="wallets_transactions_reject" 
                :disabled="loading['wallets_transactions_reject']"
                class="test-button"
              >
                {{ loading['wallets_transactions_reject'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['wallets_transactions_reject']" class="error-message">
                ❌ Error: {{ error['wallets_transactions_reject'] }}
              </div>
              
              <div v-if="responses['wallets_transactions_reject']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['wallets_transactions_reject'], null, 2) }}</code></pre>
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
const requestBodies = reactive({'create_transfer': '', 'create_withdrawal': '', 'wallets_transactions_reject': ''})

// Utility functions
const generateFingerprint = () => {
  return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

// API Methods
const list_wallet_balances = async () => {
  loading['list_wallet_balances'] = true;
  error['list_wallet_balances'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/wallet/balances`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['list_wallet_balances'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['list_wallet_balances'] = err.message;
  } finally {
    loading['list_wallet_balances'] = false;
  }
}

const get_wallet_total_balance = async () => {
  loading['get_wallet_total_balance'] = true;
  error['get_wallet_total_balance'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/wallet/total-balance`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['get_wallet_total_balance'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['get_wallet_total_balance'] = err.message;
  } finally {
    loading['get_wallet_total_balance'] = false;
  }
}

const wallet_transactions = async () => {
  loading['wallet_transactions'] = true;
  error['wallet_transactions'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/wallet/transactions`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['wallet_transactions'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['wallet_transactions'] = err.message;
  } finally {
    loading['wallet_transactions'] = false;
  }
}

const get_deposit_address = async () => {
  loading['get_deposit_address'] = true;
  error['get_deposit_address'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/wallet/transactions/deposit`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['get_deposit_address'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['get_deposit_address'] = err.message;
  } finally {
    loading['get_deposit_address'] = false;
  }
}

const create_transfer = async () => {
  loading['create_transfer'] = true;
  error['create_transfer'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['create_transfer'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/wallet/transactions/transfer`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['create_transfer'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['create_transfer'] = err.message;
  } finally {
    loading['create_transfer'] = false;
  }
}

const create_withdrawal = async () => {
  loading['create_withdrawal'] = true;
  error['create_withdrawal'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['create_withdrawal'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/wallet/transactions/withdraw`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['create_withdrawal'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['create_withdrawal'] = err.message;
  } finally {
    loading['create_withdrawal'] = false;
  }
}

const wallets_transactions_reject = async () => {
  loading['wallets_transactions_reject'] = true;
  error['wallets_transactions_reject'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['wallets_transactions_reject'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/wallet/transactions/withdraw/{uuid}/reject`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['wallets_transactions_reject'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['wallets_transactions_reject'] = err.message;
  } finally {
    loading['wallets_transactions_reject'] = false;
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