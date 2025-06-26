<template>
  <!-- Fixed Authentication Header -->
  <div class="auth-header-fixed" :class="{ 'collapsed': isHeaderCollapsed }">
    <div class="auth-container">
      <div class="auth-title">
        <h4>🔐 API Authentication</h4>
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
              <span class="endpoint-path">/auth/register</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 User Registration</h3>
              <p class="endpoint-description">Register a new user account with email and password</p>
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
                  <span class="param-desc">User email address (must be valid email format)</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">password</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">User password (minimum 8 characters)</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">first_name</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">User first name</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">last_name</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">User last name</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">phone</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Phone number (optional)</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">referral_code</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Referral code (optional)</span>
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
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/register&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;email&quot;:&quot;example&quot;,&quot;password&quot;:&quot;example&quot;,&quot;first_name&quot;:&quot;example&quot;,&quot;last_name&quot;:&quot;example&quot;,&quot;phone&quot;:&quot;example&quot;,&quot;referral_code&quot;:&quot;example&quot;}&#x27;</pre>
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
                <label>Email</label>
                <input v-model="testData1.email" type="text" placeholder="example_email" class="test-input" />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input v-model="testData1.password" type="text" placeholder="example_password" class="test-input" />
              </div>
              <div class="form-group">
                <label>First_name</label>
                <input v-model="testData1.first_name" type="text" placeholder="example_first_name" class="test-input" />
              </div>
              <div class="form-group">
                <label>Last_name</label>
                <input v-model="testData1.last_name" type="text" placeholder="example_last_name" class="test-input" />
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input v-model="testData1.phone" type="text" placeholder="example_phone" class="test-input" />
              </div>
              <div class="form-group">
                <label>Referral_code</label>
                <input v-model="testData1.referral_code" type="text" placeholder="example_referral_code" class="test-input" />
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
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/login</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 User Login</h3>
              <p class="endpoint-description">Authenticate user with email and password, returns JWT tokens</p>
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
                  <span class="param-desc">User email address</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">password</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">User password</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">remember_me</code>
                  <span class="param-type">boolean</span>
                  <span class="param-desc">Keep user logged in for extended period</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">device_name</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Device name for tracking</span>
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
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/login&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;email&quot;:&quot;example&quot;,&quot;password&quot;:&quot;example&quot;,&quot;remember_me&quot;:&quot;example&quot;,&quot;device_name&quot;:&quot;example&quot;}&#x27;</pre>
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
              <div class="form-group">
                <label>Email</label>
                <input v-model="testData2.email" type="text" placeholder="example_email" class="test-input" />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input v-model="testData2.password" type="text" placeholder="example_password" class="test-input" />
              </div>
              <div class="form-group">
                <label>Remember_me</label>
                <select v-model="testData2.remember_me" class="test-input">
                  <option :value="true">True</option>
                  <option :value="false">False</option>
                </select>
              </div>
              <div class="form-group">
                <label>Device_name</label>
                <input v-model="testData2.device_name" type="text" placeholder="example_device_name" class="test-input" />
              </div>
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
              <span class="endpoint-path">/auth/logout</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 User Logout</h3>
              <p class="endpoint-description">Logout user and invalidate current session tokens</p>
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
                  <code class="param-name">logout_all_devices</code>
                  <span class="param-type">boolean</span>
                  <span class="param-desc">Logout from all devices (default: false)</span>
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
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/logout&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;logout_all_devices&quot;:&quot;example&quot;}&#x27;</pre>
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
                <label>Logout_all_devices</label>
                <select v-model="testData3.logout_all_devices" class="test-input">
                  <option :value="true">True</option>
                  <option :value="false">False</option>
                </select>
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
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/refresh</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Refresh Access Token</h3>
              <p class="endpoint-description">Refresh expired access token using refresh token</p>
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
                  <code class="param-name">refresh_token</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Valid refresh token</span>
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
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/refresh&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;refresh_token&quot;:&quot;example&quot;}&#x27;</pre>
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
                <label>Refresh_token</label>
                <input v-model="testData4.refresh_token" type="text" placeholder="example_refresh_token" class="test-input" />
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
              <span class="endpoint-path">/auth/forgot-password</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Forgot Password</h3>
              <p class="endpoint-description">Request password reset email for user account</p>
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
                  <span class="param-desc">Email address to send reset link to</span>
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
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/forgot-password&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;email&quot;:&quot;example&quot;}&#x27;</pre>
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
              <div class="form-group">
                <label>Email</label>
                <input v-model="testData5.email" type="text" placeholder="example_email" class="test-input" />
              </div>
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
              <span class="endpoint-path">/auth/reset-password</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Reset Password</h3>
              <p class="endpoint-description">Reset user password using reset token from email</p>
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
                  <code class="param-name">token</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Password reset token from email</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">password</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">New password (minimum 8 characters)</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">password_confirmation</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Confirm new password</span>
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
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/reset-password&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;token&quot;:&quot;example&quot;,&quot;password&quot;:&quot;example&quot;,&quot;password_confirmation&quot;:&quot;example&quot;}&#x27;</pre>
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
              <div class="form-group">
                <label>Token</label>
                <input v-model="testData6.token" type="text" placeholder="example_token" class="test-input" />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input v-model="testData6.password" type="text" placeholder="example_password" class="test-input" />
              </div>
              <div class="form-group">
                <label>Password_confirmation</label>
                <input v-model="testData6.password_confirmation" type="text" placeholder="example_password_confirmation" class="test-input" />
              </div>
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
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/auth/verify-email</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Verify Email</h3>
              <p class="endpoint-description">Verify user email address using verification token</p>
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
                  <code class="param-name">token</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Email verification token</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">email</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Email address to verify</span>
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
                    <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/verify-email&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{&quot;token&quot;:&quot;example&quot;,&quot;email&quot;:&quot;example&quot;}&#x27;</pre>
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
                <label>Token</label>
                <input v-model="testData7.token" type="text" placeholder="example_token" class="test-input" />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input v-model="testData7.email" type="text" placeholder="example_email" class="test-input" />
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

      <section id="endpoint-8" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/auth/me</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Get Current User</h3>
              <p class="endpoint-description">Get current authenticated user information</p>
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
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab8 = lang"
                    :class="['code-tab', { active: activeCodeTab8 === lang }]">
                    {{ lang }}
                  </button>
                </div>
                
                <div v-show="activeCodeTab8 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 8)" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X GET &quot;https://develop.okd.finance/api/auth/me&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \
  -d &#x27;{}&#x27;</pre>
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

