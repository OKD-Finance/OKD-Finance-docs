<template>
  <!-- Fixed Authentication Header -->
  <div class="auth-header-fixed" :class="{ 'collapsed': isHeaderCollapsed }">
    <div class="auth-container">
      <div class="auth-title">
        <h4>🔐 API Authentication</h4>
        <button @click="toggleHeaderCollapse" class="collapse-toggle" :title="isHeaderCollapsed ? 'Expand header' : 'Collapse header'">
          {{ isHeaderCollapsed ? '⬇️' : '⬆️' }}
        </button>
      </div>
      <div class="api-config-row">
        <div class="config-group">
          <label class="config-label">🌐 API Base URL</label>
          <input 
            :value="apiBaseUrl" 
            @input="updateApiBaseUrl($event.target.value)"
            type="text" 
            placeholder="https://develop.okd.finance/api" 
            class="config-input" 
          />
        </div>
        <div class="config-group token-group">
          <label class="config-label">🔑 Access Token</label>
          <div class="token-input-group">
            <input 
              :value="apiToken" 
              @input="updateApiToken($event.target.value)"
              :type="showToken ? 'text' : 'password'" 
              placeholder="Paste your access token here (without 'Bearer')" 
              class="token-input" 
            />
            <button @click="toggleTokenVisibility" class="token-toggle" :title="showToken ? 'Hide token' : 'Show token'">
              {{ showToken ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>
      </div>
      <div class="status-row">
        <div v-if="apiBaseUrl" class="url-status">🌐 API: {{ apiBaseUrl }}</div>
        <div v-if="apiToken" class="token-status">✅ Token configured ({{ apiToken.length }} chars)</div>
        <div v-if="apiToken" class="clear-section">
          <button @click="clearAllData" class="clear-btn" title="Clear all API configuration">
            🗑️ Clear All
          </button>
        </div>
      </div>
      <div class="token-hint">
        💡 Don't include "Bearer" - it's added automatically
        <span v-if="apiToken" class="auto-collapse-hint">• Configuration saved globally across all API pages</span>
      </div>
    </div>
  </div>

  <div class="interactive-api-container">
    <!-- Main Documentation and Testing Column -->
    <div class="main-content">
      
      <section id="ws_symbols" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge patch">PATCH</span>
              <span class="endpoint-path">/symbols</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">Subscribe to symbols events.</h3>
              <p class="endpoint-description">Request is **{\"path\": \"/symbols\"}**. No need additional payload.</p>
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
                  <div class="code-block"><pre>curl -X PATCH "https://develop.okd.finance/api/symbols" \
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
              
              
              <button @click="testWs_symbols" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.ws_symbols" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.ws_symbols.status }}</span>
                  <span class="timestamp">{{ results.ws_symbols.timestamp }}</span>
                  <button @click="copyToClipboard(results.ws_symbols.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.ws_symbols.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.ws_symbols.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.ws_symbols.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.ws_symbols.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.ws_symbols.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { apiStore } from '../stores/apiStore.js'

// Используем глобальный store вместо локальных переменных
const apiToken = ref(apiStore.apiToken)
const showToken = ref(apiStore.showToken)
const apiBaseUrl = ref(apiStore.apiBaseUrl)
const isHeaderCollapsed = ref(apiStore.isHeaderCollapsed)

// Инициализация при монтировании компонента
onMounted(() => {
  // Синхронизируем локальные ref с глобальным store
  apiToken.value = apiStore.apiToken
  showToken.value = apiStore.showToken
  apiBaseUrl.value = apiStore.apiBaseUrl
  isHeaderCollapsed.value = apiStore.isHeaderCollapsed
})

// Функции для работы с глобальным store
const updateApiToken = (token) => {
  apiToken.value = token
  apiStore.setApiToken(token)
  isHeaderCollapsed.value = apiStore.isHeaderCollapsed
}

const updateApiBaseUrl = (url) => {
  apiBaseUrl.value = url
  apiStore.setApiBaseUrl(url)
}

const toggleHeaderCollapse = () => {
  apiStore.toggleHeaderCollapse()
  isHeaderCollapsed.value = apiStore.isHeaderCollapsed
}

const toggleTokenVisibility = () => {
  apiStore.toggleTokenVisibility()
  showToken.value = apiStore.showToken
}

const clearAllData = () => {
  if (confirm('Are you sure you want to clear all API configuration? This will remove your token and settings from all API pages.')) {
    apiStore.clear()
    apiToken.value = apiStore.apiToken
    showToken.value = apiStore.showToken
    apiBaseUrl.value = apiStore.apiBaseUrl
    isHeaderCollapsed.value = apiStore.isHeaderCollapsed
  }
}

// Code examples tabs
const codeLangs = ['cURL', 'Go', 'TypeScript', 'PHP', 'Python']
const activeCodeTab1 = ref('cURL')

// Form data for each endpoint
const ws_symbolsData = reactive({

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
  ws_symbols: null
})


const testWs_symbols = async () => {
  try {
    
    const queryString = ''
    
    const requestBody = {
      
    }
    const bodyString = JSON.stringify(requestBody)
    
    const fullUrl = `${apiBaseUrl.value}/symbols${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'PATCH',
      headers: headers,
      body: bodyString
    })
    
    const data = await response.text()
    results.ws_symbols = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PATCH ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.ws_symbols = {
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

.clear-section {
  margin-left: auto;
}

.clear-btn {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: linear-gradient(135deg, #ff5252, #d32f2f);
  transform: translateY(-1px);
}

.token-hint {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-top: 0.25rem;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
  max-height: 30px;
  opacity: 1;
}

.auto-collapse-hint {
  color: var(--vp-c-brand);
  font-weight: 500;
  margin-left: 0.5rem;
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