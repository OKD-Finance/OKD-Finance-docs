# Интеграция с Bybit

OKD Finance предоставляет полную интеграцию с Bybit для расширения торговых возможностей и доступа к глубокой ликвидности крупнейшей криптовалютной биржи мира.

## Обзор интеграции

### Что такое интеграция с Bybit?

Интеграция с Bybit позволяет:

- **Получить доступ к ликвидности Bybit** - Исполнение ордеров на одной из крупнейших бирж
- **Использовать расширенную функциональность** - Деривативы, опционы, фьючерсы
- **Оптимизировать исполнение** - Умная маршрутизация между внутренним матчингом и Bybit
- **Снизить риски** - Диверсификация исполнения между площадками

### Архитектура интеграции

```text
@startuml
!theme aws-orange

component "OKD Finance Client" as A #e1f5fe
component "OKD Gateway API" as B #f3e5f5
component "Order Router" as C #fff3e0
component "Internal Matching Engine" as D
component "Bybit Integration Layer" as E #e8f5e8
component "Bybit API" as F #e8f5e8

database "OKD Liquidity Pool" as G
database "Bybit Liquidity Pool" as H

component "Market Data Aggregator" as I
component "OKD Market Data" as J
component "Bybit Market Data" as K

A --> B
B --> C
C --> D
C --> E
E --> F

D --> G
F --> H

I --> J
I --> K

@enduml
```

## Поддерживаемые функции

### Спотовая торговля
- Все основные торговые пары
- Лимитные и рыночные ордера
- Стоп-лоссы и тейк-профиты
- Синхронизация балансов

### Фьючерсная торговля
- Линейные фьючерсы (USDT-M)
- Инверсные фьючерсы (Coin-M)
- Все типы ордеров Bybit
- Управление позициями и маржей

### Опционы
- Европейские опционы
- Стратегии спреда
- Волатильность торговли
- Риск-менеджмент

### Рыночные данные
- Тикеры в реальном времени
- Стакан заявок
- История сделок
- Свечи и индикаторы

## Конфигурация интеграции

### API ключи Bybit

1. **Создайте API ключи в Bybit:**
   - Войдите в аккаунт Bybit
   - Перейдите в API Management
   - Создайте новый API ключ
   - Настройте разрешения

2. **Настройте ключи в OKD Finance:**
```http
POST /api/settings/bybit-integration
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "api_key": "your-bybit-api-key",
  "api_secret": "your-bybit-api-secret",
  "testnet": false,
  "enable_spot": true,
  "enable_futures": true,
  "enable_options": false
}
```

### Разрешения API ключа

Рекомендуемые разрешения для API ключа Bybit:

#### Обязательные разрешения:
- **Read** - Чтение данных аккаунта
- **Trade** - Выполнение торговых операций
- **Derivatives** - Торговля деривативами (при необходимости)

#### Опциональные разрешения:
- **Transfer** - Внутренние переводы (для управления балансами)
- **Option** - Торговля опционами

### Настройки маршрутизации

```json
{
  "routing_config": {
    "default_venue": "okd_internal",
    "bybit_threshold": {
      "min_amount": 100,
      "max_spread": 0.1
    },
    "smart_routing": true,
    "route_large_orders": true,
    "size_threshold": 10000
  }
}
```

## Маршрутизация ордеров

### Умная маршрутизация

OKD Finance автоматически определяет оптимальное место исполнения:

1. **Анализ ликвидности** - Сравнение стаканов заявок
2. **Расчет издержек** - Комиссии и спреды
3. **Оценка воздействия** - Влияние на рынок
4. **Выбор площадки** - Оптимальное место исполнения

### Стратегии маршрутизации

#### TWAP (Time Weighted Average Price)
```http
POST /api/trading/order
Content-Type: application/json

{
  "symbol": "BNBETH",
  "side": "buy",
  "type": "twap",
  "quantity": 10.0,
  "duration": 3600,
  "routing": {
    "strategy": "smart",
    "venues": ["okd_internal", "bybit"],
    "max_bybit_percentage": 80
  }
}
```

#### VWAP (Volume Weighted Average Price)
```http
POST /api/trading/order
Content-Type: application/json

{
  "symbol": "BNBETH",
  "side": "sell",
  "type": "vwap",
  "quantity": 5.0,
  "participation_rate": 0.1,
  "routing": {
    "strategy": "minimize_impact",
    "prefer_internal": true
  }
}
```

## Синхронизация данных

### Синхронизация балансов

Автоматическая синхронизация балансов между OKD Finance и Bybit:

