<template>
  <!-- Fixed Authentication Header -->
  <div class="auth-header-fixed" :class="{ 'collapsed': isHeaderCollapsed }">
    <div class="auth-container">
      <div class="auth-title">
        <h4>🔐 API Authentication</h4>
        <button @click="isHeaderCollapsed = !isHeaderCollapsed" class="collapse-toggle" :title="isHeaderCollapsed ? 'Expand header' : 'Collapse header'">
          {{ isHeaderCollapsed ? '⬇️' : '⬆️' }}
        </button>
      </div>
      <div class="api-config-row">
        <div class="config-group">
          <label class="config-label">🌐 API Base URL</label>
          <input 
            v-model="apiBaseUrl" 
            type="text" 
            placeholder="https://develop.okd.finance/api" 
            class="config-input" 
          />
        </div>
        <div class="config-group token-group">
          <label class="config-label">🔑 Access Token</label>
          <div class="token-input-group">
            <input 
              v-model="apiToken" 
              :type="showToken ? 'text' : 'password'" 
              placeholder="Paste your access token here (without 'Bearer')" 
              class="token-input" 
            />
            <button @click="showToken = !showToken" class="token-toggle" :title="showToken ? 'Hide token' : 'Show token'">
              {{ showToken ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>
      </div>
      <div class="status-row">
        <div v-if="apiBaseUrl" class="url-status">🌐 API: {{ apiBaseUrl }}</div>
        <div v-if="apiToken" class="token-status">✅ Token configured ({{ apiToken.length }} chars)</div>
      </div>
      <div class="token-hint">💡 Don't include "Bearer" - it's added automatically</div>
    </div>
  </div>

  <div class="interactive-api-container">
    <!-- Main Documentation and Testing Column -->
    <div class="main-content">
      
      <section id="GET__v5_account_walletBalance" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/account/wallet-balance</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_account_wallet-balance</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab1 = lang"
                    :class="['code-tab', { active: activeCodeTab1 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab1 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 1)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/account/wallet-balance" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_account_walletBalance" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_account_walletBalance" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_account_walletBalance.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_account_walletBalance.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_account_walletBalance.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_account_walletBalance.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_account_walletBalance.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_account_walletBalance.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_account_walletBalance.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_asset_coin_queryInfo" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/asset/coin/query-info</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_asset_coin_query-info</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab2 = lang"
                    :class="['code-tab', { active: activeCodeTab2 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab2 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 2)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/asset/coin/query-info" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_asset_coin_queryInfo" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_asset_coin_queryInfo" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_asset_coin_queryInfo.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_asset_coin_queryInfo.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_asset_coin_queryInfo.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_asset_coin_queryInfo.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_coin_queryInfo.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_coin_queryInfo.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_asset_coin_queryInfo.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_asset_deposit_queryAllowedList" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/asset/deposit/query-allowed-list</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_asset_deposit_query-allowed-list</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab3 = lang"
                    :class="['code-tab', { active: activeCodeTab3 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab3 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 3)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/asset/deposit/query-allowed-list" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_asset_deposit_queryAllowedList" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_asset_deposit_queryAllowedList" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_asset_deposit_queryAllowedList.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_asset_deposit_queryAllowedList.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_asset_deposit_queryAllowedList.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_asset_deposit_queryAllowedList.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_deposit_queryAllowedList.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_deposit_queryAllowedList.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_asset_deposit_queryAllowedList.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_asset_deposit_queryInternalRecord" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/asset/deposit/query-internal-record</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_asset_deposit_query-internal-record</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab4 = lang"
                    :class="['code-tab', { active: activeCodeTab4 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab4 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 4)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/asset/deposit/query-internal-record" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_asset_deposit_queryInternalRecord" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_asset_deposit_queryInternalRecord" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_asset_deposit_queryInternalRecord.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_asset_deposit_queryInternalRecord.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_asset_deposit_queryInternalRecord.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_asset_deposit_queryInternalRecord.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_deposit_queryInternalRecord.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_deposit_queryInternalRecord.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_asset_deposit_queryInternalRecord.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_asset_deposit_queryRecord" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/asset/deposit/query-record</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_asset_deposit_query-record</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab5 = lang"
                    :class="['code-tab', { active: activeCodeTab5 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab5 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 5)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/asset/deposit/query-record" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_asset_deposit_queryRecord" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_asset_deposit_queryRecord" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_asset_deposit_queryRecord.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_asset_deposit_queryRecord.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_asset_deposit_queryRecord.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_asset_deposit_queryRecord.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_deposit_queryRecord.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_deposit_queryRecord.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_asset_deposit_queryRecord.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="POST__v5_asset_transfer_interTransfer" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/v5/asset/transfer/inter-transfer</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">POST__v5_asset_transfer_inter-transfer</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab6 = lang"
                    :class="['code-tab', { active: activeCodeTab6 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab6 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 6)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X POST "https://develop.okd.finance/api/v5/asset/transfer/inter-transfer" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f" \
  -d '{}'</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testPOST__v5_asset_transfer_interTransfer" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.POST__v5_asset_transfer_interTransfer" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.POST__v5_asset_transfer_interTransfer.status }}</span>
                  <span class="timestamp">{{ results.POST__v5_asset_transfer_interTransfer.timestamp }}</span>
                  <button @click="copyToClipboard(results.POST__v5_asset_transfer_interTransfer.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.POST__v5_asset_transfer_interTransfer.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.POST__v5_asset_transfer_interTransfer.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.POST__v5_asset_transfer_interTransfer.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.POST__v5_asset_transfer_interTransfer.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.POST__v5_asset_transfer_interTransfer.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_asset_transfer_queryAccountCoinBalance" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/asset/transfer/query-account-coin-balance</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_asset_transfer_query-account-coin-balance</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab7 = lang"
                    :class="['code-tab', { active: activeCodeTab7 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab7 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 7)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/asset/transfer/query-account-coin-balance" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_asset_transfer_queryAccountCoinBalance" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_asset_transfer_queryAccountCoinBalance" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_asset_transfer_queryAccountCoinBalance.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_asset_transfer_queryAccountCoinBalance.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_asset_transfer_queryAccountCoinBalance.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_asset_transfer_queryAccountCoinBalance.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_transfer_queryAccountCoinBalance.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_transfer_queryAccountCoinBalance.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_asset_transfer_queryAccountCoinBalance.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_asset_transfer_queryAccountCoinsBalance" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/asset/transfer/query-account-coins-balance</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_asset_transfer_query-account-coins-balance</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab8 = lang"
                    :class="['code-tab', { active: activeCodeTab8 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab8 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 8)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/asset/transfer/query-account-coins-balance" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_asset_transfer_queryAccountCoinsBalance" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_asset_transfer_queryAccountCoinsBalance" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_asset_transfer_queryAccountCoinsBalance.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_asset_transfer_queryAccountCoinsBalance.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_asset_transfer_queryAccountCoinsBalance.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_asset_transfer_queryAccountCoinsBalance.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_transfer_queryAccountCoinsBalance.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_transfer_queryAccountCoinsBalance.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_asset_transfer_queryAccountCoinsBalance.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_asset_transfer_queryAssetInfo" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/asset/transfer/query-asset-info</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_asset_transfer_query-asset-info</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab9 = lang"
                    :class="['code-tab', { active: activeCodeTab9 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab9 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 9)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/asset/transfer/query-asset-info" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_asset_transfer_queryAssetInfo" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_asset_transfer_queryAssetInfo" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_asset_transfer_queryAssetInfo.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_asset_transfer_queryAssetInfo.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_asset_transfer_queryAssetInfo.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_asset_transfer_queryAssetInfo.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_transfer_queryAssetInfo.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_transfer_queryAssetInfo.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_asset_transfer_queryAssetInfo.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_asset_transfer_queryInterTransferList" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/asset/transfer/query-inter-transfer-list</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_asset_transfer_query-inter-transfer-list</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab10 = lang"
                    :class="['code-tab', { active: activeCodeTab10 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab10 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 10)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/asset/transfer/query-inter-transfer-list" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_asset_transfer_queryInterTransferList" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_asset_transfer_queryInterTransferList" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_asset_transfer_queryInterTransferList.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_asset_transfer_queryInterTransferList.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_asset_transfer_queryInterTransferList.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_asset_transfer_queryInterTransferList.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_transfer_queryInterTransferList.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_transfer_queryInterTransferList.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_asset_transfer_queryInterTransferList.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_asset_transfer_queryTransferCoinList" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/asset/transfer/query-transfer-coin-list</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_asset_transfer_query-transfer-coin-list</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab11 = lang"
                    :class="['code-tab', { active: activeCodeTab11 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab11 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 11)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/asset/transfer/query-transfer-coin-list" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_asset_transfer_queryTransferCoinList" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_asset_transfer_queryTransferCoinList" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_asset_transfer_queryTransferCoinList.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_asset_transfer_queryTransferCoinList.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_asset_transfer_queryTransferCoinList.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_asset_transfer_queryTransferCoinList.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_transfer_queryTransferCoinList.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_transfer_queryTransferCoinList.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_asset_transfer_queryTransferCoinList.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_asset_withdraw_queryRecord" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/asset/withdraw/query-record</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_asset_withdraw_query-record</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab12 = lang"
                    :class="['code-tab', { active: activeCodeTab12 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab12 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 12)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/asset/withdraw/query-record" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_asset_withdraw_queryRecord" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_asset_withdraw_queryRecord" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_asset_withdraw_queryRecord.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_asset_withdraw_queryRecord.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_asset_withdraw_queryRecord.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_asset_withdraw_queryRecord.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_withdraw_queryRecord.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_withdraw_queryRecord.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_asset_withdraw_queryRecord.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_asset_withdraw_withdrawableAmount" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/asset/withdraw/withdrawable-amount</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_asset_withdraw_withdrawable-amount</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab13 = lang"
                    :class="['code-tab', { active: activeCodeTab13 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab13 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 13)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/asset/withdraw/withdrawable-amount" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_asset_withdraw_withdrawableAmount" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_asset_withdraw_withdrawableAmount" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_asset_withdraw_withdrawableAmount.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_asset_withdraw_withdrawableAmount.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_asset_withdraw_withdrawableAmount.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_asset_withdraw_withdrawableAmount.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_withdraw_withdrawableAmount.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_asset_withdraw_withdrawableAmount.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_asset_withdraw_withdrawableAmount.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_execution_list" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/execution/list</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_execution_list</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab14 = lang"
                    :class="['code-tab', { active: activeCodeTab14 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab14 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 14)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/execution/list" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_execution_list" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_execution_list" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_execution_list.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_execution_list.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_execution_list.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_execution_list.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_execution_list.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_execution_list.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_execution_list.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_market_indexPriceKline" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/market/index-price-kline</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_market_index-price-kline</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab15 = lang"
                    :class="['code-tab', { active: activeCodeTab15 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab15 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 15)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/market/index-price-kline" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_market_indexPriceKline" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_market_indexPriceKline" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_market_indexPriceKline.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_market_indexPriceKline.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_market_indexPriceKline.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_market_indexPriceKline.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_indexPriceKline.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_indexPriceKline.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_market_indexPriceKline.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_market_instrumentsInfo" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/market/instruments-info</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_market_instruments-info</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab16 = lang"
                    :class="['code-tab', { active: activeCodeTab16 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab16 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 16)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/market/instruments-info" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_market_instrumentsInfo" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_market_instrumentsInfo" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_market_instrumentsInfo.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_market_instrumentsInfo.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_market_instrumentsInfo.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_market_instrumentsInfo.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_instrumentsInfo.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_instrumentsInfo.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_market_instrumentsInfo.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_market_kline" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/market/kline</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_market_kline</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab17 = lang"
                    :class="['code-tab', { active: activeCodeTab17 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab17 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 17)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/market/kline" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_market_kline" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_market_kline" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_market_kline.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_market_kline.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_market_kline.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_market_kline.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_kline.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_kline.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_market_kline.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_market_markPriceKline" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/market/mark-price-kline</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_market_mark-price-kline</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab18 = lang"
                    :class="['code-tab', { active: activeCodeTab18 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab18 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 18)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/market/mark-price-kline" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_market_markPriceKline" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_market_markPriceKline" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_market_markPriceKline.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_market_markPriceKline.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_market_markPriceKline.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_market_markPriceKline.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_markPriceKline.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_markPriceKline.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_market_markPriceKline.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_market_orderbook" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/market/orderbook</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_market_orderbook</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab19 = lang"
                    :class="['code-tab', { active: activeCodeTab19 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab19 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 19)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/market/orderbook" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_market_orderbook" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_market_orderbook" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_market_orderbook.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_market_orderbook.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_market_orderbook.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_market_orderbook.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_orderbook.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_orderbook.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_market_orderbook.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_market_recentTrade" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/market/recent-trade</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_market_recent-trade</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab20 = lang"
                    :class="['code-tab', { active: activeCodeTab20 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab20 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 20)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/market/recent-trade" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_market_recentTrade" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_market_recentTrade" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_market_recentTrade.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_market_recentTrade.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_market_recentTrade.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_market_recentTrade.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_recentTrade.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_recentTrade.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_market_recentTrade.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_market_tickers" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/market/tickers</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_market_tickers</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab21 = lang"
                    :class="['code-tab', { active: activeCodeTab21 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab21 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 21)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/market/tickers" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_market_tickers" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_market_tickers" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_market_tickers.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_market_tickers.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_market_tickers.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_market_tickers.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_tickers.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_tickers.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_market_tickers.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_market_time" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/market/time</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_market_time</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab22 = lang"
                    :class="['code-tab', { active: activeCodeTab22 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab22 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 22)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/market/time" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_market_time" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_market_time" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_market_time.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_market_time.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_market_time.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_market_time.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_time.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_market_time.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_market_time.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="POST__v5_order_amend" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/v5/order/amend</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">POST__v5_order_amend</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab23 = lang"
                    :class="['code-tab', { active: activeCodeTab23 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab23 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 23)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X POST "https://develop.okd.finance/api/v5/order/amend" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f" \
  -d '{}'</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testPOST__v5_order_amend" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.POST__v5_order_amend" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.POST__v5_order_amend.status }}</span>
                  <span class="timestamp">{{ results.POST__v5_order_amend.timestamp }}</span>
                  <button @click="copyToClipboard(results.POST__v5_order_amend.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.POST__v5_order_amend.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.POST__v5_order_amend.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.POST__v5_order_amend.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.POST__v5_order_amend.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.POST__v5_order_amend.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="POST__v5_order_cancelAll" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/v5/order/cancel-all</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">POST__v5_order_cancel-all</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab24 = lang"
                    :class="['code-tab', { active: activeCodeTab24 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab24 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 24)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X POST "https://develop.okd.finance/api/v5/order/cancel-all" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f" \
  -d '{}'</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testPOST__v5_order_cancelAll" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.POST__v5_order_cancelAll" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.POST__v5_order_cancelAll.status }}</span>
                  <span class="timestamp">{{ results.POST__v5_order_cancelAll.timestamp }}</span>
                  <button @click="copyToClipboard(results.POST__v5_order_cancelAll.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.POST__v5_order_cancelAll.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.POST__v5_order_cancelAll.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.POST__v5_order_cancelAll.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.POST__v5_order_cancelAll.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.POST__v5_order_cancelAll.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_order_history" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/order/history</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_order_history</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab25 = lang"
                    :class="['code-tab', { active: activeCodeTab25 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab25 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 25)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/order/history" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_order_history" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_order_history" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_order_history.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_order_history.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_order_history.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_order_history.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_order_history.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_order_history.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_order_history.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_order_realtime" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/order/realtime</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_order_realtime</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab26 = lang"
                    :class="['code-tab', { active: activeCodeTab26 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab26 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 26)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/order/realtime" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_order_realtime" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_order_realtime" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_order_realtime.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_order_realtime.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_order_realtime.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_order_realtime.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_order_realtime.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_order_realtime.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_order_realtime.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="GET__v5_order_spotBorrowCheck" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/v5/order/spot-borrow-check</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">GET__v5_order_spot-borrow-check</h3>
              <p class="endpoint-description">No description available</p>
            </div>
            
            
            <div class="api-section">
              <h4 class="section-title">📋 Headers</h4>
              <div class="param-list">
                <div class="param-item">
                  <code class="param-name">Authorization</code>
                  <span class="param-type">Bearer token</span>
                  <span class="param-desc">JWT access token for authentication</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Content-Type</code>
                  <span class="param-type">application/json</span>
                  <span class="param-desc">Request content type</span>
                </div>
                <div class="param-item">
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>
            
            

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button 
                    v-for="lang in codeLangs" 
                    :key="lang" 
                    @click="activeCodeTab27 = lang"
                    :class="['code-tab', { active: activeCodeTab27 === lang }]"
                  >
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab27 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 27)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/v5/order/spot-borrow-check" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"</pre></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              
              <button @click="testGET__v5_order_spotBorrowCheck" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.GET__v5_order_spotBorrowCheck" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.GET__v5_order_spotBorrowCheck.status }}</span>
                  <span class="timestamp">{{ results.GET__v5_order_spotBorrowCheck.timestamp }}</span>
                  <button @click="copyToClipboard(results.GET__v5_order_spotBorrowCheck.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.GET__v5_order_spotBorrowCheck.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.GET__v5_order_spotBorrowCheck.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.GET__v5_order_spotBorrowCheck.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.GET__v5_order_spotBorrowCheck.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const apiToken = ref('')
