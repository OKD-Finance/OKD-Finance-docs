#!/usr/bin/env node

// Load environment variables from .env file
try {
  require('dotenv').config();
} catch (error) {
  // dotenv not available, continue without it
}

const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * Swagger API Documentation Generator
 * Automatically generates interactive Vue components from Swagger definition
 */

const SWAGGER_URL = process.env.SWAGGER_URL || 'https://develop.okd.finance/api/swagger/swagger.json';
const OUTPUT_DIR = './docs/.vitepress/theme/components';
const DOCS_DIR = './docs/en/api';

// Utility functions
function toTitleCase(str) {
  // Handle special cases for better API names
  const specialCases = {
    'referral-program': 'ReferralProgram',
    'user-operations': 'UserOperations',
    'exchange-configuration': 'ExchangeConfiguration',
    'websocket-subscriptions': 'WebsocketSubscriptions',
    'bybit-rest-endpoints': 'BybitRestEndpoints',
    'datasource': 'Datasource',
    'kyc': 'KYC',
    'authentication': 'Authentication',
    'spot': 'SpotTrading',
    'wallet': 'Wallet'
  };

  if (specialCases[str]) {
    return specialCases[str];
  }

  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.charAt(1).toLowerCase()
  );
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function generateFingerprint() {
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Fetch Swagger definition
function fetchSwaggerDefinition() {
  return new Promise((resolve, reject) => {
    https.get(SWAGGER_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Generate parameter documentation
function generateParameterDocs(parameters = [], index = 0) {
  if (!parameters.length) return '';

  return `
#### Request Parameters {#request-parameters-${index}}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
${parameters.map(param => {
    const required = param.required ? 'Yes' : 'No';
    const type = param.type || (param.schema && param.schema.type) || 'string';
    const description = (param.description || '-')
      .replace(/\n/g, ' ')
      .replace(/\|/g, '\\|')
      .replace(/\*/g, '\\*')
      .replace(/`/g, '\\`')
      .replace(/_/g, '\\_');
    return `| ${param.name} | ${type} | ${required} | ${param.in} | ${description} |`;
  }).join('\n')}
`;
}

// Generate response documentation
function generateResponseDocs(responses = {}, index = 0) {
  const successResponse = responses['200'] || responses['201'];
  if (!successResponse) return '';

  return `
#### Response Format {#response-format-${index}}

**Success Response (200):**
\`\`\`json
${JSON.stringify(successResponse.schema?.example || {
    "success": true,
    "data": {},
    "message": "Operation successful"
  }, null, 2)}
\`\`\`

**Error Response (400/500):**
\`\`\`json
{
  "success": false,
  "error": {
    "code": 400001,
    "message": "Invalid request parameters"
  }
}
\`\`\`
`;
}

// Generate Vue component for API endpoint based on InteractiveTradingAPI.vue template
function generateVueComponent(apiGroup, endpoints) {
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
            </div>
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
}`).join('\n\n');

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
</style>`;
}

// Generate markdown documentation
function generateMarkdownDocs(apiGroup, endpoints) {
  const componentTitle = toTitleCase(apiGroup);

  // Better titles for markdown headers
  const titleMap = {
    'kyc': 'KYC API',
    'authentication': 'Authentication API',
    'spot': 'Spot Trading API',
    'wallet': 'Wallet API',
    'referral-program': 'Referral Program API',
    'user-operations': 'User Operations API',
    'exchange-configuration': 'Exchange Configuration API',
    'websocket-subscriptions': 'WebSocket Subscriptions API',
    'bybit-rest-endpoints': 'Bybit REST Endpoints API',
    'datasource': 'Data Source API',
    'managed': 'Managed API',
    'okd': 'OKD API',
    'errors': 'Error Handling API'
  };

  const displayTitle = titleMap[apiGroup] || `${componentTitle} API`;

  return `---
layout: page
---

# ${displayTitle}

Welcome to the ${displayTitle} documentation. This interactive documentation allows you to test API endpoints directly from this page.

<Interactive${componentTitle}API />

<script setup>
import Interactive${componentTitle}API from '../../.vitepress/theme/components/Interactive${componentTitle}API.vue'
</script>`;
}

// Group endpoints by API category
function groupEndpoints(swagger) {
  const groups = {};

  Object.entries(swagger.paths).forEach(([path, methods]) => {
    Object.entries(methods).forEach(([method, endpoint]) => {
      if (!endpoint.tags || !endpoint.tags.length) return;

      const tag = endpoint.tags[0].toLowerCase().replace(/\s+/g, '-');

      if (!groups[tag]) {
        groups[tag] = [];
      }

      groups[tag].push({
        path,
        method,
        ...endpoint
      });
    });
  });

  return groups;
}

// Main execution
async function main() {
  try {
    console.log('🔄 Fetching Swagger definition...');
    const swagger = await fetchSwaggerDefinition();

    console.log('📊 Grouping endpoints...');
    const groups = groupEndpoints(swagger);

    // Ensure output directories exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    if (!fs.existsSync(DOCS_DIR)) {
      fs.mkdirSync(DOCS_DIR, { recursive: true });
    }

    console.log(`📁 Found ${Object.keys(groups).length} API groups:`);
    Object.keys(groups).forEach(group => {
      console.log(`   - ${group}: ${groups[group].length} endpoints`);
    });

    // Generate components and documentation for each group
    for (const [groupName, endpoints] of Object.entries(groups)) {
      if (endpoints.length === 0) continue;

      console.log(`\n🔨 Generating ${groupName} API...`);

      // Generate Vue component
      const componentName = `Interactive${toTitleCase(groupName)}API.vue`;
      const componentPath = path.join(OUTPUT_DIR, componentName);
      const componentContent = generateVueComponent(groupName, endpoints);

      fs.writeFileSync(componentPath, componentContent);
      console.log(`   ✅ Component: ${componentName}`);

      // Generate markdown documentation
      const docsPath = path.join(DOCS_DIR, `${groupName}.md`);
      const docsContent = generateMarkdownDocs(groupName, endpoints);

      fs.writeFileSync(docsPath, docsContent);
      console.log(`   ✅ Documentation: ${groupName}.md`);
    }

    // Generate index file for components
    const indexContent = Object.keys(groups)
      .map(group => {
        const componentName = `Interactive${toTitleCase(group)}API`;
        return `export { default as ${componentName} } from './${componentName}.vue'`;
      })
      .join('\n');

    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.js'), indexContent);

    console.log('\n🎉 Generation complete!');
    console.log(`📦 Generated ${Object.keys(groups).length} Vue components`);
    console.log(`📚 Generated ${Object.keys(groups).length} documentation pages`);
    console.log('\n📝 Next steps:');
    console.log('   1. Review generated components in docs/.vitepress/theme/components/');
    console.log('   2. Review generated documentation in docs/en/api/');
    console.log('   3. Update VitePress navigation if needed');
    console.log('   4. Test the interactive API documentation');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  main();
}

module.exports = {
  fetchSwaggerDefinition,
  generateVueComponent,
  generateMarkdownDocs,
  groupEndpoints
}; 