/* eslint-env node */
/* global AbortController, setTimeout, clearTimeout, fetch */
const fs = require('fs');
const crypto = require('crypto');

// Swagger Auto-Loader class
class SwaggerAutoLoader {
  constructor(config = {}) {
    this.config = {
      swaggerUrl: process.env.SWAGGER_URL || config.swaggerUrl || 'https://develop.okd.finance/api/swagger/swagger.json',
      apiBaseUrl: process.env.API_BASE_URL || config.apiBaseUrl || 'https://develop.okd.finance/api',
      timeout: config.timeout || 30000,
      ...config
    };
  }

  // Получение Swagger документации
  async fetchSwaggerDocs() {
    try {
      console.log('📡 Fetching Swagger documentation...');
      console.log(`🔗 URL: ${this.config.swaggerUrl}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.swaggerUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Universal-Swagger-Generator/1.0',
          'Accept': 'application/json'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const swaggerData = await response.json();
      const swaggerHash = crypto.createHash('md5').update(JSON.stringify(swaggerData)).digest('hex');

      console.log(`✅ Swagger documentation fetched (hash: ${swaggerHash.substring(0, 8)}...)`);

      return { swaggerData, swaggerHash };

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.config.timeout}ms`);
      }
      throw error;
    }
  }

  // Группировка endpoint'ов по тегам
  groupEndpointsByTags(swaggerData) {
    const apiGroups = {};

    if (!swaggerData.paths) {
      throw new Error('No paths found in Swagger documentation');
    }

    for (const [path, methods] of Object.entries(swaggerData.paths)) {
      for (const [method, endpoint] of Object.entries(methods)) {
        if (typeof endpoint !== 'object' || !endpoint.tags) continue;

        const tag = endpoint.tags[0] || 'Default';

        if (!apiGroups[tag]) {
          apiGroups[tag] = [];
        }

        apiGroups[tag].push({
          method: method.toUpperCase(),
          path,
          title: endpoint.summary || `${method.toUpperCase()} ${path}`,
          description: endpoint.description || 'No description available',
          parameters: this.extractParameters(endpoint),
          responses: endpoint.responses || {}
        });
      }
    }

    return apiGroups;
  }

  // Извлечение параметров из endpoint'а
  extractParameters(endpoint) {
    const parameters = [];

    // Parameters из самого endpoint'а
    if (endpoint.parameters) {
      endpoint.parameters.forEach(param => {
        if (param.in === 'query' || param.in === 'path') {
          parameters.push({
            name: param.name,
            type: param.schema?.type || 'string',
            description: param.description || '',
            required: param.required || false
          });
        }
      });
    }

    // Request body parameters
    if (endpoint.requestBody?.content?.['application/json']?.schema?.properties) {
      const properties = endpoint.requestBody.content['application/json'].schema.properties;
      const requiredFields = endpoint.requestBody.content['application/json'].schema.required || [];

      for (const [name, prop] of Object.entries(properties)) {
        parameters.push({
          name,
          type: prop.type || 'string',
          description: prop.description || '',
          required: requiredFields.includes(name)
        });
      }
    }

    return parameters;
  }

  // Генерация всех API из Swagger
  async generateAllAPIsFromSwagger() {
    try {
      const { swaggerData } = await this.fetchSwaggerDocs();
      const apiGroups = this.groupEndpointsByTags(swaggerData);
      const generator = new UniversalAPIGenerator();

      console.log(`\n🔥 Found ${Object.keys(apiGroups).length} API groups in Swagger:\n`);

      for (const [tagName, endpoints] of Object.entries(apiGroups)) {
        console.log(`📋 ${tagName}: ${endpoints.length} endpoints`);
      }

      console.log('\n🚀 Starting generation...\n');

      for (const [tagName, endpoints] of Object.entries(apiGroups)) {
        try {
          console.log(`\n--- Generating ${tagName.toUpperCase()} API ---`);

          const apiName = `${tagName} API`;
          const componentName = `Interactive${tagName.replace(/[^a-zA-Z0-9]/g, '')}API`;

          generator.generateAPI(apiName, endpoints, componentName);

          console.log(`✅ ${tagName} API generated successfully!`);

        } catch (error) {
          console.error(`❌ Failed to generate ${tagName} API:`, error.message);
        }
      }

      console.log('\n🎉 All APIs generated from Swagger successfully!');
      return { success: true, apisGenerated: Object.keys(apiGroups).length };

    } catch (error) {
      console.error('❌ Failed to generate APIs from Swagger:', error.message);
      throw error;
    }
  }
}

