<template>
  <div class="interactive-api-container">
    <!-- Column 1: Navigation -->
    <div class="api-docs-column">
      <h2>Authentication API</h2>
      
      <div class="auth-section">
        <h3>API Configuration</h3>
        <input 
          v-model="apiToken"
          type="password" 
          placeholder="Enter your access token..." 
          class="token-input"
        />
        <div v-if="apiToken" class="token-status">
          ✅ Token configured
        </div>
      </div>

      <div class="endpoint-nav">
        <a href="#sign-up" class="nav-link">POST Sign Up</a>
        <a href="#sign-in" class="nav-link">POST Sign In</a>
        <a href="#refresh" class="nav-link">POST Refresh Token</a>
        <a href="#profile" class="nav-link">GET Profile</a>
      </div>
    </div>

    <!-- Column 2: Documentation -->
    <div class="documentation-column">
      <section id="sign-up" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge post">POST</span>
          <span class="endpoint-path">/auth/sign-up</span>
        </div>
        <h3>User Registration</h3>
        <p>Registers a new user account with email and password.</p>
        
        <h4>Headers</h4>
        <ul>
          <li><code>Content-Type: application/json</code></li>
          <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
          <li><code>X-RECAPTCHA: recaptcha_token</code> - Google reCAPTCHA token</li>
          <li><code>X-PLATFORM-ID: platform_id</code> - Platform identifier</li>
        </ul>
        
        <h4>Body Parameters</h4>
        <ul>
          <li><code>email</code> (string, required) - User's email address</li>
          <li><code>password</code> (string, required) - User's password (min 8 chars)</li>
        </ul>

        <h4>Example Request</h4>
        <pre class="code-block">POST /auth/sign-up
Content-Type: application/json
Fingerprint: 1358cd229b6bceb25941e99f4228997f
X-RECAPTCHA: 03AGdBq25...
X-PLATFORM-ID: web_app

{
  "email": "user@example.com",
  "password": "securepassword123"
}</pre>

        <h4>Response</h4>
        <div class="response-example">
          <div class="response-status success">200 OK</div>
          <pre class="code-block">{
  "success": true,
  "data": {
    "userId": "usr_1234567890abcdef",
    "email": "user@example.com",
    "status": "pending_verification"
  },
  "error": null
}</pre>
        </div>

        <div class="response-example">
          <div class="response-status error">400 Bad Request</div>
          <pre class="code-block">{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format or password too weak",
    "details": {
      "email": "Invalid email format",
      "password": "Password must be at least 8 characters"
    }
  }
}</pre>
        </div>
      </section>

      <section id="sign-in" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge post">POST</span>
          <span class="endpoint-path">/auth/sign-in</span>
        </div>
        <h3>User Login</h3>
        <p>Authenticates a user and returns access and refresh tokens.</p>
        
        <h4>Headers</h4>
        <ul>
          <li><code>Content-Type: application/json</code></li>
          <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
          <li><code>X-RECAPTCHA: recaptcha_token</code> - Google reCAPTCHA token</li>
          <li><code>X-PLATFORM-ID: platform_id</code> - Platform identifier</li>
        </ul>
        
        <h4>Body Parameters</h4>
        <ul>
          <li><code>email</code> (string, required) - User's email address</li>
          <li><code>password</code> (string, required) - User's password</li>
        </ul>

        <h4>Example Request</h4>
        <pre class="code-block">POST /auth/sign-in
Content-Type: application/json
Fingerprint: 1358cd229b6bceb25941e99f4228997f
X-RECAPTCHA: 03AGdBq25...
X-PLATFORM-ID: web_app

{
  "email": "user@example.com",
  "password": "securepassword123"
}</pre>

        <h4>Response</h4>
        <div class="response-example">
          <div class="response-status success">200 OK</div>
          <pre class="code-block">{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "tokenType": "Bearer",
    "user": {
      "id": "usr_1234567890abcdef",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "status": "active",
      "kycStatus": "verified",
      "createdAt": "2024-01-01T10:00:00Z"
    }
  },
  "error": null
}</pre>
        </div>

        <div class="response-example">
          <div class="response-status error">401 Unauthorized</div>
          <pre class="code-block">{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}</pre>
        </div>
      </section>

      <section id="refresh" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge post">POST</span>
          <span class="endpoint-path">/auth/refresh</span>
        </div>
        <h3>Refresh Access Token</h3>
        <p>Refreshes an expired access token using the refresh token.</p>
        
        <h4>Headers</h4>
        <ul>
          <li><code>Content-Type: application/json</code></li>
          <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
        </ul>
        
        <h4>Body Parameters</h4>
        <ul>
          <li><code>refreshToken</code> (string, required) - The refresh token obtained from sign-in</li>
        </ul>

        <h4>Example Request</h4>
        <pre class="code-block">POST /auth/refresh
