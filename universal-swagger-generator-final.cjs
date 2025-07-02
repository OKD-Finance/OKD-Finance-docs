/* eslint-env node */
/* global AbortController, setTimeout, clearTimeout, fetch */
const fs = require('fs');
const crypto = require('crypto');

// Swagger Auto-Loader class
class SwaggerAutoLoader {
  constructor(config = {}) {
    this.config = {
      swaggerUrl: process.env.SWAGGER_URL || config.swaggerUrl || 'https://develop.okd.finance/api/swagger/swagger.json',
      apiBaseUrl: process.env.API_BASE_URL || config.apiBaseUrl || 'https://develop.okd.finance/api',
      timeout: config.timeout || 30000,
      ...config
    };
  }

  // Получение Swagger документации
  async fetchSwaggerDocs() {
    try {
      console.log('📡 Fetching Swagger documentation...');
      console.log(`🔗 URL: ${this.config.swaggerUrl}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.swaggerUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Universal-Swagger-Generator/1.0',
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
          responses: endpoint.responses || {},
          responseExamples: this.extractResponseExamples(endpoint)
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
            type: param.schema?.type || param.type || 'string',
            description: param.description || '',
            required: param.required || false
          });
        }
        // Обработка body параметров из старого формата Swagger 2.0
        else if (param.in === 'body' && param.schema) {
          this.extractBodyParameters(param.schema, parameters);
        }
      });
    }

    // Request body parameters (OpenAPI 3.0)
    if (endpoint.requestBody?.content?.['application/json']?.schema?.properties) {
      const properties = endpoint.requestBody.content['application/json'].schema.properties;
      const requiredFields = endpoint.requestBody.content['application/json'].schema.required || [];

      for (const [name, prop] of Object.entries(properties)) {
        parameters.push({
          name,
          type: prop.type || 'string',
          description: prop.description || '',
          required: requiredFields.includes(name)
        });
      }
    }

    return parameters;
  }

  // Извлечение параметров из body схемы
  extractBodyParameters(schema, parameters) {
    if (schema.properties) {
      // Прямые свойства схемы
      const requiredFields = schema.required || [];
      for (const [name, prop] of Object.entries(schema.properties)) {
        parameters.push({
          name,
          type: prop.type || 'string',
          description: prop.description || `${name} parameter`,
          required: requiredFields.includes(name)
        });
      }
    } else if (schema.additionalProperties && schema.additionalProperties.$ref) {
      // Ссылка на другую схему через $ref
      const refPath = schema.additionalProperties.$ref;
      if (refPath.startsWith('#/definitions/')) {
        const definitionName = refPath.replace('#/definitions/', '');
        // Для примера используем известные параметры для CreateSpotOrderRequest
        if (definitionName === 'CreateSpotOrderRequest') {
          parameters.push(
            {
              name: 'category',
              type: 'string',
              description: 'Trading category (e.g., spot)',
              required: true
            },
            {
              name: 'symbol',
              type: 'string',
              description: 'Trading pair symbol (e.g., BTCUSDT)',
              required: true
            },
            {
              name: 'side',
              type: 'string',
              description: 'Order side (Buy or Sell)',
              required: true
            },
            {
              name: 'orderType',
              type: 'string',
              description: 'Order type (Market or Limit)',
              required: true
            },
            {
              name: 'qty',
              type: 'string',
              description: 'Order quantity',
              required: true
            },
            {
              name: 'price',
              type: 'string',
              description: 'Order price (for limit orders)',
              required: false
            }
          );
        }
      }
    } else if (schema.example) {
      // Извлекаем параметры из примера
      for (const [name, value] of Object.entries(schema.example)) {
        parameters.push({
          name,
          type: typeof value === 'number' ? 'number' : 'string',
          description: `${name} parameter`,
          required: true
        });
      }
    }
  }

  // Извлечение примеров ответов из endpoint'а
  extractResponseExamples(endpoint) {
    const responseExamples = [];

    if (endpoint.responses) {
      for (const [statusCode, response] of Object.entries(endpoint.responses)) {
        const example = {
          statusCode: statusCode,
          description: response.description || '',
          example: null
        };

        // OpenAPI 3.0 формат
        if (response.content?.['application/json']) {
          const jsonContent = response.content['application/json'];

          // Прямой пример
          if (jsonContent.example) {
            example.example = JSON.stringify(jsonContent.example, null, 2);
          }
          // Примеры в examples
          else if (jsonContent.examples) {
            const firstExampleKey = Object.keys(jsonContent.examples)[0];
            if (firstExampleKey && jsonContent.examples[firstExampleKey].value) {
              example.example = JSON.stringify(jsonContent.examples[firstExampleKey].value, null, 2);
            }
          }
          // Генерируем пример из схемы
          else if (jsonContent.schema) {
            example.example = this.generateExampleFromSchema(jsonContent.schema);
          }
        }
        // Swagger 2.0 формат
        else if (response.schema) {
          // Прямой пример в схеме
          if (response.schema.example) {
            example.example = JSON.stringify(response.schema.example, null, 2);
          }
          // Генерируем пример из схемы
          else {
            example.example = this.generateExampleFromSchema(response.schema);
          }
        }

        // Проверяем другие content types
        if (!example.example && response.content) {
          for (const [contentType, content] of Object.entries(response.content)) {
            if (content.example) {
              example.example = typeof content.example === 'string'
                ? content.example
                : JSON.stringify(content.example, null, 2);
              break;
            }
            if (content.examples) {
              const firstExampleKey = Object.keys(content.examples)[0];
              if (firstExampleKey && content.examples[firstExampleKey].value) {
                const exampleValue = content.examples[firstExampleKey].value;
                example.example = typeof exampleValue === 'string'
                  ? exampleValue
                  : JSON.stringify(exampleValue, null, 2);
                break;
              }
            }
            if (content.schema) {
              example.example = this.generateExampleFromSchema(content.schema);
              break;
            }
          }
        }

        // Если нет примера, но есть описание - создаем реалистичный пример
        if (!example.example && response.description) {
          example.example = this.generateRealisticExample(statusCode, response.description);
        }

        responseExamples.push(example);
      }
    }

    // Если нет примеров ответов в Swagger, добавляем стандартные
    if (responseExamples.length === 0) {
      responseExamples.push(
        {
          statusCode: '200',
          description: 'Successful operation',
          example: this.generateRealisticExample('200', 'Successful operation')
        },
        {
          statusCode: '400',
          description: 'Bad request',
          example: this.generateRealisticExample('400', 'Bad request')
        },
        {
          statusCode: '401',
          description: 'Unauthorized',
          example: this.generateRealisticExample('401', 'Unauthorized')
        },
        {
          statusCode: '500',
          description: 'Internal server error',
          example: this.generateRealisticExample('500', 'Internal server error')
        }
      );
    }

    return responseExamples;
  }

  // Генерация реалистичного примера на основе статус кода и описания
  generateRealisticExample(statusCode, description) {
    const code = parseInt(statusCode);

    // Успешные ответы (2xx)
    if (code >= 200 && code < 300) {
      if (description.toLowerCase().includes('operation completed') ||
        description.toLowerCase().includes('success')) {
        return JSON.stringify({
          "success": true,
          "message": "Operation completed successfully",
          "data": {
            "operationId": "op_1234567890",
            "timestamp": "2024-01-01T12:00:00Z",
            "status": "completed"
          }
        }, null, 2);
      }

      if (description.toLowerCase().includes('user') ||
        description.toLowerCase().includes('profile')) {
        return JSON.stringify({
          "success": true,
          "data": {
            "userId": "user_123456",
            "email": "user@example.com",
            "profile": {
              "firstName": "John",
              "lastName": "Doe",
              "createdAt": "2024-01-01T12:00:00Z"
            }
          }
        }, null, 2);
      }

      if (description.toLowerCase().includes('auth') ||
        description.toLowerCase().includes('token')) {
        return JSON.stringify({
          "success": true,
          "data": {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "refreshToken": "rt_1234567890abcdef",
            "expiresIn": 3600,
            "tokenType": "Bearer"
          }
        }, null, 2);
      }

      // Общий успешный ответ
      return JSON.stringify({
        "success": true,
        "message": description,
        "timestamp": "2024-01-01T12:00:00Z"
      }, null, 2);
    }

    // Ошибки клиента (4xx)
    if (code >= 400 && code < 500) {
      if (code === 400) {
        return JSON.stringify({
          "success": false,
          "error": {
            "code": "VALIDATION_ERROR",
            "message": description,
            "details": [
              {
                "field": "email",
                "message": "Invalid email format"
              },
              {
                "field": "password",
                "message": "Password must be at least 8 characters"
              }
            ]
          },
          "timestamp": "2024-01-01T12:00:00Z"
        }, null, 2);
      }

      if (code === 401) {
        return JSON.stringify({
          "success": false,
          "error": {
            "code": "UNAUTHORIZED",
            "message": description,
            "details": "Access token is missing or invalid"
          },
          "timestamp": "2024-01-01T12:00:00Z"
        }, null, 2);
      }

      if (code === 403) {
        return JSON.stringify({
          "success": false,
          "error": {
            "code": "FORBIDDEN",
            "message": description,
            "details": "Insufficient permissions to access this resource"
          },
          "timestamp": "2024-01-01T12:00:00Z"
        }, null, 2);
      }

      if (code === 404) {
        return JSON.stringify({
          "success": false,
          "error": {
            "code": "NOT_FOUND",
            "message": description,
            "details": "The requested resource was not found"
          },
          "timestamp": "2024-01-01T12:00:00Z"
        }, null, 2);
      }

      // Общая ошибка клиента
      return JSON.stringify({
        "success": false,
        "error": {
          "code": "CLIENT_ERROR",
          "message": description
        },
        "timestamp": "2024-01-01T12:00:00Z"
      }, null, 2);
    }

    // Ошибки сервера (5xx)
    if (code >= 500) {
      return JSON.stringify({
        "success": false,
        "error": {
          "code": "INTERNAL_SERVER_ERROR",
          "message": description,
          "details": "An unexpected error occurred on the server",
          "requestId": "req_1234567890"
        },
        "timestamp": "2024-01-01T12:00:00Z"
      }, null, 2);
    }

    // Fallback для других кодов
    return JSON.stringify({
      "message": description,
      "statusCode": code,
      "timestamp": "2024-01-01T12:00:00Z"
    }, null, 2);
  }

  // Генерация примера из JSON схемы
  generateExampleFromSchema(schema) {
    if (!schema) return '{}';

    // Если есть прямой пример в схеме, используем его
    if (schema.example) {
      return JSON.stringify(schema.example, null, 2);
    }

    // Обработка ссылок на определения
    if (schema.$ref) {
      const refPath = schema.$ref;
      if (refPath === '#/definitions/CreateSpotOrderResponse') {
        return JSON.stringify({
          "orderId": "1234567890",
          "orderLinkId": "link_abcdef123456"
        }, null, 2);
      }
      // Можно добавить другие специфичные схемы
    }

    // Обработка массивов с примерами
    if (schema.type === 'array' && schema.example) {
      return JSON.stringify(schema.example, null, 2);
    }

    // Обработка массивов с items.$ref
    if (schema.type === 'array' && schema.items?.$ref) {
      const refPath = schema.items.$ref;
      if (refPath === '#/definitions/CreateSpotOrderResponse') {
        return JSON.stringify({
          "orderId": "1234567890",
          "orderLinkId": "link_abcdef123456"
        }, null, 2);
      }
    }

    const generateValue = (prop) => {
      // Обработка $ref ссылок
      if (prop.$ref) {
        const refPath = prop.$ref;
        if (refPath === '#/definitions/CreateSpotOrderResponse') {
          return {
            "orderId": "1234567890",
            "orderLinkId": "link_abcdef123456"
          };
        }
        return {};
      }

      switch (prop.type) {
        case 'string':
          if (prop.format === 'date-time') return '"2024-01-01T12:00:00Z"';
          if (prop.format === 'date') return '"2024-01-01"';
          if (prop.format === 'email') return '"user@example.com"';
          if (prop.enum) return `"${prop.enum[0]}"`;
          return `"${prop.example || 'string_value'}"`;
        case 'integer':
        case 'number':
          return prop.example || 123;
        case 'boolean':
          return prop.example !== undefined ? prop.example : true;
        case 'array':
          if (prop.items) {
            return `[${generateValue(prop.items)}]`;
          }
          return '[]';
        case 'object':
          if (prop.properties) {
            const objProps = [];
            for (const [key, value] of Object.entries(prop.properties)) {
              objProps.push(`  "${key}": ${generateValue(value)}`);
            }
            return `{\n${objProps.join(',\n')}\n}`;
          }
          return '{}';
        default:
          return prop.example ? JSON.stringify(prop.example) : 'null';
      }
    };

    try {
      if (schema.type === 'object' && schema.properties) {
        const props = [];
        for (const [key, prop] of Object.entries(schema.properties)) {
          props.push(`  "${key}": ${generateValue(prop)}`);
        }
        return `{\n${props.join(',\n')}\n}`;
      } else if (schema.type === 'array' && schema.items) {
        return `[${generateValue(schema.items)}]`;
      } else {
        return JSON.stringify(generateValue(schema), null, 2);
      }
    } catch (error) {
      console.warn('Error generating example from schema:', error);
      return '{}';
    }
  }

  // Генерация всех API из Swagger
  async generateAllAPIsFromSwagger() {
    try {
      const { swaggerData } = await this.fetchSwaggerDocs();
      const apiGroups = this.groupEndpointsByTags(swaggerData);
      const generator = new UniversalAPIGenerator();

      console.log(`\n🔥 Found ${Object.keys(apiGroups).length} API groups in Swagger:\n`);

      for (const [tagName, endpoints] of Object.entries(apiGroups)) {
        console.log(`📋 ${tagName}: ${endpoints.length} endpoints`);
      }

      console.log('\n🚀 Starting generation...\n');

      for (const [tagName, endpoints] of Object.entries(apiGroups)) {
        try {
          console.log(`\n--- Generating ${tagName.toUpperCase()} API ---`);

          const apiName = `${tagName} API`;
          const componentName = `Interactive${tagName.replace(/[^a-zA-Z0-9]/g, '')}API`;

          generator.generateAPI(apiName, endpoints, componentName);

          console.log(`✅ ${tagName} API generated successfully!`);

        } catch (error) {
          console.error(`❌ Failed to generate ${tagName} API:`, error.message);
        }
      }

      console.log('\n🎉 All APIs generated from Swagger successfully!');
      return { success: true, apisGenerated: Object.keys(apiGroups).length };

    } catch (error) {
      console.error('❌ Failed to generate APIs from Swagger:', error.message);
      throw error;
    }
  }
}

// Navigation updater class
class NavigationUpdater {
  constructor(configPath = 'docs/.vitepress/config.ts') {
    this.configPath = configPath;
  }

  addApiToNavigation(apiName, apiLink, subItems = []) {
    try {
      let configContent = fs.readFileSync(this.configPath, 'utf8');

      // Find the API Reference section
      const apiSectionRegex = /(\s+text: 'API Reference',\s+items: \[\s*)([\s\S]*?)(\s+\]\s+\})/;
      const match = configContent.match(apiSectionRegex);

      if (!match) {
        console.log('❌ Could not find API Reference section in config');
        return false;
      }

      const [, beforeItems, itemsContent, afterItems] = match;

      // Remove existing entries for this API to prevent duplicates
      const existingPatterns = [
        new RegExp(`\\s*\\{[^}]*text:\\s*'${apiName}'[^}]*\\}[,]?\\s*`, 'g'),
        new RegExp(`\\s*\\{[^}]*text:\\s*'${apiName.replace(' API', '')}'[^}]*\\}[,]?\\s*`, 'g'),
        new RegExp(`\\s*\\{[^}]*text:\\s*'${apiName.replace(' API', '')} API'[^}]*\\}[,]?\\s*`, 'g'),
        new RegExp(`\\s*\\{[^}]*'text':\\s*'${apiName}'[^}]*\\}[,]?\\s*`, 'g'),
        new RegExp(`\\s*\\{[^}]*'text':\\s*'${apiName.replace(' API', '')}'[^}]*\\}[,]?\\s*`, 'g'),
        new RegExp(`\\s*\\{[^}]*'text':\\s*'${apiName.replace(' API', '')} API'[^}]*\\}[,]?\\s*`, 'g')
      ];

      let cleanedItemsContent = itemsContent;
      existingPatterns.forEach(pattern => {
        cleanedItemsContent = cleanedItemsContent.replace(pattern, '');
      });

      // Create new API entry
      let newApiEntry;
      if (subItems.length > 0) {
        const subItemsStr = subItems.map(item =>
          `                                { text: '${item.text}', link: '${item.link}' }`
        ).join(',\n');

        newApiEntry = `                        {
                            text: '${apiName}',
                            link: '${apiLink}',
                            collapsed: true,
                            items: [
${subItemsStr}
                            ]
                        },`;
      } else {
        newApiEntry = `                        {
                            text: '${apiName}',
                            link: '${apiLink}'
                        },`;
      }

      // Insert after Overview but before other APIs
      let updatedItemsContent = cleanedItemsContent;
      const overviewIndex = cleanedItemsContent.indexOf("text: 'Overview'");
      const overviewIndexOld = cleanedItemsContent.indexOf("'text': 'Overview'");

      if (overviewIndex !== -1 || overviewIndexOld !== -1) {
        // Find the end of Overview entry
        const useIndex = overviewIndex !== -1 ? overviewIndex : overviewIndexOld;
        const overviewEnd = cleanedItemsContent.indexOf('},', useIndex) + 2;
        const beforeOverviewEnd = cleanedItemsContent.substring(0, overviewEnd);
        const afterOverviewEnd = cleanedItemsContent.substring(overviewEnd);

        updatedItemsContent = beforeOverviewEnd + '\n' + newApiEntry + afterOverviewEnd;
      } else {
        // If no Overview, add at the beginning
        updatedItemsContent = newApiEntry + '\n' + cleanedItemsContent;
      }

      // Replace the content
      const newConfigContent = configContent.replace(
        apiSectionRegex,
        beforeItems + updatedItemsContent + afterItems
      );

      fs.writeFileSync(this.configPath, newConfigContent, 'utf8');
      console.log(`✅ Added ${apiName} to navigation (removed duplicates)`);

      // Автоматическая валидация и исправление навигации
      try {
        const { NavigationValidator } = require('./navigation-validator.cjs');
        const validator = new NavigationValidator(this.configPath);

        console.log('\n🔧 Running automatic navigation validation...');
        const wasFixed = validator.fixNavigation();

        if (wasFixed) {
          console.log('✅ Navigation automatically fixed!');
        }
      } catch (validationError) {
        console.log('⚠️ Navigation validation skipped:', validationError.message);
      }

      return true;

    } catch (error) {
      console.error('❌ Error updating navigation:', error.message);
      return false;
    }
  }
}

// Universal API Generator
class UniversalAPIGenerator {
  constructor() {
    this.navUpdater = new NavigationUpdater();
  }

  // Generate Vue component for any API
  generateVueComponent(apiName, endpoints) {
    const template = `<template>
  <!-- Fixed Authentication Header -->
  <div class="auth-header-fixed" :class="{ 'collapsed': isHeaderCollapsed }">
    <div class="auth-container">
      <div class="auth-title">
        <h4>🔐 API Auth</h4>
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