// Navigation updater class
class NavigationUpdater {
  constructor(configPath = 'docs/.vitepress/config.ts') {
    this.configPath = configPath;
  }

  addApiToNavigation(apiName, apiLink, subItems = []) {
    try {
      let configContent = fs.readFileSync(this.configPath, 'utf8');

      // Find the API Reference section
      const apiSectionRegex = /(\s+text: 'API Reference',\s+items: \[\s*)([\s\S]*?)(\s+\]\s+\})/;
      const match = configContent.match(apiSectionRegex);

      if (!match) {
        console.log('❌ Could not find API Reference section in config');
        return false;
      }

      const [, beforeItems, itemsContent, afterItems] = match;

      // Remove existing entries for this API to prevent duplicates
      const existingPatterns = [
        new RegExp(`\\s*\\{[^}]*text:\\s*'${apiName}'[^}]*\\}[,]?\\s*`, 'g'),
        new RegExp(`\\s*\\{[^}]*text:\\s*'${apiName.replace(' API', '')}'[^}]*\\}[,]?\\s*`, 'g'),
        new RegExp(`\\s*\\{[^}]*text:\\s*'${apiName.replace(' API', '')} API'[^}]*\\}[,]?\\s*`, 'g'),
        new RegExp(`\\s*\\{[^}]*'text':\\s*'${apiName}'[^}]*\\}[,]?\\s*`, 'g'),
        new RegExp(`\\s*\\{[^}]*'text':\\s*'${apiName.replace(' API', '')}'[^}]*\\}[,]?\\s*`, 'g'),
        new RegExp(`\\s*\\{[^}]*'text':\\s*'${apiName.replace(' API', '')} API'[^}]*\\}[,]?\\s*`, 'g')
      ];

      let cleanedItemsContent = itemsContent;
      existingPatterns.forEach(pattern => {
        cleanedItemsContent = cleanedItemsContent.replace(pattern, '');
      });

      // Create new API entry
      let newApiEntry;
      if (subItems.length > 0) {
        const subItemsStr = subItems.map(item =>
          `                                { text: '${item.text}', link: '${item.link}' }`
        ).join(',\n');

        newApiEntry = `                        {
                            text: '${apiName}',
                            link: '${apiLink}',
                            collapsed: true,
                            items: [
${subItemsStr}
                            ]
                        },`;
      } else {
        newApiEntry = `                        {
                            text: '${apiName}',
                            link: '${apiLink}'
                        },`;
      }

      // Insert after Overview but before other APIs
      let updatedItemsContent = cleanedItemsContent;
      const overviewIndex = cleanedItemsContent.indexOf("text: 'Overview'");
      const overviewIndexOld = cleanedItemsContent.indexOf("'text': 'Overview'");

      if (overviewIndex !== -1 || overviewIndexOld !== -1) {
        // Find the end of Overview entry
        const useIndex = overviewIndex !== -1 ? overviewIndex : overviewIndexOld;
        const overviewEnd = cleanedItemsContent.indexOf('},', useIndex) + 2;
        const beforeOverviewEnd = cleanedItemsContent.substring(0, overviewEnd);
        const afterOverviewEnd = cleanedItemsContent.substring(overviewEnd);

        updatedItemsContent = beforeOverviewEnd + '\n' + newApiEntry + afterOverviewEnd;
      } else {
        // If no Overview, add at the beginning
        updatedItemsContent = newApiEntry + '\n' + cleanedItemsContent;
      }

      // Replace the content
      const newConfigContent = configContent.replace(
        apiSectionRegex,
        beforeItems + updatedItemsContent + afterItems
      );

      fs.writeFileSync(this.configPath, newConfigContent, 'utf8');
      console.log(`✅ Added ${apiName} to navigation (removed duplicates)`);

      // Автоматическая валидация и исправление навигации
      try {
        const { NavigationValidator } = require('./navigation-validator.cjs');
        const validator = new NavigationValidator(this.configPath);

        console.log('\n🔧 Running automatic navigation validation...');
        const wasFixed = validator.fixNavigation();

        if (wasFixed) {
          console.log('✅ Navigation automatically fixed!');
        }
      } catch (validationError) {
        console.log('⚠️ Navigation validation skipped:', validationError.message);
      }

      return true;

    } catch (error) {
      console.error('❌ Error updating navigation:', error.message);
      return false;
    }
  }
}

