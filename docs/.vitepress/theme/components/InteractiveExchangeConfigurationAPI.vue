<template>
  <div class="interactive-api-container">
    <!-- Authentication Header -->
    <div class="auth-header">
      <h2>🔗 ExchangeConfiguration API Testing</h2>
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
      
        <!-- GET /config/assets -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /config/assets
            </h3>
            <p class="endpoint-description">Returns assets. Result is described here.
https://bybit-exchange.github.io/docs/v5/asset/coin-info</p>
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
                  <strong>sortBy</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *coin, id, name*
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>search</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Search by coin, id
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/config/assets" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="list_assets" 
                :disabled="loading['list_assets']"
                class="test-button"
              >
                {{ loading['list_assets'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['list_assets']" class="error-message">
                ❌ Error: {{ error['list_assets'] }}
              </div>
              
              <div v-if="responses['list_assets']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['list_assets'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /config/assets/networks -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /config/assets/networks
            </h3>
            <p class="endpoint-description">Returns networks (asset + chain) with trading/transaction states info.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Returns networks (asset + chain) with trading/transaction states info.</p>
              
              
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
                  <strong>activityType</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Activity type
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>activityEnabled</strong>
                  <span class="param-type">bool</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Deposit, withdrawal, trading enabled/disabled
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>sortBy</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *coin, network*
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>search</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Search by coin, network
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/config/assets/networks" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="list_assets_networks" 
                :disabled="loading['list_assets_networks']"
                class="test-button"
              >
                {{ loading['list_assets_networks'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['list_assets_networks']" class="error-message">
                ❌ Error: {{ error['list_assets_networks'] }}
              </div>
              
              <div v-if="responses['list_assets_networks']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['list_assets_networks'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /config/flags -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /config/flags
            </h3>
            <p class="endpoint-description">Get global flags</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Get global flags</p>
              
              
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
  "/config/flags" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="get_global_flags" 
                :disabled="loading['get_global_flags']"
                class="test-button"
              >
                {{ loading['get_global_flags'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['get_global_flags']" class="error-message">
                ❌ Error: {{ error['get_global_flags'] }}
              </div>
              
              <div v-if="responses['get_global_flags']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['get_global_flags'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /config/spot/lite-symbols -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /config/spot/lite-symbols
            </h3>
            <p class="endpoint-description">Returns spot ticker + ticker info, where quoteCoin = USDC. Result is described here.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>https://bybit-exchange.github.io/docs/v5/market/tickers
https://bybit-exchange.github.io/docs/v5/market/instrument</p>
              
              
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
                  <strong>category</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">symbol category</p>
                </div>
                
                <div class="parameter-item">
                  <strong>baseCoin</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">filter baseCoin</p>
                </div>
                
                <div class="parameter-item">
                  <strong>tradingEnabled</strong>
                  <span class="param-type">bool</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">trading status</p>
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
                  <strong>sortBy</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *symbol, lastPrice, price24hPcnt, id*
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>search</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Search by name, id
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/config/spot/lite-symbols" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="list_spot_lite_symbols" 
                :disabled="loading['list_spot_lite_symbols']"
                class="test-button"
              >
                {{ loading['list_spot_lite_symbols'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['list_spot_lite_symbols']" class="error-message">
                ❌ Error: {{ error['list_spot_lite_symbols'] }}
              </div>
              
              <div v-if="responses['list_spot_lite_symbols']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['list_spot_lite_symbols'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /config/spot/symbols -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /config/spot/symbols
            </h3>
            <p class="endpoint-description">Returns spot ticker + ticker info. Result is described here.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>https://bybit-exchange.github.io/docs/v5/market/tickers
https://bybit-exchange.github.io/docs/v5/market/instrument</p>
              
              
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
                  <strong>category</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">symbol category</p>
                </div>
                
                <div class="parameter-item">
                  <strong>baseCoin</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">filter baseCoin</p>
                </div>
                
                <div class="parameter-item">
                  <strong>tradingEnabled</strong>
                  <span class="param-type">bool</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">trading status</p>
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
                  <strong>sortBy</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *symbol, lastPrice, price24hPcnt, id*
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>search</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Search by name, id
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/config/spot/symbols" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="list_spot_symbols" 
                :disabled="loading['list_spot_symbols']"
                class="test-button"
              >
                {{ loading['list_spot_symbols'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['list_spot_symbols']" class="error-message">
                ❌ Error: {{ error['list_spot_symbols'] }}
              </div>
              
              <div v-if="responses['list_spot_symbols']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['list_spot_symbols'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /config/withdrawal -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /config/withdrawal
            </h3>
            <p class="endpoint-description">Get withdrawal configuration for KYC levels.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Get withdrawal configuration for KYC levels.</p>
              
              
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
  "/config/withdrawal" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="get_withdrawal_config" 
                :disabled="loading['get_withdrawal_config']"
                class="test-button"
              >
                {{ loading['get_withdrawal_config'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['get_withdrawal_config']" class="error-message">
                ❌ Error: {{ error['get_withdrawal_config'] }}
              </div>
              
              <div v-if="responses['get_withdrawal_config']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['get_withdrawal_config'], null, 2) }}</code></pre>
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
const list_assets = async () => {
  loading['list_assets'] = true;
  error['list_assets'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/config/assets`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['list_assets'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['list_assets'] = err.message;
  } finally {
    loading['list_assets'] = false;
  }
}

const list_assets_networks = async () => {
  loading['list_assets_networks'] = true;
  error['list_assets_networks'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/config/assets/networks`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['list_assets_networks'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['list_assets_networks'] = err.message;
  } finally {
    loading['list_assets_networks'] = false;
  }
}

const get_global_flags = async () => {
  loading['get_global_flags'] = true;
  error['get_global_flags'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/config/flags`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['get_global_flags'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['get_global_flags'] = err.message;
  } finally {
    loading['get_global_flags'] = false;
  }
}

const list_spot_lite_symbols = async () => {
  loading['list_spot_lite_symbols'] = true;
  error['list_spot_lite_symbols'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/config/spot/lite-symbols`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['list_spot_lite_symbols'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['list_spot_lite_symbols'] = err.message;
  } finally {
    loading['list_spot_lite_symbols'] = false;
  }
}

const list_spot_symbols = async () => {
  loading['list_spot_symbols'] = true;
  error['list_spot_symbols'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/config/spot/symbols`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['list_spot_symbols'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['list_spot_symbols'] = err.message;
  } finally {
    loading['list_spot_symbols'] = false;
  }
}

const get_withdrawal_config = async () => {
  loading['get_withdrawal_config'] = true;
  error['get_withdrawal_config'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/config/withdrawal`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['get_withdrawal_config'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['get_withdrawal_config'] = err.message;
  } finally {
    loading['get_withdrawal_config'] = false;
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