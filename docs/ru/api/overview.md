# Обзор API

OKD Finance предоставляет мощный RESTful API для интеграции с криптовалютной биржей. API позволяет управлять аккаунтами, выполнять торговые операции, интегрироваться с Bybit и получать рыночные данные в реальном времени.

## Базовая информация

### Базовые URL

**Продакшн:**
```
https://develop.okd.finance/api
```

**Демо/Разработка:**
```
https://develop.okd.finance/api
```

::: tip Демо-окружение
Используйте демо-окружение для тестирования и разработки. Демо API содержит тестовые данные и интегрирован с Bybit testnet.

**Swagger UI:** https://develop.okd.finance/swagger/gateway/
:::

### Версионирование
API использует версионирование через URL. Текущая версия доступна по базовому URL без префикса версии.

### Формат данных
- **Запросы**: JSON
- **Ответы**: JSON
- **Кодировка**: UTF-8
- **Даты**: ISO 8601 (UTC)

## Аутентификация

### Типы аутентификации

#### Firebase Token
Для аутентификации с Firebase:

```http
POST /auth/check/firebase
Content-Type: application/json
Fingerprint: your-device-unique-id
X-RECAPTCHA: your-recaptcha-token
X-PLATFORM-ID: your-platform-id
```

```json
{
  "token": "firebase-token",
  "uid": "firebase-uid"
}
```

#### JWT Tokens
После успешной аутентификации получите JWT токены:

```json
{
  "acc_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Заголовки аутентификации
Все защищенные запросы должны включать:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
Fingerprint: your-device-unique-id
```

## Основные службы

### Gateway API
Основной API для торговли и управления аккаунтами:

```http
GET    /api/auth/profile           # Профиль пользователя
POST   /api/trading/order          # Создать ордер
GET    /api/trading/orders         # Список ордеров
GET    /api/wallet/balance         # Баланс кошелька
POST   /api/wallet/withdraw        # Создать вывод
```

### Admin API
Административные функции:

```http
GET    /admin/users                # Управление пользователями
POST   /admin/system/maintenance   # Системное обслуживание
GET    /admin/trading/stats        # Торговая статистика
```

### External Gateway
API для внешних интеграций:

```http
POST   /extapi/webhook/bybit       # Webhook от Bybit
GET    /extapi/market/data         # Рыночные данные
POST   /extapi/trading/sync        # Синхронизация торговли
```

## Ограничения скорости

### Лимиты по умолчанию
- **Общие запросы**: 1000 запросов/час
- **Торговые операции**: 100 запросов/минуту
- **Аутентификация**: 50 запросов/час
- **Рыночные данные**: 500 запросов/час

### Заголовки ответа
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

### Превышение лимитов
При превышении лимитов API возвращает статус `429 Too Many Requests`:

```json
{
  "code": 429001,
  "message": "Превышен лимит запросов",
  "details": {
    "limit": 1000,
    "reset_at": "2024-01-15T12:00:00Z"
  }
}
```

## Структура ответов

