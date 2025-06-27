# 🔄 Auto Swagger Updater - Механизм сброса

## 📋 Обзор

Механизм сброса к начальному состоянию обеспечивает полную очистку системы от всех сгенерированных API файлов и возврат к состоянию до первой генерации.

## 🛠️ Методы класса

### Основные методы
- `loadSwagger()` - Загрузка Swagger JSON
- `generateAPI(tagName)` - Генерация конкретного API
- `generateAllAPIs()` - Генерация всех API
- `updateDocumentation()` - Обновление с проверкой изменений

### Служебные методы
- `calculateHash()` - Вычисление SHA256 хеша
- `loadCache()` / `saveCache()` - Работа с кешем
- `createNavigationUpdater()` - Создание обновлятора навигации

### Метод сброса
- `reset(options)` - Возврат к начальному состоянию

## 🔄 Механизм сброса к начальному состоянию

### Описание
Метод `reset()` обеспечивает полную очистку системы от сгенерированных файлов и возврат к состоянию до первой генерации API.

### Параметры

```javascript
await updater.reset({
  confirmReset: true,      // Запрашивать подтверждение (по умолчанию: true)
  removeComponents: true,  // Удалять Vue компоненты (по умолчанию: true)
  removeMarkdown: true,    // Удалять Markdown файлы (по умолчанию: true)
  clearCache: true,        // Очищать кеш (по умолчанию: true)
  resetNavigation: true    // Сбрасывать навигацию (по умолчанию: true)
});
```

### Алгоритм работы

1. **Подтверждение пользователя** (если `confirmReset: true`)
   - Интерактивный запрос через readline
   - Безопасная отмена операции

2. **Удаление Vue компонентов**
   - Сканирование папки `docs/.vitepress/theme/components/`
   - Удаление файлов по паттерну `Interactive*API.vue`
   - Сохранение шаблонов и других файлов

3. **Удаление Markdown документации**
   - Сканирование папки `docs/en/api/`
   - Проверка содержимого файлов на наличие импортов Interactive компонентов
   - Сохранение защищенных файлов (`overview.md`, `index.md`)

4. **Очистка кеша**
   - Удаление файла `.swagger-cache.json`
   - Сброс кеша в памяти

5. **Сброс навигации**
   - Парсинг секции "API Reference" в `config.ts`
   - Возврат к минимальной структуре с только Overview
   - Подсчет удаленных API записей

### Безопасность

- **Умная фильтрация**: Удаляются только сгенерированные файлы
- **Проверка содержимого**: Анализ контента файлов перед удалением
- **Защищенные файлы**: Ручные файлы остаются нетронутыми
- **Подтверждение**: Интерактивная защита от случайного удаления

### Возвращаемое значение

```javascript
{
  success: true,           // Статус операции
  removedFiles: Array,     // Список удаленных файлов
  errors: Array,           // Список ошибок
  removedCount: Number,    // Количество удаленных файлов
  errorCount: Number,      // Количество ошибок
  cancelled: Boolean       // Отменено пользователем (опционально)
}
```

### CLI команды

```bash
# С подтверждением
node auto-swagger-updater.cjs reset

# Без подтверждения
node auto-swagger-updater.cjs reset --no-confirm

# NPM скрипты
npm run swagger:reset        # С подтверждением
npm run swagger:reset-force  # Без подтверждения
```

### Пример использования

```javascript
const updater = new AutoSwaggerUpdater(config);

// Полный сброс с подтверждением
const result = await updater.reset();

// Быстрый сброс без подтверждения
const result = await updater.reset({ confirmReset: false });

// Частичный сброс (только кеш)
const result = await updater.reset({
  confirmReset: false,
  removeComponents: false,
  removeMarkdown: false,
  clearCache: true,
  resetNavigation: false
});
```

## 📊 Пример вывода

