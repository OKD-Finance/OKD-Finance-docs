# Рыночные данные

API для получения актуальных рыночных данных, включая цены, объемы, стаканы заявок и исторические данные.

## Тикеры и цены

### Получение тикера

```http
GET /api/v1/market/ticker/{symbol}
```

```javascript
const ticker = await okdFinance.getTicker('BTCUSDT');
console.log(ticker);
```

**Ответ:**
```json
{
  "symbol": "BTCUSDT",
  "price": "45000.00",
  "priceChange": "1500.00",
  "priceChangePercent": "3.45",
  "weightedAvgPrice": "44750.25",
  "prevClosePrice": "43500.00",
  "lastPrice": "45000.00",
  "lastQty": "0.001",
  "bidPrice": "44995.00",
  "bidQty": "0.5",
  "askPrice": "45005.00",
  "askQty": "0.3",
  "openPrice": "43500.00",
  "highPrice": "45200.00",
  "lowPrice": "43200.00",
  "volume": "1234.567",
  "quoteVolume": "55123456.78",
  "openTime": 1703001600000,
  "closeTime": 1703088000000,
  "count": 125678
}
```

### Получение всех тикеров

```http
GET /api/v1/market/ticker
```

```javascript
const allTickers = await okdFinance.getAllTickers();
console.log(allTickers);
```

### Получение цены символа

```http
GET /api/v1/market/price/{symbol}
```

```javascript
const price = await okdFinance.getSymbolPrice('BTCUSDT');
console.log(price); // { "symbol": "BTCUSDT", "price": "45000.00" }
```

### Получение лучших цен (bid/ask)

```http
GET /api/v1/market/bookTicker/{symbol}
```

```javascript
const bookTicker = await okdFinance.getBookTicker('BTCUSDT');
console.log(bookTicker);
```

**Ответ:**
```json
{
  "symbol": "BTCUSDT",
  "bidPrice": "44995.00",
  "bidQty": "0.5",
  "askPrice": "45005.00",
  "askQty": "0.3"
}
```

## Стакан заявок

### Получение стакана заявок

```http
GET /api/v1/market/depth/{symbol}
```

```javascript
const orderBook = await okdFinance.getOrderBook('BTCUSDT', 20);
console.log(orderBook);
```

**Параметры:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `symbol` | string | Торговая пара |
| `limit` | number | Количество уровней (5, 10, 20, 50, 100, 500, 1000) |

**Ответ:**
```json
{
  "lastUpdateId": 1234567890,
  "bids": [
    ["44995.00", "0.5"],
    ["44990.00", "1.2"],
    ["44985.00", "0.8"]
  ],
  "asks": [
    ["45005.00", "0.3"],
    ["45010.00", "0.7"],
    ["45015.00", "1.1"]
  ]
}
```

### Агрегированные сделки

```http
GET /api/v1/market/aggTrades/{symbol}
```

```javascript
const aggTrades = await okdFinance.getAggTrades({
  symbol: 'BTCUSDT',
  limit: 100,
  startTime: Date.now() - 3600000 // последний час
});
```

**Ответ:**
```json
[
  {
    "id": 12345,
    "price": "45000.00",
    "qty": "0.001",
    "firstTradeId": 123450,
    "lastTradeId": 123455,
    "timestamp": 1703001600000,
    "isBuyerMaker": false
  }
]
```

## Исторические данные

### Свечи (Klines)

```http
GET /api/v1/market/klines/{symbol}
```

```javascript
const klines = await okdFinance.getKlines({
  symbol: 'BTCUSDT',
  interval: '1h',
  limit: 100,
  startTime: Date.now() - 86400000 // последние 24 часа
});
```

**Интервалы:**
- `1m`, `3m`, `5m`, `15m`, `30m` - минуты
- `1h`, `2h`, `4h`, `6h`, `8h`, `12h` - часы
- `1d`, `3d` - дни
- `1w` - неделя
- `1M` - месяц

**Ответ:**
```json
[
  [
    1703001600000,  // Время открытия
    "44000.00",     // Цена открытия
    "45000.00",     // Максимальная цена
    "43500.00",     // Минимальная цена
    "44800.00",     // Цена закрытия
    "123.456",      // Объем
    1703005199999,  // Время закрытия
    "5534567.89",   // Объем в котируемой валюте
    1234,           // Количество сделок
    "61.728",       // Объем покупок
    "2767283.95",   // Объем покупок в котируемой валюте
    "0"             // Игнорировать
  ]
]
```

### Средние цены

```http
GET /api/v1/market/avgPrice/{symbol}
```

```javascript
const avgPrice = await okdFinance.getAvgPrice('BTCUSDT');
console.log(avgPrice);
```

**Ответ:**
```json
{
  "mins": 5,
  "price": "44750.25"
}
```

## Статистика за 24 часа

### Статистика по символу

```http
GET /api/v1/market/ticker/24hr/{symbol}
```