const showToken = ref(false)
const apiBaseUrl = ref('https://develop.okd.finance/api')

// Header collapse functionality - только ручное управление
const isHeaderCollapsed = ref(false)

// Code examples tabs
const codeLangs = ['cURL', 'Go', 'TypeScript', 'PHP', 'Python']
const activeCodeTab1 = ref('cURL')
const activeCodeTab2 = ref('cURL')
const activeCodeTab3 = ref('cURL')
const activeCodeTab4 = ref('cURL')
const activeCodeTab5 = ref('cURL')
const activeCodeTab6 = ref('cURL')
const activeCodeTab7 = ref('cURL')
const activeCodeTab8 = ref('cURL')
const activeCodeTab9 = ref('cURL')
const activeCodeTab10 = ref('cURL')
const activeCodeTab11 = ref('cURL')
const activeCodeTab12 = ref('cURL')
const activeCodeTab13 = ref('cURL')
const activeCodeTab14 = ref('cURL')
const activeCodeTab15 = ref('cURL')
const activeCodeTab16 = ref('cURL')
const activeCodeTab17 = ref('cURL')
const activeCodeTab18 = ref('cURL')
const activeCodeTab19 = ref('cURL')
const activeCodeTab20 = ref('cURL')
const activeCodeTab21 = ref('cURL')
const activeCodeTab22 = ref('cURL')
const activeCodeTab23 = ref('cURL')
const activeCodeTab24 = ref('cURL')
const activeCodeTab25 = ref('cURL')
const activeCodeTab26 = ref('cURL')
const activeCodeTab27 = ref('cURL')

