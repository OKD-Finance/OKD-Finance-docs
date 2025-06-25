# Примеры торгового потока

Практические примеры реализации торговых стратегий с использованием API OKD Finance.

## Базовый торговый поток

### 1. Инициализация и аутентификация

```javascript
const OKDFinance = require('@okd-finance/api');

const client = new OKDFinance({
  apiKey: process.env.OKD_API_KEY,
  secretKey: process.env.OKD_SECRET_KEY,
  sandbox: false // true для тестовой среды
});

// Проверка подключения
async function initialize() {
  try {
    const account = await client.getAccountInfo();
    console.log('Подключение успешно:', account.userId);
    return true;
  } catch (error) {
    console.error('Ошибка подключения:', error.message);
    return false;
  }
}
```

### 2. Получение рыночных данных

```javascript
async function getMarketData(symbol) {
  try {
    // Получение текущей цены
    const ticker = await client.getTicker(symbol);
    
    // Получение стакана заявок
    const orderBook = await client.getOrderBook(symbol, 20);
    
    // Получение свечей
    const klines = await client.getKlines({
      symbol: symbol,
      interval: '1h',
      limit: 100
    });
    
    return {
      price: parseFloat(ticker.price),
      bid: parseFloat(orderBook.bids[0][0]),
      ask: parseFloat(orderBook.asks[0][0]),
      volume24h: parseFloat(ticker.volume),
      priceChange24h: parseFloat(ticker.priceChangePercent),
      klines: klines
    };
  } catch (error) {
    console.error('Ошибка получения рыночных данных:', error);
    throw error;
  }
}
```

### 3. Анализ баланса

```javascript
async function checkBalance(asset) {
  try {
    const balance = await client.getWalletBalance();
    const assetBalance = balance.spot[asset] || '0';
    
    return {
      available: parseFloat(assetBalance),
      inOrders: 0 // будет рассчитано отдельно
    };
  } catch (error) {
    console.error('Ошибка получения баланса:', error);
    throw error;
  }
}
```

## Стратегия DCA (Dollar Cost Averaging)

```javascript
class DCAStrategy {
  constructor(config) {
    this.symbol = config.symbol;
    this.baseAsset = config.baseAsset; // BTC
    this.quoteAsset = config.quoteAsset; // USDT
    this.investmentAmount = config.investmentAmount; // USDT за раз
    this.interval = config.interval; // интервал в миллисекундах
    this.maxInvestment = config.maxInvestment; // максимальная сумма
    this.totalInvested = 0;
    this.totalPurchased = 0;
  }

  async execute() {
    try {
      // Проверка лимитов
      if (this.totalInvested >= this.maxInvestment) {
        console.log('Достигнут максимальный лимит инвестиций');
        return;
      }

      // Проверка баланса
      const balance = await checkBalance(this.quoteAsset);
      if (balance.available < this.investmentAmount) {
        console.log('Недостаточно средств для покупки');
        return;
      }

      // Получение текущей цены
      const marketData = await getMarketData(this.symbol);
      const currentPrice = marketData.price;

      // Расчет количества для покупки
      const quantity = this.investmentAmount / currentPrice;

      // Создание рыночного ордера
      const order = await client.createOrder({
        symbol: this.symbol,
        side: 'buy',
        type: 'market',
        quantity: quantity.toFixed(8)
      });

      console.log(`DCA покупка: ${quantity.toFixed(8)} ${this.baseAsset} по цене ${currentPrice}`);
      
      // Обновление статистики
      this.totalInvested += this.investmentAmount;
      this.totalPurchased += quantity;

      return order;
    } catch (error) {
      console.error('Ошибка выполнения DCA:', error);
      throw error;
    }
  }

  getAveragePrice() {
    return this.totalPurchased > 0 ? this.totalInvested / this.totalPurchased : 0;
  }

  getStats() {
    return {
      totalInvested: this.totalInvested,
      totalPurchased: this.totalPurchased,
      averagePrice: this.getAveragePrice()
    };
  }
}

// Использование DCA стратегии
const dcaStrategy = new DCAStrategy({
  symbol: 'BNBETH',
  baseAsset: 'BTC',
  quoteAsset: 'USDT',
  investmentAmount: 100, // $100 за раз
  interval: 24 * 60 * 60 * 1000, // каждые 24 часа
  maxInvestment: 10000 // максимум $10,000
});

// Запуск стратегии
setInterval(async () => {
  await dcaStrategy.execute();
}, dcaStrategy.interval);
```

## Grid Trading стратегия

