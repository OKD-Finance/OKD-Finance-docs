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
          </div>
        </div>
      </div>
      <div class="status-row">
        <div v-if="getRawValues().apiBaseUrl" class="url-status">🌐 API: {{ getRawValues().apiBaseUrl }}</div>
        <div v-if="getRawValues().apiToken" class="token-status">✅ Token configured ({{ getRawValues().apiToken.length
          }} chars)</div>
        <div v-if="getRawValues().apiFingerprint" class="fingerprint-status">🔐 Fingerprint configured ({{ getRawValues().apiFingerprint.length
          }} chars)</div>
        <button v-if="getRawValues().apiToken || getRawValues().apiFingerprint" @click="clearAuth" class="clear-auth-btn"
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
      <section id="place-order" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge post">POST</span>
              <span class="endpoint-path">/spot/orders</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📈 Place Trading Order</h3>
              <p class="endpoint-description">Place a new trading order on the exchange with comprehensive order types
                and parameters.</p>
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
                  <code class="param-name">category</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Trading category: "spot"</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">symbol</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Trading pair symbol (e.g., "BNBETH", "ETHUSDT")</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">side</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order side: "Buy" or "Sell"</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">orderType</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order type: "Market" or "Limit"</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">qty</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order quantity in base currency</span>
                </div>
                <div class="param-item required">
                  <code class="param-name">price</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Order price (required for limit orders)</span>
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
                    <pre>curl -X POST "https://develop.okd.finance/api/spot/orders" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: YOUR_FINGERPRINT" \
  -d '{
  "category": "spot",
  "symbol": "BNBETH",
  "side": "Buy",
  "orderType": "Limit",
  "qty": "2",
  "price": "0.2"
  }'</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab1 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 1)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type OrderRequest struct {
    Category  string `json:"category"`
    Symbol    string `json:"symbol"`
    Side      string `json:"side"`
    OrderType string `json:"orderType"`
    Qty       string `json:"qty"`
    Price     string `json:"price"`
}

type OrderResponse struct {
    OrderID     string `json:"orderId"`
    OrderLinkID string `json:"orderLinkId"`
}

func placeOrder() (*OrderResponse, error) {
    url := "https://develop.okd.finance/api/spot/orders"
    
    orderData := OrderRequest{
        Category:  "spot",
        Symbol:    "BNBETH",
        Side:      "Buy",
        OrderType: "Limit",
        Qty:       "2",
        Price:     "0.2",
    }
    
    jsonData, err := json.Marshal(orderData)
    if err != nil {
        return nil, err
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
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
    
    var orderResp OrderResponse
    if err := json.Unmarshal(body, &orderResp); err != nil {
        return nil, err
    }
    
    return &orderResp, nil
}

func main() {
    order, err := placeOrder()
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    
    fmt.Printf("Order placed successfully!\n")
    fmt.Printf("Order ID: %s\n", order.OrderID)
    fmt.Printf("Order Link ID: %s\n", order.OrderLinkID)
}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab1 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 1)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>interface OrderRequest {
  category: 'spot';
  symbol: string;
  side: 'Buy' | 'Sell';
  orderType: 'Market' | 'Limit';
  qty: string;
  price: string;
}

interface OrderResponse {
  orderId: string;
  orderLinkId: string;
}

interface ApiError {
  code: number;
  message: string;
}

