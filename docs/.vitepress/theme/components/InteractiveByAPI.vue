<template>
  <div class="interactive-api-container">
    <!-- Authentication Header -->
    <div class="auth-header">
      <h2>🔗 By API Testing</h2>
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
      
        <!-- GET /v5/account/wallet-balance -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/account/wallet-balance
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/account/wallet-balance" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_account_walletBalance" 
                :disabled="loading['GET__v5_account_walletBalance']"
                class="test-button"
              >
                {{ loading['GET__v5_account_walletBalance'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_account_walletBalance']" class="error-message">
                ❌ Error: {{ error['GET__v5_account_walletBalance'] }}
              </div>
              
              <div v-if="responses['GET__v5_account_walletBalance']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_account_walletBalance'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/asset/coin/query-info -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/asset/coin/query-info
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/asset/coin/query-info" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_asset_coin_queryInfo" 
                :disabled="loading['GET__v5_asset_coin_queryInfo']"
                class="test-button"
              >
                {{ loading['GET__v5_asset_coin_queryInfo'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_asset_coin_queryInfo']" class="error-message">
                ❌ Error: {{ error['GET__v5_asset_coin_queryInfo'] }}
              </div>
              
              <div v-if="responses['GET__v5_asset_coin_queryInfo']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_asset_coin_queryInfo'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/asset/deposit/query-allowed-list -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/asset/deposit/query-allowed-list
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/asset/deposit/query-allowed-list" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_asset_deposit_queryAllowedList" 
                :disabled="loading['GET__v5_asset_deposit_queryAllowedList']"
                class="test-button"
              >
                {{ loading['GET__v5_asset_deposit_queryAllowedList'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_asset_deposit_queryAllowedList']" class="error-message">
                ❌ Error: {{ error['GET__v5_asset_deposit_queryAllowedList'] }}
              </div>
              
              <div v-if="responses['GET__v5_asset_deposit_queryAllowedList']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_asset_deposit_queryAllowedList'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/asset/deposit/query-internal-record -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/asset/deposit/query-internal-record
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/asset/deposit/query-internal-record" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_asset_deposit_queryInternalRecord" 
                :disabled="loading['GET__v5_asset_deposit_queryInternalRecord']"
                class="test-button"
              >
                {{ loading['GET__v5_asset_deposit_queryInternalRecord'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_asset_deposit_queryInternalRecord']" class="error-message">
                ❌ Error: {{ error['GET__v5_asset_deposit_queryInternalRecord'] }}
              </div>
              
              <div v-if="responses['GET__v5_asset_deposit_queryInternalRecord']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_asset_deposit_queryInternalRecord'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/asset/deposit/query-record -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/asset/deposit/query-record
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/asset/deposit/query-record" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_asset_deposit_queryRecord" 
                :disabled="loading['GET__v5_asset_deposit_queryRecord']"
                class="test-button"
              >
                {{ loading['GET__v5_asset_deposit_queryRecord'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_asset_deposit_queryRecord']" class="error-message">
                ❌ Error: {{ error['GET__v5_asset_deposit_queryRecord'] }}
              </div>
              
              <div v-if="responses['GET__v5_asset_deposit_queryRecord']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_asset_deposit_queryRecord'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /v5/asset/transfer/inter-transfer -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /v5/asset/transfer/inter-transfer
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X POST \
  "/v5/asset/transfer/inter-transfer" \
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
                  v-model="requestBodies['POST__v5_asset_transfer_interTransfer']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="POST__v5_asset_transfer_interTransfer" 
                :disabled="loading['POST__v5_asset_transfer_interTransfer']"
                class="test-button"
              >
                {{ loading['POST__v5_asset_transfer_interTransfer'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['POST__v5_asset_transfer_interTransfer']" class="error-message">
                ❌ Error: {{ error['POST__v5_asset_transfer_interTransfer'] }}
              </div>
              
              <div v-if="responses['POST__v5_asset_transfer_interTransfer']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['POST__v5_asset_transfer_interTransfer'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/asset/transfer/query-account-coin-balance -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/asset/transfer/query-account-coin-balance
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/asset/transfer/query-account-coin-balance" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_asset_transfer_queryAccountCoinBalance" 
                :disabled="loading['GET__v5_asset_transfer_queryAccountCoinBalance']"
                class="test-button"
              >
                {{ loading['GET__v5_asset_transfer_queryAccountCoinBalance'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_asset_transfer_queryAccountCoinBalance']" class="error-message">
                ❌ Error: {{ error['GET__v5_asset_transfer_queryAccountCoinBalance'] }}
              </div>
              
              <div v-if="responses['GET__v5_asset_transfer_queryAccountCoinBalance']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_asset_transfer_queryAccountCoinBalance'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/asset/transfer/query-account-coins-balance -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/asset/transfer/query-account-coins-balance
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/asset/transfer/query-account-coins-balance" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_asset_transfer_queryAccountCoinsBalance" 
                :disabled="loading['GET__v5_asset_transfer_queryAccountCoinsBalance']"
                class="test-button"
              >
                {{ loading['GET__v5_asset_transfer_queryAccountCoinsBalance'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_asset_transfer_queryAccountCoinsBalance']" class="error-message">
                ❌ Error: {{ error['GET__v5_asset_transfer_queryAccountCoinsBalance'] }}
              </div>
              
              <div v-if="responses['GET__v5_asset_transfer_queryAccountCoinsBalance']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_asset_transfer_queryAccountCoinsBalance'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/asset/transfer/query-asset-info -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/asset/transfer/query-asset-info
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/asset/transfer/query-asset-info" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_asset_transfer_queryAssetInfo" 
                :disabled="loading['GET__v5_asset_transfer_queryAssetInfo']"
                class="test-button"
              >
                {{ loading['GET__v5_asset_transfer_queryAssetInfo'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_asset_transfer_queryAssetInfo']" class="error-message">
                ❌ Error: {{ error['GET__v5_asset_transfer_queryAssetInfo'] }}
              </div>
              
              <div v-if="responses['GET__v5_asset_transfer_queryAssetInfo']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_asset_transfer_queryAssetInfo'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/asset/transfer/query-inter-transfer-list -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/asset/transfer/query-inter-transfer-list
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/asset/transfer/query-inter-transfer-list" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_asset_transfer_queryInterTransferList" 
                :disabled="loading['GET__v5_asset_transfer_queryInterTransferList']"
                class="test-button"
              >
                {{ loading['GET__v5_asset_transfer_queryInterTransferList'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_asset_transfer_queryInterTransferList']" class="error-message">
                ❌ Error: {{ error['GET__v5_asset_transfer_queryInterTransferList'] }}
              </div>
              
              <div v-if="responses['GET__v5_asset_transfer_queryInterTransferList']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_asset_transfer_queryInterTransferList'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/asset/transfer/query-transfer-coin-list -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/asset/transfer/query-transfer-coin-list
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/asset/transfer/query-transfer-coin-list" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_asset_transfer_queryTransferCoinList" 
                :disabled="loading['GET__v5_asset_transfer_queryTransferCoinList']"
                class="test-button"
              >
                {{ loading['GET__v5_asset_transfer_queryTransferCoinList'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_asset_transfer_queryTransferCoinList']" class="error-message">
                ❌ Error: {{ error['GET__v5_asset_transfer_queryTransferCoinList'] }}
              </div>
              
              <div v-if="responses['GET__v5_asset_transfer_queryTransferCoinList']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_asset_transfer_queryTransferCoinList'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/asset/withdraw/query-record -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/asset/withdraw/query-record
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/asset/withdraw/query-record" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_asset_withdraw_queryRecord" 
                :disabled="loading['GET__v5_asset_withdraw_queryRecord']"
                class="test-button"
              >
                {{ loading['GET__v5_asset_withdraw_queryRecord'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_asset_withdraw_queryRecord']" class="error-message">
                ❌ Error: {{ error['GET__v5_asset_withdraw_queryRecord'] }}
              </div>
              
              <div v-if="responses['GET__v5_asset_withdraw_queryRecord']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_asset_withdraw_queryRecord'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/asset/withdraw/withdrawable-amount -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/asset/withdraw/withdrawable-amount
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/asset/withdraw/withdrawable-amount" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_asset_withdraw_withdrawableAmount" 
                :disabled="loading['GET__v5_asset_withdraw_withdrawableAmount']"
                class="test-button"
              >
                {{ loading['GET__v5_asset_withdraw_withdrawableAmount'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_asset_withdraw_withdrawableAmount']" class="error-message">
                ❌ Error: {{ error['GET__v5_asset_withdraw_withdrawableAmount'] }}
              </div>
              
              <div v-if="responses['GET__v5_asset_withdraw_withdrawableAmount']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_asset_withdraw_withdrawableAmount'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/execution/list -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/execution/list
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/execution/list" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_execution_list" 
                :disabled="loading['GET__v5_execution_list']"
                class="test-button"
              >
                {{ loading['GET__v5_execution_list'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_execution_list']" class="error-message">
                ❌ Error: {{ error['GET__v5_execution_list'] }}
              </div>
              
              <div v-if="responses['GET__v5_execution_list']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_execution_list'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/market/index-price-kline -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/market/index-price-kline
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/market/index-price-kline" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_market_indexPriceKline" 
                :disabled="loading['GET__v5_market_indexPriceKline']"
                class="test-button"
              >
                {{ loading['GET__v5_market_indexPriceKline'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_market_indexPriceKline']" class="error-message">
                ❌ Error: {{ error['GET__v5_market_indexPriceKline'] }}
              </div>
              
              <div v-if="responses['GET__v5_market_indexPriceKline']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_market_indexPriceKline'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/market/instruments-info -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/market/instruments-info
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/market/instruments-info" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_market_instrumentsInfo" 
                :disabled="loading['GET__v5_market_instrumentsInfo']"
                class="test-button"
              >
                {{ loading['GET__v5_market_instrumentsInfo'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_market_instrumentsInfo']" class="error-message">
                ❌ Error: {{ error['GET__v5_market_instrumentsInfo'] }}
              </div>
              
              <div v-if="responses['GET__v5_market_instrumentsInfo']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_market_instrumentsInfo'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/market/kline -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/market/kline
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/market/kline" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_market_kline" 
                :disabled="loading['GET__v5_market_kline']"
                class="test-button"
              >
                {{ loading['GET__v5_market_kline'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_market_kline']" class="error-message">
                ❌ Error: {{ error['GET__v5_market_kline'] }}
              </div>
              
              <div v-if="responses['GET__v5_market_kline']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_market_kline'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/market/mark-price-kline -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/market/mark-price-kline
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/market/mark-price-kline" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_market_markPriceKline" 
                :disabled="loading['GET__v5_market_markPriceKline']"
                class="test-button"
              >
                {{ loading['GET__v5_market_markPriceKline'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_market_markPriceKline']" class="error-message">
                ❌ Error: {{ error['GET__v5_market_markPriceKline'] }}
              </div>
              
              <div v-if="responses['GET__v5_market_markPriceKline']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_market_markPriceKline'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/market/orderbook -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/market/orderbook
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/market/orderbook" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_market_orderbook" 
                :disabled="loading['GET__v5_market_orderbook']"
                class="test-button"
              >
                {{ loading['GET__v5_market_orderbook'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_market_orderbook']" class="error-message">
                ❌ Error: {{ error['GET__v5_market_orderbook'] }}
              </div>
              
              <div v-if="responses['GET__v5_market_orderbook']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_market_orderbook'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/market/recent-trade -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/market/recent-trade
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/market/recent-trade" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_market_recentTrade" 
                :disabled="loading['GET__v5_market_recentTrade']"
                class="test-button"
              >
                {{ loading['GET__v5_market_recentTrade'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_market_recentTrade']" class="error-message">
                ❌ Error: {{ error['GET__v5_market_recentTrade'] }}
              </div>
              
              <div v-if="responses['GET__v5_market_recentTrade']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_market_recentTrade'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/market/tickers -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/market/tickers
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/market/tickers" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_market_tickers" 
                :disabled="loading['GET__v5_market_tickers']"
                class="test-button"
              >
                {{ loading['GET__v5_market_tickers'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_market_tickers']" class="error-message">
                ❌ Error: {{ error['GET__v5_market_tickers'] }}
              </div>
              
              <div v-if="responses['GET__v5_market_tickers']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_market_tickers'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/market/time -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/market/time
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/market/time" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_market_time" 
                :disabled="loading['GET__v5_market_time']"
                class="test-button"
              >
                {{ loading['GET__v5_market_time'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_market_time']" class="error-message">
                ❌ Error: {{ error['GET__v5_market_time'] }}
              </div>
              
              <div v-if="responses['GET__v5_market_time']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_market_time'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /v5/order/amend -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /v5/order/amend
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X POST \
  "/v5/order/amend" \
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
                  v-model="requestBodies['POST__v5_order_amend']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="POST__v5_order_amend" 
                :disabled="loading['POST__v5_order_amend']"
                class="test-button"
              >
                {{ loading['POST__v5_order_amend'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['POST__v5_order_amend']" class="error-message">
                ❌ Error: {{ error['POST__v5_order_amend'] }}
              </div>
              
              <div v-if="responses['POST__v5_order_amend']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['POST__v5_order_amend'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /v5/order/cancel-all -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /v5/order/cancel-all
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X POST \
  "/v5/order/cancel-all" \
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
                  v-model="requestBodies['POST__v5_order_cancelAll']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="POST__v5_order_cancelAll" 
                :disabled="loading['POST__v5_order_cancelAll']"
                class="test-button"
              >
                {{ loading['POST__v5_order_cancelAll'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['POST__v5_order_cancelAll']" class="error-message">
                ❌ Error: {{ error['POST__v5_order_cancelAll'] }}
              </div>
              
              <div v-if="responses['POST__v5_order_cancelAll']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['POST__v5_order_cancelAll'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/order/history -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/order/history
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/order/history" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_order_history" 
                :disabled="loading['GET__v5_order_history']"
                class="test-button"
              >
                {{ loading['GET__v5_order_history'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_order_history']" class="error-message">
                ❌ Error: {{ error['GET__v5_order_history'] }}
              </div>
              
              <div v-if="responses['GET__v5_order_history']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_order_history'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/order/realtime -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/order/realtime
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/order/realtime" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_order_realtime" 
                :disabled="loading['GET__v5_order_realtime']"
                class="test-button"
              >
                {{ loading['GET__v5_order_realtime'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_order_realtime']" class="error-message">
                ❌ Error: {{ error['GET__v5_order_realtime'] }}
              </div>
              
              <div v-if="responses['GET__v5_order_realtime']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_order_realtime'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /v5/order/spot-borrow-check -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /v5/order/spot-borrow-check
            </h3>
            <p class="endpoint-description"></p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>No description available</p>
              
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/v5/order/spot-borrow-check" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="GET__v5_order_spotBorrowCheck" 
                :disabled="loading['GET__v5_order_spotBorrowCheck']"
                class="test-button"
              >
                {{ loading['GET__v5_order_spotBorrowCheck'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['GET__v5_order_spotBorrowCheck']" class="error-message">
                ❌ Error: {{ error['GET__v5_order_spotBorrowCheck'] }}
              </div>
              
              <div v-if="responses['GET__v5_order_spotBorrowCheck']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['GET__v5_order_spotBorrowCheck'], null, 2) }}</code></pre>
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
const requestBodies = reactive({'POST__v5_asset_transfer_interTransfer': '', 'POST__v5_order_amend': '', 'POST__v5_order_cancelAll': ''})

// Utility functions
const generateFingerprint = () => {
  return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

// API Methods

    async GET__v5_account_walletBalance() {
      this.loading['GET__v5_account_walletBalance'] = true;
      this.error['GET__v5_account_walletBalance'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/account/wallet-balance`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_account_walletBalance'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_account_walletBalance'] = err.message;
      } finally {
        this.loading['GET__v5_account_walletBalance'] = false;
      }
    },
    async GET__v5_asset_coin_queryInfo() {
      this.loading['GET__v5_asset_coin_queryInfo'] = true;
      this.error['GET__v5_asset_coin_queryInfo'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/coin/query-info`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_asset_coin_queryInfo'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_asset_coin_queryInfo'] = err.message;
      } finally {
        this.loading['GET__v5_asset_coin_queryInfo'] = false;
      }
    },
    async GET__v5_asset_deposit_queryAllowedList() {
      this.loading['GET__v5_asset_deposit_queryAllowedList'] = true;
      this.error['GET__v5_asset_deposit_queryAllowedList'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/deposit/query-allowed-list`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_asset_deposit_queryAllowedList'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_asset_deposit_queryAllowedList'] = err.message;
      } finally {
        this.loading['GET__v5_asset_deposit_queryAllowedList'] = false;
      }
    },
    async GET__v5_asset_deposit_queryInternalRecord() {
      this.loading['GET__v5_asset_deposit_queryInternalRecord'] = true;
      this.error['GET__v5_asset_deposit_queryInternalRecord'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/deposit/query-internal-record`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_asset_deposit_queryInternalRecord'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_asset_deposit_queryInternalRecord'] = err.message;
      } finally {
        this.loading['GET__v5_asset_deposit_queryInternalRecord'] = false;
      }
    },
    async GET__v5_asset_deposit_queryRecord() {
      this.loading['GET__v5_asset_deposit_queryRecord'] = true;
      this.error['GET__v5_asset_deposit_queryRecord'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/deposit/query-record`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_asset_deposit_queryRecord'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_asset_deposit_queryRecord'] = err.message;
      } finally {
        this.loading['GET__v5_asset_deposit_queryRecord'] = false;
      }
    },
    async POST__v5_asset_transfer_interTransfer() {
      this.loading['POST__v5_asset_transfer_interTransfer'] = true;
      this.error['POST__v5_asset_transfer_interTransfer'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        const body = this.requestBodies['POST__v5_asset_transfer_interTransfer'] || {};
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/transfer/inter-transfer`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body)
        });
        
        const data = await response.json();
        this.responses['POST__v5_asset_transfer_interTransfer'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['POST__v5_asset_transfer_interTransfer'] = err.message;
      } finally {
        this.loading['POST__v5_asset_transfer_interTransfer'] = false;
      }
    },
    async GET__v5_asset_transfer_queryAccountCoinBalance() {
      this.loading['GET__v5_asset_transfer_queryAccountCoinBalance'] = true;
      this.error['GET__v5_asset_transfer_queryAccountCoinBalance'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/transfer/query-account-coin-balance`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_asset_transfer_queryAccountCoinBalance'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_asset_transfer_queryAccountCoinBalance'] = err.message;
      } finally {
        this.loading['GET__v5_asset_transfer_queryAccountCoinBalance'] = false;
      }
    },
    async GET__v5_asset_transfer_queryAccountCoinsBalance() {
      this.loading['GET__v5_asset_transfer_queryAccountCoinsBalance'] = true;
      this.error['GET__v5_asset_transfer_queryAccountCoinsBalance'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/transfer/query-account-coins-balance`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_asset_transfer_queryAccountCoinsBalance'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_asset_transfer_queryAccountCoinsBalance'] = err.message;
      } finally {
        this.loading['GET__v5_asset_transfer_queryAccountCoinsBalance'] = false;
      }
    },
    async GET__v5_asset_transfer_queryAssetInfo() {
      this.loading['GET__v5_asset_transfer_queryAssetInfo'] = true;
      this.error['GET__v5_asset_transfer_queryAssetInfo'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/transfer/query-asset-info`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_asset_transfer_queryAssetInfo'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_asset_transfer_queryAssetInfo'] = err.message;
      } finally {
        this.loading['GET__v5_asset_transfer_queryAssetInfo'] = false;
      }
    },
    async GET__v5_asset_transfer_queryInterTransferList() {
      this.loading['GET__v5_asset_transfer_queryInterTransferList'] = true;
      this.error['GET__v5_asset_transfer_queryInterTransferList'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/transfer/query-inter-transfer-list`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_asset_transfer_queryInterTransferList'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_asset_transfer_queryInterTransferList'] = err.message;
      } finally {
        this.loading['GET__v5_asset_transfer_queryInterTransferList'] = false;
      }
    },
    async GET__v5_asset_transfer_queryTransferCoinList() {
      this.loading['GET__v5_asset_transfer_queryTransferCoinList'] = true;
      this.error['GET__v5_asset_transfer_queryTransferCoinList'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/transfer/query-transfer-coin-list`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_asset_transfer_queryTransferCoinList'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_asset_transfer_queryTransferCoinList'] = err.message;
      } finally {
        this.loading['GET__v5_asset_transfer_queryTransferCoinList'] = false;
      }
    },
    async GET__v5_asset_withdraw_queryRecord() {
      this.loading['GET__v5_asset_withdraw_queryRecord'] = true;
      this.error['GET__v5_asset_withdraw_queryRecord'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/withdraw/query-record`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_asset_withdraw_queryRecord'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_asset_withdraw_queryRecord'] = err.message;
      } finally {
        this.loading['GET__v5_asset_withdraw_queryRecord'] = false;
      }
    },
    async GET__v5_asset_withdraw_withdrawableAmount() {
      this.loading['GET__v5_asset_withdraw_withdrawableAmount'] = true;
      this.error['GET__v5_asset_withdraw_withdrawableAmount'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/asset/withdraw/withdrawable-amount`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_asset_withdraw_withdrawableAmount'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_asset_withdraw_withdrawableAmount'] = err.message;
      } finally {
        this.loading['GET__v5_asset_withdraw_withdrawableAmount'] = false;
      }
    },
    async GET__v5_execution_list() {
      this.loading['GET__v5_execution_list'] = true;
      this.error['GET__v5_execution_list'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/execution/list`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_execution_list'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_execution_list'] = err.message;
      } finally {
        this.loading['GET__v5_execution_list'] = false;
      }
    },
    async GET__v5_market_indexPriceKline() {
      this.loading['GET__v5_market_indexPriceKline'] = true;
      this.error['GET__v5_market_indexPriceKline'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/market/index-price-kline`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_market_indexPriceKline'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_market_indexPriceKline'] = err.message;
      } finally {
        this.loading['GET__v5_market_indexPriceKline'] = false;
      }
    },
    async GET__v5_market_instrumentsInfo() {
      this.loading['GET__v5_market_instrumentsInfo'] = true;
      this.error['GET__v5_market_instrumentsInfo'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/market/instruments-info`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_market_instrumentsInfo'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_market_instrumentsInfo'] = err.message;
      } finally {
        this.loading['GET__v5_market_instrumentsInfo'] = false;
      }
    },
    async GET__v5_market_kline() {
      this.loading['GET__v5_market_kline'] = true;
      this.error['GET__v5_market_kline'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/market/kline`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_market_kline'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_market_kline'] = err.message;
      } finally {
        this.loading['GET__v5_market_kline'] = false;
      }
    },
    async GET__v5_market_markPriceKline() {
      this.loading['GET__v5_market_markPriceKline'] = true;
      this.error['GET__v5_market_markPriceKline'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/market/mark-price-kline`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_market_markPriceKline'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_market_markPriceKline'] = err.message;
      } finally {
        this.loading['GET__v5_market_markPriceKline'] = false;
      }
    },
    async GET__v5_market_orderbook() {
      this.loading['GET__v5_market_orderbook'] = true;
      this.error['GET__v5_market_orderbook'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/market/orderbook`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_market_orderbook'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_market_orderbook'] = err.message;
      } finally {
        this.loading['GET__v5_market_orderbook'] = false;
      }
    },
    async GET__v5_market_recentTrade() {
      this.loading['GET__v5_market_recentTrade'] = true;
      this.error['GET__v5_market_recentTrade'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/market/recent-trade`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_market_recentTrade'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_market_recentTrade'] = err.message;
      } finally {
        this.loading['GET__v5_market_recentTrade'] = false;
      }
    },
    async GET__v5_market_tickers() {
      this.loading['GET__v5_market_tickers'] = true;
      this.error['GET__v5_market_tickers'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/market/tickers`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_market_tickers'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_market_tickers'] = err.message;
      } finally {
        this.loading['GET__v5_market_tickers'] = false;
      }
    },
    async GET__v5_market_time() {
      this.loading['GET__v5_market_time'] = true;
      this.error['GET__v5_market_time'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/market/time`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_market_time'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_market_time'] = err.message;
      } finally {
        this.loading['GET__v5_market_time'] = false;
      }
    },
    async POST__v5_order_amend() {
      this.loading['POST__v5_order_amend'] = true;
      this.error['POST__v5_order_amend'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        const body = this.requestBodies['POST__v5_order_amend'] || {};
        
        
        const response = await fetch(`${this.apiUrl}/v5/order/amend`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body)
        });
        
        const data = await response.json();
        this.responses['POST__v5_order_amend'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['POST__v5_order_amend'] = err.message;
      } finally {
        this.loading['POST__v5_order_amend'] = false;
      }
    },
    async POST__v5_order_cancelAll() {
      this.loading['POST__v5_order_cancelAll'] = true;
      this.error['POST__v5_order_cancelAll'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        const body = this.requestBodies['POST__v5_order_cancelAll'] || {};
        
        
        const response = await fetch(`${this.apiUrl}/v5/order/cancel-all`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body)
        });
        
        const data = await response.json();
        this.responses['POST__v5_order_cancelAll'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['POST__v5_order_cancelAll'] = err.message;
      } finally {
        this.loading['POST__v5_order_cancelAll'] = false;
      }
    },
    async GET__v5_order_history() {
      this.loading['GET__v5_order_history'] = true;
      this.error['GET__v5_order_history'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/order/history`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_order_history'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_order_history'] = err.message;
      } finally {
        this.loading['GET__v5_order_history'] = false;
      }
    },
    async GET__v5_order_realtime() {
      this.loading['GET__v5_order_realtime'] = true;
      this.error['GET__v5_order_realtime'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/order/realtime`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_order_realtime'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_order_realtime'] = err.message;
      } finally {
        this.loading['GET__v5_order_realtime'] = false;
      }
    },
    async GET__v5_order_spotBorrowCheck() {
      this.loading['GET__v5_order_spotBorrowCheck'] = true;
      this.error['GET__v5_order_spotBorrowCheck'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        
        
        
        const response = await fetch(`${this.apiUrl}/v5/order/spot-borrow-check`, {
          method: 'GET',
          headers,
          
        });
        
        const data = await response.json();
        this.responses['GET__v5_order_spotBorrowCheck'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['GET__v5_order_spotBorrowCheck'] = err.message;
      } finally {
        this.loading['GET__v5_order_spotBorrowCheck'] = false;
      }
    },
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