```javascript
class GridTradingStrategy {
  constructor(config) {
    this.symbol = config.symbol;
    this.lowerPrice = config.lowerPrice;
    this.upperPrice = config.upperPrice;
    this.gridCount = config.gridCount;
    this.investment = config.investment;
    this.gridSize = (this.upperPrice - this.lowerPrice) / this.gridCount;
    this.orderAmount = this.investment / this.gridCount;
    this.activeOrders = new Map();
  }

  async initialize() {
    try {
      // Отмена всех существующих ордеров
      await client.cancelAllOrders({ symbol: this.symbol });
      
      // Создание сетки ордеров
      await this.createGrid();
      
      console.log(`Grid стратегия инициализирована для ${this.symbol}`);
      console.log(`Диапазон: ${this.lowerPrice} - ${this.upperPrice}`);
      console.log(`Количество уровней: ${this.gridCount}`);
    } catch (error) {
      console.error('Ошибка инициализации Grid стратегии:', error);
      throw error;
    }
  }

  async createGrid() {
    const orders = [];
    
    for (let i = 0; i < this.gridCount; i++) {
      const price = this.lowerPrice + (i * this.gridSize);
      const quantity = this.orderAmount / price;
      
      // Создание ордера на покупку
      const buyOrder = {
        symbol: this.symbol,
        side: 'buy',
        type: 'limit',
        quantity: quantity.toFixed(8),
        price: price.toFixed(2),
        timeInForce: 'GTC'
      };
      
      orders.push(buyOrder);
    }
    
    // Создание всех ордеров
    for (const orderData of orders) {
      try {
        const order = await client.createOrder(orderData);
        this.activeOrders.set(order.orderId, {
          ...order,
          gridLevel: Math.floor((parseFloat(order.price) - this.lowerPrice) / this.gridSize)
        });
        
        console.log(`Создан ордер на покупку: ${order.quantity} по цене ${order.price}`);
      } catch (error) {
        console.error('Ошибка создания ордера:', error);
      }
    }
  }

  async monitorAndRebalance() {
    try {
      // Получение статуса ордеров
      const openOrders = await client.getOpenOrders({ symbol: this.symbol });
      const openOrderIds = new Set(openOrders.map(o => o.orderId));
      
      // Поиск исполненных ордеров
      for (const [orderId, orderData] of this.activeOrders) {
        if (!openOrderIds.has(orderId)) {
          console.log(`Ордер ${orderId} исполнен`);
          
          // Создание ордера на продажу на следующем уровне
          await this.createSellOrder(orderData);
          
          // Удаление из активных ордеров
          this.activeOrders.delete(orderId);
        }
      }
    } catch (error) {
      console.error('Ошибка мониторинга Grid стратегии:', error);
    }
  }

  async createSellOrder(buyOrderData) {
    try {
      const sellPrice = parseFloat(buyOrderData.price) + this.gridSize;
      
      const sellOrder = await client.createOrder({
        symbol: this.symbol,
        side: 'sell',
        type: 'limit',
        quantity: buyOrderData.quantity,
        price: sellPrice.toFixed(2),
        timeInForce: 'GTC'
      });
      
      console.log(`Создан ордер на продажу: ${sellOrder.quantity} по цене ${sellOrder.price}`);
      
      // Создание нового ордера на покупку на том же уровне
      setTimeout(async () => {
        await this.createBuyOrder(buyOrderData.gridLevel);
      }, 1000);
      
    } catch (error) {
      console.error('Ошибка создания ордера на продажу:', error);
    }
  }

  async createBuyOrder(gridLevel) {
    try {
      const price = this.lowerPrice + (gridLevel * this.gridSize);
      const quantity = this.orderAmount / price;
      
      const buyOrder = await client.createOrder({
        symbol: this.symbol,
        side: 'buy',
        type: 'limit',
        quantity: quantity.toFixed(8),
        price: price.toFixed(2),
        timeInForce: 'GTC'
      });
      
      this.activeOrders.set(buyOrder.orderId, {
        ...buyOrder,
        gridLevel: gridLevel
      });
      
      console.log(`Создан новый ордер на покупку: ${buyOrder.quantity} по цене ${buyOrder.price}`);
    } catch (error) {
      console.error('Ошибка создания ордера на покупку:', error);
    }
  }
}

// Использование Grid стратегии
const gridStrategy = new GridTradingStrategy({
  symbol: 'BNBETH',
  lowerPrice: 40000,
  upperPrice: 50000,
  gridCount: 20,
  investment: 1000 // $1000 общий капитал
});

// Инициализация и запуск
async function runGridStrategy() {
  await gridStrategy.initialize();
  
  // Мониторинг каждые 30 секунд
  setInterval(async () => {
    await gridStrategy.monitorAndRebalance();
  }, 30000);
}
```

