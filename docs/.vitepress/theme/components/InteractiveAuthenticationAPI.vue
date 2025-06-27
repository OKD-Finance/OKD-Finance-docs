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
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/check/firebase</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Check account existence by firebase token.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab1 = lang"
                    :class="['code-tab', { active: activeCodeTab1 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab1 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 1)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/check/firebase&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
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
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/confirm</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Send confirmation code to email.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab2 = lang"
                    :class="['code-tab', { active: activeCodeTab2 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab2 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 2)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/confirm&quot; \
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
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/fcm</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Inits operation to create user fcm.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab3 = lang"
                    :class="['code-tab', { active: activeCodeTab3 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab3 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 3)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/fcm&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
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
              <span class="method-badge delete">DELETE</span>
              <span class="endpoint-path">/auth/fcm</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Inits operation to delete user fcm by device id and fcm.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab4 = lang"
                    :class="['code-tab', { active: activeCodeTab4 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab4 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 4)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X DELETE &quot;https://develop.okd.finance/api/auth/fcm&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
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
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/auth/google</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Get Google link for lgoin/register.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab5 = lang"
                    :class="['code-tab', { active: activeCodeTab5 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab5 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 5)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X GET &quot;https://develop.okd.finance/api/auth/google&quot; \
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
              <span class="endpoint-path">/auth/jwt/refresh</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Regenerate a pair of authenticate tokens if refresh token is valid</h3>
              <p class="endpoint-description">! Need refresh token in bearer token authorization</p>
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
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/jwt/refresh&quot; \
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
              <span class="endpoint-path">/auth/locale</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Inits operation to change current user locale.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab7 = lang"
                    :class="['code-tab', { active: activeCodeTab7 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab7 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 7)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/auth/locale&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
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

      <section id="endpoint-8" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/auth/notifications</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Get notifications for user</h3>
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
                  <code class="param-name">group_id</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Group of notifications. Omitted or 0 mean all.
