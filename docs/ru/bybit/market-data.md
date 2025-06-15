# Рыночные данные Bybit

## Обзор

Bybit предоставляет обширные рыночные данные в реальном времени для всех торговых инструментов. OKD Finance обеспечивает унифицированный доступ к этим данным через REST API и WebSocket соединения.

## Типы данных

### Тикеры
Актуальная информация о ценах и объемах торгов:

```javascript
// Получение тикера для одного символа
const ticker = await okdFinance.getTicker('bybit', 'BTCUSDT');
console.log(ticker);
// {
//   symbol: 'BTCUSDT',
//   last: 45000,
//   bid: 44995,
//   ask: 45005,
//   volume: 1234.56,
//   change: 2.5,
//   changePercent: 5.88
// }

// Получение всех тикеров
const allTickers = await okdFinance.getAllTickers('bybit');
``` -->

### Стакан заявок
Информация о текущих заявках на покупку и продажу:

```javascript
// Полный стакан
const orderbook = await okdFinance.getOrderBook('bybit', 'BTCUSDT');
console.log(orderbook);
// {
//   bids: [[44995, 0.5], [44990, 1.2], ...],
//   asks: [[45005, 0.8], [45010, 0.9], ...],
//   timestamp: 1640995200000
// }

// Ограниченный стакан (топ 20 уровней)
const limitedOrderbook = await okdFinance.getOrderBook('bybit', 'BTCUSDT', 20);
``` -->

### Исторические свечи
Данные OHLCV для технического анализа:

```javascript
// Получение свечей
const candles = await okdFinance.getCandles('bybit', 'BTCUSDT', '1h', {
  since: Date.now() - 24 * 60 * 60 * 1000, // последние 24 часа
  limit: 100
});

console.log(candles[0]);
// [timestamp, open, high, low, close, volume]
// [1640995200000, 44500, 45200, 44300, 45000, 123.45]
``` -->

Поддерживаемые интервалы:
- `1m`, `3m`, `5m`, `15m`, `30m` - минутные
- `1h`, `2h`, `4h`, `6h`, `12h` - часовые  
- `1d`, `3d`, `1w` - дневные и недельные
- `1M` - месячные

### Последние сделки
История выполненных сделок:

```javascript
const trades = await okdFinance.getTrades('bybit', 'BTCUSDT', 50);
console.log(trades[0]);
// {
//   id: '12345',
//   timestamp: 1640995200000,
//   price: 45000,
//   amount: 0.1,
//   side: 'buy'
// }
``` -->

## WebSocket потоки

### Подключение к потокам

```javascript
const ws = okdFinance.createWebSocket('bybit');

// Подписка на тикеры
ws.subscribe('ticker', ['BTCUSDT', 'ETHUSDT']);

// Подписка на стакан заявок
ws.subscribe('orderbook', ['BTCUSDT']);

// Подписка на сделки
ws.subscribe('trades', ['BTCUSDT']);

// Подписка на свечи
ws.subscribe('candles', ['BTCUSDT'], '1m');
``` -->

### Обработка данных

```javascript
ws.on('ticker', (data) => {
  console.log('Тикер обновлен:', data);
  // Обновление UI или торговой логики
});

ws.on('orderbook', (data) => {
  console.log('Стакан обновлен:', data);
  // Анализ глубины рынка
});

ws.on('trades', (data) => {
  console.log('Новая сделка:', data);
  // Анализ активности торгов
});

ws.on('candles', (data) => {
  console.log('Новая свеча:', data);
  // Обновление графиков
});
``` -->

## Технические индикаторы

### Встроенные индикаторы

```javascript
// Скользящие средние
const sma = await okdFinance.getSMA('bybit', 'BTCUSDT', '1h', 20);
const ema = await okdFinance.getEMA('bybit', 'BTCUSDT', '1h', 20);

// RSI
const rsi = await okdFinance.getRSI('bybit', 'BTCUSDT', '1h', 14);

// MACD
const macd = await okdFinance.getMACD('bybit', 'BTCUSDT', '1h');

// Bollinger Bands
const bb = await okdFinance.getBollingerBands('bybit', 'BTCUSDT', '1h', 20);
``` -->

### Пользовательские индикаторы

