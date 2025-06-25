<template>
  <div class="interactive-api-container">
    <!-- Column 1: Navigation -->
    <div class="api-docs-column">
      <h2>API Reference</h2>
      
      <div class="auth-section">
        <h3>Authentication</h3>
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
        <a href="#get-profile" class="nav-link">GET Profile</a>
        <a href="#update-profile" class="nav-link">Update Profile</a>
        <a href="#get-settings" class="nav-link">GET Settings</a>
        <a href="#upload-avatar" class="nav-link">Upload Avatar</a>
      </div>
    </div>

    <!-- Column 2: Documentation -->
    <div class="documentation-column">
      <section id="get-profile" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/user/profile</span>
        </div>
        <h3>Get User Profile</h3>
        <p>Retrieves the authenticated user's profile information.</p>
      </section>

      <section id="update-profile" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge put">PUT</span>
          <span class="endpoint-path">/user/profile</span>
        </div>
        <h3>Update User Profile</h3>
        <p>Updates the authenticated user's profile information.</p>
      </section>

      <section id="get-settings" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/user/settings</span>
        </div>
        <h3>Get User Settings</h3>
        <p>Retrieves user preferences and settings.</p>
      </section>

      <section id="upload-avatar" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge post">POST</span>
          <span class="endpoint-path">/user/avatar</span>
        </div>
        <h3>Upload Avatar</h3>
        <p>Uploads a new avatar image.</p>
      </section>
    </div>

    <!-- Column 3: Testing -->
    <div class="testing-column">
      <h3>Live Testing</h3>
      
      <div class="test-section">
        <h4>GET Profile</h4>
        <button @click="testGetProfile" class="test-btn">Test Request</button>
        <div v-if="results.getProfile" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.getProfile.status }}</span>
            <span class="timestamp">{{ results.getProfile.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.getProfile.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>Update Profile</h4>
        <textarea v-model="updateData" class="json-input" placeholder="Enter JSON data..."></textarea>
        <button @click="testUpdateProfile" class="test-btn">Test Request</button>
        <div v-if="results.updateProfile" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.updateProfile.status }}</span>
            <span class="timestamp">{{ results.updateProfile.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.updateProfile.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>GET Settings</h4>
        <button @click="testGetSettings" class="test-btn">Test Request</button>
        <div v-if="results.getSettings" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.getSettings.status }}</span>
            <span class="timestamp">{{ results.getSettings.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.getSettings.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>Upload Avatar</h4>
        <input type="file" @change="handleFileSelect" class="file-input" />
        <button @click="testUploadAvatar" class="test-btn">Upload Avatar</button>
        <div v-if="results.uploadAvatar" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.uploadAvatar.status }}</span>
            <span class="timestamp">{{ results.uploadAvatar.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.uploadAvatar.data }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const apiToken = ref('')
const updateData = ref('{"firstName": "John", "lastName": "Doe"}')
const selectedFile = ref(null)

// Generate fingerprint similar to 1358cd229b6bceb25941e99f4228997f
const generateFingerprint = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const results = reactive({
  getProfile: null,
  updateProfile: null,
  getSettings: null,
  uploadAvatar: null
})

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
    results.getProfile = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.getProfile = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testUpdateProfile = async () => {
  try {
    const response = await fetch('https://develop.okd.finance/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      },
      body: updateData.value
    })
    
    const data = await response.text()
    results.updateProfile = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.updateProfile = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testGetSettings = async () => {
  try {
    const response = await fetch('https://develop.okd.finance/api/user/settings', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      }
    })
    
    const data = await response.text()
    results.getSettings = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.getSettings = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0]
}

const testUploadAvatar = async () => {
  if (!selectedFile.value) return
  
  try {
    const formData = new FormData()
    formData.append('avatar', selectedFile.value)
    
    const response = await fetch('https://develop.okd.finance/api/user/avatar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Fingerprint': generateFingerprint()
      },
      body: formData
    })
    
    const data = await response.text()
    results.uploadAvatar = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.uploadAvatar = {
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

.method-badge.put {
  background: #fff3e0;
  color: #f57c00;
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

.file-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  margin-bottom: 1rem;
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
}

.test-btn:hover {
  background: var(--vp-c-brand-dark);
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