// Universal API Generator
class UniversalAPIGenerator {
  constructor() {
    this.navUpdater = new NavigationUpdater();
  }

  // Generate Vue component for any API
  generateVueComponent(apiName, endpoints) {
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
  isReadyToSendRequest
} = useAuth()

// Code examples tabs
const codeLangs = ['cURL', 'Go', 'TypeScript', 'PHP', 'Python']
${endpoints.map((_, index) => `const activeCodeTab${index + 1} = ref('cURL')`).join('\n')}

${endpoints.map((endpoint, index) => this.generateTestData(endpoint, index + 1)).join('\n')}



const results = reactive({
${endpoints.map((_, index) => `  endpoint${index + 1}: null`).join(',\n')}
})

${endpoints.map((endpoint, index) => this.generateTestFunction(endpoint, index + 1)).join('\n\n')}

${this.generateCopyFunctions()}

${this.generateCodeExamples(endpoints)}
</script>

<style scoped>
${this.generateStyles()}
</style>`;

    return template;
  }

  generateEndpointSection(endpoint, index) {
    const methodBadge = endpoint.method.toLowerCase();

    return `      <section id="endpoint-${index}" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge ${methodBadge}">${endpoint.method.toUpperCase()}</span>
              <span class="endpoint-path">${endpoint.path}</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 ${endpoint.title}</h3>
              <p class="endpoint-description">${endpoint.description}</p>
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

