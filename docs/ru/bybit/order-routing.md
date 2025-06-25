# Маршрутизация ордеров Bybit

## Обзор

Система маршрутизации ордеров в OKD Finance для Bybit обеспечивает оптимальное исполнение торговых поручений с учетом рыночных условий, ликвидности и стратегических целей трейдера.

## Типы маршрутизации

### Прямая маршрутизация
Ордера отправляются напрямую на Bybit без дополнительной обработки:

```javascript
const order = await okdFinance.createOrder('bybit', {
  symbol: 'BNBETH',
  type: 'limit',
  side: 'buy',
  amount: 0.1,
  price: 45000,
  routing: 'direct'
});
```

### Умная маршрутизация
Система автоматически выбирает оптимальный способ исполнения:

```javascript
const order = await okdFinance.createOrder('bybit', {
  symbol: 'BNBETH',
  type: 'market',
  side: 'buy',
  amount: 1.0,
  routing: 'smart',
  maxSlippage: 0.1 // максимальное проскальзывание 0.1%
});
```

### Алгоритмическая маршрутизация
Использование специальных алгоритмов для крупных ордеров:

```javascript
const order = await okdFinance.createOrder('bybit', {
  symbol: 'BNBETH',
  type: 'market',
  side: 'buy',
  amount: 10.0,
  routing: 'algorithmic',
  algorithm: 'TWAP', // Time-Weighted Average Price
  duration: 3600000 // 1 час
});
```

## Алгоритмы исполнения

### TWAP (Time-Weighted Average Price)
Равномерное распределение ордера во времени:

```javascript
const twapOrder = await okdFinance.createAlgorithmicOrder('bybit', {
  symbol: 'BNBETH',
  side: 'buy',
  amount: 5.0,
  algorithm: 'TWAP',
  params: {
    duration: 1800000, // 30 минут
    intervals: 30, // 30 интервалов
    randomization: 0.1 // 10% рандомизации
  }
});
```

### VWAP (Volume-Weighted Average Price)
Исполнение с учетом исторических объемов:

```javascript
const vwapOrder = await okdFinance.createAlgorithmicOrder('bybit', {
  symbol: 'BNBETH',
  side: 'sell',
  amount: 3.0,
  algorithm: 'VWAP',
  params: {
    lookbackPeriod: 86400000, // 24 часа
    participationRate: 0.2, // 20% от среднего объема
    priceLimit: 44000 // лимит цены
  }
});
```

### Implementation Shortfall
Минимизация рыночного воздействия:

```javascript
const isOrder = await okdFinance.createAlgorithmicOrder('bybit', {
  symbol: 'ETHUSDT',
  side: 'buy',
  amount: 50.0,
  algorithm: 'IS',
  params: {
    riskAversion: 0.5, // коэффициент избежания риска
    maxParticipation: 0.3, // максимальное участие в объеме
    urgency: 'medium' // срочность: low, medium, high
  }
});
```

## Управление ликвидностью

### Анализ стакана заявок

```javascript
// Получение анализа ликвидности
const liquidityAnalysis = await okdFinance.analyzeLiquidity('bybit', 'BNBETH', {
  amount: 2.0,
  side: 'buy'
});

console.log(liquidityAnalysis);
// {
//   availableLiquidity: 1.8,
//   averagePrice: 45050,
//   priceImpact: 0.12,
//   slippage: 0.08,
//   recommendation: 'split_order'
// }
```

### Адаптивное исполнение

```javascript
const adaptiveOrder = await okdFinance.createOrder('bybit', {
  symbol: 'BNBETH',
  type: 'market',
  side: 'buy',
  amount: 2.0,
  routing: 'adaptive',
  params: {
    maxPriceImpact: 0.15,
    liquidityThreshold: 0.5,
    timeLimit: 300000 // 5 минут
  }
});
```

## Мониторинг исполнения

### Отслеживание прогресса

```javascript
// Подписка на обновления ордера
okdFinance.subscribeToOrder(order.id, (update) => {
  console.log('Обновление ордера:', update);
  // {
  //   orderId: 'abc123',
  //   status: 'partially_filled',
  //   filled: 0.3,
  //   remaining: 0.7,
  //   averagePrice: 45025,
  //   fees: 0.15
  // }
});
```

### Метрики исполнения

