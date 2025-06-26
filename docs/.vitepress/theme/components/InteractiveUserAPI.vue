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
      <section id="endpoint-1" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge put">PUT</span>
              <span class="endpoint-path">/user/flags</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Set Profile Flags</h3>
              <p class="endpoint-description">Set profile flags of current user</p>
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

            <div class="api-section">
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                <div class="param-item required">
                  <code class="param-name">flags</code>
                  <span class="param-type">integer</span>
                  <span class="param-desc">Profile flags value</span>
                </div>
              </div>
            </div>

            <div class="api-section">
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
                    <pre>curl -X PUT &quot;https://develop.okd.finance/api/user/flags&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: 1358cd229b6bceb25941e99f4228997f&quot; \
  -d &#x27;{&quot;flags&quot;:123}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab1 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 1)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>package main

import (
    &quot;bytes&quot;
    &quot;encoding/json&quot;
    &quot;fmt&quot;
    &quot;io&quot;
    &quot;net/http&quot;
)

type PutuserflagsRequest struct {
    Flags int `json:&quot;flags&quot;`
}

type PutuserflagsResponse struct {
    Message string `json:&quot;message&quot;`
    Success bool   `json:&quot;success&quot;`
}

func putuserflags() (*PutuserflagsResponse, error) {
    url := &quot;https://develop.okd.finance/api/user/flags&quot;
    
    requestData := PutuserflagsRequest{
        Flags: 123,
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return nil, err
    }
    
    req, err := http.NewRequest(&quot;PUT&quot;, url, bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, err
    }
    
    req.Header.Set(&quot;Authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;)
    req.Header.Set(&quot;Content-Type&quot;, &quot;application/json&quot;)
    req.Header.Set(&quot;Fingerprint&quot;, &quot;1358cd229b6bceb25941e99f4228997f&quot;)
    
    client := &amp;http.Client{}
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
        return nil, fmt.Errorf(&quot;API error: %s&quot;, string(body))
    }
    
    var response PutuserflagsResponse
    if err := json.Unmarshal(body, &amp;response); err != nil {
        return nil, err
    }
    
    return &amp;response, nil
}

func main() {
    result, err := putuserflags()
    if err != nil {
        fmt.Printf(&quot;Error: %v\n&quot;, err)
        return
    }
    
    fmt.Printf(&quot;Success: %v\n&quot;, result.Success)
    fmt.Printf(&quot;Message: %s\n&quot;, result.Message)
}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab1 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 1)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>interface PutuserflagsRequest {
  flags: number;
}

interface PutuserflagsResponse {
  message: string;
  success: boolean;
}

interface ApiError {
  code: number;
  message: string;
}

