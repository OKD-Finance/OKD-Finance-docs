---
layout: page
---

<ApiDoc>
  <template #content>

# Users API

The Users API provides comprehensive endpoints for managing user profiles, account settings, and user-related operations.

::: tip Interactive Testing
On this page you can test the API in real time! Enter your API key in the field below and click the "Test" buttons to send requests to the server `https://develop.okd.finance/api`.

**If you encounter CORS errors:**
- Use the "📋 Copy curl" buttons to get ready-to-use commands
- Execute commands in terminal or use Postman
- Install a browser extension to disable CORS (e.g., "CORS Unblock")
:::

## Overview

This API allows users to:
- Retrieve and update user profile information
- Manage account settings and preferences
- View user activity history
- Change passwords and security settings

<ApiMethod 
  method="GET"
  endpoint="/user/profile"
  title="Get User Profile"
  description="Retrieves the authenticated user's complete profile information."
  :parameters="[
    { name: 'Authorization', type: 'string', required: true, description: 'Bearer access token (in header)' }
  ]"
  :responses="[
    { status: '200 OK', description: 'Profile retrieved successfully' },
    { status: '401 Unauthorized', description: 'Authentication required' }
  ]"
/>

<ApiMethod 
  method="PUT"
  endpoint="/user/profile"
  title="Update User Profile"
  description="Updates the authenticated user's profile information."
  :parameters="[
    { name: 'Authorization', type: 'string', required: true, description: 'Bearer access token (in header)' },
    { name: 'firstName', type: 'string', required: false, description: 'User\'s first name' },
    { name: 'lastName', type: 'string', required: false, description: 'User\'s last name' },
    { name: 'username', type: 'string', required: false, description: 'Unique username' },
    { name: 'phone', type: 'string', required: false, description: 'Phone number' }
  ]"
  :responses="[
    { status: '200 OK', description: 'Profile updated successfully' },
    { status: '400 Bad Request', description: 'Invalid input data' },
    { status: '401 Unauthorized', description: 'Authentication required' }
  ]"
/>

<ApiMethod 
  method="GET"
  endpoint="/user/settings"
  title="Get User Settings"
  description="Retrieves user account settings and preferences."
  :parameters="[
    { name: 'Authorization', type: 'string', required: true, description: 'Bearer access token (in header)' }
  ]"
  :responses="[
    { status: '200 OK', description: 'Settings retrieved successfully' },
    { status: '401 Unauthorized', description: 'Authentication required' }
  ]"
/>

<ApiMethod 
  method="PUT"
  endpoint="/user/settings"
  title="Update User Settings"
  description="Updates user account settings and preferences."
  :parameters="[
    { name: 'Authorization', type: 'string', required: true, description: 'Bearer access token (in header)' },
    { name: 'language', type: 'string', required: false, description: 'Preferred language (en, ru, zh)' },
    { name: 'timezone', type: 'string', required: false, description: 'User timezone' },
    { name: 'currency', type: 'string', required: false, description: 'Preferred currency' },
    { name: 'emailNotifications', type: 'boolean', required: false, description: 'Enable email notifications' },
    { name: 'tradingNotifications', type: 'boolean', required: false, description: 'Enable trading notifications' }
  ]"
  :responses="[
    { status: '200 OK', description: 'Settings updated successfully' },
    { status: '400 Bad Request', description: 'Invalid input data' },
    { status: '401 Unauthorized', description: 'Authentication required' }
  ]"
/>

<ApiMethod 
  method="POST"
  endpoint="/user/change-password"
  title="Change Password"
  description="Changes the user's password with current password verification."
  :parameters="[
    { name: 'Authorization', type: 'string', required: true, description: 'Bearer access token (in header)' },
    { name: 'currentPassword', type: 'string', required: true, description: 'Current password' },
    { name: 'newPassword', type: 'string', required: true, description: 'New password (minimum 8 characters)' }
  ]"
  :responses="[
    { status: '200 OK', description: 'Password changed successfully' },
    { status: '400 Bad Request', description: 'Invalid password format' },
    { status: '401 Unauthorized', description: 'Current password incorrect' }
  ]"
/>

<ApiMethod 
  method="GET"
  endpoint="/user/activity"
  title="Get User Activity"
  description="Retrieves user activity history with filtering options."
  :parameters="[
    { name: 'Authorization', type: 'string', required: true, description: 'Bearer access token (in header)' },
    { name: 'limit', type: 'integer', required: false, description: 'Number of records (default: 50, max: 100)' },
    { name: 'offset', type: 'integer', required: false, description: 'Number of records to skip (default: 0)' },
    { name: 'type', type: 'string', required: false, description: 'Activity type filter (login, trade, withdrawal)' }
  ]"
  :responses="[
    { status: '200 OK', description: 'Activity history retrieved successfully' },
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
      <input type="text" id="global-api-key" class="api-key-input" placeholder="YOUR_JWT_TOKEN" />
    </div>
    <button onclick="setGlobalApiKey()" class="set-api-key-button">Set API Key</button>
  </div>
  <div class="api-key-status"></div>
