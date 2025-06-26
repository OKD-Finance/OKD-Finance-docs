<template>
  <div class="interactive-api-container">
    <!-- Authentication Header -->
    <div class="auth-header">
      <h2>🔗 ReferralProgram API Testing</h2>
      <div class="auth-controls">
        <div class="form-group">
          <label>API Base URL:</label>
          <input v-model="apiUrl" placeholder="https://develop.okd.finance/api" />
        </div>
        <div class="form-group">
          <label>Access Token:</label>
          <div class="token-input">
            <input 
              :type="showToken ? 'text' : 'password'"
              v-model="accessToken" 
              placeholder="Enter your access token"
            />
            <button @click="showToken = !showToken" class="toggle-token">
              {{ showToken ? '🙈' : '👁️' }}
            </button>
          </div>
          <small>Bearer prefix will be added automatically</small>
        </div>
      </div>
    </div>

    <!-- API Endpoints -->
    <div class="endpoints-container">
      
        <!-- GET /referral -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /referral
            </h3>
            <p class="endpoint-description">Get list of referral link.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>! Need access token in bearer token authorization</p>
              
              
              <h4>📝 Parameters</h4>
              <div class="parameter-list">
                
                <div class="parameter-item">
                  <strong>Fingerprint</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">user device unique id</p>
                </div>
                
                <div class="parameter-item">
                  <strong>sortBy</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values:
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>limit</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Limit of records in request
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>offset</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Offset of records in request
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/referral" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="list_referral_links" 
                :disabled="loading['list_referral_links']"
                class="test-button"
              >
                {{ loading['list_referral_links'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['list_referral_links']" class="error-message">
                ❌ Error: {{ error['list_referral_links'] }}
              </div>
              
              <div v-if="responses['list_referral_links']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['list_referral_links'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /referral -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /referral
            </h3>
            <p class="endpoint-description">Add referral link.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>! Need access token in bearer token authorization</p>
              
              
              <h4>📝 Parameters</h4>
              <div class="parameter-list">
                
                <div class="parameter-item">
                  <strong>Fingerprint</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">user device unique id</p>
                </div>
                
                <div class="parameter-item">
                  <strong>Body</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description"></p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X POST \
  "/referral" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              <div class="form-group">
                <label>Request Body (JSON):</label>
                <textarea 
                  v-model="requestBodies['add_referral_link']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="add_referral_link" 
                :disabled="loading['add_referral_link']"
                class="test-button"
              >
                {{ loading['add_referral_link'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['add_referral_link']" class="error-message">
                ❌ Error: {{ error['add_referral_link'] }}
              </div>
              
              <div v-if="responses['add_referral_link']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['add_referral_link'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /referral/export -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /referral/export
            </h3>
            <p class="endpoint-description">Export history of fees to xlsx file</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>! Need access token in bearer token authorization</p>
              
              
              <h4>📝 Parameters</h4>
              <div class="parameter-list">
                
                <div class="parameter-item">
                  <strong>Fingerprint</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">user device unique id</p>
                </div>
                
                <div class="parameter-item">
                  <strong>from</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Start timestamp of export
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>to</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">End timestamp of export
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/referral/export" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="export_referral_fees" 
                :disabled="loading['export_referral_fees']"
                class="test-button"
              >
                {{ loading['export_referral_fees'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['export_referral_fees']" class="error-message">
                ❌ Error: {{ error['export_referral_fees'] }}
              </div>
              
              <div v-if="responses['export_referral_fees']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['export_referral_fees'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /referral/fees -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /referral/fees
            </h3>
            <p class="endpoint-description">Get history of fees</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>! Need access token in bearer token authorization</p>
              
              
              <h4>📝 Parameters</h4>
              <div class="parameter-list">
                
                <div class="parameter-item">
                  <strong>Fingerprint</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">user device unique id</p>
                </div>
                
                <div class="parameter-item">
                  <strong>sortBy</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values:
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>limit</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Limit of records in request
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>offset</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Offset of records in request
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/referral/fees" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="list_referral_fees" 
                :disabled="loading['list_referral_fees']"
                class="test-button"
              >
                {{ loading['list_referral_fees'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['list_referral_fees']" class="error-message">
                ❌ Error: {{ error['list_referral_fees'] }}
              </div>
              
              <div v-if="responses['list_referral_fees']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['list_referral_fees'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /referral/link/{link} -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /referral/link/{link}
            </h3>
            <p class="endpoint-description">Get public attributes of referral link.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Get public attributes of referral link.</p>
              
              
              <h4>📝 Parameters</h4>
              <div class="parameter-list">
                
                <div class="parameter-item">
                  <strong>link</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Link ID
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/referral/link/{link}" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="get_public_referral_link" 
                :disabled="loading['get_public_referral_link']"
                class="test-button"
              >
                {{ loading['get_public_referral_link'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['get_public_referral_link']" class="error-message">
                ❌ Error: {{ error['get_public_referral_link'] }}
              </div>
              
              <div v-if="responses['get_public_referral_link']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['get_public_referral_link'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /referral/percents -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /referral/percents
            </h3>
            <p class="endpoint-description">Get current percents of referral program.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>! Need access token in bearer token authorization</p>
              
              
              <h4>📝 Parameters</h4>
              <div class="parameter-list">
                
                <div class="parameter-item">
                  <strong>Fingerprint</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">user device unique id</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/referral/percents" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="get_referral_percents" 
                :disabled="loading['get_referral_percents']"
                class="test-button"
              >
                {{ loading['get_referral_percents'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['get_referral_percents']" class="error-message">
                ❌ Error: {{ error['get_referral_percents'] }}
              </div>
              
              <div v-if="responses['get_referral_percents']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['get_referral_percents'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /referral/program -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /referral/program
            </h3>
            <p class="endpoint-description">Get header of referral program.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>! Need access token in bearer token authorization</p>
              
              
              <h4>📝 Parameters</h4>
              <div class="parameter-list">
                
                <div class="parameter-item">
                  <strong>Fingerprint</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">user device unique id</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/referral/program" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="get_referral_program" 
                :disabled="loading['get_referral_program']"
                class="test-button"
              >
                {{ loading['get_referral_program'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['get_referral_program']" class="error-message">
                ❌ Error: {{ error['get_referral_program'] }}
              </div>
              
              <div v-if="responses['get_referral_program']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['get_referral_program'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /referral/{id} -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /referral/{id}
            </h3>
            <p class="endpoint-description">Get details of referral link.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>! Need access token in bearer token authorization</p>
              
              
              <h4>📝 Parameters</h4>
              <div class="parameter-list">
                
                <div class="parameter-item">
                  <strong>Fingerprint</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">user device unique id</p>
                </div>
                
                <div class="parameter-item">
                  <strong>id</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Link internal ID
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>limit</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Limit of records in request
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>offset</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Offset of records in request
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/referral/{id}" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="get_referral_link" 
                :disabled="loading['get_referral_link']"
                class="test-button"
              >
                {{ loading['get_referral_link'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['get_referral_link']" class="error-message">
                ❌ Error: {{ error['get_referral_link'] }}
              </div>
              
              <div v-if="responses['get_referral_link']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['get_referral_link'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /referral/{id} -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /referral/{id}
            </h3>
            <p class="endpoint-description">Set default referral link.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>! Need access token in bearer token authorization</p>
              
              
              <h4>📝 Parameters</h4>
              <div class="parameter-list">
                
                <div class="parameter-item">
                  <strong>Fingerprint</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">user device unique id</p>
                </div>
                
                <div class="parameter-item">
                  <strong>id</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Link internal ID
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X PUT \
  "/referral/{id}" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              <div class="form-group">
                <label>Request Body (JSON):</label>
                <textarea 
                  v-model="requestBodies['set_default_referral_link']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="set_default_referral_link" 
                :disabled="loading['set_default_referral_link']"
                class="test-button"
              >
                {{ loading['set_default_referral_link'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['set_default_referral_link']" class="error-message">
                ❌ Error: {{ error['set_default_referral_link'] }}
              </div>
              
              <div v-if="responses['set_default_referral_link']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['set_default_referral_link'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Reactive state
const apiUrl = ref('https://develop.okd.finance/api')
const accessToken = ref('')
const showToken = ref(false)
const loading = reactive({})
const error = reactive({})
const responses = reactive({})
const requestBodies = reactive({'add_referral_link': '', 'set_default_referral_link': ''})

// Utility functions
const generateFingerprint = () => {
  return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

// API Methods
const list_referral_links = async () => {
  loading['list_referral_links'] = true;
  error['list_referral_links'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/referral`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['list_referral_links'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['list_referral_links'] = err.message;
  } finally {
    loading['list_referral_links'] = false;
  }
}

const add_referral_link = async () => {
  loading['add_referral_link'] = true;
  error['add_referral_link'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['add_referral_link'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/referral`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['add_referral_link'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['add_referral_link'] = err.message;
  } finally {
    loading['add_referral_link'] = false;
  }
}

const export_referral_fees = async () => {
  loading['export_referral_fees'] = true;
  error['export_referral_fees'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/referral/export`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['export_referral_fees'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['export_referral_fees'] = err.message;
  } finally {
    loading['export_referral_fees'] = false;
  }
}

const list_referral_fees = async () => {
  loading['list_referral_fees'] = true;
  error['list_referral_fees'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/referral/fees`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['list_referral_fees'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['list_referral_fees'] = err.message;
  } finally {
    loading['list_referral_fees'] = false;
  }
}

const get_public_referral_link = async () => {
  loading['get_public_referral_link'] = true;
  error['get_public_referral_link'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/referral/link/{link}`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['get_public_referral_link'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['get_public_referral_link'] = err.message;
  } finally {
    loading['get_public_referral_link'] = false;
  }
}

const get_referral_percents = async () => {
  loading['get_referral_percents'] = true;
  error['get_referral_percents'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/referral/percents`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['get_referral_percents'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['get_referral_percents'] = err.message;
  } finally {
    loading['get_referral_percents'] = false;
  }
}

const get_referral_program = async () => {
  loading['get_referral_program'] = true;
  error['get_referral_program'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/referral/program`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['get_referral_program'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['get_referral_program'] = err.message;
  } finally {
    loading['get_referral_program'] = false;
  }
}

const get_referral_link = async () => {
  loading['get_referral_link'] = true;
  error['get_referral_link'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/referral/{id}`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['get_referral_link'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['get_referral_link'] = err.message;
  } finally {
    loading['get_referral_link'] = false;
  }
}

const set_default_referral_link = async () => {
  loading['set_default_referral_link'] = true;
  error['set_default_referral_link'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['set_default_referral_link'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/referral/{id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['set_default_referral_link'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['set_default_referral_link'] = err.message;
  } finally {
    loading['set_default_referral_link'] = false;
  }
}
</script>

<style scoped>
.interactive-api-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.auth-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.auth-header h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.auth-controls {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-group input, .form-group textarea {
  padding: 0.75rem;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.token-input {
  position: relative;
  display: flex;
}

.token-input input {
  flex: 1;
  margin-right: 0.5rem;
}

.toggle-token {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toggle-token:hover {
  background: rgba(255, 255, 255, 0.3);
}

.endpoints-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.endpoint-section {
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.endpoint-header {
  background: #f8f9fa;
  padding: 1.5rem;
  border-bottom: 1px solid #e1e5e9;
}

.endpoint-header h3 {
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.3rem;
}

.method-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.method-badge.get { background: #e3f2fd; color: #1976d2; }
.method-badge.post { background: #e8f5e8; color: #388e3c; }
.method-badge.put { background: #fff3e0; color: #f57c00; }
.method-badge.delete { background: #ffebee; color: #d32f2f; }

.endpoint-description {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.endpoint-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 400px;
}

.endpoint-docs {
  padding: 1.5rem;
  border-right: 1px solid #e1e5e9;
  background: #fafafa;
}

.endpoint-testing {
  padding: 1.5rem;
  background: white;
}

.endpoint-docs h4, .endpoint-testing h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

.parameter-list {
  margin-bottom: 1.5rem;
}

.parameter-item {
  padding: 1rem;
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.parameter-item strong {
  color: #333;
  font-size: 0.95rem;
}

.param-type {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.param-required {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.param-required.required {
  background: #ffebee;
  color: #d32f2f;
}

.param-required.optional {
  background: #e8f5e8;
  color: #388e3c;
}

.param-description {
  margin: 0.5rem 0 0 0;
  color: #666;
  font-size: 0.85rem;
}

.code-block {
  background: #f5f5f5;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  padding: 1rem;
  margin: 1rem 0;
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.4;
  color: #333;
}

.json-editor {
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  resize: vertical;
}

.test-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 1rem;
}

.test-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.test-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background: #ffebee;
  color: #d32f2f;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  border-left: 4px solid #d32f2f;
}

.response-section {
  margin-top: 1.5rem;
}

.response-section h5 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-weight: 600;
}

.response-data {
  background: #f8f9fa;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
}

.response-data pre {
  margin: 0;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.4;
  color: #333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .auth-controls {
    grid-template-columns: 1fr;
  }
  
  .endpoint-content {
    grid-template-columns: 1fr;
  }
  
  .endpoint-docs {
    border-right: none;
    border-bottom: 1px solid #e1e5e9;
  }
}
</style>