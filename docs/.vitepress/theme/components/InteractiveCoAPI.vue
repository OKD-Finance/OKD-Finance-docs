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
      
      <section id="list_assets" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/config/assets</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">Returns assets. Result is described here.
https://bybit-exchange.github.io/docs/v5/asset/coin-info</h3>
              <p class="endpoint-description">! Need access token in bearer token authorization</p>
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
              <h4 class="section-title">🔍 Query Parameters</h4>
              <div class="param-list">
                
                <div class="param-item ">
                  <code class="param-name">limit</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Limit of records in request
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">offset</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Offset of records in request
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">sortBy</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *coin, id, name*
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">search</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Search by coin, id
</span>
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
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/config/assets" \
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
              
              <div class="form-group">
                <label>limit</label>
                <input v-model="list_assetsData.limit" type="text" placeholder="Limit of records in request
" class="test-input" />
              </div>
              <div class="form-group">
                <label>offset</label>
                <input v-model="list_assetsData.offset" type="text" placeholder="Offset of records in request
" class="test-input" />
              </div>
              <div class="form-group">
                <label>sortBy</label>
                <input v-model="list_assetsData.sortBy" type="text" placeholder="Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *coin, id, name*
" class="test-input" />
              </div>
              <div class="form-group">
                <label>search</label>
                <input v-model="list_assetsData.search" type="text" placeholder="Search by coin, id
" class="test-input" />
              </div>
              
              <button @click="testList_assets" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.list_assets" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.list_assets.status }}</span>
                  <span class="timestamp">{{ results.list_assets.timestamp }}</span>
                  <button @click="copyToClipboard(results.list_assets.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.list_assets.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.list_assets.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.list_assets.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.list_assets.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="list_assets_networks" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/config/assets/networks</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">Returns networks (asset + chain) with trading/transaction states info.</h3>
              <p class="endpoint-description">Returns networks (asset + chain) with trading/transaction states info.</p>
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
              <h4 class="section-title">🔍 Query Parameters</h4>
              <div class="param-list">
                
                <div class="param-item ">
                  <code class="param-name">limit</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Limit of records in request
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">offset</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Offset of records in request
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">activityType</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Activity type
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">activityEnabled</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Deposit, withdrawal, trading enabled/disabled
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">sortBy</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *coin, network*
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">search</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Search by coin, network
</span>
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
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/config/assets/networks" \
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
              
              <div class="form-group">
                <label>limit</label>
                <input v-model="list_assets_networksData.limit" type="text" placeholder="Limit of records in request
" class="test-input" />
              </div>
              <div class="form-group">
                <label>offset</label>
                <input v-model="list_assets_networksData.offset" type="text" placeholder="Offset of records in request
" class="test-input" />
              </div>
              <div class="form-group">
                <label>activityType</label>
                <input v-model="list_assets_networksData.activityType" type="text" placeholder="Activity type
" class="test-input" />
              </div>
              <div class="form-group">
                <label>activityEnabled</label>
                <input v-model="list_assets_networksData.activityEnabled" type="text" placeholder="Deposit, withdrawal, trading enabled/disabled
" class="test-input" />
              </div>
              <div class="form-group">
                <label>sortBy</label>
                <input v-model="list_assets_networksData.sortBy" type="text" placeholder="Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *coin, network*
" class="test-input" />
              </div>
              <div class="form-group">
                <label>search</label>
                <input v-model="list_assets_networksData.search" type="text" placeholder="Search by coin, network
" class="test-input" />
              </div>
              
              <button @click="testList_assets_networks" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.list_assets_networks" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.list_assets_networks.status }}</span>
                  <span class="timestamp">{{ results.list_assets_networks.timestamp }}</span>
                  <button @click="copyToClipboard(results.list_assets_networks.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.list_assets_networks.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.list_assets_networks.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.list_assets_networks.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.list_assets_networks.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="get_global_flags" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/config/flags</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">get_global_flags</h3>
              <p class="endpoint-description">Get global flags</p>
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
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/config/flags" \
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
              
              
              <button @click="testGet_global_flags" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.get_global_flags" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.get_global_flags.status }}</span>
                  <span class="timestamp">{{ results.get_global_flags.timestamp }}</span>
                  <button @click="copyToClipboard(results.get_global_flags.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.get_global_flags.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.get_global_flags.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.get_global_flags.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.get_global_flags.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="list_spot_lite_symbols" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/config/spot/lite-symbols</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">Returns spot ticker + ticker info, where quoteCoin = USDC. Result is described here.</h3>
              <p class="endpoint-description">https://bybit-exchange.github.io/docs/v5/market/tickers