</div>

<div class="example-block" data-lang="curl">

### Get User Profile

<div class="api-demo">
  <div class="demo-controls">
    <div class="button-group">
      <button onclick="testGetProfile()" class="test-button">Test</button>
      <button onclick="copyCurlCommand('/user/profile', {method: 'GET'})" class="copy-curl-button">📋 Copy curl</button>
    </div>
  </div>
  <div class="results-container"></div>
</div>

```bash
curl -X GET "https://develop.okd.finance/api/user/profile" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_12345",
    "email": "user@example.com",
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "avatar": "https://example.com/avatar.jpg",
    "verified": true,
    "kycStatus": "approved",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Update User Profile

<div class="api-demo">
  <div class="demo-controls">
    <div class="input-group">
      <label for="update-username">Username:</label>
      <input type="text" id="update-username" placeholder="john_doe" />
    </div>
    <div class="input-group">
      <label for="update-firstname">First Name:</label>
      <input type="text" id="update-firstname" placeholder="John" />
    </div>
    <div class="input-group">
      <label for="update-lastname">Last Name:</label>
      <input type="text" id="update-lastname" placeholder="Doe" />
    </div>
    <div class="input-group">
      <label for="update-phone">Phone:</label>
      <input type="text" id="update-phone" placeholder="+1234567890" />
    </div>
    <div class="button-group">
      <button onclick="testUpdateProfile()" class="test-button">Test</button>
      <button onclick="copyCurlCommand('/user/profile', {method: 'PUT', body: JSON.stringify({username: 'john_doe', firstName: 'John', lastName: 'Doe'})})" class="copy-curl-button">📋 Copy curl</button>
    </div>
  </div>
  <div class="results-container"></div>
</div>

```bash
curl -X PUT "https://develop.okd.finance/api/user/profile" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Smith",
    "username": "johnsmith",
    "phone": "+1234567890"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_12345",
    "email": "user@example.com",
    "username": "johnsmith",
    "firstName": "John",
    "lastName": "Smith",
    "phone": "+1234567890",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get User Settings

<div class="api-demo">
  <div class="demo-controls">
    <div class="button-group">
      <button onclick="testGetSettings()" class="test-button">Test</button>
      <button onclick="copyCurlCommand('/user/settings', {method: 'GET'})" class="copy-curl-button">📋 Copy curl</button>
    </div>
  </div>
  <div class="results-container"></div>
</div>

```bash
curl -X GET "https://develop.okd.finance/api/user/settings" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "language": "en",
    "timezone": "UTC",
    "currency": "USD",
    "emailNotifications": true,
    "smsNotifications": false,
    "twoFactorEnabled": true,
    "tradingNotifications": true
  }
}
```

### Update User Settings

<div class="api-demo">
  <div class="demo-controls">
    <div class="input-group">
      <label for="settings-language">Language:</label>
      <select id="settings-language">
        <option value="en">English</option>
        <option value="ru">Russian</option>
        <option value="zh">Chinese</option>
      </select>
    </div>
    <div class="input-group">
      <label for="settings-currency">Currency:</label>
      <select id="settings-currency">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="BTC">BTC</option>
      </select>
    </div>
    <div class="input-group">
      <label for="settings-email-notifications">
        <input type="checkbox" id="settings-email-notifications" checked />
        Email Notifications
      </label>
    </div>
    <div class="input-group">
      <label for="settings-trading-notifications">
        <input type="checkbox" id="settings-trading-notifications" />
        Trading Notifications
      </label>
    </div>
    <div class="button-group">
      <button onclick="testUpdateSettings()" class="test-button">Test</button>
      <button onclick="copyCurlCommand('/user/settings', {method: 'PUT', body: JSON.stringify({language: 'en', currency: 'USD', emailNotifications: true})})" class="copy-curl-button">📋 Copy curl</button>
    </div>
  </div>
  <div class="results-container"></div>
</div>

```bash
curl -X PUT "https://develop.okd.finance/api/user/settings" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "language": "en",
    "currency": "USD",
    "emailNotifications": true,
    "tradingNotifications": false
  }'
```

### Change Password

