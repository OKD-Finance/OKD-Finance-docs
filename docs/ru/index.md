---
layout: home

hero:
  name: "OKD Finance Биржа"
  text: "Документация API"
  tagline: Полное руководство по интеграции с криптовалютной биржей
  actions:
    - theme: brand
      text: Начать
      link: /ru/guide/introduction
    - theme: alt
      text: Посмотреть на GitHub
      link: https://github.com/OKD-Finance/Backend

features:
  - title: 🚀 Быстро и Надежно
    details: Высокопроизводительный торговый движок с гарантией работы 99.9%
  - title: 🔒 Безопасность по Дизайну
    details: Корпоративная безопасность с многоуровневой защитой
  - title: 🌍 Глобальный Доступ
    details: Доступно по всему миру с поддержкой нескольких языков
  - title: 📊 Продвинутая Торговля
    details: Профессиональные торговые инструменты и поддержка алгоритмической торговли
---

## Быстрый Старт

### Демо Среда

Протестируйте API немедленно с нашей демо средой:

```bash
curl -X GET "https://develop.okd.finance/api/auth/check/firebase" \
  -H "Content-Type: application/json" \
  -H "Fingerprint: your-device-id" \
  -H "X-RECAPTCHA: your-recaptcha-token" \
  -H "X-PLATFORM-ID: your-platform-id"
``` -->

### API Сервисы

OKD Finance предоставляет несколько API сервисов:

- **Gateway API** - Основная торговля и управление аккаунтом
- **Admin API** - Административные функции
- **External Gateway** - Интеграции с третьими сторонами
- **Genesis API** - Основные системные операции

### Возможности

- ✅ Торговля в реальном времени
- ✅ Интеграция с Bybit
- ✅ Поддержка множества активов
- ✅ Продвинутые типы ордеров
- ✅ Управление портфелем
- ✅ Соответствие KYC
- ✅ Уведомления через вебхуки
- ✅ Поддержка нескольких языков

### Начать Работу

1. [Прочитать Введение](/ru/guide/introduction)
2. [Изучить API Справочник](/ru/api/overview)
3. [Посмотреть Примеры Кода](/ru/examples/basic-usage)
4. [Изучить Интеграцию с Bybit](/ru/bybit/overview) 