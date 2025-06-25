<template>
  <div class="interactive-api-container">
    <!-- Column 1: Navigation -->
    <div class="api-docs-column">
      <h2>KYC API</h2>
      
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
        <a href="#submit-kyc" class="nav-link">POST Submit KYC</a>
        <a href="#kyc-status" class="nav-link">GET KYC Status</a>
        <a href="#upload-documents" class="nav-link">POST Upload Documents</a>
        <a href="#kyc-history" class="nav-link">GET KYC History</a>
      </div>
    </div>

    <!-- Column 2: Documentation -->
    <div class="documentation-column">
      <section id="submit-kyc" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge post">POST</span>
          <span class="endpoint-path">/kyc/submit</span>
        </div>
        <h3>Submit KYC Documents</h3>
        <p>Submit KYC documents for verification.</p>
        
        <h4>Body Parameters</h4>
        <ul>
          <li><code>firstName</code> (string, required) - First name</li>
          <li><code>lastName</code> (string, required) - Last name</li>
          <li><code>dateOfBirth</code> (string, required) - Date of birth (YYYY-MM-DD)</li>
          <li><code>nationality</code> (string, required) - Nationality code</li>
          <li><code>documentType</code> (string, required) - Document type (passport, id_card, driver_license)</li>
          <li><code>documentNumber</code> (string, required) - Document number</li>
          <li><code>address</code> (object, optional) - Address information</li>
        </ul>
      </section>

      <section id="kyc-status" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/kyc/status</span>
        </div>
        <h3>Get KYC Status</h3>
        <p>Get KYC verification status for the authenticated user.</p>
        
        <h4>Headers</h4>
        <ul>
          <li><code>Authorization: Bearer access_token</code></li>
          <li><code>Fingerprint: device_unique_id</code></li>
        </ul>
      </section>

      <section id="upload-documents" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge post">POST</span>
          <span class="endpoint-path">/kyc/upload</span>
        </div>
        <h3>Upload Documents</h3>
        <p>Upload KYC documents (images/PDFs).</p>
        
        <h4>Body Parameters (multipart/form-data)</h4>
        <ul>
          <li><code>documentType</code> (string, required) - Type of document</li>
          <li><code>file</code> (file, required) - Document file (image or PDF)</li>
          <li><code>side</code> (string, optional) - Document side (front, back) for ID cards</li>
        </ul>
      </section>

      <section id="kyc-history" class="endpoint-section">
        <div class="method-header">
          <span class="method-badge get">GET</span>
          <span class="endpoint-path">/kyc/history</span>
        </div>
        <h3>Get KYC History</h3>
        <p>Get KYC submission history and status changes.</p>
        
        <h4>Query Parameters</h4>
        <ul>
          <li><code>limit</code> (integer, optional) - Number of records to return (default: 50)</li>
          <li><code>offset</code> (integer, optional) - Number of records to skip (default: 0)</li>
        </ul>
      </section>
    </div>

    <!-- Column 3: Testing -->
    <div class="testing-column">
      <h3>Live Testing</h3>
      
      <div class="test-section">
        <h4>POST Submit KYC</h4>
        <input v-model="kycData.firstName" type="text" placeholder="First Name" class="test-input" />
        <input v-model="kycData.lastName" type="text" placeholder="Last Name" class="test-input" />
        <input v-model="kycData.dateOfBirth" type="date" placeholder="Date of Birth" class="test-input" />
        <select v-model="kycData.nationality" class="test-input">
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
        </select>
        <select v-model="kycData.documentType" class="test-input">
          <option value="passport">Passport</option>
          <option value="id_card">ID Card</option>
          <option value="driver_license">Driver License</option>
        </select>
        <input v-model="kycData.documentNumber" type="text" placeholder="Document Number" class="test-input" />
        <textarea v-model="kycData.address" class="json-input" placeholder='{"street": "123 Main St", "city": "New York", "country": "US", "postalCode": "10001"}'></textarea>
        <button @click="testSubmitKyc" class="test-btn">Test Request</button>
        <div v-if="results.submitKyc" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.submitKyc.status }}</span>
            <span class="timestamp">{{ results.submitKyc.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.submitKyc.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>GET KYC Status</h4>
        <button @click="testGetKycStatus" class="test-btn">Test Request</button>
        <div v-if="results.kycStatus" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.kycStatus.status }}</span>
            <span class="timestamp">{{ results.kycStatus.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.kycStatus.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>POST Upload Documents</h4>
        <select v-model="uploadData.documentType" class="test-input">
          <option value="passport">Passport</option>
          <option value="id_card_front">ID Card Front</option>
          <option value="id_card_back">ID Card Back</option>
          <option value="driver_license">Driver License</option>
          <option value="proof_of_address">Proof of Address</option>
        </select>
        <input type="file" @change="handleFileUpload" class="test-input" accept="image/*,application/pdf" />
        <select v-model="uploadData.side" class="test-input">
          <option value="">No side specified</option>
          <option value="front">Front</option>
          <option value="back">Back</option>
        </select>
        <button @click="testUploadDocument" class="test-btn" :disabled="!uploadData.file">Test Request</button>
        <div v-if="results.uploadDocument" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.uploadDocument.status }}</span>
            <span class="timestamp">{{ results.uploadDocument.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.uploadDocument.data }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h4>GET KYC History</h4>
        <input v-model.number="historyData.limit" type="number" placeholder="Limit (50)" class="test-input" />
        <input v-model.number="historyData.offset" type="number" placeholder="Offset (0)" class="test-input" />
        <button @click="testGetKycHistory" class="test-btn">Test Request</button>
        <div v-if="results.kycHistory" class="result-container">
          <div class="result-header">
            <span class="status-badge">{{ results.kycHistory.status }}</span>
            <span class="timestamp">{{ results.kycHistory.timestamp }}</span>
          </div>
          <pre class="result-data">{{ results.kycHistory.data }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const apiToken = ref('')

const kycData = reactive({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  nationality: 'US',
  documentType: 'passport',
  documentNumber: '',
  address: '{"street": "123 Main St", "city": "New York", "country": "US", "postalCode": "10001"}'
})

const uploadData = reactive({
  documentType: 'passport',
  file: null,
  side: ''
})

const historyData = reactive({
  limit: 50,
  offset: 0
})

const generateFingerprint = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const results = reactive({
  submitKyc: null,
  kycStatus: null,
  uploadDocument: null,
  kycHistory: null
})

const handleFileUpload = (event) => {
  uploadData.file = event.target.files[0]
}

const testSubmitKyc = async () => {
  try {
    const requestBody = {
      firstName: kycData.firstName,
      lastName: kycData.lastName,
      dateOfBirth: kycData.dateOfBirth,
      nationality: kycData.nationality,
      documentType: kycData.documentType,
      documentNumber: kycData.documentNumber
    }
    
    if (kycData.address) {
      try {
        requestBody.address = JSON.parse(kycData.address)
      } catch (e) {
        // If address is not valid JSON, send as string
        requestBody.address = kycData.address
      }
    }
    
    const response = await fetch('https://develop.okd.finance/api/kyc/submit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      },
      body: JSON.stringify(requestBody)
    })
    
    const data = await response.text()
    results.submitKyc = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.submitKyc = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testGetKycStatus = async () => {
  try {
    const response = await fetch('https://develop.okd.finance/api/kyc/status', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      }
    })
    
    const data = await response.text()
    results.kycStatus = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.kycStatus = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testUploadDocument = async () => {
  try {
    if (!uploadData.file) {
      results.uploadDocument = {
        status: 'Error',
        data: 'Please select a file to upload',
        timestamp: new Date().toLocaleTimeString()
      }
      return
    }
    
    const formData = new FormData()
    formData.append('documentType', uploadData.documentType)
    formData.append('file', uploadData.file)
    if (uploadData.side) {
      formData.append('side', uploadData.side)
    }
    
    const response = await fetch('https://develop.okd.finance/api/kyc/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Fingerprint': generateFingerprint()
      },
      body: formData
    })
    
    const data = await response.text()
    results.uploadDocument = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.uploadDocument = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const testGetKycHistory = async () => {
  try {
    let endpoint = '/kyc/history'
    const params = new URLSearchParams()
    
    if (historyData.limit) params.append('limit', historyData.limit)
    if (historyData.offset) params.append('offset', historyData.offset)
    
    if (params.toString()) {
      endpoint += '?' + params.toString()
    }
    
    const response = await fetch(`https://develop.okd.finance/api${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken.value}`,
        'Content-Type': 'application/json',
        'Fingerprint': generateFingerprint()
      }
    })
    
    const data = await response.text()
    results.kycHistory = {
      status: `${response.status} ${response.statusText}`,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }
  } catch (error) {
    results.kycHistory = {
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
}

.test-btn:hover {
  background: var(--vp-c-brand-dark);
}

.test-btn:disabled {
  background: var(--vp-c-text-3);
  cursor: not-allowed;
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