<div class="api-demo">
  <div class="demo-controls">
    <div class="input-group">
      <label for="current-password">Current Password:</label>
      <input type="password" id="current-password" placeholder="Enter current password" />
    </div>
    <div class="input-group">
      <label for="new-password">New Password:</label>
      <input type="password" id="new-password" placeholder="Enter new password (min 8 chars)" />
    </div>
    <div class="button-group">
      <button onclick="testChangePassword()" class="test-button">Test</button>
      <button onclick="copyCurlCommand('/user/change-password', {method: 'POST', body: JSON.stringify({currentPassword: 'oldpass', newPassword: 'newpass123'})})" class="copy-curl-button">📋 Copy curl</button>
    </div>
  </div>
  <div class="results-container"></div>
</div>

```bash
curl -X POST "https://develop.okd.finance/api/user/change-password" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "oldpassword123",
    "newPassword": "newpassword456"
  }'
```

### Get User Activity

<div class="api-demo">
  <div class="demo-controls">
    <div class="input-group">
      <label for="activity-limit">Limit:</label>
      <input type="number" id="activity-limit" placeholder="10" min="1" max="100" />
    </div>
    <div class="input-group">
      <label for="activity-type">Activity Type:</label>
      <select id="activity-type">
        <option value="">All</option>
        <option value="login">Login</option>
        <option value="trade">Trade</option>
        <option value="withdrawal">Withdrawal</option>
        <option value="deposit">Deposit</option>
      </select>
    </div>
    <div class="button-group">
      <button onclick="testGetActivity()" class="test-button">Test</button>
      <button onclick="copyCurlCommand('/user/activity?limit=10&type=login', {method: 'GET'})" class="copy-curl-button">📋 Copy curl</button>
    </div>
  </div>
  <div class="results-container"></div>
</div>

```bash
curl -X GET "https://develop.okd.finance/api/user/activity?limit=10&type=login" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "activity_123",
        "type": "login",
        "description": "User logged in",
        "ipAddress": "192.168.1.1",
        "userAgent": "Mozilla/5.0...",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 150,
      "limit": 10,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

</div>

<div class="example-block" data-lang="javascript">

### JavaScript SDK

```javascript
const API_BASE = 'https://develop.okd.finance/api';

class UsersAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async getProfile() {
    const response = await fetch(`${API_BASE}/user/profile`, {
      method: 'GET',
      headers: this.headers
    });
    return response.json();
  }

  async updateProfile(profileData) {
    const response = await fetch(`${API_BASE}/user/profile`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(profileData)
    });
    return response.json();
  }

  async getSettings() {
    const response = await fetch(`${API_BASE}/user/settings`, {
      method: 'GET',
      headers: this.headers
    });
    return response.json();
  }

  async updateSettings(settingsData) {
    const response = await fetch(`${API_BASE}/user/settings`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(settingsData)
    });
    return response.json();
  }

  async changePassword(currentPassword, newPassword) {
    const response = await fetch(`${API_BASE}/user/change-password`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return response.json();
  }

  async getActivity(options = {}) {
    const params = new URLSearchParams();
    if (options.limit) params.append('limit', options.limit);
    if (options.offset) params.append('offset', options.offset);
    if (options.type) params.append('type', options.type);
    
    const response = await fetch(`${API_BASE}/user/activity?${params}`, {
      method: 'GET',
      headers: this.headers
    });
    return response.json();
  }
}

// Usage example
const usersAPI = new UsersAPI('YOUR_API_KEY');

// Get user profile
usersAPI.getProfile().then(profile => {
  console.log('User profile:', profile);
});

// Update profile
usersAPI.updateProfile({
  firstName: 'John',
  lastName: 'Smith',
  username: 'johnsmith'
}).then(result => {
  console.log('Profile updated:', result);
});
```

</div>

<div class="example-block" data-lang="python">

### Python SDK

```python
import requests
import json

class UsersAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://develop.okd.finance/api'
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def get_profile(self):
        response = requests.get(f'{self.base_url}/user/profile', headers=self.headers)
        return response.json()
    
    def update_profile(self, profile_data):
        response = requests.put(f'{self.base_url}/user/profile', 
                               headers=self.headers, 
                               json=profile_data)
        return response.json()
    
    def get_settings(self):
        response = requests.get(f'{self.base_url}/user/settings', headers=self.headers)
        return response.json()
    
    def update_settings(self, settings_data):
        response = requests.put(f'{self.base_url}/user/settings', 
                               headers=self.headers, 
                               json=settings_data)
        return response.json()
    
    def change_password(self, current_password, new_password):
        data = {
            'currentPassword': current_password,
            'newPassword': new_password
        }
        response = requests.post(f'{self.base_url}/user/change-password', 
                                headers=self.headers, 
                                json=data)
        return response.json()
    
    def get_activity(self, limit=None, offset=None, activity_type=None):
        params = {}
        if limit: params['limit'] = limit
        if offset: params['offset'] = offset
        if activity_type: params['type'] = activity_type
        
        response = requests.get(f'{self.base_url}/user/activity', 
                               headers=self.headers, 
                               params=params)
        return response.json()