            ${endpoint.parameters.length > 0 ? `<div class="api-section">
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                ${endpoint.parameters.map(param => `<div class="param-item required">
                  <code class="param-name">${param.name}</code>
                  <span class="param-type">${param.type}</span>
                  <span class="param-desc">${param.description}</span>
                </div>`).join('\n                ')}
              </div>
            </div>` : ''}

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab${index} = lang"
                    :class="['code-tab', { active: activeCodeTab${index} === lang }]">
                    {{ lang }}
                  </button>
                </div>
                ${this.generateCodeBlocks(endpoint, index)}
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              ${endpoint.parameters.map(param => this.generateFormField(param, index)).join('\n              ')}
              <button @click="testEndpoint${index}" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint${index}" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint${index}.status }}</span>
                  <span class="timestamp">{{ results.endpoint${index}.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint${index}.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint${index}.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint${index}.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint${index}.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint${index}.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint${index}.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>`;
  }

  generateTestData(endpoint, index) {
    const defaultValues = endpoint.parameters.map(param => {
      if (param.type === 'boolean') return `${param.name}: true`;
      if (param.type === 'integer') return `${param.name}: 123`;
      return `${param.name}: 'example_${param.name}'`;
    }).join(', ');

    return `const testData${index} = reactive({ ${defaultValues} })`;
  }

  generateTestFunction(endpoint, index) {
    return `const testEndpoint${index} = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint${index} = {
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
      ${endpoint.parameters.map(param => `${param.name}: testData${index}.${param.name}`).join(',\n      ')}
    }

    const fullUrl = \`\${authValues.apiBaseUrl}${endpoint.path}\`
    const headers = {
      'Authorization': \`Bearer \${authValues.apiToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: '${endpoint.method.toUpperCase()}',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint${index} = {
      status: \`\${response.status} \${response.statusText}\`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: \`${endpoint.method.toUpperCase()} \${fullUrl}\`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint${index} = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}`;
  }

  generateFormField(param, index) {
    if (param.type === 'boolean') {
      return `<div class="form-group">
                <label>${param.name.charAt(0).toUpperCase() + param.name.slice(1)}</label>
                <select v-model="testData${index}.${param.name}" class="test-input">
                  <option :value="true">True</option>
                  <option :value="false">False</option>
                </select>
              </div>`;
    } else {
      return `<div class="form-group">
                <label>${param.name.charAt(0).toUpperCase() + param.name.slice(1)}</label>
                <input v-model="testData${index}.${param.name}" type="${param.type === 'integer' ? 'number' : 'text'}" placeholder="example_${param.name}" class="test-input" />
              </div>`;
    }
  }

  generateCodeBlocks(endpoint, index) {
    return `
                <div v-show="activeCodeTab${index} === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X ${endpoint.method.toUpperCase()} &quot;https://develop.okd.finance/api${endpoint.path}&quot; \\
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \\
  -H &quot;Content-Type: application/json&quot; \\
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \\
  -d &#x27;{${endpoint.parameters.map(p => `&quot;${p.name}&quot;:&quot;example&quot;`).join(',')}}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${index} === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[${index}] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${index} === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[${index}] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${index} === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[${index}] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${index} === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[${index}] }}</pre>
                  </div>
                </div>`;
  }

  generateCopyFunctions() {
    return `const copyToClipboard = (text, event) => {
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
    code = code.replace(/https:\\/\\/develop\\.okd\\.finance\\/api/g, authValues.apiBaseUrl || 'https://develop.okd.finance/api')
    
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy code:', err)
    })
  }
}`;
  }

  generateCodeExamples(endpoints) {
    return `const codeExamples = {
  curl: {
    ${endpoints.map((endpoint, index) => `${index + 1}: \`curl -X ${endpoint.method.toUpperCase()} "https://develop.okd.finance/api${endpoint.path}" \\\\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\\\
  -H "Content-Type: application/json" \\\\
  -H "Fingerprint: YOUR_FINGERPRINT" \\\\
  -d '{${endpoint.parameters.map(p => `"${p.name}":"example"`).join(',')}}'\``).join(',\n    ')}
  },
  go: {
    ${endpoints.map((endpoint, index) => {
      const structName = endpoint.title.replace(/[^a-zA-Z0-9]/g, '');
      const params = endpoint.parameters.map(p => `    ${p.name.charAt(0).toUpperCase() + p.name.slice(1)} string \\\`json:"${p.name}"\\\``).join('\\n');
      const method = endpoint.method.toUpperCase();

      return `${index + 1}: \`package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type ${structName}Request struct {
${params}
}

func ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}() error {
    url := "https://develop.okd.finance/api${endpoint.path}"
    
    requestData := ${structName}Request{
${endpoint.parameters.map(p => `        ${p.name.charAt(0).toUpperCase() + p.name.slice(1)}: "example",`).join('\\n')}
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("${method}", url, bytes.NewBuffer(jsonData))
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
    
    fmt.Printf("Response: %s\\\\n", string(body))
    return nil
}

func main() {
    if err := ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(); err != nil {
        fmt.Printf("Error: %v\\\\n", err)
    }
}\``;
    }).join(',\n    ')}
  },
  typescript: {
    ${endpoints.map((endpoint, index) => {
      const interfaceName = endpoint.title.replace(/[^a-zA-Z0-9]/g, '') + 'Request';
      const params = endpoint.parameters.map(p => `  ${p.name}: ${p.type === 'boolean' ? 'boolean' : 'string'};`).join('\\n');
      const method = endpoint.method.toUpperCase();

      return `${index + 1}: \`interface ${interfaceName} {
${params}
}

async function ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
  baseUrl: string,
  accessToken: string,
  data: ${interfaceName}
): Promise<any> {
  const response = await fetch(\\\`\\\${baseUrl}${endpoint.path}\\\`, {
    method: '${method}',
    headers: {
      'Authorization': \\\`Bearer \\\${accessToken}\\\`,
      'Content-Type': 'application/json',
      'Fingerprint': 'YOUR_FINGERPRINT'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(\\\`HTTP error! status: \\\${response.status}\\\`);
  }

  return await response.json();
}

// Usage example
async function main() {
  try {
    const result = await ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
${endpoint.parameters.map(p => `        ${p.name}: ${p.type === 'boolean' ? 'true' : '"example"'},`).join('\\n')}
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();\``;
    }).join(',\n    ')}
  },
  php: {
    ${endpoints.map((endpoint, index) => {
      const method = endpoint.method.toUpperCase();

      return `${index + 1}: \`<?php

function ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '${endpoint.path}';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
          'Fingerprint: YOUR_FINGERPRINT'
      ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => '${method}',
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
${endpoint.parameters.map(p => `        '${p.name}' => ${p.type === 'boolean' ? 'true' : "'example'"},`).join('\\n')}
    ];

    $result = ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\\\n";
}

?>\``;
    }).join(',\n    ')}
  },
  python: {
    ${endpoints.map((endpoint, index) => {
      const method = endpoint.method.toUpperCase();

      return `${index + 1}: \`import requests
import json
from typing import Dict, Any


def ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """${endpoint.description}"""
    url = f"{base_url}${endpoint.path}"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            '${method}',
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
${endpoint.parameters.map(p => `        '${p.name}': ${p.type === 'boolean' ? 'True' : "'example'"},`).join('\\n')}
    }
    
    try:
        result = ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()\``;
    }).join(',\n    ')}
  }
}`;
  }

  generateStyles() {
    return `/* Fixed Authentication Header */
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
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* Primary color for maximum visibility */
  color: var(--vp-c-brand) !important;
  /* Remove gradient effects that may cause invisibility */
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: unset !important;
  background-clip: unset !important;
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
}`;
  }

  // Main generation method
  generateAPI(apiName, endpoints, componentName) {
    // Generate Vue component
    const componentContent = this.generateVueComponent(apiName, endpoints);

    // Write component file
    const componentPath = `docs/.vitepress/theme/components/${componentName}.vue`;
    fs.writeFileSync(componentPath, componentContent, 'utf8');
    console.log(`✅ Generated ${componentPath}`);

    // Generate individual endpoint components
    endpoints.forEach((endpoint, index) => {
      const endpointComponentName = `${componentName}Endpoint${index + 1}`;
      const endpointComponent = this.generateSingleEndpointComponent(endpoint, index + 1, endpointComponentName);
      const endpointPath = `docs/.vitepress/theme/components/${endpointComponentName}.vue`;
      fs.writeFileSync(endpointPath, endpointComponent, 'utf8');
      console.log(`✅ Generated ${endpointPath}`);
    });

    // Generate markdown page (only one file)
    const apiNameLower = apiName.toLowerCase().replace(/\s+/g, '-').replace(/-api$/, '');
    const fileName = apiNameLower === 'user' ? 'users' : apiNameLower;

    // Функция для экранирования текста для JavaScript
    const escapeForJS = (text) => {
      return text
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, ' ')
        .replace(/\r/g, '')
        .replace(/\t/g, ' ')
        .trim();
    };

    // Функция для создания якоря
    const createAnchor = (text) => {
      return text.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    const markdownPage = `---