https://bybit-exchange.github.io/docs/v5/market/instrument</p>
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
              <h4 class="section-title">🔍 Query Parameters</h4>
              <div class="param-list">
                
                <div class="param-item required">
                  <code class="param-name">category</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">symbol category</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">baseCoin</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">filter baseCoin</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">tradingEnabled</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">trading status</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">limit</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Limit of records in request
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">offset</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Offset of records in request
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">sortBy</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *symbol, lastPrice, price24hPcnt, id*
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">search</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Search by name, id
</span>
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
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/config/spot/lite-symbols" \
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
              
              <div class="form-group">
                <label>category *</label>
                <input v-model="list_spot_lite_symbolsData.category" type="text" placeholder="symbol category" class="test-input" />
              </div>
              <div class="form-group">
                <label>baseCoin</label>
                <input v-model="list_spot_lite_symbolsData.baseCoin" type="text" placeholder="filter baseCoin" class="test-input" />
              </div>
              <div class="form-group">
                <label>tradingEnabled</label>
                <input v-model="list_spot_lite_symbolsData.tradingEnabled" type="text" placeholder="trading status" class="test-input" />
              </div>
              <div class="form-group">
                <label>limit</label>
                <input v-model="list_spot_lite_symbolsData.limit" type="text" placeholder="Limit of records in request
" class="test-input" />
              </div>
              <div class="form-group">
                <label>offset</label>
                <input v-model="list_spot_lite_symbolsData.offset" type="text" placeholder="Offset of records in request
" class="test-input" />
              </div>
              <div class="form-group">
                <label>sortBy</label>
                <input v-model="list_spot_lite_symbolsData.sortBy" type="text" placeholder="Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *symbol, lastPrice, price24hPcnt, id*
" class="test-input" />
              </div>
              <div class="form-group">
                <label>search</label>
                <input v-model="list_spot_lite_symbolsData.search" type="text" placeholder="Search by name, id
" class="test-input" />
              </div>
              
              <button @click="testList_spot_lite_symbols" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.list_spot_lite_symbols" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.list_spot_lite_symbols.status }}</span>
                  <span class="timestamp">{{ results.list_spot_lite_symbols.timestamp }}</span>
                  <button @click="copyToClipboard(results.list_spot_lite_symbols.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.list_spot_lite_symbols.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.list_spot_lite_symbols.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.list_spot_lite_symbols.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.list_spot_lite_symbols.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="list_spot_symbols" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/config/spot/symbols</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">Returns spot ticker + ticker info. Result is described here.</h3>
              <p class="endpoint-description">https://bybit-exchange.github.io/docs/v5/market/tickers
https://bybit-exchange.github.io/docs/v5/market/instrument</p>
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
              <h4 class="section-title">🔍 Query Parameters</h4>
              <div class="param-list">
                
                <div class="param-item required">
                  <code class="param-name">category</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">symbol category</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">baseCoin</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">filter baseCoin</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">tradingEnabled</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">trading status</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">limit</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Limit of records in request
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">offset</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Offset of records in request
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">sortBy</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *symbol, lastPrice, price24hPcnt, id*
</span>
                </div>
                <div class="param-item ">
                  <code class="param-name">search</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Search by name, id
</span>
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
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/config/spot/symbols" \
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
              
              <div class="form-group">
                <label>category *</label>
                <input v-model="list_spot_symbolsData.category" type="text" placeholder="symbol category" class="test-input" />
              </div>
              <div class="form-group">
                <label>baseCoin</label>
                <input v-model="list_spot_symbolsData.baseCoin" type="text" placeholder="filter baseCoin" class="test-input" />
              </div>
              <div class="form-group">
                <label>tradingEnabled</label>
                <input v-model="list_spot_symbolsData.tradingEnabled" type="text" placeholder="trading status" class="test-input" />
              </div>
              <div class="form-group">
                <label>limit</label>
                <input v-model="list_spot_symbolsData.limit" type="text" placeholder="Limit of records in request
" class="test-input" />
              </div>
              <div class="form-group">
                <label>offset</label>
                <input v-model="list_spot_symbolsData.offset" type="text" placeholder="Offset of records in request