# Usage example
users_api = UsersAPI('YOUR_API_KEY')

# Get user profile
profile = users_api.get_profile()
print(f"User profile: {profile}")

# Update profile
result = users_api.update_profile({
    'firstName': 'John',
    'lastName': 'Smith',
    'username': 'johnsmith'
})
print(f"Profile updated: {result}")
```

</div>

<div class="example-block" data-lang="go">

### Go SDK

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "net/url"
)

type UsersAPI struct {
    APIKey  string
    BaseURL string
    Client  *http.Client
}

func NewUsersAPI(apiKey string) *UsersAPI {
    return &UsersAPI{
        APIKey:  apiKey,
        BaseURL: "https://develop.okd.finance/api",
        Client:  &http.Client{},
    }
}

func (api *UsersAPI) makeRequest(method, endpoint string, body interface{}) (map[string]interface{}, error) {
    var reqBody io.Reader
    if body != nil {
        jsonData, _ := json.Marshal(body)
        reqBody = bytes.NewBuffer(jsonData)
    }
    
    req, _ := http.NewRequest(method, api.BaseURL+endpoint, reqBody)
    req.Header.Set("Authorization", "Bearer "+api.APIKey)
    req.Header.Set("Content-Type", "application/json")
    
    resp, err := api.Client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    return result, nil
}

func (api *UsersAPI) GetProfile() (map[string]interface{}, error) {
    return api.makeRequest("GET", "/user/profile", nil)
}

func (api *UsersAPI) UpdateProfile(profileData map[string]interface{}) (map[string]interface{}, error) {
    return api.makeRequest("PUT", "/user/profile", profileData)
}

func (api *UsersAPI) GetSettings() (map[string]interface{}, error) {
    return api.makeRequest("GET", "/user/settings", nil)
}

func (api *UsersAPI) GetActivity(limit, offset int, activityType string) (map[string]interface{}, error) {
    params := url.Values{}
    if limit > 0 {
        params.Add("limit", fmt.Sprintf("%d", limit))
    }
    if offset > 0 {
        params.Add("offset", fmt.Sprintf("%d", offset))
    }
    if activityType != "" {
        params.Add("type", activityType)
    }
    
    endpoint := "/user/activity"
    if len(params) > 0 {
        endpoint += "?" + params.Encode()
    }
    
    return api.makeRequest("GET", endpoint, nil)
}

func main() {
    api := NewUsersAPI("YOUR_API_KEY")
    
    // Get user profile
    profile, err := api.GetProfile()
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    fmt.Printf("Profile: %+v\n", profile)
}
```

</div>

<div class="example-block" data-lang="php">

### PHP SDK

```php
<?php

class UsersAPI {
    private $apiKey;
    private $baseUrl = 'https://develop.okd.finance/api';
    
    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }
    
    private function makeRequest($method, $endpoint, $data = null) {
        $url = $this->baseUrl . $endpoint;
        
        $headers = [
            'Authorization: Bearer ' . $this->apiKey,
            'Content-Type: application/json'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        
        if ($data) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        return [
            'status' => $httpCode,
            'data' => json_decode($response, true)
        ];
    }
    
    public function getProfile() {
        return $this->makeRequest('GET', '/user/profile');
    }
    
    public function updateProfile($profileData) {
        return $this->makeRequest('PUT', '/user/profile', $profileData);
    }
    
    public function getSettings() {
        return $this->makeRequest('GET', '/user/settings');
    }
    
    public function updateSettings($settingsData) {
        return $this->makeRequest('PUT', '/user/settings', $settingsData);
    }
    
    public function changePassword($currentPassword, $newPassword) {
        $data = [
            'currentPassword' => $currentPassword,
            'newPassword' => $newPassword
        ];
        return $this->makeRequest('POST', '/user/change-password', $data);
    }
    
    public function getActivity($limit = null, $offset = null, $type = null) {
        $params = [];
        if ($limit) $params['limit'] = $limit;
        if ($offset) $params['offset'] = $offset;
        if ($type) $params['type'] = $type;
        
        $endpoint = '/user/activity';
        if (!empty($params)) {
            $endpoint .= '?' . http_build_query($params);
        }
        
        return $this->makeRequest('GET', $endpoint);
    }
}

// Usage example
$usersAPI = new UsersAPI('YOUR_API_KEY');

// Get user profile
$profile = $usersAPI->getProfile();
echo "Profile: " . json_encode($profile) . "\n";

// Update profile
$result = $usersAPI->updateProfile([
    'firstName' => 'John',
    'lastName' => 'Smith',
    'username' => 'johnsmith'
]);
echo "Profile updated: " . json_encode($result) . "\n";

?>
```

</div>

  </template>
</ApiDoc>



