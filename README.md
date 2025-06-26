# OKD Finance API Documentation

Полная документация для API криптовалютной биржи OKD Finance с интеграцией Bybit.

## Обзор

OKD Finance - это современная криптовалютная биржа, предоставляющая:

- 🔐 Безопасную аутентификацию через Firebase
- 💱 Полный спектр торговых операций
- 🏦 Управление кошельками и активами
- 📊 Рыночные данные в реальном времени
- 🔗 Интеграцию с Bybit для расширенной ликвидности
- 📝 Подробную документацию API

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Клонирование репозитория
git clone https://github.com/OKD-Finance/Backend.git
cd okd-finance-docs

# Установка зависимостей
npm install

# Создание файла переменных окружения (опционально)
# Создайте .env файл для настройки URL API
echo "SWAGGER_URL=https://develop.okd.finance/api/swagger/swagger.json" > .env
echo "API_BASE_URL=https://develop.okd.finance/api" >> .env

# Запуск сервера разработки
npm run dev
```

Документация будет доступна по адресу: http://localhost:5173/okd-finance-docs/

### Сборка для продакшена

```bash
# Сборка статических файлов
npm run build

# Предварительный просмотр сборки
npm run preview
```

## 📁 Структура проекта

```
okd-finance-docs/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts          # Конфигурация VitePress
│   ├── public/                # Статические файлы
│   ├── index.md              # Главная страница
│   ├── en/                   # Английская документация
│   │   ├── guide/
│   │   ├── api/
│   │   ├── trading/
│   │   ├── bybit/
│   │   └── examples/
│   ├── ru/                   # Русская документация
│   │   ├── guide/
│   │   ├── api/
│   │   ├── trading/
│   │   ├── bybit/
│   │   └── examples/
│   └── zh/                   # Китайская документация
├── package.json
└── README.md
```

## 🌐 Многоязычная поддержка

Документация доступна на трех языках:

- **English** (`/en/`) - Английский
- **Русский** (`/ru/`) - Русский  
- **中文** (`/zh/`) - Китайский

## 📚 Разделы документации

### Руководства (`/guide/`)
- Введение и быстрый старт
- Архитектура системы
- Аутентификация
- Развертывание

### API Справочник (`/api/`)
- Обзор API
- Аутентификация
- Пользователи и аккаунты
- Кошельки
- KYC
- Вебхуки

### Торговый API (`/trading/`)
- Обзор торговой системы
- Рыночные данные
- Управление ордерами
- Портфель

### Интеграция Bybit (`/bybit/`)
- Обзор интеграции
- Конфигурация
- Маршрутизация ордеров
- Синхронизация данных

### Примеры кода (`/examples/`)
- Базовое использование
- Торговые потоки
- Обработка вебхуков
- Интеграция с Bybit

## ⚙️ Переменные окружения

Для настройки документации можно использовать следующие переменные окружения:

| Переменная | Описание | Значение по умолчанию |
|------------|----------|----------------------|
| `SWAGGER_URL` | URL для получения Swagger спецификации API | `https://develop.okd.finance/api/swagger/swagger.json` |
| `API_BASE_URL` | Базовый URL API для тестирования в интерактивных компонентах | `https://develop.okd.finance/api` |

### Пример .env файла

```bash
# API Configuration
SWAGGER_URL=https://develop.okd.finance/api/swagger/swagger.json
API_BASE_URL=https://develop.okd.finance/api

# Другие переменные для примеров в документации
OKD_API_BASE_URL=https://develop.okd.finance/api
FIREBASE_TOKEN=your_firebase_token
FIREBASE_UID=your_firebase_uid
DEVICE_FINGERPRINT=your_device_fingerprint
RECAPTCHA_TOKEN=your_recaptcha_token
PLATFORM_ID=your_platform_id
WEBHOOK_SECRET=your_webhook_secret
```

## 🛠 Технологии

- **VitePress** - Генератор статической документации
- **Vue 3** - Фреймворк для интерактивных компонентов
- **TypeScript** - Типизированный JavaScript
- **Mermaid** - Диаграммы и схемы
- **Tailwind CSS** - Стилизация

## 📝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 🚀 Развертывание

### GitHub Pages

Для развертывания на GitHub Pages:

```bash
# Сборка проекта
npm run build

# Загрузите содержимое docs/.vitepress/dist в GitHub Pages
```

### Собственный сервер

```bash
# Сборка проекта
npm run build

# Скопируйте содержимое docs/.vitepress/dist на ваш сервер
cp -r docs/.vitepress/dist/* /var/www/html/
```

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 🔗 Полезные ссылки

- **Основной сайт:** https://develop.okd.finance/
- **API Документация:** https://develop.okd.finance/api/
- **GitHub:** https://github.com/OKD-Finance/Backend

## 📞 Поддержка

Если у вас есть вопросы или проблемы:

1. Проверьте [Issues](https://github.com/OKD-Finance/Backend/issues)
2. Создайте новый Issue с подробным описанием
3. Свяжитесь с командой разработки

---

**OKD Finance** - Торгуйте криптовалютами с уверенностью 🚀 

<!-- Trigger deployment: 2025-01-26 --> # Styles fixed - rebuild completed
