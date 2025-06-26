// New Vue Component Template based on InteractiveTradingAPI.vue pattern
function generateNewVueComponent(apiGroup, endpoints) {
    const componentName = `Interactive${toTitleCase(apiGroup)}API`;

    // Generate endpoint sections
    const endpointSections = endpoints.map((endpoint, index) => {
        const methodName = toCamelCase(endpoint.operationId || endpoint.path.replace(/[\/{}]/g, '_'));
        const hasBody = endpoint.method === 'post' || endpoint.method === 'put' || endpoint.method === 'patch';
        const parameters = endpoint.parameters || [];
        const bodyParams = endpoint.requestBody?.content?.['application/json']?.schema?.properties || {};
        const responses = endpoint.responses || {};

        // Generate parameter documentation
        const parameterDocs = parameters.length ? `
            <div class="api-section">
              <h4 class="section-title">📝 Parameters</h4>
              <div class="param-list">
                ${parameters.map(param => `
                <div class="param-item ${param.required ? 'required' : ''}">
                  <code class="param-name">${param.name}</code>
                  <span class="param-type">${param.schema?.type || param.type || 'string'}</span>
                  <span class="param-desc">${(param.description || '').replace(/"/g, '\\"')}</span>
                </div>`).join('')}
              </div>
            </div>` : '';

        // Generate body parameter documentation
        const bodyParamDocs = Object.keys(bodyParams).length ? `
            <div class="api-section">
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                ${Object.entries(bodyParams).map(([name, param]) => `
                <div class="param-item ${param.required ? 'required' : ''}">
                  <code class="param-name">${name}</code>
                  <span class="param-type">${param.type || 'string'}</span>
                  <span class="param-desc">${(param.description || '').replace(/"/g, '\\"')}</span>
                </div>`).join('')}
              </div>
            </div>` : '';

        // Generate response examples
        const responseExamples = `
            <div class="api-section">
              <h4 class="section-title">✅ Response Examples</h4>
              <div class="response-example">
                <div class="response-status success">200 OK - Success</div>
                <pre class="code-block">{
  "success": true,
  "data": {},
  "message": "Operation successful"
}</pre>
              </div>
              <div class="response-example">
                <div class="response-status error">400 Bad Request - Error</div>
                <pre class="code-block">{
  "code": 400001,
  "message": "Invalid request parameters"
}</pre>
              </div>
            </div>`;

        // Generate form inputs for parameters
        const parameterInputs = parameters.map(param => {
            if (param.in === 'query' || param.in === 'path') {
                return `
              <div class="form-group">
                <label>${param.name}${param.required ? ' *' : ''}</label>
                <input v-model="formData_${methodName}.${param.name}" type="text" placeholder="${param.description || param.name}" class="test-input" />
              </div>`;
            }
            return '';
        }).join('');

        const bodyInput = hasBody ? `
              <div class="form-group">
                <label>Request Body (JSON)</label>
                <textarea v-model="formData_${methodName}.body" placeholder='{"key": "value"}' rows="4" class="test-input"></textarea>
              </div>` : '';

        return `
      <section id="${methodName}" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge ${endpoint.method}">${endpoint.method.toUpperCase()}</span>
              <span class="endpoint-path">${endpoint.path}</span>
            </div>
            
            <div class="endpoint-info">
              <h3 class="endpoint-title">${endpoint.summary || endpoint.operationId || 'API Endpoint'}</h3>
              <p class="endpoint-description">${(endpoint.description || endpoint.summary || 'No description available').replace(/"/g, '\\"')}</p>
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
            
            ${parameterDocs}
            ${bodyParamDocs}

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <pre class="code-block">${endpoint.method.toUpperCase()} ${endpoint.path}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Fingerprint: 1358cd229b6bceb25941e99f4228997f${hasBody ? '\n\n{"key": "value"}' : ''}</pre>
            </div>

            ${responseExamples}
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              ${parameterInputs}
              ${bodyInput}
              <button @click="test${methodName.charAt(0).toUpperCase() + methodName.slice(1)}" class="test-btn" :disabled="!apiToken || !apiBaseUrl">
                {{ !apiToken ? '🔒 Enter API Token First' : !apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.${methodName}" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.${methodName}.status }}</span>
                  <span class="timestamp">{{ results.${methodName}.timestamp }}</span>
                  <button @click="copyToClipboard(results.${methodName}.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.${methodName}.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.${methodName}.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.${methodName}.headers }}</pre>
                  ${hasBody ? `<h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.${methodName}.body }}</pre>` : ''}
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.${methodName}.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>`;
    }).join('\n');

    // Generate methods for each endpoint
    const endpointMethods = endpoints.map(endpoint => {
        const methodName = toCamelCase(endpoint.operationId || endpoint.path.replace(/[\/{}]/g, '_'));
        const hasBody = endpoint.method === 'post' || endpoint.method === 'put' || endpoint.method === 'patch';
        const parameters = endpoint.parameters || [];

        return `const test${methodName.charAt(0).toUpperCase() + methodName.slice(1)} = async () => {
  try {
    let endpoint = '${endpoint.path}'
    const params = new URLSearchParams()
    
    // Handle path parameters
    ${parameters.filter(p => p.in === 'path').map(p => `
    if (formData_${methodName}.${p.name}) {
      endpoint = endpoint.replace('{${p.name}}', formData_${methodName}.${p.name})
    }`).join('')}
    
    // Handle query parameters
    ${parameters.filter(p => p.in === 'query').map(p => `
    if (formData_${methodName}.${p.name}) {
      params.append('${p.name}', formData_${methodName}.${p.name})
    }`).join('')}
    
    if (params.toString()) {
      endpoint += '?' + params.toString()
    }
    
    const fullUrl = \`\${apiBaseUrl.value}\${endpoint}\`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': \`Bearer \${apiToken.value}\`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    
    ${hasBody ? `const bodyString = formData_${methodName}.body || '{}'` : ''}
    
    const response = await fetch(fullUrl, {
      method: '${endpoint.method.toUpperCase()}',
      headers: headers${hasBody ? ',\n      body: bodyString' : ''}
    })
    
    const data = await response.text()
    results.${methodName} = {
      status: \`\${response.status} \${response.statusText}\`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: \`${endpoint.method.toUpperCase()} \${fullUrl}\`,
      headers: JSON.stringify(headers, null, 2)${hasBody ? ',\n      body: bodyString' : ''}
    }
  } catch (error) {
    results.${methodName} = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'${hasBody ? ',\n      body: \'N/A\'' : ''}
    }
  }
}`;
    }).join('\n\n');

    // Generate reactive form data
    const formDataInit = endpoints.map(endpoint => {
        const methodName = toCamelCase(endpoint.operationId || endpoint.path.replace(/[\/{}]/g, '_'));
        const parameters = endpoint.parameters || [];
        const hasBody = endpoint.method === 'post' || endpoint.method === 'put' || endpoint.method === 'patch';

        const paramFields = parameters.map(p => `${p.name}: ''`).join(', ');
        const bodyField = hasBody ? ', body: \'{}\'' : '';

        return `formData_${methodName}: reactive({ ${paramFields}${bodyField} })`;
    }).join(',\n  ');

    const resultsInit = endpoints.map(endpoint => {
        const methodName = toCamelCase(endpoint.operationId || endpoint.path.replace(/[\/{}]/g, '_'));
        return `${methodName}: null`;
    }).join(',\n  ');

    return `<template>
  <!-- Fixed Authentication Header -->
  <div class="auth-header-fixed">
    <div class="auth-container">
      <div class="auth-title">
        <h4>🔐 ${toTitleCase(apiGroup)} API Testing</h4>
      </div>
      <div class="api-config-row">
        <div class="config-group">
          <label class="config-label">🌐 API Base URL</label>
          <input 
            v-model="apiBaseUrl" 
            type="text" 
            :placeholder="defaultApiUrl" 
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
      ${endpointSections}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const apiToken = ref('')
const showToken = ref(false)
const defaultApiUrl = process.env.API_BASE_URL || 'https://develop.okd.finance/api'
const apiBaseUrl = ref(defaultApiUrl)

// Form data for each endpoint
const formData = {
  ${formDataInit}
}

const generateFingerprint = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const results = reactive({
  ${resultsInit}
})

// API Methods
${endpointMethods}

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
</script>

<style scoped>
/* Copy styles from InteractiveTradingAPI.vue */
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
}

.auth-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.auth-title h4 {
  margin: 0 0 0.65rem 0;
  color: var(--vp-c-brand);
  font-size: 1rem;
}

.api-config-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 0.65rem;
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
  background: linear-gradient(135deg, #fff3e0, #ffcc80);
  color: #f57c00;
  border: 2px solid #f57c00;
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

/* Rest of styles similar to InteractiveTradingAPI.vue */
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

.code-block {
  background: var(--vp-code-bg);
  color: var(--vp-code-color);
  padding: 1.5rem;
  border-radius: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid var(--vp-c-border);
}

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

.testing-title {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-brand);
  font-size: 1.1rem;
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
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.test-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
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

.test-btn:disabled {
  background: var(--vp-c-text-3);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

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
}
</style>`;
}

module.exports = { generateNewVueComponent }; 