layout: page
---

# ${apiName}

<${componentName} />

${endpoints.map((endpoint, index) => `## ${endpoint.title}
${endpoint.description}

<${componentName}Endpoint${index + 1} />`).join('\n\n')}

<script setup>
import ${componentName} from '../../.vitepress/theme/components/${componentName}.vue'
${endpoints.map((_, index) => `import ${componentName}Endpoint${index + 1} from '../../.vitepress/theme/components/${componentName}Endpoint${index + 1}.vue'`).join('\n')}
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
${endpoints.map(endpoint => `  { text: '${escapeForJS(endpoint.title)}', anchor: '#${createAnchor(endpoint.title)}' }`).join(',\n')}
]" />
`;

    // Create only one file with the correct name
    fs.writeFileSync(`docs/en/api/${fileName}.md`, markdownPage, 'utf8');
    console.log(`✅ Generated ${fileName}.md page`);

    // Update navigation
    const subItems = endpoints.map((endpoint, index) => ({
      text: `${endpoint.method.toUpperCase()} ${endpoint.path}`,
      link: `/en/api/${fileName}#endpoint-${index + 1}`
    }));

    this.navUpdater.addApiToNavigation(apiName, `/en/api/${fileName}`, subItems);

    console.log(`🎉 ${apiName} generation completed!`);
  }

  // Generate single endpoint component
  generateSingleEndpointComponent(endpoint, _index, _componentName) {
    return `<template>
  <div class="single-endpoint">
    <div class="endpoint-layout">
      <div class="endpoint-docs">
        <div class="method-header">
          <span class="method-badge ${endpoint.method.toLowerCase()}">${endpoint.method.toUpperCase()}</span>
          <span class="endpoint-path">${endpoint.path}</span>
        </div>

        <div class="endpoint-info">
          <p class="endpoint-description">${endpoint.description}</p>
        </div>

        <div class="api-section" v-if="hasParameters">
          <h4 class="section-title">⚙️ Parameters</h4>
          <div class="param-list">
            ${endpoint.parameters.map(param => `<div class="param-item required">
              <code class="param-name">${param.name}</code>
              <span class="param-type">${param.type}</span>
              <span class="param-desc">${param.description}</span>
            </div>`).join('\n            ')}
          </div>
        </div>

        <div class="api-section">
          <h4 class="section-title">📝 Example Request</h4>
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab = lang"
                :class="['code-tab', { active: activeCodeTab === lang }]">
                {{ lang }}
              </button>
            </div>
            <div v-show="activeCodeTab === 'cURL'" class="code-block">
              <pre>curl -X ${endpoint.method.toUpperCase()} "https://develop.okd.finance/api${endpoint.path}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT"${endpoint.parameters.length > 0 ? ` \\
  -d '{"${endpoint.parameters.map(p => `${p.name}":"example"`).join('","')}"}'` : ''}</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="endpoint-testing">
        <h4 class="testing-title">🚀 Live Testing</h4>
        <div class="test-section">
          ${endpoint.parameters.map(param => this.generateFormField(param, '')).join('\n          ')}
          <button @click="testEndpoint" class="test-btn"
            :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
            {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
          </button>
          <div v-if="result" class="result-container">
            <div class="result-header">
              <span class="status-badge">{{ result.status }}</span>
              <span class="timestamp">{{ result.timestamp }}</span>
              <button @click="copyToClipboard(result.data, $event)" class="copy-btn">📋 Copy Response</button>
            </div>
            <div v-if="result.requestUrl" class="request-info">
              <h5>📤 Actual Request:</h5>
              <pre class="request-data">{{ result.requestUrl }}</pre>
              <h5>📋 Headers:</h5>
              <pre class="request-data">{{ result.headers }}</pre>
              <h5>📦 Body:</h5>
              <pre class="request-data">{{ result.body }}</pre>
            </div>
            <h5>📥 Response:</h5>
            <pre class="result-data">{{ result.data }}</pre>
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
  isReadyToSendRequest
} = useAuth()

const codeLangs = ['cURL', 'Go', 'TypeScript', 'PHP', 'Python']
const activeCodeTab = ref('cURL')

const hasParameters = ${endpoint.parameters.length > 0}

const testData = reactive({
  ${endpoint.parameters.map(param => {
      if (param.type === 'boolean') return `${param.name}: true`;
      if (param.type === 'integer') return `${param.name}: 123`;
      return `${param.name}: 'example_${param.name}'`;
    }).join(',\n  ')}
})

const result = ref(null)

const testEndpoint = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      result.value = {
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
      ${endpoint.parameters.map(param => `${param.name}: testData.${param.name}`).join(',\n      ')}
    }

    const fullUrl = \`\${authValues.apiBaseUrl}${endpoint.path}\`
    const headers = {
      'Authorization': \`Bearer \${authValues.apiToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: '${endpoint.method.toUpperCase()}',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    result.value = {
      status: \`\${response.status} \${response.statusText}\`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: \`${endpoint.method.toUpperCase()} \${fullUrl}\`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    result.value = {
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
</script>

<style scoped>
${this.generateStyles()}
</style>`;
  }
}

