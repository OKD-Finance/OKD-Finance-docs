# Управление ордерами

Система управления ордерами OKD Finance предоставляет полный контроль над торговыми операциями с расширенными возможностями автоматизации.

## Типы ордеров

### Рыночные ордера (Market Orders)

Исполняются немедленно по лучшей доступной цене на рынке.

```javascript
const marketOrder = await okdFinance.createOrder({
  symbol: 'BNBETH',
  side: 'buy',
  type: 'market',
  quantity: 0.001
});
```

**Особенности:**
- Мгновенное исполнение
- Нет гарантии точной цены
- Подходит для быстрого входа/выхода

### Лимитные ордера (Limit Orders)

Исполняются только при достижении указанной цены или лучше.

```javascript
const limitOrder = await okdFinance.createOrder({
  symbol: 'BNBETH',
  side: 'buy',
  type: 'limit',
  quantity: 0.001,
  price: 45000,
  timeInForce: 'GTC'
});
```

**Параметры времени действия:**
- **GTC** (Good Till Canceled) - до отмены
- **IOC** (Immediate or Cancel) - исполнить немедленно или отменить
- **FOK** (Fill or Kill) - исполнить полностью или отменить

### Стоп-ордера (Stop Orders)

#### Stop Loss
Автоматическое закрытие позиции при убытке.

```javascript
const stopLoss = await okdFinance.createOrder({
  symbol: 'BNBETH',
  side: 'sell',
  type: 'stop_loss',
  quantity: 0.001,
  stopPrice: 44000
});
```

#### Take Profit
Автоматическое закрытие позиции при прибыли.

```javascript
const takeProfit = await okdFinance.createOrder({
  symbol: 'BNBETH',
  side: 'sell',
  type: 'take_profit',
  quantity: 0.001,
  stopPrice: 46000
});
```

### OCO ордера (One-Cancels-Other)

Комбинация стоп-лосс и тейк-профит ордеров.

```javascript
const ocoOrder = await okdFinance.createOCOOrder({
  symbol: 'BNBETH',
  side: 'sell',
  quantity: 0.001,
  price: 46000, // take profit
  stopPrice: 44000, // stop loss
  stopLimitPrice: 43900
});
```

## Расширенные типы ордеров

### Trailing Stop
Автоматически следует за ценой на заданном расстоянии.

```javascript
const trailingStop = await okdFinance.createOrder({
  symbol: 'BNBETH',
  side: 'sell',
  type: 'trailing_stop',
  quantity: 0.001,
  callbackRate: 1.0 // 1% от пиковой цены
});
```

### Iceberg Orders
Скрывает реальный размер ордера, показывая только часть.

```javascript
const icebergOrder = await okdFinance.createOrder({
  symbol: 'BNBETH',
  side: 'buy',
  type: 'limit',
  quantity: 1.0,
  price: 45000,
  icebergQty: 0.1 // показывать только 0.1 BTC
});
```

## Управление ордерами

### Просмотр активных ордеров

```javascript
const openOrders = await okdFinance.getOpenOrders({
  symbol: 'BNBETH' // опционально, для конкретной пары
});

console.log(openOrders);
```

### Отмена ордера

```javascript
// Отмена по ID
const cancelResult = await okdFinance.cancelOrder({
  symbol: 'BNBETH',
  orderId: '12345'
});

// Отмена всех ордеров по символу
const cancelAllResult = await okdFinance.cancelAllOrders({
  symbol: 'BNBETH'
});
```

### Изменение ордера

```javascript
const modifyResult = await okdFinance.modifyOrder({
  orderId: '12345',
  quantity: 0.002, // новое количество
  price: 45500 // новая цена
});
```

## История ордеров

### Получение истории

```javascript
const orderHistory = await okdFinance.getOrderHistory({
  symbol: 'BNBETH',
  status: 'filled', // 'new', 'filled', 'canceled', 'rejected'
  limit: 100,
  startTime: Date.now() - 86400000, // последние 24 часа
  endTime: Date.now()
});
```

### Детали исполнения

```javascript
const tradeHistory = await okdFinance.getMyTrades({
  symbol: 'BNBETH',
  orderId: '12345',
  limit: 50
});
```

## Условные ордера

### Ордера по времени

