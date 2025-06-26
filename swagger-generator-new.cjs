/* eslint-env node */

/**
 * Enhanced Swagger API Documentation Generator
 * Generates interactive Vue components based on InteractiveTradingAPI.vue template
 * and markdown pages based on spot.md structure
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const SWAGGER_URL = process.env.SWAGGER_URL || 'https://develop.okd.finance/api/swagger/swagger.json';
const API_BASE_URL = process.env.API_BASE_URL || 'https://develop.okd.finance/api';
const OUTPUT_DIR = './docs/.vitepress/theme/components';
const DOCS_DIR = './docs/en/api';

// Utility functions
function toTitleCase(str) {
    const specialCases = {
        'spot': 'SpotTrading',
        'wallet': 'Wallet',
        'user': 'User',
        'kyc': 'KYC',
        'auth': 'Authentication',
        'trading': 'Trading'
    };

    if (specialCases[str]) return specialCases[str];

    return str.replace(/\w\S*/g, (txt) =>
        txt.charAt(0).toUpperCase() + txt.charAt(1).toLowerCase()
    );
}

function toCamelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// Main generator class
class SwaggerGenerator {
    constructor() {
        this.swagger = null;
        this.endpoints = {};
    }

    // Fetch Swagger definition
    async fetchSwaggerDefinition() {
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

    // Group endpoints by tags or path
    groupEndpoints(swagger) {
        const groups = {};

        Object.entries(swagger.paths).forEach(([path, methods]) => {
            Object.entries(methods).forEach(([method, endpoint]) => {
                const tag = endpoint.tags?.[0] || 'default';
                if (!groups[tag]) groups[tag] = [];

                groups[tag].push({
                    path,
                    method,
                    ...endpoint
                });
            });
        });

        return groups;
    }

    // Generate Vue component template
    generateVueTemplate(apiGroup, endpoints) {
        const componentName = `Interactive${toTitleCase(apiGroup)}API`;

        const sections = endpoints.map(endpoint => this.generateEndpointSection(endpoint)).join('\n');
        const reactiveData = this.generateReactiveData(endpoints);
        const methods = this.generateMethods(endpoints);

        return `<template>
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
          <input v-model="apiBaseUrl" type="text" placeholder="${API_BASE_URL}" class="config-input" />
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
      </div>
      <div class="status-row">
        <div v-if="getRawValues().apiBaseUrl" class="url-status">🌐 API: {{ getRawValues().apiBaseUrl }}</div>
        <div v-if="getRawValues().apiToken" class="token-status">✅ Token configured ({{ getRawValues().apiToken.length }} chars)</div>
        <button v-if="getRawValues().apiToken" @click="clearAuth" class="clear-auth-btn" title="Clear authentication data">
          🗑️ Clear Auth
        </button>
      </div>
      <div class="token-hint">💡 Don't include "Bearer" - it's added automatically</div>
    </div>
  </div>

  <div class="interactive-api-container">
    <div class="main-content">
${sections}
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'

// Global auth state
const {
  apiToken,
  apiBaseUrl,
  showToken,
  isHeaderCollapsed,
  toggleHeader,
  clearAuth,
  getRawValues
} = useAuth()

// Code examples tabs
const codeLangs = ['cURL', 'Go', 'TypeScript', 'PHP', 'Python']
${endpoints.map((_, i) => `const activeCodeTab${i + 1} = ref('cURL')`).join('\n')}

${reactiveData}

const generateFingerprint = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const results = reactive({
${endpoints.map(e => `  ${this.getMethodName(e)}: null`).join(',\n')}
})

${methods}

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

${this.generateVueStyles()}`;
    }

    // Generate endpoint section
    generateEndpointSection(endpoint) {
        const methodName = this.getMethodName(endpoint);
        const hasBody = ['post', 'put', 'patch'].includes(endpoint.method);

        return `      <section id="${methodName}" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge ${endpoint.method}">${endpoint.method.toUpperCase()}</span>
              <span class="endpoint-path">${endpoint.path}</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">${this.getEndpointIcon(endpoint)} ${endpoint.summary || 'API Endpoint'}</h3>
              <p class="endpoint-description">${endpoint.description || endpoint.summary || 'No description available'}</p>
            </div>

            ${this.generateHeadersDoc()}
            ${this.generateParametersDoc(endpoint)}
            ${hasBody ? this.generateBodyDoc(endpoint) : ''}
            ${this.generateCodeExamples(endpoint)}
            ${this.generateResponseExamples(endpoint)}
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              ${this.generateTestingForm(endpoint)}
              <button @click="test${this.capitalize(methodName)}" class="test-btn"
                :disabled="!getRawValues().apiToken || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
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
                  ${hasBody ? '<h5>📦 Body:</h5>\n                  <pre class="request-data">{{ results.' + methodName + '.body }}</pre>' : ''}
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.${methodName}.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>`;
    }

    // Helper methods
    getMethodName(endpoint) {
        return toCamelCase(endpoint.operationId || `${endpoint.method}_${endpoint.path.replace(/[\/{}]/g, '_')}`);
    }

    getEndpointIcon(endpoint) {
        const icons = {
            get: '📋',
            post: '📈',
            put: '🔄',
            patch: '✏️',
            delete: '🗑️'
        };
        return icons[endpoint.method] || '🔧';
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Generate reactive data
    generateReactiveData(endpoints) {
        return endpoints.map(endpoint => {
            const methodName = this.getMethodName(endpoint);
            const params = endpoint.parameters || [];
            const bodyParams = endpoint.requestBody?.content?.['application/json']?.schema?.properties || {};

            const fields = {};

            // Add parameters
            params.forEach(param => {
                if (param.in === 'query' || param.in === 'path') {
                    fields[param.name] = param.schema?.default || '';
                }
            });

            // Add body fields
            Object.keys(bodyParams).forEach(key => {
                fields[key] = bodyParams[key].default || '';
            });

            return `const ${methodName}Data = reactive(${JSON.stringify(fields, null, 2)})`;
        }).join('\n\n');
    }

    // Generate methods
    generateMethods(endpoints) {
        return endpoints.map(endpoint => {
            const methodName = this.getMethodName(endpoint);
            const hasBody = ['post', 'put', 'patch'].includes(endpoint.method);
            const params = endpoint.parameters || [];

            return `const test${this.capitalize(methodName)} = async () => {
  try {
    const authValues = getRawValues()
    let endpoint = '${endpoint.path}'
    const urlParams = new URLSearchParams()

    ${params.filter(p => p.in === 'path').map(p => `
    if (${methodName}Data.${p.name}) {
      endpoint = endpoint.replace('{${p.name}}', ${methodName}Data.${p.name})
    }`).join('')}

    ${params.filter(p => p.in === 'query').map(p => `
    if (${methodName}Data.${p.name}) urlParams.append('${p.name}', ${methodName}Data.${p.name})`).join('')}

    if (urlParams.toString()) {
      endpoint += '?' + urlParams.toString()
    }

    const fullUrl = \`\${authValues.apiBaseUrl}\${endpoint}\`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': \`Bearer \${authValues.apiToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }

    ${hasBody ? `const bodyString = JSON.stringify(${methodName}Data)` : ''}

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
    }

    // Generate documentation sections
    generateHeadersDoc() {
        return `            <div class="api-section">
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
            </div>`;
    }

    generateParametersDoc(endpoint) {
        const params = endpoint.parameters?.filter(p => p.in === 'query' || p.in === 'path') || [];
        if (!params.length) return '';

        return `            <div class="api-section">
              <h4 class="section-title">🔍 Parameters</h4>
              <div class="param-list">
                ${params.map(param => `
                <div class="param-item ${param.required ? 'required' : ''}">
                  <code class="param-name">${param.name}</code>
                  <span class="param-type">${param.schema?.type || 'string'}</span>
                  <span class="param-desc">${param.description || ''}</span>
                </div>`).join('')}
              </div>
            </div>`;
    }

    generateBodyDoc(endpoint) {
        const bodySchema = endpoint.requestBody?.content?.['application/json']?.schema;
        if (!bodySchema?.properties) return '';

        return `            <div class="api-section">
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                ${Object.entries(bodySchema.properties).map(([name, param]) => `
                <div class="param-item ${bodySchema.required?.includes(name) ? 'required' : ''}">
                  <code class="param-name">${name}</code>
                  <span class="param-type">${param.type || 'string'}</span>
                  <span class="param-desc">${param.description || ''}</span>
                </div>`).join('')}
              </div>
            </div>`;
    }

    generateCodeExamples(endpoint) {
        const curlExample = this.generateCurlExample(endpoint);

        return `            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab1 = lang"
                    :class="['code-tab', { active: activeCodeTab1 === lang }]">
                    {{ lang }}
                  </button>
                </div>

                <div v-show="activeCodeTab1 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 1)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>${curlExample}</pre>
                  </div>
                </div>
              </div>
            </div>`;
    }

    generateCurlExample(endpoint) {
        const hasBody = ['post', 'put', 'patch'].includes(endpoint.method);
        const bodyExample = hasBody ? ` \\
  -d '{
    "key": "value"
  }'` : '';

        return `curl -X ${endpoint.method.toUpperCase()} "${API_BASE_URL}${endpoint.path}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f"${bodyExample}`;
    }

    generateResponseExamples(endpoint) {
        return `            <div class="api-section">
              <h4 class="section-title">✅ Response Examples</h4>
              <div class="response-example">
                <div class="response-status success">200 OK - Success</div>
                <pre class="code-block">{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
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
    }

    generateTestingForm(endpoint) {
        const methodName = this.getMethodName(endpoint);
        const params = endpoint.parameters || [];
        const hasBody = ['post', 'put', 'patch'].includes(endpoint.method);
        const bodyParams = endpoint.requestBody?.content?.['application/json']?.schema?.properties || {};

        const paramInputs = params.map(param => {
            if (param.in === 'query' || param.in === 'path') {
                return `              <div class="form-group">
                <label>${param.name}${param.required ? ' *' : ''}</label>
                <input v-model="${methodName}Data.${param.name}" type="text" placeholder="${param.description || param.name}" class="test-input" />
              </div>`;
            }
            return '';
        }).filter(Boolean).join('\n');

        const bodyInputs = Object.entries(bodyParams).map(([name, param]) => `
              <div class="form-group">
                <label>${name}${param.required ? ' *' : ''}</label>
                <input v-model="${methodName}Data.${name}" type="text" placeholder="${param.description || name}" class="test-input" />
              </div>`).join('');

        return paramInputs + bodyInputs;
    }

    // Generate markdown page
    generateMarkdownPage(apiGroup, componentName) {
        return `---
layout: page
---

Welcome to the **${toTitleCase(apiGroup)} API** documentation. This interactive documentation allows you to test API endpoints directly from this page.

<${componentName} />

<script setup>
import ${componentName} from '../../.vitepress/theme/components/${componentName}.vue'
</script>
`;
    }

    // Generate Vue styles (same as InteractiveTradingAPI.vue)
    generateVueStyles() {
        return `<style scoped>
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

/* Add all other styles from InteractiveTradingAPI.vue */
/* ... (styles would continue here) ... */
</style>`;
    }

    // Main execution
    async run() {
        try {
            console.log('🚀 Starting Enhanced Swagger Generator...');

            // Fetch swagger definition
            console.log('📡 Fetching Swagger definition...');
            this.swagger = await this.fetchSwaggerDefinition();

            // Group endpoints
            console.log('📊 Grouping endpoints...');
            const groups = this.groupEndpoints(this.swagger);

            // Ensure output directories exist
            if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
            if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true });

            // Generate components for each group
            for (const [groupName, endpoints] of Object.entries(groups)) {
                console.log(`✨ Generating ${groupName} component...`);

                const componentName = `Interactive${toTitleCase(groupName)}API`;
                const vueComponent = this.generateVueTemplate(groupName, endpoints);
                const markdownPage = this.generateMarkdownPage(groupName, componentName);

                // Write Vue component
                const vueFilePath = path.join(OUTPUT_DIR, `${componentName}.vue`);
                fs.writeFileSync(vueFilePath, vueComponent);

                // Write markdown page
                const mdFilePath = path.join(DOCS_DIR, `${groupName}.md`);
                fs.writeFileSync(mdFilePath, markdownPage);

                console.log(`  ✅ Generated ${componentName}.vue`);
                console.log(`  ✅ Generated ${groupName}.md`);
            }

            console.log('🎉 Generation completed successfully!');
            console.log(`📁 Components: ${OUTPUT_DIR}`);
            console.log(`📁 Pages: ${DOCS_DIR}`);

        } catch (error) {
            console.error('❌ Error during generation:', error.message);
            process.exit(1);
        }
    }
}

// Execute if run directly
if (require.main === module) {
    const generator = new SwaggerGenerator();
    generator.run();
}

module.exports = SwaggerGenerator; 