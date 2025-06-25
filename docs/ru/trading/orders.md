# Торговые ордера

## Обзор

Система управления ордерами в OKD Finance предоставляет полный набор инструментов для размещения, отслеживания и управления торговыми поручениями на различных биржах.

## Типы ордеров

### Market Orders (Рыночные ордера)
Исполняются немедленно по текущей рыночной цене:

```javascript
const marketOrder = await okdFinance.createOrder('bybit', {
  symbol: 'BNBETH',
  type: 'market',
  side: 'buy',
  amount: 0.1
});
```

### Limit Orders (Лимитные ордера)
Исполняются только при достижении указанной цены:

```javascript
const limitOrder = await okdFinance.createOrder('binance', {
  symbol: 'ETHUSDT',
  type: 'limit',
  side: 'sell',
  amount: 1.0,
  price: 3500
});
```

### Stop Orders (Стоп-ордера)
Активируются при достижении стоп-цены:

```javascript
const stopOrder = await okdFinance.createOrder('okx', {
  symbol: 'BNBETH',
  type: 'stop',
  side: 'sell',
  amount: 0.5,
  stopPrice: 44000,
  price: 43900 // лимитная цена после активации
});
```

### Stop-Limit Orders
Комбинация стоп и лимитного ордера:

```javascript
const stopLimitOrder = await okdFinance.createOrder('bybit', {
  symbol: 'ADAUSDT',
  type: 'stop_limit',
  side: 'buy',
  amount: 1000,
  stopPrice: 0.52,
  price: 0.525
});
```

## Расширенные типы ордеров

### OCO (One-Cancels-Other)
Два связанных ордера, при исполнении одного второй отменяется:

```javascript
const ocoOrder = await okdFinance.createOCOOrder('binance', {
  symbol: 'BNBETH',
  side: 'sell',
  amount: 0.1,
  price: 46000, // лимитная цена
  stopPrice: 44000, // стоп-цена
  stopLimitPrice: 43900 // лимитная цена стоп-ордера
});
```

### Iceberg Orders
Скрытие большого объема путем показа только части:

```javascript
const icebergOrder = await okdFinance.createOrder('bybit', {
  symbol: 'ETHUSDT',
  type: 'limit',
  side: 'buy',
  amount: 10.0,
  price: 3400,
  icebergQty: 1.0 // показывать только 1 ETH
});
```

### Trailing Stop Orders
Стоп-ордер, следующий за ценой на заданном расстоянии:

```javascript
const trailingStop = await okdFinance.createOrder('okx', {
  symbol: 'BNBETH',
  type: 'trailing_stop',
  side: 'sell',
  amount: 0.2,
  callbackRate: 0.02 // 2% от максимальной цены
});
```

## Параметры времени исполнения

### Good Till Canceled (GTC)
Ордер действует до отмены:

```javascript
const gtcOrder = await okdFinance.createOrder('binance', {
  symbol: 'BNBETH',
  type: 'limit',
  side: 'buy',
  amount: 0.1,
  price: 44000,
  timeInForce: 'GTC'
});
```

### Immediate or Cancel (IOC)
Исполнить немедленно или отменить:

```javascript
const iocOrder = await okdFinance.createOrder('bybit', {
  symbol: 'ETHUSDT',
  type: 'limit',
  side: 'sell',
  amount: 2.0,
  price: 3500,
  timeInForce: 'IOC'
});
```

### Fill or Kill (FOK)
Исполнить полностью или отменить:

```javascript
const fokOrder = await okdFinance.createOrder('okx', {
  symbol: 'ADAUSDT',
  type: 'limit',
  side: 'buy',
  amount: 5000,
  price: 0.50,
  timeInForce: 'FOK'
});
```

## Управление ордерами

### Получение информации об ордере

```javascript
// По ID ордера
const order = await okdFinance.getOrder('binance', 'order_id_123');

// Все активные ордера
const activeOrders = await okdFinance.getActiveOrders('bybit');

// История ордеров
const orderHistory = await okdFinance.getOrderHistory('okx', {
  symbol: 'BNBETH',
  limit: 100,
  from: Date.now() - 86400000 // последние 24 часа
});
```

### Отмена ордеров

```javascript
// Отмена одного ордера
await okdFinance.cancelOrder('binance', 'order_id_123');

// Отмена всех ордеров по символу
await okdFinance.cancelAllOrders('bybit', 'BNBETH');

// Отмена всех ордеров на бирже
await okdFinance.cancelAllOrders('okx');
```

### Изменение ордеров

```javascript
// Изменение цены и количества
const modifiedOrder = await okdFinance.modifyOrder('binance', 'order_id_123', {
  price: 45000,
  amount: 0.15
});

// Изменение только цены
await okdFinance.modifyOrderPrice('bybit', 'order_id_456', 3600);
```

## Условные ордера

### Ордера по времени

