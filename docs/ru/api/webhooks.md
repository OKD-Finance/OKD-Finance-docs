# API Webhooks

API для настройки и управления webhook уведомлениями в системе OKD Finance.

## Обзор Webhooks

Webhooks позволяют получать HTTP уведомления в реальном времени о событиях в вашем аккаунте:
- Исполнение и отмена ордеров
- Изменения баланса и позиций
- Депозиты и выводы
- Изменения статуса KYC
- Системные уведомления

## Создание Webhook

### Регистрация нового webhook

```http
POST /api/v1/webhooks
``` -->

```javascript
const webhook = await okdFinance.createWebhook({
  url: 'https://your-domain.com/webhook',
  events: [
    'order.filled',
    'order.canceled',
    'balance.changed',
    'deposit.confirmed',
    'withdrawal.completed'
  ],
  secret: 'your-webhook-secret',
  active: true,
  description: 'Main trading webhook'
});
``` -->

**Параметры запроса:**
```json
{
  "url": "https://your-domain.com/webhook",
  "events": [
    "order.filled",
    "order.canceled",
    "balance.changed"
  ],
  "secret": "your-webhook-secret",
  "active": true,
  "description": "Trading notifications",
  "headers": {
    "Authorization": "Bearer your-token",
    "X-Custom-Header": "value"
  },
  "retryPolicy": {
    "maxRetries": 3,
    "retryDelay": 1000
  }
}
``` -->

**Ответ:**
```json
{
  "webhookId": "wh_12345",
  "url": "https://your-domain.com/webhook",
  "events": [
    "order.filled",
    "order.canceled",
    "balance.changed"
  ],
  "secret": "your-webhook-secret",
  "active": true,
  "description": "Trading notifications",
  "createdAt": "2024-12-20T10:30:00Z",
  "lastTriggered": null,
  "deliveryStats": {
    "totalSent": 0,
    "successful": 0,
    "failed": 0,
    "successRate": 0
  }
}
``` -->

## Управление Webhooks

### Получение списка webhooks

```http
GET /api/v1/webhooks
``` -->

```javascript
const webhooks = await okdFinance.getWebhooks({
  active: true,
  limit: 50
});
``` -->

### Получение информации о webhook

```http
GET /api/v1/webhooks/{webhookId}
``` -->

```javascript
const webhook = await okdFinance.getWebhook('wh_12345');
console.log(webhook);
``` -->

### Обновление webhook

```http
PUT /api/v1/webhooks/{webhookId}
``` -->

```javascript
const updatedWebhook = await okdFinance.updateWebhook('wh_12345', {
  events: [
    'order.filled',
    'order.canceled',
    'balance.changed',
    'position.opened',
    'position.closed'
  ],
  active: true
});
``` -->

### Удаление webhook

```http
DELETE /api/v1/webhooks/{webhookId}
``` -->

```javascript
const result = await okdFinance.deleteWebhook('wh_12345');
``` -->

## Типы событий

### Торговые события

#### order.filled
Ордер исполнен (полностью или частично)

```json
{
  "event": "order.filled",
  "data": {
    "orderId": "12345",
    "clientOrderId": "my_order_123",
    "symbol": "BTCUSDT",
    "side": "buy",
    "type": "limit",
    "quantity": "0.001",
    "price": "45000.00",
    "executedQuantity": "0.001",
    "executedPrice": "45000.00",
    "commission": "0.045",
    "commissionAsset": "USDT",
    "status": "filled",
    "timestamp": 1703001600000
  },
  "timestamp": 1703001600000,
  "userId": "user_123"
}
``` -->

#### order.canceled
Ордер отменен

```json
{
  "event": "order.canceled",
  "data": {
    "orderId": "12345",
    "clientOrderId": "my_order_123",
    "symbol": "BTCUSDT",
    "side": "buy",
    "type": "limit",
    "quantity": "0.001",
    "price": "45000.00",
    "executedQuantity": "0.0",
    "status": "canceled",
    "cancelReason": "user_request",
    "timestamp": 1703001600000
  },
  "timestamp": 1703001600000,
  "userId": "user_123"
}
``` -->

### События кошелька

#### balance.changed
Изменение баланса

```json
{
  "event": "balance.changed",
  "data": {
    "asset": "BTC",
    "walletType": "spot",
    "availableBalance": "1.5",
    "lockedBalance": "0.1",
    "totalBalance": "1.6",
    "changeAmount": "0.001",
    "changeType": "deposit",
    "transactionId": "tx_456",
    "timestamp": 1703001600000
  },
  "timestamp": 1703001600000,
  "userId": "user_123"
}
``` -->

