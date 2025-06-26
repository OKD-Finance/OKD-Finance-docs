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
  -H "Fingerprint: 1358cd229b6bceb25941e99f4228997f" \\
  -d '${JSON.stringify(exampleData)}'`,

    go: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type ${functionName.charAt(0).toUpperCase() + functionName.slice(1)}Request struct {
${params.map(param => `    ${param.name.charAt(0).toUpperCase() + param.name.slice(1)} ${param.type === 'boolean' ? 'bool' : param.type === 'integer' ? 'int' : 'string'} \`json:"${param.name}"\``).join('\n')}
}

type ${functionName.charAt(0).toUpperCase() + functionName.slice(1)}Response struct {
    Message string \`json:"message"\`
    Success bool   \`json:"success"\`
}

func ${functionName}() (*${functionName.charAt(0).toUpperCase() + functionName.slice(1)}Response, error) {
    url := "https://develop.okd.finance/api${endpoint}"
    
    requestData := ${functionName.charAt(0).toUpperCase() + functionName.slice(1)}Request{
${Object.entries(exampleData).map(([key, value]) => `        ${key.charAt(0).toUpperCase() + key.slice(1)}: ${JSON.stringify(value)},`).join('\n')}
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return nil, err
    }
    
    req, err := http.NewRequest("${method.toUpperCase()}", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "1358cd229b6bceb25941e99f4228997f")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }
    
    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("API error: %s", string(body))
    }
    
    var response ${functionName.charAt(0).toUpperCase() + functionName.slice(1)}Response
    if err := json.Unmarshal(body, &response); err != nil {
        return nil, err
    }
    
    return &response, nil
}

func main() {
    result, err := ${functionName}()
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }
    
    fmt.Printf("Success: %v\\n", result.Success)
    fmt.Printf("Message: %s\\n", result.Message)
}`,

    typescript: `interface ${functionName.charAt(0).toUpperCase() + functionName.slice(1)}Request {
${params.map(param => `  ${param.name}: ${param.type === 'boolean' ? 'boolean' : param.type === 'integer' ? 'number' : 'string'};`).join('\n')}
}

interface ${functionName.charAt(0).toUpperCase() + functionName.slice(1)}Response {
  message: string;
  success: boolean;
}

interface ApiError {
  code: number;
  message: string;
}

async function ${functionName}(
  baseUrl: string,
  accessToken: string,
  data: ${functionName.charAt(0).toUpperCase() + functionName.slice(1)}Request
): Promise<${functionName.charAt(0).toUpperCase() + functionName.slice(1)}Response> {
  const response = await fetch(baseUrl + '${endpoint}', {
    method: '${method.toUpperCase()}',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      'Fingerprint': '1358cd229b6bceb25941e99f4228997f'
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as ApiError;
    throw new Error('API Error ' + error.code + ': ' + error.message);
  }

  return responseData as ${functionName.charAt(0).toUpperCase() + functionName.slice(1)}Response;
}

async function main(): Promise<void> {
  const requestData: ${functionName.charAt(0).toUpperCase() + functionName.slice(1)}Request = {
${Object.entries(exampleData).map(([key, value]) => `    ${key}: ${JSON.stringify(value)},`).join('\n')}
  };

  try {
    const result = await ${functionName}(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      requestData
    );
    
    console.log('Success:', result.success);
    console.log('Message:', result.message);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`,

    php: `<?php

function ${functionName}($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '${endpoint}';
    
    $headers = [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type': 'application/json',
        'Fingerprint': '1358cd229b6bceb25941e99f4228997f'
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => '${method.toUpperCase()}',
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
        $code = $data['code'] ?? $httpCode;
        throw new Exception("API Error {$code}: {$message}");
    }

    return $data;
}

try {
    $requestData = [
${Object.entries(exampleData).map(([key, value]) => `        '${key}' => ${JSON.stringify(value)},`).join('\n')}
    ];

    $result = ${functionName}(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $requestData
    );

    echo "Success: " . ($result['success'] ? 'true' : 'false') . "\\n";
    echo "Message: " . $result['message'] . "\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,

    python: `import requests
import json
from typing import Dict, Optional


class TradingAPIError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f"API Error {code}: {message}")