```javascript
const scheduledOrder = await okdFinance.createScheduledOrder('binance', {
  symbol: 'BNBETH',
  type: 'market',
  side: 'buy',
  amount: 0.1,
  executeAt: Date.now() + 3600000 // через час
});
```

### Ордера по индикаторам

```javascript
const indicatorOrder = await okdFinance.createConditionalOrder('bybit', {
  symbol: 'ETHUSDT',
  type: 'market',
  side: 'buy',
  amount: 1.0,
  condition: {
    indicator: 'RSI',
    period: 14,
    operator: '<',
    value: 30
  }
});
```

### Ордера по событиям

```javascript
const eventOrder = await okdFinance.createEventOrder('okx', {
  symbol: 'BNBETH',
  type: 'limit',
  side: 'sell',
  amount: 0.5,
  price: 50000,
  trigger: {
    type: 'news',
    keywords: ['Bitcoin', 'regulation'],
    sentiment: 'negative'
  }
});
```

## Алгоритмические ордера

### DCA (Dollar Cost Averaging)

```javascript
const dcaOrder = await okdFinance.createDCAOrder('binance', {
  symbol: 'BNBETH',
  side: 'buy',
  totalAmount: 1000, // $1000 общая сумма
  frequency: 'daily',
  duration: 30, // 30 дней
  priceDeviation: 0.05 // 5% отклонение от средней цены
});
```

### Grid Trading

```javascript
const gridOrder = await okdFinance.createGridOrder('bybit', {
  symbol: 'ETHUSDT',
  upperPrice: 4000,
  lowerPrice: 3000,
  gridNumber: 10,
  investment: 5000,
  mode: 'arithmetic' // arithmetic или geometric
});
```

### Smart Order Routing

```javascript
const smartOrder = await okdFinance.createSmartOrder('multi', {
  symbol: 'BNBETH',
  type: 'market',
  side: 'buy',
  amount: 5.0,
  exchanges: ['binance', 'bybit', 'okx'],
  strategy: 'best_price' // best_price, liquidity, speed
});
```

## Мониторинг и уведомления

### Подписка на обновления ордеров

```javascript
// WebSocket подписка
const ws = okdFinance.createWebSocket('binance');
ws.subscribe('orders');

ws.on('orderUpdate', (data) => {
  console.log('Обновление ордера:', data);
  // {
  //   orderId: 'abc123',
  //   status: 'filled',
  //   executedQty: 0.1,
  //   price: 45000,
  //   fee: 0.045
  // }
});
```

### Уведомления

```javascript
// Настройка уведомлений
await okdFinance.setNotifications({
  orderFilled: {
    email: true,
    telegram: true,
    webhook: 'https://your-webhook.com/orders'
  },
  orderCanceled: {
    email: false,
    telegram: true
  }
});
```

## Анализ исполнения

### Метрики производительности

```javascript
const metrics = await okdFinance.getOrderMetrics('binance', {
  period: '24h',
  symbols: ['BNBETH', 'ETHUSDT']
});

console.log(metrics);
// {
//   totalOrders: 45,
//   fillRate: 0.89,
//   averageFillTime: 12.5,
//   slippage: 0.03,
//   fees: 15.67
// }
```

### Сравнительный анализ

```javascript
const comparison = await okdFinance.compareExchanges({
  symbol: 'BNBETH',
  orderType: 'market',
  amount: 1.0,
  exchanges: ['binance', 'bybit', 'okx'],
  metrics: ['price', 'fees', 'speed', 'slippage']
});
```

## Управление рисками

### Автоматические стоп-лоссы

```javascript
const orderWithSL = await okdFinance.createOrder('bybit', {
  symbol: 'BNBETH',
  type: 'market',
  side: 'buy',
  amount: 0.1,
  stopLoss: {
    type: 'percentage',
    value: 0.05 // 5% стоп-лосс
  },
  takeProfit: {
    type: 'percentage',
    value: 0.10 // 10% тейк-профит
  }
});
```

### Лимиты позиций

```javascript
// Установка лимитов
await okdFinance.setPositionLimits('binance', {
  maxPositionSize: 10.0,
  maxDailyLoss: 1000,
  maxOrderSize: 2.0,
  symbols: ['BNBETH', 'ETHUSDT']
});
```

## Бэктестинг стратегий

### Тестирование ордеров

```javascript
const backtest = await okdFinance.backtestOrderStrategy({
  strategy: 'grid_trading',
  symbol: 'BNBETH',
  period: {
    from: '2023-01-01',
    to: '2023-12-31'
  },
  parameters: {
    upperPrice: 50000,
    lowerPrice: 30000,
    gridNumber: 20,
    investment: 10000
  }
});

console.log(backtest.results);
// {
//   totalReturn: 0.15,
//   maxDrawdown: 0.08,
//   sharpeRatio: 1.2,
//   winRate: 0.67
// }
```