" class="test-input" />
              </div>
              <div class="form-group">
                <label>sortBy</label>
                <input v-model="list_spot_symbolsData.sortBy" type="text" placeholder="Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *symbol, lastPrice, price24hPcnt, id*
" class="test-input" />
              </div>
              <div class="form-group">
                <label>search</label>
                <input v-model="list_spot_symbolsData.search" type="text" placeholder="Search by name, id
" class="test-input" />
              </div>
              
              <button @click="testList_spot_symbols" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.list_spot_symbols" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.list_spot_symbols.status }}</span>
                  <span class="timestamp">{{ results.list_spot_symbols.timestamp }}</span>
                  <button @click="copyToClipboard(results.list_spot_symbols.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.list_spot_symbols.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.list_spot_symbols.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.list_spot_symbols.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.list_spot_symbols.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="get_withdrawal_config" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/config/withdrawal</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">Get withdrawal configuration for KYC levels.</h3>
              <p class="endpoint-description">Get withdrawal configuration for KYC levels.</p>
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
                  <div class="code-block"><pre>curl -X GET "https://develop.okd.finance/api/config/withdrawal" \
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
              
              
              <button @click="testGet_withdrawal_config" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.get_withdrawal_config" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.get_withdrawal_config.status }}</span>
                  <span class="timestamp">{{ results.get_withdrawal_config.timestamp }}</span>
                  <button @click="copyToClipboard(results.get_withdrawal_config.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.get_withdrawal_config.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.get_withdrawal_config.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.get_withdrawal_config.headers }}</pre>
                  
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.get_withdrawal_config.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const apiToken = ref('')
const showToken = ref(false)
const apiBaseUrl = ref('https://develop.okd.finance/api')

// Header collapse functionality
const isHeaderCollapsed = ref(false)
const lastScrollY = ref(0)
const scrollDirection = ref('none')
let scrollTimer = null

const handleScroll = () => {
  // Очищаем предыдущий таймер
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
  
  // Устанавливаем новый таймер с задержкой
  scrollTimer = setTimeout(() => {
    const currentScrollY = window.scrollY
    const scrollDelta = currentScrollY - lastScrollY.value
    
    // Игнорируем мелкие изменения
    if (Math.abs(scrollDelta) < 10) {
      return
    }
    
    // Определяем направление прокрутки
    const newDirection = scrollDelta > 0 ? 'down' : 'up'
    
    // Логика сворачивания только при значительных изменениях
    if (currentScrollY > 200) {
      // Далеко от начала страницы
      if (newDirection === 'down' && scrollDirection.value !== 'down') {
        // Начали прокрутку вниз - сворачиваем
        isHeaderCollapsed.value = true
        scrollDirection.value = 'down'
      } else if (newDirection === 'up' && scrollDirection.value !== 'up') {
        // Начали прокрутку вверх - разворачиваем
        isHeaderCollapsed.value = false
        scrollDirection.value = 'up'
      }
    } else if (currentScrollY < 100) {
      // Близко к началу страницы - всегда разворачиваем
      isHeaderCollapsed.value = false
      scrollDirection.value = 'up'
    }
    
    lastScrollY.value = currentScrollY
  }, 100) // Увеличиваем задержку до 100ms для стабильности
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  lastScrollY.value = window.scrollY
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
})

// Code examples tabs
const codeLangs = ['cURL', 'Go', 'TypeScript', 'PHP', 'Python']
const activeCodeTab1 = ref('cURL')
const activeCodeTab2 = ref('cURL')
const activeCodeTab3 = ref('cURL')
const activeCodeTab4 = ref('cURL')
const activeCodeTab5 = ref('cURL')
const activeCodeTab6 = ref('cURL')

// Form data for each endpoint
const list_assetsData = reactive({
  limit: '',
  offset: '',
  sortBy: '',
  search: ''
})

const list_assets_networksData = reactive({
  limit: '',
  offset: '',
  activityType: '',
  activityEnabled: '',
  sortBy: '',
  search: ''
})

const get_global_flagsData = reactive({

})

const list_spot_lite_symbolsData = reactive({
  category: '',
  baseCoin: '',
  tradingEnabled: '',
  limit: '',
  offset: '',
  sortBy: '',
  search: ''
})

const list_spot_symbolsData = reactive({
  category: '',
  baseCoin: '',
  tradingEnabled: '',
  limit: '',
  offset: '',
  sortBy: '',
  search: ''
})