```javascript
// Получение детальных метрик
const metrics = await okdFinance.getExecutionMetrics(order.id);
console.log(metrics);
// {
//   slippage: 0.05,
//   priceImpact: 0.08,
//   timing: {
//     submitted: 1640995200000,
//     firstFill: 1640995205000,
//     completed: 1640995230000
//   },
//   efficiency: 0.92
// }
```

## Управление рисками

### Контроль проскальзывания

```javascript
const order = await okdFinance.createOrder('bybit', {
  symbol: 'BNBETH',
  type: 'market',
  side: 'buy',
  amount: 1.0,
  slippageControl: {
    maxSlippage: 0.1, // максимальное проскальзывание
    action: 'cancel' // действие при превышении: cancel, reduce, continue
  }
});
```

### Лимиты позиций

```javascript
// Установка лимитов для маршрутизации
await okdFinance.setRoutingLimits('bybit', {
  maxOrderSize: 10.0, // максимальный размер ордера
  maxDailyVolume: 100.0, // максимальный дневной объем
  maxPositionSize: 50.0, // максимальный размер позиции
  riskLimits: {
    maxDrawdown: 0.05, // максимальная просадка
    stopLoss: 0.02 // автоматический стоп-лосс
  }
});
```

## Оптимизация исполнения

### Тайминг ордеров

```javascript
// Анализ оптимального времени для исполнения
const timingAnalysis = await okdFinance.analyzeOptimalTiming('bybit', 'BNBETH', {
  amount: 1.0,
  side: 'buy',
  timeHorizon: 3600000 // 1 час
});

console.log(timingAnalysis);
// {
//   recommendedTime: 1640995800000,
//   expectedSlippage: 0.03,
//   liquidityForecast: 'high',
//   volatilityForecast: 'medium'
// }
```

### Фрагментация ордеров

```javascript
// Автоматическая фрагментация крупных ордеров
const fragmentedOrder = await okdFinance.createFragmentedOrder('bybit', {
  symbol: 'BNBETH',
  side: 'buy',
  amount: 5.0,
  fragmentation: {
    strategy: 'volume_based', // volume_based, time_based, random
    minFragmentSize: 0.1,
    maxFragmentSize: 0.5,
    intervalRange: [30000, 120000] // от 30 сек до 2 мин
  }
});
```

## Отчетность и аналитика

### Анализ эффективности

```javascript
// Получение отчета по исполнению за период
const report = await okdFinance.getExecutionReport('bybit', {
  from: Date.now() - 86400000, // последние 24 часа
  to: Date.now(),
  symbols: ['BNBETH', 'ETHUSDT']
});

console.log(report);
// {
//   totalOrders: 45,
//   averageSlippage: 0.04,
//   averageFillTime: 12.5,
//   successRate: 0.96,
//   costSavings: 0.02
// }
```

### Сравнительный анализ

```javascript
// Сравнение различных стратегий маршрутизации
const comparison = await okdFinance.compareRoutingStrategies('bybit', {
  strategies: ['direct', 'smart', 'TWAP'],
  symbol: 'BNBETH',
  period: 86400000,
  orderSizes: [0.1, 0.5, 1.0, 2.0]
});
```

## Настройка и конфигурация

### Профили маршрутизации

```javascript
// Создание пользовательского профиля
await okdFinance.createRoutingProfile('aggressive_scalping', {
  defaultRouting: 'direct',
  slippageTolerance: 0.05,
  speedPriority: 'high',
  costPriority: 'medium',
  rules: [
    {
      condition: 'orderSize > 1.0',
      action: 'use_smart_routing'
    },
    {
      condition: 'volatility > 0.02',
      action: 'increase_fragmentation'
    }
  ]
});

// Применение профиля
const order = await okdFinance.createOrder('bybit', {
  symbol: 'BNBETH',
  type: 'market',
  side: 'buy',
  amount: 0.5,
  routingProfile: 'aggressive_scalping'
});
```

### Автоматические правила

```javascript
// Настройка автоматических правил маршрутизации
await okdFinance.setRoutingRules('bybit', [
  {
    name: 'large_order_fragmentation',
    condition: 'amount > 2.0',
    action: {
      routing: 'algorithmic',
      algorithm: 'TWAP',
      params: { duration: 1800000 }
    }
  },
  {
    name: 'high_volatility_protection',
    condition: 'volatility > 0.03',
    action: {
      maxSlippage: 0.05,
      routing: 'smart'
    }
  }
]);
```