```javascript
const scheduledOrder = await okdFinance.createScheduledOrder({
  symbol: 'BNBETH',
  side: 'buy',
  type: 'market',
  quantity: 0.001,
  executeAt: Date.now() + 3600000 // через час
});
```

### Ордера по цене другого актива

```javascript
const conditionalOrder = await okdFinance.createConditionalOrder({
  symbol: 'ETHUSDT',
  side: 'buy',
  type: 'market',
  quantity: 0.1,
  condition: {
    symbol: 'BNBETH',
    operator: 'gte', // >=
    price: 50000
  }
});
```

## Алгоритмические ордера

### TWAP (Time Weighted Average Price)

```javascript
const twapOrder = await okdFinance.createTWAPOrder({
  symbol: 'BNBETH',
  side: 'buy',
  totalQuantity: 1.0,
  duration: 3600, // секунд
  intervals: 12 // разделить на 12 частей
});
```

### VWAP (Volume Weighted Average Price)

```javascript
const vwapOrder = await okdFinance.createVWAPOrder({
  symbol: 'BNBETH',
  side: 'buy',
  totalQuantity: 1.0,
  maxParticipationRate: 0.1 // не более 10% от объема рынка
});
```

## Массовые операции

### Создание множественных ордеров

```javascript
const batchOrders = await okdFinance.createBatchOrders([
  {
    symbol: 'BNBETH',
    side: 'buy',
    type: 'limit',
    quantity: 0.001,
    price: 44000
  },
  {
    symbol: 'ETHUSDT',
    side: 'buy',
    type: 'limit',
    quantity: 0.1,
    price: 3000
  }
]);
```

### Отмена множественных ордеров

```javascript
const cancelBatch = await okdFinance.cancelBatchOrders([
  { symbol: 'BNBETH', orderId: '12345' },
  { symbol: 'ETHUSDT', orderId: '67890' }
]);
```

## Мониторинг и уведомления

### Подписка на обновления ордеров

```javascript
const orderStream = okdFinance.subscribeToOrderUpdates();

orderStream.on('orderUpdate', (data) => {
  console.log('Order update:', data);
  // data содержит: orderId, symbol, status, executedQty, etc.
});
```

### Webhook уведомления

```javascript
const webhook = await okdFinance.setOrderWebhook({
  url: 'https://your-server.com/order-webhook',
  events: ['order.filled', 'order.canceled', 'order.rejected']
});
```

## Анализ исполнения

### Статистика ордеров

```javascript
const orderStats = await okdFinance.getOrderStatistics({
  symbol: 'BNBETH',
  period: '7d'
});

console.log('Fill rate:', orderStats.fillRate);
console.log('Average fill time:', orderStats.avgFillTime);
console.log('Slippage:', orderStats.avgSlippage);
```

### Отчет по исполнению

```javascript
const executionReport = await okdFinance.getExecutionReport({
  orderId: '12345'
});

console.log('Execution details:', executionReport);
// Включает: время исполнения, цены, комиссии, проскальзывание
```

## Лимиты и ограничения

### Лимиты по ордерам

| Тип аккаунта | Макс. открытых ордеров | Макс. ордеров в день |
|--------------|----------------------|-------------------|
| Базовый | 200 | 10,000 |
| VIP 1 | 500 | 50,000 |
| VIP 2+ | 1,000 | 100,000 |

### Минимальные размеры

| Символ | Мин. количество | Мин. стоимость |
|--------|----------------|----------------|
| BNBETH | 0.00001 BTC | 10 USDT |
| ETHUSDT | 0.001 ETH | 10 USDT |
| BNBUSDT | 0.01 BNB | 10 USDT |

## Комиссии

### Структура комиссий

| Уровень | 30-дневный объем | Maker | Taker |
|---------|------------------|-------|-------|
| VIP 0 | < 50 BTC | 0.1% | 0.1% |
| VIP 1 | 50-250 BTC | 0.09% | 0.1% |
| VIP 2 | 250-1000 BTC | 0.08% | 0.1% |
| VIP 3+ | > 1000 BTC | 0.06% | 0.08% |

### Скидки

- **BNB для оплаты комиссий**: -25%
- **Высокочастотная торговля**: до -50%
- **Market Making программа**: до -80%