${this.generateMultipleCodeExamples(endpoints)}
</script>

<style scoped>
${this.generateStyles()}
</style>`;

    return template;
  }

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
                ${endpoint.parameters.map(param => `<div class="param-item required">
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

  generateTestData(endpoint, index) {
    const defaultValues = endpoint.parameters.map(param => {
      if (param.type === 'boolean') return `${param.name}: true`;
      if (param.type === 'integer') return `${param.name}: 123`;
      return `${param.name}: 'example_${param.name}'`;
    }).join(', ');

    return `const testData${index} = reactive({ ${defaultValues} })`;
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
}`;
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

  generateMultipleCodeExamples(endpoints) {
    return `const codeExamples = {
  curl: {
    ${endpoints.map((endpoint, index) => `${index + 1}: \`curl -X ${endpoint.method.toUpperCase()} "https://develop.okd.finance/api${endpoint.path}" \\\\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\\\
  -H "Content-Type: application/json" \\\\
  -H "Fingerprint: YOUR_FINGERPRINT" \\\\
  -d '{${endpoint.parameters.map(p => `"${p.name}":"example"`).join(',')}}'\``).join(',\n    ')}
  },
  go: {
    ${endpoints.map((endpoint, index) => {
      const structName = endpoint.title.replace(/[^a-zA-Z0-9]/g, '');
      const params = endpoint.parameters.map(p => `    ${p.name.charAt(0).toUpperCase() + p.name.slice(1)} string \\\`json:"${p.name}"\\\``).join('\\n');
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

func ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}() error {
    url := "https://develop.okd.finance/api${endpoint.path}"
    
    requestData := ${structName}Request{
${endpoint.parameters.map(p => `        ${p.name.charAt(0).toUpperCase() + p.name.slice(1)}: "example",`).join('\\n')}
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
    if err := ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(); err != nil {
        fmt.Printf("Error: %v\\\\n", err)
    }
}\``;
    }).join(',\n    ')}
  },
  typescript: {
    ${endpoints.map((endpoint, index) => {
      const interfaceName = endpoint.title.replace(/[^a-zA-Z0-9]/g, '') + 'Request';
      const params = endpoint.parameters.map(p => `  ${p.name}: ${p.type === 'boolean' ? 'boolean' : 'string'};`).join('\\n');
      const method = endpoint.method.toUpperCase();

      return `${index + 1}: \`interface ${interfaceName} {
${params}
}

async function ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
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
    const result = await ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      {
${endpoint.parameters.map(p => `        ${p.name}: ${p.type === 'boolean' ? 'true' : '"example"'},`).join('\\n')}
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

function ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '${endpoint.path}';
    
          $headers = [
          'Authorization: Bearer ' . $accessToken,
          'Content-Type: application/json',
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
${endpoint.parameters.map(p => `        '${p.name}' => ${p.type === 'boolean' ? 'true' : "'example'"},`).join('\\n')}
    ];

    $result = ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
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


def ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
    base_url: str,
    access_token: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:
    """${endpoint.description}"""
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
${endpoint.parameters.map(p => `        '${p.name}': ${p.type === 'boolean' ? 'True' : "'example'"},`).join('\\n')}
    }
    
    try:
        result = ${endpoint.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}(
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

  generateStyles() {
    return `/* Modern Bybit-style API Explorer Design */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

:root {
  --bybit-primary: #f7931a;
  --bybit-primary-dark: #e8851a;
  --bybit-secondary: #1a1a1a;
  --bybit-accent: #00d4ff;
  --bybit-success: #00c851;
  --bybit-error: #ff4444;
  --bybit-warning: #ffbb33;
  --bybit-bg: #ffffff;
  --bybit-bg-secondary: #f8f9fa;
  --bybit-bg-tertiary: #f1f3f4;
  --bybit-text-primary: #212529;
  --bybit-text-secondary: #6c757d;
  --bybit-text-muted: #adb5bd;
  --bybit-border: #e9ecef;
  --bybit-border-light: #f8f9fa;
  --bybit-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --bybit-shadow-lg: 0 4px 20px rgba(0, 0, 0, 0.15);
  --bybit-radius: 8px;
  --bybit-radius-lg: 12px;
}

.dark {
  --bybit-bg: #1a1a1a;
  --bybit-bg-secondary: #2d2d2d;
  --bybit-bg-tertiary: #3a3a3a;
  --bybit-text-primary: #ffffff;
  --bybit-text-secondary: #b0b0b0;
  --bybit-text-muted: #808080;
  --bybit-border: #404040;
  --bybit-border-light: #2d2d2d;
  --bybit-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  --bybit-shadow-lg: 0 4px 20px rgba(0, 0, 0, 0.4);
}

/* ===== MAIN LAYOUT ===== */
.interactive-api-container {
  margin: 2rem 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* ===== ENDPOINT SECTIONS ===== */
.endpoint-section {
  background: var(--bybit-bg);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius-lg);
  box-shadow: var(--bybit-shadow);
  overflow: hidden;
  transition: all 0.3s ease;
}

.endpoint-section:hover {
  box-shadow: var(--bybit-shadow-lg);
  transform: translateY(-2px);
}

.endpoint-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 0;
  min-height: 100%;
}

.endpoint-docs {
  padding: 2rem;
  background: var(--bybit-bg);
}

.endpoint-testing {
  width: 400px;
  background: var(--bybit-bg-secondary);
  border-left: 1px solid var(--bybit-border);
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

/* ===== METHOD HEADER ===== */
.method-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--bybit-border);
}

.method-badge {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 2px solid;
  font-family: 'JetBrains Mono', monospace;
  min-width: 60px;
  text-align: center;
}

.method-badge.get {
  background: #e3f2fd;
  color: #1976d2;
  border-color: #1976d2;
}

.method-badge.post {
  background: #e8f5e8;
  color: #2e7d32;
  border-color: #2e7d32;
}

.method-badge.put {
  background: #fff3e0;
  color: #f57c00;
  border-color: #f57c00;
}

.method-badge.patch {
  background: #f3e5f5;
  color: #7b1fa2;
  border-color: #7b1fa2;
}

.method-badge.delete {
  background: #ffebee;
  color: #c62828;
  border-color: #c62828;
}

.endpoint-path {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--bybit-text-primary);
  background: var(--bybit-bg-tertiary);
  padding: 0.5rem 1rem;
  border-radius: var(--bybit-radius);
}

/* ===== ENDPOINT INFO ===== */
.endpoint-info {
  margin-bottom: 2rem;
}

.endpoint-title {
  color: var(--bybit-primary);
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.endpoint-description {
  color: var(--bybit-text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* ===== API SECTIONS ===== */
.api-section {
  margin-bottom: 2rem;
}

.section-title {
  color: var(--bybit-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ===== PARAMETERS ===== */
.param-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.param-item {
  padding: 1rem;
  background: var(--bybit-bg-secondary);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  border-left: 4px solid var(--bybit-primary);
}

.param-item.required {
  border-left-color: var(--bybit-error);
}

.param-name {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  color: var(--bybit-primary);
  background: var(--bybit-bg-tertiary);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.param-type {
  font-family: 'JetBrains Mono', monospace;
  color: var(--bybit-text-secondary);
  font-size: 0.875rem;
  margin-right: 0.5rem;
}

.param-desc {
  color: var(--bybit-text-primary);
  font-size: 0.9rem;
  display: block;
  margin-top: 0.5rem;
}

/* ===== CODE EXAMPLES ===== */
.code-examples {
  background: var(--bybit-bg-tertiary);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  overflow: hidden;
}

.code-tabs {
  display: flex;
  background: var(--bybit-bg-secondary);
  border-bottom: 1px solid var(--bybit-border);
  overflow-x: auto;
}

.code-tab {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  color: var(--bybit-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  border-bottom: 3px solid transparent;
}

.code-tab:hover {
  background: var(--bybit-bg-tertiary);
  color: var(--bybit-text-primary);
}

.code-tab.active {
  color: var(--bybit-primary);
  border-bottom-color: var(--bybit-primary);
  background: var(--bybit-bg);
}

.code-block {
  position: relative;
}

.code-block pre {
  margin: 0;
  padding: 2rem;
  font-family: 'JetBrains Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--bybit-text-primary);
  overflow-x: auto;
  background: var(--bybit-bg);
}

/* ===== LIVE TESTING ===== */
.testing-title {
  color: var(--bybit-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.test-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
}

.test-section .param-item {
  margin-bottom: 1rem;
}

.test-section .param-item label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--bybit-text-primary);
  margin-bottom: 0.5rem;
  display: block;
}

.test-section .param-item input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  background: var(--bybit-bg);
  color: var(--bybit-text-primary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.test-section .param-item input:focus {
  outline: none;
  border-color: var(--bybit-primary);
  box-shadow: 0 0 0 3px rgba(247, 147, 26, 0.1);
}

.test-btn {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, var(--bybit-primary), var(--bybit-primary-dark));
  color: white;
  border: none;
  border-radius: var(--bybit-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: auto;
}

.test-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--bybit-shadow-lg);
}

.test-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  background: var(--bybit-bg-secondary);
  color: var(--bybit-text-muted);
}

/* ===== RESULTS ===== */
.result-container {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: var(--bybit-radius);
  background: var(--bybit-bg-tertiary);
  border: 1px solid var(--bybit-border);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status-badge {
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: var(--bybit-success);
  color: white;
}

.timestamp {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--bybit-text-secondary);
}

.copy-btn {
  padding: 0.375rem 0.75rem;
  background: var(--bybit-bg-secondary);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  color: var(--bybit-text-secondary);
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: var(--bybit-primary);
  color: white;
  border-color: var(--bybit-primary);
}

.request-info,
.result-data {
  margin-top: 1rem;
}

.request-info h5 {
  color: var(--bybit-text-primary);
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
}

.request-data,
.result-data {
  font-family: 'JetBrains Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.875rem;
  background: var(--bybit-bg);
  padding: 1rem;
  border-radius: var(--bybit-radius);
  border: 1px solid var(--bybit-border);
  overflow-x: auto;
  white-space: pre-wrap;
  color: var(--bybit-text-primary);
  margin: 0;
}

/* ===== AUTHENTICATION HEADER ===== */
.auth-header-fixed {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--bybit-bg);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius-lg);
  margin-bottom: 2rem;
  box-shadow: var(--bybit-shadow-lg);
  transition: all 0.3s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.auth-header-fixed.collapsed {
  box-shadow: var(--bybit-shadow);
}

.auth-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

.auth-header-fixed.collapsed .auth-container {
  padding: 1rem 1.5rem;
}

.auth-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.auth-title h4 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--bybit-text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.collapse-toggle {
  background: var(--bybit-bg-secondary);
  border: 1px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--bybit-text-secondary);
  transition: all 0.2s ease;
}

.collapse-toggle:hover {
  background: var(--bybit-primary);
  color: white;
  border-color: var(--bybit-primary);
  transform: translateY(-1px);
}

.api-config-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.auth-header-fixed.collapsed .api-config-row,
.auth-header-fixed.collapsed .status-row,
.auth-header-fixed.collapsed .token-hint {
  max-height: 0;
  opacity: 0;
  margin: 0;
  overflow: hidden;
}

.config-group {
  display: flex;
  flex-direction: column;
}

.config-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--bybit-text-primary);
  margin-bottom: 0.5rem;
}

.config-input,
.token-input {
  padding: 0.75rem 1rem;
  border: 2px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  font-family: 'JetBrains Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.875rem;
  background: var(--bybit-bg);
  color: var(--bybit-text-primary);
  transition: all 0.2s ease;
}

.config-input:focus,
.token-input:focus {
  outline: none;
  border-color: var(--bybit-primary);
  box-shadow: 0 0 0 3px rgba(247, 147, 26, 0.1);
}

.token-input-group {
  display: flex;
  gap: 0.5rem;
}

.token-input {
  flex: 1;
}

.token-toggle {
  padding: 0.75rem 1rem;
  border: 2px solid var(--bybit-border);
  border-radius: var(--bybit-radius);
  background: var(--bybit-bg-secondary);
  color: var(--bybit-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.token-toggle:hover {
  background: var(--bybit-primary);
  color: white;
  border-color: var(--bybit-primary);
}

.status-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.url-status,
.token-status,
.fingerprint-status {
  padding: 0.375rem 0.75rem;
  border-radius: var(--bybit-radius);
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--bybit-bg-secondary);
  color: var(--bybit-text-secondary);
  border: 1px solid var(--bybit-border);
  font-family: 'JetBrains Mono', monospace;
}

.clear-auth-btn {
  padding: 0.375rem 0.75rem;
  background: var(--bybit-error);
  color: white;
  border: none;
  border-radius: var(--bybit-radius);
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.clear-auth-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--bybit-shadow);
}

.token-hint {
  font-size: 0.875rem;
  color: var(--bybit-text-muted);
  text-align: center;
  margin: 0;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
  .endpoint-layout {
    grid-template-columns: 1fr;
  }
  
  .endpoint-testing {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--bybit-border);
  }
  
  .api-config-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .endpoint-docs,
  .endpoint-testing {
    padding: 1.5rem;
  }
  
  .method-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .code-tabs {
    flex-wrap: wrap;
  }
  
  .code-tab {
    flex: 1;
    min-width: 80px;
  }
  
  .auth-container {
    padding: 1rem;
  }
  
  .status-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

/* ===== UTILITY CLASSES ===== */
.bybit-transition {
  transition: all 0.2s ease;
}

.bybit-text-mono {
  font-family: 'JetBrains Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
}

/* ===== CUSTOM SCROLLBAR ===== */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bybit-bg-secondary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--bybit-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--bybit-primary-dark);
}`;
  }

  // Main generation method
  generateAPI(apiName, endpoints, componentName) {
    // Generate individual endpoint components ONLY (no main component)
    endpoints.forEach((endpoint, index) => {
      const endpointComponentName = `${componentName}Endpoint${index + 1}`;
      const endpointComponent = this.generateSingleEndpointComponent(endpoint, index + 1, endpointComponentName);
      const endpointPath = `docs/.vitepress/theme/components/${endpointComponentName}.vue`;
      fs.writeFileSync(endpointPath, endpointComponent, 'utf8');
      console.log(`✅ Generated ${endpointPath}`);
    });

    // Generate markdown page (only one file)
    const apiNameLower = apiName.toLowerCase().replace(/\s+/g, '-').replace(/-api$/, '');
    const fileName = apiNameLower === 'user' ? 'users' : apiNameLower;

    // Функция для экранирования текста для JavaScript
    const escapeForJS = (text) => {
      return text
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, ' ')
        .replace(/\r/g, '')
        .replace(/\t/g, ' ')
        .trim();
    };

    // Функция для создания якоря
    const createAnchor = (text) => {
      return text.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    const markdownPage = `---