// Form data for each endpoint
const GET__v5_account_walletBalanceData = reactive({

})

const GET__v5_asset_coin_queryInfoData = reactive({

})

const GET__v5_asset_deposit_queryAllowedListData = reactive({

})

const GET__v5_asset_deposit_queryInternalRecordData = reactive({

})

const GET__v5_asset_deposit_queryRecordData = reactive({

})

const POST__v5_asset_transfer_interTransferData = reactive({

})

const GET__v5_asset_transfer_queryAccountCoinBalanceData = reactive({

})

const GET__v5_asset_transfer_queryAccountCoinsBalanceData = reactive({

})

const GET__v5_asset_transfer_queryAssetInfoData = reactive({

})

const GET__v5_asset_transfer_queryInterTransferListData = reactive({

})

const GET__v5_asset_transfer_queryTransferCoinListData = reactive({

})

const GET__v5_asset_withdraw_queryRecordData = reactive({

})

const GET__v5_asset_withdraw_withdrawableAmountData = reactive({

})

const GET__v5_execution_listData = reactive({

})

const GET__v5_market_indexPriceKlineData = reactive({

})

const GET__v5_market_instrumentsInfoData = reactive({

})

const GET__v5_market_klineData = reactive({

})

const GET__v5_market_markPriceKlineData = reactive({

})

