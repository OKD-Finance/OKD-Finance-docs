---
layout: page
---

<ApiDoc>
  <template #content>

# Authentication API

The Authentication API provides all necessary endpoints for user registration, login, token management, and profile updates.

::: tip Interactive Testing
On this page you can test the API in real time! Enter your API key in the field below and click the "Test" buttons to send requests to the server `https://develop.okd.finance/api`.

**If you encounter CORS errors:**
- Use the "📋 Copy curl" buttons to get ready-to-use commands
- Execute commands in terminal or use Postman
- Install a browser extension to disable CORS (e.g., "CORS Unblock")
:::

## Overview

This API allows users to:
- Register new accounts
- Log in and obtain authentication tokens
- Refresh expired tokens
- Manage user profiles and security settings

<ApiMethod 
  method="POST"
  endpoint="/auth/sign-up"
  title="User Registration"
  description="Registers a new user account with email and password."
  :parameters="[
    { name: 'email', type: 'string', required: true, description: 'User\'s email address' },
    { name: 'password', type: 'string', required: true, description: 'User\'s password (min 8 chars)' },
    { name: 'fingerprint', type: 'string', required: true, description: 'User device unique ID (in header)' },
    { name: 'X-RECAPTCHA', type: 'string', required: true, description: 'RECAPTCHA token (in header)' },
    { name: 'X-PLATFORM-ID', type: 'string', required: true, description: 'Recaptcha platform ID (in header)' }
  ]"
  :responses="[
    { status: '200 OK', description: 'User registered successfully' },
    { status: '400 Bad Request', description: 'Invalid input or user already exists' }
  ]"
/>

<ApiMethod 
  method="POST"
  endpoint="/auth/sign-in"
  title="User Login"
  description="Authenticates a user and returns access and refresh tokens."
  :parameters="[
    { name: 'email', type: 'string', required: true, description: 'User\'s email address' },
    { name: 'password', type: 'string', required: true, description: 'User\'s password' },
    { name: 'fingerprint', type: 'string', required: true, description: 'User device unique ID (in header)' },
    { name: 'X-RECAPTCHA', type: 'string', required: true, description: 'RECAPTCHA token (in header)' },
    { name: 'X-PLATFORM-ID', type: 'string', required: true, description: 'Recaptcha platform ID (in header)' }
  ]"
  :responses="[
    { status: '200 OK', description: 'Login successful, returns tokens' },
    { status: '401 Unauthorized', description: 'Invalid credentials' }
  ]"
/>

<ApiMethod 
  method="POST"
  endpoint="/auth/refresh"
  title="Refresh Access Token"
  description="Refreshes an expired access token using the refresh token."
  :parameters="[
    { name: 'refreshToken', type: 'string', required: true, description: 'The refresh token' }
  ]"
  :responses="[
    { status: '200 OK', description: 'Token refreshed successfully' },
    { status: '401 Unauthorized', description: 'Invalid refresh token' }
  ]"
/>

<ApiMethod
  method="GET"
  endpoint="/auth/profile"
  title="Get User Profile"
  description="Retrieves the authenticated user's profile information."
  :parameters="[
    { name: 'Authorization', type: 'string', required: true, description: 'Bearer access token (in header)' }
  ]"
  :responses="[
    { status: '200 OK', description: 'Profile retrieved successfully' },
    { status: '401 Unauthorized', description: 'Authentication required' }
  ]"
/>

  </template>

  <template #examples>

<!-- API Key Configuration Section -->
<div class="api-key-section">
  <h4>API Configuration</h4>
  <div class="api-key-controls">
    <div class="api-key-input-group">
      <label for="global-api-key">API Key:</label>
      <input type="text" id="global-api-key" class="api-key-input" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
    </div>
    <button onclick="setGlobalApiKey()" class="set-api-key-button">Set API Key</button>
  </div>
  <div class="api-key-status"></div>
</div>

<div class="example-block" data-lang="curl">

### User Registration

<div class="api-demo">
  <div class="demo-controls">
    <label for="signup-email">Email:</label>
    <input type="email" id="signup-email" placeholder="user@example.com" />
    <label for="signup-password">Password:</label>
    <input type="password" id="signup-password" placeholder="min 8 characters" />
    <label for="signup-fingerprint">Fingerprint:</label>
    <input type="text" id="signup-fingerprint" placeholder="device_unique_id" />
    <label for="signup-recaptcha">X-RECAPTCHA:</label>
    <input type="text" id="signup-recaptcha" placeholder="recaptcha_token" />
    <label for="signup-platform-id">X-PLATFORM-ID:</label>
    <input type="text" id="signup-platform-id" placeholder="platform_id" />
    <div class="button-group">
      <button onclick="testSignUp()" class="test-button">Test</button>
      <button onclick="copyCurlCommand('/auth/sign-up', {method: 'POST', body: JSON.stringify({email: 'user@example.com', password: 'password123'})})" class="copy-curl-button">📋 Copy curl</button>
    </div>
  </div>
</div>

```bash
curl -X POST "https://develop.okd.finance/api/auth/sign-up" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: device_unique_id" \
  -H "X-RECAPTCHA: recaptcha_token" \
  -H "X-PLATFORM-ID: platform_id" \
  -d '{
    "email": "user@example.com",
    "password": "yoursecurepassword"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user_12345"
  },
  "error": null
}
```

### User Login

