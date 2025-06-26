const fs = require('fs');

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

            const [fullMatch, beforeItems, itemsContent, afterItems] = match;

            // Check if API already exists
            if (itemsContent.includes(`'text': '${apiName}'`)) {
                console.log(`ℹ️  ${apiName} already exists in navigation`);
                return true;
            }

            // Create new API entry
            let newApiEntry;
            if (subItems.length > 0) {
                const subItemsStr = subItems.map(item =>
                    `                                { 'text': '${item.text}', 'link': '${item.link}' }`
                ).join(',\n');

                newApiEntry = `                        {
                            'text': '${apiName}',
                            'link': '${apiLink}',
                            'collapsed': true,
                            'items': [
${subItemsStr}
                            ]
                        },`;
            } else {
                newApiEntry = `                        {
                            'text': '${apiName}',
                            'link': '${apiLink}'
                        },`;
            }

            // Insert after Overview but before other APIs
            let updatedItemsContent = itemsContent;
            const overviewIndex = itemsContent.indexOf("'text': 'Overview'");

            if (overviewIndex !== -1) {
                // Find the end of Overview entry
                const overviewEnd = itemsContent.indexOf('},', overviewIndex) + 2;
                const beforeOverviewEnd = itemsContent.substring(0, overviewEnd);
                const afterOverviewEnd = itemsContent.substring(overviewEnd);

                updatedItemsContent = beforeOverviewEnd + '\n' + newApiEntry + afterOverviewEnd;
            } else {
                // If no Overview, add at the beginning
                updatedItemsContent = newApiEntry + '\n' + itemsContent;
            }

            // Replace the content
            const newConfigContent = configContent.replace(
                apiSectionRegex,
                beforeItems + updatedItemsContent + afterItems
            );

            fs.writeFileSync(this.configPath, newConfigContent, 'utf8');
            console.log(`✅ Added ${apiName} to navigation`);
            return true;

        } catch (error) {
            console.error('❌ Error updating navigation:', error.message);
            return false;
        }
    }
}

// HTML escape function
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

// Generate Vue component with authentication integration
function generateVueComponent(apiName, endpoints) {
    const componentTemplate = `<template>
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
      </div>
      <div class="api-config-row">
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
        <div class="config-group">
          <label class="config-label">🎲 Generate Fingerprint</label>
          <button @click="generateAndSetFingerprint" class="generate-btn">
            🎲 Generate Random Fingerprint
          </button>
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
${endpoints.map((endpoint, index) => generateEndpointSection(endpoint, index + 1)).join('\n\n')}
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

${endpoints.map((endpoint, index) => generateTestData(endpoint, index + 1)).join('\n')}

const generateFingerprint = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const generateAndSetFingerprint = () => {
  apiFingerprint.value = generateFingerprint()
}

const results = reactive({
${endpoints.map((_, index) => `  endpoint${index + 1}: null`).join(',\n')}
})

${endpoints.map((endpoint, index) => generateTestFunction(endpoint, index + 1)).join('\n\n')}

${generateCopyFunction()}

${generateCodeExamples(endpoints)}
</script>

<style scoped>
${generateStyles()}
</style>`;

    return componentTemplate;
}