const get_withdrawal_configData = reactive({

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
  list_assets: null,
  list_assets_networks: null,
  get_global_flags: null,
  list_spot_lite_symbols: null,
  list_spot_symbols: null,
  get_withdrawal_config: null
})


const testList_assets = async () => {
  try {
    
    const params = new URLSearchParams()
    if (list_assetsData.limit) params.append('limit', list_assetsData.limit)
    if (list_assetsData.offset) params.append('offset', list_assetsData.offset)
    if (list_assetsData.sortBy) params.append('sortBy', list_assetsData.sortBy)
    if (list_assetsData.search) params.append('search', list_assetsData.search)
    const queryString = params.toString() ? '?' + params.toString() : ''
    
    
    const fullUrl = `${apiBaseUrl.value}/config/assets${queryString}`
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
    results.list_assets = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.list_assets = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testList_assets_networks = async () => {
  try {
    
    const params = new URLSearchParams()
    if (list_assets_networksData.limit) params.append('limit', list_assets_networksData.limit)
    if (list_assets_networksData.offset) params.append('offset', list_assets_networksData.offset)
    if (list_assets_networksData.activityType) params.append('activityType', list_assets_networksData.activityType)
    if (list_assets_networksData.activityEnabled) params.append('activityEnabled', list_assets_networksData.activityEnabled)
    if (list_assets_networksData.sortBy) params.append('sortBy', list_assets_networksData.sortBy)
    if (list_assets_networksData.search) params.append('search', list_assets_networksData.search)
    const queryString = params.toString() ? '?' + params.toString() : ''
    
    
    const fullUrl = `${apiBaseUrl.value}/config/assets/networks${queryString}`
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
    results.list_assets_networks = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.list_assets_networks = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGet_global_flags = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/config/flags${queryString}`
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
    results.get_global_flags = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.get_global_flags = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testList_spot_lite_symbols = async () => {
  try {
    
    const params = new URLSearchParams()
    if (list_spot_lite_symbolsData.category) params.append('category', list_spot_lite_symbolsData.category)
    if (list_spot_lite_symbolsData.baseCoin) params.append('baseCoin', list_spot_lite_symbolsData.baseCoin)
    if (list_spot_lite_symbolsData.tradingEnabled) params.append('tradingEnabled', list_spot_lite_symbolsData.tradingEnabled)
    if (list_spot_lite_symbolsData.limit) params.append('limit', list_spot_lite_symbolsData.limit)
    if (list_spot_lite_symbolsData.offset) params.append('offset', list_spot_lite_symbolsData.offset)
    if (list_spot_lite_symbolsData.sortBy) params.append('sortBy', list_spot_lite_symbolsData.sortBy)
    if (list_spot_lite_symbolsData.search) params.append('search', list_spot_lite_symbolsData.search)
    const queryString = params.toString() ? '?' + params.toString() : ''
    
    
    const fullUrl = `${apiBaseUrl.value}/config/spot/lite-symbols${queryString}`
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
    results.list_spot_lite_symbols = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.list_spot_lite_symbols = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testList_spot_symbols = async () => {
  try {
    
    const params = new URLSearchParams()
    if (list_spot_symbolsData.category) params.append('category', list_spot_symbolsData.category)
    if (list_spot_symbolsData.baseCoin) params.append('baseCoin', list_spot_symbolsData.baseCoin)
    if (list_spot_symbolsData.tradingEnabled) params.append('tradingEnabled', list_spot_symbolsData.tradingEnabled)
    if (list_spot_symbolsData.limit) params.append('limit', list_spot_symbolsData.limit)
    if (list_spot_symbolsData.offset) params.append('offset', list_spot_symbolsData.offset)
    if (list_spot_symbolsData.sortBy) params.append('sortBy', list_spot_symbolsData.sortBy)
    if (list_spot_symbolsData.search) params.append('search', list_spot_symbolsData.search)
    const queryString = params.toString() ? '?' + params.toString() : ''
    
    
    const fullUrl = `${apiBaseUrl.value}/config/spot/symbols${queryString}`
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
    results.list_spot_symbols = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.list_spot_symbols = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
    }
  }
}

const testGet_withdrawal_config = async () => {
  try {
    
    const queryString = ''
    
    
    const fullUrl = `${apiBaseUrl.value}/config/withdrawal${queryString}`
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
    results.get_withdrawal_config = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.get_withdrawal_config = {
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