# 🌍 API Documentation Translator

Система автоматического перевода API документации на русский и китайский языки.

## 📋 Обзор

API Translator - это отдельный скрипт, который переводит сгенерированную английскую API документацию на другие языки. Он использует словарный подход с возможностью интеграции внешних API переводчиков.

## 🚀 Возможности

- ✅ **Автоматический перевод** всех API файлов
- ✅ **Словарные переводы** для технических терминов
- ✅ **Сохранение технических терминов** (API, HTTP, JSON, etc.)
- ✅ **Обновление конфигурации VitePress** для многоязычной навигации
- ✅ **Статистика переводов**
- ✅ **Поддержка внешних API** (Google Translate, DeepL, OpenAI)
- ✅ **Модульная архитектура**

## 📦 Установка и настройка

Скрипт уже включен в проект. Команды доступны через npm:

```bash
# Перевести всю документацию
npm run translate:api

# Показать статистику переводов
npm run translate:stats

# Обновить только конфигурацию VitePress
npm run translate:config
```

## 🎯 Использование

### Базовое использование

```bash
# Перевести все API документы
node api-translator.cjs translate

# Показать статистику
node api-translator.cjs stats

# Обновить конфигурацию
node api-translator.cjs config

# Помощь
node api-translator.cjs help
```

### Интеграция в рабочий процесс

Рекомендуемый порядок действий:

1. **Генерация API документации:**
   ```bash
   node universal-swagger-generator-final.cjs swagger
   ```

2. **Перевод документации:**
   ```bash
   npm run translate:api
   ```

3. **Проверка результата:**
   ```bash
   npm run translate:stats
   npm run dev
   ```

## 🔧 Конфигурация

### Базовая конфигурация

```javascript
const translator = new APITranslator({
  sourceDir: './docs/en/api',           // Исходная директория
  targetDirs: {                         // Целевые директории
    ru: './docs/ru/api',
    zh: './docs/zh/api'
  },
  translationService: 'mock',           // Сервис перевода
  apiKey: process.env.TRANSLATION_API_KEY
});
```

### Поддерживаемые сервисы перевода

- `mock` - Словарный перевод (по умолчанию)
- `google` - Google Translate API
- `deepl` - DeepL API  
- `openai` - OpenAI API

### Переменные окружения

```bash
# Для внешних API переводчиков
TRANSLATION_API_KEY=your_api_key_here
```

## 📚 Словари переводов

### Русский язык

```javascript
ru: {
  'API Reference': 'Справочник API',
  'Authentication': 'Аутентификация',
  'Parameters': 'Параметры',
  'Response': 'Ответ',
  'Request': 'Запрос',
  'Example': 'Пример',
  // ... и много других
}
```

### Китайский язык

```javascript
zh: {
  'API Reference': 'API 参考',
  'Authentication': '身份验证',
  'Parameters': '参数',
  'Response': '响应',
  'Request': '请求',
  'Example': '示例',
  // ... и много других
}
```

## 🛠 Расширение функциональности

### Добавление нового языка

1. **Добавить конфигурацию:**
   ```javascript
   targetDirs: {
     ru: './docs/ru/api',
     zh: './docs/zh/api',
     fr: './docs/fr/api'  // Новый язык
   }
   ```

2. **Добавить словарь:**
   ```javascript
   translations: {
     // ... существующие
     fr: {
       'API Reference': 'Référence API',
       'Authentication': 'Authentification',
       // ...
     }
   }
   ```

3. **Обновить конфигурацию VitePress** в методе `updateVitePressConfig()`

### Интеграция внешнего API

```javascript
async callTranslationAPI(content, targetLang) {
  if (this.config.translationService === 'google') {
    const { Translate } = require('@google-cloud/translate').v2;
    const translate = new Translate({ key: this.config.apiKey });
    const [translation] = await translate.translate(content, targetLang);
    return translation;
  }
  
  if (this.config.translationService === 'openai') {
    // Реализация для OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: `Translate API documentation to ${targetLang}. Preserve technical terms.`
        },
        { role: "user", content: content }
      ]
    });
    return response.choices[0].message.content;
  }
}
```

## 📊 Структура файлов

```
docs/
├── en/api/          # Исходные файлы (английский)
│   ├── overview.md
│   ├── authentication.md
│   └── ...
├── ru/api/          # Переведенные файлы (русский)
│   ├── overview.md
│   ├── authentication.md
│   └── ...
└── zh/api/          # Переведенные файлы (китайский)
    ├── overview.md
    ├── authentication.md
    └── ...
```

## 🔄 Автоматизация

### GitHub Actions

```yaml
name: Translate API Documentation
on:
  workflow_run:
    workflows: ["Generate API Documentation"]
    types: [completed]

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run translate:api
        env:
          TRANSLATION_API_KEY: ${{ secrets.TRANSLATION_API_KEY }}
      - name: Commit translations
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/ru/ docs/zh/ docs/.vitepress/config.ts
          git commit -m "Auto-translate API documentation" || exit 0
          git push
```

### Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit

# Проверить изменения в английской документации
if git diff --cached --name-only | grep -q "docs/en/api/"; then
  echo "🌍 English API docs changed, running translation..."
  npm run translate:api
  git add docs/ru/ docs/zh/ docs/.vitepress/config.ts
fi
```

## 🎯 Лучшие практики

### 1. Порядок работы
1. Сначала генерируйте английскую документацию
2. Затем запускайте переводчик
3. Проверяйте результат в браузере

### 2. Качество переводов
- Регулярно обновляйте словари переводов
- Используйте внешние API для лучшего качества
- Проверяйте переводы технических терминов

### 3. Производительность
- Переводите только при изменениях
- Кэшируйте результаты переводов
- Используйте параллельную обработку

### 4. Поддержка
- Ведите changelog переводов
- Документируйте изменения в словарях
- Тестируйте на разных языках

## 📈 Статистика

Текущее состояние переводов:

```bash
npm run translate:stats
```

Пример вывода:
```
📊 Translation Statistics:
   Source files (EN): 16
   Translated files (RU): 18
   Translated files (ZH): 16
```

## 🚨 Устранение проблем

### Проблема: Переводы не применяются
**Решение:** Проверьте регулярные выражения в словарях

### Проблема: Конфигурация не обновляется
**Решение:** Убедитесь, что паттерн поиска в `updateVitePressConfig()` соответствует вашей конфигурации

### Проблема: Внешний API не работает
**Решение:** Проверьте API ключ и лимиты запросов

## 🔮 Будущие улучшения

- [ ] Поддержка переменных в переводах
- [ ] Интеллектуальное кэширование
- [ ] Визуальный интерфейс для управления переводами
- [ ] Автоматическое определение изменений
- [ ] Поддержка контекстных переводов
- [ ] Интеграция с системой управления переводами (TMS)

## 📞 Поддержка

Для вопросов и предложений:
- Создайте issue в репозитории
- Обратитесь к команде разработки
- Изучите логи переводчика для диагностики

---

**Автор:** OKD Finance Team  
**Версия:** 1.0.0  
**Лицензия:** MIT 