Content-Type: application/json
Fingerprint: 1358cd229b6bceb25941e99f4228997f

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}</pre>

        <h4>Response</h4>
        <div class="response-example">
          <div class="response-status success">200 OK</div>
          <pre class="code-block">{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "tokenType": "Bearer"
  },
  "error": null
}</pre>
        </div>

        <div class="response-example">
          <div class="response-status error">401 Unauthorized</div>
          <pre class="code-block">{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_REFRESH_TOKEN",
    "message": "Refresh token is invalid or expired"
  }
}</pre>
        </div>
      </section>

      <section id="profile" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/auth/profile</span>
        </div>
        <h3>Get User Profile</h3>
        <p>Retrieves the authenticated user's profile information.</p>
        
        <h4>Headers</h4>
        <ul>
          <li><code>Authorization: Bearer access_token</code> - JWT access token</li>
          <li><code>Fingerprint: device_unique_id</code> - 32-character hex string for device identification</li>
        </ul>

        <h4>Example Request</h4>
        <pre class="code-block">GET /auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Fingerprint: 1358cd229b6bceb25941e99f4228997f</pre>

        <h4>Response</h4>
        <div class="response-example">
          <div class="response-status success">200 OK</div>
          <pre class="code-block">{
  "success": true,
  "data": {
    "id": "usr_1234567890abcdef",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "status": "active",
    "kycStatus": "verified",
    "twoFactorEnabled": true,
    "preferences": {
      "language": "en",
      "timezone": "UTC",
      "notifications": {
        "email": true,
        "push": false,
        "trading": true
      }
    },
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-15T14:30:00Z",
    "lastLoginAt": "2024-01-15T14:30:00Z"
  },
  "error": null
}</pre>
        </div>

        <div class="response-example">
          <div class="response-status error">401 Unauthorized</div>
          <pre class="code-block">{
  "success": false,
  "data": null,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Access token is invalid or expired"
  }
}</pre>
        </div>
      </section>
    </div>

    <!-- Column 3: Testing -->
    <div class="testing-column">
      <h3>Live Testing</h3>
      
      <div class="test-section">
        <h4>POST Sign Up</h4>
        <input v-model="signUpData.email" type="email" placeholder="Email" class="test-input" />
        <input v-model="signUpData.password" type="password" placeholder="Password" class="test-input" />
        <input v-model="signUpData.recaptcha" type="text" placeholder="X-RECAPTCHA" class="test-input" />
        <input v-model="signUpData.platformId" type="text" placeholder="X-PLATFORM-ID" class="test-input" />
        <button @click="testSignUp" class="test-btn">Test Request</button>
        <div v-if="results.signUp" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.signUp.status }}</span>
            <span class="timestamp">{{ results.signUp.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.signUp.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>POST Sign In</h4>
        <input v-model="signInData.email" type="email" placeholder="Email" class="test-input" />
        <input v-model="signInData.password" type="password" placeholder="Password" class="test-input" />
        <input v-model="signInData.recaptcha" type="text" placeholder="X-RECAPTCHA" class="test-input" />
        <input v-model="signInData.platformId" type="text" placeholder="X-PLATFORM-ID" class="test-input" />
        <button @click="testSignIn" class="test-btn">Test Request</button>
        <div v-if="results.signIn" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.signIn.status }}</span>
            <span class="timestamp">{{ results.signIn.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.signIn.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>POST Refresh Token</h4>
        <textarea v-model="refreshData" class="json-input" placeholder='{"refreshToken": "your_refresh_token"}'></textarea>
        <button @click="testRefreshToken" class="test-btn">Test Request</button>
        <div v-if="results.refresh" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.refresh.status }}</span>
            <span class="timestamp">{{ results.refresh.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.refresh.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>GET Profile</h4>
        <button @click="testGetProfile" class="test-btn">Test Request</button>
        <div v-if="results.profile" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.profile.status }}</span>
            <span class="timestamp">{{ results.profile.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.profile.data }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const apiToken = ref('')

const signUpData = reactive({
  email: '',
  password: '',
  recaptcha: '',
  platformId: ''
})

const signInData = reactive({
  email: '',
  password: '',
  recaptcha: '',
  platformId: ''
})

const refreshData = ref('{"refreshToken": ""}')

const generateFingerprint = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const results = reactive({
  signUp: null,
  signIn: null,
  refresh: null,
  profile: null
})

const testSignUp = async () => {
  try {
    const response = await fetch('https://develop.okd.finance/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint(),
        'X-RECAPTCHA': signUpData.recaptcha || 'test_recaptcha_token',
        'X-PLATFORM-ID': signUpData.platformId || 'test_platform_id'
      },
      body: JSON.stringify({
        email: signUpData.email,
        password: signUpData.password
      })
    })
    
    const data = await response.text()
    results.signUp = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.signUp = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testSignIn = async () => {
  try {
    const response = await fetch('https://develop.okd.finance/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint(),
        'X-RECAPTCHA': signInData.recaptcha || 'test_recaptcha_token',
        'X-PLATFORM-ID': signInData.platformId || 'test_platform_id'
      },
      body: JSON.stringify({
        email: signInData.email,
        password: signInData.password
      })
    })
    
    const data = await response.text()
    results.signIn = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.signIn = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testRefreshToken = async () => {
  try {
    const response = await fetch('https://develop.okd.finance/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      },
      body: refreshData.value
    })
    
    const data = await response.text()
    results.refresh = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.refresh = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testGetProfile = async () => {
  try {
    const response = await fetch('https://develop.okd.finance/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      }
    })
    
    const data = await response.text()
    results.profile = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.profile = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}
</script>

<style scoped>
.interactive-api-container {
  display: grid;
  grid-template-columns: 250px 1fr 350px;
  gap: 2rem;
  margin-top: 2rem;
}

.api-docs-column {
  border-right: 1px solid var(--vp-c-border);
  padding-right: 1rem;
}

.auth-section {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.token-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  font-family: monospace;
  margin-bottom: 0.5rem;
}

.token-status {
  color: var(--vp-c-green);
  font-size: 0.9rem;
}

.endpoint-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.nav-link:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}

.documentation-column {
  padding: 0 2rem;
}

.endpoint-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.method-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.method-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.method-badge.get {
  background: #e3f2fd;
  color: #1976d2;
}

.method-badge.post {
  background: #e8f5e8;
  color: #2e7d32;
}

.endpoint-path {
  font-family: monospace;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.testing-column {
  border-left: 1px solid var(--vp-c-border);
  padding-left: 2rem;
}

.test-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.test-section h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.test-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.json-input {
  width: 100%;
  height: 100px;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  resize: vertical;
}

.test-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  background: var(--vp-c-brand);
  color: white;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.test-btn:hover {
  background: var(--vp-c-brand-light);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.test-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* Dark theme specific button hover */
.dark .test-btn:hover {
  background: var(--vp-c-brand-dark);
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
}

.result-container {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 1rem;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  background: #e8f5e8;
  color: #2e7d32;
}

.timestamp {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.result-data {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
}

.code-block {
  background: var(--vp-code-bg);
  color: var(--vp-code-color);
  padding: 1rem;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.7;
  overflow-x: auto;
  margin: 1rem 0;
}

.response-example {
  margin: 1rem 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  overflow: hidden;
}

.response-status {
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.response-status.success {
  background: #f0f9ff;
  color: #0369a1;
  border-bottom: 1px solid #e0f2fe;
}

.response-status.error {
  background: #fef2f2;
  color: #dc2626;
  border-bottom: 1px solid #fecaca;
}

.response-example .code-block {
  margin: 0;
  border-radius: 0;
  border: none;
}

@media (max-width: 1200px) {
  .interactive-api-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .api-docs-column,
  .testing-column {
    border: none;
    padding: 0;
  }
}
</style> 