async function placeOrder(
  baseUrl: string,
  accessToken: string,
  orderData: OrderRequest
): Promise&lt;OrderResponse&gt; {
  const response = await fetch(`${baseUrl}/spot/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': 'YOUR_FINGERPRINT'
    },
    body: JSON.stringify(orderData)
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as ApiError;
    throw new Error(`API Error ${error.code}: ${error.message}`);
  }

  return responseData as OrderResponse;
}

async function main(): Promise&lt;void&gt; {
  const orderData: OrderRequest = {
    category: 'spot',
    symbol: 'BNBETH',
    side: 'Buy',
    orderType: 'Limit',
    qty: '2',
    price: '0.2'
  };

  try {
    const result = await placeOrder(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      orderData
    );
    
    console.log('Order placed successfully!');
    console.log(`Order ID: ${result.orderId}`);
    console.log(`Order Link ID: ${result.orderLinkId}`);
  } catch (error) {
    console.error('Error placing order:', error);
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

function placeOrder($baseUrl, $accessToken, $orderData) {
    $url = $baseUrl . '/spot/orders';
    
    $headers = [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json',
        'Fingerprint: YOUR_FINGERPRINT'
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($orderData),
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
    $orderData = [
        'category' => 'spot',
        'symbol' => 'BNBETH',
        'side' => 'Buy',
        'orderType' => 'Limit',
        'qty' => '2',
        'price' => '0.2'
    ];

    $result = placeOrder(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $orderData
    );

    echo "Order placed successfully!\\n";
    echo "Order ID: " . $result['orderId'] . "\\n";
    echo "Order Link ID: " . $result['orderLinkId'] . "\\n";

} catch (Exception $e) {
    echo "Error placing order: " . $e->getMessage() . "\\n";
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
        super().__init__(f"API Error {code}: {message}")


def place_order(base_url: str, access_token: str, order_data: Dict) -> Dict:
    """Place a trading order using the API"""
    url = f"{base_url}/spot/orders"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.post(
            url,
            headers=headers,
            json=order_data,
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
    order_data = {
        'category': 'spot',
        'symbol': 'BNBETH',
        'side': 'Buy',
        'orderType': 'Limit',
        'qty': '2',
        'price': '0.2'
    }
    
    try:
        result = place_order(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            order_data
        )
        
        print("Order placed successfully!")
        print(f"Order ID: {result['orderId']}")
        print(f"Order Link ID: {result['orderLinkId']}")
        
    except (TradingAPIError, Exception) as e:
        print(f"Error placing order: {e}")


if __name__ == "__main__":
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
  "orderId": "1980690610151328512",
  "orderLinkId": "1980690610151328513"
}</pre>
              </div>

              <div class="response-example">
                <div class="response-status error">400 Bad Request - Error</div>
                <pre class="code-block">{
  "code": 400591,
  "message": "unknown category"
}</pre>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Trading Pair</label>
                <select v-model="orderData.symbol" class="test-input">
                  <option value="BNBETH">BNBETH</option>
                  <option value="ETHUSDT">ETHUSDT</option>
                  <option value="ADAUSDT">ADAUSDT</option>
                  <option value="DOTUSDT">DOTUSDT</option>
                </select>
              </div>
              <div class="form-group">
                <label>Category</label>
                <select v-model="orderData.category" class="test-input">
                  <option value="spot">Spot</option>
                </select>
              </div>
              <div class="form-group">
                <label>Side</label>
                <select v-model="orderData.side" class="test-input">
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </select>
              </div>
              <div class="form-group">
                <label>Order Type</label>
                <select v-model="orderData.orderType" class="test-input">
                  <option value="Market">Market</option>
                  <option value="Limit">Limit</option>
                </select>
              </div>
              <div class="form-group">
                <label>Quantity</label>
                <input v-model="orderData.qty" type="text" placeholder="2" class="test-input" />
              </div>
              <div class="form-group">
                <label>Price</label>
                <input v-model="orderData.price" type="text" placeholder="0.2" class="test-input" />
              </div>
              <button @click="testPlaceOrder" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.placeOrder" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.placeOrder.status }}</span>
                  <span class="timestamp">{{ results.placeOrder.timestamp }}</span>
                  <button @click="copyToClipboard(results.placeOrder.data, $event)" class="copy-btn">📋 Copy
                    Response</button>
                </div>
                <div v-if="results.placeOrder.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.placeOrder.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.placeOrder.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.placeOrder.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.placeOrder.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="get-orders" class="endpoint-section">
        <div class="endpoint-layout">
          <!-- Documentation -->
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge get">GET</span>
              <span class="endpoint-path">/spot/orders/open</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 Get Open Orders</h3>
              <p class="endpoint-description">Retrieve all active (open) orders for the authenticated user with optional
                filtering capabilities.</p>
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
                  <code class="param-name">Fingerprint</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">32-character hex string for device identification</span>
                </div>
              </div>
            </div>

            <div class="api-section">
              <h4 class="section-title">🔍 Query Parameters</h4>
              <div class="param-list">
                <div class="param-item required">
                  <code class="param-name">category</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Trading category: "spot"</span>
                </div>
                <div class="param-item">
                  <code class="param-name">symbol</code>
                  <span class="param-type">string</span>
                  <span class="param-desc">Filter by trading pair (e.g., "BNBETH")</span>
                </div>
                <div class="param-item">
                  <code class="param-name">limit</code>
                  <span class="param-type">integer</span>
                  <span class="param-desc">Number of orders to return (default: 50, max: 500)</span>
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
                    <pre>curl -X GET "https://develop.okd.finance/api/spot/orders/open?category=spot&symbol=BNBETH&limit=10" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: YOUR_FINGERPRINT"</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab2 === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', 2)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "net/url"
)

type Order struct {
    OrderID     string `json:"orderId"`
    OrderLinkID string `json:"orderLinkId"`
    Symbol      string `json:"symbol"`
    Side        string `json:"side"`
    Price       string `json:"price"`
    Qty         string `json:"qty"`
    OrderStatus string `json:"orderStatus"`
    OrderType   string `json:"orderType"`
    BaseCoin    string `json:"baseCoin"`
    QuoteCoin   string `json:"quoteCoin"`
}

type OrdersResponse struct {
    Category       string  `json:"category"`
    NextPageCursor string  `json:"nextPageCursor,omitempty"`
    List           []Order `json:"list"`
}

func getOrders(category, symbol string, limit int) (*OrdersResponse, error) {
    baseURL := "https://develop.okd.finance/api/spot/orders/open"
    
    params := url.Values{}
    params.Add("category", category)
    if symbol != "" {
        params.Add("symbol", symbol)
    }
    if limit > 0 {
        params.Add("limit", fmt.Sprintf("%d", limit))
    }
    
    fullURL := baseURL + "?" + params.Encode()
    
    req, err := http.NewRequest("GET", fullURL, nil)
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
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
    
    var ordersResp OrdersResponse
    if err := json.Unmarshal(body, &ordersResp); err != nil {
        return nil, err
    }
    
    return &ordersResp, nil
}

func main() {
    orders, err := getOrders("spot", "BNBETH", 10)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    
    fmt.Printf("Retrieved %d orders\n", len(orders.List))
    for i, order := range orders.List {
        fmt.Printf("Order %d: %s %s %s@%s\n", 
            i+1, order.Symbol, order.Side, order.Qty, order.Price)
    }
}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab2 === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', 2)" class="copy-code-btn" title="Copy to clipboard">
                    📋
                  </button>
                  <div class="code-block">
                    <pre>interface OrdersParams {
  category: 'spot';
  symbol?: string;
  limit?: number;
}

interface Order {
  orderId: string;
  orderLinkId: string;
  symbol: string;
  side: string;
  price: string;
  qty: string;
  orderStatus: string;
  orderType: string;
  baseCoin: string;
  quoteCoin: string;
  createdTime: string;
  updatedTime: string;
}

interface OrdersResponse {
  category: string;
  list: Order[];
  nextPageCursor?: string;
}

interface ApiError {
  code: number;
  message: string;
}

function buildQueryString(params: OrdersParams): string {
  const searchParams = new URLSearchParams();
  searchParams.append('category', params.category);
  
  if (params.symbol) {
    searchParams.append('symbol', params.symbol);
  }
  
  if (params.limit) {
    searchParams.append('limit', params.limit.toString());
  }
  
  return searchParams.toString();
}

async function getOrders(
  baseUrl: string,
  accessToken: string,
  params: OrdersParams
): Promise&lt;OrdersResponse&gt; {
  const queryString = buildQueryString(params);
  const url = `${baseUrl}/spot/orders/open?${queryString}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Fingerprint': 'YOUR_FINGERPRINT'
    }
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as ApiError;
    throw new Error(`API Error ${error.code}: ${error.message}`);
  }

  return responseData as OrdersResponse;
}