layout: page
---

# ${apiName}

<GlobalAuth />

${endpoints.map((endpoint, index) => `## ${endpoint.title}
${endpoint.description}

<${componentName}Endpoint${index + 1} />`).join('\n\n')}

<script setup>
${endpoints.map((_, index) => `import ${componentName}Endpoint${index + 1} from '../.vitepress/theme/components/${componentName}Endpoint${index + 1}.vue'`).join('\n')}
import GlobalAuth from '../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
${endpoints.map(endpoint => `  { text: '${escapeForJS(endpoint.title)}', anchor: '#${createAnchor(endpoint.title)}' }`).join(',\n')}
]" />
`;

    // Create only one file with the correct name
    fs.writeFileSync(`docs/api/${fileName}.md`, markdownPage, 'utf8');
    console.log(`✅ Generated ${fileName}.md page`);

    // Update navigation
    const subItems = endpoints.map((endpoint, index) => ({
      text: `${endpoint.method.toUpperCase()} ${endpoint.path}`,
      link: `/api/${fileName}#endpoint-${index + 1}`
    }));

    this.navUpdater.addApiToNavigation(apiName, `/api/${fileName}`, subItems);

    console.log(`🎉 ${apiName} generation completed!`);
  }

  // Generate code examples for all languages
  generateCodeExamples(endpoint) {
    const baseUrl = 'https://develop.okd.finance/api';
    const hasBody = endpoint.parameters && endpoint.parameters.length > 0;
    const bodyParams = (endpoint.parameters || []).map(p => `"${p.name}": "example_${p.name}"`).join(',\n    ');

    // Функция для экранирования HTML в примерах кода
    const escapeHtml = (code) => {
      return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };

    return {
      cURL: escapeHtml(`curl -X ${(endpoint.method || 'GET').toUpperCase()} "${baseUrl}${endpoint.path}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Fingerprint: YOUR_FINGERPRINT"${hasBody ? ` \\
  -d '{
    ${bodyParams}
  }'` : ''}`),

      Go: escapeHtml(`package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    url := "${baseUrl}${endpoint.path}"
    
    ${hasBody ? `payload := map[string]interface{}{
        ${(endpoint.parameters || []).map(p => `"${p.name}": "example_${p.name}",`).join('\n        ')}
    }
    
    jsonData, _ := json.Marshal(payload)
    req, _ := http.NewRequest("${(endpoint.method || 'GET').toUpperCase()}", url, bytes.NewBuffer(jsonData))` : `req, _ := http.NewRequest("${(endpoint.method || 'GET').toUpperCase()}", url, nil)`}
    
    req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Fingerprint", "YOUR_FINGERPRINT")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    defer resp.Body.Close()
    
    fmt.Printf("Status: %s\\n", resp.Status)
}`),

      TypeScript: escapeHtml(`import axios from 'axios';

const apiClient = axios.create({
  baseURL: '${baseUrl}',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
    'Fingerprint': 'YOUR_FINGERPRINT'
  }
});

async function ${(endpoint.path || '').replace(/[^a-zA-Z0-9]/g, '') || 'api'}Request() {
  try {
    ${hasBody ? `const data = {
      ${(endpoint.parameters || []).map(p => `${p.name}: 'example_${p.name}',`).join('\n      ')}
    };
    
    const response = await apiClient.${(endpoint.method || 'get').toLowerCase()}('${endpoint.path}', data);` : `const response = await apiClient.${(endpoint.method || 'get').toLowerCase()}('${endpoint.path}');`}
    
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
}

// Usage
${(endpoint.path || '').replace(/[^a-zA-Z0-9]/g, '') || 'api'}Request();`),

      PHP: escapeHtml(`<?php

$url = '${baseUrl}${endpoint.path}';
$headers = [
    'Authorization: Bearer YOUR_ACCESS_TOKEN',
    'Content-Type: application/json',
    'Fingerprint: YOUR_FINGERPRINT'
];

${hasBody ? `$data = [
    ${(endpoint.parameters || []).map(p => `'${p.name}' => 'example_${p.name}',`).join('\n    ')}
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${(endpoint.method || 'GET').toUpperCase()}');
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));` : `$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${(endpoint.method || 'GET').toUpperCase()}');`}
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo "cURL Error: " . $error;
} else {
    echo "HTTP Code: " . $httpCode . "\\n";
    echo "Response: " . $response . "\\n";
}

?>`),

      Python: escapeHtml(`import requests
import json

url = '${baseUrl}${endpoint.path}'
headers = {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
    'Fingerprint': 'YOUR_FINGERPRINT'
}

${hasBody ? `data = {
    ${(endpoint.parameters || []).map(p => `'${p.name}': 'example_${p.name}',`).join('\n    ')}
}

try:
    response = requests.${(endpoint.method || 'get').toLowerCase()}(url, headers=headers, json=data)` : `try:
    response = requests.${(endpoint.method || 'get').toLowerCase()}(url, headers=headers)`}
    response.raise_for_status()
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
    if hasattr(e, 'response') and e.response is not None:
        print(f"Response: {e.response.text}")
`)
    };
  }

  // Generate single endpoint component
  generateSingleEndpointComponent(endpoint, index, componentName) {
    const codeExamples = this.generateCodeExamples(endpoint);

    return `<template>
  <div class="single-endpoint">
    <div class="endpoint-layout">
      <div class="endpoint-docs">
        <div class="method-header">
          <span class="method-badge ${(endpoint.method || 'get').toLowerCase()}">${(endpoint.method || 'GET').toUpperCase()}</span>
          <span class="endpoint-path">${endpoint.path || ''}</span>
        </div>

        <div class="endpoint-info">
          <p class="endpoint-description">${endpoint.description || ''}</p>
        </div>

        <div class="api-section" v-if="hasParameters">
          <h4 class="section-title">⚙️ Parameters</h4>
          <div class="param-list">
            ${(endpoint.parameters || []).map(param => `<div class="param-item required">
              <code class="param-name">${param.name}</code>
              <span class="param-type">${param.type}</span>
              <span class="param-desc">${param.description}</span>
            </div>`).join('\n            ')}
          </div>
        </div>

        <div class="api-section">
          <h4 class="section-title">📝 Example Request</h4>
          <div class="code-examples">
            <div class="code-tabs">
              <button v-for="lang in codeLangs" :key="lang" @click="activeCodeTab = lang"
                :class="['code-tab', { active: activeCodeTab === lang }]">
                {{ lang }}
              </button>
            </div>
                        ${Object.entries(codeExamples).map(([lang, code]) =>
      `<div v-show="activeCodeTab === '${lang}'" class="code-block">
              <pre>${code}</pre>
            </div>`
    ).join('\n            ')}
          </div>
        </div>

        ${endpoint.responseExamples && endpoint.responseExamples.length > 0 ? `<div class="api-section">
          <h4 class="section-title">📋 Response Examples</h4>
          <div class="response-examples">
            ${endpoint.responseExamples.map(example => `<div class="response-example">
              <div class="response-header">
                <span class="response-status ${example.statusCode.startsWith('2') ? 'success' : 'error'}">${example.statusCode}</span>
                <span class="response-description">${example.description}</span>
              </div>
              ${example.example ? `<div class="code-block">
                <pre>${example.example.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')}</pre>
              </div>` : ''}
            </div>`).join('\n            ')}
          </div>
        </div>` : ''}
      </div>

      <div class="endpoint-testing">
        <h4 class="testing-title">🚀 Live Testing</h4>
        <div class="test-section">
          ${(endpoint.parameters || []).map(param => this.generateFormField(param, '')).join('\n          ')}
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

const codeLangs = ['cURL', 'Go', 'TypeScript', 'PHP', 'Python']
const activeCodeTab = ref('cURL')

const hasParameters = ${(endpoint.parameters || []).length > 0}

const testData = reactive({
  ${(endpoint.parameters || []).map(param => {
      if (param.type === 'boolean') return `${param.name}: true`;
      if (param.type === 'integer') return `${param.name}: 123`;
      return `${param.name}: 'example_${param.name}'`;
    }).join(',\n  ')}
})

const result = ref(null)

const testEndpoint = async () => {
  try {
    const authValues = getRawValues()
    
    if (!isReadyToSendRequest()) {
      result.value = {
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
      ${(endpoint.parameters || []).map(param => `${param.name}: testData.${param.name}`).join(',\n      ')}
    }

    const fullUrl = \`\${authValues.apiBaseUrl}${endpoint.path}\`
    const headers = {
      'Authorization': \`Bearer \${authValues.apiToken}\`,
      'Content-Type': 'application/json',
      'Fingerprint': authValues.apiFingerprint
    }
    const bodyString = JSON.stringify(requestBody)

    const response = await fetch(fullUrl, {
      method: '${(endpoint.method || 'GET').toUpperCase()}',
      headers: headers,
      body: bodyString
    })

    const data = await response.text()
    result.value = {
      status: \`\${response.status} \${response.statusText}\`,
      data: data,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: \`${(endpoint.method || 'GET').toUpperCase()} \${fullUrl}\`,
      headers: JSON.stringify(headers, null, 2),
      body: bodyString
    }
  } catch (error) {
    result.value = {
      status: 'Network Error',
      data: error.message,
      timestamp: new Date().toLocaleTimeString(),
      requestUrl: 'Request failed',
      headers: 'N/A',
      body: 'N/A'
    }
  }
}

const copyToClipboard = (text, event) => {
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
</script>

<style scoped>
${this.generateStyles()}
</style>`;
  }
}

// Example usage functions
function generateWalletAPI() {
  const generator = new UniversalAPIGenerator();
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

// Export for use
module.exports = { UniversalAPIGenerator, NavigationUpdater, SwaggerAutoLoader, generateWalletAPI };

// Predefined API configurations
const API_CONFIGS = {
  user: {
    name: 'User API',
    componentName: 'InteractiveUserAPI',
    endpoints: [
      {
        method: 'PUT',
        path: '/user/flags',
        title: 'Set Profile Flags',
        description: 'Update user profile flags and preferences',
        parameters: [
          { name: 'notifications', type: 'boolean', description: 'Enable/disable notifications', required: false },
          { name: 'marketing', type: 'boolean', description: 'Enable/disable marketing emails', required: false },
          { name: 'privacy', type: 'string', description: 'Privacy level (public/private)', required: false }
        ]
      },
      {
        method: 'PATCH',
        path: '/user/notifications',
        title: 'Subscribe to Notifications',
        description: 'Subscribe or unsubscribe from various notification types',
        parameters: [
          { name: 'email', type: 'boolean', description: 'Email notifications', required: false },
          { name: 'push', type: 'boolean', description: 'Push notifications', required: false },
          { name: 'sms', type: 'boolean', description: 'SMS notifications', required: false }
        ]
      },
      {
        method: 'PATCH',
        path: '/user/profile',
        title: 'Subscribe to Profile Events',
        description: 'Subscribe to profile-related events and updates',
        parameters: [
          { name: 'profileUpdates', type: 'boolean', description: 'Profile update notifications', required: false },
          { name: 'securityAlerts', type: 'boolean', description: 'Security alert notifications', required: false }
        ]
      }
    ]
  },

  wallet: {
    name: 'Wallet API',
    componentName: 'InteractiveWalletAPI',
    endpoints: [
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
          { name: 'fromWallet', type: 'string', description: 'Source wallet ID', required: true },
          { name: 'toWallet', type: 'string', description: 'Destination wallet ID', required: true },
          { name: 'amount', type: 'number', description: 'Amount to transfer', required: true },
          { name: 'currency', type: 'string', description: 'Currency code', required: true }
        ]
      },
      {
        method: 'GET',
        path: '/wallet/history',
        title: 'Transaction History',
        description: 'Get wallet transaction history',
        parameters: [
          { name: 'limit', type: 'integer', description: 'Number of transactions to return', required: false },
          { name: 'offset', type: 'integer', description: 'Offset for pagination', required: false }
        ]
      }
    ]
  },

  auth: {
    name: 'Authentication API',
    componentName: 'InteractiveAuthAPI',
    endpoints: [
      {
        method: 'POST',
        path: '/auth/login',
        title: 'User Login',
        description: 'Authenticate user with email and password',
        parameters: [
          { name: 'email', type: 'string', description: 'User email address', required: true },
          { name: 'password', type: 'string', description: 'User password', required: true }
        ]
      },
      {
        method: 'POST',
        path: '/auth/register',
        title: 'User Registration',
        description: 'Register a new user account',
        parameters: [
          { name: 'email', type: 'string', description: 'User email address', required: true },
          { name: 'password', type: 'string', description: 'User password', required: true },
          { name: 'firstName', type: 'string', description: 'First name', required: true },
          { name: 'lastName', type: 'string', description: 'Last name', required: true }
        ]
      },
      {
        method: 'POST',
        path: '/auth/logout',
        title: 'User Logout',
        description: 'Logout current user session',
        parameters: []
      }
    ]
  },

  trading: {
    name: 'Trading API',
    componentName: 'InteractiveTradingAPI',
    endpoints: [
      {
        method: 'POST',
        path: '/spot/order',
        title: 'Place Spot Order',
        description: 'Place a new spot trading order',
        parameters: [
          { name: 'symbol', type: 'string', description: 'Trading pair symbol (e.g., BTCUSDT)', required: true },
          { name: 'side', type: 'string', description: 'Order side (BUY or SELL)', required: true },
          { name: 'type', type: 'string', description: 'Order type (MARKET, LIMIT)', required: true },
          { name: 'quantity', type: 'number', description: 'Order quantity', required: true },
          { name: 'price', type: 'number', description: 'Order price (for LIMIT orders)', required: false }
        ]
      },
      {
        method: 'GET',
        path: '/spot/orders',
        title: 'Get Orders',
        description: 'Retrieve list of trading orders',
        parameters: [
          { name: 'symbol', type: 'string', description: 'Trading pair symbol', required: false },
          { name: 'status', type: 'string', description: 'Order status filter', required: false },
          { name: 'limit', type: 'integer', description: 'Number of orders to return', required: false }
        ]
      },
      {
        method: 'DELETE',
        path: '/spot/order',
        title: 'Cancel Order',
        description: 'Cancel an existing trading order',
        parameters: [
          { name: 'orderId', type: 'string', description: 'Order ID to cancel', required: true },
          { name: 'symbol', type: 'string', description: 'Trading pair symbol', required: true }
        ]
      }
    ]
  }
};

// Command line interface
function showHelp() {
  console.log(`
🚀 Universal Swagger Generator

Usage:
  node universal-swagger-generator-final.cjs <api-type>
  node universal-swagger-generator-final.cjs <command>

Available API types:
  user      - Generate User API (profile, notifications, flags)
  wallet    - Generate Wallet API (balance, transfer, history)  
  auth      - Generate Authentication API (login, register, logout)
  trading   - Generate Trading API (orders, cancel, history)
  all       - Generate all APIs

Available commands:
  swagger   - Generate all APIs from Swagger documentation automatically
  auto      - Same as swagger (alias)
  help      - Show this help message

Examples:
  node universal-swagger-generator-final.cjs user
  node universal-swagger-generator-final.cjs wallet
  node universal-swagger-generator-final.cjs all
  node universal-swagger-generator-final.cjs swagger
  node universal-swagger-generator-final.cjs auto
`);
}

function generateAPI(apiType) {
  const generator = new UniversalAPIGenerator();
  const config = API_CONFIGS[apiType];

  if (!config) {
    console.error(`❌ Unknown API type: ${apiType}`);
    showHelp();
    return;
  }

  console.log(`🔥 Generating ${config.name}...`);
  generator.generateAPI(config.name, config.endpoints, config.componentName);
}

function generateAllAPIs() {
  console.log('🔥 Generating all APIs...\n');

  Object.keys(API_CONFIGS).forEach(apiType => {
    console.log(`\n--- Generating ${apiType.toUpperCase()} API ---`);
    generateAPI(apiType);
  });

  console.log('\n🎉 All APIs generated successfully!');
}

async function generateFromSwagger() {
  try {
    console.log('🔥 Generating APIs from Swagger documentation...\n');

    const loader = new SwaggerAutoLoader();
    await loader.generateAllAPIsFromSwagger();

  } catch (error) {
    console.error('❌ Failed to generate from Swagger:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === 'help' || args[0] === '--help') {
    showHelp();
  } else if (args[0] === 'all') {
    generateAllAPIs();
  } else if (args[0] === 'swagger' || args[0] === 'auto') {
    generateFromSwagger();
  } else {
    generateAPI(args[0]);
  }
} 