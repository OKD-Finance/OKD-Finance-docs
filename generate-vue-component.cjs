const fs = require('fs');

// Generate Vue component exactly like InteractiveTradingAPI.vue
async function generateVueComponent(componentName, displayName, endpoints, apiName) {
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

    // Generate endpoints sections HTML
    let endpointSections = '';
    let scriptData = '';
    let scriptMethods = '';
    let codeExamples = '';

    endpoints.forEach((endpoint, index) => {
        const endpointId = index + 1;
        const functionName = endpoint.operationId || `${endpoint.method}${endpoint.path.replace(/[\/\-]/g, '')}`;

        const params = endpoint.parameters || [];

        // Generate code examples
        const CodeGenerators = require('./universal-api-generator.cjs').CodeGenerators;
        const curlCode = generateCurl(endpoint.path, endpoint.method, params);
        const goCode = generateGo(endpoint.path, endpoint.method, params, functionName);
        const tsCode = generateTypeScript(endpoint.path, endpoint.method, params, functionName);
        const phpCode = generatePHP(endpoint.path, endpoint.method, params, functionName);
        const pythonCode = generatePython(endpoint.path, endpoint.method, params, functionName);

        // Store code examples for copying
        codeExamples += `    ${endpointId}: {
      curl: \`${curlCode}\`,
      go: \`${goCode}\`,
      typescript: \`${tsCode}\`,
      php: \`${phpCode}\`,
      python: \`${pythonCode}\`
    },
`;

        // Generate parameters HTML
        let parametersHtml = '';
        params.forEach(param => {
            parametersHtml += `            <div class="param-item">
              <span class="param-name">${param.name}</span>
              <span class="param-type">${param.type}</span>
              <span class="param-desc">${param.description || 'Parameter description'}</span>
            </div>
`;
        });

        // Generate form fields
        let formFields = '';
        params.forEach(param => {
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
        params.forEach(param => {
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

        // Generate endpoint section HTML
        endpointSections += `
      <!-- Endpoint ${endpointId}: ${endpoint.method.toUpperCase()} ${endpoint.path} -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <h2>
            <span class="method-badge ${methodClass}">${endpoint.method.toUpperCase()}</span>
            ${endpoint.path}
          </h2>
          <p class="endpoint-description">${endpoint.summary || endpoint.description || 'API endpoint'}</p>
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
                  <pre>${curlCode}</pre>
                </div>
              </div>

              <div v-show="activeCodeTab${endpointId} === 'Go'" class="code-block-container">
                <button @click="copyCodeToClipboard('go', ${endpointId})" class="copy-code-btn">📋</button>
                <div class="code-block">
                  <pre>${goCode}</pre>
                </div>
              </div>

              <div v-show="activeCodeTab${endpointId} === 'TypeScript'" class="code-block-container">
                <button @click="copyCodeToClipboard('typescript', ${endpointId})" class="copy-code-btn">📋</button>
                <div class="code-block">
                  <pre>${tsCode}</pre>
                </div>
              </div>

              <div v-show="activeCodeTab${endpointId} === 'PHP'" class="code-block-container">
                <button @click="copyCodeToClipboard('php', ${endpointId})" class="copy-code-btn">📋</button>
                <div class="code-block">
                  <pre>${phpCode}</pre>
                </div>
              </div>

              <div v-show="activeCodeTab${endpointId} === 'Python'" class="code-block-container">
                <button @click="copyCodeToClipboard('python', ${endpointId})" class="copy-code-btn">📋</button>
                <div class="code-block">
                  <pre>${pythonCode}</pre>
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

    // Create the full component
    const component = `<template>
  <div class="auth-header-fixed" :class="{ 'collapsed': isHeaderCollapsed }">
    <div class="auth-container">
      <div class="auth-title">
        <h4>🔐 API Authentication</h4>
        <button @click="toggleHeader" class="collapse-toggle">
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
            <button @click="showToken = !showToken" class="token-toggle">
              {{ showToken ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>
      </div>
      <div class="status-row">
        <div v-if="getRawValues().apiBaseUrl" class="url-status">🌐 API: {{ getRawValues().apiBaseUrl }}</div>
        <div v-if="getRawValues().apiToken" class="token-status">✅ Token configured</div>
        <button v-if="getRawValues().apiToken" @click="clearAuth" class="clear-auth-btn">🗑️ Clear Auth</button>
      </div>
    </div>
  </div>

  <div class="interactive-api-container">
    <div class="main-content">
      <h1>🔧 ${displayName}</h1>
      <p>Interactive API documentation with live testing and code examples in 5 programming languages.</p>
      
      <div class="endpoints-info">
        <h3>📊 Available Endpoints (${endpoints.length})</h3>
        <ul>
${endpoints.map((endpoint, index) => `          <li><strong>${endpoint.method.toUpperCase()}</strong> ${endpoint.path} - ${endpoint.summary || endpoint.description || 'API endpoint'}</li>`).join('\n')}
        </ul>
      </div>

${endpointSections}
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'

const {
  apiToken,
  apiBaseUrl,
  showToken,
  isHeaderCollapsed,
  toggleHeader,
  clearAuth,
  getRawValues
} = useAuth()

// Code tab states and test data
${scriptData}

// Test functions
${scriptMethods}

// Copy code to clipboard
function copyCodeToClipboard(language, endpoint) {
  const codes = {
${codeExamples}  }
  
  const code = codes[endpoint]?.[language] || ''
  navigator.clipboard.writeText(code)
}
</script>

<style scoped>
${styling}
</style>`;

    // Write component file
    const componentPath = `docs/.vitepress/theme/components/${componentName}.vue`;
    fs.writeFileSync(componentPath, component);
    console.log(`✅ Generated ${componentName}.vue`);

    // Generate markdown page
    const markdownContent = `---
layout: page
---

Welcome to the **${displayName}** documentation. This interactive documentation allows you to test API endpoints directly from this page.

<${componentName} />

<script setup>
import ${componentName} from '../../.vitepress/theme/components/${componentName}.vue'
</script>
`;

    const markdownPath = `docs/en/api/${apiName}.md`;
    fs.writeFileSync(markdownPath, markdownContent);
    console.log(`✅ Generated ${apiName}.md`);
}

// Helper functions for code generation
function generateCurl(endpoint, method, params) {
    const baseUrl = 'https://develop.okd.finance/api';
    let curlCmd = `curl -X ${method.toUpperCase()} "${baseUrl}${endpoint}" \\\\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\\\
  -H "Content-Type: application/json"`;

    if (method.toLowerCase() !== 'get' && params.length > 0) {
        const bodyExample = {};
        params.forEach(param => {
            if (param.type === 'boolean') {
                bodyExample[param.name] = true;
            } else if (param.type === 'integer') {
                bodyExample[param.name] = 123;
            } else {
                bodyExample[param.name] = `example_${param.name}`;
            }
        });
        curlCmd += ` \\\\
  -d '${JSON.stringify(bodyExample)}'`;
    }

    return curlCmd;
}

function generateGo(endpoint, method, params, functionName) {
    const structName = functionName.charAt(0).toUpperCase() + functionName.slice(1) + 'Request';

    let structFields = '';
    let dataFields = '';

    params.forEach(param => {
        const goType = param.type === 'boolean' ? 'bool' : param.type === 'integer' ? 'int' : 'string';
        structFields += `    ${param.name.charAt(0).toUpperCase() + param.name.slice(1)} ${goType} \\`json: "${param.name}"\\`\\n`;

        if (param.type === 'boolean') {
            dataFields += `        ${param.name.charAt(0).toUpperCase() + param.name.slice(1)}: true,\\n`;
        } else if (param.type === 'integer') {
            dataFields += `        ${param.name.charAt(0).toUpperCase() + param.name.slice(1)}: 123,\\n`;
        } else {
            dataFields += `        ${param.name.charAt(0).toUpperCase() + param.name.slice(1)}: "example_${param.name}",\\n`;
        }
    });

    return `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type ${structName} struct {
${structFields}}

func ${functionName}(token string, data ${structName}) error {
    url := "https://develop.okd.finance/api${endpoint}"
    
    jsonData, _ := json.Marshal(data)
    
    req, _ := http.NewRequest("${method.toUpperCase()}", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Authorization", "Bearer "+token)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    return nil
}`;
}

function generateTypeScript(endpoint, method, params, functionName) {
    let interfaceFields = '';
    let exampleData = '';

    params.forEach(param => {
        const tsType = param.type === 'boolean' ? 'boolean' : param.type === 'integer' ? 'number' : 'string';
        interfaceFields += `  ${param.name}: ${tsType};\\n`;

        if (param.type === 'boolean') {
            exampleData += `    ${param.name}: true,\\n`;
        } else if (param.type === 'integer') {
            exampleData += `    ${param.name}: 123,\\n`;
        } else {
            exampleData += `    ${param.name}: "example_${param.name}",\\n`;
        }
    });

    const requestInterface = functionName.charAt(0).toUpperCase() + functionName.slice(1) + 'Request';

    return `interface ${requestInterface} {
${interfaceFields}}

async function ${functionName}(
  baseUrl: string,
  accessToken: string,
  data: ${requestInterface}
): Promise&lt;any&gt; {
  const response = await fetch(\\`\\${ baseUrl }${ endpoint } \\`, {
    method: '${method.toUpperCase()}',
    headers: {
      'Authorization': \\`Bearer \\${ accessToken } \\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}`;
}

function generatePHP(endpoint, method, params, functionName) {
    let exampleData = '';

    params.forEach(param => {
        if (param.type === 'boolean') {
            exampleData += `        '${param.name}' => true,\\n`;
        } else if (param.type === 'integer') {
            exampleData += `        '${param.name}' => 123,\\n`;
        } else {
            exampleData += `        '${param.name}' => 'example_${param.name}',\\n`;
        }
    });

    return `&lt;?php

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

?&gt;`;
}

function generatePython(endpoint, method, params, functionName) {
    let exampleData = '';

    params.forEach(param => {
        if (param.type === 'boolean') {
            exampleData += `        '${param.name}': True,\\n`;
        } else if (param.type === 'integer') {
            exampleData += `        '${param.name}': 123,\\n`;
        } else {
            exampleData += `        '${param.name}': 'example_${param.name}',\\n`;
        }
    });

    return `import requests

def ${functionName}(base_url: str, access_token: str, data: dict):
    url = f"{base_url}${endpoint}"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.${method.toLowerCase()}(url, headers=headers, json=data)
    return response.json()`;
}

module.exports = { generateVueComponent }; 