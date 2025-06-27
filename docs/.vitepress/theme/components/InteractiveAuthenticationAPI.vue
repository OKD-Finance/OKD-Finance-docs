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
            <button @click="generateRandomFingerprint" class="generate-btn" title="Generate random fingerprint">
              🎲
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
      <!-- Endpoint 1: POST /auth/check/firebase -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/check/firebase</span>
          <h3>Check account existence by firebase token.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData1.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData1.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData1.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData1.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint1" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading1" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response1" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response1 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab1 = lang"
                :class="['code-tab', { active: activeCodeTab1 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab1 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample1(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample1(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 2: POST /auth/confirm -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/confirm</span>
          <h3>Send confirmation code to email.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData2.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData2.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData2.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData2.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint2" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading2" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response2" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response2 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab2 = lang"
                :class="['code-tab', { active: activeCodeTab2 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab2 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample2(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample2(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 3: POST /auth/fcm -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/fcm</span>
          <h3>Inits operation to create user fcm.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData3.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData3.Body" 
                type="text" 
                placeholder="user device id, platform and fcm"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint3" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading3" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response3" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response3 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab3 = lang"
                :class="['code-tab', { active: activeCodeTab3 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab3 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample3(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample3(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 4: DELETE /auth/fcm -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-delete">DELETE</span>
          <span class="endpoint-path">/auth/fcm</span>
          <h3>Inits operation to delete user fcm by device id and fcm.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData4.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData4.Body" 
                type="text" 
                placeholder="user device id, platform and fcm"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint4" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading4" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response4" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response4 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab4 = lang"
                :class="['code-tab', { active: activeCodeTab4 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab4 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample4(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample4(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 5: GET /auth/google -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-get">GET</span>
          <span class="endpoint-path">/auth/google</span>
          <h3>Get Google link for lgoin/register.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData5.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData5.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData5.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint5" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading5" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response5" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response5 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab5 = lang"
                :class="['code-tab', { active: activeCodeTab5 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab5 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample5(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample5(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 6: POST /auth/jwt/refresh -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/jwt/refresh</span>
          <h3>Regenerate a pair of authenticate tokens if refresh token is valid</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need refresh token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData6.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint6" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading6" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response6" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response6 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab6 = lang"
                :class="['code-tab', { active: activeCodeTab6 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab6 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample6(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample6(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 7: PUT /auth/locale -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/auth/locale</span>
          <h3>Inits operation to change current user locale.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData7.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData7.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint7" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading7" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response7" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response7 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab7 = lang"
                :class="['code-tab', { active: activeCodeTab7 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab7 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample7(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample7(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 8: GET /auth/notifications -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-get">GET</span>
          <span class="endpoint-path">/auth/notifications</span>
          <h3>Get notifications for user</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData8.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">group_id (query)</label>
              <input v-model="testData8.group_id" 
                type="text" 
                placeholder="Group of notifications. Omitted or 0 mean all.
"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">hide_read (query)</label>
              <input v-model="testData8.hide_read" 
                type="text" 
                placeholder="Hide read notifications. Bool value: true or false.
"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">limit (query)</label>
              <input v-model="testData8.limit" 
                type="text" 
                placeholder="Limit of records in request
"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">offset (query)</label>
              <input v-model="testData8.offset" 
                type="text" 
                placeholder="Offset of records in request
"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint8" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading8" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response8" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response8 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab8 = lang"
                :class="['code-tab', { active: activeCodeTab8 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab8 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample8(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample8(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 9: PUT /auth/notifications -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/auth/notifications</span>
          <h3>Mark all/group of notifications as viewed. Body is optional.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData9.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData9.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint9" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading9" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response9" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response9 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab9 = lang"
                :class="['code-tab', { active: activeCodeTab9 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab9 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample9(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample9(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 10: DELETE /auth/notifications -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-delete">DELETE</span>
          <span class="endpoint-path">/auth/notifications</span>
          <h3>Delete all/group of notifications. Body is optional.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData10.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData10.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint10" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading10" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response10" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response10 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab10 = lang"
                :class="['code-tab', { active: activeCodeTab10 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab10 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample10(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample10(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 11: PUT /auth/notifications/{id} -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/auth/notifications/{id}</span>
          <h3>Mark notification as viewed.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData11.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">id (path)</label>
              <input v-model="testData11.id" 
                type="text" 
                placeholder="ID of notifications.