// Example usage functions
function generateWalletAPI() {
  const generator = new UniversalAPIGenerator();
  const endpoints = [
    {
      method: 'GET',
      path: '/wallet/balance',
      title: 'Get Wallet Balance',
      description: 'Retrieve current wallet balance for all currencies',
      parameters: []
    },
    {
      method: 'POST',
      path: '/wallet/transfer',
      title: 'Transfer Funds',
      description: 'Transfer funds between wallets',
      parameters: [
        { name: 'fromWallet', type: 'string', description: 'Source wallet ID' },
        { name: 'toWallet', type: 'string', description: 'Destination wallet ID' },
        { name: 'amount', type: 'number', description: 'Amount to transfer' },
        { name: 'currency', type: 'string', description: 'Currency code' }
      ]
    },
    {
      method: 'GET',
      path: '/wallet/history',
      title: 'Transaction History',
      description: 'Get wallet transaction history',
      parameters: [
        { name: 'limit', type: 'integer', description: 'Number of transactions to return' },
        { name: 'offset', type: 'integer', description: 'Offset for pagination' }
      ]
    }
  ];

  generator.generateAPI('Wallet API', endpoints, 'InteractiveWalletAPI');
}

// Export for use
module.exports = { UniversalAPIGenerator, NavigationUpdater, SwaggerAutoLoader, generateWalletAPI };

