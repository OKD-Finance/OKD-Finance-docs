# Webhook Examples

## Overview

Webhooks provide real-time notifications for various events in your OKD Finance trading system. This guide shows how to set up and handle webhooks for different scenarios.

## Basic Webhook Setup

### Creating a Webhook Endpoint

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// Webhook endpoint
app.post('/webhook/okd-finance', (req, res) => {
  try {
    // Verify webhook signature
    if (!verifySignature(req)) {
      return res.status(401).send('Unauthorized');
    }

    // Process webhook event
    handleWebhookEvent(req.body);
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
});

function verifySignature(req) {
  const signature = req.headers['x-okd-signature'];
  const payload = JSON.stringify(req.body);
  const secret = process.env.WEBHOOK_SECRET;
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  return signature === expectedSignature;
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

### Registering Webhooks

```javascript
// Register webhook for order events
await okdFinance.createWebhook({
  url: 'https://your-domain.com/webhook/okd-finance',
  events: ['order.filled', 'order.canceled', 'order.rejected'],
  secret: 'your-webhook-secret',
  exchanges: ['binance', 'bybit', 'okx']
});

// Register webhook for balance changes
await okdFinance.createWebhook({
  url: 'https://your-domain.com/webhook/balance',
  events: ['balance.updated'],
  secret: 'your-webhook-secret',
  filters: {
    minAmount: 10, // Only notify for changes > $10
    currencies: ['BTC', 'ETH', 'USDT']
  }
});
```

## Event Types and Handlers

### Order Events

```javascript
function handleWebhookEvent(event) {
  switch (event.type) {
    case 'order.filled':
      handleOrderFilled(event.data);
      break;
    case 'order.canceled':
      handleOrderCanceled(event.data);
      break;
    case 'order.rejected':
      handleOrderRejected(event.data);
      break;
    case 'order.partially_filled':
      handleOrderPartiallyFilled(event.data);
      break;
    default:
      console.log('Unknown event type:', event.type);
  }
}

function handleOrderFilled(orderData) {
  console.log('Order filled:', orderData);
  
  // Example: Send notification
  sendNotification({
    title: 'Order Filled',
    message: `${orderData.side.toUpperCase()} ${orderData.amount} ${orderData.symbol} at ${orderData.price}`,
    type: 'success'
  });
  
  // Example: Update database
  updateOrderInDatabase(orderData);
  
  // Example: Trigger next action in strategy
  if (orderData.strategyId) {
    triggerNextStrategyStep(orderData.strategyId, orderData);
  }
}

function handleOrderCanceled(orderData) {
  console.log('Order canceled:', orderData);
  
  // Example: Log for analysis
  logOrderCancellation(orderData);
  
  // Example: Retry with different parameters
  if (orderData.retryable) {
    retryOrderWithAdjustments(orderData);
  }
}
```

### Balance Events

```javascript
function handleBalanceUpdate(balanceData) {
  console.log('Balance updated:', balanceData);
  
  // Example: Check for low balance alerts
  checkLowBalanceAlerts(balanceData);
  
  // Example: Rebalance portfolio
  if (shouldRebalance(balanceData)) {
    triggerPortfolioRebalancing(balanceData);
  }
  
  // Example: Update risk limits
  updateRiskLimits(balanceData);
}

function checkLowBalanceAlerts(balanceData) {
  const lowBalanceThreshold = 100; // $100
  
  if (balanceData.totalUSDValue < lowBalanceThreshold) {
    sendAlert({
      type: 'warning',
      title: 'Low Balance Alert',
      message: `Total balance is below $${lowBalanceThreshold}`,
      data: balanceData
    });
  }
}
```

### Market Data Events

```javascript
// Register for price alerts
await okdFinance.createWebhook({
  url: 'https://your-domain.com/webhook/price-alerts',
  events: ['price.threshold'],
  filters: {
    symbol: 'BTCUSDT',
    conditions: [
      { type: 'above', value: 50000 },
      { type: 'below', value: 40000 }
    ]
  }
});

function handlePriceAlert(alertData) {
  console.log('Price alert triggered:', alertData);
  
  // Example: Execute conditional orders
  if (alertData.condition.type === 'above' && alertData.price > 50000) {
    executeSellStrategy(alertData.symbol);
  } else if (alertData.condition.type === 'below' && alertData.price < 40000) {
    executeBuyStrategy(alertData.symbol);
  }
}
```

## Advanced Webhook Patterns

### Webhook Retry Logic

```javascript
class WebhookHandler {
  constructor() {
    this.retryQueue = [];
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
  }

  async processWebhook(event) {
    try {
      await this.handleEvent(event);
    } catch (error) {
      console.error('Webhook processing failed:', error);
      this.queueForRetry(event, 0);
    }
  }

  queueForRetry(event, attempt) {
    if (attempt < this.maxRetries) {
      setTimeout(() => {
        this.retryWebhook(event, attempt + 1);
      }, this.retryDelay * Math.pow(2, attempt)); // Exponential backoff
    } else {
      this.handleFailedWebhook(event);
    }
  }

  async retryWebhook(event, attempt) {
    try {
      await this.handleEvent(event);
      console.log(`Webhook retry ${attempt} succeeded`);
    } catch (error) {
      console.error(`Webhook retry ${attempt} failed:`, error);
      this.queueForRetry(event, attempt);
    }
  }

  handleFailedWebhook(event) {
    // Log to dead letter queue or alert system
    console.error('Webhook permanently failed:', event);
    this.logToDeadLetterQueue(event);
  }
}
```

### Webhook Aggregation

```javascript
class WebhookAggregator {
  constructor() {
    this.eventBuffer = [];
    this.bufferTimeout = 5000; // 5 seconds
    this.maxBufferSize = 100;
  }

  addEvent(event) {
    this.eventBuffer.push(event);
    
    if (this.eventBuffer.length >= this.maxBufferSize) {
      this.flushBuffer();
    } else if (this.eventBuffer.length === 1) {
      // Start timer for first event
      setTimeout(() => this.flushBuffer(), this.bufferTimeout);
    }
  }

  flushBuffer() {
    if (this.eventBuffer.length === 0) return;
    
    const events = [...this.eventBuffer];
    this.eventBuffer = [];
    
    this.processBatchedEvents(events);
  }

  processBatchedEvents(events) {
    // Group events by type
    const groupedEvents = events.reduce((groups, event) => {
      const key = event.type;
      if (!groups[key]) groups[key] = [];
      groups[key].push(event);
      return groups;
    }, {});

    // Process each group
    Object.entries(groupedEvents).forEach(([type, eventList]) => {
      this.processBatchedEventType(type, eventList);
    });
  }

  processBatchedEventType(type, events) {
    switch (type) {
      case 'order.filled':
        this.processBatchedOrderFills(events);
        break;
      case 'balance.updated':
        this.processBatchedBalanceUpdates(events);
        break;
      default:
        events.forEach(event => this.processIndividualEvent(event));
    }
  }

  processBatchedOrderFills(events) {
    const totalVolume = events.reduce((sum, e) => sum + e.data.amount, 0);
    const avgPrice = events.reduce((sum, e) => sum + e.data.price, 0) / events.length;
    
    console.log(`Batch processed ${events.length} order fills: ${totalVolume} volume at avg price ${avgPrice}`);
    
    // Send summary notification
    this.sendBatchNotification('order_fills', {
      count: events.length,
      totalVolume,
      avgPrice,
      timeRange: {
        start: Math.min(...events.map(e => e.timestamp)),
        end: Math.max(...events.map(e => e.timestamp))
      }
    });
  }
}
```

### Webhook Security

```javascript
class SecureWebhookHandler {
  constructor(config) {
    this.secrets = new Map(config.secrets); // Map of webhook_id -> secret
    this.rateLimiter = new Map(); // IP -> request count
    this.maxRequestsPerMinute = 100;
  }

  validateRequest(req) {
    // Rate limiting
    if (!this.checkRateLimit(req.ip)) {
      throw new Error('Rate limit exceeded');
    }

    // Signature verification
    if (!this.verifySignature(req)) {
      throw new Error('Invalid signature');
    }

    // Timestamp verification (prevent replay attacks)
    if (!this.verifyTimestamp(req.headers['x-timestamp'])) {
      throw new Error('Request too old');
    }

    return true;
  }

  checkRateLimit(ip) {
    const now = Date.now();
    const windowStart = now - 60000; // 1 minute window
    
    if (!this.rateLimiter.has(ip)) {
      this.rateLimiter.set(ip, []);
    }
    
    const requests = this.rateLimiter.get(ip);
    
    // Remove old requests
    const recentRequests = requests.filter(time => time > windowStart);
    this.rateLimiter.set(ip, recentRequests);
    
    if (recentRequests.length >= this.maxRequestsPerMinute) {
      return false;
    }
    
    // Add current request
    recentRequests.push(now);
    return true;
  }

  verifyTimestamp(timestamp) {
    const now = Date.now();
    const requestTime = parseInt(timestamp);
    const maxAge = 300000; // 5 minutes
    
    return Math.abs(now - requestTime) <= maxAge;
  }

  verifySignature(req) {
    const webhookId = req.headers['x-webhook-id'];
    const signature = req.headers['x-signature'];
    const timestamp = req.headers['x-timestamp'];
    
    const secret = this.secrets.get(webhookId);
    if (!secret) return false;
    
    const payload = timestamp + JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }
}
```

## Integration Examples

### Discord Bot Integration

```javascript
const { Client, GatewayIntentBits } = require('discord.js');

class DiscordWebhookIntegration {
  constructor(token, channelId) {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.channelId = channelId;
    this.client.login(token);
  }

  async handleOrderFilled(orderData) {
    const embed = {
      title: '✅ Order Filled',
      color: orderData.side === 'buy' ? 0x00ff00 : 0xff0000,
      fields: [
        { name: 'Symbol', value: orderData.symbol, inline: true },
        { name: 'Side', value: orderData.side.toUpperCase(), inline: true },
        { name: 'Amount', value: orderData.amount.toString(), inline: true },
        { name: 'Price', value: `$${orderData.price}`, inline: true },
        { name: 'Total', value: `$${(orderData.amount * orderData.price).toFixed(2)}`, inline: true },
        { name: 'Exchange', value: orderData.exchange, inline: true }
      ],
      timestamp: new Date().toISOString()
    };

    const channel = await this.client.channels.fetch(this.channelId);
    await channel.send({ embeds: [embed] });
  }

  async handleBalanceAlert(balanceData) {
    const embed = {
      title: '⚠️ Balance Alert',
      color: 0xffaa00,
      description: `Total balance: $${balanceData.totalUSDValue.toFixed(2)}`,
      fields: balanceData.assets.map(asset => ({
        name: asset.currency,
        value: `${asset.amount} ($${asset.usdValue.toFixed(2)})`,
        inline: true
      })),
      timestamp: new Date().toISOString()
    };

    const channel = await this.client.channels.fetch(this.channelId);
    await channel.send({ embeds: [embed] });
  }
}
```

### Telegram Bot Integration

```javascript
const TelegramBot = require('node-telegram-bot-api');

class TelegramWebhookIntegration {
  constructor(token, chatId) {
    this.bot = new TelegramBot(token);
    this.chatId = chatId;
  }

  async handleOrderFilled(orderData) {
    const message = `
🎯 *Order Filled*

Symbol: \`${orderData.symbol}\`
Side: *${orderData.side.toUpperCase()}*
Amount: \`${orderData.amount}\`
Price: \`$${orderData.price}\`
Total: \`$${(orderData.amount * orderData.price).toFixed(2)}\`
Exchange: \`${orderData.exchange}\`

Time: ${new Date().toLocaleString()}
    `;

    await this.bot.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
  }

  async handlePriceAlert(alertData) {
    const emoji = alertData.condition.type === 'above' ? '🚀' : '📉';
    const message = `
${emoji} *Price Alert*

${alertData.symbol} has ${alertData.condition.type === 'above' ? 'risen above' : 'fallen below'} $${alertData.condition.value}

Current Price: \`$${alertData.currentPrice}\`
Change: \`${alertData.change > 0 ? '+' : ''}${alertData.change.toFixed(2)}%\`

Time: ${new Date().toLocaleString()}
    `;

    await this.bot.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
  }
}
```

### Email Integration

```javascript
const nodemailer = require('nodemailer');

