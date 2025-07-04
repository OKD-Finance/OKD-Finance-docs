# Торговый API - Обзор

Комплексное решение для торговли криптовалютами с интеграцией Bybit Exchange.

## Возможности торгового API

### Основные функции
- 🏪 **Spot Trading** - торговля спотовыми активами
- 📈 **Futures Trading** - торговля фьючерсами
- 📊 **Real-time данные** - получение рыночных данных в реальном времени
- 🎯 **Продвинутые ордера** - стоп-лоссы, тейк-профиты, условные ордера
- 💼 **Управление портфелем** - отслеживание позиций и P&L

### Архитектура торговой системы

```mermaid
graph TD

subgraph "Client Applications"
    WEB[Web Trading Terminal]
    MOBILE[Mobile App]
    API_CLIENT[API Client]
end

subgraph "OKD Finance Trading Layer"
    TRADING_API[Trading API]
    ORDER_MGMT[Order Management]
    RISK_MGMT[Risk Management]
    PORTFOLIO[Portfolio Service]
end

subgraph "Market Data"
    PRICE_FEED[Price Feed]
    ORDERBOOK[Order Book]
    TRADES[Trade History]
end

subgraph "External Exchange"
    BYBIT[Bybit Exchange]
    BYBIT_WS[Bybit WebSocket]
end

WEB --> TRADING_API
MOBILE --> TRADING_API
API_CLIENT --> TRADING_API

TRADING_API --> ORDER_MGMT
TRADING_API --> RISK_MGMT
TRADING_API --> PORTFOLIO

ORDER_MGMT --> BYBIT
PRICE_FEED --> BYBIT_WS
ORDERBOOK --> BYBIT_WS
TRADES --> BYBIT_WS
```

## Торговые пары

### Spot торговля
```
BTC/USDT, ETH/USDT, BNB/USDT, ADA/USDT, DOT/USDT,
SOL/USDT, MATIC/USDT, DOGE/USDT, SHIB/USDT, AVAX/USDT
```

### Futures торговля
```
BNBETH Perpetual, ETHUSDT Perpetual, ADAUSDT Perpetual,
SOLUSDT Perpetual, MATICUSDT Perpetual, DOGEUSDT Perpetual
```

## Типы ордеров

### Market Orders
```json
{
  "symbol": "BNBETH",
  "side": "Buy",
  "orderType": "Market",
  "qty": "0.001"
}
```

### Limit Orders
```json
{
  "symbol": "BNBETH", 
  "side": "Buy",
  "orderType": "Limit",
  "qty": "0.001",
  "price": "45000"
}
```

### Stop Loss Orders
```json
{
  "symbol": "BNBETH",
  "side": "Sell", 
  "orderType": "StopLoss",
  "qty": "0.001",
  "stopPrice": "44000"
}
```

### Take Profit Orders
```json
{
  "symbol": "BNBETH",
  "side": "Sell",
  "orderType": "TakeProfit", 
  "qty": "0.001",
  "stopPrice": "46000"
}
```

## Управление рисками

### Позиционные лимиты
- Максимальный размер позиции по инструменту
- Общий лимит открытых позиций
- Лимиты по типам активов

### Stop Loss стратегии
- Фиксированный процент от входа
- Trailing stop loss
- Волатильность-based stop loss

### Лимиты плеча
| Категория пользователя | Максимальное плечо |
|----------------------|-------------------|
| Новый пользователь | 5x |
| Верифицированный | 20x |
| VIP пользователь | 100x |

## Real-time данные

### WebSocket подключения
```javascript
const ws = new WebSocket('wss://api.okd.finance/ws/trading');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch(data.type) {
    case 'price_update':
      updatePrice(data.symbol, data.price);
      break;
    case 'order_update':
      updateOrder(data.orderId, data.status);
      break;
    case 'position_update':
      updatePosition(data.symbol, data.position);
      break;
  }
};
```

### Типы подписок
- **Prices** - обновления цен
- **OrderBook** - книга ордеров
- **Trades** - исполненные сделки
- **Orders** - статусы ордеров
- **Positions** - позиции пользователя

## Комиссии

### Spot торговля
| Объем торгов (30 дней) | Maker | Taker |
|----------------------|-------|-------|
| < $10,000 | 0.1% | 0.1% |
| $10,000 - $100,000 | 0.08% | 0.1% |
| $100,000 - $1,000,000 | 0.06% | 0.08% |
| > $1,000,000 | 0.04% | 0.06% |

### Futures торговля
| Объем торгов (30 дней) | Maker | Taker |
|----------------------|-------|-------|
| < $50,000 | 0.02% | 0.06% |
| $50,000 - $500,000 | 0.01% | 0.05% |
| $500,000 - $5,000,000 | 0.005% | 0.04% |
| > $5,000,000 | 0.002% | 0.03% |

## Лимиты API

### Rate Limits
| Endpoint Category | Requests per second |
|------------------|-------------------|
| Market Data | 100 |
| Trading | 50 |
| Account | 20 |
| WebSocket | 10 connections |

### Order Limits
- Максимум 200 активных ордеров на инструмент
- Максимум 1000 ордеров в день
- Минимальный размер ордера: $1

## Интеграция с Bybit

### Синхронизация ордеров
- Все ордера автоматически размещаются на Bybit
- Real-time синхронизация статусов
- Автоматическое восстановление соединения

### Управление API ключами
```json
{
  "bybitApiKey": "your_api_key",
  "bybitSecret": "your_secret",
  "permissions": ["read", "trade"],
  "environment": "mainnet"
}
```

## Быстрый старт

### 1. Получение доступа
```bash
curl -X POST "https://develop.okd.finance/api/trading/enable" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

### 2. Настройка Bybit API
```bash
curl -X POST "https://develop.okd.finance/api/trading/bybit/setup" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "your_bybit_api_key",
    "apiSecret": "your_bybit_secret"
  }'
```

### 3. Первый ордер
```bash
curl -X POST "https://develop.okd.finance/api/trading/orders" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BNBETH",
    "side": "Buy",
    "orderType": "Market",
    "qty": "0.001"
  }'
```

## Поддержка

- 📧 **Email:** trading-support@okd.finance
- 💬 **Telegram:** @okd_finance_support
- 📚 **Документация:** [docs.okd.finance](https://docs.okd.finance)
- 🔧 **API Status:** [status.okd.finance](https://status.okd.finance) 