#### deposit.confirmed
Депозит подтвержден

```json
{
  "event": "deposit.confirmed",
  "data": {
    "depositId": "dep_789",
    "asset": "BTC",
    "amount": "0.001",
    "network": "BTC",
    "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "txHash": "a1b2c3d4e5f6...",
    "confirmations": 6,
    "status": "completed",
    "timestamp": 1703001600000
  },
  "timestamp": 1703001600000,
  "userId": "user_123"
}
``` -->

#### withdrawal.completed
Вывод завершен

```json
{
  "event": "withdrawal.completed",
  "data": {
    "withdrawId": "wd_101",
    "asset": "BTC",
    "amount": "0.1",
    "fee": "0.0005",
    "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "network": "BTC",
    "txHash": "b2c3d4e5f6g7...",
    "status": "completed",
    "timestamp": 1703001600000
  },
  "timestamp": 1703001600000,
  "userId": "user_123"
}
``` -->

### События позиций

#### position.opened
Позиция открыта

```json
{
  "event": "position.opened",
  "data": {
    "positionId": "pos_202",
    "symbol": "BTCUSDT",
    "side": "long",
    "size": "0.5",
    "entryPrice": "45000.00",
    "leverage": "10x",
    "margin": "2250.00",
    "timestamp": 1703001600000
  },
  "timestamp": 1703001600000,
  "userId": "user_123"
}
``` -->

#### position.closed
Позиция закрыта

```json
{
  "event": "position.closed",
  "data": {
    "positionId": "pos_202",
    "symbol": "BTCUSDT",
    "side": "long",
    "size": "0.5",
    "entryPrice": "45000.00",
    "exitPrice": "47000.00",
    "realizedPnL": "1000.00",
    "commission": "4.7",
    "timestamp": 1703001600000
  },
  "timestamp": 1703001600000,
  "userId": "user_123"
}
``` -->

## Безопасность

### Проверка подписи

Каждый webhook содержит подпись в заголовке `X-OKD-Signature`:

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === `sha256=${expectedSignature}`;
}