const testData1 = reactive({ email: 'example_email', password: 'example_password', first_name: 'example_first_name', last_name: 'example_last_name', phone: 'example_phone', referral_code: 'example_referral_code' })
const testData2 = reactive({ email: 'example_email', password: 'example_password', remember_me: true, device_name: 'example_device_name' })
const testData3 = reactive({ logout_all_devices: true })
const testData4 = reactive({ refresh_token: 'example_refresh_token' })
const testData5 = reactive({ email: 'example_email' })
const testData6 = reactive({ token: 'example_token', password: 'example_password', password_confirmation: 'example_password_confirmation' })
const testData7 = reactive({ token: 'example_token', email: 'example_email' })
const testData8 = reactive({  })



const results = reactive({
  endpoint1: null,
  endpoint2: null,
  endpoint3: null,
  endpoint4: null,
  endpoint5: null,
  endpoint6: null,
  endpoint7: null,
  endpoint8: null
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
      email: testData1.email,
      password: testData1.password,
      first_name: testData1.first_name,
      last_name: testData1.last_name,
      phone: testData1.phone,
      referral_code: testData1.referral_code
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/register`
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
      email: testData2.email,
      password: testData2.password,
      remember_me: testData2.remember_me,
      device_name: testData2.device_name
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/login`
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
      logout_all_devices: testData3.logout_all_devices
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/logout`
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
      refresh_token: testData4.refresh_token
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/refresh`
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
    results.endpoint4 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
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
      email: testData5.email
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/forgot-password`
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
      token: testData6.token,
      password: testData6.password,
      password_confirmation: testData6.password_confirmation
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/reset-password`
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
      token: testData7.token,
      email: testData7.email
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/verify-email`
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
    results.endpoint7 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
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
      
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/me`
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
    1: `curl -X POST "https://develop.okd.finance/api/auth/register" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"email":"example","password":"example","first_name":"example","last_name":"example","phone":"example","referral_code":"example"}'`,
    2: `curl -X POST "https://develop.okd.finance/api/auth/login" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"email":"example","password":"example","remember_me":"example","device_name":"example"}'`,
    3: `curl -X POST "https://develop.okd.finance/api/auth/logout" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"logout_all_devices":"example"}'`,
    4: `curl -X POST "https://develop.okd.finance/api/auth/refresh" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"refresh_token":"example"}'`,
    5: `curl -X POST "https://develop.okd.finance/api/auth/forgot-password" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"email":"example"}'`,
    6: `curl -X POST "https://develop.okd.finance/api/auth/reset-password" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"token":"example","password":"example","password_confirmation":"example"}'`,
    7: `curl -X POST "https://develop.okd.finance/api/auth/verify-email" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{"token":"example","email":"example"}'`,
    8: `curl -X GET "https://develop.okd.finance/api/auth/me" \\
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

type UserRegistrationRequest struct {
    Email string \`json:"email"\`\n    Password string \`json:"password"\`\n    First_name string \`json:"first_name"\`\n    Last_name string \`json:"last_name"\`\n    Phone string \`json:"phone"\`\n    Referral_code string \`json:"referral_code"\`
}

func userregistration() error {
    url := "https://develop.okd.finance/api/auth/register"
    
    requestData := UserRegistrationRequest{
        Email: "example",\n        Password: "example",\n        First_name: "example",\n        Last_name: "example",\n        Phone: "example",\n        Referral_code: "example",
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
    if err := userregistration(); err != nil {
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

type UserLoginRequest struct {
    Email string \`json:"email"\`\n    Password string \`json:"password"\`\n    Remember_me string \`json:"remember_me"\`\n    Device_name string \`json:"device_name"\`
}

func userlogin() error {
    url := "https://develop.okd.finance/api/auth/login"
    
    requestData := UserLoginRequest{
        Email: "example",\n        Password: "example",\n        Remember_me: "example",\n        Device_name: "example",
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
    if err := userlogin(); err != nil {
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

type UserLogoutRequest struct {
    Logout_all_devices string \`json:"logout_all_devices"\`
}

func userlogout() error {
    url := "https://develop.okd.finance/api/auth/logout"
    
    requestData := UserLogoutRequest{
        Logout_all_devices: "example",
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
    if err := userlogout(); err != nil {
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

type RefreshAccessTokenRequest struct {
    Refresh_token string \`json:"refresh_token"\`
}

func refreshaccesstoken() error {
    url := "https://develop.okd.finance/api/auth/refresh"
    
    requestData := RefreshAccessTokenRequest{
        Refresh_token: "example",
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
    if err := refreshaccesstoken(); err != nil {
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

type ForgotPasswordRequest struct {
    Email string \`json:"email"\`
}

func forgotpassword() error {
    url := "https://develop.okd.finance/api/auth/forgot-password"
    
    requestData := ForgotPasswordRequest{
        Email: "example",
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
    if err := forgotpassword(); err != nil {
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

type ResetPasswordRequest struct {
    Token string \`json:"token"\`\n    Password string \`json:"password"\`\n    Password_confirmation string \`json:"password_confirmation"\`
}

func resetpassword() error {
    url := "https://develop.okd.finance/api/auth/reset-password"
    
    requestData := ResetPasswordRequest{
        Token: "example",\n        Password: "example",\n        Password_confirmation: "example",
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
    if err := resetpassword(); err != nil {
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

type VerifyEmailRequest struct {
    Token string \`json:"token"\`\n    Email string \`json:"email"\`
}

func verifyemail() error {
    url := "https://develop.okd.finance/api/auth/verify-email"
    
    requestData := VerifyEmailRequest{
        Token: "example",\n        Email: "example",
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
    if err := verifyemail(); err != nil {
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

type GetCurrentUserRequest struct {

}

func getcurrentuser() error {
    url := "https://develop.okd.finance/api/auth/me"
    
    requestData := GetCurrentUserRequest{

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
    if err := getcurrentuser(); err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}`
  },
  typescript: {
    1: `interface UserRegistrationRequest {
  email: string;\n  password: string;\n  first_name: string;\n  last_name: string;\n  phone: string;\n  referral_code: string;
}

async function userregistration(
  baseUrl: string,
  accessToken: string,
  data: UserRegistrationRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/register\`, {
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
    const result = await userregistration(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        email: "example",\n        password: "example",\n        first_name: "example",\n        last_name: "example",\n        phone: "example",\n        referral_code: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    2: `interface UserLoginRequest {
  email: string;\n  password: string;\n  remember_me: boolean;\n  device_name: string;
}

async function userlogin(
  baseUrl: string,
  accessToken: string,
  data: UserLoginRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/login\`, {
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
    const result = await userlogin(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        email: "example",\n        password: "example",\n        remember_me: true,\n        device_name: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    3: `interface UserLogoutRequest {
  logout_all_devices: boolean;
}

async function userlogout(
  baseUrl: string,
  accessToken: string,
  data: UserLogoutRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/logout\`, {
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
    const result = await userlogout(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        logout_all_devices: true,
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    4: `interface RefreshAccessTokenRequest {
  refresh_token: string;
}

async function refreshaccesstoken(
  baseUrl: string,
  accessToken: string,
  data: RefreshAccessTokenRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/refresh\`, {
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
    const result = await refreshaccesstoken(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        refresh_token: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    5: `interface ForgotPasswordRequest {
  email: string;
}

async function forgotpassword(
  baseUrl: string,
  accessToken: string,
  data: ForgotPasswordRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/forgot-password\`, {
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
    const result = await forgotpassword(
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
    6: `interface ResetPasswordRequest {
  token: string;\n  password: string;\n  password_confirmation: string;
}

async function resetpassword(
  baseUrl: string,
  accessToken: string,
  data: ResetPasswordRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/reset-password\`, {
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
    const result = await resetpassword(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        token: "example",\n        password: "example",\n        password_confirmation: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    7: `interface VerifyEmailRequest {
  token: string;\n  email: string;
}

async function verifyemail(
  baseUrl: string,
  accessToken: string,
  data: VerifyEmailRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/verify-email\`, {
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
    const result = await verifyemail(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
        token: "example",\n        email: "example",
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,
    8: `interface GetCurrentUserRequest {

}

async function getcurrentuser(
  baseUrl: string,
  accessToken: string,
  data: GetCurrentUserRequest
): Promise<any> {
  const response = await fetch(\`\${baseUrl}/auth/me\`, {
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
    const result = await getcurrentuser(
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

function userregistration($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/register';
    
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
        'email' => 'example',\n        'password' => 'example',\n        'first_name' => 'example',\n        'last_name' => 'example',\n        'phone' => 'example',\n        'referral_code' => 'example',
    ];

    $result = userregistration(
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

function userlogin($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/login';
    
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
        'email' => 'example',\n        'password' => 'example',\n        'remember_me' => true,\n        'device_name' => 'example',
    ];

    $result = userlogin(
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

function userlogout($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/logout';
    
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
        'logout_all_devices' => true,
    ];

    $result = userlogout(
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

function refreshaccesstoken($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/refresh';
    
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
        'refresh_token' => 'example',
    ];

    $result = refreshaccesstoken(
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

function forgotpassword($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/forgot-password';
    
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
        'email' => 'example',
    ];

    $result = forgotpassword(
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

function resetpassword($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/reset-password';
    
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
        'token' => 'example',\n        'password' => 'example',\n        'password_confirmation' => 'example',
    ];

    $result = resetpassword(
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

function verifyemail($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/verify-email';
    
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
        'token' => 'example',\n        'email' => 'example',
    ];

    $result = verifyemail(
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

function getcurrentuser($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '/auth/me';
    
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

    $result = getcurrentuser(
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


def userregistration(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """Register a new user account with email and password"""
    url = f"{base_url}/auth/register"
    
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
        'email': 'example',\n        'password': 'example',\n        'first_name': 'example',\n        'last_name': 'example',\n        'phone': 'example',\n        'referral_code': 'example',
    }
    
    try:
        result = userregistration(
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


def userlogin(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """Authenticate user with email and password, returns JWT tokens"""
    url = f"{base_url}/auth/login"
    
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
        'email': 'example',\n        'password': 'example',\n        'remember_me': True,\n        'device_name': 'example',
    }
    
    try:
        result = userlogin(
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


def userlogout(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """Logout user and invalidate current session tokens"""
    url = f"{base_url}/auth/logout"
    
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
        'logout_all_devices': True,
    }
    
    try:
        result = userlogout(
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


def refreshaccesstoken(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """Refresh expired access token using refresh token"""
    url = f"{base_url}/auth/refresh"
    
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
        'refresh_token': 'example',
    }
    
    try:
        result = refreshaccesstoken(
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


def forgotpassword(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """Request password reset email for user account"""
    url = f"{base_url}/auth/forgot-password"
    
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
        'email': 'example',
    }
    
    try:
        result = forgotpassword(
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


def resetpassword(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """Reset user password using reset token from email"""
    url = f"{base_url}/auth/reset-password"
    
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
        'token': 'example',\n        'password': 'example',\n        'password_confirmation': 'example',
    }
    
    try:
        result = resetpassword(
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


def verifyemail(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """Verify user email address using verification token"""
    url = f"{base_url}/auth/verify-email"
    
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
        'token': 'example',\n        'email': 'example',
    }
    
    try:
        result = verifyemail(
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


def getcurrentuser(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """Get current authenticated user information"""
    url = f"{base_url}/auth/me"
    
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
        result = getcurrentuser(
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
  grid-template-columns: 1fr 1fr 1fr;
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