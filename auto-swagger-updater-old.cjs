const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class AutoSwaggerUpdater {
  constructor(config = {}) {
    this.config = {
      swaggerUrl: process.env.SWAGGER_URL || config.swaggerUrl || 'https://develop.okd.finance/api/swagger/swagger.json',
      apiBaseUrl: process.env.API_BASE_URL || config.apiBaseUrl || 'https://develop.okd.finance/api',
      componentsDir: config.componentsDir || './docs/.vitepress/theme/components',
      docsDir: config.docsDir || './docs/en/api',
      cacheFile: config.cacheFile || '.swagger-cache.json',
      configPath: config.configPath || 'docs/.vitepress/config.ts',
      timeout: config.timeout || 30000,
      ...config
    };

    this.cache = this.loadCache();
    console.log('🚀 Auto Swagger Updater initialized');
    console.log(`📡 Swagger URL: ${this.config.swaggerUrl}`);
  }

  // Загрузка кеша
  loadCache() {
    try {
      if (fs.existsSync(this.config.cacheFile)) {
        return JSON.parse(fs.readFileSync(this.config.cacheFile, 'utf8'));
      }
    } catch {
      console.log('⚠️ Cache file corrupted, starting fresh');
    }
    return {
      lastHash: null,
      lastUpdate: null,
      apis: {},
      metadata: {}
    };
  }

  // Сохранение кеша
  saveCache() {
    try {
      fs.writeFileSync(this.config.cacheFile, JSON.stringify(this.cache, null, 2));
    } catch (error) {
      console.error('❌ Failed to save cache:', error.message);
    }
  }

  // Сброс к начальному состоянию
  async reset(options = {}) {
    try {
      const {
        confirmReset = true,
        removeComponents = true,
        removeMarkdown = true,
        clearCache = true,
        resetNavigation = true
      } = options;

      console.log('🔄 Resetting to initial state...\n');

      // Подтверждение если требуется
      if (confirmReset && process.stdin.isTTY) {
        const readline = require('readline');
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        const answer = await new Promise(resolve => {
          rl.question('⚠️  This will remove all generated API documentation. Continue? (y/N): ', resolve);
        });
        rl.close();

        if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
          console.log('❌ Reset cancelled by user');
          return { cancelled: true };
        }
      }

      const removedFiles = [];
      const errors = [];

      // 1. Удаление сгенерированных Vue компонентов
      if (removeComponents) {
        console.log('1️⃣ Removing generated Vue components...');

        if (fs.existsSync(this.config.componentsDir)) {
          const componentFiles = fs.readdirSync(this.config.componentsDir);

          for (const file of componentFiles) {
            // Удаляем только сгенерированные компоненты (начинающиеся с Interactive и заканчивающиеся на API.vue)
            if (file.startsWith('Interactive') && file.endsWith('API.vue')) {
              const filePath = path.join(this.config.componentsDir, file);
              try {
                fs.unlinkSync(filePath);
                removedFiles.push(filePath);
                console.log(`   ✅ Removed: ${file}`);
              } catch (error) {
                errors.push(`Failed to remove ${file}: ${error.message}`);
                console.log(`   ❌ Failed to remove: ${file}`);
              }
            }
          }
        }
      }

      // 2. Удаление сгенерированных Markdown файлов
      if (removeMarkdown) {
        console.log('\n2️⃣ Removing generated Markdown files...');

        if (fs.existsSync(this.config.docsDir)) {
          const mdFiles = fs.readdirSync(this.config.docsDir);

          // Сохраняем список файлов, которые НЕ нужно удалять
          const protectedFiles = ['overview.md', 'index.md'];

          for (const file of mdFiles) {
            if (file.endsWith('.md') && !protectedFiles.includes(file)) {
              const filePath = path.join(this.config.docsDir, file);

              // Проверяем, является ли файл сгенерированным (содержит импорт Interactive компонента)
              try {
                const content = fs.readFileSync(filePath, 'utf8');
                if (content.includes('Interactive') && content.includes('API.vue')) {
                  fs.unlinkSync(filePath);
                  removedFiles.push(filePath);
                  console.log(`   ✅ Removed: ${file}`);
                }
              } catch (error) {
                errors.push(`Failed to remove ${file}: ${error.message}`);
                console.log(`   ❌ Failed to remove: ${file}`);
              }
            }
          }
        }
      }

      // 3. Очистка кеша
      if (clearCache) {
        console.log('\n3️⃣ Clearing cache...');

        if (fs.existsSync(this.config.cacheFile)) {
          try {
            fs.unlinkSync(this.config.cacheFile);
            removedFiles.push(this.config.cacheFile);
            console.log(`   ✅ Removed cache file: ${this.config.cacheFile}`);
          } catch (error) {
            errors.push(`Failed to remove cache: ${error.message}`);
            console.log(`   ❌ Failed to remove cache file`);
          }
        }

        // Сброс кеша в памяти
        this.cache = {
          lastHash: null,
          lastUpdate: null,
          apis: {},
          metadata: {}
        };
      }

      // 4. Сброс навигации к начальному состоянию
      if (resetNavigation) {
        console.log('\n4️⃣ Resetting navigation to initial state...');

        try {
          const navUpdater = this.createNavigationUpdater();
          const resetResult = await this.resetNavigationToInitial();

          if (resetResult.success) {
            console.log(`   ✅ Navigation reset: removed ${resetResult.removedApis} API entries`);
          } else {
            errors.push('Failed to reset navigation');
            console.log(`   ❌ Failed to reset navigation`);
          }
        } catch (error) {
          errors.push(`Navigation reset error: ${error.message}`);
          console.log(`   ❌ Navigation reset error: ${error.message}`);
        }
      }

      // 5. Отчет о результатах
      console.log('\n📊 Reset Summary:');
      console.log(`   • Removed files: ${removedFiles.length}`);
      console.log(`   • Errors: ${errors.length}`);

      if (removedFiles.length > 0) {
        console.log('\n✅ Removed files:');
        removedFiles.forEach(file => console.log(`   - ${file}`));
      }

      if (errors.length > 0) {
        console.log('\n❌ Errors:');
        errors.forEach(error => console.log(`   - ${error}`));
      }

      console.log('\n🎉 Reset to initial state completed!');
      console.log('💡 You can now run "npm run swagger:generate-all" to regenerate all APIs');

      return {
        success: true,
        removedFiles,
        errors,
        removedCount: removedFiles.length,
        errorCount: errors.length
      };

    } catch (error) {
      console.error('❌ Reset failed:', error.message);
      throw error;
    }
  }

  // Сброс навигации к начальному состоянию
  async resetNavigationToInitial() {
    try {
      let configContent = fs.readFileSync(this.config.configPath, 'utf8');

      // Находим секцию '/en/api/' в sidebar
      const apiSectionRegex = /(\s+)'\/en\/api\/': \[\s*\n([\s\S]*?)\n(\s+)\],/;
      const match = configContent.match(apiSectionRegex);

      if (!match) {
        return { success: false, error: 'API sidebar section not found' };
      }

      const [, indent, sectionContent, endIndent] = match;

      // Подсчитываем количество API записей для статистики
      const apiItemRegex = /text:\s*['"](.*?)API['"]|text:\s*['"](.*?)['"].*link:\s*['"]\/en\/api\/(?!overview)/g;
      const apiItems = [];
      let itemMatch;

      while ((itemMatch = apiItemRegex.exec(sectionContent)) !== null) {
        apiItems.push(itemMatch[1] || itemMatch[2]);
      }

      // Создаем минимальную навигацию только с Overview
      const newApiSection = `${indent}'/en/api/': [
${indent}    {
${indent}        text: 'API Reference',
${indent}        items: [
${indent}            {
${indent}                text: 'Overview',
${indent}                link: '/en/api/overview'
${indent}            }
${indent}        ]
${indent}    }
${endIndent}],`;

      // Заменяем в конфиге
      const fullMatch = match[0];
      const newConfigContent = configContent.replace(fullMatch, newApiSection);
      fs.writeFileSync(this.config.configPath, newConfigContent, 'utf8');

      return {
        success: true,
        removedApis: apiItems.length,
        keptItems: ['Overview']
      };

    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Загрузка Swagger JSON
  async fetchSwagger() {
    try {
      console.log(`📥 Fetching Swagger from: ${this.config.swaggerUrl}`);

      const fetch = (await import('node-fetch')).default;
      const { AbortController } = globalThis;
      const controller = new AbortController();
      const timeout = global.setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.swaggerUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'OKD-Finance-Docs-Generator/1.0.0'
        }
      });

      global.clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const swaggerData = await response.json();
      console.log(`✅ Swagger loaded: ${Object.keys(swaggerData.paths || {}).length} endpoints found`);

      return swaggerData;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`Timeout after ${this.config.timeout}ms`);
      }
      throw error;
    }
  }

  // Вычисление хеша
  calculateHash(data) {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  }

  // Проверка изменений
  async checkForChanges(forceUpdate = false) {
    try {
      const swaggerData = await this.fetchSwagger();
      const currentHash = this.calculateHash(swaggerData);

      if (!forceUpdate && this.cache.lastHash === currentHash) {
        console.log('✅ No changes detected');
        return { hasChanges: false, swaggerData };
      }

      console.log(`🔄 Changes detected (hash: ${currentHash.substring(0, 8)}...)`);
      return { hasChanges: true, swaggerData, currentHash };
    } catch (error) {
      console.error('❌ Failed to check for changes:', error.message);
      throw error;
    }
  }

  // Извлечение тегов из Swagger
  extractTags(swaggerData) {
    const tags = {};
    const paths = swaggerData.paths || {};

    Object.entries(paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, endpoint]) => {
        if (endpoint.tags && endpoint.tags.length > 0) {
          const tag = endpoint.tags[0];
          if (!tags[tag]) {
            tags[tag] = [];
          }
          tags[tag].push({
            path,
            method: method.toUpperCase(),
            summary: endpoint.summary || '',
            description: endpoint.description || '',
            operationId: endpoint.operationId || '',
            parameters: endpoint.parameters || [],
            requestBody: endpoint.requestBody || null,
            responses: endpoint.responses || {},
            security: endpoint.security || []
          });
        }
      });
    });

    return tags;
  }

  // Показать доступные теги
  async showTags() {
    try {
      const swaggerData = await this.fetchSwagger();
      const tags = this.extractTags(swaggerData);

      console.log('\n📋 Available Swagger Tags:');
      Object.entries(tags).forEach(([tag, endpoints], index) => {
        console.log(`${index + 1}. ${tag} (${endpoints.length} endpoints)`);
      });

      return tags;
    } catch (error) {
      console.error('❌ Failed to load tags:', error.message);
      throw error;
    }
  }

  // Генерация Vue компонента
  generateVueComponent(tagName, endpoints) {
    const componentName = `Interactive${tagName.replace(/[^a-zA-Z0-9]/g, '')}API`;

    const template = `<template>
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
        <div v-if="getRawValues().apiToken" class="token-status">✅ Token configured ({{ getRawValues().apiToken.length }} chars)</div>
        <div v-if="getRawValues().apiFingerprint" class="fingerprint-status">🔐 Fingerprint configured ({{ getRawValues().apiFingerprint.length }} chars)</div>
        <button v-if="getRawValues().apiToken || getRawValues().apiFingerprint" @click="clearAuth" class="clear-auth-btn" title="Clear authentication data">
          🗑️ Clear Auth
        </button>
      </div>
      <div class="token-hint">💡 Don't include "Bearer" - it's added automatically</div>
    </div>
  </div>

  <div class="interactive-api-container">
    <div class="main-content">
${endpoints.map((endpoint, index) => this.generateEndpointSection(endpoint, index + 1)).join('\n\n')}
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

// Code examples tabs
const codeLangs = ['cURL', 'Go', 'TypeScript', 'PHP', 'Python']
${endpoints.map((_, index) => `const activeCodeTab${index + 1} = ref('cURL')`).join('\n')}

${endpoints.map((endpoint, index) => this.generateTestData(endpoint, index + 1)).join('\n')}

const results = reactive({
${endpoints.map((_, index) => `  endpoint${index + 1}: null`).join(',\n')}
})

${endpoints.map((endpoint, index) => this.generateTestFunction(endpoint, index + 1)).join('\n\n')}

${this.generateCopyFunctions()}

${this.generateCodeExamples(endpoints)}
</script>

<style scoped>
${this.generateStyles()}
</style>`;

    return { componentName, template };
  }

  // Генерация секции endpoint'а
  generateEndpointSection(endpoint, index) {
    const methodBadge = endpoint.method.toLowerCase();

    return `      <section id="endpoint-${index}" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge ${methodBadge}">${endpoint.method.toUpperCase()}</span>
              <span class="endpoint-path">${endpoint.path}</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 ${endpoint.title || endpoint.summary || 'API Endpoint'}</h3>
              <p class="endpoint-description">${endpoint.description || 'No description available'}</p>
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

            ${this.generateParametersSection(endpoint)}

            <div class="api-section">
              <h4 class="section-title">📝 Example Request</h4>
              <div class="code-examples">
                <div class="code-tabs">
                  <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab${index} = lang"
                    :class="['code-tab', { active: activeCodeTab${index} === lang }]">
                    {{ lang }}
                  </button>
                </div>
                ${this.generateCodeBlocks(endpoint, index)}
              </div>
            </div>
          </div>

          <div class="endpoint-testing">
            <h4 class="testing-title">🚀 Live Testing</h4>
            <div class="test-section">
              ${this.generateFormFields(endpoint, index)}
              <button @click="testEndpoint${index}" class="test-btn"
                :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
                {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
              </button>
              <div v-if="results.endpoint${index}" class="result-container">
                <div class="result-header">
                  <span class="status-badge">{{ results.endpoint${index}.status }}</span>
                  <span class="timestamp">{{ results.endpoint${index}.timestamp }}</span>
                  <button @click="copyToClipboard(results.endpoint${index}.data, $event)" class="copy-btn">📋 Copy Response</button>
                </div>
                <div v-if="results.endpoint${index}.requestUrl" class="request-info">
                  <h5>📤 Actual Request:</h5>
                  <pre class="request-data">{{ results.endpoint${index}.requestUrl }}</pre>
                  <h5>📋 Headers:</h5>
                  <pre class="request-data">{{ results.endpoint${index}.headers }}</pre>
                  <h5>📦 Body:</h5>
                  <pre class="request-data">{{ results.endpoint${index}.body }}</pre>
                </div>
                <h5>📥 Response:</h5>
                <pre class="result-data">{{ results.endpoint${index}.data }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>`;
  }

  // Генерация секции параметров
  generateParametersSection(endpoint) {
    const parameters = this.extractParameters(endpoint);

    if (parameters.length === 0) {
      return '';
    }

    return `<div class="api-section">
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                ${parameters.map(param => `<div class="param-item required">
                  <code class="param-name">${param.name}</code>
                  <span class="param-type">${param.type}</span>
                  <span class="param-desc">${param.description}</span>
                </div>`).join('\n                ')}
              </div>
            </div>`;
  }

  // Генерация полей формы для тестирования
  generateFormFields(endpoint, index) {
    const parameters = this.extractParameters(endpoint);

    return parameters.map(param => {
      if (param.type === 'boolean') {
        return `<div class="form-group">
                <label>${param.name.charAt(0).toUpperCase() + param.name.slice(1)}</label>
                <select v-model="testData${index}.${param.name}" class="test-input">
                  <option :value="true">True</option>
                  <option :value="false">False</option>
                </select>
              </div>`;
      } else {
        return `<div class="form-group">
                <label>${param.name.charAt(0).toUpperCase() + param.name.slice(1)}</label>
                <input v-model="testData${index}.${param.name}" type="${param.type === 'integer' ? 'number' : 'text'}" placeholder="example_${param.name}" class="test-input" />
              </div>`;
      }
    }).join('\n              ');
  }

  // Генерация тестовых данных
  generateTestData(endpoint, index) {
    const parameters = this.extractParameters(endpoint);
    const defaultValues = parameters.map(param => {
      if (param.type === 'boolean') return `${param.name}: true`;
      if (param.type === 'integer') return `${param.name}: 123`;
      return `${param.name}: 'example_${param.name}'`;
    }).join(', ');

    return `const testData${index} = reactive({ ${defaultValues} })`;
  }

  // Генерация функции тестирования
  generateTestFunction(endpoint, index) {
    const parameters = this.extractParameters(endpoint);

    return `const testEndpoint${index} = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      results.endpoint${index} = {
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
      ${parameters.map(param => `${param.name}: testData${index}.${param.name}`).join(',\n      ')}
    }

    const fullUrl = \`\${authValues.apiBaseUrl}${endpoint.path}\`
    const headers = {
      'Authorization': \`Bearer \${authValues.apiToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: '${endpoint.method.toUpperCase()}',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    results.endpoint${index} = {
      status: \`\${response.status} \${response.statusText}\`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: \`${endpoint.method.toUpperCase()} \${fullUrl}\`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    results.endpoint${index} = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}`;
  }

  // Генерация блоков кода
  generateCodeBlocks(endpoint, index) {
    return `
                <div v-show="activeCodeTab${index} === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X ${endpoint.method.toUpperCase()} &quot;https://develop.okd.finance/api${endpoint.path}&quot; \\
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \\
  -H &quot;Content-Type: application/json&quot; \\
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \\
  -d &#x27;{${this.extractParameters(endpoint).map(p => `&quot;${p.name}&quot;:&quot;example&quot;`).join(',')}}&#x27;</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${index} === 'Go'" class="code-block-container">
                  <button @click="copyCodeToClipboard('go', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.go[${index}] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${index} === 'TypeScript'" class="code-block-container">
                  <button @click="copyCodeToClipboard('typescript', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.typescript[${index}] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${index} === 'PHP'" class="code-block-container">
                  <button @click="copyCodeToClipboard('php', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.php[${index}] }}</pre>
                  </div>
                </div>

                <div v-show="activeCodeTab${index} === 'Python'" class="code-block-container">
                  <button @click="copyCodeToClipboard('python', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>{{ codeExamples.python[${index}] }}</pre>
                  </div>
                </div>`;
  }

  // Генерация функций копирования
  generateCopyFunctions() {
    return `const copyToClipboard = (text, event) => {
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

const copyCodeToClipboard = (lang, endpointNum) => {
  const authValues = getRawValues()
  let code = codeExamples[lang]?.[endpointNum]
  
  if (code) {
    code = code.replace(/YOUR_ACCESS_TOKEN/g, authValues.apiToken || 'YOUR_ACCESS_TOKEN')
    code = code.replace(/YOUR_FINGERPRINT/g, authValues.apiFingerprint || 'YOUR_FINGERPRINT')
    code = code.replace(/https:\\/\\/develop\\.okd\\.finance\\/api/g, authValues.apiBaseUrl || 'https://develop.okd.finance/api')
    
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy code:', err)
    })
  }
}`;
  }

  // Генерация примеров кода
  generateCodeExamples(endpoints) {
    return `const codeExamples = {
  curl: {
    ${endpoints.map((endpoint, index) => `${index + 1}: \`curl -X ${endpoint.method.toUpperCase()} "https://develop.okd.finance/api${endpoint.path}" \\\\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\\\
  -H "Content-Type: application/json" \\\\
  -H "Fingerprint: YOUR_FINGERPRINT" \\\\
  -d '{${this.extractParameters(endpoint).map(p => `"${p.name}":"example"`).join(',')}}'\``).join(',\n    ')}
  },
  go: {
    ${endpoints.map((endpoint, index) => {
      const structName = (endpoint.title || endpoint.summary || 'Endpoint').replace(/[^a-zA-Z0-9]/g, '');
      const params = this.extractParameters(endpoint).map(p => `    ${p.name.charAt(0).toUpperCase() + p.name.slice(1)} string \\\`json:"${p.name}"\\\``).join('\\n');
      const method = endpoint.method.toUpperCase();

      return `${index + 1}: \`package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type ${structName}Request struct {
${params}
}

func ${(endpoint.title || endpoint.summary || 'endpoint').toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}() error {
    url := "https://develop.okd.finance/api${endpoint.path}"
    
    requestData := ${structName}Request{
${this.extractParameters(endpoint).map(p => `        ${p.name.charAt(0).toUpperCase() + p.name.slice(1)}: "example",`).join('\\n')}
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("${method}", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return err
    }
    
    fmt.Printf("Response: %s\\\\n", string(body))
    return nil
}

func main() {
    if err := ${(endpoint.title || endpoint.summary || 'endpoint').toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(); err != nil {
        fmt.Printf("Error: %v\\\\n", err)
    }
}\``;
    }).join(',\n    ')}
  },
  typescript: {
    ${endpoints.map((endpoint, index) => {
      const interfaceName = (endpoint.title || endpoint.summary || 'Endpoint').replace(/[^a-zA-Z0-9]/g, '') + 'Request';
      const params = this.extractParameters(endpoint).map(p => `  ${p.name}: ${p.type === 'boolean' ? 'boolean' : 'string'};`).join('\\n');
      const method = endpoint.method.toUpperCase();

      return `${index + 1}: \`interface ${interfaceName} {
${params}
}

async function ${(endpoint.title || endpoint.summary || 'endpoint').toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
  baseUrl: string,
  accessToken: string,
  data: ${interfaceName}
): Promise<any> {
  const response = await fetch(\\\`\\\${baseUrl}${endpoint.path}\\\`, {
    method: '${method}',
    headers: {
      'Authorization': \\\`Bearer \\\${accessToken}\\\`,
      'Content-Type': 'application/json',
      'Fingerprint': 'YOUR_FINGERPRINT'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(\\\`HTTP error! status: \\\${response.status}\\\`);
  }

  return await response.json();
}

// Usage example
async function main() {
  try {
    const result = await ${(endpoint.title || endpoint.summary || 'endpoint').toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
${this.extractParameters(endpoint).map(p => `        ${p.name}: ${p.type === 'boolean' ? 'true' : '"example"'},`).join('\\n')}
      }
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();\``;
    }).join(',\n    ')}
  },
  php: {
    ${endpoints.map((endpoint, index) => {
      const method = endpoint.method.toUpperCase();

      return `${index + 1}: \`<?php

function ${(endpoint.title || endpoint.summary || 'endpoint').toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '${endpoint.path}';
    
    $headers = [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type': 'application/json',
        'Fingerprint: YOUR_FINGERPRINT'
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => '${method}',
        CURLOPT_POSTFIELDS => json_encode($data),
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
        throw new Exception("API Error: " . $message);
    }

    return $data;
}

try {
    $data = [
${this.extractParameters(endpoint).map(p => `        '${p.name}' => ${p.type === 'boolean' ? 'true' : "'example'"},`).join('\\n')}
    ];

    $result = ${(endpoint.title || endpoint.summary || 'endpoint').toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "Success: " . json_encode($result) . "\\\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\\\n";
}

?>\``;
    }).join(',\n    ')}
  },
  python: {
    ${endpoints.map((endpoint, index) => {
      const method = endpoint.method.toUpperCase();

      return `${index + 1}: \`import requests
import json
from typing import Dict, Any


def ${(endpoint.title || endpoint.summary || 'endpoint').toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """${endpoint.description || 'API endpoint'}"""
    url = f"{base_url}${endpoint.path}"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Fingerprint': 'YOUR_FINGERPRINT'
    }
    
    try:
        response = requests.request(
            '${method}',
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {e}")


def main():
    data = {
${this.extractParameters(endpoint).map(p => `        '${p.name}': ${p.type === 'boolean' ? 'True' : "'example'"},`).join('\\n')}
    }
    
    try:
        result = ${(endpoint.title || endpoint.summary || 'endpoint').toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("Success:", json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()\``;
    }).join(',\n    ')}
  }
}`;
  }

  // Создание навигационного обновлятора
  createNavigationUpdater() {
    const NavigationUpdater = require('./navigation-validator.cjs').NavigationValidator || class {
      constructor(configPath) {
        this.configPath = configPath;
      }

      addApiToNavigation(apiName) {
        console.log(`✅ Added ${apiName} to navigation`);
        return true;
      }

      fixNavigation() {
        console.log('✅ Navigation validated');
        return false;
      }
    };

    return new NavigationUpdater(this.config.configPath);
  }

  // Генерация API документации
  async generateApiDocumentation(tagName, endpoints) {
    try {
      // Создание директорий
      if (!fs.existsSync(this.config.componentsDir)) {
        fs.mkdirSync(this.config.componentsDir, { recursive: true });
      }
      if (!fs.existsSync(this.config.docsDir)) {
        fs.mkdirSync(this.config.docsDir, { recursive: true });
      }

      // Генерация Vue компонента
      const { componentName, template } = this.generateVueComponent(tagName, endpoints);
      const componentPath = path.join(this.config.componentsDir, `${componentName}.vue`);
      fs.writeFileSync(componentPath, template);
      console.log(`✅ Generated ${componentPath}`);

      // Генерация Markdown страницы
      const mdContent = `# ${tagName} API

