<template>
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
      <!-- Endpoint 1: PUT /operations/{uuid}/cancel -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/operations/{uuid}/cancel</span>
          <h3>Cancels operation by uuid.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData1.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">uuid (path)</label>
              <input v-model="testData1.uuid" 
                type="text" 
                placeholder="UUID of transaction
"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint1" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading1" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response1" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response1 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab1 = lang"
                :class="['code-tab', { active: activeCodeTab1 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab1 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample1(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample1(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 2: PUT /operations/{uuid}/confirm -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/operations/{uuid}/confirm</span>
          <h3>Confirms operation by uuid and code.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData2.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">uuid (path)</label>
              <input v-model="testData2.uuid" 
                type="text" 
                placeholder="UUID of operation
"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">Body (body)</label>
              <input v-model="testData2.Body" 
                type="text" 
                placeholder="Body"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint2" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading2" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response2" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response2 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab2 = lang"
                :class="['code-tab', { active: activeCodeTab2 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab2 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample2(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample2(lang) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Endpoint 3: PUT /operations/{uuid}/resend -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <span class="method-badge method-put">PUT</span>
          <span class="endpoint-path">/operations/{uuid}/resend</span>
          <h3>Resends code to email for specified operation.</h3>
        </div>
        <div class="endpoint-content">
          <div class="endpoint-description">
            <p>! Need access token in bearer token authorization</p>
          </div>
          
                    <div class="parameters-section">
            <h4>Parameters:</h4>
            <div class="parameter-group">
              <label class="parameter-label">Fingerprint * (header)</label>
              <input v-model="testData3.Fingerprint" 
                type="text" 
                placeholder="user device unique id"
                class="parameter-input" />
            </div>
            <div class="parameter-group">
              <label class="parameter-label">uuid (path)</label>
              <input v-model="testData3.uuid" 
                type="text" 
                placeholder="UUID of transaction
"
                class="parameter-input" />
            </div>          </div>
          
          <div class="test-section">
            <div class="test-controls">
              <button @click="testEndpoint3" 
                :disabled="!isReadyToSendRequest()"
                :class="['test-btn', { 'disabled': !isReadyToSendRequest() }]">
                {{ isReadyToSendRequest() ? '🚀 Test API' : (getRawValues().apiToken ? '🔐 Need Fingerprint' : '🔑 Need Token & Fingerprint') }}
              </button>
              <div v-if="loading3" class="loading">⏳ Testing...</div>
            </div>
            
            <div v-if="response3" class="response-section">
              <h4>Response:</h4>
              <pre class="response-content">{{ response3 }}</pre>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang"
                @click="activeCodeTab3 = lang"
                :class="['code-tab', { active: activeCodeTab3 === lang }]">
                {{ lang }}
              </button>
            </div>
            <div class="code-content">
              <div v-for="lang in codeLangs" :key="lang"
                v-show="activeCodeTab3 === lang"
                class="code-block">
                <button @click="copyCode(getCodeExample3(lang))" class="copy-btn">📋 Copy</button>
                <pre><code>{{ getCodeExample3(lang) }}</code></pre>
              </div>
            </div>
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
  isReadyToSendRequest,
  generateRandomFingerprint
} = useAuth()

// Code examples tabs
const codeLangs = ['cURL', 'Go', 'TypeScript', 'PHP', 'Python']
const activeCodeTab1 = ref('cURL')
const activeCodeTab2 = ref('cURL')
const activeCodeTab3 = ref('cURL')

const testData1 = reactive({
  "Fingerprint": "",
  "uuid": ""
})
const loading1 = ref(false)
const response1 = ref(null)
const testData2 = reactive({
  "Fingerprint": "",
  "uuid": "",
  "Body": ""
})
const loading2 = ref(false)
const response2 = ref(null)
const testData3 = reactive({
  "Fingerprint": "",
  "uuid": ""
})
const loading3 = ref(false)
const response3 = ref(null)

const testEndpoint1 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading1.value = true
  response1.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/operations/{uuid}/cancel'
    
    // Replace path parameters
    url = url.replace('{uuid}', testData1.uuid || 'example')
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response1.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response1.value = 'Error: ' + error.message
  } finally {
    loading1.value = false
  }
}

const testEndpoint2 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading2.value = true
  response2.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/operations/{uuid}/confirm'
    
    // Replace path parameters
    url = url.replace('{uuid}', testData2.uuid || 'example')
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response2.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response2.value = 'Error: ' + error.message
  } finally {
    loading2.value = false
  }
}

const testEndpoint3 = async () => {
  if (!isReadyToSendRequest()) {
    alert('Please configure both API Token and Fingerprint first')
    return
  }
  
  loading3.value = true
  response3.value = null
  
  try {
    let url = getRawValues().apiBaseUrl + '/operations/{uuid}/resend'
    
    // Replace path parameters
    url = url.replace('{uuid}', testData3.uuid || 'example')
    
    // Add query parameters
    const queryParams = new URLSearchParams()
    
    
    if (queryParams.toString()) {
      url += '?' + queryParams.toString()
    }
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getRawValues().apiToken,
        'X-Fingerprint': getRawValues().apiFingerprint
      }
    }
    
    
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    response3.value = JSON.stringify(data, null, 2)
  } catch (error) {
    response3.value = 'Error: ' + error.message
  } finally {
    loading3.value = false
  }
}

const getCodeExample1 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/operations/{uuid}/cancel'
  
  // Replace path parameters with example values
  url = url.replace('{uuid}', testData1.uuid || 'example')
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample2 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/operations/{uuid}/confirm'
  
  // Replace path parameters with example values
  url = url.replace('{uuid}', testData2.uuid || 'example')
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

const getCodeExample3 = (lang) => {
  const baseUrl = getRawValues().apiBaseUrl || 'https://develop.okd.finance/api'
  const token = getRawValues().apiToken || 'YOUR_ACCESS_TOKEN'
  const fingerprint = getRawValues().apiFingerprint || 'YOUR_FINGERPRINT'
  
  let url = baseUrl + '/operations/{uuid}/resend'
  
  // Replace path parameters with example values
  url = url.replace('{uuid}', testData3.uuid || 'example')
  
  switch (lang) {
    case 'cURL':
      return `curl -X PUT "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-Fingerprint: ${fingerprint}" \\
  -H "Content-Type: application/json"${''}`
    
    case 'Go':
      return `package main

import (
    "fmt"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", "${url}", nil)
    
    req.Header.Add("Authorization", "Bearer ${token}")
    req.Header.Add("X-Fingerprint", "${fingerprint}")
    req.Header.Add("Content-Type", "application/json")
    
    res, _ := client.Do(req)
    defer res.Body.Close()
}`
    
    case 'TypeScript':
      return `const response = await fetch('${url}', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ${token}',
    'X-Fingerprint': '${fingerprint}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    
    case 'PHP':
      return `<?php
\$curl = curl_init();

curl_setopt_array(\$curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${token}',
    'X-Fingerprint: ${fingerprint}',
    'Content-Type: application/json'
  )
));

\$response = curl_exec(\$curl);
curl_close(\$curl);
echo \$response;
?>`
    
    case 'Python':
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${token}",
    "X-Fingerprint": "${fingerprint}",
    "Content-Type": "application/json"
}

response = requests.put(url, headers=headers)
print(response.json())`
    
    default:
      return 'Language not supported'
  }
}

// Copy code to clipboard
const copyCode = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    console.log('Code copied to clipboard!')
  })
}
</script>

<style scoped>
/* Fixed Authentication Header */
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
}
</style>