const GET__v5_market_orderbookData = reactive({

})

const GET__v5_market_recentTradeData = reactive({

})

const GET__v5_market_tickersData = reactive({

})

const GET__v5_market_timeData = reactive({

})

const POST__v5_order_amendData = reactive({

})

const POST__v5_order_cancelAllData = reactive({

})

const GET__v5_order_historyData = reactive({

})

const GET__v5_order_realtimeData = reactive({

})

const GET__v5_order_spotBorrowCheckData = reactive({

})

const generateFingerprint = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const results = reactive({
  GET__v5_account_walletBalance: null,
  GET__v5_asset_coin_queryInfo: null,
  GET__v5_asset_deposit_queryAllowedList: null,
  GET__v5_asset_deposit_queryInternalRecord: null,
  GET__v5_asset_deposit_queryRecord: null,
  POST__v5_asset_transfer_interTransfer: null,
  GET__v5_asset_transfer_queryAccountCoinBalance: null,
  GET__v5_asset_transfer_queryAccountCoinsBalance: null,
  GET__v5_asset_transfer_queryAssetInfo: null,
  GET__v5_asset_transfer_queryInterTransferList: null,
  GET__v5_asset_transfer_queryTransferCoinList: null,
  GET__v5_asset_withdraw_queryRecord: null,
  GET__v5_asset_withdraw_withdrawableAmount: null,
  GET__v5_execution_list: null,
  GET__v5_market_indexPriceKline: null,
  GET__v5_market_instrumentsInfo: null,
  GET__v5_market_kline: null,
  GET__v5_market_markPriceKline: null,
  GET__v5_market_orderbook: null,
  GET__v5_market_recentTrade: null,
  GET__v5_market_tickers: null,
  GET__v5_market_time: null,
  POST__v5_order_amend: null,
  POST__v5_order_cancelAll: null,
  GET__v5_order_history: null,
  GET__v5_order_realtime: null,
  GET__v5_order_spotBorrowCheck: null
})