// Использование в Express.js
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-okd-signature'];
  const payload = req.body;
  
  if (!verifyWebhookSignature(payload, signature, WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Обработка webhook
  const data = JSON.parse(payload);
  handleWebhook(data);
  
  res.status(200).send('OK');
});
``` -->

### IP Whitelist

```http
PUT /api/v1/webhooks/{webhookId}/ip-whitelist
``` -->

```javascript
const ipWhitelist = await okdFinance.updateWebhookIPWhitelist('wh_12345', {
  ips: [
    '192.168.1.100',
    '10.0.0.0/8',
    '2001:db8::/32'
  ]
});
``` -->

## Тестирование Webhooks

### Тестовая отправка

```http
POST /api/v1/webhooks/{webhookId}/test
``` -->

```javascript
const testResult = await okdFinance.testWebhook('wh_12345', {
  event: 'order.filled',
  testData: {
    orderId: 'test_123',
    symbol: 'BTCUSDT',
    side: 'buy',
    quantity: '0.001',
    price: '45000.00'
  }
});
``` -->

**Ответ:**
```json
{
  "success": true,
  "responseCode": 200,
  "responseTime": 150,
  "responseBody": "OK",
  "timestamp": 1703001600000
}
``` -->

### Проверка доставки

```http
GET /api/v1/webhooks/{webhookId}/deliveries
``` -->

```javascript
const deliveries = await okdFinance.getWebhookDeliveries('wh_12345', {
  limit: 100,
  status: 'failed' // 'success', 'failed', 'pending'
});
``` -->

**Ответ:**
```json
[
  {
    "deliveryId": "del_456",
    "event": "order.filled",
    "status": "success",
    "responseCode": 200,
    "responseTime": 120,
    "attempts": 1,
    "timestamp": 1703001600000,
    "nextRetry": null
  },
  {
    "deliveryId": "del_457",
    "event": "balance.changed",
    "status": "failed",
    "responseCode": 500,
    "responseTime": 5000,
    "attempts": 3,
    "timestamp": 1703001500000,
    "nextRetry": 1703001800000,
    "error": "Connection timeout"
  }
]
``` -->

### Повторная отправка

```http
POST /api/v1/webhooks/deliveries/{deliveryId}/retry
``` -->

```javascript
const retryResult = await okdFinance.retryWebhookDelivery('del_457');
``` -->

## Мониторинг и статистика

### Статистика webhook

```http
GET /api/v1/webhooks/{webhookId}/stats
``` -->

```javascript
const stats = await okdFinance.getWebhookStats('wh_12345', {
  period: '7d' // '1h', '24h', '7d', '30d'
});
``` -->

**Ответ:**
```json
{
  "period": "7d",
  "totalEvents": 1250,
  "successfulDeliveries": 1200,
  "failedDeliveries": 50,
  "successRate": 96.0,
  "averageResponseTime": 180,
  "eventBreakdown": {
    "order.filled": 800,
    "order.canceled": 150,
    "balance.changed": 200,
    "deposit.confirmed": 50,
    "withdrawal.completed": 50
  },
  "responseCodeBreakdown": {
    "200": 1200,
    "500": 30,
    "timeout": 20
  }
}
``` -->

### Настройка алертов

```http
POST /api/v1/webhooks/{webhookId}/alerts
``` -->

```javascript
const alerts = await okdFinance.setupWebhookAlerts('wh_12345', {
  failureThreshold: 5, // алерт после 5 неудачных попыток
  responseTimeThreshold: 5000, // алерт если время ответа > 5 сек
  successRateThreshold: 90, // алерт если успешность < 90%
  notificationMethods: ['email', 'sms'],
  recipients: ['admin@example.com']
});
``` -->

## Фильтрация событий

### Условная отправка

```http
PUT /api/v1/webhooks/{webhookId}/filters
``` -->

```javascript
const filters = await okdFinance.setWebhookFilters('wh_12345', {
  conditions: [
    {
      event: 'order.filled',
      filters: {
        'data.symbol': ['BTCUSDT', 'ETHUSDT'],
        'data.executedQuantity': { '$gte': '0.001' }
      }
    },
    {
      event: 'balance.changed',
      filters: {
        'data.changeAmount': { '$gte': '100.0' },
        'data.asset': { '$ne': 'USDT' }
      }
    }
  ]
});
``` -->

### Группировка событий

```http
PUT /api/v1/webhooks/{webhookId}/batching
``` -->

```javascript
const batching = await okdFinance.setupWebhookBatching('wh_12345', {
  enabled: true,
  maxBatchSize: 10,
  maxWaitTime: 5000, // 5 секунд
  events: ['balance.changed'] // только для определенных событий
});
``` -->

## Отладка и логирование

### Включение подробного логирования

```http
PUT /api/v1/webhooks/{webhookId}/debug
``` -->

```javascript
const debugMode = await okdFinance.enableWebhookDebug('wh_12345', {
  enabled: true,
  logHeaders: true,
  logBody: true,
  logResponse: true,
  duration: 3600 // 1 час
});
``` -->

### Получение логов

```http
GET /api/v1/webhooks/{webhookId}/logs
``` -->

```javascript
const logs = await okdFinance.getWebhookLogs('wh_12345', {
  level: 'error', // 'debug', 'info', 'warn', 'error'
  limit: 100,
  startTime: Date.now() - 3600000 // последний час
});
``` -->

## Лимиты и ограничения

### Лимиты webhook

| Параметр | Лимит |
|----------|-------|
| Максимальное количество webhooks | 10 |
| Максимальное количество событий на webhook | 20 |
| Максимальный размер payload | 1 MB |
| Timeout ответа | 30 секунд |
| Максимальное количество попыток | 5 |
| Частота отправки | 1000 событий/минуту |

### Обработка лимитов

```javascript
okdFinance.on('webhook.rate_limit', (data) => {
  console.log('Достигнут лимит webhook:', data);
  // Временно отключить webhook или уменьшить частоту
});

okdFinance.on('webhook.quota_exceeded', (data) => {
  console.log('Превышена квота webhook:', data);
  // Обновить план или оптимизировать использование
});
``` -->

## Примеры интеграции

### Express.js сервер

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use('/webhook', express.raw({type: 'application/json'}));

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-okd-signature'];
  const payload = req.body;
  
  // Проверка подписи
  if (!verifySignature(payload, signature)) {
    return res.status(401).send('Unauthorized');
  }
  
  const data = JSON.parse(payload);
  
  // Обработка события
  switch (data.event) {
    case 'order.filled':
      handleOrderFilled(data.data);
      break;
    case 'balance.changed':
      handleBalanceChanged(data.data);
      break;
    default:
      console.log('Unknown event:', data.event);
  }
  
  res.status(200).send('OK');
});

function verifySignature(payload, signature) {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  return signature === `sha256=${expectedSignature}`;
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
``` -->