```http
GET /api/wallet/balance/consolidated
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Ответ:
```json
{
  "success": true,
  "data": {
    "consolidated_balance": {
      "BTC": {
        "total": 1.5,
        "okd_internal": 0.8,
        "bybit_spot": 0.5,
        "bybit_futures": 0.2
      },
      "USDT": {
        "total": 10000.0,
        "okd_internal": 5000.0,
        "bybit_spot": 3000.0,
        "bybit_futures": 2000.0
      }
    }
  }
}
```

### Синхронизация позиций

```http
GET /api/trading/positions/consolidated
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Синхронизация ордеров

Все ордера автоматически синхронизируются между платформами:

```http
GET /api/trading/orders?include_bybit=true
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Управление рисками

### Лимиты экспозиции

```http
POST /api/risk/limits/bybit
Content-Type: application/json

{
  "max_position_size": {
    "BTC": 10.0,
    "ETH": 100.0,
    "USDT": 100000.0
  },
  "max_daily_volume": 1000000.0,
  "max_open_orders": 50,
  "stop_loss_required": true
}
```

### Мониторинг позиций

```http
GET /api/risk/exposure/bybit
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Автоматическое закрытие позиций

При превышении лимитов система автоматически:
- Отменяет новые ордера
- Закрывает превышающие лимит позиции
- Отправляет уведомления

## Комиссии и издержки

### Структура комиссий

| Тип операции | OKD Internal | Bybit | Общая комиссия |
|--------------|--------------|-------|----------------|
| Spot Trading | 0.1% | 0.1% | 0.1% - 0.15% |
| Futures | 0.05% (maker) | 0.02% (maker) | 0.05% - 0.07% |
| Options | 0.03% | 0.03% | 0.03% - 0.05% |

### Оптимизация издержек

```http
GET /api/analytics/cost-analysis
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "symbol": "BNBETH",
  "side": "buy",
  "quantity": 1.0,
  "analysis_period": "1h"
}
```

Ответ:
```json
{
  "venues": {
    "okd_internal": {
      "estimated_cost": 0.1,
      "liquidity_available": 0.8,
      "execution_probability": 0.9
    },
    "bybit": {
      "estimated_cost": 0.12,
      "liquidity_available": 5.0,
      "execution_probability": 0.99
    }
  },
  "recommendation": "split_order",
  "optimal_split": {
    "okd_internal": 0.8,
    "bybit": 0.2
  }
}
```

## Мониторинг и аналитика

### Дашборд интеграции

```http
GET /api/bybit/integration/status
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Метрики производительности

```http
GET /api/analytics/bybit/performance
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "period": "24h",
  "metrics": [
    "execution_quality",
    "latency",
    "fill_rate",
    "cost_savings"
  ]
}
```

### Отчеты

```http
GET /api/reports/bybit-integration
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "from": "2024-01-01T00:00:00Z",
  "to": "2024-01-31T23:59:59Z",
  "format": "pdf"
}
```

## Устранение неполадок

### Частые проблемы

#### Проблема: Ордера не исполняются на Bybit
**Решение:**
1. Проверьте разрешения API ключа
2. Убедитесь в достаточности баланса
3. Проверьте статус подключения

#### Проблема: Неточная синхронизация балансов
**Решение:**
1. Принудительная синхронизация:
```http
POST /api/wallet/sync/bybit
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Проблема: Высокая латентность
**Решение:**
1. Проверьте региональные настройки
2. Оптимизируйте частоту запросов
3. Используйте WebSocket подключения

### Журналы и отладка

```http
GET /api/logs/bybit-integration
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "level": "error",
  "from": "2024-01-15T00:00:00Z",
  "to": "2024-01-15T23:59:59Z"
}
```

## Лучшие практики

### Оптимизация производительности
1. **Используйте WebSocket** для рыночных данных
2. **Группируйте запросы** для снижения латентности
3. **Кэшируйте статические данные** (символы, лимиты)
4. **Мониторьте rate limits** обеих платформ

### Управление рисками
1. **Устанавливайте лимиты** на все позиции
2. **Мониторьте корреляции** между площадками
3. **Диверсифицируйте исполнение** между venue
4. **Ведите детальную отчетность**

### Безопасность
1. **Ограничьте разрешения** API ключей
2. **Используйте IP whitelist** в Bybit
3. **Регулярно ротируйте ключи**
4. **Мониторьте подозрительную активность**

## Поддержка

### Техническая поддержка
- Email: bybit-support@okd.finance
- Telegram: @okd_bybit_support
- Priority support для enterprise клиентов

### Документация Bybit
- [Bybit API Documentation](https://bybit-exchange.github.io/docs/)
- [Bybit OpenAPI](https://bybit-exchange.github.io/docs/v5/intro)

::: tip Рекомендация
Всегда тестируйте интеграцию на testnet перед использованием в продакшн.
:::

::: warning Внимание
Интеграция с Bybit требует дополнительных настроек безопасности и может повлиять на общую производительность системы.
::: 