</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">hide_read</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Hide read notifications. Bool value: true or false.
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
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab8 = lang"
                    :class="['code-tab', { active: activeCodeTab8 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab8 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 8)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X GET &quot;https://develop.okd.finance/api/auth/notifications&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;group_id&quot;:&quot;example&quot;,&quot;hide_read&quot;:&quot;example&quot;,&quot;limit&quot;:&quot;example&quot;,&quot;offset&quot;:&quot;example&quot;}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab8 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 8)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[8] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab8 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 8)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[8] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab8 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 8)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[8] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab8 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 8)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[8] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Group_id</label>
                <input v-model="testData8.group_id" type="text" placeholder="example_group_id" class="test-input" />
              </div>
              <div class="form-group">
                <label>Hide_read</label>
                <input v-model="testData8.hide_read" type="text" placeholder="example_hide_read" class="test-input" />
              </div>
              <div class="form-group">
                <label>Limit</label>
                <input v-model="testData8.limit" type="text" placeholder="example_limit" class="test-input" />
              </div>
              <div class="form-group">
                <label>Offset</label>
                <input v-model="testData8.offset" type="text" placeholder="example_offset" class="test-input" />
              </div>
              <button @click="testEndpoint8" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint8" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint8.status }}</span>
                  <span class="timestamp">{{ results.endpoint8.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint8.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint8.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint8.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint8.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint8.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint8.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-9" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/auth/notifications</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Mark all/group of notifications as viewed. Body is optional.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab9 = lang"
                    :class="['code-tab', { active: activeCodeTab9 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab9 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 9)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/auth/notifications&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab9 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 9)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[9] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab9 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 9)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[9] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab9 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 9)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[9] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab9 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 9)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[9] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint9" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint9" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint9.status }}</span>
                  <span class="timestamp">{{ results.endpoint9.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint9.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint9.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint9.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint9.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint9.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint9.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-10" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge delete">DELETE</span>
              <span class="endpoint-path">/auth/notifications</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Delete all/group of notifications. Body is optional.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab10 = lang"
                    :class="['code-tab', { active: activeCodeTab10 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab10 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 10)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X DELETE &quot;https://develop.okd.finance/api/auth/notifications&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab10 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 10)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[10] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab10 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 10)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[10] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab10 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 10)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[10] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab10 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 10)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[10] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint10" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint10" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint10.status }}</span>
                  <span class="timestamp">{{ results.endpoint10.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint10.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint10.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint10.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint10.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint10.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint10.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-11" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/auth/notifications/{id}</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Mark notification as viewed.</h3>
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
                  <code class="param-name">id</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">ID of notifications.
</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab11 = lang"
                    :class="['code-tab', { active: activeCodeTab11 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab11 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 11)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/auth/notifications/{id}&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;id&quot;:&quot;example&quot;}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab11 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 11)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[11] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab11 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 11)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[11] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab11 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 11)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[11] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab11 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 11)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[11] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Id</label>
                <input v-model="testData11.id" type="text" placeholder="example_id" class="test-input" />
              </div>
              <button @click="testEndpoint11" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint11" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint11.status }}</span>
                  <span class="timestamp">{{ results.endpoint11.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint11.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint11.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint11.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint11.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint11.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint11.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-12" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/otp</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Inits operation to turn OTP on (one time password) for current user.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab12 = lang"
                    :class="['code-tab', { active: activeCodeTab12 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab12 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 12)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/otp&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab12 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 12)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[12] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab12 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 12)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[12] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab12 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 12)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[12] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab12 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 12)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[12] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint12" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint12" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint12.status }}</span>
                  <span class="timestamp">{{ results.endpoint12.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint12.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint12.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint12.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint12.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint12.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint12.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-13" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge delete">DELETE</span>
              <span class="endpoint-path">/auth/otp</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Inits operation to turn OTP off (one time password 2FA) for current user by using email and OTP.</h3>
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
                  <code class="param-name">email</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Flag indicates to use only email to turn off 2FA
</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab13 = lang"
                    :class="['code-tab', { active: activeCodeTab13 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab13 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 13)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X DELETE &quot;https://develop.okd.finance/api/auth/otp&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;email&quot;:&quot;example&quot;}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab13 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 13)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[13] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab13 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 13)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[13] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab13 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 13)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[13] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab13 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 13)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[13] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Email</label>
                <input v-model="testData13.email" type="text" placeholder="example_email" class="test-input" />
              </div>
              <button @click="testEndpoint13" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint13" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint13.status }}</span>
                  <span class="timestamp">{{ results.endpoint13.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint13.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint13.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint13.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint13.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint13.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint13.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-14" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/auth/password</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Inits operation to change current user password.
Operation is valid only for regular and firebase accounts.
It's no need to set old/new password for firebase account.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab14 = lang"
                    :class="['code-tab', { active: activeCodeTab14 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab14 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 14)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/auth/password&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab14 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 14)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[14] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab14 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 14)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[14] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab14 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 14)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[14] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab14 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 14)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[14] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint14" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint14" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint14.status }}</span>
                  <span class="timestamp">{{ results.endpoint14.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint14.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint14.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint14.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint14.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint14.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint14.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-15" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/auth/password/restore</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Finishes restoration of current user password.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab15 = lang"
                    :class="['code-tab', { active: activeCodeTab15 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab15 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 15)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/auth/password/restore&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab15 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 15)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[15] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab15 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 15)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[15] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab15 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 15)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[15] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab15 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 15)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[15] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint15" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint15" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint15.status }}</span>
                  <span class="timestamp">{{ results.endpoint15.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint15.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint15.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint15.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint15.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint15.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint15.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-16" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/password/restore</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Inits restoration of current user password.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab16 = lang"
                    :class="['code-tab', { active: activeCodeTab16 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab16 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 16)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/password/restore&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab16 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 16)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[16] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab16 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 16)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[16] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab16 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 16)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[16] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab16 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 16)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[16] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint16" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint16" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint16.status }}</span>
                  <span class="timestamp">{{ results.endpoint16.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint16.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint16.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint16.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint16.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint16.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint16.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-17" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/auth/password/restore/{code}</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Check restoration code.</h3>
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
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                <div class="param-item required">
                  <code class="param-name">code</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">code from email</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab17 = lang"
                    :class="['code-tab', { active: activeCodeTab17 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab17 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 17)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X GET &quot;https://develop.okd.finance/api/auth/password/restore/{code}&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;code&quot;:&quot;example&quot;}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab17 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 17)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[17] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab17 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 17)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[17] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab17 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 17)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[17] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab17 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 17)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[17] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Code</label>
                <input v-model="testData17.code" type="text" placeholder="example_code" class="test-input" />
              </div>
              <button @click="testEndpoint17" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint17" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint17.status }}</span>
                  <span class="timestamp">{{ results.endpoint17.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint17.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint17.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint17.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint17.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint17.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint17.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-18" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/auth/profile</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 GetProfile returns information about current user.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab18 = lang"
                    :class="['code-tab', { active: activeCodeTab18 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab18 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 18)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X GET &quot;https://develop.okd.finance/api/auth/profile&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab18 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 18)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[18] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab18 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 18)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[18] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab18 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 18)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[18] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab18 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 18)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[18] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint18" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint18" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint18.status }}</span>
                  <span class="timestamp">{{ results.endpoint18.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint18.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint18.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint18.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint18.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint18.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint18.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-19" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/auth/profile</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 SetProfile sets some fields in profile of current user. All fields are optional.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab19 = lang"
                    :class="['code-tab', { active: activeCodeTab19 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab19 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 19)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/auth/profile&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab19 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 19)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[19] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab19 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 19)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[19] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab19 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 19)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[19] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab19 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 19)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[19] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint19" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint19" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint19.status }}</span>
                  <span class="timestamp">{{ results.endpoint19.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint19.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint19.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint19.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint19.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint19.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint19.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-20" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/auth/remove</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Check possibility to remove account.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab20 = lang"
                    :class="['code-tab', { active: activeCodeTab20 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab20 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 20)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X GET &quot;https://develop.okd.finance/api/auth/remove&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab20 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 20)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[20] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab20 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 20)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[20] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab20 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 20)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[20] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab20 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 20)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[20] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint20" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint20" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint20.status }}</span>
                  <span class="timestamp">{{ results.endpoint20.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint20.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint20.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint20.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint20.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint20.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint20.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-21" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/auth/remove</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Inits operation to remove account. Reason maximum length is 200.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab21 = lang"
                    :class="['code-tab', { active: activeCodeTab21 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab21 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 21)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/auth/remove&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab21 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 21)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[21] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab21 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 21)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[21] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab21 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 21)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[21] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab21 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 21)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[21] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint21" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint21" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint21.status }}</span>
                  <span class="timestamp">{{ results.endpoint21.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint21.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint21.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint21.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint21.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint21.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint21.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-22" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/auth/sign-in</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Confirm login operation.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab22 = lang"
                    :class="['code-tab', { active: activeCodeTab22 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab22 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 22)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/auth/sign-in&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab22 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 22)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[22] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab22 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 22)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[22] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab22 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 22)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[22] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab22 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 22)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[22] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint22" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint22" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint22.status }}</span>
                  <span class="timestamp">{{ results.endpoint22.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint22.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint22.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint22.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint22.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint22.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint22.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-23" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/sign-in</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Logins user and return pair of tokens or login operation with hints.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab23 = lang"
                    :class="['code-tab', { active: activeCodeTab23 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab23 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 23)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/sign-in&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab23 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 23)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[23] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab23 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 23)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[23] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab23 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 23)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[23] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab23 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 23)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[23] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint23" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint23" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint23.status }}</span>
                  <span class="timestamp">{{ results.endpoint23.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint23.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint23.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint23.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint23.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint23.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint23.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-24" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/sign-in/firebase</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Sign in by firebase request.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab24 = lang"
                    :class="['code-tab', { active: activeCodeTab24 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab24 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 24)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/sign-in/firebase&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab24 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 24)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[24] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab24 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 24)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[24] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab24 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 24)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[24] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab24 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 24)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[24] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint24" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint24" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint24.status }}</span>
                  <span class="timestamp">{{ results.endpoint24.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint24.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint24.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint24.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint24.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint24.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint24.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-25" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/sign-in/google</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Sign in by Google OAuth2 request.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab25 = lang"
                    :class="['code-tab', { active: activeCodeTab25 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab25 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 25)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/sign-in/google&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab25 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 25)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[25] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab25 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 25)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[25] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab25 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 25)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[25] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab25 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 25)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[25] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint25" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint25" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint25.status }}</span>
                  <span class="timestamp">{{ results.endpoint25.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint25.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint25.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint25.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint25.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint25.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint25.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-26" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/auth/sign-in/resend</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Resend email/phone codes for sign-in process.</h3>
              <p class="endpoint-description">Only one of flags should be set.</p>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab26 = lang"
                    :class="['code-tab', { active: activeCodeTab26 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab26 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 26)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/auth/sign-in/resend&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab26 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 26)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[26] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab26 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 26)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[26] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab26 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 26)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[26] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab26 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 26)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[26] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint26" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint26" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint26.status }}</span>
                  <span class="timestamp">{{ results.endpoint26.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint26.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint26.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint26.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint26.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint26.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint26.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-27" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/sign-out</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Logout remove user sessions and makes the token invalid.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab27 = lang"
                    :class="['code-tab', { active: activeCodeTab27 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab27 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 27)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/sign-out&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab27 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 27)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[27] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab27 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 27)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[27] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab27 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 27)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[27] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab27 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 27)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[27] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint27" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint27" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint27.status }}</span>
                  <span class="timestamp">{{ results.endpoint27.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint27.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint27.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint27.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint27.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint27.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint27.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-28" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/sign-up</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Registration save user in database and send verification url to email.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab28 = lang"
                    :class="['code-tab', { active: activeCodeTab28 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab28 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 28)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/sign-up&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab28 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 28)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[28] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab28 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 28)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[28] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab28 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 28)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[28] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab28 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 28)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[28] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint28" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint28" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint28.status }}</span>
                  <span class="timestamp">{{ results.endpoint28.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint28.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint28.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint28.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint28.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint28.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint28.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-29" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/sign-up/google</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Sign up by Google OAuth2 request.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab29 = lang"
                    :class="['code-tab', { active: activeCodeTab29 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab29 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 29)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/sign-up/google&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab29 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 29)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[29] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab29 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 29)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[29] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab29 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 29)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[29] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab29 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 29)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[29] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint29" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint29" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint29.status }}</span>
                  <span class="timestamp">{{ results.endpoint29.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint29.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint29.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint29.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint29.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint29.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint29.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-30" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/user/flags</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 SetProfile sets profile flags of current user.</h3>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab30 = lang"
                    :class="['code-tab', { active: activeCodeTab30 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab30 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 30)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/user/flags&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab30 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 30)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[30] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab30 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 30)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[30] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab30 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 30)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[30] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab30 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 30)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[30] }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              
              <button @click="testEndpoint30" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint30" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint30.status }}</span>
                  <span class="timestamp">{{ results.endpoint30.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint30.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint30.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint30.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint30.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint30.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint30.data }}</pre>
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
const activeCodeTab28 = ref('cURL')
const activeCodeTab29 = ref('cURL')
const activeCodeTab30 = ref('cURL')

const testData1 = reactive({  })
const testData2 = reactive({  })
const testData3 = reactive({  })
const testData4 = reactive({  })
const testData5 = reactive({  })
const testData6 = reactive({  })
const testData7 = reactive({  })
const testData8 = reactive({ group_id: 'example_group_id', hide_read: 'example_hide_read', limit: 'example_limit', offset: 'example_offset' })
const testData9 = reactive({  })
const testData10 = reactive({  })
const testData11 = reactive({ id: 'example_id' })
const testData12 = reactive({  })
const testData13 = reactive({ email: 'example_email' })
const testData14 = reactive({  })
const testData15 = reactive({  })
const testData16 = reactive({  })
const testData17 = reactive({ code: 'example_code' })
const testData18 = reactive({  })
const testData19 = reactive({  })
const testData20 = reactive({  })
const testData21 = reactive({  })
const testData22 = reactive({  })
const testData23 = reactive({  })
const testData24 = reactive({  })
const testData25 = reactive({  })
const testData26 = reactive({  })
const testData27 = reactive({  })
const testData28 = reactive({  })
const testData29 = reactive({  })
const testData30 = reactive({  })



const results = reactive({
  endpoint1: null,
  endpoint2: null,
  endpoint3: null,
  endpoint4: null,
  endpoint5: null,
  endpoint6: null,
  endpoint7: null,
  endpoint8: null,
  endpoint9: null,
  endpoint10: null,
  endpoint11: null,
  endpoint12: null,
  endpoint13: null,
  endpoint14: null,
  endpoint15: null,
  endpoint16: null,
  endpoint17: null,
  endpoint18: null,
  endpoint19: null,
  endpoint20: null,
  endpoint21: null,
  endpoint22: null,
  endpoint23: null,
  endpoint24: null,
  endpoint25: null,
  endpoint26: null,
  endpoint27: null,
  endpoint28: null,
  endpoint29: null,
  endpoint30: null
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
      
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/check/firebase`
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
    results.endpoint1 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/confirm`
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
    results.endpoint2 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
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
      
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/fcm`
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
    results.endpoint3 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
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
      
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/fcm`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint4 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `DELETE ${fullUrl}`,
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/google`
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
    results.endpoint5 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/jwt/refresh`
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
      
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/locale`
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

const testEndpoint8 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint8 = {
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
      group_id: testData8.group_id,
      hide_read: testData8.hide_read,
      limit: testData8.limit,
      offset: testData8.offset
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/notifications`
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
    results.endpoint8 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint8 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint9 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint9 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/notifications`
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
    results.endpoint9 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint9 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint10 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint10 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/notifications`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint10 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `DELETE ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint10 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint11 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint11 = {
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
      id: testData11.id
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/notifications/{id}`
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
    results.endpoint11 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint11 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint12 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint12 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/otp`
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
    results.endpoint12 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint12 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint13 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint13 = {
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
      email: testData13.email
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/otp`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint13 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `DELETE ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint13 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint14 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint14 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/password`
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
    results.endpoint14 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint14 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint15 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint15 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/password/restore`
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
    results.endpoint15 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint15 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint16 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint16 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/password/restore`
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
    results.endpoint16 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint16 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint17 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint17 = {
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
      code: testData17.code
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/password/restore/{code}`
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
    results.endpoint17 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint17 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint18 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint18 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/profile`
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
    results.endpoint18 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint18 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint19 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint19 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/profile`
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
    results.endpoint19 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint19 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint20 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint20 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/remove`
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
    results.endpoint20 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint20 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint21 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint21 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/remove`
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
    results.endpoint21 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint21 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint22 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint22 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/sign-in`
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
    results.endpoint22 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint22 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint23 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint23 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/sign-in`
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
    results.endpoint23 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint23 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint24 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint24 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/sign-in/firebase`
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
    results.endpoint24 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint24 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint25 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint25 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/sign-in/google`
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
    results.endpoint25 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint25 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint26 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint26 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/sign-in/resend`
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
    results.endpoint26 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint26 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint27 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint27 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/sign-out`
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
    results.endpoint27 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint27 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint28 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint28 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/sign-up`
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
    results.endpoint28 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint28 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint29 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint29 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/auth/sign-up/google`
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
    results.endpoint29 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint29 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint30 = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint30 = {
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

    const fullUrl = `${authValues.apiBaseUrl}/user/flags`
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
    results.endpoint30 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint30 = {
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
    1: `curl -X POST "https://develop.okd.finance/api/auth/check/firebase" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    2: `curl -X POST "https://develop.okd.finance/api/auth/confirm" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    3: `curl -X POST "https://develop.okd.finance/api/auth/fcm" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    4: `curl -X DELETE "https://develop.okd.finance/api/auth/fcm" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    5: `curl -X GET "https://develop.okd.finance/api/auth/google" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    6: `curl -X POST "https://develop.okd.finance/api/auth/jwt/refresh" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    7: `curl -X PUT "https://develop.okd.finance/api/auth/locale" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    8: `curl -X GET "https://develop.okd.finance/api/auth/notifications" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"group_id":"example","hide_read":"example","limit":"example","offset":"example"}'`,
    9: `curl -X PUT "https://develop.okd.finance/api/auth/notifications" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    10: `curl -X DELETE "https://develop.okd.finance/api/auth/notifications" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    11: `curl -X PUT "https://develop.okd.finance/api/auth/notifications/{id}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"id":"example"}'`,
    12: `curl -X POST "https://develop.okd.finance/api/auth/otp" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    13: `curl -X DELETE "https://develop.okd.finance/api/auth/otp" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"email":"example"}'`,
    14: `curl -X PUT "https://develop.okd.finance/api/auth/password" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    15: `curl -X PUT "https://develop.okd.finance/api/auth/password/restore" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    16: `curl -X POST "https://develop.okd.finance/api/auth/password/restore" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    17: `curl -X GET "https://develop.okd.finance/api/auth/password/restore/{code}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"code":"example"}'`,
    18: `curl -X GET "https://develop.okd.finance/api/auth/profile" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    19: `curl -X PUT "https://develop.okd.finance/api/auth/profile" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    20: `curl -X GET "https://develop.okd.finance/api/auth/remove" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    21: `curl -X PUT "https://develop.okd.finance/api/auth/remove" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    22: `curl -X PUT "https://develop.okd.finance/api/auth/sign-in" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    23: `curl -X POST "https://develop.okd.finance/api/auth/sign-in" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    24: `curl -X POST "https://develop.okd.finance/api/auth/sign-in/firebase" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    25: `curl -X POST "https://develop.okd.finance/api/auth/sign-in/google" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    26: `curl -X PUT "https://develop.okd.finance/api/auth/sign-in/resend" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    27: `curl -X POST "https://develop.okd.finance/api/auth/sign-out" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    28: `curl -X POST "https://develop.okd.finance/api/auth/sign-up" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    29: `curl -X POST "https://develop.okd.finance/api/auth/sign-up/google" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`,
    30: `curl -X PUT "https://develop.okd.finance/api/user/flags" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{}'`
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

type CheckaccountexistencebyfirebasetokenRequest struct {

}

func checkaccountexistencebyfirebasetoken() error {
    url := "https://develop.okd.finance/api/auth/check/firebase"
    
    requestData := CheckaccountexistencebyfirebasetokenRequest{

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
    if err := checkaccountexistencebyfirebasetoken(); err != nil {
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

type SendconfirmationcodetoemailRequest struct {

}

func sendconfirmationcodetoemail() error {
    url := "https://develop.okd.finance/api/auth/confirm"
    
    requestData := SendconfirmationcodetoemailRequest{

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
    if err := sendconfirmationcodetoemail(); err != nil {
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

type InitsoperationtocreateuserfcmRequest struct {

}

func initsoperationtocreateuserfcm() error {
    url := "https://develop.okd.finance/api/auth/fcm"
    
    requestData := InitsoperationtocreateuserfcmRequest{

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
    if err := initsoperationtocreateuserfcm(); err != nil {
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

type InitsoperationtodeleteuserfcmbydeviceidandfcmRequest struct {

}

func initsoperationtodeleteuserfcmbydeviceidandfcm() error {
    url := "https://develop.okd.finance/api/auth/fcm"
    
    requestData := InitsoperationtodeleteuserfcmbydeviceidandfcmRequest{

    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("DELETE", url, bytes.NewBuffer(jsonData))
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
    if err := initsoperationtodeleteuserfcmbydeviceidandfcm(); err != nil {
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

type GetGooglelinkforlgoinregisterRequest struct {

}

func getgooglelinkforlgoinregister() error {
    url := "https://develop.okd.finance/api/auth/google"
    
    requestData := GetGooglelinkforlgoinregisterRequest{

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
    if err := getgooglelinkforlgoinregister(); err != nil {
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

type RegenerateapairofauthenticatetokensifrefreshtokenisvalidRequest struct {

}

func regenerateapairofauthenticatetokensifrefreshtokenisvalid() error {
    url := "https://develop.okd.finance/api/auth/jwt/refresh"
    
    requestData := RegenerateapairofauthenticatetokensifrefreshtokenisvalidRequest{

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
    if err := regenerateapairofauthenticatetokensifrefreshtokenisvalid(); err != nil {
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

type InitsoperationtochangecurrentuserlocaleRequest struct {

}

func initsoperationtochangecurrentuserlocale() error {
    url := "https://develop.okd.finance/api/auth/locale"
    
    requestData := InitsoperationtochangecurrentuserlocaleRequest{

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
    if err := initsoperationtochangecurrentuserlocale(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    8: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type GetnotificationsforuserRequest struct {
    Group_id string \`json:"group_id"\`\n    Hide_read string \`json:"hide_read"\`\n    Limit string \`json:"limit"\`\n    Offset string \`json:"offset"\`
}

func getnotificationsforuser() error {
    url := "https://develop.okd.finance/api/auth/notifications"
    
    requestData := GetnotificationsforuserRequest{
        Group_id: "example",\n        Hide_read: "example",\n        Limit: "example",\n        Offset: "example",
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
    if err := getnotificationsforuser(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    9: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type MarkallgroupofnotificationsasviewedBodyisoptionalRequest struct {

}

func markallgroupofnotificationsasviewedbodyisoptional() error {
    url := "https://develop.okd.finance/api/auth/notifications"
    
    requestData := MarkallgroupofnotificationsasviewedBodyisoptionalRequest{

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
    if err := markallgroupofnotificationsasviewedbodyisoptional(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    10: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type DeleteallgroupofnotificationsBodyisoptionalRequest struct {

}

func deleteallgroupofnotificationsbodyisoptional() error {
    url := "https://develop.okd.finance/api/auth/notifications"
    
    requestData := DeleteallgroupofnotificationsBodyisoptionalRequest{

    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("DELETE", url, bytes.NewBuffer(jsonData))
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
    if err := deleteallgroupofnotificationsbodyisoptional(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    11: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type MarknotificationasviewedRequest struct {
    Id string \`json:"id"\`
}

func marknotificationasviewed() error {
    url := "https://develop.okd.finance/api/auth/notifications/{id}"
    
    requestData := MarknotificationasviewedRequest{
        Id: "example",
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
    if err := marknotificationasviewed(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    12: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type InitsoperationtoturnOTPononetimepasswordforcurrentuserRequest struct {

}

func initsoperationtoturnotpononetimepasswordforcurrentuser() error {
    url := "https://develop.okd.finance/api/auth/otp"
    
    requestData := InitsoperationtoturnOTPononetimepasswordforcurrentuserRequest{

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
    if err := initsoperationtoturnotpononetimepasswordforcurrentuser(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    13: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type InitsoperationtoturnOTPoffonetimepassword2FAforcurrentuserbyusingemailandOTPRequest struct {
    Email string \`json:"email"\`
}

func initsoperationtoturnotpoffonetimepassword2faforcurrentuserbyusingemailandotp() error {
    url := "https://develop.okd.finance/api/auth/otp"
    
    requestData := InitsoperationtoturnOTPoffonetimepassword2FAforcurrentuserbyusingemailandOTPRequest{
        Email: "example",
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("DELETE", url, bytes.NewBuffer(jsonData))
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
    if err := initsoperationtoturnotpoffonetimepassword2faforcurrentuserbyusingemailandotp(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    14: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type InitsoperationtochangecurrentuserpasswordOperationisvalidonlyforregularandfirebaseaccountsItsnoneedtosetoldnewpasswordforfirebaseaccountRequest struct {

}

func initsoperationtochangecurrentuserpasswordoperationisvalidonlyforregularandfirebaseaccountsitsnoneedtosetoldnewpasswordforfirebaseaccount() error {
    url := "https://develop.okd.finance/api/auth/password"
    
    requestData := InitsoperationtochangecurrentuserpasswordOperationisvalidonlyforregularandfirebaseaccountsItsnoneedtosetoldnewpasswordforfirebaseaccountRequest{

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
    if err := initsoperationtochangecurrentuserpasswordoperationisvalidonlyforregularandfirebaseaccountsitsnoneedtosetoldnewpasswordforfirebaseaccount(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    15: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type FinishesrestorationofcurrentuserpasswordRequest struct {

}

func finishesrestorationofcurrentuserpassword() error {
    url := "https://develop.okd.finance/api/auth/password/restore"
    
    requestData := FinishesrestorationofcurrentuserpasswordRequest{

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
    if err := finishesrestorationofcurrentuserpassword(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    16: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type InitsrestorationofcurrentuserpasswordRequest struct {

}

func initsrestorationofcurrentuserpassword() error {
    url := "https://develop.okd.finance/api/auth/password/restore"
    
    requestData := InitsrestorationofcurrentuserpasswordRequest{

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
    if err := initsrestorationofcurrentuserpassword(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    17: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type CheckrestorationcodeRequest struct {
    Code string \`json:"code"\`
}

func checkrestorationcode() error {
    url := "https://develop.okd.finance/api/auth/password/restore/{code}"
    
    requestData := CheckrestorationcodeRequest{
        Code: "example",
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
    if err := checkrestorationcode(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    18: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type GetProfilereturnsinformationaboutcurrentuserRequest struct {

}

func getprofilereturnsinformationaboutcurrentuser() error {
    url := "https://develop.okd.finance/api/auth/profile"
    
    requestData := GetProfilereturnsinformationaboutcurrentuserRequest{

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
    if err := getprofilereturnsinformationaboutcurrentuser(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    19: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type SetProfilesetssomefieldsinprofileofcurrentuserAllfieldsareoptionalRequest struct {

}

func setprofilesetssomefieldsinprofileofcurrentuserallfieldsareoptional() error {
    url := "https://develop.okd.finance/api/auth/profile"
    
    requestData := SetProfilesetssomefieldsinprofileofcurrentuserAllfieldsareoptionalRequest{

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
    if err := setprofilesetssomefieldsinprofileofcurrentuserallfieldsareoptional(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    20: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type CheckpossibilitytoremoveaccountRequest struct {

}

func checkpossibilitytoremoveaccount() error {
    url := "https://develop.okd.finance/api/auth/remove"
    
    requestData := CheckpossibilitytoremoveaccountRequest{

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
    if err := checkpossibilitytoremoveaccount(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    21: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type InitsoperationtoremoveaccountReasonmaximumlengthis200Request struct {

}

func initsoperationtoremoveaccountreasonmaximumlengthis200() error {
    url := "https://develop.okd.finance/api/auth/remove"
    
    requestData := InitsoperationtoremoveaccountReasonmaximumlengthis200Request{

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
    if err := initsoperationtoremoveaccountreasonmaximumlengthis200(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    22: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type ConfirmloginoperationRequest struct {

}

func confirmloginoperation() error {
    url := "https://develop.okd.finance/api/auth/sign-in"
    
    requestData := ConfirmloginoperationRequest{

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
    if err := confirmloginoperation(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    23: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type LoginsuserandreturnpairoftokensorloginoperationwithhintsRequest struct {

}

func loginsuserandreturnpairoftokensorloginoperationwithhints() error {
    url := "https://develop.okd.finance/api/auth/sign-in"
    
    requestData := LoginsuserandreturnpairoftokensorloginoperationwithhintsRequest{

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
    if err := loginsuserandreturnpairoftokensorloginoperationwithhints(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    24: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type SigninbyfirebaserequestRequest struct {

}

func signinbyfirebaserequest() error {
    url := "https://develop.okd.finance/api/auth/sign-in/firebase"
    
    requestData := SigninbyfirebaserequestRequest{

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
    if err := signinbyfirebaserequest(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    25: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type SigninbyGoogleOAuth2requestRequest struct {

}

func signinbygoogleoauth2request() error {
    url := "https://develop.okd.finance/api/auth/sign-in/google"
    
    requestData := SigninbyGoogleOAuth2requestRequest{

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
    if err := signinbygoogleoauth2request(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    26: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type ResendemailphonecodesforsigninprocessRequest struct {

}

func resendemailphonecodesforsigninprocess() error {
    url := "https://develop.okd.finance/api/auth/sign-in/resend"
    
    requestData := ResendemailphonecodesforsigninprocessRequest{

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
    if err := resendemailphonecodesforsigninprocess(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    27: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type LogoutremoveusersessionsandmakesthetokeninvalidRequest struct {

}

func logoutremoveusersessionsandmakesthetokeninvalid() error {
    url := "https://develop.okd.finance/api/auth/sign-out"
    
    requestData := LogoutremoveusersessionsandmakesthetokeninvalidRequest{

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
    if err := logoutremoveusersessionsandmakesthetokeninvalid(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    28: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type RegistrationsaveuserindatabaseandsendverificationurltoemailRequest struct {

}

func registrationsaveuserindatabaseandsendverificationurltoemail() error {
    url := "https://develop.okd.finance/api/auth/sign-up"
    
    requestData := RegistrationsaveuserindatabaseandsendverificationurltoemailRequest{

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
    if err := registrationsaveuserindatabaseandsendverificationurltoemail(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    29: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type SignupbyGoogleOAuth2requestRequest struct {

}

func signupbygoogleoauth2request() error {
    url := "https://develop.okd.finance/api/auth/sign-up/google"
    
    requestData := SignupbyGoogleOAuth2requestRequest{

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
    if err := signupbygoogleoauth2request(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`,
    30: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type SetProfilesetsprofileflagsofcurrentuserRequest struct {

}

func setprofilesetsprofileflagsofcurrentuser() error {
    url := "https://develop.okd.finance/api/user/flags"
    
    requestData := SetProfilesetsprofileflagsofcurrentuserRequest{

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
    if err := setprofilesetsprofileflagsofcurrentuser(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`
  },
  typescript: {
    1: `interface CheckaccountexistencebyfirebasetokenRequest {

}

async function checkaccountexistencebyfirebasetoken(
  baseUrl: string,
  accessToken: string,
  data: CheckaccountexistencebyfirebasetokenRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/check/firebase\`, {
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
    const result = await checkaccountexistencebyfirebasetoken(
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
    2: `interface SendconfirmationcodetoemailRequest {

}

async function sendconfirmationcodetoemail(
  baseUrl: string,
  accessToken: string,
  data: SendconfirmationcodetoemailRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/confirm\`, {
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
    const result = await sendconfirmationcodetoemail(
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
    3: `interface InitsoperationtocreateuserfcmRequest {

}

async function initsoperationtocreateuserfcm(
  baseUrl: string,
  accessToken: string,
  data: InitsoperationtocreateuserfcmRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/fcm\`, {
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
    const result = await initsoperationtocreateuserfcm(
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
    4: `interface InitsoperationtodeleteuserfcmbydeviceidandfcmRequest {

}

async function initsoperationtodeleteuserfcmbydeviceidandfcm(
  baseUrl: string,
  accessToken: string,
  data: InitsoperationtodeleteuserfcmbydeviceidandfcmRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/fcm\`, {
    method: 'DELETE',
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
    const result = await initsoperationtodeleteuserfcmbydeviceidandfcm(
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
    5: `interface GetGooglelinkforlgoinregisterRequest {

}

async function getgooglelinkforlgoinregister(
  baseUrl: string,
  accessToken: string,
  data: GetGooglelinkforlgoinregisterRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/google\`, {
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
    const result = await getgooglelinkforlgoinregister(
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
    6: `interface RegenerateapairofauthenticatetokensifrefreshtokenisvalidRequest {

}

async function regenerateapairofauthenticatetokensifrefreshtokenisvalid(
  baseUrl: string,
  accessToken: string,
  data: RegenerateapairofauthenticatetokensifrefreshtokenisvalidRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/jwt/refresh\`, {
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
    const result = await regenerateapairofauthenticatetokensifrefreshtokenisvalid(
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
    7: `interface InitsoperationtochangecurrentuserlocaleRequest {

}

async function initsoperationtochangecurrentuserlocale(
  baseUrl: string,
  accessToken: string,
  data: InitsoperationtochangecurrentuserlocaleRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/locale\`, {
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
    const result = await initsoperationtochangecurrentuserlocale(
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
    8: `interface GetnotificationsforuserRequest {
  group_id: string;\n  hide_read: string;\n  limit: string;\n  offset: string;
}

async function getnotificationsforuser(
  baseUrl: string,
  accessToken: string,
  data: GetnotificationsforuserRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/notifications\`, {
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
    const result = await getnotificationsforuser(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        group_id: "example",\n        hide_read: "example",\n        limit: "example",\n        offset: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    9: `interface MarkallgroupofnotificationsasviewedBodyisoptionalRequest {

}

async function markallgroupofnotificationsasviewedbodyisoptional(
  baseUrl: string,
  accessToken: string,
  data: MarkallgroupofnotificationsasviewedBodyisoptionalRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/notifications\`, {
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
    const result = await markallgroupofnotificationsasviewedbodyisoptional(
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
    10: `interface DeleteallgroupofnotificationsBodyisoptionalRequest {

}

async function deleteallgroupofnotificationsbodyisoptional(
  baseUrl: string,
  accessToken: string,
  data: DeleteallgroupofnotificationsBodyisoptionalRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/notifications\`, {
    method: 'DELETE',
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
    const result = await deleteallgroupofnotificationsbodyisoptional(
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
    11: `interface MarknotificationasviewedRequest {
  id: string;
}

async function marknotificationasviewed(
  baseUrl: string,
  accessToken: string,
  data: MarknotificationasviewedRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/notifications/{id}\`, {
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
    const result = await marknotificationasviewed(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        id: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    12: `interface InitsoperationtoturnOTPononetimepasswordforcurrentuserRequest {

}

async function initsoperationtoturnotpononetimepasswordforcurrentuser(
  baseUrl: string,
  accessToken: string,
  data: InitsoperationtoturnOTPononetimepasswordforcurrentuserRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/otp\`, {
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
    const result = await initsoperationtoturnotpononetimepasswordforcurrentuser(
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
    13: `interface InitsoperationtoturnOTPoffonetimepassword2FAforcurrentuserbyusingemailandOTPRequest {
  email: string;
}

async function initsoperationtoturnotpoffonetimepassword2faforcurrentuserbyusingemailandotp(
  baseUrl: string,
  accessToken: string,
  data: InitsoperationtoturnOTPoffonetimepassword2FAforcurrentuserbyusingemailandOTPRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/otp\`, {
    method: 'DELETE',
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
    const result = await initsoperationtoturnotpoffonetimepassword2faforcurrentuserbyusingemailandotp(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        email: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    14: `interface InitsoperationtochangecurrentuserpasswordOperationisvalidonlyforregularandfirebaseaccountsItsnoneedtosetoldnewpasswordforfirebaseaccountRequest {

}

async function initsoperationtochangecurrentuserpasswordoperationisvalidonlyforregularandfirebaseaccountsitsnoneedtosetoldnewpasswordforfirebaseaccount(
  baseUrl: string,
  accessToken: string,
  data: InitsoperationtochangecurrentuserpasswordOperationisvalidonlyforregularandfirebaseaccountsItsnoneedtosetoldnewpasswordforfirebaseaccountRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/password\`, {
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
    const result = await initsoperationtochangecurrentuserpasswordoperationisvalidonlyforregularandfirebaseaccountsitsnoneedtosetoldnewpasswordforfirebaseaccount(
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
    15: `interface FinishesrestorationofcurrentuserpasswordRequest {

}

async function finishesrestorationofcurrentuserpassword(
  baseUrl: string,
  accessToken: string,
  data: FinishesrestorationofcurrentuserpasswordRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/password/restore\`, {
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
    const result = await finishesrestorationofcurrentuserpassword(
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
    16: `interface InitsrestorationofcurrentuserpasswordRequest {

}

async function initsrestorationofcurrentuserpassword(
  baseUrl: string,
  accessToken: string,
  data: InitsrestorationofcurrentuserpasswordRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/password/restore\`, {
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
    const result = await initsrestorationofcurrentuserpassword(
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
    17: `interface CheckrestorationcodeRequest {
  code: string;
}

async function checkrestorationcode(
  baseUrl: string,
  accessToken: string,
  data: CheckrestorationcodeRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/password/restore/{code}\`, {
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
    const result = await checkrestorationcode(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        code: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    18: `interface GetProfilereturnsinformationaboutcurrentuserRequest {

}

async function getprofilereturnsinformationaboutcurrentuser(
  baseUrl: string,
  accessToken: string,
  data: GetProfilereturnsinformationaboutcurrentuserRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/profile\`, {
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
    const result = await getprofilereturnsinformationaboutcurrentuser(
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
    19: `interface SetProfilesetssomefieldsinprofileofcurrentuserAllfieldsareoptionalRequest {

}

async function setprofilesetssomefieldsinprofileofcurrentuserallfieldsareoptional(
  baseUrl: string,
  accessToken: string,
  data: SetProfilesetssomefieldsinprofileofcurrentuserAllfieldsareoptionalRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/profile\`, {
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
    const result = await setprofilesetssomefieldsinprofileofcurrentuserallfieldsareoptional(
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
    20: `interface CheckpossibilitytoremoveaccountRequest {

}

async function checkpossibilitytoremoveaccount(
  baseUrl: string,
  accessToken: string,
  data: CheckpossibilitytoremoveaccountRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/remove\`, {
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
    const result = await checkpossibilitytoremoveaccount(
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
    21: `interface InitsoperationtoremoveaccountReasonmaximumlengthis200Request {

}

async function initsoperationtoremoveaccountreasonmaximumlengthis200(
  baseUrl: string,
  accessToken: string,
  data: InitsoperationtoremoveaccountReasonmaximumlengthis200Request
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/remove\`, {
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
    const result = await initsoperationtoremoveaccountreasonmaximumlengthis200(
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
    22: `interface ConfirmloginoperationRequest {

}

async function confirmloginoperation(
  baseUrl: string,
  accessToken: string,
  data: ConfirmloginoperationRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/sign-in\`, {
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
    const result = await confirmloginoperation(
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
    23: `interface LoginsuserandreturnpairoftokensorloginoperationwithhintsRequest {

}

async function loginsuserandreturnpairoftokensorloginoperationwithhints(
  baseUrl: string,
  accessToken: string,
  data: LoginsuserandreturnpairoftokensorloginoperationwithhintsRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/sign-in\`, {
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
    const result = await loginsuserandreturnpairoftokensorloginoperationwithhints(
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
    24: `interface SigninbyfirebaserequestRequest {

}

async function signinbyfirebaserequest(
  baseUrl: string,
  accessToken: string,
  data: SigninbyfirebaserequestRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/sign-in/firebase\`, {
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
    const result = await signinbyfirebaserequest(
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
    25: `interface SigninbyGoogleOAuth2requestRequest {

}

async function signinbygoogleoauth2request(
  baseUrl: string,
  accessToken: string,
  data: SigninbyGoogleOAuth2requestRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/sign-in/google\`, {
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
    const result = await signinbygoogleoauth2request(
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
    26: `interface ResendemailphonecodesforsigninprocessRequest {

}

async function resendemailphonecodesforsigninprocess(
  baseUrl: string,
  accessToken: string,
  data: ResendemailphonecodesforsigninprocessRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/sign-in/resend\`, {
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
    const result = await resendemailphonecodesforsigninprocess(
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
    27: `interface LogoutremoveusersessionsandmakesthetokeninvalidRequest {

}

async function logoutremoveusersessionsandmakesthetokeninvalid(
  baseUrl: string,
  accessToken: string,
  data: LogoutremoveusersessionsandmakesthetokeninvalidRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/sign-out\`, {
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
    const result = await logoutremoveusersessionsandmakesthetokeninvalid(
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
    28: `interface RegistrationsaveuserindatabaseandsendverificationurltoemailRequest {

}

async function registrationsaveuserindatabaseandsendverificationurltoemail(
  baseUrl: string,
  accessToken: string,
  data: RegistrationsaveuserindatabaseandsendverificationurltoemailRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/sign-up\`, {
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
    const result = await registrationsaveuserindatabaseandsendverificationurltoemail(
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
    29: `interface SignupbyGoogleOAuth2requestRequest {

}

async function signupbygoogleoauth2request(
  baseUrl: string,
  accessToken: string,
  data: SignupbyGoogleOAuth2requestRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/sign-up/google\`, {
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
    const result = await signupbygoogleoauth2request(
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
    30: `interface SetProfilesetsprofileflagsofcurrentuserRequest {

}

async function setprofilesetsprofileflagsofcurrentuser(
  baseUrl: string,
  accessToken: string,
  data: SetProfilesetsprofileflagsofcurrentuserRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/user/flags\`, {
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
    const result = await setprofilesetsprofileflagsofcurrentuser(
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

main();`
  },
  php: {
    1: `<?php

function checkaccountexistencebyfirebasetoken($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/check/firebase';
    
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

    $result = checkaccountexistencebyfirebasetoken(
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

function sendconfirmationcodetoemail($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/confirm';
    
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

    $result = sendconfirmationcodetoemail(
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

function initsoperationtocreateuserfcm($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/fcm';
    
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

    $result = initsoperationtocreateuserfcm(
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

function initsoperationtodeleteuserfcmbydeviceidandfcm($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/fcm';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
          'Fingerprint: YOUR_FINGERPRINT'
      ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => 'DELETE',
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

    $result = initsoperationtodeleteuserfcmbydeviceidandfcm(
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

function getgooglelinkforlgoinregister($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/google';
    
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

    $result = getgooglelinkforlgoinregister(
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

function regenerateapairofauthenticatetokensifrefreshtokenisvalid($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/jwt/refresh';
    
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

    $result = regenerateapairofauthenticatetokensifrefreshtokenisvalid(
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

function initsoperationtochangecurrentuserlocale($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/locale';
    
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

    ];

    $result = initsoperationtochangecurrentuserlocale(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    8: `<?php

function getnotificationsforuser($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/notifications';
    
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
        'group_id' => 'example',\n        'hide_read' => 'example',\n        'limit' => 'example',\n        'offset' => 'example',
    ];

    $result = getnotificationsforuser(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    9: `<?php

function markallgroupofnotificationsasviewedbodyisoptional($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/notifications';
    
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

    ];

    $result = markallgroupofnotificationsasviewedbodyisoptional(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    10: `<?php

function deleteallgroupofnotificationsbodyisoptional($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/notifications';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
          'Fingerprint: YOUR_FINGERPRINT'
      ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => 'DELETE',
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

    $result = deleteallgroupofnotificationsbodyisoptional(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    11: `<?php

function marknotificationasviewed($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/notifications/{id}';
    
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
        'id' => 'example',
    ];

    $result = marknotificationasviewed(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    12: `<?php

function initsoperationtoturnotpononetimepasswordforcurrentuser($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/otp';
    
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

    $result = initsoperationtoturnotpononetimepasswordforcurrentuser(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    13: `<?php

function initsoperationtoturnotpoffonetimepassword2faforcurrentuserbyusingemailandotp($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/otp';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
          'Fingerprint: YOUR_FINGERPRINT'
      ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => 'DELETE',
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
        'email' => 'example',
    ];

    $result = initsoperationtoturnotpoffonetimepassword2faforcurrentuserbyusingemailandotp(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    14: `<?php

function initsoperationtochangecurrentuserpasswordoperationisvalidonlyforregularandfirebaseaccountsitsnoneedtosetoldnewpasswordforfirebaseaccount($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/password';
    
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

    ];

    $result = initsoperationtochangecurrentuserpasswordoperationisvalidonlyforregularandfirebaseaccountsitsnoneedtosetoldnewpasswordforfirebaseaccount(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    15: `<?php

function finishesrestorationofcurrentuserpassword($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/password/restore';
    
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

    ];

    $result = finishesrestorationofcurrentuserpassword(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    16: `<?php

function initsrestorationofcurrentuserpassword($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/password/restore';
    
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

    $result = initsrestorationofcurrentuserpassword(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    17: `<?php

function checkrestorationcode($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/password/restore/{code}';
    
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
        'code' => 'example',
    ];

    $result = checkrestorationcode(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    18: `<?php

function getprofilereturnsinformationaboutcurrentuser($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/profile';
    
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

    $result = getprofilereturnsinformationaboutcurrentuser(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    19: `<?php

function setprofilesetssomefieldsinprofileofcurrentuserallfieldsareoptional($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/profile';
    
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

    ];

    $result = setprofilesetssomefieldsinprofileofcurrentuserallfieldsareoptional(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    20: `<?php

function checkpossibilitytoremoveaccount($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/remove';
    
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

    $result = checkpossibilitytoremoveaccount(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    21: `<?php

function initsoperationtoremoveaccountreasonmaximumlengthis200($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/remove';
    
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

    ];

    $result = initsoperationtoremoveaccountreasonmaximumlengthis200(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    22: `<?php

function confirmloginoperation($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/sign-in';
    
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

    ];

    $result = confirmloginoperation(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    23: `<?php

function loginsuserandreturnpairoftokensorloginoperationwithhints($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/sign-in';
    
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

    $result = loginsuserandreturnpairoftokensorloginoperationwithhints(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    24: `<?php

function signinbyfirebaserequest($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/sign-in/firebase';
    
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

    $result = signinbyfirebaserequest(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    25: `<?php

function signinbygoogleoauth2request($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/sign-in/google';
    
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

    $result = signinbygoogleoauth2request(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    26: `<?php

function resendemailphonecodesforsigninprocess($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/sign-in/resend';
    
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

    ];

    $result = resendemailphonecodesforsigninprocess(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    27: `<?php

function logoutremoveusersessionsandmakesthetokeninvalid($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/sign-out';
    
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

    $result = logoutremoveusersessionsandmakesthetokeninvalid(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    28: `<?php

function registrationsaveuserindatabaseandsendverificationurltoemail($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/sign-up';
    
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

    $result = registrationsaveuserindatabaseandsendverificationurltoemail(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    29: `<?php

function signupbygoogleoauth2request($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/sign-up/google';
    
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

    $result = signupbygoogleoauth2request(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,
    30: `<?php

function setprofilesetsprofileflagsofcurrentuser($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/user/flags';
    
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

    ];

    $result = setprofilesetsprofileflagsofcurrentuser(
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


def checkaccountexistencebyfirebasetoken(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/check/firebase"
    
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
        result = checkaccountexistencebyfirebasetoken(
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


def sendconfirmationcodetoemail(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/confirm"
    
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
        result = sendconfirmationcodetoemail(
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


def initsoperationtocreateuserfcm(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/fcm"
    
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
        result = initsoperationtocreateuserfcm(
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


def initsoperationtodeleteuserfcmbydeviceidandfcm(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/fcm"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            'DELETE',
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
        result = initsoperationtodeleteuserfcmbydeviceidandfcm(
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


def getgooglelinkforlgoinregister(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/google"
    
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
        result = getgooglelinkforlgoinregister(
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


def regenerateapairofauthenticatetokensifrefreshtokenisvalid(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need refresh token in bearer token authorization"""
    url = f"{base_url}/auth/jwt/refresh"
    
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
        result = regenerateapairofauthenticatetokensifrefreshtokenisvalid(
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


def initsoperationtochangecurrentuserlocale(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/locale"
    
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

    }
    
    try:
        result = initsoperationtochangecurrentuserlocale(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    8: `import requests
import json
from typing import Dict, Any


def getnotificationsforuser(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/notifications"
    
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
        'group_id': 'example',\n        'hide_read': 'example',\n        'limit': 'example',\n        'offset': 'example',
    }
    
    try:
        result = getnotificationsforuser(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    9: `import requests
import json
from typing import Dict, Any


def markallgroupofnotificationsasviewedbodyisoptional(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/notifications"
    
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

    }
    
    try:
        result = markallgroupofnotificationsasviewedbodyisoptional(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    10: `import requests
import json
from typing import Dict, Any


def deleteallgroupofnotificationsbodyisoptional(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/notifications"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            'DELETE',
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
        result = deleteallgroupofnotificationsbodyisoptional(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    11: `import requests
import json
from typing import Dict, Any


def marknotificationasviewed(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/notifications/{id}"
    
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
        'id': 'example',
    }
    
    try:
        result = marknotificationasviewed(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    12: `import requests
import json
from typing import Dict, Any


def initsoperationtoturnotpononetimepasswordforcurrentuser(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/otp"
    
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
        result = initsoperationtoturnotpononetimepasswordforcurrentuser(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    13: `import requests
import json
from typing import Dict, Any


def initsoperationtoturnotpoffonetimepassword2faforcurrentuserbyusingemailandotp(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/otp"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            'DELETE',
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
        'email': 'example',
    }
    
    try:
        result = initsoperationtoturnotpoffonetimepassword2faforcurrentuserbyusingemailandotp(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    14: `import requests
import json
from typing import Dict, Any


def initsoperationtochangecurrentuserpasswordoperationisvalidonlyforregularandfirebaseaccountsitsnoneedtosetoldnewpasswordforfirebaseaccount(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/password"
    
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

    }
    
    try:
        result = initsoperationtochangecurrentuserpasswordoperationisvalidonlyforregularandfirebaseaccountsitsnoneedtosetoldnewpasswordforfirebaseaccount(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    15: `import requests
import json
from typing import Dict, Any


def finishesrestorationofcurrentuserpassword(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/password/restore"
    
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

    }
    
    try:
        result = finishesrestorationofcurrentuserpassword(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    16: `import requests
import json
from typing import Dict, Any


def initsrestorationofcurrentuserpassword(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/password/restore"
    
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
        result = initsrestorationofcurrentuserpassword(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    17: `import requests
import json
from typing import Dict, Any


def checkrestorationcode(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/password/restore/{code}"
    
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
        'code': 'example',
    }
    
    try:
        result = checkrestorationcode(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    18: `import requests
import json
from typing import Dict, Any


def getprofilereturnsinformationaboutcurrentuser(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/profile"
    
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
        result = getprofilereturnsinformationaboutcurrentuser(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    19: `import requests
import json
from typing import Dict, Any


def setprofilesetssomefieldsinprofileofcurrentuserallfieldsareoptional(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/profile"
    
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

    }
    
    try:
        result = setprofilesetssomefieldsinprofileofcurrentuserallfieldsareoptional(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    20: `import requests
import json
from typing import Dict, Any


def checkpossibilitytoremoveaccount(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/remove"
    
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
        result = checkpossibilitytoremoveaccount(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    21: `import requests
import json
from typing import Dict, Any


def initsoperationtoremoveaccountreasonmaximumlengthis200(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/remove"
    
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

    }
    
    try:
        result = initsoperationtoremoveaccountreasonmaximumlengthis200(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    22: `import requests
import json
from typing import Dict, Any


def confirmloginoperation(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/sign-in"
    
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

    }
    
    try:
        result = confirmloginoperation(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    23: `import requests
import json
from typing import Dict, Any


def loginsuserandreturnpairoftokensorloginoperationwithhints(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/sign-in"
    
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
        result = loginsuserandreturnpairoftokensorloginoperationwithhints(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    24: `import requests
import json
from typing import Dict, Any


def signinbyfirebaserequest(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/sign-in/firebase"
    
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
        result = signinbyfirebaserequest(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    25: `import requests
import json
from typing import Dict, Any


def signinbygoogleoauth2request(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/sign-in/google"
    
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
        result = signinbygoogleoauth2request(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    26: `import requests
import json
from typing import Dict, Any


def resendemailphonecodesforsigninprocess(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """Only one of flags should be set."""
    url = f"{base_url}/auth/sign-in/resend"
    
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

    }
    
    try:
        result = resendemailphonecodesforsigninprocess(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    27: `import requests
import json
from typing import Dict, Any


def logoutremoveusersessionsandmakesthetokeninvalid(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/auth/sign-out"
    
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
        result = logoutremoveusersessionsandmakesthetokeninvalid(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    28: `import requests
import json
from typing import Dict, Any


def registrationsaveuserindatabaseandsendverificationurltoemail(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/sign-up"
    
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
        result = registrationsaveuserindatabaseandsendverificationurltoemail(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    29: `import requests
import json
from typing import Dict, Any


def signupbygoogleoauth2request(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """No description available"""
    url = f"{base_url}/auth/sign-up/google"
    
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
        result = signupbygoogleoauth2request(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`,
    30: `import requests
import json
from typing import Dict, Any


def setprofilesetsprofileflagsofcurrentuser(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """! Need access token in bearer token authorization"""
    url = f"{base_url}/user/flags"
    
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

    }
    
    try:
        result = setprofilesetsprofileflagsofcurrentuser(
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
.response-example {
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.response-status {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.response-status.success {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  color: #0369a1;
  border-bottom: 1px solid #0369a1;
}

.response-status.success::before {
  content: "✅";
}

.response-status.error {
  background: linear-gradient(135deg, #fef2f2, #fecaca);
  color: #dc2626;
  border-bottom: 1px solid #dc2626;
}

.response-status.error::before {
  content: "❌";
}

.response-example .code-block {
  margin: 0;
  border-radius: 0;
  border: none;
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