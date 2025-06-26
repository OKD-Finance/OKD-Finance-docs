# 🚀 Enhanced Swagger Generator

Автоматически генерирует интерактивные Vue компоненты и markdown страницы из Swagger API документации, основываясь на структуре `InteractiveTradingAPI.vue` и `spot.md`.

## 📋 Что генерирует

### 1. Vue Компоненты
Генерирует интерактивные компоненты типа `InteractiveSpotTradingAPI.vue` с:
- ✅ Фиксированный блок аутентификации (открыт по умолчанию при отсутствии токена)
- ✅ Live тестирование API endpoints
- ✅ Поддержка всех HTTP методов (GET, POST, PUT, DELETE, PATCH)
- ✅ Автоматическая генерация форм на основе параметров
- ✅ Примеры кода на 5 языках (cURL, Go, TypeScript, PHP, Python)
- ✅ Копирование в буфер обмена
- ✅ Отображение запросов и ответов
- ✅ Стили в стиле VitePress

### 2. Markdown Страницы
Генерирует страницы типа `spot.md` с:
- ✅ Подключение Vue компонента
- ✅ Настройка layout
- ✅ Описание API группы

## 🛠 Использование

### Запуск генератора
\`\`\`bash
# Базовый запуск
node swagger-generator-new.cjs

# С переменными окружения
SWAGGER_URL=https://api.example.com/swagger.json npm run generate

# С конфигурацией
node swagger-generator-new.cjs --config=generator-config.json
\`\`\`

### Переменные окружения
\`\`\`bash
SWAGGER_URL=https://develop.okd.finance/api/swagger/swagger.json
API_BASE_URL=https://develop.okd.finance/api
\`\`\`

## 📁 Структура вывода

\`\`\`
docs/
├── .vitepress/
│   └── theme/
│       └── components/
│           ├── InteractiveSpotTradingAPI.vue    # Spot trading endpoints
│           ├── InteractiveWalletAPI.vue         # Wallet endpoints  
│           ├── InteractiveUserAPI.vue           # User management
│           └── InteractiveKycAPI.vue            # KYC verification
└── en/
    └── api/
        ├── spot.md                              # Spot trading page
        ├── wallet.md                            # Wallet page
        ├── user.md                              # User page
        └── kyc.md                               # KYC page
\`\`\`

## 🎯 Примеры сгенерированных компонентов

### InteractiveSpotTradingAPI.vue
\`\`\`vue
<template>
  <!-- Fixed Authentication Header -->
  <div class="auth-header-fixed" :class="{ 'collapsed': isHeaderCollapsed }">
    <!-- Auth form with token input, base URL, show/hide toggle -->
  </div>

  <div class="interactive-api-container">
    <!-- POST /spot/orders endpoint -->
    <section id="placeOrder" class="endpoint-section">
      <div class="endpoint-layout">
        <div class="endpoint-docs">
          <!-- Documentation with parameters, examples -->
        </div>
        <div class="endpoint-testing">
          <!-- Live testing form -->
        </div>
      </div>
    </section>

    <!-- GET /spot/orders/open endpoint -->
    <section id="getOpenOrders" class="endpoint-section">
      <!-- Similar structure -->
    </section>
  </div>
</template>
\`\`\`

### spot.md
\`\`\`markdown
---
layout: page
---

Welcome to the **Spot Trading API** documentation. This interactive documentation allows you to test API endpoints directly from this page.

<InteractiveSpotTradingAPI />

<script setup>
import InteractiveSpotTradingAPI from '../../.vitepress/theme/components/InteractiveSpotTradingAPI.vue'
</script>
\`\`\`

## ⚙️ Настройка

### generator-config.json
\`\`\`json
{
  "swagger": {
    "url": "https://develop.okd.finance/api/swagger/swagger.json",
    "baseUrl": "https://develop.okd.finance/api"
  },
  "groups": {
    "spot": {
      "title": "Spot Trading API",
      "description": "Place and manage spot trading orders",
      "icon": "📈"
    }
  },
  "features": {
    "livetesting": true,
    "codeGeneration": true,
    "authIntegration": true
  }
}
\`\`\`

## 🔧 Функции генератора

### Автоматическая группировка
- Группирует endpoints по tags из Swagger
- Создает отдельный компонент для каждой группы
- Генерирует соответствующие markdown страницы

### Интеграция с useAuth
- Использует глобальный composable `useAuth.js`
- Автоматическое управление токенами
- Состояние блока аутентификации

### Генерация форм
- Автоматические формы на основе параметров API
- Поддержка query, path, и body параметров
- Валидация обязательных полей

### Примеры кода
- Автоматическая генерация cURL команд
- Поддержка TypeScript, Go, PHP, Python
- Кнопки копирования в буфер

## 🎨 Стили и темы

Компоненты используют VitePress CSS переменные:
- \`--vp-c-brand\` - основной цвет
- \`--vp-c-bg\` - фон
- \`--vp-c-text-1\` - основной текст
- Responsive дизайн
- Тёмная/светлая тема

## 📊 Мониторинг генерации

\`\`\`bash
🚀 Starting Enhanced Swagger Generator...
📡 Fetching Swagger definition...
📊 Grouping endpoints...
✨ Generating spot component...
  ✅ Generated InteractiveSpotTradingAPI.vue
  ✅ Generated spot.md
✨ Generating wallet component...
  ✅ Generated InteractiveWalletAPI.vue
  ✅ Generated wallet.md
🎉 Generation completed successfully!
\`\`\`

## 🚦 Требования

- Node.js 16+
- Доступ к Swagger JSON
- VitePress проект
- Composable \`useAuth.js\`

## 🔄 Интеграция в CI/CD

\`\`\`yaml
# .github/workflows/docs.yml
- name: Generate API Documentation
  run: |
    npm install
    node swagger-generator-new.cjs
    npm run docs:build
\`\`\`

## 🎯 Результат

После запуска генератора вы получите:
1. **Интерактивные Vue компоненты** - готовые к использованию
2. **Markdown страницы** - для навигации VitePress
3. **Live тестирование** - прямо в документации
4. **Примеры кода** - на нескольких языках
5. **Единый стиль** - как в `InteractiveTradingAPI.vue` 