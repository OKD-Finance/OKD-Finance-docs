/* eslint-env node */

// Load environment variables from .env file
try {
  require('dotenv').config();
} catch (error) {
  // dotenv not available, continue without it
}

const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * Swagger API Documentation Generator
 * Automatically generates interactive Vue components from Swagger definition
 */

const SWAGGER_URL = process.env.SWAGGER_URL || 'https://develop.okd.finance/api/swagger/swagger.json';
const OUTPUT_DIR = './docs/.vitepress/theme/components';
const DOCS_DIR = './docs/en/api';

// Utility functions
function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.charAt(1).toLowerCase()
  );
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function generateFingerprint() {
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Fetch Swagger definition
function fetchSwaggerDefinition() {
  return new Promise((resolve, reject) => {
    https.get(SWAGGER_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Generate parameter documentation
function generateParameterDocs(parameters = []) {
  if (!parameters.length) return '';

  return `
### Request Parameters

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
${parameters.map(param => {
    const required = param.required ? 'Yes' : 'No';
    const type = param.type || (param.schema && param.schema.type) || 'string';
    return `| ${param.name} | ${type} | ${required} | ${param.in} | ${param.description || '-'} |`;
  }).join('\n')}
`;
}

// Generate response documentation
function generateResponseDocs(responses = {}) {
  const successResponse = responses['200'] || responses['201'];
  if (!successResponse) return '';

  return `
### Response Format

**Success Response (200):**
\`\`\`json
${JSON.stringify(successResponse.schema?.example || {
    "success": true,
    "data": {},
    "message": "Operation successful"
  }, null, 2)}
\`\`\`

**Error Response (400/500):**
\`\`\`json
{
  "success": false,
  "error": {
    "code": 400001,
    "message": "Invalid request parameters"
  }
}
\`\`\`
`;
}

// Generate Vue component for API endpoint
function generateVueComponent(apiGroup, endpoints) {
  const componentName = `Interactive${toTitleCase(apiGroup)}API`;

  const endpointMethods = endpoints.map(endpoint => {
    const methodName = toCamelCase(endpoint.operationId || endpoint.path.replace(/[\/{}]/g, '_'));
    const hasBody = endpoint.method === 'post' || endpoint.method === 'put';

    return `
    async ${methodName}() {
      this.loading['${methodName}'] = true;
      this.error['${methodName}'] = null;
      
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Fingerprint': this.generateFingerprint()
        };
        
        if (this.accessToken) {
          headers['Authorization'] = \`Bearer \${this.accessToken}\`;
        }
        
        ${hasBody ? `
        const body = this.requestBodies['${methodName}'] || {};
        ` : ''}
        
        const response = await fetch(\`\${this.apiUrl}${endpoint.path}\`, {
          method: '${endpoint.method.toUpperCase()}',
          headers,
          ${hasBody ? 'body: JSON.stringify(body)' : ''}
        });
        
        const data = await response.json();
        this.responses['${methodName}'] = data;
        
        if (!response.ok) {
          throw new Error(data.message || 'Request failed');
        }
      } catch (err) {
        this.error['${methodName}'] = err.message;
      } finally {
        this.loading['${methodName}'] = false;
      }
    },`;
  }).join('');

  const endpointForms = endpoints.map(endpoint => {
    const methodName = toCamelCase(endpoint.operationId || endpoint.path.replace(/[\/{}]/g, '_'));
    const hasBody = endpoint.method === 'post' || endpoint.method === 'put';
    const parameters = endpoint.parameters || [];

    return `
        <!-- ${endpoint.method.toUpperCase()} ${endpoint.path} -->
        <div class="endpoint-section">
          <div class="endpoint-header">
            <h3>
              <span class="method-badge ${endpoint.method}">${endpoint.method.toUpperCase()}</span>
              ${endpoint.path}
            </h3>
            <p class="endpoint-description">${endpoint.summary || endpoint.description || ''}</p>
          </div>
          
          <div class="endpoint-content">
            <div class="endpoint-docs">
              <h4>📋 Description</h4>
              <p>${endpoint.description || endpoint.summary || 'No description available'}</p>
              
              ${parameters.length ? `
              <h4>📝 Parameters</h4>
              <div class="parameter-list">
                ${parameters.map(param => `
                <div class="parameter-item">
                  <strong>${param.name}</strong>
                  <span class="param-type">${param.type || 'string'}</span>
                  <span class="param-required ${param.required ? 'required' : 'optional'}">
                    ${param.required ? 'Required' : 'Optional'}
                  </span>
                  <p class="param-description">${param.description || ''}</p>
                </div>
                `).join('')}
              </div>
              ` : ''}
              
              <h4>📤 Example Request</h4>
              <div class="code-block">
                <pre><code>curl -X ${endpoint.method.toUpperCase()} \\
  "${endpoint.path}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Fingerprint: " \\
  -H "Content-Type: application/json"${hasBody ? ' \\\n  -d \'{"key": "value"}\'' : ''}</code></pre>
              </div>
            </div>
            
            <div class="endpoint-testing">
              <h4>🧪 Test Endpoint</h4>
              
              ${hasBody ? `
              <div class="form-group">
                <label>Request Body (JSON):</label>
                <textarea 
                  v-model="requestBodies['${methodName}']"
                  placeholder='{"key": "value"}'
                  rows="4"
                  class="json-editor"
                ></textarea>
              </div>
              ` : ''}
              
              <button 
                @click="${methodName}" 
                :disabled="loading['${methodName}']"
                class="test-button"
              >
                {{ loading['${methodName}'] ? 'Testing...' : 'Test Endpoint' }}
              </button>
              
              <div v-if="error['${methodName}']" class="error-message">
                ❌ Error: {{ error['${methodName}'] }}
              </div>
              
              <div v-if="responses['${methodName}']" class="response-section">
                <h5>📄 Response:</h5>
                <div class="response-data">
                  <pre><code>{{ JSON.stringify(responses['${methodName}'], null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  }).join('');

  const requestBodiesInit = endpoints
    .filter(e => e.method === 'post' || e.method === 'put')
    .map(e => {
      const methodName = toCamelCase(e.operationId || e.path.replace(/[\/{}]/g, '_'));
      return `'${methodName}': ''`;
    })
    .join(', ');

  return `<template>
  <div class="interactive-api-container">
    <!-- Authentication Header -->
    <div class="auth-header">
      <h2>🔗 ${toTitleCase(apiGroup)} API Testing</h2>
      <div class="auth-controls">
        <div class="form-group">
          <label>API Base URL:</label>
                        <input v-model="apiUrl" :placeholder="defaultApiUrl" />
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
      ${endpointForms}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Reactive state
const defaultApiUrl = process.env.API_BASE_URL || 'https://develop.okd.finance/api'
const apiUrl = ref(defaultApiUrl)
const accessToken = ref('')
const showToken = ref(false)
const loading = reactive({})
const error = reactive({})
const responses = reactive({})
const requestBodies = reactive({${requestBodiesInit}})

// Utility functions
const generateFingerprint = () => {
  return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

// API Methods
${endpointMethods}
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
</style>`;
}

// Generate markdown documentation
function generateMarkdownDocs(apiGroup, endpoints) {
  const title = toTitleCase(apiGroup);

  return `---
layout: page
---

# ${title} API

Welcome to the ${title} API documentation. This interactive documentation allows you to test API endpoints directly from this page.

<Interactive${title}API />

## Endpoints Overview

${endpoints.map(endpoint => `
### ${endpoint.method.toUpperCase()} ${endpoint.path}

**Summary:** ${endpoint.summary || 'No summary available'}

**Description:** ${endpoint.description || 'No description available'}

${generateParameterDocs(endpoint.parameters)}

${generateResponseDocs(endpoint.responses)}

---
`).join('')}

<script setup>
import Interactive${title}API from '../../.vitepress/theme/components/Interactive${title}API.vue'
</script>`;
}

// Group endpoints by API category
function groupEndpoints(swagger) {
  const groups = {};

  Object.entries(swagger.paths).forEach(([path, methods]) => {
    Object.entries(methods).forEach(([method, endpoint]) => {
      if (!endpoint.tags || !endpoint.tags.length) return;

      const tag = endpoint.tags[0].toLowerCase().replace(/\s+/g, '-');

      if (!groups[tag]) {
        groups[tag] = [];
      }

      groups[tag].push({
        path,
        method,
        ...endpoint
      });
    });
  });

  return groups;
}

// Main execution
async function main() {
  try {
    console.log('🔄 Fetching Swagger definition...');
    const swagger = await fetchSwaggerDefinition();

    console.log('📊 Grouping endpoints...');
    const groups = groupEndpoints(swagger);

    // Ensure output directories exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    if (!fs.existsSync(DOCS_DIR)) {
      fs.mkdirSync(DOCS_DIR, { recursive: true });
    }

    console.log(`📁 Found ${Object.keys(groups).length} API groups:`);
    Object.keys(groups).forEach(group => {
      console.log(`   - ${group}: ${groups[group].length} endpoints`);
    });

    // Generate components and documentation for each group
    for (const [groupName, endpoints] of Object.entries(groups)) {
      if (endpoints.length === 0) continue;

      console.log(`\n🔨 Generating ${groupName} API...`);

      // Generate Vue component
      const componentName = `Interactive${toTitleCase(groupName)}API.vue`;
      const componentPath = path.join(OUTPUT_DIR, componentName);
      const componentContent = generateVueComponent(groupName, endpoints);

      fs.writeFileSync(componentPath, componentContent);
      console.log(`   ✅ Component: ${componentName}`);

      // Generate markdown documentation
      const docsPath = path.join(DOCS_DIR, `${groupName}.md`);
      const docsContent = generateMarkdownDocs(groupName, endpoints);

      fs.writeFileSync(docsPath, docsContent);
      console.log(`   ✅ Documentation: ${groupName}.md`);
    }

    // Generate index file for components
    const indexContent = Object.keys(groups)
      .map(group => {
        const componentName = `Interactive${toTitleCase(group)}API`;
        return `export { default as ${componentName} } from './${componentName}.vue'`;
      })
      .join('\n');

    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.js'), indexContent);

    console.log('\n🎉 Generation complete!');
    console.log(`📦 Generated ${Object.keys(groups).length} Vue components`);
    console.log(`📚 Generated ${Object.keys(groups).length} documentation pages`);
    console.log('\n📝 Next steps:');
    console.log('   1. Review generated components in docs/.vitepress/theme/components/');
    console.log('   2. Review generated documentation in docs/en/api/');
    console.log('   3. Update VitePress navigation if needed');
    console.log('   4. Test the interactive API documentation');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  main();
}

module.exports = {
  fetchSwaggerDefinition,
  generateVueComponent,
  generateMarkdownDocs,
  groupEndpoints
}; 