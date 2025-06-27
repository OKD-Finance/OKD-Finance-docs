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
/* Fixed Authentication Header */
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
  margin: 0 0 0.8rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  /* Primary color for maximum visibility */
  color: var(--vp-c-brand) !important;
  /* Remove gradient effects that may cause invisibility */
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: unset !important;
  background-clip: unset !important;
  /* Ensure text doesn't wrap and fits */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .auth-title h4 {
    font-size: 0.95rem;
    gap: 0.3rem;
  }
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
  gap: 1rem;
  margin-bottom: 0.65rem;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
  max-height: 200px;
  opacity: 1;
}

/* Responsive grid for smaller screens */
@media (max-width: 1024px) {
  .api-config-row {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
}

@media (min-width: 1025px) and (max-width: 1200px) {
  .api-config-row {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
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
.response-examples {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.response-example {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.response-example:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.response-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-border);
}

.response-status {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  color: white;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
  min-width: 60px;
  justify-content: center;
}

.response-status.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.response-status.success::before {
  content: '✅ ';
  margin-right: 0.25rem;
}

.response-status.error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

.response-status.error::before {
  content: '❌ ';
  margin-right: 0.25rem;
}

.response-description {
  flex: 1;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  font-weight: 500;
}

.response-example .code-block {
  margin: 0;
  border-radius: 0;
  background: var(--vp-c-bg-alt);
}

.response-example .code-block pre {
  margin: 0;
  padding: 1rem;
  background: transparent;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .response-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .response-status {
    align-self: flex-start;
  }
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
}
</style>