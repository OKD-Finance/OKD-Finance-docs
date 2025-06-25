# Примеры Webhooks

Практические примеры настройки и использования webhooks для получения уведомлений о событиях в реальном времени.

## Обзор Webhooks

Webhooks позволяют получать HTTP уведомления о важных событиях в вашем аккаунте OKD Finance:
- Исполнение ордеров
- Изменения баланса
- Депозиты и выводы
- Изменения позиций
- Системные уведомления

## Настройка Webhook

### Создание webhook endpoint

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// Секретный ключ для проверки подписи
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

// Middleware для проверки подписи
function verifyWebhookSignature(req, res, next) {
  const signature = req.headers['x-okd-signature'];
  const payload = JSON.stringify(req.body);
  
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  if (signature !== `sha256=${expectedSignature}`) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  next();
}

// Основной webhook endpoint
app.post('/webhook', verifyWebhookSignature, (req, res) => {
  const { event, data, timestamp } = req.body;
  
  console.log(`Получено событие: ${event} в ${new Date(timestamp)}`);
  
  try {
    handleWebhookEvent(event, data);
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Ошибка обработки webhook:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

app.listen(3000, () => {
  console.log('Webhook сервер запущен на порту 3000');
});
```

### Регистрация webhook в OKD Finance

```javascript
const okdFinance = require('@okd-finance/api');

const client = new okdFinance({
  apiKey: process.env.OKD_API_KEY,
  secretKey: process.env.OKD_SECRET_KEY
});

async function setupWebhook() {
  try {
    const webhook = await client.createWebhook({
      url: 'https://your-domain.com/webhook',
      events: [
        'order.filled',
        'order.canceled',
        'balance.changed',
        'deposit.confirmed',
        'withdrawal.completed'
      ],
      secret: WEBHOOK_SECRET,
      active: true
    });
    
    console.log('Webhook создан:', webhook.id);
    return webhook;
  } catch (error) {
    console.error('Ошибка создания webhook:', error);
  }
}
```

## Обработка событий

### Универсальный обработчик событий

```javascript
function handleWebhookEvent(event, data) {
  switch (event) {
    case 'order.filled':
      handleOrderFilled(data);
      break;
      
    case 'order.canceled':
      handleOrderCanceled(data);
      break;
      
    case 'balance.changed':
      handleBalanceChanged(data);
      break;
      
    case 'deposit.confirmed':
      handleDepositConfirmed(data);
      break;
      
    case 'withdrawal.completed':
      handleWithdrawalCompleted(data);
      break;
      
    case 'position.opened':
      handlePositionOpened(data);
      break;
      
    case 'position.closed':
      handlePositionClosed(data);
      break;
      
    default:
      console.log(`Неизвестное событие: ${event}`);
  }
}
```

### Обработка исполнения ордеров

```javascript
function handleOrderFilled(data) {
  console.log('Ордер исполнен:', data);
  
  const {
    orderId,
    symbol,
    side,
    quantity,
    price,
    executedQuantity,
    executedPrice,
    commission,
    commissionAsset,
    timestamp
  } = data;
  
  // Логирование сделки
  logTrade({
    orderId,
    symbol,
    side,
    quantity: executedQuantity,
    price: executedPrice,
    commission,
    commissionAsset,
    timestamp
  });
  
  // Уведомление пользователя
  sendNotification({
    type: 'order_filled',
    message: `Ордер ${orderId} исполнен: ${side} ${executedQuantity} ${symbol} по цене ${executedPrice}`,
    data: data
  });
  
  // Обновление торговой стратегии
  updateTradingStrategy(data);
}

async function logTrade(trade) {
  // Сохранение в базу данных
  await database.trades.insert({
    ...trade,
    createdAt: new Date()
  });
  
  // Обновление статистики
  await updateTradingStats(trade);
}

async function updateTradingStats(trade) {
  const stats = await database.stats.findOne({ symbol: trade.symbol });
  
  if (stats) {
    stats.totalTrades += 1;
    stats.totalVolume += parseFloat(trade.quantity);
    stats.lastTradeAt = new Date(trade.timestamp);
    
    if (trade.side === 'buy') {
      stats.totalBuys += 1;
      stats.totalBuyVolume += parseFloat(trade.quantity);
    } else {
      stats.totalSells += 1;
      stats.totalSellVolume += parseFloat(trade.quantity);
    }
    
    await database.stats.update({ symbol: trade.symbol }, stats);
  }
}
```

### Обработка изменений баланса

```javascript
function handleBalanceChanged(data) {
  console.log('Баланс изменен:', data);
  
  const {
    asset,
    walletType,
    availableBalance,
    lockedBalance,
    totalBalance,
    changeAmount,
    changeType,
    timestamp
  } = data;
  
  // Проверка критических изменений
  if (Math.abs(parseFloat(changeAmount)) > getThreshold(asset)) {
    sendAlert({
      type: 'large_balance_change',
      asset,
      amount: changeAmount,
      newBalance: totalBalance,
      timestamp
    });
  }
  
  // Обновление локального кэша балансов
  updateBalanceCache(asset, walletType, {
    available: availableBalance,
    locked: lockedBalance,
    total: totalBalance
  });
  
  // Триггер автоматических действий
  checkAutoTriggers(asset, totalBalance);
}

function getThreshold(asset) {
  const thresholds = {
    'BTC': 0.1,
    'ETH': 1.0,
    'USDT': 1000.0
  };
  return thresholds[asset] || 100.0;
}

async function checkAutoTriggers(asset, balance) {
  const triggers = await database.autoTriggers.find({
    asset: asset,
    active: true
  });
  
  for (const trigger of triggers) {
    if (shouldExecuteTrigger(trigger, balance)) {
      await executeTrigger(trigger, balance);
    }
  }
}
```

### Обработка депозитов

```javascript
function handleDepositConfirmed(data) {
  console.log('Депозит подтвержден:', data);
  
  const {
    depositId,
    asset,
    amount,
    network,
    txHash,
    confirmations,
    timestamp
  } = data;
  
  // Уведомление о депозите
  sendNotification({
    type: 'deposit_confirmed',
    message: `Депозит ${amount} ${asset} подтвержден`,
    data: {
      amount,
      asset,
      txHash,
      confirmations
    }
  });
  
  // Автоматические действия после депозита
  handlePostDepositActions(asset, amount);
}

async function handlePostDepositActions(asset, amount) {
  // Проверка настроек автоматической торговли
  const autoTradeSettings = await database.autoTrade.findOne({
    asset: asset,
    enabled: true
  });
  
  if (autoTradeSettings && parseFloat(amount) >= autoTradeSettings.minAmount) {
    // Запуск автоматической торговой стратегии
    await startAutoTradingStrategy(autoTradeSettings, amount);
  }
  
  // Автоматический стейкинг
  const stakingSettings = await database.autoStaking.findOne({
    asset: asset,
    enabled: true
  });
  
  if (stakingSettings && parseFloat(amount) >= stakingSettings.minAmount) {
    await autoStake(asset, amount, stakingSettings);
  }
}
```

## Уведомления и алерты

### Email уведомления

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendEmailNotification(notification) {
  const { type, message, data } = notification;
  
  const emailTemplate = getEmailTemplate(type, data);
  
  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    });
    
    console.log('Email уведомление отправлено');
  } catch (error) {
    console.error('Ошибка отправки email:', error);
  }
}

function getEmailTemplate(type, data) {
  const templates = {
    order_filled: {
      subject: `Ордер исполнен - ${data.symbol}`,
      html: `
        <h2>Ордер исполнен</h2>
        <p><strong>Символ:</strong> ${data.symbol}</p>
        <p><strong>Сторона:</strong> ${data.side}</p>
        <p><strong>Количество:</strong> ${data.executedQuantity}</p>
        <p><strong>Цена:</strong> ${data.executedPrice}</p>
        <p><strong>Комиссия:</strong> ${data.commission} ${data.commissionAsset}</p>
        <p><strong>Время:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
      `
    },
    deposit_confirmed: {
      subject: `Депозит подтвержден - ${data.amount} ${data.asset}`,
      html: `
        <h2>Депозит подтвержден</h2>
        <p><strong>Актив:</strong> ${data.asset}</p>
        <p><strong>Сумма:</strong> ${data.amount}</p>
        <p><strong>Хэш транзакции:</strong> ${data.txHash}</p>
        <p><strong>Подтверждения:</strong> ${data.confirmations}</p>
      `
    }
  };
  
  return templates[type] || {
    subject: 'Уведомление OKD Finance',
    html: `<p>${JSON.stringify(data)}</p>`
  };
}
```

### Telegram уведомления

```javascript
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const chatId = process.env.TELEGRAM_CHAT_ID;

async function sendTelegramNotification(notification) {
  const { type, message, data } = notification;
  
  const telegramMessage = formatTelegramMessage(type, message, data);
  
  try {
    await bot.sendMessage(chatId, telegramMessage, {
      parse_mode: 'Markdown'
    });
    
    console.log('Telegram уведомление отправлено');
  } catch (error) {
    console.error('Ошибка отправки Telegram:', error);
  }
}

function formatTelegramMessage(type, message, data) {
  const emoji = {
    order_filled: '✅',
    order_canceled: '❌',
    deposit_confirmed: '💰',
    withdrawal_completed: '💸',
    large_balance_change: '⚠️'
  };
  
  return `${emoji[type] || '📢'} *${message}*\n\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``;
}
```

### Discord уведомления

```javascript
const { WebhookClient } = require('discord.js');

const discordWebhook = new WebhookClient({
  url: process.env.DISCORD_WEBHOOK_URL
});

async function sendDiscordNotification(notification) {
  const { type, message, data } = notification;
  
  const embed = createDiscordEmbed(type, message, data);
  
  try {
    await discordWebhook.send({
      embeds: [embed]
    });
    
    console.log('Discord уведомление отправлено');
  } catch (error) {
    console.error('Ошибка отправки Discord:', error);
  }
}

function createDiscordEmbed(type, message, data) {
  const colors = {
    order_filled: 0x00ff00,
    order_canceled: 0xff0000,
    deposit_confirmed: 0x0099ff,
    withdrawal_completed: 0xff9900
  };
  
  return {
    title: message,
    color: colors[type] || 0x808080,
    fields: Object.entries(data).map(([key, value]) => ({
      name: key,
      value: String(value),
      inline: true
    })),
    timestamp: new Date().toISOString()
  };
}
```

## Обработка ошибок и повторные попытки

### Система повторных попыток

```javascript
class WebhookProcessor {
  constructor() {
    this.retryQueue = [];
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 секунда
  }
  
  async processWebhook(event, data) {
    try {
      await this.handleEvent(event, data);
    } catch (error) {
      console.error('Ошибка обработки webhook:', error);
      await this.addToRetryQueue(event, data, error);
    }
  }
  
  async addToRetryQueue(event, data, error) {
    const retryItem = {
      event,
      data,
      error: error.message,
      attempts: 0,
      nextRetry: Date.now() + this.retryDelay,
      createdAt: Date.now()
    };
    
    this.retryQueue.push(retryItem);
    await this.saveRetryItem(retryItem);
  }
  
  async processRetryQueue() {
    const now = Date.now();
    const itemsToRetry = this.retryQueue.filter(item => 
      item.nextRetry <= now && item.attempts < this.maxRetries
    );
    
    for (const item of itemsToRetry) {
      try {
        await this.handleEvent(item.event, item.data);
        
        // Успешно обработано, удаляем из очереди
        this.removeFromRetryQueue(item);
        await this.deleteRetryItem(item);
        
      } catch (error) {
        item.attempts++;
        item.nextRetry = now + (this.retryDelay * Math.pow(2, item.attempts));
        item.lastError = error.message;
        
        if (item.attempts >= this.maxRetries) {
          console.error('Максимальное количество попыток достигнуто:', item);
          await this.handleFailedWebhook(item);
          this.removeFromRetryQueue(item);
        }
        
        await this.updateRetryItem(item);
      }
    }
  }
  
  async handleFailedWebhook(item) {
    // Отправка алерта о неудачной обработке
    await sendAlert({
      type: 'webhook_processing_failed',
      event: item.event,
      attempts: item.attempts,
      lastError: item.lastError,
      data: item.data
    });
    
    // Сохранение в таблицу неудачных webhook'ов
    await database.failedWebhooks.insert(item);
  }
  
  removeFromRetryQueue(item) {
    const index = this.retryQueue.indexOf(item);
    if (index > -1) {
      this.retryQueue.splice(index, 1);
    }
  }
}

// Запуск обработчика повторных попыток каждые 30 секунд
const processor = new WebhookProcessor();
setInterval(() => {
  processor.processRetryQueue();
}, 30000);
```

## Мониторинг и логирование

### Логирование webhook событий

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'webhook-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'webhook-combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

function logWebhookEvent(event, data, status = 'success', error = null) {
  const logData = {
    event,
    status,
    timestamp: new Date().toISOString(),
    dataSize: JSON.stringify(data).length
  };
  
  if (error) {
    logData.error = error.message;
    logData.stack = error.stack;
    logger.error('Webhook processing failed', logData);
  } else {
    logger.info('Webhook processed successfully', logData);
  }
}
```

### Метрики и мониторинг

```javascript
class WebhookMetrics {
  constructor() {
    this.metrics = {
      totalReceived: 0,
      totalProcessed: 0,
      totalFailed: 0,
      processingTimes: [],
      eventCounts: {},
      lastProcessedAt: null
    };
  }
  
  recordWebhookReceived(event) {
    this.metrics.totalReceived++;
    this.metrics.eventCounts[event] = (this.metrics.eventCounts[event] || 0) + 1;
  }
  
  recordWebhookProcessed(event, processingTime) {
    this.metrics.totalProcessed++;
    this.metrics.processingTimes.push(processingTime);
    this.metrics.lastProcessedAt = Date.now();
    
    // Сохраняем только последние 1000 времен обработки
    if (this.metrics.processingTimes.length > 1000) {
      this.metrics.processingTimes.shift();
    }
  }
  
  recordWebhookFailed(event, error) {
    this.metrics.totalFailed++;
    logger.error('Webhook failed', { event, error: error.message });
  }
  
  getMetrics() {
    const avgProcessingTime = this.metrics.processingTimes.length > 0
      ? this.metrics.processingTimes.reduce((a, b) => a + b, 0) / this.metrics.processingTimes.length
      : 0;
    
    return {
      ...this.metrics,
      avgProcessingTime,
      successRate: this.metrics.totalReceived > 0
        ? (this.metrics.totalProcessed / this.metrics.totalReceived) * 100
        : 0
    };
  }
}

const metrics = new WebhookMetrics();

// Endpoint для получения метрик
app.get('/webhook/metrics', (req, res) => {
  res.json(metrics.getMetrics());
});
```

## Тестирование Webhooks

### Локальное тестирование с ngrok

```bash
# Установка ngrok
npm install -g ngrok

# Запуск туннеля
ngrok http 3000
```

```javascript
// Тестовый webhook endpoint
app.post('/webhook/test', (req, res) => {
  console.log('Тестовый webhook получен:', req.body);
  res.json({ status: 'received', timestamp: Date.now() });
});

// Функция для тестирования webhook
async function testWebhook() {
  const testData = {
    event: 'order.filled',
    data: {
      orderId: 'test_12345',
      symbol: 'BNBETH',
      side: 'buy',
      quantity: '0.001',
      price: '45000.00',
      executedQuantity: '0.001',
      executedPrice: '45000.00',
      commission: '0.045',
      commissionAsset: 'USDT',
      timestamp: Date.now()
    },
    timestamp: Date.now()
  };
  
  try {
    const response = await fetch('http://localhost:3000/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OKD-Signature': generateSignature(testData)
      },
      body: JSON.stringify(testData)
    });
    
    console.log('Тест webhook ответ:', await response.json());
  } catch (error) {
    console.error('Ошибка тестирования webhook:', error);
  }
}

function generateSignature(data) {
  const payload = JSON.stringify(data);
  return 'sha256=' + crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
}
```

### Автоматические тесты

```javascript
const request = require('supertest');
const app = require('./webhook-server');

describe('Webhook Tests', () => {
  test('должен обработать валидный webhook', async () => {
    const testData = {
      event: 'order.filled',
      data: { orderId: 'test_123' },
      timestamp: Date.now()
    };
    
    const signature = generateSignature(testData);
    
    const response = await request(app)
      .post('/webhook')
      .set('X-OKD-Signature', signature)
      .send(testData);
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });
  
  test('должен отклонить webhook с неверной подписью', async () => {
    const testData = {
      event: 'order.filled',
      data: { orderId: 'test_123' },
      timestamp: Date.now()
    };
    
    const response = await request(app)
      .post('/webhook')
      .set('X-OKD-Signature', 'invalid-signature')
      .send(testData);
    
    expect(response.status).toBe(401);
  });
});
```

Эти примеры показывают полную реализацию системы webhooks для OKD Finance, включая обработку событий, уведомления, обработку ошибок и мониторинг.