```
🔄 Resetting to initial state...

1️⃣ Removing generated Vue components...
   ✅ Removed: InteractiveAuthenticationAPI.vue
   ✅ Removed: InteractiveSpotAPI.vue
   ✅ Removed: InteractiveUserOperationsAPI.vue
   ✅ Removed: InteractiveWalletAPI.vue

2️⃣ Removing generated Markdown files...
   ✅ Removed: authentication.md
   ✅ Removed: spot.md
   ✅ Removed: trading.md
   ✅ Removed: user-operations.md
   ✅ Removed: users.md
   ✅ Removed: wallet.md

3️⃣ Clearing cache...
   ✅ Removed cache file: .swagger-cache.json

4️⃣ Resetting navigation to initial state...
   ✅ Navigation reset: removed 6 API entries

📊 Reset Summary:
   • Removed files: 11
   • Errors: 0

✅ Removed files:
   - docs/.vitepress/theme/components/InteractiveAuthenticationAPI.vue
   - docs/.vitepress/theme/components/InteractiveSpotAPI.vue
   - docs/.vitepress/theme/components/InteractiveUserOperationsAPI.vue
   - docs/.vitepress/theme/components/InteractiveWalletAPI.vue
   - docs/en/api/authentication.md
   - docs/en/api/spot.md
   - docs/en/api/trading.md
   - docs/en/api/user-operations.md
   - docs/en/api/users.md
   - docs/en/api/wallet.md
   - .swagger-cache.json

🎉 Reset to initial state completed!
💡 You can now run "npm run swagger:generate-all" to regenerate all APIs
```

## 🔧 Технические детали

### Метод `resetNavigationToInitial()`

Специальный метод для сброса навигации к начальному состоянию:

```javascript
async resetNavigationToInitial() {
  try {
    let configContent = fs.readFileSync(this.config.configPath, 'utf8');
    
    // Находим секцию API Reference
    const apiSectionRegex = /(\s+)text: 'API Reference',\s*\n\s*items: \[\s*\n([\s\S]*?)\n(\s+)\]\s*\n\s*\}/;
    const match = configContent.match(apiSectionRegex);

    if (!match) {
      return { success: false, error: 'API Reference section not found' };
    }

    // Создаем минимальную навигацию только с Overview
    const newApiSection = `${indent}text: 'API Reference',
${indent}items: [
${indent}    {
${indent}        text: 'Overview',
${indent}        link: '/en/api/overview'
${indent}    }
${endIndent}]
${endIndent}}`;

    // Заменяем в конфиге
    const newConfigContent = configContent.replace(apiSectionRegex, newApiSection);
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
```

### Умная фильтрация файлов

Система использует несколько стратегий для определения сгенерированных файлов:

#### Vue компоненты
```javascript
// Удаляем только файлы по паттерну Interactive*API.vue
if (file.startsWith('Interactive') && file.endsWith('API.vue')) {
  // Удаляем файл
}
```

#### Markdown файлы
```javascript
// Проверяем содержимое файла
const content = fs.readFileSync(filePath, 'utf8');
if (content.includes('Interactive') && content.includes('API.vue')) {
  // Это сгенерированный файл - удаляем
}
```

#### Защищенные файлы
```javascript
const protectedFiles = ['overview.md', 'index.md'];
if (!protectedFiles.includes(file)) {
  // Можно проверять на удаление
}
```

## 🚀 Практическое применение

### Сценарии использования

1. **Разработка**: Очистка при смене API структуры
2. **Тестирование**: Возврат к чистому состоянию между тестами
3. **Деплой**: Сброс перед продакшн генерацией
4. **Отладка**: Устранение проблем с поврежденными файлами

### Интеграция в CI/CD

```yaml
# GitHub Actions пример
- name: Reset Swagger docs
  run: npm run swagger:reset-force

- name: Generate fresh docs
  run: npm run swagger:generate-all

- name: Build documentation
  run: npm run docs:build
```

### Автоматизация

```javascript
// Скрипт для автоматического сброса и восстановления
async function freshGeneration() {
  const updater = new AutoSwaggerUpdater(config);
  
  // Сбрасываем без подтверждения
  await updater.reset({ confirmReset: false });
  
  // Генерируем заново
  await updater.generateAllAPIs();
  
  console.log('✅ Fresh generation completed!');
}
```

---

**Система сброса обеспечивает надежный и безопасный способ возврата к начальному состоянию с полным контролем над процессом очистки.** 