```javascript
const stats24hr = await okdFinance.get24hrStats('BTCUSDT');
console.log(stats24hr);
```

**Ответ:**
```json
{
  "symbol": "BTCUSDT",
  "priceChange": "1500.00",
  "priceChangePercent": "3.45",
  "weightedAvgPrice": "44750.25",
  "prevClosePrice": "43500.00",
  "lastPrice": "45000.00",
  "lastQty": "0.001",
  "bidPrice": "44995.00",
  "bidQty": "0.5",
  "askPrice": "45005.00",
  "askQty": "0.3",
  "openPrice": "43500.00",
  "highPrice": "45200.00",
  "lowPrice": "43200.00",
  "volume": "1234.567",
  "quoteVolume": "55123456.78",
  "openTime": 1703001600000,
  "closeTime": 1703088000000,
  "count": 125678
}
```

### Статистика по всем символам

```http
GET /api/v1/market/ticker/24hr
```

```javascript
const allStats = await okdFinance.getAll24hrStats();
console.log(allStats);
```

## Последние сделки

### Получение последних сделок

```http
GET /api/v1/market/trades/{symbol}
```

```javascript
const recentTrades = await okdFinance.getRecentTrades('BTCUSDT', 100);
console.log(recentTrades);
```

**Ответ:**
```json
[
  {
    "id": 123456,
    "price": "45000.00",
    "qty": "0.001",
    "quoteQty": "45.00",
    "time": 1703001600000,
    "isBuyerMaker": false
  }
]
```

### Исторические сделки

```http
GET /api/v1/market/historicalTrades/{symbol}
```

```javascript
const historicalTrades = await okdFinance.getHistoricalTrades({
  symbol: 'BTCUSDT',
  limit: 500,
  fromId: 123456
});
```

## WebSocket потоки

### Подписка на тикер

```javascript
const tickerStream = okdFinance.subscribeToTicker('BTCUSDT');

tickerStream.on('data', (ticker) => {
  console.log('Ticker update:', ticker);
});

tickerStream.on('error', (error) => {
  console.error('Stream error:', error);
});
```

### Подписка на стакан заявок

```javascript
const depthStream = okdFinance.subscribeToDepth('BTCUSDT', '100ms');

depthStream.on('data', (depth) => {
  console.log('Depth update:', depth);
});
```

**Скорость обновления:**
- `100ms` - каждые 100мс
- `1000ms` - каждую секунду

### Подписка на сделки

```javascript
const tradeStream = okdFinance.subscribeToTrades('BTCUSDT');

tradeStream.on('data', (trade) => {
  console.log('New trade:', trade);
});
```

### Подписка на свечи

```javascript
const klineStream = okdFinance.subscribeToKlines('BTCUSDT', '1m');

klineStream.on('data', (kline) => {
  console.log('Kline update:', kline);
});
```

### Мини-тикер

```javascript
const miniTickerStream = okdFinance.subscribeToMiniTicker('BTCUSDT');

miniTickerStream.on('data', (miniTicker) => {
  console.log('Mini ticker:', miniTicker);
});
```

**Формат мини-тикера:**
```json
{
  "e": "24hrMiniTicker",
  "E": 1703001600000,
  "s": "BTCUSDT",
  "c": "45000.00",
  "o": "43500.00",
  "h": "45200.00",
  "l": "43200.00",
  "v": "1234.567",
  "q": "55123456.78"
}
```

## Информация о торговых парах

### Получение информации о символах

```http
GET /api/v1/market/exchangeInfo
```

```javascript
const exchangeInfo = await okdFinance.getExchangeInfo();
console.log(exchangeInfo);
```

**Ответ:**
```json
{
  "timezone": "UTC",
  "serverTime": 1703001600000,
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1200
    }
  ],
  "symbols": [
    {
      "symbol": "BTCUSDT",
      "status": "TRADING",
      "baseAsset": "BTC",
      "baseAssetPrecision": 8,
      "quoteAsset": "USDT",
      "quotePrecision": 8,
      "quoteAssetPrecision": 8,
      "orderTypes": [
        "LIMIT",
        "LIMIT_MAKER",
        "MARKET",
        "STOP_LOSS",
        "STOP_LOSS_LIMIT",
        "TAKE_PROFIT",
        "TAKE_PROFIT_LIMIT"
      ],
      "icebergAllowed": true,
      "ocoAllowed": true,
      "filters": [
        {
          "filterType": "PRICE_FILTER",
          "minPrice": "0.01",
          "maxPrice": "1000000.00",
          "tickSize": "0.01"
        },
        {
          "filterType": "LOT_SIZE",
          "minQty": "0.00001",
          "maxQty": "9000.00",
          "stepSize": "0.00001"
        },
        {
          "filterType": "MIN_NOTIONAL",
          "minNotional": "10.00",
          "applyToMarket": true,
          "avgPriceMins": 5
        }
      ]
    }
  ]
}
```

### Фильтры символов