<div class="api-demo">
  <div class="demo-controls">
    <label for="signin-email">Email:</label>
    <input type="email" id="signin-email" placeholder="user@example.com" />
    <label for="signin-password">Password:</label>
    <input type="password" id="signin-password" placeholder="securepassword123" />
    <label for="signin-fingerprint">Fingerprint:</label>
    <input type="text" id="signin-fingerprint" placeholder="device_unique_id" />
    <label for="signin-recaptcha">X-RECAPTCHA:</label>
    <input type="text" id="signin-recaptcha" placeholder="recaptcha_token" />
    <label for="signin-platform-id">X-PLATFORM-ID:</label>
    <input type="text" id="signin-platform-id" placeholder="platform_id" />
    <div class="button-group">
      <button onclick="testSignIn()" class="test-button">Test</button>
      <button onclick="copyCurlCommand('/auth/sign-in', {method: 'POST', body: JSON.stringify({email: 'user@example.com', password: 'password123'})})" class="copy-curl-button">📋 Copy curl</button>
    </div>
  </div>
</div>

```bash
curl -X POST "https://develop.okd.finance/api/auth/sign-in" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: device_unique_id" \
  -H "X-RECAPTCHA: recaptcha_token" \
  -H "X-PLATFORM-ID: platform_id" \
  -d '{
    "email": "user@example.com",
    "password": "yoursecurepassword"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "user_12345",
      "email": "user@example.com"
    }
  },
  "error": null
}
```

### Refresh Token

<div class="api-demo">
  <div class="demo-controls">
    <label for="refresh-token">Refresh Token:</label>
    <input type="text" id="refresh-token" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
    <div class="button-group">
      <button onclick="testRefreshToken()" class="test-button">Test</button>
      <button onclick="copyCurlCommand('/auth/refresh', {method: 'POST', body: JSON.stringify({refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'})})" class="copy-curl-button">📋 Copy curl</button>
    </div>
  </div>
</div>

```bash
curl -X POST "https://develop.okd.finance/api/auth/refresh" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "error": null
}
```

### Get User Profile

<div class="api-demo">
  <div class="demo-controls">
    <div class="button-group">
      <button onclick="testGetProfile()" class="test-button">Test</button>
      <button onclick="copyCurlCommand('/auth/profile', {method: 'GET'})" class="copy-curl-button">📋 Copy curl</button>
    </div>
  </div>
</div>

```bash
curl -X GET "https://develop.okd.finance/api/auth/profile" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_12345",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "status": "active",
    "createdAt": "2024-01-01T10:00:00Z"
  },
  "error": null
}
```

</div>

<div class="example-block" data-lang="go">

### Go HTTP Client

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    // User registration
    regData := map[string]string{
        "email":    "user@example.com",
        "password": "yoursecurepassword",
    }
    
    jsonData, _ := json.Marshal(regData)
    req, _ := http.NewRequest("POST", "https://develop.okd.finance/api/auth/sign-up", bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "device_unique_id")
    req.Header.Set("X-RECAPTCHA", "recaptcha_token")
    req.Header.Set("X-PLATFORM-ID", "platform_id")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Printf("Response: %s\n", body)
}
```

</div>

<div class="example-block" data-lang="javascript">

### JavaScript Fetch

```javascript
// User registration
const signUp = async () => {
  const response = await fetch('https://develop.okd.finance/api/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Fingerprint': 'device_unique_id',
      'X-RECAPTCHA': 'recaptcha_token',
      'X-PLATFORM-ID': 'platform_id'
    },
    body: JSON.stringify({
      email: 'user@example.com',
      password: 'yoursecurepassword'
    })
  });
  
  const result = await response.json();
  console.log('Registration result:', result);
};

// User login
const signIn = async () => {
  const response = await fetch('https://develop.okd.finance/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Fingerprint': 'device_unique_id',
      'X-RECAPTCHA': 'recaptcha_token',
      'X-PLATFORM-ID': 'platform_id'
    },
    body: JSON.stringify({
      email: 'user@example.com',
      password: 'yoursecurepassword'
    })
  });
  
  const result = await response.json();
  console.log('Login result:', result);
};
```

</div>

<div class="example-block" data-lang="python">

### Python Requests

```python
import requests
import json

# API configuration
API_BASE = 'https://develop.okd.finance/api'

# User registration
reg_data = {
    'email': 'user@example.com',
    'password': 'yoursecurepassword'
}

headers = {
    'Content-Type': 'application/json',
    'Fingerprint': 'device_unique_id',
    'X-RECAPTCHA': 'recaptcha_token',
    'X-PLATFORM-ID': 'platform_id'
}

response = requests.post(f'{API_BASE}/auth/sign-up', 
                        headers=headers, 
                        json=reg_data)

if response.status_code == 200:
    result = response.json()
    print(f"Registration successful: {result['data']['userId']}")
else:
    print(f"Error: {response.status_code}")
```

</div>

<div class="example-block" data-lang="php">

### PHP cURL

```php
<?php
$baseUrl = 'https://develop.okd.finance/api';

// User registration
$regData = json_encode([
    'email' => 'user@example.com',
    'password' => 'yoursecurepassword'
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $baseUrl . '/auth/sign-up');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $regData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Fingerprint: device_unique_id',
    'X-RECAPTCHA: recaptcha_token',
    'X-PLATFORM-ID: platform_id'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $result = json_decode($response, true);
    echo "Registration successful: " . $result['data']['userId'] . "\n";
} else {
    echo "Error: " . $httpCode . "\n";
}

```

</div>

  </template>
</ApiDoc>