// Predefined API configurations
const API_CONFIGS = {
  user: {
    name: 'User API',
    componentName: 'InteractiveUserAPI',
    endpoints: [
      {
        method: 'PUT',
        path: '/user/flags',
        title: 'Set Profile Flags',
        description: 'Update user profile flags and preferences',
        parameters: [
          { name: 'notifications', type: 'boolean', description: 'Enable/disable notifications', required: false },
          { name: 'marketing', type: 'boolean', description: 'Enable/disable marketing emails', required: false },
          { name: 'privacy', type: 'string', description: 'Privacy level (public/private)', required: false }
        ]
      },
      {
        method: 'PATCH',
        path: '/user/notifications',
        title: 'Subscribe to Notifications',
        description: 'Subscribe or unsubscribe from various notification types',
        parameters: [
          { name: 'email', type: 'boolean', description: 'Email notifications', required: false },
          { name: 'push', type: 'boolean', description: 'Push notifications', required: false },
          { name: 'sms', type: 'boolean', description: 'SMS notifications', required: false }
        ]
      },
      {
        method: 'PATCH',
        path: '/user/profile',
        title: 'Subscribe to Profile Events',
        description: 'Subscribe to profile-related events and updates',
        parameters: [
          { name: 'profileUpdates', type: 'boolean', description: 'Profile update notifications', required: false },
          { name: 'securityAlerts', type: 'boolean', description: 'Security alert notifications', required: false }
        ]
      }
    ]
  },

  wallet: {
    name: 'Wallet API',
    componentName: 'InteractiveWalletAPI',
    endpoints: [
      {
        method: 'GET',
        path: '/wallet/balance',
        title: 'Get Wallet Balance',
        description: 'Retrieve current wallet balance for all currencies',
        parameters: []
      },
      {
        method: 'POST',
        path: '/wallet/transfer',
        title: 'Transfer Funds',
        description: 'Transfer funds between wallets',
        parameters: [
          { name: 'fromWallet', type: 'string', description: 'Source wallet ID', required: true },
          { name: 'toWallet', type: 'string', description: 'Destination wallet ID', required: true },
          { name: 'amount', type: 'number', description: 'Amount to transfer', required: true },
          { name: 'currency', type: 'string', description: 'Currency code', required: true }
        ]
      },
      {
        method: 'GET',
        path: '/wallet/history',
        title: 'Transaction History',
        description: 'Get wallet transaction history',
        parameters: [
          { name: 'limit', type: 'integer', description: 'Number of transactions to return', required: false },
          { name: 'offset', type: 'integer', description: 'Offset for pagination', required: false }
        ]
      }
    ]
  },

  auth: {
    name: 'Authentication API',
    componentName: 'InteractiveAuthAPI',
    endpoints: [
      {
        method: 'POST',
        path: '/auth/login',
        title: 'User Login',
        description: 'Authenticate user with email and password',
        parameters: [
          { name: 'email', type: 'string', description: 'User email address', required: true },
          { name: 'password', type: 'string', description: 'User password', required: true }
        ]
      },
      {
        method: 'POST',
        path: '/auth/register',
        title: 'User Registration',
        description: 'Register a new user account',
        parameters: [
          { name: 'email', type: 'string', description: 'User email address', required: true },
          { name: 'password', type: 'string', description: 'User password', required: true },
          { name: 'firstName', type: 'string', description: 'First name', required: true },
          { name: 'lastName', type: 'string', description: 'Last name', required: true }
        ]
      },
      {
        method: 'POST',
        path: '/auth/logout',
        title: 'User Logout',
        description: 'Logout current user session',
        parameters: []
      }
    ]
  },

  trading: {
    name: 'Trading API',
    componentName: 'InteractiveTradingAPI',
    endpoints: [
      {
        method: 'POST',
        path: '/spot/order',
        title: 'Place Spot Order',
        description: 'Place a new spot trading order',
        parameters: [
          { name: 'symbol', type: 'string', description: 'Trading pair symbol (e.g., BTCUSDT)', required: true },
          { name: 'side', type: 'string', description: 'Order side (BUY or SELL)', required: true },
          { name: 'type', type: 'string', description: 'Order type (MARKET, LIMIT)', required: true },
          { name: 'quantity', type: 'number', description: 'Order quantity', required: true },
          { name: 'price', type: 'number', description: 'Order price (for LIMIT orders)', required: false }
        ]
      },
      {
        method: 'GET',
        path: '/spot/orders',
        title: 'Get Orders',
        description: 'Retrieve list of trading orders',
        parameters: [
          { name: 'symbol', type: 'string', description: 'Trading pair symbol', required: false },
          { name: 'status', type: 'string', description: 'Order status filter', required: false },
          { name: 'limit', type: 'integer', description: 'Number of orders to return', required: false }
        ]
      },
      {
        method: 'DELETE',
        path: '/spot/order',
        title: 'Cancel Order',
        description: 'Cancel an existing trading order',
        parameters: [
          { name: 'orderId', type: 'string', description: 'Order ID to cancel', required: true },
          { name: 'symbol', type: 'string', description: 'Trading pair symbol', required: true }
        ]
      }
    ]
  }
};