### Успешные ответы
```json
{
  "success": true,
  "data": {
    // Данные ответа
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Ошибки
```json
{
  "code": 400001,
  "message": "Ошибка валидации данных",
  "details": {
    "field": "email",
    "reason": "Неверный формат email"
  }
}
```

## HTTP статус коды

| Код | Описание | Использование |
|-----|----------|---------------|
| 200 | OK | Успешный запрос |
| 201 | Created | Ресурс создан |
| 400 | Bad Request | Неверный запрос |
| 401 | Unauthorized | Не авторизован |
| 403 | Forbidden | Доступ запрещен |
| 404 | Not Found | Ресурс не найден |
| 429 | Too Many Requests | Превышен лимит |
| 500 | Internal Server Error | Внутренняя ошибка |

## Основные эндпоинты

### Аутентификация
```http
POST   /auth/check/firebase        # Проверка Firebase токена
POST   /auth/confirm               # Подтверждение email
POST   /auth/signin                # Вход в систему
POST   /auth/signup                # Регистрация
POST   /auth/refresh               # Обновление токена
POST   /auth/logout                # Выход из системы
```

### Профиль пользователя
```http
GET    /user/profile               # Получить профиль
PUT    /user/profile               # Обновить профиль
POST   /user/avatar                # Загрузить аватар
GET    /user/settings              # Настройки
PUT    /user/settings              # Обновить настройки
```

### KYC (Верификация)
```http
POST   /kyc/start                  # Начать верификацию
POST   /kyc/document               # Загрузить документ
GET    /kyc/status                 # Статус верификации
POST   /kyc/selfie                 # Загрузить селфи
```

### Кошельки и активы
```http
GET    /wallet/balance             # Баланс кошелька
POST   /wallet/deposit             # Создать депозит
POST   /wallet/withdraw            # Создать вывод
GET    /wallet/transactions        # История транзакций
GET    /wallet/addresses           # Адреса для депозитов
```

### Торговля
```http
POST   /trading/order              # Создать ордер
GET    /trading/orders             # Список ордеров
DELETE /trading/order/{id}         # Отменить ордер
GET    /trading/trades             # История сделок
GET    /trading/positions          # Открытые позиции
```

### Рыночные данные
```http
GET    /market/ticker              # Тикеры
GET    /market/orderbook           # Стакан заявок
GET    /market/trades              # Последние сделки
GET    /market/candles             # Свечи
GET    /market/symbols             # Торговые пары
```

## Пагинация

### Параметры запроса
```http
GET /trading/orders?page=1&limit=50&sort=created_at&order=desc
```

### Параметры
- `page`: Номер страницы (по умолчанию: 1)
- `limit`: Количество записей (по умолчанию: 20, максимум: 100)
- `sort`: Поле для сортировки
- `order`: Порядок сортировки (`asc` или `desc`)

### Ответ с пагинацией
```json
{
  "success": true,
  "data": [
    // Массив данных
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

## Фильтрация

### Параметры фильтрации
```http
GET /trading/orders?status=active&symbol=BTC/USDT&from=2024-01-01&to=2024-01-31
```

### Доступные фильтры
- `status`: Статус ордера
- `symbol`: Торговая пара
- `side`: Сторона сделки (buy/sell)
- `type`: Тип ордера
- `from`: Дата начала
- `to`: Дата окончания

## Webhook уведомления

### Настройка webhook
```http
POST /webhook/configure
Content-Type: application/json

{
  "url": "https://your-domain.com/webhook",
  "events": ["order.filled", "order.cancelled", "deposit.confirmed"],
  "secret": "your-webhook-secret"
}
```

### Типы событий
- `order.created` - Ордер создан
- `order.filled` - Ордер исполнен
- `order.cancelled` - Ордер отменен
- `deposit.confirmed` - Депозит подтвержден
- `withdrawal.completed` - Вывод завершен
- `kyc.approved` - KYC одобрен
- `kyc.rejected` - KYC отклонен

## Интеграция с Bybit

### Синхронизация ордеров
```http
POST /bybit/order/sync
Content-Type: application/json

{
  "order_id": "local-order-id",
  "bybit_order_id": "bybit-order-id",
  "status": "filled"
}
```

### Получение рыночных данных
```http
GET /bybit/market/ticker?symbol=BTCUSDT
```

### Управление позициями
```http
GET /bybit/position/list
POST /bybit/position/close
```

## Коды ошибок

### Аутентификация (400000-400999)
- `400001` - Неверный email или пароль
- `400002` - Аккаунт заблокирован
- `400003` - Неверный токен
- `400004` - Токен истек

### Торговля (401000-401999)
- `401001` - Недостаточно средств
- `401002` - Неверный символ
- `401003` - Неверный размер ордера
- `401004` - Неверная цена

### KYC (402000-402999)
- `402001` - Документ не найден
- `402002` - Неверный формат документа
- `402003` - Верификация отклонена
- `402004` - Документ уже загружен

### Кошелек (403000-403999)
- `403001` - Неверный адрес
- `403002` - Минимальная сумма
- `403003` - Максимальная сумма
- `403004` - Сеть недоступна

## Тестирование API

### Демо-окружение
- URL: `https://develop.okd.finance`
- Swagger UI: `https://develop.okd.finance/swagger/gateway/`
- Тестовые данные: Доступны в демо-окружении

### Postman коллекция
Скачайте готовую коллекцию для Postman:
- [OKD Finance API.postman_collection.json](./postman/OKD-Finance-API.postman_collection.json)

### Примеры кода
- [JavaScript/Node.js](/ru/examples/javascript)
- [Python](/ru/examples/python)
- [Go](/ru/examples/go)
- [C#](/ru/examples/csharp)

## Поддержка

### Техническая поддержка
- Email: api-support@okd.finance
- Telegram: @okd_api_support
- Discord: #api-support

### Обратная связь
- GitHub Issues: https://github.com/OKD-Finance/api-feedback
- Email: feedback@okd.finance

::: tip Рекомендация
Всегда используйте последнюю версию API и регулярно проверяйте обновления документации.
:::

::: warning Важно
Никогда не передавайте свои токены доступа третьим лицам и не храните их в клиентском коде.
::: 