function displayOrders(response: OrdersResponse): void {
  console.log(`Retrieved ${response.list.length} orders`);
  console.log(`Category: ${response.category}`);
  
  response.list.forEach((order, index) => {
    console.log(`Order ${index + 1}:`);
    console.log(`  Symbol: ${order.symbol} (${order.baseCoin}/${order.quoteCoin})`);
    console.log(`  Side: ${order.side} | Type: ${order.orderType}`);
    console.log(`  Price: ${order.price} | Qty: ${order.qty}`);
    console.log(`  Status: ${order.orderStatus}`);
  });
}

async function main(): Promise&lt;void&gt; {
  try {
    const result = await getOrders(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      { category: 'spot', symbol: 'BNBETH', limit: 10 }
    );
    
    displayOrders(result);
  } catch (error) {
    console.error('Error getting orders:', error);
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

function getOrders($baseUrl, $accessToken, $params) {
    $queryString = http_build_query(array_filter($params));
    $url = $baseUrl . '/spot/orders/open?' . $queryString;
    
    $headers = [
        'Authorization: Bearer ' . $accessToken,
        'Fingerprint: YOUR_FINGERPRINT'
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_HTTPGET => true,
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

function displayOrders($ordersData) {
    $orderCount = count($ordersData['list']);
    echo "Retrieved {$orderCount} orders\n";
    echo "Category: {$ordersData['category']}\n\n";
    
    foreach ($ordersData['list'] as $index => $order) {
        $orderNum = $index + 1;
        echo "Order {$orderNum}:\n";
        echo "  Symbol: {$order['symbol']} ({$order['baseCoin']}/{$order['quoteCoin']})\n";
        echo "  Side: {$order['side']} | Type: {$order['orderType']}\n";
        echo "  Price: {$order['price']} | Qty: {$order['qty']}\n";
        echo "  Status: {$order['orderStatus']}\n";
        echo "  Order ID: {$order['orderId']}\n\n";
    }
}

try {
    $params = [
        'category' => 'spot',
        'symbol' => 'BNBETH',
        'limit' => 10
    ];

    $ordersData = getOrders(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $params
    );

    displayOrders($ordersData);

} catch (Exception $e) {
    echo "Error getting orders: " . $e->getMessage() . "\n";
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
from typing import Dict, List, Optional


class TradingAPIError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f"API Error {code}: {message}")


def get_orders(
    base_url: str,
    access_token: str,
    category: str = 'spot',
    symbol: Optional[str] = None,
    limit: Optional[int] = None
) -> Dict:
    """Get open orders from the API"""
    url = f"{base_url}/spot/orders/open"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    params = {'category': category}
    if symbol:
        params['symbol'] = symbol
    if limit:
        params['limit'] = limit
    
    try:
        response = requests.get(
            url,
            headers=headers,
            params=params,
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


def display_orders(orders_data: Dict) -> None:
    """Display orders in a formatted way"""
    orders_list = orders_data.get('list', [])
    print(f"Retrieved {len(orders_list)} orders")
    print(f"Category: {orders_data.get('category', 'N/A')}\n")
    
    for i, order in enumerate(orders_list, 1):
        print(f"Order {i}:")
        print(f"  Symbol: {order['symbol']} ({order['baseCoin']}/{order['quoteCoin']})")
        print(f"  Side: {order['side']} | Type: {order['orderType']}")
        print(f"  Price: {order['price']} | Qty: {order['qty']}")
        print(f"  Status: {order['orderStatus']}")
        print(f"  Order ID: {order['orderId']}")
        print()


def main():
    try:
        orders_data = get_orders(
            base_url='https://develop.okd.finance/api',
            access_token='YOUR_ACCESS_TOKEN',
            category='spot',
            symbol='BNBETH',
            limit=10
        )
        
        display_orders(orders_data)
        
    except (TradingAPIError, Exception) as e:
        print(f"Error getting orders: {e}")


if __name__ == "__main__":
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
  "category": "spot",
  "nextPageCursor": "1980696465315826432%3A1750853418446%2C1980675399004556032%3A1750850907146",
  "list": [
    {
      "orderId": "1980696465315826432",
      "orderLinkId": "1980696465315826433",
      "symbol": "BNBETH",
      "price": "0.2",
      "qty": "1.00",
      "side": "Buy",
      "orderType": "Limit",
      "orderStatus": "New",
      "timeInForce": "GTC",
      "avgPrice": "0.0",
      "leavesQty": "1",
      "cumExecQty": "0",
      "cumExecFee": "0",
      "baseCoin": "BNB",
      "quoteCoin": "ETH",
      "createdTime": "1750853418446",
      "updatedTime": "1750853418450"
    }
  ]
}</pre>
              </div>

              <div class="response-example">
                <div class="response-status error">400 Bad Request - Error</div>
                <pre class="code-block">{
  "code": 400591,
  "message": "unknown category"
}</pre>
              </div>
            </div>
          </div>

          <!-- Testing Panel -->
          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              <div class="form-group">
                <label>Category</label>
                <select v-model="ordersData.category" class="test-input">
                  <option value="spot">Spot</option>
                </select>
              </div>
              <div class="form-group">
                <label>Symbol (optional)</label>
                <select v-model="ordersData.symbol" class="test-input">
                  <option value="">All symbols</option>
                  <option value="BNBETH">BNBETH</option>
                  <option value="ETHUSDT">ETHUSDT</option>
                  <option value="ADAUSDT">ADAUSDT</option>
                </select>
              </div>
              <div class="form-group">
                <label>Limit</label>
                <input v-model.number="ordersData.limit" type="number" placeholder="50" class="test-input" />
              </div>
              <button @click="testGetOrders" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.orders" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.orders.status }}</span>
                  <span class="timestamp">{{ results.orders.timestamp }}</span>
                  <button @click="copyToClipboard(results.orders.data, $event)" class="copy-btn">📋 Copy
                    Response</button>
                </div>
                <div v-if="results.orders.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.orders.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.orders.headers }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.orders.data }}</pre>
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
const activeCodeTab1 = ref('cURL')
const activeCodeTab2 = ref('cURL')

const orderData = reactive({
  category: 'spot',
  symbol: 'BNBETH',
  side: 'Buy',
  orderType: 'Limit',
  qty: '2',
  price: '0.2'
})

const ordersData = reactive({
  symbol: '',
  limit: 50,
  category: 'spot'
})



const results = reactive({
  placeOrder: null,
  orders: null
})

const testPlaceOrder = async () => {
  try {
    const authValues = getRawValues()
    
    // Проверяем готовность к отправке запроса
    if (!isReadyToSendRequest()) {
      results.placeOrder = {
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
      category: orderData.category,
      symbol: orderData.symbol,
      side: orderData.side,
      orderType: orderData.orderType,
      qty: orderData.qty,
      price: orderData.price
    }

    const fullUrl = `${authValues.apiBaseUrl}/spot/orders`
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
    results.placeOrder = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `POST ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.placeOrder = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const testGetOrders = async () => {
  try {
    const authValues = getRawValues()
    
    // Проверяем готовность к отправке запроса
    if (!isReadyToSendRequest()) {
      results.orders = {
        status: 'Authentication Error',
        data: 'Both Access Token and Fingerprint are required',
        timestamp: new Date().toLocaleTimeString(),
        requestUrl: 'Request not sent',
        headers: 'N/A'
      }
      return
    }

    let endpoint = '/spot/orders/open'
    const params = new URLSearchParams()

    if (ordersData.symbol) params.append('symbol', ordersData.symbol)
    if (ordersData.limit) params.append('limit', ordersData.limit)
    if (ordersData.category) params.append('category', ordersData.category)

    if (params.toString()) {
      endpoint += '?' + params.toString()
    }

    const fullUrl = `${authValues.apiBaseUrl}${endpoint}`
    const headers = {
      'Authorization': `Bearer ${authValues.apiToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    })

    const data = await response.text()
    results.orders = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: `GET ${fullUrl}`,
      headers: JSON.stringify(headers, null, 2)
    }
  } catch (error) {
    results.orders = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A'
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
    1: `curl -X POST "https://develop.okd.finance/api/spot/orders" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT" \\
  -d '{
    "category": "spot",
    "symbol": "BNBETH",
    "side": "Buy",
    "orderType": "Limit",
    "qty": "2",
    "price": "0.2"
  }'`,
    2: `curl -X GET "https://develop.okd.finance/api/spot/orders/open?category=spot&symbol=BNBETH&limit=10" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Fingerprint: YOUR_FINGERPRINT"`
  },
  go: {
    1: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type OrderRequest struct {
    Category  string \`json:"category"\`
    Symbol    string \`json:"symbol"\`
    Side      string \`json:"side"\`
    OrderType string \`json:"orderType"\`
    Qty       string \`json:"qty"\`
    Price     string \`json:"price"\`
}

type OrderResponse struct {
    OrderID     string \`json:"orderId"\`
    OrderLinkID string \`json:"orderLinkId"\`
}

func placeOrder() (*OrderResponse, error) {
    url := "https://develop.okd.finance/api/spot/orders"
    
    orderData := OrderRequest{
        Category:  "spot",
        Symbol:    "BNBETH",
        Side:      "Buy",
        OrderType: "Limit",
        Qty:       "2",
        Price:     "0.2",
    }
    
    jsonData, err := json.Marshal(orderData)
    if err != nil {
        return nil, err
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
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
    
    var orderResp OrderResponse
    if err := json.Unmarshal(body, &orderResp); err != nil {
        return nil, err
    }
    
    return &orderResp, nil
}

func main() {
    order, err := placeOrder()
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }
    
    fmt.Printf("Order placed successfully!\\n")
    fmt.Printf("Order ID: %s\\n", order.OrderID)
    fmt.Printf("Order Link ID: %s\\n", order.OrderLinkID)
}`,
    2: `package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "net/url"
)

type Order struct {
    OrderID     string \`json:"orderId"\`
    OrderLinkID string \`json:"orderLinkId"\`
    Symbol      string \`json:"symbol"\`
    Side        string \`json:"side"\`
    Price       string \`json:"price"\`
    Qty         string \`json:"qty"\`
    OrderStatus string \`json:"orderStatus"\`
    OrderType   string \`json:"orderType"\`
    BaseCoin    string \`json:"baseCoin"\`
    QuoteCoin   string \`json:"quoteCoin"\`
}

type OrdersResponse struct {
    Category       string  \`json:"category"\`
    NextPageCursor string  \`json:"nextPageCursor,omitempty"\`
    List           []Order \`json:"list"\`
}

func getOrders(category, symbol string, limit int) (*OrdersResponse, error) {
    baseURL := "https://develop.okd.finance/api/spot/orders/open"
    
    params := url.Values{}
    params.Add("category", category)
    if symbol != "" {
        params.Add("symbol", symbol)
    }
    if limit > 0 {
        params.Add("limit", fmt.Sprintf("%d", limit))
    }
    
    fullURL := baseURL + "?" + params.Encode()
    
    req, err := http.NewRequest("GET", fullURL, nil)
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
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
    
    var ordersResp OrdersResponse
    if err := json.Unmarshal(body, &ordersResp); err != nil {
        return nil, err
    }
    
    return &ordersResp, nil
}

func main() {
    orders, err := getOrders("spot", "BNBETH", 10)
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }
    
    fmt.Printf("Retrieved %d orders\\n", len(orders.List))
    for i, order := range orders.List {
        fmt.Printf("Order %d: %s %s %s@%s\\n", 
            i+1, order.Symbol, order.Side, order.Qty, order.Price)
    }
}`
  },
  typescript: {
    1: `interface OrderRequest {
  category: 'spot';
  symbol: string;
  side: 'Buy' | 'Sell';
  orderType: 'Market' | 'Limit';
  qty: string;
  price: string;
}

interface OrderResponse {
  orderId: string;
  orderLinkId: string;
}

interface ApiError {
  code: number;
  message: string;
}

async function placeOrder(
  baseUrl: string,
  accessToken: string,
  orderData: OrderRequest
): Promise<OrderResponse> {
  const response = await fetch(\`\${baseUrl}/spot/orders\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': 'YOUR_FINGERPRINT'
    },
    body: JSON.stringify(orderData)
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as ApiError;
    throw new Error(\`API Error \${error.code}: \${error.message}\`);
  }

  return responseData as OrderResponse;
}

async function main(): Promise<void> {
  const orderData: OrderRequest = {
    category: 'spot',
    symbol: 'BNBETH',
    side: 'Buy',
    orderType: 'Limit',
    qty: '2',
    price: '0.2'
  };

  try {
    const result = await placeOrder(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      orderData
    );
    
    console.log('Order placed successfully!');
    console.log(\`Order ID: \${result.orderId}\`);
    console.log(\`Order Link ID: \${result.orderLinkId}\`);
  } catch (error) {
    console.error('Error placing order:', error);
  }
}

main();`,
    2: `interface OrdersParams {
  category: 'spot';
  symbol?: string;
  limit?: number;
}

interface Order {
  orderId: string;
  orderLinkId: string;
  symbol: string;
  side: string;
  price: string;
  qty: string;
  orderStatus: string;
  orderType: string;
  baseCoin: string;
  quoteCoin: string;
  createdTime: string;
  updatedTime: string;
}

interface OrdersResponse {
  category: string;
  list: Order[];
  nextPageCursor?: string;
}

interface ApiError {
  code: number;
  message: string;
}

function buildQueryString(params: OrdersParams): string {
  const searchParams = new URLSearchParams();
  searchParams.append('category', params.category);
  
  if (params.symbol) {
    searchParams.append('symbol', params.symbol);
  }
  
  if (params.limit) {
    searchParams.append('limit', params.limit.toString());
  }
  
  return searchParams.toString();
}

async function getOrders(
  baseUrl: string,
  accessToken: string,
  params: OrdersParams
): Promise<OrdersResponse> {
  const queryString = buildQueryString(params);
  const url = \`\${baseUrl}/spot/orders/open?\${queryString}\`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Fingerprint': 'YOUR_FINGERPRINT'
    }
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as ApiError;
    throw new Error(\`API Error \${error.code}: \${error.message}\`);
  }

  return responseData as OrdersResponse;
}

function displayOrders(response: OrdersResponse): void {
  console.log(\`Retrieved \${response.list.length} orders\`);
  console.log(\`Category: \${response.category}\`);
  
  response.list.forEach((order, index) => {
    console.log(\`Order \${index + 1}:\`);
    console.log(\`  Symbol: \${order.symbol} (\${order.baseCoin}/\${order.quoteCoin})\`);
    console.log(\`  Side: \${order.side} | Type: \${order.orderType}\`);
    console.log(\`  Price: \${order.price} | Qty: \${order.qty}\`);
    console.log(\`  Status: \${order.orderStatus}\`);
  });
}

async function main(): Promise<void> {
  try {
    const result = await getOrders(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      { category: 'spot', symbol: 'BNBETH', limit: 10 }
    );
    
    displayOrders(result);
  } catch (error) {
    console.error('Error getting orders:', error);
  }
}

main();`
  },
  php: {
    1: `<?php

function placeOrder($baseUrl, $accessToken, $orderData) {
    $url = $baseUrl . '/spot/orders';
    
    $headers = [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json',
        'Fingerprint: YOUR_FINGERPRINT'
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($orderData),
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
    $orderData = [
        'category' => 'spot',
        'symbol' => 'BNBETH',
        'side' => 'Buy',
        'orderType' => 'Limit',
        'qty' => '2',
        'price' => '0.2'
    ];

    $result = placeOrder(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $orderData
    );

    echo "Order placed successfully!\\n";
    echo "Order ID: " . $result['orderId'] . "\\n";
    echo "Order Link ID: " . $result['orderLinkId'] . "\\n";

} catch (Exception $e) {
    echo "Error placing order: " . $e->getMessage() . "\\n";
}

?>`,
    2: `<?php

function getOrders($baseUrl, $accessToken, $params) {
    $queryString = http_build_query(array_filter($params));
    $url = $baseUrl . '/spot/orders/open?' . $queryString;
    
    $headers = [
        'Authorization: Bearer ' . $accessToken,
        'Fingerprint: YOUR_FINGERPRINT'
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_HTTPGET => true,
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

function displayOrders($ordersData) {
    $orderCount = count($ordersData['list']);
    echo "Retrieved {$orderCount} orders\\n";
    echo "Category: {$ordersData['category']}\\n\\n";
    
    foreach ($ordersData['list'] as $index => $order) {
        $orderNum = $index + 1;
        echo "Order {$orderNum}:\\n";
        echo "  Symbol: {$order['symbol']} ({$order['baseCoin']}/{$order['quoteCoin']})\\n";
        echo "  Side: {$order['side']} | Type: {$order['orderType']}\\n";
        echo "  Price: {$order['price']} | Qty: {$order['qty']}\\n";
        echo "  Status: {$order['orderStatus']}\\n";
        echo "  Order ID: {$order['orderId']}\\n\\n";
    }
}

try {
    $params = [
        'category' => 'spot',
        'symbol' => 'BNBETH',
        'limit' => 10
    ];

    $ordersData = getOrders(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $params
    );

    displayOrders($ordersData);

} catch (Exception $e) {
    echo "Error getting orders: " . $e->getMessage() . "\\n";
}

?>`
  },
  python: {
    1: `import requests
import json
from typing import Dict, Optional


class TradingAPIError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f"API Error {code}: {message}")


def place_order(base_url: str, access_token: str, order_data: Dict) -> Dict:
    """Place a trading order using the API"""
    url = f"{base_url}/spot/orders"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.post(
            url,
            headers=headers,
            json=order_data,
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
    order_data = {
        'category': 'spot',
        'symbol': 'BNBETH',
        'side': 'Buy',
        'orderType': 'Limit',
        'qty': '2',
        'price': '0.2'
    }
    
    try:
        result = place_order(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            order_data
        )
        
        print("Order placed successfully!")
        print(f"Order ID: {result['orderId']}")
        print(f"Order Link ID: {result['orderLinkId']}")
        
    except (TradingAPIError, Exception) as e:
        print(f"Error placing order: {e}")


if __name__ == "__main__":
    main()`,
    2: `import requests
from typing import Dict, List, Optional


class TradingAPIError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f"API Error {code}: {message}")


def get_orders(
    base_url: str,
    access_token: str,
    category: str = 'spot',
    symbol: Optional[str] = None,
    limit: Optional[int] = None
) -> Dict:
    """Get open orders from the API"""
    url = f"{base_url}/spot/orders/open"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    params = {'category': category}
    if symbol:
        params['symbol'] = symbol
    if limit:
        params['limit'] = limit
    
    try:
        response = requests.get(
            url,
            headers=headers,
            params=params,
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


def display_orders(orders_data: Dict) -> None:
    """Display orders in a formatted way"""
    orders_list = orders_data.get('list', [])
    print(f"Retrieved {len(orders_list)} orders")
    print(f"Category: {orders_data.get('category', 'N/A')}\\n")
    
    for i, order in enumerate(orders_list, 1):
        print(f"Order {i}:")
        print(f"  Symbol: {order['symbol']} ({order['baseCoin']}/{order['quoteCoin']})")
        print(f"  Side: {order['side']} | Type: {order['orderType']}")
        print(f"  Price: {order['price']} | Qty: {order['qty']}")
        print(f"  Status: {order['orderStatus']}")
        print(f"  Order ID: {order['orderId']}")
        print()


def main():
    try:
        orders_data = get_orders(
            base_url='https://develop.okd.finance/api',
            access_token='YOUR_ACCESS_TOKEN',
            category='spot',
            symbol='BNBETH',
            limit=10
        )
        
        display_orders(orders_data)
        
    except (TradingAPIError, Exception) as e:
        print(f"Error getting orders: {e}")


if __name__ == "__main__":
    main()`
  }
}

const copyCodeToClipboard = (lang, endpointNum) => {
  const authValues = getRawValues()
  let code = codeExamples[lang]?.[endpointNum]
  
  if (code) {
    // Заменяем плейсхолдеры на актуальные значения
    code = code.replace(/YOUR_ACCESS_TOKEN/g, authValues.apiToken || 'YOUR_ACCESS_TOKEN')
    code = code.replace(/YOUR_FINGERPRINT/g, authValues.apiFingerprint || 'YOUR_FINGERPRINT')
    code = code.replace(/https:\/\/develop\.okd\.finance\/api/g, authValues.apiBaseUrl || 'https://develop.okd.finance/api')
    
    navigator.clipboard.writeText(code).then(() => {
      // Visual feedback could be added here
      // eslint-disable-next-line no-console
      console.log('Code copied to clipboard!')
    }).catch(err => {
      // eslint-disable-next-line no-console
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
  grid-template-columns: 1fr 1fr 1fr;
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