class EmailWebhookIntegration {
  constructor(config) {
    this.transporter = nodemailer.createTransporter(config.smtp);
    this.fromEmail = config.fromEmail;
    this.toEmail = config.toEmail;
  }

  async handleOrderFilled(orderData) {
    const html = `
      <h2>Order Filled Notification</h2>
      <table border="1" cellpadding="5">
        <tr><td><strong>Symbol</strong></td><td>${orderData.symbol}</td></tr>
        <tr><td><strong>Side</strong></td><td>${orderData.side.toUpperCase()}</td></tr>
        <tr><td><strong>Amount</strong></td><td>${orderData.amount}</td></tr>
        <tr><td><strong>Price</strong></td><td>$${orderData.price}</td></tr>
        <tr><td><strong>Total</strong></td><td>$${(orderData.amount * orderData.price).toFixed(2)}</td></tr>
        <tr><td><strong>Exchange</strong></td><td>${orderData.exchange}</td></tr>
        <tr><td><strong>Time</strong></td><td>${new Date().toLocaleString()}</td></tr>
      </table>
    `;

    await this.transporter.sendMail({
      from: this.fromEmail,
      to: this.toEmail,
      subject: `Order Filled: ${orderData.symbol}`,
      html
    });
  }

  async sendDailyReport(reportData) {
    const html = `
      <h2>Daily Trading Report</h2>
      <h3>Summary</h3>
      <ul>
        <li>Total Trades: ${reportData.totalTrades}</li>
        <li>Profit/Loss: $${reportData.totalPnL.toFixed(2)}</li>
        <li>Win Rate: ${(reportData.winRate * 100).toFixed(1)}%</li>
        <li>Best Trade: $${reportData.bestTrade.toFixed(2)}</li>
        <li>Worst Trade: $${reportData.worstTrade.toFixed(2)}</li>
      </ul>
      
      <h3>Recent Trades</h3>
      <table border="1" cellpadding="5">
        <tr>
          <th>Time</th>
          <th>Symbol</th>
          <th>Side</th>
          <th>Amount</th>
          <th>Price</th>
          <th>P&L</th>
        </tr>
        ${reportData.recentTrades.map(trade => `
          <tr>
            <td>${new Date(trade.timestamp).toLocaleString()}</td>
            <td>${trade.symbol}</td>
            <td>${trade.side}</td>
            <td>${trade.amount}</td>
            <td>$${trade.price}</td>
            <td style="color: ${trade.pnl >= 0 ? 'green' : 'red'}">$${trade.pnl.toFixed(2)}</td>
          </tr>
        `).join('')}
      </table>
    `;

    await this.transporter.sendMail({
      from: this.fromEmail,
      to: this.toEmail,
      subject: `Daily Trading Report - ${new Date().toDateString()}`,
      html
    });
  }
}
```

## Testing Webhooks

### Webhook Testing Framework

```javascript
class WebhookTester {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
    this.testResults = [];
  }

  async runTests() {
    console.log('Starting webhook tests...');
    
    await this.testOrderFilled();
    await this.testOrderCanceled();
    await this.testBalanceUpdate();
    await this.testPriceAlert();
    await this.testInvalidSignature();
    await this.testRateLimit();
    
    this.printResults();
  }

  async testOrderFilled() {
    const testEvent = {
      type: 'order.filled',
      data: {
        orderId: 'test-123',
        symbol: 'BTCUSDT',
        side: 'buy',
        amount: 0.1,
        price: 45000,
        exchange: 'binance',
        timestamp: Date.now()
      }
    };

    await this.sendTestWebhook('Order Filled', testEvent);
  }

  async testInvalidSignature() {
    const testEvent = {
      type: 'order.filled',
      data: { orderId: 'invalid-test' }
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-okd-signature': 'invalid-signature'
        },
        body: JSON.stringify(testEvent)
      });

      this.testResults.push({
        test: 'Invalid Signature',
        passed: response.status === 401,
        status: response.status
      });
    } catch (error) {
      this.testResults.push({
        test: 'Invalid Signature',
        passed: false,
        error: error.message
      });
    }
  }

  async sendTestWebhook(testName, event) {
    try {
      const signature = this.generateSignature(JSON.stringify(event));
      
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-okd-signature': signature,
          'x-timestamp': Date.now().toString()
        },
        body: JSON.stringify(event)
      });

      this.testResults.push({
        test: testName,
        passed: response.status === 200,
        status: response.status
      });
    } catch (error) {
      this.testResults.push({
        test: testName,
        passed: false,
        error: error.message
      });
    }
  }

  generateSignature(payload) {
    const secret = process.env.WEBHOOK_SECRET || 'test-secret';
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }

  printResults() {
    console.log('\n=== Webhook Test Results ===');
    this.testResults.forEach(result => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${result.test}`);
      if (!result.passed && result.error) {
        console.log(`   Error: ${result.error}`);
      }
    });
    
    const passedTests = this.testResults.filter(r => r.passed).length;
    console.log(`\nPassed: ${passedTests}/${this.testResults.length} tests`);
  }
}

// Usage
const tester = new WebhookTester('http://localhost:3000/webhook/okd-finance');
tester.runTests();
```
