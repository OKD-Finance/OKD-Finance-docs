# Интеграция с Bybit

## Обзор

Интеграция с биржей Bybit позволяет получить доступ к торговле спотовыми и деривативными инструментами через единый API. OKD Finance предоставляет готовые решения для подключения к Bybit с поддержкой всех основных функций.

## Настройка подключения

### Получение API ключей

1. Войдите в личный кабинет Bybit
2. Перейдите в раздел "API Management"
3. Создайте новый API ключ с необходимыми разрешениями:
   - Read: для получения данных
   - Trade: для размещения ордеров
   - Withdraw: для вывода средств (опционально)

### Конфигурация в OKD Finance

```javascript
const config = {
  exchange: 'bybit',
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret',
  testnet: false, // true для тестовой среды
  options: {
    defaultType: 'spot', // 'spot', 'linear', 'inverse'
    recvWindow: 5000,
    enableRateLimit: true
  }
};
```

## Поддерживаемые рынки

### Спотовая торговля
- Все основные криптовалютные пары
- Фиатные пары (USDT, USDC, EUR)
- Маржинальная торговля

### Деривативы
- Бессрочные контракты (USDT, USDC)
- Обратные контракты
- Опционы

## Примеры использования

### Получение баланса

```javascript
const balance = await okdFinance.getBalance('bybit');
console.log('Спотовый баланс:', balance.spot);
console.log('Деривативы:', balance.derivatives);
```

### Размещение ордера

```javascript
const order = await okdFinance.createOrder('bybit', {
  symbol: 'BTCUSDT',
  type: 'limit',
  side: 'buy',
  amount: 0.001,
  price: 45000,
  timeInForce: 'GTC'
});
```

### Получение рыночных данных

```javascript
// Тикер
const ticker = await okdFinance.getTicker('bybit', 'BTCUSDT');

// Стакан заявок
const orderbook = await okdFinance.getOrderBook('bybit', 'BTCUSDT');

// Свечи
const candles = await okdFinance.getCandles('bybit', 'BTCUSDT', '1h');
```

## WebSocket подключение

### Подписка на обновления

```javascript
const ws = okdFinance.createWebSocket('bybit');

// Подписка на тикеры
ws.subscribe('ticker', ['BTCUSDT', 'ETHUSDT']);

// Подписка на стакан
ws.subscribe('orderbook', ['BTCUSDT']);

// Подписка на сделки
ws.subscribe('trades', ['BTCUSDT']);

ws.on('ticker', (data) => {
  console.log('Тикер обновлен:', data);
});
```

### Приватные каналы

```javascript
// Подписка на обновления баланса
ws.subscribe('balance');

// Подписка на ордера
ws.subscribe('orders');

// Подписка на позиции
ws.subscribe('positions');

ws.on('balance', (data) => {
  console.log('Баланс изменен:', data);
});
```

## Управление рисками

### Стоп-лоссы и тейк-профиты

```javascript
const order = await okdFinance.createOrder('bybit', {
  symbol: 'BTCUSDT',
  type: 'market',
  side: 'buy',
  amount: 0.001,
  stopLoss: 44000,
  takeProfit: 46000
});
```

### Позиционное управление

```javascript
// Установка плеча
await okdFinance.setLeverage('bybit', 'BTCUSDT', 10);

// Изменение маржи
await okdFinance.addMargin('bybit', 'BTCUSDT', 100);

// Закрытие позиции
await okdFinance.closePosition('bybit', 'BTCUSDT');
```

## Обработка ошибок

```javascript
try {
  const order = await okdFinance.createOrder('bybit', orderParams);
} catch (error) {
  if (error.code === 'INSUFFICIENT_BALANCE') {
    console.log('Недостаточно средств');
  } else if (error.code === 'INVALID_SYMBOL') {
    console.log('Неверный символ');
  } else {
    console.log('Ошибка:', error.message);
  }
}
```

## Лимиты и ограничения

### Rate Limits
- Спотовая торговля: 120 запросов в минуту
- Деривативы: 120 запросов в минуту
- WebSocket: 200 подписок на соединение

### Минимальные размеры ордеров
- BTC: 0.00001 BTC
- ETH: 0.0001 ETH
- Альткоины: варьируются по символам

## Мониторинг и логирование

```javascript
// Включение детального логирования
okdFinance.setLogLevel('debug');

// Мониторинг производительности
okdFinance.on('requestTime', (data) => {
  console.log(`Запрос ${data.endpoint}: ${data.time}ms`);
});

// Отслеживание ошибок
okdFinance.on('error', (error) => {
  console.error('Ошибка Bybit:', error);
});
```

## Дополнительные возможности

### Копи-трейдинг
- Подключение к успешным трейдерам
- Автоматическое копирование сделок
- Настройка размеров позиций

### Арбитраж
- Межбиржевой арбитраж
- Арбитраж между спотом и фьючерсами
- Автоматическое исполнение стратегий

### Аналитика
- Детальная статистика торговли
- P&L отчеты
- Анализ эффективности стратегий
