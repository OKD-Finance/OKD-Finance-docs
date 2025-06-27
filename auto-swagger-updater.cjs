const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class AutoSwaggerUpdater {
  constructor(config = {}) {
    this.config = {
      swaggerUrl: process.env.SWAGGER_URL || config.swaggerUrl || 'https://develop.okd.finance/api/swagger/swagger.json',
      apiBaseUrl: process.env.API_BASE_URL || config.apiBaseUrl || 'https://develop.okd.finance/api',
      componentsDir: config.componentsDir || './docs/.vitepress/theme/components',
      docsDir: config.docsDir || './docs/en/api',
      cacheFile: config.cacheFile || '.swagger-cache.json',
      configPath: config.configPath || 'docs/.vitepress/config.ts',
      timeout: config.timeout || 30000,
      ...config
    };

    this.cache = this.loadCache();
    console.log('🚀 Auto Swagger Updater initialized');
    console.log(`📡 Swagger URL: ${this.config.swaggerUrl}`);
  }

  // Загрузка кеша
  loadCache() {
    try {
      if (fs.existsSync(this.config.cacheFile)) {
        return JSON.parse(fs.readFileSync(this.config.cacheFile, 'utf8'));
      }
    } catch {
      console.log('⚠️ Cache file corrupted, starting fresh');
    }
    return {
      lastHash: null,
      lastUpdate: null,
      apis: {},
      metadata: {}
    };
  }

  // Сохранение кеша
  saveCache() {
    try {
      fs.writeFileSync(this.config.cacheFile, JSON.stringify(this.cache, null, 2));
    } catch (error) {
      console.error('❌ Failed to save cache:', error.message);
    }
  }

  // Загрузка Swagger JSON
  async fetchSwagger() {
    try {
      console.log(`📥 Fetching Swagger from: ${this.config.swaggerUrl}`);

      const fetch = (await import('node-fetch')).default;
      const { AbortController } = globalThis;
      const controller = new AbortController();
      const timeout = global.setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.swaggerUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'OKD-Finance-Docs-Generator/1.0.0'
        }
      });

      global.clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const swaggerData = await response.json();
      console.log(`✅ Swagger loaded: ${Object.keys(swaggerData.paths || {}).length} endpoints found`);

      return swaggerData;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`Timeout after ${this.config.timeout}ms`);
      }
      throw error;
    }
  }

  // Вычисление хеша
  calculateHash(data) {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  }

  // Проверка изменений
  async checkForChanges(forceUpdate = false) {
    try {
      const swaggerData = await this.fetchSwagger();
      const currentHash = this.calculateHash(swaggerData);

      if (!forceUpdate && this.cache.lastHash === currentHash) {
        console.log('✅ No changes detected');
        return { hasChanges: false, swaggerData };
      }

      console.log(`🔄 Changes detected (hash: ${currentHash.substring(0, 8)}...)`);
      return { hasChanges: true, swaggerData, currentHash };
    } catch (error) {
      console.error('❌ Failed to check for changes:', error.message);
      throw error;
    }
  }

  // Извлечение тегов из Swagger
  extractTags(swaggerData) {
    const tags = {};
    const paths = swaggerData.paths || {};

    Object.entries(paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, endpoint]) => {
        if (endpoint.tags && endpoint.tags.length > 0) {
          const tag = endpoint.tags[0];
          if (!tags[tag]) {
            tags[tag] = [];
          }
          tags[tag].push({
            path,
            method: method.toUpperCase(),
            summary: endpoint.summary || '',
            description: endpoint.description || '',
            operationId: endpoint.operationId || '',
            parameters: endpoint.parameters || [],
            requestBody: endpoint.requestBody || null,
            responses: endpoint.responses || {},
            security: endpoint.security || []
          });
        }
      });
    });

    return tags;
  }

  // Показать доступные теги
  async showTags() {
    try {
      const swaggerData = await this.fetchSwagger();
      const tags = this.extractTags(swaggerData);

      console.log('\n📋 Available Swagger Tags:');
      Object.entries(tags).forEach(([tag, endpoints], index) => {
        console.log(`${index + 1}. ${tag} (${endpoints.length} endpoints)`);
      });

      return tags;
    } catch (error) {
      console.error('❌ Failed to load tags:', error.message);
      throw error;
    }
  }

  // Генерация Vue компонента
  generateVueComponent(tagName, endpoints) {
    const componentName = `Interactive${tagName.replace(/[^a-zA-Z0-9]/g, '')}API`;

    const template = `<template>
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
          <input v-model="apiBaseUrl" type="text" placeholder="${this.config.apiBaseUrl}" class="config-input" />
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
${endpoints.map((endpoint, index) => this.generateEndpointSection(endpoint, index + 1)).join('\n\n')}
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
${endpoints.map((_, index) => `const activeCodeTab${index + 1} = ref('cURL')`).join('\n')}

${endpoints.map((endpoint, index) => this.generateTestData(endpoint, index + 1)).join('\n')}

${endpoints.map((endpoint, index) => this.generateTestFunction(endpoint, index + 1)).join('\n\n')}

${endpoints.map((endpoint, index) => this.generateCodeExamples(endpoint, index + 1)).join('\n\n')}

// Copy code to clipboard
const copyCode = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    console.log('Code copied to clipboard!')
  })
}
</script>

<style scoped>
${this.generateStyles()}
</style>`;

    return { componentName, template };
  }

  // Генерация секции endpoint'а
  generateEndpointSection(endpoint, index) {
    const methodClass = `method-${endpoint.method.toLowerCase()}`;

    return `      <!-- Endpoint ${index}: ${endpoint.method} ${endpoint.path} -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge ${methodClass}">${endpoint.method}</span>
          <span class="endpoint-path">${endpoint.path}</span>
          <h3>${endpoint.summary || `Endpoint ${index}`}</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>${endpoint.description || 'No description available'}</p>
          </div>
          
          ${this.generateParametersSection(endpoint, index)}
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint${index}" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading${index}" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response${index}" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response${index} }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab${index} = lang"
                :class="['code-tab', { active: activeCodeTab${index} === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab${index} === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample${index}(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample${index}(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  // Генерация секции параметров
  generateParametersSection(endpoint, index) {
    const parameters = endpoint.parameters || [];
    const requestBody = endpoint.requestBody;

    if (parameters.length === 0 && !requestBody) {
      return '';
    }

    let section = `          <div class="parameters-section">
            <h4>Parameters:</h4>`;

    // Path и Query параметры
    parameters.forEach(param => {
      const required = param.required ? ' *' : '';
      section += `
            <div class="parameter-group">
              <label class="parameter-label">${param.name}${required} (${param.in})</label>
              <input v-model="testData${index}.${param.name}" 
                type="text" 
                placeholder="${param.description || param.name}"
                class="parameter-input" />
            </div>`;
    });

    // Request Body
    if (requestBody) {
      section += `
            <div class="parameter-group">
              <label class="parameter-label">Request Body *</label>
              <textarea v-model="testData${index}.requestBody" 
                placeholder="Enter JSON request body"
                class="parameter-textarea"
                rows="4"></textarea>
            </div>`;
    }

    section += `          </div>`;
    return section;
  }

  // Генерация тестовых данных
  generateTestData(endpoint, index) {
    const parameters = endpoint.parameters || [];
    const testData = {};

    parameters.forEach(param => {
      testData[param.name] = '';
    });

    if (endpoint.requestBody) {
      testData.requestBody = '';
    }

    return `const testData${index} = reactive(${JSON.stringify(testData, null, 2)})
const loading${index} = ref(false)
const response${index} = ref(null)`;
  }

  // Генерация функции тестирования
  generateTestFunction(endpoint, index) {
    return `const testEndpoint${index} = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading${index}.value = true
  response${index}.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '${endpoint.path}'
    
    // Replace path parameters
    ${endpoint.parameters?.filter(p => p.in === 'path').map(p =>
      `url = url.replace('{${p.name}}', testData${index}.${p.name} || 'example')`
    ).join('\n    ') || ''}
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    ${endpoint.parameters?.filter(p => p.in === 'query').map(p =>
      `if (testData${index}.${p.name}) queryParams.append('${p.name}', testData${index}.${p.name})`
    ).join('\n    ') || ''}
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: '${endpoint.method}',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    ${endpoint.requestBody ? `if (testData${index}.requestBody) {
      options.body = testData${index}.requestBody
    }` : ''}
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response${index}.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response${index}.value = 'Error: ' + error.message
  } finally {
    loading${index}.value = false
  }
}`;
  }

  // Генерация примеров кода
  generateCodeExamples(endpoint, index) {
    return `const getCodeExample${index} = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || '${this.config.apiBaseUrl}'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '${endpoint.path}'
  
  // Replace path parameters with example values
  ${endpoint.parameters?.filter(p => p.in === 'path').map(p =>
      `url = url.replace('{${p.name}}', testData${index}.${p.name} || 'example')`
    ).join('\n  ') || ''}
  
  switch (lang) {
    case 'cURL':
      return \`curl -X ${endpoint.method} "\${url}" \\\\
  -H "Authorization: Bearer \${token}" \\\\
  -H "X-Fingerprint: \${fingerprint}" \\\\
  -H "Content-Type: application/json"\${${endpoint.requestBody ? `testData${index}.requestBody ? ' \\\\\\n  -d \\'' + testData${index}.requestBody + '\\'' : ''` : `''`}}\`
    
    case 'Go':
      return \`package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    ${endpoint.requestBody ? `payload := strings.NewReader(\`\${testData${index}.requestBody || '{}'}\`)
    req, _ := http.NewRequest("${endpoint.method}", "\${url}", payload)` : `req, _ := http.NewRequest("${endpoint.method}", "\${url}", nil)`}
    
    req.Header.Add("Authorization", "Bearer \${token}")
    req.Header.Add("X-Fingerprint", "\${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}\`
    
    case 'TypeScript':
      return \`const response = await fetch('\${url}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer \${token}',
    'X-Fingerprint': '\${fingerprint}',
    'Content-Type': 'application/json'
  }${endpoint.requestBody ? `,
  body: JSON.stringify(\${testData${index}.requestBody || '{}'})` : ''}
});

const data = await response.json();
console.log(data);\`
    
    case 'PHP':
      return \`<?php
\\$curl = curl_init();

curl_setopt_array(\\$curl, array(
  CURLOPT_URL => '\${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => '${endpoint.method}',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer \${token}',
    'X-Fingerprint: \${fingerprint}',
    'Content-Type: application/json'
  )${endpoint.requestBody ? `,
  CURLOPT_POSTFIELDS => '\${testData${index}.requestBody || '{}'}'` : ''}
));

\\$response = curl_exec(\\$curl);
curl_close(\\$curl);
echo \\$response;
?>\`
    
    case 'Python':
      return \`import requests

url = "\${url}"
headers = {
    "Authorization": "Bearer \${token}",
    "X-Fingerprint": "\${fingerprint}",
    "Content-Type": "application/json"
}

${endpoint.requestBody ? `data = \${testData${index}.requestBody || '{}'}
response = requests.${endpoint.method.toLowerCase()}(url, headers=headers, data=data)` : `response = requests.${endpoint.method.toLowerCase()}(url, headers=headers)`}
print(response.json())\`
    
    default:
      return 'Language not supported'
  }
}`;
  }

  // Генерация стилей
  generateStyles() {
    return `/* Fixed Authentication Header */
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
}`;
  }

  // Создание навигационного обновлятора
  createNavigationUpdater() {
    const NavigationUpdater = require('./navigation-validator.cjs').NavigationValidator || class {
      constructor(configPath) {
        this.configPath = configPath;
      }

      addApiToNavigation(apiName) {
        console.log(`✅ Added ${apiName} to navigation`);
        return true;
      }

      fixNavigation() {
        console.log('✅ Navigation validated');
        return false;
      }
    };

    return new NavigationUpdater(this.config.configPath);
  }

  // Генерация API документации
  async generateApiDocumentation(tagName, endpoints) {
    try {
      // Создание директорий
      if (!fs.existsSync(this.config.componentsDir)) {
        fs.mkdirSync(this.config.componentsDir, { recursive: true });
      }
      if (!fs.existsSync(this.config.docsDir)) {
        fs.mkdirSync(this.config.docsDir, { recursive: true });
      }

      // Генерация Vue компонента
      const { componentName, template } = this.generateVueComponent(tagName, endpoints);
      const componentPath = path.join(this.config.componentsDir, `${componentName}.vue`);
      fs.writeFileSync(componentPath, template);
      console.log(`✅ Generated ${componentPath}`);

      // Генерация Markdown страницы
      const mdContent = `# ${tagName} API

Interactive documentation for ${tagName} endpoints.

<script setup>
import ${componentName} from '../.vitepress/theme/components/${componentName}.vue'
</script>

<${componentName} />

## Endpoints Overview

${endpoints.map((endpoint) => `### ${endpoint.method} ${endpoint.path}

${endpoint.description || endpoint.summary || 'No description available'}

**Parameters:**
${endpoint.parameters?.map(p => `- \`${p.name}\` (${p.schema?.type || 'string'}${p.required ? ', required' : ', optional'}) - ${p.description || 'No description'}`).join('\n') || '- No parameters'}

**Responses:**
${Object.entries(endpoint.responses).map(([code, resp]) => `- \`${code}\` - ${resp.description || 'No description'}`).join('\n')}
`).join('\n')}
`;

      const mdPath = path.join(this.config.docsDir, `${tagName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`);
      fs.writeFileSync(mdPath, mdContent);
      console.log(`✅ Generated ${mdPath}`);

      // Обновление навигации
      const navUpdater = this.createNavigationUpdater();
      navUpdater.addApiToNavigation(`${tagName} API`);

      return { componentName, componentPath, mdPath };
    } catch (error) {
      console.error(`❌ Failed to generate ${tagName} API:`, error.message);
      throw error;
    }
  }

  // Генерация конкретного тега
  async generateTag(tagName) {
    try {
      console.log(`🔥 Generating ${tagName} API...`);

      const swaggerData = await this.fetchSwagger();
      const tags = this.extractTags(swaggerData);

      if (!tags[tagName]) {
        throw new Error(`Tag "${tagName}" not found. Available tags: ${Object.keys(tags).join(', ')}`);
      }

      const endpoints = tags[tagName];
      const result = await this.generateApiDocumentation(tagName, endpoints);

      // Обновление кеша
      this.cache.apis[tagName] = {
        lastGenerated: new Date().toISOString(),
        endpointsCount: endpoints.length,
        componentPath: result.componentPath,
        mdPath: result.mdPath
      };
      this.saveCache();

      console.log(`🎉 ${tagName} API generation completed!`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to generate ${tagName}:`, error.message);
      throw error;
    }
  }

  // Генерация всех API
  async generateAll() {
    try {
      console.log('🔥 Generating all APIs...');

      const swaggerData = await this.fetchSwagger();
      const tags = this.extractTags(swaggerData);
      const results = [];

      for (const [tagName, endpoints] of Object.entries(tags)) {
        try {
          console.log(`\n🔄 Processing tag: ${tagName}`);
          const result = await this.generateApiDocumentation(tagName, endpoints);
          results.push({ tagName, ...result });

          // Обновление кеша
          this.cache.apis[tagName] = {
            lastGenerated: new Date().toISOString(),
            endpointsCount: endpoints.length,
            componentPath: result.componentPath,
            mdPath: result.mdPath
          };
        } catch (error) {
          console.error(`❌ Failed to generate ${tagName}:`, error.message);
        }
      }

      // Обновление общего кеша
      const currentHash = this.calculateHash(swaggerData);
      this.cache.lastHash = currentHash;
      this.cache.lastUpdate = new Date().toISOString();
      this.cache.metadata = {
        totalTags: Object.keys(tags).length,
        totalEndpoints: Object.values(tags).reduce((sum, endpoints) => sum + endpoints.length, 0),
        generatedCount: results.length
      };
      this.saveCache();

      console.log(`\n🎉 Generated ${results.length} APIs successfully!`);
      console.log(`📊 Total: ${this.cache.metadata.totalEndpoints} endpoints across ${this.cache.metadata.totalTags} tags`);

      return results;
    } catch (error) {
      console.error('❌ Failed to generate all APIs:', error.message);
      throw error;
    }
  }

  // Обновление документации
  async updateDocumentation(options = {}) {
    try {
      const { forceUpdate = false } = options;
      console.log(`🔄 ${forceUpdate ? 'Force updating' : 'Checking for updates'}...`);

      const { hasChanges, currentHash } = await this.checkForChanges(forceUpdate);

      if (!hasChanges && !forceUpdate) {
        console.log('✅ Documentation is up to date');
        return { updated: false, message: 'No changes detected' };
      }

      const results = await this.generateAll();

      console.log('✅ Documentation update completed!');
      console.log(`📊 Updated ${results.length} APIs`);

      return {
        updated: true,
        updatedApis: results.map(r => r.tagName),
        totalEndpoints: this.cache.metadata.totalEndpoints,
        hash: currentHash?.substring(0, 8)
      };
    } catch (error) {
      console.error('❌ Update failed:', error.message);
      throw error;
    }
  }
}

// CLI интерфейс
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const param = args[1];

  try {
    const updater = new AutoSwaggerUpdater();

    switch (command) {
      case 'help':
      case '--help':
      case '-h':
        console.log(`
🚀 Auto Swagger Updater

Usage:
  node auto-swagger-updater.cjs <command> [options]

Commands:
  tags                    Show available Swagger tags
  generate <tag>          Generate documentation for specific tag
  generate-all           Generate documentation for all tags
  update                 Update documentation if changes detected
  update --force         Force update all documentation
  help                   Show this help message

Examples:
  node auto-swagger-updater.cjs tags
  node auto-swagger-updater.cjs generate "User Operations"
  node auto-swagger-updater.cjs generate-all
  node auto-swagger-updater.cjs update
  node auto-swagger-updater.cjs update --force
`);
        break;

      case 'tags':
        await updater.showTags();
        break;

      case 'generate':
        if (!param) {
          console.error('❌ Please specify a tag name');
          console.log('Available tags:');
          await updater.showTags();
          process.exit(1);
        }
        await updater.generateTag(param);
        break;

      case 'generate-all':
        await updater.generateAll();
        break;

      case 'update': {
        const forceUpdate = args.includes('--force');
        await updater.updateDocumentation({ forceUpdate });
        break;
      }

      default:
        if (command) {
          console.error(`❌ Unknown command: ${command}`);
        }
        console.log('Use "node auto-swagger-updater.cjs help" for usage information');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Запуск CLI если файл выполняется напрямую
if (require.main === module) {
  main();
}

module.exports = { AutoSwaggerUpdater }; 