async function putuserflags(
  baseUrl: string,
  accessToken: string,
  data: PutuserflagsRequest
): Promise&lt;PutuserflagsResponse&gt; {
  const response = await fetch(baseUrl + &#x27;/user/flags&#x27;, {
    method: &#x27;PUT&#x27;,
    headers: {
      &#x27;Authorization&#x27;: &#x27;Bearer &#x27; + accessToken,
      &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
      &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as ApiError;
    throw new Error(&#x27;API Error &#x27; + error.code + &#x27;: &#x27; + error.message);
  }

  return responseData as PutuserflagsResponse;
}

async function main(): Promise&lt;void&gt; {
  const requestData: PutuserflagsRequest = {
    flags: 123,
  };

  try {
    const result = await putuserflags(
      &#x27;https://develop.okd.finance/api&#x27;,
      &#x27;YOUR_ACCESS_TOKEN&#x27;,
      requestData
    );
    
    console.log(&#x27;Success:&#x27;, result.success);
    console.log(&#x27;Message:&#x27;, result.message);
  } catch (error) {
    console.error(&#x27;Error:&#x27;, error);
  }
}

main();</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab1 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 1)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>&lt;?php

function putuserflags($baseUrl, $accessToken, $data) {
    $url = $baseUrl . &#x27;/user/flags&#x27;;
    
    $headers = [
        &#x27;Authorization: Bearer &#x27; . $accessToken,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL =&gt; $url,
        CURLOPT_CUSTOMREQUEST =&gt; &#x27;PUT&#x27;,
        CURLOPT_POSTFIELDS =&gt; json_encode($data),
        CURLOPT_HTTPHEADER =&gt; $headers,
        CURLOPT_RETURNTRANSFER =&gt; true,
        CURLOPT_TIMEOUT =&gt; 30,
        CURLOPT_SSL_VERIFYPEER =&gt; true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception(&quot;cURL Error: &quot; . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception(&quot;Invalid JSON response&quot;);
    }

    if ($httpCode !== 200) {
        $message = $data[&#x27;message&#x27;] ?? &#x27;Unknown API error&#x27;;
        $code = $data[&#x27;code&#x27;] ?? $httpCode;
        throw new Exception(&quot;API Error {$code}: {$message}&quot;);
    }

    return $data;
}

try {
    $requestData = [
        &#x27;flags&#x27; =&gt; 123,
    ];

    $result = putuserflags(
        &#x27;https://develop.okd.finance/api&#x27;,
        &#x27;YOUR_ACCESS_TOKEN&#x27;,
        $requestData
    );

    echo &quot;Success: &quot; . ($result[&#x27;success&#x27;] ? &#x27;true&#x27; : &#x27;false&#x27;) . &quot;\n&quot;;
    echo &quot;Message: &quot; . $result[&#x27;message&#x27;] . &quot;\n&quot;;

} catch (Exception $e) {
    echo &quot;Error: &quot; . $e-&gt;getMessage() . &quot;\n&quot;;
}

?&gt;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab1 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 1)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>import requests
import json
from typing import Dict, Optional


class TradingAPIError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f&quot;API Error {code}: {message}&quot;)


def putuserflags(base_url: str, access_token: str, data: Dict) -&gt; Dict:
    &quot;&quot;&quot;PUT /user/flags&quot;&quot;&quot;
    url = f&quot;{base_url}/user/flags&quot;
    
    headers = {
        &#x27;Authorization&#x27;: f&#x27;Bearer {access_token}&#x27;,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    }
    
    try:
        response = requests.put(
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response_data = response.json()
        
        if not response.ok:
            error_code = response_data.get(&#x27;code&#x27;, response.status_code)
            error_message = response_data.get(&#x27;message&#x27;, &#x27;Unknown API error&#x27;)
            raise TradingAPIError(error_code, error_message)
        
        return response_data
        
    except requests.exceptions.RequestException as e:
        raise Exception(f&quot;Network error: {e}&quot;)


def main():
    request_data = {
        &#x27;flags&#x27;: 123,
    }
    
    try:
        result = putuserflags(
            &#x27;https://develop.okd.finance/api&#x27;,
            &#x27;YOUR_ACCESS_TOKEN&#x27;,
            request_data
        )
        
        print(f&quot;Success: {result.get(&#x27;success&#x27;, False)}&quot;)
        print(f&quot;Message: {result.get(&#x27;message&#x27;, &#x27;No message&#x27;)}&quot;)
        
    except (TradingAPIError, Exception) as e:
        print(f&quot;Error: {e}&quot;)


if __name__ == &quot;__main__&quot;:
    main()</pre>
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
              <div class="form-group">
                <label>Flags</label>
                <input v-model.number="testData1.flags" type="number" placeholder="123" class="test-input" />
              </div>
              <button @click="testEndpoint1" class="test-btn"
                :disabled="!getRawValues().apiToken || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint1" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint1.status }}</span>
                  <span class="timestamp">{{ results.endpoint1.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint1.data, $event)" class="copy-btn">📋 Copy
                    Response</button>
                </div>
                <div v-if="results.endpoint1.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint1.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint1.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint1.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint1.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-2" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge patch">PATCH</span>
              <span class="endpoint-path">/user/notifications</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Subscribe to Notifications</h3>
              <p class="endpoint-description">Subscribe to notifications</p>
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

            <div class="api-section">
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                <div class="param-item required">
                  <code class="param-name">enabled</code>
                  <span class="param-type">boolean</span>
                  <span class="param-desc">Enable or disable notifications</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab2 = lang"
                    :class="['code-tab', { active: activeCodeTab2 === lang }]">
                    {{ lang }}
                  </button>
                </div>

                <div v-show="activeCodeTab2 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 2)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>curl -X PATCH &quot;https://develop.okd.finance/api/user/notifications&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: 1358cd229b6bceb25941e99f4228997f&quot; \
  -d &#x27;{&quot;enabled&quot;:true}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab2 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 2)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>package main

import (
    &quot;bytes&quot;
    &quot;encoding/json&quot;
    &quot;fmt&quot;
    &quot;io&quot;
    &quot;net/http&quot;
)

type PatchusernotificationsRequest struct {
    Enabled bool `json:&quot;enabled&quot;`
}

type PatchusernotificationsResponse struct {
    Message string `json:&quot;message&quot;`
    Success bool   `json:&quot;success&quot;`
}

func patchusernotifications() (*PatchusernotificationsResponse, error) {
    url := &quot;https://develop.okd.finance/api/user/notifications&quot;
    
    requestData := PatchusernotificationsRequest{
        Enabled: true,
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return nil, err
    }
    
    req, err := http.NewRequest(&quot;PATCH&quot;, url, bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, err
    }
    
    req.Header.Set(&quot;Authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;)
    req.Header.Set(&quot;Content-Type&quot;, &quot;application/json&quot;)
    req.Header.Set(&quot;Fingerprint&quot;, &quot;1358cd229b6bceb25941e99f4228997f&quot;)
    
    client := &amp;http.Client{}
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
        return nil, fmt.Errorf(&quot;API error: %s&quot;, string(body))
    }
    
    var response PatchusernotificationsResponse
    if err := json.Unmarshal(body, &amp;response); err != nil {
        return nil, err
    }
    
    return &amp;response, nil
}

func main() {
    result, err := patchusernotifications()
    if err != nil {
        fmt.Printf(&quot;Error: %v\n&quot;, err)
        return
    }
    
    fmt.Printf(&quot;Success: %v\n&quot;, result.Success)
    fmt.Printf(&quot;Message: %s\n&quot;, result.Message)
}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab2 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 2)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>interface PatchusernotificationsRequest {
  enabled: boolean;
}

interface PatchusernotificationsResponse {
  message: string;
  success: boolean;
}

interface ApiError {
  code: number;
  message: string;
}

async function patchusernotifications(
  baseUrl: string,
  accessToken: string,
  data: PatchusernotificationsRequest
): Promise&lt;PatchusernotificationsResponse&gt; {
  const response = await fetch(baseUrl + &#x27;/user/notifications&#x27;, {
    method: &#x27;PATCH&#x27;,
    headers: {
      &#x27;Authorization&#x27;: &#x27;Bearer &#x27; + accessToken,
      &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
      &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as ApiError;
    throw new Error(&#x27;API Error &#x27; + error.code + &#x27;: &#x27; + error.message);
  }

  return responseData as PatchusernotificationsResponse;
}

async function main(): Promise&lt;void&gt; {
  const requestData: PatchusernotificationsRequest = {
    enabled: true,
  };

  try {
    const result = await patchusernotifications(
      &#x27;https://develop.okd.finance/api&#x27;,
      &#x27;YOUR_ACCESS_TOKEN&#x27;,
      requestData
    );
    
    console.log(&#x27;Success:&#x27;, result.success);
    console.log(&#x27;Message:&#x27;, result.message);
  } catch (error) {
    console.error(&#x27;Error:&#x27;, error);
  }
}

main();</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab2 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 2)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>&lt;?php

function patchusernotifications($baseUrl, $accessToken, $data) {
    $url = $baseUrl . &#x27;/user/notifications&#x27;;
    
    $headers = [
        &#x27;Authorization: Bearer &#x27; . $accessToken,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL =&gt; $url,
        CURLOPT_CUSTOMREQUEST =&gt; &#x27;PATCH&#x27;,
        CURLOPT_POSTFIELDS =&gt; json_encode($data),
        CURLOPT_HTTPHEADER =&gt; $headers,
        CURLOPT_RETURNTRANSFER =&gt; true,
        CURLOPT_TIMEOUT =&gt; 30,
        CURLOPT_SSL_VERIFYPEER =&gt; true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception(&quot;cURL Error: &quot; . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception(&quot;Invalid JSON response&quot;);
    }

    if ($httpCode !== 200) {
        $message = $data[&#x27;message&#x27;] ?? &#x27;Unknown API error&#x27;;
        $code = $data[&#x27;code&#x27;] ?? $httpCode;
        throw new Exception(&quot;API Error {$code}: {$message}&quot;);
    }

    return $data;
}

try {
    $requestData = [
        &#x27;enabled&#x27; =&gt; true,
    ];

    $result = patchusernotifications(
        &#x27;https://develop.okd.finance/api&#x27;,
        &#x27;YOUR_ACCESS_TOKEN&#x27;,
        $requestData
    );

    echo &quot;Success: &quot; . ($result[&#x27;success&#x27;] ? &#x27;true&#x27; : &#x27;false&#x27;) . &quot;\n&quot;;
    echo &quot;Message: &quot; . $result[&#x27;message&#x27;] . &quot;\n&quot;;

} catch (Exception $e) {
    echo &quot;Error: &quot; . $e-&gt;getMessage() . &quot;\n&quot;;
}

?&gt;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab2 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 2)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>import requests
import json
from typing import Dict, Optional


class TradingAPIError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f&quot;API Error {code}: {message}&quot;)


def patchusernotifications(base_url: str, access_token: str, data: Dict) -&gt; Dict:
    &quot;&quot;&quot;PATCH /user/notifications&quot;&quot;&quot;
    url = f&quot;{base_url}/user/notifications&quot;
    
    headers = {
        &#x27;Authorization&#x27;: f&#x27;Bearer {access_token}&#x27;,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    }
    
    try:
        response = requests.patch(
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response_data = response.json()
        
        if not response.ok:
            error_code = response_data.get(&#x27;code&#x27;, response.status_code)
            error_message = response_data.get(&#x27;message&#x27;, &#x27;Unknown API error&#x27;)
            raise TradingAPIError(error_code, error_message)
        
        return response_data
        
    except requests.exceptions.RequestException as e:
        raise Exception(f&quot;Network error: {e}&quot;)


def main():
    request_data = {
        &#x27;enabled&#x27;: true,
    }
    
    try:
        result = patchusernotifications(
            &#x27;https://develop.okd.finance/api&#x27;,
            &#x27;YOUR_ACCESS_TOKEN&#x27;,
            request_data
        )
        
        print(f&quot;Success: {result.get(&#x27;success&#x27;, False)}&quot;)
        print(f&quot;Message: {result.get(&#x27;message&#x27;, &#x27;No message&#x27;)}&quot;)
        
    except (TradingAPIError, Exception) as e:
        print(f&quot;Error: {e}&quot;)


if __name__ == &quot;__main__&quot;:
    main()</pre>
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
              <div class="form-group">
                <label>Enabled</label>
                <select v-model="testData2.enabled" class="test-input">
                  <option :value="true">True</option>
                  <option :value="false">False</option>
                </select>
              </div>
              <button @click="testEndpoint2" class="test-btn"
                :disabled="!getRawValues().apiToken || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint2" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint2.status }}</span>
                  <span class="timestamp">{{ results.endpoint2.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint2.data, $event)" class="copy-btn">📋 Copy
                    Response</button>
                </div>
                <div v-if="results.endpoint2.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint2.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint2.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint2.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint2.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endpoint-3" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge patch">PATCH</span>
              <span class="endpoint-path">/user/profile</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Subscribe to Profile Events</h3>
              <p class="endpoint-description">Subscribe to profile events</p>
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

            <div class="api-section">
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                <div class="param-item required">
                  <code class="param-name">subscribe</code>
                  <span class="param-type">boolean</span>
                  <span class="param-desc">Subscribe to profile events</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab3 = lang"
                    :class="['code-tab', { active: activeCodeTab3 === lang }]">
                    {{ lang }}
                  </button>
                </div>

                <div v-show="activeCodeTab3 === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', 3)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>curl -X PATCH &quot;https://develop.okd.finance/api/user/profile&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: 1358cd229b6bceb25941e99f4228997f&quot; \
  -d &#x27;{&quot;subscribe&quot;:true}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab3 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 3)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>package main

import (
    &quot;bytes&quot;
    &quot;encoding/json&quot;
    &quot;fmt&quot;
    &quot;io&quot;
    &quot;net/http&quot;
)

type PatchuserprofileRequest struct {
    Subscribe bool `json:&quot;subscribe&quot;`
}

type PatchuserprofileResponse struct {
    Message string `json:&quot;message&quot;`
    Success bool   `json:&quot;success&quot;`
}

func patchuserprofile() (*PatchuserprofileResponse, error) {
    url := &quot;https://develop.okd.finance/api/user/profile&quot;
    
    requestData := PatchuserprofileRequest{
        Subscribe: true,
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return nil, err
    }
    
    req, err := http.NewRequest(&quot;PATCH&quot;, url, bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, err
    }
    
    req.Header.Set(&quot;Authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;)
    req.Header.Set(&quot;Content-Type&quot;, &quot;application/json&quot;)
    req.Header.Set(&quot;Fingerprint&quot;, &quot;1358cd229b6bceb25941e99f4228997f&quot;)
    
    client := &amp;http.Client{}
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
        return nil, fmt.Errorf(&quot;API error: %s&quot;, string(body))
    }
    
    var response PatchuserprofileResponse
    if err := json.Unmarshal(body, &amp;response); err != nil {
        return nil, err
    }
    
    return &amp;response, nil
}

func main() {
    result, err := patchuserprofile()
    if err != nil {
        fmt.Printf(&quot;Error: %v\n&quot;, err)
        return
    }
    
    fmt.Printf(&quot;Success: %v\n&quot;, result.Success)
    fmt.Printf(&quot;Message: %s\n&quot;, result.Message)
}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab3 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 3)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>interface PatchuserprofileRequest {
  subscribe: boolean;
}

interface PatchuserprofileResponse {
  message: string;
  success: boolean;
}

interface ApiError {
  code: number;
  message: string;
}

async function patchuserprofile(
  baseUrl: string,
  accessToken: string,
  data: PatchuserprofileRequest
): Promise&lt;PatchuserprofileResponse&gt; {
  const response = await fetch(baseUrl + &#x27;/user/profile&#x27;, {
    method: &#x27;PATCH&#x27;,
    headers: {
      &#x27;Authorization&#x27;: &#x27;Bearer &#x27; + accessToken,
      &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
      &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as ApiError;
    throw new Error(&#x27;API Error &#x27; + error.code + &#x27;: &#x27; + error.message);
  }

  return responseData as PatchuserprofileResponse;
}

async function main(): Promise&lt;void&gt; {
  const requestData: PatchuserprofileRequest = {
    subscribe: true,
  };

  try {
    const result = await patchuserprofile(
      &#x27;https://develop.okd.finance/api&#x27;,
      &#x27;YOUR_ACCESS_TOKEN&#x27;,
      requestData
    );
    
    console.log(&#x27;Success:&#x27;, result.success);
    console.log(&#x27;Message:&#x27;, result.message);
  } catch (error) {
    console.error(&#x27;Error:&#x27;, error);
  }
}

main();</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab3 === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', 3)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>&lt;?php

function patchuserprofile($baseUrl, $accessToken, $data) {
    $url = $baseUrl . &#x27;/user/profile&#x27;;
    
    $headers = [
        &#x27;Authorization: Bearer &#x27; . $accessToken,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL =&gt; $url,
        CURLOPT_CUSTOMREQUEST =&gt; &#x27;PATCH&#x27;,
        CURLOPT_POSTFIELDS =&gt; json_encode($data),
        CURLOPT_HTTPHEADER =&gt; $headers,
        CURLOPT_RETURNTRANSFER =&gt; true,
        CURLOPT_TIMEOUT =&gt; 30,
        CURLOPT_SSL_VERIFYPEER =&gt; true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception(&quot;cURL Error: &quot; . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception(&quot;Invalid JSON response&quot;);
    }

    if ($httpCode !== 200) {
        $message = $data[&#x27;message&#x27;] ?? &#x27;Unknown API error&#x27;;
        $code = $data[&#x27;code&#x27;] ?? $httpCode;
        throw new Exception(&quot;API Error {$code}: {$message}&quot;);
    }

    return $data;
}

try {
    $requestData = [
        &#x27;subscribe&#x27; =&gt; true,
    ];

    $result = patchuserprofile(
        &#x27;https://develop.okd.finance/api&#x27;,
        &#x27;YOUR_ACCESS_TOKEN&#x27;,
        $requestData
    );

    echo &quot;Success: &quot; . ($result[&#x27;success&#x27;] ? &#x27;true&#x27; : &#x27;false&#x27;) . &quot;\n&quot;;
    echo &quot;Message: &quot; . $result[&#x27;message&#x27;] . &quot;\n&quot;;

} catch (Exception $e) {
    echo &quot;Error: &quot; . $e-&gt;getMessage() . &quot;\n&quot;;
}

?&gt;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab3 === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', 3)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>import requests
import json
from typing import Dict, Optional


class TradingAPIError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f&quot;API Error {code}: {message}&quot;)


def patchuserprofile(base_url: str, access_token: str, data: Dict) -&gt; Dict:
    &quot;&quot;&quot;PATCH /user/profile&quot;&quot;&quot;
    url = f&quot;{base_url}/user/profile&quot;
    
    headers = {
        &#x27;Authorization&#x27;: f&#x27;Bearer {access_token}&#x27;,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    }
    
    try:
        response = requests.patch(
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response_data = response.json()
        
        if not response.ok:
            error_code = response_data.get(&#x27;code&#x27;, response.status_code)
            error_message = response_data.get(&#x27;message&#x27;, &#x27;Unknown API error&#x27;)
            raise TradingAPIError(error_code, error_message)
        
        return response_data
        
    except requests.exceptions.RequestException as e:
        raise Exception(f&quot;Network error: {e}&quot;)


def main():
    request_data = {
        &#x27;subscribe&#x27;: true,
    }
    
    try:
        result = patchuserprofile(
            &#x27;https://develop.okd.finance/api&#x27;,
            &#x27;YOUR_ACCESS_TOKEN&#x27;,
            request_data
        )
        
        print(f&quot;Success: {result.get(&#x27;success&#x27;, False)}&quot;)
        print(f&quot;Message: {result.get(&#x27;message&#x27;, &#x27;No message&#x27;)}&quot;)
        
    except (TradingAPIError, Exception) as e:
        print(f&quot;Error: {e}&quot;)


if __name__ == &quot;__main__&quot;:
    main()</pre>
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
              <div class="form-group">
                <label>Subscribe</label>
                <select v-model="testData3.subscribe" class="test-input">
                  <option :value="true">True</option>
                  <option :value="false">False</option>
                </select>
              </div>
              <button @click="testEndpoint3" class="test-btn"
                :disabled="!getRawValues().apiToken || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint3" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint3.status }}</span>
                  <span class="timestamp">{{ results.endpoint3.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint3.data, $event)" class="copy-btn">📋 Copy
                    Response</button>
                </div>
                <div v-if="results.endpoint3.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint3.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint3.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint3.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint3.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
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
const activeCodeTab1 = ref('cURL')
const activeCodeTab2 = ref('cURL')
const activeCodeTab3 = ref('cURL')

const testData1 = reactive({ flags: 123, })
const testData2 = reactive({ enabled: true, })
const testData3 = reactive({ subscribe: true, })

const generateFingerprint = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const results = reactive({
  endpoint1: null,
  endpoint2: null,
  endpoint3: null,
})


const testEndpoint1 = async () => {
  try {
    const authValues = getRawValues()
    const requestBody = {
      flags: testData1.flags,
    }

    const fullUrl = `${authValues.apiBaseUrl}/user/flags`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint1 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PUT ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint1 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint2 = async () => {
  try {
    const authValues = getRawValues()
    const requestBody = {
      enabled: testData2.enabled,
    }

    const fullUrl = `${authValues.apiBaseUrl}/user/notifications`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'PATCH',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint2 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PATCH ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint2 = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testEndpoint3 = async () => {
  try {
    const authValues = getRawValues()
    const requestBody = {
      subscribe: testData3.subscribe,
    }

    const fullUrl = `${authValues.apiBaseUrl}/user/profile`
    const fingerprint = generateFingerprint()
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': fingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'PATCH',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint3 = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `PATCH ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint3 = {
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
    1: {
          1: `curl -X PUT &quot;https://develop.okd.finance/api/user/flags&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: 1358cd229b6bceb25941e99f4228997f&quot; \
  -d &#x27;{&quot;flags&quot;:123}&#x27;`,
        },
  go: {
    1: `package main

import (
    &quot;bytes&quot;
    &quot;encoding/json&quot;
    &quot;fmt&quot;
    &quot;io&quot;
    &quot;net/http&quot;
)

type PutuserflagsRequest struct {
    Flags int \`json:&quot;flags&quot;\`
}

type PutuserflagsResponse struct {
    Message string \`json:&quot;message&quot;\`
    Success bool   \`json:&quot;success&quot;\`
}

func putuserflags() (*PutuserflagsResponse, error) {
    url := &quot;https://develop.okd.finance/api/user/flags&quot;
    
    requestData := PutuserflagsRequest{
        Flags: 123,
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return nil, err
    }
    
    req, err := http.NewRequest(&quot;PUT&quot;, url, bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, err
    }
    
    req.Header.Set(&quot;Authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;)
    req.Header.Set(&quot;Content-Type&quot;, &quot;application/json&quot;)
    req.Header.Set(&quot;Fingerprint&quot;, &quot;1358cd229b6bceb25941e99f4228997f&quot;)
    
    client := &amp;http.Client{}
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
        return nil, fmt.Errorf(&quot;API error: %s&quot;, string(body))
    }
    
    var response PutuserflagsResponse
    if err := json.Unmarshal(body, &amp;response); err != nil {
        return nil, err
    }
    
    return &amp;response, nil
}

func main() {
    result, err := putuserflags()
    if err != nil {
        fmt.Printf(&quot;Error: %v\n&quot;, err)
        return
    }
    
    fmt.Printf(&quot;Success: %v\n&quot;, result.Success)
    fmt.Printf(&quot;Message: %s\n&quot;, result.Message)
}`,
        },
  typescript: {
    1: `interface PutuserflagsRequest {
  flags: number;
}

interface PutuserflagsResponse {
  message: string;
  success: boolean;
}

interface ApiError {
  code: number;
  message: string;
}

async function putuserflags(
  baseUrl: string,
  accessToken: string,
  data: PutuserflagsRequest
): Promise&lt;PutuserflagsResponse&gt; {
  const response = await fetch(baseUrl + &#x27;/user/flags&#x27;, {
    method: &#x27;PUT&#x27;,
    headers: {
      &#x27;Authorization&#x27;: &#x27;Bearer &#x27; + accessToken,
      &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
      &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as ApiError;
    throw new Error(&#x27;API Error &#x27; + error.code + &#x27;: &#x27; + error.message);
  }

  return responseData as PutuserflagsResponse;
}

async function main(): Promise&lt;void&gt; {
  const requestData: PutuserflagsRequest = {
    flags: 123,
  };

  try {
    const result = await putuserflags(
      &#x27;https://develop.okd.finance/api&#x27;,
      &#x27;YOUR_ACCESS_TOKEN&#x27;,
      requestData
    );
    
    console.log(&#x27;Success:&#x27;, result.success);
    console.log(&#x27;Message:&#x27;, result.message);
  } catch (error) {
    console.error(&#x27;Error:&#x27;, error);
  }
}

main();`,
        },
  php: {
    1: `&lt;?php

function putuserflags($baseUrl, $accessToken, $data) {
    $url = $baseUrl . &#x27;/user/flags&#x27;;
    
    $headers = [
        &#x27;Authorization: Bearer &#x27; . $accessToken,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL =&gt; $url,
        CURLOPT_CUSTOMREQUEST =&gt; &#x27;PUT&#x27;,
        CURLOPT_POSTFIELDS =&gt; json_encode($data),
        CURLOPT_HTTPHEADER =&gt; $headers,
        CURLOPT_RETURNTRANSFER =&gt; true,
        CURLOPT_TIMEOUT =&gt; 30,
        CURLOPT_SSL_VERIFYPEER =&gt; true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception(&quot;cURL Error: &quot; . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception(&quot;Invalid JSON response&quot;);
    }

    if ($httpCode !== 200) {
        $message = $data[&#x27;message&#x27;] ?? &#x27;Unknown API error&#x27;;
        $code = $data[&#x27;code&#x27;] ?? $httpCode;
        throw new Exception(&quot;API Error {$code}: {$message}&quot;);
    }

    return $data;
}

try {
    $requestData = [
        &#x27;flags&#x27; =&gt; 123,
    ];

    $result = putuserflags(
        &#x27;https://develop.okd.finance/api&#x27;,
        &#x27;YOUR_ACCESS_TOKEN&#x27;,
        $requestData
    );

    echo &quot;Success: &quot; . ($result[&#x27;success&#x27;] ? &#x27;true&#x27; : &#x27;false&#x27;) . &quot;\n&quot;;
    echo &quot;Message: &quot; . $result[&#x27;message&#x27;] . &quot;\n&quot;;

} catch (Exception $e) {
    echo &quot;Error: &quot; . $e-&gt;getMessage() . &quot;\n&quot;;
}

?&gt;`,
        },
  python: {
    1: `import requests
import json
from typing import Dict, Optional


class TradingAPIError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f&quot;API Error {code}: {message}&quot;)


def putuserflags(base_url: str, access_token: str, data: Dict) -&gt; Dict:
    &quot;&quot;&quot;PUT /user/flags&quot;&quot;&quot;
    url = f&quot;{base_url}/user/flags&quot;
    
    headers = {
        &#x27;Authorization&#x27;: f&#x27;Bearer {access_token}&#x27;,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    }
    
    try:
        response = requests.put(
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response_data = response.json()
        
        if not response.ok:
            error_code = response_data.get(&#x27;code&#x27;, response.status_code)
            error_message = response_data.get(&#x27;message&#x27;, &#x27;Unknown API error&#x27;)
            raise TradingAPIError(error_code, error_message)
        
        return response_data
        
    except requests.exceptions.RequestException as e:
        raise Exception(f&quot;Network error: {e}&quot;)


def main():
    request_data = {
        &#x27;flags&#x27;: 123,
    }
    
    try:
        result = putuserflags(
            &#x27;https://develop.okd.finance/api&#x27;,
            &#x27;YOUR_ACCESS_TOKEN&#x27;,
            request_data
        )
        
        print(f&quot;Success: {result.get(&#x27;success&#x27;, False)}&quot;)
        print(f&quot;Message: {result.get(&#x27;message&#x27;, &#x27;No message&#x27;)}&quot;)
        
    except (TradingAPIError, Exception) as e:
        print(f&quot;Error: {e}&quot;)


if __name__ == &quot;__main__&quot;:
    main()`
    },
    2: {
          1: `curl -X PATCH &quot;https://develop.okd.finance/api/user/notifications&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: 1358cd229b6bceb25941e99f4228997f&quot; \
  -d &#x27;{&quot;enabled&quot;:true}&#x27;`,
        },
  go: {
    1: `package main

import (
    &quot;bytes&quot;
    &quot;encoding/json&quot;
    &quot;fmt&quot;
    &quot;io&quot;
    &quot;net/http&quot;
)

type PatchusernotificationsRequest struct {
    Enabled bool \`json:&quot;enabled&quot;\`
}

type PatchusernotificationsResponse struct {
    Message string \`json:&quot;message&quot;\`
    Success bool   \`json:&quot;success&quot;\`
}

func patchusernotifications() (*PatchusernotificationsResponse, error) {
    url := &quot;https://develop.okd.finance/api/user/notifications&quot;
    
    requestData := PatchusernotificationsRequest{
        Enabled: true,
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return nil, err
    }
    
    req, err := http.NewRequest(&quot;PATCH&quot;, url, bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, err
    }
    
    req.Header.Set(&quot;Authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;)
    req.Header.Set(&quot;Content-Type&quot;, &quot;application/json&quot;)
    req.Header.Set(&quot;Fingerprint&quot;, &quot;1358cd229b6bceb25941e99f4228997f&quot;)
    
    client := &amp;http.Client{}
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
        return nil, fmt.Errorf(&quot;API error: %s&quot;, string(body))
    }
    
    var response PatchusernotificationsResponse
    if err := json.Unmarshal(body, &amp;response); err != nil {
        return nil, err
    }
    
    return &amp;response, nil
}

func main() {
    result, err := patchusernotifications()
    if err != nil {
        fmt.Printf(&quot;Error: %v\n&quot;, err)
        return
    }
    
    fmt.Printf(&quot;Success: %v\n&quot;, result.Success)
    fmt.Printf(&quot;Message: %s\n&quot;, result.Message)
}`,
        },
  typescript: {
    1: `interface PatchusernotificationsRequest {
  enabled: boolean;
}

interface PatchusernotificationsResponse {
  message: string;
  success: boolean;
}

interface ApiError {
  code: number;
  message: string;
}

async function patchusernotifications(
  baseUrl: string,
  accessToken: string,
  data: PatchusernotificationsRequest
): Promise&lt;PatchusernotificationsResponse&gt; {
  const response = await fetch(baseUrl + &#x27;/user/notifications&#x27;, {
    method: &#x27;PATCH&#x27;,
    headers: {
      &#x27;Authorization&#x27;: &#x27;Bearer &#x27; + accessToken,
      &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
      &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as ApiError;
    throw new Error(&#x27;API Error &#x27; + error.code + &#x27;: &#x27; + error.message);
  }

  return responseData as PatchusernotificationsResponse;
}

async function main(): Promise&lt;void&gt; {
  const requestData: PatchusernotificationsRequest = {
    enabled: true,
  };

  try {
    const result = await patchusernotifications(
      &#x27;https://develop.okd.finance/api&#x27;,
      &#x27;YOUR_ACCESS_TOKEN&#x27;,
      requestData
    );
    
    console.log(&#x27;Success:&#x27;, result.success);
    console.log(&#x27;Message:&#x27;, result.message);
  } catch (error) {
    console.error(&#x27;Error:&#x27;, error);
  }
}

main();`,
        },
  php: {
    1: `&lt;?php

function patchusernotifications($baseUrl, $accessToken, $data) {
    $url = $baseUrl . &#x27;/user/notifications&#x27;;
    
    $headers = [
        &#x27;Authorization: Bearer &#x27; . $accessToken,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL =&gt; $url,
        CURLOPT_CUSTOMREQUEST =&gt; &#x27;PATCH&#x27;,
        CURLOPT_POSTFIELDS =&gt; json_encode($data),
        CURLOPT_HTTPHEADER =&gt; $headers,
        CURLOPT_RETURNTRANSFER =&gt; true,
        CURLOPT_TIMEOUT =&gt; 30,
        CURLOPT_SSL_VERIFYPEER =&gt; true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception(&quot;cURL Error: &quot; . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception(&quot;Invalid JSON response&quot;);
    }

    if ($httpCode !== 200) {
        $message = $data[&#x27;message&#x27;] ?? &#x27;Unknown API error&#x27;;
        $code = $data[&#x27;code&#x27;] ?? $httpCode;
        throw new Exception(&quot;API Error {$code}: {$message}&quot;);
    }

    return $data;
}

try {
    $requestData = [
        &#x27;enabled&#x27; =&gt; true,
    ];

    $result = patchusernotifications(
        &#x27;https://develop.okd.finance/api&#x27;,
        &#x27;YOUR_ACCESS_TOKEN&#x27;,
        $requestData
    );

    echo &quot;Success: &quot; . ($result[&#x27;success&#x27;] ? &#x27;true&#x27; : &#x27;false&#x27;) . &quot;\n&quot;;
    echo &quot;Message: &quot; . $result[&#x27;message&#x27;] . &quot;\n&quot;;

} catch (Exception $e) {
    echo &quot;Error: &quot; . $e-&gt;getMessage() . &quot;\n&quot;;
}

?&gt;`,
        },
  python: {
    1: `import requests
import json
from typing import Dict, Optional


class TradingAPIError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f&quot;API Error {code}: {message}&quot;)


def patchusernotifications(base_url: str, access_token: str, data: Dict) -&gt; Dict:
    &quot;&quot;&quot;PATCH /user/notifications&quot;&quot;&quot;
    url = f&quot;{base_url}/user/notifications&quot;
    
    headers = {
        &#x27;Authorization&#x27;: f&#x27;Bearer {access_token}&#x27;,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    }
    
    try:
        response = requests.patch(
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response_data = response.json()
        
        if not response.ok:
            error_code = response_data.get(&#x27;code&#x27;, response.status_code)
            error_message = response_data.get(&#x27;message&#x27;, &#x27;Unknown API error&#x27;)
            raise TradingAPIError(error_code, error_message)
        
        return response_data
        
    except requests.exceptions.RequestException as e:
        raise Exception(f&quot;Network error: {e}&quot;)


def main():
    request_data = {
        &#x27;enabled&#x27;: true,
    }
    
    try:
        result = patchusernotifications(
            &#x27;https://develop.okd.finance/api&#x27;,
            &#x27;YOUR_ACCESS_TOKEN&#x27;,
            request_data
        )
        
        print(f&quot;Success: {result.get(&#x27;success&#x27;, False)}&quot;)
        print(f&quot;Message: {result.get(&#x27;message&#x27;, &#x27;No message&#x27;)}&quot;)
        
    except (TradingAPIError, Exception) as e:
        print(f&quot;Error: {e}&quot;)


if __name__ == &quot;__main__&quot;:
    main()`
    },
    3: {
          1: `curl -X PATCH &quot;https://develop.okd.finance/api/user/profile&quot; \
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -H &quot;Fingerprint: 1358cd229b6bceb25941e99f4228997f&quot; \
  -d &#x27;{&quot;subscribe&quot;:true}&#x27;`,
        },
  go: {
    1: `package main

import (
    &quot;bytes&quot;
    &quot;encoding/json&quot;
    &quot;fmt&quot;
    &quot;io&quot;
    &quot;net/http&quot;
)

type PatchuserprofileRequest struct {
    Subscribe bool \`json:&quot;subscribe&quot;\`
}

type PatchuserprofileResponse struct {
    Message string \`json:&quot;message&quot;\`
    Success bool   \`json:&quot;success&quot;\`
}

func patchuserprofile() (*PatchuserprofileResponse, error) {
    url := &quot;https://develop.okd.finance/api/user/profile&quot;
    
    requestData := PatchuserprofileRequest{
        Subscribe: true,
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return nil, err
    }
    
    req, err := http.NewRequest(&quot;PATCH&quot;, url, bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, err
    }
    
    req.Header.Set(&quot;Authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;)
    req.Header.Set(&quot;Content-Type&quot;, &quot;application/json&quot;)
    req.Header.Set(&quot;Fingerprint&quot;, &quot;1358cd229b6bceb25941e99f4228997f&quot;)
    
    client := &amp;http.Client{}
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
        return nil, fmt.Errorf(&quot;API error: %s&quot;, string(body))
    }
    
    var response PatchuserprofileResponse
    if err := json.Unmarshal(body, &amp;response); err != nil {
        return nil, err
    }
    
    return &amp;response, nil
}

func main() {
    result, err := patchuserprofile()
    if err != nil {
        fmt.Printf(&quot;Error: %v\n&quot;, err)
        return
    }
    
    fmt.Printf(&quot;Success: %v\n&quot;, result.Success)
    fmt.Printf(&quot;Message: %s\n&quot;, result.Message)
}`,
        },
  typescript: {
    1: `interface PatchuserprofileRequest {
  subscribe: boolean;
}

interface PatchuserprofileResponse {
  message: string;
  success: boolean;
}

interface ApiError {
  code: number;
  message: string;
}

async function patchuserprofile(
  baseUrl: string,
  accessToken: string,
  data: PatchuserprofileRequest
): Promise&lt;PatchuserprofileResponse&gt; {
  const response = await fetch(baseUrl + &#x27;/user/profile&#x27;, {
    method: &#x27;PATCH&#x27;,
    headers: {
      &#x27;Authorization&#x27;: &#x27;Bearer &#x27; + accessToken,
      &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
      &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as ApiError;
    throw new Error(&#x27;API Error &#x27; + error.code + &#x27;: &#x27; + error.message);
  }

  return responseData as PatchuserprofileResponse;
}

async function main(): Promise&lt;void&gt; {
  const requestData: PatchuserprofileRequest = {
    subscribe: true,
  };

  try {
    const result = await patchuserprofile(
      &#x27;https://develop.okd.finance/api&#x27;,
      &#x27;YOUR_ACCESS_TOKEN&#x27;,
      requestData
    );
    
    console.log(&#x27;Success:&#x27;, result.success);
    console.log(&#x27;Message:&#x27;, result.message);
  } catch (error) {
    console.error(&#x27;Error:&#x27;, error);
  }
}

main();`,
        },
  php: {
    1: `&lt;?php

function patchuserprofile($baseUrl, $accessToken, $data) {
    $url = $baseUrl . &#x27;/user/profile&#x27;;
    
    $headers = [
        &#x27;Authorization: Bearer &#x27; . $accessToken,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL =&gt; $url,
        CURLOPT_CUSTOMREQUEST =&gt; &#x27;PATCH&#x27;,
        CURLOPT_POSTFIELDS =&gt; json_encode($data),
        CURLOPT_HTTPHEADER =&gt; $headers,
        CURLOPT_RETURNTRANSFER =&gt; true,
        CURLOPT_TIMEOUT =&gt; 30,
        CURLOPT_SSL_VERIFYPEER =&gt; true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception(&quot;cURL Error: &quot; . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception(&quot;Invalid JSON response&quot;);
    }

    if ($httpCode !== 200) {
        $message = $data[&#x27;message&#x27;] ?? &#x27;Unknown API error&#x27;;
        $code = $data[&#x27;code&#x27;] ?? $httpCode;
        throw new Exception(&quot;API Error {$code}: {$message}&quot;);
    }

    return $data;
}

try {
    $requestData = [
        &#x27;subscribe&#x27; =&gt; true,
    ];

    $result = patchuserprofile(
        &#x27;https://develop.okd.finance/api&#x27;,
        &#x27;YOUR_ACCESS_TOKEN&#x27;,
        $requestData
    );

    echo &quot;Success: &quot; . ($result[&#x27;success&#x27;] ? &#x27;true&#x27; : &#x27;false&#x27;) . &quot;\n&quot;;
    echo &quot;Message: &quot; . $result[&#x27;message&#x27;] . &quot;\n&quot;;

} catch (Exception $e) {
    echo &quot;Error: &quot; . $e-&gt;getMessage() . &quot;\n&quot;;
}

?&gt;`,
        },
  python: {
    1: `import requests
import json
from typing import Dict, Optional


class TradingAPIError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f&quot;API Error {code}: {message}&quot;)


def patchuserprofile(base_url: str, access_token: str, data: Dict) -&gt; Dict:
    &quot;&quot;&quot;PATCH /user/profile&quot;&quot;&quot;
    url = f&quot;{base_url}/user/profile&quot;
    
    headers = {
        &#x27;Authorization&#x27;: f&#x27;Bearer {access_token}&#x27;,
        &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
        &#x27;Fingerprint&#x27;: &#x27;1358cd229b6bceb25941e99f4228997f&#x27;
    }
    
    try:
        response = requests.patch(
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response_data = response.json()
        
        if not response.ok:
            error_code = response_data.get(&#x27;code&#x27;, response.status_code)
            error_message = response_data.get(&#x27;message&#x27;, &#x27;Unknown API error&#x27;)
            raise TradingAPIError(error_code, error_message)
        
        return response_data
        
    except requests.exceptions.RequestException as e:
        raise Exception(f&quot;Network error: {e}&quot;)


def main():
    request_data = {
        &#x27;subscribe&#x27;: true,
    }
    
    try:
        result = patchuserprofile(
            &#x27;https://develop.okd.finance/api&#x27;,
            &#x27;YOUR_ACCESS_TOKEN&#x27;,
            request_data
        )
        
        print(f&quot;Success: {result.get(&#x27;success&#x27;, False)}&quot;)
        print(f&quot;Message: {result.get(&#x27;message&#x27;, &#x27;No message&#x27;)}&quot;)
        
    except (TradingAPIError, Exception) as e:
        print(f&quot;Error: {e}&quot;)


if __name__ == &quot;__main__&quot;:
    main()`
    },
  }
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
  margin: 0 0 0.65rem 0;
  color: var(--vp-c-brand);
  font-size: 1rem;
}

.collapse-toggle {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  margin-bottom: 0.65rem;
}

.collapse-toggle:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
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
  flex: 0 0 400px;
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

/* Code Blocks */
.code-block {
  background: var(--vp-code-bg);
  color: var(--vp-code-color);
  padding: 1.5rem;
  border-radius: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 1rem 0;
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

/* Testing Panel */
.testing-title {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-brand);
  font-size: 1.1rem;
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
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.test-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
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
}

</style>