"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint11" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading11" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response11" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response11 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab11 = lang"
                :class="['code-tab', { active: activeCodeTab11 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab11 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample11(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample11(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 12: POST /auth/otp -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/otp</span>
          <h3>Inits operation to turn OTP on (one time password) for current user.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData12.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint12" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading12" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response12" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response12 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab12 = lang"
                :class="['code-tab', { active: activeCodeTab12 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab12 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample12(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample12(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 13: DELETE /auth/otp -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-delete">DELETE</span>
          <span class="endpoint-path">/auth/otp</span>
          <h3>Inits operation to turn OTP off (one time password 2FA) for current user by using email and OTP.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData13.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">email (query)</label>
              <input v-model="testData13.email" 
                type="text" 
                placeholder="Flag indicates to use only email to turn off 2FA
"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint13" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading13" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response13" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response13 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab13 = lang"
                :class="['code-tab', { active: activeCodeTab13 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab13 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample13(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample13(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 14: PUT /auth/password -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/auth/password</span>
          <h3>Inits operation to change current user password.
Operation is valid only for regular and firebase accounts.
It's no need to set old/new password for firebase account.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData14.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData14.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint14" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading14" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response14" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response14 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab14 = lang"
                :class="['code-tab', { active: activeCodeTab14 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab14 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample14(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample14(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 15: PUT /auth/password/restore -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/auth/password/restore</span>
          <h3>Finishes restoration of current user password.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData15.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData15.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData15.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData15.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint15" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading15" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response15" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response15 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab15 = lang"
                :class="['code-tab', { active: activeCodeTab15 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab15 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample15(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample15(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 16: POST /auth/password/restore -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/password/restore</span>
          <h3>Inits restoration of current user password.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData16.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData16.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData16.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData16.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint16" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading16" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response16" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response16 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab16 = lang"
                :class="['code-tab', { active: activeCodeTab16 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab16 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample16(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample16(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 17: GET /auth/password/restore/{code} -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-get">GET</span>
          <span class="endpoint-path">/auth/password/restore/{code}</span>
          <h3>Check restoration code.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData17.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData17.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData17.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">code (path)</label>
              <input v-model="testData17.code" 
                type="text" 
                placeholder="code from email"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint17" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading17" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response17" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response17 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab17 = lang"
                :class="['code-tab', { active: activeCodeTab17 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab17 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample17(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample17(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 18: GET /auth/profile -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-get">GET</span>
          <span class="endpoint-path">/auth/profile</span>
          <h3>GetProfile returns information about current user.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData18.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint18" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading18" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response18" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response18 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab18 = lang"
                :class="['code-tab', { active: activeCodeTab18 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab18 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample18(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample18(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 19: PUT /auth/profile -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/auth/profile</span>
          <h3>SetProfile sets some fields in profile of current user. All fields are optional.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData19.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData19.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint19" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading19" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response19" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response19 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab19 = lang"
                :class="['code-tab', { active: activeCodeTab19 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab19 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample19(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample19(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 20: GET /auth/remove -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-get">GET</span>
          <span class="endpoint-path">/auth/remove</span>
          <h3>Check possibility to remove account.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData20.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint20" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading20" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response20" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response20 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab20 = lang"
                :class="['code-tab', { active: activeCodeTab20 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab20 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample20(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample20(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 21: PUT /auth/remove -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/auth/remove</span>
          <h3>Inits operation to remove account. Reason maximum length is 200.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData21.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData21.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint21" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading21" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response21" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response21 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab21 = lang"
                :class="['code-tab', { active: activeCodeTab21 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab21 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample21(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample21(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 22: PUT /auth/sign-in -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/auth/sign-in</span>
          <h3>Confirm login operation.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData22.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData22.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData22.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData22.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint22" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading22" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response22" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response22 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab22 = lang"
                :class="['code-tab', { active: activeCodeTab22 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab22 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample22(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample22(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 23: POST /auth/sign-in -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/sign-in</span>
          <h3>Logins user and return pair of tokens or login operation with hints.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData23.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData23.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData23.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData23.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint23" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading23" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response23" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response23 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab23 = lang"
                :class="['code-tab', { active: activeCodeTab23 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab23 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample23(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample23(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 24: POST /auth/sign-in/firebase -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/sign-in/firebase</span>
          <h3>Sign in by firebase request.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData24.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData24.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData24.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData24.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint24" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading24" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response24" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response24 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab24 = lang"
                :class="['code-tab', { active: activeCodeTab24 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab24 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample24(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample24(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 25: POST /auth/sign-in/google -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/sign-in/google</span>
          <h3>Sign in by Google OAuth2 request.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData25.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData25.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData25.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData25.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint25" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading25" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response25" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response25 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab25 = lang"
                :class="['code-tab', { active: activeCodeTab25 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab25 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample25(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample25(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 26: PUT /auth/sign-in/resend -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/auth/sign-in/resend</span>
          <h3>Resend email/phone codes for sign-in process.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>Only one of flags should be set.</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData26.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData26.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData26.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData26.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint26" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading26" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response26" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response26 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab26 = lang"
                :class="['code-tab', { active: activeCodeTab26 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab26 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample26(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample26(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 27: POST /auth/sign-out -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/sign-out</span>
          <h3>Logout remove user sessions and makes the token invalid.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData27.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint27" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading27" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response27" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response27 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab27 = lang"
                :class="['code-tab', { active: activeCodeTab27 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab27 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample27(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample27(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 28: POST /auth/sign-up -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/sign-up</span>
          <h3>Registration save user in database and send verification url to email.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData28.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData28.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData28.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData28.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint28" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading28" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response28" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response28 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab28 = lang"
                :class="['code-tab', { active: activeCodeTab28 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab28 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample28(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample28(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 29: POST /auth/sign-up/google -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-post">POST</span>
          <span class="endpoint-path">/auth/sign-up/google</span>
          <h3>Sign up by Google OAuth2 request.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>No description available</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData29.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-RECAPTCHA * (header)</label>
              <input v-model="testData29.X-RECAPTCHA" 
                type="text" 
                placeholder="RECAPTCHA token"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">X-PLATFORM-ID * (header)</label>
              <input v-model="testData29.X-PLATFORM-ID" 
                type="text" 
                placeholder="recaptcha platform id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData29.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint29" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading29" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response29" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response29 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab29 = lang"
                :class="['code-tab', { active: activeCodeTab29 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab29 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample29(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample29(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 30: PUT /user/flags -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/user/flags</span>
          <h3>SetProfile sets profile flags of current user.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData30.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData30.Body" 
                type="text" 
                placeholder="profile flag. Can be *futures_order_confirmation* , *futures_visited*, *first_order_after_one_click_trading*"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint30" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading30" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response30" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response30 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab30 = lang"
                :class="['code-tab', { active: activeCodeTab30 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab30 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample30(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample30(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  isReadyToSendRequest,
  generateRandomFingerprint
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

