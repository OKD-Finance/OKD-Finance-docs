# Торговля

OKD Finance предоставляет мощную торговую платформу с интеграцией Bybit для торговли криптовалютами.

## Основные возможности

### Типы ордеров

- **Market Order (Рыночный ордер)** - исполняется немедленно по текущей рыночной цене
- **Limit Order (Лимитный ордер)** - исполняется только при достижении указанной цены
- **Stop Loss** - автоматическое закрытие позиции при убытке
- **Take Profit** - автоматическое закрытие позиции при прибыли

### Поддерживаемые инструменты

- **Spot Trading** - торговля спотовыми активами
- **Futures** - торговля фьючерсными контрактами
- **Options** - торговля опционами (скоро)

## Создание ордера

### Через API

```javascript
const order = await okdFinance.createOrder({
  symbol: 'BTCUSDT',
  side: 'buy',
  type: 'limit',
  quantity: 0.001,
  price: 45000,
  timeInForce: 'GTC'
});
```

### Параметры ордера

| Параметр | Тип | Описание |
|----------|-----|----------|
| `symbol` | string | Торговая пара (например, BTCUSDT) |
| `side` | string | Направление: 'buy' или 'sell' |
| `type` | string | Тип ордера: 'market', 'limit', 'stop' |
| `quantity` | number | Количество базового актива |
| `price` | number | Цена (для лимитных ордеров) |
| `timeInForce` | string | Время действия: 'GTC', 'IOC', 'FOK' |

## Управление позициями

### Просмотр открытых позиций

```javascript
const positions = await okdFinance.getPositions();
console.log(positions);
```

### Закрытие позиции

```javascript
const result = await okdFinance.closePosition({
  symbol: 'BTCUSDT',
  quantity: 0.001
});
```

## Риск-менеджмент

### Установка Stop Loss

```javascript
const stopLoss = await okdFinance.setStopLoss({
  symbol: 'BTCUSDT',
  stopPrice: 44000,
  quantity: 0.001
});
```

### Установка Take Profit

```javascript
const takeProfit = await okdFinance.setTakeProfit({
  symbol: 'BTCUSDT',
  targetPrice: 46000,
  quantity: 0.001
});
```

## Торговые стратегии

### DCA (Dollar Cost Averaging)

```javascript
const dcaStrategy = {
  symbol: 'BTCUSDT',
  amount: 100, // USDT
  interval: '1d', // ежедневно
  duration: 30 // дней
};

await okdFinance.createDCAStrategy(dcaStrategy);
```

### Grid Trading

```javascript
const gridStrategy = {
  symbol: 'BTCUSDT',
  lowerPrice: 40000,
  upperPrice: 50000,
  gridCount: 10,
  investment: 1000 // USDT
};

await okdFinance.createGridStrategy(gridStrategy);
```

## Комиссии

| Тип торговли | Maker | Taker |
|--------------|-------|-------|
| Spot | 0.1% | 0.1% |
| Futures | 0.02% | 0.05% |
| Options | 0.03% | 0.03% |

## Лимиты

- **Минимальный размер ордера**: 10 USDT
- **Максимальное плечо**: 100x (для фьючерсов)
- **Максимальное количество открытых ордеров**: 200

## Безопасность

- Все торговые операции требуют API ключи с торговыми разрешениями
- Поддержка IP whitelist для дополнительной безопасности
- Двухфакторная аутентификация (2FA) обязательна для торговли

## Мониторинг

### Торговая история

```javascript
const history = await okdFinance.getTradeHistory({
  symbol: 'BTCUSDT',
  limit: 100,
  startTime: Date.now() - 86400000 // последние 24 часа
});
```

### Статистика торговли

```javascript
const stats = await okdFinance.getTradingStats({
  period: '30d'
});

console.log('PnL:', stats.totalPnL);
console.log('Win Rate:', stats.winRate);
console.log('Total Trades:', stats.totalTrades);
```