```javascript
// Создание пользовательского индикатора
const customIndicator = okdFinance.createIndicator({
  name: 'CustomMA',
  calculate: (candles, period) => {
    // Логика расчета индикатора
    return candles.slice(-period).reduce((sum, candle) => sum + candle[4], 0) / period;
  }
});

const result = await customIndicator.calculate('bybit', 'BTCUSDT', '1h', 10);
``` -->

## Анализ рынка

### Волатильность

```javascript
// Расчет волатильности
const volatility = await okdFinance.getVolatility('bybit', 'BTCUSDT', '1h', 24);
console.log(`Волатильность за 24 часа: ${volatility}%`);
``` -->

### Корреляция

```javascript
// Корреляция между инструментами
const correlation = await okdFinance.getCorrelation('bybit', 
  ['BTCUSDT', 'ETHUSDT'], '1h', 168); // за неделю
console.log(`Корреляция BTC/ETH: ${correlation}`);
``` -->

### Объемный анализ

```javascript
// Анализ объемов
const volumeProfile = await okdFinance.getVolumeProfile('bybit', 'BTCUSDT', '1h', 24);
console.log('Профиль объемов:', volumeProfile);
``` -->

## Оптимизация производительности

### Кэширование данных

```javascript
// Включение кэширования
okdFinance.enableCache({
  tickers: 1000, // кэш на 1 секунду
  orderbook: 500, // кэш на 0.5 секунды
  candles: 60000 // кэш на 1 минуту
});
``` -->

### Батчевые запросы

```javascript
// Получение данных для нескольких символов
const multiData = await okdFinance.getMultipleData('bybit', {
  symbols: ['BTCUSDT', 'ETHUSDT', 'ADAUSDT'],
  types: ['ticker', 'orderbook'],
  params: { orderbookLimit: 10 }
});
``` -->

### Сжатие данных

```javascript
// Включение сжатия WebSocket
ws.enableCompression(true);

// Фильтрация данных
ws.subscribe('orderbook', ['BTCUSDT'], {
  levels: 10, // только топ 10 уровней
  updateSpeed: '100ms' // обновления каждые 100мс
});
``` -->

## Мониторинг качества данных

### Проверка задержек

```javascript
ws.on('latency', (data) => {
  console.log(`Задержка ${data.stream}: ${data.latency}ms`);
  if (data.latency > 100) {
    console.warn('Высокая задержка данных');
  }
});
``` -->

### Обнаружение пропусков

```javascript
ws.on('gap', (data) => {
  console.warn(`Пропуск данных в потоке ${data.stream}:`, data);
  // Запрос недостающих данных
  ws.requestMissedData(data.stream, data.from, data.to);
});
``` -->

## Примеры использования

### Торговый бот на основе данных

```javascript
class TradingBot {
  constructor() {
    this.ws = okdFinance.createWebSocket('bybit');
    this.setupStreams();
  }

  setupStreams() {
    this.ws.subscribe('ticker', ['BTCUSDT']);
    this.ws.subscribe('candles', ['BTCUSDT'], '5m');
    
    this.ws.on('candles', this.onNewCandle.bind(this));
  }

  async onNewCandle(candle) {
    const rsi = await okdFinance.getRSI('bybit', 'BTCUSDT', '5m', 14);
    
    if (rsi < 30) {
      // Сигнал на покупку
      await this.placeBuyOrder();
    } else if (rsi > 70) {
      // Сигнал на продажу
      await this.placeSellOrder();
    }
  }
}
``` -->

### Арбитражный сканер

```javascript
class ArbitrageScanner {
  constructor() {
    this.exchanges = ['bybit', 'binance', 'okx'];
    this.symbols = ['BTCUSDT', 'ETHUSDT'];
    this.setupStreams();
  }

  setupStreams() {
    this.exchanges.forEach(exchange => {
      const ws = okdFinance.createWebSocket(exchange);
      ws.subscribe('ticker', this.symbols);
      ws.on('ticker', (data) => this.checkArbitrage(exchange, data));
    });
  }

  checkArbitrage(exchange, ticker) {
    // Логика поиска арбитражных возможностей
    const opportunities = this.findOpportunities(ticker);
    if (opportunities.length > 0) {
      this.executeArbitrage(opportunities);
    }
  }
}
``` -->