const testData1 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "Body": ""
})
const loading1 = ref(false)
const response1 = ref(null)
const testData2 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "Body": ""
})
const loading2 = ref(false)
const response2 = ref(null)
const testData3 = reactive({
  "Fingerprint": "",
  "Body": ""
})
const loading3 = ref(false)
const response3 = ref(null)
const testData4 = reactive({
  "Fingerprint": "",
  "Body": ""
})
const loading4 = ref(false)
const response4 = ref(null)
const testData5 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": ""
})
const loading5 = ref(false)
const response5 = ref(null)
const testData6 = reactive({
  "Fingerprint": ""
})
const loading6 = ref(false)
const response6 = ref(null)
const testData7 = reactive({
  "Fingerprint": "",
  "Body": ""
})
const loading7 = ref(false)
const response7 = ref(null)
const testData8 = reactive({
  "Fingerprint": "",
  "group_id": "",
  "hide_read": "",
  "limit": "",
  "offset": ""
})
const loading8 = ref(false)
const response8 = ref(null)
const testData9 = reactive({
  "Fingerprint": "",
  "Body": ""
})
const loading9 = ref(false)
const response9 = ref(null)
const testData10 = reactive({
  "Fingerprint": "",
  "Body": ""
})
const loading10 = ref(false)
const response10 = ref(null)
const testData11 = reactive({
  "Fingerprint": "",
  "id": ""
})
const loading11 = ref(false)
const response11 = ref(null)
const testData12 = reactive({
  "Fingerprint": ""
})
const loading12 = ref(false)
const response12 = ref(null)
const testData13 = reactive({
  "Fingerprint": "",
  "email": ""
})
const loading13 = ref(false)
const response13 = ref(null)
const testData14 = reactive({
  "Fingerprint": "",
  "Body": ""
})
const loading14 = ref(false)
const response14 = ref(null)
const testData15 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "Body": ""
})
const loading15 = ref(false)
const response15 = ref(null)
const testData16 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "Body": ""
})
const loading16 = ref(false)
const response16 = ref(null)
const testData17 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "code": ""
})
const loading17 = ref(false)
const response17 = ref(null)
const testData18 = reactive({
  "Fingerprint": ""
})
const loading18 = ref(false)
const response18 = ref(null)
const testData19 = reactive({
  "Fingerprint": "",
  "Body": ""
})
const loading19 = ref(false)
const response19 = ref(null)
const testData20 = reactive({
  "Fingerprint": ""
})
const loading20 = ref(false)
const response20 = ref(null)
const testData21 = reactive({
  "Fingerprint": "",
  "Body": ""
})
const loading21 = ref(false)
const response21 = ref(null)
const testData22 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "Body": ""
})
const loading22 = ref(false)
const response22 = ref(null)
const testData23 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "Body": ""
})
const loading23 = ref(false)
const response23 = ref(null)
const testData24 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "Body": ""
})
const loading24 = ref(false)
const response24 = ref(null)
const testData25 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "Body": ""
})
const loading25 = ref(false)
const response25 = ref(null)
const testData26 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "Body": ""
})
const loading26 = ref(false)
const response26 = ref(null)
const testData27 = reactive({
  "Fingerprint": ""
})
const loading27 = ref(false)
const response27 = ref(null)
const testData28 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "Body": ""
})
const loading28 = ref(false)
const response28 = ref(null)
const testData29 = reactive({
  "Fingerprint": "",
  "X-RECAPTCHA": "",
  "X-PLATFORM-ID": "",
  "Body": ""
})
const loading29 = ref(false)
const response29 = ref(null)
const testData30 = reactive({
  "Fingerprint": "",
  "Body": ""
})
const loading30 = ref(false)
const response30 = ref(null)