Interactive documentation for ${tagName} endpoints.

<script setup>
import ${componentName} from '../.vitepress/theme/components/${componentName}.vue'
</script>

<${componentName} />

## Endpoints Overview

${endpoints.map((endpoint) => `### ${endpoint.method} ${endpoint.path}

${endpoint.description || endpoint.summary || 'No description available'}

**Parameters:**
${endpoint.parameters?.map(p => `- \`${p.name}\` (${p.schema?.type || 'string'}${p.required ? ', required' : ', optional'}) - ${p.description || 'No description'}`).join('\n') || '- No parameters'}

**Responses:**
${Object.entries(endpoint.responses).map(([code, resp]) => `- \`${code}\` - ${resp.description || 'No description'}`).join('\n')}
`).join('\n')}
`;

      const mdPath = path.join(this.config.docsDir, `${tagName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`);
      fs.writeFileSync(mdPath, mdContent);
      console.log(`✅ Generated ${mdPath}`);

      // Обновление навигации
      const navUpdater = this.createNavigationUpdater();
      const apiLink = `/en/api/${tagName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      navUpdater.addApiToNavigation(`${tagName} API`, apiLink);

      return { componentName, componentPath, mdPath };
    } catch (error) {
      console.error(`❌ Failed to generate ${tagName} API:`, error.message);
      throw error;
    }
  }

  // Генерация конкретного тега
  async generateTag(tagName) {
    try {
      console.log(`🔥 Generating ${tagName} API...`);

      const swaggerData = await this.fetchSwagger();
      const tags = this.extractTags(swaggerData);

      if (!tags[tagName]) {
        throw new Error(`Tag "${tagName}" not found. Available tags: ${Object.keys(tags).join(', ')}`);
      }

      const endpoints = tags[tagName];
      const result = await this.generateApiDocumentation(tagName, endpoints);

      // Обновление кеша
      this.cache.apis[tagName] = {
        lastGenerated: new Date().toISOString(),
        endpointsCount: endpoints.length,
        componentPath: result.componentPath,
        mdPath: result.mdPath
      };
      this.saveCache();

      console.log(`🎉 ${tagName} API generation completed!`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to generate ${tagName}:`, error.message);
      throw error;
    }
  }

  // Генерация всех API
  async generateAll() {
    try {
      console.log('🔥 Generating all APIs...');

      const swaggerData = await this.fetchSwagger();
      const tags = this.extractTags(swaggerData);
      const results = [];

      for (const [tagName, endpoints] of Object.entries(tags)) {
        try {
          console.log(`\n🔄 Processing tag: ${tagName}`);
          const result = await this.generateApiDocumentation(tagName, endpoints);
          results.push({ tagName, ...result });

          // Обновление кеша
          this.cache.apis[tagName] = {
            lastGenerated: new Date().toISOString(),
            endpointsCount: endpoints.length,
            componentPath: result.componentPath,
            mdPath: result.mdPath
          };
        } catch (error) {
          console.error(`❌ Failed to generate ${tagName}:`, error.message);
        }
      }

      // Обновление общего кеша
      const currentHash = this.calculateHash(swaggerData);
      this.cache.lastHash = currentHash;
      this.cache.lastUpdate = new Date().toISOString();
      this.cache.metadata = {
        totalTags: Object.keys(tags).length,
        totalEndpoints: Object.values(tags).reduce((sum, endpoints) => sum + endpoints.length, 0),
        generatedCount: results.length
      };
      this.saveCache();

      console.log(`\n🎉 Generated ${results.length} APIs successfully!`);
      console.log(`📊 Total: ${this.cache.metadata.totalEndpoints} endpoints across ${this.cache.metadata.totalTags} tags`);

      return results;
    } catch (error) {
      console.error('❌ Failed to generate all APIs:', error.message);
      throw error;
    }
  }

  // Обновление документации
  async updateDocumentation(options = {}) {
    try {
      const { forceUpdate = false } = options;
      console.log(`🔄 ${forceUpdate ? 'Force updating' : 'Checking for updates'}...`);

      const { hasChanges, currentHash } = await this.checkForChanges(forceUpdate);

      if (!hasChanges && !forceUpdate) {
        console.log('✅ Documentation is up to date');
        return { updated: false, message: 'No changes detected' };
      }

      const results = await this.generateAll();

      console.log('✅ Documentation update completed!');
      console.log(`📊 Updated ${results.length} APIs`);

      return {
        updated: true,
        updatedApis: results.map(r => r.tagName),
        totalEndpoints: this.cache.metadata.totalEndpoints,
        hash: currentHash?.substring(0, 8)
      };
    } catch (error) {
      console.error('❌ Update failed:', error.message);
      throw error;
    }
  }
}