// Generate endpoint section
function generateEndpointSection(endpoint, index) {
    const methodBadge = endpoint.method.toLowerCase();
    const methodColors = {
        'get': 'get',
        'post': 'post',
        'put': 'put',
        'patch': 'patch',
        'delete': 'delete'
    };

    return `      <section id="endpoint-${index}" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge ${methodColors[methodBadge] || methodBadge}">${endpoint.method.toUpperCase()}</span>
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
                ${generateCodeBlocks(endpoint, index)}
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              ${endpoint.parameters.map(param => generateFormField(param, index)).join('\n              ')}
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

// Main generator function
function generateAuthenticationAPI() {
    const endpoints = [
        {
            method: 'POST',
            path: '/auth/login',
            title: 'User Login',
            description: 'Authenticate user with email and password',
            parameters: [
                { name: 'email', type: 'string', description: 'User email address' },
                { name: 'password', type: 'string', description: 'User password' }
            ]
        },
        {
            method: 'POST',
            path: '/auth/register',
            title: 'User Registration',
            description: 'Register a new user account',
            parameters: [
                { name: 'email', type: 'string', description: 'User email address' },
                { name: 'password', type: 'string', description: 'User password' },
                { name: 'firstName', type: 'string', description: 'User first name' },
                { name: 'lastName', type: 'string', description: 'User last name' }
            ]
        },
        {
            method: 'POST',
            path: '/auth/refresh',
            title: 'Refresh Token',
            description: 'Refresh authentication token',
            parameters: [
                { name: 'refreshToken', type: 'string', description: 'Refresh token' }
            ]
        }
    ];

    // Generate Vue component
    const componentContent = generateVueComponent('Authentication API', endpoints);

    // Write component file
    const componentPath = 'docs/.vitepress/theme/components/InteractiveAuthAPI.vue';
    fs.writeFileSync(componentPath, componentContent, 'utf8');
    console.log(`✅ Generated ${componentPath}`);

    // Generate markdown pages
    const singularPage = `# Authentication API

<script setup>
import InteractiveAuthAPI from '../.vitepress/theme/components/InteractiveAuthAPI.vue'
</script>

<InteractiveAuthAPI />
`;

    const pluralPage = `# Authentication API

<script setup>
import InteractiveAuthAPI from '../.vitepress/theme/components/InteractiveAuthAPI.vue'
</script>

<InteractiveAuthAPI />
`;

    fs.writeFileSync('docs/en/api/authentication.md', singularPage, 'utf8');
    fs.writeFileSync('docs/en/api/auth.md', pluralPage, 'utf8');
    console.log('✅ Generated authentication.md and auth.md pages');

    // Update navigation
    const navUpdater = new NavigationUpdater();
    const subItems = endpoints.map((endpoint, index) => ({
        text: `${endpoint.method.toUpperCase()} ${endpoint.path}`,
        link: `/en/api/authentication#endpoint-${index + 1}`
    }));

    navUpdater.addApiToNavigation('Authentication API', '/en/api/authentication', subItems);

    console.log('🎉 Authentication API generation completed!');
}

// Helper functions (shortened for brevity)
function generateTestData(endpoint, index) {
    const defaultValues = endpoint.parameters.map(param => {
        if (param.type === 'boolean') return `${param.name}: true`;
        if (param.type === 'integer') return `${param.name}: 123`;
        return `${param.name}: 'example_${param.name}'`;
    }).join(', ');

    return `const testData${index} = reactive({ ${defaultValues} })`;
}

function generateTestFunction(endpoint, index) {
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

function generateFormField(param, index) {
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

function generateCodeBlocks(endpoint, index) {
    return `
                <div v-show="activeCodeTab${index} === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X ${endpoint.method.toUpperCase()} &quot;https://develop.okd.finance/api${endpoint.path}&quot; \\
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \\
  -H &quot;Content-Type: application/json&quot; \\
  -H &quot;Fingerprint: 1358cd229b6bceb25941e99f4228997f&quot; \\
  -d &#x27;{${endpoint.parameters.map(p => `&quot;${p.name}&quot;:&quot;example&quot;`).join(',')}}&#x27;</pre>
                  </div>
                </div>`;
}

function generateCopyFunction() {
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
    code = code.replace(/1358cd229b6bceb25941e99f4228997f/g, authValues.apiFingerprint || '1358cd229b6bceb25941e99f4228997f')
    code = code.replace(/https:\\/\\/develop\\.okd\\.finance\\/api/g, authValues.apiBaseUrl || 'https://develop.okd.finance/api')
    
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy code:', err)
    })
  }
}`;
}

function generateCodeExamples(endpoints) {
    return `const codeExamples = {
  curl: {
    ${endpoints.map((endpoint, index) => `${index + 1}: \`curl -X ${endpoint.method.toUpperCase()} "https://develop.okd.finance/api${endpoint.path}" \\\\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\\\
  -H "Content-Type: application/json" \\\\
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f" \\\\
  -d '{${endpoint.parameters.map(p => `"${p.name}":"example"`).join(',')}}'\``).join(',\n    ')}
  }
}`;
}

function generateStyles() {
    return `/* Authentication Header Styles */
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

.api-config-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 0.65rem;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
  max-height: 200px;
  opacity: 1;
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

.generate-btn {
  padding: 0.75rem 1rem;
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  height: fit-content;
  margin-top: 1.5rem;
}

.method-badge.post {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.test-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.test-btn:disabled {
  background: #6b7280;
  cursor: not-allowed;
}`;
}

// Run the generator
if (require.main === module) {
    generateAuthenticationAPI();
}

module.exports = { NavigationUpdater, generateAuthenticationAPI }; 