const testEndpoint1 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading1.value = true
  response1.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/check/firebase'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response1.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response1.value = 'Error: ' + error.message
  } finally {
    loading1.value = false
  }
}

const testEndpoint2 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading2.value = true
  response2.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/confirm'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response2.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response2.value = 'Error: ' + error.message
  } finally {
    loading2.value = false
  }
}

const testEndpoint3 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading3.value = true
  response3.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/fcm'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response3.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response3.value = 'Error: ' + error.message
  } finally {
    loading3.value = false
  }
}

const testEndpoint4 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading4.value = true
  response4.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/fcm'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response4.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response4.value = 'Error: ' + error.message
  } finally {
    loading4.value = false
  }
}

const testEndpoint5 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading5.value = true
  response5.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/google'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response5.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response5.value = 'Error: ' + error.message
  } finally {
    loading5.value = false
  }
}

const testEndpoint6 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading6.value = true
  response6.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/jwt/refresh'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response6.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response6.value = 'Error: ' + error.message
  } finally {
    loading6.value = false
  }
}

const testEndpoint7 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading7.value = true
  response7.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/locale'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response7.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response7.value = 'Error: ' + error.message
  } finally {
    loading7.value = false
  }
}

const testEndpoint8 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading8.value = true
  response8.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/notifications'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    if (testData8.group_id) queryParams.append('group_id', testData8.group_id)
    if (testData8.hide_read) queryParams.append('hide_read', testData8.hide_read)
    if (testData8.limit) queryParams.append('limit', testData8.limit)
    if (testData8.offset) queryParams.append('offset', testData8.offset)
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response8.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response8.value = 'Error: ' + error.message
  } finally {
    loading8.value = false
  }
}

const testEndpoint9 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading9.value = true
  response9.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/notifications'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response9.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response9.value = 'Error: ' + error.message
  } finally {
    loading9.value = false
  }
}

const testEndpoint10 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading10.value = true
  response10.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/notifications'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response10.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response10.value = 'Error: ' + error.message
  } finally {
    loading10.value = false
  }
}

const testEndpoint11 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading11.value = true
  response11.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/notifications/{id}'
    
    // Replace path parameters
    url = url.replace('{id}', testData11.id || 'example')
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response11.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response11.value = 'Error: ' + error.message
  } finally {
    loading11.value = false
  }
}