## Арбитражная стратегия

```javascript
class ArbitrageStrategy {
  constructor(config) {
    this.symbol = config.symbol;
    this.minProfitPercent = config.minProfitPercent || 0.5;
    this.maxOrderSize = config.maxOrderSize || 0.01;
    this.exchanges = config.exchanges; // массив клиентов разных бирж
  }

  async findArbitrageOpportunity() {
    try {
      const prices = [];
      
      // Получение цен с разных бирж
      for (const exchange of this.exchanges) {
        const ticker = await exchange.getTicker(this.symbol);
        prices.push({
          exchange: exchange.name,
          bid: parseFloat(ticker.bid),
          ask: parseFloat(ticker.ask),
          client: exchange
        });
      }
      
      // Поиск арбитражных возможностей
      for (let i = 0; i < prices.length; i++) {
        for (let j = 0; j < prices.length; j++) {
          if (i !== j) {
            const buyExchange = prices[i];
            const sellExchange = prices[j];
            
            // Расчет потенциальной прибыли
            const profit = ((sellExchange.bid - buyExchange.ask) / buyExchange.ask) * 100;
            
            if (profit > this.minProfitPercent) {
              console.log(`Арбитражная возможность найдена:`);
              console.log(`Купить на ${buyExchange.exchange} по ${buyExchange.ask}`);
              console.log(`Продать на ${sellExchange.exchange} по ${sellExchange.bid}`);
              console.log(`Потенциальная прибыль: ${profit.toFixed(2)}%`);
              
              // Выполнение арбитража
              await this.executeArbitrage(buyExchange, sellExchange, profit);
            }
          }
        }
      }
    } catch (error) {
      console.error('Ошибка поиска арбитража:', error);
    }
  }

  async executeArbitrage(buyExchange, sellExchange, expectedProfit) {
    try {
      // Проверка балансов
      const buyBalance = await buyExchange.client.getWalletBalance();
      const sellBalance = await sellExchange.client.getWalletBalance();
      
      // Определение размера ордера
      const orderSize = Math.min(this.maxOrderSize, 
        parseFloat(buyBalance.spot.USDT) / buyExchange.ask,
        parseFloat(sellBalance.spot.BTC)
      );
      
      if (orderSize < 0.001) {
        console.log('Недостаточно средств для арбитража');
        return;
      }
      
      // Одновременное выполнение ордеров
      const [buyOrder, sellOrder] = await Promise.all([
        buyExchange.client.createOrder({
          symbol: this.symbol,
          side: 'buy',
          type: 'market',
          quantity: orderSize.toFixed(8)
        }),
        sellExchange.client.createOrder({
          symbol: this.symbol,
          side: 'sell',
          type: 'market',
          quantity: orderSize.toFixed(8)
        })
      ]);
      
      console.log('Арбитраж выполнен успешно');
      console.log(`Покупка: ${buyOrder.executedQty} по ${buyOrder.price}`);
      console.log(`Продажа: ${sellOrder.executedQty} по ${sellOrder.price}`);
      
      // Расчет фактической прибыли
      const actualProfit = (parseFloat(sellOrder.price) - parseFloat(buyOrder.price)) * parseFloat(buyOrder.executedQty);
      console.log(`Фактическая прибыль: ${actualProfit.toFixed(2)} USDT`);
      
    } catch (error) {
      console.error('Ошибка выполнения арбитража:', error);
    }
  }
}
```

## Стратегия следования за трендом

