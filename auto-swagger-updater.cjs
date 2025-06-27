/* eslint-env node */
/* global AbortController, setTimeout, clearTimeout, fetch */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Navigation updater class
class NavigationUpdater {
  constructor(configPath = 'docs/.vitepress/config.ts') {
    this.configPath = configPath;
    this.apiList = []; // Список API для пересоздания навигации
  }

  // Создание правильной структуры навигации с нуля
  rebuildApiNavigation(apis = []) {
    try {
      let configContent = fs.readFileSync(this.configPath, 'utf8');

      // Найти и заменить всю секцию /en/api/ полностью
      // Используем более гибкий regex для поиска секции
      const apiSectionRegex = /(\/en\/api\/'\s*:\s*\[[\s\S]*?\]\s*,)/;

      // Альтернативные regex для поврежденных конфигураций
      const altRegexes = [
        /('{2,}\/en\/api\/'\s*:\s*\[[\s\S]*?\]\s*,)/,  // Множественные кавычки в начале
        /(\/en\/api\/\s*'\s*:\s*\[[\s\S]*?\]\s*,)/,    // Перепутанные кавычки
        /(\/en\/api\/\s*:\s*\[[\s\S]*?\]\s*,)/,        // Без кавычек
        /('\/en\/api\/'\s*:\s*\[[\s\S]*?\]\s*,)/       // Правильный формат
      ];

      // Создать правильную структуру навигации
      const apiItems = [
        { text: 'Overview', link: '/en/api/overview' },
        ...apis.map(api => ({ text: api.name, link: api.link }))
      ];

      const newApiSection = `'/en/api/': [
                {
                    text: 'API Reference',
                    items: [
${apiItems.map(item => `                        { text: '${item.text}', link: '${item.link}' }`).join(',\n')}
                    ]
                }
            ],`;

      let newConfigContent = configContent;
      let replaced = false;

      // Попробовать основной regex
      if (configContent.match(apiSectionRegex)) {
        newConfigContent = configContent.replace(apiSectionRegex, newApiSection);
        replaced = true;
        console.log('✅ Found and replaced API section using main regex');
      } else {
        // Попробовать альтернативные regex для поврежденных конфигураций
        for (let i = 0; i < altRegexes.length; i++) {
          const altRegex = altRegexes[i];
          if (configContent.match(altRegex)) {
            newConfigContent = configContent.replace(altRegex, newApiSection);
            replaced = true;
            console.log(`✅ Found and replaced API section using alternative regex ${i + 1}`);
            break;
          }
        }
      }

      if (!replaced) {
        console.log('❌ Could not find /en/api/ section in config with any regex pattern');
        console.log('🔍 Available sections in config:');
        const sections = configContent.match(/\/[^/]+\/[^']*':\s*\[/g) || [];
        sections.forEach(section => console.log(`   - ${section}`));
        return false;
      }

      // Проверить что замена произошла корректно
      if (newConfigContent === configContent) {
        console.log('❌ Navigation section was not replaced');
        return false;
      }

      fs.writeFileSync(this.configPath, newConfigContent, 'utf8');
      console.log(`✅ Rebuilt navigation with ${apis.length} APIs`);

      return true;

    } catch (error) {
      console.error('❌ Error rebuilding navigation:', error.message);
      console.error('Stack trace:', error.stack);
      return false;
    }
  }

  addApiToNavigation(apiName, apiLink, subItems = []) {
    // Новый подход: не модифицируем sidebar навигацию
    // Вместо этого просто логируем что API создан
    console.log(`✅ API navigation entry ready: ${apiName} -> ${apiLink}`);

    // Добавляем в список для отслеживания
    if (!this.apiList) {
      this.apiList = [];
    }

    // Удаляем дубликаты
    this.apiList = this.apiList.filter(api => api.name !== apiName);

    // Добавляем новый API
    this.apiList.push({ name: apiName, link: apiLink });

    console.log(`📝 Total APIs tracked: ${this.apiList.length}`);
    return true; // Всегда успешно
  }
}

// Auto Swagger Updater - объединяет функции автообновления с правильными методами генерации
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
    this.navUpdater = new NavigationUpdater(this.config.configPath);
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
          const protectedFiles = ['overview.md', 'index.md'];

          for (const file of mdFiles) {
            if (file.endsWith('.md') && !protectedFiles.includes(file)) {
              const filePath = path.join(this.config.docsDir, file);

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

        this.cache = {
          lastHash: null,
          lastUpdate: null,
          apis: {},
          metadata: {}
        };
      }

      // 4. Сброс навигации к начальному состоянию (новый подход - только очистка списка)
      if (resetNavigation) {
        console.log('\n4️⃣ Clearing API tracking list...');

        try {
          // Просто очищаем список отслеживаемых API
          this.navUpdater.apiList = [];
          console.log(`   ✅ API tracking list cleared`);
          console.log(`   💡 Sidebar navigation remains unchanged - using internal page navigation`);
        } catch (error) {
          errors.push(`API list clear error: ${error.message}`);
          console.log(`   ❌ API list clear error: ${error.message}`);
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
        removedFiles: removedFiles.length,
        errors: errors.length,
        details: { removedFiles, errors }
      };

    } catch (error) {
      console.error('❌ Reset failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Сброс навигации к начальному состоянию
  async resetNavigationToInitial() {
    try {
      // Очистить список API
      this.navUpdater.apiList = [];

      // Восстановить config.ts из git если он поврежден
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);

      try {
        await execAsync('git checkout docs/.vitepress/config.ts');
        console.log('✅ Restored config.ts from git');
      } catch (gitError) {
        console.log('⚠️ Could not restore from git, proceeding with manual fix');
      }

      // Пересоздать навигацию только с Overview
      const success = this.navUpdater.rebuildApiNavigation([]);

      if (success) {
        console.log('✅ Navigation reset to initial state (Overview only)');
        return { success: true, removedApis: 0 };
      } else {
        console.log('❌ Failed to reset navigation');
        return { success: false, removedApis: 0 };
      }

    } catch (error) {
      console.error('❌ Error resetting navigation:', error.message);
      return { success: false, removedApis: 0 };
    }
  }

  // Получение Swagger документации
  async fetchSwaggerDocs() {
    try {
      console.log('📡 Fetching Swagger documentation...');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.swaggerUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Auto-Swagger-Updater/1.0',
          'Accept': 'application/json'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const swaggerData = await response.json();
      const swaggerHash = crypto.createHash('md5').update(JSON.stringify(swaggerData)).digest('hex');

      console.log(`✅ Swagger documentation fetched (hash: ${swaggerHash.substring(0, 8)}...)`);

      return { swaggerData, swaggerHash };

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.config.timeout}ms`);
      }
      throw error;
    }
  }

  // Проверка на изменения
  async checkForUpdates() {
    try {
      const { swaggerData, swaggerHash } = await this.fetchSwaggerDocs();

      if (this.cache.lastHash === swaggerHash) {
        console.log('✅ No changes detected in Swagger documentation');
        return { hasUpdates: false, swaggerData, swaggerHash };
      }

      console.log('🔄 Changes detected in Swagger documentation');
      return { hasUpdates: true, swaggerData, swaggerHash };

    } catch (error) {
      console.error('❌ Failed to check for updates:', error.message);
      throw error;
    }
  }

  // Обновление всех API
  async updateAll() {
    try {
      const { hasUpdates, swaggerData, swaggerHash } = await this.checkForUpdates();

      if (!hasUpdates) {
        return { updated: false, message: 'No updates needed' };
      }

      console.log('🔄 Starting API documentation update...');

      const results = await this.generateAllAPIs(swaggerData);

      // Обновление кеша
      this.cache.lastHash = swaggerHash;
      this.cache.lastUpdate = new Date().toISOString();
      this.cache.apis = results.apis;
      this.cache.metadata = {
        totalApis: results.totalApis,
        totalEndpoints: results.totalEndpoints,
        generatedAt: new Date().toISOString()
      };

      this.saveCache();

      console.log('🎉 API documentation update completed!');
      console.log(`📊 Generated ${results.totalApis} APIs with ${results.totalEndpoints} endpoints`);

      return {
        updated: true,
        results,
        hash: swaggerHash
      };

    } catch (error) {
      console.error('❌ Update failed:', error.message);
      throw error;
    }
  }

  // Генерация всех API из Swagger
  async generateAllAPIs(swaggerData) {
    const results = {
      apis: {},
      totalApis: 0,
      totalEndpoints: 0,
      errors: []
    };

    try {
      // Группировка endpoint'ов по тегам
      const apiGroups = this.groupEndpointsByTags(swaggerData);

      for (const [tagName, endpoints] of Object.entries(apiGroups)) {
        try {
          console.log(`\n🔧 Generating ${tagName} API...`);

          const apiResult = await this.generateAPI(tagName, endpoints);

          results.apis[tagName] = apiResult;
          results.totalApis++;
          results.totalEndpoints += endpoints.length;

          console.log(`✅ ${tagName} API generated (${endpoints.length} endpoints)`);

        } catch (error) {
          console.error(`❌ Failed to generate ${tagName} API:`, error.message);
          results.errors.push({ api: tagName, error: error.message });
        }
      }

      return results;

    } catch (error) {
      console.error('❌ Failed to generate APIs:', error.message);
      throw error;
    }
  }

  // Группировка endpoint'ов по тегам
  groupEndpointsByTags(swaggerData) {
    const apiGroups = {};

    if (!swaggerData.paths) {
      throw new Error('No paths found in Swagger documentation');
    }

    for (const [path, methods] of Object.entries(swaggerData.paths)) {
      for (const [method, endpoint] of Object.entries(methods)) {
        if (typeof endpoint !== 'object' || !endpoint.tags) continue;

        const tag = endpoint.tags[0] || 'Default';

        if (!apiGroups[tag]) {
          apiGroups[tag] = [];
        }

        apiGroups[tag].push({
          method: method.toUpperCase(),
          path,
          title: endpoint.summary || `${method.toUpperCase()} ${path}`,
          description: endpoint.description || 'No description available',
          parameters: this.extractParameters(endpoint),
          responses: endpoint.responses || {}
        });
      }
    }

    return apiGroups;
  }

  // Извлечение параметров из endpoint'а
  extractParameters(endpoint) {
    const parameters = [];

    // Parameters из самого endpoint'а
    if (endpoint.parameters) {
      endpoint.parameters.forEach(param => {
        if (param.in === 'query' || param.in === 'path') {
          parameters.push({
            name: param.name,
            type: param.schema?.type || 'string',
            description: param.description || '',
            required: param.required || false
          });
        }
      });
    }

    // Request body parameters
    if (endpoint.requestBody?.content?.['application/json']?.schema?.properties) {
      const properties = endpoint.requestBody.content['application/json'].schema.properties;

      for (const [name, prop] of Object.entries(properties)) {
        parameters.push({
          name,
          type: prop.type || 'string',
          description: prop.description || '',
          required: endpoint.requestBody.content['application/json'].schema.required?.includes(name) || false
        });
      }
    }

    return parameters;
  }

  // Генерация API (использует методы из universal-swagger-generator-final.cjs)
  async generateAPI(tagName, endpoints) {
    const apiName = `${tagName} API`;
    const componentName = `Interactive${tagName.replace(/[^a-zA-Z0-9]/g, '')}API`;

    // Создание директорий
    if (!fs.existsSync(this.config.componentsDir)) {
      fs.mkdirSync(this.config.componentsDir, { recursive: true });
    }
    if (!fs.existsSync(this.config.docsDir)) {
      fs.mkdirSync(this.config.docsDir, { recursive: true });
    }

    // Перенесенные методы из universal-swagger-generator-final.cjs



    // Генерация Vue компонента
    const componentContent = this.generateVueComponent(apiName, endpoints);
    const componentPath = path.join(this.config.componentsDir, `${componentName}.vue`);
    fs.writeFileSync(componentPath, componentContent, 'utf8');

    // Генерация отдельных компонентов для каждого endpoint'а
    for (let i = 0; i < endpoints.length; i++) {
      const endpointComponent = this.generateEndpointComponent(componentName, endpoints[i], i + 1);
      const endpointPath = path.join(this.config.componentsDir, `${componentName}Endpoint${i + 1}.vue`);
      fs.writeFileSync(endpointPath, endpointComponent, 'utf8');
    }

    // Генерация Markdown страницы
    const apiNameLower = tagName.toLowerCase().replace(/\s+/g, '-').replace(/-api$/, '');
    const fileName = apiNameLower === 'user' ? 'users' : apiNameLower;

    const markdownPage = `---
layout: page
---

# ${apiName}

<SimpleOutline />

${endpoints.map((endpoint, index) => {
      const endpointId = `${endpoint.method.toLowerCase()}-${endpoint.path.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;
      return `## ${endpoint.method.toUpperCase()} ${endpoint.path} {#${endpointId}}

${endpoint.title}

${endpoint.description ? endpoint.description + '\n' : ''}

<${componentName}Endpoint${index + 1} />
`;
    }).join('\n')}

<script setup>
import ${componentName} from '../../.vitepress/theme/components/${componentName}.vue'
${endpoints.map((_, index) => `import ${componentName}Endpoint${index + 1} from '../../.vitepress/theme/components/${componentName}Endpoint${index + 1}.vue'`).join('\n')}
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>
`;

    const markdownPath = path.join(this.config.docsDir, `${fileName}.md`);
    fs.writeFileSync(markdownPath, markdownPage, 'utf8');

    // Обновление навигации - используем простую структуру без subItems
    this.navUpdater.addApiToNavigation(apiName, `/en/api/${fileName}`);

    return {
      componentName,
      componentPath,
      markdownPath,
      fileName,
      endpoints: endpoints.length
    };
  }

  // Generate Vue component for any API with authentication block
  generateVueComponent(apiName, endpoints) {
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

    return template;
  }

  generateEndpointSection(endpoint, index) {
    const methodBadge = endpoint.method.toLowerCase();
    const endpointId = `${endpoint.method.toLowerCase()}-${endpoint.path.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;

    return `      <section id="${endpointId}" class="endpoint-section">
        <div class="endpoint-layout">
          <div class="endpoint-docs">
            <div class="method-header">
              <span class="method-badge ${methodBadge}">${endpoint.method.toUpperCase()}</span>
              <span class="endpoint-path">${endpoint.path}</span>
            </div>

            <div class="endpoint-info">
              <h3 class="endpoint-title">📋 ${endpoint.title}</h3>
              <p class="endpoint-description">${endpoint.description}</p>
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

            ${endpoint.parameters.length > 0 ? `<div class="api-section">
              <h4 class="section-title">⚙️ Body Parameters</h4>
              <div class="param-list">
                ${endpoint.parameters.map(param => `<div class="param-item ${param.required ? 'required' : ''}">
                  <code class="param-name">${param.name}</code>
                  <span class="param-type">${param.type}</span>
                  <span class="param-desc">${param.description}</span>
                </div>`).join('\n                ')}
              </div>
            </div>` : ''}

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
              ${endpoint.parameters.map(param => this.generateFormField(param, index)).join('\n              ')}
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

  // Generate individual endpoint component
  generateEndpointComponent(parentComponentName, endpoint, index) {
    const methodBadge = endpoint.method.toLowerCase();
    const endpointId = `${endpoint.method.toLowerCase()}-${endpoint.path.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;

    const template = `<template>
  <section id="${endpointId}" class="endpoint-section">
    <div class="endpoint-layout">
      <div class="endpoint-docs">
        <div class="method-header">
          <span class="method-badge ${methodBadge}">${endpoint.method.toUpperCase()}</span>
          <span class="endpoint-path">${endpoint.path}</span>
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

        ${endpoint.parameters.length > 0 ? `<div class="api-section">
          <h4 class="section-title">⚙️ Body Parameters</h4>
          <div class="param-list">
            ${endpoint.parameters.map(param => `<div class="param-item ${param.required ? 'required' : ''}">
              <code class="param-name">${param.name}</code>
              <span class="param-type">${param.type}</span>
              <span class="param-desc">${param.description}</span>
            </div>`).join('\n            ')}
          </div>
        </div>` : ''}

        <div class="api-section">
          <h4 class="section-title">📝 Example Request</h4>
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab = lang"
                :class="['code-tab', { active: activeCodeTab === lang }]">
                {{ lang }}
              </button>
            </div>
            ${this.generateCodeBlocks(endpoint, 1)}
          </div>
        </div>
      </div>

      <div class="endpoint-testing">
        <h4 class="testing-title">🚀 Live Testing</h4>
        <div class="test-section">
          ${endpoint.parameters.map(param => this.generateFormField(param, 1)).join('\n          ')}
          <button @click="testEndpoint" class="test-btn"
            :disabled="!isReadyToSendRequest() || !getRawValues().apiBaseUrl">
            {{ !getRawValues().apiToken ? '🔒 Enter API Token First' : !getRawValues().apiFingerprint ? '🔐 Enter Fingerprint First' : !getRawValues().apiBaseUrl ? '🌐 Enter API URL First' : '🚀 Test Request' }}
          </button>
          <div v-if="result" class="result-container">
            <div class="result-header">
              <span class="status-badge">{{ result.status }}</span>
              <span class="timestamp">{{ result.timestamp }}</span>
              <button @click="copyToClipboard(result.data, $event)" class="copy-btn">📋 Copy Response</button>
            </div>
            <div v-if="result.requestUrl" class="request-info">
              <h5>📤 Actual Request:</h5>
              <pre class="request-data">{{ result.requestUrl }}</pre>
              <h5>📋 Headers:</h5>
              <pre class="request-data">{{ result.headers }}</pre>
              <h5>📦 Body:</h5>
              <pre class="request-data">{{ result.body }}</pre>
            </div>
            <h5>📥 Response:</h5>
            <pre class="result-data">{{ result.data }}</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
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
const activeCodeTab = ref('cURL')

// Test data
${this.generateTestData(endpoint, 1)}

// Result storage
const result = ref(null)

// Test function
${this.generateTestFunction(endpoint, 1).replace('testEndpoint1', 'testEndpoint').replace('endpoint1', 'endpoint').replace('results.endpoint1', 'result.value')}

${this.generateCopyFunctions()}

${this.generateCodeExamples([endpoint]).replace(/activeCodeTab1/g, 'activeCodeTab')}
</script>

<style scoped>
${this.generateStyles()}
</style>`;

    return template;
  }

  generateTestData(endpoint, index) {
    const defaultValues = endpoint.parameters.map(param => {
      if (param.type === 'boolean') return `${param.name}: true`;
      if (param.type === 'integer') return `${param.name}: 123`;
      return `${param.name}: 'example_${param.name}'`;
    }).join(', ');

    return `const testData${index} = reactive({ ${defaultValues} })`;
  }

  generateFormField(param, index) {
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
  }

  generateTestFunction(endpoint, index) {
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
      ${endpoint.parameters.map(param => `${param.name}: testData${index}.${param.name}`).join(',\n      ')}
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
}`
  }

  generateCodeBlocks(endpoint, index) {
    return `
                <div v-show="activeCodeTab${index} === 'cURL'" class="code-block-container">
                  <button @click="copyCodeToClipboard('curl', ${index})" class="copy-code-btn" title="Copy to clipboard">📋</button>
                  <div class="code-block">
                    <pre>curl -X ${endpoint.method.toUpperCase()} &quot;https://develop.okd.finance/api${endpoint.path}&quot; \\
  -H &quot;Authorization: Bearer YOUR_ACCESS_TOKEN&quot; \\
  -H &quot;Content-Type: application/json&quot; \\
  -H &quot;Fingerprint: YOUR_FINGERPRINT&quot; \\
  -d &#x27;{${endpoint.parameters.map(p => `&quot;${p.name}&quot;:&quot;example&quot;`).join(',')}}&#x27;</pre>
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

  generateCodeExamples(endpoints) {
    return `const codeExamples = {
  curl: {
    ${endpoints.map((endpoint, index) => `${index + 1}: \`curl -X ${endpoint.method.toUpperCase()} "https://develop.okd.finance/api${endpoint.path}" \\\\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\\\
  -H "Content-Type: application/json" \\\\
  -H "Fingerprint: YOUR_FINGERPRINT" \\\\
  -d '{${endpoint.parameters.map(p => `"${p.name}":"example"`).join(',')}}'\``).join(',\n    ')}
  },
  go: { ${endpoints.map((_, index) => `${index + 1}: 'Go example'`).join(', ')} },
  typescript: { ${endpoints.map((_, index) => `${index + 1}: 'TypeScript example'`).join(', ')} },
  php: { ${endpoints.map((_, index) => `${index + 1}: 'PHP example'`).join(', ')} },
  python: { ${endpoints.map((_, index) => `${index + 1}: 'Python example'`).join(', ')} }
}`;
  }

  generateStyles() {
    return `/* Fixed Authentication Header */
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

/* Code Examples with Tabs */
.code-examples {
  margin: 1rem 0;
}

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

.code-block {
  background: var(--vp-code-bg);
  color: var(--vp-code-color);
  padding: 1.5rem;
  border-radius: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
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

/* Testing Section */
.testing-title {
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand);
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
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.test-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
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

/* Result Container */
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

.request-info {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.request-info h5 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.request-data {
  background: var(--vp-code-bg);
  color: var(--vp-code-color);
  padding: 1rem;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  line-height: 1.4;
  overflow-x: auto;
  margin: 0.5rem 0;
  border: 1px solid var(--vp-c-border);
  white-space: pre-wrap;
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
}`;
  }
}

// Example usage functions
function generateWalletAPI() {
  const generator = new AutoSwaggerUpdater();
  const endpoints = [
    {
      method: 'GET',
      path: '/wallet/balance',
      title: 'Get Wallet Balance',
      description: 'Retrieve current wallet balance for all currencies',
      parameters: []
    },
    {
      method: 'POST',
      path: '/wallet/transfer',
      title: 'Transfer Funds',
      description: 'Transfer funds between wallets',
      parameters: [
        { name: 'fromWallet', type: 'string', description: 'Source wallet ID' },
        { name: 'toWallet', type: 'string', description: 'Destination wallet ID' },
        { name: 'amount', type: 'number', description: 'Amount to transfer' },
        { name: 'currency', type: 'string', description: 'Currency code' }
      ]
    },
    {
      method: 'GET',
      path: '/wallet/history',
      title: 'Transaction History',
      description: 'Get wallet transaction history',
      parameters: [
        { name: 'limit', type: 'integer', description: 'Number of transactions to return' },
        { name: 'offset', type: 'integer', description: 'Offset for pagination' }
      ]
    }
  ];

  generator.generateAPI('Wallet API', endpoints, 'InteractiveWalletAPI');
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const updater = new AutoSwaggerUpdater();

  try {
    if (args.length === 0 || args[0] === 'help' || args[0] === '--help') {
      console.log(`
🚀 Auto Swagger Updater

Usage:
  node auto-swagger-updater.cjs <command> [options]

Commands:
  update            - Check for updates and regenerate if needed
  force             - Force regenerate all APIs
  reset             - Reset to initial state (removes all generated APIs)
  reset --no-confirm - Reset without confirmation prompt
  check             - Check for updates without regenerating

Examples:
  node auto-swagger-updater.cjs update
  node auto-swagger-updater.cjs force
  node auto-swagger-updater.cjs reset
  node auto-swagger-updater.cjs reset --no-confirm
`);
      return;
    }

    switch (args[0]) {
      case 'update': {
        console.log('🔄 Checking for Swagger updates...');
        await updater.updateAll();
        break;
      }

      case 'force': {
        console.log('🔄 Force regenerating all APIs...');
        const { swaggerData } = await updater.fetchSwaggerDocs();
        await updater.generateAllAPIs(swaggerData);
        break;
      }

      case 'reset': {
        const confirmReset = !args.includes('--no-confirm');
        await updater.reset({ confirmReset });
        break;
      }

      case 'check': {
        const { hasUpdates } = await updater.checkForUpdates();
        console.log(hasUpdates ? '🔄 Updates available' : '✅ No updates needed');
        break;
      }

      default:
        console.error(`❌ Unknown command: ${args[0]}`);
        console.log('Use "help" to see available commands');
        process.exit(1);
    }

  } catch (error) {
    console.error('❌ Operation failed:', error.message);
    process.exit(1);
  }
}

// Export for use as module
module.exports = { AutoSwaggerUpdater, NavigationUpdater };

// Run if called directly
if (require.main === module) {
  main();
}