const testEndpoint12 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading12.value = true
  response12.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/otp'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response12.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response12.value = 'Error: ' + error.message
  } finally {
    loading12.value = false
  }
}

const testEndpoint13 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading13.value = true
  response13.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/otp'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    if (testData13.email) queryParams.append('email', testData13.email)
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response13.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response13.value = 'Error: ' + error.message
  } finally {
    loading13.value = false
  }
}

const testEndpoint14 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading14.value = true
  response14.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/password'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response14.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response14.value = 'Error: ' + error.message
  } finally {
    loading14.value = false
  }
}

const testEndpoint15 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading15.value = true
  response15.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/password/restore'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response15.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response15.value = 'Error: ' + error.message
  } finally {
    loading15.value = false
  }
}

const testEndpoint16 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading16.value = true
  response16.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/password/restore'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response16.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response16.value = 'Error: ' + error.message
  } finally {
    loading16.value = false
  }
}

const testEndpoint17 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading17.value = true
  response17.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/password/restore/{code}'
    
    // Replace path parameters
    url = url.replace('{code}', testData17.code || 'example')
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response17.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response17.value = 'Error: ' + error.message
  } finally {
    loading17.value = false
  }
}

const testEndpoint18 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading18.value = true
  response18.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/profile'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response18.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response18.value = 'Error: ' + error.message
  } finally {
    loading18.value = false
  }
}

const testEndpoint19 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading19.value = true
  response19.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/profile'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response19.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response19.value = 'Error: ' + error.message
  } finally {
    loading19.value = false
  }
}

const testEndpoint20 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading20.value = true
  response20.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/remove'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response20.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response20.value = 'Error: ' + error.message
  } finally {
    loading20.value = false
  }
}

const testEndpoint21 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading21.value = true
  response21.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/remove'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response21.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response21.value = 'Error: ' + error.message
  } finally {
    loading21.value = false
  }
}

const testEndpoint22 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading22.value = true
  response22.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/sign-in'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response22.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response22.value = 'Error: ' + error.message
  } finally {
    loading22.value = false
  }
}

const testEndpoint23 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading23.value = true
  response23.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/sign-in'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response23.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response23.value = 'Error: ' + error.message
  } finally {
    loading23.value = false
  }
}

const testEndpoint24 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading24.value = true
  response24.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/sign-in/firebase'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response24.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response24.value = 'Error: ' + error.message
  } finally {
    loading24.value = false
  }
}

const testEndpoint25 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading25.value = true
  response25.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/sign-in/google'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response25.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response25.value = 'Error: ' + error.message
  } finally {
    loading25.value = false
  }
}

const testEndpoint26 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading26.value = true
  response26.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/sign-in/resend'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response26.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response26.value = 'Error: ' + error.message
  } finally {
    loading26.value = false
  }
}

const testEndpoint27 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading27.value = true
  response27.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/sign-out'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response27.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response27.value = 'Error: ' + error.message
  } finally {
    loading27.value = false
  }
}

const testEndpoint28 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading28.value = true
  response28.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/sign-up'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response28.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response28.value = 'Error: ' + error.message
  } finally {
    loading28.value = false
  }
}

const testEndpoint29 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading29.value = true
  response29.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/auth/sign-up/google'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response29.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response29.value = 'Error: ' + error.message
  } finally {
    loading29.value = false
  }
}

const testEndpoint30 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading30.value = true
  response30.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/user/flags'
    
    // Replace path parameters
    
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response30.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response30.value = 'Error: ' + error.message
  } finally {
    loading30.value = false
  }
}