```javascript
class TrendFollowingStrategy {
  constructor(config) {
    this.symbol = config.symbol;
    this.shortPeriod = config.shortPeriod || 10;
    this.longPeriod = config.longPeriod || 30;
    this.rsiPeriod = config.rsiPeriod || 14;
    this.position = null; // 'long', 'short', null
    this.stopLossPercent = config.stopLossPercent || 2;
    this.takeProfitPercent = config.takeProfitPercent || 6;
  }

  async analyze() {
    try {
      // Получение исторических данных
      const klines = await client.getKlines({
        symbol: this.symbol,
        interval: '1h',
        limit: this.longPeriod + 20
      });
      
      const closes = klines.map(k => parseFloat(k[4]));
      
      // Расчет скользящих средних
      const shortMA = this.calculateSMA(closes, this.shortPeriod);
      const longMA = this.calculateSMA(closes, this.longPeriod);
      
      // Расчет RSI
      const rsi = this.calculateRSI(closes, this.rsiPeriod);
      
      // Определение сигнала
      const signal = this.generateSignal(shortMA, longMA, rsi);
      
      return {
        signal: signal,
        currentPrice: closes[closes.length - 1],
        shortMA: shortMA[shortMA.length - 1],
        longMA: longMA[longMA.length - 1],
        rsi: rsi[rsi.length - 1]
      };
    } catch (error) {
      console.error('Ошибка анализа тренда:', error);
      throw error;
    }
  }

  calculateSMA(data, period) {
    const sma = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      sma.push(sum / period);
    }
    return sma;
  }

  calculateRSI(data, period) {
    const gains = [];
    const losses = [];
    
    for (let i = 1; i < data.length; i++) {
      const change = data[i] - data[i - 1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
    }
    
    const rsi = [];
    for (let i = period - 1; i < gains.length; i++) {
      const avgGain = gains.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
      const avgLoss = losses.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
      
      if (avgLoss === 0) {
        rsi.push(100);
      } else {
        const rs = avgGain / avgLoss;
        rsi.push(100 - (100 / (1 + rs)));
      }
    }
    
    return rsi;
  }

  generateSignal(shortMA, longMA, rsi) {
    const currentShortMA = shortMA[shortMA.length - 1];
    const currentLongMA = longMA[longMA.length - 1];
    const currentRSI = rsi[rsi.length - 1];
    
    // Бычий сигнал
    if (currentShortMA > currentLongMA && currentRSI < 70 && !this.position) {
      return 'buy';
    }
    
    // Медвежий сигнал
    if (currentShortMA < currentLongMA && currentRSI > 30 && this.position === 'long') {
      return 'sell';
    }
    
    return 'hold';
  }

  async executeStrategy() {
    try {
      const analysis = await this.analyze();
      
      console.log(`Анализ ${this.symbol}:`);
      console.log(`Цена: ${analysis.currentPrice}`);
      console.log(`Short MA: ${analysis.shortMA.toFixed(2)}`);
      console.log(`Long MA: ${analysis.longMA.toFixed(2)}`);
      console.log(`RSI: ${analysis.rsi.toFixed(2)}`);
      console.log(`Сигнал: ${analysis.signal}`);
      
      if (analysis.signal === 'buy' && !this.position) {
        await this.openLongPosition(analysis.currentPrice);
      } else if (analysis.signal === 'sell' && this.position === 'long') {
        await this.closeLongPosition();
      }
      
    } catch (error) {
      console.error('Ошибка выполнения стратегии:', error);
    }
  }

  async openLongPosition(entryPrice) {
    try {
      const balance = await checkBalance('USDT');
      const orderSize = (balance.available * 0.9) / entryPrice; // 90% от баланса
      
      const order = await client.createOrder({
        symbol: this.symbol,
        side: 'buy',
        type: 'market',
        quantity: orderSize.toFixed(8)
      });
      
      this.position = {
        type: 'long',
        entryPrice: parseFloat(order.price),
        quantity: parseFloat(order.executedQty),
        orderId: order.orderId
      };
      
      // Установка стоп-лосс и тейк-профит
      await this.setStopLossAndTakeProfit();
      
      console.log(`Открыта длинная позиция: ${this.position.quantity} по цене ${this.position.entryPrice}`);
    } catch (error) {
      console.error('Ошибка открытия позиции:', error);
    }
  }

  async setStopLossAndTakeProfit() {
    const stopLossPrice = this.position.entryPrice * (1 - this.stopLossPercent / 100);
    const takeProfitPrice = this.position.entryPrice * (1 + this.takeProfitPercent / 100);
    
    try {
      // OCO ордер для стоп-лосс и тейк-профит
      const ocoOrder = await client.createOCOOrder({
        symbol: this.symbol,
        side: 'sell',
        quantity: this.position.quantity.toFixed(8),
        price: takeProfitPrice.toFixed(2),
        stopPrice: stopLossPrice.toFixed(2),
        stopLimitPrice: (stopLossPrice * 0.99).toFixed(2)
      });
      
      this.position.ocoOrderId = ocoOrder.orderListId;
      
      console.log(`Установлен стоп-лосс: ${stopLossPrice.toFixed(2)}`);
      console.log(`Установлен тейк-профит: ${takeProfitPrice.toFixed(2)}`);
    } catch (error) {
      console.error('Ошибка установки стоп-лосс/тейк-профит:', error);
    }
  }

  async closeLongPosition() {
    try {
      if (this.position && this.position.ocoOrderId) {
        // Отмена OCO ордера
        await client.cancelOCOOrder({
          symbol: this.symbol,
          orderListId: this.position.ocoOrderId
        });
      }
      
      // Продажа по рынку
      const order = await client.createOrder({
        symbol: this.symbol,
        side: 'sell',
        type: 'market',
        quantity: this.position.quantity.toFixed(8)
      });
      
      const exitPrice = parseFloat(order.price);
      const profit = (exitPrice - this.position.entryPrice) * this.position.quantity;
      const profitPercent = ((exitPrice - this.position.entryPrice) / this.position.entryPrice) * 100;
      
      console.log(`Закрыта длинная позиция: ${this.position.quantity} по цене ${exitPrice}`);
      console.log(`Прибыль: ${profit.toFixed(4)} USDT (${profitPercent.toFixed(2)}%)`);
      
      this.position = null;
    } catch (error) {
      console.error('Ошибка закрытия позиции:', error);
    }
  }
}

// Использование стратегии следования за трендом
const trendStrategy = new TrendFollowingStrategy({
  symbol: 'BNBETH',
  shortPeriod: 10,
  longPeriod: 30,
  rsiPeriod: 14,
  stopLossPercent: 2,
  takeProfitPercent: 6
});

// Запуск стратегии каждый час
setInterval(async () => {
  await trendStrategy.executeStrategy();
}, 60 * 60 * 1000);
```