#### PRICE_FILTER
Ограничения по цене:
- `minPrice` - минимальная цена
- `maxPrice` - максимальная цена  
- `tickSize` - шаг цены

#### LOT_SIZE
Ограничения по количеству:
- `minQty` - минимальное количество
- `maxQty` - максимальное количество
- `stepSize` - шаг количества

#### MIN_NOTIONAL
Минимальная стоимость ордера:
- `minNotional` - минимальная стоимость в котируемой валюте

## Технические индикаторы

### RSI (Relative Strength Index)

```javascript
const rsi = await okdFinance.getRSI({
  symbol: 'BTCUSDT',
  interval: '1h',
  period: 14
});
```

### Скользящие средние

```javascript
const sma = await okdFinance.getSMA({
  symbol: 'BTCUSDT',
  interval: '1h',
  period: 20,
  type: 'SMA' // 'SMA', 'EMA', 'WMA'
});
```

### MACD

```javascript
const macd = await okdFinance.getMACD({
  symbol: 'BTCUSDT',
  interval: '1h',
  fastPeriod: 12,
  slowPeriod: 26,
  signalPeriod: 9
});
```

### Bollinger Bands

```javascript
const bb = await okdFinance.getBollingerBands({
  symbol: 'BTCUSDT',
  interval: '1h',
  period: 20,
  stdDev: 2
});
```

## Рыночная аналитика

### Топ торгуемых пар

```http
GET /api/v1/market/top-pairs
```

```javascript
const topPairs = await okdFinance.getTopTradingPairs({
  sortBy: 'volume', // 'volume', 'priceChange', 'count'
  limit: 10
});
```

### Рыночные тренды

```http
GET /api/v1/market/trends
```

```javascript
const trends = await okdFinance.getMarketTrends({
  timeframe: '24h' // '1h', '24h', '7d', '30d'
});
```

**Ответ:**
```json
{
  "trending": [
    {
      "symbol": "BTCUSDT",
      "priceChangePercent": "5.67",
      "volume": "12345.67",
      "rank": 1
    }
  ],
  "gainers": [
    {
      "symbol": "ETHUSDT",
      "priceChangePercent": "8.45",
      "volume": "23456.78"
    }
  ],
  "losers": [
    {
      "symbol": "ADAUSDT",
      "priceChangePercent": "-3.21",
      "volume": "34567.89"
    }
  ]
}
```

## Кэширование и оптимизация

### Локальное кэширование

```javascript
const cache = okdFinance.createMarketDataCache({
  ttl: 5000, // время жизни кэша в мс
  maxSize: 1000 // максимальное количество записей
});

// Использование кэша
const cachedTicker = await cache.getTicker('BTCUSDT');
```

### Batch запросы

```javascript
const batchData = await okdFinance.getBatchMarketData([
  { type: 'ticker', symbol: 'BTCUSDT' },
  { type: 'depth', symbol: 'ETHUSDT', limit: 20 },
  { type: 'klines', symbol: 'BNBUSDT', interval: '1h', limit: 100 }
]);
```

## Лимиты запросов

### Весовые лимиты

| Эндпоинт | Вес |
|----------|-----|
| `/ticker/{symbol}` | 1 |
| `/ticker` | 40 |
| `/depth` | 1-50 (зависит от limit) |
| `/klines` | 1 |
| `/trades` | 1 |
| `/aggTrades` | 1 |

### Обработка лимитов

```javascript
okdFinance.on('rateLimitWarning', (info) => {
  console.log(`Использовано ${info.used}/${info.limit} запросов`);
  console.log(`Сброс через: ${info.resetTime}`);
});

okdFinance.on('rateLimitExceeded', (error) => {
  console.error('Превышен лимит запросов:', error);
  // Ожидание до сброса лимита
  setTimeout(() => {
    // Повторить запрос
  }, error.retryAfter);
});
```

## Примеры использования

### Мониторинг цены

```javascript
async function monitorPrice(symbol, targetPrice) {
  const stream = okdFinance.subscribeToTicker(symbol);
  
  stream.on('data', (ticker) => {
    const currentPrice = parseFloat(ticker.price);
    
    if (currentPrice >= targetPrice) {
      console.log(`Цена ${symbol} достигла ${targetPrice}!`);
      // Выполнить действие
      stream.close();
    }
  });
}

monitorPrice('BTCUSDT', 50000);
```

### Анализ волатильности

```javascript
async function analyzeVolatility(symbol, period = 24) {
  const klines = await okdFinance.getKlines({
    symbol: symbol,
    interval: '1h',
    limit: period
  });
  
  const prices = klines.map(k => parseFloat(k[4])); // цены закрытия
  const returns = [];
  
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i-1]) / prices[i-1]);
  }
  
  const volatility = Math.sqrt(
    returns.reduce((sum, r) => sum + r * r, 0) / returns.length
  ) * Math.sqrt(24); // годовая волатильность
  
  return volatility;
}
```