// Command line interface
function showHelp() {
  console.log(`
🚀 Universal Swagger Generator

Usage:
  node universal-swagger-generator-final.cjs <api-type>
  node universal-swagger-generator-final.cjs <command>

Available API types:
  user      - Generate User API (profile, notifications, flags)
  wallet    - Generate Wallet API (balance, transfer, history)  
  auth      - Generate Authentication API (login, register, logout)
  trading   - Generate Trading API (orders, cancel, history)
  all       - Generate all APIs

Available commands:
  swagger   - Generate all APIs from Swagger documentation automatically
  auto      - Same as swagger (alias)
  help      - Show this help message

Examples:
  node universal-swagger-generator-final.cjs user
  node universal-swagger-generator-final.cjs wallet
  node universal-swagger-generator-final.cjs all
  node universal-swagger-generator-final.cjs swagger
  node universal-swagger-generator-final.cjs auto
`);
}

function generateAPI(apiType) {
  const generator = new UniversalAPIGenerator();
  const config = API_CONFIGS[apiType];

  if (!config) {
    console.error(`❌ Unknown API type: ${apiType}`);
    showHelp();
    return;
  }

  console.log(`🔥 Generating ${config.name}...`);
  generator.generateAPI(config.name, config.endpoints, config.componentName);
}

function generateAllAPIs() {
  console.log('🔥 Generating all APIs...\n');

  Object.keys(API_CONFIGS).forEach(apiType => {
    console.log(`\n--- Generating ${apiType.toUpperCase()} API ---`);
    generateAPI(apiType);
  });

  console.log('\n🎉 All APIs generated successfully!');
}

async function generateFromSwagger() {
  try {
    console.log('🔥 Generating APIs from Swagger documentation...\n');

    const loader = new SwaggerAutoLoader();
    await loader.generateAllAPIsFromSwagger();

  } catch (error) {
    console.error('❌ Failed to generate from Swagger:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === 'help' || args[0] === '--help') {
    showHelp();
  } else if (args[0] === 'all') {
    generateAllAPIs();
  } else if (args[0] === 'swagger' || args[0] === 'auto') {
    generateFromSwagger();
  } else {
    generateAPI(args[0]);
  }
} 