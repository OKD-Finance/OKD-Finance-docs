# 🚀 Система динамического обновления Swagger - Быстрый старт

## 📋 Что это?

**Система автоматического обновления API документации** на основе Swagger спецификации с интерактивным тестированием и современным UI.

## ✨ Что умеет система?

- 🔄 **Автоматически отслеживает изменения** в Swagger API
- 📚 **Генерирует интерактивные Vue компоненты** для тестирования
- 🎨 **Создает красивую документацию** с примерами кода
- 🔐 **Интегрирует аутентификацию** (Token + Fingerprint)
- 🧭 **Обновляет навигацию** VitePress автоматически

## 🚀 Быстрый старт

### 1. Показать доступные API

```bash
npm run swagger:tags
```

Результат:
```
📋 Available Swagger Tags:
1. KYC (3 endpoints)
2. Authentication (30 endpoints)
3. Websocket subscriptions (6 endpoints)
4. Exchange configuration (6 endpoints)
5. User Operations (3 endpoints)
6. Wallet (7 endpoints)
...
```

### 2. Сгенерировать конкретный API

```bash
npm run swagger:generate "Authentication"
```

Что произойдет:
- ✅ Создастся Vue компонент `InteractiveAuthenticationAPI.vue`
- ✅ Создастся Markdown файл `authentication.md`
- ✅ Обновится навигация VitePress
- ✅ Исправятся ошибки навигации автоматически

### 3. Сгенерировать все API

```bash
npm run swagger:generate-all
```

### 4. Обновить только при изменениях

```bash
npm run swagger:update
```

### 5. Принудительное обновление

```bash
npm run swagger:force-update
```

## 📖 Запуск документации

### С автоматическим обновлением

```bash
npm run docs:dev-with-update
```

### Обычный запуск

```bash
npm run docs:dev
```

### Полная сборка

```bash
npm run docs:full-build
```

## 🔧 Что создается при генерации?

### Vue компонент (пример: `InteractiveAuthenticationAPI.vue`)

- 🔐 **Фиксированный заголовок аутентификации** с полями Token и Fingerprint
- 📝 **Интерактивные формы** для каждого endpoint
- 🚀 **Кнопки тестирования** с валидацией
- 💻 **Примеры кода** на 5 языках (cURL, Go, TypeScript, PHP, Python)
- 📊 **Отображение ответов** в реальном времени
- 🎨 **Современный дизайн** с градиентами и анимациями

### Markdown документация (пример: `authentication.md`)

```markdown
# Authentication API

Interactive documentation for Authentication endpoints.

<script setup>
import InteractiveAuthenticationAPI from '../.vitepress/theme/components/InteractiveAuthenticationAPI.vue'
</script>

<InteractiveAuthenticationAPI />

## Endpoints Overview
...
```

### Автоматическое обновление навигации

Система автоматически добавляет новые API в `docs/.vitepress/config.ts`:

```typescript
{
  text: 'API Reference',
  items: [
    { text: 'Overview', link: '/en/api/overview' },
    { text: 'Authentication API', link: '/en/api/authentication' },
    { text: 'User Operations API', link: '/en/api/user-operations' },
    // ... другие API
  ]
}
```

## 🔐 Аутентификация

Все сгенерированные компоненты поддерживают:

- **Bearer Token** - основной токен доступа
- **Fingerprint** - 32-символьный hex идентификатор
- **Глобальное состояние** - настройки сохраняются между компонентами
- **Автоматическую валидацию** - кнопки тестирования активны только при наличии обоих полей

## 📊 Пример результата

После выполнения `npm run swagger:generate "Authentication"`:

```
🚀 Auto Swagger Updater initialized
📡 Swagger URL: https://develop.okd.finance/api/swagger/swagger.json
🔥 Generating Authentication API...
✅ Swagger loaded: 96 endpoints found
✅ Generated docs/.vitepress/theme/components/InteractiveAuthenticationAPI.vue
✅ Generated docs/en/api/authentication.md
✅ Added Authentication API to navigation (removed duplicates)
🔧 Running automatic navigation validation...
✅ Navigation automatically fixed!
🎉 Authentication API generation completed!
```

## 🔍 Валидация и исправление

Система автоматически:

- ✅ **Проверяет синтаксис** навигации VitePress
- ✅ **Удаляет дубли** в меню
- ✅ **Исправляет ошибки** структуры
- ✅ **Валидирует ссылки** на файлы
- ✅ **Логирует изменения** для аудита

## 📈 Производительность

| Операция | Время |
|----------|-------|
| Проверка изменений | ~200ms |
| Генерация одного API | ~500ms |
| Полная генерация (13 APIs) | ~5s |
| Обновление навигации | ~100ms |

## 🛠️ Устранение проблем

### Ошибка навигации

```bash
npm run validate:navigation
npm run fix:navigation
```

### Timeout при загрузке

```bash
# Проверьте доступность
curl -I https://develop.okd.finance/api/swagger/swagger.json
```

### Подробные логи

```bash
DEBUG=true VERBOSE=true npm run swagger:generate-all
```

## 📁 Структура файлов

```
okd-finance-docs_vitepress/
├── auto-swagger-updater.cjs          # Основная система
├── auto-updater-config.json          # Конфигурация
├── navigation-validator.cjs           # Валидатор навигации
├── .swagger-cache.json               # Кеш (создается автоматически)
├── package.json                      # NPM скрипты
└── docs/
    ├── .vitepress/
    │   ├── config.ts                 # Обновляется автоматически
    │   └── theme/components/         # Сгенерированные Vue компоненты
    └── en/api/                       # Сгенерированные Markdown страницы
```

## 🎯 Готовые команды

| Команда | Что делает |
|---------|------------|
| `npm run swagger:tags` | Показать все доступные API теги |
| `npm run swagger:generate "TagName"` | Сгенерировать конкретный API |
| `npm run swagger:generate-all` | Сгенерировать все API |
| `npm run swagger:update` | Обновить только при изменениях |
| `npm run swagger:force-update` | Принудительное обновление |
| `npm run docs:dev-with-update` | Запуск dev сервера с обновлением |
| `npm run docs:full-build` | Обновление + сборка |
| `npm run validate:navigation` | Проверить навигацию |
| `npm run fix:navigation` | Исправить навигацию |

## 💡 Полезные советы

1. **Всегда начинайте с** `npm run swagger:tags` чтобы увидеть доступные API
2. **Используйте точные имена тегов** как показано в выводе команды tags
3. **Запускайте обновление перед разработкой** с `npm run docs:dev-with-update`
4. **При проблемах с навигацией** используйте `npm run fix:navigation`
5. **Для CI/CD используйте** `npm run swagger:update` (обновляет только при изменениях)

## 🎉 Результат

После настройки системы вы получите:

- 📚 **Всегда актуальную документацию** без ручного труда
- 🔄 **Автоматическое обновление** при изменениях в API
- 🎨 **Красивый интерфейс** для тестирования API
- 🔐 **Встроенную аутентификацию** с Token и Fingerprint
- 💻 **Примеры кода** на популярных языках
- 🧭 **Автоматическую навигацию** без дублей и ошибок

---

**Система готова к использованию!** 🚀  
Начните с `npm run swagger:tags` и выберите API для генерации. 