const getCodeExample1 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/check/firebase'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample2 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/confirm'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample3 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/fcm'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample4 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/fcm'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X DELETE "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("DELETE", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'DELETE',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.delete(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample5 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/google'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X GET "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample6 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/jwt/refresh'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample7 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/locale'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample8 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/notifications'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X GET "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample9 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/notifications'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample10 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/notifications'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X DELETE "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("DELETE", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'DELETE',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.delete(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample11 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/notifications/{id}'
  
  // Replace path parameters with example values
  url = url.replace('{id}', testData11.id || 'example')
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample12 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/otp'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample13 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/otp'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X DELETE "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("DELETE", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'DELETE',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.delete(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample14 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/password'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample15 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/password/restore'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample16 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/password/restore'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample17 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/password/restore/{code}'
  
  // Replace path parameters with example values
  url = url.replace('{code}', testData17.code || 'example')
  
  switch (lang) {
    case 'cURL':
      return `curl -X GET "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample18 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/profile'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X GET "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample19 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/profile'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample20 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/remove'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X GET "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample21 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/remove'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample22 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/sign-in'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample23 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/sign-in'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample24 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/sign-in/firebase'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample25 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/sign-in/google'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample26 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/sign-in/resend'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample27 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/sign-out'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample28 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/sign-up'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample29 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/auth/sign-up/google'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample30 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/user/flags'
  
  // Replace path parameters with example values
  
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

// Copy code to clipboard
const copyCode = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    console.log('Code copied to clipboard!')
  })
}
</script>

<style scoped>
/* Fixed Authentication Header */
.auth-header-fixed {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.auth-header-fixed.collapsed .auth-container > *:not(.auth-title) {
  display: none;
}

.auth-container {
  padding: 1.5rem;
  color: white;
}

.auth-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.auth-title h4 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.collapse-toggle {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.collapse-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
}

.api-config-row {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.config-group {
  display: flex;
  flex-direction: column;
}

.config-label {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.config-input, .token-input {
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
}

.config-input::placeholder, .token-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.token-input-group {
  position: relative;
  display: flex;
}

.token-input {
  flex: 1;
  border-radius: 8px 0 0 8px;
}

.token-toggle, .generate-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-left: none;
  color: white;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;
}

.token-toggle {
  border-radius: 0 8px 8px 0;
}

.generate-btn {
  border-radius: 0;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}

.generate-btn:last-child {
  border-radius: 0 8px 8px 0;
}

.token-toggle:hover, .generate-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.status-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.url-status, .token-status, .fingerprint-status {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.clear-auth-btn {
  background: rgba(255, 0, 0, 0.3);
  border: 1px solid rgba(255, 0, 0, 0.5);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s;
}

.clear-auth-btn:hover {
  background: rgba(255, 0, 0, 0.5);
}

.token-hint {
  font-size: 0.8rem;
  opacity: 0.8;
  font-style: italic;
}

/* Main Content */
.interactive-api-container {
  max-width: 1200px;
  margin: 0 auto;
}

.endpoint-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.endpoint-header {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.method-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.method-get { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; }
.method-post { background: linear-gradient(135deg, #10b981, #047857); color: white; }
.method-put { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; }
.method-patch { background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; }
.method-delete { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; }

.endpoint-path {
  font-family: 'Monaco', 'Menlo', monospace;
  background: rgba(0, 0, 0, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #374151;
}

.endpoint-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.endpoint-content {
  padding: 2rem;
}

.endpoint-description {
  margin-bottom: 1.5rem;
  color: #6b7280;
  line-height: 1.6;
}

.parameters-section {
  margin-bottom: 2rem;
}

.parameters-section h4 {
  color: #374151;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.parameter-group {
  margin-bottom: 1rem;
}

.parameter-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

.parameter-input, .parameter-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.parameter-input:focus, .parameter-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.test-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
}

.test-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.test-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.test-btn:hover:not(.disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.test-btn.disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.loading {
  color: #f59e0b;
  font-weight: 500;
}

.response-section {
  margin-top: 1rem;
}

.response-section h4 {
  color: #374151;
  margin-bottom: 0.5rem;
}

.response-content {
  background: #1f2937;
  color: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}

.code-examples {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.code-tabs {
  display: flex;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.code-tab {
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s;
}

.code-tab.active {
  background: white;
  color: #3b82f6;
  border-bottom: 2px solid #3b82f6;
}

.code-tab:hover:not(.active) {
  background: #e5e7eb;
}

.code-content {
  position: relative;
}

.code-block {
  position: relative;
}

.copy-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  z-index: 10;
  transition: background 0.2s;
}

.copy-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

.code-block pre {
  margin: 0;
  padding: 1.5rem;
  background: #1f2937;
  color: #f3f4f6;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}

.code-block code {
  background: none;
  padding: 0;
  font-family: inherit;
}

/* Responsive Design */
@media (max-width: 768px) {
  .api-config-row {
    grid-template-columns: 1fr;
  }
  
  .endpoint-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .status-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .code-tabs {
    flex-wrap: wrap;
  }
  
  .code-tab {
    min-width: 80px;
    text-align: center;
  }
}
</style>