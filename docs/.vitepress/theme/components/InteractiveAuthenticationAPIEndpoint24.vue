<template>
  <div class="single-endpoint">
    <div class="endpoint-layout">
      <div class="endpoint-docs">
        <div class="method-header">
          <span class="method-badge post">POST</span>
          <span class="endpoint-path">/auth/sign-in/firebase</span>
        </div>

        <div class="endpoint-info">
          <p class="endpoint-description">No description available</p>
        </div>

        <div class="api-section" v-if="hasParameters">
          <h4 class="section-title">⚙️ Parameters</h4>
          <div class="param-list">
            
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
              <pre>curl -X POST &quot;https://develop.okd.finance/api/auth/sign-in/firebase&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot;</pre>
            </div>
            <div v-show="activeCodeTab === 'Go'" class="code-block">
              <pre>package main

import (
    &quot;bytes&quot;
    &quot;encoding/json&quot;
    &quot;fmt&quot;
    &quot;net/http&quot;
)

func main() {
    url := &quot;https://develop.okd.finance/api/auth/sign-in/firebase&quot;
    
    req, _ := http.NewRequest(&quot;POST&quot;, url, nil)
    
    req.Header.Set(&quot;Authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;)
    req.Header.Set(&quot;Content-Type&quot;, &quot;application/json&quot;)
    req.Header.Set(&quot;Fingerprint&quot;, &quot;YOUR_FINGERPRINT&quot;)
    
    client := &amp;http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(&quot;Error:&quot;, err)
        return
    }
    defer resp.Body.Close()
    
    fmt.Printf(&quot;Status: %s\n&quot;, resp.Status)
}</pre>
            </div>
            <div v-show="activeCodeTab === 'TypeScript'" class="code-block">
              <pre>import axios from &#39;axios&#39;;

const apiClient = axios.create({
  baseURL: &#39;https://develop.okd.finance/api&#39;,
  headers: {
    &#39;Authorization&#39;: &#39;Bearer YOUR_ACCESS_TOKEN&#39;,
    &#39;Content-Type&#39;: &#39;application/json&#39;,
    &#39;Fingerprint&#39;: &#39;YOUR_FINGERPRINT&#39;
  }
});

