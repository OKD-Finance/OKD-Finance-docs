const fs = require('fs');

// HTML escape function for safe embedding in Vue templates
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Generate code examples for all 5 languages with HTML escaping
function generateCodeExamples(endpoint, method, params, endpointId) {
  const functionName = `${method}${endpoint.replace(/[\/\-]/g, '')}`;

  // Generate example data
  let exampleData = {};
  params.forEach(param => {
    if (param.type === 'boolean') {
      exampleData[param.name] = true;
    } else if (param.type === 'integer') {
      exampleData[param.name] = 123;
    } else {
      exampleData[param.name] = `example_${param.name}`;
    }
  });

  const codes = {
    curl: `curl -X ${method.toUpperCase()} "https://develop.okd.finance/api${endpoint}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(exampleData)}'`,

    go: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func ${functionName}(token string) error {
    data := map[string]interface{}{
${Object.entries(exampleData).map(([key, value]) => `        "${key}": ${JSON.stringify(value)},`).join('\n')}
    }
    
    jsonData, _ := json.Marshal(data)
    
    req, _ := http.NewRequest("${method.toUpperCase()}", "https://develop.okd.finance/api${endpoint}", bytes.NewBuffer(jsonData))
    req.Header.Set("Authorization", "Bearer "+token)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    return nil
}`,

    typescript: `interface RequestData {
${params.map(param => `  ${param.name}: ${param.type === 'boolean' ? 'boolean' : param.type === 'integer' ? 'number' : 'string'};`).join('\n')}
}

async function ${functionName}(
  baseUrl: string,
  accessToken: string,
  data: RequestData
): Promise<any> {
  const response = await fetch(\`\${baseUrl}${endpoint}\`, {
    method: '${method.toUpperCase()}',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}`,

    php: `<?php

function ${functionName}($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '${endpoint}';
    
    $headers = [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json'
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => '${method.toUpperCase()}',
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true
    ]);

    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

?>`,

    python: `import requests

def ${functionName}(base_url: str, access_token: str, data: dict):
    url = f"{base_url}${endpoint}"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.${method.toLowerCase()}(url, headers=headers, json=data)
    return response.json()`
  };

  // Apply HTML escaping to all code examples to prevent Vue parsing issues
  Object.keys(codes).forEach(lang => {
    codes[lang] = escapeHtml(codes[lang]);
  });

  return codes;
}

// Update navigation with duplicate checking
function updateNavigation(apiName, displayName) {
  const configPath = 'docs/.vitepress/config.ts';

  if (!fs.existsSync(configPath)) {
    console.log('❌ VitePress config file not found');
    return false;
  }

  let configContent = fs.readFileSync(configPath, 'utf8');

  // Check if already exists (both singular and plural forms)
  const singularForm = apiName.endsWith('s') ? apiName.slice(0, -1) : apiName;
  const pluralForm = apiName.endsWith('s') ? apiName : apiName + 's';

  if (configContent.includes(`'link': '/en/api/${apiName}'`) ||
    configContent.includes(`'link': '/en/api/${singularForm}'`) ||
    configContent.includes(`'link': '/en/api/${pluralForm}'`)) {
    console.log(`ℹ️  ${displayName} already exists in navigation`);
    return true;
  }

  // Find and replace the Overview section
  const overviewRegex = /([\s\S]*?)(\s+{\s*\n\s+'text': 'Overview',\s*\n\s+'link': '\/en\/api\/overview'\s*\n\s+},)([\s\S]*)/;
  const match = configContent.match(overviewRegex);

  if (match) {
    const before = match[1];
    const overview = match[2];
    const after = match[3];

    const newEntry = `\n                        {\n                            'text': '${displayName}',\n                            'link': '/en/api/${apiName}'\n                        },`;

    const updatedContent = before + overview + newEntry + after;

    fs.writeFileSync(configPath, updatedContent);
    console.log(`✅ Added ${displayName} to navigation`);
    return true;
  }

  console.log('❌ Could not find Overview section in navigation');
  return false;
}

// Generate Vue component with proper HTML escaping
function generateAPIComponent(endpoints, componentName, displayName, apiName) {
  console.log(`🚀 Generating ${displayName} component...`);
  console.log(`📊 Found ${endpoints.length} endpoints`);

  // Generate code examples for all endpoints
  let endpointSections = '';
  let scriptData = '';
  let scriptMethods = '';

  endpoints.forEach((endpoint, index) => {
    const endpointId = index + 1;
    const codes = generateCodeExamples(endpoint.path, endpoint.method, endpoint.parameters, endpointId);

    // Generate parameters HTML
    let parametersHtml = '';
    endpoint.parameters.forEach(param => {
      parametersHtml += `            <div class="param-item">
              <span class="param-name">${param.name}</span>
              <span class="param-type">${param.type}</span>
              <span class="param-desc">${param.description}</span>
            </div>
`;
    });

    // Generate form fields
    let formFields = '';
    endpoint.parameters.forEach(param => {
      if (param.type === 'boolean') {
        formFields += `              <div class="form-group">
                <label>
                  <input v-model="testData${endpointId}.${param.name}" type="checkbox" />
                  ${param.name.charAt(0).toUpperCase() + param.name.slice(1)}
                </label>
              </div>
`;
      } else {
        formFields += `              <div class="form-group">
                <label>${param.name.charAt(0).toUpperCase() + param.name.slice(1)}:</label>
                <input v-model="testData${endpointId}.${param.name}" type="${param.type === 'integer' ? 'number' : 'text'}" placeholder="${param.type === 'integer' ? '123' : 'example_' + param.name}" class="form-control" />
              </div>
`;
      }
    });

    // Generate test data
    let testDataFields = '';
    endpoint.parameters.forEach(param => {
      if (param.type === 'boolean') {
        testDataFields += `${param.name}: true, `;
      } else if (param.type === 'integer') {
        testDataFields += `${param.name}: 123, `;
      } else {
        testDataFields += `${param.name}: 'example_${param.name}', `;
      }
    });

    scriptData += `const testData${endpointId} = reactive({ ${testDataFields}})
const testResult${endpointId} = ref(null)
const activeCodeTab${endpointId} = ref('cURL')
`;

    // Generate test method
    scriptMethods += `
async function testEndpoint${endpointId}() {
  try {
    const response = await fetch(\`\${getRawValues().apiBaseUrl}${endpoint.path}\`, {
      method: '${endpoint.method.toUpperCase()}',
      headers: {
        'Authorization': \`Bearer \${getRawValues().apiToken}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData${endpointId})
    })
    
    const data = await response.text()
    testResult${endpointId}.value = {
      status: response.status,
      timestamp: new Date().toLocaleTimeString(),
      data: data || 'Success'
    }
  } catch (error) {
    testResult${endpointId}.value = {
      status: 'Error',
      timestamp: new Date().toLocaleTimeString(),
      data: error.message
    }
  }
}
`;

    // Get method badge class
    const methodClass = endpoint.method.toLowerCase();

    // Generate endpoint section HTML with escaped code examples
    endpointSections += `
      <!-- Endpoint ${endpointId}: ${endpoint.method.toUpperCase()} ${endpoint.path} -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <h2>
            <span class="method-badge ${methodClass}">${endpoint.method.toUpperCase()}</span>
            ${endpoint.path}
          </h2>
          <p class="endpoint-description">${endpoint.summary}</p>
        </div>

        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <h4>📋 Parameters</h4>
${parametersHtml}

            <h4>💻 Code Examples</h4>
            <div class="code-examples">
              <div class="code-tabs">
                <button @click="activeCodeTab${endpointId} = 'cURL'" :class="{ active: activeCodeTab${endpointId} === 'cURL' }" class="code-tab">cURL</button>
                <button @click="activeCodeTab${endpointId} = 'Go'" :class="{ active: activeCodeTab${endpointId} === 'Go' }" class="code-tab">Go</button>
                <button @click="activeCodeTab${endpointId} = 'TypeScript'" :class="{ active: activeCodeTab${endpointId} === 'TypeScript' }" class="code-tab">TypeScript</button>
                <button @click="activeCodeTab${endpointId} = 'PHP'" :class="{ active: activeCodeTab${endpointId} === 'PHP' }" class="code-tab">PHP</button>
                <button @click="activeCodeTab${endpointId} = 'Python'" :class="{ active: activeCodeTab${endpointId} === 'Python' }" class="code-tab">Python</button>
              </div>

              <div v-show="activeCodeTab${endpointId} === 'cURL'" class="code-block-container">
                <button @click="copyCodeToClipboard('curl', ${endpointId})" class="copy-code-btn">📋</button>
                <div class="code-block">
                  <pre>${codes.curl}</pre>
                </div>
              </div>

              <div v-show="activeCodeTab${endpointId} === 'Go'" class="code-block-container">
                <button @click="copyCodeToClipboard('go', ${endpointId})" class="copy-code-btn">📋</button>
                <div class="code-block">
                  <pre>${codes.go}</pre>
                </div>
              </div>

              <div v-show="activeCodeTab${endpointId} === 'TypeScript'" class="code-block-container">
                <button @click="copyCodeToClipboard('typescript', ${endpointId})" class="copy-code-btn">📋</button>
                <div class="code-block">
                  <pre>${codes.typescript}</pre>
                </div>
              </div>

              <div v-show="activeCodeTab${endpointId} === 'PHP'" class="code-block-container">
                <button @click="copyCodeToClipboard('php', ${endpointId})" class="copy-code-btn">📋</button>
                <div class="code-block">
                  <pre>${codes.php}</pre>
                </div>
              </div>

              <div v-show="activeCodeTab${endpointId} === 'Python'" class="code-block-container">
                <button @click="copyCodeToClipboard('python', ${endpointId})" class="copy-code-btn">📋</button>
                <div class="code-block">
                  <pre>${codes.python}</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🧪 Live Testing</h4>
            <div class="test-section">
${formFields}
              <button @click="testEndpoint${endpointId}" :disabled="!getRawValues().apiToken || !getRawValues().apiBaseUrl" class="test-btn">
                🚀 Test ${endpoint.method.toUpperCase()} ${endpoint.path}
              </button>
              <div v-if="testResult${endpointId}" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ testResult${endpointId}.status }}</span>
                  <span class="timestamp">{{ testResult${endpointId}.timestamp }}</span>
                </div>
                <pre class="result-data">{{ testResult${endpointId}.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
`;
  });

  // Copy styling from InteractiveTradingAPI.vue
  const tradingApiPath = 'docs/.vitepress/theme/components/InteractiveTradingAPI.vue';
  let styling = '';

  if (fs.existsSync(tradingApiPath)) {
    const tradingApiContent = fs.readFileSync(tradingApiPath, 'utf8');
    const styleMatch = tradingApiContent.match(/<style scoped>([\s\S]*?)<\/style>/);
    if (styleMatch) {
      styling = styleMatch[1];
    }
  }

  // Create the full component with proper HTML escaping
  const component = `<template>
  <div class="auth-header-fixed" :class="{ 'collapsed': isHeaderCollapsed }">
    <div class="auth-container">
      <div class="auth-title">
        <h4>🔐 API Authentication</h4>
        <button @click="toggleHeader" class="collapse-toggle">
          {{ isHeaderCollapsed ? '⬇️' : '⬆️' }}
        </button>
      </div>
      
      <div v-show="!isHeaderCollapsed" class="auth-content">
        <div class="auth-fields">
          <div class="field-group">
            <label>API Base URL:</label>
            <input 
              v-model="apiBaseUrl" 
              type="text" 
              placeholder="https://develop.okd.finance/api"
              class="auth-input"
            />
          </div>
          <div class="field-group">
            <label>Access Token:</label>
            <input 
              v-model="apiToken" 
              type="password" 
              placeholder="Enter your access token"
              class="auth-input"
            />
          </div>
        </div>
        
        <div class="auth-status">
          <span v-if="getRawValues().apiToken" class="status-connected">🟢 Token Set</span>
          <span v-else class="status-disconnected">🔴 No Token</span>
        </div>
      </div>
    </div>
  </div>

  <div class="api-container">
    <div class="api-header">
      <h1>🔧 ${displayName}</h1>
      <p class="api-description">Interactive API documentation with live testing capabilities</p>
    </div>

    <div class="endpoints-container">
${endpointSections}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth.js'

const { 
  apiToken, 
  apiBaseUrl, 
  isHeaderCollapsed, 
  toggleHeader,
  getRawValues
} = useAuth()

${scriptData}

${scriptMethods}

// Copy code to clipboard functionality
function copyCodeToClipboard(language, endpointId) {
  const codeExamples = {
${endpoints.map((endpoint, index) => {
    const codes = generateCodeExamples(endpoint.path, endpoint.method, endpoint.parameters, index + 1);
    return `    ${index + 1}: {
      curl: \`${codes.curl.replace(/`/g, '\\`')}\`,
      go: \`${codes.go.replace(/`/g, '\\`')}\`,
      typescript: \`${codes.typescript.replace(/`/g, '\\`')}\`,
      php: \`${codes.php.replace(/`/g, '\\`')}\`,
      python: \`${codes.python.replace(/`/g, '\\`')}\`
    }`;
  }).join(',\n')}
  }

  const code = codeExamples[endpointId]?.[language]
  if (code) {
    // Unescape HTML entities for clipboard
    const unescapedCode = code
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
    
    navigator.clipboard.writeText(unescapedCode).then(() => {
      console.log('Code copied to clipboard')
    }).catch(err => {
      console.error('Failed to copy code: ', err)
    })
  }
}
</script>

