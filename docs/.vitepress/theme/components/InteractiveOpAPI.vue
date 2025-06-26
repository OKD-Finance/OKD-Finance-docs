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
      
      <section id="cancel" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/operations/{uuid}/cancel</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">Cancels operation by uuid.</h3>
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
                  <div class="code-block"><pre>curl -X PUT "https://develop.okd.finance/api/operations/{uuid}/cancel" \
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
              
              
              <button @click="testCancel" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.cancel" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.cancel.status }}</span>
                  <span class="timestamp">{{ results.cancel.timestamp }}</span>
                  <button @click="copyToClipboard(results.cancel.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.cancel.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.cancel.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.cancel.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.cancel.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.cancel.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="confirm" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/operations/{uuid}/confirm</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">Confirms operation by uuid and code.</h3>
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
                  <div class="code-block"><pre>curl -X PUT "https://develop.okd.finance/api/operations/{uuid}/confirm" \
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
              
              
              <button @click="testConfirm" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.confirm" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.confirm.status }}</span>
                  <span class="timestamp">{{ results.confirm.timestamp }}</span>
                  <button @click="copyToClipboard(results.confirm.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.confirm.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.confirm.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.confirm.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.confirm.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.confirm.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="operation_resend" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/operations/{uuid}/resend</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">Resends code to email for specified operation.</h3>
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
                  <div class="code-block"><pre>curl -X PUT "https://develop.okd.finance/api/operations/{uuid}/resend" \
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
              
              
              <button @click="testOperation_resend" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.operation_resend" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.operation_resend.status }}</span>
                  <span class="timestamp">{{ results.operation_resend.timestamp }}</span>
                  <button @click="copyToClipboard(results.operation_resend.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.operation_resend.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.operation_resend.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.operation_resend.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.operation_resend.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.operation_resend.data }}</pre>
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

// Form data for each endpoint
const cancelData = reactive({
  uuid: ''
})

const confirmData = reactive({
  uuid: ''
})

const operation_resendData = reactive({
  uuid: ''
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
  cancel: null,
  confirm: null,
  operation_resend: null
})


const testCancel = async () => {
  try {
    
    const queryString = ''
    
    const requestBody = {
      
    }
    const bodyString = JSON.stringify(requestBody)
    
    const fullUrl = `${apiBaseUrl.value}/operations/{uuid}/cancel${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: headers,
      body: bodyString
    })
    
    const data = await response.text()
    results.cancel = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.cancel = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testConfirm = async () => {
  try {
    
    const queryString = ''
    
    const requestBody = {
      
    }
    const bodyString = JSON.stringify(requestBody)
    
    const fullUrl = `${apiBaseUrl.value}/operations/{uuid}/confirm${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: headers,
      body: bodyString
    })
    
    const data = await response.text()
    results.confirm = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.confirm = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testOperation_resend = async () => {
  try {
    
    const queryString = ''
    
    const requestBody = {
      
    }
    const bodyString = JSON.stringify(requestBody)
    
    const fullUrl = `${apiBaseUrl.value}/operations/{uuid}/resend${queryString}`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${apiToken.value}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: headers,
      body: bodyString
    })
    
    const data = await response.text()
    results.operation_resend = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.operation_resend = {
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