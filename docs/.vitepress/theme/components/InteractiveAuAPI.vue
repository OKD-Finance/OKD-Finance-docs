<template>
  <div class="interactive-api-container">
    <!-- Authentication Header -->
    <div class="auth-header">
      <h2>🔗 Au API Testing</h2>
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
      
        <!-- POST /auth/check/firebase -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/check/firebase
            </h3>
            <p class="endpoint-description">Check account existence by firebase token.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Check account existence by firebase token.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
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
  "/auth/check/firebase" \
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
                  v-model="requestBodies['check_firebase']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="check_firebase" 
                :disabled="loading['check_firebase']"
                class="test-button"
              >
                {{ loading['check_firebase'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['check_firebase']" class="error-message">
                ❌ Error: {{ error['check_firebase'] }}
              </div>
              
              <div v-if="responses['check_firebase']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['check_firebase'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /auth/confirm -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/confirm
            </h3>
            <p class="endpoint-description">Send confirmation code to email.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Send confirmation code to email.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
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
  "/auth/confirm" \
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
                  v-model="requestBodies['email_confirmation']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="email_confirmation" 
                :disabled="loading['email_confirmation']"
                class="test-button"
              >
                {{ loading['email_confirmation'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['email_confirmation']" class="error-message">
                ❌ Error: {{ error['email_confirmation'] }}
              </div>
              
              <div v-if="responses['email_confirmation']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['email_confirmation'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /auth/fcm -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/fcm
            </h3>
            <p class="endpoint-description">Inits operation to create user fcm.</p>
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
                  <p class="param-description">user device id, platform and fcm</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X POST \
  "/auth/fcm" \
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
                  v-model="requestBodies['create_fcm']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="create_fcm" 
                :disabled="loading['create_fcm']"
                class="test-button"
              >
                {{ loading['create_fcm'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['create_fcm']" class="error-message">
                ❌ Error: {{ error['create_fcm'] }}
              </div>
              
              <div v-if="responses['create_fcm']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['create_fcm'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- DELETE /auth/fcm -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge delete">DELETE</span>
              /auth/fcm
            </h3>
            <p class="endpoint-description">Inits operation to delete user fcm by device id and fcm.</p>
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
                  <p class="param-description">user device id, platform and fcm</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X DELETE \
  "/auth/fcm" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="delete_fcm" 
                :disabled="loading['delete_fcm']"
                class="test-button"
              >
                {{ loading['delete_fcm'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['delete_fcm']" class="error-message">
                ❌ Error: {{ error['delete_fcm'] }}
              </div>
              
              <div v-if="responses['delete_fcm']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['delete_fcm'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /auth/google -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /auth/google
            </h3>
            <p class="endpoint-description">Get Google link for lgoin/register.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Get Google link for lgoin/register.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/auth/google" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="get_google_link" 
                :disabled="loading['get_google_link']"
                class="test-button"
              >
                {{ loading['get_google_link'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['get_google_link']" class="error-message">
                ❌ Error: {{ error['get_google_link'] }}
              </div>
              
              <div v-if="responses['get_google_link']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['get_google_link'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /auth/jwt/refresh -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/jwt/refresh
            </h3>
            <p class="endpoint-description">Regenerate a pair of authenticate tokens if refresh token is valid</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>! Need refresh token in bearer token authorization</p>
              
              
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
                <pre><code>curl -X POST \
  "/auth/jwt/refresh" \
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
                  v-model="requestBodies['jwt_refresh']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="jwt_refresh" 
                :disabled="loading['jwt_refresh']"
                class="test-button"
              >
                {{ loading['jwt_refresh'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['jwt_refresh']" class="error-message">
                ❌ Error: {{ error['jwt_refresh'] }}
              </div>
              
              <div v-if="responses['jwt_refresh']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['jwt_refresh'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /auth/locale -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /auth/locale
            </h3>
            <p class="endpoint-description">Inits operation to change current user locale.</p>
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
                <pre><code>curl -X PUT \
  "/auth/locale" \
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
                  v-model="requestBodies['change_locale']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="change_locale" 
                :disabled="loading['change_locale']"
                class="test-button"
              >
                {{ loading['change_locale'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['change_locale']" class="error-message">
                ❌ Error: {{ error['change_locale'] }}
              </div>
              
              <div v-if="responses['change_locale']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['change_locale'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /auth/notifications -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /auth/notifications
            </h3>
            <p class="endpoint-description">Get notifications for user</p>
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
                  <strong>group_id</strong>
                  <span class="param-type">integer</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Group of notifications. Omitted or 0 mean all.
</p>
                </div>
                
                <div class="parameter-item">
                  <strong>hide_read</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Hide read notifications. Bool value: true or false.
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
  "/auth/notifications" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="get_notifications" 
                :disabled="loading['get_notifications']"
                class="test-button"
              >
                {{ loading['get_notifications'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['get_notifications']" class="error-message">
                ❌ Error: {{ error['get_notifications'] }}
              </div>
              
              <div v-if="responses['get_notifications']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['get_notifications'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /auth/notifications -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /auth/notifications
            </h3>
            <p class="endpoint-description">Mark all/group of notifications as viewed. Body is optional.</p>
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
                <pre><code>curl -X PUT \
  "/auth/notifications" \
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
                  v-model="requestBodies['read_notifications']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="read_notifications" 
                :disabled="loading['read_notifications']"
                class="test-button"
              >
                {{ loading['read_notifications'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['read_notifications']" class="error-message">
                ❌ Error: {{ error['read_notifications'] }}
              </div>
              
              <div v-if="responses['read_notifications']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['read_notifications'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- DELETE /auth/notifications -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge delete">DELETE</span>
              /auth/notifications
            </h3>
            <p class="endpoint-description">Delete all/group of notifications. Body is optional.</p>
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
                <pre><code>curl -X DELETE \
  "/auth/notifications" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="delete_notifications" 
                :disabled="loading['delete_notifications']"
                class="test-button"
              >
                {{ loading['delete_notifications'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['delete_notifications']" class="error-message">
                ❌ Error: {{ error['delete_notifications'] }}
              </div>
              
              <div v-if="responses['delete_notifications']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['delete_notifications'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /auth/notifications/{id} -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /auth/notifications/{id}
            </h3>
            <p class="endpoint-description">Mark notification as viewed.</p>
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
                  <p class="param-description">ID of notifications.
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X PUT \
  "/auth/notifications/{id}" \
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
                  v-model="requestBodies['view_notification']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="view_notification" 
                :disabled="loading['view_notification']"
                class="test-button"
              >
                {{ loading['view_notification'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['view_notification']" class="error-message">
                ❌ Error: {{ error['view_notification'] }}
              </div>
              
              <div v-if="responses['view_notification']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['view_notification'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /auth/otp -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/otp
            </h3>
            <p class="endpoint-description">Inits operation to turn OTP on (one time password) for current user.</p>
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
                <pre><code>curl -X POST \
  "/auth/otp" \
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
                  v-model="requestBodies['turnon_otp']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="turnon_otp" 
                :disabled="loading['turnon_otp']"
                class="test-button"
              >
                {{ loading['turnon_otp'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['turnon_otp']" class="error-message">
                ❌ Error: {{ error['turnon_otp'] }}
              </div>
              
              <div v-if="responses['turnon_otp']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['turnon_otp'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- DELETE /auth/otp -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge delete">DELETE</span>
              /auth/otp
            </h3>
            <p class="endpoint-description">Inits operation to turn OTP off (one time password 2FA) for current user by using email and OTP.</p>
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
                  <strong>email</strong>
                  <span class="param-type">boolean</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">Flag indicates to use only email to turn off 2FA
</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X DELETE \
  "/auth/otp" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="turnoff_otp" 
                :disabled="loading['turnoff_otp']"
                class="test-button"
              >
                {{ loading['turnoff_otp'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['turnoff_otp']" class="error-message">
                ❌ Error: {{ error['turnoff_otp'] }}
              </div>
              
              <div v-if="responses['turnoff_otp']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['turnoff_otp'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /auth/password -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /auth/password
            </h3>
            <p class="endpoint-description">Inits operation to change current user password.
Operation is valid only for regular and firebase accounts.
It's no need to set old/new password for firebase account.</p>
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
                <pre><code>curl -X PUT \
  "/auth/password" \
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
                  v-model="requestBodies['change_password']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="change_password" 
                :disabled="loading['change_password']"
                class="test-button"
              >
                {{ loading['change_password'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['change_password']" class="error-message">
                ❌ Error: {{ error['change_password'] }}
              </div>
              
              <div v-if="responses['change_password']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['change_password'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /auth/password/restore -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /auth/password/restore
            </h3>
            <p class="endpoint-description">Finishes restoration of current user password.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Finishes restoration of current user password.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
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
                <pre><code>curl -X PUT \
  "/auth/password/restore" \
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
                  v-model="requestBodies['finish_restore_password']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="finish_restore_password" 
                :disabled="loading['finish_restore_password']"
                class="test-button"
              >
                {{ loading['finish_restore_password'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['finish_restore_password']" class="error-message">
                ❌ Error: {{ error['finish_restore_password'] }}
              </div>
              
              <div v-if="responses['finish_restore_password']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['finish_restore_password'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /auth/password/restore -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/password/restore
            </h3>
            <p class="endpoint-description">Inits restoration of current user password.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Inits restoration of current user password.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
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
  "/auth/password/restore" \
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
                  v-model="requestBodies['init_restore_password']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="init_restore_password" 
                :disabled="loading['init_restore_password']"
                class="test-button"
              >
                {{ loading['init_restore_password'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['init_restore_password']" class="error-message">
                ❌ Error: {{ error['init_restore_password'] }}
              </div>
              
              <div v-if="responses['init_restore_password']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['init_restore_password'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /auth/password/restore/{code} -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /auth/password/restore/{code}
            </h3>
            <p class="endpoint-description">Check restoration code.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Check restoration code.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
                </div>
                
                <div class="parameter-item">
                  <strong>code</strong>
                  <span class="param-type">string</span>
                  <span class="param-required optional">
                    Optional
                  </span>
                  <p class="param-description">code from email</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X GET \
  "/auth/password/restore/{code}" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="check_restore_password" 
                :disabled="loading['check_restore_password']"
                class="test-button"
              >
                {{ loading['check_restore_password'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['check_restore_password']" class="error-message">
                ❌ Error: {{ error['check_restore_password'] }}
              </div>
              
              <div v-if="responses['check_restore_password']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['check_restore_password'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /auth/profile -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /auth/profile
            </h3>
            <p class="endpoint-description">GetProfile returns information about current user.</p>
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
  "/auth/profile" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="get_profile" 
                :disabled="loading['get_profile']"
                class="test-button"
              >
                {{ loading['get_profile'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['get_profile']" class="error-message">
                ❌ Error: {{ error['get_profile'] }}
              </div>
              
              <div v-if="responses['get_profile']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['get_profile'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /auth/profile -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /auth/profile
            </h3>
            <p class="endpoint-description">SetProfile sets some fields in profile of current user. All fields are optional.</p>
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
                <pre><code>curl -X PUT \
  "/auth/profile" \
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
                  v-model="requestBodies['set_profile']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="set_profile" 
                :disabled="loading['set_profile']"
                class="test-button"
              >
                {{ loading['set_profile'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['set_profile']" class="error-message">
                ❌ Error: {{ error['set_profile'] }}
              </div>
              
              <div v-if="responses['set_profile']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['set_profile'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GET /auth/remove -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge get">GET</span>
              /auth/remove
            </h3>
            <p class="endpoint-description">Check possibility to remove account.</p>
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
  "/auth/remove" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Fingerprint: " \
  -H "Content-Type: application/json"</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              
              
              <button 
                @click="check_remove_account" 
                :disabled="loading['check_remove_account']"
                class="test-button"
              >
                {{ loading['check_remove_account'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['check_remove_account']" class="error-message">
                ❌ Error: {{ error['check_remove_account'] }}
              </div>
              
              <div v-if="responses['check_remove_account']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['check_remove_account'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /auth/remove -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /auth/remove
            </h3>
            <p class="endpoint-description">Inits operation to remove account. Reason maximum length is 200.</p>
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
                <pre><code>curl -X PUT \
  "/auth/remove" \
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
                  v-model="requestBodies['init_remove_account']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="init_remove_account" 
                :disabled="loading['init_remove_account']"
                class="test-button"
              >
                {{ loading['init_remove_account'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['init_remove_account']" class="error-message">
                ❌ Error: {{ error['init_remove_account'] }}
              </div>
              
              <div v-if="responses['init_remove_account']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['init_remove_account'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /auth/sign-in -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /auth/sign-in
            </h3>
            <p class="endpoint-description">Confirm login operation.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Confirm login operation.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
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
                <pre><code>curl -X PUT \
  "/auth/sign-in" \
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
                  v-model="requestBodies['final_sign_in']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="final_sign_in" 
                :disabled="loading['final_sign_in']"
                class="test-button"
              >
                {{ loading['final_sign_in'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['final_sign_in']" class="error-message">
                ❌ Error: {{ error['final_sign_in'] }}
              </div>
              
              <div v-if="responses['final_sign_in']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['final_sign_in'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /auth/sign-in -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/sign-in
            </h3>
            <p class="endpoint-description">Logins user and return pair of tokens or login operation with hints.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Logins user and return pair of tokens or login operation with hints.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
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
  "/auth/sign-in" \
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
                  v-model="requestBodies['sign_in']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="sign_in" 
                :disabled="loading['sign_in']"
                class="test-button"
              >
                {{ loading['sign_in'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['sign_in']" class="error-message">
                ❌ Error: {{ error['sign_in'] }}
              </div>
              
              <div v-if="responses['sign_in']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['sign_in'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /auth/sign-in/firebase -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/sign-in/firebase
            </h3>
            <p class="endpoint-description">Sign in by firebase request.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Sign in by firebase request.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
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
  "/auth/sign-in/firebase" \
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
                  v-model="requestBodies['sign_in_firebase']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="sign_in_firebase" 
                :disabled="loading['sign_in_firebase']"
                class="test-button"
              >
                {{ loading['sign_in_firebase'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['sign_in_firebase']" class="error-message">
                ❌ Error: {{ error['sign_in_firebase'] }}
              </div>
              
              <div v-if="responses['sign_in_firebase']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['sign_in_firebase'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /auth/sign-in/google -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/sign-in/google
            </h3>
            <p class="endpoint-description">Sign in by Google OAuth2 request.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Sign in by Google OAuth2 request.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
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
  "/auth/sign-in/google" \
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
                  v-model="requestBodies['signin_google']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="signin_google" 
                :disabled="loading['signin_google']"
                class="test-button"
              >
                {{ loading['signin_google'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['signin_google']" class="error-message">
                ❌ Error: {{ error['signin_google'] }}
              </div>
              
              <div v-if="responses['signin_google']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['signin_google'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /auth/sign-in/resend -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /auth/sign-in/resend
            </h3>
            <p class="endpoint-description">Resend email/phone codes for sign-in process.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Only one of flags should be set.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
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
                <pre><code>curl -X PUT \
  "/auth/sign-in/resend" \
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
                  v-model="requestBodies['resend_sign_in']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="resend_sign_in" 
                :disabled="loading['resend_sign_in']"
                class="test-button"
              >
                {{ loading['resend_sign_in'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['resend_sign_in']" class="error-message">
                ❌ Error: {{ error['resend_sign_in'] }}
              </div>
              
              <div v-if="responses['resend_sign_in']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['resend_sign_in'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /auth/sign-out -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/sign-out
            </h3>
            <p class="endpoint-description">Logout remove user sessions and makes the token invalid.</p>
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
                <pre><code>curl -X POST \
  "/auth/sign-out" \
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
                  v-model="requestBodies['logout']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="logout" 
                :disabled="loading['logout']"
                class="test-button"
              >
                {{ loading['logout'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['logout']" class="error-message">
                ❌ Error: {{ error['logout'] }}
              </div>
              
              <div v-if="responses['logout']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['logout'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /auth/sign-up -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/sign-up
            </h3>
            <p class="endpoint-description">Registration save user in database and send verification url to email.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Registration save user in database and send verification url to email.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
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
  "/auth/sign-up" \
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
                  v-model="requestBodies['registration']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="registration" 
                :disabled="loading['registration']"
                class="test-button"
              >
                {{ loading['registration'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['registration']" class="error-message">
                ❌ Error: {{ error['registration'] }}
              </div>
              
              <div v-if="responses['registration']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['registration'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- POST /auth/sign-up/google -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge post">POST</span>
              /auth/sign-up/google
            </h3>
            <p class="endpoint-description">Sign up by Google OAuth2 request.</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>Sign up by Google OAuth2 request.</p>
              
              
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
                  <strong>X-RECAPTCHA</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">RECAPTCHA token</p>
                </div>
                
                <div class="parameter-item">
                  <strong>X-PLATFORM-ID</strong>
                  <span class="param-type">string</span>
                  <span class="param-required required">
                    Required
                  </span>
                  <p class="param-description">recaptcha platform id</p>
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
  "/auth/sign-up/google" \
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
                  v-model="requestBodies['signup_google']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="signup_google" 
                :disabled="loading['signup_google']"
                class="test-button"
              >
                {{ loading['signup_google'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['signup_google']" class="error-message">
                ❌ Error: {{ error['signup_google'] }}
              </div>
              
              <div v-if="responses['signup_google']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['signup_google'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PUT /user/flags -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge put">PUT</span>
              /user/flags
            </h3>
            <p class="endpoint-description">SetProfile sets profile flags of current user.</p>
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
                  <p class="param-description">profile flag. Can be *futures_order_confirmation* , *futures_visited*, *first_order_after_one_click_trading*</p>
                </div>
                
              </div>
              
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X PUT \
  "/user/flags" \
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
                  v-model="requestBodies['set_profile_flags']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              
              
              <button 
                @click="set_profile_flags" 
                :disabled="loading['set_profile_flags']"
                class="test-button"
              >
                {{ loading['set_profile_flags'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['set_profile_flags']" class="error-message">
                ❌ Error: {{ error['set_profile_flags'] }}
              </div>
              
              <div v-if="responses['set_profile_flags']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['set_profile_flags'], null, 2) }}</code></pre>
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
const requestBodies = reactive({'check_firebase': '', 'email_confirmation': '', 'create_fcm': '', 'jwt_refresh': '', 'change_locale': '', 'read_notifications': '', 'view_notification': '', 'turnon_otp': '', 'change_password': '', 'finish_restore_password': '', 'init_restore_password': '', 'set_profile': '', 'init_remove_account': '', 'final_sign_in': '', 'sign_in': '', 'sign_in_firebase': '', 'signin_google': '', 'resend_sign_in': '', 'logout': '', 'registration': '', 'signup_google': '', 'set_profile_flags': ''})

// Utility functions
const generateFingerprint = () => {
  return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

// API Methods
const check_firebase = async () => {
  loading['check_firebase'] = true;
  error['check_firebase'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['check_firebase'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/check/firebase`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['check_firebase'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['check_firebase'] = err.message;
  } finally {
    loading['check_firebase'] = false;
  }
}

const email_confirmation = async () => {
  loading['email_confirmation'] = true;
  error['email_confirmation'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['email_confirmation'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/confirm`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['email_confirmation'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['email_confirmation'] = err.message;
  } finally {
    loading['email_confirmation'] = false;
  }
}

const create_fcm = async () => {
  loading['create_fcm'] = true;
  error['create_fcm'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['create_fcm'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/fcm`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['create_fcm'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['create_fcm'] = err.message;
  } finally {
    loading['create_fcm'] = false;
  }
}

const delete_fcm = async () => {
  loading['delete_fcm'] = true;
  error['delete_fcm'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/auth/fcm`, {
      method: 'DELETE',
      headers,
      
    });
    
    const data = await response.json();
    responses['delete_fcm'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['delete_fcm'] = err.message;
  } finally {
    loading['delete_fcm'] = false;
  }
}

const get_google_link = async () => {
  loading['get_google_link'] = true;
  error['get_google_link'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/auth/google`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['get_google_link'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['get_google_link'] = err.message;
  } finally {
    loading['get_google_link'] = false;
  }
}

const jwt_refresh = async () => {
  loading['jwt_refresh'] = true;
  error['jwt_refresh'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['jwt_refresh'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/jwt/refresh`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['jwt_refresh'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['jwt_refresh'] = err.message;
  } finally {
    loading['jwt_refresh'] = false;
  }
}

const change_locale = async () => {
  loading['change_locale'] = true;
  error['change_locale'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['change_locale'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/locale`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['change_locale'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['change_locale'] = err.message;
  } finally {
    loading['change_locale'] = false;
  }
}

const get_notifications = async () => {
  loading['get_notifications'] = true;
  error['get_notifications'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/auth/notifications`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['get_notifications'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['get_notifications'] = err.message;
  } finally {
    loading['get_notifications'] = false;
  }
}

const read_notifications = async () => {
  loading['read_notifications'] = true;
  error['read_notifications'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['read_notifications'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/notifications`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['read_notifications'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['read_notifications'] = err.message;
  } finally {
    loading['read_notifications'] = false;
  }
}

const delete_notifications = async () => {
  loading['delete_notifications'] = true;
  error['delete_notifications'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/auth/notifications`, {
      method: 'DELETE',
      headers,
      
    });
    
    const data = await response.json();
    responses['delete_notifications'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['delete_notifications'] = err.message;
  } finally {
    loading['delete_notifications'] = false;
  }
}

const view_notification = async () => {
  loading['view_notification'] = true;
  error['view_notification'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['view_notification'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/notifications/{id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['view_notification'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['view_notification'] = err.message;
  } finally {
    loading['view_notification'] = false;
  }
}

const turnon_otp = async () => {
  loading['turnon_otp'] = true;
  error['turnon_otp'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['turnon_otp'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/otp`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['turnon_otp'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['turnon_otp'] = err.message;
  } finally {
    loading['turnon_otp'] = false;
  }
}

const turnoff_otp = async () => {
  loading['turnoff_otp'] = true;
  error['turnoff_otp'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/auth/otp`, {
      method: 'DELETE',
      headers,
      
    });
    
    const data = await response.json();
    responses['turnoff_otp'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['turnoff_otp'] = err.message;
  } finally {
    loading['turnoff_otp'] = false;
  }
}

const change_password = async () => {
  loading['change_password'] = true;
  error['change_password'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['change_password'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/password`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['change_password'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['change_password'] = err.message;
  } finally {
    loading['change_password'] = false;
  }
}

const finish_restore_password = async () => {
  loading['finish_restore_password'] = true;
  error['finish_restore_password'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['finish_restore_password'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/password/restore`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['finish_restore_password'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['finish_restore_password'] = err.message;
  } finally {
    loading['finish_restore_password'] = false;
  }
}

const init_restore_password = async () => {
  loading['init_restore_password'] = true;
  error['init_restore_password'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['init_restore_password'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/password/restore`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['init_restore_password'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['init_restore_password'] = err.message;
  } finally {
    loading['init_restore_password'] = false;
  }
}

const check_restore_password = async () => {
  loading['check_restore_password'] = true;
  error['check_restore_password'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/auth/password/restore/{code}`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['check_restore_password'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['check_restore_password'] = err.message;
  } finally {
    loading['check_restore_password'] = false;
  }
}

const get_profile = async () => {
  loading['get_profile'] = true;
  error['get_profile'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/auth/profile`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['get_profile'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['get_profile'] = err.message;
  } finally {
    loading['get_profile'] = false;
  }
}

const set_profile = async () => {
  loading['set_profile'] = true;
  error['set_profile'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['set_profile'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/profile`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['set_profile'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['set_profile'] = err.message;
  } finally {
    loading['set_profile'] = false;
  }
}

const check_remove_account = async () => {
  loading['check_remove_account'] = true;
  error['check_remove_account'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    
    const response = await fetch(`${apiUrl.value}/auth/remove`, {
      method: 'GET',
      headers,
      
    });
    
    const data = await response.json();
    responses['check_remove_account'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['check_remove_account'] = err.message;
  } finally {
    loading['check_remove_account'] = false;
  }
}

const init_remove_account = async () => {
  loading['init_remove_account'] = true;
  error['init_remove_account'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['init_remove_account'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/remove`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['init_remove_account'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['init_remove_account'] = err.message;
  } finally {
    loading['init_remove_account'] = false;
  }
}

const final_sign_in = async () => {
  loading['final_sign_in'] = true;
  error['final_sign_in'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['final_sign_in'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/sign-in`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['final_sign_in'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['final_sign_in'] = err.message;
  } finally {
    loading['final_sign_in'] = false;
  }
}

const sign_in = async () => {
  loading['sign_in'] = true;
  error['sign_in'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['sign_in'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/sign-in`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['sign_in'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['sign_in'] = err.message;
  } finally {
    loading['sign_in'] = false;
  }
}

const sign_in_firebase = async () => {
  loading['sign_in_firebase'] = true;
  error['sign_in_firebase'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['sign_in_firebase'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/sign-in/firebase`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['sign_in_firebase'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['sign_in_firebase'] = err.message;
  } finally {
    loading['sign_in_firebase'] = false;
  }
}

const signin_google = async () => {
  loading['signin_google'] = true;
  error['signin_google'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['signin_google'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/sign-in/google`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['signin_google'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['signin_google'] = err.message;
  } finally {
    loading['signin_google'] = false;
  }
}

const resend_sign_in = async () => {
  loading['resend_sign_in'] = true;
  error['resend_sign_in'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['resend_sign_in'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/sign-in/resend`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['resend_sign_in'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['resend_sign_in'] = err.message;
  } finally {
    loading['resend_sign_in'] = false;
  }
}

const logout = async () => {
  loading['logout'] = true;
  error['logout'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['logout'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/sign-out`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['logout'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['logout'] = err.message;
  } finally {
    loading['logout'] = false;
  }
}

const registration = async () => {
  loading['registration'] = true;
  error['registration'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['registration'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/sign-up`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['registration'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['registration'] = err.message;
  } finally {
    loading['registration'] = false;
  }
}

const signup_google = async () => {
  loading['signup_google'] = true;
  error['signup_google'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['signup_google'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/auth/sign-up/google`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['signup_google'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['signup_google'] = err.message;
  } finally {
    loading['signup_google'] = false;
  }
}

const set_profile_flags = async () => {
  loading['set_profile_flags'] = true;
  error['set_profile_flags'] = null;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Fingerprint': generateFingerprint()
    };
    
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    
    
    const body = requestBodies['set_profile_flags'] || {};
    
    
    const response = await fetch(`${apiUrl.value}/user/flags`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    responses['set_profile_flags'] = data;
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
  } catch (err) {
    error['set_profile_flags'] = err.message;
  } finally {
    loading['set_profile_flags'] = false;
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