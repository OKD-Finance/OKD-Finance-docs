<template>
  <div class="single-endpoint">
    <div class="endpoint-layout">
      <div class="endpoint-docs">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/errdesc</span>
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
              <pre>curl -X GET &quot;https://develop.okd.finance/api/errdesc&quot; \
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
    url := &quot;https://develop.okd.finance/api/errdesc&quot;
    
    req, _ := http.NewRequest(&quot;GET&quot;, url, nil)
    
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

async function errdescRequest() {
  try {
    const response = await apiClient.get(&#39;/errdesc&#39;);
    
    console.log(&#39;Response:&#39;, response.data);
    return response.data;
  } catch (error) {
    console.error(&#39;Error:&#39;, error.response?.data || error.message);
    throw error;
  }
}

// Usage
errdescRequest();</pre>
            </div>
            <div v-show="activeCodeTab === 'PHP'" class="code-block">
              <pre>&lt;?php

$url = &#39;https://develop.okd.finance/api/errdesc&#39;;
$headers = [
    &#39;Authorization: Bearer YOUR_ACCESS_TOKEN&#39;,
    &#39;Content-Type: application/json&#39;,
    &#39;Fingerprint: YOUR_FINGERPRINT&#39;
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, &#39;GET&#39;);
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

url = &#39;https://develop.okd.finance/api/errdesc&#39;
headers = {
    &#39;Authorization&#39;: &#39;Bearer YOUR_ACCESS_TOKEN&#39;,
    &#39;Content-Type&#39;: &#39;application/json&#39;,
    &#39;Fingerprint&#39;: &#39;YOUR_FINGERPRINT&#39;
}

try:
    response = requests.get(url, headers=headers)
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
                <span class="response-status error">400103</span>
                <span class="response-description">unknown asset</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown asset&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400104</span>
                <span class="response-description">balance is not enough</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;balance is not enough&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400105</span>
                <span class="response-description">withdrawal is processed</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;withdrawal is processed&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400106</span>
                <span class="response-description">empty source id or asset id in body</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty source id or asset id in body&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400107</span>
                <span class="response-description">recipient not found</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;recipient not found&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400108</span>
                <span class="response-description">transfer is processed</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;transfer is processed&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400109</span>
                <span class="response-description">same account for transfer</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;same account for transfer&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400110</span>
                <span class="response-description">precents sum is over 100</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;precents sum is over 100&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400111</span>
                <span class="response-description">dublicated external id</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;dublicated external id&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400112</span>
                <span class="response-description">unknown wallet type</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown wallet type&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400113</span>
                <span class="response-description">transfer is failed</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;transfer is failed&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400114</span>
                <span class="response-description">same wallet for transfer</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;same wallet for transfer&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400115</span>
                <span class="response-description">transaction is not found</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;transaction is not found&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400134</span>
                <span class="response-description">empty admin id</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty admin id&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400140</span>
                <span class="response-description">invalid preference</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid preference&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400141</span>
                <span class="response-description">max preference symbols is reached</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;max preference symbols is reached&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400201</span>
                <span class="response-description">this login already exists</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;this login already exists&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400202</span>
                <span class="response-description">no rights for role</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;no rights for role&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400203</span>
                <span class="response-description">request validation fails</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;request validation fails&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400204</span>
                <span class="response-description">no rights for endpoint</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;no rights for endpoint&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400205</span>
                <span class="response-description">no rights for notification</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;no rights for notification&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400206</span>
                <span class="response-description">role exists</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;role exists&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400207</span>
                <span class="response-description">role is not exist</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;role is not exist&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400208</span>
                <span class="response-description">you can't edit admin</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;you can&#39;t edit admin&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400209</span>
                <span class="response-description">wrong role</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;wrong role&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400210</span>
                <span class="response-description">you can't edit yourself</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;you can&#39;t edit yourself&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400211</span>
                <span class="response-description">you can't delete yourself</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;you can&#39;t delete yourself&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400212</span>
                <span class="response-description">department isn't empty</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;department isn&#39;t empty&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400213</span>
                <span class="response-description">unknown request type</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown request type&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400214</span>
                <span class="response-description">can't approve your own action</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;can&#39;t approve your own action&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400215</span>
                <span class="response-description">action is processed</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;action is processed&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400216</span>
                <span class="response-description">different supervisors</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;different supervisors&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400217</span>
                <span class="response-description">no approvers</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;no approvers&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400218</span>
                <span class="response-description">invalid access account permissions</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid access account permissions&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400300</span>
                <span class="response-description">webhook payload is empty</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;webhook payload is empty&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400301</span>
                <span class="response-description">invalid KYC webhook message</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid KYC webhook message&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400302</span>
                <span class="response-description">invalid KYC limit</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid KYC limit&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400303</span>
                <span class="response-description">unknown risk factor</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown risk factor&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400304</span>
                <span class="response-description">risk level is not high</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;risk level is not high&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400400</span>
                <span class="response-description">unsupported KYC provider</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unsupported KYC provider&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400401</span>
                <span class="response-description">invalid email</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid email&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400404</span>
                <span class="response-description">KYC provider not found</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;KYC provider not found&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400410</span>
                <span class="response-description">no files attached</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;no files attached&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400411</span>
                <span class="response-description">the number of files exceeds the limit</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;the number of files exceeds the limit&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400412</span>
                <span class="response-description">upload file size exceeds the limit</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;upload file size exceeds the limit&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400413</span>
                <span class="response-description">incorrect upload files type</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;incorrect upload files type&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400501</span>
                <span class="response-description">this email already exists</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;this email already exists&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400502</span>
                <span class="response-description">unknown global flag</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown global flag&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400503</span>
                <span class="response-description">invalid verification code</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid verification code&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400505</span>
                <span class="response-description">invalid refresh token</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid refresh token&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400506</span>
                <span class="response-description">session does not exit</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;session does not exit&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400507</span>
                <span class="response-description">invalid input data</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid input data&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400510</span>
                <span class="response-description">initiator does not exists</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;initiator does not exists&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400511</span>
                <span class="response-description">you can't invite admin for this role</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;you can&#39;t invite admin for this role&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400512</span>
                <span class="response-description">unknown invitation</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown invitation&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400513</span>
                <span class="response-description">empty role</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty role&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400514</span>
                <span class="response-description">empty name</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty name&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400516</span>
                <span class="response-description">empty reason</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty reason&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400517</span>
                <span class="response-description">admin does not exists</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;admin does not exists&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400518</span>
                <span class="response-description">you can't lock admin with this role</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;you can&#39;t lock admin with this role&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400519</span>
                <span class="response-description">empty email</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty email&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400525</span>
                <span class="response-description">user does not exist</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;user does not exist&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400526</span>
                <span class="response-description">invalid password</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid password&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400527</span>
                <span class="response-description">operation isn't exist</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;operation isn&#39;t exist&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400528</span>
                <span class="response-description">too early to resend code</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;too early to resend code&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400529</span>
                <span class="response-description">invalid confirmation code</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid confirmation code&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400530</span>
                <span class="response-description">unknown operation type</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown operation type&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400531</span>
                <span class="response-description">OTP is already turned on</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;OTP is already turned on&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400532</span>
                <span class="response-description">OTP is already turned off</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;OTP is already turned off&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400533</span>
                <span class="response-description">this email isn't exist</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;this email isn&#39;t exist&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400535</span>
                <span class="response-description">API key isn't exist</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;API key isn&#39;t exist&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400536</span>
                <span class="response-description">invalid user name</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid user name&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400537</span>
                <span class="response-description">empty recipient</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty recipient&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400538</span>
                <span class="response-description">withdrawal is disabled</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;withdrawal is disabled&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400539</span>
                <span class="response-description">empty account id</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty account id&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400540</span>
                <span class="response-description">invitation with this email already exists</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invitation with this email already exists&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400543</span>
                <span class="response-description">unknown selection mode</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown selection mode&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400544</span>
                <span class="response-description">unknown status of logs</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown status of logs&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400545</span>
                <span class="response-description">trading is locked</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;trading is locked&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400546</span>
                <span class="response-description">empty flag name</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty flag name&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400547</span>
                <span class="response-description">flag is already set</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;flag is already set&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400548</span>
                <span class="response-description">unknown flag</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown flag&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400553</span>
                <span class="response-description">withdraw is blocked for this user</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;withdraw is blocked for this user&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400554</span>
                <span class="response-description">withdraw amount exceeded</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;withdraw amount exceeded&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400556</span>
                <span class="response-description">confirmation code is expired</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;confirmation code is expired&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400557</span>
                <span class="response-description">confirmation code is invalid</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;confirmation code is invalid&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400558</span>
                <span class="response-description">code is already sent</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;code is already sent&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400559</span>
                <span class="response-description">referral program is diabled for user</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;referral program is diabled for user&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400560</span>
                <span class="response-description">max count of referral links is reached</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;max count of referral links is reached&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400561</span>
                <span class="response-description">referral link is not found</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;referral link is not found&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400562</span>
                <span class="response-description">empty referral link</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty referral link&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400563</span>
                <span class="response-description">invalid referral percent</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid referral percent&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400564</span>
                <span class="response-description">Asset close-only mode enabled</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;Asset close-only mode enabled&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400567</span>
                <span class="response-description">Get asset close-only failed</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;Get asset close-only failed&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400568</span>
                <span class="response-description">email code is invalid</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;email code is invalid&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400569</span>
                <span class="response-description">unknown KYC flow</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown KYC flow&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400570</span>
                <span class="response-description">user is unverified</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;user is unverified&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400571</span>
                <span class="response-description">deposits are disabled</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;deposits are disabled&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400572</span>
                <span class="response-description">KYC level 1 is required</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;KYC level 1 is required&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400573</span>
                <span class="response-description">unknown country</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown country&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400574</span>
                <span class="response-description">need to specify reason</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;need to specify reason&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400576</span>
                <span class="response-description">unknown direction</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown direction&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400577</span>
                <span class="response-description">socket is not configured</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;socket is not configured&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400578</span>
                <span class="response-description">user is in removing process</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;user is in removing process&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400579</span>
                <span class="response-description">user is active</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;user is active&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400580</span>
                <span class="response-description">too long reason</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;too long reason&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400581</span>
                <span class="response-description">unknown locale</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown locale&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400582</span>
                <span class="response-description">fcm is empty</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;fcm is empty&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400583</span>
                <span class="response-description">device platform is empty</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;device platform is empty&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400584</span>
                <span class="response-description">device id is empty</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;device id is empty&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400585</span>
                <span class="response-description">source id is empty</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;source id is empty&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400586</span>
                <span class="response-description">datasource graphic period is invalid</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;datasource graphic period is invalid&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400587</span>
                <span class="response-description">datasource asset pair not found</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;datasource asset pair not found&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400588</span>
                <span class="response-description">empty datasource</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty datasource&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400589</span>
                <span class="response-description">empty config</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty config&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400590</span>
                <span class="response-description">empty prices</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty prices&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400591</span>
                <span class="response-description">unknown category</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown category&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400592</span>
                <span class="response-description">wrong category</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;wrong category&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400593</span>
                <span class="response-description">zero coin price</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;zero coin price&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400595</span>
                <span class="response-description">failed to create inter transfer</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;failed to create inter transfer&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400596</span>
                <span class="response-description">unknown order params</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown order params&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400597</span>
                <span class="response-description">empty external id</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty external id&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400598</span>
                <span class="response-description">symbol not found</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;symbol not found&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400599</span>
                <span class="response-description">empty issue date</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty issue date&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400601</span>
                <span class="response-description">symbol is disabled</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;symbol is disabled&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400602</span>
                <span class="response-description">coin is disabled</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;coin is disabled&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400603</span>
                <span class="response-description">function is disabled</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;function is disabled&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400604</span>
                <span class="response-description">empty order id</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty order id&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400900</span>
                <span class="response-description">invalid number</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid number&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400901</span>
                <span class="response-description">invalid bool</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid bool&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">400999</span>
                <span class="response-description">not implemented</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;not implemented&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401100</span>
                <span class="response-description">unknown API key</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown API key&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401101</span>
                <span class="response-description">invalid timestamp</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid timestamp&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401102</span>
                <span class="response-description">invalid signature</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid signature&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401103</span>
                <span class="response-description">empty password</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty password&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401104</span>
                <span class="response-description">invalid login</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid login&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401501</span>
                <span class="response-description">empty token</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty token&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401502</span>
                <span class="response-description">empty fingerprint</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty fingerprint&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401503</span>
                <span class="response-description">not bearer token</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;not bearer token&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401504</span>
                <span class="response-description">invalid access token</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid access token&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401506</span>
                <span class="response-description">token expired</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;token expired&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401507</span>
                <span class="response-description">invalid login or password</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid login or password&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401509</span>
                <span class="response-description">admin locked</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;admin locked&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401510</span>
                <span class="response-description">invalid one time password</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid one time password&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401511</span>
                <span class="response-description">admin deleted</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;admin deleted&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401514</span>
                <span class="response-description">empty OTP</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty OTP&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401515</span>
                <span class="response-description">admin is unlocked</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;admin is unlocked&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401516</span>
                <span class="response-description">invalid state value</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid state value&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401517</span>
                <span class="response-description">empty Google code</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty Google code&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401518</span>
                <span class="response-description">account is blocked</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;account is blocked&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401519</span>
                <span class="response-description">unsuccessful validation</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unsuccessful validation&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401520</span>
                <span class="response-description">empty reCaptchaToken</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty reCaptchaToken&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401522</span>
                <span class="response-description">user configuration error</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;user configuration error&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401523</span>
                <span class="response-description">empty recaptcha platform id</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;empty recaptcha platform id&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401524</span>
                <span class="response-description">unknown platform</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;unknown platform&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401525</span>
                <span class="response-description">incorrect UID</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;incorrect UID&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401526</span>
                <span class="response-description">user is disabled</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;user is disabled&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401527</span>
                <span class="response-description">user's email is not verified</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;user&#39;s email is not verified&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401528</span>
                <span class="response-description">operation isn't allowed</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;operation isn&#39;t allowed&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401529</span>
                <span class="response-description">too many login attempts</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;too many login attempts&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401530</span>
                <span class="response-description">too many different geolocations</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;too many different geolocations&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401531</span>
                <span class="response-description">too many different emails for one device in a row</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;too many different emails for one device in a row&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401532</span>
                <span class="response-description">too many failed login attempts in a row</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;too many failed login attempts in a row&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401533</span>
                <span class="response-description">too many failed login attempts</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;too many failed login attempts&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401534</span>
                <span class="response-description">failed firebase validation</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;failed firebase validation&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">401535</span>
                <span class="response-description">invalid balance type</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;invalid balance type&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
}</pre>
              </div>
            </div>
            <div class="response-example">
              <div class="response-header">
                <span class="response-status error">403101</span>
                <span class="response-description">access denied</span>
              </div>
              <div class="code-block">
                <pre>{
  &quot;success&quot;: false,
  &quot;error&quot;: {
    &quot;code&quot;: &quot;INTERNAL_SERVER_ERROR&quot;,
    &quot;message&quot;: &quot;access denied&quot;,
    &quot;details&quot;: &quot;An unexpected error occurred on the server&quot;,
    &quot;requestId&quot;: &quot;req_1234567890&quot;
  },
  &quot;timestamp&quot;: &quot;2024-01-01T12:00:00Z&quot;
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

    const fullUrl = `${authValues.apiBaseUrl}/errdesc`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    result.value = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
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