<style scoped>
${styling}
</style>`;

  return component;
}

// Generate User API specifically
function generateUserAPI() {
  const endpoints = [
    {
      path: '/user/flags',
      method: 'put',
      summary: 'Set Profile Flags',
      description: 'Set profile flags of current user',
      parameters: [
        { name: 'flags', type: 'integer', description: 'Profile flags value' }
      ]
    },
    {
      path: '/user/notifications',
      method: 'patch',
      summary: 'Subscribe to Notifications',
      description: 'Subscribe to notifications',
      parameters: [
        { name: 'enabled', type: 'boolean', description: 'Enable or disable notifications' }
      ]
    },
    {
      path: '/user/profile',
      method: 'patch',
      summary: 'Subscribe to Profile Events',
      description: 'Subscribe to profile events',
      parameters: [
        { name: 'subscribe', type: 'boolean', description: 'Subscribe to profile events' }
      ]
    }
  ];

  const component = generateAPIComponent(endpoints, 'InteractiveUserAPI', 'User API', 'users');

  // Write component file
  const componentPath = 'docs/.vitepress/theme/components/InteractiveUserAPI.vue';
  fs.writeFileSync(componentPath, component);
  console.log('✅ Generated InteractiveUserAPI.vue');

  // Generate markdown page
  const markdownContent = `---
layout: page
---

Welcome to the **User API** documentation. This interactive documentation allows you to test API endpoints directly from this page.

<InteractiveUserAPI />

<script setup>
import InteractiveUserAPI from '../../.vitepress/theme/components/InteractiveUserAPI.vue'
</script>`;

  fs.writeFileSync('docs/en/api/users.md', markdownContent);
  console.log('✅ Generated users.md');

  // Create singular form as well
  fs.writeFileSync('docs/en/api/user.md', markdownContent);
  console.log('✅ Generated user.md');

  // Update navigation
  updateNavigation('users', 'User API');

  console.log('🎉 User API generation completed with proper HTML escaping!');
}

// Run the generator
generateUserAPI(); 