const testGET__v5_account_walletBalance = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/account/wallet-balance${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_account_walletBalance = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_account_walletBalance = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_asset_coin_queryInfo = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/coin/query-info${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_asset_coin_queryInfo = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_asset_coin_queryInfo = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_asset_deposit_queryAllowedList = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/deposit/query-allowed-list${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_asset_deposit_queryAllowedList = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_asset_deposit_queryAllowedList = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_asset_deposit_queryInternalRecord = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/deposit/query-internal-record${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_asset_deposit_queryInternalRecord = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_asset_deposit_queryInternalRecord = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_asset_deposit_queryRecord = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/deposit/query-record${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_asset_deposit_queryRecord = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_asset_deposit_queryRecord = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testPOST__v5_asset_transfer_interTransfer = async () => {
  try {
    
    const queryString = ''
    
    const requestBody = {
      
    }
    const bodyString = JSON.stringify(requestBody)
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/transfer/inter-transfer${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: headers,
      body: bodyString
    })
    
    const data = await response.text()
    results.POST__v5_asset_transfer_interTransfer = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.POST__v5_asset_transfer_interTransfer = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testGET__v5_asset_transfer_queryAccountCoinBalance = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/transfer/query-account-coin-balance${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_asset_transfer_queryAccountCoinBalance = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_asset_transfer_queryAccountCoinBalance = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_asset_transfer_queryAccountCoinsBalance = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/transfer/query-account-coins-balance${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_asset_transfer_queryAccountCoinsBalance = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_asset_transfer_queryAccountCoinsBalance = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_asset_transfer_queryAssetInfo = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/transfer/query-asset-info${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_asset_transfer_queryAssetInfo = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_asset_transfer_queryAssetInfo = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_asset_transfer_queryInterTransferList = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/transfer/query-inter-transfer-list${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_asset_transfer_queryInterTransferList = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_asset_transfer_queryInterTransferList = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_asset_transfer_queryTransferCoinList = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/transfer/query-transfer-coin-list${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_asset_transfer_queryTransferCoinList = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_asset_transfer_queryTransferCoinList = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_asset_withdraw_queryRecord = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/withdraw/query-record${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_asset_withdraw_queryRecord = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_asset_withdraw_queryRecord = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_asset_withdraw_withdrawableAmount = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/asset/withdraw/withdrawable-amount${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_asset_withdraw_withdrawableAmount = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_asset_withdraw_withdrawableAmount = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_execution_list = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/execution/list${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_execution_list = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_execution_list = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_market_indexPriceKline = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/market/index-price-kline${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_market_indexPriceKline = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_market_indexPriceKline = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_market_instrumentsInfo = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/market/instruments-info${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_market_instrumentsInfo = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_market_instrumentsInfo = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_market_kline = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/market/kline${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_market_kline = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_market_kline = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_market_markPriceKline = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/market/mark-price-kline${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_market_markPriceKline = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_market_markPriceKline = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_market_orderbook = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/market/orderbook${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_market_orderbook = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_market_orderbook = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_market_recentTrade = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/market/recent-trade${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_market_recentTrade = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_market_recentTrade = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_market_tickers = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/market/tickers${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_market_tickers = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_market_tickers = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_market_time = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/market/time${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_market_time = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_market_time = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testPOST__v5_order_amend = async () => {
  try {
    
    const queryString = ''
    
    const requestBody = {
      
    }
    const bodyString = JSON.stringify(requestBody)
    
    const fullUrl = `${apiBaseUrl.value}/v5/order/amend${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: headers,
      body: bodyString
    })
    
    const data = await response.text()
    results.POST__v5_order_amend = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.POST__v5_order_amend = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testPOST__v5_order_cancelAll = async () => {
  try {
    
    const queryString = ''
    
    const requestBody = {
      
    }
    const bodyString = JSON.stringify(requestBody)
    
    const fullUrl = `${apiBaseUrl.value}/v5/order/cancel-all${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: headers,
      body: bodyString
    })
    
    const data = await response.text()
    results.POST__v5_order_cancelAll = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.POST__v5_order_cancelAll = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testGET__v5_order_history = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/order/history${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_order_history = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_order_history = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_order_realtime = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/order/realtime${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_order_realtime = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_order_realtime = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGET__v5_order_spotBorrowCheck = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/v5/order/spot-borrow-check${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })
    
    const data = await response.text()
    results.GET__v5_order_spotBorrowCheck = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.GET__v5_order_spotBorrowCheck = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const copyToClipboard = (text, event) => {
  navigator.clipboard.writeText(text).then(() => {
    const button = event.target
    const originalText = button.textContent
    button.textContent = '✅ Copied!'
    button.style.background = 'linear-gradient(135deg, #4caf50, #45a049)'
    setTimeout(() => {
      button.textContent = originalText
      button.style.background = ''
    }, 2000)
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    const button = event.target
    const originalText = button.textContent
    button.textContent = '✅ Copied!'
    button.style.background = 'linear-gradient(135deg, #4caf50, #45a049)'
    setTimeout(() => {
      button.textContent = originalText
      button.style.background = ''
    }, 2000)
  })
}

const copyCodeToClipboard = (lang, index) => {
  // Implementation for copying code examples
  console.log(`Copying ${lang} code for example ${index}`)
}
</script>

<style scoped>
/* Fixed Authentication Header */
.auth-header-fixed {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--vp-c-bg);
  border-bottom: 2px solid var(--vp-c-brand);
  padding: 0.65rem 0;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: padding 0.3s ease-out, box-shadow 0.3s ease-out;
  overflow: hidden;
}

.auth-header-fixed.collapsed {
  padding: 0.4rem 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.auth-header-fixed.collapsed .api-config-row,
.auth-header-fixed.collapsed .status-row,
.auth-header-fixed.collapsed .token-hint {
  max-height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
}

.auth-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.auth-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.auth-title h4 {
  margin: 0 0 0.65rem 0;
  color: var(--vp-c-brand);
  font-size: 1rem;
}

.collapse-toggle {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  margin-bottom: 0.65rem;
}

.collapse-toggle:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
}

.api-config-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 0.65rem;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
  max-height: 200px;
  opacity: 1;
}

.config-group {
  display: flex;
  flex-direction: column;
}

.config-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.config-input {
  padding: 0.75rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.config-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.token-input-group {
  display: flex;
  gap: 0.5rem;
}

.token-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.token-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.token-toggle {
  padding: 0.75rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.2s;
}

.token-toggle:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.status-row {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
  max-height: 50px;
  opacity: 1;
}

.url-status {
  color: var(--vp-c-brand);
  font-size: 0.85rem;
  font-weight: 500;
  font-family: monospace;
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.token-status {
  color: var(--vp-c-green);
  font-size: 0.9rem;
  font-weight: 500;
}

.token-hint {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-top: 0.25rem;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
  max-height: 30px;
  opacity: 1;
}

/* Main Container */
.interactive-api-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.main-content {
  width: 100%;
}

.endpoint-section {
  margin-bottom: 4rem;
  padding-bottom: 3rem;
  border-bottom: 2px solid var(--vp-c-border);
}

.endpoint-layout {
  display: flex;
  gap: 3rem;
}

.endpoint-docs {
  flex: 1;
  min-width: 0;
}

.endpoint-testing {
  flex: 0 0 400px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  position: sticky;
  top: 120px;
  height: fit-content;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.method-badge {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  color: white;
}

.method-badge.get {
  background: linear-gradient(135deg, #4caf50, #45a049);
}

.method-badge.post {
  background: linear-gradient(135deg, #2196f3, #1976d2);
}

.method-badge.put {
  background: linear-gradient(135deg, #ff9800, #f57c00);
}

.method-badge.delete {
  background: linear-gradient(135deg, #f44336, #d32f2f);
}

.endpoint-path {
  font-family: monospace;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.endpoint-info {
  margin-bottom: 2rem;
}

.endpoint-title {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
}

.endpoint-description {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.api-section {
  margin-bottom: 2rem;
}

.section-title {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  font-weight: 600;
}

.param-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.param-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-border);
}

.param-item.required {
  border-left-color: var(--vp-c-brand);
}

.param-name {
  background: var(--vp-c-bg-alt);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 120px;
  flex-shrink: 0;
}

.param-type {
  background: var(--vp-c-bg);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  min-width: 80px;
  flex-shrink: 0;
}

.param-desc {
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  line-height: 1.4;
}

.code-examples {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.code-tabs {
  display: flex;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
}

.code-tab {
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.code-tab:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.code-tab.active {
  background: var(--vp-c-brand);
  color: white;
}

.code-block-container {
  position: relative;
  background: var(--vp-c-bg-alt);
}

.copy-code-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}

.copy-code-btn:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.code-block {
  padding: 1rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.testing-title {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  font-weight: 600;
}

.test-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.test-input {
  padding: 0.75rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.test-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.test-btn {
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-dark));
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;
}

.test-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.test-btn:disabled {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  cursor: not-allowed;
}

.result-container {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-border);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  background: var(--vp-c-green);
  color: white;
}

.timestamp {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.copy-btn {
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.request-info {
  margin-bottom: 1rem;
}

.request-info h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.request-data,
.result-data {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .endpoint-layout {
    flex-direction: column;
    gap: 2rem;
  }
  
  .endpoint-testing {
    flex: none;
    position: static;
    max-height: none;
  }
  
  .api-config-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .interactive-api-container {
    padding: 0 0.5rem;
  }
  
  .auth-container {
    padding: 0 0.5rem;
  }
  
  .endpoint-testing {
    padding: 1rem;
  }
  
  .result-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>