## Мониторинг и логирование

```javascript
class TradingLogger {
  constructor() {
    this.trades = [];
    this.performance = {
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
      totalProfit: 0,
      maxDrawdown: 0,
      currentDrawdown: 0,
      peakBalance: 0
    };
  }

  logTrade(trade) {
    this.trades.push({
      ...trade,
      timestamp: new Date().toISOString()
    });
    
    this.updatePerformance(trade);
    this.saveToFile();
  }

  updatePerformance(trade) {
    this.performance.totalTrades++;
    
    if (trade.profit > 0) {
      this.performance.winningTrades++;
    } else {
      this.performance.losingTrades++;
    }
    
    this.performance.totalProfit += trade.profit;
    
    // Расчет просадки
    if (this.performance.totalProfit > this.performance.peakBalance) {
      this.performance.peakBalance = this.performance.totalProfit;
      this.performance.currentDrawdown = 0;
    } else {
      this.performance.currentDrawdown = this.performance.peakBalance - this.performance.totalProfit;
      if (this.performance.currentDrawdown > this.performance.maxDrawdown) {
        this.performance.maxDrawdown = this.performance.currentDrawdown;
      }
    }
  }

  getWinRate() {
    return this.performance.totalTrades > 0 
      ? (this.performance.winningTrades / this.performance.totalTrades) * 100 
      : 0;
  }

  getAverageProfit() {
    return this.performance.totalTrades > 0 
      ? this.performance.totalProfit / this.performance.totalTrades 
      : 0;
  }

  saveToFile() {
    const fs = require('fs');
    const data = {
      trades: this.trades,
      performance: this.performance,
      winRate: this.getWinRate(),
      averageProfit: this.getAverageProfit()
    };
    
    fs.writeFileSync('trading_log.json', JSON.stringify(data, null, 2));
  }

  generateReport() {
    console.log('\n=== ОТЧЕТ О ТОРГОВЛЕ ===');
    console.log(`Всего сделок: ${this.performance.totalTrades}`);
    console.log(`Прибыльных: ${this.performance.winningTrades}`);
    console.log(`Убыточных: ${this.performance.losingTrades}`);
    console.log(`Винрейт: ${this.getWinRate().toFixed(2)}%`);
    console.log(`Общая прибыль: ${this.performance.totalProfit.toFixed(4)} USDT`);
    console.log(`Средняя прибыль за сделку: ${this.getAverageProfit().toFixed(4)} USDT`);
    console.log(`Максимальная просадка: ${this.performance.maxDrawdown.toFixed(4)} USDT`);
    console.log(`Текущая просадка: ${this.performance.currentDrawdown.toFixed(4)} USDT`);
    console.log('========================\n');
  }
}

// Использование логгера
const logger = new TradingLogger();

// Пример логирования сделки
logger.logTrade({
  symbol: 'BNBETH',
  side: 'buy',
  quantity: 0.001,
  entryPrice: 45000,
  exitPrice: 46000,
  profit: 1.0,
  strategy: 'DCA'
});
```

Эти примеры демонстрируют различные торговые стратегии и подходы к автоматизации торговли с использованием API OKD Finance. Каждая стратегия может быть адаптирована под конкретные потребности и рыночные условия.