def ${functionName}(base_url: str, access_token: str, data: Dict) -> Dict:
    """${method.toUpperCase()} ${endpoint}"""
    url = f"{base_url}${endpoint}"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': '1358cd229b6bceb25941e99f4228997f'
    }
    
    try:
        response = requests.${method.toLowerCase()}(
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response_data = response.json()
        
        if not response.ok:
            error_code = response_data.get('code', response.status_code)
            error_message = response_data.get('message', 'Unknown API error')
            raise TradingAPIError(error_code, error_message)
        
        return response_data
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Network error: {e}")


def main():
    request_data = {
${Object.entries(exampleData).map(([key, value]) => `        '${key}': ${JSON.stringify(value)},`).join('\n')}
    }
    
    try:
        result = ${functionName}(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            request_data
        )
        
        print(f"Success: {result.get('success', False)}")
        print(f"Message: {result.get('message', 'No message')}")
        
    except (TradingAPIError, Exception) as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`
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

// Generate Vue component with exact InteractiveTradingAPI.vue structure
function generatePerfectUserAPI() {
  console.log('🚀 Generating Perfect User API component...');

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

  console.log(`📊 Found ${endpoints.length} endpoints`);

  // Generate endpoint sections exactly like InteractiveTradingAPI.vue
  let endpointSections = '';
  let scriptData = '';
  let scriptMethods = '';
  let codeExamplesObject = '';

  endpoints.forEach((endpoint, index) => {
    const endpointId = index + 1;
    const codes = generateCodeExamples(endpoint.path, endpoint.method, endpoint.parameters, endpointId);
    const methodClass = endpoint.method.toLowerCase();

    // Generate headers section
    const headersSection = `            <div class="api-section">
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

    // Generate body parameters section
    let bodyParametersSection = '';
    if (endpoint.parameters.length > 0) {
      let paramItems = '';
      endpoint.parameters.forEach(param => {
        paramItems += `                <div class="param-item required">
                  <code class="param-name">${param.name}</code>
                  <span class="param-type">${param.type}</span>
                  <span class="param-desc">${param.description}</span>
                </div>
`;
      });

      bodyParametersSection = `            <div class="api-section">
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
${paramItems}              </div>
            </div>`;
    }

    // Generate form fields for testing
    let formFields = '';
    endpoint.parameters.forEach(param => {
      if (param.type === 'boolean') {
        formFields += `              <div class="form-group">
                <label>${param.name.charAt(0).toUpperCase() + param.name.slice(1)}</label>
                <select v-model="testData${endpointId}.${param.name}" class="test-input">
                  <option :value="true">True</option>
                  <option :value="false">False</option>
                </select>
              </div>
`;
      } else if (param.type === 'integer') {
        formFields += `              <div class="form-group">
                <label>${param.name.charAt(0).toUpperCase() + param.name.slice(1)}</label>
                <input v-model.number="testData${endpointId}.${param.name}" type="number" placeholder="123" class="test-input" />
              </div>
`;
      } else {
        formFields += `              <div class="form-group">
                <label>${param.name.charAt(0).toUpperCase() + param.name.slice(1)}</label>
                <input v-model="testData${endpointId}.${param.name}" type="text" placeholder="example_${param.name}" class="test-input" />
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
`;

    // Generate test method exactly like InteractiveTradingAPI.vue
    scriptMethods += `
const testEndpoint${endpointId} = async () => {
  try {
    const authValues = getRawValues()
    const requestBody = {
${endpoint.parameters.map(param => `      ${param.name}: testData${endpointId}.${param.name},`).join('\n')}
    }

    const fullUrl = \`\${authValues.apiBaseUrl}${endpoint.path}\`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': \`Bearer \${authValues.apiToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: '${endpoint.method.toUpperCase()}',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint${endpointId} = {
      status: \`\${response.status} \${response.statusText}\`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: \`${endpoint.method.toUpperCase()} \${fullUrl}\`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint${endpointId} = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}
`;

    // Add to code examples object
    codeExamplesObject += `    ${endpointId}: {
      curl: \`${codes.curl.replace(/`/g, '\\`')}\`,
      go: \`${codes.go.replace(/`/g, '\\`')}\`,
      typescript: \`${codes.typescript.replace(/`/g, '\\`')}\`,
      php: \`${codes.php.replace(/`/g, '\\`')}\`,
      python: \`${codes.python.replace(/`/g, '\\`')}\`
    },
`;

    // Generate endpoint section exactly like InteractiveTradingAPI.vue
    endpointSections += `      <section id="endpoint-${endpointId}" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge ${methodClass}">${endpoint.method.toUpperCase()}</span>
              <span class="endpoint-path">${endpoint.path}</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 ${endpoint.summary}</h3>
              <p class="endpoint-description">${endpoint.description}</p>
            </div>

${headersSection}

${bodyParametersSection}

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab${endpointId} = lang"
                    :class="['code-tab', { active: activeCodeTab${endpointId} === lang }]">
                    {{ lang }}
                  </button>
                </div>

                <div v-show="activeCodeTab${endpointId} === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', ${endpointId})" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>${codes.curl}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${endpointId} === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', ${endpointId})" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>${codes.go}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${endpointId} === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', ${endpointId})" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>${codes.typescript}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${endpointId} === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', ${endpointId})" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>${codes.php}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${endpointId} === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', ${endpointId})" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>${codes.python}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">✅ Response Examples</h4>
              <div class="response-example">
                <div class="response-status success">200 OK - Success</div>
                <pre class="code-block">{
  "success": true,
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
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
${formFields}              <button @click="testEndpoint${endpointId}" class="test-btn"
                :disabled="!getRawValues().apiToken || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint${endpointId}" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint${endpointId}.status }}</span>
                  <span class="timestamp">{{ results.endpoint${endpointId}.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint${endpointId}.data, $event)" class="copy-btn">📋 Copy
                    Response</button>
                </div>
                <div v-if="results.endpoint${endpointId}.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint${endpointId}.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint${endpointId}.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint${endpointId}.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint${endpointId}.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

`;
  });

  // Copy exact styling from InteractiveTradingAPI.vue
  const tradingApiPath = 'docs/.vitepress/theme/components/InteractiveTradingAPI.vue';
  let styling = '';

  if (fs.existsSync(tradingApiPath)) {
    const tradingApiContent = fs.readFileSync(tradingApiPath, 'utf8');
    const styleMatch = tradingApiContent.match(/<style scoped>([\s\S]*?)<\/style>/);
    if (styleMatch) {
      styling = styleMatch[1];
    }
  }

  // Create the perfect component exactly like InteractiveTradingAPI.vue
  const component = `<template>
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
      <div class="status-row">
        <div v-if="getRawValues().apiBaseUrl" class="url-status">🌐 API: {{ getRawValues().apiBaseUrl }}</div>
        <div v-if="getRawValues().apiToken" class="token-status">✅ Token configured ({{ getRawValues().apiToken.length
          }} chars)</div>
        <button v-if="getRawValues().apiToken" @click="clearAuth" class="clear-auth-btn"
          title="Clear authentication data">
          🗑️ Clear Auth
        </button>
      </div>
      <div class="token-hint">💡 Don't include "Bearer" - it's added automatically</div>
    </div>
  </div>

  <div class="interactive-api-container">
    <!-- Main Documentation and Testing Column -->
    <div class="main-content">
${endpointSections}    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'

// Используем глобальное состояние аутентификации
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
${endpoints.map((_, index) => `const activeCodeTab${index + 1} = ref('cURL')`).join('\n')}

${scriptData}
const generateFingerprint = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const results = reactive({
${endpoints.map((_, index) => `  endpoint${index + 1}: null,`).join('\n')}
})

${scriptMethods}
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

// Code examples for copying
const codeExamples = {
  curl: {
${codeExamplesObject.replace(/curl:/g, '    1:').replace(/go:/g, '  },\n  go: {\n    1:').replace(/typescript:/g, '  },\n  typescript: {\n    1:').replace(/php:/g, '  },\n  php: {\n    1:').replace(/python:/g, '  },\n  python: {\n    1:')}  }
}

const copyCodeToClipboard = (lang, endpointNum) => {
  const code = codeExamples[lang]?.[endpointNum]
  if (code) {
    // Unescape HTML entities for clipboard
    const unescapedCode = code
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
    
    navigator.clipboard.writeText(unescapedCode).then(() => {
      console.log('Code copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy code:', err)
    })
  }
}
</script>

<style scoped>
${styling}
</style>`;

  // Write component file
  const componentPath = 'docs/.vitepress/theme/components/InteractiveUserAPI.vue';
  fs.writeFileSync(componentPath, component);
  console.log('✅ Generated perfect InteractiveUserAPI.vue');

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

  console.log('🎉 Perfect User API generation completed with exact InteractiveTradingAPI.vue structure!');
}

// Run the perfect generator
generatePerfectUserAPI(); 