async function authsigninfirebaseRequest() {
  try {
    const response = await apiClient.post(&#39;/auth/sign-in/firebase&#39;);
    
    console.log(&#39;Response:&#39;, response.data);
    return response.data;
  } catch (error) {
    console.error(&#39;Error:&#39;, error.response?.data || error.message);
    throw error;
  }
}

// Usage
authsigninfirebaseRequest();</pre>
            </div>
            <div v-show="activeCodeTab === 'PHP'" class="code-block">
              <pre>&lt;?php

$url = &#39;https://develop.okd.finance/api/auth/sign-in/firebase&#39;;
$headers = [
    &#39;Authorization: Bearer YOUR_ACCESS_TOKEN&#39;,
    &#39;Content-Type: application/json&#39;,
    &#39;Fingerprint: YOUR_FINGERPRINT&#39;
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, &#39;POST&#39;);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo &quot;cURL Error: &quot; . $error;
} else {
    echo &quot;HTTP Code: &quot; . $httpCode . &quot;\n&quot;;
    echo &quot;Response: &quot; . $response . &quot;\n&quot;;
}

?&gt;</pre>
            </div>
            <div v-show="activeCodeTab === 'Python'" class="code-block">
              <pre>import requests
import json

url = &#39;https://develop.okd.finance/api/auth/sign-in/firebase&#39;
headers = {
    &#39;Authorization&#39;: &#39;Bearer YOUR_ACCESS_TOKEN&#39;,
    &#39;Content-Type&#39;: &#39;application/json&#39;,
    &#39;Fingerprint&#39;: &#39;YOUR_FINGERPRINT&#39;
}

try:
    response = requests.post(url, headers=headers)
    response.raise_for_status()
    
    print(f&quot;Status Code: {response.status_code}&quot;)
    print(f&quot;Response: {response.json()}&quot;)
    
except requests.exceptions.RequestException as e:
    print(f&quot;Error: {e}&quot;)
    if hasattr(e, &#39;response&#39;) and e.response is not None:
        print(f&quot;Response: {e.response.text}&quot;)
</pre>
            </div>
          </div>
        </div>

        <div class="api-section">
          <h4 class="section-title">📋 Response Examples</h4>
          <div class="response-examples">
            <div class="response-example">
              <div class="response-header">
                <span class="response-status success">200</span>
                <span class="response-description">pair of tokens response or operation response</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;acc_token&quot;: &quot;my.access.token&quot;,
  &quot;refresh_token&quot;: &quot;my.refresh.token&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status success">203</span>
                <span class="response-description">we need additional confirmation codes</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;email2fa&quot;: &quot;true,&quot;,
  &quot;emailHint&quot;: &quot;***aaa@gmail.com&quot;,
  &quot;expiresAt&quot;: &quot;1674997813,&quot;,
  &quot;otp2fa&quot;: &quot;false,&quot;,
  &quot;resendEmailAfter&quot;: &quot;123456,&quot;,
  &quot;uuid&quot;: &quot;abcabc&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400</span>
                <span class="response-description">some logical error in request</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;code&quot;: 400001,
  &quot;message&quot;: &quot;email or password not valid&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">500</span>
                <span class="response-description">some error in internal server</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;code&quot;: 500000,
  &quot;message&quot;: &quot;internal server error&quot;
}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="endpoint-testing">
        <h4 class="testing-title">🚀 Live Testing</h4>
        <div class="test-section">
          
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

const hasParameters = false

const testData = reactive({
  
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
      
    }

    const fullUrl = `${authValues.apiBaseUrl}/auth/sign-in/firebase`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    result.value = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
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
/* Modern Bybit-style API Explorer Design */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

:root {
  --bybit-primary: #f7931a;
  --bybit-primary-dark: #e8851a;
  --bybit-secondary: #1a1a1a;
  --bybit-accent: #00d4ff;
  --bybit-success: #00c851;
  --bybit-error: #ff4444;
  --bybit-warning: #ffbb33;
  --bybit-bg: #ffffff;
  --bybit-bg-secondary: #f8f9fa;
  --bybit-bg-tertiary: #f1f3f4;
  --bybit-text-primary: #212529;
  --bybit-text-secondary: #6c757d;
  --bybit-text-muted: #adb5bd;
  --bybit-border: #e9ecef;
  --bybit-border-light: #f8f9fa;
  --bybit-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --bybit-shadow-lg: 0 4px 20px rgba(0, 0, 0, 0.15);
  --bybit-radius: 8px;
  --bybit-radius-lg: 12px;
}

.dark {
  --bybit-bg: #1a1a1a;
  --bybit-bg-secondary: #2d2d2d;
  --bybit-bg-tertiary: #3a3a3a;
  --bybit-text-primary: #ffffff;
  --bybit-text-secondary: #b0b0b0;
  --bybit-text-muted: #808080;
  --bybit-border: #404040;
  --bybit-border-light: #2d2d2d;
  --bybit-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  --bybit-shadow-lg: 0 4px 20px rgba(0, 0, 0, 0.4);
}

/* ===== MAIN LAYOUT ===== */
.interactive-api-container {
  margin: 2rem 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* ===== ENDPOINT SECTIONS ===== */
.endpoint-section {
  background: var(--bybit-bg);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius-lg);
  box-shadow: var(--bybit-shadow);
  overflow: hidden;
  transition: all 0.3s ease;
}

.endpoint-section:hover {
  box-shadow: var(--bybit-shadow-lg);
  transform: translateY(-2px);
}

.endpoint-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 0;
  min-height: 100%;
}

.endpoint-docs {
  padding: 2rem;
  background: var(--bybit-bg);
}

.endpoint-testing {
  width: 400px;
  background: var(--bybit-bg-secondary);
  border-left: 1px solid var(--bybit-border);
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

/* ===== METHOD HEADER ===== */
.method-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--bybit-border);
}

.method-badge {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 2px solid;
  font-family: 'JetBrains Mono', monospace;
  min-width: 60px;
  text-align: center;
}

.method-badge.get {
  background: #e3f2fd;
  color: #1976d2;
  border-color: #1976d2;
}

.method-badge.post {
  background: #e8f5e8;
  color: #2e7d32;
  border-color: #2e7d32;
}

.method-badge.put {
  background: #fff3e0;
  color: #f57c00;
  border-color: #f57c00;
}

.method-badge.patch {
  background: #f3e5f5;
  color: #7b1fa2;
  border-color: #7b1fa2;
}

.method-badge.delete {
  background: #ffebee;
  color: #c62828;
  border-color: #c62828;
}

.endpoint-path {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--bybit-text-primary);
  background: var(--bybit-bg-tertiary);
  padding: 0.5rem 1rem;
  border-radius: var(--bybit-radius);
}

/* ===== ENDPOINT INFO ===== */
.endpoint-info {
  margin-bottom: 2rem;
}

.endpoint-title {
  color: var(--bybit-primary);
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.endpoint-description {
  color: var(--bybit-text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* ===== API SECTIONS ===== */
.api-section {
  margin-bottom: 2rem;
}

.section-title {
  color: var(--bybit-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ===== PARAMETERS ===== */
.param-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.param-item {
  padding: 1rem;
  background: var(--bybit-bg-secondary);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  border-left: 4px solid var(--bybit-primary);
}

.param-item.required {
  border-left-color: var(--bybit-error);
}

.param-name {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  color: var(--bybit-primary);
  background: var(--bybit-bg-tertiary);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.param-type {
  font-family: 'JetBrains Mono', monospace;
  color: var(--bybit-text-secondary);
  font-size: 0.875rem;
  margin-right: 0.5rem;
}

.param-desc {
  color: var(--bybit-text-primary);
  font-size: 0.9rem;
  display: block;
  margin-top: 0.5rem;
}

/* ===== CODE EXAMPLES ===== */
.code-examples {
  background: var(--bybit-bg-tertiary);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  overflow: hidden;
}

.code-tabs {
  display: flex;
  background: var(--bybit-bg-secondary);
  border-bottom: 1px solid var(--bybit-border);
  overflow-x: auto;
}

.code-tab {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  color: var(--bybit-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  border-bottom: 3px solid transparent;
}

.code-tab:hover {
  background: var(--bybit-bg-tertiary);
  color: var(--bybit-text-primary);
}

.code-tab.active {
  color: var(--bybit-primary);
  border-bottom-color: var(--bybit-primary);
  background: var(--bybit-bg);
}

.code-block {
  position: relative;
}

.code-block pre {
  margin: 0;
  padding: 2rem;
  font-family: 'JetBrains Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--bybit-text-primary);
  overflow-x: auto;
  background: var(--bybit-bg);
}

/* ===== LIVE TESTING ===== */
.testing-title {
  color: var(--bybit-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.test-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
}

.test-section .param-item {
  margin-bottom: 1rem;
}

.test-section .param-item label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--bybit-text-primary);
  margin-bottom: 0.5rem;
  display: block;
}

.test-section .param-item input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  background: var(--bybit-bg);
  color: var(--bybit-text-primary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.test-section .param-item input:focus {
  outline: none;
  border-color: var(--bybit-primary);
  box-shadow: 0 0 0 3px rgba(247, 147, 26, 0.1);
}

.test-btn {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, var(--bybit-primary), var(--bybit-primary-dark));
  color: white;
  border: none;
  border-radius: var(--bybit-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: auto;
}

.test-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--bybit-shadow-lg);
}

.test-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  background: var(--bybit-bg-secondary);
  color: var(--bybit-text-muted);
}

/* ===== RESULTS ===== */
.result-container {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: var(--bybit-radius);
  background: var(--bybit-bg-tertiary);
  border: 1px solid var(--bybit-border);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status-badge {
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: var(--bybit-success);
  color: white;
}

.timestamp {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--bybit-text-secondary);
}

.copy-btn {
  padding: 0.375rem 0.75rem;
  background: var(--bybit-bg-secondary);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  color: var(--bybit-text-secondary);
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: var(--bybit-primary);
  color: white;
  border-color: var(--bybit-primary);
}

.request-info,
.result-data {
  margin-top: 1rem;
}

.request-info h5 {
  color: var(--bybit-text-primary);
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
}

.request-data,
.result-data {
  font-family: 'JetBrains Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.875rem;
  background: var(--bybit-bg);
  padding: 1rem;
  border-radius: var(--bybit-radius);
  border: 1px solid var(--bybit-border);
  overflow-x: auto;
  white-space: pre-wrap;
  color: var(--bybit-text-primary);
  margin: 0;
}

/* ===== AUTHENTICATION HEADER ===== */
.auth-header-fixed {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--bybit-bg);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius-lg);
  margin-bottom: 2rem;
  box-shadow: var(--bybit-shadow-lg);
  transition: all 0.3s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.auth-header-fixed.collapsed {
  box-shadow: var(--bybit-shadow);
}

.auth-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

.auth-header-fixed.collapsed .auth-container {
  padding: 1rem 1.5rem;
}

.auth-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.auth-title h4 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--bybit-text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.collapse-toggle {
  background: var(--bybit-bg-secondary);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--bybit-text-secondary);
  transition: all 0.2s ease;
}

.collapse-toggle:hover {
  background: var(--bybit-primary);
  color: white;
  border-color: var(--bybit-primary);
  transform: translateY(-1px);
}

.api-config-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.auth-header-fixed.collapsed .api-config-row,
.auth-header-fixed.collapsed .status-row,
.auth-header-fixed.collapsed .token-hint {
  max-height: 0;
  opacity: 0;
  margin: 0;
  overflow: hidden;
}

.config-group {
  display: flex;
  flex-direction: column;
}

.config-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--bybit-text-primary);
  margin-bottom: 0.5rem;
}

.config-input,
.token-input {
  padding: 0.75rem 1rem;
  border: 2px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  font-family: 'JetBrains Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.875rem;
  background: var(--bybit-bg);
  color: var(--bybit-text-primary);
  transition: all 0.2s ease;
}

.config-input:focus,
.token-input:focus {
  outline: none;
  border-color: var(--bybit-primary);
  box-shadow: 0 0 0 3px rgba(247, 147, 26, 0.1);
}

.token-input-group {
  display: flex;
  gap: 0.5rem;
}

.token-input {
  flex: 1;
}

.token-toggle {
  padding: 0.75rem 1rem;
  border: 2px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  background: var(--bybit-bg-secondary);
  color: var(--bybit-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.token-toggle:hover {
  background: var(--bybit-primary);
  color: white;
  border-color: var(--bybit-primary);
}

.status-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.url-status,
.token-status,
.fingerprint-status {
  padding: 0.375rem 0.75rem;
  border-radius: var(--bybit-radius);
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--bybit-bg-secondary);
  color: var(--bybit-text-secondary);
  border: 1px solid var(--bybit-border);
  font-family: 'JetBrains Mono', monospace;
}

.clear-auth-btn {
  padding: 0.375rem 0.75rem;
  background: var(--bybit-error);
  color: white;
  border: none;
  border-radius: var(--bybit-radius);
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.clear-auth-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--bybit-shadow);
}

.token-hint {
  font-size: 0.875rem;
  color: var(--bybit-text-muted);
  text-align: center;
  margin: 0;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
  .endpoint-layout {
    grid-template-columns: 1fr;
  }
  
  .endpoint-testing {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--bybit-border);
  }
  
  .api-config-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .endpoint-docs,
  .endpoint-testing {
    padding: 1.5rem;
  }
  
  .method-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .code-tabs {
    flex-wrap: wrap;
  }
  
  .code-tab {
    flex: 1;
    min-width: 80px;
  }
  
  .auth-container {
    padding: 1rem;
  }
  
  .status-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

/* ===== UTILITY CLASSES ===== */
.bybit-transition {
  transition: all 0.2s ease;
}

.bybit-text-mono {
  font-family: 'JetBrains Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
}

/* ===== CUSTOM SCROLLBAR ===== */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bybit-bg-secondary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--bybit-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--bybit-primary-dark);
}
</style>