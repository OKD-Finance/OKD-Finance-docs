<template>
  <!-- Fixed Authentication Header -->
  <div class="auth-header-fixed" :class="{ 'collapsed': isHeaderCollapsed }">
    <div class="auth-container">
      <div class="auth-title">
        <h4>🔐 API Auth</h4>
        <button @click="toggleHeader" class="collapse-toggle"
          :title="isHeaderCollapsed ? 'Expand header' : 'Collapse header'">
          {{ isHeaderCollapsed ? '⬇️' : '⬆️' }}
        </button>
      </div>
      <div class="api-config-row">
        <div class="config-group">
          <label class="config-label">🌐 API Base URL</label>
          <input v-model="apiBaseUrl" type="text" placeholder="https://develop.okd.finance/api" class="config-input" />
        </div>
        <div class="config-group token-group">
          <label class="config-label">🔑 Access Token</label>
          <div class="token-input-group">
            <input v-model="apiToken" :type="showToken ? 'text' : 'password'"
              placeholder="Paste your access token here (without 'Bearer')" class="token-input" />
            <button @click="showToken = !showToken" class="token-toggle"
              :title="showToken ? 'Hide token' : 'Show token'">
              {{ showToken ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>
        <div class="config-group fingerprint-group">
          <label class="config-label">🔐 Fingerprint</label>
          <div class="token-input-group">
            <input v-model="apiFingerprint" :type="showFingerprint ? 'text' : 'password'"
              placeholder="Enter 32-character hex fingerprint" class="token-input" />
            <button @click="showFingerprint = !showFingerprint" class="token-toggle"
              :title="showFingerprint ? 'Hide fingerprint' : 'Show fingerprint'">
              {{ showFingerprint ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>
      </div>
      <div class="status-row">
        <div v-if="getRawValues().apiBaseUrl" class="url-status">🌐 API: {{ getRawValues().apiBaseUrl }}</div>
        <div v-if="getRawValues().apiToken" class="token-status">✅ Token configured ({{ getRawValues().apiToken.length }} chars)</div>
        <div v-if="getRawValues().apiFingerprint" class="fingerprint-status">🔐 Fingerprint configured ({{ getRawValues().apiFingerprint.length }} chars)</div>
        <button v-if="getRawValues().apiToken || getRawValues().apiFingerprint" @click="clearAuth" class="clear-auth-btn" title="Clear authentication data">
          🗑️ Clear Auth
        </button>
      </div>
      <div class="token-hint">💡 Don't include "Bearer" - it's added automatically</div>
    </div>
  </div>

  <div class="interactive-api-container">
    <div class="main-content">
      <section id="endpoint-1" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/wallet/balances</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Get balances</h3>
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
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                <div class="param-item required">
                  <code class="param-name">type</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Balance type
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">coin</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Comma-separated list of coins. Can be empty</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">sortBy</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Comma-separated list of sort balances. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *coin, total, available,locked*
</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab1 = lang"
                    :class="['code-tab', { active: activeCodeTab1 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab1 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 1)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X GET &quot;https://develop.okd.finance/api/wallet/balances&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;type&quot;:&quot;example&quot;,&quot;coin&quot;:&quot;example&quot;,&quot;sortBy&quot;:&quot;example&quot;}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab1 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 1)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[1] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab1 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 1)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[1] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab1 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 1)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[1] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab1 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 1)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[1] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Type</label>
                <input v-model="testData1.type" type="text" placeholder="example_type" class="test-input" />
              </div>
              <div class="form-group">
                <label>Coin</label>
                <input v-model="testData1.coin" type="text" placeholder="example_coin" class="test-input" />
              </div>
              <div class="form-group">
                <label>SortBy</label>
                <input v-model="testData1.sortBy" type="text" placeholder="example_sortBy" class="test-input" />
              </div>
              <button @click="testEndpoint1" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint1" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint1.status }}</span>
                  <span class="timestamp">{{ results.endpoint1.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint1.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint1.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint1.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint1.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint1.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint1.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-2" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/wallet/total-balance</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Get total balance in USD</h3>
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
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab2 = lang"
                    :class="['code-tab', { active: activeCodeTab2 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab2 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 2)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X GET &quot;https://develop.okd.finance/api/wallet/total-balance&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab2 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 2)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[2] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab2 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 2)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[2] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab2 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 2)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[2] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab2 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 2)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[2] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint2" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint2" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint2.status }}</span>
                  <span class="timestamp">{{ results.endpoint2.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint2.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint2.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint2.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint2.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint2.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint2.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-3" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/wallet/transactions</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Get user transactions history.</h3>
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
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                <div class="param-item required">
                  <code class="param-name">statuses</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Comma-separated list of transaction statuses
  Available values: *new, rejected, completed, pending, failed*
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">coin</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Transaction coin
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">amount</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Amount of transaction
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">type</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Type of transaction
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">from</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Get transactions created after the _from_ timestamp (in seconds)
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">to</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Get transactions created before the _to_ timestamp (in seconds)
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">sortBy</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *created_at, type, amount, coin, status*
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">limit</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Limit of records in request
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">offset</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Offset of records in request
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">search</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">User ID; wallet address; transaction hash; Recipient email (for internal transfer sent by email);
</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab3 = lang"
                    :class="['code-tab', { active: activeCodeTab3 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab3 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 3)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X GET &quot;https://develop.okd.finance/api/wallet/transactions&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;statuses&quot;:&quot;example&quot;,&quot;coin&quot;:&quot;example&quot;,&quot;amount&quot;:&quot;example&quot;,&quot;type&quot;:&quot;example&quot;,&quot;from&quot;:&quot;example&quot;,&quot;to&quot;:&quot;example&quot;,&quot;sortBy&quot;:&quot;example&quot;,&quot;limit&quot;:&quot;example&quot;,&quot;offset&quot;:&quot;example&quot;,&quot;search&quot;:&quot;example&quot;}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab3 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 3)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[3] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab3 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 3)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[3] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab3 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 3)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[3] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab3 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 3)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[3] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Statuses</label>
                <input v-model="testData3.statuses" type="text" placeholder="example_statuses" class="test-input" />
              </div>
              <div class="form-group">
                <label>Coin</label>
                <input v-model="testData3.coin" type="text" placeholder="example_coin" class="test-input" />
              </div>
              <div class="form-group">
                <label>Amount</label>
                <input v-model="testData3.amount" type="text" placeholder="example_amount" class="test-input" />
              </div>
              <div class="form-group">
                <label>Type</label>
                <input v-model="testData3.type" type="text" placeholder="example_type" class="test-input" />
              </div>
              <div class="form-group">
                <label>From</label>
                <input v-model="testData3.from" type="text" placeholder="example_from" class="test-input" />
              </div>
              <div class="form-group">
                <label>To</label>
                <input v-model="testData3.to" type="text" placeholder="example_to" class="test-input" />
              </div>
              <div class="form-group">
                <label>SortBy</label>
                <input v-model="testData3.sortBy" type="text" placeholder="example_sortBy" class="test-input" />
              </div>
              <div class="form-group">
                <label>Limit</label>
                <input v-model="testData3.limit" type="text" placeholder="example_limit" class="test-input" />
              </div>
              <div class="form-group">
                <label>Offset</label>
                <input v-model="testData3.offset" type="text" placeholder="example_offset" class="test-input" />
              </div>
              <div class="form-group">
                <label>Search</label>
                <input v-model="testData3.search" type="text" placeholder="example_search" class="test-input" />
              </div>
              <button @click="testEndpoint3" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint3" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint3.status }}</span>
                  <span class="timestamp">{{ results.endpoint3.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint3.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint3.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint3.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint3.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint3.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint3.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-4" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/wallet/transactions/deposit</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Returns deposit address for coin+chain. Result is described here.
https://bybit-exchange.github.io/docs/v5/asset/deposit/sub-deposit-addr</h3>
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
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                <div class="param-item required">
                  <code class="param-name">coin</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Coin</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">chainType</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Chain type</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab4 = lang"
                    :class="['code-tab', { active: activeCodeTab4 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab4 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 4)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X GET &quot;https://develop.okd.finance/api/wallet/transactions/deposit&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;coin&quot;:&quot;example&quot;,&quot;chainType&quot;:&quot;example&quot;}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab4 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 4)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[4] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab4 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 4)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[4] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab4 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 4)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[4] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab4 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 4)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[4] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Coin</label>
                <input v-model="testData4.coin" type="text" placeholder="example_coin" class="test-input" />
              </div>
              <div class="form-group">
                <label>ChainType</label>
                <input v-model="testData4.chainType" type="text" placeholder="example_chainType" class="test-input" />
              </div>
              <button @click="testEndpoint4" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint4" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint4.status }}</span>
                  <span class="timestamp">{{ results.endpoint4.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint4.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint4.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint4.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint4.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint4.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint4.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-5" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/wallet/transactions/transfer</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Create internal transfer (operation) between users.</h3>
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
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab5 = lang"
                    :class="['code-tab', { active: activeCodeTab5 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab5 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 5)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/wallet/transactions/transfer&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab5 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 5)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[5] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab5 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 5)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[5] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab5 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 5)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[5] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab5 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 5)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[5] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint5" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint5" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint5.status }}</span>
                  <span class="timestamp">{{ results.endpoint5.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint5.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint5.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint5.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint5.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint5.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint5.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-6" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/wallet/transactions/withdraw</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Create withdrawal (operation) for specified assets</h3>
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
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab6 = lang"
                    :class="['code-tab', { active: activeCodeTab6 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab6 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 6)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/wallet/transactions/withdraw&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab6 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 6)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[6] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab6 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 6)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[6] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab6 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 6)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[6] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab6 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 6)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[6] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint6" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint6" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint6.status }}</span>
                  <span class="timestamp">{{ results.endpoint6.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint6.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint6.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint6.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint6.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint6.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint6.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-7" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/wallet/transactions/withdraw/{uuid}/reject</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Reject withdrawal confirmed by user.</h3>
              <p class="endpoint-description">! Need Bearer token and OTP authorization</p>
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
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                <div class="param-item required">
                  <code class="param-name">uuid</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Transaction UUID
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">type</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Reject type
</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab7 = lang"
                    :class="['code-tab', { active: activeCodeTab7 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab7 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 7)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/wallet/transactions/withdraw/{uuid}/reject&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;uuid&quot;:&quot;example&quot;,&quot;type&quot;:&quot;example&quot;}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab7 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 7)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[7] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab7 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 7)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[7] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab7 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 7)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[7] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab7 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 7)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[7] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Uuid</label>
                <input v-model="testData7.uuid" type="text" placeholder="example_uuid" class="test-input" />
              </div>
              <div class="form-group">
                <label>Type</label>
                <input v-model="testData7.type" type="text" placeholder="example_type" class="test-input" />
              </div>
              <button @click="testEndpoint7" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint7" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint7.status }}</span>
                  <span class="timestamp">{{ results.endpoint7.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint7.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint7.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint7.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint7.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint7.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint7.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'

// Global authentication state
const {
  apiToken,
  apiBaseUrl,
  apiFingerprint,
  showToken,
  showFingerprint,
  isHeaderCollapsed,
  toggleHeader,
  clearAuth,
  getRawValues,
  isReadyToSendRequest
} = useAuth()

// Code examples tabs
const codeLangs = ['cURL', 'Go', 'TypeScript', 'PHP', 'Python']
const activeCodeTab1 = ref('cURL')
const activeCodeTab2 = ref('cURL')
const activeCodeTab3 = ref('cURL')
const activeCodeTab4 = ref('cURL')
const activeCodeTab5 = ref('cURL')
const activeCodeTab6 = ref('cURL')
const activeCodeTab7 = ref('cURL')

const testData1 = reactive({ type: 'example_type', coin: 'example_coin', sortBy: 'example_sortBy' })
const testData2 = reactive({  })
const testData3 = reactive({ statuses: 'example_statuses', coin: 'example_coin', amount: 'example_amount', type: 'example_type', from: 'example_from', to: 'example_to', sortBy: 'example_sortBy', limit: 'example_limit', offset: 'example_offset', search: 'example_search' })
const testData4 = reactive({ coin: 'example_coin', chainType: 'example_chainType' })
const testData5 = reactive({  })
const testData6 = reactive({  })
const testData7 = reactive({ uuid: 'example_uuid', type: 'example_type' })



const results = reactive({
  endpoint1: null,
  endpoint2: null,
  endpoint3: null,
  endpoint4: null,
  endpoint5: null,
  endpoint6: null,
  endpoint7: null
})

const testEndpoint1 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint1 = {
        status: 'Authentication Error',
        data: 'Both Access Token and Fingerprint are required',
        timestamp: new Date().toLocaleTimeString(),
        requestUrl: 'Request not sent',
        headers: 'N/A',
        body: 'N/A'
      }
      return
    }

    const requestBody = {
      type: testData1.type,
      coin: testData1.coin,
      sortBy: testData1.sortBy
    }

    const fullUrl = `${authValues.apiBaseUrl}/wallet/balances`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint1 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint1 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint2 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint2 = {
        status: 'Authentication Error',
        data: 'Both Access Token and Fingerprint are required',
        timestamp: new Date().toLocaleTimeString(),
        requestUrl: 'Request not sent',
        headers: 'N/A',
        body: 'N/A'
      }
      return
    }

    const requestBody = {
      
    }

    const fullUrl = `${authValues.apiBaseUrl}/wallet/total-balance`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint2 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint2 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint3 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint3 = {
        status: 'Authentication Error',
        data: 'Both Access Token and Fingerprint are required',
        timestamp: new Date().toLocaleTimeString(),
        requestUrl: 'Request not sent',
        headers: 'N/A',
        body: 'N/A'
      }
      return
    }

    const requestBody = {
      statuses: testData3.statuses,
      coin: testData3.coin,
      amount: testData3.amount,
      type: testData3.type,
      from: testData3.from,
      to: testData3.to,
      sortBy: testData3.sortBy,
      limit: testData3.limit,
      offset: testData3.offset,
      search: testData3.search
    }

    const fullUrl = `${authValues.apiBaseUrl}/wallet/transactions`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint3 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint3 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint4 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint4 = {
        status: 'Authentication Error',
        data: 'Both Access Token and Fingerprint are required',
        timestamp: new Date().toLocaleTimeString(),
        requestUrl: 'Request not sent',
        headers: 'N/A',
        body: 'N/A'
      }
      return
    }

    const requestBody = {
      coin: testData4.coin,
      chainType: testData4.chainType
    }

    const fullUrl = `${authValues.apiBaseUrl}/wallet/transactions/deposit`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint4 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint4 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint5 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint5 = {
        status: 'Authentication Error',
        data: 'Both Access Token and Fingerprint are required',
        timestamp: new Date().toLocaleTimeString(),
        requestUrl: 'Request not sent',
        headers: 'N/A',
        body: 'N/A'
      }
      return
    }

    const requestBody = {
      
    }

    const fullUrl = `${authValues.apiBaseUrl}/wallet/transactions/transfer`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint5 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint5 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint6 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint6 = {
        status: 'Authentication Error',
        data: 'Both Access Token and Fingerprint are required',
        timestamp: new Date().toLocaleTimeString(),
        requestUrl: 'Request not sent',
        headers: 'N/A',
        body: 'N/A'
      }
      return
    }

    const requestBody = {
      
    }

    const fullUrl = `${authValues.apiBaseUrl}/wallet/transactions/withdraw`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint6 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint6 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint7 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint7 = {
        status: 'Authentication Error',
        data: 'Both Access Token and Fingerprint are required',
        timestamp: new Date().toLocaleTimeString(),
        requestUrl: 'Request not sent',
        headers: 'N/A',
        body: 'N/A'
      }
      return
    }

    const requestBody = {
      uuid: testData7.uuid,
      type: testData7.type
    }

    const fullUrl = `${authValues.apiBaseUrl}/wallet/transactions/withdraw/{uuid}/reject`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint7 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint7 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
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
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  })
}

const copyCodeToClipboard = (lang, endpointNum) => {
  const authValues = getRawValues()
  let code = codeExamples[lang]?.[endpointNum]
  
  if (code) {
    code = code.replace(/YOUR_ACCESS_TOKEN/g, authValues.apiToken || 'YOUR_ACCESS_TOKEN')
    code = code.replace(/YOUR_FINGERPRINT/g, authValues.apiFingerprint || 'YOUR_FINGERPRINT')
    code = code.replace(/https:\/\/develop\.okd\.finance\/api/g, authValues.apiBaseUrl || 'https://develop.okd.finance/api')
    
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy code:', err)
    })
  }
}

const codeExamples = {
  curl: {
    1: `curl -X GET "https://develop.okd.finance/api/wallet/balances" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"type":"example","coin":"example","sortBy":"example"}'`,
    2: `curl -X GET "https://develop.okd.finance/api/wallet/total-balance" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    3: `curl -X GET "https://develop.okd.finance/api/wallet/transactions" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"statuses":"example","coin":"example","amount":"example","type":"example","from":"example","to":"example","sortBy":"example","limit":"example","offset":"example","search":"example"}'`,
    4: `curl -X GET "https://develop.okd.finance/api/wallet/transactions/deposit" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"coin":"example","chainType":"example"}'`,
    5: `curl -X POST "https://develop.okd.finance/api/wallet/transactions/transfer" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    6: `curl -X POST "https://develop.okd.finance/api/wallet/transactions/withdraw" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    7: `curl -X PUT "https://develop.okd.finance/api/wallet/transactions/withdraw/{uuid}/reject" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"uuid":"example","type":"example"}'`
  },
  go: {
    1: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type GetbalancesRequest struct {
    Type string \`json:"type"\`\n    Coin string \`json:"coin"\`\n    SortBy string \`json:"sortBy"\`
}

func getbalances() error {
    url := "https://develop.okd.finance/api/wallet/balances"
    
    requestData := GetbalancesRequest{
        Type: "example",\n        Coin: "example",\n        SortBy: "example",
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("GET", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return err
    }
    
    fmt.Printf("Response: %s\\n", string(body))
    return nil
}

func main() {
    if err := getbalances(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    2: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type GettotalbalanceinUSDRequest struct {

}

func gettotalbalanceinusd() error {
    url := "https://develop.okd.finance/api/wallet/total-balance"
    
    requestData := GettotalbalanceinUSDRequest{

    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("GET", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return err
    }
    
    fmt.Printf("Response: %s\\n", string(body))
    return nil
}

func main() {
    if err := gettotalbalanceinusd(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    3: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type GetusertransactionshistoryRequest struct {
    Statuses string \`json:"statuses"\`\n    Coin string \`json:"coin"\`\n    Amount string \`json:"amount"\`\n    Type string \`json:"type"\`\n    From string \`json:"from"\`\n    To string \`json:"to"\`\n    SortBy string \`json:"sortBy"\`\n    Limit string \`json:"limit"\`\n    Offset string \`json:"offset"\`\n    Search string \`json:"search"\`
}

func getusertransactionshistory() error {
    url := "https://develop.okd.finance/api/wallet/transactions"
    
    requestData := GetusertransactionshistoryRequest{
        Statuses: "example",\n        Coin: "example",\n        Amount: "example",\n        Type: "example",\n        From: "example",\n        To: "example",\n        SortBy: "example",\n        Limit: "example",\n        Offset: "example",\n        Search: "example",
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("GET", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return err
    }
    
    fmt.Printf("Response: %s\\n", string(body))
    return nil
}

func main() {
    if err := getusertransactionshistory(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    4: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type ReturnsdepositaddressforcoinchainResultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddrRequest struct {
    Coin string \`json:"coin"\`\n    ChainType string \`json:"chainType"\`
}

func returnsdepositaddressforcoinchainresultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddr() error {
    url := "https://develop.okd.finance/api/wallet/transactions/deposit"
    
    requestData := ReturnsdepositaddressforcoinchainResultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddrRequest{
        Coin: "example",\n        ChainType: "example",
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("GET", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return err
    }
    
    fmt.Printf("Response: %s\\n", string(body))
    return nil
}

func main() {
    if err := returnsdepositaddressforcoinchainresultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddr(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    5: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type CreateinternaltransferoperationbetweenusersRequest struct {

}

func createinternaltransferoperationbetweenusers() error {
    url := "https://develop.okd.finance/api/wallet/transactions/transfer"
    
    requestData := CreateinternaltransferoperationbetweenusersRequest{

    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return err
    }
    
    fmt.Printf("Response: %s\\n", string(body))
    return nil
}

func main() {
    if err := createinternaltransferoperationbetweenusers(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    6: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type CreatewithdrawaloperationforspecifiedassetsRequest struct {

}

func createwithdrawaloperationforspecifiedassets() error {
    url := "https://develop.okd.finance/api/wallet/transactions/withdraw"
    
    requestData := CreatewithdrawaloperationforspecifiedassetsRequest{

    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return err
    }
    
    fmt.Printf("Response: %s\\n", string(body))
    return nil
}

func main() {
    if err := createwithdrawaloperationforspecifiedassets(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    7: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type RejectwithdrawalconfirmedbyuserRequest struct {
    Uuid string \`json:"uuid"\`\n    Type string \`json:"type"\`
}

func rejectwithdrawalconfirmedbyuser() error {
    url := "https://develop.okd.finance/api/wallet/transactions/withdraw/{uuid}/reject"
    
    requestData := RejectwithdrawalconfirmedbyuserRequest{
        Uuid: "example",\n        Type: "example",
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return err
    }
    
    fmt.Printf("Response: %s\\n", string(body))
    return nil
}

func main() {
    if err := rejectwithdrawalconfirmedbyuser(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`
  },
  typescript: {
    1: `interface GetbalancesRequest {
  type: string;\n  coin: string;\n  sortBy: string;
}

async function getbalances(
  baseUrl: string,
  accessToken: string,
  data: GetbalancesRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/wallet/balances\`, {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': 'YOUR_FINGERPRINT'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return await response.json();
}

// Usage example
async function main() {
  try {
    const result = await getbalances(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        type: "example",\n        coin: "example",\n        sortBy: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    2: `interface GettotalbalanceinUSDRequest {

}

async function gettotalbalanceinusd(
  baseUrl: string,
  accessToken: string,
  data: GettotalbalanceinUSDRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/wallet/total-balance\`, {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': 'YOUR_FINGERPRINT'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return await response.json();
}

// Usage example
async function main() {
  try {
    const result = await gettotalbalanceinusd(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {

      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    3: `interface GetusertransactionshistoryRequest {
  statuses: string;\n  coin: string;\n  amount: string;\n  type: string;\n  from: string;\n  to: string;\n  sortBy: string;\n  limit: string;\n  offset: string;\n  search: string;
}

async function getusertransactionshistory(
  baseUrl: string,
  accessToken: string,
  data: GetusertransactionshistoryRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/wallet/transactions\`, {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': 'YOUR_FINGERPRINT'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return await response.json();
}

// Usage example
async function main() {
  try {
    const result = await getusertransactionshistory(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        statuses: "example",\n        coin: "example",\n        amount: "example",\n        type: "example",\n        from: "example",\n        to: "example",\n        sortBy: "example",\n        limit: "example",\n        offset: "example",\n        search: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    4: `interface ReturnsdepositaddressforcoinchainResultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddrRequest {
  coin: string;\n  chainType: string;
}

async function returnsdepositaddressforcoinchainresultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddr(
  baseUrl: string,
  accessToken: string,
  data: ReturnsdepositaddressforcoinchainResultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddrRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/wallet/transactions/deposit\`, {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': 'YOUR_FINGERPRINT'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return await response.json();
}

// Usage example
async function main() {
  try {
    const result = await returnsdepositaddressforcoinchainresultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddr(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        coin: "example",\n        chainType: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    5: `interface CreateinternaltransferoperationbetweenusersRequest {

}

async function createinternaltransferoperationbetweenusers(
  baseUrl: string,
  accessToken: string,
  data: CreateinternaltransferoperationbetweenusersRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/wallet/transactions/transfer\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': 'YOUR_FINGERPRINT'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return await response.json();
}

// Usage example
async function main() {
  try {
    const result = await createinternaltransferoperationbetweenusers(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {

      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    6: `interface CreatewithdrawaloperationforspecifiedassetsRequest {

}

async function createwithdrawaloperationforspecifiedassets(
  baseUrl: string,
  accessToken: string,
  data: CreatewithdrawaloperationforspecifiedassetsRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/wallet/transactions/withdraw\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': 'YOUR_FINGERPRINT'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return await response.json();
}

// Usage example
async function main() {
  try {
    const result = await createwithdrawaloperationforspecifiedassets(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {

      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    7: `interface RejectwithdrawalconfirmedbyuserRequest {
  uuid: string;\n  type: string;
}

async function rejectwithdrawalconfirmedbyuser(
  baseUrl: string,
  accessToken: string,
  data: RejectwithdrawalconfirmedbyuserRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/wallet/transactions/withdraw/{uuid}/reject\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': 'YOUR_FINGERPRINT'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return await response.json();
}

// Usage example
async function main() {
  try {
    const result = await rejectwithdrawalconfirmedbyuser(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        uuid: "example",\n        type: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`
  },
  php: {
    1: `<?php

function getbalances($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/wallet/balances';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
          'Fingerprint: YOUR_FINGERPRINT'
      ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception("cURL Error: " . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON response");
    }

    if ($httpCode !== 200) {
        $message = $data['message'] ?? 'Unknown API error';
        throw new Exception("API Error: " . $message);
    }

    return $data;
}

try {
    $data = [
        'type' => 'example',\n        'coin' => 'example',\n        'sortBy' => 'example',
    ];

    $result = getbalances(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    2: `<?php

function gettotalbalanceinusd($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/wallet/total-balance';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
          'Fingerprint: YOUR_FINGERPRINT'
      ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception("cURL Error: " . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON response");
    }

    if ($httpCode !== 200) {
        $message = $data['message'] ?? 'Unknown API error';
        throw new Exception("API Error: " . $message);
    }

    return $data;
}

try {
    $data = [

    ];

    $result = gettotalbalanceinusd(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    3: `<?php

function getusertransactionshistory($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/wallet/transactions';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
          'Fingerprint: YOUR_FINGERPRINT'
      ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception("cURL Error: " . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON response");
    }

    if ($httpCode !== 200) {
        $message = $data['message'] ?? 'Unknown API error';
        throw new Exception("API Error: " . $message);
    }

    return $data;
}

try {
    $data = [
        'statuses' => 'example',\n        'coin' => 'example',\n        'amount' => 'example',\n        'type' => 'example',\n        'from' => 'example',\n        'to' => 'example',\n        'sortBy' => 'example',\n        'limit' => 'example',\n        'offset' => 'example',\n        'search' => 'example',
    ];

    $result = getusertransactionshistory(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    4: `<?php

function returnsdepositaddressforcoinchainresultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddr($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/wallet/transactions/deposit';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
          'Fingerprint: YOUR_FINGERPRINT'
      ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception("cURL Error: " . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON response");
    }

    if ($httpCode !== 200) {
        $message = $data['message'] ?? 'Unknown API error';
        throw new Exception("API Error: " . $message);
    }

    return $data;
}

try {
    $data = [
        'coin' => 'example',\n        'chainType' => 'example',
    ];

    $result = returnsdepositaddressforcoinchainresultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddr(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    5: `<?php

function createinternaltransferoperationbetweenusers($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/wallet/transactions/transfer';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
          'Fingerprint: YOUR_FINGERPRINT'
      ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception("cURL Error: " . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON response");
    }

    if ($httpCode !== 200) {
        $message = $data['message'] ?? 'Unknown API error';
        throw new Exception("API Error: " . $message);
    }

    return $data;
}

try {
    $data = [

    ];

    $result = createinternaltransferoperationbetweenusers(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    6: `<?php

function createwithdrawaloperationforspecifiedassets($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/wallet/transactions/withdraw';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
          'Fingerprint: YOUR_FINGERPRINT'
      ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception("cURL Error: " . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON response");
    }

    if ($httpCode !== 200) {
        $message = $data['message'] ?? 'Unknown API error';
        throw new Exception("API Error: " . $message);
    }

    return $data;
}

try {
    $data = [

    ];

    $result = createwithdrawaloperationforspecifiedassets(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    7: `<?php

function rejectwithdrawalconfirmedbyuser($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/wallet/transactions/withdraw/{uuid}/reject';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
          'Fingerprint: YOUR_FINGERPRINT'
      ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => 'PUT',
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception("cURL Error: " . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON response");
    }

    if ($httpCode !== 200) {
        $message = $data['message'] ?? 'Unknown API error';
        throw new Exception("API Error: " . $message);
    }

    return $data;
}

try {
    $data = [
        'uuid' => 'example',\n        'type' => 'example',
    ];

    $result = rejectwithdrawalconfirmedbyuser(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`
  },
  python: {
    1: `import requests
import json
from typing import Dict, Any


def getbalances(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/wallet/balances"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            'GET',
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {e}")


def main():
    data = {
        'type': 'example',\n        'coin': 'example',\n        'sortBy': 'example',
    }
    
    try:
        result = getbalances(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    2: `import requests
import json
from typing import Dict, Any


def gettotalbalanceinusd(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/wallet/total-balance"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            'GET',
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {e}")


def main():
    data = {

    }
    
    try:
        result = gettotalbalanceinusd(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    3: `import requests
import json
from typing import Dict, Any


def getusertransactionshistory(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/wallet/transactions"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            'GET',
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {e}")


def main():
    data = {
        'statuses': 'example',\n        'coin': 'example',\n        'amount': 'example',\n        'type': 'example',\n        'from': 'example',\n        'to': 'example',\n        'sortBy': 'example',\n        'limit': 'example',\n        'offset': 'example',\n        'search': 'example',
    }
    
    try:
        result = getusertransactionshistory(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    4: `import requests
import json
from typing import Dict, Any


def returnsdepositaddressforcoinchainresultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddr(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/wallet/transactions/deposit"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            'GET',
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {e}")


def main():
    data = {
        'coin': 'example',\n        'chainType': 'example',
    }
    
    try:
        result = returnsdepositaddressforcoinchainresultisdescribedherehttpsbybitexchangegithubiodocsv5assetdepositsubdepositaddr(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    5: `import requests
import json
from typing import Dict, Any


def createinternaltransferoperationbetweenusers(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/wallet/transactions/transfer"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            'POST',
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {e}")


def main():
    data = {

    }
    
    try:
        result = createinternaltransferoperationbetweenusers(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    6: `import requests
import json
from typing import Dict, Any


def createwithdrawaloperationforspecifiedassets(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/wallet/transactions/withdraw"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            'POST',
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {e}")


def main():
    data = {

    }
    
    try:
        result = createwithdrawaloperationforspecifiedassets(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    7: `import requests
import json
from typing import Dict, Any


def rejectwithdrawalconfirmedbyuser(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need Bearer token and OTP authorization"""
    url = f"{base_url}/wallet/transactions/withdraw/{uuid}/reject"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            'PUT',
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {e}")


def main():
    data = {
        'uuid': 'example',\n        'type': 'example',
    }
    
    try:
        result = rejectwithdrawalconfirmedbyuser(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`
  }
}
</script>

<style scoped>
/* Fixed Authentication Header */
.auth-header-fixed {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.auth-header-fixed.collapsed {
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
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
  margin: 0 0 0.8rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  /* Primary color for maximum visibility */
  color: var(--vp-c-brand) !important;
  /* Remove gradient effects that may cause invisibility */
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: unset !important;
  background-clip: unset !important;
  /* Ensure text doesn't wrap and fits */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .auth-title h4 {
    font-size: 0.95rem;
    gap: 0.3rem;
  }
}

.collapse-toggle {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg-alt) 100%);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.collapse-toggle:hover {
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%);
  color: white;
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
}

.api-config-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.65rem;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
  max-height: 200px;
  opacity: 1;
}

/* Responsive grid for smaller screens */
@media (max-width: 1024px) {
  .api-config-row {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
}

@media (min-width: 1025px) and (max-width: 1200px) {
  .api-config-row {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
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
  padding: 0.875rem 1rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 0.9rem;
  background: var(--vp-c-bg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.config-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.1), 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
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

.fingerprint-status {
  color: var(--vp-c-purple);
  font-size: 0.9rem;
  font-weight: 500;
}

.clear-auth-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-red);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-red);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.clear-auth-btn:hover {
  background: var(--vp-c-red);
  color: white;
  transform: scale(1.05);
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
  flex: 0 0 450px;
  border-left: 2px solid var(--vp-c-border);
  padding-left: 2rem;
}

/* Method Header */
.method-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.method-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.method-badge.get {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  color: #1976d2;
  border: 2px solid #1976d2;
}

.method-badge.post {
  background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
  color: #2e7d32;
  border: 2px solid #2e7d32;
}

.method-badge.put {
  background: linear-gradient(135deg, #fff3e0, #ffcc02);
  color: #f57c00;
  border: 2px solid #f57c00;
}

.method-badge.patch {
  background: linear-gradient(135deg, #f3e5f5, #ce93d8);
  color: #7b1fa2;
  border: 2px solid #7b1fa2;
}

.method-badge.delete {
  background: linear-gradient(135deg, #ffebee, #ffcdd2);
  color: #c62828;
  border: 2px solid #c62828;
}

.endpoint-path {
  font-family: var(--vp-font-family-mono);
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

/* Endpoint Info */
.endpoint-info {
  margin-bottom: 2rem;
}

.endpoint-title {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.endpoint-description {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* API Sections */
.api-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.param-list {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
}

.param-item {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--vp-c-border-soft);
}

.param-item:last-child {
  border-bottom: none;
}

.param-item.required .param-name::after {
  content: " *";
  color: #ff4444;
  font-weight: bold;
}

.param-name {
  font-family: var(--vp-font-family-mono);
  font-weight: bold;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.param-type {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-border);
}

.param-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Code Examples with Tabs */
.code-examples {
  margin: 1rem 0;
}

/* Code Block Container with Copy Button */
.code-block-container {
  position: relative;
  margin: 1rem 0;
}

.copy-code-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  z-index: 10;
  opacity: 0.8;
}

.copy-code-btn:hover {
  background: var(--vp-c-bg);
  opacity: 1;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.copy-code-btn:active {
  transform: scale(0.95);
}

.code-block-container .code-block {
  margin: 0;
}

.code-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0;
  border-bottom: 2px solid var(--vp-c-border);
  padding-bottom: 0.5rem;
}

.code-tab {
  padding: 0.5rem 1rem;
  border: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid var(--vp-c-border);
  border-bottom: none;
}

.code-tab:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.code-tab.active {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  font-weight: 600;
}

.code-block {
  background: var(--vp-code-bg);
  color: var(--vp-code-color);
  padding: 1.5rem;
  border-radius: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
  border: 1px solid var(--vp-c-border);
  white-space: pre;
  word-wrap: normal;
  overflow-wrap: normal;
  tab-size: 2;
  -moz-tab-size: 2;
}

.code-block pre {
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  white-space: pre;
  overflow: visible;
}

/* Testing Section */
.testing-title {
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand);
}

.test-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-border);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.test-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.test-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.test-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #1976d2, #1565c0);
  color: white;
  margin-top: 1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
}

.test-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #0d47a1, #1565c0);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(13, 71, 161, 0.6);
}

.test-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(13, 71, 161, 0.4);
}

.test-btn:disabled {
  background: var(--vp-c-text-3);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Dark theme button adjustments */
.dark .test-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #1565c0, #1976d2);
  box-shadow: 0 8px 25px rgba(21, 101, 192, 0.7);
}

/* Response Examples */
.response-examples {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.response-example {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.response-example:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.response-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-border);
}

.response-status {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  color: white;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
  min-width: 60px;
  justify-content: center;
}

.response-status.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.response-status.success::before {
  content: '✅ ';
  margin-right: 0.25rem;
}

.response-status.error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

.response-status.error::before {
  content: '❌ ';
  margin-right: 0.25rem;
}

.response-description {
  flex: 1;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  font-weight: 500;
}

.response-example .code-block {
  margin: 0;
  border-radius: 0;
  background: var(--vp-c-bg-alt);
}

.response-example .code-block pre {
  margin: 0;
  padding: 1rem;
  background: transparent;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .response-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .response-status {
    align-self: flex-start;
  }
}

/* Result Container */
.result-container {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid var(--vp-c-border);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green);
}

.timestamp {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  font-family: var(--vp-font-family-mono);
}

.copy-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #6c757d, #5a6268);
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.copy-btn:hover {
  background: linear-gradient(135deg, #5a6268, #495057);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.4);
}

.request-info {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.request-info h5 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.request-data {
  background: var(--vp-code-bg);
  color: var(--vp-code-color);
  padding: 1rem;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  line-height: 1.4;
  overflow-x: auto;
  margin: 0.5rem 0;
  border: 1px solid var(--vp-c-border);
  white-space: pre-wrap;
}

.result-data {
  background: var(--vp-code-bg);
  padding: 1rem;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
  color: var(--vp-code-color);
  max-height: 300px;
  overflow-y: auto;
}

.request-info {
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-brand);
}

.request-info h5 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.request-data {
  background: var(--vp-code-bg);
  padding: 0.75rem;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0 0 1rem 0;
  color: var(--vp-code-color);
  max-height: 150px;
  overflow-y: auto;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .endpoint-layout {
    flex-direction: column;
    gap: 2rem;
  }

  .endpoint-testing {
    flex: none;
    border-left: none;
    border-top: 2px solid var(--vp-c-border);
    padding-left: 0;
    padding-top: 2rem;
  }

  .param-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

@media (max-width: 768px) {
  .auth-header-fixed {
    padding: 0.75rem 0;
  }

  .api-config-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .status-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .token-input-group {
    flex-direction: column;
  }

  .interactive-api-container {
    padding: 0 0.5rem;
  }

  .endpoint-layout {
    gap: 1.5rem;
  }

  .code-tabs {
    gap: 0.125rem;
    flex-wrap: wrap;
  }

  .code-tab {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }

  .code-block {
    font-size: 0.85rem;
    padding: 1rem;
  }
}
</style>