// CLI интерфейс
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const param = args[1];

  try {
    const updater = new AutoSwaggerUpdater();

    switch (command) {
      case 'help':
      case '--help':
      case '-h':
        console.log(`
🚀 Auto Swagger Updater

Usage:
  node auto-swagger-updater.cjs <command> [options]

Commands:
  tags                    Show available Swagger tags
  generate <tag>          Generate documentation for specific tag
  generate-all           Generate documentation for all tags
  update                 Update documentation if changes detected
  update --force         Force update all documentation
  reset                  Reset to initial state (remove all generated APIs)
  reset --no-confirm     Reset without confirmation prompt
  help                   Show this help message

Examples:
  node auto-swagger-updater.cjs tags
  node auto-swagger-updater.cjs generate "User Operations"
  node auto-swagger-updater.cjs generate-all
  node auto-swagger-updater.cjs update
  node auto-swagger-updater.cjs update --force
  node auto-swagger-updater.cjs reset
  node auto-swagger-updater.cjs reset --no-confirm
`);
        break;

      case 'tags':
        await updater.showTags();
        break;

      case 'generate':
        if (!param) {
          console.error('❌ Please specify a tag name');
          console.log('Available tags:');
          await updater.showTags();
          process.exit(1);
        }
        await updater.generateTag(param);
        break;

      case 'generate-all':
        await updater.generateAll();
        break;

      case 'update': {
        const forceUpdate = args.includes('--force');
        await updater.updateDocumentation({ forceUpdate });
        break;
      }

      case 'reset': {
        const noConfirm = args.includes('--no-confirm');
        await updater.reset({ confirmReset: !noConfirm });
        break;
      }

      default:
        if (command) {
          console.error(`❌ Unknown command: ${command}`);
        }
        console.log('Use "node auto-swagger-updater.cjs help" for usage information');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Запуск CLI если файл выполняется напрямую
if (require.main === module) {
  main();
}

module.exports = { AutoSwaggerUpdater }; 