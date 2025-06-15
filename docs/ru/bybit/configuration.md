# Конфигурация Bybit

Настройка интеграции с биржей Bybit для торговли через платформу OKD Finance.

## Обзор интеграции

OKD Finance предоставляет прямую интеграцию с Bybit, позволяя:
- Торговать на спотовом и фьючерсном рынках
- Использовать единый API для всех операций
- Автоматически синхронизировать балансы
- Получать реальные рыночные данные

## Создание API ключей Bybit

### 1. Регистрация на Bybit

1. Перейдите на [bybit.com](https://www.bybit.com)
2. Создайте аккаунт или войдите в существующий
3. Пройдите верификацию KYC

### 2. Создание API ключей

1. Войдите в аккаунт Bybit
2. Перейдите в **API Management**
3. Нажмите **Create New Key**
4. Настройте разрешения:
   - **Read**: для получения данных
   - **Trade**: для торговых операций
   - **Withdraw**: для вывода средств (опционально)

```javascript
// Пример создания API ключей
const bybitConfig = {
  apiKey: 'your-bybit-api-key',
  secretKey: 'your-bybit-secret-key',
  testnet: false, // true для тестовой сети
  permissions: ['read', 'trade']
};
```

## Настройка в OKD Finance

### Подключение Bybit аккаунта

```javascript
const okdFinance = require('@okd-finance/api');

const client = new okdFinance({
  apiKey: process.env.OKD_API_KEY,
  secretKey: process.env.OKD_SECRET_KEY
});

// Подключение Bybit аккаунта
const bybitConnection = await client.connectBybitAccount({
  bybitApiKey: process.env.BYBIT_API_KEY,
  bybitSecretKey: process.env.BYBIT_SECRET_KEY,
  label: 'Main Trading Account',
  permissions: ['read', 'trade'],
  ipRestrictions: ['192.168.1.1'] // опционально
});

console.log('Bybit аккаунт подключен:', bybitConnection.connectionId);
```

### Проверка подключения

```javascript
async function verifyBybitConnection() {
  try {
    // Проверка API ключей
    const accountInfo = await client.getBybitAccountInfo();
    console.log('Bybit аккаунт активен:', accountInfo.uid);
    
    // Проверка балансов
    const balances = await client.getBybitBalances();
    console.log('Доступные балансы:', balances);
    
    return true;
  } catch (error) {
    console.error('Ошибка подключения к Bybit:', error.message);
    return false;
  }
}
```

## Конфигурация торговых параметров

### Основные настройки

```javascript
const tradingConfig = {
  // Общие настройки
  defaultLeverage: 10, // плечо по умолчанию
  marginMode: 'isolated', // 'isolated' или 'cross'
  positionMode: 'hedge', // 'hedge' или 'one-way'
  
  // Лимиты
  maxPositionSize: 1.0, // максимальный размер позиции в BTC
  maxDailyLoss: 1000, // максимальный дневной убыток в USDT
  
  // Риск-менеджмент
  defaultStopLoss: 2.0, // стоп-лосс в процентах
  defaultTakeProfit: 6.0, // тейк-профит в процентах
  
  // Комиссии
  makerFeeRate: 0.01, // комиссия мейкера в процентах
  takerFeeRate: 0.06 // комиссия тейкера в процентах
};

await client.updateBybitTradingConfig(tradingConfig);
```

### Настройка символов

```javascript
const symbolConfig = {
  'BTCUSDT': {
    enabled: true,
    leverage: 20,
    marginMode: 'isolated',
    minOrderSize: 0.001,
    maxOrderSize: 10.0,
    priceFilter: {
      minPrice: 0.01,
      maxPrice: 1000000,
      tickSize: 0.01
    },
    lotSizeFilter: {
      minQty: 0.001,
      maxQty: 1000,
      stepSize: 0.001
    }
  },
  'ETHUSDT': {
    enabled: true,
    leverage: 15,
    marginMode: 'cross',
    minOrderSize: 0.01,
    maxOrderSize: 100.0
  }
};

await client.updateBybitSymbolConfig(symbolConfig);
```

## Настройка WebSocket соединений

### Подписка на рыночные данные

```javascript
const wsConfig = {
  // Публичные потоки
  public: {
    orderbook: ['BTCUSDT', 'ETHUSDT'],
    trades: ['BTCUSDT'],
    klines: {
      'BTCUSDT': ['1m', '5m', '1h'],
      'ETHUSDT': ['1m', '1h']
    },
    tickers: ['BTCUSDT', 'ETHUSDT']
  },
  
  // Приватные потоки
  private: {
    orders: true,
    positions: true,
    executions: true,
    wallet: true
  }
};

const wsConnection = await client.connectBybitWebSocket(wsConfig);

// Обработчики событий
wsConnection.on('orderbook', (data) => {
  console.log('Orderbook update:', data);
});

wsConnection.on('trade', (data) => {
  console.log('New trade:', data);
});

wsConnection.on('position', (data) => {
  console.log('Position update:', data);
});
```

## Синхронизация данных

### Автоматическая синхронизация

```javascript
const syncConfig = {
  enabled: true,
  interval: 30000, // синхронизация каждые 30 секунд
  syncTypes: [
    'balances',
    'positions',
    'orders',
    'trades'
  ],
  onError: 'retry', // 'retry', 'skip', 'stop'
  maxRetries: 3
};

await client.enableBybitSync(syncConfig);

// Мониторинг синхронизации
client.on('bybit.sync.success', (data) => {
  console.log('Синхронизация успешна:', data.type);
});

client.on('bybit.sync.error', (error) => {
  console.error('Ошибка синхронизации:', error);
});
```

### Ручная синхронизация

```javascript
// Синхронизация балансов
await client.syncBybitBalances();

// Синхронизация позиций
await client.syncBybitPositions();

// Синхронизация ордеров
await client.syncBybitOrders();

// Полная синхронизация
await client.fullBybitSync();
```

## Настройка уведомлений

### Email уведомления

```javascript
const notificationConfig = {
  email: {
    enabled: true,
    events: [
      'connection.lost',
      'connection.restored',
      'large.position.opened',
      'stop.loss.triggered',
      'daily.pnl.report'
    ],
    recipients: ['trader@example.com']
  },
  
  webhook: {
    enabled: true,
    url: 'https://your-server.com/bybit-webhook',
    events: [
      'order.filled',
      'position.closed',
      'balance.changed'
    ],
    secret: 'webhook-secret-key'
  }
};

await client.updateBybitNotifications(notificationConfig);
```

## Мониторинг и логирование

### Настройка логирования

```javascript
const loggingConfig = {
  level: 'info', // 'debug', 'info', 'warn', 'error'
  destinations: [
    {
      type: 'file',
      path: '/var/log/okd-finance/bybit.log',
      maxSize: '100MB',
      maxFiles: 10
    },
    {
      type: 'console',
      colorize: true
    }
  ],
  
  // Что логировать
  events: [
    'api.request',
    'api.response',
    'websocket.message',
    'order.created',
    'order.filled',
    'position.opened',
    'position.closed',
    'error'
  ]
};

await client.configureBybitLogging(loggingConfig);
```

### Мониторинг производительности

```javascript
// Получение статистики API
const apiStats = await client.getBybitAPIStats();
console.log('API статистика:', apiStats);

// Результат:
{
  "requestsPerMinute": 45,
  "averageResponseTime": 120, // мс
  "errorRate": 0.02, // 2%
  "rateLimitUsage": {
    "used": 80,
    "limit": 120,
    "resetTime": "2024-12-20T10:35:00Z"
  }
}

// Мониторинг WebSocket соединения
const wsStats = await client.getBybitWebSocketStats();
console.log('WebSocket статистика:', wsStats);
```

## Обработка ошибок

### Настройка retry логики

```javascript
const errorHandlingConfig = {
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000, // мс
    exponentialBackoff: true,
    retryableErrors: [
      'NETWORK_ERROR',
      'RATE_LIMIT_EXCEEDED',
      'SERVER_ERROR'
    ]
  },
  
  circuitBreaker: {
    enabled: true,
    failureThreshold: 5,
    resetTimeout: 60000, // 1 минута
    monitoringPeriod: 300000 // 5 минут
  }
};

await client.configureBybitErrorHandling(errorHandlingConfig);
```

### Обработчики ошибок

```javascript
client.on('bybit.error', (error) => {
  console.error('Bybit ошибка:', error);
  
  switch (error.code) {
    case 'RATE_LIMIT_EXCEEDED':
      console.log('Превышен лимит запросов, ожидание...');
      break;
      
    case 'INSUFFICIENT_BALANCE':
      console.log('Недостаточно средств для операции');
      break;
      
    case 'INVALID_SYMBOL':
      console.log('Неверный торговый символ');
      break;
      
    default:
      console.log('Неизвестная ошибка:', error.message);
  }
});
```

## Тестирование конфигурации

### Тестовая среда

```javascript
// Переключение на testnet
const testConfig = {
  testnet: true,
  bybitApiKey: process.env.BYBIT_TESTNET_API_KEY,
  bybitSecretKey: process.env.BYBIT_TESTNET_SECRET_KEY
};

const testClient = new okdFinance(testConfig);

// Тестовые операции
async function runTests() {
  try {
    // Тест подключения
    const accountInfo = await testClient.getBybitAccountInfo();
    console.log('✓ Подключение к testnet успешно');
    
    // Тест получения балансов
    const balances = await testClient.getBybitBalances();
    console.log('✓ Получение балансов успешно');
    
    // Тест создания ордера
    const testOrder = await testClient.createBybitOrder({
      symbol: 'BTCUSDT',
      side: 'buy',
      type: 'limit',
      quantity: 0.001,
      price: 30000
    });
    console.log('✓ Создание тестового ордера успешно');
    
    // Отмена тестового ордера
    await testClient.cancelBybitOrder({
      symbol: 'BTCUSDT',
      orderId: testOrder.orderId
    });
    console.log('✓ Отмена ордера успешно');
    
    console.log('Все тесты пройдены успешно!');
  } catch (error) {
    console.error('Ошибка в тестах:', error);
  }
}
```

## Миграция с других бирж

### Импорт конфигурации

```javascript
// Импорт настроек с Binance
const binanceConfig = await client.importBinanceConfig({
  binanceApiKey: 'binance-api-key',
  binanceSecretKey: 'binance-secret-key'
});

// Конвертация в Bybit формат
const bybitConfig = await client.convertToBybitConfig(binanceConfig);

// Применение конфигурации
await client.applyBybitConfig(bybitConfig);
```

## Резервное копирование

### Экспорт конфигурации

```javascript
// Экспорт всех настроек
const configBackup = await client.exportBybitConfig();

// Сохранение в файл
const fs = require('fs');
fs.writeFileSync('bybit-config-backup.json', JSON.stringify(configBackup, null, 2));

// Восстановление из резервной копии
const backupData = JSON.parse(fs.readFileSync('bybit-config-backup.json'));
await client.restoreBybitConfig(backupData);
```

Эта конфигурация обеспечивает полную интеграцию с Bybit и позволяет эффективно управлять торговыми операциями через единый интерфейс OKD Finance.
